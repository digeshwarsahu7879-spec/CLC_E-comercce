import { o as __toESM } from "../_runtime.mjs";
import { t as CATEGORIES } from "./catalog-BCIZUmOj.mjs";
import { S as useNavigate, Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { c as RotateCcw, i as Sparkles, n as Truck, o as ShieldCheck, u as MapPin } from "../_libs/lucide-react.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
import { r as ProductCard, t as CategoryCard } from "./ProductCard-r_S_ekal.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CLVLsVYn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("");
	const listProducts = useClc((s) => s.listProducts);
	useClc((s) => s.customProducts);
	useClc((s) => s.productEdits);
	useClc((s) => s.deletedProductIds);
	const all = listProducts();
	const medicines = all.filter((p) => p.cat === "medicines").slice(0, 8);
	const health = all.filter((p) => p.cat === "healthcare" || p.cat === "personal-care").slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "hero",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-clc hero-grid",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-badge",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), "Trusted online pharmacy"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"Your health,",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "delivered with care" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "lead",
						children: "Genuine medicines, healthcare essentials and wellness products — ordered online, verified by pharmacists, delivered to your door."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hero-cta",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: {
								cat: "medicines",
								q: ""
							},
							className: "btn btn-primary",
							children: "Shop medicines"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: {
								cat: "",
								q: ""
							},
							className: "btn btn-ghost",
							children: "Browse categories"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hero-img",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/hero.jpg",
						alt: "CLC healthcare essentials"
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-clc",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "trust",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card trust-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "100% Genuine" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Original & authentic medicines" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card trust-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Fast Delivery" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "On-time delivery at your door" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card trust-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pan-India" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ships across major cities" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card trust-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Easy returns" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hassle-free support" })] })]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "search-bar",
				onSubmit: (e) => {
					e.preventDefault();
					navigate({
						to: "/shop",
						search: {
							cat,
							q
						}
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "search",
						placeholder: "Search medicines, healthcare products...",
						value: q,
						onChange: (e) => setQ(e.target.value),
						"aria-label": "Search products"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: cat,
						onChange: (e) => setCat(e.target.value),
						"aria-label": "Category",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "All categories"
						}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: c.slug,
							children: c.name
						}, c.slug))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn btn-primary",
						children: "Search"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "section container-clc",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Shop by category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {
						cat: "",
						q: ""
					},
					children: "View all →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "cat-grid",
				children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, { ...c }, c.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-clc",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "promo",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "UPI QR payments · COD available" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pay exactly the order amount via UPI QR, PhonePe or Google Pay. Or choose Cash on Delivery." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {
						cat: "medicines",
						q: ""
					},
					className: "btn btn-cream",
					children: "Shop now"
				})]
			})
		}),
		medicines.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "section container-clc",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Popular medicines" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {
						cat: "medicines",
						q: ""
					},
					children: "View all →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prod-grid",
				children: medicines.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
			})]
		}) : null,
		health.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "section container-clc",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "section-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Healthcare essentials" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {
						cat: "healthcare",
						q: ""
					},
					children: "View all →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "prod-grid",
				children: health.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
			})]
		}) : null
	] });
}
//#endregion
export { Home as component };
