create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  email text,
  preferred_contact_method text not null,
  delivery_method text not null,
  address text,
  preferred_date date,
  notes text,
  total_amount numeric not null,
  status text not null default 'new',
  created_at timestamp with time zone not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null,
  product_name text not null,
  quantity integer not null,
  unit_price numeric not null,
  line_total numeric not null
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists order_items_order_id_idx on public.order_items (order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- No public client policies are added intentionally.
-- Orders are inserted by the Next.js API route with SUPABASE_SERVICE_ROLE_KEY.
