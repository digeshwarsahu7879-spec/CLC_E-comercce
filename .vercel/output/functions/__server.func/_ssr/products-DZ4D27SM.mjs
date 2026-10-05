import { o as __toESM } from "../_runtime.mjs";
import { s as formatINR, t as CATEGORIES } from "./catalog-BCIZUmOj.mjs";
import { Z as require_react, b as Link, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useClc } from "./store-h8Lph6nE.mjs";
import { a as removeCatalogProduct, i as removeAllCatalogProducts, n as createCatalogProduct, r as getCatalogOverrides, s as updateCatalogProduct } from "./Layout-BS0Pft67.mjs";
import { t as AdminLayout } from "./AdminLayout-CPif2wzC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-DZ4D27SM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	name: "",
	brand: "",
	cat: "medicines",
	catName: "Medicines",
	price: 0,
	old: 0,
	off: 0,
	stock: 10,
	pack: "1 unit",
	desc: "",
	ingredients: "",
	directions: "",
	image: "",
	rx: false
};
function AdminProducts() {
	const listProducts = useClc((s) => s.listProducts);
	const getStock = useClc((s) => s.getStock);
	const applyCatalogOverrides = useClc((s) => s.applyCatalogOverrides);
	const customProducts = useClc((s) => s.customProducts);
	const productEdits = useClc((s) => s.productEdits);
	const deletedProductIds = useClc((s) => s.deletedProductIds);
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
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	function openAdd() {
		setEditingId(null);
		setForm({
			...emptyForm,
			cat: "medicines",
			catName: "Medicines"
		});
		setShowForm(true);
	}
	function openEdit(p) {
		setEditingId(p.id);
		setForm({
			name: p.name,
			brand: p.brand,
			cat: p.cat,
			catName: p.catName,
			price: p.price,
			old: p.old,
			off: p.off,
			stock: getStock(p.id),
			pack: p.pack,
			desc: p.desc,
			ingredients: p.ingredients,
			directions: p.directions,
			image: p.image || "",
			rx: p.rx,
			slug: p.slug,
			tone: p.tone
		});
		setShowForm(true);
	}
	function onCatChange(slug) {
		const c = CATEGORIES.find((x) => x.slug === slug);
		setForm((f) => ({
			...f,
			cat: slug,
			catName: c?.name || slug
		}));
	}
	async function submit(e) {
		e.preventDefault();
		if (!form.name?.trim()) return;
		try {
			if (editingId) await updateCatalogProduct({ data: {
				id: editingId,
				input: form
			} });
			else await createCatalogProduct({ data: form });
			applyCatalogOverrides(await getCatalogOverrides());
			setShowForm(false);
			setEditingId(null);
			setForm(emptyForm);
		} catch (error) {
			console.error(error);
			alert("Could not save the product to the database. Check your Vercel database connection and deployment logs.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminLayout, {
		active: "products",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-between",
					alignItems: "flex-end",
					gap: 12,
					marginBottom: 16
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "admin-page-title",
					children: "Products"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "admin-page-sub",
					style: { marginBottom: 0 },
					children: [live.length, " products · add, edit, or remove · manage stock on Stock page"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						flexWrap: "wrap",
						gap: 8
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/stock",
							className: "btn btn-ghost btn-sm",
							children: "Manage stock"
						}),
						live.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost btn-sm",
							style: { color: "var(--color-danger, #b91c1c)" },
							onClick: () => {
								if (!confirm(`Remove ALL ${live.length} products from the store? This will hide them for every customer. You can add new products afterwards.`)) return;
								removeAllCatalogProducts().then(async () => applyCatalogOverrides(await getCatalogOverrides())).catch((error) => {
									console.error(error);
									alert("Could not remove all products from the database.");
								});
							},
							children: "Remove all products"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-primary btn-sm",
							onClick: openAdd,
							children: "+ Add product"
						})
					]
				})]
			}),
			showForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				style: {
					marginBottom: 20,
					padding: 20
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: {
						fontSize: "1.1rem",
						fontWeight: 600,
						marginBottom: 12
					},
					children: editingId ? "Edit product" : "Add product"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: 12
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Name *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								required: true,
								value: form.name || "",
								onChange: (e) => setForm((f) => ({
									...f,
									name: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Brand"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								value: form.brand || "",
								onChange: (e) => setForm((f) => ({
									...f,
									brand: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Category"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "form-input",
								value: form.cat || "medicines",
								onChange: (e) => onCatChange(e.target.value),
								children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.slug,
									children: c.name
								}, c.slug))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Price (₹)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								type: "number",
								min: 0,
								step: 1,
								value: form.price ?? 0,
								onChange: (e) => setForm((f) => ({
									...f,
									price: Number(e.target.value)
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "MRP / old price (₹)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								type: "number",
								min: 0,
								step: 1,
								value: form.old ?? 0,
								onChange: (e) => setForm((f) => ({
									...f,
									old: Number(e.target.value)
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Discount %"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								type: "number",
								min: 0,
								max: 99,
								step: 1,
								value: form.off ?? 0,
								onChange: (e) => setForm((f) => ({
									...f,
									off: Number(e.target.value)
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Stock"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								type: "number",
								min: 0,
								step: 1,
								value: form.stock ?? 0,
								onChange: (e) => setForm((f) => ({
									...f,
									stock: Number(e.target.value)
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Pack size"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								value: form.pack || "",
								onChange: (e) => setForm((f) => ({
									...f,
									pack: e.target.value
								})),
								placeholder: "15 tablets"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { gridColumn: "1 / -1" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Product image"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										flexWrap: "wrap",
										gap: 12,
										alignItems: "flex-start"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: { flex: "1 1 220px" },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "form-input",
												type: "file",
												accept: "image/*",
												onChange: (e) => {
													const file = e.target.files?.[0];
													if (!file) return;
													if (file.size > 1572864) {
														alert("Image too large. Please use a file under 1.5 MB.");
														e.target.value = "";
														return;
													}
													const reader = new FileReader();
													reader.onload = () => {
														const result = typeof reader.result === "string" ? reader.result : "";
														setForm((f) => ({
															...f,
															image: result
														}));
													};
													reader.readAsDataURL(file);
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												style: {
													fontSize: "0.8rem",
													color: "var(--color-muted)",
													marginTop: 6
												},
												children: "Upload a photo (JPG/PNG, max 1.5 MB) or paste an image URL below."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "form-input",
												style: { marginTop: 8 },
												value: form.image?.startsWith("data:") ? "" : form.image || "",
												onChange: (e) => setForm((f) => ({
													...f,
													image: e.target.value
												})),
												placeholder: "https://… (optional image URL)"
											})
										]
									}), form.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: { textAlign: "center" },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: form.image,
											alt: "Preview",
											style: {
												width: 96,
												height: 96,
												objectFit: "cover",
												borderRadius: 12,
												border: "1px solid var(--color-line)",
												background: "var(--color-mist)"
											}
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "btn btn-ghost btn-sm",
											style: {
												display: "block",
												marginTop: 6
											},
											onClick: () => setForm((f) => ({
												...f,
												image: ""
											})),
											children: "Clear image"
										})]
									}) : null]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { gridColumn: "1 / -1" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "form-label",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									className: "form-input",
									rows: 3,
									value: form.desc || "",
									onChange: (e) => setForm((f) => ({
										...f,
										desc: e.target.value
									}))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Ingredients"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								value: form.ingredients || "",
								onChange: (e) => setForm((f) => ({
									...f,
									ingredients: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "form-label",
								children: "Directions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "form-input",
								value: form.directions || "",
								onChange: (e) => setForm((f) => ({
									...f,
									directions: e.target.value
								}))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 8,
									paddingTop: 22
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 8,
										cursor: "pointer"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: Boolean(form.rx),
										onChange: (e) => setForm((f) => ({
											...f,
											rx: e.target.checked
										}))
									}), "Prescription required (Rx)"]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							flexWrap: "wrap",
							gap: 8,
							marginTop: 16
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "btn btn-primary",
							children: editingId ? "Save changes" : "Create product"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost",
							onClick: () => {
								setShowForm(false);
								setEditingId(null);
							},
							children: "Cancel"
						})]
					})]
				})]
			}) : null,
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Brand" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Category" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Price" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Stock" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Discount" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: live.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 7,
							style: {
								padding: 24,
								color: "var(--color-muted)"
							},
							children: "No products. Click “Add product” to create one."
						}) }) : live.map((p) => {
							const cls = p.stock < 1 ? "stock-out" : p.stock <= 20 ? "stock-low" : "stock-ok";
							const label = p.stock < 1 ? "Out" : p.stock;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 10
									},
									children: [p.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: p.image,
										alt: "",
										style: {
											width: 40,
											height: 40,
											objectFit: "cover",
											borderRadius: 8,
											background: "var(--color-line)"
										}
									}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: p.name }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: "0.75rem",
												color: "var(--color-muted)"
											},
											children: p.id
										})
									] })]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.brand }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.catName }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatINR(p.price) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cls,
									children: label
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.off ? `${p.off}%` : "—" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "admin-actions",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "btn btn-ghost btn-sm",
											onClick: () => openEdit(p),
											children: "Edit"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/admin/stock",
											className: "btn btn-ghost btn-sm",
											children: "Stock"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "btn btn-ghost btn-sm",
											style: { color: "var(--color-danger, #b91c1c)" },
											onClick: () => {
												if (confirm(`Remove “${p.name}”?`)) removeCatalogProduct({ data: { id: p.id } }).then(async () => applyCatalogOverrides(await getCatalogOverrides())).catch((error) => {
													console.error(error);
													alert("Could not remove the product from the database.");
												});
											},
											children: "Remove"
										})
									]
								}) })
							] }, p.id);
						}) })]
					})
				})
			})
		]
	});
}
//#endregion
export { AdminProducts as component };
