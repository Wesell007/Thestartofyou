# 41B.1A-C1 — 19c C1.13 guard states at every checkpoint (Project 1)

Columns are the five frozen rollback guards in order (1 episode rows; 2 later-phase FKs on pregnancy_episodes; 3 journeys pointers; 4 bound rows in the 12 looped tables; 5 dependants of babies_id_user_id_key) plus the scratch-object count. Source: `c1_13_state.sql` run as `postgres` read-only; raw logs in `19d-c1-13-catalogues/<checkpoint>.guards.log`.

| Checkpoint | G1 episodes | G2 later-phase FK | G3 pointers | G4 bound rows | G5 babies-key dependants | scratch objects |
|---|---|---|---|---|---|---|
| initial | 2 | 0 | 0 | 0 | 0 | 0 |
| r1_pre | 2 | 0 | 0 | 0 | 0 | 0 |
| r1_post | 2 | 0 | 0 | 0 | 0 | 0 |
| combined_pre | 2 | 1 | 1 | 1 | 1 | 2 |
| combined_post | 2 | 1 | 1 | 1 | 1 | 2 |
| safe_state | 0 | 0 | 0 | 0 | 0 | 0 |
| r2_pre | 0 | 1 | 0 | 0 | 0 | 1 |
| r2_post | 0 | 1 | 0 | 0 | 0 | 1 |
| r3_pre | 0 | 0 | 0 | 0 | 1 | 1 |
| r3_post | 0 | 0 | 0 | 0 | 1 | 1 |
| final | 0 | 0 | 0 | 0 | 0 | 0 |
