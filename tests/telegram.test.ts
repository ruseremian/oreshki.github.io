import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";

import {
  buildOrderKeyboard,
  buildTelegramMessage,
  sendTelegramNotification,
  splitTelegramMessage
} from "@/lib/telegram";

const originalFetch = globalThis.fetch;
const originalToken = process.env.TELEGRAM_BOT_TOKEN;
const originalChatId = process.env.TELEGRAM_CHAT_ID;
const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

const sampleOrder = {
  orderId: "7c97f479-d68a-4ca1-96f8-8169f56e4c6c",
  customerName: "Alice <Test>",
  phone: "+33612345678",
  preferredContactMethod: "telegram" as const,
  preferredDate: "2026-05-22",
  deliveryMethod: "delivery" as const,
  address: "1 rue Test",
  items: [
    {
      product_name: "Pelmeni",
      quantity: 2,
      unit_price: 13,
      line_total: 26
    }
  ],
  subtotalAmount: 26,
  deliveryFee: 7,
  totalAmount: 33,
  notes: "Ring twice"
};

afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env.TELEGRAM_BOT_TOKEN = originalToken;
  process.env.TELEGRAM_CHAT_ID = originalChatId;
  process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
});

describe("Telegram notifications", () => {
  it("builds escaped order messages with fulfillment, item, and total details", () => {
    const message = buildTelegramMessage(sampleOrder);

    assert.match(message, /Nouvelle commande/);
    assert.match(message, /Alice &lt;Test&gt;/);
    assert.match(message, /Livraison/);
    assert.match(message, /22\/05\/2026/);
    assert.match(message, /Pelmeni x2/);
    assert.match(message, /Total:/);
    assert.doesNotMatch(message, /Alice <Test>/);
  });

  it("builds confirm, cancel, and admin buttons for the first Telegram message", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.test/";

    assert.deepEqual(buildOrderKeyboard(sampleOrder.orderId), {
      inline_keyboard: [
        [
          {
            text: "✅ Confirmer",
            callback_data: `order_confirm:${sampleOrder.orderId}`
          },
          {
            text: "❌ Annuler",
            callback_data: `order_cancel:${sampleOrder.orderId}`
          }
        ],
        [
          {
            text: "👀 Voir admin",
            url: "https://example.test/admin/orders"
          }
        ]
      ]
    });
  });

  it("splits long Telegram messages under the platform limit", () => {
    const chunks = splitTelegramMessage(`${"A".repeat(4090)}\n${"B".repeat(20)}`);

    assert.equal(chunks.length, 2);
    assert.ok(chunks.every((chunk) => chunk.length <= 4096));
  });

  it("posts Telegram notifications with action buttons when configured", async () => {
    process.env.TELEGRAM_BOT_TOKEN = "token";
    process.env.TELEGRAM_CHAT_ID = "chat";
    const calls: unknown[] = [];

    globalThis.fetch = (async (_input, init) => {
      calls.push(JSON.parse(String(init?.body)));

      return Response.json({
        ok: true,
        result: {
          message_id: 42
        }
      });
    }) as typeof fetch;

    const result = await sendTelegramNotification(sampleOrder);

    assert.deepEqual(result, { success: true, messageIds: [42] });
    assert.equal(calls.length, 1);
    assert.equal((calls[0] as { chat_id: string }).chat_id, "chat");
    assert.ok("reply_markup" in (calls[0] as Record<string, unknown>));
  });
});
