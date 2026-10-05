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
  /** Primary product image (first of images, kept for compatibility). */
  image?: string;
  /** Up to MAX_PRODUCT_IMAGES photos (data URLs or https URLs). */
  images?: string[];
};

export type Category = {
  slug: string;
  name: string;
  desc: string;
  image: string;
};

/** Maximum photos an admin can attach to one product. */
export const MAX_PRODUCT_IMAGES = 5;

/** Max size per photo in bytes (1.5 MB) when uploading from gallery. */
export const MAX_IMAGE_BYTES = 1.5 * 1024 * 1024;

/** Resolve the main photo shown on cards and listings. */
export function primaryImage(p: { image?: string; images?: string[] } | null | undefined): string | undefined {
  if (!p) return undefined;
  if (p.images && p.images.length > 0) return p.images[0];
  return p.image || undefined;
}

/** Normalize a list of image strings to at most MAX_PRODUCT_IMAGES non-empty values. */
export function normalizeImages(list?: string[] | null, fallback?: string): string[] {
  const out: string[] = [];
  const push = (v: string | undefined) => {
    const s = String(v || "").trim();
    if (s && !out.includes(s) && out.length < MAX_PRODUCT_IMAGES) out.push(s);
  };
  if (Array.isArray(list)) list.forEach((x) => push(x));
  if (out.length === 0) push(fallback);
  return out;
}

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
