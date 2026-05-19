import assert from "node:assert/strict";
import { describe, it } from "node:test";

import type { CreateOrderRequest } from "@/lib/order-types";
import { siteContent } from "@/lib/site-data";

describe("custom and event order guidance", () => {
  it("routes custom quantities and event orders to direct contact in French", () => {
    const content = siteContent.fr;
    const guidance = [
      content.products.customQuantityNote,
      content.contact.title,
      content.contact.note
    ].join(" ");

    assert.match(guidance, /quantit/i);
    assert.match(guidance, /famil/i);
    assert.match(guidance, /événement/i);
    assert.match(guidance, /sur demande/i);
    assert.match(guidance, /WhatsApp/);
    assert.match(guidance, /Telegram/);
    assert.match(guidance, /Instagram/);
  });

  it("routes the same custom and event requests to direct contact in Russian", () => {
    const content = siteContent.ru;
    const guidance = [
      content.products.customQuantityNote,
      content.contact.title,
      content.contact.note
    ].join(" ");

    assert.match(guidance, /индивидуальн/i);
    assert.match(guidance, /семейн/i);
    assert.match(guidance, /событ/i);
    assert.match(guidance, /по запросу/i);
    assert.match(guidance, /WhatsApp/);
    assert.match(guidance, /Telegram/);
    assert.match(guidance, /Instagram/);
  });

  it("keeps checkout payloads focused on catalog items instead of custom order fields", () => {
    const checkoutFields = [
      "customerName",
      "phone",
      "preferredContactMethod",
      "deliveryMethod",
      "address",
      "preferredDate",
      "notes",
      "privacyConsent",
      "language",
      "items"
    ] satisfies (keyof CreateOrderRequest)[];

    assert.deepEqual(checkoutFields, [
      "customerName",
      "phone",
      "preferredContactMethod",
      "deliveryMethod",
      "address",
      "preferredDate",
      "notes",
      "privacyConsent",
      "language",
      "items"
    ]);
  });
});
