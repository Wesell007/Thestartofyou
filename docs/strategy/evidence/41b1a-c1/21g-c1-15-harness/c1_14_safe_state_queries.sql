-- C1.14 — section K safe-state query set, itemised (read-only, as postgres). Every value must be 0.
\pset format aligned
\pset footer off
\echo === identity
select now() as checked_at, current_user, session_user, (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker,
 (select count(*) from supabase_migrations.schema_migrations) as history, (select count(*) from auth.users) as users,
 (select count(*) from auth.users where email is null or email not like '%@example.invalid') as non_synthetic,
 (select count(*) from pg_stat_activity where state='idle in transaction') as idle_in_tx,
 (select count(*) from pg_locks l join pg_class c on c.oid=l.relation join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and l.mode='AccessExclusiveLock') as access_exclusive;
\echo === safe-state query set (section K)
select 'G1 count(*) from pregnancy_episodes' as check_name, count(*) as value from public.pregnancy_episodes
union all select 'G3 journeys where current_pregnancy_episode_id is not null', count(*) from public.journeys where current_pregnancy_episode_id is not null
union all select 'G4 reflections where pregnancy_episode_id is not null', count(*) from public.reflections where pregnancy_episode_id is not null
union all select 'G4 week_photos', count(*) from public.week_photos where pregnancy_episode_id is not null
union all select 'G4 week_media_memories', count(*) from public.week_media_memories where pregnancy_episode_id is not null
union all select 'G4 pregnancy_appointments', count(*) from public.pregnancy_appointments where pregnancy_episode_id is not null
union all select 'G4 pregnancy_symptom_notes', count(*) from public.pregnancy_symptom_notes where pregnancy_episode_id is not null
union all select 'G4 baby_movement_notes', count(*) from public.baby_movement_notes where pregnancy_episode_id is not null
union all select 'G4 birth_plans', count(*) from public.birth_plans where pregnancy_episode_id is not null
union all select 'G4 hospital_bag_items', count(*) from public.hospital_bag_items where pregnancy_episode_id is not null
union all select 'G4 midwife_questions', count(*) from public.midwife_questions where pregnancy_episode_id is not null
union all select 'G4 contraction_sessions', count(*) from public.contraction_sessions where pregnancy_episode_id is not null
union all select 'G4 contraction_events', count(*) from public.contraction_events where pregnancy_episode_id is not null
union all select 'G4 babies', count(*) from public.babies where pregnancy_episode_id is not null
union all select 'G2 FKs referencing pregnancy_episodes outside the 13 owned links', count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass and conname <> all(array['journeys_current_pregnancy_episode_owner_fkey','reflections_pregnancy_episode_owner_fkey','week_photos_pregnancy_episode_owner_fkey','week_media_memories_pregnancy_episode_owner_fkey','pregnancy_appointments_pregnancy_episode_owner_fkey','pregnancy_symptom_notes_pregnancy_episode_owner_fkey','baby_movement_notes_pregnancy_episode_owner_fkey','birth_plans_pregnancy_episode_owner_fkey','hospital_bag_items_pregnancy_episode_owner_fkey','midwife_questions_pregnancy_episode_owner_fkey','contraction_sessions_pregnancy_episode_owner_fkey','contraction_events_pregnancy_episode_owner_fkey','babies_pregnancy_episode_owner_fkey'])
union all select 'G5 FKs depending on babies_id_user_id_key', count(*) from pg_constraint f join pg_constraint u on u.conindid = f.conindid where f.contype='f' and u.contype='u' and u.conrelid='public.babies'::regclass and u.conname='babies_id_user_id_key'
union all select 'scratch pg_class relname like c1_scratch%', count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1\_scratch%';
\echo === legacy fixture distribution (C1.2 shape)
select t, n from (values
 ('journeys', (select count(*) from public.journeys)), ('pregnancy_journeys', (select count(*) from public.pregnancy_journeys)), ('first_year_journeys', (select count(*) from public.first_year_journeys)), ('ttc_journeys', (select count(*) from public.ttc_journeys)),
 ('babies', (select count(*) from public.babies)), ('reflections', (select count(*) from public.reflections)), ('week_photos', (select count(*) from public.week_photos)), ('week_media_memories', (select count(*) from public.week_media_memories)),
 ('pregnancy_appointments', (select count(*) from public.pregnancy_appointments)), ('pregnancy_symptom_notes', (select count(*) from public.pregnancy_symptom_notes)), ('baby_movement_notes', (select count(*) from public.baby_movement_notes)), ('birth_plans', (select count(*) from public.birth_plans)),
 ('hospital_bag_items', (select count(*) from public.hospital_bag_items)), ('midwife_questions', (select count(*) from public.midwife_questions)), ('contraction_sessions', (select count(*) from public.contraction_sessions)), ('contraction_events', (select count(*) from public.contraction_events))) v(t, n);
select ((select count(*) from public.journeys)+(select count(*) from public.pregnancy_journeys)+(select count(*) from public.first_year_journeys)+(select count(*) from public.ttc_journeys)+(select count(*) from public.babies)+(select count(*) from public.reflections)+(select count(*) from public.week_photos)+(select count(*) from public.week_media_memories)+(select count(*) from public.pregnancy_appointments)+(select count(*) from public.pregnancy_symptom_notes)+(select count(*) from public.baby_movement_notes)+(select count(*) from public.birth_plans)+(select count(*) from public.hospital_bag_items)+(select count(*) from public.midwife_questions)+(select count(*) from public.contraction_sessions)+(select count(*) from public.contraction_events)) as legacy_fixture_total,
 (select string_agg(id::text, ',' order by id) from public.reflections) as reflection_ids, (select string_agg(id::text, ',' order by id) from public.babies) as baby_ids;
\echo === 41B.1A foundation presence
select to_regclass('public.pregnancy_episodes')::text as episodes_table,
 (select count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass) as ownership_fks,
 (select count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass and convalidated) as validated,
 (select count(*) from pg_constraint where contype='f' and confrelid='public.pregnancy_episodes'::regclass and confdeltype='r') as restrict_fks,
 (select count(*) from information_schema.columns where table_schema='public' and ((column_name='pregnancy_episode_id') or (table_name='journeys' and column_name='current_pregnancy_episode_id'))) as link_columns,
 (select count(*) from pg_indexes where schemaname='public' and indexname ~ '_pregnancy_episode_idx$') as link_indexes,
 (select count(*) from pg_constraint where conname='babies_id_user_id_key') as babies_key,
 (select count(*) from pg_indexes where schemaname='public' and indexname='pregnancy_episodes_one_open_per_user_idx') as open_unique_index,
 (select count(*) from pg_constraint where conrelid='public.pregnancy_episodes'::regclass and contype='c') as episode_checks,
 (select count(*) from pg_trigger where tgrelid='public.pregnancy_episodes'::regclass and not tgisinternal) as episode_trigger,
 (select relrowsecurity::text || '/forced=' || relforcerowsecurity::text from pg_class where oid='public.pregnancy_episodes'::regclass) as rls,
 (select count(*) from pg_policy where polrelid='public.pregnancy_episodes'::regclass) as policies,
 (select relacl::text from pg_class where oid='public.pregnancy_episodes'::regclass) as acl,
 (select string_agg(privilege_type, ',' order by privilege_type) from information_schema.role_table_grants where table_schema='public' and table_name='pregnancy_episodes' and grantee='authenticated') as authenticated_privileges;
