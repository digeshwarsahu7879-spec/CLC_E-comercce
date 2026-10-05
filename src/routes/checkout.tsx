import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { formatINR } from "@/lib/clc/catalog";
import { cartItems, cartTotals, useClc } from "@/lib/clc/store";
import { Layout } from "@/components/clc/Layout";
import { UpiQr } from "@/components/clc/UpiQr";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout — CLC CureLifeCare" }] }),
});

function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useClc((s) => s.cart);
  const getStock = useClc((s) => s.getStock);
  const user = useClc((s) => s.user);
  const placeOrder = useClc((s) => s.placeOrder);
  const items = cartItems(cart, getStock);
  const { subtotal, shipping, total } = cartTotals(items);
  const [method, setMethod] = useState<"upi" | "cod">("upi");

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-clc">
          <div className="page-hero">
            <div className="breadcrumb">
              <Link to="/">Home</Link> · Checkout
            </div>
            <h1>Checkout</h1>
          </div>
          <div className="empty-cart card">
            <h2>Your cart is empty</h2>
            <p>Add products before checkout.</p>
            <Link to="/shop" search={{ cat: "", q: "" }} className="btn btn-primary">
              Browse products
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-clc">
        <div className="page-hero">
          <div className="breadcrumb">
            <Link to="/">Home</Link> · <Link to="/cart">Cart</Link> · Checkout
          </div>
          <h1>Checkout</h1>
          <p>UPI QR & Cash on Delivery</p>
        </div>
        <form
          className="checkout-grid"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const order = placeOrder({
              method: (fd.get("method") as "upi" | "cod") || method,
              total,
              subtotal,
              shipping,
              items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price, slug: i.slug })),
              customer: {
                name: String(fd.get("name") || ""),
                phone: String(fd.get("phone") || ""),
                address: String(fd.get("address") || ""),
                city: String(fd.get("city") || ""),
                pin: String(fd.get("pin") || ""),
                email: user?.email,
              },
            });
            navigate({ to: "/order-success", search: { id: order.id } });
          }}
        >
          <div>
            <div className="card checkout-section">
              <h2>Delivery details</h2>
              <div className="form-row two">
                <div>
                  <label className="form-label">Full name</label>
                  <input className="form-input" name="name" required placeholder="Your name" defaultValue={user?.name || ""} />
                </div>
                <div>
                  <label className="form-label">Phone</label>
                  <input className="form-input" name="phone" required placeholder="10-digit mobile" pattern="[0-9]{10}" />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label className="form-label">Address</label>
                  <input className="form-input" name="address" required placeholder="House / street" />
                </div>
              </div>
              <div className="form-row two">
                <div>
                  <label className="form-label">City</label>
                  <input className="form-input" name="city" required />
                </div>
                <div>
                  <label className="form-label">PIN code</label>
                  <input className="form-input" name="pin" required pattern="[0-9]{6}" />
                </div>
              </div>
            </div>
            <div className="card checkout-section">
              <h2>Payment method</h2>
              <div className="pay-options">
                <label className={`pay-option ${method === "upi" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="method"
                    value="upi"
                    checked={method === "upi"}
                    onChange={() => setMethod("upi")}
                  />
                  <div>
                    <strong>UPI QR</strong>
                    <span>Scan the live QR or open PhonePe / Google Pay · Pay exact amount</span>
                  </div>
                </label>
                <label className={`pay-option ${method === "cod" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="method"
                    value="cod"
                    checked={method === "cod"}
                    onChange={() => setMethod("cod")}
                  />
                  <div>
                    <strong>Cash on Delivery</strong>
                    <span>Pay when your order arrives</span>
                  </div>
                </label>
              </div>
              {method === "upi" ? (
                <UpiQr amount={total} note="CLC CureLifeCare order" />
              ) : null}
            </div>
          </div>
          <div className="card cart-summary" style={{ position: "sticky", top: 80 }}>
            <h2>Order summary</h2>
            {items.map((i) => (
              <div className="summary-row" key={i.id}>
                <span>
                  {i.name} × {i.qty}
                </span>
                <span>{formatINR(i.lineTotal)}</span>
              </div>
            ))}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: 16 }}>
              Place order
            </button>
            <Link to="/cart" className="btn btn-ghost btn-block" style={{ marginTop: 8 }}>
              Back to cart
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}
