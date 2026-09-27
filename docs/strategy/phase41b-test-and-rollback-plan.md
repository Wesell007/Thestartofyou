# Phase 41B.0 — Test and Rollback Plan

Design only. Nothing below has run.

## 1. 41B.1 tests
Database (against a non-production copy):
- A second pregnancy creates a new episode; the ended one keeps status, outcome and records.
- Saving over an active pregnancy is rejected.
- A second First Year setup archives, never deletes; entries, care events, reminders and memories all survive.
- Baby delete is blocked while baby-scoped memories exist; the permanent-delete function handles them explicitly.
- A row cannot reference another user's episode (composite FK).
- Backfill is idempotent; row counts before and after match; ambiguous rows remain unbound.
- Account Deletion Integrity Test (application gate, non-customer fixture: user, pregnancy episode, episode-bound record, linked baby, First Year child-bound record where applicable): deleting the episode alone is blocked where protected dependants exist; whole-account deletion removes or processes all owned data in the required order; no orphaned pregnancy, child or journey records; no other user's data touched. If RESTRICT blocks account deletion, stop the release and redesign the deletion order.

Client (Vitest, Supabase mocked at the boundary): each of the 17 write paths sends or receives the active episode; missing episode means no write.

Context resolver: pointer to ended episode gives `null`; several episodes never pick one by date; two babies without one primary give no age; unbound legacy rows never enter context.

Regression: the 30-file / 249-test Phase 41A baseline, typecheck, lint, build.

Playwright: pregnancy setup, birth to First Year, second pregnancy from First Year, past chapters.

## 2. Rollback per step
| Step | Rollback |
|---|---|
| 1 New table | drop it (no reads depend on it yet) |
| 2 Backfill | delete backfilled episodes by a batch marker; source rows untouched |
| 3 Nullable columns | drop columns; old reads never used them |
| 4 Compatibility mirror | keep; it is the old table |
| 5 Write paths | redeploy previous functions and client; mirror keeps old reads valid |
| 6 Resolver | revert module; 41A safeguards still hold |
| 8 Tightening | drop the added constraints; restore previous FK rules |
| 9 Retirement | only after a full release cycle with no rollback |
Steps 1 to 6 are reversible without data loss. Step 8 onwards needs a fresh backup.

## 3. Production preconditions
- Point-in-time backup confirmed before steps 2 and 8.
- Structure-only catalog check matches the repository (no customer rows read).
- Backfill run first on a copy; only aggregate counts reported.
- Explicit approval for each production migration; no deployment implied by this design.
- Account Deletion Integrity Test passes on a non-production copy before release.

## 4. Query and index review
- Index `(user_id, status)` on episodes; the partial unique covers active lookups.
- Index `(pregnancy_episode_id)` on each of the 11 tables and on `babies`.
- Reflections look-ups use the new partial unique indexes.
- Resolver stays at two round trips (pointer, then episode or babies).
