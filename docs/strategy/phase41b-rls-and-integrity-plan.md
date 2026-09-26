# Phase 41B.0 — RLS and Integrity Plan

Design only. RLS changes made: 0.

## 1. RLS
- New policies: 4, on the one new table (`pregnancy_episodes`: select, insert, update, delete, each `user_id = auth.uid()`), created after grants to `authenticated` and `service_role` only, no `anon`.
- Existing policies changed: 0. Cross-owner linking on the 11 pregnancy tables and `babies` is prevented by composite FKs to `(id, user_id)`, so the existing `auth.uid()` policies (REPOSITORY-DEFINES, F10) stay sufficient.
- Policies requiring change total: 4 new, 0 modified.

## 2. New constraints = 9
1. `pregnancy_episodes` primary key `id`.
2. `pregnancy_episodes` unique `(id, user_id)` (target for composite FKs).
3. Partial unique: one `status = 'active'` episode per user.
4. CHECK `expected_count` null or 1 to 4.
5. CHECK `ended_at` null when `status = 'active'`, present otherwise (validated after backfill).
6. Composite FK `(pregnancy_episode_id, user_id)` on the 11 pregnancy tables and on `babies` (one rule applied to 12 tables).
7. Composite FK `journeys (active_pregnancy_episode_id, user_id)`.
8. CHECK on `journeys`: `lifecycle = 'pregnancy'` requires the pointer (tightening step).
9. Reflections: partial unique `(pregnancy_episode_id, week)` where bound, and `(user_id, week)` where unbound.

## 3. Constraints to remove or change = 5
1. Reflections unique `(user_id, week)`: replaced by constraint 9.
2. `first_year_memories.baby_id` SET NULL to RESTRICT.
3. `first_year_entries.baby_id` CASCADE to RESTRICT.
4. `first_year_care_events.baby_id` CASCADE to RESTRICT.
5. `first_year_reminders.baby_id` CASCADE to RESTRICT.
(Retiring the legacy `journeys` lifecycle values `ivf`, `postpartum` stays a separate handoff task.)

## 4. Database functions = 5
Replace: `save_pregnancy_journey` (create episode, reject over an active one, never touch ended ones, mirror to `pregnancy_journeys` during compatibility); `save_first_year_journey` (no delete; archive or update by id; link babies to the ended episode); `delete_active_journey` (end/archive instead of delete).
New: `end_pregnancy_episode` (status, outcome date, clear pointer); `delete_baby_permanently` (explicit memory decision, then delete).
All `SECURITY INVOKER` so RLS applies, matching the current First Year RPC.

## 5. Transactions
Every transition in the context contract is one function call, one transaction. Validation first, then writes; any failure rolls back the whole transition. The client never sequences multi-table writes itself.
