import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  calculateOrderPricing,
  getDeliveryFee
} from "@/lib/pricing";

describe("order pricing", () => {
  it("keeps pickup free while delivery below the threshold uses the configured fee", () => {
    assert.equal(getDeliveryFee("pickup", 10), 0);
    assert.equal(getDeliveryFee("delivery", FREE_DELIVERY_THRESHOLD - 1), DELIVERY_FEE);
  });

  it("unlocks free delivery at and above the threshold", () => {
    assert.equal(getDeliveryFee("delivery", FREE_DELIVERY_THRESHOLD), 0);
    assert.equal(getDeliveryFee("delivery", FREE_DELIVERY_THRESHOLD + 10), 0);
  });

  it("calculates totals from catalog prices including decimal product prices", () => {
    const pricing = calculateOrderPricing(
      [{ productId: "napoleon-velvet-rouge", quantity: 3 }],
      "delivery"
    );

    assert.equal(pricing.subtotal, 7.5);
    assert.equal(pricing.deliveryFee, DELIVERY_FEE);
    assert.equal(pricing.total, 14.5);
  });

  it("prices an empty delivery cart as only the delivery fee", () => {
    assert.deepEqual(calculateOrderPricing([], "delivery"), {
      subtotal: 0,
      deliveryFee: DELIVERY_FEE,
      total: DELIVERY_FEE
    });
  });
});
