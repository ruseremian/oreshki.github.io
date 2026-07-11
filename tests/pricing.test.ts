import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  calculateOrderPricing,
  getDeliveryFee
} from "@/lib/pricing";
import { productById, type ProductId } from "@/lib/products";

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

  it("keeps the twelve Oreshki product-format prices configured", () => {
    const expectedPrices: [ProductId, number][] = [
      ["oreshki-classiques-12", 8],
      ["oreshki-classiques-24", 15.5],
      ["oreshki-classiques-48", 30],
      ["oreshki-pistache-12", 10],
      ["oreshki-pistache-24", 19],
      ["oreshki-pistache-48", 36],
      ["oreshki-kadaifi-12", 10],
      ["oreshki-kadaifi-24", 19],
      ["oreshki-kadaifi-48", 36],
      ["oreshki-framboise-12", 10],
      ["oreshki-framboise-24", 19],
      ["oreshki-framboise-48", 36]
    ];

    for (const [productId, expectedPrice] of expectedPrices) {
      assert.equal(productById.get(productId)?.price, expectedPrice);
      assert.equal(
        calculateOrderPricing([{ productId, quantity: 1 }], "pickup").subtotal,
        expectedPrice
      );
    }
  });

  it("prices an empty delivery cart as only the delivery fee", () => {
    assert.deepEqual(calculateOrderPricing([], "delivery"), {
      subtotal: 0,
      deliveryFee: DELIVERY_FEE,
      total: DELIVERY_FEE
    });
  });
});
