import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useClc } from "@/lib/clc/store";
import { AdminLayout } from "@/components/clc/AdminLayout";
import { getCatalogOverrides, resetCatalogStock, updateCatalogProduct } from "@/lib/clc/products";

export const Route = createFileRoute("/admin/stock")({
  component: AdminStock,
  head: () => ({ meta: [{ title: "Stock Management — CLC Admin" }] }),
});

function AdminStock() {
  const listProducts = useClc((s) => s.listProducts);
  const getStock = useClc((s) => s.getStock);
  const setStock = useClc((s) => s.setStock);
  const resetStock = useClc((s) => s.resetStock);
  const showToast = useClc((s) => s.showToast);
  const applyCatalogOverrides = useClc((s) => s.applyCatalogOverrides);
  const customProducts = useClc((s) => s.customProducts);
  const productEdits = useClc((s) => s.productEdits);
  const deletedProductIds = useClc((s) => s.deletedProductIds);
  const [filter, setFilter] = useState<"all" | "low" | "out">("all");
  const [draft, setDraft] = useState<Record<string, string>>({});

  const live = useMemo(() => {
    void customProducts;
    void productEdits;
    void deletedProductIds;
    return listProducts().map((p) => ({ ...p, stock: getStock(p.id) }));
  }, [listProducts, getStock, customProducts, productEdits, deletedProductIds]);

  let list = live;
  if (filter === "low") list = list.filter((p) => p.stock > 0 && p.stock <= 20);
  if (filter === "out") list = list.filter((p) => p.stock < 1);
  const low = live.filter((p) => p.stock > 0 && p.stock <= 20).length;
  const out = live.filter((p) => p.stock < 1).length;
  const units = live.reduce((s, p) => s + p.stock, 0);

  function stockClass(n: number) {
    if (n < 1) return "stock-out";
    if (n <= 20) return "stock-low";
    return "stock-ok";
  }

  return (
    <AdminLayout active="stock">
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 12, marginBottom: 8 }}>
        <div>
          <h1 className="admin-page-title">Stock management</h1>
          <p className="admin-page-sub" style={{ marginBottom: 0 }}>
            Edit quantities · Low stock ≤ 20 · Orders deduct stock · Cancel restores
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFilter("all")}>
            All
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFilter("low")}>
            Low stock
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setFilter("out")}>
            Out of stock
          </button>
          <button
            type="button"
            className="btn btn-cream btn-sm"
            onClick={() => {
              if (confirm("Reset all stock to seed defaults?")) {
                void resetCatalogStock()
                  .then(async () => {
                    resetStock();
                    applyCatalogOverrides(await getCatalogOverrides());
                    setDraft({});
                    showToast("Stock reset");
                  })
                  .catch((error) => {
                    console.error(error);
                    alert("Could not reset stock in the database.");
                  });
              }
            }}
          >
            Reset to defaults
          </button>
        </div>
      </div>
      <div className="stat-grid" style={{ marginTop: 16 }}>
        <div className="card stat-card">
          <div className="label">SKUs</div>
          <div className="value">{live.length}</div>
        </div>
        <div className="card stat-card">
          <div className="label">Total units</div>
          <div className="value">{units}</div>
        </div>
        <div className="card stat-card">
          <div className="label">Low stock</div>
          <div className="value">{low}</div>
        </div>
        <div className="card stat-card">
          <div className="label">Out of stock</div>
          <div className="value">{out}</div>
        </div>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Current</th>
                <th>Set quantity</th>
                <th>Quick adjust</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: 24, color: "var(--color-muted)" }}>
                    No products in this filter.
                  </td>
                </tr>
              ) : (
                list.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.name}</strong>
                      <br />
                      <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
                        {p.brand} · {p.id}
                      </span>
                    </td>
                    <td>{p.catName}</td>
                    <td>
                      <span className={stockClass(p.stock)}>{p.stock < 1 ? "Out of stock" : `${p.stock} units`}</span>
                    </td>
                    <td>
                      <input
                        type="number"
                        className="stock-input"
                        min={0}
                        step={1}
                        value={draft[p.id] ?? String(p.stock)}
                        onChange={(e) => setDraft((d) => ({ ...d, [p.id]: e.target.value }))}
                      />
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ marginLeft: 6 }}
                        onClick={() => {
                          const n = Math.max(0, Math.floor(Number(draft[p.id] ?? p.stock) || 0));
                          void updateCatalogProduct({ data: { id: p.id, input: { stock: n } } })
                            .then(async () => {
                              setStock(p.id, n);
                              applyCatalogOverrides(await getCatalogOverrides());
                              setDraft((d) => {
                                const next = { ...d };
                                delete next[p.id];
                                return next;
                              });
                              showToast("Stock set to " + n);
                            })
                            .catch((error) => {
                              console.error(error);
                              alert("Could not save stock to the database.");
                            });
                        }}
                      >
                        Save
                      </button>
                    </td>
                    <td>
                      <div className="admin-actions">
                        {[-10, -1, 1, 10, 50].map((d) => (
                          <button
                            key={d}
                            type="button"
                            className={d === 50 ? "btn btn-cream btn-sm" : "btn btn-ghost btn-sm"}
                            onClick={() => {
                              const n = Math.max(0, getStock(p.id) + d);
                              void updateCatalogProduct({ data: { id: p.id, input: { stock: n } } })
                                .then(async () => {
                                  setStock(p.id, n);
                                  applyCatalogOverrides(await getCatalogOverrides());
                                  showToast("Stock → " + n);
                                })
                                .catch((error) => {
                                  console.error(error);
                                  alert("Could not save stock to the database.");
                                });
                            }}
                          >
                            {d > 0 ? `+${d}` : d}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
