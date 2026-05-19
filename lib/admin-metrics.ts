import { isCancelledOrderStatus } from "@/lib/order-status";

export type AdminMetricsOrder = {
  created_at: string;
  status: string | null | undefined;
  total_amount: number;
};

export function calculateAdminOrderMetrics(
  orders: AdminMetricsOrder[],
  now = new Date()
) {
  const today = now.toDateString();
  const billableOrders = orders.filter(
    (order) => !isCancelledOrderStatus(order.status)
  );
  const totalRevenue = billableOrders.reduce(
    (sum, order) => sum + order.total_amount,
    0
  );

  return {
    totalOrders: orders.length,
    totalRevenue,
    ordersToday: orders.filter(
      (order) => new Date(order.created_at).toDateString() === today
    ).length,
    averageOrderValue: billableOrders.length
      ? totalRevenue / billableOrders.length
      : 0
  };
}
