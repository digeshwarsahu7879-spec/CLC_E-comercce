import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, formatINR, type Product } from "@/lib/clc/catalog";
import { useClc, type ProductInput } from "@/lib/clc/store";
import { AdminLayout } from "@/components/clc/AdminLayout";
import { createCatalogProduct, getCatalogOverrides, removeAllCatalogProducts, removeCatalogProduct, updateCatalogProduct } from "@/lib/clc/products";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
  head: () => ({ meta: [{ title: "Admin Products — CLC" }] }),
});

const emptyForm: ProductInput = {
  name: "",
  brand: "",
  cat: "medicines",
  catName: "Medicines",
  price: 0,
  old: 0,
  off: 0,
  stock: 10,
  pack: "1 unit",
  desc: "",
  ingredients: "",
  directions: "",
  image: "",
  rx: false,
};

function AdminProducts() {
  const listProducts = useClc((s) => s.listProducts);
  const getStock = useClc((s) => s.getStock);
  const applyCatalogOverrides = useClc((s) => s.applyCatalogOverrides);
  const customProducts = useClc((s) => s.customProducts);
  const productEdits = useClc((s) => s.productEdits);
  const deletedProductIds = useClc((s) => s.deletedProductIds);

  const live = useMemo(() => {
    void customProducts;
    void productEdits;
    void deletedProductIds;
    return listProducts().map((p) => ({ ...p, stock: getStock(p.id) }));
  }, [listProducts, getStock, customProducts, productEdits, deletedProductIds]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductInput>(emptyForm);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm, cat: "medicines", catName: "Medicines" });
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name,
      brand: p.brand,
      cat: p.cat,
      catName: p.catName,
      price: p.price,
      old: p.old,
      off: p.off,
      stock: getStock(p.id),
      pack: p.pack,
      desc: p.desc,
      ingredients: p.ingredients,
      directions: p.directions,
      image: p.image || "",
      rx: p.rx,
      slug: p.slug,
      tone: p.tone,
    });
    setShowForm(true);
  }

  function onCatChange(slug: string) {
    const c = CATEGORIES.find((x) => x.slug === slug);
    setForm((f) => ({ ...f, cat: slug, catName: c?.name || slug }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name?.trim()) return;
    try {
      if (editingId) {
        await updateCatalogProduct({ data: { id: editingId, input: form } });
      } else {
        await createCatalogProduct({ data: form });
      }
      applyCatalogOverrides(await getCatalogOverrides());
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
    } catch (error) {
      console.error(error);
      alert("Could not save the product to the database. Check your Vercel database connection and deployment logs.");
    }
  }

  return (
    <AdminLayout active="products">
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 12, marginBottom: 16 }}>
        <div>
          <h1 className="admin-page-title">Products</h1>
          <p className="admin-page-sub" style={{ marginBottom: 0 }}>
            {live.length} products · add, edit, or remove · manage stock on Stock page
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Link to="/admin/stock" className="btn btn-ghost btn-sm">
            Manage stock
          </Link>
          {live.length > 0 ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              style={{ color: "var(--color-danger, #b91c1c)" }}
              onClick={() => {
                if (!confirm(`Remove ALL ${live.length} products from the store? This will hide them for every customer. You can add new products afterwards.`)) return;
                void removeAllCatalogProducts()
                  .then(async () => applyCatalogOverrides(await getCatalogOverrides()))
                  .catch((error) => {
                    console.error(error);
                    alert("Could not remove all products from the database.");
                  });
              }}
            >
              Remove all products
            </button>
          ) : null}
          <button type="button" className="btn btn-primary btn-sm" onClick={openAdd}>
            + Add product
          </button>
        </div>
      </div>

      {showForm ? (
        <div className="card" style={{ marginBottom: 20, padding: 20 }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 12 }}>
            {editingId ? "Edit product" : "Add product"}
          </h2>
          <form onSubmit={submit}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              <div>
                <label className="form-label">Name *</label>
                <input
                  className="form-input"
                  required
                  value={form.name || ""}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="form-label">Brand</label>
                <input
                  className="form-input"
                  value={form.brand || ""}
                  onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
                />
              </div>
              <div>
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={form.cat || "medicines"}
                  onChange={(e) => onCatChange(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Price (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  min={0}
                  step={1}
                  value={form.price ?? 0}
                  onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                />
              </div>
              <div>
                <label className="form-label">MRP / old price (₹)</label>
                <input
                  className="form-input"
                  type="number"
                  min={0}
                  step={1}
                  value={form.old ?? 0}
                  onChange={(e) => setForm((f) => ({ ...f, old: Number(e.target.value) }))}
                />
              </div>
              <div>
                <label className="form-label">Discount %</label>
                <input
                  className="form-input"
                  type="number"
                  min={0}
                  max={99}
                  step={1}
                  value={form.off ?? 0}
                  onChange={(e) => setForm((f) => ({ ...f, off: Number(e.target.value) }))}
                />
              </div>
              <div>
                <label className="form-label">Stock</label>
                <input
                  className="form-input"
                  type="number"
                  min={0}
                  step={1}
                  value={form.stock ?? 0}
                  onChange={(e) => setForm((f) => ({ ...f, stock: Number(e.target.value) }))}
                />
              </div>
              <div>
                <label className="form-label">Pack size</label>
                <input
                  className="form-input"
                  value={form.pack || ""}
                  onChange={(e) => setForm((f) => ({ ...f, pack: e.target.value }))}
                  placeholder="15 tablets"
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Product image</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ flex: "1 1 220px" }}>
                    <input
                      className="form-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (file.size > 1.5 * 1024 * 1024) {
                          alert("Image too large. Please use a file under 1.5 MB.");
                          e.target.value = "";
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = () => {
                          const result = typeof reader.result === "string" ? reader.result : "";
                          setForm((f) => ({ ...f, image: result }));
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <p style={{ fontSize: "0.8rem", color: "var(--color-muted)", marginTop: 6 }}>
                      Upload a photo (JPG/PNG, max 1.5 MB) or paste an image URL below.
                    </p>
                    <input
                      className="form-input"
                      style={{ marginTop: 8 }}
                      value={form.image?.startsWith("data:") ? "" : form.image || ""}
                      onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                      placeholder="https://… (optional image URL)"
                    />
                  </div>
                  {form.image ? (
                    <div style={{ textAlign: "center" }}>
                      <img
                        src={form.image}
                        alt="Preview"
                        style={{
                          width: 96,
                          height: 96,
                          objectFit: "cover",
                          borderRadius: 12,
                          border: "1px solid var(--color-line)",
                          background: "var(--color-mist)",
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm"
                        style={{ display: "block", marginTop: 6 }}
                        onClick={() => setForm((f) => ({ ...f, image: "" }))}
                      >
                        Clear image
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows={3}
                  value={form.desc || ""}
                  onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))}
                />
              </div>
              <div>
                <label className="form-label">Ingredients</label>
                <input
                  className="form-input"
                  value={form.ingredients || ""}
                  onChange={(e) => setForm((f) => ({ ...f, ingredients: e.target.value }))}
                />
              </div>
              <div>
                <label className="form-label">Directions</label>
                <input
                  className="form-input"
                  value={form.directions || ""}
                  onChange={(e) => setForm((f) => ({ ...f, directions: e.target.value }))}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 22 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={Boolean(form.rx)}
                    onChange={(e) => setForm((f) => ({ ...f, rx: e.target.checked }))}
                  />
                  Prescription required (Rx)
                </label>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
              <button type="submit" className="btn btn-primary">
                {editingId ? "Save changes" : "Create product"}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Discount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {live.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: 24, color: "var(--color-muted)" }}>
                    No products. Click “Add product” to create one.
                  </td>
                </tr>
              ) : (
                live.map((p) => {
                  const cls = p.stock < 1 ? "stock-out" : p.stock <= 20 ? "stock-low" : "stock-ok";
                  const label = p.stock < 1 ? "Out" : p.stock;
                  return (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {p.image ? (
                            <img
                              src={p.image}
                              alt=""
                              style={{
                                width: 40,
                                height: 40,
                                objectFit: "cover",
                                borderRadius: 8,
                                background: "var(--color-line)",
                              }}
                            />
                          ) : null}
                          <div>
                            <strong>{p.name}</strong>
                            <br />
                            <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>{p.id}</span>
                          </div>
                        </div>
                      </td>
                      <td>{p.brand}</td>
                      <td>{p.catName}</td>
                      <td>{formatINR(p.price)}</td>
                      <td>
                        <span className={cls}>{label}</span>
                      </td>
                      <td>{p.off ? `${p.off}%` : "—"}</td>
                      <td>
                        <div className="admin-actions">
                          <button type="button" className="btn btn-ghost btn-sm" onClick={() => openEdit(p)}>
                            Edit
                          </button>
                          <Link to="/admin/stock" className="btn btn-ghost btn-sm">
                            Stock
                          </Link>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm"
                            style={{ color: "var(--color-danger, #b91c1c)" }}
                            onClick={() => {
                              if (confirm(`Remove “${p.name}”?`)) {
                                void removeCatalogProduct({ data: { id: p.id } })
                                  .then(async () => applyCatalogOverrides(await getCatalogOverrides()))
                                  .catch((error) => {
                                    console.error(error);
                                    alert("Could not remove the product from the database.");
                                  });
                              }
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
