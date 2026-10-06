import { createFileRoute } from "@tanstack/react-router";
import { formatINR, statusClass, statusLabel, type OrderStatus } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";
import { AdminLayout } from "@/components/clc/AdminLayout";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
  head: () => ({ meta: [{ title: "Admin Orders — CLC" }] }),
});

const STEPS = ["confirmed", "shipped", "delivered"] as const;

function AdminOrders() {
  const orders = useClc((s) => s.orders);
  const setOrderStatus = useClc((s) => s.setOrderStatus);
  const removeOrder = useClc((s) => s.removeOrder);
  const showToast = useClc((s) => s.showToast);

  function act(id: string, status: OrderStatus) {
    setOrderStatus(id, status);
    showToast("Order " + statusLabel(status).toLowerCase());
  }

  return (
    <AdminLayout active="orders">
      <h1 className="admin-page-title">Orders</h1>
      <p className="admin-page-sub">Confirm the order, then mark it shipped and delivered. Remove appears after delivery.</p>
      <div style={{ display: "grid", gap: 12 }}>
        {orders.length === 0 ? (
          <div className="card" style={{ padding: 20, color: "var(--color-muted)" }}>
            No orders yet. Place an order from the store on this phone, then open Admin → Orders.
          </div>
        ) : (
          orders.map((o) => {
            const step = STEPS.indexOf(o.status as (typeof STEPS)[number]);
            return (
              <article key={o.id} className="card" style={{ padding: 14, display: "grid", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "flex-start" }}>
                  <div>
                    <strong>{o.id}</strong>
                    <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "var(--color-muted)" }}>
                      {new Date(o.createdAt).toLocaleString()} · {o.method === "upi" ? "UPI QR" : "Cash on delivery"}
                    </p>
                  </div>
                  <span className={`status-pill ${statusClass(o.status)}`}>{statusLabel(o.status)}</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.9rem" }}>{o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}</p>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-muted)" }}>
                  {o.customer?.name || "Customer"} · {o.customer?.phone || ""} · {o.customer?.city || ""}
                </p>
                <strong>{formatINR(o.total)}</strong>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--color-muted)" }}>
                  Confirmed → Shipped → Delivered
                  {step >= 0 ? ` · step ${step + 1} of 3` : ""}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {o.status === "payment_pending" ? (
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => act(o.id, "confirmed")}>
                      Confirm order
                    </button>
                  ) : null}
                  {o.status === "confirmed" ? (
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => act(o.id, "shipped")}>
                      Mark shipped
                    </button>
                  ) : null}
                  {o.status === "shipped" ? (
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => act(o.id, "delivered")}>
                      Mark delivered
                    </button>
                  ) : null}
                  {o.status === "delivered" ? (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      style={{ color: "var(--color-danger, #b91c1c)" }}
                      onClick={() => {
                        if (confirm(`Remove delivered order ${o.id}?`)) removeOrder(o.id);
                      }}
                    >
                      Remove
                    </button>
                  ) : null}
                  {o.status !== "delivered" && o.status !== "cancelled" ? (
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => act(o.id, "cancelled")}>
                      Cancel
                    </button>
                  ) : null}
                </div>
              </article>
            );
          })
        )}
      </div>
    </AdminLayout>
  );
}
