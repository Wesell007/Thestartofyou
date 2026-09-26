# Phase 41A — Context Contamination Register

Taxonomy (final reconciliation): P0 data integrity; P1 safety or wrong context; P2 functional limitation; P3 UX or copy limitation; SAFEGUARD existing correctly handled condition (not an active risk).

| # | Finding | Class | Evidence |
|---|---|---|---|
| 1 | New pregnancy saved over an ended one keeps old `status` / `outcome_date` (upsert updates `lmp_date`, `due_date`, `updated_at` only) | P1 | `save_pregnancy_journey` live source (Q2); latest definition `supabase/migrations/20260803231512_*.sql` |
| 2 | Reflections for a week are shared across pregnancies | P0 | `reflections` UNIQUE `(user_id, week)` (Q1) |
| 3 | Week photos and media are keyed by user + week only | P0 | `src/integrations/supabase/types.ts` (`week_photos`, `week_media_memories`) |
| 4 | Toolkit records keyed by user only carry into a later pregnancy | P0 | `types.ts` (appointments, symptom notes, movement notes, birth plans, hospital bag, midwife questions, contraction sessions/events) |
| 5 | `save_first_year_journey` explicitly deletes every baby row for the user; entries, care events and reminders for those babies cascade delete; baby-scoped memories conflict (see note) | P0 | Q2 function source; FKs Q3 |
| 6 | Starting a pregnancy from First Year repoints the lifecycle without archiving First Year | P2 | `save_pregnancy_journey` (Q2) |
| 7 | Companion ignores a pregnancy whose status is not `active` | SAFEGUARD | `src/lib/companion/journeyPersonalSource.ts` lines 47 to 51; `src/test/journeyPersonalResolution.test.ts` |
| 8 | Companion sends no baby age unless one baby or one unique primary | SAFEGUARD | `journeyPersonalSource.ts` lines 83 to 88; same test file |
| 9 | Companion conversations and memories are not scoped to a pregnancy or child | P2 | `companion_*` tables user-only (types.ts) |
| 10 | No pregnancy plurality field, so multiples cannot personalise | P2 | `pregnancy_journeys` columns (types.ts line 827) |

Note on #5: `first_year_memories.baby_id` is `ON DELETE SET NULL` while a CHECK requires `baby_id` to be present when `memory_scope = 'baby'` (both VERIFIED-PRODUCTION). By schema, deleting a baby that has baby-scoped memories conflicts with that CHECK. The runtime result (whether the setup save fails) was not tested: UNVERIFIED RUNTIME BEHAVIOUR. The earlier wording "memories lose `baby_id`" is superseded.

Totals: P0 4 + P1 1 + P2 3 + P3 0 = 8 active. Safeguards 2. Total findings 10.
