import type { DeliveryMethod } from "@/lib/order-types";

const TELEGRAM_MESSAGE_LIMIT = 4096;

type TelegramOrderItem = {
  product_name: string;
  quantity: number;
};

type TelegramOrderNotification = {
  orderId: string;
  customerName: string;
  phone: string;
  deliveryMethod: DeliveryMethod;
  address?: string | null;
  items: TelegramOrderItem[];
  subtotalAmount: number;
  deliveryFee: number;
  totalAmount: number;
  notes?: string | null;
};

type TelegramNotificationResult =
  | { success: true; messageIds: number[] }
  | { success: false; error: string };

export async function sendTelegramNotification(
  order: TelegramOrderNotification
): Promise<TelegramNotificationResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return {
      success: false,
      error: "Missing Telegram environment variables"
    };
  }

  const messages = splitTelegramMessage(buildTelegramMessage(order));
  const messageIds: number[] = [];

  for (const text of messages) {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML"
        })
      }
    );

    const payload = await response.json().catch(() => null);

    if (!response.ok || !isTelegramSuccessPayload(payload)) {
      return {
        success: false,
        error: `Telegram API request failed with ${response.status}: ${getTelegramErrorMessage(payload)}`
      };
    }

    messageIds.push(payload.result.message_id);
  }

  return {
    success: true,
    messageIds
  };
}

function buildTelegramMessage(order: TelegramOrderNotification) {
  const productLines =
    order.items
      .map(
        (item) =>
          `- ${escapeHtml(item.product_name)} x${escapeHtml(String(item.quantity))}`
      )
      .join("\n") || "-";

  return [
    "\uD83C\uDF6A <b>Nouvelle commande</b>",
    "",
    `\uD83C\uDD94 <b>ID:</b> ${escapeHtml(order.orderId)}`,
    `\uD83D\uDC64 <b>Client:</b> ${escapeHtml(order.customerName)}`,
    `\uD83D\uDCDE <b>T\u00e9l\u00e9phone:</b> ${escapeHtml(order.phone)}`,
    "",
    `\uD83D\uDE9A <b>Mode:</b> ${escapeHtml(formatDeliveryMethod(order.deliveryMethod))}`,
    `\uD83D\uDCCD <b>Adresse:</b> ${escapeHtml(order.address || "-")}`,
    "",
    "\uD83D\uDED2 <b>Produits:</b>",
    productLines,
    "",
    `\uD83D\uDCB6 <b>Sous-total:</b> ${formatEuros(order.subtotalAmount)} \u20ac`,
    `\uD83D\uDE9A <b>Livraison:</b> ${formatEuros(order.deliveryFee)} \u20ac`,
    `\uD83D\uDCB0 <b>Total:</b> ${formatEuros(order.totalAmount)} \u20ac`,
    "",
    "Notes:",
    escapeHtml(order.notes || "-")
  ].join("\n");
}

function splitTelegramMessage(message: string) {
  if (message.length <= TELEGRAM_MESSAGE_LIMIT) {
    return [message];
  }

  const chunks: string[] = [];
  let remaining = message;

  while (remaining.length > TELEGRAM_MESSAGE_LIMIT) {
    const splitAt = remaining.lastIndexOf("\n", TELEGRAM_MESSAGE_LIMIT);
    const chunkEnd = splitAt > 0 ? splitAt : TELEGRAM_MESSAGE_LIMIT;
    chunks.push(remaining.slice(0, chunkEnd));
    remaining = remaining.slice(chunkEnd).trimStart();
  }

  if (remaining) {
    chunks.push(remaining);
  }

  return chunks;
}

function formatDeliveryMethod(deliveryMethod: DeliveryMethod) {
  return deliveryMethod === "delivery" ? "Livraison" : "Retrait";
}

function formatEuros(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function isTelegramSuccessPayload(
  payload: unknown
): payload is { ok: true; result: { message_id: number } } {
  return (
    payload !== null &&
    typeof payload === "object" &&
    "ok" in payload &&
    payload.ok === true &&
    "result" in payload &&
    payload.result !== null &&
    typeof payload.result === "object" &&
    "message_id" in payload.result &&
    typeof payload.result.message_id === "number"
  );
}

function getTelegramErrorMessage(payload: unknown) {
  if (
    payload &&
    typeof payload === "object" &&
    "description" in payload &&
    typeof payload.description === "string"
  ) {
    return payload.description;
  }

  return "Unknown Telegram API error";
}
