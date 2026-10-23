# 10 — Resolution with `persons_found = 1` (P7, fixture C `74af678e`)

Raw: `raw/09c-proofs-p7-rerun.txt`, `raw/09d-p7-dbclock.txt`.

Method: the real `runAnalyticsErasure` from the sealed module, as the worker over the pooler. The provider result is simulated **only at the neutral `AnalyticsEraser` boundary**: a harness function returning `{ ok: true, personsFound: 1 }` for C's distinct id. It is not production source, and the PostHog adapter and host allow-list are untouched. The result was recorded through the worker-only `n10_record_analytics` with the valid lease that `n10_analytics_due` issued.

| Check | Result |
|---|---|
| `runAnalyticsErasure` → `{resolved: 1, failed: 0, attention: 0}`; log `n10_analytics_erasure_resolved {request_id}` | PASS |
| `analytics_status = resolved`, `analytics_resolved_at` set, `analytics_persons_found = 1`, `analytics_last_error` / `analytics_attention_since` / lease NULL | PASS |
| Final sweep brought forward: `next_attempt_at` 06:49:10 (gate +15 min) → **06:36:46.655**, which equals `analytics_resolved_at` (same-transaction `now()`) and is ≥ `final_sweep_after` | PASS (in database time) |
| Next legitimate worker tick → `completed`; `completed_at`, `anonymised_at` set; `user_id` NULL | PASS |

The bring-forward condition first reported FAIL because the harness compared the database timestamp with the **local** clock (`<= Date.now()`), and the database clock ran ≈50 ms ahead. Re-evaluated in database time, `next_attempt_at = analytics_resolved_at` → **true** (`raw/09d-p7-dbclock.txt`). Run 2's P7 FAIL is explained in 09 (C still leased).

Earlier, G (`b4db08f9`) was also resolved with `persons_found = 1` through the same helper (09). It stays `awaiting_final_sweep` because its real window has not been reached; resolution never short-circuits the window.

**P7 / goal G: PASS.** Successful resolution unlocked completion, and only then were `user_id` cleared and `anonymised_at` set.
