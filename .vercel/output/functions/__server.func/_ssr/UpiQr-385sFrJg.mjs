import { o as __toESM } from "../_runtime.mjs";
import { o as UPI_ID, s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { g as Check, h as Copy, m as Download, p as ExternalLink } from "../_libs/lucide-react.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/UpiQr-385sFrJg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
/** NPCI UPI deep-link helpers. Encodes a scannable `upi://pay` URI. */
var UPI_PAYEE_NAME = "CLC CureLifeCare";
function enc(value) {
	return encodeURIComponent(value).replace(/%40/gi, "@");
}
function formatUpiAmount(amount) {
	const n = Math.round(Number(amount) * 100) / 100;
	if (!Number.isFinite(n) || n <= 0) return "";
	return n.toFixed(2);
}
function buildUpiPayUri(opts) {
	const pa = (opts.pa || "").trim();
	const pn = (opts.pn || "").trim() || "CLC CureLifeCare";
	const am = formatUpiAmount(opts.amount);
	if (!pa || !am) return "";
	const parts = [
		`pa=${enc(pa)}`,
		`pn=${enc(pn)}`,
		`am=${am}`,
		"cu=INR"
	];
	const tn = (opts.tn || "").trim().slice(0, 50);
	const tr = (opts.tr || "").trim().slice(0, 35);
	if (tn) parts.push(`tn=${enc(tn)}`);
	if (tr) parts.push(`tr=${enc(tr)}`);
	return `upi://pay?${parts.join("&")}`;
}
function UpiQr({ amount, note, reference, hint }) {
	const showToast = useClc((s) => s.showToast);
	const uri = (0, import_react.useMemo)(() => buildUpiPayUri({
		pa: UPI_ID,
		pn: UPI_PAYEE_NAME,
		amount,
		tn: note,
		tr: reference
	}), [
		amount,
		note,
		reference
	]);
	const [dataUrl, setDataUrl] = (0, import_react.useState)("");
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!uri) {
			setDataUrl("");
			setFailed(true);
			return;
		}
		let cancelled = false;
		setFailed(false);
		setDataUrl("");
		import_lib.toDataURL(uri, {
			errorCorrectionLevel: "M",
			margin: 2,
			width: 280,
			color: {
				dark: "#000000",
				light: "#ffffff"
			}
		}).then((url) => {
			if (!cancelled) setDataUrl(url);
		}).catch(() => {
			if (!cancelled) setFailed(true);
		});
		return () => {
			cancelled = true;
		};
	}, [uri]);
	function flash(which) {
		setCopied(which);
		window.setTimeout(() => setCopied((c) => c === which ? null : c), 1600);
	}
	async function copyText(text, which, toast) {
		try {
			await navigator.clipboard.writeText(text);
			flash(which);
			showToast(toast);
		} catch {
			showToast("Could not copy — select the text instead");
		}
	}
	function downloadQr() {
		if (!dataUrl) return;
		const a = document.createElement("a");
		a.href = dataUrl;
		a.download = "clc-upi-qr.png";
		a.click();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "upi-box",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "upi-kicker",
				children: "Scan with PhonePe, Google Pay, Paytm or any UPI app"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "upi-amount",
				children: formatINR(amount)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "upi-payee",
				children: ["Pay to ", UPI_PAYEE_NAME]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "upi-qr",
				"data-testid": "upi-qr",
				children: dataUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: dataUrl,
					width: 220,
					height: 220,
					alt: `UPI QR to pay ${formatINR(amount)} to ${UPI_ID}`
				}) : failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "upi-qr-fallback",
					children: "QR could not be generated. Use the UPI ID below."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "upi-qr-fallback",
					children: "Generating QR…"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "upi-id-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "UPI ID" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: UPI_ID }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "upi-icon-btn",
						onClick: () => copyText(UPI_ID, "id", "UPI ID copied"),
						"aria-label": "Copy UPI ID",
						children: copied === "id" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "upi-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						className: "btn btn-primary",
						href: uri || void 0,
						"aria-disabled": !uri,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 16 }), "Open UPI app"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => copyText(String(amount.toFixed(2)), "amount", "Amount copied"),
						children: [copied === "amount" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { size: 16 }), "Copy amount"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: downloadQr,
						disabled: !dataUrl,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), "Download QR"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "upi-hint",
				children: hint || "Pay the exact amount shown. After paying, place the order so we can confirm it."
			})
		]
	});
}
//#endregion
export { UpiQr as t };
