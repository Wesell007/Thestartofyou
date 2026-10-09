# 20 — Final catalogue and cleanup (§35)

**Result: PASS.** Raw: `raw/35-catalogue-final.txt`, `raw/35-catalogue-final-2.txt`, `raw/35-final-first.txt`, `raw/35-final.txt`.

| Check | Final state (11:00Z) |
|---|---|
| Scratch objects | `n103b_rehearsal` schema (guard marker), `f_blocker`, `t_blocker`: **none remain** (the marker schema was dropped at 10:26, recreated at 10:28 for the T measurement, dropped again at 11:00) |
| Migrations | 50; max `20261009091430`; M1/M2/M3 files unchanged (sealed copy clean; M1/M2 hashes pinned by the local tests) |
| Catalogue vs pre-run | schema, table, CHECKs, indexes, guard trigger, role attributes, all grants, function ACLs, 8 Storage policies: **identical** (only difference: the dropped scratch schema no longer appears in the worker's schema-usage list) |
| Storage policies | exactly the 8 guarded `n10 …` policies; no others on `storage.objects` |
| Cron | exactly one job (M3, md5 `c50c35f6…`); Vault names: URL + invoke secret only |
| Worker role | LOGIN, no SUPERUSER/CREATEDB/CREATEROLE/REPLICATION/BYPASSRLS; grants unchanged |
| Buckets | `first-year-memories`, `weekly-photos`, both private |
| Storage SQL mutation | none — every object change used the Storage API |
| Control C | Auth user, 4 objects (byte-identical), app rows (1, 1), no request row — unchanged |
| Remaining rehearsal data (kept for owner review) | synthetic users C (+ requests in `awaiting_final_sweep` for A, B, F, D, T; `purge_attention` for N with its anomaly object `misfiled/n103b-moved-…`; one copied NULL-owner object `misfiled/n103b-copied-…`; completed rows P, S, L) |
| Local | 41B.1A frozen hashes unchanged (forward `e6ad0bc8…`, validate `8645fd67…`, rollback `0d008955…`) |

Not done (by instruction): project teardown, PAT revocation, deletion of `.n103b`.
