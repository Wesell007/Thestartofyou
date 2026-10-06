\pset footer off
\echo === RI action triggers on public.pregnancy_episodes and public.babies (parent side, corrected filter)
select t.tgrelid::regclass as on_table, t.tgname, t.oid as trigger_oid, t.tgfoid::regproc as function, t.tgenabled as enabled, k.conname as constraint_name, k.conrelid::regclass as child_table, k.confdeltype::text as on_delete
from pg_trigger t join pg_constraint k on k.oid = t.tgconstraint where t.tgrelid in ('public.pregnancy_episodes'::regclass, 'public.babies'::regclass, 'public.contraction_sessions'::regclass) and t.tgisinternal and t.tgfoid::regproc::text like '%del%' order by t.tgrelid::regclass::text, t.tgname;
