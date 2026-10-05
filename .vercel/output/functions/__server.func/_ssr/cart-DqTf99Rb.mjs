import { s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc, n as cartItems, r as cartTotals } from "./store-h8Lph6nE.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
import { n as Pack } from "./ProductCard-r_S_ekal.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DqTf99Rb.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const cart = useClc((s) => s.cart);
	const getStock = useClc((s) => s.getStock);
	const setQty = useClc((s) => s.setQty);
	const removeFromCart = useClc((s) => s.removeFromCart);
	const items = cartItems(cart, getStock);
	const { subtotal, shipping, total } = cartTotals(items);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-clc",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "breadcrumb",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Home"
					}), " · Cart"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Your cart" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: items.length ? `${items.length} item(s) in your cart` : "" })
			]
		}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "empty-cart card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your cart is empty" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Add medicines and healthcare products to get started." }),
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
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "cart-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cart-list",
				children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "card cart-item",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/product/$slug",
							params: { slug: i.slug },
							className: "cart-item-img",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pack, { tone: i.tone })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "cart-item-info",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "brand",
									children: i.brand
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/product/$slug",
									params: { slug: i.slug },
									children: i.name
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "line-price",
									children: [formatINR(i.price), " each"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "cart-item-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "qty-control",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setQty(i.id, i.qty - 1),
											children: "−"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.qty }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setQty(i.id, i.qty + 1),
											children: "+"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatINR(i.lineTotal) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "cart-remove",
									onClick: () => removeFromCart(i.id),
									children: "Remove"
								})
							]
						})
					]
				}, i.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card cart-summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Order summary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatINR(subtotal) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shipping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shipping === 0 ? "Free" : formatINR(shipping) })]
					}),
					shipping > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.8rem",
							color: "var(--color-muted)",
							marginBottom: 12
						},
						children: "Free shipping on orders ₹499+"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row total",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatINR(total) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/checkout",
						className: "btn btn-primary btn-block",
						style: { marginTop: 16 },
						children: "Proceed to checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: {
							cat: "",
							q: ""
						},
						className: "btn btn-ghost btn-block",
						style: { marginTop: 8 },
						children: "Continue shopping"
					})
				]
			})]
		})]
	}) });
}
//#endregion
export { CartPage as component };
