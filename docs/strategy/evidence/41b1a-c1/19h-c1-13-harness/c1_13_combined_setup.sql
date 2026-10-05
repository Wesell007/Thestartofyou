-- C1.13 combined-state setup (committed): all five rollback guards true at once. As postgres. Synthetic fixture only.
\pset footer off
\echo === combined-state setup start
select now() as started_at, current_user;
BEGIN;
SET LOCAL lock_timeout = '5s';
-- guard 2: scratch later-phase FK referencing pregnancy_episodes(id, user_id) (section K: c1_scratch_episode_dep)
create table public.c1_scratch_episode_dep (
  episode_id uuid,
  user_id uuid,
  constraint c1_scratch_episode_dep_fk foreign key (episode_id, user_id) references public.pregnancy_episodes (id, user_id)
);
-- guard 5: scratch dependant of babies_id_user_id_key (section K: c1_scratch_baby_dep)
create table public.c1_scratch_baby_dep (
  baby_id uuid,
  user_id uuid,
  constraint c1_scratch_baby_dep_fk foreign key (baby_id, user_id) references public.babies (id, user_id)
);
-- guard 3: synthetic journey pointer populated with its same-owner episode (A -> E-A1)
update public.journeys set current_pregnancy_episode_id = '00000000-0000-4c10-8000-00000000ea01' where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69';
-- guard 4: existing synthetic owned row bound to its same-owner episode (reflections a101 of A -> E-A1)
update public.reflections set pregnancy_episode_id = '00000000-0000-4c10-8000-00000000ea01' where id = '00000000-0000-4c10-8000-00000000a101';
COMMIT;
\echo === combined-state read-back (autocommit)
select conname, conrelid::regclass as tbl, confrelid::regclass as refs, pg_get_constraintdef(oid) as def from pg_constraint where conname in ('c1_scratch_episode_dep_fk','c1_scratch_baby_dep_fk') order by conname;
select user_id, lifecycle, current_pregnancy_episode_id from public.journeys where user_id = 'b09cd318-8f3e-4853-8d97-fc10267b3d69';
select id, user_id, week, pregnancy_episode_id from public.reflections where id = '00000000-0000-4c10-8000-00000000a101';
select (select count(*) from public.c1_scratch_episode_dep) as scratch_episode_dep_rows, (select count(*) from public.c1_scratch_baby_dep) as scratch_baby_dep_rows;
\echo === combined-state setup end
