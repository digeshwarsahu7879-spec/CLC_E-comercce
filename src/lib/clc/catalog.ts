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

export const PRODUCTS: Product[] = [
  item("p_para650", "paracetamol-650", "Paracetamol 650 mg", "CLC Care", "medicines", 32, {
    tone: "tone-moss",
    pack: "Strip of 15 tablets",
    desc: "For fever and mild to moderate pain. Fast, gentle relief for everyday use.",
    ingredients: "Paracetamol 650 mg",
    directions: "Adults: 1 tablet every 6–8 hours if needed. Do not exceed 4 tablets in 24 hours.",
  }),
  item("p_ibupro", "ibuprofen-400", "Ibuprofen 400 mg", "CLC Care", "medicines", 48, {
    tone: "tone-teal",
    pack: "Strip of 10 tablets",
    desc: "Anti-inflammatory relief for headaches, body ache and period pain.",
    ingredients: "Ibuprofen 400 mg",
  }),
  item("p_ceti", "cetirizine-10", "Cetirizine 10 mg", "CLC Allergy", "medicines", 22, {
    tone: "tone-sage",
    pack: "Strip of 10 tablets",
    desc: "Once-daily tablet for sneezing, runny nose and itchy eyes.",
    ingredients: "Cetirizine hydrochloride 10 mg",
  }),
  item("p_ors", "ors-orange", "ORS Orange Sachets", "CLC Hydrate", "medicines", 18, {
    old: 24,
    tone: "tone-brown",
    pack: "Box of 10 sachets",
    desc: "WHO-formula oral rehydration salts for dehydration from heat or stomach upset.",
    ingredients: "Sodium, potassium, chloride, citrate, glucose",
  }),
  item("p_antacid", "antacid-gel", "Antacid Gel Mint", "CLC Digest", "medicines", 95, {
    tone: "tone-teal",
    pack: "170 ml bottle",
    desc: "Soothing mint gel for acidity, heartburn and gas.",
    ingredients: "Aluminium hydroxide, magnesium hydroxide, simethicone",
  }),
  item("p_cough", "cough-relief-syrup", "Cough Relief Syrup", "CLC Relief", "medicines", 78, {
    tone: "tone-moss",
    pack: "100 ml bottle",
    desc: "Honey-soothing syrup for dry and chesty cough.",
    ingredients: "Dextromethorphan, guaifenesin, flavoured base",
  }),
  item("p_thermo", "digital-thermometer", "Digital Thermometer", "CLC Devices", "healthcare", 149, {
    old: 199,
    tone: "tone-slate",
    pack: "1 unit",
    desc: "Quick-read oral thermometer with a clear display for home use.",
  }),
  item("p_hotbag", "hot-water-bag", "Hot Water Bag", "CLC Comfort", "healthcare", 189, {
    tone: "tone-brown",
    pack: "2 litre",
    desc: "Rubber hot-water bag for muscle stiffness and winter warmth.",
  }),
  item("p_steam", "steam-vaporizer", "Steam Vaporizer", "CLC Comfort", "healthcare", 449, {
    old: 599,
    tone: "tone-teal",
    pack: "1 unit",
    desc: "Electric steam vaporizer for blocked nose and dry rooms.",
  }),
  item("p_cotton", "sterile-cotton-100g", "Sterile Cotton Roll", "CLC Clinic", "healthcare", 55, {
    tone: "tone-sage",
    pack: "100 g",
    desc: "Soft sterile cotton for first aid and baby care.",
  }),
  item("p_sani", "hand-sanitizer-500", "Hand Sanitizer 500 ml", "CLC Clean", "personal-care", 129, {
    old: 159,
    tone: "tone-teal",
    pack: "500 ml pump",
    desc: "70% alcohol sanitizer that dries quickly without a sticky feel.",
  }),
  item("p_moist", "daily-moisturiser", "Daily Moisturising Cream", "CLC Skin", "personal-care", 165, {
    tone: "tone-sage",
    pack: "100 g jar",
    desc: "Light, non-greasy cream for dry hands and everyday skin care.",
  }),
  item("p_antiseptic", "antiseptic-liquid", "Antiseptic Liquid", "CLC Clean", "personal-care", 89, {
    tone: "tone-moss",
    pack: "100 ml",
    desc: "Dilute for cuts, grazes and household first aid.",
  }),
  item("p_babylotion", "baby-lotion", "Gentle Baby Lotion", "CLC Baby", "baby-care", 175, {
    tone: "tone-sage",
    pack: "200 ml",
    desc: "Mild, fragrance-light lotion for delicate baby skin.",
  }),
  item("p_babysoap", "baby-soap", "Baby Cleansing Bar", "CLC Baby", "baby-care", 65, {
    tone: "tone-brown",
    pack: "75 g",
    desc: "Soap-free bar that rinses clean and does not sting the eyes.",
  }),
  item("p_triphala", "triphala-tablets", "Triphala Tablets", "CLC Ayurveda", "ayurveda", 135, {
    tone: "tone-brown",
    pack: "Bottle of 60",
    desc: "Classic herbal blend used to support daily digestion.",
    ingredients: "Amalaki, bibhitaki, haritaki",
  }),
  item("p_tulsi", "tulsi-drops", "Tulsi Drops", "CLC Ayurveda", "ayurveda", 99, {
    tone: "tone-moss",
    pack: "30 ml",
    desc: "Holy basil extract drops to mix in warm water or tea.",
    ingredients: "Ocimum sanctum extract",
  }),
  item("p_vitc", "vitamin-c-500", "Vitamin C 500 mg", "CLC Nutri", "vitamins", 149, {
    old: 199,
    tone: "tone-moss",
    pack: "Bottle of 60",
    desc: "Daily vitamin C to support immunity and skin health.",
    ingredients: "Ascorbic acid 500 mg",
  }),
  item("p_multi", "daily-multivitamin", "Daily Multivitamin", "CLC Nutri", "vitamins", 249, {
    tone: "tone-teal",
    pack: "Bottle of 30",
    desc: "Once-a-day vitamins and minerals for busy routines.",
  }),
  item("p_cal", "calcium-d3", "Calcium + Vitamin D3", "CLC Nutri", "vitamins", 189, {
    tone: "tone-slate",
    pack: "Strip of 15",
    desc: "Bone-support tablets with calcium and vitamin D3.",
  }),
  item("p_band", "waterproof-bandages", "Waterproof Bandages", "CLC Clinic", "surgical", 45, {
    tone: "tone-sage",
    pack: "Pack of 20",
    desc: "Stay-on strips for cuts and kitchen nicks.",
    image: "/images/waterproof-bandage.svg",
  }),
  item("p_firstaid", "first-aid-kit", "Home First Aid Kit", "CLC Clinic", "surgical", 399, {
    old: 499,
    tone: "tone-moss",
    pack: "1 kit",
    desc: "Bandages, antiseptic, gauze and tape for the home cupboard.",
  }),
  item("p_gauze", "gauze-pads", "Sterile Gauze Pads", "CLC Clinic", "surgical", 72, {
    tone: "tone-slate",
    pack: "Pack of 10",
    desc: "Individually wrapped pads for dressing small wounds.",
  }),
  item("p_bp", "bp-monitor", "Blood Pressure Monitor", "CLC Devices", "health-devices", 1299, {
    old: 1599,
    tone: "tone-slate",
    pack: "1 unit",
    desc: "Upper-arm BP monitor with a large display for home checks.",
  }),
  item("p_oxi", "pulse-oximeter", "Pulse Oximeter", "CLC Devices", "health-devices", 799, {
    old: 999,
    tone: "tone-teal",
    pack: "1 unit",
    desc: "Fingertip meter for pulse and oxygen saturation.",
  }),
];

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
