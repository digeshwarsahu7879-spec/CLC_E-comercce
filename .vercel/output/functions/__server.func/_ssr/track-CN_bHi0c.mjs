import { o as __toESM } from "../_runtime.mjs";
import { m as statusLabel, p as statusClass, s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
import { r as Route$8 } from "./router-VFqNxpbH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track-CN_bHi0c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TrackPage() {
	const { id: pre } = Route$8.useSearch();
	const orders = useClc((s) => s.orders);
	const [id, setId] = (0, import_react.useState)(pre);
	const [query, setQuery] = (0, import_react.useState)(pre);
	const order = orders.find((o) => o.id === query);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-clc",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "breadcrumb",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Home"
						}), " · Track order"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Track order" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Enter your order ID from the confirmation screen" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card",
				style: {
					maxWidth: 520,
					padding: 24,
					marginBottom: 24
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "form-row",
					style: {
						display: "flex",
						gap: 8,
						alignItems: "end"
					},
					onSubmit: (e) => {
						e.preventDefault();
						setQuery(id.trim());
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { flex: 1 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							children: "Order ID"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-input",
							value: id,
							onChange: (e) => setId(e.target.value),
							required: true,
							placeholder: "CLC-…"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn btn-primary",
						children: "Track"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					maxWidth: 560,
					paddingBottom: 48
				},
				children: [query && !order ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card",
					style: {
						padding: 20,
						color: "var(--color-muted)"
					},
					children: "No order found with that ID in this browser."
				}) : null, order ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrackCard, { order }) : null]
			})
		]
	}) });
}
function TrackCard({ order }) {
	const idx = {
		payment_pending: 0,
		confirmed: 1,
		shipped: 2,
		delivered: 3,
		cancelled: -1
	}[order.status] ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "card",
		style: { padding: 20 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: 8
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: order.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `status-pill ${statusClass(order.status)}`,
					children: statusLabel(order.status)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.85rem",
					color: "var(--color-muted)",
					marginBottom: 16
				},
				children: [
					"Placed ",
					new Date(order.createdAt).toLocaleString(),
					" · ",
					formatINR(order.total),
					" · ",
					order.method === "upi" ? "UPI" : "COD"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "track-steps",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `track-step ${idx >= 0 ? "done" : ""} ${order.status === "payment_pending" ? "current" : ""}`,
						children: "Payment"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `track-step ${idx >= 1 ? "done" : ""} ${order.status === "confirmed" ? "current" : ""}`,
						children: "Confirmed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `track-step ${idx >= 2 ? "done" : ""} ${order.status === "shipped" ? "current" : ""}`,
						children: "Shipped"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `track-step ${idx >= 3 ? "done current" : ""}`,
						children: "Delivered"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				style: {
					fontSize: "0.875rem",
					color: "var(--color-muted)"
				},
				children: order.items.map((i) => `${i.name} × ${i.qty}`).join(" · ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				style: {
					fontSize: "0.875rem",
					marginTop: 8
				},
				children: [
					order.customer.name,
					" · ",
					order.customer.city,
					" ",
					order.customer.pin
				]
			})
		]
	});
}
//#endregion
export { TrackPage as component };
