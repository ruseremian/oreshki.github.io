import type { DeliveryMethod } from "@/lib/order-types";
import { productById, type ProductId } from "@/lib/products";

export const DELIVERY_FEE = 3;

export function getDeliveryFee(deliveryMethod: DeliveryMethod) {
  return deliveryMethod === "delivery" ? DELIVERY_FEE : 0;
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
  const deliveryFee = getDeliveryFee(deliveryMethod);

  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee
  };
}
