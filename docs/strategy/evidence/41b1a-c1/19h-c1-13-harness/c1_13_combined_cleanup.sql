-- C1.13 combined-state cleanup (after the empty POST-vs-PRE diff is proven): drop the two scratch dependency tables only.
\pset footer off
\echo === combined-state cleanup start
BEGIN;
SET LOCAL lock_timeout = '5s';
drop table public.c1_scratch_episode_dep;
drop table public.c1_scratch_baby_dep;
COMMIT;
select (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1\_scratch%') as scratch_objects,
 (select count(*) from pg_constraint where conname in ('c1_scratch_episode_dep_fk','c1_scratch_baby_dep_fk')) as scratch_fks,
 (select count(*) from public.pregnancy_episodes) as episode_rows,
 (select count(*) from public.journeys where current_pregnancy_episode_id is not null) as pointers,
 (select count(*) from public.reflections where pregnancy_episode_id is not null) as bound_reflections;
\echo === combined-state cleanup end
