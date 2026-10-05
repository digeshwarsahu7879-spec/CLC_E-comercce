import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, getCategory } from "@/lib/clc/catalog";
import { useClc } from "@/lib/clc/store";
import { Layout } from "@/components/clc/Layout";
import { ProductCard } from "@/components/clc/ProductCard";

type ShopSearch = { cat: string; q: string };

export const Route = createFileRoute("/shop")({
  component: Shop,
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    cat: typeof s.cat === "string" ? s.cat : "",
    q: typeof s.q === "string" ? s.q : "",
  }),
  head: ({ match }) => {
    const cat = getCategory(match.search.cat);
    return { meta: [{ title: `${cat?.name || (match.search.q ? `Search: ${match.search.q}` : "Shop")} — CLC CureLifeCare` }] };
  },
});

function Shop() {
  const { cat, q } = Route.useSearch();
  const listProducts = useClc((s) => s.listProducts);
  const customProducts = useClc((s) => s.customProducts);
  const productEdits = useClc((s) => s.productEdits);
  const deletedProductIds = useClc((s) => s.deletedProductIds);
  void customProducts;
  void productEdits;
  void deletedProductIds;

  const qn = q.toLowerCase().trim();
  let list = listProducts().slice();
  if (cat) list = list.filter((p) => p.cat === cat);
  if (qn) {
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(qn) ||
        p.brand.toLowerCase().includes(qn) ||
        p.catName.toLowerCase().includes(qn),
    );
  }
  const catObj = getCategory(cat);
  const title = catObj ? catObj.name : qn ? `Search: “${q}”` : "All products";
  const desc = catObj ? catObj.desc : qn ? `${list.length} result(s)` : "Browse medicines and healthcare essentials";
  const active = cat === "medicines" ? "medicines" : "shop";

  return (
    <Layout active={active}>
      <div className="container-clc page-hero">
        <div className="breadcrumb">
          <Link to="/">Home</Link> · Shop
        </div>
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <div className="container-clc" style={{ paddingBottom: 48 }}>
        <div className="filters-bar">
          <Link to="/shop" search={{ cat: "", q }} className={`filter-chip ${!cat ? "active" : ""}`}>
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to="/shop"
              search={{ cat: c.slug, q }}
              className={`filter-chip ${cat === c.slug ? "active" : ""}`}
            >
              {c.name}
            </Link>
          ))}
        </div>
        {list.length === 0 ? (
          <div className="empty-cart" style={{ marginTop: 24 }}>
            <h2>No products found</h2>
            <p>Try another category or search term.</p>
          </div>
        ) : (
          <div className="prod-grid" style={{ marginTop: 20 }}>
            {list.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
