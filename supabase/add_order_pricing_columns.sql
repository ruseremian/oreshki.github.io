alter table public.orders
add column if not exists subtotal_amount numeric default 0,
add column if not exists delivery_fee numeric default 0;

update public.orders
set subtotal_amount = total_amount
where subtotal_amount = 0
  and total_amount is not null;
