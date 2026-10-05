import { o as __toESM } from "../_runtime.mjs";
import { c as getCategory } from "./catalog-BCIZUmOj.mjs";
import { C as useRouter, Z as require_react, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, v as createFileRoute, w as require_jsx_runtime, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { r as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-VFqNxpbH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-xeapdq9F.css";
var APP_NAME = "CLC CureLifeCare";
var Route$19 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Trusted online pharmacy for medicines, healthcare essentials and wellness products."
			},
			{
				name: "theme-color",
				content: "#1f4a38"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$18 = () => import("./routes-CLVLsVYn.mjs");
var Route$18 = createFileRoute("/")({
	component: lazyRouteComponent($$splitComponentImporter$18, "component"),
	head: () => ({ meta: [{ title: "CLC CureLifeCare — Home" }] })
});
var $$splitComponentImporter$17 = () => import("./about-BS54iJvb.mjs");
var Route$17 = createFileRoute("/about")({
	component: lazyRouteComponent($$splitComponentImporter$17, "component"),
	head: () => ({ meta: [{ title: "About — CLC CureLifeCare" }] })
});
var $$splitComponentImporter$16 = () => import("./cart-DqTf99Rb.mjs");
var Route$16 = createFileRoute("/cart")({
	component: lazyRouteComponent($$splitComponentImporter$16, "component"),
	head: () => ({ meta: [{ title: "Cart — CLC CureLifeCare" }] })
});
var $$splitComponentImporter$15 = () => import("./checkout-C1w5J6wM.mjs");
var Route$15 = createFileRoute("/checkout")({
	component: lazyRouteComponent($$splitComponentImporter$15, "component"),
	head: () => ({ meta: [{ title: "Checkout — CLC CureLifeCare" }] })
});
var $$splitComponentImporter$14 = () => import("./help-CmmQdBbA.mjs");
var Route$14 = createFileRoute("/help")({
	component: lazyRouteComponent($$splitComponentImporter$14, "component"),
	head: () => ({ meta: [{ title: "Help & FAQ — CLC CureLifeCare" }] })
});
var $$splitComponentImporter$13 = () => import("./login-D87Sh5Pt.mjs");
var Route$13 = createFileRoute("/login")({
	component: lazyRouteComponent($$splitComponentImporter$13, "component"),
	validateSearch: (s) => ({
		next: typeof s.next === "string" ? s.next : "",
		role: typeof s.role === "string" ? s.role : ""
	}),
	head: () => ({ meta: [{ title: "Login — CLC CureLifeCare" }] })
});
var $$splitComponentImporter$12 = () => import("./order-success-cFFbgJiX.mjs");
var Route$12 = createFileRoute("/order-success")({
	component: lazyRouteComponent($$splitComponentImporter$12, "component"),
	validateSearch: (s) => ({ id: typeof s.id === "string" ? s.id : "" }),
	head: () => ({ meta: [{ title: "Order placed — CLC CureLifeCare" }] })
});
var $$splitComponentImporter$11 = () => import("./orders-BSL0hyH1.mjs");
var Route$11 = createFileRoute("/orders")({
	component: lazyRouteComponent($$splitComponentImporter$11, "component"),
	head: () => ({ meta: [{ title: "My Orders — CLC CureLifeCare" }] })
});
var $$splitComponentImporter$10 = () => import("./prescription-CSDt4PXQ.mjs");
var Route$10 = createFileRoute("/prescription")({
	component: lazyRouteComponent($$splitComponentImporter$10, "component"),
	head: () => ({ meta: [{ title: "Upload Prescription — CLC CureLifeCare" }] })
});
var $$splitComponentImporter$9 = () => import("./shop-CjEpI1j0.mjs");
var Route$9 = createFileRoute("/shop")({
	component: lazyRouteComponent($$splitComponentImporter$9, "component"),
	validateSearch: (s) => ({
		cat: typeof s.cat === "string" ? s.cat : "",
		q: typeof s.q === "string" ? s.q : ""
	}),
	head: ({ match }) => {
		return { meta: [{ title: `${getCategory(match.search.cat)?.name || (match.search.q ? `Search: ${match.search.q}` : "Shop")} — CLC CureLifeCare` }] };
	}
});
var $$splitComponentImporter$8 = () => import("./track-CN_bHi0c.mjs");
var Route$8 = createFileRoute("/track")({
	component: lazyRouteComponent($$splitComponentImporter$8, "component"),
	validateSearch: (s) => ({ id: typeof s.id === "string" ? s.id : "" }),
	head: () => ({ meta: [{ title: "Track Order — CLC CureLifeCare" }] })
});
var $$splitComponentImporter$7 = () => import("./wishlist-Qt7MW-wf.mjs");
var Route$7 = createFileRoute("/wishlist")({
	component: lazyRouteComponent($$splitComponentImporter$7, "component"),
	head: () => ({ meta: [{ title: "Wishlist — CLC CureLifeCare" }] })
});
var $$splitComponentImporter$6 = () => import("./admin-DZ8KXWxW.mjs");
var Route$6 = createFileRoute("/admin/")({
	component: lazyRouteComponent($$splitComponentImporter$6, "component"),
	head: () => ({ meta: [{ title: "Admin Dashboard — CLC" }] })
});
var $$splitComponentImporter$5 = () => import("./customers--q9eCJKA.mjs");
var Route$5 = createFileRoute("/admin/customers")({
	component: lazyRouteComponent($$splitComponentImporter$5, "component"),
	head: () => ({ meta: [{ title: "Admin Customers — CLC" }] })
});
var $$splitComponentImporter$4 = () => import("./orders-CfPUZ2Ej.mjs");
var Route$4 = createFileRoute("/admin/orders")({
	component: lazyRouteComponent($$splitComponentImporter$4, "component"),
	head: () => ({ meta: [{ title: "Admin Orders — CLC" }] })
});
var $$splitComponentImporter$3 = () => import("./prescriptions-CuroiCug.mjs");
var Route$3 = createFileRoute("/admin/prescriptions")({
	component: lazyRouteComponent($$splitComponentImporter$3, "component"),
	head: () => ({ meta: [{ title: "Admin Prescriptions — CLC" }] })
});
var $$splitComponentImporter$2 = () => import("./products-DZ4D27SM.mjs");
var Route$2 = createFileRoute("/admin/products")({
	component: lazyRouteComponent($$splitComponentImporter$2, "component"),
	head: () => ({ meta: [{ title: "Admin Products — CLC" }] })
});
var $$splitComponentImporter$1 = () => import("./stock-Bgd-7Rze.mjs");
var Route$1 = createFileRoute("/admin/stock")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	head: () => ({ meta: [{ title: "Stock Management — CLC Admin" }] })
});
var $$splitComponentImporter = () => import("./product._slug-CJbre8FN.mjs");
var Route = createFileRoute("/product/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	head: ({ params }) => {
		return { meta: [{ title: `${useClc.getState().findProduct(params.slug)?.name || "Product"} — CLC CureLifeCare` }] };
	}
});
var IndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$19
});
var AboutRoute = Route$17.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$19
});
var CartRoute = Route$16.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$19
});
var CheckoutRoute = Route$15.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$19
});
var HelpRoute = Route$14.update({
	id: "/help",
	path: "/help",
	getParentRoute: () => Route$19
});
var LoginRoute = Route$13.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$19
});
var OrderSuccessRoute = Route$12.update({
	id: "/order-success",
	path: "/order-success",
	getParentRoute: () => Route$19
});
var OrdersRoute = Route$11.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => Route$19
});
var PrescriptionRoute = Route$10.update({
	id: "/prescription",
	path: "/prescription",
	getParentRoute: () => Route$19
});
var ShopRoute = Route$9.update({
	id: "/shop",
	path: "/shop",
	getParentRoute: () => Route$19
});
var TrackRoute = Route$8.update({
	id: "/track",
	path: "/track",
	getParentRoute: () => Route$19
});
var WishlistRoute = Route$7.update({
	id: "/wishlist",
	path: "/wishlist",
	getParentRoute: () => Route$19
});
var AdminIndexRoute = Route$6.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$19
});
var rootRouteChildren = {
	IndexRoute,
	AboutRoute,
	CartRoute,
	CheckoutRoute,
	HelpRoute,
	LoginRoute,
	OrderSuccessRoute,
	OrdersRoute,
	PrescriptionRoute,
	ShopRoute,
	TrackRoute,
	WishlistRoute,
	AdminCustomersRoute: Route$5.update({
		id: "/admin/customers",
		path: "/admin/customers",
		getParentRoute: () => Route$19
	}),
	AdminOrdersRoute: Route$4.update({
		id: "/admin/orders",
		path: "/admin/orders",
		getParentRoute: () => Route$19
	}),
	AdminPrescriptionsRoute: Route$3.update({
		id: "/admin/prescriptions",
		path: "/admin/prescriptions",
		getParentRoute: () => Route$19
	}),
	AdminProductsRoute: Route$2.update({
		id: "/admin/products",
		path: "/admin/products",
		getParentRoute: () => Route$19
	}),
	AdminStockRoute: Route$1.update({
		id: "/admin/stock",
		path: "/admin/stock",
		getParentRoute: () => Route$19
	}),
	ProductSlugRoute: Route.update({
		id: "/product/$slug",
		path: "/product/$slug",
		getParentRoute: () => Route$19
	}),
	AdminIndexRoute
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { Route$12 as a, Route$9 as i, Route as n, Route$13 as o, Route$8 as r, router_exports as t };
