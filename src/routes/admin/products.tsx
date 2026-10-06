import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import {
  CATEGORIES,
  formatINR,
  MAX_PRODUCT_IMAGES,
  normalizeImages,
  primaryImage,
  type Product,
} from "@/lib/clc/catalog";
import { useClc, type ProductInput } from "@/lib/clc/store";
import { AdminLayout } from "@/components/clc/AdminLayout";
import {
  createCatalogProduct,
  getCatalogOverrides,
  removeAllCatalogProducts,
  removeCatalogProduct,
  updateCatalogProduct,
} from "@/lib/clc/products";

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
  images: [],
  rx: false,
};

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const max = 640;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * scale));
      const height = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Could not resize image"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
      URL.revokeObjectURL(url);
      resolve(dataUrl);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}

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
  const [urlDraft, setUrlDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photos = normalizeImages(form.images, form.image);
  const canAddMore = photos.length < MAX_PRODUCT_IMAGES;

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm, cat: "medicines", catName: "Medicines", images: [] });
    setUrlDraft("");
    setShowForm(true);
  }

  function openEdit(p: Product) {
    const imgs = normalizeImages(p.images, p.image);
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
      image: imgs[0] || "",
      images: imgs,
      rx: p.rx,
      slug: p.slug,
      tone: p.tone,
    });
    setUrlDraft("");
    setShowForm(true);
  }

  function onCatChange(slug: string) {
    const c = CATEGORIES.find((x) => x.slug === slug);
    setForm((f) => ({ ...f, cat: slug, catName: c?.name || slug }));
  }

  function setPhotos(next: string[]) {
    const images = normalizeImages(next);
    setForm((f) => ({ ...f, images, image: images[0] || "" }));
  }

  function removePhoto(index: number) {
    setPhotos(photos.filter((_, i) => i !== index));
  }

  async function onGalleryFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const room = MAX_PRODUCT_IMAGES - photos.length;
    if (room <= 0) {
      alert(`You can add up to ${MAX_PRODUCT_IMAGES} photos per product.`);
      return;
    }
    const picked = Array.from(files).slice(0, room);
    const added: string[] = [];
    for (const file of picked) {
      if (!file.type.startsWith("image/")) {
        alert(`“${file.name}” is not an image.`);
        continue;
      }
      if (file.size > 8 * 1024 * 1024) {
        alert(`“${file.name}” is too large. Use a photo under 8 MB.`);
        continue;
      }
      try {
        added.push(await compressImage(file));
      } catch {
        alert(`Could not read “${file.name}”.`);
      }
    }
    if (added.length) setPhotos([...photos, ...added]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function addImageUrl() {
    const url = urlDraft.trim();
    if (!url) return;
    if (!canAddMore) {
      alert(`You can add up to ${MAX_PRODUCT_IMAGES} photos per product.`);
      return;
    }
    if (!/^https?:\/\//i.test(url) && !url.startsWith("data:")) {
      alert("Please enter a valid image URL starting with https://");
      return;
    }
    setPhotos([...photos, url]);
    setUrlDraft("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name?.trim() || saving) return;
    setSaving(true);
    const payload: ProductInput = {
      ...form,
      images: photos,
      image: photos[0] || "",
    };
    let saved = false;
    try {
      if (editingId) {
        await updateCatalogProduct({ data: { id: editingId, input: payload } });
      } else {
        await createCatalogProduct({ data: payload });
      }
      saved = true;
      try {
        applyCatalogOverrides(await getCatalogOverrides());
      } catch (refreshError) {
        console.error(refreshError);
      }
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      setUrlDraft("");
    } catch (error) {
      console.error(error);
      if (!saved) {
        alert("Could not save the product to the database. Check your Vercel database connection and deployment logs.");
      }
    } finally {
      setSaving(false);
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

              {/* Product photos — gallery access */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">
                  Product photos ({photos.length}/{MAX_PRODUCT_IMAGES})
                </label>
                <p style={{ fontSize: "0.85rem", color: "var(--color-muted)", margin: "0 0 10px" }}>
                  Tap <strong>Add from gallery</strong> to pick photos. They are resized automatically so saving stays fast.
                  You can add up to {MAX_PRODUCT_IMAGES} photos per product.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={(e) => void onGalleryFiles(e.target.files)}
                />

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 12 }}>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    disabled={!canAddMore}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus size={16} style={{ marginRight: 6 }} />
                    Add from gallery
                  </button>
                  {!canAddMore ? (
                    <span style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>
                      Maximum {MAX_PRODUCT_IMAGES} photos reached
                    </span>
                  ) : null}
                </div>

                {photos.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
                    {photos.map((src, i) => (
                      <div
                        key={i}
                        style={{
                          position: "relative",
                          width: 96,
                          height: 96,
                          borderRadius: 12,
                          overflow: "hidden",
                          border: i === 0 ? "2px solid var(--color-primary, #0f766e)" : "1px solid var(--color-line)",
                          background: "var(--color-mist)",
                        }}
                      >
                        <img
                          src={src}
                          alt={`Product photo ${i + 1}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        {i === 0 ? (
                          <span
                            style={{
                              position: "absolute",
                              bottom: 4,
                              left: 4,
                              fontSize: 10,
                              fontWeight: 600,
                              background: "rgba(15,118,110,0.9)",
                              color: "#fff",
                              padding: "2px 6px",
                              borderRadius: 6,
                            }}
                          >
                            Main
                          </span>
                        ) : null}
                        <button
                          type="button"
                          aria-label={`Remove photo ${i + 1}`}
                          onClick={() => removePhoto(i)}
                          style={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            border: "none",
                            background: "rgba(0,0,0,0.65)",
                            color: "#fff",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: 0,
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      border: "1px dashed var(--color-line)",
                      borderRadius: 12,
                      padding: 20,
                      textAlign: "center",
                      color: "var(--color-muted)",
                      marginBottom: 12,
                      fontSize: "0.9rem",
                    }}
                  >
                    No photos yet. Use “Add from gallery” to choose pictures.
                  </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "flex-end" }}>
                  <div style={{ flex: "1 1 220px" }}>
                    <label className="form-label">Or paste image URL</label>
                    <input
                      className="form-input"
                      value={urlDraft}
                      onChange={(e) => setUrlDraft(e.target.value)}
                      placeholder="https://…"
                      disabled={!canAddMore}
                    />
                  </div>
                  <button type="button" className="btn btn-ghost btn-sm" onClick={addImageUrl} disabled={!canAddMore || !urlDraft.trim()}>
                    Add URL
                  </button>
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
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Saving…" : editingId ? "Save changes" : "Create product"}
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
                  const thumb = primaryImage(p);
                  const photoCount = normalizeImages(p.images, p.image).length;
                  return (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {thumb ? (
                            <img
                              src={thumb}
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
                            <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
                              {p.id}
                              {photoCount > 0 ? ` · ${photoCount} photo${photoCount > 1 ? "s" : ""}` : ""}
                            </span>
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
