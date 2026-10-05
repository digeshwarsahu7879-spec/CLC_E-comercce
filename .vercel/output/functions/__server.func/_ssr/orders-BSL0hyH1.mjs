import { m as statusLabel, p as statusClass, s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-BSL0hyH1.js
var import_jsx_runtime = require_jsx_runtime();
function OrdersPage() {
	const orders = useClc((s) => s.orders);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		active: "orders",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-clc",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "page-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "breadcrumb",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Home"
						}), " · Orders"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "My orders" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Orders placed in this browser" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { paddingBottom: 48 },
				children: orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "empty-cart card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No orders yet" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Place an order from the cart to see it here." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: {
								cat: "",
								q: ""
							},
							className: "btn btn-primary",
							children: "Shop now"
						})
					]
				}) : orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card order-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "order-card-head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "oid",
								children: o.id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "odate",
								children: new Date(o.createdAt).toLocaleString()
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `status-pill ${statusClass(o.status)}`,
								children: statusLabel(o.status)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "order-items",
							children: o.items.map((i) => `${i.name} × ${i.qty}`).join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "order-foot",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatINR(o.total) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 8
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/track",
									search: { id: o.id },
									className: "btn btn-ghost btn-sm",
									children: "Track"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/order-success",
									search: { id: o.id },
									className: "btn btn-cream btn-sm",
									children: "Details"
								})]
							})]
						})
					]
				}, o.id))
			})]
		})
	});
}
//#endregion
export { OrdersPage as component };
