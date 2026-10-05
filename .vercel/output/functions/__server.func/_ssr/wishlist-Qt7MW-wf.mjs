import { r as PRODUCTS } from "./catalog-BCIZUmOj.mjs";
import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
import { r as ProductCard } from "./ProductCard-r_S_ekal.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wishlist-Qt7MW-wf.js
var import_jsx_runtime = require_jsx_runtime();
function WishlistPage() {
	const items = useClc((s) => s.wish).map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, {
		active: "wishlist",
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
						}), " · Wishlist"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Wishlist" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: items.length ? `${items.length} saved item(s)` : "" })
				]
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-cart card",
				style: { marginBottom: 48 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Wishlist is empty" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tap the heart on products to save them here." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: {
							cat: "",
							q: ""
						},
						className: "btn btn-primary",
						children: "Browse products"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prod-grid",
				style: { paddingBottom: 48 },
				children: items.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
			})]
		})
	});
}
//#endregion
export { WishlistPage as component };
