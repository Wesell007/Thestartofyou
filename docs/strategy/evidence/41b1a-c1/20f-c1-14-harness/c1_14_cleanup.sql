-- C1.14 — explicit cleanup sequence (plan C1.14) in one transaction as postgres. Scope limited to: null the 12 link
-- columns and the journeys pointer on fixture rows, delete the synthetic fixture episodes, drop the C1 refusal-test
-- scratch tables. Nothing is created to be cleaned; each statement reports the rows/objects it touched (expected 0
-- because C1.13 already left the database safe). Legacy fixture rows and Auth users are never deleted.
\pset format aligned
\pset footer off
\echo === C1.14 cleanup transaction start
select now() as started_at, current_user;
BEGIN;
SET LOCAL lock_timeout = '5s';
with u as (update public.journeys set current_pregnancy_episode_id = NULL where current_pregnancy_episode_id is not null returning 1) select 'journeys pointer nulled' as action, count(*) as rows from u;
with u as (update public.reflections set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'reflections links nulled' as action, count(*) as rows from u;
with u as (update public.week_photos set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'week_photos links nulled' as action, count(*) as rows from u;
with u as (update public.week_media_memories set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'week_media_memories links nulled' as action, count(*) as rows from u;
with u as (update public.pregnancy_appointments set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'pregnancy_appointments links nulled' as action, count(*) as rows from u;
with u as (update public.pregnancy_symptom_notes set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'pregnancy_symptom_notes links nulled' as action, count(*) as rows from u;
with u as (update public.baby_movement_notes set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'baby_movement_notes links nulled' as action, count(*) as rows from u;
with u as (update public.birth_plans set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'birth_plans links nulled' as action, count(*) as rows from u;
with u as (update public.hospital_bag_items set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'hospital_bag_items links nulled' as action, count(*) as rows from u;
with u as (update public.midwife_questions set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'midwife_questions links nulled' as action, count(*) as rows from u;
with u as (update public.contraction_sessions set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'contraction_sessions links nulled' as action, count(*) as rows from u;
with u as (update public.contraction_events set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'contraction_events links nulled' as action, count(*) as rows from u;
with u as (update public.babies set pregnancy_episode_id = NULL where pregnancy_episode_id is not null returning 1) select 'babies links nulled' as action, count(*) as rows from u;
with d as (delete from public.pregnancy_episodes where id in ('00000000-0000-4c10-8000-00000000ea01','00000000-0000-4c10-8000-00000000eb01') returning 1) select 'fixture episodes deleted' as action, count(*) as rows from d;
select 'pregnancy_episodes rows remaining' as action, count(*) as rows from public.pregnancy_episodes;
drop table if exists public.c1_scratch_episode_dep;
drop table if exists public.c1_scratch_baby_dep;
select 'later-phase FKs on pregnancy_episodes' as action, count(*) as rows from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass and conname not like '%\_pregnancy\_episode\_owner\_fkey';
select 'dependants of babies_id_user_id_key' as action, count(*) as rows from pg_constraint f join pg_constraint u on u.conindid = f.conindid where f.contype='f' and u.contype='u' and u.conname='babies_id_user_id_key';
select 'scratch objects' as action, count(*) as rows from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1\_scratch%';
COMMIT;
\echo === C1.14 cleanup transaction end
