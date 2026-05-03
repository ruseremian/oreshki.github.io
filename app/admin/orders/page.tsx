import { Metadata } from "next";

import { AdminOrdersDashboard, LoginScreen } from "./admin-orders-dashboard";
import { hasAdminSession } from "@/lib/admin-auth";
import {
  createSupabaseAdmin,
  MissingSupabaseEnvError
} from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "Admin commandes | Oreshki"
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export type AdminOrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};

export type AdminOrder = {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  preferred_contact_method: string;
  delivery_method: "pickup" | "delivery";
  address: string | null;
  preferred_date: string | null;
  notes: string | null;
  total_amount: number;
  status: OrderStatus;
  created_at: string;
  items: AdminOrderItem[];
};

export type OrderStatus =
  | "new"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

type RawOrder = Omit<AdminOrder, "total_amount" | "items"> & {
  total_amount: string | number;
};

type RawOrderItem = Omit<AdminOrderItem, "unit_price" | "line_total"> & {
  unit_price: string | number;
  line_total: string | number;
};

export default async function AdminOrdersPage() {
  if (!(await hasAdminSession())) {
    return <LoginScreen />;
  }

  const result = await getOrders();

  if (!result.success) {
    return (
      <main className="min-h-screen bg-cream px-4 py-10 text-cocoa sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl rounded-lg border border-rose/30 bg-white/80 p-6 shadow-soft">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose">
            Admin commandes
          </p>
          <h1 className="mt-3 font-serif text-3xl text-espresso">
            Impossible de charger les commandes
          </h1>
          <p className="mt-3 text-sm text-cocoa/75">{result.error}</p>
        </section>
      </main>
    );
  }

  return <AdminOrdersDashboard initialOrders={result.orders} />;
}

async function getOrders() {
  try {
    const supabase = createSupabaseAdmin();
    const ordersResult = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (ordersResult.error) {
      return { success: false as const, error: ordersResult.error.message };
    }

    const rawOrders = (ordersResult.data ?? []) as RawOrder[];
    const orderIds = rawOrders.map((order) => order.id);
    let rawItems: RawOrderItem[] = [];

    if (orderIds.length > 0) {
      const itemsResult = await supabase
        .from("order_items")
        .select("*")
        .in("order_id", orderIds);

      if (itemsResult.error) {
        return { success: false as const, error: itemsResult.error.message };
      }

      rawItems = (itemsResult.data ?? []) as RawOrderItem[];
    }

    const itemsByOrderId = rawItems.reduce<Record<string, AdminOrderItem[]>>(
      (groups, item) => {
        const normalizedItem = {
          ...item,
          unit_price: Number(item.unit_price),
          line_total: Number(item.line_total)
        };

        groups[item.order_id] = [...(groups[item.order_id] ?? []), normalizedItem];
        return groups;
      },
      {}
    );

    return {
      success: true as const,
      orders: rawOrders.map((order) => ({
        ...order,
        total_amount: Number(order.total_amount),
        items: itemsByOrderId[order.id] ?? []
      }))
    };
  } catch (error) {
    if (error instanceof MissingSupabaseEnvError) {
      return {
        success: false as const,
        error: `Variables Supabase manquantes: ${error.missingVariables.join(", ")}`
      };
    }

    return {
      success: false as const,
      error:
        error instanceof Error
          ? error.message
          : "Erreur inattendue pendant le chargement."
    };
  }
}
