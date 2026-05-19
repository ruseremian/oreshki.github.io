import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  ORDER_STATUSES,
  isCancelledOrderStatus,
  normalizeOrderStatus,
  parseOrderStatus
} from "@/lib/order-status";

describe("order status lifecycle", () => {
  it("supports the complete admin lifecycle", () => {
    assert.deepEqual(ORDER_STATUSES, [
      "new",
      "confirmed",
      "preparing",
      "ready",
      "delivered",
      "cancelled"
    ]);
  });

  it("parses French aliases without accents and rejects invalid statuses", () => {
    assert.equal(parseOrderStatus("Confirmée"), "confirmed");
    assert.equal(parseOrderStatus("en préparation"), "preparing");
    assert.equal(parseOrderStatus("Prête"), "ready");
    assert.equal(parseOrderStatus("livrée"), "delivered");
    assert.equal(parseOrderStatus("annulée"), "cancelled");
    assert.equal(parseOrderStatus("refunded"), null);
  });

  it("normalizes missing statuses to new and detects cancelled orders", () => {
    assert.equal(normalizeOrderStatus(null), "new");
    assert.equal(isCancelledOrderStatus("annulée"), true);
    assert.equal(isCancelledOrderStatus("delivered"), false);
  });
});
