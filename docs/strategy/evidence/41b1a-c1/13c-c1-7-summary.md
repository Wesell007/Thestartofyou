# 41B.1A-C1 — 13c C1.7 validation migration (Project 1)

Result: **C1.7 PASS — all 13 Pregnancy Episode ownership FKs validated successfully; no data or unrelated schema changed.** Executed 2026-10-05T20:06:51Z to 20:06:52Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11.0.002, psql 17.11. This is a rehearsal on the isolated project, NOT production. The rollback file has NOT been run; C1.8 has NOT started.

## Authoritative procedure

Plan `docs/strategy/phase41b1a-c1-rehearsal-plan.md`, stage C1.7: "wrapper + runner on the validate file; capture `convalidated` before and after for every FK in the schema, not only the 13. Expected: exit 0; exactly the 13 named constraints move from false to true; no other constraint's `convalidated` changes (the pre-existing NOT VALID `reflections_user_id_fkey` and `week_photos_user_id_fkey` must remain as they were)." Evidence names follow this directory's numbering (`13*`) rather than the plan's placeholders `09-validate.log` / `09a-convalidated-before-after.txt`.

## Frozen file inspection (Step 3, read-only)

`41b1a_family_entity_foundation_validate.sql`, SHA-256 `8645fd67f0b0211beb613b9d440e1f964d50e737f31862c11292c0103781b508` in the repository (HEAD be00837d, clean) and in the scratch clone at 735a07e6 (only `supabase/config.toml` differs, Project 1 ref). Forward file re-verified `e6ad0bc82b245beb03131023bb9ce122a451f40c2fe9b75cd43f047b674585cb`. Contents: 28 lines; 14 non-comment statements = `SET LOCAL lock_timeout = '5s'` + exactly 13 `ALTER TABLE … VALIDATE CONSTRAINT` naming exactly the 13 ownership FKs (one per table); no INSERT/UPDATE/DELETE/TRUNCATE, no DROP/CREATE, no GRANT/REVOKE, no transaction control (the grep for "VALIDATE CONSTRAINT" also matches one comment line, hence 14 textual hits for 13 statements). Neither frozen file was modified.

## Pre-state gate (20:06:28Z, integration)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; history 47; 3 Auth users (all `@example.invalid`), 0 non-synthetic; 21 legacy fixture rows; 2 episode rows (E-A1 `…ea01` user A active; E-B1 `…eb01` user B given_birth); 0 non-null links; 0 non-null pointers; ownership FKs 13 / NOT VALID 13 / validated 0 / RESTRICT 13; unvalidated constraints in `public` 15 = the 13 ownership links + `reflections_user_id_fkey` + `week_photos_user_id_fkey`; 0 idle-in-transaction, 0 ACCESS EXCLUSIVE locks in `public`, 0 `c1_scratch%` objects. Row-identity fingerprint (md5 over `xmin, ctid, tableoid` of every row in the 14 affected tables): `a4b7ace95762027ff912bb88b7d11c5a`; content fingerprint of journeys/babies/reflections/episodes rows: `44bee7efbce486a8c5fd4445fe41ab52`.

C1.6 side effect carried forward, not repaired: user A's `journeys.updated_at` is 2026-10-05T20:01:11Z because the C1.6 pointer update and restore fired `set_updated_at`. Recorded; no timestamp was manually restored.

Before-state capture note: the psql before-capture command errored before returning rows (first on `text || "char"`, then on an `ORDER BY` position) and produced no file; it was not retried before the run. The pre-C1.7 state of every constraint is therefore evidenced by the C1.5 constraints section (`11-c1-5-post-forward-catalogue.md`, hash `161|9c67159c…` re-confirmed unchanged after C1.6 at 20:01:42Z) together with the 20:06:28Z integration query above (15 unvalidated, names listed). The after-capture (`13a-c1-7-constraints-after.txt`) uses the corrected query and is complete (161 constraints).

## Validation run (Step 4)

| Field | Value |
|---|---|
| File | scratch clone copy of `41b1a_family_entity_foundation_validate.sql`, hash gate `8645fd67…` passed |
| Runner | `c1_psql.sh` (`08b-c1_psql-wrapper.sh`): target and denylist asserted, direct endpoint `db.wwtcnbjhttjtklpxhrkd.supabase.co:5432`, role `postgres` (table owner), `-1 -v ON_ERROR_STOP=1 -e`, password read from the owner's file and never printed |
| External transaction | YES (`-1`): all 13 validations committed together |
| `ON_ERROR_STOP` | 1 |
| Started / completed (wrapper wall clock) | 2026-10-05T20:06:51.640Z / 20:06:52.119Z |
| Duration | 0.48 s including connection and hash gate |
| Exit code | 0 |
| Statements attempted / succeeded | 14 / 14 (`SET` + 13 × `ALTER TABLE`), each acknowledged in `13-c1-7-validate.log`; 0 ERROR, 0 WARNING, 0 NOTICE |

## Post-state (Step 5, fresh sessions: psql read-only 20:08Z, integration 20:07:53Z)

| Constraint | validated | on delete |
|---|---|---|
| `journeys_current_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `reflections_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `week_photos_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `week_media_memories_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `pregnancy_appointments_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `pregnancy_symptom_notes_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `baby_movement_notes_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `birth_plans_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `hospital_bag_items_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `midwife_questions_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `contraction_sessions_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `contraction_events_pregnancy_episode_owner_fkey` | true | RESTRICT |
| `babies_pregnancy_episode_owner_fkey` | true | RESTRICT |

Totals: ownership FKs 13, validated 13, NOT VALID 0, RESTRICT 13. Unvalidated constraints remaining in `public`: 2, exactly `reflections_user_id_fkey` and `week_photos_user_id_fkey`, unchanged as the plan requires. Transitions: exactly 13 (15 → 2).

## Validation scope and catalogue (Steps 6 and 7; `13b-c1-7-constraints-diff-vs-c1-5.md`)

| Section | C1.5 | post-C1.7 | Verdict |
|---|---|---|---|
| columns | 315 \| `f0281fd6…` | 315 \| `f0281fd6…` | unchanged |
| enums | 5 \| `e01eb254…` | 5 \| `e01eb254…` | unchanged |
| functions | 25 \| `920ec2f6…` | 25 \| `920ec2f6…` | unchanged |
| triggers | 36 \| `a4b05c5a…` | 36 \| `a4b05c5a…` | unchanged |
| rls | 35 \| `a02d18c7…` | 35 \| `a02d18c7…` | unchanged |
| policies | 118 \| `c5a61c1c…` | 118 \| `c5a61c1c…` | unchanged |
| constraints | 161 \| `9c67159c…` | 161 \| `a67632e1…` | 13 lines changed, each losing only the ` NOT VALID` suffix of a `…_pregnancy_episode_owner_fkey`; 148 lines byte-identical; 0 added, 0 dropped |
| indexes | 104 \| `001b4ec0…` | 104 \| `001b4ec0…` | unchanged |
| grants | 35 \| `0a9026c0…` | 35 \| `0a9026c0…` | unchanged |

No 41B.1C or 41B.1D constraint exists or was changed; the First Year `baby_id` FKs and every legacy Pregnancy constraint are byte-identical; the only change in the whole catalogue is the expected validation-state transition of the 13 ownership FKs. Unexpected changes: NONE.

## Data neutrality (Step 8)

Episode rows 2; E-A1 and E-B1 column-for-column identical to the pre-state (same `created_at`/`updated_at` 20:01:11Z); 3 users; 21 legacy fixture rows; 0 non-null links; 0 non-null pointers; content fingerprint unchanged (`44bee7ef…`); row-identity fingerprint unchanged (`a4b7ace9…`, so no tuple was rewritten: validation scanned rows, it did not mutate them). No backfill.

## Bookkeeping and cleanup (Steps 9 and 10)

History 47, range unchanged, 0 manual records; no `migration repair`; validate file not moved into `supabase/migrations`. After completion: 0 idle-in-transaction sessions, 0 ACCESS EXCLUSIVE or SHARE UPDATE EXCLUSIVE locks in `public`, 0 `c1_scratch%` objects. The plan defines no lock observation for C1.7 and none was taken beyond the wall-clock duration.

## Runtime sanity (Step 11)

The plan's C1.7 defines no post-validation behavioural write; none was performed. The same-user/cross-user semantics were proven at C1.6 while the constraints were NOT VALID; validation only adds coverage of pre-existing rows, all of which carry NULL links.

## PASS criteria

1 Project 1: PASS. 2 validate hash: PASS. 3 pre-state 0/13 validated: PASS. 4 approved transaction runner: PASS. 5 `ON_ERROR_STOP=1`: PASS. 6 exit 0: PASS. 7 all 13 intended constraints validated: PASS. 8 validated = 13: PASS. 9 NOT VALID = 0: PASS. 10 RESTRICT = 13: PASS. 11 no unrelated constraint change: PASS. 12 catalogue change limited to the 13 transitions: PASS. 13 episode fixture 2 rows: PASS. 14 legacy fixture unbound: PASS. 15 no DML/backfill, no tuple rewritten: PASS. 16 history 47: PASS. 17 no lingering transaction or lock: PASS. 18 production and Project 2 untouched: PASS. 19 evidence secret-free: PASS.

## Safety

Production (`wogepxfipdipogyogced`) accessed NO. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Customer data NO. Rollback file run NO. C1.8 started NO. Secrets committed NO.
