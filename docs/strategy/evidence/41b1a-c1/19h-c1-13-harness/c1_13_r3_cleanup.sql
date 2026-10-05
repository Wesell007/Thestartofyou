-- C1.13 R3 cleanup (after the empty POST-vs-PRE diff is proven): drop the scratch babies-key dependant table.
\pset footer off
BEGIN;
SET LOCAL lock_timeout = '5s';
drop table public.c1_scratch_baby_dep;
COMMIT;
select (select count(*) from pg_class c join pg_namespace n on n.oid=c.relnamespace where n.nspname='public' and c.relname like 'c1\_scratch%') as scratch_objects,
 (select count(*) from pg_constraint f join pg_constraint u on u.conindid = f.conindid where f.contype='f' and u.contype='u' and u.conname='babies_id_user_id_key') as babies_key_dependants;
