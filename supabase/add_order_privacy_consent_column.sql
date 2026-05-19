alter table public.orders
  add column if not exists privacy_consent_at timestamp with time zone;
