import { m as statusLabel, p as statusClass, s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { t as AdminLayout } from "./AdminLayout-CPif2wzC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-CfPUZ2Ej.js
var import_jsx_runtime = require_jsx_runtime();
function AdminOrders() {
	const orders = useClc((s) => s.orders);
	const setOrderStatus = useClc((s) => s.setOrderStatus);
	const showToast = useClc((s) => s.showToast);
	function act(id, status) {
		setOrderStatus(id, status);
		showToast("Order " + statusLabel(status).toLowerCase());
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, {
		active: "orders",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "admin-page-title",
				children: "Orders"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "admin-page-sub",
				children: "Confirm UPI payments, update status, cancel"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card",
				style: {
					padding: 0,
					overflow: "hidden"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "admin-table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "admin-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Order" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Items" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customer" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Total" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Actions" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							style: {
								padding: 28,
								color: "var(--color-muted)"
							},
							children: "No orders in this browser yet."
						}) }) : orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: o.id }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: {
										fontSize: "0.75rem",
										color: "var(--color-muted)"
									},
									children: new Date(o.createdAt).toLocaleString()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { fontSize: "0.75rem" },
									children: o.method === "upi" ? "UPI QR" : "COD"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									maxWidth: 200,
									fontSize: "0.8rem",
									color: "var(--color-muted)"
								},
								children: o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								o.customer?.name || "—",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontSize: "0.75rem",
										color: "var(--color-muted)"
									},
									children: [
										o.customer?.phone || "",
										" · ",
										o.customer?.city || ""
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatINR(o.total) }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `status-pill ${statusClass(o.status)}`,
								children: statusLabel(o.status)
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "admin-actions",
								children: [
									o.status === "payment_pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-primary btn-sm",
										onClick: () => act(o.id, "confirmed"),
										children: "Confirm pay"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-ghost btn-sm",
										onClick: () => act(o.id, "cancelled"),
										children: "Cancel"
									})] }) : null,
									o.status === "confirmed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-primary btn-sm",
										onClick: () => act(o.id, "shipped"),
										children: "Ship"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-ghost btn-sm",
										onClick: () => act(o.id, "cancelled"),
										children: "Cancel"
									})] }) : null,
									o.status === "shipped" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-primary btn-sm",
										onClick: () => act(o.id, "delivered"),
										children: "Delivered"
									}) : null
								]
							}) })
						] }, o.id)) })]
					})
				})
			})
		]
	});
}
//#endregion
export { AdminOrders as component };
