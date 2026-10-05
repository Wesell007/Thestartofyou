-- C1.13 R2 setup (committed): scratch later-phase FK referencing pregnancy_episodes(id, user_id); no rows.
\pset footer off
BEGIN;
SET LOCAL lock_timeout = '5s';
create table public.c1_scratch_episode_dep (
  episode_id uuid,
  user_id uuid,
  constraint c1_scratch_episode_dep_fk foreign key (episode_id, user_id) references public.pregnancy_episodes (id, user_id)
);
COMMIT;
select conname, conrelid::regclass as tbl, confrelid::regclass as refs, pg_get_constraintdef(oid) as def from pg_constraint where conname = 'c1_scratch_episode_dep_fk';
select count(*) as scratch_rows from public.c1_scratch_episode_dep;
