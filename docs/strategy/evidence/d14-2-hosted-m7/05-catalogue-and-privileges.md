# 05 — Catalogue and privileges (P3)

Raw: `raw/08-p1-p3.txt`, `raw/05-secdef.txt`, `raw/05-prosrc-hosted.txt`, `raw/05-function-body-diff.txt`, `raw/08-postgrest-schemas.txt`, `raw/14-final-state.txt`.

## Functions

| Function | SECURITY | `search_path` | Owner | Hosted body = committed M7 |
|---|---|---|---|---|
| `n10_analytics_guard` (trigger) | INVOKER | `""` | postgres | yes |
| `n10_analytics_due` | DEFINER | `""` | postgres | yes |
| `n10_record_analytics` | DEFINER | `""` | postgres | yes |
| `n10_record_purge` | DEFINER | `""` | postgres | yes |
| `n10_alerts_due` | DEFINER | `""` | postgres | yes |
| `n10_alerts_pending_count` | DEFINER | `""` | postgres | yes |

All 21 functions in `private` have `search_path = ""`, owner `postgres`, and **no PUBLIC EXECUTE** grant.

**Delta against the accepted semantics** (`raw/05-function-body-diff.txt`, hosted body vs committed M1/M4 body):

- `n10_record_purge` M1 → M7: one hunk only, inserted after the window check — `IF v_row.analytics_status <> 'resolved' THEN UPDATE … SET next_attempt_at = v_now + interval '15 minutes', lease_until = NULL …; RETURN 'awaiting_final_sweep'; END IF;` (plus its comment). Everything else identical.
- `n10_alerts_due` / `n10_alerts_pending_count` M4 → M7: the key/class/attempts are computed in a `keyed` CTE; for `auth_attention` / `purge_attention` rows they are exactly the M4 expressions (`status || ':' || last_error_class`, `last_error_class`, `attempt_count`); the only addition is the `analytics_attention:<analytics_last_error>` branch for `auth_deleted` / `awaiting_final_sweep` rows with pending analytics and `analytics_attention_since` set. Lease, backoff, dedup and 24 h escalation predicates unchanged.
- References inside the M7 bodies are schema-qualified (`private.…`, `auth.users`, `storage.objects`, `pg_catalog.…`), as required by `search_path = ""` (an unqualified reference would fail at run time, and every path was executed below).

## EXECUTE matrix over every `private` function

| Role | Result |
|---|---|
| PUBLIC | no EXECUTE on any function |
| anon | none |
| authenticated | only `account_media_access_allowed()` (M1 RLS helper, pre-existing) |
| service_role | none |
| `account_deletion_worker` | exactly **15**: `account_media_anomaly_count`, `account_media_canonical`, `auth_user_exists`, `n10_alerts_due`, `n10_alerts_pending_count`, **`n10_analytics_due`**, `n10_claim_due`, `n10_cleanup_completed`, `n10_confirm_auth_deleted`, `n10_open_request`, `n10_record_alert`, **`n10_record_analytics`**, `n10_record_failure`, `n10_record_purge`, `n10_release_lease` (M1 10 + M4 3 + M7 2) |

Not executable by anyone (internal): `account_deletion_requests_guard`, `n10_analytics_guard`, `n10_forget_email_records`, `n10_lock_leased`, `n10_retry_delay`.

## Worker role and exposure

- `account_deletion_worker`: SELECT/INSERT/UPDATE/DELETE on `private.account_deletion_requests` all **false**; LOGIN, **not** BYPASSRLS, not superuser, NOINHERIT, member of no role.
- Data API: `Accept-Profile: private` → **406 `PGRST106 Invalid schema: private`** for both anon and service_role, for the table and for an RPC (`raw/08-postgrest-schemas.txt`). (The scoped PAT may not read `/postgrest` config: 403; the behaviour was tested directly instead.)

**P3: PASS.**
