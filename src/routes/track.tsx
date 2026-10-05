import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { formatINR, statusClass, statusLabel } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";
import { Layout } from "@/components/clc/Layout";

type TrackSearch = { id: string };

export const Route = createFileRoute("/track")({
  component: TrackPage,
  validateSearch: (s: Record<string, unknown>): TrackSearch => ({
    id: typeof s.id === "string" ? s.id : "",
  }),
  head: () => ({ meta: [{ title: "Track Order — CLC CureLifeCare" }] }),
});

function TrackPage() {
  const { id: pre } = Route.useSearch();
  const orders = useClc((s) => s.orders);
  const [id, setId] = useState(pre);
  const [query, setQuery] = useState(pre);
  const order = orders.find((o) => o.id === query);

  return (
    <Layout>
      <div className="container-clc">
        <div className="page-hero">
          <div className="breadcrumb">
            <Link to="/">Home</Link> · Track order
          </div>
          <h1>Track order</h1>
          <p>Enter your order ID from the confirmation screen</p>
        </div>
        <div className="card" style={{ maxWidth: 520, padding: 24, marginBottom: 24 }}>
          <form
            className="form-row"
            style={{ display: "flex", gap: 8, alignItems: "end" }}
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(id.trim());
            }}
          >
            <div style={{ flex: 1 }}>
              <label className="form-label">Order ID</label>
              <input className="form-input" value={id} onChange={(e) => setId(e.target.value)} required placeholder="CLC-…" />
            </div>
            <button type="submit" className="btn btn-primary">
              Track
            </button>
          </form>
        </div>
        <div style={{ maxWidth: 560, paddingBottom: 48 }}>
          {query && !order ? (
            <div className="card" style={{ padding: 20, color: "var(--color-muted)" }}>
              No order found with that ID in this browser.
            </div>
          ) : null}
          {order ? <TrackCard order={order} /> : null}
        </div>
      </div>
    </Layout>
  );
}

function TrackCard({ order }: { order: { id: string; createdAt: string; status: string; total: number; method: string; items: { name: string; qty: number }[]; customer: { name: string; city: string; pin: string } } }) {
  const statusOrder: Record<string, number> = {
    payment_pending: 0,
    confirmed: 1,
    shipped: 2,
    delivered: 3,
    cancelled: -1,
  };
  const idx = statusOrder[order.status] ?? 0;
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <strong>{order.id}</strong>
        <span className={`status-pill ${statusClass(order.status)}`}>{statusLabel(order.status)}</span>
      </div>
      <p style={{ fontSize: "0.85rem", color: "var(--color-muted)", marginBottom: 16 }}>
        Placed {new Date(order.createdAt).toLocaleString()} · {formatINR(order.total)} · {order.method === "upi" ? "UPI" : "COD"}
      </p>
      <div className="track-steps">
        <div className={`track-step ${idx >= 0 ? "done" : ""} ${order.status === "payment_pending" ? "current" : ""}`}>
          Payment
        </div>
        <div className={`track-step ${idx >= 1 ? "done" : ""} ${order.status === "confirmed" ? "current" : ""}`}>
          Confirmed
        </div>
        <div className={`track-step ${idx >= 2 ? "done" : ""} ${order.status === "shipped" ? "current" : ""}`}>
          Shipped
        </div>
        <div className={`track-step ${idx >= 3 ? "done current" : ""}`}>Delivered</div>
      </div>
      <p style={{ fontSize: "0.875rem", color: "var(--color-muted)" }}>
        {order.items.map((i) => `${i.name} × ${i.qty}`).join(" · ")}
      </p>
      <p style={{ fontSize: "0.875rem", marginTop: 8 }}>
        {order.customer.name} · {order.customer.city} {order.customer.pin}
      </p>
    </div>
  );
}
