select pid, state, wait_event_type, wait_event, pg_blocking_pids(pid) as blocked_by, to_char(xact_start, 'HH24:MI:SS.MS') as xact_start, left(regexp_replace(query, '\s+', ' ', 'g'), 80) as query
from pg_stat_activity where datname = 'postgres' and pid <> pg_backend_pid()
  and (query ilike '%LOCK TABLE public.journeys%' or wait_event_type = 'Lock' or query ilike '%ALTER TABLE public.journeys%' or query ilike '%pg_sleep%')
order by pid;
select l.pid, l.mode, l.granted, c.relname from pg_locks l join pg_class c on c.oid = l.relation where c.relname = 'journeys' order by l.granted desc, l.pid;
