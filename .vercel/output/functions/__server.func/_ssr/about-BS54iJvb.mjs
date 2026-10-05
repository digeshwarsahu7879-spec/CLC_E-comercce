import { a as SUPPORT_PHONE, i as SUPPORT_EMAIL, o as UPI_ID } from "./catalog-BCIZUmOj.mjs";
import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-BS54iJvb.js
var import_jsx_runtime = require_jsx_runtime();
function AboutPage() {
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
						}), " · About"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "About CLC CureLifeCare" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your trusted partner for genuine medicines and healthcare essentials" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: {
					padding: 28,
					marginBottom: 24,
					maxWidth: 720
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							marginBottom: 14,
							color: "var(--color-muted)",
							lineHeight: 1.65
						},
						children: "CLC CureLifeCare is an online pharmacy and healthcare storefront focused on authentic products, pharmacist-verified prescriptions, and reliable delivery. We combine a modern shopping experience with careful fulfilment so you can order with confidence."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: {
							fontWeight: 600,
							margin: "20px 0 8px"
						},
						children: "What you can do here"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						style: {
							color: "var(--color-muted)",
							paddingLeft: 20,
							lineHeight: 1.8
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Browse medicines, healthcare, personal care, Ayurveda and devices" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cart, wishlist, UPI QR and Cash on Delivery checkout" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Upload a prescription for pharmacist review" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Track orders and manage stock from the admin dashboard" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: {
					padding: 28,
					marginBottom: 24,
					maxWidth: 720
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: {
							fontSize: "1.2rem",
							fontWeight: 600,
							marginBottom: 12
						},
						children: "Contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							color: "var(--color-muted)",
							marginBottom: 6
						},
						children: [
							"Phone:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${SUPPORT_PHONE.replace(/\s/g, "")}`,
								style: { color: "var(--color-forest)" },
								children: SUPPORT_PHONE
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: {
							color: "var(--color-muted)",
							marginBottom: 6
						},
						children: [
							"Email:",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${SUPPORT_EMAIL}`,
								style: { color: "var(--color-forest)" },
								children: SUPPORT_EMAIL
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: { color: "var(--color-muted)" },
						children: ["UPI ID (demo): ", UPI_ID]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: {
					padding: 28,
					marginBottom: 48,
					maxWidth: 720
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: {
						fontSize: "1.2rem",
						fontWeight: 600,
						marginBottom: 12
					},
					children: "Policies"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						color: "var(--color-muted)",
						lineHeight: 1.65
					},
					children: "Orders of ₹499 and above ship free. Returns for unopened, non-Rx items are accepted within 7 days. Prescription medicines cannot be returned once dispensed."
				})]
			})
		]
	}) });
}
//#endregion
export { AboutPage as component };
