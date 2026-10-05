import { o as __toESM } from "../_runtime.mjs";
import { s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc, i as liveProduct } from "./store-h8Lph6nE.mjs";
import { a as ShoppingCart } from "../_libs/lucide-react.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
import { n as Pack, r as ProductCard } from "./ProductCard-r_S_ekal.mjs";
import { n as Route } from "./router-VFqNxpbH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-CJbre8FN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { slug } = Route.useParams();
	const getStock = useClc((s) => s.getStock);
	const addToCart = useClc((s) => s.addToCart);
	const listProducts = useClc((s) => s.listProducts);
	useClc((s) => s.customProducts);
	useClc((s) => s.productEdits);
	useClc((s) => s.deletedProductIds);
	const p = liveProduct(slug, getStock);
	const [qty, setQty] = (0, import_react.useState)(1);
	if (!p) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-clc empty-cart",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Product not found" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This product may have been removed." }),
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
	}) });
	const related = listProducts().filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-clc",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "breadcrumb",
				style: { paddingTop: 20 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Home"
					}),
					" ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: {
							cat: p.cat,
							q: ""
						},
						children: p.catName
					}),
					" ",
					"· ",
					p.name
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pdp-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pdp-gallery card",
					style: { position: "relative" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pack, {
						tone: p.tone,
						image: p.image
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "prod-badges",
						style: {
							position: "absolute",
							top: 16,
							left: 16
						},
						children: [p.off > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "badge badge-sale",
							children: [p.off, "% off"]
						}) : null, p.rx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "badge badge-rx",
							children: "Rx"
						}) : null]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pdp-info",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "prod-brand",
							children: p.brand
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: p.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "pdp-meta",
							children: [
								p.pack,
								" · ",
								p.stock < 1 ? "Out of stock" : `In stock (${p.stock})`,
								" · 4.5 · 120 reviews"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdp-price-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "price",
								children: formatINR(p.price)
							}), p.off > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "old",
								children: formatINR(p.old)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "save",
								children: [
									"Save ",
									p.off,
									"%"
								]
							})] }) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "qty-row",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "0.9rem",
									fontWeight: 500
								},
								children: "Quantity"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "qty-control",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setQty((q) => Math.max(1, q - 1)),
										"aria-label": "Decrease",
										children: "−"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: qty }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setQty((q) => Math.min(Math.max(p.stock, 1), q + 1)),
										"aria-label": "Increase",
										children: "+"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdp-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn btn-primary",
								style: { minWidth: 180 },
								disabled: p.stock < 1,
								onClick: () => addToCart(p.id, qty),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 16 }), p.stock < 1 ? "Out of stock" : "Add to cart"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cart",
								className: "btn btn-ghost",
								children: "View cart"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pdp-desc",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Description" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.desc }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Ingredients" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.ingredients }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Directions" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.directions }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Package" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: p.pack })
							]
						})
					]
				})]
			}),
			related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-head",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Related products" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "prod-grid",
					children: related.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p: r }, r.id))
				})]
			}) : null
		]
	}) });
}
//#endregion
export { ProductPage as component };
