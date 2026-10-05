import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { f as FileUp } from "../_libs/lucide-react.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prescription-CSDt4PXQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PrescriptionPage() {
	const inputRef = (0, import_react.useRef)(null);
	const addPrescription = useClc((s) => s.addPrescription);
	const [file, setFile] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(false);
	const [drag, setDrag] = (0, import_react.useState)(false);
	function handle(f) {
		setFile(f);
		setDone(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-clc",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "breadcrumb",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Home"
					}), " · Prescription"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Upload prescription" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "JPG, PNG or PDF — reviewed by a pharmacist in the admin queue" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card",
			style: {
				maxWidth: 560,
				padding: 24,
				marginBottom: 48
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `upload-zone ${drag ? "drag" : ""}`,
					onClick: () => inputRef.current?.click(),
					onDragOver: (e) => {
						e.preventDefault();
						setDrag(true);
					},
					onDragLeave: () => setDrag(false),
					onDrop: (e) => {
						e.preventDefault();
						setDrag(false);
						const f = e.dataTransfer.files[0];
						if (f) handle(f);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: inputRef,
							type: "file",
							accept: "image/*,.pdf",
							onChange: (e) => {
								const f = e.target.files?.[0];
								if (f) handle(f);
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, {
							size: 28,
							style: {
								margin: "0 auto 10px",
								color: "var(--color-forest)"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontWeight: 500,
								marginBottom: 6
							},
							children: "Drop file here or click to browse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: {
								fontSize: "0.85rem",
								color: "var(--color-muted)"
							},
							children: "JPG, PNG or PDF · Max 5 MB"
						})
					]
				}),
				file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { marginTop: 16 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { fontSize: "0.9rem" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
							file.name,
							" (",
							Math.round(file.size / 1024),
							" KB)"
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-primary",
						style: { marginTop: 12 },
						onClick: () => {
							addPrescription(file.name, Math.round(file.size / 1024));
							setDone(true);
						},
						children: "Submit for review"
					})]
				}) : null,
				done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						marginTop: 16,
						color: "var(--color-forest)",
						fontWeight: 500
					},
					children: "Prescription submitted. A pharmacist will review it from the admin dashboard."
				}) : null
			]
		})]
	}) });
}
//#endregion
export { PrescriptionPage as component };
