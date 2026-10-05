import { createFileRoute, Link } from "@tanstack/react-router";
import { formatINR } from "@/lib/clc/catalog";
import { cartItems, cartTotals, useClc } from "@/lib/clc/store";
import { Layout } from "@/components/clc/Layout";
import { Pack } from "@/components/clc/ProductCard";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Cart — CLC CureLifeCare" }] }),
});

function CartPage() {
  const cart = useClc((s) => s.cart);
  const getStock = useClc((s) => s.getStock);
  const setQty = useClc((s) => s.setQty);
  const removeFromCart = useClc((s) => s.removeFromCart);
  const items = cartItems(cart, getStock);
  const { subtotal, shipping, total } = cartTotals(items);

  return (
    <Layout>
      <div className="container-clc">
        <div className="page-hero">
          <div className="breadcrumb">
            <Link to="/">Home</Link> · Cart
          </div>
          <h1>Your cart</h1>
          <p>{items.length ? `${items.length} item(s) in your cart` : ""}</p>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart card">
            <h2>Your cart is empty</h2>
            <p>Add medicines and healthcare products to get started.</p>
            <Link to="/shop" search={{ cat: "", q: "" }} className="btn btn-primary">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {items.map((i) => (
                <div className="card cart-item" key={i.id}>
                  <Link to="/product/$slug" params={{ slug: i.slug }} className="cart-item-img">
                    <Pack tone={i.tone} />
                  </Link>
                  <div className="cart-item-info">
                    <p className="brand">{i.brand}</p>
                    <h3>
                      <Link to="/product/$slug" params={{ slug: i.slug }}>
                        {i.name}
                      </Link>
                    </h3>
                    <p className="line-price">{formatINR(i.price)} each</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="qty-control">
                      <button type="button" onClick={() => setQty(i.id, i.qty - 1)}>
                        −
                      </button>
                      <span>{i.qty}</span>
                      <button type="button" onClick={() => setQty(i.id, i.qty + 1)}>
                        +
                      </button>
                    </div>
                    <strong>{formatINR(i.lineTotal)}</strong>
                    <button type="button" className="cart-remove" onClick={() => removeFromCart(i.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="card cart-summary">
              <h2>Order summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatINR(shipping)}</span>
              </div>
              {shipping > 0 ? (
                <p style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginBottom: 12 }}>
                  Free shipping on orders ₹499+
                </p>
              ) : null}
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary btn-block" style={{ marginTop: 16 }}>
                Proceed to checkout
              </Link>
              <Link to="/shop" search={{ cat: "", q: "" }} className="btn btn-ghost btn-block" style={{ marginTop: 8 }}>
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
