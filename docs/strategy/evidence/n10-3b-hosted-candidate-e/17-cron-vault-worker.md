# 17 — Vault, cron and worker invocation (§18)

**Result: PASS.** Raw: `raw/18-vault-enable.txt`, `raw/M3-00/03-*`, `raw/35-catalogue-final.txt`, `raw/34-secret-audit.txt`.

| Item | Observed |
|---|---|
| Schedule (after M3) | one job `n10-account-deletion-worker` (jobid 2), `* * * * *`, user `postgres`, active; command md5 `c50c35f686a32ac33e2d055928a5c6d2`; reads only `n10_account_deletion_worker_url` and `n10_account_deletion_worker_invoke_secret` |
| No-op while Vault empty | M2 job: 54 runs, 0 pg_net requests; M3 job: 12 runs (09:32–09:43), 0 pg_net requests |
| Vault population | 09:43:07.66Z, values passed as psql bind parameters (never in statement text or output); Vault names afterwards exactly `n10_account_deletion_worker_invoke_secret`, `n10_account_deletion_worker_url`; superseded `n10_account_deletion_worker_service_key` **absent** |
| Cadence | every minute from 09:44:00 onwards; all runs `succeeded` (54 for jobid 2 by 10:25) |
| pg_net → worker | every `net._http_response` is HTTP **200** with body exactly `{"ok":true}`; no timeouts, no error messages |
| Worker behaviour under cron | processed F after its blocker was removed (10:07:00), D after lease expiry (10:08:00), L after its lease expired; retried F at the D4 backoff (10:04, then +2 min); left `awaiting_final_sweep` rows alone until their windows (16) |
| Credential exposure | cron command, run history and pg_net responses: 0 literal credential hits, 0 credential-shaped values (19) |
| Leases / retries | see 11 (backoff 1, 2 min; `auth_transient`) and 12 (SKIP LOCKED, lease expiry, live lease across a tick) |

M2 was not modified; M3 replaced the effective job (05).
