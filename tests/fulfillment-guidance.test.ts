import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { siteContent } from "@/lib/site-data";

describe("fulfillment and preorder guidance", () => {
  it("explains local delivery, Ittenheim pickup, preorder timing, and urgent contact in French", () => {
    const content = siteContent.fr;
    const text = [
      content.products.fulfillmentNote,
      content.cart.fulfillmentGuidance,
      content.cart.preferredDateGuidance,
      content.cart.checkout,
      content.cart.submit,
      content.cart.confirmationText,
      content.contact.description,
      content.contact.note
    ].join(" ");

    assert.match(text, /Ittenheim/);
    assert.match(text, /communes voisines/);
    assert.match(text, /rendez-vous/);
    assert.match(text, /3 jours/);
    assert.match(text, /urgente/);
    assert.match(text, /demande/i);
  });

  it("explains the same fulfillment and preorder path in Russian", () => {
    const content = siteContent.ru;
    const text = [
      content.products.fulfillmentNote,
      content.cart.fulfillmentGuidance,
      content.cart.preferredDateGuidance,
      content.cart.checkout,
      content.cart.submit,
      content.cart.confirmationText,
      content.contact.description,
      content.contact.note
    ].join(" ");

    assert.match(text, /Иттенхайм/);
    assert.match(text, /ближайш/);
    assert.match(text, /договор/);
    assert.match(text, /3 дня/);
    assert.match(text, /раньше/);
    assert.match(text, /заявк/i);
  });
});
