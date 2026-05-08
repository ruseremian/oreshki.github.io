import type { ProductId } from "@/lib/products";

export type PreferredContactMethod =
  | "whatsapp"
  | "telegram"
  | "instagram"
  | "phone";

export type DeliveryMethod = "pickup" | "delivery";

export type CheckoutCustomer = {
  customerName: string;
  phone: string;
  email?: string;
  preferredContactMethod: PreferredContactMethod;
  deliveryMethod: DeliveryMethod;
  address?: string;
  preferredDate?: string;
  notes?: string;
};

export type CartOrderItem = {
  productId: ProductId;
  quantity: number;
};

export type CreateOrderRequest = CheckoutCustomer & {
  language?: "fr" | "ru";
  items: CartOrderItem[];
};

export type CreateOrderResponse =
  | {
      success: true;
      orderId: string;
      subtotalAmount: number;
      deliveryFee: number;
      totalAmount: number;
      adminWhatsAppUrl?: string | null;
    }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof CheckoutCustomer | "items", string>>;
    };
