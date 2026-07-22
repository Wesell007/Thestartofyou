create table public.hospital_bag_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('parent','baby','partner','documents','comfort')),
  item_key text not null,
  label text not null,
  is_custom boolean not null default false,
  packed_at timestamptz,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, category, item_key)
);

grant select, insert, update, delete on public.hospital_bag_items to authenticated;
grant all on public.hospital_bag_items to service_role;

alter table public.hospital_bag_items enable row level security;

create policy "own rows select" on public.hospital_bag_items
  for select to authenticated using (auth.uid() = user_id);
create policy "own rows insert" on public.hospital_bag_items
  for insert to authenticated with check (auth.uid() = user_id);
create policy "own rows update" on public.hospital_bag_items
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows delete" on public.hospital_bag_items
  for delete to authenticated using (auth.uid() = user_id);

create index hospital_bag_items_user_category_idx
  on public.hospital_bag_items (user_id, category);

create trigger hospital_bag_items_set_updated_at
  before update on public.hospital_bag_items
  for each row execute function public.set_updated_at();