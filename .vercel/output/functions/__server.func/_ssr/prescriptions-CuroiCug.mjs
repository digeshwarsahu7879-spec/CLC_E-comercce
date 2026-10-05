import { b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { t as AdminLayout } from "./AdminLayout-CPif2wzC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prescriptions-CuroiCug.js
var import_jsx_runtime = require_jsx_runtime();
function AdminRx() {
	const prescriptions = useClc((s) => s.prescriptions);
	const setPrescriptionStatus = useClc((s) => s.setPrescriptionStatus);
	const showToast = useClc((s) => s.showToast);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, {
		active: "rx",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "admin-page-title",
				children: "Prescriptions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "admin-page-sub",
				children: "Customer uploads from the storefront appear here for pharmacist review."
			}),
			prescriptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: {
					padding: 28,
					textAlign: "center"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							color: "var(--color-muted)",
							marginBottom: 12
						},
						children: "No prescription uploads yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						style: {
							fontSize: "0.9rem",
							color: "var(--color-muted)",
							marginBottom: 20
						},
						children: "Customers can submit a file from the storefront upload page."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/prescription",
						className: "btn btn-ghost",
						children: "Open customer upload page"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "ID" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customer" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "File" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Submitted" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Actions" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: prescriptions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: p.id }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.customerName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								p.fileName,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontSize: "0.75rem",
										color: "var(--color-muted)"
									},
									children: [p.sizeKb, " KB"]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: new Date(p.createdAt).toLocaleString() }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `status-pill ${p.status === "reviewed" ? "status-ok" : p.status === "rejected" ? "status-bad" : "status-warn"}`,
								children: p.status
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "admin-actions",
								children: p.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-primary btn-sm",
									onClick: () => {
										setPrescriptionStatus(p.id, "reviewed");
										showToast("Prescription approved");
									},
									children: "Approve"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-ghost btn-sm",
									onClick: () => {
										setPrescriptionStatus(p.id, "rejected");
										showToast("Prescription rejected");
									},
									children: "Reject"
								})] }) : null
							}) })
						] }, p.id)) })]
					})
				})
			})
		]
	});
}
//#endregion
export { AdminRx as component };
