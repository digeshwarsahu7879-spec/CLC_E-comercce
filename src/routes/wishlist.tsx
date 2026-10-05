import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";
import { Layout } from "@/components/clc/Layout";
import { ProductCard } from "@/components/clc/ProductCard";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
  head: () => ({ meta: [{ title: "Wishlist — CLC CureLifeCare" }] }),
});

function WishlistPage() {
  const wish = useClc((s) => s.wish);
  const items = wish.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <Layout active="wishlist">
      <div className="container-clc">
        <div className="page-hero">
          <div className="breadcrumb">
            <Link to="/">Home</Link> · Wishlist
          </div>
          <h1>Wishlist</h1>
          <p>{items.length ? `${items.length} saved item(s)` : ""}</p>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart card" style={{ marginBottom: 48 }}>
            <h2>Wishlist is empty</h2>
            <p>Tap the heart on products to save them here.</p>
            <Link to="/shop" search={{ cat: "", q: "" }} className="btn btn-primary">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="prod-grid" style={{ paddingBottom: 48 }}>
            {items.map((p) => (
              <ProductCard key={p!.id} p={p!} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
