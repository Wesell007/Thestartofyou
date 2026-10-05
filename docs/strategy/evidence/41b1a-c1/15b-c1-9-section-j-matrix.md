# 41B.1A-C1 — 15b C1.9 section J result matrix (Project 1)

Source: `15-c1-9-uniqueness-removed-at.log` (transcript of `15a-c1-9-uniqueness-removed-at.sql`), parsed by case markers into `15c-c1-9-cases.json`. Every unique violation is SQLSTATE 23505 naming `pregnancy_episodes_one_open_per_user_idx` with `DETAIL: Key (user_id)=(…) already exists`, followed by `ROLLBACK TO SAVEPOINT`; every acceptance is followed by a read-back. The whole transaction ended in `ROLLBACK`, so nothing persisted.

## Section J rows

| Section J case | Starting state | Operation | Expected (plan) | Actual | SQLSTATE / index | Result |
|---|---|---|---|---|---|---|
| ★ one active | A has E-A1 active, removed_at NULL | count rows matching the OPEN predicate for A | accepted / exactly 1 | J1: as expected | — | PASS |
| ★ second active | E-A1 open | insert A active (…ea0a), valid dates | unique violation on pregnancy_episodes_one_open_per_user_idx | J2: rejected by pregnancy_episodes_one_open_per_user_idx | 23505 pregnancy_episodes_one_open_per_user_idx | PASS |
| ★ active + paused | E-A1 active (then temporarily paused inside savepoint s3) | insert A paused (…ea0b); E-A1 paused + insert A active (…ea0c); paused + paused (…ea0d) | violation (both open) | J3a: rejected by pregnancy_episodes_one_open_per_user_idx; J3b-setup: as expected; J3b: rejected by pregnancy_episodes_one_open_per_user_idx; J3c: rejected by pregnancy_episodes_one_open_per_user_idx; J3-restore: as expected | 23505 pregnancy_episodes_one_open_per_user_idx | PASS |
| ended (B: given_birth) + new active (E-B2) | E-B1 given_birth, ended, outcome set | insert B active E-B2 (…eb02); then second B open (…eb03) | accepted; second B open rejected (per-user) | J4: as expected; J4b: rejected by pregnancy_episodes_one_open_per_user_idx | 23505 pregnancy_episodes_one_open_per_user_idx | PASS |
| setting removed_at requires no other column change | E-A1 active open | update pregnancy_episodes set removed_at = now() where id = E-A1 (single column) | the single-column UPDATE succeeds | J8: as expected | — | PASS |
| ★ removed episode still exists, status unchanged (active), ended_at NULL, outcome_date NULL | E-A1 after removal | read back E-A1 | true | J7: as expected; J13: as expected | — | PASS |
| updated_at advances on the removal UPDATE | E-A1 after removal | compare updated_at with pre-value 20:01:11Z and with transaction now() | true (trigger) | J10: as expected | — | PASS |
| ★ set removed_at = now() on E-A1, then insert new active | E-A1 removed (status still active) | A OPEN count; insert A active E-A2 (…ea02) | accepted | J5a: as expected; J5: as expected | — | PASS |
| removed row retained beside the new open one | E-A1 removed, E-A2 open | count A rows / removed / open; ids | 2 rows, 1 removed, 1 open, old id not reused | J11: as expected | — | PASS |
| clearing removed_at while another open episode exists | E-A1 removed, E-A2 open | update E-A1 set removed_at = NULL | violation (re-opening blocked by the index, as designed) | J9: rejected by pregnancy_episodes_one_open_per_user_idx | 23505 pregnancy_episodes_one_open_per_user_idx | PASS |
| removed paused + new active | E-A2 paused then removed (savepoint s8) | insert A active E-A3 (…ea03) | accepted | J6-setup: as expected; J6: as expected; J6-restore: as expected | — | PASS |

Section J rows: 11/11 PASS. Executed cases: 20 (20 as expected, 0 unexpected); unique violations required/observed 6/6; acceptances required/observed 14/14.

## Every executed case

| Case | Description | Expected | Outcome | SQLSTATE | Index | Last read-back lines |
|---|---|---|---|---|---|---|
| J1 | one active for A already exists (E-A1): OPEN count for A is exactly 1 | accepted | as expected |  |  | `` |
| J2 | second active for A while E-A1 is open | unique violation | rejected by pregnancy_episodes_one_open_per_user_idx | 23505 | pregnancy_episodes_one_open_per_user_idx | `` |
| J3a | active + paused: new paused for A while E-A1 is active | unique violation | rejected by pregnancy_episodes_one_open_per_user_idx | 23505 | pregnancy_episodes_one_open_per_user_idx | `` |
| J3b-setup | E-A1 status active -> paused (open status, single-column update) | accepted | as expected |  |  | `id                  \| status \| ended_at \| removed_at<br>00000000-0000-4c10-8000-00000000ea01 \| paused \|          \|` |
| J3b | paused + active: new active for A while E-A1 is paused | unique violation | rejected by pregnancy_episodes_one_open_per_user_idx | 23505 | pregnancy_episodes_one_open_per_user_idx | `` |
| J3c | paused + paused: new paused for A while E-A1 is paused | unique violation | rejected by pregnancy_episodes_one_open_per_user_idx | 23505 | pregnancy_episodes_one_open_per_user_idx | `` |
| J3-restore | E-A1 back to active after rollback to savepoint s3 | accepted | as expected |  |  | `id                  \| status \| ended_at \| removed_at<br>00000000-0000-4c10-8000-00000000ea01 \| active \|          \|` |
| J4 | ended (B: E-B1 given_birth) + new active E-B2 for B (plan section F) | accepted | as expected |  |  | `user_id                \| open_episodes<br>820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb \|             1<br>b09cd318-8f3e-4853-8d97-fc10267b3d69 \|             1` |
| J4b | per-user independence: second open for B while E-B2 is open (A unaffected) | unique violation | rejected by pregnancy_episodes_one_open_per_user_idx | 23505 | pregnancy_episodes_one_open_per_user_idx | `` |
| J8 | setting removed_at requires no other column change: single-column UPDATE on E-A1 (S13 removal) | accepted | as expected |  |  | `id                  \| status \| ended_at \| outcome_date \| removed_at \| status_changed_at \|      updated_at_before<br>00000000-0000-4c10-8000-00000000ea01 \| active \|          \|              \|            \|                   \| 2026-10-05 20:01:11.06538+00` |
| J7 | removed episode still exists, status unchanged (active), ended_at NULL, outcome_date NULL, removed_at set | accepted | as expected |  |  | `id                  \|               user_id                \| status \| ended_at \| outcome_date \|          removed_at          \| status_changed_at \| expected_count \|       updated_at_after       \| s13_shape_ok<br>00000000-0000-4c10-8000-00000000ea01 \| b09cd318-8f3e-4853-8d97-fc10267b3d69 \| active \|          \|              \| 2026-10-05 20:33:34.46646+00 \|                   \|              1 \| 2026-10-05 20:33:34.46646+00 \| t` |
| J10 | updated_at advanced on the removal UPDATE (set_updated_at trigger) | accepted | as expected |  |  | `updated_at_advanced \| equals_transaction_now<br>t                   \| t` |
| J5a | removed E-A1 no longer matches the OPEN predicate: A open count is 0 | accepted | as expected |  |  | `` |
| J5 | set removed_at on E-A1, then insert new active E-A2 for A | accepted | as expected |  |  | `id                  \|               user_id                \| status \| ended_at \| outcome_date \|          removed_at<br>00000000-0000-4c10-8000-00000000ea01 \| b09cd318-8f3e-4853-8d97-fc10267b3d69 \| active \|          \|              \| 2026-10-05 20:33:34.46646+00<br>00000000-0000-4c10-8000-00000000ea02 \| b09cd318-8f3e-4853-8d97-fc10267b3d69 \| active \|          \|              \|` |
| J11 | removed E-A1 retained alongside open E-A2 (two distinct rows, old one not reused, not deleted) | accepted | as expected |  |  | `a_rows \| a_removed \| a_open \| ids_as_expected<br>2 \|         1 \|      1 \| t` |
| J9 | clearing removed_at on E-A1 while E-A2 is open (re-opening blocked by the index on UPDATE) | unique violation | rejected by pregnancy_episodes_one_open_per_user_idx | 23505 | pregnancy_episodes_one_open_per_user_idx | `id                  \| status \| still_removed<br>00000000-0000-4c10-8000-00000000ea01 \| active \| t` |
| J6-setup | E-A2 active -> paused (open), then removed_at set (single-column update) | accepted | as expected |  |  | `id                  \| status \| ended_at \| outcome_date \|          removed_at<br>00000000-0000-4c10-8000-00000000ea02 \| paused \|          \|              \| 2026-10-05 20:33:34.46646+00` |
| J6 | removed paused (E-A2) + new active E-A3 for A | accepted | as expected |  |  | `00000000-0000-4c10-8000-00000000ea01 \| active \| t<br>00000000-0000-4c10-8000-00000000ea02 \| paused \| t<br>00000000-0000-4c10-8000-00000000ea03 \| active \| f` |
| J6-restore | after rollback to savepoint s8: E-A2 open active again, E-A3 absent | accepted | as expected |  |  | `id                  \| status \| removed<br>00000000-0000-4c10-8000-00000000ea01 \| active \| t<br>00000000-0000-4c10-8000-00000000ea02 \| active \| f` |
| J13 | no outcome coupling: removal changed only removed_at and updated_at on E-A1 (status active, outcome_date NULL, ended_at NULL, status_changed_at NULL, expected_count 1) | accepted | as expected |  |  | `status_unchanged \| outcome_date_null \| ended_at_null \| status_changed_at_null \| expected_count_unchanged \| dates_unchanged \| removed<br>t                \| t                 \| t             \| t                      \| t                        \| t               \| t` |
