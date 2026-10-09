# G3 — 99 Gate summary: hosted runtime rehearsal of the corrected account-deletion model

**Result: G3 PASS.** All mandatory criteria of the G3 brief §18 and the G1 plan §14 are met on the disposable hosted project `tsoy-ad1-g3-rehearsal` (`czhopceorfqxdbfvlnap`, eu-west-2, PostgreSQL 17.11.0.003). Executed 2026-10-09 (UTC).

**PRE-41B.1B RI/ACCOUNT-DELETION DATABASE GATE = EVIDENCE PASS, subject to owner evidence acceptance.**

This does not:

- apply 41B.1A to production;
- authorise 41B.1B;
- resolve N10 (storage-first deletion in `delete-account`, which G3 did not exercise and does not change);
- bypass the 41B.0-R §11 production gates.

The G3 project is **not** torn down. It stays available for review until the owner accepts this package.

## Question answered

Does the existing AD-1-compliant design (13 Episode ownership FKs `ON DELETE RESTRICT`, NOT DEFERRABLE, every dependant with its own direct `user_id → auth.users ON DELETE CASCADE`) delete an account in any `auth.users` trigger order? Or did C1.18 succeed only because its order was favourable?

**Answer: order-independent, as §30.3 predicts.** The decisive evidence:

- the forced-unfavourable Positive B succeeds;
- a deliberately AD-1-violating two-hop dependant fails in the unfavourable order and succeeds in the favourable one, exactly as predicted. This shows the harness can detect real order dependence, and that AD-1 is what removes it.

## Results against the PASS contract

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | AD-1 Layer 1 | PASS 30/30 at preflight | `01` |
| 2 | Layer 2 FAIL count 0 | PASS: `fail_count=0` at the first hosted run and again on the final state | `04a`, `04b` |
| 3 | Episode links exactly 13 | PASS: 13, all RESTRICT, NOT DEFERRABLE, validated; same `user_id` proven; direct `auth.users(id)` primary-key CASCADE proven; `user_id` NOT NULL proven | `04a`, `03c` |
| 4 | GoTrue runtime statement shape | CONFIRMED: one `DELETE FROM "users" AS users WHERE users.id = $1` (`auth.users` via `search_path=auth`) per successful hard delete, inside `begin`/`commit`; no GoTrue DML on `public` | `05` |
| 5 | Positive A (natural order) success | PASS. Observed order FAVOURABLE (Episode cascade `RI_ConstraintTrigger_a_18797`, position 38 of 38). HTTP 200; A's 22 owned rows (incl. the Auth user) → 0 | `06`, `07` |
| 6 | Positive B (forced unfavourable) success | PASS. The 13 dependant account FKs were recreated with byte-identical definitions (catalogue diff EMPTY). Precondition proven before deleting: Episode cascade position 25 of 38, all 13 dependant cascades after it. HTTP 200; B's 22 owned rows → 0 | `08*`, `09` |
| 7 | Both positive runs 0 orphans | PASS: 0 / 0 (global orphan checks across every `user_id` table, every link column, journey pointers, baby and session references) | `07`, `09` |
| 8 | Control user unchanged | PASS: fingerprint (row-content md5 per table plus the Auth row) identical before and after every deletion | `07`, `09`, `11f`, `12e` |
| 9 | Sensitivity S1 fails exactly as predicted | PASS. Order proven: Episode cascade 25, scratch `y_parent` 39. HTTP 500 with body `code 23503`, `update or delete on table "pregnancy_episodes" violates foreign key constraint "x_dependant_episode_owner_fkey" on table "x_dependant"` | `10`, `11c`, `11f` |
| 10 | S1 rolls back atomically | PASS: S1 still in `auth.users`; all 24 S1 rows present; S1's own row-content fingerprint, counts and graph shape identical before and after; GoTrue issued `begin` … `rollback` | `11e`, `11g`, `05` |
| 11 | Sensitivity S2 succeeds exactly as predicted | PASS. `pregnancy_episodes_user_id_fkey` recreated with its identical definition; order proven: `y_parent` 38, Episode cascade 39. HTTP 200; S2's 24 rows, including the scratch x and y rows → 0; 0 orphans | `10`, `12*` |
| 12 | 13/13 Episode-local deletions refused | PASS: each relationship alone → SQLSTATE 23503 naming its own `…_owner_fkey`; control (no dependant) delete accepted | `13c` |
| 13 | 26/26 ownership matrix | PASS: 13 same-user accepted; 13 cross-user rejected with 23503 naming the correct FK; residue 0 | `13c` |
| 14 | Lifecycle semantics intact | PASS: final nine-section catalogue equals the G3 validated capture and C1.16's validated state (EMPTY). That covers the open-pregnancy unique predicate, `removed_at`, CHECKs, pointer FK, babies `(id, user_id)` key and First Year FKs. At runtime every full graph held twins (two babies on one `given_birth` episode, `expected_count = 2`), a retained removed episode beside it, a populated journey pointer and First Year rows for both babies | `15*`, `07b`, `07c` |
| 15 | Frozen hashes unchanged | PASS | `01` |
| 16 | No customer data | PASS: 7 synthetic `@example.invalid` users only; non-synthetic users 0 throughout | `05c`, `15e` |
| 17 | Production never accessed | PASS: every remote call targeted `czhopceorfqxdbfvlnap` through the guarded wrappers; production and C1 refs were denylisted | `00`, `16` |
| 18 | Evidence secret scan clean | PASS | `16` |

## Final hosted state (`15e`)

- 0 scratch schemas, relations or FKs; 0 idle transactions; 0 strong locks.
- 13 Episode FKs RESTRICT, validated and immediate; history 47; marker intact.
- 4 synthetic users remain: control C, matrix users D and E, and S1, kept after its deliberately failed deletion.

## Deviations and disclosures

- **Organisation name:** not readable with the G3 token (403). Matched by organisation id against C1's WesellProducts projects and the owner's confirmation (`00`).
- **psql path:** the first database call failed locally (`psql` not on PATH) before any connection. The wrapper was pointed at the PostgreSQL 17 binary used in C1 and re-self-tested.
- **pg_stat_statements matcher:** corrected after Positive A from the stored data, as disclosed in `05`.
- **G1 vs G3 clarifications applied (owner-approved):**
  - fresh users for S1 and S2 (G1 had reused one);
  - Positive B recreated only the 13 dependant account FKs (G1 also listed First Year);
  - `pregnancy_episodes_user_id_fkey` was recreated with its identical definition for S2 only.
  - The 13 Episode ownership FKs were never touched.
- **Timing:** the predictions file was committed locally (`211b7253`, 2026-10-09T04:01:26Z) before the first deletion (Positive A, 04:01:34Z).

## Not done in G3 (by design)

- No production access, 41B.1B or N10 work.
- No change to `delete-account` or to the frozen SQL.
- No push; teardown awaits owner acceptance.
