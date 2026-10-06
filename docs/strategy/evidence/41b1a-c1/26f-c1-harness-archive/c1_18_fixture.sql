-- C1.18 — connected ownership graph for disposable User D (e30d53e5-5a15-4d6a-8df4-cb19975906e6) on Project 1. One transaction (-1), as postgres.
-- Valid same-user relationships only; no FK/trigger bypass. Story: a pregnancy that ended in birth (E-D1, given_birth),
-- with episode-bound pregnancy records, a baby linked to the episode, First Year child-bound rows for that baby, and the
-- journey pointer still referencing E-D1 (schema-permitted; the 41B.1C transition would normally clear it).
-- First Year triggers require journeys.lifecycle = 'first_year' for the user, so the journey row is first_year.
\pset footer off
SET LOCAL lock_timeout = '5s';
insert into public.journeys (user_id, lifecycle) values ('e30d53e5-5a15-4d6a-8df4-cb19975906e6', 'first_year');
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, status_changed_at, outcome_date, expected_count, ended_at)
values ('00000000-0000-4c10-8000-00000000ed01', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', date '2025-12-15', date '2026-09-21', 'given_birth', timestamptz '2026-09-20T09:00:00Z', date '2026-09-20', 1, timestamptz '2026-09-20T09:00:00Z');
insert into public.babies (id, user_id, name, date_of_birth, birth_order, is_primary, pregnancy_episode_id)
values ('00000000-0000-4c10-8000-00000000d001', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', 'C1 synthetic deletion baby', date '2026-09-20', 1, true, '00000000-0000-4c10-8000-00000000ed01');
-- episode-bound pregnancy records
insert into public.reflections (id, user_id, week, content, pregnancy_episode_id) values ('00000000-0000-4c10-8000-00000000d101', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', 20, 'C1 synthetic deletion reflection', '00000000-0000-4c10-8000-00000000ed01');
insert into public.week_photos (id, user_id, week, storage_path, pregnancy_episode_id) values ('00000000-0000-4c10-8000-00000000d102', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', 20, 'e30d53e5-5a15-4d6a-8df4-cb19975906e6/20.jpg', '00000000-0000-4c10-8000-00000000ed01');
insert into public.pregnancy_appointments (id, user_id, week, appointment_type, pregnancy_episode_id) values ('00000000-0000-4c10-8000-00000000d104', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', 20, 'C1 synthetic appointment', '00000000-0000-4c10-8000-00000000ed01');
insert into public.birth_plans (id, user_id, completion, pregnancy_episode_id) values ('00000000-0000-4c10-8000-00000000d107', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', 50, '00000000-0000-4c10-8000-00000000ed01');
insert into public.contraction_sessions (id, user_id, started_at, ended_at, pregnancy_episode_id) values ('00000000-0000-4c10-8000-00000000d110', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', timestamptz '2026-09-19T20:00:00Z', timestamptz '2026-09-19T21:00:00Z', '00000000-0000-4c10-8000-00000000ed01');
insert into public.contraction_events (id, user_id, session_id, started_at, ended_at, pregnancy_episode_id) values ('00000000-0000-4c10-8000-00000000d111', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', '00000000-0000-4c10-8000-00000000d110', timestamptz '2026-09-19T20:10:00Z', timestamptz '2026-09-19T20:11:00Z', '00000000-0000-4c10-8000-00000000ed01');
-- First Year child-bound rows for the linked baby
insert into public.first_year_entries (id, user_id, baby_id, lane, kind, entry_date, note) values ('00000000-0000-4c10-8000-00000000d201', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', '00000000-0000-4c10-8000-00000000d001', 'baby', 'rhythm', date '2026-10-05', 'C1 synthetic entry');
insert into public.first_year_care_events (id, user_id, baby_id, event_type, occurred_at, note) values ('00000000-0000-4c10-8000-00000000d202', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', '00000000-0000-4c10-8000-00000000d001', 'note', timestamptz '2026-10-05T10:00:00Z', 'C1 synthetic care note');
insert into public.first_year_reminders (id, user_id, baby_id, reminder_type, due_at, label) values ('00000000-0000-4c10-8000-00000000d203', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', '00000000-0000-4c10-8000-00000000d001', 'moment', now() + interval '1 day', 'C1 synthetic reminder');
insert into public.first_year_memories (id, user_id, baby_id, memory_scope, memory_date, note) values ('00000000-0000-4c10-8000-00000000d204', 'e30d53e5-5a15-4d6a-8df4-cb19975906e6', '00000000-0000-4c10-8000-00000000d001', 'baby', date '2026-10-05', 'C1 synthetic memory');
-- populated journey pointer
update public.journeys set current_pregnancy_episode_id = '00000000-0000-4c10-8000-00000000ed01' where user_id = 'e30d53e5-5a15-4d6a-8df4-cb19975906e6';
