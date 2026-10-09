# 12 — Duplicate requests and leases — D, L (§26)

**Result: PASS.** Real concurrent `account_deletion_worker` sessions through the Supavisor transaction pooler. Raw: `raw/26-duplicate-lease-D.txt`, `raw/26b-skip-locked-L.txt`.

| Proof | Observed |
|---|---|
| D1 two simultaneous `n10_open_request(D, 30)` | same request id for both; exactly **one** active row; lease acquired by exactly one caller (`t` / `f`) |
| D4 duplicate `delete-account` during the live lease | **202** `deletion_in_progress`; still one row; Auth and media untouched |
| D2 live lease | `n10_claim_due` returned nothing |
| D3 expired lease | reclaimed — by the live cron worker at 10:08:00, which then processed D (Auth deleted, 4 removed, `awaiting_final_sweep`) |
| D4b replay after deletion | `delete-account` with D's stale JWT → **410** `{"status":"already_deleted"}`; still exactly one D row |
| SKIP LOCKED (L, timed between cron ticks) | session 1 `begin; n10_claim_due(50, 30); pg_sleep(8); commit` claimed L (1 row); session 2 started 2.5 s later while the row was locked → **0 rows** |
| Live lease across a cron tick | L's new lease (until 10:11:07) covered the 10:11:00 tick; L stayed `requested`, Auth present |
| Expired lease reclaimable | explicit claim after expiry returned L |

**Test-design note (not a product failure):** the first SKIP LOCKED attempt on D collided with the 10:08:00 cron tick — D's 30 s lease had just expired and cron legitimately took it — so the race was repeated on a fresh synthetic user L aligned between ticks. The harness's final "release" step tried to look up the request id by reading the request table **as the worker** and was refused (`permission denied for table account_deletion_requests`) — an additional least-privilege confirmation; L's lease simply expired and cron processed it.
