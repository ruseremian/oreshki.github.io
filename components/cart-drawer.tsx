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
import { formatPrice, productById } from "@/lib/products";
import { cn } from "@/lib/utils";

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type CheckoutValues = {
  customerName: string;
  phone: string;
  email: string;
  preferredContactMethod: PreferredContactMethod;
  deliveryMethod: DeliveryMethod;
  address: string;
  preferredDate: string;
  notes: string;
};

type CheckoutErrors = Partial<Record<keyof CheckoutValues | "items", string>>;

const contactMethods: PreferredContactMethod[] = [
  "whatsapp",
  "telegram",
  "instagram",
  "phone"
];

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const {
    items,
    total,
    increaseItem,
    decreaseItem,
    removeItem,
    clearCart
  } = useCart();
  const [values, setValues] = useState<CheckoutValues>({
    customerName: "",
    phone: "",
    email: "",
    preferredContactMethod: "whatsapp",
    deliveryMethod: "pickup",
    address: "",
    preferredDate: "",
    notes: ""
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");

  const cartProducts = useMemo(
    () =>
      items
        .map((item) => {
          const product = productById.get(item.productId);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean),
    [items]
  );

  function updateValue<Key extends keyof CheckoutValues>(
    key: Key,
    value: CheckoutValues[Key]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError("");
  }

  function validate() {
    const nextErrors: CheckoutErrors = {};

    if (!items.length) nextErrors.items = "Корзина пуста";
    if (!values.customerName.trim()) nextErrors.customerName = "Укажите имя";
    if (!values.phone.trim()) nextErrors.phone = "Укажите телефон";
    if (values.deliveryMethod === "delivery" && !values.address.trim()) {
      nextErrors.address = "Укажите адрес доставки";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setSubmitError("");

    const payload: CreateOrderRequest = {
      customerName: values.customerName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim() || undefined,
      preferredContactMethod: values.preferredContactMethod,
      deliveryMethod: values.deliveryMethod,
      address:
        values.deliveryMethod === "delivery" ? values.address.trim() : undefined,
      preferredDate: values.preferredDate || undefined,
      notes: values.notes.trim() || undefined,
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

      if (!data.ok) {
        setSubmitError(data.error);
        setErrors((current) => ({ ...current, ...data.fieldErrors }));
        return;
      }

      setOrderId(data.orderId);
      clearCart();
    } catch {
      setSubmitError("Не удалось отправить заказ. Проверьте соединение.");
    } finally {
      setSubmitting(false);
    }
  }

  function closeAndReset() {
    onOpenChange(false);
    setTimeout(() => {
      setOrderId(null);
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
            aria-label="Корзина и оформление заказа"
          >
            <div className="flex items-center justify-between border-b border-cocoa/10 px-5 py-4 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-caramel">
                  Заказ
                </p>
                <h2 className="mt-1 font-serif text-3xl text-cocoa">Корзина</h2>
              </div>
              <button
                type="button"
                onClick={closeAndReset}
                className="grid h-11 w-11 place-items-center rounded-full border border-cocoa/10 bg-white/60 text-cocoa transition hover:bg-white"
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-7">
              {orderId ? (
                <Confirmation orderId={orderId} onClose={closeAndReset} />
              ) : (
                <>
                  {items.length ? (
                    <div className="grid gap-4">
                      {cartProducts.map((entry) =>
                        entry ? (
                          <div
                            key={entry.productId}
                            className="rounded-3xl border border-cocoa/10 bg-white/62 p-4"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="font-serif text-xl text-cocoa">
                                  {entry.product.name}
                                </h3>
                                <p className="mt-1 text-sm text-cocoa/58">
                                  {formatPrice(entry.product.price)}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(entry.productId)}
                                className="rounded-full p-2 text-cocoa/45 transition hover:bg-rose/10 hover:text-rose"
                                aria-label="Удалить товар"
                              >
                                <Trash2 className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
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
                                {formatPrice(entry.product.price * entry.quantity)}
                              </p>
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-dashed border-cocoa/18 bg-white/50 p-8 text-center">
                      <ShoppingBag className="mx-auto h-10 w-10 text-caramel" />
                      <h3 className="mt-4 font-serif text-2xl text-cocoa">
                        Корзина пуста
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-cocoa/62">
                        Добавьте набор орешков из раздела продуктов, и здесь
                        появится оформление заказа.
                      </p>
                    </div>
                  )}

                  <div className="mt-6 rounded-3xl bg-cocoa p-5 text-cream">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-cream/70">Итого</span>
                      <strong className="font-serif text-3xl">
                        {formatPrice(total)}
                      </strong>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-cream/68">
                      Оплата онлайн пока не подключена. Мы подтвердим детали и
                      способ оплаты после заявки.
                    </p>
                  </div>

                  <form className="mt-6 grid gap-4" onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Имя" error={errors.customerName}>
                        <input
                          value={values.customerName}
                          onChange={(event) =>
                            updateValue("customerName", event.target.value)
                          }
                          className={inputClass(Boolean(errors.customerName))}
                          placeholder="Как к вам обращаться"
                        />
                      </Field>
                      <Field label="Телефон" error={errors.phone}>
                        <input
                          value={values.phone}
                          onChange={(event) => updateValue("phone", event.target.value)}
                          className={inputClass(Boolean(errors.phone))}
                          placeholder="+33 ..."
                        />
                      </Field>
                    </div>

                    <Field label="Email, если удобно">
                      <input
                        type="email"
                        value={values.email}
                        onChange={(event) => updateValue("email", event.target.value)}
                        className={inputClass(false)}
                        placeholder="name@example.com"
                      />
                    </Field>

                    <Field label="Удобный способ связи">
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {contactMethods.map((method) => (
                          <ChoiceButton
                            key={method}
                            active={values.preferredContactMethod === method}
                            onClick={() =>
                              updateValue("preferredContactMethod", method)
                            }
                          >
                            {methodLabel(method)}
                          </ChoiceButton>
                        ))}
                      </div>
                    </Field>

                    <Field label="Получение">
                      <div className="grid grid-cols-2 gap-2">
                        <ChoiceButton
                          active={values.deliveryMethod === "pickup"}
                          onClick={() => updateValue("deliveryMethod", "pickup")}
                        >
                          Самовывоз
                        </ChoiceButton>
                        <ChoiceButton
                          active={values.deliveryMethod === "delivery"}
                          onClick={() => updateValue("deliveryMethod", "delivery")}
                        >
                          Доставка
                        </ChoiceButton>
                      </div>
                    </Field>

                    {values.deliveryMethod === "delivery" ? (
                      <Field label="Адрес доставки" error={errors.address}>
                        <input
                          value={values.address}
                          onChange={(event) =>
                            updateValue("address", event.target.value)
                          }
                          className={inputClass(Boolean(errors.address))}
                          placeholder="Улица, дом, город"
                        />
                      </Field>
                    ) : null}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Желаемая дата">
                        <input
                          type="date"
                          value={values.preferredDate}
                          onChange={(event) =>
                            updateValue("preferredDate", event.target.value)
                          }
                          className={inputClass(false)}
                        />
                      </Field>
                      <Field label="Комментарий">
                        <textarea
                          value={values.notes}
                          onChange={(event) => updateValue("notes", event.target.value)}
                          className={cn(inputClass(false), "min-h-[92px] resize-none")}
                          placeholder="Время, упаковка, пожелания"
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
                      {submitting ? "Отправляем..." : "Отправить заказ"}
                      <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
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
  onClose
}: {
  orderId: string;
  onClose: () => void;
}) {
  return (
    <div className="rounded-[1.75rem] border border-cocoa/10 bg-white/70 p-6 text-center shadow-soft">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sage/15 text-sage">
        <Check className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-serif text-3xl text-cocoa">Заказ принят</h3>
      <p className="mt-3 text-sm leading-7 text-cocoa/68">
        Номер заказа: <span className="font-bold text-cocoa">{orderId}</span>.
        Мы скоро свяжемся с вами, чтобы подтвердить детали.
      </p>
      <ContactButtons
        labels={{ instagram: "Instagram", telegram: "Telegram", whatsapp: "WhatsApp" }}
        className="mt-6 justify-center"
        message={`Здравствуйте! Я только что оформила заказ ${orderId} на сайте.`}
      />
      <button
        type="button"
        onClick={onClose}
        className="mt-6 text-sm font-bold text-caramel transition hover:text-cocoa"
      >
        Вернуться на сайт
      </button>
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
  error,
  children
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-cocoa">{label}</span>
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
        "min-h-11 rounded-full border px-4 text-sm font-semibold transition",
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
    "w-full rounded-2xl border bg-white/72 px-4 py-3 text-sm text-cocoa shadow-sm transition placeholder:text-cocoa/35 focus:border-caramel focus:outline-none focus:ring-4 focus:ring-caramel/10",
    hasError ? "border-rose/70" : "border-cocoa/12"
  );
}

function methodLabel(method: PreferredContactMethod) {
  const labels: Record<PreferredContactMethod, string> = {
    whatsapp: "WhatsApp",
    telegram: "Telegram",
    instagram: "Instagram",
    phone: "Телефон"
  };

  return labels[method];
}
