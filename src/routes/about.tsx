import { createFileRoute, Link } from "@tanstack/react-router";
import { SUPPORT_EMAIL, SUPPORT_PHONE, UPI_ID } from "@/lib/clc/catalog";
import { Layout } from "@/components/clc/Layout";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "About — CLC CureLifeCare" }] }),
});

function AboutPage() {
  return (
    <Layout>
      <div className="container-clc">
        <div className="page-hero">
          <div className="breadcrumb">
            <Link to="/">Home</Link> · About
          </div>
          <h1>About CLC CureLifeCare</h1>
          <p>Your trusted partner for genuine medicines and healthcare essentials</p>
        </div>
        <div className="card" style={{ padding: 28, marginBottom: 24, maxWidth: 720 }}>
          <p style={{ marginBottom: 14, color: "var(--color-muted)", lineHeight: 1.65 }}>
            CLC CureLifeCare is an online pharmacy and healthcare storefront focused on authentic products,
            pharmacist-verified prescriptions, and reliable delivery. We combine a modern shopping experience
            with careful fulfilment so you can order with confidence.
          </p>
          <h3 style={{ fontWeight: 600, margin: "20px 0 8px" }}>What you can do here</h3>
          <ul style={{ color: "var(--color-muted)", paddingLeft: 20, lineHeight: 1.8 }}>
            <li>Browse medicines, healthcare, personal care, Ayurveda and devices</li>
            <li>Cart, wishlist, UPI QR and Cash on Delivery checkout</li>
            <li>Upload a prescription for pharmacist review</li>
            <li>Track orders and manage stock from the admin dashboard</li>
          </ul>
        </div>
        <div className="card" style={{ padding: 28, marginBottom: 24, maxWidth: 720 }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 12 }}>Contact</h2>
          <p style={{ color: "var(--color-muted)", marginBottom: 6 }}>
            Phone:{" "}
            <a href={`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`} style={{ color: "var(--color-forest)" }}>
              {SUPPORT_PHONE}
            </a>
          </p>
          <p style={{ color: "var(--color-muted)", marginBottom: 6 }}>
            Email:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "var(--color-forest)" }}>
              {SUPPORT_EMAIL}
            </a>
          </p>
          <p style={{ color: "var(--color-muted)" }}>UPI ID (demo): {UPI_ID}</p>
        </div>
        <div className="card" style={{ padding: 28, marginBottom: 48, maxWidth: 720 }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: 12 }}>Policies</h2>
          <p style={{ color: "var(--color-muted)", lineHeight: 1.65 }}>
            Orders of ₹499 and above ship free. Returns for unopened, non-Rx items are accepted within 7 days.
            Prescription medicines cannot be returned once dispensed.
          </p>
        </div>
      </div>
    </Layout>
  );
}
