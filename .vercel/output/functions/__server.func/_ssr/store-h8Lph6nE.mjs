import { d as shippingFor, f as slugify, h as uid, l as getProduct, n as DEMO_USERS, r as PRODUCTS, u as productId } from "./catalog-BCIZUmOj.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-h8Lph6nE.js
var toastTimer = null;
function mergeCatalog(custom, edits, deleted) {
	const deletedSet = new Set(deleted);
	const base = PRODUCTS.filter((p) => !deletedSet.has(p.id)).map((p) => {
		const e = edits[p.id];
		return e ? {
			...p,
			...e,
			id: p.id
		} : p;
	});
	const extras = custom.filter((p) => !deletedSet.has(p.id)).map((p) => {
		const e = edits[p.id];
		return e ? {
			...p,
			...e,
			id: p.id
		} : p;
	});
	return [...base, ...extras];
}
var useClc = create()(persist((set, get) => ({
	cart: {},
	wish: [],
	orders: [],
	user: null,
	stock: {},
	customProducts: [],
	productEdits: {},
	deletedProductIds: [],
	prescriptions: [],
	toast: null,
	hydrated: false,
	setHydrated: () => set({ hydrated: true }),
	showToast: (msg) => {
		set({ toast: msg });
		if (toastTimer) clearTimeout(toastTimer);
		toastTimer = setTimeout(() => set({ toast: null }), 2200);
	},
	listProducts: () => {
		const s = get();
		return mergeCatalog(s.customProducts, s.productEdits, s.deletedProductIds);
	},
	findProduct: (slugOrId) => {
		return getProduct(slugOrId, get().listProducts());
	},
	getStock: (id) => {
		const overrides = get().stock;
		if (Object.prototype.hasOwnProperty.call(overrides, id)) return Math.max(0, Number(overrides[id]) || 0);
		const p = get().findProduct(id);
		return p ? p.stock : 0;
	},
	setStock: (id, qty) => {
		const n = Math.max(0, Math.floor(Number(qty) || 0));
		set((s) => ({ stock: {
			...s.stock,
			[id]: n
		} }));
		return n;
	},
	adjustStock: (id, delta) => {
		const next = Math.max(0, get().getStock(id) + delta);
		return get().setStock(id, next);
	},
	resetStock: () => set({ stock: {} }),
	addProduct: (input) => {
		const name = (input.name || "").trim();
		const brand = (input.brand || "").trim() || "CLC";
		const cat = (input.cat || "medicines").trim();
		const catName = (input.catName || cat).trim();
		const price = Math.max(0, Number(input.price) || 0);
		const old = Math.max(price, Number(input.old) || price);
		const off = input.off != null ? Math.max(0, Math.min(99, Math.floor(Number(input.off) || 0))) : old > price ? Math.round((old - price) / old * 100) : 0;
		const stock = Math.max(0, Math.floor(Number(input.stock) ?? 0));
		let slug = slugify(input.slug || name);
		if (get().listProducts().some((p) => p.slug === slug)) slug = slug + "-" + Date.now().toString(36).slice(-4);
		const product = {
			id: productId(),
			slug,
			name: name || "Untitled product",
			brand,
			cat,
			catName,
			price,
			old,
			off,
			stock,
			tone: input.tone || "",
			rx: Boolean(input.rx),
			pack: (input.pack || "1 unit").trim(),
			desc: (input.desc || "").trim(),
			ingredients: (input.ingredients || "").trim(),
			directions: (input.directions || "").trim(),
			image: (input.image || "").trim() || void 0
		};
		set((s) => ({
			customProducts: [...s.customProducts, product],
			stock: {
				...s.stock,
				[product.id]: stock
			}
		}));
		get().showToast("Product added");
		return product;
	},
	updateProduct: (id, input) => {
		const current = get().findProduct(id);
		if (!current) return null;
		const next = {};
		if (input.name != null) next.name = String(input.name).trim() || current.name;
		if (input.brand != null) next.brand = String(input.brand).trim() || current.brand;
		if (input.cat != null) {
			next.cat = String(input.cat).trim();
			next.catName = (input.catName || input.cat).trim();
		} else if (input.catName != null) next.catName = String(input.catName).trim();
		if (input.price != null) next.price = Math.max(0, Number(input.price) || 0);
		if (input.old != null) next.old = Math.max(0, Number(input.old) || 0);
		if (input.off != null) next.off = Math.max(0, Math.min(99, Math.floor(Number(input.off) || 0)));
		if (input.tone != null) next.tone = String(input.tone);
		if (input.rx != null) next.rx = Boolean(input.rx);
		if (input.pack != null) next.pack = String(input.pack).trim();
		if (input.desc != null) next.desc = String(input.desc).trim();
		if (input.ingredients != null) next.ingredients = String(input.ingredients).trim();
		if (input.directions != null) next.directions = String(input.directions).trim();
		if (input.image != null) next.image = String(input.image).trim() || void 0;
		if (input.slug != null) {
			let slug = slugify(input.slug);
			if (get().listProducts().some((p) => p.slug === slug && p.id !== id)) slug = slug + "-" + Date.now().toString(36).slice(-4);
			next.slug = slug;
		}
		if (input.stock != null) get().setStock(id, Number(input.stock));
		if (get().customProducts.some((p) => p.id === id)) set((s) => ({ customProducts: s.customProducts.map((p) => p.id === id ? {
			...p,
			...next
		} : p) }));
		else set((s) => ({ productEdits: {
			...s.productEdits,
			[id]: {
				...s.productEdits[id] || {},
				...next
			}
		} }));
		get().showToast("Product updated");
		return get().findProduct(id) || null;
	},
	removeProduct: (id) => {
		set((s) => {
			const isCustom = s.customProducts.some((p) => p.id === id);
			const customProducts = isCustom ? s.customProducts.filter((p) => p.id !== id) : s.customProducts;
			const deletedProductIds = isCustom ? s.deletedProductIds : s.deletedProductIds.includes(id) ? s.deletedProductIds : [...s.deletedProductIds, id];
			const cart = { ...s.cart };
			delete cart[id];
			const wish = s.wish.filter((x) => x !== id);
			const stock = { ...s.stock };
			delete stock[id];
			const productEdits = { ...s.productEdits };
			delete productEdits[id];
			return {
				customProducts,
				deletedProductIds,
				cart,
				wish,
				stock,
				productEdits
			};
		});
		get().showToast("Product removed");
	},
	applyCatalogOverrides: (rows) => {
		const customProducts = [];
		const productEdits = {};
		const deletedProductIds = [];
		const stock = { ...get().stock };
		for (const row of rows || []) {
			if (row.isDeleted) deletedProductIds.push(row.id);
			if (row.isCustom && !row.isDeleted) {
				const p = row.data;
				if (p && typeof p === "object" && p.name) customProducts.push({
					...p,
					id: row.id
				});
			} else if (!row.isCustom && row.data && typeof row.data === "object") productEdits[row.id] = {
				...row.data,
				id: row.id
			};
			if (row.stock != null) stock[row.id] = Math.max(0, Number(row.stock) || 0);
		}
		set({
			customProducts,
			productEdits,
			deletedProductIds,
			stock
		});
	},
	addToCart: (id, qty = 1) => {
		const stock = get().getStock(id);
		const cart = { ...get().cart };
		const current = cart[id] || 0;
		const add = Math.max(1, qty);
		if (stock < 1) {
			get().showToast("Out of stock");
			return false;
		}
		if (current + add > stock) {
			get().showToast(`Only ${stock} in stock`);
			if (current >= stock) return false;
			cart[id] = stock;
		} else cart[id] = current + add;
		set({ cart });
		const p = get().findProduct(id);
		get().showToast(p ? `Added “${p.name}” to cart` : "Added to cart");
		return true;
	},
	setQty: (id, qty) => {
		const cart = { ...get().cart };
		if (qty <= 0) delete cart[id];
		else {
			const stock = get().getStock(id);
			cart[id] = Math.min(qty, Math.max(stock, 0));
			if (qty > stock) get().showToast(stock < 1 ? "Out of stock" : `Only ${stock} in stock`);
		}
		set({ cart });
	},
	removeFromCart: (id) => {
		const cart = { ...get().cart };
		delete cart[id];
		set({ cart });
		get().showToast("Removed from cart");
	},
	clearCart: () => set({ cart: {} }),
	toggleWish: (id) => {
		const wish = get().wish;
		if (wish.includes(id)) {
			set({ wish: wish.filter((x) => x !== id) });
			get().showToast("Removed from wishlist");
			return false;
		}
		set({ wish: [...wish, id] });
		get().showToast("Saved to wishlist");
		return true;
	},
	login: (email, password) => {
		const emailNorm = (email || "").trim().toLowerCase();
		const found = DEMO_USERS.find((u) => u.email === emailNorm && u.password === password);
		if (found) {
			const user = {
				email: found.email,
				name: found.name,
				role: found.role
			};
			set({ user });
			return {
				ok: true,
				user
			};
		}
		if (emailNorm && password && password.length >= 4) {
			const user = {
				email: emailNorm,
				name: emailNorm.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
				role: "customer"
			};
			set({ user });
			return {
				ok: true,
				user
			};
		}
		return {
			ok: false,
			error: "Invalid email or password"
		};
	},
	register: (name, email, password) => {
		const emailNorm = (email || "").trim().toLowerCase();
		if (!name || !emailNorm || !password || password.length < 4) return {
			ok: false,
			error: "Please fill all fields (password min 4 chars)"
		};
		if (DEMO_USERS.some((u) => u.email === emailNorm)) return {
			ok: false,
			error: "That email is reserved — try logging in"
		};
		const user = {
			email: emailNorm,
			name: name.trim(),
			role: "customer"
		};
		set({ user });
		return {
			ok: true,
			user
		};
	},
	logout: () => set({ user: null }),
	placeOrder: (payload) => {
		const items = payload.items || [];
		items.forEach((item) => get().adjustStock(item.id, -(item.qty || 0)));
		const order = {
			id: uid(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: payload.status || (payload.method === "upi" ? "payment_pending" : "confirmed"),
			method: payload.method,
			total: payload.total,
			subtotal: payload.subtotal,
			shipping: payload.shipping,
			items,
			customer: payload.customer
		};
		set((s) => ({
			orders: [order, ...s.orders],
			cart: {}
		}));
		return order;
	},
	setOrderStatus: (id, status) => {
		set((s) => {
			return { orders: s.orders.map((o) => {
				if (o.id !== id) return o;
				if (status === "cancelled" && o.status !== "cancelled") o.items.forEach((item) => get().adjustStock(item.id, item.qty || 0));
				return {
					...o,
					status
				};
			}) };
		});
	},
	addPrescription: (fileName, sizeKb) => {
		const rx = {
			id: uid(),
			fileName,
			sizeKb,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			status: "pending",
			customerName: get().user?.name || "Guest"
		};
		set((s) => ({ prescriptions: [rx, ...s.prescriptions] }));
		get().showToast("Prescription submitted");
		return rx;
	},
	setPrescriptionStatus: (id, status) => {
		set((s) => ({ prescriptions: s.prescriptions.map((p) => p.id === id ? {
			...p,
			status
		} : p) }));
	}
}), {
	name: "clc-store",
	partialize: (s) => ({
		cart: s.cart,
		wish: s.wish,
		orders: s.orders,
		user: s.user,
		stock: s.stock,
		customProducts: s.customProducts,
		productEdits: s.productEdits,
		deletedProductIds: s.deletedProductIds,
		prescriptions: s.prescriptions
	}),
	version: 2,
	migrate: (persisted) => {
		const p = persisted ?? {};
		return {
			cart: p.cart && typeof p.cart === "object" ? p.cart : {},
			wish: Array.isArray(p.wish) ? p.wish : [],
			orders: Array.isArray(p.orders) ? p.orders : [],
			user: p.user ?? null,
			stock: p.stock && typeof p.stock === "object" ? p.stock : {},
			customProducts: Array.isArray(p.customProducts) ? p.customProducts : [],
			productEdits: p.productEdits && typeof p.productEdits === "object" ? p.productEdits : {},
			deletedProductIds: Array.isArray(p.deletedProductIds) ? p.deletedProductIds : [],
			prescriptions: Array.isArray(p.prescriptions) ? p.prescriptions : []
		};
	},
	merge: (persisted, current) => {
		const p = persisted ?? {};
		return {
			...current,
			...p,
			cart: p.cart && typeof p.cart === "object" ? p.cart : {},
			wish: Array.isArray(p.wish) ? p.wish : [],
			orders: Array.isArray(p.orders) ? p.orders : [],
			stock: p.stock && typeof p.stock === "object" ? p.stock : {},
			customProducts: Array.isArray(p.customProducts) ? p.customProducts : [],
			productEdits: p.productEdits && typeof p.productEdits === "object" ? p.productEdits : {},
			deletedProductIds: Array.isArray(p.deletedProductIds) ? p.deletedProductIds : [],
			prescriptions: Array.isArray(p.prescriptions) ? p.prescriptions : []
		};
	},
	onRehydrateStorage: () => () => {
		useClc.getState().setHydrated();
	}
}));
function cartCount(cart) {
	return Object.values(cart).reduce((s, q) => s + q, 0);
}
function cartItems(cart, getStock) {
	const products = useClc.getState().listProducts();
	return Object.entries(cart).map(([id, qty]) => {
		const p = products.find((x) => x.id === id);
		if (!p) return null;
		return {
			...p,
			qty,
			stock: getStock(id),
			lineTotal: p.price * qty
		};
	}).filter(Boolean);
}
function cartTotals(items) {
	const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
	const shipping = shippingFor(subtotal);
	return {
		subtotal,
		shipping,
		total: subtotal + shipping
	};
}
function liveProduct(slugOrId, getStock) {
	const p = useClc.getState().findProduct(slugOrId);
	if (!p) return null;
	return {
		...p,
		stock: getStock(p.id)
	};
}
//#endregion
export { useClc as a, liveProduct as i, cartItems as n, cartTotals as r, cartCount as t };
