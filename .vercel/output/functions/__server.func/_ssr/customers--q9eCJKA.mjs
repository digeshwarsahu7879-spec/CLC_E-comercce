import { s as formatINR } from "./catalog-BCIZUmOj.mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { t as AdminLayout } from "./AdminLayout-CPif2wzC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers--q9eCJKA.js
var import_jsx_runtime = require_jsx_runtime();
function AdminCustomers() {
	const orders = useClc((s) => s.orders);
	const map = {};
	orders.forEach((o) => {
		const key = o.customer?.phone || o.customer?.name || o.id;
		if (!map[key]) map[key] = {
			name: o.customer?.name || "—",
			phone: o.customer?.phone || "—",
			city: o.customer?.city || "—",
			orders: 0,
			spent: 0
		};
		map[key].orders++;
		map[key].spent += o.total || 0;
	});
	const rows = Object.values(map);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, {
		active: "customers",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "admin-page-title",
				children: "Customers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "admin-page-sub",
				children: "Derived from orders placed in this browser"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card",
				style: {
					padding: 0,
					overflow: "hidden"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "admin-table-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "admin-table",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Name" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Phone" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "City" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Orders" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Total spent" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							style: {
								padding: 24,
								color: "var(--color-muted)"
							},
							children: "No customer data yet."
						}) }) : rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.phone }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.city }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.orders }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatINR(c.spent) })
						] }, c.phone + c.name)) })]
					})
				})
			})
		]
	});
}
//#endregion
export { AdminCustomers as component };
