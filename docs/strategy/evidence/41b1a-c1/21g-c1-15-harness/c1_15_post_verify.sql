-- C1.15 post-rollback verification (fresh session, read-only, as postgres).
\pset format aligned
\pset footer off
\echo === identity
select now() as checked_at, current_user, session_user, (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker,
 (select count(*) from supabase_migrations.schema_migrations) as history, (select count(*) from auth.users) as users,
 (select count(*) from auth.users where email is null or email not like '%@example.invalid') as non_synthetic,
 (select count(*) from pg_stat_activity where state='idle in transaction') as idle_in_tx,
 (select count(*) from pg_locks l join pg_class c on c.oid=l.relation join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and l.mode='AccessExclusiveLock') as access_exclusive;
\echo === 41B.1A object classes after rollback (every value must be absent / 0)
select 'pregnancy_episodes table (to_regclass)' as object_class, coalesce(to_regclass('public.pregnancy_episodes')::text, 'ABSENT') as value
union all select 'journeys.current_pregnancy_episode_id column', (select count(*)::text from information_schema.columns where table_schema='public' and table_name='journeys' and column_name='current_pregnancy_episode_id')
union all select 'pregnancy_episode_id columns (12 tables)', (select count(*)::text from information_schema.columns where table_schema='public' and column_name='pregnancy_episode_id')
union all select 'constraints named %pregnancy_episode%', (select count(*)::text from pg_constraint where conname like '%pregnancy_episode%')
union all select 'indexes named %pregnancy_episode%', (select count(*)::text from pg_indexes where schemaname='public' and indexname like '%pregnancy_episode%')
union all select 'policies named pregnancy_episodes_%', (select count(*)::text from pg_policy where polname like 'pregnancy_episodes_%')
union all select 'triggers named pregnancy_episodes_%', (select count(*)::text from pg_trigger where tgname like 'pregnancy_episodes_%' and not tgisinternal)
union all select 'babies_id_user_id_key constraint', (select count(*)::text from pg_constraint where conname='babies_id_user_id_key')
union all select 'babies_id_user_id_key index', (select count(*)::text from pg_indexes where schemaname='public' and indexname='babies_id_user_id_key')
union all select 'c1_scratch% objects', (select count(*)::text from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1\_scratch%')
union all select 'any object mentioning pregnancy_episode (pg_class)', (select count(*)::text from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like '%pregnancy_episode%');
\echo === legacy fixture after rollback (C1.2 shape)
select t, n from (values
 ('journeys', (select count(*) from public.journeys)), ('pregnancy_journeys', (select count(*) from public.pregnancy_journeys)), ('first_year_journeys', (select count(*) from public.first_year_journeys)), ('ttc_journeys', (select count(*) from public.ttc_journeys)),
 ('babies', (select count(*) from public.babies)), ('reflections', (select count(*) from public.reflections)), ('week_photos', (select count(*) from public.week_photos)), ('week_media_memories', (select count(*) from public.week_media_memories)),
 ('pregnancy_appointments', (select count(*) from public.pregnancy_appointments)), ('pregnancy_symptom_notes', (select count(*) from public.pregnancy_symptom_notes)), ('baby_movement_notes', (select count(*) from public.baby_movement_notes)), ('birth_plans', (select count(*) from public.birth_plans)),
 ('hospital_bag_items', (select count(*) from public.hospital_bag_items)), ('midwife_questions', (select count(*) from public.midwife_questions)), ('contraction_sessions', (select count(*) from public.contraction_sessions)), ('contraction_events', (select count(*) from public.contraction_events))) v(t, n);
select ((select count(*) from public.journeys)+(select count(*) from public.pregnancy_journeys)+(select count(*) from public.first_year_journeys)+(select count(*) from public.ttc_journeys)+(select count(*) from public.babies)+(select count(*) from public.reflections)+(select count(*) from public.week_photos)+(select count(*) from public.week_media_memories)+(select count(*) from public.pregnancy_appointments)+(select count(*) from public.pregnancy_symptom_notes)+(select count(*) from public.baby_movement_notes)+(select count(*) from public.birth_plans)+(select count(*) from public.hospital_bag_items)+(select count(*) from public.midwife_questions)+(select count(*) from public.contraction_sessions)+(select count(*) from public.contraction_events)) as legacy_fixture_total,
 (select string_agg(id::text, ',' order by id) from public.reflections) as reflection_ids, (select string_agg(id::text, ',' order by id) from public.babies) as baby_ids,
 (select string_agg(email, ',' order by email) from auth.users) as user_emails;
\echo === legacy schema headline presence (tables, legacy constraints, legacy baby indexes)
select (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relkind='r') as public_tables,
 (select count(*) from pg_constraint where conname in ('reflections_user_id_week_key','week_photos_user_id_week_key','week_media_memories_user_id_week_media_type_key','birth_plans_user_id_key','hospital_bag_items_user_id_category_item_key_key','first_year_entries_baby_id_fkey','first_year_care_events_baby_id_fkey','first_year_memories_baby_id_fkey','first_year_reminders_baby_id_fkey','contraction_sessions_id_user_id_key','reflections_user_id_fkey','week_photos_user_id_fkey')) as legacy_constraints_present_of_12,
 (select count(*) from pg_indexes where schemaname='public' and indexname in ('babies_user_birth_order_idx','babies_one_primary_per_user_idx')) as legacy_baby_indexes_of_2,
 (select count(*) from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='public') as public_functions,
 (select count(*) from pg_trigger t join pg_class c on c.oid=t.tgrelid join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and not t.tgisinternal) as public_triggers,
 (select count(*) from pg_policy p join pg_class c on c.oid=p.polrelid join pg_namespace n on n.oid=c.relnamespace where n.nspname='public') as public_policies;
\echo === functions by md5(prosrc) in the 02-baseline line format (true/false security)
\pset format unaligned
\pset tuples_only on
\o c1_15/sec_functions_prosrc.txt
select p.proname || '|' || pg_get_function_identity_arguments(p.oid) || '|' || p.prosecdef::text || '|' || md5(p.prosrc) from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' order by 1;
\o
\pset tuples_only off
\pset format aligned
