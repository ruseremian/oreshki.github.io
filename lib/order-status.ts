export const ORDER_STATUSES = [
  "new",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled"
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Nouvelle",
  confirmed: "Confirmée",
  preparing: "En préparation",
  ready: "Prête",
  delivered: "Livrée",
  cancelled: "Annulée"
};

const STATUS_ALIASES: Record<string, OrderStatus> = {
  new: "new",
  nouveau: "new",
  nouvelle: "new",
  confirmed: "confirmed",
  confirme: "confirmed",
  confirmee: "confirmed",
  preparing: "preparing",
  preparation: "preparing",
  "en preparation": "preparing",
  ready: "ready",
  pret: "ready",
  prete: "ready",
  delivered: "delivered",
  livre: "delivered",
  livree: "delivered",
  cancelled: "cancelled",
  canceled: "cancelled",
  annule: "cancelled",
  annulee: "cancelled"
};

export function normalizeOrderStatus(value: string | null | undefined) {
  return parseOrderStatus(value) ?? "new";
}

export function parseOrderStatus(value: string | null | undefined) {
  return STATUS_ALIASES[normalizeStatusKey(value)] ?? null;
}

export function isCancelledOrderStatus(value: string | null | undefined) {
  return normalizeOrderStatus(value) === "cancelled";
}

function normalizeStatusKey(value: string | null | undefined) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}
