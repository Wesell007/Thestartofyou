# 41B.1A-C1 — 21e C1.15 successful rollback (Project 1)

Result: **C1.15 PASS — frozen 41B.1A rollback completed successfully on Project 1; the full post-rollback structural catalogue equals the C1.1 pre-foundation baseline under the fixed exclusions, all 21 legacy fixture rows and three synthetic users survive unchanged, and no unrelated object was removed.** Executed 2026-10-05T22:47:37Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11.0.002, psql 17.11, as `postgres` (table owner). The forward migration has NOT been reapplied; C1.16 has NOT started. After this stage the 41B.1A foundation is no longer present on Project 1.

## Authoritative procedure

Plan stage C1.15: wrapper + runner on the rollback file, as table owner, one transaction; expected exit 0; catalogue equals the C1.1 baseline exactly; no legacy object missing; nothing dropped by cascade (the file contains no CASCADE). Baseline-equality exclusions, the only permitted differences: `supabase_migrations.schema_migrations` bookkeeping (outside the public-schema capture), object OIDs (never captured), and `c1_rehearsal_marker` (present in both captures). Section K success row: exit 0; diff against C1.1 empty; legacy rows present with counts unchanged. Evidence names follow this directory's numbering (`21*`) rather than the plan's placeholders `16-rollback-success.log` / `17-catalogue-diff-rollback.txt`. The comparison is structural: the three synthetic users, the 21 legacy fixture rows, the marker and the 47 history rows are expected to remain and were not touched.

## Frozen files

Rollback SHA-256 `0d00895514b4e2dc623383436952fd534d5f879cdf4011024596dae303a36077` in the repository and the scratch clone (wrapper hash gate); forward `e6ad0bc8…` and validate `8645fd67…` unchanged; `CASCADE` occurrences outside comments in the rollback file: 0.

## Immediately before execution (`21-c1-15-pre-rollback-safe-state.log`, fresh session 22:45:56Z; catalogue 22:47:21Z)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; `current_user`/`session_user` `postgres`; history 47; users 3, non-synthetic 0; idle-in-transaction 0; ACCESS EXCLUSIVE 0. Section K safe-state set itemised: episodes 0, journey pointers 0, all twelve `pregnancy_episode_id` counts 0, later-phase FKs 0, dependants of `babies_id_user_id_key` 0, `c1_scratch%` 0. Legacy fixture 21 in the C1.2 shape. Pre-rollback nine-section snapshot diffs EMPTY against the C1.14 pre-C1.15 reference (`21f-c1-15-pre-rollback-vs-c1-14-reference.diff.txt`); legacy tuple-identity fingerprint `bec17c18…`, legacy content fingerprint `5dceeb47…` (integration, 22:47:20Z). No database action occurred between these captures and the rollback.

## Rollback execution (`21a-c1-15-rollback-success.log`)

| Field | Value |
|---|---|
| File | scratch clone copy of `41b1a_family_entity_foundation_rollback.sql`, hash gate `0d008955…` passed |
| Runner | `c1_psql.sh` (`08b-c1_psql-wrapper.sh`): target and denylist asserted, direct endpoint `db.wwtcnbjhttjtklpxhrkd.supabase.co:5432`, role `postgres`, `-1 -v ON_ERROR_STOP=1 -e`, password never printed |
| External single transaction | YES |
| Started / finished (wrapper wall clock) | 2026-10-05T22:47:37.271Z / 22:47:37.783Z |
| Elapsed | 0.51 s |
| Exit code | 0 |
| Refusal guard fired | none (the guard `DO` block completed without raising; the five `RAISE` lines visible in the transcript are the echoed source of the frozen file) |
| Statements acknowledged | `SET`, `DO` ×2 (guard block; 12-table loop), `ALTER TABLE` ×3 (journeys FK, journeys column, babies key), `DROP INDEX` ×3, `DROP POLICY` ×4, `DROP TRIGGER` ×1, `DROP TABLE` ×1 |
| ERROR / WARNING / NOTICE | 0 / 0 / 0 |

## Fresh-session verification (`21b-c1-15-post-rollback-verification.log`, 22:47:39Z)

Every 41B.1A object class absent: `pregnancy_episodes` ABSENT (`to_regclass` NULL); `journeys.current_pregnancy_episode_id` 0; `pregnancy_episode_id` columns 0; constraints named `%pregnancy_episode%` 0 (the 13 ownership FKs and the 3 episode CHECKs, pkey, unique key and auth FK went with the table and the loop); indexes named `%pregnancy_episode%` 0 (13 link indexes and the 4 episode indexes); policies `pregnancy_episodes_%` 0; triggers `pregnancy_episodes_%` 0; `babies_id_user_id_key` constraint 0 and index 0; `c1_scratch%` 0; `pg_class` relations mentioning `pregnancy_episode` 0. Public tables 34 (35 minus the dropped table); the twelve legacy constraints of the 41B.0-R ledger present 12/12; the two legacy baby indexes 2/2; public functions 25, triggers 35, policies 114.

Legacy preservation: users 3 (`c1-user-a/b/c@example.invalid`), non-synthetic 0; legacy fixture total 21 with the C1.2 distribution (journeys 3, pregnancy_journeys 2, babies 2, reflections 2, week_photos 1, week_media_memories 1, pregnancy_appointments 2, pregnancy_symptom_notes 1, baby_movement_notes 1, birth_plans 1, hospital_bag_items 1, midwife_questions 1, contraction_sessions 1, contraction_events 2), same row ids (`…a101`, `…b101`, `…b001`, `…b002`). Integration fresh session (22:48Z): legacy tuple-identity fingerprint and legacy content fingerprint identical to the pre-rollback values, so no legacy tuple was rewritten or changed (`DROP COLUMN` marks the attribute dropped without rewriting rows); E-A1/E-B1 remain absent as intended since C1.13 and were not recreated.

## Catalogue equality with C1.1 (`21c-c1-15-post-rollback-catalogue.md`, `21d-c1-15-diff-vs-c1-1-baseline.md` / `.json`)

Nine sections captured in the fresh session with the C1.1 queries and formats and compared by set difference against `02-baseline-catalogue.md` (functions against both the baseline file's `md5(prosrc)` lines and `02c`'s `md5(pg_get_functiondef)` lines):

| Section | C1.1 | C1.15 post | Removed | Added |
|---|---|---|---|---|
| columns | 289 | 289 | 0 | 0 |
| enums | 5 | 5 | 0 | 0 |
| functions | 25 | 25 | 0 / 0 | 0 / 0 |
| triggers | 35 | 35 | 0 | 0 |
| rls | 34 | 34 | 0 | 0 |
| policies | 114 | 114 | 0 | 0 |
| constraints | 141 | 141 | 0 | 0 |
| indexes | 86 | 86 | 0 | 0 |
| grants | 34 | 34 | 0 | 0 |

Diff: **EMPTY**. No exclusion had to be applied to reach it (`c1_rehearsal_marker` is in both captures; OIDs and migration bookkeeping are outside the capture). Integration-channel hashes equal the C1.1 record exactly: columns 289\|089827c5…, enums 5\|e01eb254…, functions 25\|920ec2f6…, triggers 35\|c76db905…, rls 34\|5c82068f…, policies 114\|e87cd992…, constraints 141\|ece1b4e9…, indexes 86\|b844916e…, grants 34\|22bb3e64…. Unexpected residual 41B.1A object: none. Missing legacy object: none.

## Dependency safety

The rollback file contains no `CASCADE`; every drop is `IF EXISTS` on a named 41B.1A object. Structural equality with C1.1 across all nine sections is the proof that nothing outside 41B.1A was removed or altered by dependency behaviour: every legacy table, column, enum value, function body, trigger, RLS flag, policy, constraint, index and grant is present with an identical definition. `pg_depend` holds no row for any relation named `%pregnancy_episode%` (0). The dropped link columns leave only PostgreSQL's internal `attisdropped` placeholders, which carry no user-visible name and which `information_schema.columns` and the catalogue capture exclude; the columns section therefore matches the baseline line for line (289).

## Bookkeeping, marker, sessions

History 47, range unchanged, 0 manual or rollback records (the rollback is not a Supabase migration and none was fabricated); marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; idle-in-transaction 0; ACCESS EXCLUSIVE or SHARE UPDATE EXCLUSIVE locks in `public` 0; scratch 0.

## PASS criteria

1 Project 1: PASS. 2 safe-state gate all zero immediately before: PASS. 3 rollback hash: PASS. 4 executed as `postgres` owner: PASS. 5 one external transaction: PASS. 6 `ON_ERROR_STOP=1`: PASS. 7 exit 0: PASS. 8 no refusal: PASS. 9 `pregnancy_episodes` absent: PASS. 10 13 ownership links/FKs removed: PASS. 11 episode indexes/CHECKs/trigger/RLS/policies/grants removed: PASS. 12 `babies_id_user_id_key` removed: PASS. 13 no scratch object: PASS. 14 all legacy objects remain: PASS. 15 nine-section catalogue equals C1.1: PASS. 16 only approved exclusions (none needed): PASS. 17 legacy fixture 21: PASS. 18 users 3: PASS. 19 non-synthetic 0: PASS. 20 history 47: PASS. 21 no cascade loss: PASS. 22 no lingering transaction or lock: PASS. 23 production untouched: PASS. 24 Project 2 untouched: PASS. 25 evidence secret-free: PASS.

## Safety

Forward migration reapplied NO. C1.16 started NO. Production (`wogepxfipdipogyogced`) accessed NO. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Customer data NO. Users or fixture rows deleted NO. Secrets committed NO.
