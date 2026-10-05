import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEMO_USERS,
  PRODUCTS,
  getProduct as findInList,
  normalizeImages,
  productId,
  shippingFor,
  slugify,
  uid,
  type OrderStatus,
  type Product,
} from "./catalog";

export type ClcUser = {
  email: string;
  name: string;
  role: "customer" | "admin";
};

export type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
  slug?: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  method: "upi" | "cod";
  total: number;
  subtotal: number;
  shipping: number;
  items: OrderItem[];
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    pin: string;
    email?: string;
  };
};

export type Prescription = {
  id: string;
  fileName: string;
  sizeKb: number;
  createdAt: string;
  status: "pending" | "reviewed" | "rejected";
  customerName: string;
};

export type ProductInput = {
  id?: string;
  name: string;
  brand: string;
  cat: string;
  catName?: string;
  price: number;
  old?: number;
  off?: number;
  stock?: number;
  tone?: string;
  rx?: boolean;
  pack?: string;
  desc?: string;
  ingredients?: string;
  directions?: string;
  image?: string;
  images?: string[];
  slug?: string;
};

type ClcState = {
  cart: Record<string, number>;
  wish: string[];
  orders: Order[];
  user: ClcUser | null;
  stock: Record<string, number>;
  customProducts: Product[];
  productEdits: Record<string, Partial<Product>>;
  deletedProductIds: string[];
  prescriptions: Prescription[];
  toast: string | null;
  hydrated: boolean;
  setHydrated: () => void;
  showToast: (msg: string) => void;
  listProducts: () => Product[];
  findProduct: (slugOrId: string) => Product | undefined;
  getStock: (id: string) => number;
  setStock: (id: string, qty: number) => number;
  adjustStock: (id: string, delta: number) => number;
  resetStock: () => void;
  addProduct: (input: ProductInput) => Product;
  updateProduct: (id: string, input: Partial<ProductInput>) => Product | null;
  removeProduct: (id: string) => void;
  applyCatalogOverrides: (rows: Array<{ id: string; isCustom: boolean; isDeleted: boolean; data: Partial<Product>; stock: number | null }>) => void;
  clearAllProductsLocal: () => void;
  addToCart: (id: string, qty?: number) => boolean;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWish: (id: string) => boolean;
  login: (email: string, password: string) => { ok: true; user: ClcUser } | { ok: false; error: string };
  register: (name: string, email: string, password: string) => { ok: true; user: ClcUser } | { ok: false; error: string };
  logout: () => void;
  placeOrder: (payload: Omit<Order, "id" | "createdAt" | "status"> & { status?: OrderStatus }) => Order;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  addPrescription: (fileName: string, sizeKb: number) => Prescription;
  setPrescriptionStatus: (id: string, status: Prescription["status"]) => void;
};

let toastTimer: ReturnType<typeof setTimeout> | null = null;

function mergeCatalog(
  custom: Product[],
  edits: Record<string, Partial<Product>>,
  deleted: string[],
): Product[] {
  const deletedSet = new Set(deleted);
  // PRODUCTS seed is empty — only non-deleted custom products appear.
  const base = PRODUCTS.filter((p) => !deletedSet.has(p.id)).map((p) => {
    const e = edits[p.id];
    return e ? { ...p, ...e, id: p.id } : p;
  });
  const extras = custom.filter((p) => !deletedSet.has(p.id)).map((p) => {
    const e = edits[p.id];
    return e ? { ...p, ...e, id: p.id } : p;
  });
  return [...base, ...extras];
}

export const useClc = create<ClcState>()(
  persist(
    (set, get) => ({
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
        return findInList(slugOrId, get().listProducts());
      },
      getStock: (id) => {
        const overrides = get().stock;
        if (Object.prototype.hasOwnProperty.call(overrides, id)) {
          return Math.max(0, Number(overrides[id]) || 0);
        }
        const p = get().findProduct(id);
        return p ? p.stock : 0;
      },
      setStock: (id, qty) => {
        const n = Math.max(0, Math.floor(Number(qty) || 0));
        set((s) => ({ stock: { ...s.stock, [id]: n } }));
        return n;
      },
      adjustStock: (id, delta) => {
        const next = Math.max(0, get().getStock(id) + delta);
        return get().setStock(id, next);
      },
      resetStock: () => set({ stock: {} }),
      clearAllProductsLocal: () => {
        set({
          customProducts: [],
          productEdits: {},
          deletedProductIds: [],
          stock: {},
          cart: {},
          wish: [],
        });
      },
      addProduct: (input) => {
        const name = (input.name || "").trim();
        const brand = (input.brand || "").trim() || "CLC";
        const cat = (input.cat || "medicines").trim();
        const catName = (input.catName || cat).trim();
        const price = Math.max(0, Number(input.price) || 0);
        const old = Math.max(price, Number(input.old) || price);
        const off = input.off != null ? Math.max(0, Math.min(99, Math.floor(Number(input.off) || 0))) : old > price ? Math.round(((old - price) / old) * 100) : 0;
        const stock = Math.max(0, Math.floor(Number(input.stock) ?? 0));
        let slug = slugify(input.slug || name);
        const existing = get().listProducts();
        if (existing.some((p) => p.slug === slug)) {
          slug = slug + "-" + Date.now().toString(36).slice(-4);
        }
        const images = normalizeImages(input.images, input.image);
        const product: Product = {
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
          image: images[0],
          images: images.length ? images : undefined,
        };
        set((s) => ({
          customProducts: [...s.customProducts, product],
          stock: { ...s.stock, [product.id]: stock },
        }));
        get().showToast("Product added");
        return product;
      },
      updateProduct: (id, input) => {
        const current = get().findProduct(id);
        if (!current) return null;
        const next: Partial<Product> = {};
        if (input.name != null) next.name = String(input.name).trim() || current.name;
        if (input.brand != null) next.brand = String(input.brand).trim() || current.brand;
        if (input.cat != null) {
          next.cat = String(input.cat).trim();
          next.catName = (input.catName || input.cat).trim();
        } else if (input.catName != null) {
          next.catName = String(input.catName).trim();
        }
        if (input.price != null) next.price = Math.max(0, Number(input.price) || 0);
        if (input.old != null) next.old = Math.max(0, Number(input.old) || 0);
        if (input.off != null) next.off = Math.max(0, Math.min(99, Math.floor(Number(input.off) || 0)));
        if (input.tone != null) next.tone = String(input.tone);
        if (input.rx != null) next.rx = Boolean(input.rx);
        if (input.pack != null) next.pack = String(input.pack).trim();
        if (input.desc != null) next.desc = String(input.desc).trim();
        if (input.ingredients != null) next.ingredients = String(input.ingredients).trim();
        if (input.directions != null) next.directions = String(input.directions).trim();
        if (input.images != null || input.image != null) {
          const images = normalizeImages(input.images ?? current.images, input.image ?? current.image);
          next.images = images.length ? images : undefined;
          next.image = images[0];
        }
        if (input.slug != null) {
          let slug = slugify(input.slug);
          const clash = get().listProducts().some((p) => p.slug === slug && p.id !== id);
          if (clash) slug = slug + "-" + Date.now().toString(36).slice(-4);
          next.slug = slug;
        }
        if (input.stock != null) {
          get().setStock(id, Number(input.stock));
        }
        const isCustom = get().customProducts.some((p) => p.id === id);
        if (isCustom) {
          set((s) => ({
            customProducts: s.customProducts.map((p) => (p.id === id ? { ...p, ...next } : p)),
          }));
        } else {
          set((s) => ({
            productEdits: { ...s.productEdits, [id]: { ...(s.productEdits[id] || {}), ...next } },
          }));
        }
        get().showToast("Product updated");
        return get().findProduct(id) || null;
      },
      removeProduct: (id) => {
        set((s) => {
          const isCustom = s.customProducts.some((p) => p.id === id);
          const customProducts = isCustom ? s.customProducts.filter((p) => p.id !== id) : s.customProducts;
          const deletedProductIds = isCustom
            ? s.deletedProductIds
            : s.deletedProductIds.includes(id)
              ? s.deletedProductIds
              : [...s.deletedProductIds, id];
          const cart = { ...s.cart };
          delete cart[id];
          const wish = s.wish.filter((x) => x !== id);
          const stock = { ...s.stock };
          delete stock[id];
          const productEdits = { ...s.productEdits };
          delete productEdits[id];
          return { customProducts, deletedProductIds, cart, wish, stock, productEdits };
        });
        get().showToast("Product removed");
      },
      applyCatalogOverrides: (rows) => {
        // Always rebuild from DB rows. Empty array = clear everything.
        const customProducts: Product[] = [];
        const productEdits: Record<string, Partial<Product>> = {};
        const deletedProductIds: string[] = [];
        const stock: Record<string, number> = {};

        for (const row of rows || []) {
          if (row.isDeleted) {
            deletedProductIds.push(row.id);
            continue;
          }
          if (row.isCustom) {
            const p = row.data as Product;
            if (p && typeof p === "object" && p.name) {
              customProducts.push({ ...p, id: row.id });
            }
          } else if (row.data && typeof row.data === "object") {
            // Only keep edits for products that still exist in seed PRODUCTS
            if (PRODUCTS.some((p) => p.id === row.id)) {
              productEdits[row.id] = { ...row.data, id: row.id };
            }
          }
          if (row.stock != null) stock[row.id] = Math.max(0, Number(row.stock) || 0);
        }

        set({ customProducts, productEdits, deletedProductIds, stock });
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
        } else {
          cart[id] = current + add;
        }
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
          const user: ClcUser = { email: found.email, name: found.name, role: found.role };
          set({ user });
          return { ok: true, user };
        }
        if (emailNorm && password && password.length >= 4) {
          const raw = emailNorm.split("@")[0].replace(/[._]/g, " ");
          const name = raw.replace(/\b\w/g, (c) => c.toUpperCase());
          const user: ClcUser = { email: emailNorm, name, role: "customer" };
          set({ user });
          return { ok: true, user };
        }
        return { ok: false, error: "Invalid email or password" };
      },
      register: (name, email, password) => {
        const emailNorm = (email || "").trim().toLowerCase();
        if (!name || !emailNorm || !password || password.length < 4) {
          return { ok: false, error: "Please fill all fields (password min 4 chars)" };
        }
        if (DEMO_USERS.some((u) => u.email === emailNorm)) {
          return { ok: false, error: "That email is reserved — try logging in" };
        }
        const user: ClcUser = { email: emailNorm, name: name.trim(), role: "customer" };
        set({ user });
        return { ok: true, user };
      },
      logout: () => set({ user: null }),
      placeOrder: (payload) => {
        const items = payload.items || [];
        items.forEach((item) => get().adjustStock(item.id, -(item.qty || 0)));
        const order: Order = {
          id: uid(),
          createdAt: new Date().toISOString(),
          status: payload.status || (payload.method === "upi" ? "payment_pending" : "confirmed"),
          method: payload.method,
          total: payload.total,
          subtotal: payload.subtotal,
          shipping: payload.shipping,
          items,
          customer: payload.customer,
        };
        set((s) => ({ orders: [order, ...s.orders], cart: {} }));
        return order;
      },
      setOrderStatus: (id, status) => {
        set((s) => {
          const orders = s.orders.map((o) => {
            if (o.id !== id) return o;
            if (status === "cancelled" && o.status !== "cancelled") {
              o.items.forEach((item) => get().adjustStock(item.id, item.qty || 0));
            }
            return { ...o, status };
          });
          return { orders };
        });
      },
      addPrescription: (fileName, sizeKb) => {
        const rx: Prescription = {
          id: uid(),
          fileName,
          sizeKb,
          createdAt: new Date().toISOString(),
          status: "pending",
          customerName: get().user?.name || "Guest",
        };
        set((s) => ({ prescriptions: [rx, ...s.prescriptions] }));
        get().showToast("Prescription submitted");
        return rx;
      },
      setPrescriptionStatus: (id, status) => {
        set((s) => ({
          prescriptions: s.prescriptions.map((p) => (p.id === id ? { ...p, status } : p)),
        }));
      },
    }),
    {
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
        prescriptions: s.prescriptions,
      }),
      // Version 4: force-clear any leftover seed/custom catalog from older builds.
      version: 4,
      migrate: () => ({
        cart: {},
        wish: [],
        orders: [],
        user: null,
        stock: {},
        customProducts: [],
        productEdits: {},
        deletedProductIds: [],
        prescriptions: [],
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<ClcState>;
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
          prescriptions: Array.isArray(p.prescriptions) ? p.prescriptions : [],
        };
      },
      onRehydrateStorage: () => () => {
        useClc.getState().setHydrated();
      },
    },
  ),
);

export function cartCount(cart: Record<string, number>) {
  return Object.values(cart).reduce((s, q) => s + q, 0);
}

export function cartItems(cart: Record<string, number>, getStock: (id: string) => number) {
  const products = useClc.getState().listProducts();
  return Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find((x) => x.id === id);
      if (!p) return null;
      return { ...p, qty, stock: getStock(id), lineTotal: p.price * qty };
    })
    .filter(Boolean) as Array<Product & { qty: number; stock: number; lineTotal: number }>;
}

export function cartTotals(items: { lineTotal: number }[]) {
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  const shipping = shippingFor(subtotal);
  return { subtotal, shipping, total: subtotal + shipping };
}

export function liveProduct(slugOrId: string, getStock: (id: string) => number) {
  const p = useClc.getState().findProduct(slugOrId);
  if (!p) return null;
  return { ...p, stock: getStock(p.id) };
}
