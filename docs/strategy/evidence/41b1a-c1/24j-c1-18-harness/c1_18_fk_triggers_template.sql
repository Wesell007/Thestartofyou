-- C1.18 — FK and RI-trigger catalogue relevant to deleting a user (read-only). Observation only.
\pset footer off
\echo === FKs referencing auth.users from the tables in the User D graph
select c.relname as child_table, k.conname, k.confrelid::regclass as parent, k.confdeltype::text as on_delete, k.condeferrable as deferrable, k.condeferred as initially_deferred, k.convalidated as validated
from pg_constraint k join pg_class c on c.oid = k.conrelid
where k.contype = 'f' and k.confrelid = 'auth.users'::regclass and c.relnamespace = 'public'::regnamespace
  and c.relname in ('journeys','pregnancy_episodes','reflections','week_photos','pregnancy_appointments','birth_plans','contraction_sessions','contraction_events','babies','first_year_entries','first_year_care_events','first_year_reminders','first_year_memories')
order by c.relname, k.conname;
\echo === FKs referencing public.pregnancy_episodes (the 13 RESTRICT links)
select c.relname as child_table, k.conname, k.confdeltype::text as on_delete, k.condeferrable as deferrable, k.condeferred as initially_deferred, k.convalidated as validated
from pg_constraint k join pg_class c on c.oid = k.conrelid where k.contype = 'f' and k.confrelid = 'public.pregnancy_episodes'::regclass order by c.relname;
\echo === FKs referencing public.babies and contraction_sessions (child-bound and nested cascades)
select c.relname as child_table, k.conname, k.confrelid::regclass as parent, k.confdeltype::text as on_delete, k.condeferrable as deferrable, k.convalidated as validated
from pg_constraint k join pg_class c on c.oid = k.conrelid where k.contype = 'f' and k.confrelid in ('public.babies'::regclass, 'public.contraction_sessions'::regclass) order by parent, c.relname;
\echo === All triggers on auth.users in firing order (plan: select tgname from pg_trigger where tgrelid = 'auth.users'::regclass order by tgname)
select tgname from pg_trigger where tgrelid = 'auth.users'::regclass order by tgname;
\echo === RI triggers on auth.users with OID, function, enabled, constraint and child table (internal RI triggers fire in name order)
select t.tgname, t.oid as trigger_oid, t.tgfoid::regproc as function, t.tgenabled as enabled, t.tgisinternal as internal, k.conname as constraint_name, k.conrelid::regclass as child_table, k.confdeltype::text as on_delete
from pg_trigger t left join pg_constraint k on k.oid = t.tgconstraint where t.tgrelid = 'auth.users'::regclass and t.tgisinternal order by t.tgname;
\echo === RI action triggers on public.pregnancy_episodes and public.babies (parent side; fire for deletes on those parents)
select t.tgrelid::regclass as on_table, t.tgname, t.oid as trigger_oid, t.tgfoid::regproc as function, t.tgenabled as enabled, k.conname as constraint_name, k.conrelid::regclass as child_table, k.confdeltype::text as on_delete
from pg_trigger t join pg_constraint k on k.oid = t.tgconstraint where t.tgrelid in ('public.pregnancy_episodes'::regclass, 'public.babies'::regclass) and t.tgisinternal and t.tgfoid::regproc::text like 'RI_FKey_%del' order by t.tgrelid::regclass::text, t.tgname;
