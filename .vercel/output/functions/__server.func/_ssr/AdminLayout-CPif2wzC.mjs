import { b as Link, p as useRouterState, w as require_jsx_runtime, x as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { c as useHydrateClc } from "./Layout-BS0Pft67.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminLayout-CPif2wzC.js
var import_jsx_runtime = require_jsx_runtime();
function AdminLayout({ children, active }) {
	useHydrateClc();
	const user = useClc((s) => s.user);
	const hydrated = useClc((s) => s.hydrated);
	const logout = useClc((s) => s.logout);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "admin-layout",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: { color: "var(--color-muted)" },
			children: "Loading admin…"
		})
	});
	if (!user || user.role !== "admin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		search: {
			next: pathname || "/admin",
			role: "admin"
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "site-shell",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "preview-banner admin-banner",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Admin" }), " · CLC CureLifeCare dashboard"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "admin-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "admin-header-inner",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "logo",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/clc-logo.png",
								alt: "CLC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "logo-text",
								children: "CLC Admin"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "admin-nav",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin",
									className: active === "dash" ? "active" : "",
									children: "Dashboard"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/orders",
									className: active === "orders" ? "active" : "",
									children: "Orders"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/products",
									className: active === "products" ? "active" : "",
									children: "Products"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/stock",
									className: active === "stock" ? "active" : "",
									children: "Stock"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/prescriptions",
									className: active === "rx" ? "active" : "",
									children: "Prescriptions"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/customers",
									className: active === "customers" ? "active" : "",
									children: "Customers"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "admin-header-actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "admin-user",
									children: user.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-ghost btn-sm",
									onClick: () => logout(),
									children: "Sign out"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "btn btn-cream btn-sm",
									children: "Storefront"
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "admin-layout",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastOnly, {})
		]
	});
}
function ToastOnly() {
	const toast = useClc((s) => s.toast);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `toast ${toast ? "show" : ""}`,
		children: toast
	});
}
//#endregion
export { AdminLayout as t };
