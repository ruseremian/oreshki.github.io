"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, MessageCircle, Send } from "lucide-react";

import {
  ContactMethod,
  createTelegramLink,
  createWhatsAppLink,
  FulfillmentMethod,
  ProductId,
  SiteContent
} from "@/lib/site-data";
import { cn } from "@/lib/utils";

type OrderFormProps = {
  content: SiteContent["order"];
  products: SiteContent["products"]["items"];
  selectedProductId: ProductId;
  language: "ru" | "fr";
  onProductChange: (productId: ProductId) => void;
};

type OrderValues = {
  name: string;
  phone: string;
  contactMethod: ContactMethod;
  productId: ProductId;
  quantity: number;
  fulfillment: FulfillmentMethod;
  address: string;
  date: string;
  notes: string;
};

type OrderErrors = Partial<Record<keyof OrderValues, string>>;

const contactMethods: ContactMethod[] = [
  "whatsapp",
  "telegram",
  "instagram",
  "phone"
];

const fulfillmentMethods: FulfillmentMethod[] = ["pickup", "delivery"];

export function OrderForm({
  content,
  products,
  selectedProductId,
  language,
  onProductChange
}: OrderFormProps) {
  const [values, setValues] = useState<OrderValues>({
    name: "",
    phone: "",
    contactMethod: "whatsapp",
    productId: selectedProductId,
    quantity: 1,
    fulfillment: "pickup",
    address: "",
    date: "",
    notes: ""
  });
  const [errors, setErrors] = useState<OrderErrors>({});
  const [isGenerated, setIsGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setValues((current) =>
      current.productId === selectedProductId
        ? current
        : { ...current, productId: selectedProductId }
    );
    setIsGenerated(false);
  }, [selectedProductId]);

  const selectedProduct =
    products.find((product) => product.id === values.productId) ?? products[0];
  const total = selectedProduct.basePrice * values.quantity;

  const formattedTotal = new Intl.NumberFormat(language === "fr" ? "fr-FR" : "ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(total);

  const orderMessage = useMemo(() => {
    const deliveryLine =
      values.fulfillment === "delivery"
        ? `${content.fields.address}: ${values.address || "-"}`
        : "";

    return [
      content.messageTitle,
      "",
      `${content.fields.name}: ${values.name || "-"}`,
      `${content.fields.phone}: ${values.phone || "-"}`,
      `${content.fields.contactMethod}: ${content.methods[values.contactMethod]}`,
      `${content.fields.product}: ${selectedProduct.title}`,
      `${content.fields.quantity}: ${values.quantity}`,
      `${content.fields.fulfillment}: ${content.fulfillment[values.fulfillment]}`,
      deliveryLine,
      `${content.fields.date}: ${values.date || "-"}`,
      `${content.fields.notes}: ${values.notes || "-"}`,
      `${content.totalLabel}: ${formattedTotal}`,
      content.noPayment
    ]
      .filter(Boolean)
      .join("\n");
  }, [content, formattedTotal, selectedProduct.title, values]);

  function updateValue<Key extends keyof OrderValues>(
    key: Key,
    value: OrderValues[Key]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setIsGenerated(false);

    if (key === "productId") {
      onProductChange(value as ProductId);
    }
  }

  function validate() {
    const nextErrors: OrderErrors = {};

    if (!values.name.trim()) nextErrors.name = content.errors.name;
    if (!values.phone.trim()) nextErrors.phone = content.errors.phone;
    if (!values.date) nextErrors.date = content.errors.date;
    if (values.quantity < 1) nextErrors.quantity = content.errors.quantity;
    if (values.fulfillment === "delivery" && !values.address.trim()) {
      nextErrors.address = content.errors.address;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCopied(false);
    setIsGenerated(validate());
  }

  async function copyMessage() {
    await navigator.clipboard.writeText(orderMessage);
    setCopied(true);
  }

  return (
    <section id="order" className="bg-white/42 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-[1.75rem] border border-cocoa/10 bg-cream p-5 shadow-soft sm:p-8"
          >
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-caramel">
              {content.eyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-tight text-cocoa sm:text-4xl md:text-5xl">
              {content.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-cocoa/70">
              {content.description}
            </p>

            <form className="mt-8 grid gap-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={content.fields.name} error={errors.name}>
                  <input
                    value={values.name}
                    onChange={(event) => updateValue("name", event.target.value)}
                    placeholder={content.placeholders.name}
                    className={inputClass(Boolean(errors.name))}
                  />
                </Field>
                <Field label={content.fields.phone} error={errors.phone}>
                  <input
                    value={values.phone}
                    onChange={(event) => updateValue("phone", event.target.value)}
                    placeholder={content.placeholders.phone}
                    className={inputClass(Boolean(errors.phone))}
                  />
                </Field>
              </div>

              <Field label={content.fields.contactMethod}>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {contactMethods.map((method) => (
                    <ChoiceButton
                      key={method}
                      active={values.contactMethod === method}
                      onClick={() => updateValue("contactMethod", method)}
                    >
                      {content.methods[method]}
                    </ChoiceButton>
                  ))}
                </div>
              </Field>

              <div className="grid gap-5 sm:grid-cols-[1fr_150px]">
                <Field label={content.fields.product}>
                  <select
                    value={values.productId}
                    onChange={(event) =>
                      updateValue("productId", event.target.value as ProductId)
                    }
                    className={inputClass(false)}
                  >
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.title}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={content.fields.quantity} error={errors.quantity}>
                  <input
                    type="number"
                    min={1}
                    value={values.quantity}
                    onChange={(event) =>
                      updateValue("quantity", Number(event.target.value))
                    }
                    className={inputClass(Boolean(errors.quantity))}
                  />
                </Field>
              </div>

              <Field label={content.fields.fulfillment}>
                <div className="grid grid-cols-2 gap-2">
                  {fulfillmentMethods.map((method) => (
                    <ChoiceButton
                      key={method}
                      active={values.fulfillment === method}
                      onClick={() => updateValue("fulfillment", method)}
                    >
                      {content.fulfillment[method]}
                    </ChoiceButton>
                  ))}
                </div>
              </Field>

              {values.fulfillment === "delivery" ? (
                <Field label={content.fields.address} error={errors.address}>
                  <input
                    value={values.address}
                    onChange={(event) => updateValue("address", event.target.value)}
                    placeholder={content.placeholders.address}
                    className={inputClass(Boolean(errors.address))}
                  />
                </Field>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={content.fields.date} error={errors.date}>
                  <input
                    type="date"
                    value={values.date}
                    onChange={(event) => updateValue("date", event.target.value)}
                    className={inputClass(Boolean(errors.date))}
                  />
                </Field>
                <Field label={content.fields.notes}>
                  <textarea
                    value={values.notes}
                    onChange={(event) => updateValue("notes", event.target.value)}
                    placeholder={content.placeholders.notes}
                    rows={3}
                    className={cn(inputClass(false), "min-h-[96px] resize-none")}
                  />
                </Field>
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel"
              >
                {content.submit}
              </button>
            </form>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-[1.75rem] border border-cocoa/10 bg-white/70 p-5 shadow-soft backdrop-blur sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-serif text-3xl text-cocoa">
                {content.summaryTitle}
              </h3>
              <span className="rounded-full bg-sage/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-sage">
                {content.noPayment}
              </span>
            </div>

            <dl className="mt-7 grid gap-4 text-sm">
              <SummaryRow label={content.fields.name} value={values.name || "-"} />
              <SummaryRow label={content.fields.product} value={selectedProduct.title} />
              <SummaryRow
                label={content.fields.quantity}
                value={String(values.quantity || 1)}
              />
              <SummaryRow
                label={content.fields.fulfillment}
                value={content.fulfillment[values.fulfillment]}
              />
              <SummaryRow label={content.fields.date} value={values.date || "-"} />
              <SummaryRow label={content.fields.notes} value={values.notes || "-"} />
              <SummaryRow label={content.totalLabel} value={formattedTotal} strong />
            </dl>

            <div className="mt-7 rounded-3xl bg-cream p-4 text-sm leading-7 text-cocoa/72">
              <pre className="whitespace-pre-wrap font-sans">{orderMessage}</pre>
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href={createWhatsAppLink(orderMessage)}
                className={actionClass(isGenerated)}
                aria-disabled={!isGenerated}
              >
                <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                {content.sendWhatsApp}
              </a>
              <a
                href={createTelegramLink(orderMessage)}
                className={actionClass(isGenerated, true)}
                aria-disabled={!isGenerated}
              >
                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                {content.sendTelegram}
              </a>
              <button
                type="button"
                onClick={copyMessage}
                disabled={!isGenerated}
                className={actionClass(isGenerated, true)}
              >
                {copied ? (
                  <Check className="mr-2 h-4 w-4" aria-hidden="true" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                {copied ? content.copied : content.copy}
              </button>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
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
        "min-h-11 rounded-full border px-4 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel",
        active
          ? "border-cocoa bg-cocoa text-cream shadow-sm"
          : "border-cocoa/12 bg-white/65 text-cocoa/70 hover:border-caramel/40 hover:bg-white hover:text-cocoa"
      )}
    >
      {children}
    </button>
  );
}

function SummaryRow({
  label,
  value,
  strong = false
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-cocoa/8 pb-3">
      <dt className="text-cocoa/58">{label}</dt>
      <dd
        className={cn(
          "max-w-[60%] text-right text-cocoa",
          strong && "font-bold text-caramel"
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-2xl border bg-white/72 px-4 py-3 text-sm text-cocoa shadow-sm transition placeholder:text-cocoa/35 focus:border-caramel focus:outline-none focus:ring-4 focus:ring-caramel/10",
    hasError ? "border-rose/70" : "border-cocoa/12"
  );
}

function actionClass(enabled: boolean, secondary = false) {
  return cn(
    "inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel",
    secondary
      ? "border border-cocoa/15 bg-white/70 text-cocoa hover:border-caramel/40 hover:bg-white"
      : "bg-cocoa text-cream shadow-soft hover:bg-espresso",
    enabled ? "hover:-translate-y-0.5" : "pointer-events-none opacity-45"
  );
}
