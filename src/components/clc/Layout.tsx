import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingCart, X } from "lucide-react";
import { SUPPORT_EMAIL, SUPPORT_PHONE } from "@/lib/clc/catalog";
import { cartCount, useClc } from "@/lib/clc/store";
import { getCatalogOverrides } from "@/lib/clc/products";

export function useHydrateClc() {
  const setHydrated = useClc((s) => s.setHydrated);
  const applyCatalogOverrides = useClc((s) => s.applyCatalogOverrides);
  useEffect(() => {
    let cancelled = false;
    const unsub = useClc.persist.onFinishHydration(() => setHydrated());
    if (useClc.persist.hasHydrated()) setHydrated();
    void getCatalogOverrides()
      .then((rows) => {
        if (!cancelled) applyCatalogOverrides(rows);
      })
      .catch((error) => {
        console.warn("[CLC] Could not load database product overrides; using local catalog.", error);
      });
    const t = window.setTimeout(() => setHydrated(), 80);
    return () => {
      cancelled = true;
      unsub();
      window.clearTimeout(t);
    };
  }, [setHydrated, applyCatalogOverrides]);
}

export function Layout({ children, active = "" }: { children: React.ReactNode; active?: string }) {
  useHydrateClc();
  return (
    <div className="site-shell">
      <Header active={active} />
      <main>{children}</main>
      <Footer />
      <Toast />
    </div>
  );
}

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cart = useClc((s) => s.cart);
  const wish = useClc((s) => s.wish);
  const user = useClc((s) => s.user);
  const hydrated = useClc((s) => s.hydrated);
  const n = hydrated ? cartCount(cart) : 0;
  const w = hydrated && Array.isArray(wish) ? wish.length : 0;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="header">
        <div className="container-clc header-inner">
          <Link to="/" className="logo">
            <img src="/clc-logo.png" alt="CLC CureLifeCare" />
            <span className="logo-text">CureLifeCare</span>
          </Link>
          <nav className="nav">
            <Link to="/shop" search={{ cat: "", q: "" }} className={active === "shop" ? "active" : ""}>
              Shop
            </Link>
            <Link to="/shop" search={{ cat: "medicines", q: "" }} className={active === "medicines" ? "active" : ""}>
              Medicines
            </Link>
            <Link to="/wishlist" className={active === "wishlist" ? "active" : ""}>
              Wishlist
            </Link>
            <Link to="/orders" className={active === "orders" ? "active" : ""}>
              Orders
            </Link>
            <Link to="/help" className={active === "help" ? "active" : ""}>
              Help
            </Link>
            <Link to="/about" className={active === "about" ? "active" : ""}>
              About
            </Link>
          </nav>
          <div className="header-actions">
            <Link to="/shop" search={{ cat: "", q: "" }} className="icon-btn hide-sm" aria-label="Search">
              <Search size={18} />
            </Link>
            <Link to="/wishlist" className="icon-btn hide-sm" aria-label="Wishlist">
              <Heart size={18} />
              {w > 0 ? <span className="badge">{w}</span> : null}
            </Link>
            <Link to="/cart" className="icon-btn" aria-label="Cart">
              <ShoppingCart size={18} />
              {n > 0 ? <span className="badge">{n}</span> : null}
            </Link>
            {hydrated && user ? (
              <Link to={user.role === "admin" ? "/admin" : "/orders"} className="btn btn-primary">
                {user.role === "admin" ? "Admin" : "Account"}
              </Link>
            ) : (
              <Link to="/login" search={{ next: "", role: "" }} className="btn btn-primary">
                Login
              </Link>
            )}
            <button
              type="button"
              className="icon-btn nav-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((e) => !e)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <div className={`mobile-drawer ${open ? "open" : ""}`}>
          <Link to="/shop" search={{ cat: "", q: "" }} className={active === "shop" ? "active" : ""}>
            Shop
          </Link>
          <Link to="/shop" search={{ cat: "medicines", q: "" }} className={active === "medicines" ? "active" : ""}>
            Medicines
          </Link>
          <Link to="/wishlist" className={active === "wishlist" ? "active" : ""}>
            Wishlist
          </Link>
          <Link to="/orders" className={active === "orders" ? "active" : ""}>
            Orders
          </Link>
          <Link to="/help" className={active === "help" ? "active" : ""}>
            Help
          </Link>
          <Link to="/about">About</Link>
          <Link to="/prescription">Upload prescription</Link>
          {hydrated && user ? (
            <Link to={user.role === "admin" ? "/admin" : "/orders"}>
              {user.role === "admin" ? "Admin dashboard" : "My account"}
            </Link>
          ) : (
            <Link to="/login" search={{ next: "", role: "" }}>
              Login / Register
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-clc footer-grid">
        <div className="footer-brand">
          <img
            src="/clc-logo.png"
            alt="CLC"
            style={{ height: 36, width: "auto" }}
          />
          <p>
            A trusted healthcare storefront for medicines, healthcare essentials and wellness products. Your health
            is our priority.
          </p>
        </div>
        <div>
          <h4>CONTACT US</h4>
          <p>{SUPPORT_PHONE}</p>
          <p>{SUPPORT_EMAIL}</p>
          <p>India</p>
        </div>
        <div>
          <h4>QUICK LINKS</h4>
          <Link to="/about">About Us</Link>
          <Link to="/help">Help & FAQ</Link>
          <Link to="/track" search={{ id: "" }}>Track Order</Link>
          <Link to="/prescription">Upload Prescription</Link>
          <Link to="/shop" search={{ cat: "", q: "" }}>Shop all</Link>
        </div>
        <div>
          <h4>MY ACCOUNT</h4>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/login" search={{ next: "", role: "" }}>Login / Register</Link>
        </div>
        <div>
          <h4>OUR PROMISE</h4>
          <p>100% Genuine Products</p>
          <p>Secure UPI QR & COD</p>
          <p>Easy Returns</p>
          <p>Fast Delivery</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container-clc">
          © {new Date().getFullYear()} CLC CureLifeCare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function Toast() {
  const toast = useClc((s) => s.toast);
  return <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>;
}
