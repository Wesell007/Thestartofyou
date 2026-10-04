BEGIN;
SELECT pg_backend_pid() AS blocker_pid, now() AS tx_started_at;
LOCK TABLE public.journeys IN ACCESS EXCLUSIVE MODE;
SELECT 'lock held' AS state, now() AS lock_acquired_at;
SELECT pg_sleep(25);
ROLLBACK;
SELECT 'blocker rolled back' AS state, now() AS released_at;
