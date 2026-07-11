import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildOrderLineItems,
  calculateSubmissionPricing,
  createPrivacyConsentTimestamp,
  normalizeOrderBody,
  validateOrder
} from "@/lib/order-submission";

const validOrder = {
  customerName: " Alice ",
  phone: "06 12 34 56 78",
  preferredContactMethod: "telegram" as const,
  deliveryMethod: "delivery" as const,
  address: " 1 rue Test ",
  preferredDate: "2026-05-22",
  notes: " Please call ",
  language: "fr" as const,
  privacyConsent: true,
  items: [{ productId: "napoleon-velvet-rouge" as const, quantity: 3 }]
};

describe("order submission contract", () => {
  it("accepts legacy snake_case fields from older clients", () => {
    assert.deepEqual(
      normalizeOrderBody({
        customer_name: "Alice",
        preferred_contact_method: "telegram",
        delivery_method: "pickup",
        preferred_date: "2026-05-22",
        privacy_consent: true,
        phone: "06 12 34 56 78",
        items: []
      }),
      {
        customerName: "Alice",
        phone: "06 12 34 56 78",
        preferredContactMethod: "telegram",
        deliveryMethod: "pickup",
        address: undefined,
        preferredDate: "2026-05-22",
        notes: undefined,
        language: undefined,
        privacyConsent: true,
        items: []
      }
    );
  });

  it("validates and normalizes a complete order request", () => {
    const result = validateOrder(validOrder, "2026-05-22");

    assert.equal(result.success, true);

    if (!result.success) return;

    assert.deepEqual(result.data, {
      customerName: "Alice",
      phone: "+33612345678",
      preferredContactMethod: "telegram",
      deliveryMethod: "delivery",
      address: "1 rue Test",
      preferredDate: "2026-05-22",
      notes: "Please call",
      language: "fr",
      privacyConsent: true
    });
    assert.deepEqual(result.items, [
      { productId: "napoleon-velvet-rouge", quantity: 3 }
    ]);
  });

  it("normalizes missing or invalid order language to French", () => {
    assert.equal(
      validateOrder({ ...validOrder, language: "ru" }, "2026-05-22").success,
      true
    );

    const missingLanguage = validateOrder(
      { ...validOrder, language: undefined },
      "2026-05-22"
    );
    const invalidLanguage = validateOrder(
      { ...validOrder, language: "en" as never },
      "2026-05-22"
    );

    assert.equal(missingLanguage.success, true);
    assert.equal(invalidLanguage.success, true);

    if (missingLanguage.success) {
      assert.equal(missingLanguage.data.language, "fr");
    }

    if (invalidLanguage.success) {
      assert.equal(invalidLanguage.data.language, "fr");
    }
  });

  it("rejects invalid cart, customer, contact, fulfillment, address, and date data", () => {
    const result = validateOrder(
      {
        customerName: "",
        phone: "hello",
        preferredContactMethod: "email" as never,
        deliveryMethod: "delivery",
        preferredDate: "2026-05-21",
        privacyConsent: false,
        items: []
      },
      "2026-05-22"
    );

    assert.equal(result.success, false);

    if (result.success) return;

    assert.deepEqual(result.errors, {
      customerName: "Customer name is required",
      phone: "Phone is invalid",
      preferredContactMethod: "Preferred contact method is required",
      address: "Address is required for delivery",
      preferredDate: "Preferred date is too early",
      privacyConsent: "Privacy consent is required",
      items: "Cart is empty"
    });
  });

  it("requires consent and creates an auditable consent timestamp", () => {
    const missingConsent = validateOrder(
      { ...validOrder, privacyConsent: undefined },
      "2026-05-22"
    );
    const accepted = validateOrder(validOrder, "2026-05-22");

    assert.equal(missingConsent.success, false);
    assert.equal(accepted.success, true);
    assert.equal(
      createPrivacyConsentTimestamp(new Date("2026-05-19T10:30:00.000Z")),
      "2026-05-19T10:30:00.000Z"
    );

    if (!missingConsent.success) {
      assert.equal(
        missingConsent.errors.privacyConsent,
        "Privacy consent is required"
      );
    }
  });

  it("builds persisted line items and trusted totals from server catalog data", () => {
    const lineItems = buildOrderLineItems(validOrder.items, "fr");
    const pricing = calculateSubmissionPricing(lineItems, "delivery");

    assert.deepEqual(lineItems, [
      {
        product_id: "napoleon-velvet-rouge",
        product_name: "Velvet rouge",
        quantity: 3,
        unit_price: 2.5,
        line_total: 7.5
      }
    ]);
    assert.deepEqual(pricing, {
      subtotal: 7.5,
      deliveryFee: 7,
      total: 14.5
    });
  });

  it("prices each Blinchiki kilogram variant while preserving the selected variant name", () => {
    const lineItems = buildOrderLineItems(
      [
        { productId: "blinchiki-viande", quantity: 2 },
        { productId: "blinchiki-fromage", quantity: 3 },
        { productId: "blinchiki-champignons", quantity: 4 }
      ],
      "fr"
    );
    const pricing = calculateSubmissionPricing(lineItems, "pickup");

    assert.deepEqual(
      lineItems.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        unit_price: item.unit_price,
        line_total: item.line_total
      })),
      [
        {
          product_id: "blinchiki-viande",
          product_name: "Blinchiki — Viande — 1 kg",
          unit_price: 10,
          line_total: 20
        },
        {
          product_id: "blinchiki-fromage",
          product_name: "Blinchiki — Fromage — 1 kg",
          unit_price: 9,
          line_total: 27
        },
        {
          product_id: "blinchiki-champignons",
          product_name: "Blinchiki — Champignons et pommes de terre — 1 kg",
          unit_price: 9,
          line_total: 36
        }
      ]
    );
    assert.deepEqual(pricing, {
      subtotal: 83,
      deliveryFee: 0,
      total: 83
    });
  });

  it("preserves the selected Oreshki product and format names in submitted order lines", () => {
    const frenchLineItems = buildOrderLineItems(
      [
        { productId: "oreshki-classiques-12", quantity: 1 },
        { productId: "oreshki-pistache-12", quantity: 1 },
        { productId: "oreshki-kadaifi-48", quantity: 1 },
        { productId: "oreshki-framboise-24", quantity: 1 }
      ],
      "fr"
    );
    const russianLineItems = buildOrderLineItems(
      [
        { productId: "oreshki-classiques-12", quantity: 1 },
        { productId: "oreshki-pistache-12", quantity: 1 },
        { productId: "oreshki-kadaifi-48", quantity: 1 },
        { productId: "oreshki-framboise-24", quantity: 1 }
      ],
      "ru"
    );

    assert.deepEqual(
      frenchLineItems.map((item) => item.product_name),
      [
        "Oreshki classiques — 12 pièces",
        "Oreshki à la pistache — 12 pièces",
        "Oreshki au kadaïf à la pistache — 48 pièces",
        "Oreshki à la framboise — 24 pièces"
      ]
    );
    assert.deepEqual(
      russianLineItems.map((item) => item.product_name),
      [
        "Классические орешки — 12 штук",
        "Орешки с фисташкой — 12 штук",
        "Орешки с кадаифом и фисташкой — 48 штук",
        "Орешки с малиной — 24 штуки"
      ]
    );
    assert.deepEqual(
      frenchLineItems.map((item) => item.unit_price),
      [8, 10, 36, 19]
    );
  });
});
