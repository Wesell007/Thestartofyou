\pset format unaligned
\pset tuples_only on
\pset recordsep '\n<<<END>>>\n'
\pset fieldsep '\n<<<SRC>>>\n'
select p.proname, p.prosrc from pg_proc p join pg_namespace n on n.oid=p.pronamespace where n.nspname='private' and p.proname in ('n10_record_purge','n10_alerts_due','n10_alerts_pending_count','n10_analytics_due','n10_record_analytics','n10_analytics_guard') order by 1;
