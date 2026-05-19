alter table public.orders
add column if not exists language text default 'fr';

alter table public.orders
alter column language set default 'fr';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'orders_language_check'
      and conrelid = 'public.orders'::regclass
  ) then
    alter table public.orders
    add constraint orders_language_check
    check (language in ('fr', 'ru'));
  end if;
end $$;
