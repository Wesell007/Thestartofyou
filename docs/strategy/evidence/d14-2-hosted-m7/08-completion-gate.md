# 08 — Completion gate (P5)

Raw: `raw/09-proofs-p2-p8.txt`, `raw/09b-proofs-corrective.txt`.

## Layer 1 — the legitimate path (`n10_record_purge`, worker, valid lease)

| Row | Condition | Worker ticks | Result |
|---|---|---|---|
| C (pre-M7 fixture) | window passed (time-shift), media empty, analytics `pending` | 2 | `awaiting_final_sweep` both times, `next_attempt_at` ≈ **+15.0 min**, `user_id` kept, `completed_at` / `anonymised_at` NULL — PASS |
| F (fresh) | window passed, media empty, analytics `pending` after transient failures | 2 (+2 in run 1) | same — PASS |

## Layers 2 and 3 — direct owner writes on F (Auth deleted, window passed, media empty, analytics pending), each in a rolled-back transaction

| Attempt | Refused by | Result |
|---|---|---|
| `status='completed', completed_at, user_id=NULL, anonymised_at` with triggers on | `n10_analytics_guard`: *user_id kept until analytics erasure is resolved* | **23514** PASS |
| the same with `DISABLE TRIGGER USER` | CHECK `account_deletion_requests_analytics_completed_check` | **23514** PASS |
| `user_id=NULL, anonymised_at` without completion | M1 guard: *user_id may only be nulled at completion* | **23514** PASS |
| `analytics_status='not_tracked'` | `n10_analytics_guard`: *invalid analytics transition pending -> not_tracked* | **23514** PASS |
| `analytics_status='resolved'` on E (Auth user still exists) | `n10_analytics_guard`: *analytics erasure resolves only after Auth deletion* | **23514** PASS |
| F unchanged afterwards | — | PASS |

The worker itself cannot attempt any of these: direct `UPDATE` as the worker → **42501** (06).

**Deviation from P5 (recorded as observed):** P5 predicted that a direct `resolved` write is always refused. As the table **owner**, `analytics_status = 'resolved'` (with `analytics_resolved_at` and `analytics_persons_found`) on F, whose Auth user is confirmed absent, was **accepted** by the trigger and CHECKs, and then rolled back by the harness. This is the designed `pending → resolved` transition; the guard refuses it only before Auth deletion, which the E case above proves. Outside the owner, the only path to `resolved` is `n10_record_analytics`, which requires a valid worker analytics lease. Only `postgres` holds table privileges, and it can disable triggers anyway, so this is not a new exposure. It does mean the prediction was worded too strongly.

**Completion gate: PASS.** Unresolved analytics blocked `COMPLETED` and blocked `user_id` clearing at all three layers.
