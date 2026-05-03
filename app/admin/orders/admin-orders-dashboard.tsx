"use client";

import {
  useEffect,
  useMemo,
  useState,
  useTransition,
  type FormEvent,
  type ReactNode
} from "react";
import { useRouter } from "next/navigation";

import type { AdminOrder, OrderStatus } from "./page";

const ORDER_STATUSES: OrderStatus[] = [
  "new",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled"
];

const STATUS_LABELS: Record<OrderStatus, string> = {
  new: "Nouveau",
  confirmed: "Confirmee",
  preparing: "Preparation",
  ready: "Prete",
  delivered: "Livree",
  cancelled: "Annulee"
};

const DELIVERY_LABELS = {
  pickup: "Retrait",
  delivery: "Livraison"
};

type DashboardProps = {
  initialOrders: AdminOrder[];
};

export function LoginScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const result = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      error?: string;
    };

    setLoading(false);

    if (!response.ok || !result.success) {
      setError(result.error || "Connexion impossible.");
      return;
    }

    sessionStorage.setItem("oreshki-admin-authenticated", "true");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4 py-10 text-cocoa">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border border-almond/60 bg-white/85 p-6 shadow-soft"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-caramel">
          Administration
        </p>
        <h1 className="mt-3 font-serif text-3xl text-espresso">
          Commandes Oreshki
        </h1>
        <label className="mt-6 block text-sm font-medium text-cocoa">
          Mot de passe
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-md border-almond bg-white px-3 py-2 text-cocoa shadow-sm focus:border-caramel focus:ring-caramel"
            autoComplete="current-password"
            autoFocus
          />
        </label>
        {error ? <p className="mt-3 text-sm text-rose">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-cocoa px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-espresso disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}

export function AdminOrdersDashboard({ initialOrders }: DashboardProps) {
  const router = useRouter();
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrderId, setSelectedOrderId] = useState(
    initialOrders[0]?.id ?? ""
  );
  const [pendingStatusId, setPendingStatusId] = useState("");
  const [statusError, setStatusError] = useState("");
  const [, startTransition] = useTransition();

  useEffect(() => {
    setOrders(initialOrders);
    setSelectedOrderId((currentId) => currentId || initialOrders[0]?.id || "");
  }, [initialOrders]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      startTransition(() => router.refresh());
    }, 15000);

    return () => window.clearInterval(interval);
  }, [router, startTransition]);

  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) ?? orders[0] ?? null;

  const metrics = useMemo(() => {
    const today = new Date().toDateString();
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.total_amount,
      0
    );

    return {
      totalOrders: orders.length,
      totalRevenue,
      ordersToday: orders.filter(
        (order) => new Date(order.created_at).toDateString() === today
      ).length,
      averageOrderValue: orders.length ? totalRevenue / orders.length : 0
    };
  }, [orders]);

  async function updateStatus(orderId: string, status: OrderStatus) {
    setPendingStatusId(orderId);
    setStatusError("");

    const response = await fetch(`/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    const result = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      error?: string;
    };

    setPendingStatusId("");

    if (!response.ok || !result.success) {
      setStatusError(result.error || "Mise a jour impossible.");
      return;
    }

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }

  return (
    <main className="min-h-screen bg-cream px-4 py-6 text-cocoa sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-2 border-b border-almond/60 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-caramel">
              Administration
            </p>
            <h1 className="mt-2 font-serif text-3xl text-espresso sm:text-4xl">
              Commandes
            </h1>
          </div>
          <p className="text-sm text-cocoa/65">
            Actualisation automatique toutes les 15 secondes
          </p>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total commandes" value={metrics.totalOrders} />
          <MetricCard
            label="Chiffre d'affaires"
            value={formatCurrency(metrics.totalRevenue)}
          />
          <MetricCard label="Commandes aujourd'hui" value={metrics.ordersToday} />
          <MetricCard
            label="Panier moyen"
            value={formatCurrency(metrics.averageOrderValue)}
          />
        </section>

        {statusError ? (
          <p className="mt-4 rounded-md border border-rose/30 bg-white/80 px-4 py-3 text-sm text-rose">
            {statusError}
          </p>
        ) : null}

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
          <div className="overflow-hidden rounded-lg border border-almond/60 bg-white/85 shadow-soft">
            <div className="max-h-[68vh] overflow-auto">
              <table className="min-w-full divide-y divide-almond/50 text-left text-sm">
                <thead className="sticky top-0 bg-oat text-xs uppercase tracking-[0.12em] text-cocoa/70">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Client</th>
                    <th className="px-4 py-3 font-semibold">Telephone</th>
                    <th className="px-4 py-3 font-semibold">Livraison</th>
                    <th className="px-4 py-3 font-semibold">Total</th>
                    <th className="px-4 py-3 font-semibold">Statut</th>
                    <th className="px-4 py-3 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-almond/40">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className={
                        order.status === "new"
                          ? "bg-caramel/10"
                          : "bg-white/40"
                      }
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-4 py-3 font-medium text-espresso">
                        {order.customer_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        {order.phone}
                      </td>
                      <td className="px-4 py-3">
                        {DELIVERY_LABELS[order.delivery_method]}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 font-semibold">
                        {formatCurrency(order.total_amount)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusSelect
                          order={order}
                          disabled={pendingStatusId === order.id}
                          onChange={updateStatus}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => setSelectedOrderId(order.id)}
                          className="rounded-md border border-caramel/50 px-3 py-1.5 text-sm font-semibold text-caramel transition hover:bg-caramel hover:text-white"
                        >
                          Voir
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-cocoa/65"
                      >
                        Aucune commande pour le moment.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <OrderDetailsPanel order={selectedOrder} />
        </section>
      </div>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-lg border border-almond/60 bg-white/80 p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cocoa/60">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-espresso">{value}</p>
    </div>
  );
}

function StatusSelect({
  order,
  disabled,
  onChange
}: {
  order: AdminOrder;
  disabled: boolean;
  onChange: (orderId: string, status: OrderStatus) => void;
}) {
  return (
    <select
      value={order.status}
      disabled={disabled}
      onChange={(event) =>
        onChange(order.id, event.target.value as OrderStatus)
      }
      className="w-36 rounded-md border-almond bg-white px-2 py-1.5 text-sm text-cocoa focus:border-caramel focus:ring-caramel disabled:opacity-60"
    >
      {ORDER_STATUSES.map((status) => (
        <option key={status} value={status}>
          {STATUS_LABELS[status]}
        </option>
      ))}
    </select>
  );
}

function OrderDetailsPanel({ order }: { order: AdminOrder | null }) {
  if (!order) {
    return (
      <aside className="rounded-lg border border-almond/60 bg-white/85 p-5 shadow-soft">
        <p className="text-sm text-cocoa/65">Selectionnez une commande.</p>
      </aside>
    );
  }

  return (
    <aside className="rounded-lg border border-almond/60 bg-white/85 p-5 shadow-soft xl:sticky xl:top-6 xl:max-h-[78vh] xl:overflow-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-caramel">
            Details commande
          </p>
          <h2 className="mt-2 font-serif text-2xl text-espresso">
            {order.customer_name}
          </h2>
        </div>
        <span className="rounded-full bg-oat px-3 py-1 text-xs font-semibold text-cocoa">
          {STATUS_LABELS[order.status]}
        </span>
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <Detail label="Date" value={formatDate(order.created_at)} />
        <Detail label="Telephone" value={order.phone} />
        <Detail label="Email" value={order.email || "-"} />
        <Detail label="Contact prefere" value={order.preferred_contact_method} />
        <Detail
          label="Mode"
          value={DELIVERY_LABELS[order.delivery_method]}
        />
        <Detail label="Adresse" value={order.address || "-"} />
        <Detail label="Date souhaitee" value={formatPreferredDate(order.preferred_date)} />
        <Detail label="Notes" value={order.notes || "-"} />
      </dl>

      <div className="mt-6 border-t border-almond/50 pt-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-cocoa/70">
          Articles
        </h3>
        <div className="mt-3 space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 rounded-md bg-cream px-3 py-2 text-sm"
            >
              <div>
                <p className="font-medium text-espresso">{item.product_name}</p>
                <p className="text-cocoa/65">
                  {item.quantity} x {formatCurrency(item.unit_price)}
                </p>
              </div>
              <p className="font-semibold">{formatCurrency(item.line_total)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between border-t border-almond/50 pt-4 text-base font-semibold text-espresso">
          <span>Total</span>
          <span>{formatCurrency(order.total_amount)}</span>
        </div>
      </div>
    </aside>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-3">
      <dt className="text-cocoa/55">{label}</dt>
      <dd className="font-medium text-cocoa">{value}</dd>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

function formatPreferredDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium"
  }).format(new Date(`${value}T00:00:00`));
}
