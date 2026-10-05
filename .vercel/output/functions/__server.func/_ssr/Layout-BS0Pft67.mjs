import { o as __toESM } from "../_runtime.mjs";
import { a as SUPPORT_PHONE, i as SUPPORT_EMAIL } from "./catalog-BCIZUmOj.mjs";
import { Z as require_react, b as Link, p as useRouterState, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as useClc, t as cartCount } from "./store-h8Lph6nE.mjs";
import { a as ShoppingCart, d as Heart, l as Menu, s as Search, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Layout-BS0Pft67.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getCatalogOverrides = createServerFn({ method: "GET" }).handler(createSsrRpc("06db4b8e7bad5834d6b9780b9f7bb4fd810574d9d547f727f04675327d753126"));
var createCatalogProduct = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("90de6bbb1b9e09790814dcfa7c4b0dfc7fecc0782ea3632222868587c27e0069"));
var updateCatalogProduct = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("f7bf19a994a47c85145b50b1fea6893c09c8cc7d7043ba068f07c34cef5bcd8d"));
var removeCatalogProduct = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("fb3e3e8109512e91760281e45e58b8c95334074ee7c887b4dcdcc780bbc10122"));
var removeAllCatalogProducts = createServerFn({ method: "POST" }).handler(createSsrRpc("baecc58bb6fc45138d8cf175be0270aab23bff1b2679bdbb0cdcc1694723d271"));
var resetCatalogStock = createServerFn({ method: "POST" }).handler(createSsrRpc("723da17349294c6409ce023bb319fe3710f84c8cda81c8386153132c055b74ae"));
function useHydrateClc() {
	const setHydrated = useClc((s) => s.setHydrated);
	const applyCatalogOverrides = useClc((s) => s.applyCatalogOverrides);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const unsub = useClc.persist.onFinishHydration(() => setHydrated());
		if (useClc.persist.hasHydrated()) setHydrated();
		getCatalogOverrides().then((rows) => {
			if (!cancelled) applyCatalogOverrides(rows);
		}).catch((error) => {
			console.warn("[CLC] Could not load database product overrides; using local catalog.", error);
		});
		const t = window.setTimeout(() => setHydrated(), 80);
		return () => {
			cancelled = true;
			unsub();
			window.clearTimeout(t);
		};
	}, [setHydrated, applyCatalogOverrides]);
}
function Layout({ children, active = "" }) {
	useHydrateClc();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { active }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { children }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {})
		]
	});
}
function Header({ active }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const cart = useClc((s) => s.cart);
	const wish = useClc((s) => s.wish);
	const user = useClc((s) => s.user);
	const hydrated = useClc((s) => s.hydrated);
	const n = hydrated ? cartCount(cart) : 0;
	const w = hydrated && Array.isArray(wish) ? wish.length : 0;
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "header",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-clc header-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "logo",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/clc-logo.png",
						alt: "CLC CureLifeCare"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "logo-text",
						children: "CureLifeCare"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "nav",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: {
								cat: "",
								q: ""
							},
							className: active === "shop" ? "active" : "",
							children: "Shop"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: {
								cat: "medicines",
								q: ""
							},
							className: active === "medicines" ? "active" : "",
							children: "Medicines"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/wishlist",
							className: active === "wishlist" ? "active" : "",
							children: "Wishlist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/orders",
							className: active === "orders" ? "active" : "",
							children: "Orders"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/help",
							className: active === "help" ? "active" : "",
							children: "Help"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/about",
							className: active === "about" ? "active" : "",
							children: "About"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "header-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/shop",
							search: {
								cat: "",
								q: ""
							},
							className: "icon-btn hide-sm",
							"aria-label": "Search",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/wishlist",
							className: "icon-btn hide-sm",
							"aria-label": "Wishlist",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { size: 18 }), w > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge",
								children: w
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cart",
							className: "icon-btn",
							"aria-label": "Cart",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { size: 18 }), n > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge",
								children: n
							}) : null]
						}),
						hydrated && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: user.role === "admin" ? "/admin" : "/orders",
							className: "btn btn-primary",
							children: user.role === "admin" ? "Admin" : "Account"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: {
								next: "",
								role: ""
							},
							className: "btn btn-primary",
							children: "Login"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "icon-btn nav-toggle",
							"aria-label": open ? "Close menu" : "Open menu",
							onClick: () => setOpen((e) => !e),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `mobile-drawer ${open ? "open" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {
						cat: "",
						q: ""
					},
					className: active === "shop" ? "active" : "",
					children: "Shop"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/shop",
					search: {
						cat: "medicines",
						q: ""
					},
					className: active === "medicines" ? "active" : "",
					children: "Medicines"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/wishlist",
					className: active === "wishlist" ? "active" : "",
					children: "Wishlist"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/orders",
					className: active === "orders" ? "active" : "",
					children: "Orders"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/help",
					className: active === "help" ? "active" : "",
					children: "Help"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/about",
					children: "About"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/prescription",
					children: "Upload prescription"
				}),
				hydrated && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: user.role === "admin" ? "/admin" : "/orders",
					children: user.role === "admin" ? "Admin dashboard" : "My account"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					search: {
						next: "",
						role: ""
					},
					children: "Login / Register"
				})
			]
		})]
	}) });
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "footer",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-clc footer-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "footer-brand",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/clc-logo.png",
						alt: "CLC",
						style: {
							height: 36,
							width: "auto"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A trusted healthcare storefront for medicines, healthcare essentials and wellness products. Your health is our priority." })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "CONTACT US" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: SUPPORT_PHONE }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: SUPPORT_EMAIL }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "India" })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "QUICK LINKS" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/about",
						children: "About Us"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/help",
						children: "Help & FAQ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/track",
						search: { id: "" },
						children: "Track Order"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/prescription",
						children: "Upload Prescription"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/shop",
						search: {
							cat: "",
							q: ""
						},
						children: "Shop all"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "MY ACCOUNT" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cart",
						children: "Cart"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/wishlist",
						children: "Wishlist"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/orders",
						children: "My Orders"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						search: {
							next: "",
							role: ""
						},
						children: "Login / Register"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "OUR PROMISE" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "100% Genuine Products" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Secure UPI QR & COD" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Easy Returns" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Fast Delivery" })
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "footer-bottom",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-clc",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" CLC CureLifeCare. All rights reserved."
				]
			})
		})]
	});
}
function Toast() {
	const toast = useClc((s) => s.toast);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `toast ${toast ? "show" : ""}`,
		children: toast
	});
}
//#endregion
export { removeCatalogProduct as a, useHydrateClc as c, removeAllCatalogProducts as i, createCatalogProduct as n, resetCatalogStock as o, getCatalogOverrides as r, updateCatalogProduct as s, Layout as t };
