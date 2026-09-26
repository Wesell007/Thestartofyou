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

## 6. Phase 41A findings: design responses

Status for every row: DESIGN-ADDRESSED. IMPLEMENTATION REQUIRED IN 41B.1 = YES. RESOLVED IN CURRENT PRODUCT = NO.

| 41A finding | Class | 41B.0 design response | Document / section |
|---|---|---|---|
| 1 New pregnancy saved over an ended one keeps old status/outcome | P1 | New episode per pregnancy; save over active rejected; ended episodes never updated | context contract §2; RLS plan §4 |
| 2 Reflections shared across pregnancies | P0 | Episode link + reflections unique split; legacy rows unbound, not guessed | migration plan §1, §2; RLS plan §2.9 |
| 3 Week photos/media keyed by user + week | P0 | Episode link with composite FK | migration plan §1 |
| 4 Toolkit records carry into later pregnancy | P0 | Episode link on 8 toolkit tables; server fills active episode or rejects | migration plan §1, §6 |
| 5 First Year setup deletes all babies | P0 | Archive instead of delete; FKs to RESTRICT; memory FK fixed | migration plan §3, §4; RLS plan §3 |
| 6 Pregnancy from First Year repoints without archiving | P2 | Cohort kept as durable history; explicit transition | context contract §2 |
| 9 Companion not scoped to pregnancy/child | P2 | Controlled by resolver: pointer-named episode only, no guessing, unbound rows excluded; conversations stay user-level by decision | context contract §3, §4 |
| 10 No plurality field | P2 | `expected_count` on episode; babies grouped by episode | this doc §2.1, §3 |

Safeguards #7 and #8 are kept unchanged by the resolver contract.

## 7. Section 26 report

- Current core identity problem = pregnancy, context and toolkit data are keyed to the person (`user_id`), not to a pregnancy; First Year setup replaces children by deleting them.
- Proposed Pregnancy entity = durable pregnancy episode table, many per user, one active at a time, own id, status, outcome, `expected_count`.
- Proposed Child relationship = `babies` linked to its episode (nullable for legacy), multiples share an episode, archived not deleted.
- Current-context mechanism = one `journeys` row: lifecycle + active episode pointer; First Year cohort = unarchived babies.
- Tables requiring pregnancy_id = 11.
- Tables requiring baby_id changes = 5.
- Tables requiring no ownership change = 6 (plus 2 structural context changes; 24 total).
- Deterministic backfills = 3.
- High-confidence derivable backfills = 2.
- Ambiguous legacy backfills = 10 (not auto-assigned).
- New constraints proposed = 9.
- Constraints to remove/change = 5.
- RLS policies requiring change = 4 new on 1 new table; 0 existing modified.
- Database functions requiring replacement/change = 5 (3 replaced, 2 new).
- Client write paths requiring migration = 17.
- Potential destructive behaviours removed = 4 (babies delete in First Year setup; hard deletes in `delete_active_journey`; cascade from baby to entries/care/reminders; SET NULL on baby-scoped memories).
- Compatibility strategy = `pregnancy_journeys` mirrored from the active episode; nullable links; server fills active episode or rejects; unbound legacy rows shown only with the active episode and never sent to the Companion.
- Rollback strategy = per step; steps 1 to 6 reversible without data loss; backup before backfill and tightening.
- Migration phases = 9.
- P0 risks addressed = 4 / 4 (DESIGN-ADDRESSED).
- P1 risks addressed = 1 / 1 (DESIGN-ADDRESSED).
- P2 limitations addressed = 3 / 3 (DESIGN-ADDRESSED; #9 by context control).
- Known unresolved risks after design = 2: (a) existing legacy pregnancy rows from overwritten pregnancies stay unbound until the person confirms them, so past mixing cannot be undone automatically; (b) today's memory delete behaviour remains UNVERIFIED RUNTIME BEHAVIOUR until the RESTRICT change ships.
- Product changes = 0. Database changes = 0. Migration files created = 0. RLS changes = 0. Customer data reads = 0. Companion changes = 0. Memory changes = 0. Grounding changes = 0. Deployment = NO. 41B.1 = NOT STARTED.

## 8. Architecture decision
READY FOR 41B.1 IMPLEMENTATION. Every readiness item is covered: target model, legacy migration, compatibility, RLS, transactional writes, context contract, First Year reset replacement, memory FK resolution, test plan, rollback plan, production preconditions.
