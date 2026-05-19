import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { calculateAdminOrderMetrics } from "@/lib/admin-metrics";

describe("admin order metrics", () => {
  it("counts all orders but excludes cancelled orders from revenue metrics", () => {
    const metrics = calculateAdminOrderMetrics(
      [
        {
          created_at: "2026-05-19T08:00:00.000Z",
          status: "new",
          total_amount: 20
        },
        {
          created_at: "2026-05-19T09:00:00.000Z",
          status: "cancelled",
          total_amount: 999
        },
        {
          created_at: "2026-05-18T09:00:00.000Z",
          status: "delivered",
          total_amount: 40
        }
      ],
      new Date("2026-05-19T12:00:00.000Z")
    );

    assert.deepEqual(metrics, {
      totalOrders: 3,
      totalRevenue: 60,
      ordersToday: 2,
      averageOrderValue: 30
    });
  });
});
