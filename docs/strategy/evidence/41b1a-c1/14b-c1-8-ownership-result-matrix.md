# 41B.1A-C1 — 14b C1.8 ownership result matrix (Project 1, after validation)

Source: `14-c1-8-ownership-matrix.log` (transcript of `14a-c1-8-ownership-matrix.sql`), parsed mechanically by the case markers; machine form `14c-c1-8-matrix.json`. Every case is listed below the matrix, so no relationship or case can be omitted silently. Same-owner acceptance is proven by the read-back `select` after each accepted statement (the stored link equals the intended episode); cross-owner rejection is proven by the server error (SQLSTATE and constraint name) followed by `ROLLBACK TO SAVEPOINT` and a read-back or residue count showing the row did not acquire the foreign episode.

## 13-row matrix

| # | Relationship | Row owner / rows used | Same-owner episode | Same-owner result | Cross-owner episode | Cross-owner result | SQLSTATE | Constraint |
|---|---|---|---|---|---|---|---|---|
| 1 | `journeys` | A, B and C pointer rows (one per user) | E-A1 (A), E-B1 (B) | accepted 4/4 | E-B1 (A), E-A1 (B and C) | rejected 3/3 | 23503 | `journeys_current_pregnancy_episode_owner_fkey` |
| 2 | `reflections` | A (legacy a1xx rows; new rows inserted for A) | E-A1 | accepted 4/4 | E-B1 | rejected 3/3 | 23503 | `reflections_pregnancy_episode_owner_fkey` |
| 3 | `week_photos` | A (legacy a1xx rows; new rows inserted for A) | E-A1 | accepted 4/4 | E-B1 | rejected 3/3 | 23503 | `week_photos_pregnancy_episode_owner_fkey` |
| 4 | `week_media_memories` | A (legacy a1xx rows; new rows inserted for A) | E-A1 | accepted 4/4 | E-B1 | rejected 3/3 | 23503 | `week_media_memories_pregnancy_episode_owner_fkey` |
| 5 | `pregnancy_appointments` | A (legacy a1xx rows; new rows inserted for A) | E-A1 | accepted 4/4 | E-B1 | rejected 3/3 | 23503 | `pregnancy_appointments_pregnancy_episode_owner_fkey` |
| 6 | `pregnancy_symptom_notes` | A (legacy a1xx rows; new rows inserted for A) | E-A1 | accepted 4/4 | E-B1 | rejected 3/3 | 23503 | `pregnancy_symptom_notes_pregnancy_episode_owner_fkey` |
| 7 | `baby_movement_notes` | A (legacy a1xx rows; new rows inserted for A) | E-A1 | accepted 4/4 | E-B1 | rejected 3/3 | 23503 | `baby_movement_notes_pregnancy_episode_owner_fkey` |
| 8 | `birth_plans` | A legacy a107 for updates; B for inserts (UNIQUE user_id) | E-A1 (updates) / E-B1 (B inserts) | accepted 4/4 | E-B1 (A update) / E-A1 (B inserts) | rejected 3/3 | 23503 | `birth_plans_pregnancy_episode_owner_fkey` |
| 9 | `hospital_bag_items` | A (legacy a1xx rows; new rows inserted for A) | E-A1 | accepted 4/4 | E-B1 | rejected 3/3 | 23503 | `hospital_bag_items_pregnancy_episode_owner_fkey` |
| 10 | `midwife_questions` | A (legacy a1xx rows; new rows inserted for A) | E-A1 | accepted 4/4 | E-B1 | rejected 3/3 | 23503 | `midwife_questions_pregnancy_episode_owner_fkey` |
| 11 | `contraction_sessions` | A (legacy a1xx rows; new rows inserted for A) | E-A1 | accepted 4/4 | E-B1 | rejected 3/3 | 23503 | `contraction_sessions_pregnancy_episode_owner_fkey` |
| 12 | `contraction_events` | A (legacy a1xx rows; new rows inserted for A) | E-A1 | accepted 8/8 | E-B1 | rejected 3/3 | 23503 | `contraction_events_pregnancy_episode_owner_fkey` |
| 13 | `babies` | A for inserts (no legacy A baby); B legacy b001/b002 for updates | E-A1 (A inserts) / E-B1 (B b001 update) | accepted 4/4 | E-B1 (A inserts) / E-A1 (B b002 update) | rejected 3/3 | 23503 | `babies_pregnancy_episode_owner_fkey` |

Totals: relationships 13/13; cases 95; same-owner cases accepted 56/56; cross-owner cases rejected 39/39; unexpected 0.

## Every case

| Relationship | Case (plan section I) | Expected | Outcome | SQLSTATE | Constraint | Server detail |
|---|---|---|---|---|---|---|
| `reflections` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `reflections` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `reflections_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `reflections` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `reflections` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `reflections_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `reflections` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `reflections` | I5b update back to NULL | accepted | accepted |  |  |  |
| `reflections` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `reflections_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `week_photos` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `week_photos` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `week_photos_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `week_photos` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `week_photos` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `week_photos_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `week_photos` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `week_photos` | I5b update back to NULL | accepted | accepted |  |  |  |
| `week_photos` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `week_photos_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `week_media_memories` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `week_media_memories` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `week_media_memories_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `week_media_memories` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `week_media_memories` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `week_media_memories_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `week_media_memories` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `week_media_memories` | I5b update back to NULL | accepted | accepted |  |  |  |
| `week_media_memories` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `week_media_memories_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `pregnancy_appointments` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `pregnancy_appointments` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `pregnancy_appointments_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `pregnancy_appointments` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `pregnancy_appointments` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `pregnancy_appointments_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `pregnancy_appointments` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `pregnancy_appointments` | I5b update back to NULL | accepted | accepted |  |  |  |
| `pregnancy_appointments` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `pregnancy_appointments_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `pregnancy_symptom_notes` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `pregnancy_symptom_notes` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `pregnancy_symptom_notes_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `pregnancy_symptom_notes` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `pregnancy_symptom_notes` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `pregnancy_symptom_notes_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `pregnancy_symptom_notes` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `pregnancy_symptom_notes` | I5b update back to NULL | accepted | accepted |  |  |  |
| `pregnancy_symptom_notes` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `pregnancy_symptom_notes_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `baby_movement_notes` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `baby_movement_notes` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `baby_movement_notes_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `baby_movement_notes` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `baby_movement_notes` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `baby_movement_notes_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `baby_movement_notes` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `baby_movement_notes` | I5b update back to NULL | accepted | accepted |  |  |  |
| `baby_movement_notes` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `baby_movement_notes_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `birth_plans` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `birth_plans` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `birth_plans_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000ea01, 820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb) is not present in table "pregnancy_episodes". |
| `birth_plans` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `birth_plans` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `birth_plans_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `birth_plans` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `birth_plans` | I5b update back to NULL | accepted | accepted |  |  |  |
| `birth_plans` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `birth_plans_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000ea01, 820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb) is not present in table "pregnancy_episodes". |
| `hospital_bag_items` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `hospital_bag_items` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `hospital_bag_items_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `hospital_bag_items` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `hospital_bag_items` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `hospital_bag_items_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `hospital_bag_items` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `hospital_bag_items` | I5b update back to NULL | accepted | accepted |  |  |  |
| `hospital_bag_items` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `hospital_bag_items_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `midwife_questions` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `midwife_questions` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `midwife_questions_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `midwife_questions` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `midwife_questions` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `midwife_questions_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `midwife_questions` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `midwife_questions` | I5b update back to NULL | accepted | accepted |  |  |  |
| `midwife_questions` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `midwife_questions_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `contraction_sessions` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `contraction_sessions` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `contraction_sessions_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `contraction_sessions` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `contraction_sessions` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `contraction_sessions_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `contraction_sessions` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `contraction_sessions` | I5b update back to NULL | accepted | accepted |  |  |  |
| `contraction_sessions` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `contraction_sessions_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `contraction_events` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `contraction_events` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `contraction_events_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `contraction_events` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `contraction_events` | I4 update legacy NULL-link A row -> E-B1 | FK violation | rejected | 23503 | `contraction_events_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `contraction_events` | I5a update legacy A row -> E-A1 | accepted | accepted |  |  |  |
| `contraction_events` | I5b update back to NULL | accepted | accepted |  |  |  |
| `contraction_events` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `contraction_events_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `contraction_events` | I7a bind session a110 -> E-A1 | accepted | accepted |  |  |  |
| `contraction_events` | I7b bind events a111,a112 -> E-A1 (consistent with session) | accepted | accepted |  |  |  |
| `contraction_events` | I7c mismatch: event a112 -> NULL while session stays E-A1 (not constrained in 41B.1A; recorded for the 41B.1C trigger) | accepted | accepted |  |  |  |
| `contraction_events` | I7d reset session and events to NULL | accepted | accepted |  |  |  |
| `babies` | I1 same-user insert -> own episode | accepted | accepted |  |  |  |
| `babies` | I2 cross-user insert -> other-user episode | FK violation | rejected | 23503 | `babies_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `babies` | I3 insert with NULL link | accepted | accepted |  |  |  |
| `babies` | I4 update legacy NULL-link row -> other-user episode (B b002 -> E-A1) | FK violation | rejected | 23503 | `babies_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000ea01, 820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb) is not present in table "pregnancy_episodes". |
| `babies` | I5a update legacy row -> own episode (B b001 -> E-B1) | accepted | accepted |  |  |  |
| `babies` | I5b update back to NULL (B b001) | accepted | accepted |  |  |  |
| `babies` | I6 composite mismatch insert (own user_id + other-user existing episode id) | FK violation | rejected | 23503 | `babies_pregnancy_episode_owner_fkey` | Key (pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `journeys` | I1/I5a same-user: A pointer -> E-A1 | accepted | accepted |  |  |  |
| `journeys` | I2/I6 cross-user: A pointer -> E-B1 (composite mismatch, E-B1 exists) | FK violation | rejected | 23503 | `journeys_current_pregnancy_episode_owner_fkey` | Key (current_pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000eb01, b09cd318-8f3e-4853-8d97-fc10267b3d69) is not present in table "pregnancy_episodes". |
| `journeys` | I5b back to NULL: A pointer -> NULL | accepted | accepted |  |  |  |
| `journeys` | I4 update legacy NULL-pointer row of another user: C pointer -> E-A1 | FK violation | rejected | 23503 | `journeys_current_pregnancy_episode_owner_fkey` | Key (current_pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000ea01, 6e65487d-ddb0-43b6-a623-fb24b5318dab) is not present in table "pregnancy_episodes". |
| `journeys` | I4b B pointer -> E-A1 (cross-user) | FK violation | rejected | 23503 | `journeys_current_pregnancy_episode_owner_fkey` | Key (current_pregnancy_episode_id, user_id)=(00000000-0000-4c10-8000-00000000ea01, 820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb) is not present in table "pregnancy_episodes". |
| `journeys` | I1b B pointer -> E-B1 (same-user) then NULL | accepted | accepted |  |  |  |
| `journeys` | I3 NULL pointer accepted (explicit) | accepted | accepted |  |  |  |
