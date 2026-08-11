-- MarketPIX database schema
-- Execute this file once in Supabase SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  description text not null default '',
  price numeric(12,2) not null check (price >= 0),
  promotional_price numeric(12,2) check (promotional_price is null or promotional_price >= 0),
  stock integer not null default 0 check (stock >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  public_url text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null default '',
  image_url text,
  link_url text,
  active boolean not null default true,
  position integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.store_settings (
  id boolean primary key default true check (id),
  store_name text not null default 'MarketPIX',
  whatsapp text not null default '',
  pix_key text not null default '',
  logo_url text,
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  total numeric(12,2) not null check (total >= 0),
  payment_method text not null default 'pix' check (payment_method = 'pix'),
  payment_status text not null default 'pending' check (payment_status in ('pending','paid','cancelled')),
  order_status text not null default 'pending' check (order_status in ('pending','processing','shipped','completed','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  subtotal numeric(12,2) generated always as (quantity * unit_price) stored
);

insert into public.categories (name, slug) values
  ('Roupas','roupas'),
  ('Acessórios','acessorios'),
  ('Calçados','calcados'),
  ('Casa','casa')
on conflict (slug) do nothing;

insert into public.store_settings (id, store_name)
values (true, 'MarketPIX')
on conflict (id) do nothing;

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.banners enable row level security;
alter table public.store_settings enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public storefront policies: visitors can read active catalog content.
drop policy if exists "public read active products" on public.products;
create policy "public read active products" on public.products for select using (active = true);

drop policy if exists "public read categories" on public.categories;
create policy "public read categories" on public.categories for select using (true);

drop policy if exists "public read product images" on public.product_images;
create policy "public read product images" on public.product_images for select using (true);

drop policy if exists "public read active banners" on public.banners;
create policy "public read active banners" on public.banners for select using (active = true);

drop policy if exists "public read store settings" on public.store_settings;
create policy "public read store settings" on public.store_settings for select using (true);

-- Orders are intentionally NOT publicly readable or writable through the anon client.
-- Checkout/order creation will be performed through a protected server route.

create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_active_idx on public.products(active);
create index if not exists product_images_product_id_idx on public.product_images(product_id);
create index if not exists banners_active_position_idx on public.banners(active, position);
create index if not exists orders_created_at_idx on public.orders(created_at desc);
create index if not exists order_items_order_id_idx on public.order_items(order_id);
