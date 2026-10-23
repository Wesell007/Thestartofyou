# 09 — Analytics claim / lease (P6)

Raw: `raw/09-proofs-p2-p8.txt`, `raw/09b-proofs-corrective.txt`. All calls as `account_deletion_worker` over the pooler.

| Check | Result |
|---|---|
| Not claimable before `auth_deleted_at` + 15 min: B/C right after M7, and **G** (`b4db08f9`) immediately after its real `runDeleteAccount` | PASS |
| Claimable after the delay: G after `auth_deleted_at` was shifted −16 min | PASS |
| Two concurrent worker connections (`Promise.all`, separate Postgres.js clients) call `n10_analytics_due(10,120)`: **exactly one** receives G (conn1 = 1, conn2 = 0) | PASS |
| Media lease (`n10_claim_due`) and analytics lease (`n10_analytics_due`) held **on the same row at the same time** (F: `lease_until` and `analytics_lease_until` both set) | PASS in run 2. Run 1 FAIL was a harness error: it shifted only G's `next_attempt_at`, but `n10_claim_due` (unchanged M1) only claims `awaiting_final_sweep` after `final_sweep_after` |
| Wrong lease → `n10_record_analytics` **55000** *analytics lease or state mismatch* | PASS |
| An Auth user with the **same id** re-created through GoTrue admin (`POST /auth/v1/admin/users` with `id`, 200, same id) → recording `resolved` with the valid lease → **23514** *analytics erasure resolves only after Auth deletion*; the re-created user was then deleted again | PASS |
| Valid lease → `resolved` (G, `persons_found = 1`) | PASS |

Lease expiry semantics were also observed unintentionally. In run 1 an over-broad claim in the "G not claimable" check also leased C for 120 s (until 06:36:11). Run 2's `runAnalyticsErasure` at 06:36:04 correctly **skipped** C because its lease was still live. C was processed as soon as the lease expired (10). Harness sequencing caused this; it is not a product defect.

**P6: PASS.**
