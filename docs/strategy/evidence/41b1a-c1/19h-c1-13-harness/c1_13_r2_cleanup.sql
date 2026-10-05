-- C1.13 R2 cleanup (after the empty POST-vs-PRE diff is proven): drop the scratch later-phase FK table.
\pset footer off
BEGIN;
SET LOCAL lock_timeout = '5s';
drop table public.c1_scratch_episode_dep;
COMMIT;
select (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1\_scratch%') as scratch_objects,
 (select count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass and conname not like '%_pregnancy_episode_owner_fkey') as later_phase_fks;
