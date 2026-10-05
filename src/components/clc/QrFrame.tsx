import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function useQrDataUrl(value: string, size = 280) {
  const [dataUrl, setDataUrl] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const payload = (value || "").trim();
    if (!payload) {
      setDataUrl("");
      setFailed(false);
      return;
    }
    let cancelled = false;
    setFailed(false);
    setDataUrl("");
    QRCode.toDataURL(payload, {
      errorCorrectionLevel: "M",
      margin: 2,
      width: size,
      color: { dark: "#16362a", light: "#ffffff" },
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [value, size]);

  return { dataUrl, failed };
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  if (!dataUrl) return;
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export function QrFrame({
  value,
  alt,
  size = 220,
}: {
  value: string;
  alt: string;
  size?: number;
}) {
  const { dataUrl, failed } = useQrDataUrl(value, Math.round(size * 1.18));
  return (
    <div className="upi-qr" data-testid="qr-frame" style={{ width: size + 16, height: size + 16 }}>
      {dataUrl ? (
        <img src={dataUrl} width={size} height={size} alt={alt} />
      ) : failed ? (
        <p className="upi-qr-fallback">QR could not be generated.</p>
      ) : value.trim() ? (
        <p className="upi-qr-fallback">Generating QR…</p>
      ) : (
        <p className="upi-qr-fallback">Enter details to generate a QR.</p>
      )}
    </div>
  );
}
