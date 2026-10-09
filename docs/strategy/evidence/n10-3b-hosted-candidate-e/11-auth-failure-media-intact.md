# 11 — Forced Auth failure — F (§25)

**Result: PASS. ZERO media removed while Auth deletion failed.** Raw: `raw/25-forced-auth-failure-F-*.txt`.

**FAILURE INJECTION ONLY:** scratch table `n103b_rehearsal.f_blocker (user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT)` with one row for F. No N10 migration was changed. (A first attempt to create it failed on a non-ASCII character in the table comment; the multi-statement command ran as one implicit transaction and nothing was created — verified before retrying.)

| Step | Time (UTC) | Observed |
|---|---|---|
| F0 | 10:02:2x | blocker created; F downloaded one object (CDN seed) and issued a 3,600 s signed URL |
| F1 `delete-account` | 10:02:21.8 | **HTTP 202** `{"status":"deletion_in_progress"}` in 0.9 s — truthful; never 200 |
| F2 | 10:02:2x | Auth user **exists**; request `requested`, `last_error_class = auth_transient`, `attempt_count = 1`, next attempt +1 min (10:03:20.9); exactly the 4 original objects, **all byte-identical**; pre-issued signed URL still serves (D15 accepted residual while Auth deletion has failed) |
| live cron retry | 10:04:00 | failed again: `attempt_count = 2`, next +2 min (10:06:01.9) — D4 backoff 1, 2, … |
| observe | 10:03:40 and 10:04:29 | Auth present; still pre-Auth; 4 objects byte-identical; control C unchanged |
| F3 release | 10:04:35 | blocker dropped; no `f_blocker` remains |
| live cron | 10:07:00 | Auth deleted (`auth_deleted_at` 10:07:00.57), purge (`purge_empty_at` 10:07:01.73), `awaiting_final_sweep`, 4 removed |
| post-purge | 10:07:04–05 | F's cached download and pre-issued signed URL stopped serving (15) |

N10-E1 (no media deletion while the Auth user exists) held throughout: the purge functions refuse while the Auth row exists, and the hosted observation shows zero removals across three failed Auth attempts.
