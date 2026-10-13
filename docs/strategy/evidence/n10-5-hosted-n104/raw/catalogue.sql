\pset footer off
\echo '== M4 alert columns'
select column_name, data_type, is_nullable, column_default from information_schema.columns
where table_schema='private' and table_name='account_deletion_requests' and column_name like 'alert%' order by ordinal_position;
\echo '== M4 constraints'
select conname from pg_constraint where conrelid='private.account_deletion_requests'::regclass and conname like '%alert%' order by 1;
\echo '== private functions: definer / search_path / owner / EXECUTE matrix'
select p.proname, pg_get_function_identity_arguments(p.oid) args, p.prosecdef secdef, p.proconfig::text cfg, pg_get_userbyid(p.proowner) owner,
  has_function_privilege('public', p.oid, 'EXECUTE') pub, has_function_privilege('anon', p.oid, 'EXECUTE') anon,
  has_function_privilege('authenticated', p.oid, 'EXECUTE') authn, has_function_privilege('service_role', p.oid, 'EXECUTE') svc,
  has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE') worker
from pg_proc p where p.pronamespace='private'::regnamespace order by 1;
\echo '== worker role + direct table privileges'
select rolname, rolcanlogin, rolsuper, rolcreatedb, rolcreaterole, rolreplication, rolbypassrls, rolinherit from pg_roles where rolname='account_deletion_worker';
select count(*) worker_table_grants from information_schema.role_table_grants where grantee='account_deletion_worker';
select t, has_table_privilege('account_deletion_worker', t, 'SELECT') sel, has_table_privilege('account_deletion_worker', t, 'INSERT,UPDATE,DELETE') dml
from unnest(array['auth.users','storage.objects','private.account_deletion_requests','public.email_send_log','public.email_unsubscribe_tokens','public.suppressed_emails']) t;
\echo '== M5 email dispatcher definition checks'
select p.prosecdef secdef, p.proconfig::text cfg,
  pg_get_functiondef(p.oid) ilike '%X-Email-Queue-Token%' has_token, pg_get_functiondef(p.oid) ilike '%email_queue_invoke_secret%' reads_invoke,
  pg_get_functiondef(p.oid) ~* 'authorization|bearer|service_role' has_privileged,
  has_function_privilege('public', p.oid, 'EXECUTE') pub, has_function_privilege('anon', p.oid, 'EXECUTE') anon,
  has_function_privilege('authenticated', p.oid, 'EXECUTE') authn, has_function_privilege('service_role', p.oid, 'EXECUTE') svc,
  has_function_privilege('account_deletion_worker', p.oid, 'EXECUTE') worker
from pg_proc p where p.oid='public.email_queue_dispatch()'::regprocedure;
\echo '== cron jobs'
select jobid, jobname, schedule, active, md5(command) md5, command ~* 'authorization|bearer|service_role|apikey|sb_secret' privileged_text,
  command ilike '%email_queue_dispatch()%' calls_dispatch, command ilike '%X-N10-Worker-Token%' n10_token from cron.job order by jobid;
\echo '== M6 trigger and function'
select tgname, tgenabled, pg_get_triggerdef(t.oid) from pg_trigger t where tgrelid='auth.users'::regclass and not tgisinternal;
select prosecdef, proconfig::text, pg_get_userbyid(proowner) owner, prosrc ~* 'exception|warning' swallows from pg_proc where oid='private.n10_forget_email_records()'::regprocedure;
\echo '== M6 indexes'
select indexname, indexdef from pg_indexes where indexname in ('email_send_log_recipient_lower_idx','email_unsubscribe_tokens_email_lower_idx');
\echo '== Storage policies'
select count(*) filter (where policyname like 'n10 %') n10, count(*) total from pg_policies where schemaname='storage' and tablename='objects';
