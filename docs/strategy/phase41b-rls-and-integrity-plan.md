# Phase 41B.0 — RLS and Integrity Plan

Design only. RLS changes made: 0.

## 1. RLS

### 1.1 Current policies (CURRENT POLICY = VERIFIED-PRODUCTION-STRUCTURE, read from `pg_policies` on 2026-09-26; structure only, 0 customer rows)
All 18 affected existing tables have exactly 4 policies (SELECT, INSERT, UPDATE, DELETE), all PERMISSIVE, one per command, so there is no combination to resolve. Every expression is `(auth.uid() = user_id)`.

| Group | Tables | Roles | SELECT USING | INSERT WITH CHECK | UPDATE USING | UPDATE WITH CHECK | DELETE USING |
|---|---|---|---|---|---|---|---|
| A | baby_movement_notes, birth_plans, contraction_events, contraction_sessions, hospital_bag_items, midwife_questions, pregnancy_appointments, pregnancy_symptom_notes, week_media_memories, babies, first_year_entries, first_year_care_events, first_year_memories, first_year_reminders | authenticated | owner | owner | owner | owner (explicit) | owner |
| B | reflections, week_photos, journeys, pregnancy_journeys | public | owner | owner | owner | none written | owner |

Group B notes:
- UPDATE has no explicit WITH CHECK. For UPDATE policies Postgres uses the USING expression as the new-row check when WITH CHECK is omitted, so the edited row must still satisfy `auth.uid() = user_id`. Recorded explicitly; ownership cannot be moved.
- Role `public` includes `anon`, but `auth.uid()` is null for anonymous requests, so no row matches. Owner-scoped in effect.

### 1.2 Per-table effective answers (all 18 tables)
VIEW OWNER-SCOPED = YES. ADD NEW-ROW OWNERSHIP PROTECTED = YES (INSERT WITH CHECK). EDIT EXISTING-ROW OWNERSHIP PROTECTED = YES. EDIT RESULTING-ROW OWNERSHIP PROTECTED = YES (explicit in group A; USING fallback in group B). DELETE OWNER-SCOPED = YES.

### 1.3 Why existing policies stay valid
Policies only guarantee `user_id = auth.uid()` on the row. They cannot stop a row pointing at another user's episode or baby. That is handled by the composite foreign keys in section 2 (TARGET COMPOSITE OWNERSHIP CONTROL = DESIGN-ADDRESSED / IMPLEMENTATION REQUIRED IN 41B.1). Row owner fixed by policy + referenced entity owner equal to row owner by composite FK = same-user chain. Today, baby ownership is checked only by validation triggers on entries, care events, memories and reminders (REPOSITORY-DEFINES); `babies` has only `PRIMARY KEY (id)` and no `(id, user_id)` unique (VERIFIED-PRODUCTION-STRUCTURE).

Optional links: `baby_id` is intentionally nullable on entries (parent lane), memories (family / all_babies scope) and reminders. Composite FKs use default MATCH SIMPLE, so they apply only when `baby_id` is set; when null, the row is protected by its owner policy. `pregnancy_episode_id` is nullable for unbound legacy rows in the same way.

- New policies: 4 on 1 new table (`pregnancy_episodes`, each `auth.uid() = user_id`, role authenticated, explicit WITH CHECK on INSERT and UPDATE).
- Existing policies requiring modification: 0.

## 2. Constraint ledger (every row TARGET ONLY = YES; nothing is live)

Episode composite ownership links = 13. Tables: reflections, week_photos, week_media_memories, pregnancy_appointments, pregnancy_symptom_notes, baby_movement_notes, birth_plans, hospital_bag_items, midwife_questions, contraction_sessions, contraction_events, babies, journeys. (Reconciled: the migration plan now names the `babies` and `journeys` links that this plan already had.)

| # | Constraint | Table | Purpose | Previously counted | Newly added |
|---|---|---|---|---|---|
| 1 | PRIMARY KEY (id) | pregnancy_episodes | episode identity | YES | NO |
| 2 | UNIQUE (id, user_id) | pregnancy_episodes | target for episode composite FKs | YES | NO |
| 3 | partial UNIQUE (user_id) where status = 'active' | pregnancy_episodes | one active pregnancy | YES | NO |
| 4 | CHECK expected_count null or 1 to 4 | pregnancy_episodes | multiples cap | YES | NO |
| 5 | CHECK ended_at matches status | pregnancy_episodes | ended state integrity | YES | NO |
| 6 to 16 | FK (pregnancy_episode_id, user_id) | the 11 pregnancy tables, one each | same-user episode link | YES (grouped) | NO |
| 17 | FK (pregnancy_episode_id, user_id) | babies | same-user child to pregnancy link | YES (grouped) | NO |
| 18 | FK (active_pregnancy_episode_id, user_id) | journeys | same-user context pointer | YES | NO |
| 19 | CHECK lifecycle = 'pregnancy' requires pointer | journeys | context integrity | YES | NO |
| 20 | partial UNIQUE (pregnancy_episode_id, week) where bound | reflections | one reflection per week per pregnancy | YES (grouped) | NO |
| 21 | partial UNIQUE (user_id, week) where unbound | reflections | legacy rows keep current rule | YES (grouped) | NO |
| 22 | UNIQUE (id, user_id) | babies | target for baby composite FKs | NO | YES |
| 23 | FK (baby_id, user_id) ON DELETE RESTRICT | first_year_entries | same-user baby link | NO | YES |
| 24 | FK (baby_id, user_id) ON DELETE RESTRICT | first_year_care_events | same-user baby link | NO | YES |
| 25 | FK (baby_id, user_id) ON DELETE RESTRICT | first_year_memories | same-user baby link | NO | YES |
| 26 | FK (baby_id, user_id) ON DELETE RESTRICT | first_year_reminders | same-user baby link | NO | YES |

New constraints proposed = 26 (21 previously designed, counted per table; 5 newly added).

## 3. Constraints changed / removed = 5
1. Remove `reflections_user_id_week_key` UNIQUE (user_id, week); replaced by rows 20 and 21.
2. Drop `first_year_entries_baby_id_fkey` (CASCADE); replaced by row 23.
3. Drop `first_year_care_events` single-column baby FK (CASCADE); replaced by row 24.
4. Drop `first_year_memories_baby_id_fkey` (SET NULL); replaced by row 25.
5. Drop `first_year_reminders` single-column baby FK (CASCADE); replaced by row 26.
Additions and removals are counted separately; each replacement FK is counted once as new (rows 23 to 26) and the old FK once as removed.
(Retiring legacy `journeys` lifecycle values `ivf`, `postpartum` stays a separate handoff task.)

## 4. Database functions = 5
Replace: `save_pregnancy_journey` (create episode, reject over an active one, never touch ended ones, mirror to `pregnancy_journeys` during compatibility); `save_first_year_journey` (no delete; archive or update by id; link babies to the ended episode); `delete_active_journey` (end/archive instead of delete).
New: `end_pregnancy_episode` (status, outcome date, clear pointer); `delete_baby_permanently` (explicit memory decision, then delete).
All `SECURITY INVOKER` so RLS applies, matching the current First Year RPC.

## 5. Transactions
Every transition in the context contract is one function call, one transaction. Validation first, then writes; any failure rolls back the whole transition. The client never sequences multi-table writes itself.
