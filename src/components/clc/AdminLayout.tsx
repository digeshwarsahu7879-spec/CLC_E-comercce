import { Link, Navigate, useRouterState } from "@tanstack/react-router";
import { useClc } from "@/lib/clc/store";
import { useHydrateClc } from "./Layout";

export function AdminLayout({
  children,
  active,
}: {
  children: React.ReactNode;
  active: string;
}) {
  useHydrateClc();
  const user = useClc((s) => s.user);
  const hydrated = useClc((s) => s.hydrated);
  const logout = useClc((s) => s.logout);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (!hydrated) {
    return (
      <div className="admin-layout">
        <p style={{ color: "var(--color-muted)" }}>Loading admin…</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" search={{ next: pathname || "/admin", role: "admin" }} />;
  }

  return (
    <div className="site-shell">
      <div className="preview-banner admin-banner">
        <strong>Admin</strong> · CLC CureLifeCare dashboard
      </div>
      <header className="admin-header">
        <div className="admin-header-inner">
          <Link to="/" className="logo">
            <img src="/clc-logo.png" alt="CLC" />
            <span className="logo-text">CLC Admin</span>
          </Link>
          <nav className="admin-nav">
            <Link to="/admin" className={active === "dash" ? "active" : ""}>
              Dashboard
            </Link>
            <Link to="/admin/orders" className={active === "orders" ? "active" : ""}>
              Orders
            </Link>
            <Link to="/admin/products" className={active === "products" ? "active" : ""}>
              Products
            </Link>
            <Link to="/admin/stock" className={active === "stock" ? "active" : ""}>
              Stock
            </Link>
            <Link to="/admin/qr" className={active === "qr" ? "active" : ""}>
              QR
            </Link>
            <Link to="/admin/prescriptions" className={active === "rx" ? "active" : ""}>
              Prescriptions
            </Link>
            <Link to="/admin/customers" className={active === "customers" ? "active" : ""}>
              Customers
            </Link>
          </nav>
          <div className="admin-header-actions">
            <span className="admin-user">{user.name}</span>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => logout()}>
              Sign out
            </button>
            <Link to="/" className="btn btn-cream btn-sm">
              Storefront
            </Link>
          </div>
        </div>
      </header>
      <div className="admin-layout">{children}</div>
      <ToastOnly />
    </div>
  );
}

function ToastOnly() {
  const toast = useClc((s) => s.toast);
  return <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>;
}
