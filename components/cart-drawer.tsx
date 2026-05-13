"use client";

import type { FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react";

import { ContactButtons } from "@/components/contact-buttons";
import { useCart } from "@/components/cart-provider";
import type {
  CreateOrderRequest,
  CreateOrderResponse,
  DeliveryMethod,
  PreferredContactMethod
} from "@/lib/order-types";
import {
  formatPhoneInput,
  isValidPhoneNumber,
  normalizePhoneNumber
} from "@/lib/phone";
import { getDeliveryFee } from "@/lib/pricing";
import { formatPrice } from "@/lib/products";
import type {
  Language,
  ProductId,
  ProductItem,
  SiteContent
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: SiteContent["cart"];
  products: readonly ProductItem[];
  language: Language;
};

type CheckoutValues = {
  customerName: string;
  phone: string;
  preferredContactMethod: PreferredContactMethod;
  deliveryMethod: DeliveryMethod;
  address: string;
  preferredDate: string;
  notes: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutValues | "items", string>>;

type SubmittedItem = {
  name: string;
  quantity: number;
  lineTotal: number;
};

type CartDisplayProduct = {
  id: ProductId;
  fullName: string;
  basePrice: number;
};

const contactMethods: PreferredContactMethod[] = [
  "whatsapp",
  "telegram",
  "instagram",
  "phone"
];

export function CartDrawer({
  open,
  onOpenChange,
  content,
  products,
  language
}: CartDrawerProps) {
  const {
    items,
    subtotal,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart
  } = useCart();
  const minimumPreferredDate = useMemo(() => getTomorrowDateInputValue(), []);
  const [values, setValues] = useState<CheckoutValues>({
    customerName: "",
    phone: "",
    preferredContactMethod: "whatsapp",
    deliveryMethod: "pickup",
    address: "",
    preferredDate: minimumPreferredDate,
    notes: ""
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [submittedPricing, setSubmittedPricing] = useState<{
    subtotalAmount: number;
    deliveryFee: number;
    totalAmount: number;
  } | null>(null);
  const [submittedItems, setSubmittedItems] = useState<SubmittedItem[]>([]);
  const [submitError, setSubmitError] = useState("");

  const cartProducts = useMemo(
    () =>
      items.flatMap((item) => {
        const product = findCartProduct(products, item.productId);
        return product ? [{ ...item, product }] : [];
      }),
    [items, products]
  );
  const deliveryFee = items.length ? getDeliveryFee(values.deliveryMethod) : 0;
  const total = subtotal + deliveryFee;

  function updateValue<Key extends keyof CheckoutValues>(
    key: Key,
    value: CheckoutValues[Key]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError("");
  }

  function handlePhoneBlur() {
    const formattedPhone = formatPhoneInput(values.phone);

    setValues((current) => ({ ...current, phone: formattedPhone }));

    if (isValidPhoneNumber(formattedPhone)) {
      setErrors((current) => ({ ...current, phone: undefined }));
    }
  }

  function validate() {
    const nextErrors: CheckoutErrors = {};

    if (!items.length) nextErrors.items = content.errors.items;
    if (!values.customerName.trim()) {
      nextErrors.customerName = content.errors.customerName;
    }
    if (!isValidPhoneNumber(values.phone)) {
      nextErrors.phone = content.errors.phone;
    }
    if (values.deliveryMethod === "delivery" && !values.address.trim()) {
      nextErrors.address = content.errors.address;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    const normalizedPhone = normalizePhoneNumber(values.phone);

    if (!normalizedPhone) return;

    setSubmitting(true);
    setSubmitError("");

    const payload: CreateOrderRequest = {
      customerName: values.customerName.trim(),
      phone: normalizedPhone,
      preferredContactMethod: values.preferredContactMethod,
      deliveryMethod: values.deliveryMethod,
      address:
        values.deliveryMethod === "delivery" ? values.address.trim() : undefined,
      preferredDate: values.preferredDate || undefined,
      notes: values.notes.trim() || undefined,
      language,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = (await response.json()) as CreateOrderResponse;

      if (!data.success) {
        setSubmitError(content.errors.server);
        setErrors((current) => ({
          ...current,
          customerName: data.fieldErrors?.customerName
            ? content.errors.customerName
            : current.customerName,
          phone: data.fieldErrors?.phone ? content.errors.phone : current.phone,
          address: data.fieldErrors?.address
            ? content.errors.address
            : current.address,
          items: data.fieldErrors?.items ? content.errors.items : current.items
        }));
        return;
      }

      setOrderId(data.orderId);
      setSubmittedPricing({
        subtotalAmount: data.subtotalAmount,
        deliveryFee: data.deliveryFee,
        totalAmount: data.totalAmount
      });
      setSubmittedItems(
        cartProducts.map((entry) => ({
          name: entry.product.fullName,
          quantity: entry.quantity,
          lineTotal: entry.product.basePrice * entry.quantity
        }))
      );
      clearCart();
    } catch {
      setSubmitError(content.errors.submit);
    } finally {
      setSubmitting(false);
    }
  }

  function closeAndReset() {
    onOpenChange(false);
    setTimeout(() => {
      setOrderId(null);
      setSubmittedPricing(null);
      setSubmittedItems([]);
      setSubmitError("");
      setErrors({});
    }, 250);
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Закрыть корзину"
            className="absolute inset-0 bg-espresso/45 backdrop-blur-sm"
            onClick={closeAndReset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 230 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col overflow-hidden bg-cream shadow-glow sm:rounded-l-[2rem]"
            aria-label={content.title}
          >
            <div className="flex items-center justify-between gap-3 border-b border-cocoa/10 px-4 py-3 sm:px-7 sm:py-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-caramel sm:tracking-[0.24em]">
                  {content.eyebrow}
                </p>
                <h2 className="mt-1 font-serif text-2xl text-cocoa sm:text-3xl">
                  {content.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeAndReset}
                className="grid h-11 w-11 place-items-center rounded-full border border-cocoa/10 bg-white/60 text-cocoa transition hover:bg-white"
                aria-label={content.close}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-7 sm:py-5">
              {orderId ? (
                <Confirmation
                  orderId={orderId}
                  pricing={submittedPricing}
                  items={submittedItems}
                  content={content}
                  onClose={closeAndReset}
                />
              ) : (
                <>
                  {items.length ? (
                    <div className="grid gap-4">
                      {cartProducts.map((entry) =>
                        entry ? (
                          <div
                            key={entry.productId}
                            className="rounded-2xl border border-cocoa/10 bg-white/62 p-4 sm:rounded-3xl"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <h3 className="break-words font-serif text-xl text-cocoa">
                                  {entry.product.fullName}
                                </h3>
                                <p className="mt-1 text-sm text-cocoa/58">
                                  {formatPrice(entry.product.basePrice)}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(entry.productId)}
                                className="rounded-full p-2 text-cocoa/45 transition hover:bg-rose/10 hover:text-rose"
                                aria-label={content.remove}
                              >
                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                              <div className="inline-flex items-center rounded-full border border-cocoa/10 bg-cream p-1">
                                <QuantityButton onClick={() => decreaseItem(entry.productId)}>
                                  <Minus className="h-4 w-4" aria-hidden="true" />
                                </QuantityButton>
                                <span className="min-w-10 text-center text-sm font-bold text-cocoa">
                                  {entry.quantity}
                                </span>
                                <QuantityButton onClick={() => increaseItem(entry.productId)}>
                                  <Plus className="h-4 w-4" aria-hidden="true" />
                                </QuantityButton>
                              </div>
                              <p className="font-bold text-caramel">
                                {formatPrice(entry.product.basePrice * entry.quantity)}
                              </p>
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-cocoa/18 bg-white/50 p-6 text-center sm:rounded-3xl sm:p-8">
                      <ShoppingBag className="mx-auto h-10 w-10 text-caramel" />
                      <h3 className="mt-4 font-serif text-2xl text-cocoa">
                        {content.emptyTitle}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-cocoa/62">
                        {content.emptyText}
                      </p>
                    </div>
                  )}

                  {items.length ? (
                    <>
                      <div className="mt-6 rounded-2xl bg-cocoa p-4 text-cream sm:rounded-3xl sm:p-5">
                        <div className="space-y-3 text-sm">
                          <SummaryRow
                            label={content.subtotal}
                            value={formatPrice(subtotal)}
                          />
                          <SummaryRow
                            label={content.deliveryFee}
                            value={
                              values.deliveryMethod === "delivery"
                                ? formatPrice(deliveryFee)
                                : formatPrice(0)
                            }
                            note={
                              values.deliveryMethod === "delivery"
                                ? content.deliveryFeeLabel
                                : content.pickupFeeLabel
                            }
                          />
                          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-cream/15 pt-3">
                            <span className="text-cream/75">{content.total}</span>
                            <strong className="font-serif text-2xl sm:text-3xl">
                              {formatPrice(total)}
                            </strong>
                          </div>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-cream/68">
                          {content.noPayment}
                        </p>
                      </div>

                      <motion.form
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 grid gap-4"
                        onSubmit={handleSubmit}
                        noValidate
                      >
                        <h3 className="font-serif text-2xl text-cocoa">
                          {content.checkout}
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field
                            label={content.name}
                            error={errors.customerName}
                            required
                          >
                            <input
                              required
                              value={values.customerName}
                              onChange={(event) =>
                                updateValue("customerName", event.target.value)
                              }
                              className={inputClass(Boolean(errors.customerName))}
                              placeholder={content.namePlaceholder}
                            />
                          </Field>
                          <Field label={content.phone} error={errors.phone} required>
                            <input
                              required
                              type="tel"
                              inputMode="tel"
                              autoComplete="tel"
                              value={values.phone}
                              onChange={(event) =>
                                updateValue(
                                  "phone",
                                  formatPhoneInput(event.target.value)
                                )
                              }
                              onBlur={handlePhoneBlur}
                              className={inputClass(Boolean(errors.phone))}
                              placeholder={content.phonePlaceholder}
                            />
                          </Field>
                        </div>

                        <Field label={content.contactMethod}>
                          <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:grid-cols-4">
                            {contactMethods.map((method) => (
                              <ChoiceButton
                                key={method}
                                active={values.preferredContactMethod === method}
                                onClick={() =>
                                  updateValue("preferredContactMethod", method)
                                }
                              >
                                {content.methods[method]}
                              </ChoiceButton>
                            ))}
                          </div>
                        </Field>

                        <Field label={content.deliveryMethod} required>
                          <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-2">
                            <ChoiceButton
                              active={values.deliveryMethod === "pickup"}
                              onClick={() => updateValue("deliveryMethod", "pickup")}
                            >
                              {content.pickup}
                            </ChoiceButton>
                            <ChoiceButton
                              active={values.deliveryMethod === "delivery"}
                              onClick={() =>
                                updateValue("deliveryMethod", "delivery")
                              }
                            >
                              {content.delivery}
                            </ChoiceButton>
                          </div>
                        </Field>

                        {values.deliveryMethod === "delivery" ? (
                          <Field
                            label={content.address}
                            error={errors.address}
                            required
                          >
                            <input
                              required
                              value={values.address}
                              onChange={(event) =>
                                updateValue("address", event.target.value)
                              }
                              className={inputClass(Boolean(errors.address))}
                              placeholder={content.addressPlaceholder}
                            />
                          </Field>
                        ) : null}

                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label={content.preferredDate}>
                            <input
                              type="date"
                              min={minimumPreferredDate}
                              value={values.preferredDate}
                              onChange={(event) =>
                                updateValue(
                                  "preferredDate",
                                  normalizePreferredDate(
                                    event.target.value,
                                    minimumPreferredDate
                                  )
                                )
                              }
                              className={inputClass(false)}
                            />
                          </Field>
                          <Field label={content.notes}>
                            <textarea
                              value={values.notes}
                              onChange={(event) =>
                                updateValue("notes", event.target.value)
                              }
                              className={cn(
                                inputClass(false),
                                "min-h-[92px] resize-none"
                              )}
                              placeholder={content.notesPlaceholder}
                            />
                          </Field>
                        </div>

                        {errors.items ? (
                          <p className="text-sm text-rose">{errors.items}</p>
                        ) : null}
                        {submitError ? (
                          <p className="rounded-2xl bg-rose/10 px-4 py-3 text-sm text-rose">
                            {submitError}
                          </p>
                        ) : null}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex min-h-12 items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-espresso disabled:pointer-events-none disabled:opacity-55"
                        >
                          {submitting ? content.submitting : content.submit}
                          <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                        </button>
                      </motion.form>
                    </>
                  ) : null}
                </>
              )}
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function Confirmation({
  orderId,
  pricing,
  items,
  content,
  onClose
}: {
  orderId: string;
  pricing: {
    subtotalAmount: number;
    deliveryFee: number;
    totalAmount: number;
  } | null;
  items: SubmittedItem[];
  content: SiteContent["cart"];
  onClose: () => void;
}) {
  const total = pricing ? formatPrice(pricing.totalAmount) : "";

  return (
    <div className="rounded-2xl border border-cocoa/10 bg-white/70 p-5 text-center shadow-soft sm:rounded-[1.75rem] sm:p-6">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage/15 text-sage">
        <Check className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-serif text-2xl text-cocoa sm:text-3xl">
        {content.confirmationTitle}
      </h3>
      <p className="mt-3 text-sm leading-7 text-cocoa/68">
        {content.orderNumber}:{" "}
        <span className="font-bold text-cocoa">{orderId}</span>.{" "}
        {content.confirmationText}
      </p>
      {pricing ? (
        <div className="mt-5 rounded-2xl bg-cream px-4 py-3 text-sm text-cocoa/75">
          {items.length ? (
            <div className="mb-3 space-y-2 border-b border-almond/60 pb-3 text-left">
              {items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-wrap items-start justify-between gap-2"
                >
                  <span className="font-medium text-cocoa">
                    {item.name}
                    <span className="ml-2 text-cocoa/55">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-cocoa">
                    {formatPrice(item.lineTotal)}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
          <div className="flex justify-between gap-4">
            <span>{content.subtotal}</span>
            <span className="font-semibold text-cocoa">
              {formatPrice(pricing.subtotalAmount)}
            </span>
          </div>
          <div className="mt-2 flex justify-between gap-4">
            <span>{content.deliveryFee}</span>
            <span className="font-semibold text-cocoa">
              {formatPrice(pricing.deliveryFee)}
            </span>
          </div>
          <div className="mt-2 flex justify-between gap-4 border-t border-almond/60 pt-2">
            <span>{content.confirmationTotal}</span>
            <span className="font-bold text-caramel">{total}</span>
          </div>
        </div>
      ) : null}
      <ContactButtons
        labels={content.contactLabels}
        className="mt-6 justify-center"
      />
      <button
        type="button"
        onClick={onClose}
        className="mt-6 text-sm font-bold text-caramel transition hover:text-cocoa"
      >
        {content.back}
      </button>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  note
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-cream/70">
        {label}
        {note ? (
          <span className="mt-1 block text-xs text-cream/52">{note}</span>
        ) : null}
      </span>
      <span className="font-semibold text-cream">{value}</span>
    </div>
  );
}

function QuantityButton({
  onClick,
  children
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-full text-cocoa transition hover:bg-white"
    >
      {children}
    </button>
  );
}

function Field({
  label,
  required = false,
  error,
  children
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-cocoa">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      {children}
      {error ? <span className="mt-2 block text-sm text-rose">{error}</span> : null}
    </label>
  );
}

function ChoiceButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 w-full rounded-full border px-4 text-sm font-semibold transition",
        active
          ? "border-cocoa bg-cocoa text-cream"
          : "border-cocoa/12 bg-white/65 text-cocoa/70 hover:border-caramel/40 hover:bg-white hover:text-cocoa"
      )}
    >
      {children}
    </button>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full min-w-0 rounded-2xl border bg-white/72 px-4 py-3 text-sm text-cocoa shadow-sm transition placeholder:text-cocoa/35 focus:border-caramel focus:outline-none focus:ring-4 focus:ring-caramel/10",
    hasError ? "border-rose/70" : "border-cocoa/12"
  );
}

function getTomorrowDateInputValue() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function normalizePreferredDate(value: string, minimumDate: string) {
  return value && value < minimumDate ? minimumDate : value;
}

function findCartProduct(
  products: readonly ProductItem[],
  productId: ProductId
): CartDisplayProduct | null {
  for (const product of products) {
    if (product.id === productId) {
      return product;
    }

    const variants = "variants" in product ? product.variants : undefined;
    const variant = variants?.find((candidate) => candidate.id === productId);

    if (variant) {
      return variant;
    }
  }

  return null;
}
