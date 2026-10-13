# 03 — Catalogue and privilege gate (M4, M5, M6)

**Result: PASS.** Raw: `raw/03-catalogue.txt`, `raw/10-worker-probes.txt`.

| Check | Hosted |
|---|---|
| M4 columns | `alert_key`, `alert_sent_at`, `alert_escalated_at`, `alert_failure_count` (NOT NULL default 0), `alert_next_attempt_at`, `alert_lease_until`; CHECKs `alert_failures_check`, `alert_key_check` |
| Private functions (18) | all `search_path=""`, owner `postgres`; PUBLIC/anon/service_role EXECUTE: **none**; `authenticated`: only `account_media_access_allowed`; worker: exactly the 10 N10 functions + `n10_alerts_due`, `n10_record_alert`, `n10_alerts_pending_count`; nobody else: `n10_lock_leased`, `n10_retry_delay`, guard trigger, `n10_forget_email_records` |
| Worker role | LOGIN; no SUPERUSER/CREATEDB/CREATEROLE/REPLICATION/BYPASSRLS; NOINHERIT; 0 table grants; no SELECT/DML on `auth.users`, `storage.objects`, the request table, `email_send_log`, `email_unsubscribe_tokens`, `suppressed_emails` |
| M5 `public.email_queue_dispatch()` | SECURITY DEFINER, `search_path=""`; definition contains `X-Email-Queue-Token` and `email_queue_invoke_secret`, **no** `Authorization`/`Bearer`/`service_role`; EXECUTE: `service_role` only (historical), not the worker, not PUBLIC/anon/authenticated |
| Cron | `n10-account-deletion-worker` (`* * * * *`, M3 md5 `c50c35f6…`) and `process-email-queue` (`5 seconds`, M5 md5 `4647b2a0…`); neither contains `authorization|bearer|service_role|apikey|sb_secret` |
| M6 | trigger `n10_forget_email_records AFTER DELETE ON auth.users FOR EACH ROW`, enabled; function SECURITY DEFINER, `search_path=""`, owner `postgres`; **no `EXCEPTION WHEN` clause, no `RAISE WARNING`** (a first naive regex matched the word "exception" in the function's comment; the clause-level check is authoritative); indexes `email_send_log_recipient_lower_idx`, `email_unsubscribe_tokens_email_lower_idx` |
| Storage policies | exactly the 8 guarded `n10 …` policies |
| Data API | PostgREST answers `PGRST106 "Only the following schemas are exposed: public, graphql_public"` for both `private` and `net` (the PAT could not read the PostgREST config, so this was proven behaviourally) |

Worker-role probes through the real pooler: 13 denials (Auth, Storage, request table, profiles, the three e-mail tables, e-mail DELETE, Vault, cron, `n10_lock_leased`, `n10_forget_email_records`, `email_queue_dispatch`); allowed N10 functions work; pg_net enqueue still possible (10).
