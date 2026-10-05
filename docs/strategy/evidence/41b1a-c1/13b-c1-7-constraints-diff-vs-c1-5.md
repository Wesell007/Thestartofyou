# 41B.1A-C1 — 13b C1.7 constraints catalogue diff versus C1.5 (Project 1)

Compared: the post-validation constraints capture (`13a-c1-7-constraints-after.txt`, psql read-only fresh session, 2026-10-05T20:08Z, format `schema.table|conname|contype|convalidated|confdeltype|pg_get_constraintdef`) reduced to the catalogue line format `table|conname|def`, against the constraints section of `11-c1-5-post-forward-catalogue.md` (161 lines). The C1.5 constraints section was re-confirmed as the pre-C1.7 state by hash after C1.6 (20:01:42Z) and by the integration pre-state query at 20:06:28Z (15 unvalidated constraints in `public`: the 13 ownership links plus the two pre-existing account FKs).

| Measure | Value |
|---|---|
| C1.5 constraints hash | `161|9c67159cf4c5092259d395a0892b8d30` |
| post-C1.7 constraints hash | `161|a67632e148ba28698299466d0d218f7e` (integration channel reported the same `161|a67632e1…`) |
| lines removed | 13 |
| lines added | 13 |
| transitions `… ON DELETE RESTRICT NOT VALID` → `… ON DELETE RESTRICT` | 13 |
| unexpected removed / added | 0 / 0 |

## The 13 transitions (each line lost exactly the ` NOT VALID` suffix; the definition is otherwise byte-identical)

| Constraint | Before (C1.5) | After (C1.7) |
|---|---|---|
| `babies_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `baby_movement_notes_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `birth_plans_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `contraction_events_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `contraction_sessions_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `hospital_bag_items_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `journeys_current_pregnancy_episode_owner_fkey` | `FOREIGN KEY (current_pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (current_pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `midwife_questions_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `pregnancy_appointments_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `pregnancy_symptom_notes_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `reflections_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `week_media_memories_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |
| `week_photos_pregnancy_episode_owner_fkey` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT NOT VALID` | `FOREIGN KEY (pregnancy_episode_id, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT` |

## Everything else

The remaining 148 constraint lines are byte-identical. In particular `reflections_user_id_fkey` and `week_photos_user_id_fkey` still carry `NOT VALID` (pre-existing from `20260720120000`, named by the plan as must-not-change); the First Year `baby_id` FKs, the legacy uniqueness constraints, the `pregnancy_episodes` constraints and every CHECK constraint are unchanged. No constraint was added or dropped (161 before and after). No 41B.1C or 41B.1D object exists.

Other sections (columns, enums, functions, triggers, rls, policies, indexes, grants): hashes identical to C1.5 (see `13c-c1-7-summary.md`).

Verdict: the catalogue change is limited to the expected validation-state transition of the 13 ownership FKs.
