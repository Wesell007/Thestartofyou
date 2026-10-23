# 11 — Resolution with `persons_found = 0` (P8, fixture F `038445c5`)

Raw: `raw/09b-proofs-corrective.txt`. This corresponds to a user who never had an analytics person (analytics is consent-gated).

Method as in 10: the real `runAnalyticsErasure`, with the neutral-boundary result `{ ok: true, personsFound: 0 }` for F, run as the worker over the pooler.

| Check | Result |
|---|---|
| `analytics_status = resolved`, `analytics_persons_found = 0`, `analytics_resolved_at` set, error/attention/lease cleared (F had 5 earlier transient attempts; this was attempt 6) | PASS |
| `next_attempt_at` ≤ max(now, `final_sweep_after`) (F's was already earlier, 06:34:32, and `LEAST(...)` keeps it) | PASS on the designed semantics. The harness also asserted the value was ≥ the run start, which wrongly assumed "set to now"; `LEAST` correctly kept the earlier time. |
| No further `n10_analytics_due` claim for F (it does not retry because nobody was found) | PASS |
| Next worker tick → `completed`, `user_id` NULL | PASS |

**P8: PASS.** Zero persons found is a valid, terminal success.
