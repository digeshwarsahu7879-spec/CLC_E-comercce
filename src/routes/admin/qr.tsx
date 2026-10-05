import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Copy, Download, ExternalLink, Link2 } from "lucide-react";
import { formatINR, productShareUrl, UPI_ID } from "@/lib/clc/catalog";
import { buildUpiPayUri, UPI_PAYEE_NAME } from "@/lib/clc/upi";
import { useClc } from "@/lib/clc/store";
import { AdminLayout } from "@/components/clc/AdminLayout";
import { downloadDataUrl, QrFrame, useQrDataUrl } from "@/components/clc/QrFrame";

type QrSearch = { type: "upi" | "product" | "custom"; id: string };

export const Route = createFileRoute("/admin/qr")({
  component: AdminQr,
  validateSearch: (s: Record<string, unknown>): QrSearch => ({
    type: s.type === "product" || s.type === "custom" ? s.type : "upi",
    id: typeof s.id === "string" ? s.id : "",
  }),
  head: () => ({ meta: [{ title: "QR Generator — CLC Admin" }] }),
});

function AdminQr() {
  const search = Route.useSearch();
  const listProducts = useClc((s) => s.listProducts);
  const findProduct = useClc((s) => s.findProduct);
  const customProducts = useClc((s) => s.customProducts);
  const productEdits = useClc((s) => s.productEdits);
  const deletedProductIds = useClc((s) => s.deletedProductIds);
  const showToast = useClc((s) => s.showToast);

  void customProducts;
  void productEdits;
  void deletedProductIds;

  const products = listProducts();
  const [mode, setMode] = useState<QrSearch["type"]>(search.type);
  const [amount, setAmount] = useState("100");
  const [note, setNote] = useState("CLC CureLifeCare");
  const [productId, setProductId] = useState(search.id || products[0]?.id || "");
  const [query, setQuery] = useState("");
  const [custom, setCustom] = useState("");
  const [copied, setCopied] = useState(false);

  const selected = findProduct(productId) || products.find((p) => p.id === productId);
  const amountNum = Number(amount);

  const payload = useMemo(() => {
    if (mode === "upi") {
      return buildUpiPayUri({
        pa: UPI_ID,
        pn: UPI_PAYEE_NAME,
        amount: amountNum,
        tn: note,
      });
    }
    if (mode === "product") {
      return selected ? productShareUrl(selected.slug) : "";
    }
    return custom.trim();
  }, [mode, amountNum, note, selected, custom]);

  const { dataUrl } = useQrDataUrl(payload, 320);
  const filtered = products.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return `${p.name} ${p.brand} ${p.catName}`.toLowerCase().includes(q);
  });

  const filename =
    mode === "upi"
      ? `clc-upi-${Math.round(amountNum) || "pay"}.png`
      : mode === "product"
        ? `clc-${selected?.slug || "product"}-qr.png`
        : "clc-qr.png";

  async function copyPayload() {
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      showToast(mode === "upi" ? "UPI link copied" : "Copied");
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      showToast("Could not copy");
    }
  }

  return (
    <AdminLayout active="qr">
      <h1 className="admin-page-title">QR generator</h1>
      <p className="admin-page-sub">Create a UPI payment QR, a product-page QR, or any custom code — then download it.</p>

      <div className="qr-gen-grid">
        <div className="card qr-gen-form">
          <div className="qr-mode-tabs" role="tablist">
            {(
              [
                ["upi", "UPI payment"],
                ["product", "Product page"],
                ["custom", "Custom text"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                className={mode === key ? "active" : ""}
                onClick={() => setMode(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {mode === "upi" ? (
            <div className="qr-fields">
              <div>
                <label className="form-label" htmlFor="qr-amount">
                  Amount (₹)
                </label>
                <input
                  id="qr-amount"
                  className="form-input"
                  type="number"
                  min={1}
                  step={1}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="qr-note">
                  Note on payment
                </label>
                <input
                  id="qr-note"
                  className="form-input"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="CLC counter"
                />
              </div>
              <p className="qr-meta">
                Pays <strong>{UPI_PAYEE_NAME}</strong> at <code>{UPI_ID}</code>
              </p>
            </div>
          ) : null}

          {mode === "product" ? (
            <div className="qr-fields">
              <div>
                <label className="form-label" htmlFor="qr-product-q">
                  Find product
                </label>
                <input
                  id="qr-product-q"
                  className="form-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search name or brand"
                />
              </div>
              <div>
                <label className="form-label" htmlFor="qr-product">
                  Product
                </label>
                <select
                  id="qr-product"
                  className="form-input"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                >
                  {filtered.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} · {p.brand}
                    </option>
                  ))}
                </select>
              </div>
              {selected ? (
                <p className="qr-meta">
                  Shop link: <code>{productShareUrl(selected.slug)}</code>
                </p>
              ) : (
                <p className="qr-meta">Add a product first, then generate its QR.</p>
              )}
            </div>
          ) : null}

          {mode === "custom" ? (
            <div className="qr-fields">
              <div>
                <label className="form-label" htmlFor="qr-custom">
                  Text or URL
                </label>
                <textarea
                  id="qr-custom"
                  className="form-input form-area"
                  rows={4}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="https://… or any text"
                />
              </div>
            </div>
          ) : null}
        </div>

        <div className="card qr-gen-preview">
          <p className="upi-kicker">
            {mode === "upi"
              ? "Scan with any UPI app"
              : mode === "product"
                ? "Scan to open the product page"
                : "Scan to read this code"}
          </p>
          {mode === "upi" ? <div className="upi-amount">{Number.isFinite(amountNum) && amountNum > 0 ? formatINR(amountNum) : "—"}</div> : null}
          {mode === "product" && selected ? <p className="upi-payee">{selected.name}</p> : null}
          {mode === "upi" ? <p className="upi-payee">Pay to {UPI_PAYEE_NAME}</p> : null}

          <QrFrame
            value={payload}
            alt={mode === "upi" ? `UPI QR for ${formatINR(amountNum)}` : "Generated QR code"}
            size={220}
          />

          <div className="upi-actions">
            {mode === "upi" ? (
              <a className="btn btn-primary" href={payload || undefined} aria-disabled={!payload}>
                <ExternalLink size={16} />
                Open UPI app
              </a>
            ) : mode === "product" && selected ? (
              <Link to="/product/$slug" params={{ slug: selected.slug }} className="btn btn-primary">
                <Link2 size={16} />
                View product
              </Link>
            ) : null}
            <button type="button" className="btn btn-ghost" onClick={copyPayload} disabled={!payload}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              Copy {mode === "upi" ? "UPI link" : "value"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => downloadDataUrl(dataUrl, filename)} disabled={!dataUrl}>
              <Download size={16} />
              Download PNG
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
