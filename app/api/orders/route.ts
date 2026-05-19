import { NextRequest, NextResponse } from "next/server";

import type { CreateOrderResponse } from "@/lib/order-types";
import {
  buildOrderLineItems,
  calculateSubmissionPricing,
  createPrivacyConsentTimestamp,
  normalizeOrderBody,
  type RawOrderBody,
  validateOrder
} from "@/lib/order-submission";
import { buildAdminWhatsAppUrl } from "@/lib/order-whatsapp";
import {
  createSupabaseAdmin,
  MissingSupabaseEnvError
} from "@/lib/supabase-admin";
import { sendTelegramNotification } from "@/lib/telegram";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const rawBody = (await request.json()) as RawOrderBody;
    console.log("[orders] request body", safeLogBody(rawBody));

    const body = normalizeOrderBody(rawBody);
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

    const normalizedItems = buildOrderLineItems(
      validation.items,
      validation.data.language
    );
    const pricing = calculateSubmissionPricing(
      normalizedItems,
      validation.data.deliveryMethod
    );
    console.log("[orders] computed total", {
      subtotalAmount: pricing.subtotal,
      deliveryFee: pricing.deliveryFee,
      totalAmount: pricing.total,
      itemCount: normalizedItems.length
    });

    const supabase = createSupabaseAdmin();

    const orderInsert = await supabase
      .from("orders")
      .insert({
        customer_name: validation.data.customerName,
        phone: validation.data.phone,
        email: null,
        preferred_contact_method: validation.data.preferredContactMethod,
        delivery_method: validation.data.deliveryMethod,
        address:
          validation.data.deliveryMethod === "delivery"
            ? validation.data.address
            : null,
        preferred_date: validation.data.preferredDate || null,
        language: validation.data.language,
        privacy_consent_at: createPrivacyConsentTimestamp(),
        notes: validation.data.notes || null,
        subtotal_amount: pricing.subtotal,
        delivery_fee: pricing.deliveryFee,
        total_amount: pricing.total,
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

    try {
      const telegramResult = await sendTelegramNotification({
        orderId: orderInsert.data.id,
        customerName: validation.data.customerName,
        phone: validation.data.phone,
        preferredContactMethod: validation.data.preferredContactMethod,
        preferredDate: validation.data.preferredDate || null,
        deliveryMethod: validation.data.deliveryMethod,
        address:
          validation.data.deliveryMethod === "delivery"
            ? validation.data.address
            : null,
        items: normalizedItems,
        subtotalAmount: pricing.subtotal,
        deliveryFee: pricing.deliveryFee,
        totalAmount: pricing.total,
        notes: validation.data.notes
      });

      if (telegramResult.success) {
        console.log("[orders] Telegram notification sent", {
          orderId: orderInsert.data.id,
          messageIds: telegramResult.messageIds
        });
      } else {
        console.error("[orders] Telegram notification failed", {
          orderId: orderInsert.data.id,
          error: telegramResult.error
        });
      }
    } catch (error) {
      console.error("[orders] Telegram notification failed", {
        orderId: orderInsert.data.id,
        error
      });
    }

    const adminWhatsAppUrl = buildAdminWhatsAppUrl({
      id: orderInsert.data.id,
      customer_name: validation.data.customerName,
      phone: validation.data.phone,
      delivery_method: validation.data.deliveryMethod,
      preferred_date: validation.data.preferredDate || null,
      subtotal_amount: pricing.subtotal,
      delivery_fee: pricing.deliveryFee,
      total_amount: pricing.total,
      items: normalizedItems
    });

    return NextResponse.json<CreateOrderResponse>({
      success: true,
      orderId: orderInsert.data.id,
      subtotalAmount: pricing.subtotal,
      deliveryFee: pricing.deliveryFee,
      totalAmount: pricing.total,
      adminWhatsAppUrl
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

function safeLogBody(body: RawOrderBody) {
  return {
    ...body,
    phone: body.phone ? "[provided]" : undefined,
    email: body.email ? "[provided]" : undefined
  };
}
