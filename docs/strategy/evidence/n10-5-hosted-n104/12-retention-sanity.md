# 12 — Final-sweep and retention sanity

**Result: PASS.** Raw: `raw/12-retention-sanity.txt`.

- With the live cron running for the whole session: **no request completed before its `final_sweep_after`**; the real-flow rows (windows ending 00:57Z and 01:01Z) were still `awaiting_final_sweep` at 23:51Z.
- **SYNTHETIC** completed anonymised row (NORM's row, privileged setup: guard trigger disabled inside one transaction, re-enabled and verified `O`; all CHECK constraints in force).
- As the worker role: `n10_cleanup_completed(30)` → 0 removed (fresh row kept); `n10_cleanup_completed(0)` → **1 removed** (D14 option C works on hosted Postgres); `n10_cleanup_completed(-1)` → rejected (`invalid retention`); active rows untouched.

**D14 remains OPEN.** 30-day and 0-day behaviour is technically proven, not legally approved.
