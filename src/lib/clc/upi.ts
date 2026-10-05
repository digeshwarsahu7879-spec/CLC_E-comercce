/** NPCI UPI deep-link helpers. Encodes a scannable `upi://pay` URI. */

export const UPI_PAYEE_NAME = "CLC CureLifeCare";

function enc(value: string) {
  // RFC 3986 percent-encoding. Keep `@` in VPAs — some UPI apps reject `%40`.
  return encodeURIComponent(value).replace(/%40/gi, "@");
}

export function formatUpiAmount(amount: number) {
  const n = Math.round(Number(amount) * 100) / 100;
  if (!Number.isFinite(n) || n <= 0) return "";
  return n.toFixed(2);
}

export function buildUpiPayUri(opts: {
  pa: string;
  pn: string;
  amount: number;
  tn?: string;
  tr?: string;
}) {
  const pa = (opts.pa || "").trim();
  const pn = (opts.pn || "").trim() || UPI_PAYEE_NAME;
  const am = formatUpiAmount(opts.amount);
  if (!pa || !am) return "";

  const parts = [`pa=${enc(pa)}`, `pn=${enc(pn)}`, `am=${am}`, "cu=INR"];
  const tn = (opts.tn || "").trim().slice(0, 50);
  const tr = (opts.tr || "").trim().slice(0, 35);
  if (tn) parts.push(`tn=${enc(tn)}`);
  if (tr) parts.push(`tr=${enc(tr)}`);
  return `upi://pay?${parts.join("&")}`;
}
