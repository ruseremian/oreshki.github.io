import type { DeliveryMethod } from "@/lib/order-types";

const WHATSAPP_API_VERSION = "v23.0";

type WhatsAppOrderNotification = {
  orderId: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  deliveryMethod: DeliveryMethod;
};

type WhatsAppSendResult =
  | { sent: true; messageId?: string }
  | { sent: false; skipped: true; reason: string };

export async function sendOrderWhatsAppNotification({
  orderId,
  customerName,
  customerPhone,
  totalAmount,
  deliveryMethod
}: WhatsAppOrderNotification): Promise<WhatsAppSendResult> {
  const config = getWhatsAppConfig();

  if (!config) {
    return {
      sent: false,
      skipped: true,
      reason: "Missing WhatsApp Cloud API environment variables"
    };
  }

  const response = await fetch(
    `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${config.phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: config.adminPhoneNumber,
        type: "template",
        template: {
          name: config.templateName,
          language: {
            code: config.templateLanguage
          },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: customerName },
                { type: "text", text: customerPhone },
                { type: "text", text: formatEuros(totalAmount) },
                { type: "text", text: formatDeliveryMethod(deliveryMethod) },
                { type: "text", text: orderId }
              ]
            }
          ]
        }
      })
    }
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      `WhatsApp Cloud API request failed with ${response.status}: ${getWhatsAppErrorMessage(payload)}`
    );
  }

  return {
    sent: true,
    messageId: getMessageId(payload)
  };
}

function getWhatsAppConfig() {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const adminPhoneNumber = normalizePhoneNumber(process.env.ADMIN_WHATSAPP_NUMBER);
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const templateLanguage = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "fr";

  if (!token || !phoneNumberId || !adminPhoneNumber || !templateName) {
    return null;
  }

  return {
    token,
    phoneNumberId,
    adminPhoneNumber,
    templateName,
    templateLanguage
  };
}

function normalizePhoneNumber(value: string | undefined) {
  return value?.replace(/[^\d]/g, "") || null;
}

function formatDeliveryMethod(deliveryMethod: DeliveryMethod) {
  return deliveryMethod === "delivery" ? "Livraison" : "Retrait";
}

function formatEuros(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

function getWhatsAppErrorMessage(payload: unknown) {
  if (
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    payload.error &&
    typeof payload.error === "object" &&
    "message" in payload.error &&
    typeof payload.error.message === "string"
  ) {
    return payload.error.message;
  }

  return "Unknown WhatsApp API error";
}

function getMessageId(payload: unknown) {
  if (
    payload &&
    typeof payload === "object" &&
    "messages" in payload &&
    Array.isArray(payload.messages) &&
    payload.messages[0] &&
    typeof payload.messages[0] === "object" &&
    "id" in payload.messages[0] &&
    typeof payload.messages[0].id === "string"
  ) {
    return payload.messages[0].id;
  }

  return undefined;
}
