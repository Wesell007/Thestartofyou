# Phase 41A — Context Contamination Register

Severity: P1 reachable today and mixes records; P2 reachable, degrades correctness; P3 structural limit.

| # | Risk | Sev | Evidence |
|---|---|---|---|
| 1 | New pregnancy saved over an ended one keeps old `status`/`outcome_date` (upsert updates dates only) | P1 | `save_pregnancy_journey` source, Q2 |
| 2 | Earlier pregnancy's reflections reappear on the same weeks of a later pregnancy | P1 | `reflections` UNIQUE `(user_id, week)`, Q1 |
| 3 | Earlier pregnancy's week photos/media appear in a later pregnancy | P1 | `week_photos`, `week_media_memories` user+week only (types.ts) |
| 4 | Toolkit records (appointments, symptoms, movements, birth plan, bag, midwife questions, contractions) carry into a later pregnancy | P1 | tables keyed by `user_id` only (types.ts) |
| 5 | Re-running First Year setup deletes all babies; entries and care events cascade delete, memories lose `baby_id` | P1 | `save_first_year_journey` Q2; FKs Q1 |
| 6 | Starting a pregnancy from First Year changes lifecycle without archiving First Year | P2 | `save_pregnancy_journey` Q2 |
| 7 | Companion pregnancy context on ended pregnancy | Controlled | `journeyPersonalSource.ts` lines 36 to 48 return nothing unless `active` |
| 8 | Companion picks wrong baby among several | Controlled | `journeyPersonalSource.ts` lines 83 to 88: no age unless one baby or one unique primary |
| 9 | Companion conversations and memories not scoped to a child or pregnancy | P3 | `companion_*` tables user-only |
| 10 | No pregnancy plurality, so multiples safety context cannot personalise | P3 | `pregnancy_journeys` columns |

Totals: P1 5, P2 1, P3 2, Controlled 2 = 10.
