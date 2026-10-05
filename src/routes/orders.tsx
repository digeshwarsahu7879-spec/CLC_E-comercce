import { createFileRoute, Link } from "@tanstack/react-router";
import { formatINR, statusClass, statusLabel } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";
import { Layout } from "@/components/clc/Layout";

export const Route = createFileRoute("/orders")({
  component: OrdersPage,
  head: () => ({ meta: [{ title: "My Orders — CLC CureLifeCare" }] }),
});

function OrdersPage() {
  const orders = useClc((s) => s.orders);

  return (
    <Layout active="orders">
      <div className="container-clc">
        <div className="page-hero">
          <div className="breadcrumb">
            <Link to="/">Home</Link> · Orders
          </div>
          <h1>My orders</h1>
          <p>Orders placed in this browser</p>
        </div>
        <div style={{ paddingBottom: 48 }}>
          {orders.length === 0 ? (
            <div className="empty-cart card">
              <h2>No orders yet</h2>
              <p>Place an order from the cart to see it here.</p>
              <Link to="/shop" search={{ cat: "", q: "" }} className="btn btn-primary">
                Shop now
              </Link>
            </div>
          ) : (
            orders.map((o) => (
              <div className="card order-card" key={o.id}>
                <div className="order-card-head">
                  <div>
                    <div className="oid">{o.id}</div>
                    <div className="odate">{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                  <span className={`status-pill ${statusClass(o.status)}`}>{statusLabel(o.status)}</span>
                </div>
                <div className="order-items">{o.items.map((i) => `${i.name} × ${i.qty}`).join(" · ")}</div>
                <div className="order-foot">
                  <strong>{formatINR(o.total)}</strong>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Link to="/track" search={{ id: o.id }} className="btn btn-ghost btn-sm">
                      Track
                    </Link>
                    <Link to="/order-success" search={{ id: o.id }} className="btn btn-cream btn-sm">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
