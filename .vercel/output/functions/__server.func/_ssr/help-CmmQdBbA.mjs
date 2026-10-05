import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-CmmQdBbA.js
var import_jsx_runtime = require_jsx_runtime();
var FAQS = [
	{
		q: "How do I pay with UPI?",
		a: "At checkout, choose UPI QR. Scan the live QR with PhonePe, Google Pay or any UPI app (or tap Open UPI app on your phone) and pay the exact order amount. You can also copy the UPI ID. After paying, place the order so admin can confirm payment."
	},
	{
		q: "Is Cash on Delivery available?",
		a: "Yes. Select COD at checkout and pay when your order is delivered."
	},
	{
		q: "Do I need a prescription?",
		a: "Some medicines require a valid prescription. Upload it via the prescription page; a pharmacist reviews it before dispensing."
	},
	{
		q: "How long does delivery take?",
		a: "Delivery times depend on your location and stock. Free shipping is offered on orders of ₹499 and above."
	},
	{
		q: "How do I track my order?",
		a: "Use Track order with the order ID from your confirmation page, or open My orders."
	}
];
function HelpPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		active: "help",
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
						}), " · Help"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Help & FAQ" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Common questions about ordering, payments and delivery" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card",
				style: {
					maxWidth: 720,
					padding: "8px 24px 24px",
					marginBottom: 48
				},
				children: FAQS.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "faq-item",
					open: i === 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: f.q }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: f.a })]
				}, f.q))
			})]
		})
	});
}
//#endregion
export { HelpPage as component };
