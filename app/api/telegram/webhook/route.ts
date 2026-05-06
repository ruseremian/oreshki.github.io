import { NextRequest, NextResponse } from "next/server";

import { parseOrderStatus } from "@/lib/order-status";
import {
  createSupabaseAdmin,
  MissingSupabaseEnvError
} from "@/lib/supabase-admin";
import {
  answerTelegramCallbackQuery,
  removeTelegramMessageButtons,
  sendTelegramChatMessage
} from "@/lib/telegram";

export const runtime = "nodejs";

type TelegramCallbackUpdate = {
  callback_query?: {
    id?: string;
    data?: string;
    message?: {
      message_id?: number;
      chat?: {
        id?: string | number;
      };
    };
  };
};

const ORDER_ACTIONS = {
  order_confirm: {
    status: "confirmed",
    callbackText: "✅ Commande confirmée",
    messageText: "✅ Commande confirmée"
  },
  order_cancel: {
    status: "cancelled",
    callbackText: "❌ Commande annulée",
    messageText: "❌ Commande annulée"
  }
} as const;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  if (!isAuthorizedWebhookRequest(request)) {
    console.warn("[telegram-webhook] rejected request with invalid secret");
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const update = (await request.json().catch(() => ({}))) as TelegramCallbackUpdate;
  const callbackQuery = update.callback_query;
  const callbackQueryId = callbackQuery?.id;
  const chatId = callbackQuery?.message?.chat?.id;
  const messageId = callbackQuery?.message?.message_id;

  if (!callbackQueryId) {
    return NextResponse.json({ success: true });
  }

  const parsedCallback = parseOrderCallbackData(callbackQuery.data);

  if (!parsedCallback) {
    console.warn("[telegram-webhook] invalid callback data", {
      data: callbackQuery.data
    });
    await answerWithError(callbackQueryId, "Action Telegram invalide.");
    return NextResponse.json({ success: false }, { status: 400 });
  }

  try {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
      .from("orders")
      .update({ status: parsedCallback.status })
      .eq("id", parsedCallback.orderId)
      .select("id, status")
      .single();

    if (error || !data) {
      console.error("[telegram-webhook] failed to update order status", {
        orderId: parsedCallback.orderId,
        status: parsedCallback.status,
        error
      });
      await answerWithError(callbackQueryId, "Commande introuvable ou non mise à jour.");
      return NextResponse.json({ success: false }, { status: 500 });
    }

    await answerTelegramCallbackQuery({
      callbackQueryId,
      text: parsedCallback.callbackText
    });

    if (chatId && messageId) {
      const markupResult = await removeTelegramMessageButtons({
        chatId,
        messageId
      });

      if (!markupResult.success) {
        console.error("[telegram-webhook] failed to remove message buttons", {
          orderId: parsedCallback.orderId,
          error: markupResult.error
        });
      }
    }

    if (chatId) {
      const messageResult = await sendTelegramChatMessage({
        chatId,
        text: `${parsedCallback.messageText}\nID: ${parsedCallback.orderId}`
      });

      if (!messageResult.success) {
        console.error("[telegram-webhook] failed to send status reply", {
          orderId: parsedCallback.orderId,
          error: messageResult.error
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[telegram-webhook] unexpected failure", error);

    const message =
      error instanceof MissingSupabaseEnvError
        ? "Configuration Supabase manquante."
        : "Erreur pendant la mise à jour.";

    await answerWithError(callbackQueryId, message);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

function isAuthorizedWebhookRequest(request: NextRequest) {
  const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;

  if (!expectedSecret) {
    return true;
  }

  return request.nextUrl.searchParams.get("secret") === expectedSecret;
}

function parseOrderCallbackData(data: string | undefined) {
  if (!data) {
    return null;
  }

  const [rawAction, orderId] = data.split(":");
  const action = ORDER_ACTIONS[rawAction as keyof typeof ORDER_ACTIONS];
  const status = parseOrderStatus(action?.status);

  if (!action || !status || !orderId || !UUID_PATTERN.test(orderId)) {
    return null;
  }

  return {
    orderId,
    status,
    callbackText: action.callbackText,
    messageText: action.messageText
  };
}

async function answerWithError(callbackQueryId: string, text: string) {
  const result = await answerTelegramCallbackQuery({
    callbackQueryId,
    text,
    showAlert: true
  });

  if (!result.success) {
    console.error("[telegram-webhook] failed to answer callback query", {
      error: result.error
    });
  }
}
