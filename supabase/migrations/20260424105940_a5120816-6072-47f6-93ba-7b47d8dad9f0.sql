-- journeys: active lifecycle pointer
create table public.journeys (
  user_id uuid primary key references auth.users(id) on delete cascade,
  lifecycle text not null check (lifecycle in ('ttc','ivf','pregnancy','postpartum','first_year')),
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.journeys enable row level security;
create policy "Users view own journey pointer" on public.journeys for select using (auth.uid() = user_id);
create policy "Users insert own journey pointer" on public.journeys for insert with check (auth.uid() = user_id);
create policy "Users update own journey pointer" on public.journeys for update using (auth.uid() = user_id);
create policy "Users delete own journey pointer" on public.journeys for delete using (auth.uid() = user_id);
create trigger journeys_set_updated_at before update on public.journeys
  for each row execute function public.set_updated_at();

-- pregnancy_journeys: typed pregnancy payload
create table public.pregnancy_journeys (
  user_id uuid primary key references auth.users(id) on delete cascade,
  lmp_date date not null,
  due_date date not null,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.pregnancy_journeys enable row level security;
create policy "Users view own pregnancy journey" on public.pregnancy_journeys for select using (auth.uid() = user_id);
create policy "Users insert own pregnancy journey" on public.pregnancy_journeys for insert with check (auth.uid() = user_id);
create policy "Users update own pregnancy journey" on public.pregnancy_journeys for update using (auth.uid() = user_id);
create policy "Users delete own pregnancy journey" on public.pregnancy_journeys for delete using (auth.uid() = user_id);
create trigger pregnancy_journeys_set_updated_at before update on public.pregnancy_journeys
  for each row execute function public.set_updated_at();

-- archived_journeys: storage-only history, never read by live UI in v1
create table public.archived_journeys (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lifecycle text not null,
  started_at timestamptz not null,
  ended_at timestamptz not null default now(),
  ended_reason text not null check (ended_reason in ('transitioned','completed','user_ended')),
  snapshot jsonb not null
);
alter table public.archived_journeys enable row level security;
create policy "Users view own archived journeys" on public.archived_journeys for select using (auth.uid() = user_id);
create policy "Users insert own archived journeys" on public.archived_journeys for insert with check (auth.uid() = user_id);
create index archived_journeys_user_idx on public.archived_journeys (user_id, ended_at desc);

-- Backfill from legacy saved_journeys (pregnancy only)
insert into public.pregnancy_journeys (user_id, lmp_date, due_date, started_at, updated_at)
select user_id, lmp_date, due_date, created_at, updated_at
from public.saved_journeys
where journey_type = 'pregnancy'
on conflict (user_id) do nothing;

insert into public.journeys (user_id, lifecycle, started_at, updated_at)
select user_id, 'pregnancy', created_at, updated_at
from public.saved_journeys
where journey_type = 'pregnancy'
on conflict (user_id) do nothing;