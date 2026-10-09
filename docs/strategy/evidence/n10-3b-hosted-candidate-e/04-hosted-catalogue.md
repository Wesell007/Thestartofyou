# 04 — Hosted catalogue contract (§10)

**Result: PASS.** Read from the real hosted catalogue after the 49 migrations (`raw/10-catalogue.txt`, query `raw/10_catalogue.sql`); re-read at the end of the run (`raw/35-catalogue-final.txt`) and **identical** except the cron job (replaced by M3, see 17).

## M1

| Contract item | Hosted |
|---|---|
| `private` schema | owner `postgres`; ACL `postgres=UC`, `authenticated=U`, `account_deletion_worker=U`; no PUBLIC |
| `private.account_deletion_requests` | owner `postgres`; **RLS on**; ACL `postgres` only (no grants to PUBLIC, anon, authenticated, service_role or the worker) |
| FK to `auth.users` | **0 foreign keys** |
| CHECKs | status (7 states), error class (10), counters ≥ 0, post-Auth requires `auth_deleted_at` + `final_sweep_after`, sweep floor `final_sweep_after ≥ auth_deleted_at + 01:15:00`, strict completed, anonymised ⇔ `user_id` NULL, anonymised ⇒ completed |
| Indexes | `one_active_idx` UNIQUE (`user_id`) WHERE status NOT IN (completed, cancelled); `claim_idx` (status, next_attempt_at); pkey |
| Policies on the request table | 0 (function-only surface) |
| Guard trigger | `account_deletion_requests_guard` BEFORE INSERT/UPDATE/DELETE, SECURITY INVOKER |
| `account_deletion_worker` | LOGIN yes; SUPERUSER, CREATEDB, CREATEROLE, REPLICATION, BYPASSRLS all **no**; NOINHERIT; member of no role |
| Worker table privileges | none anywhere (incl. `auth.users`, `storage.objects`, `storage.buckets`, the request table, every `public` table) |
| Private functions | 14; all `search_path=""`; owner `postgres`; 12 SECURITY DEFINER + trigger + `n10_retry_delay` INVOKER |
| EXECUTE | worker: exactly the 10 frozen functions; `authenticated`: only `account_media_access_allowed`; PUBLIC/anon/service_role: none; `n10_lock_leased`, `n10_retry_delay`, the trigger function: nobody but `postgres` |
| Storage policies | exactly the 8 `n10 …` policies on `storage.objects`, all `TO authenticated`, all guarded by `private.account_media_access_allowed()`; both UPDATE policies have USING **and** WITH CHECK; no policies on `storage.buckets` |

## M2 (as applied, before M3)

`n10-account-deletion-worker`, `* * * * *`, user `postgres`, active. With Vault empty it ran 54 times (`succeeded`) and pg_net received **0** requests: the missing-secret no-op holds. M3 later replaced the command (05, 17).
