-- N10.1 minimal synthetic environment (disposable project only). No TSOY schema, no 41B migrations.
SET LOCAL lock_timeout = '5s';
create table public.n10r1_rehearsal_marker (project_ref text primary key, run_label text not null, created_at timestamptz not null default now());
alter table public.n10r1_rehearsal_marker enable row level security;
revoke all on table public.n10r1_rehearsal_marker from anon, authenticated;
insert into public.n10r1_rehearsal_marker (project_ref, run_label) values ('gbhwpzofnswlryqjoumw', 'N10.1-storage-auth-semantics');
-- Folder-scoped Storage RLS for the probe bucket, same shape as the TSOY media buckets (owner folder = auth.uid()).
create policy "n10 probe read own" on storage.objects for select to authenticated using (bucket_id = 'n10-probe' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "n10 probe upload own" on storage.objects for insert to authenticated with check (bucket_id = 'n10-probe' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "n10 probe update own" on storage.objects for update to authenticated using (bucket_id = 'n10-probe' and auth.uid()::text = (storage.foldername(name))[1]) with check (bucket_id = 'n10-probe' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "n10 probe delete own" on storage.objects for delete to authenticated using (bucket_id = 'n10-probe' and auth.uid()::text = (storage.foldername(name))[1]);
