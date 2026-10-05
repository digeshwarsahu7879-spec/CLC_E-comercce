import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart } from "lucide-react";
import { formatINR, primaryImage, type Product } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";

export function Pack({ tone, className = "", image }: { tone?: string; className?: string; image?: string }) {
  if (image) {
    return (
      <div className={`pack has-image ${className}`} style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }} />
    );
  }
  return <div className={`pack ${tone || ""} ${className}`} />;
}

export function ProductCard({ p }: { p: Product & { stock?: number } }) {
  const getStock = useClc((s) => s.getStock);
  const addToCart = useClc((s) => s.addToCart);
  const toggleWish = useClc((s) => s.toggleWish);
  const wish = useClc((s) => s.wish);
  const hydrated = useClc((s) => s.hydrated);
  const stock = hydrated ? getStock(p.id) : (typeof p.stock === "number" ? p.stock : 0);
  const out = stock < 1;
  const loved = hydrated && wish.includes(p.id);
  const img = primaryImage(p);

  return (
    <article className="card prod-card">
      <Link to="/product/$slug" params={{ slug: p.slug }} className="prod-img">
        <Pack tone={p.tone} image={img} />
        <div className="prod-badges">
          {p.off > 0 ? <span className="badge badge-sale">{p.off}% off</span> : null}
          {p.rx ? <span className="badge badge-rx">Rx</span> : null}
          {out ? <span className="badge badge-out">Out of stock</span> : null}
        </div>
      </Link>
      <div className="prod-body">
        <p className="prod-brand">{p.brand}</p>
        <h3 className="prod-name">
          <Link to="/product/$slug" params={{ slug: p.slug }}>
            {p.name}
          </Link>
        </h3>
        <p className="prod-rating">4.5 · 120 reviews{out ? "" : ` · ${stock} left`}</p>
        <div className="prod-price">
          <strong>{formatINR(p.price)}</strong>
          {p.off > 0 ? <span className="old">{formatINR(p.old)}</span> : null}
        </div>
        <div className="prod-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
            disabled={out}
            onClick={() => addToCart(p.id)}
          >
            <ShoppingCart size={14} />
            {out ? "Sold out" : "Add"}
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            style={{ padding: "8px 10px" }}
            title="Wishlist"
            aria-label="Wishlist"
            onClick={() => toggleWish(p.id)}
          >
            <Heart size={14} className={loved ? "heart-on" : ""} fill={loved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function CategoryCard({
  slug,
  name,
  desc,
  image,
}: {
  slug: string;
  name: string;
  desc: string;
  image: string;
}) {
  return (
    <Link className="card cat-card" to="/shop" search={{ cat: slug, q: "" }}>
      <img src={image} alt="" />
      <div className="cat-body">
        <h3>{name}</h3>
        <p>{desc}</p>
      </div>
    </Link>
  );
}
