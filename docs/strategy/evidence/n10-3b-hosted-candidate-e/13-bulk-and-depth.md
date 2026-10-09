# 13 — Bulk, depth and both buckets — B (§27)

**Result: PASS.** Raw: `raw/27a-bulk-fixtures-B.txt`, `raw/27b-bulk-delete-B.txt`, `raw/27c-storage-logs-B-window.json`, `raw/27d-storage-remove-calls-B.json`.

| Fixture (supported Storage API only) | Count |
|---|---|
| `weekly-photos/<B>/bulk/obj-NNNN.jpg` (one folder, user JWT) | 1,050 |
| `first-year-memories/<B>/l1/…/l7/deep-NNN.jpg` (9 path segments, user JWT) | 60 |
| service-role canonical objects (`<B>/svc/…`, one 7 segments deep) | 2 — hosted Storage recorded **`owner_id` NULL** for both |
| **Total canonical** | **1,112** |

| Deletion through the N10 workflow (`delete-account`, 10:04:54Z) | Observed |
|---|---|
| Response | **200** `{"status":"account_deleted","cleanup":"removed"}` in 10.3 s (all inside the immediate-purge budget) |
| Remove calls (Storage logs, `DELETE /object/<bucket>`) | **3**: `first-year-memories` (61), `weekly-photos` (1,000), `weekly-photos` (51) — more than one batch, each ≤ 1,000 names |
| `ObjectRemoved` lifecycle events | **1,112** |
| Remaining canonical objects | **0** (re-query-until-empty; no 1,000-object ceiling, no OFFSET skip, no fixed-depth failure) |
| `objects_removed` | 1,112 |
| State | `awaiting_final_sweep`; Auth absent |
| NULL-owner service-role objects | purged (rule A: path, not `owner_id`) |
| Control C | untouched |
