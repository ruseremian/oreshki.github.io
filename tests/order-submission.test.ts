import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildOrderLineItems,
  calculateSubmissionPricing,
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
      language: "fr"
    });
    assert.deepEqual(result.items, [
      { productId: "napoleon-velvet-rouge", quantity: 3 }
    ]);
  });

  it("rejects invalid cart, customer, contact, fulfillment, address, and date data", () => {
    const result = validateOrder(
      {
        customerName: "",
        phone: "hello",
        preferredContactMethod: "email" as never,
        deliveryMethod: "delivery",
        preferredDate: "2026-05-21",
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
      items: "Cart is empty"
    });
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
});
