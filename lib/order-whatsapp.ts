type WhatsAppOrderItem = {
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};

type WhatsAppOrderSummary = {
  id: string;
  customer_name: string;
  phone: string;
  delivery_method: string;
  preferred_date: string | null;
  total_amount: number;
  items: WhatsAppOrderItem[];
};

export function buildAdminWhatsAppUrl(
  order: WhatsAppOrderSummary,
  adminWhatsAppNumber = process.env.ADMIN_WHATSAPP_NUMBER
) {
  const normalizedNumber = normalizeWhatsAppNumber(adminWhatsAppNumber);

  if (!normalizedNumber) {
    return null;
  }

  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(
    buildOrderWhatsAppMessage(order)
  )}`;
}

export function buildOrderWhatsAppMessage(order: WhatsAppOrderSummary) {
  const products = order.items
    .map(
      (item) =>
        `- ${item.product_name} x${item.quantity} (${formatCurrency(item.line_total)})`
    )
    .join("\n");

  return [
    "Nouvelle commande Oreshki",
    `Commande: ${order.id}`,
    `Client: ${order.customer_name}`,
    `Téléphone: ${order.phone}`,
    `Mode: ${formatDeliveryMethod(order.delivery_method)}`,
    `Date souhaitée: ${order.preferred_date || "-"}`,
    "Produits:",
    products || "-",
    `Total: ${formatCurrency(order.total_amount)}`
  ].join("\n");
}

function normalizeWhatsAppNumber(value: string | undefined) {
  return value?.replace(/[^\d]/g, "") || null;
}

function formatDeliveryMethod(value: string) {
  return value === "delivery" ? "Livraison" : "Retrait";
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}
