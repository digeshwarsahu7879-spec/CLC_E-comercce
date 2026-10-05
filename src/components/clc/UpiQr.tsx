import { useMemo, useState } from "react";
import { Check, Copy, Download, ExternalLink } from "lucide-react";
import { UPI_ID, formatINR } from "@/lib/clc/catalog";
import { buildUpiPayUri, UPI_PAYEE_NAME } from "@/lib/clc/upi";
import { useClc } from "@/lib/clc/store";
import { downloadDataUrl, useQrDataUrl } from "./QrFrame";

type Props = {
  amount: number;
  note?: string;
  reference?: string;
  hint?: string;
};

export function UpiQr({ amount, note, reference, hint }: Props) {
  const showToast = useClc((s) => s.showToast);
  const uri = useMemo(
    () =>
      buildUpiPayUri({
        pa: UPI_ID,
        pn: UPI_PAYEE_NAME,
        amount,
        tn: note,
        tr: reference,
      }),
    [amount, note, reference],
  );
  const { dataUrl, failed } = useQrDataUrl(uri, 280);
  const [copied, setCopied] = useState<"id" | "amount" | null>(null);

  function flash(which: "id" | "amount") {
    setCopied(which);
    window.setTimeout(() => setCopied((c) => (c === which ? null : c)), 1600);
  }

  async function copyText(text: string, which: "id" | "amount", toast: string) {
    try {
      await navigator.clipboard.writeText(text);
      flash(which);
      showToast(toast);
    } catch {
      showToast("Could not copy — select the text instead");
    }
  }

  return (
    <div className="upi-box">
      <p className="upi-kicker">Scan with PhonePe, Google Pay, Paytm or any UPI app</p>
      <div className="upi-amount">{formatINR(amount)}</div>
      <p className="upi-payee">Pay to {UPI_PAYEE_NAME}</p>

      <div className="upi-qr" data-testid="upi-qr">
        {dataUrl ? (
          <img src={dataUrl} width={220} height={220} alt={`UPI QR to pay ${formatINR(amount)} to ${UPI_ID}`} />
        ) : failed ? (
          <p className="upi-qr-fallback">QR could not be generated. Use the UPI ID below.</p>
        ) : (
          <p className="upi-qr-fallback">Generating QR…</p>
        )}
      </div>

      <div className="upi-id-row">
        <span>UPI ID</span>
        <code>{UPI_ID}</code>
        <button
          type="button"
          className="upi-icon-btn"
          onClick={() => copyText(UPI_ID, "id", "UPI ID copied")}
          aria-label="Copy UPI ID"
        >
          {copied === "id" ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>

      <div className="upi-actions">
        <a className="btn btn-primary" href={uri || undefined} aria-disabled={!uri}>
          <ExternalLink size={16} />
          Open UPI app
        </a>
        <button type="button" className="btn btn-ghost" onClick={() => copyText(String(amount.toFixed(2)), "amount", "Amount copied")}>
          {copied === "amount" ? <Check size={16} /> : <Copy size={16} />}
          Copy amount
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => downloadDataUrl(dataUrl, "clc-upi-qr.png")} disabled={!dataUrl}>
          <Download size={16} />
          Download QR
        </button>
      </div>

      <p className="upi-hint">
        {hint || "Pay the exact amount shown. After paying, place the order so we can confirm it."}
      </p>
    </div>
  );
}
