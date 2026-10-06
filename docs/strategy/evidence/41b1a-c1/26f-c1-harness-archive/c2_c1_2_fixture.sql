-- C1.17 / C1.2 on Project 2: the 21-row legacy fixture of plan section F, same deterministic row ids and shape as run 1,
-- with Project 2 user ids substituted (f5d043b9-a04c-4195-8d94-ed0f0c487516, 1d9fc1ea-2b56-4d1f-acbb-357dc92dbc00, de626f6c-b4ac-4c56-9c90-9464ab9214d7). As postgres, one committed transaction, no bypass.
\pset footer off
\echo === C1.2 fixture (Project 2) start
select now() as started_at, current_user, (select project_ref || ' / ' || run_label from public.c1_rehearsal_marker) as marker, (select count(*) from auth.users) as auth_users;
BEGIN;
SET LOCAL lock_timeout = '5s';
insert into public.journeys (user_id, lifecycle) values ('f5d043b9-a04c-4195-8d94-ed0f0c487516', 'pregnancy'), ('1d9fc1ea-2b56-4d1f-acbb-357dc92dbc00', 'first_year'), ('de626f6c-b4ac-4c56-9c90-9464ab9214d7', 'ttc');
insert into public.pregnancy_journeys (user_id, lmp_date, due_date, status) values ('f5d043b9-a04c-4195-8d94-ed0f0c487516', date '2026-06-01', date '2027-03-08', 'active');
insert into public.pregnancy_journeys (user_id, lmp_date, due_date, status, status_changed_at, outcome_date) values ('1d9fc1ea-2b56-4d1f-acbb-357dc92dbc00', date '2025-06-02', date '2026-03-09', 'given_birth', timestamptz '2026-03-06T00:00:00Z', date '2026-03-05');
insert into public.babies (id, user_id, name, date_of_birth, birth_order, is_primary) values
 ('00000000-0000-4c10-8000-00000000b001', '1d9fc1ea-2b56-4d1f-acbb-357dc92dbc00', 'C1 synthetic baby one', date '2026-03-05', 1, true),
 ('00000000-0000-4c10-8000-00000000b002', '1d9fc1ea-2b56-4d1f-acbb-357dc92dbc00', 'C1 synthetic baby two', date '2026-03-05', 2, false);
insert into public.reflections (id, user_id, week, content) values
 ('00000000-0000-4c10-8000-00000000a101', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', 12, 'C1 synthetic reflection week 12'),
 ('00000000-0000-4c10-8000-00000000b101', '1d9fc1ea-2b56-4d1f-acbb-357dc92dbc00', 30, 'C1 synthetic reflection week 30');
insert into public.week_photos (id, user_id, week, storage_path) values ('00000000-0000-4c10-8000-00000000a102', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', 12, 'f5d043b9-a04c-4195-8d94-ed0f0c487516/12.jpg');
insert into public.week_media_memories (id, user_id, week, media_type, mime_type, storage_path, file_size_bytes) values ('00000000-0000-4c10-8000-00000000a103', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', 12, 'video', 'video/mp4', 'f5d043b9-a04c-4195-8d94-ed0f0c487516/12.mp4', 1024);
insert into public.pregnancy_appointments (id, user_id, week, appointment_type) values
 ('00000000-0000-4c10-8000-00000000a104', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', 12, 'C1 synthetic appointment'),
 ('00000000-0000-4c10-8000-00000000b104', '1d9fc1ea-2b56-4d1f-acbb-357dc92dbc00', 30, 'C1 synthetic appointment');
insert into public.pregnancy_symptom_notes (id, user_id, symptom_label, personal_severity) values ('00000000-0000-4c10-8000-00000000a105', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', 'C1 synthetic symptom', 1);
insert into public.baby_movement_notes (id, user_id, pattern_label) values ('00000000-0000-4c10-8000-00000000a106', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', 'C1 synthetic pattern');
insert into public.birth_plans (id, user_id, completion) values ('00000000-0000-4c10-8000-00000000a107', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', 10);
insert into public.hospital_bag_items (id, user_id, category, item_key, label) values ('00000000-0000-4c10-8000-00000000a108', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', 'parent', 'c1_synthetic_item', 'C1 synthetic item');
insert into public.midwife_questions (id, user_id, category, question) values ('00000000-0000-4c10-8000-00000000a109', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', 'other', 'C1 synthetic question?');
insert into public.contraction_sessions (id, user_id, started_at, ended_at) values ('00000000-0000-4c10-8000-00000000a110', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', timestamptz '2026-10-01T20:00:00Z', timestamptz '2026-10-01T20:30:00Z');
insert into public.contraction_events (id, user_id, session_id, started_at, ended_at) values
 ('00000000-0000-4c10-8000-00000000a111', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', '00000000-0000-4c10-8000-00000000a110', timestamptz '2026-10-01T20:05:00Z', timestamptz '2026-10-01T20:06:00Z'),
 ('00000000-0000-4c10-8000-00000000a112', 'f5d043b9-a04c-4195-8d94-ed0f0c487516', '00000000-0000-4c10-8000-00000000a110', timestamptz '2026-10-01T20:10:00Z', timestamptz '2026-10-01T20:11:00Z');
COMMIT;
\echo === fixture read-back
select t, n from (values
 ('journeys', (select count(*) from public.journeys)), ('pregnancy_journeys', (select count(*) from public.pregnancy_journeys)), ('first_year_journeys', (select count(*) from public.first_year_journeys)), ('ttc_journeys', (select count(*) from public.ttc_journeys)),
 ('babies', (select count(*) from public.babies)), ('reflections', (select count(*) from public.reflections)), ('week_photos', (select count(*) from public.week_photos)), ('week_media_memories', (select count(*) from public.week_media_memories)),
 ('pregnancy_appointments', (select count(*) from public.pregnancy_appointments)), ('pregnancy_symptom_notes', (select count(*) from public.pregnancy_symptom_notes)), ('baby_movement_notes', (select count(*) from public.baby_movement_notes)), ('birth_plans', (select count(*) from public.birth_plans)),
 ('hospital_bag_items', (select count(*) from public.hospital_bag_items)), ('midwife_questions', (select count(*) from public.midwife_questions)), ('contraction_sessions', (select count(*) from public.contraction_sessions)), ('contraction_events', (select count(*) from public.contraction_events))) v(t, n);
select ((select count(*) from public.journeys)+(select count(*) from public.pregnancy_journeys)+(select count(*) from public.first_year_journeys)+(select count(*) from public.ttc_journeys)+(select count(*) from public.babies)+(select count(*) from public.reflections)+(select count(*) from public.week_photos)+(select count(*) from public.week_media_memories)+(select count(*) from public.pregnancy_appointments)+(select count(*) from public.pregnancy_symptom_notes)+(select count(*) from public.baby_movement_notes)+(select count(*) from public.birth_plans)+(select count(*) from public.hospital_bag_items)+(select count(*) from public.midwife_questions)+(select count(*) from public.contraction_sessions)+(select count(*) from public.contraction_events)) as legacy_fixture_total,
 (select count(*) from auth.users) as users, (select count(*) from auth.users where email is null or email not like '%@example.invalid') as non_synthetic,
 (select string_agg(user_id::text || ':' || lifecycle, ',' order by lifecycle) from public.journeys) as journeys_by_user;
\echo === C1.2 fixture (Project 2) end
