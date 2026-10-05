import { f as slugify, r as PRODUCTS, u as productId } from "./catalog-BCIZUmOj.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products-Br6G6CB6.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_clc_products_default = "create table if not exists clc_products (\n  id text primary key,\n  is_custom boolean not null default false,\n  is_deleted boolean not null default false,\n  data jsonb not null default '{}'::jsonb,\n  stock integer,\n  updated_at timestamptz not null default now()\n);\n\ncreate index if not exists clc_products_updated_at_idx on clc_products (updated_at);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_clc_products.sql": _0002_clc_products_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
function rowToOverride(row) {
	return {
		id: row.id,
		isCustom: Boolean(row.is_custom),
		isDeleted: Boolean(row.is_deleted),
		data: row.data && typeof row.data === "object" ? row.data : {},
		stock: row.stock == null ? null : Math.max(0, Number(row.stock) || 0)
	};
}
function normalizeInput(input) {
	const name = String(input.name || "Untitled product").trim();
	const brand = String(input.brand || "CLC").trim() || "CLC";
	const cat = String(input.cat || "medicines").trim() || "medicines";
	const price = Math.max(0, Number(input.price) || 0);
	const old = Math.max(price, Number(input.old) || price);
	const off = input.off != null ? Math.max(0, Math.min(99, Math.floor(Number(input.off) || 0))) : old > price ? Math.round((old - price) / old * 100) : 0;
	const stock = Math.max(0, Math.floor(Number(input.stock ?? 0) || 0));
	return {
		id: productId(),
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
		image: String(input.image || "").trim() || void 0
	};
}
var getCatalogOverrides_createServerFn_handler = createServerRpc({
	id: "06db4b8e7bad5834d6b9780b9f7bb4fd810574d9d547f727f04675327d753126",
	name: "getCatalogOverrides",
	filename: "src/lib/clc/products.ts"
}, (opts) => getCatalogOverrides.__executeServer(opts));
var getCatalogOverrides = createServerFn({ method: "GET" }).handler(getCatalogOverrides_createServerFn_handler, async () => {
	return (await (await getSql())`
      select id, is_custom, is_deleted, data, stock
      from clc_products
      order by updated_at asc
    `).map(rowToOverride);
});
var createCatalogProduct_createServerFn_handler = createServerRpc({
	id: "90de6bbb1b9e09790814dcfa7c4b0dfc7fecc0782ea3632222868587c27e0069",
	name: "createCatalogProduct",
	filename: "src/lib/clc/products.ts"
}, (opts) => createCatalogProduct.__executeServer(opts));
var createCatalogProduct = createServerFn({ method: "POST" }).validator((input) => input).handler(createCatalogProduct_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const product = normalizeInput(data);
	const rows = await sql`select id from clc_products where data->>'slug' = ${product.slug} limit 1`;
	if (PRODUCTS.some((p) => p.slug === product.slug) || rows.length) product.slug = `${product.slug}-${Date.now().toString(36).slice(-4)}`;
	await sql`
      insert into clc_products (id, is_custom, is_deleted, data, stock, updated_at)
      values (${product.id}, true, false, ${JSON.stringify(product)}::jsonb, ${product.stock}, now())
    `;
	return product;
});
var updateCatalogProduct_createServerFn_handler = createServerRpc({
	id: "f7bf19a994a47c85145b50b1fea6893c09c8cc7d7043ba068f07c34cef5bcd8d",
	name: "updateCatalogProduct",
	filename: "src/lib/clc/products.ts"
}, (opts) => updateCatalogProduct.__executeServer(opts));
var updateCatalogProduct = createServerFn({ method: "POST" }).validator((input) => input).handler(updateCatalogProduct_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const current = await sql`select id, is_custom, is_deleted, data, stock from clc_products where id = ${data.id}`;
	if (!current.length) {
		const stock = data.input.stock == null ? null : Math.max(0, Math.floor(Number(data.input.stock) || 0));
		await sql`
        insert into clc_products (id, is_custom, is_deleted, data, stock, updated_at)
        values (${data.id}, false, false, ${JSON.stringify(data.input)}::jsonb, ${stock}, now())
      `;
		return {
			id: data.id,
			isCustom: false,
			isDeleted: false,
			data: data.input,
			stock
		};
	}
	const row = current[0];
	const nextData = {
		...row.data || {},
		...data.input
	};
	if (data.input.slug != null) {
		let nextSlug = slugify(String(data.input.slug));
		const seedClash = PRODUCTS.some((p) => p.slug === nextSlug && p.id !== data.id);
		const rows = await sql`select id from clc_products where data->>'slug' = ${nextSlug} and id <> ${data.id} limit 1`;
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
	return {
		id: data.id,
		isCustom: Boolean(row.is_custom),
		isDeleted: false,
		data: nextData,
		stock
	};
});
var removeCatalogProduct_createServerFn_handler = createServerRpc({
	id: "fb3e3e8109512e91760281e45e58b8c95334074ee7c887b4dcdcc780bbc10122",
	name: "removeCatalogProduct",
	filename: "src/lib/clc/products.ts"
}, (opts) => removeCatalogProduct.__executeServer(opts));
var removeCatalogProduct = createServerFn({ method: "POST" }).validator((input) => input).handler(removeCatalogProduct_createServerFn_handler, async ({ data }) => {
	await (await getSql())`
      insert into clc_products (id, is_custom, is_deleted, data, stock, updated_at)
      values (${data.id}, true, true, '{}'::jsonb, null, now())
      on conflict (id) do update set is_deleted = true, updated_at = now()
    `;
});
var removeAllCatalogProducts_createServerFn_handler = createServerRpc({
	id: "baecc58bb6fc45138d8cf175be0270aab23bff1b2679bdbb0cdcc1694723d271",
	name: "removeAllCatalogProducts",
	filename: "src/lib/clc/products.ts"
}, (opts) => removeAllCatalogProducts.__executeServer(opts));
var removeAllCatalogProducts = createServerFn({ method: "POST" }).handler(removeAllCatalogProducts_createServerFn_handler, async () => {
	const sql = await getSql();
	for (const product of PRODUCTS) await sql`
      insert into clc_products (id, is_custom, is_deleted, data, stock, updated_at)
      values (${product.id}, false, true, ${JSON.stringify(product)}::jsonb, null, now())
      on conflict (id) do update
      set is_deleted = true, updated_at = now()
    `;
	await sql`
    update clc_products
    set is_deleted = true, updated_at = now()
    where is_custom = true
  `;
});
var resetCatalogStock_createServerFn_handler = createServerRpc({
	id: "723da17349294c6409ce023bb319fe3710f84c8cda81c8386153132c055b74ae",
	name: "resetCatalogStock",
	filename: "src/lib/clc/products.ts"
}, (opts) => resetCatalogStock.__executeServer(opts));
var resetCatalogStock = createServerFn({ method: "POST" }).handler(resetCatalogStock_createServerFn_handler, async () => {
	await (await getSql())`update clc_products set stock = null, updated_at = now()`;
});
//#endregion
export { createCatalogProduct_createServerFn_handler, getCatalogOverrides_createServerFn_handler, removeAllCatalogProducts_createServerFn_handler, removeCatalogProduct_createServerFn_handler, resetCatalogStock_createServerFn_handler, updateCatalogProduct_createServerFn_handler };
