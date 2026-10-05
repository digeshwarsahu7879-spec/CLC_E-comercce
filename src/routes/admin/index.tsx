import { createFileRoute, Link } from "@tanstack/react-router";
import { formatINR, statusClass, statusLabel } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";
import { AdminLayout } from "@/components/clc/AdminLayout";

export const Route = createFileRoute("/admin/")({
  component: AdminDash,
  head: () => ({ meta: [{ title: "Admin Dashboard — CLC" }] }),
});

function AdminDash() {
  const orders = useClc((s) => s.orders);
  const getStock = useClc((s) => s.getStock);
  const listProducts = useClc((s) => s.listProducts);
  const customProducts = useClc((s) => s.customProducts);
  const productEdits = useClc((s) => s.productEdits);
  const deletedProductIds = useClc((s) => s.deletedProductIds);
  void customProducts;
  void productEdits;
  void deletedProductIds;

  const pending = orders.filter((o) => o.status === "payment_pending").length;
  const revenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + (o.total || 0), 0);
  const live = listProducts().map((p) => ({ ...p, stock: getStock(p.id) }));
  const lowStock = live.filter((p) => p.stock > 0 && p.stock <= 20).length;
  const outOfStock = live.filter((p) => p.stock < 1).length;
  const recent = orders.slice(0, 8);

  const stats = [
    { label: "Orders", value: String(orders.length) },
    { label: "Pending payment", value: String(pending) },
    { label: "Revenue", value: formatINR(revenue) },
    { label: "Products", value: String(live.length) },
    { label: "Low stock", value: String(lowStock) },
    { label: "Out of stock", value: String(outOfStock) },
  ];

  return (
    <AdminLayout active="dash">
      <h1 className="admin-page-title">Dashboard</h1>
      <p className="admin-page-sub">Overview of store activity</p>
      <div className="stat-grid">
        {stats.map((s) => (
          <div className="card stat-card" key={s.label}>
            <div className="label">{s.label}</div>
            <div className="value">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--color-line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong>Recent orders</strong>
          <Link to="/admin/orders" className="btn btn-ghost btn-sm">
            View all
          </Link>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ color: "var(--color-muted)", padding: 24 }}>
                    No orders yet — place one from the storefront.
                  </td>
                </tr>
              ) : (
                recent.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <strong>{o.id}</strong>
                      <br />
                      <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
                        {new Date(o.createdAt).toLocaleString()}
                      </span>
                    </td>
                    <td>
                      {o.customer?.name || "—"}
                      <br />
                      <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>{o.customer?.phone || ""}</span>
                    </td>
                    <td>{formatINR(o.total)}</td>
                    <td>{o.method === "upi" ? "UPI" : "COD"}</td>
                    <td>
                      <span className={`status-pill ${statusClass(o.status)}`}>{statusLabel(o.status)}</span>
                    </td>
                    <td>
                      <Link to="/admin/orders" className="btn btn-ghost btn-sm">
                        Manage
                      </Link>
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
