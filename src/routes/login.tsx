import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/clc/Layout";
import { useClc } from "@/lib/clc/store";

type LoginSearch = { next: string; role: string };

export const Route = createFileRoute("/login")({
  component: LoginPage,
  validateSearch: (s: Record<string, unknown>): LoginSearch => ({
    next: typeof s.next === "string" ? s.next : "",
    role: typeof s.role === "string" ? s.role : "",
  }),
  head: () => ({ meta: [{ title: "Login — CLC CureLifeCare" }] }),
});

function LoginPage() {
  const { next, role } = Route.useSearch();
  const router = useRouter();
  const user = useClc((s) => s.user);
  const login = useClc((s) => s.login);
  const register = useClc((s) => s.register);
  const logout = useClc((s) => s.logout);
  const showToast = useClc((s) => s.showToast);
  const [tab, setTab] = useState<"login" | "register">("login");
  const [error, setError] = useState("");

  function go(destUser: { role: string }) {
    const dest = next || (destUser.role === "admin" ? "/admin" : "/");
    router.history.push(dest);
  }

  return (
    <Layout>
      <div className="container-clc">
        <div className="page-hero" style={{ textAlign: "center" }}>
          <div className="breadcrumb">
            <Link to="/">Home</Link> · Account
          </div>
        </div>
        <div className="card auth-card">
          {user ? (
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: 8 }}>Signed in</h1>
              <p style={{ color: "var(--color-muted)", marginBottom: 4 }}>
                <strong>{user.name}</strong>
              </p>
              <p style={{ color: "var(--color-muted)", fontSize: "0.9rem", marginBottom: 4 }}>{user.email}</p>
              <p style={{ marginBottom: 16 }}>
                <span className={`status-pill ${user.role === "admin" ? "status-info" : "status-ok"}`}>{user.role}</span>
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {user.role === "admin" ? (
                  <Link to="/admin" className="btn btn-primary">
                    Open admin
                  </Link>
                ) : null}
                <Link to="/orders" className="btn btn-ghost">
                  My orders
                </Link>
                <Link to="/" className="btn btn-cream">
                  Storefront
                </Link>
                <button type="button" className="btn btn-ghost" onClick={() => logout()}>
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="auth-tabs">
                <button
                  type="button"
                  className={tab === "login" ? "active" : ""}
                  onClick={() => {
                    setTab("login");
                    setError("");
                  }}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={tab === "register" ? "active" : ""}
                  onClick={() => {
                    setTab("register");
                    setError("");
                  }}
                >
                  Register
                </button>
              </div>
              {error ? <div className="auth-error">{error}</div> : null}
              {tab === "login" ? (
                <div>
                  <h1>Welcome back</h1>
                  <p className="sub">{role === "admin" ? "Admin access required" : "Sign in to continue"}</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      const res = login(String(fd.get("email")), String(fd.get("password")));
                      if (!res.ok) {
                        setError(res.error);
                        return;
                      }
                      showToast(res.user.role === "admin" ? "Signed in as admin" : "Signed in");
                      go(res.user);
                    }}
                  >
                    <div className="form-row">
                      <div>
                        <label className="form-label">Email</label>
                        <input
                          className="form-input"
                          type="email"
                          name="email"
                          required
                          placeholder="you@email.com"
                          autoComplete="username"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div>
                        <label className="form-label">Password</label>
                        <input
                          className="form-input"
                          type="password"
                          name="password"
                          required
                          placeholder="••••••••"
                          autoComplete="current-password"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign in
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <h1>Create account</h1>
                  <p className="sub">Create a customer account to order</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const fd = new FormData(e.currentTarget);
                      const res = register(String(fd.get("name")), String(fd.get("email")), String(fd.get("password")));
                      if (!res.ok) {
                        setError(res.error);
                        return;
                      }
                      showToast("Account created");
                      go(res.user);
                    }}
                  >
                    <div className="form-row">
                      <div>
                        <label className="form-label">Full name</label>
                        <input className="form-input" name="name" required autoComplete="name" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div>
                        <label className="form-label">Email</label>
                        <input className="form-input" type="email" name="email" required autoComplete="email" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div>
                        <label className="form-label">Password</label>
                        <input
                          className="form-input"
                          type="password"
                          name="password"
                          required
                          minLength={4}
                          autoComplete="new-password"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                      Register
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
