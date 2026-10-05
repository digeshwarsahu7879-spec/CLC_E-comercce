import { createFileRoute } from "@tanstack/react-router";
import { formatINR, statusClass, statusLabel, type OrderStatus } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";
import { AdminLayout } from "@/components/clc/AdminLayout";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
  head: () => ({ meta: [{ title: "Admin Orders — CLC" }] }),
});

function AdminOrders() {
  const orders = useClc((s) => s.orders);
  const setOrderStatus = useClc((s) => s.setOrderStatus);
  const showToast = useClc((s) => s.showToast);

  function act(id: string, status: OrderStatus) {
    setOrderStatus(id, status);
    showToast("Order " + statusLabel(status).toLowerCase());
  }

  return (
    <AdminLayout active="orders">
      <h1 className="admin-page-title">Orders</h1>
      <p className="admin-page-sub">Confirm UPI payments, update status, cancel</p>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Items</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: 28, color: "var(--color-muted)" }}>
                    No orders in this browser yet.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <strong>{o.id}</strong>
                      <br />
                      <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
                        {new Date(o.createdAt).toLocaleString()}
                      </span>
                      <br />
                      <span style={{ fontSize: "0.75rem" }}>{o.method === "upi" ? "UPI QR" : "COD"}</span>
                    </td>
                    <td style={{ maxWidth: 200, fontSize: "0.8rem", color: "var(--color-muted)" }}>
                      {o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
                    </td>
                    <td>
                      {o.customer?.name || "—"}
                      <br />
                      <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
                        {o.customer?.phone || ""} · {o.customer?.city || ""}
                      </span>
                    </td>
                    <td>
                      <strong>{formatINR(o.total)}</strong>
                    </td>
                    <td>
                      <span className={`status-pill ${statusClass(o.status)}`}>{statusLabel(o.status)}</span>
                    </td>
                    <td>
                      <div className="admin-actions">
                        {o.status === "payment_pending" ? (
                          <>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => act(o.id, "confirmed")}>
                              Confirm pay
                            </button>
                            <button type="button" className="btn btn-ghost btn-sm" onClick={() => act(o.id, "cancelled")}>
                              Cancel
                            </button>
                          </>
                        ) : null}
                        {o.status === "confirmed" ? (
                          <>
                            <button type="button" className="btn btn-primary btn-sm" onClick={() => act(o.id, "shipped")}>
                              Ship
                            </button>
                            <button type="button" className="btn btn-ghost btn-sm" onClick={() => act(o.id, "cancelled")}>
                              Cancel
                            </button>
                          </>
                        ) : null}
                        {o.status === "shipped" ? (
                          <button type="button" className="btn btn-primary btn-sm" onClick={() => act(o.id, "delivered")}>
                            Delivered
                          </button>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
