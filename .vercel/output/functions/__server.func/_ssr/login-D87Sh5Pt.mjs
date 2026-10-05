import { o as __toESM } from "../_runtime.mjs";
import { C as useRouter, Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { t as Layout } from "./Layout-BS0Pft67.mjs";
import { o as Route$13 } from "./router-VFqNxpbH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-D87Sh5Pt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { next, role } = Route$13.useSearch();
	const router = useRouter();
	const user = useClc((s) => s.user);
	const login = useClc((s) => s.login);
	const register = useClc((s) => s.register);
	const logout = useClc((s) => s.logout);
	const showToast = useClc((s) => s.showToast);
	const [tab, setTab] = (0, import_react.useState)("login");
	const [error, setError] = (0, import_react.useState)("");
	function go(destUser) {
		const dest = next || (destUser.role === "admin" ? "/admin" : "/");
		router.history.push(dest);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-clc",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "page-hero",
			style: { textAlign: "center" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "breadcrumb",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Home"
				}), " · Account"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "card auth-card",
			children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { textAlign: "center" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						style: {
							fontSize: "1.3rem",
							fontWeight: 600,
							marginBottom: 8
						},
						children: "Signed in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							color: "var(--color-muted)",
							marginBottom: 4
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: user.name })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							color: "var(--color-muted)",
							fontSize: "0.9rem",
							marginBottom: 4
						},
						children: user.email
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: { marginBottom: 16 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `status-pill ${user.role === "admin" ? "status-info" : "status-ok"}`,
							children: user.role
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexWrap: "wrap",
							gap: 8,
							justifyContent: "center"
						},
						children: [
							user.role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								className: "btn btn-primary",
								children: "Open admin"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/orders",
								className: "btn btn-ghost",
								children: "My orders"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "btn btn-cream",
								children: "Storefront"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-ghost",
								onClick: () => logout(),
								children: "Sign out"
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-tabs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: tab === "login" ? "active" : "",
						onClick: () => {
							setTab("login");
							setError("");
						},
						children: "Login"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: tab === "register" ? "active" : "",
						onClick: () => {
							setTab("register");
							setError("");
						},
						children: "Register"
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "auth-error",
					children: error
				}) : null,
				tab === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Welcome back" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "sub",
						children: role === "admin" ? "Admin access required" : "Sign in to continue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							const fd = new FormData(e.currentTarget);
							const res = login(String(fd.get("email")), String(fd.get("password")));
							if (!res.ok) {
								setError(res.error);
								return;
							}
							showToast(res.user.role === "admin" ? "Signed in as admin" : "Signed in");
							go(res.user);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "form-row",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-input",
									type: "email",
									name: "email",
									required: true,
									placeholder: "you@email.com",
									autoComplete: "username"
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "form-row",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-input",
									type: "password",
									name: "password",
									required: true,
									placeholder: "••••••••",
									autoComplete: "current-password"
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "btn btn-primary btn-block",
								children: "Sign in"
							})
						]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Create account" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "sub",
						children: "Create a customer account to order"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: (e) => {
							e.preventDefault();
							const fd = new FormData(e.currentTarget);
							const res = register(String(fd.get("name")), String(fd.get("email")), String(fd.get("password")));
							if (!res.ok) {
								setError(res.error);
								return;
							}
							showToast("Account created");
							go(res.user);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "form-row",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Full name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-input",
									name: "name",
									required: true,
									autoComplete: "name"
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "form-row",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-input",
									type: "email",
									name: "email",
									required: true,
									autoComplete: "email"
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "form-row",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "form-input",
									type: "password",
									name: "password",
									required: true,
									minLength: 4,
									autoComplete: "new-password"
								})] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "btn btn-primary btn-block",
								children: "Register"
							})
						]
					})
				] })
			] })
		})]
	}) });
}
//#endregion
export { LoginPage as component };
