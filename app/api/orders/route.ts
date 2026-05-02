import { NextRequest, NextResponse } from "next/server";

import type {
  CartOrderItem,
  CheckoutCustomer,
  CreateOrderRequest,
  CreateOrderResponse
} from "@/lib/order-types";
import { productById, type ProductId } from "@/lib/products";
import {
  createSupabaseAdmin,
  MissingSupabaseEnvError
} from "@/lib/supabase-admin";

export const runtime = "nodejs";

type FieldErrors = NonNullable<
  Extract<CreateOrderResponse, { success: false }>["fieldErrors"]
>;

type RawOrderBody = Partial<CreateOrderRequest> & {
  customer_name?: string;
  preferred_contact_method?: string;
  delivery_method?: string;
  preferred_date?: string;
};

export async function POST(request: NextRequest) {
  try {
    const rawBody = (await request.json()) as RawOrderBody;
    console.log("[orders] request body", safeLogBody(rawBody));

    const body = normalizeBody(rawBody);
    const validation = validateOrder(body);

    if (!validation.success) {
      console.warn("[orders] validation failed", validation.errors);
      return NextResponse.json<CreateOrderResponse>(
        {
          success: false,
          error: "Invalid order request",
          fieldErrors: validation.errors
        },
        { status: 400 }
      );
    }

    const normalizedItems = validation.items.map((item) => {
      const product = productById.get(item.productId);

      if (!product || !product.available) {
        throw new Error(`Product validation failed for ${item.productId}`);
      }

      const lineTotal = product.price * item.quantity;

      return {
        product_id: product.id,
        product_name: product.name,
        quantity: item.quantity,
        unit_price: product.price,
        line_total: lineTotal
      };
    });

    const totalAmount = normalizedItems.reduce(
      (total, item) => total + item.line_total,
      0
    );
    console.log("[orders] computed total", {
      totalAmount,
      itemCount: normalizedItems.length
    });

    const supabase = createSupabaseAdmin();

    const orderInsert = await supabase
      .from("orders")
      .insert({
        customer_name: validation.data.customerName,
        phone: validation.data.phone,
        email: validation.data.email || null,
        preferred_contact_method: validation.data.preferredContactMethod,
        delivery_method: validation.data.deliveryMethod,
        address:
          validation.data.deliveryMethod === "delivery"
            ? validation.data.address
            : null,
        preferred_date: validation.data.preferredDate || null,
        notes: validation.data.notes || null,
        total_amount: totalAmount,
        status: "new"
      })
      .select("id")
      .single();

    console.log("[orders] order insert result", {
      orderId: orderInsert.data?.id,
      error: orderInsert.error
    });

    if (orderInsert.error || !orderInsert.data) {
      return NextResponse.json<CreateOrderResponse>(
        {
          success: false,
          error: orderInsert.error?.message || "Failed to create order"
        },
        { status: 500 }
      );
    }

    const itemsInsert = await supabase.from("order_items").insert(
      normalizedItems.map((item) => ({
        ...item,
        order_id: orderInsert.data.id
      }))
    );

    console.log("[orders] order items insert result", {
      orderId: orderInsert.data.id,
      itemCount: normalizedItems.length,
      error: itemsInsert.error
    });

    if (itemsInsert.error) {
      await supabase.from("orders").delete().eq("id", orderInsert.data.id);

      return NextResponse.json<CreateOrderResponse>(
        {
          success: false,
          error: itemsInsert.error.message || "Failed to create order items"
        },
        { status: 500 }
      );
    }

    return NextResponse.json<CreateOrderResponse>({
      success: true,
      orderId: orderInsert.data.id,
      totalAmount
    });
  } catch (error) {
    console.error("[orders] unexpected failure", error);

    if (error instanceof MissingSupabaseEnvError) {
      return NextResponse.json<CreateOrderResponse>(
        {
          success: false,
          error: `Server is missing Supabase environment variables: ${error.missingVariables.join(", ")}`
        },
        { status: 500 }
      );
    }

    return NextResponse.json<CreateOrderResponse>(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected order submission error"
      },
      { status: 500 }
    );
  }
}

function normalizeBody(body: RawOrderBody): Partial<CreateOrderRequest> {
  return {
    customerName: body.customerName ?? body.customer_name,
    phone: body.phone,
    email: body.email,
    preferredContactMethod:
      body.preferredContactMethod ??
      (body.preferred_contact_method as CheckoutCustomer["preferredContactMethod"]),
    deliveryMethod:
      body.deliveryMethod ??
      (body.delivery_method as CheckoutCustomer["deliveryMethod"]),
    address: body.address,
    preferredDate: body.preferredDate ?? body.preferred_date,
    notes: body.notes,
    items: body.items
  };
}

function validateOrder(body: Partial<CreateOrderRequest>) {
  const errors: FieldErrors = {};

  if (!body.customerName?.trim()) {
    errors.customerName = "Customer name is required";
  }

  if (!body.phone?.trim()) {
    errors.phone = "Phone is required";
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
      phone: body.phone!.trim(),
      email: body.email?.trim(),
      preferredContactMethod: body.preferredContactMethod!,
      deliveryMethod: body.deliveryMethod!,
      address: body.address?.trim(),
      preferredDate: body.preferredDate,
      notes: body.notes?.trim()
    },
    items
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

function safeLogBody(body: RawOrderBody) {
  return {
    ...body,
    phone: body.phone ? "[provided]" : undefined,
    email: body.email ? "[provided]" : undefined
  };
}
