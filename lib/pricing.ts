import type { DeliveryMethod } from "@/lib/order-types";
import { productById, type ProductId } from "@/lib/products";

export const DELIVERY_FEE = 7;
export const FREE_DELIVERY_THRESHOLD = 35;

export function getDeliveryFee(deliveryMethod: DeliveryMethod, subtotal = 0) {
  if (deliveryMethod !== "delivery") return 0;

  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
}

export function calculateOrderSubtotal(
  items: { productId: ProductId; quantity: number }[]
) {
  return items.reduce((sum, item) => {
    const product = productById.get(item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);
}

export function calculateOrderPricing(
  items: { productId: ProductId; quantity: number }[],
  deliveryMethod: DeliveryMethod
) {
  const subtotal = calculateOrderSubtotal(items);
  const deliveryFee = getDeliveryFee(deliveryMethod, subtotal);

  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee
  };
}
