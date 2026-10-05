import { c as getCategory, t as CATEGORIES } from "./catalog-BCIZUmOj.mjs";
import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
import { r as ProductCard } from "./ProductCard-r_S_ekal.mjs";
import { i as Route$9 } from "./router-VFqNxpbH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-CjEpI1j0.js
var import_jsx_runtime = require_jsx_runtime();
function Shop() {
	const { cat, q } = Route$9.useSearch();
	const listProducts = useClc((s) => s.listProducts);
	useClc((s) => s.customProducts);
	useClc((s) => s.productEdits);
	useClc((s) => s.deletedProductIds);
	const qn = q.toLowerCase().trim();
	let list = listProducts().slice();
	if (cat) list = list.filter((p) => p.cat === cat);
	if (qn) list = list.filter((p) => p.name.toLowerCase().includes(qn) || p.brand.toLowerCase().includes(qn) || p.catName.toLowerCase().includes(qn));
	const catObj = getCategory(cat);
	const title = catObj ? catObj.name : qn ? `Search: “${q}”` : "All products";
	const desc = catObj ? catObj.desc : qn ? `${list.length} result(s)` : "Browse medicines and healthcare essentials";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, {
		active: cat === "medicines" ? "medicines" : "shop",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-clc page-hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "breadcrumb",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Home"
					}), " · Shop"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: desc })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-clc",
			style: { paddingBottom: 48 },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "filters-bar",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {
						cat: "",
						q
					},
					className: `filter-chip ${!cat ? "active" : ""}`,
					children: "All"
				}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {
						cat: c.slug,
						q
					},
					className: `filter-chip ${cat === c.slug ? "active" : ""}`,
					children: c.name
				}, c.slug))]
			}), list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "empty-cart",
				style: { marginTop: 24 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No products found" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Try another category or search term." })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prod-grid",
				style: { marginTop: 20 },
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
			})]
		})]
	});
}
//#endregion
export { Shop as component };
