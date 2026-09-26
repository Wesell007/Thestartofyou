# Phase 41B.0 — Family Entity Target Model

Design only (Lovable architecture and migration design). Nothing here is implemented. Baseline: the closed Phase 41A documents (Outcome D).

Evidence labels: REPOSITORY-DEFINES (migration or source file), VERIFIED-PRODUCTION-STRUCTURE (live catalog, 41A reconciliation), DESIGN INFERENCE (a proposal, not current truth).

## 1. Current-state facts re-verified

| # | Fact | Source | Label |
|---|---|---|---|
| F1 | `pregnancy_journeys` primary key is `user_id` | 41A Q1; `src/integrations/supabase/types.ts` (no id column) | VERIFIED-PRODUCTION-STRUCTURE |
| F2 | `save_pregnancy_journey` inserts `on conflict (user_id) do update` setting only `lmp_date`, `due_date`, `updated_at` | `supabase/migrations/20260803231512_*.sql` lines 23 to 28 | REPOSITORY-DEFINES + VERIFIED-PRODUCTION-STRUCTURE (41A Q2) |
| F3 | `journeys` primary key is `user_id` (one lifecycle pointer) | 41A Q1 | VERIFIED-PRODUCTION-STRUCTURE |
| F4 | `save_first_year_journey` archives the pregnancy into `archived_journeys`, then runs `DELETE FROM public.babies WHERE user_id = v_user_id` before inserting | `supabase/migrations/20260804110355_*.sql` lines 186 to 208 | REPOSITORY-DEFINES + VERIFIED-PRODUCTION-STRUCTURE |
| F5 | `delete_active_journey` hard deletes `pregnancy_journeys`, pregnancy `saved_journeys`, `babies`, `first_year_journeys` or `ttc_journeys` for the lifecycle | same file lines 243 to 277; called from `src/lib/savedJourney.ts:259`, `src/lib/savedTTCJourney.ts:172` | REPOSITORY-DEFINES |
| F6 | `first_year_memories.baby_id` is `ON DELETE SET NULL` with CHECK `memory_scope = 'baby'` requires `baby_id` | `supabase/migrations/20260810130036_*.sql` lines 5, 12 to 15 | REPOSITORY-DEFINES + VERIFIED-PRODUCTION-STRUCTURE |
| F7 | Entries, care events, reminders cascade on baby delete | 41A Q3 | VERIFIED-PRODUCTION-STRUCTURE |
| F8 | Reflections unique `(user_id, week)`; 10 other pregnancy tables keyed by `user_id` only | 41A Q1; types.ts | VERIFIED-PRODUCTION-STRUCTURE (reflections), REPOSITORY-DEFINES (others) |
| F9 | `first_year_journeys.archived_pregnancy_journey_id` references `archived_journeys(id)` | `20260804110355_*.sql` line 10 | REPOSITORY-DEFINES |
| F10 | All audited user tables use `auth.uid()` owner RLS | 41A readiness doc | REPOSITORY-DEFINES |

Memory delete result stays UNVERIFIED RUNTIME BEHAVIOUR.

## 2. Target identities (DESIGN INFERENCE)

```text
USER (auth.users)
 ├── PREGNANCY EPISODE  (many per user, durable, own id)
 │     ├── pregnancy records (reflections, week media, toolkit) bound to the episode
 │     └── CHILD (0..4 per episode; multiples share one episode)
 ├── CHILD without a known episode (legacy or added directly)
 └── CURRENT CONTEXT (one pointer row: lifecycle + active episode)
```

Conceptual names below (`pregnancy_episodes`, `pregnancy_episode_id`, `expected_count`) may change during 41B.1.

### 2.1 Pregnancy episode
New table, one row per pregnancy: `id`, `user_id`, `lmp_date`, `due_date`, `status` (reuse `pregnancy_journey_status`), `status_changed_at`, `outcome_date`, `expected_count` (nullable, 1 to 4, null = not stated), `started_at`, `ended_at`, `created_at`, `updated_at`. At most one `active` episode per user. Ended episodes are never updated by a new pregnancy save.

`pregnancy_journeys` stays during compatibility as a derived mirror of the active episode, then is retired (migration plan steps 4 and 9).

### 2.2 Child
`babies` stays the child entity. Adds `pregnancy_episode_id` (nullable: legacy and direct adds may have no known episode) and `archived_at` (child leaves the current First Year view without being deleted). Multiples = several babies with the same episode. No separate birth-group table: the episode already groups them.

### 2.3 Family / shared scope
No household entity. The only existing shared scope is `first_year_memories.memory_scope` (`family`, `all_babies`), already user-owned. No requirement justifies more.

### 2.4 Current context
`journeys` keeps one row per user (F3) and gains `active_pregnancy_episode_id`. The First Year cohort is the user's babies with `archived_at is null`. Defined in the context contract.

## 3. Multiples semantics
- `expected_count` is what the person states in pregnancy; null means singleton assumptions must not be made in copy (plural-aware copy is a later task).
- Number of babies at First Year setup is authoritative after birth; it may differ from `expected_count` and that is not an error.
- Cap of 4 stays (existing CHECK/RPC/UI).

## 4. Pregnancy loss and ended journeys
- Ending a pregnancy updates the episode status and `ended_at`; records stay bound to it.
- An ended episode is never reactivated by starting a new pregnancy; a new episode is created.
- The Companion receives no pregnancy context from an ended episode (keeps 41A safeguard #7).
- No reminders or week prompts continue for an ended episode.

## 5. Delete vs archive
| Action | Target behaviour |
|---|---|
| New pregnancy | CREATE episode, previous active one must already be ended or is ended in the same transaction with a stated reason |
| Pregnancy ends | UPDATE STATUS on episode |
| Move to First Year | END episode, CREATE or link babies, SELECT context |
| New First Year setup | ARCHIVE previous cohort (`archived_at`), never delete |
| "Remove this journey" (today `delete_active_journey`) | END + ARCHIVE by default |
| Hard delete | Only in explicit account deletion (`delete-account` function) or a separate, clearly labelled "delete this data permanently" action that lists what will be removed. Justified by privacy rights. |
