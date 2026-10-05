import { createFileRoute } from "@tanstack/react-router";
import { formatINR } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";
import { AdminLayout } from "@/components/clc/AdminLayout";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomers,
  head: () => ({ meta: [{ title: "Admin Customers — CLC" }] }),
});

function AdminCustomers() {
  const orders = useClc((s) => s.orders);
  const map: Record<string, { name: string; phone: string; city: string; orders: number; spent: number }> = {};
  orders.forEach((o) => {
    const key = o.customer?.phone || o.customer?.name || o.id;
    if (!map[key]) {
      map[key] = {
        name: o.customer?.name || "—",
        phone: o.customer?.phone || "—",
        city: o.customer?.city || "—",
        orders: 0,
        spent: 0,
      };
    }
    map[key].orders++;
    map[key].spent += o.total || 0;
  });
  const rows = Object.values(map);

  return (
    <AdminLayout active="customers">
      <h1 className="admin-page-title">Customers</h1>
      <p className="admin-page-sub">Derived from orders placed in this browser</p>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>City</th>
                <th>Orders</th>
                <th>Total spent</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: 24, color: "var(--color-muted)" }}>
                    No customer data yet.
                  </td>
                </tr>
              ) : (
                rows.map((c) => (
                  <tr key={c.phone + c.name}>
                    <td>{c.name}</td>
                    <td>{c.phone}</td>
                    <td>{c.city}</td>
                    <td>{c.orders}</td>
                    <td>{formatINR(c.spent)}</td>
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
