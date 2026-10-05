import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { PRODUCTS, slugify, productId, normalizeImages, type Product } from "./catalog";
import type { ProductInput } from "./store";

type DbProductRow = {
  id: string;
  is_custom: boolean;
  is_deleted: boolean;
  data: Record<string, unknown>;
  stock: number | null;
};

export type CatalogOverride = {
  id: string;
  isCustom: boolean;
  isDeleted: boolean;
  data: Partial<Product>;
  stock: number | null;
};

function rowToOverride(row: DbProductRow): CatalogOverride {
  return {
    id: row.id,
    isCustom: Boolean(row.is_custom),
    isDeleted: Boolean(row.is_deleted),
    data: row.data && typeof row.data === "object" ? row.data : {},
    stock: row.stock == null ? null : Math.max(0, Number(row.stock) || 0),
  };
}

function normalizeInput(input: ProductInput): Product {
  const name = String(input.name || "Untitled product").trim();
  const brand = String(input.brand || "CLC").trim() || "CLC";
  const cat = String(input.cat || "medicines").trim() || "medicines";
  const price = Math.max(0, Number(input.price) || 0);
  const old = Math.max(price, Number(input.old) || price);
  const off = input.off != null
    ? Math.max(0, Math.min(99, Math.floor(Number(input.off) || 0)))
    : old > price ? Math.round(((old - price) / old) * 100) : 0;
  const stock = Math.max(0, Math.floor(Number(input.stock ?? 0) || 0));
  const images = normalizeImages(input.images, input.image);
  return {
    id: String(input.id || "").trim() || productId(),
    slug: slugify(input.slug || name),
    name,
    brand,
    cat,
    catName: String(input.catName || cat).trim(),
    price,
    old,
    off,
    stock,
    tone: String(input.tone || ""),
    rx: Boolean(input.rx),
    pack: String(input.pack || "1 unit").trim(),
    desc: String(input.desc || "").trim(),
    ingredients: String(input.ingredients || "").trim(),
    directions: String(input.directions || "").trim(),
    image: images[0],
    images: images.length ? images : undefined,
  };
}

export const getCatalogOverrides = createServerFn({ method: "GET" }).handler(
  async (): Promise<CatalogOverride[]> => {
    const sql = await getSql();
    const rows = await sql<DbProductRow>`
      select id, is_custom, is_deleted, data, stock
      from clc_products
      order by updated_at asc
    `;
    return rows.map(rowToOverride);
  },
);

export const createCatalogProduct = createServerFn({ method: "POST" })
  .validator((input: ProductInput) => input)
  .handler(async ({ data }): Promise<Product> => {
    const sql = await getSql();
    const product = normalizeInput(data);
    const rows = await sql<{ id: string }>`select id from clc_products where data->>'slug' = ${product.slug} limit 1`;
    if (PRODUCTS.some((p) => p.slug === product.slug) || rows.length) {
      product.slug = `${product.slug}-${Date.now().toString(36).slice(-4)}`;
    }
    await sql`
      insert into clc_products (id, is_custom, is_deleted, data, stock, updated_at)
      values (${product.id}, true, false, ${JSON.stringify(product)}::jsonb, ${product.stock}, now())
    `;
    return product;
  });

export const updateCatalogProduct = createServerFn({ method: "POST" })
  .validator((input: { id: string; input: Partial<ProductInput> }) => input)
  .handler(async ({ data }): Promise<CatalogOverride | null> => {
    const sql = await getSql();
    const current = await sql<DbProductRow>`select id, is_custom, is_deleted, data, stock from clc_products where id = ${data.id}`;
    if (!current.length) {
      const stock = data.input.stock == null ? null : Math.max(0, Math.floor(Number(data.input.stock) || 0));
      const images = normalizeImages(data.input.images, data.input.image);
      const payload = { ...data.input, images: images.length ? images : undefined, image: images[0] };
      await sql`
        insert into clc_products (id, is_custom, is_deleted, data, stock, updated_at)
        values (${data.id}, false, false, ${JSON.stringify(payload)}::jsonb, ${stock}, now())
      `;
      return { id: data.id, isCustom: false, isDeleted: false, data: payload, stock };
    }
    const row = current[0];
    const nextData: Record<string, unknown> = { ...(row.data || {}), ...data.input };
    if (data.input.images != null || data.input.image != null) {
      const images = normalizeImages(
        data.input.images ?? (Array.isArray((row.data as Product)?.images) ? (row.data as Product).images : undefined),
        data.input.image ?? (row.data as Product)?.image,
      );
      nextData.images = images.length ? images : undefined;
      nextData.image = images[0];
    }
    if (data.input.slug != null) {
      let nextSlug = slugify(String(data.input.slug));
      const seedClash = PRODUCTS.some((p) => p.slug === nextSlug && p.id !== data.id);
      const rows = await sql<{ id: string }>`select id from clc_products where data->>'slug' = ${nextSlug} and id <> ${data.id} limit 1`;
      if (seedClash || rows.length) nextSlug = `${nextSlug}-${Date.now().toString(36).slice(-4)}`;
      nextData.slug = nextSlug;
    }
    const stock = data.input.stock == null ? row.stock : Math.max(0, Math.floor(Number(data.input.stock) || 0));
    delete nextData.stock;
    await sql`
      update clc_products
      set data = ${JSON.stringify(nextData)}::jsonb,
          stock = ${stock},
          is_deleted = false,
          updated_at = now()
      where id = ${data.id}
    `;
    return { id: data.id, isCustom: Boolean(row.is_custom), isDeleted: false, data: nextData, stock };
  });

export const removeCatalogProduct = createServerFn({ method: "POST" })
  .validator((input: { id: string }) => input)
  .handler(async ({ data }): Promise<void> => {
    const sql = await getSql();
    await sql`
      insert into clc_products (id, is_custom, is_deleted, data, stock, updated_at)
      values (${data.id}, true, true, '{}'::jsonb, null, now())
      on conflict (id) do update set is_deleted = true, updated_at = now()
    `;
  });

export const removeAllCatalogProducts = createServerFn({ method: "POST" }).handler(async (): Promise<void> => {
  const sql = await getSql();
  for (const product of PRODUCTS) {
    await sql`
      insert into clc_products (id, is_custom, is_deleted, data, stock, updated_at)
      values (${product.id}, false, true, ${JSON.stringify(product)}::jsonb, null, now())
      on conflict (id) do update
      set is_deleted = true, updated_at = now()
    `;
  }
  await sql`
    update clc_products
    set is_deleted = true, updated_at = now()
    where is_custom = true
  `;
});

export const resetCatalogStock = createServerFn({ method: "POST" }).handler(async (): Promise<void> => {
  const sql = await getSql();
  await sql`update clc_products set stock = null, updated_at = now()`;
});
