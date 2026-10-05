export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  cat: string;
  catName: string;
  price: number;
  old: number;
  off: number;
  stock: number;
  tone: string;
  rx: boolean;
  pack: string;
  desc: string;
  ingredients: string;
  directions: string;
  /** Optional product image URL (https or data URL). When set, shown instead of the pack placeholder. */
  image?: string;
};

export type Category = {
  slug: string;
  name: string;
  desc: string;
  image: string;
};

export const CATEGORIES: Category[] = [
  { slug: "medicines", name: "Medicines", desc: "Fever, pain & digestion", image: "/images/cat-medicines.jpg" },
  { slug: "healthcare", name: "Healthcare", desc: "Home recovery care", image: "/images/cat-healthcare.jpg" },
  { slug: "personal-care", name: "Personal Care", desc: "Daily hygiene", image: "/images/cat-personal.jpg" },
  { slug: "baby-care", name: "Baby Care", desc: "Gentle baby essentials", image: "/images/cat-baby.jpg" },
  { slug: "ayurveda", name: "Ayurveda", desc: "Herbal wellness", image: "/images/cat-ayurveda.jpg" },
  { slug: "vitamins", name: "Vitamins", desc: "Daily nutrition", image: "/images/cat-vitamins.jpg" },
  { slug: "surgical", name: "Surgical", desc: "Dressings & kits", image: "/images/cat-surgical.jpg" },
  { slug: "health-devices", name: "Devices", desc: "Home monitoring", image: "/images/cat-devices.jpg" },
];

/** Public seed catalog shown on the storefront. Admins can still add, edit, or hide items. */
function item(
  id: string,
  slug: string,
  name: string,
  brand: string,
  cat: string,
  price: number,
  extra: Partial<Product> = {},
): Product {
  const catName = CATEGORIES.find((c) => c.slug === cat)?.name || cat;
  const old = extra.old ?? Math.round(price * 1.28);
  const off = extra.off ?? Math.max(0, Math.round((1 - price / old) * 100));
  return {
    id,
    slug,
    name,
    brand,
    cat,
    catName,
    price,
    old,
    off,
    stock: extra.stock ?? 48,
    tone: extra.tone || "tone-moss",
    rx: extra.rx ?? false,
    pack: extra.pack || "Strip of 10",
    desc: extra.desc || name,
    ingredients: extra.ingredients || "",
    directions: extra.directions || "Use as directed on the pack, or ask your pharmacist.",
    image: extra.image,
  };
}

/** Seed catalog is empty — add products from the admin panel. */
export const PRODUCTS: Product[] = [];

/** Admin login only (not shown on the login page). */
export const DEMO_USERS = [
  { email: "admin@clc.com", password: "admin123", name: "CLC Administrator", role: "admin" as const },
];

export const UPI_ID = "7879522683@ybl";
export const SUPPORT_PHONE = "+91 78795 22683";
export const SUPPORT_EMAIL = "support@curelifecare.in";
export const FREE_SHIP_MIN = 499;
export const SHIPPING_FEE = 40;

export function formatINR(n: number) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

export function slugify(text: string) {
  return String(text || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "product";
}

export function getProduct(slugOrId: string, list: Product[] = PRODUCTS) {
  return list.find((p) => p.slug === slugOrId || p.id === slugOrId);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function uid() {
  return "CLC-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
}

export function productId() {
  return "p_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export type OrderStatus = "payment_pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export function statusLabel(s: string) {
  const map: Record<string, string> = {
    payment_pending: "Payment in process",
    confirmed: "Confirmed",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return map[s] || s;
}

export function statusClass(s: string) {
  if (s === "delivered") return "status-ok";
  if (s === "cancelled") return "status-bad";
  if (s === "payment_pending") return "status-warn";
  return "status-info";
}

export function shippingFor(subtotal: number) {
  return subtotal >= FREE_SHIP_MIN ? 0 : SHIPPING_FEE;
}

export function catNameFromSlug(slug: string) {
  return getCategory(slug)?.name || slug;
}

export function productSharePath(slug: string) {
  return `/product/${slug}`;
}

export function productShareUrl(slug: string) {
  const path = productSharePath(slug);
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}
