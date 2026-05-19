import type {
  CartOrderItem,
  CheckoutCustomer,
  CreateOrderRequest,
  CreateOrderResponse
} from "@/lib/order-types";
import { normalizeOrderLanguage, type OrderLanguage } from "@/lib/order-language";
import { normalizePhoneNumber } from "@/lib/phone";
import { getDeliveryFee } from "@/lib/pricing";
import {
  getProductOrderName,
  productById,
  type ProductId
} from "@/lib/products";
import {
  getMinimumPreferredDateInputValue,
  isPreferredDateAllowed
} from "@/lib/preferred-date";

const trustedProductPrices: Partial<Record<ProductId, number>> = {
  "napoleon-blanc": 2,
  "napoleon-velvet-rouge": 2.5,
  "napoleon-chocolat": 2,
  "napoleon-cafe": 2,
  "napoleon-pistache": 2.5,
  "kotleti-kievski": 4,
  pelmeni: 13,
  "pelmeni-poulet": 12,
  "pelmeni-mix-porc-boeuf": 13,
  "pelmeni-boeuf": 14,
  "vareniki-fromage": 11,
  "vareniki-pommes-terre": 9,
  golubci: 17,
  pirojki: 2,
  blinchiki: 1,
  "blinchiki-viande": 1,
  "blinchiki-fromage": 1,
  "blinchiki-champignons": 1
};

type FieldErrors = NonNullable<
  Extract<CreateOrderResponse, { success: false }>["fieldErrors"]
>;

export type RawOrderBody = Partial<CreateOrderRequest> & {
  customer_name?: string;
  email?: string;
  preferred_contact_method?: string;
  delivery_method?: string;
  preferred_date?: string;
  privacy_consent?: boolean;
};

export function normalizeOrderBody(
  body: RawOrderBody
): Partial<CreateOrderRequest> {
  return {
    customerName: body.customerName ?? body.customer_name,
    phone: body.phone,
    preferredContactMethod:
      body.preferredContactMethod ??
      (body.preferred_contact_method as CheckoutCustomer["preferredContactMethod"]),
    deliveryMethod:
      body.deliveryMethod ??
      (body.delivery_method as CheckoutCustomer["deliveryMethod"]),
    address: body.address,
    preferredDate: body.preferredDate ?? body.preferred_date,
    notes: body.notes,
    language: body.language,
    privacyConsent: body.privacyConsent ?? body.privacy_consent,
    items: body.items
  };
}

export function validateOrder(
  body: Partial<CreateOrderRequest>,
  minimumPreferredDate = getMinimumPreferredDateInputValue()
) {
  const errors: FieldErrors = {};

  if (!body.customerName?.trim()) {
    errors.customerName = "Customer name is required";
  }

  const normalizedPhone = body.phone ? normalizePhoneNumber(body.phone) : null;

  if (!normalizedPhone) {
    errors.phone = "Phone is invalid";
  }

  if (
    !body.preferredContactMethod ||
    !["whatsapp", "telegram", "instagram", "phone"].includes(
      body.preferredContactMethod
    )
  ) {
    errors.preferredContactMethod = "Preferred contact method is required";
  }

  if (
    !body.deliveryMethod ||
    !["pickup", "delivery"].includes(body.deliveryMethod)
  ) {
    errors.deliveryMethod = "Delivery method is required";
  }

  if (body.deliveryMethod === "delivery" && !body.address?.trim()) {
    errors.address = "Address is required for delivery";
  }
  if (
    body.preferredDate &&
    !isPreferredDateAllowed(body.preferredDate, minimumPreferredDate)
  ) {
    errors.preferredDate = "Preferred date is too early";
  }
  if (body.privacyConsent !== true) {
    errors.privacyConsent = "Privacy consent is required";
  }

  const items = normalizeItems(body.items);

  if (!items.length) {
    errors.items = "Cart is empty";
  }

  for (const item of items) {
    const product = productById.get(item.productId);

    if (!product || !product.available || item.quantity < 1) {
      errors.items = "Cart contains invalid items";
      break;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false as const, errors };
  }

  return {
    success: true as const,
    data: {
      customerName: body.customerName!.trim(),
      phone: normalizedPhone!,
      preferredContactMethod: body.preferredContactMethod!,
      deliveryMethod: body.deliveryMethod!,
      address: body.address?.trim(),
      preferredDate: body.preferredDate,
      notes: body.notes?.trim(),
      language: normalizeOrderLanguage(body.language),
      privacyConsent: body.privacyConsent
    },
    items
  };
}

export function createPrivacyConsentTimestamp(now = new Date()) {
  return now.toISOString();
}

export function buildOrderLineItems(
  items: { productId: ProductId; quantity: number }[],
  language: OrderLanguage
) {
  return items.map((item) => {
    const product = productById.get(item.productId);

    if (!product || !product.available) {
      throw new Error(`Product validation failed for ${item.productId}`);
    }

    const unitPrice = getTrustedProductPrice(product.id);
    const lineTotal = unitPrice * item.quantity;

    return {
      product_id: product.id,
      product_name: getProductOrderName(product.id, language),
      quantity: item.quantity,
      unit_price: unitPrice,
      line_total: lineTotal
    };
  });
}

export function calculateSubmissionPricing(
  items: { line_total: number }[],
  deliveryMethod: CheckoutCustomer["deliveryMethod"]
) {
  const subtotal = items.reduce((sum, item) => sum + item.line_total, 0);
  const deliveryFee = getDeliveryFee(deliveryMethod, subtotal);

  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee
  };
}

function normalizeItems(items: CartOrderItem[] | undefined) {
  return (
    items
      ?.map((item) => ({
        productId: item.productId as ProductId,
        quantity: Number(item.quantity)
      }))
      .filter(
        (item) =>
          Number.isInteger(item.quantity) &&
          item.quantity > 0 &&
          productById.has(item.productId)
      ) ?? []
  );
}

function getTrustedProductPrice(productId: ProductId) {
  const product = productById.get(productId);

  if (!product) {
    throw new Error(`Trusted price missing for product ${productId}`);
  }

  return trustedProductPrices[productId] ?? product.price;
}
