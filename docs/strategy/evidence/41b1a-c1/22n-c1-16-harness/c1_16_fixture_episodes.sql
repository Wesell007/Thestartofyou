-- C1.16 — recreate the plan section F episode fixture required by the starred rows of sections H, I and J
-- (same definitions as C1.6: E-A1 for A active, E-B1 for B given_birth). As postgres, one committed transaction.
\pset footer off
\echo === C1.16 episode fixture start
select now() as started_at, current_user, (select count(*) from public.pregnancy_episodes) as episodes_before;
BEGIN;
SET LOCAL lock_timeout = '5s';
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, expected_count)
values ('00000000-0000-4c10-8000-00000000ea01', 'b09cd318-8f3e-4853-8d97-fc10267b3d69', date '2026-06-01', date '2027-03-08', 'active', 1);
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status, status_changed_at, outcome_date, expected_count, ended_at)
values ('00000000-0000-4c10-8000-00000000eb01', '820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb', date '2025-09-01', date '2026-06-08', 'given_birth', timestamptz '2026-06-05T10:00:00Z', date '2026-06-05', 2, timestamptz '2026-06-05T10:00:00Z');
COMMIT;
select id, user_id, status, lmp_date, due_date, ended_at, outcome_date, removed_at, expected_count from public.pregnancy_episodes order by id;
\echo === C1.16 episode fixture end
