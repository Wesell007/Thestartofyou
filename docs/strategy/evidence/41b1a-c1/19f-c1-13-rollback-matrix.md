# 41B.1A-C1 — 19f C1.13 four-run rollback-refusal matrix (Project 1)

Every run: frozen rollback file (SHA-256 `0d00895514b4e2dc623383436952fd534d5f879cdf4011024596dae303a36077`, wrapper hash gate) through `c1_psql.sh` (psql 17.11, direct endpoint, `postgres` table owner, `-1`, `ON_ERROR_STOP=1`); a per-case PRE nine-section snapshot immediately before, a POST snapshot from a fresh session immediately after, and the diff POST-vs-PRE required EMPTY. Exactly four rollback executions; the safe-state transition between the combined run and R2 is recorded separately in `19b-c1-13-safe-state-transition.log`.

| Run | Unsafe setup | Guards true | Expected guard | Actual message | Exit | Statements after refusal | POST-vs-PRE diff | PASS |
|---|---|---|---|---|---|---|---|---|
| R1 | fixture present (E-A1, E-B1) | 1 | 1 | `ROLLBACK REFUSED: public.pregnancy_episodes holds 2 row(s). This file never destroys history.` | 3 | 0 | EMPTY | PASS |
| Combined-state | fixture present + A pointer -> E-A1 + reflections a101 -> E-A1 + c1_scratch_episode_dep FK + c1_scratch_baby_dep FK | 1, 2, 3, 4, 5 | 1 (earliest wins) | `ROLLBACK REFUSED: public.pregnancy_episodes holds 2 row(s). This file never destroys history.` | 3 | 0 | EMPTY | PASS |
| R2 | safe state + c1_scratch_episode_dep FK -> pregnancy_episodes(id, user_id) | 2 | 2 | `ROLLBACK REFUSED: 1 foreign key(s) from a later phase reference pregnancy_episodes.` | 3 | 0 | EMPTY | PASS |
| R3 | safe state + c1_scratch_baby_dep FK -> babies(id, user_id) | 5 | 5 | `ROLLBACK REFUSED: 1 foreign key(s) depend on babies_id_user_id_key.` | 3 | 0 | EMPTY | PASS |

All four PASS: YES. Fifth refusal: none. Final catalogue (`final`) versus the R1 pre-run snapshot: EMPTY (every 41B.1A foundation object intact after all four refusals, both scratch tables gone).
