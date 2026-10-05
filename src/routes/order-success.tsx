import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { formatINR, statusClass, statusLabel } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";
import { Layout } from "@/components/clc/Layout";
import { UpiQr } from "@/components/clc/UpiQr";

type SuccessSearch = { id: string };

export const Route = createFileRoute("/order-success")({
  component: OrderSuccessPage,
  validateSearch: (s: Record<string, unknown>): SuccessSearch => ({
    id: typeof s.id === "string" ? s.id : "",
  }),
  head: () => ({ meta: [{ title: "Order placed — CLC CureLifeCare" }] }),
});

function OrderSuccessPage() {
  const { id } = Route.useSearch();
  const orders = useClc((s) => s.orders);
  const order = orders.find((o) => o.id === id);
  const showUpi = Boolean(order && order.method === "upi" && order.status === "payment_pending");

  return (
    <Layout>
      <div className="container-clc">
        {!order ? (
          <div className="empty-cart">
            <h2>Order not found</h2>
            <Link to="/orders" className="btn btn-primary">
              My orders
            </Link>
          </div>
        ) : (
          <>
            <div className="success-hero">
              <div className="success-icon">
                <Check size={32} />
              </div>
              <h1>{showUpi ? "Order placed — complete UPI payment" : "Order placed successfully"}</h1>
              <p>
                {order.method === "upi"
                  ? "Scan the QR below (or open your UPI app) and pay the exact amount. We’ll confirm the order after payment is verified."
                  : "Your COD order is confirmed. We’ll pack and ship it soon."}
              </p>
              <p style={{ fontWeight: 600, color: "var(--color-ink)" }}>Order ID: {order.id}</p>
            </div>
            {showUpi ? (
              <div style={{ maxWidth: 480, margin: "0 auto 28px" }}>
                <UpiQr
                  amount={order.total}
                  note={`CLC ${order.id}`}
                  reference={order.id}
                  hint="Pay the exact amount. Keep this page open until the payment is done."
                />
              </div>
            ) : null}
            <div className="card" style={{ maxWidth: 560, margin: "0 auto 48px", padding: 20 }}>
              <div className="summary-row">
                <span>Status</span>
                <span className={`status-pill ${statusClass(order.status)}`}>{statusLabel(order.status)}</span>
              </div>
              <div className="summary-row">
                <span>Payment</span>
                <span>{order.method === "upi" ? "UPI QR" : "Cash on Delivery"}</span>
              </div>
              <div className="summary-row">
                <span>Total</span>
                <span>
                  <strong>{formatINR(order.total)}</strong>
                </span>
              </div>
              <div className="summary-row">
                <span>Deliver to</span>
                <span>
                  {order.customer.name}, {order.customer.city}
                </span>
              </div>
              <div style={{ marginTop: 12, fontSize: "0.875rem", color: "var(--color-muted)" }}>
                {order.items.map((i) => `${i.name} × ${i.qty}`).join(" · ")}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 20 }}>
                <Link to="/orders" className="btn btn-primary">
                  View my orders
                </Link>
                <Link to="/track" search={{ id: order.id }} className="btn btn-ghost">
                  Track order
                </Link>
                <Link to="/shop" search={{ cat: "", q: "" }} className="btn btn-ghost">
                  Continue shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
