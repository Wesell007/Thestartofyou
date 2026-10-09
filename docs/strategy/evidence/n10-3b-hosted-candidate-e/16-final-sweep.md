# 16 — Final sweep and retention (§30, §31)

**Result: PASS.** Raw: `raw/16a-real-flow-completion-PS.txt`, `raw/30b-seeded-due-sweep-Q.txt`, `raw/31-retention.txt`, `raw/35-final*.txt`.

## A. REAL USER FLOW (no seeding)

| Request | `auth_deleted_at` | `final_sweep_after` | Gap | Outcome |
|---|---|---|---|---|
| P | 09:42:07.210 | 10:57:07.210 | 01:15:00 | **completed by live cron at 10:58:00.338** (first tick after the window); `user_id` NULL, `anonymised_at` set, anomalies 0 |
| S | 09:42:07.930 | 10:57:07.930 | 01:15:00 | **completed by live cron at 10:58:00.364**; anonymised |
| A | 10:01:10.998 | 11:16:10.998 | 01:15:00 | `awaiting_final_sweep` at the end of the run (window not reached) |
| B, F, D, T | — | 11:19–12:11 | 01:15:00 | `awaiting_final_sweep` (window not reached) |

Formula verified on every real deletion: `final_sweep_after = auth_deleted_at + max(W = 3600 s, 3600 s) + 15 min`. Early completion: **no request ever completed before its `final_sweep_after`** (`completed_at < final_sweep_after` count = 0); an explicit worker run immediately after Q's real deletion left it `awaiting_final_sweep`; about 75 cron runs passed over the waiting rows without completing any of them early.

## B. SEEDED DUE-WORKER CASE (SYNTHETIC — clearly not the real flow)

Q was deleted through the real `delete-account` flow (200 `removed`), then **privileged rehearsal setup** shifted its timestamps 3 hours into the past in one transaction (`ALTER TABLE … DISABLE TRIGGER account_deletion_requests_guard; UPDATE …; ENABLE TRIGGER …; COMMIT`). No constraint was altered: the gap stayed exactly 01:15:00 and every M1 CHECK applied; the guard trigger was verified re-enabled (`tgenabled = O`). One late canonical object was added through the Storage API. Worker invocation → `{"ok":true}`:

`status = completed`, `completed_at` set, `user_id` NULL, `anonymised_at` set, `anomaly_count = 0`, `sweep_objects_removed = 1`, canonical media 0, no row left with Q's user id.

## §31 Retention (functional only; 30 days is D14-proposed, not approved)

Synthetic rows: L completed recently (seeded the same way), Q's completed row aged 31 days (privileged setup, trigger re-enabled). Worker run with `N10_COMPLETED_ROW_RETENTION_DAYS = 30`: the >30-day completed anonymised row (Q) was **deleted**; the recent completed row (L) **kept**; every active / non-anonymised row (6 `awaiting_final_sweep`, 1 `purge_attention`) **kept**. Non-anonymised completed rows cannot exist (M1 CHECK `anonymised ⇔ user_id NULL`).
