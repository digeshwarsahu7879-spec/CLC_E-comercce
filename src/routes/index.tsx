import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { CATEGORIES } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";
import { Layout } from "@/components/clc/Layout";
import { CategoryCard, ProductCard } from "@/components/clc/ProductCard";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "CLC CureLifeCare — Home" }],
  }),
});

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const listProducts = useClc((s) => s.listProducts);
  const customProducts = useClc((s) => s.customProducts);
  const productEdits = useClc((s) => s.productEdits);
  const deletedProductIds = useClc((s) => s.deletedProductIds);
  void customProducts;
  void productEdits;
  void deletedProductIds;
  const all = listProducts();
  const medicines = all.filter((p) => p.cat === "medicines").slice(0, 8);
  const health = all.filter((p) => p.cat === "healthcare" || p.cat === "personal-care").slice(0, 8);

  return (
    <Layout>
      <section className="hero">
        <div className="container-clc hero-grid">
          <div>
            <div className="hero-badge">
              <Sparkles size={14} />
              Trusted online pharmacy
            </div>
            <h1>
              Your health,
              <br />
              <span>delivered with care</span>
            </h1>
            <p className="lead">
              Genuine medicines, healthcare essentials and wellness products — ordered online, verified by
              pharmacists, delivered to your door.
            </p>
            <div className="hero-cta">
              <Link to="/shop" search={{ cat: "medicines", q: "" }} className="btn btn-primary">
                Shop medicines
              </Link>
              <Link to="/shop" search={{ cat: "", q: "" }} className="btn btn-ghost">
                Browse categories
              </Link>
            </div>
          </div>
          <div className="hero-img">
            <img src="/images/hero.jpg" alt="CLC healthcare essentials" />
          </div>
        </div>
      </section>

      <div className="container-clc">
        <div className="trust">
          <div className="card trust-item">
            <ShieldCheck size={20} />
            <div>
              <strong>100% Genuine</strong>
              <span>Original & authentic medicines</span>
            </div>
          </div>
          <div className="card trust-item">
            <Truck size={20} />
            <div>
              <strong>Fast Delivery</strong>
              <span>On-time delivery at your door</span>
            </div>
          </div>
          <div className="card trust-item">
            <MapPin size={20} />
            <div>
              <strong>Pan-India</strong>
              <span>Ships across major cities</span>
            </div>
          </div>
          <div className="card trust-item">
            <RotateCcw size={20} />
            <div>
              <strong>Easy returns</strong>
              <span>Hassle-free support</span>
            </div>
          </div>
        </div>

        <form
          className="search-bar"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/shop", search: { cat, q } });
          }}
        >
          <input
            type="search"
            placeholder="Search medicines, healthcare products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search products"
          />
          <select value={cat} onChange={(e) => setCat(e.target.value)} aria-label="Category">
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      <section className="section container-clc">
        <div className="section-head">
          <h2>Shop by category</h2>
          <Link to="/shop" search={{ cat: "", q: "" }}>
            View all →
          </Link>
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.slug} {...c} />
          ))}
        </div>
      </section>

      <div className="container-clc">
        <div className="promo">
          <div>
            <h3>UPI QR payments · COD available</h3>
            <p>Pay exactly the order amount via UPI QR, PhonePe or Google Pay. Or choose Cash on Delivery.</p>
          </div>
          <Link to="/shop" search={{ cat: "medicines", q: "" }} className="btn btn-cream">
            Shop now
          </Link>
        </div>
      </div>

      {medicines.length > 0 ? (
        <section className="section container-clc">
          <div className="section-head">
            <h2>Popular medicines</h2>
            <Link to="/shop" search={{ cat: "medicines", q: "" }}>
              View all →
            </Link>
          </div>
          <div className="prod-grid">
            {medicines.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      ) : null}

      {health.length > 0 ? (
        <section className="section container-clc">
          <div className="section-head">
            <h2>Healthcare essentials</h2>
            <Link to="/shop" search={{ cat: "healthcare", q: "" }}>
              View all →
            </Link>
          </div>
          <div className="prod-grid">
            {health.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      ) : null}
    </Layout>
  );
}
