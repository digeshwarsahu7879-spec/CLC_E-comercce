import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/clc/Layout";

export const Route = createFileRoute("/help")({
  component: HelpPage,
  head: () => ({ meta: [{ title: "Help & FAQ — CLC CureLifeCare" }] }),
});

const FAQS = [
  {
    q: "How do I pay with UPI?",
    a: "At checkout, choose UPI QR. Scan the live QR with PhonePe, Google Pay or any UPI app (or tap Open UPI app on your phone) and pay the exact order amount. You can also copy the UPI ID. After paying, place the order so admin can confirm payment.",
  },
  {
    q: "Is Cash on Delivery available?",
    a: "Yes. Select COD at checkout and pay when your order is delivered.",
  },
  {
    q: "Do I need a prescription?",
    a: "Some medicines require a valid prescription. Upload it via the prescription page; a pharmacist reviews it before dispensing.",
  },
  {
    q: "How long does delivery take?",
    a: "Delivery times depend on your location and stock. Free shipping is offered on orders of ₹499 and above.",
  },
  {
    q: "How do I track my order?",
    a: "Use Track order with the order ID from your confirmation page, or open My orders.",
  },
];

function HelpPage() {
  return (
    <Layout active="help">
      <div className="container-clc">
        <div className="page-hero">
          <div className="breadcrumb">
            <Link to="/">Home</Link> · Help
          </div>
          <h1>Help & FAQ</h1>
          <p>Common questions about ordering, payments and delivery</p>
        </div>
        <div className="card" style={{ maxWidth: 720, padding: "8px 24px 24px", marginBottom: 48 }}>
          {FAQS.map((f, i) => (
            <details className="faq-item" key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Layout>
  );
}
