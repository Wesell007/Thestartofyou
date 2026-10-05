-- C1.13 R3 setup (committed): scratch dependant of babies_id_user_id_key; no rows.
\pset footer off
BEGIN;
SET LOCAL lock_timeout = '5s';
create table public.c1_scratch_baby_dep (
  baby_id uuid,
  user_id uuid,
  constraint c1_scratch_baby_dep_fk foreign key (baby_id, user_id) references public.babies (id, user_id)
);
COMMIT;
select f.conname, f.conrelid::regclass as tbl, u.conname as depends_on_unique, pg_get_constraintdef(f.oid) as def from pg_constraint f join pg_constraint u on u.conindid = f.conindid where f.conname = 'c1_scratch_baby_dep_fk';
select count(*) as scratch_rows from public.c1_scratch_baby_dep;
