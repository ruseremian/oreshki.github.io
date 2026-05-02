import { NextRequest, NextResponse } from "next/server";

import type { CreateOrderRequest, CreateOrderResponse } from "@/lib/order-types";
import { productById } from "@/lib/products";
import { createSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

type FieldErrors = NonNullable<
  Extract<CreateOrderResponse, { ok: false }>["fieldErrors"]
>;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<CreateOrderRequest>;
    const validation = validateOrder(body);

    if (!validation.ok) {
      return NextResponse.json<CreateOrderResponse>(
        { ok: false, error: "Проверьте данные заказа", fieldErrors: validation.errors },
        { status: 400 }
      );
    }

    const normalizedItems = validation.items.map((item) => {
      const product = productById.get(item.productId);

      if (!product || !product.available) {
        throw new Error("Product validation failed after initial validation");
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

    const supabase = createSupabaseAdmin();

    const { data: order, error: orderError } = await supabase
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

    if (orderError || !order) {
      console.error("Supabase order insert failed", orderError);
      return NextResponse.json<CreateOrderResponse>(
        { ok: false, error: "Не удалось создать заказ. Попробуйте ещё раз." },
        { status: 500 }
      );
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      normalizedItems.map((item) => ({
        ...item,
        order_id: order.id
      }))
    );

    if (itemsError) {
      console.error("Supabase order items insert failed", itemsError);
      return NextResponse.json<CreateOrderResponse>(
        { ok: false, error: "Заказ создан, но позиции не сохранились." },
        { status: 500 }
      );
    }

    return NextResponse.json<CreateOrderResponse>({
      ok: true,
      orderId: order.id,
      totalAmount
    });
  } catch (error) {
    console.error("Order API failed", error);
    return NextResponse.json<CreateOrderResponse>(
      { ok: false, error: "Сервер временно недоступен. Попробуйте позже." },
      { status: 500 }
    );
  }
}

function validateOrder(body: Partial<CreateOrderRequest>) {
  const errors: FieldErrors = {};

  if (!body.customerName?.trim()) {
    errors.customerName = "Укажите имя";
  }

  if (!body.phone?.trim()) {
    errors.phone = "Укажите телефон";
  }

  if (
    !body.preferredContactMethod ||
    !["whatsapp", "telegram", "instagram", "phone"].includes(
      body.preferredContactMethod
    )
  ) {
    errors.preferredContactMethod = "Выберите способ связи";
  }

  if (
    !body.deliveryMethod ||
    !["pickup", "delivery"].includes(body.deliveryMethod)
  ) {
    errors.deliveryMethod = "Выберите получение";
  }

  if (body.deliveryMethod === "delivery" && !body.address?.trim()) {
    errors.address = "Укажите адрес доставки";
  }

  if (!body.items?.length) {
    errors.items = "Корзина пуста";
  }

  const items =
    body.items
      ?.map((item) => ({
        productId: item.productId,
        quantity: Number(item.quantity)
      }))
      .filter((item) => Number.isFinite(item.quantity)) ?? [];

  for (const item of items) {
    const product = productById.get(item.productId);

    if (!product || !product.available || item.quantity < 1) {
      errors.items = "Проверьте товары в корзине";
      break;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false as const, errors };
  }

  return {
    ok: true as const,
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
