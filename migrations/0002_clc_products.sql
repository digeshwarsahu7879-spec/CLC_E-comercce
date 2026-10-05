create table if not exists clc_products (
  id text primary key,
  is_custom boolean not null default false,
  is_deleted boolean not null default false,
  data jsonb not null default '{}'::jsonb,
  stock integer,
  updated_at timestamptz not null default now()
);

create index if not exists clc_products_updated_at_idx on clc_products (updated_at);
