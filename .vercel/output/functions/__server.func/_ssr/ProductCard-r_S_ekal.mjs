import { s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { a as ShoppingCart, d as Heart } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-r_S_ekal.js
var import_jsx_runtime = require_jsx_runtime();
function Pack({ tone, className = "", image }) {
	if (image) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `pack has-image ${className}`,
		style: {
			backgroundImage: `url(${image})`,
			backgroundSize: "cover",
			backgroundPosition: "center"
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `pack ${tone || ""} ${className}` });
}
function ProductCard({ p }) {
	const getStock = useClc((s) => s.getStock);
	const addToCart = useClc((s) => s.addToCart);
	const toggleWish = useClc((s) => s.toggleWish);
	const wish = useClc((s) => s.wish);
	const hydrated = useClc((s) => s.hydrated);
	const stock = hydrated ? getStock(p.id) : typeof p.stock === "number" ? p.stock : 0;
	const out = stock < 1;
	const loved = hydrated && wish.includes(p.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "card prod-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/product/$slug",
			params: { slug: p.slug },
			className: "prod-img",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pack, {
				tone: p.tone,
				image: p.image
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "prod-badges",
				children: [
					p.off > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "badge badge-sale",
						children: [p.off, "% off"]
					}) : null,
					p.rx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge badge-rx",
						children: "Rx"
					}) : null,
					out ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge badge-out",
						children: "Out of stock"
					}) : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "prod-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "prod-brand",
					children: p.brand
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "prod-name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/product/$slug",
						params: { slug: p.slug },
						children: p.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "prod-rating",
					children: ["4.5 · 120 reviews", out ? "" : ` · ${stock} left`]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "prod-price",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatINR(p.price) }), p.off > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "old",
						children: formatINR(p.old)
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "prod-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-primary btn-sm",
						style: { flex: 1 },
						disabled: out,
						onClick: () => addToCart(p.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 14 }), out ? "Sold out" : "Add"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-ghost btn-sm",
						style: { padding: "8px 10px" },
						title: "Wishlist",
						"aria-label": "Wishlist",
						onClick: () => toggleWish(p.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							size: 14,
							className: loved ? "heart-on" : "",
							fill: loved ? "currentColor" : "none"
						})
					})]
				})
			]
		})]
	});
}
function CategoryCard({ slug, name, desc, image }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		className: "card cat-card",
		to: "/shop",
		search: {
			cat: slug,
			q: ""
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: image,
			alt: ""
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "cat-body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: desc })]
		})]
	});
}
//#endregion
export { Pack as n, ProductCard as r, CategoryCard as t };
