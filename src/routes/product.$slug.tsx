import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { formatINR, normalizeImages, primaryImage } from "@/lib/clc/catalog";
import { liveProduct, useClc } from "@/lib/clc/store";
import { Layout } from "@/components/clc/Layout";
import { ProductCard } from "@/components/clc/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
  head: ({ params }) => {
    const p = useClc.getState().findProduct(params.slug);
    return { meta: [{ title: `${p?.name || "Product"} — CLC CureLifeCare` }] };
  },
});

function ProductPage() {
  const { slug } = Route.useParams();
  const getStock = useClc((s) => s.getStock);
  const addToCart = useClc((s) => s.addToCart);
  const listProducts = useClc((s) => s.listProducts);
  const customProducts = useClc((s) => s.customProducts);
  const productEdits = useClc((s) => s.productEdits);
  const deletedProductIds = useClc((s) => s.deletedProductIds);
  void customProducts;
  void productEdits;
  void deletedProductIds;
  const p = liveProduct(slug, getStock);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  if (!p) {
    return (
      <Layout>
        <div className="container-clc empty-cart">
          <h2>Product not found</h2>
          <p>This product may have been removed.</p>
          <Link to="/shop" search={{ cat: "", q: "" }} className="btn btn-primary">
            Browse products
          </Link>
        </div>
      </Layout>
    );
  }

  const gallery = normalizeImages(p.images, p.image);
  const main = gallery[Math.min(activeImg, Math.max(gallery.length - 1, 0))] || primaryImage(p);

  const related = listProducts()
    .filter((x) => x.cat === p.cat && x.id !== p.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className="container-clc">
        <div className="breadcrumb" style={{ paddingTop: 20 }}>
          <Link to="/">Home</Link> ·{" "}
          <Link to="/shop" search={{ cat: p.cat, q: "" }}>
            {p.catName}
          </Link>{" "}
          · {p.name}
        </div>
        <div className="pdp-grid">
          <div>
            <div
              className="pdp-gallery card"
              style={{
                position: "relative",
                overflow: "hidden",
                background: "#fff",
                height: "min(88vw, 560px)",
                minHeight: 360,
                padding: 12,
                display: "grid",
                placeItems: "center",
              }}
            >
              <img
                src={main}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                  display: "block",
                }}
              />
              <div className="prod-badges" style={{ position: "absolute", top: 16, left: 16 }}>
                {p.off > 0 ? <span className="badge badge-sale">{p.off}% off</span> : null}
                {p.rx ? <span className="badge badge-rx">Rx</span> : null}
              </div>
            </div>
            {gallery.length > 1 ? (
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 12,
                  flexWrap: "wrap",
                }}
              >
                {gallery.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    aria-label={`Photo ${i + 1}`}
                    style={{
                      width: 84,
                      height: 84,
                      padding: 4,
                      borderRadius: 12,
                      border: i === activeImg ? "2px solid var(--color-primary, #0f766e)" : "1px solid var(--color-line)",
                      overflow: "hidden",
                      cursor: "pointer",
                      background: "#fff",
                    }}
                  >
                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="pdp-info">
            <p className="prod-brand">{p.brand}</p>
            <h1>{p.name}</h1>
            <p className="pdp-meta">
              {p.pack} · {p.stock < 1 ? "Out of stock" : `In stock (${p.stock})`} · 4.5 · 120 reviews
            </p>
            <div className="pdp-price-row">
              <span className="price">{formatINR(p.price)}</span>
              {p.off > 0 ? (
                <>
                  <span className="old">{formatINR(p.old)}</span>
                  <span className="save">Save {p.off}%</span>
                </>
              ) : null}
            </div>
            <div className="qty-row">
              <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>Quantity</span>
              <div className="qty-control">
                <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                  −
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(Math.max(p.stock, 1), q + 1))}
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
            </div>
            <div className="pdp-actions">
              <button
                type="button"
                className="btn btn-primary"
                style={{ minWidth: 180 }}
                disabled={p.stock < 1}
                onClick={() => addToCart(p.id, qty)}
              >
                <ShoppingCart size={16} />
                {p.stock < 1 ? "Out of stock" : "Add to cart"}
              </button>
              <Link to="/cart" className="btn btn-ghost">
                View cart
              </Link>
            </div>
            <div className="pdp-desc">
              <h3>Description</h3>
              <p>{p.desc}</p>
              <h3>Ingredients</h3>
              <p>{p.ingredients}</p>
              <h3>Directions</h3>
              <p>{p.directions}</p>
              <h3>Package</h3>
              <p>{p.pack}</p>
            </div>
          </div>
        </div>
        {related.length > 0 ? (
          <section className="section">
            <div className="section-head">
              <h2>Related products</h2>
            </div>
            <div className="prod-grid">
              {related.map((r) => (
                <ProductCard key={r.id} p={r} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
