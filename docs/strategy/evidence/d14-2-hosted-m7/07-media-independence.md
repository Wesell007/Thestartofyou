# 07 — Media independence (P2, P5)

Raw: `raw/09-proofs-p2-p8.txt` (run 1), `raw/09b-proofs-corrective.txt` (run 2). Real sealed module, worker over the pooler, real GoTrue + Storage API.

## Pre-M7 fixtures after M7 (P2)

| Check | Result |
|---|---|
| `n10_analytics_due` right after M7 claims nothing (B, C < `auth_deleted_at` + 15 min; D `requested`; E `auth_attention`; A `completed`) | PASS (0 claimed) |
| Real `runWorker` tick: **B** purges its 3 remaining objects and moves `auth_deleted → awaiting_final_sweep` while `analytics_status = pending` | PASS (`objects_removed = 3`, media 0, `user_id` kept) |
| Same tick: **D** `requested` → real Auth deletion → purge → `awaiting_final_sweep`; analytics still `pending` (media path did not wait for analytics) | PASS |
| **E** untouched: `auth_attention`, Auth user + 2 objects present, analytics `pending` | PASS |
| **A** (`not_tracked`) never claimed; still removed by the 30-day retention cleanup once `anonymised_at` is older than 30 days (time-shifted) | PASS in run 2 (run 1 shifted `completed_at` instead of `anonymised_at` — harness error; cleanup correctly removed 0) |

## Fresh request through the real flow (P5, fixture F `038445c5`)

| Check | Result |
|---|---|
| `runDeleteAccount` → **200 `account_deleted / removed`**; both canonical objects removed immediately; `awaiting_final_sweep`; `analytics_status = pending` | PASS |
| After the window (time-shift −2 h) and recorded `analytics_transient` failures (attempts 1–5), each worker tick leaves F `awaiting_final_sweep`, `user_id` present, `completed_at` / `anonymised_at` NULL; `objects_removed`, `sweep_objects_removed`, `purge_empty_at` and media count unchanged across the tick (no backwards movement); no attention while < 24 h | PASS ×2 (run 2). Run 1's two FAILs compared `purge_empty_at` with its value **before** the harness's own −2 h shift — harness error; the state itself matched (`awaiting_final_sweep`, user kept, not completed) |

Media purge and media state transitions never depended on analytics; analytics failures never moved media state backwards.

**Media independence: PASS.**
