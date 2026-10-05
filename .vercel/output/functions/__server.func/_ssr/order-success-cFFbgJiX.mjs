import { m as statusLabel, p as statusClass, s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { g as Check } from "../_libs/lucide-react.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
import { t as UpiQr } from "./UpiQr-385sFrJg.mjs";
import { a as Route$12 } from "./router-VFqNxpbH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-success-cFFbgJiX.js
var import_jsx_runtime = require_jsx_runtime();
function OrderSuccessPage() {
	const { id } = Route$12.useSearch();
	const order = useClc((s) => s.orders).find((o) => o.id === id);
	const showUpi = Boolean(order && order.method === "upi" && order.status === "payment_pending");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-clc",
		children: !order ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "empty-cart",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Order not found" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/orders",
				className: "btn btn-primary",
				children: "My orders"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "success-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "success-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 32 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: showUpi ? "Order placed — complete UPI payment" : "Order placed successfully" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: order.method === "upi" ? "Scan the QR below (or open your UPI app) and pay the exact amount. We’ll confirm the order after payment is verified." : "Your COD order is confirmed. We’ll pack and ship it soon." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							fontWeight: 600,
							color: "var(--color-ink)"
						},
						children: ["Order ID: ", order.id]
					})
				]
			}),
			showUpi ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					maxWidth: 480,
					margin: "0 auto 28px"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpiQr, {
					amount: order.total,
					note: `CLC ${order.id}`,
					reference: order.id,
					hint: "Pay the exact amount. Keep this page open until the payment is done."
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: {
					maxWidth: 560,
					margin: "0 auto 48px",
					padding: 20
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill ${statusClass(order.status)}`,
							children: statusLabel(order.status)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Payment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: order.method === "upi" ? "UPI QR" : "Cash on Delivery" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatINR(order.total) }) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Deliver to" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							order.customer.name,
							", ",
							order.customer.city
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							marginTop: 12,
							fontSize: "0.875rem",
							color: "var(--color-muted)"
						},
						children: order.items.map((i) => `${i.name} × ${i.qty}`).join(" · ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexWrap: "wrap",
							gap: 10,
							justifyContent: "center",
							marginTop: 20
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/orders",
								className: "btn btn-primary",
								children: "View my orders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/track",
								search: { id: order.id },
								className: "btn btn-ghost",
								children: "Track order"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/shop",
								search: {
									cat: "",
									q: ""
								},
								className: "btn btn-ghost",
								children: "Continue shopping"
							})
						]
					})
				]
			})
		] })
	}) });
}
//#endregion
export { OrderSuccessPage as component };
