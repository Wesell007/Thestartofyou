-- C1.13 safe-state transition (setup/cleanup between the combined-state run and R2; NOT a rollback execution).
-- Unbinds the synthetic pointer and link set for the combined state, verifies all 12 link columns are NULL, deletes the
-- episode fixture E-A1 and E-B1, and preserves all 21 legacy fixture rows. As postgres, one committed transaction.
\pset footer off
\echo === safe-state transition start
select now() as started_at, current_user;
BEGIN;
SET LOCAL lock_timeout = '5s';
update public.journeys set current_pregnancy_episode_id = NULL where current_pregnancy_episode_id is not null;
update public.reflections set pregnancy_episode_id = NULL where pregnancy_episode_id is not null;
-- defensive: the other eleven link columns were never bound in C1.13, verified below rather than updated
delete from public.pregnancy_episodes where id in ('00000000-0000-4c10-8000-00000000ea01','00000000-0000-4c10-8000-00000000eb01');
COMMIT;
\echo === safe-state read-back (autocommit)
select 'journeys' as t, count(*) filter (where current_pregnancy_episode_id is not null) as non_null from public.journeys
union all select 'reflections', count(*) filter (where pregnancy_episode_id is not null) from public.reflections
union all select 'week_photos', count(*) filter (where pregnancy_episode_id is not null) from public.week_photos
union all select 'week_media_memories', count(*) filter (where pregnancy_episode_id is not null) from public.week_media_memories
union all select 'pregnancy_appointments', count(*) filter (where pregnancy_episode_id is not null) from public.pregnancy_appointments
union all select 'pregnancy_symptom_notes', count(*) filter (where pregnancy_episode_id is not null) from public.pregnancy_symptom_notes
union all select 'baby_movement_notes', count(*) filter (where pregnancy_episode_id is not null) from public.baby_movement_notes
union all select 'birth_plans', count(*) filter (where pregnancy_episode_id is not null) from public.birth_plans
union all select 'hospital_bag_items', count(*) filter (where pregnancy_episode_id is not null) from public.hospital_bag_items
union all select 'midwife_questions', count(*) filter (where pregnancy_episode_id is not null) from public.midwife_questions
union all select 'contraction_sessions', count(*) filter (where pregnancy_episode_id is not null) from public.contraction_sessions
union all select 'contraction_events', count(*) filter (where pregnancy_episode_id is not null) from public.contraction_events
union all select 'babies', count(*) filter (where pregnancy_episode_id is not null) from public.babies;
select (select count(*) from public.pregnancy_episodes) as episode_rows,
 (select count(*) from public.pregnancy_episodes where id in ('00000000-0000-4c10-8000-00000000ea01','00000000-0000-4c10-8000-00000000eb01')) as fixture_episodes_remaining,
 ((select count(*) from public.journeys)+(select count(*) from public.pregnancy_journeys)+(select count(*) from public.first_year_journeys)+(select count(*) from public.ttc_journeys)+(select count(*) from public.babies)+(select count(*) from public.reflections)+(select count(*) from public.week_photos)+(select count(*) from public.week_media_memories)+(select count(*) from public.pregnancy_appointments)+(select count(*) from public.pregnancy_symptom_notes)+(select count(*) from public.baby_movement_notes)+(select count(*) from public.birth_plans)+(select count(*) from public.hospital_bag_items)+(select count(*) from public.midwife_questions)+(select count(*) from public.contraction_sessions)+(select count(*) from public.contraction_events)) as legacy_fixture_rows,
 (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1\_scratch%') as scratch_objects,
 to_regclass('public.pregnancy_episodes')::text as episodes_table_still_exists,
 (select count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass and convalidated) as validated_ownership_fks;
\echo === safe-state transition end
