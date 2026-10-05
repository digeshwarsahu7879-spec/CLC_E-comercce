import { o as __toESM } from "../_runtime.mjs";
import { s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { S as useNavigate, Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc, n as cartItems, r as cartTotals } from "./store-h8Lph6nE.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
import { t as UpiQr } from "./UpiQr-385sFrJg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-C1w5J6wM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const navigate = useNavigate();
	const cart = useClc((s) => s.cart);
	const getStock = useClc((s) => s.getStock);
	const user = useClc((s) => s.user);
	const placeOrder = useClc((s) => s.placeOrder);
	const items = cartItems(cart, getStock);
	const { subtotal, shipping, total } = cartTotals(items);
	const [method, setMethod] = (0, import_react.useState)("upi");
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-clc",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-hero",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "breadcrumb",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Home"
				}), " · Checkout"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Checkout" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "empty-cart card",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Your cart is empty" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Add products before checkout." }),
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
		})]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-clc",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "page-hero",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "breadcrumb",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: "Home"
						}),
						" · ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cart",
							children: "Cart"
						}),
						" · Checkout"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Checkout" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "UPI QR & Cash on Delivery" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "checkout-grid",
			onSubmit: (e) => {
				e.preventDefault();
				const fd = new FormData(e.currentTarget);
				const order = placeOrder({
					method: fd.get("method") || method,
					total,
					subtotal,
					shipping,
					items: items.map((i) => ({
						id: i.id,
						name: i.name,
						qty: i.qty,
						price: i.price,
						slug: i.slug
					})),
					customer: {
						name: String(fd.get("name") || ""),
						phone: String(fd.get("phone") || ""),
						address: String(fd.get("address") || ""),
						city: String(fd.get("city") || ""),
						pin: String(fd.get("pin") || ""),
						email: user?.email
					}
				});
				navigate({
					to: "/order-success",
					search: { id: order.id }
				});
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card checkout-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Delivery details" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-row two",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-input",
							name: "name",
							required: true,
							placeholder: "Your name",
							defaultValue: user?.name || ""
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							children: "Phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-input",
							name: "phone",
							required: true,
							placeholder: "10-digit mobile",
							pattern: "[0-9]{10}"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "form-row",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							children: "Address"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-input",
							name: "address",
							required: true,
							placeholder: "House / street"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-row two",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							children: "City"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-input",
							name: "city",
							required: true
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "form-label",
							children: "PIN code"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "form-input",
							name: "pin",
							required: true,
							pattern: "[0-9]{6}"
						})] })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card checkout-section",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Payment method" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pay-options",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: `pay-option ${method === "upi" ? "selected" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "method",
								value: "upi",
								checked: method === "upi",
								onChange: () => setMethod("upi")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "UPI QR" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scan the live QR or open PhonePe / Google Pay · Pay exact amount" })] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: `pay-option ${method === "cod" ? "selected" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "method",
								value: "cod",
								checked: method === "cod",
								onChange: () => setMethod("cod")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Cash on Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pay when your order arrives" })] })]
						})]
					}),
					method === "upi" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpiQr, {
						amount: total,
						note: "CLC CureLifeCare order"
					}) : null
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card cart-summary",
				style: {
					position: "sticky",
					top: 80
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Order summary" }),
					items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							i.name,
							" × ",
							i.qty
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatINR(i.lineTotal) })]
					}, i.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatINR(subtotal) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shipping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: shipping === 0 ? "Free" : formatINR(shipping) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "summary-row total",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatINR(total) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn btn-primary btn-block",
						style: { marginTop: 16 },
						children: "Place order"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cart",
						className: "btn btn-ghost btn-block",
						style: { marginTop: 8 },
						children: "Back to cart"
					})
				]
			})]
		})]
	}) });
}
//#endregion
export { CheckoutPage as component };
