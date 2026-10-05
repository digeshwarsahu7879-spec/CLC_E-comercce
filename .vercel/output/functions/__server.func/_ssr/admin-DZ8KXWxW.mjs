import { m as statusLabel, p as statusClass, s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { t as AdminLayout } from "./AdminLayout-CPif2wzC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DZ8KXWxW.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDash() {
	const orders = useClc((s) => s.orders);
	const getStock = useClc((s) => s.getStock);
	const listProducts = useClc((s) => s.listProducts);
	useClc((s) => s.customProducts);
	useClc((s) => s.productEdits);
	useClc((s) => s.deletedProductIds);
	const pending = orders.filter((o) => o.status === "payment_pending").length;
	const revenue = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + (o.total || 0), 0);
	const live = listProducts().map((p) => ({
		...p,
		stock: getStock(p.id)
	}));
	const lowStock = live.filter((p) => p.stock > 0 && p.stock <= 20).length;
	const outOfStock = live.filter((p) => p.stock < 1).length;
	const recent = orders.slice(0, 8);
	const stats = [
		{
			label: "Orders",
			value: String(orders.length)
		},
		{
			label: "Pending payment",
			value: String(pending)
		},
		{
			label: "Revenue",
			value: formatINR(revenue)
		},
		{
			label: "Products",
			value: String(live.length)
		},
		{
			label: "Low stock",
			value: String(lowStock)
		},
		{
			label: "Out of stock",
			value: String(outOfStock)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, {
		active: "dash",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "admin-page-title",
				children: "Dashboard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "admin-page-sub",
				children: "Overview of store activity"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stat-grid",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card stat-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "label",
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "value",
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: {
					padding: 0,
					overflow: "hidden"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						padding: "16px 18px",
						borderBottom: "1px solid var(--color-line)",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Recent orders" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin/orders",
						className: "btn btn-ghost btn-sm",
						children: "View all"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "admin-table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "admin-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Order" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customer" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Total" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Payment" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							style: {
								color: "var(--color-muted)",
								padding: 24
							},
							children: "No orders yet — place one from the storefront."
						}) }) : recent.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: o.id }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.75rem",
										color: "var(--color-muted)"
									},
									children: new Date(o.createdAt).toLocaleString()
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								o.customer?.name || "—",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.75rem",
										color: "var(--color-muted)"
									},
									children: o.customer?.phone || ""
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatINR(o.total) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.method === "upi" ? "UPI" : "COD" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `status-pill ${statusClass(o.status)}`,
								children: statusLabel(o.status)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/orders",
								className: "btn btn-ghost btn-sm",
								children: "Manage"
							}) })
						] }, o.id)) })]
					})
				})]
			})
		]
	});
}
//#endregion
export { AdminDash as component };
