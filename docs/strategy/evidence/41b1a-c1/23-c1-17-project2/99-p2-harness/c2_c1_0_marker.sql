\pset footer off
BEGIN;
create table public.c1_rehearsal_marker (
  project_ref text not null primary key,
  run_label text not null,
  created_at timestamptz not null default now()
);
alter table public.c1_rehearsal_marker enable row level security;
revoke all on public.c1_rehearsal_marker from anon, authenticated, public;
grant all on public.c1_rehearsal_marker to service_role;
insert into public.c1_rehearsal_marker (project_ref, run_label) values ('dlftnirrnirlkhxpofoq', '41B.1A-C1-run2');
COMMIT;
select project_ref, run_label, created_at from public.c1_rehearsal_marker;
select relacl::text as acl, relrowsecurity, relforcerowsecurity from pg_class where oid = 'public.c1_rehearsal_marker'::regclass;
select column_name, data_type, is_nullable, column_default from information_schema.columns where table_schema='public' and table_name='c1_rehearsal_marker' order by column_name;
select conname, pg_get_constraintdef(oid) from pg_constraint where conrelid='public.c1_rehearsal_marker'::regclass;
