import { o as __toESM } from "../_runtime.mjs";
import { Z as require_react, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { o as resetCatalogStock, r as getCatalogOverrides, s as updateCatalogProduct } from "./Layout-BS0Pft67.mjs";
import { t as AdminLayout } from "./AdminLayout-CPif2wzC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stock-Bgd-7Rze.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminStock() {
	const listProducts = useClc((s) => s.listProducts);
	const getStock = useClc((s) => s.getStock);
	const setStock = useClc((s) => s.setStock);
	const resetStock = useClc((s) => s.resetStock);
	const showToast = useClc((s) => s.showToast);
	const applyCatalogOverrides = useClc((s) => s.applyCatalogOverrides);
	const customProducts = useClc((s) => s.customProducts);
	const productEdits = useClc((s) => s.productEdits);
	const deletedProductIds = useClc((s) => s.deletedProductIds);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [draft, setDraft] = (0, import_react.useState)({});
	const live = (0, import_react.useMemo)(() => {
		return listProducts().map((p) => ({
			...p,
			stock: getStock(p.id)
		}));
	}, [
		listProducts,
		getStock,
		customProducts,
		productEdits,
		deletedProductIds
	]);
	let list = live;
	if (filter === "low") list = list.filter((p) => p.stock > 0 && p.stock <= 20);
	if (filter === "out") list = list.filter((p) => p.stock < 1);
	const low = live.filter((p) => p.stock > 0 && p.stock <= 20).length;
	const out = live.filter((p) => p.stock < 1).length;
	const units = live.reduce((s, p) => s + p.stock, 0);
	function stockClass(n) {
		if (n < 1) return "stock-out";
		if (n <= 20) return "stock-low";
		return "stock-ok";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, {
		active: "stock",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-between",
					alignItems: "flex-end",
					gap: 12,
					marginBottom: 8
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "admin-page-title",
					children: "Stock management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "admin-page-sub",
					style: { marginBottom: 0 },
					children: "Edit quantities · Low stock ≤ 20 · Orders deduct stock · Cancel restores"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						flexWrap: "wrap",
						gap: 8
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost btn-sm",
							onClick: () => setFilter("all"),
							children: "All"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost btn-sm",
							onClick: () => setFilter("low"),
							children: "Low stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost btn-sm",
							onClick: () => setFilter("out"),
							children: "Out of stock"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-cream btn-sm",
							onClick: () => {
								if (confirm("Reset all stock to seed defaults?")) resetCatalogStock().then(async () => {
									resetStock();
									applyCatalogOverrides(await getCatalogOverrides());
									setDraft({});
									showToast("Stock reset");
								}).catch((error) => {
									console.error(error);
									alert("Could not reset stock in the database.");
								});
							},
							children: "Reset to defaults"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "stat-grid",
				style: { marginTop: 16 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card stat-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label",
							children: "SKUs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "value",
							children: live.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card stat-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label",
							children: "Total units"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "value",
							children: units
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card stat-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label",
							children: "Low stock"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "value",
							children: low
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card stat-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "label",
							children: "Out of stock"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "value",
							children: out
						})]
					})
				]
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Product" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Category" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Current" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Set quantity" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Quick adjust" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 5,
							style: {
								padding: 24,
								color: "var(--color-muted)"
							},
							children: "No products in this filter."
						}) }) : list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: p.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: {
										fontSize: "0.75rem",
										color: "var(--color-muted)"
									},
									children: [
										p.brand,
										" · ",
										p.id
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.catName }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: stockClass(p.stock),
								children: p.stock < 1 ? "Out of stock" : `${p.stock} units`
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								className: "stock-input",
								min: 0,
								step: 1,
								value: draft[p.id] ?? String(p.stock),
								onChange: (e) => setDraft((d) => ({
									...d,
									[p.id]: e.target.value
								}))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-primary btn-sm",
								style: { marginLeft: 6 },
								onClick: () => {
									const n = Math.max(0, Math.floor(Number(draft[p.id] ?? p.stock) || 0));
									updateCatalogProduct({ data: {
										id: p.id,
										input: { stock: n }
									} }).then(async () => {
										setStock(p.id, n);
										applyCatalogOverrides(await getCatalogOverrides());
										setDraft((d) => {
											const next = { ...d };
											delete next[p.id];
											return next;
										});
										showToast("Stock set to " + n);
									}).catch((error) => {
										console.error(error);
										alert("Could not save stock to the database.");
									});
								},
								children: "Save"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "admin-actions",
								children: [
									-10,
									-1,
									1,
									10,
									50
								].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: d === 50 ? "btn btn-cream btn-sm" : "btn btn-ghost btn-sm",
									onClick: () => {
										const n = Math.max(0, getStock(p.id) + d);
										updateCatalogProduct({ data: {
											id: p.id,
											input: { stock: n }
										} }).then(async () => {
											setStock(p.id, n);
											applyCatalogOverrides(await getCatalogOverrides());
											showToast("Stock → " + n);
										}).catch((error) => {
											console.error(error);
											alert("Could not save stock to the database.");
										});
									},
									children: d > 0 ? `+${d}` : d
								}, d))
							}) })
						] }, p.id)) })]
					})
				})
			})
		]
	});
}
//#endregion
export { AdminStock as component };
