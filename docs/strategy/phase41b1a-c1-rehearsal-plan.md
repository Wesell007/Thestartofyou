# Phase 41B.1A-C1 — Isolated Hosted Supabase Rehearsal: Plan

Status: **PLAN FOR REVIEW. NOT AUTHORISED FOR EXECUTION.** Planning only; nothing in this document has been run. No project exists, no credential has been issued, no database has been connected to.

Date: 3 October 2026. Author of record: Claude Code (implementation owner). Approver: the owner.

Purpose: prove that the reviewed 41B.1A foundation migration behaves correctly in a real PostgreSQL / Supabase environment before any later family-entity phase proceeds. The question is not "does it run" but whether atomicity, lock bounds, `NOT VALID → VALIDATE`, ownership integrity, RLS and privileges, one-open-pregnancy semantics, `removed_at` semantics, rollback refusal and success, clean re-application, catalogue cleanliness, repeatability and environment isolation all hold, with zero dependence on production data.

---

## A. Repository state

| Field | Value |
|---|---|
| Branch | `feat/41b1a-family-entity-foundation` |
| Final pushed commit (authoritative rehearsal source) | `735a07e6` (remote head = local head) |
| Static pre-rehearsal gate | **CLOSED PASS** (independent reviews of 9dbdfa46, 68ccc6d4 and 735a07e6; the optional lower-case identifier observation is accepted as non-material) |
| Forward file SHA-256 | `e6ad0bc82b245beb03131023bb9ce122a451f40c2fe9b75cd43f047b674585cb` |
| Validate file SHA-256 | `8645fd67f0b0211beb613b9d440e1f964d50e737f31862c11292c0103781b508` |
| Rollback file SHA-256 | `0d00895514b4e2dc623383436952fd534d5f879cdf4011024596dae303a36077` |
| Files | `docs/strategy/migrations-pending/41b1a_family_entity_foundation.sql`, `…_validate.sql`, `…_rollback.sql` |

The bytes rehearsed must equal the bytes at `735a07e6`. No rehearsal-specific edit to these files is permitted; any wrapper or harness lives outside them.

---

## B. Environment architecture

**Model.** Two new, temporary, isolated hosted Supabase projects in the owner's own organisation (WesellProducts, per 41B.0-R §19), created only after the owner confirms cost: `tsoy-41b1a-c1-run1` and `tsoy-41b1a-c1-run2` (the second for C1.17). Synthetic data only. Disposable once the evidence package is reviewed.

**Never used:** the Lovable-managed production project (`wogepxfipdipogyogced`), any staging or preview that shares the production database, any project holding real users, any project another workflow depends on.

**Who creates.** The owner, in the Supabase dashboard, choosing the region closest to production and the same Postgres major as production if the owner can read it from the production dashboard (version is structure, not customer data; if unknown, the default is accepted and recorded). The owner records the project ref, region, Postgres version and creation timestamp in `00-identity.md` of the evidence package.

**Identity recording and proof.** Immediately after creation the operator runs, as the project `postgres` role, one bootstrap statement creating `public.c1_rehearsal_marker(project_ref text primary key, run_label text, created_at timestamptz default now())` with one row holding the real project ref. Every rehearsal script and every wrapper begins with a preamble that:

1. parses the project ref from the connection host (`db.<ref>.supabase.co` or the pooler host) and asserts it is not `wogepxfipdipogyogced` and not any ref on the deny-list file kept outside the repo;
2. asserts `select project_ref from public.c1_rehearsal_marker` equals the expected ref passed to the wrapper;
3. asserts `select count(*) from auth.users where email not like '%@example.invalid'` = 0;
4. asserts `select count(*) from auth.users` ≤ the synthetic count for the stage;
5. records `select version(), current_database(), current_user, inet_server_addr()`.

Any failed assertion aborts the wrapper before a connection is used for anything else. The deny-list is also enforced in the wrapper's argument parsing: a connection string containing the production ref is rejected before psql is invoked.

**`supabase/config.toml` hazard.** The repository's `config.toml` carries `project_id = "wogepxfipdipogyogced"`. Any Supabase CLI use must happen in a scratch clone where that value has been replaced by the rehearsal ref and the wrapper re-asserts the ref before each command. The repository copy is never changed.

**Credentials.** Database password, service-role key and personal access token live only in the owner's password manager and in the operator's shell session (`PGPASSWORD` or a `.pgpass` file outside the repository). They never enter the repository, the evidence package, a `.env`, a commit message or a chat transcript. Evidence logs are passed through a redaction filter (JWT prefix `eyJ`, `postgres://…:…@`, `service_role`, `sb_secret`, `apikey`) before being saved.

**Destruction.** After the evidence package is reviewed and accepted by the owner: pause each project, confirm no evidence is still needed, then delete it from the dashboard. Record deletion timestamps in `99-summary.md`. Rotate the personal access token used.

---

## C. Baseline schema strategy

**What 41B.1A depends on** (from the committed SQL and the live snapshot):

- `auth.users(id)` and the roles `anon`, `authenticated`, `service_role` (present in every Supabase project);
- `public.pregnancy_journey_status` enum with values `active, given_birth, no_longer_pregnant, pregnancy_loss, paused` (migration `20260726225957`);
- `public.set_updated_at()` (migration `20260420164527`);
- tables `journeys`, `babies`, `reflections`, `week_photos`, `week_media_memories`, `pregnancy_appointments`, `pregnancy_symptom_notes`, `baby_movement_notes`, `birth_plans`, `hospital_bag_items`, `midwife_questions`, `contraction_sessions`, `contraction_events`, each with `user_id uuid NOT NULL` and a CASCADE FK to `auth.users` (live snapshot confirms all 13);
- `gen_random_uuid()` (built in from PG 13);
- the legacy constraints the later phases will change, which must exist in the baseline so "no unrelated drift" is meaningful: `reflections_user_id_week_key`, `week_photos_user_id_week_key`, `week_media_memories_user_id_week_media_type_key`, `birth_plans_user_id_key`, `hospital_bag_items_user_id_category_item_key_key`, `babies_user_birth_order_idx`, `babies_one_primary_per_user_idx`, the four First Year `baby_id` FKs, `contraction_sessions_id_user_id_key`.

**Method.** Deterministic replay of the 47 committed migrations from a scratch clone at `735a07e6`, hash-verified file by file (`sha256sum supabase/migrations/*.sql` compared to `git ls-tree 735a07e6`), using the Supabase CLI against the linked rehearsal project (`supabase db push`), which applies each committed migration in order. This recreates every structure above exactly as the repository defines it. Extensions the migrations create (`pg_net`, `pgmq`, `supabase_vault`, `pg_cron`) are available on hosted projects; if `pg_cron` needs dashboard enablement first, that is recorded as an out-of-band step.

**Known, expected differences from live** (41B.0-R §14), each to be listed and classified at C1.1, none touching a 41B object: the email delivery objects from `20260720110000` exist in replay but not live; the `first-year-memories` storage bucket is created by no migration and is not needed for 41B.1A; the email cron job and vault secrets are not reproduced; two committed migrations that delete rows for hard-coded user ids are no-ops on synthetic data; `sandbox_exec` grants are a platform artefact; default privileges on new tables are recorded, not assumed.

**Structure only.** No production rows. No anonymised dump. No export of any live table. The only data in the project is the synthetic matrix of section F, created by the rehearsal scripts.

**Auth structures.** Synthetic users are created through the Auth admin API (service-role key, outside the repo) with addresses under `@example.invalid`, so `auth.users` rows exist for the CASCADE FKs. No auth trigger exists in the migrations (no `handle_new_user`), so no profile row is created automatically; that is fine for 41B.1A.

---

## D. Execution runner

**Preferred runner:** PostgreSQL client `psql` (16 or 17) installed on the operator workstation, invoked only through the wrapper as

```
psql "$C1_DSN" -1 -v ON_ERROR_STOP=1 -e -f <file>
```

`-1` makes the whole file one transaction, so `SET LOCAL lock_timeout` applies to every statement and a failure anywhere rolls everything back; `-e` echoes each statement into the log so the executed text can be compared with the file; `ON_ERROR_STOP` prevents psql from continuing past an error.

**Fallback runner:** Supabase CLI `supabase db push --linked` from the scratch clone, with the authoritative files copied byte-identically into a disposable `supabase/migrations/<timestamp>_41b1a_*.sql` overlay that is never committed. The CLI applies each migration file inside a transaction; this is verified, not assumed, by running C1.3 with the fallback before it is relied upon.

**Forbidden:** the dashboard SQL editor or any tool that executes statement by statement, and any hand-pasted SQL.

**Hash gate (every execution, no exceptions).** The wrapper refuses to run unless, immediately before invoking the runner, `sha256sum <file>` equals the expected constant for that file (section A), prints both values into the log, and after the run hashes the echoed statement text and records it. Expected-versus-local mismatch = STOP, no execution. The three constants are embedded in the wrapper from `git show 735a07e6:<path> | sha256sum`, recomputed by the operator at C1.0 and recorded.

**Transaction evidence.** C1.3 proves atomicity (forced failure leaves nothing). The lock test (section L) proves `SET LOCAL lock_timeout` is in force (`canceling statement due to lock timeout` within the bound). A harness run also captures `select current_setting('lock_timeout')` as the last statement inside the transaction (`5s`) and `show lock_timeout` in a fresh session afterwards (server default), proving LOCAL scope. The absence of `WARNING: SET LOCAL can only be used in transaction blocks` in every log is a required check.

---

## E. Rehearsal stages

Each stage records: purpose, setup, action, expected result, evidence, PASS, STOP and cleanup. Stages run in order; a STOP halts the run and is reported to the owner before anything continues.

### C1.0 — Environment identity and isolation proof
- Purpose: prove the correct, isolated, empty project and the correct source.
- Setup: project created by the owner (section B); scratch clone at `735a07e6`; wrapper installed; deny-list file present.
- Action: bootstrap `c1_rehearsal_marker`; run the identity preamble; compute and record SHA-256 of the three files and of all 47 committed migrations; record runner versions (`psql --version`, `supabase --version`), `select version()`, project ref, region, timestamps.
- Expected: ref ≠ production; marker matches; `auth.users` empty; hashes equal section A.
- Evidence: `00-identity.md`, `01-hashes.txt`.
- PASS: all assertions true. STOP: any mismatch, any non-synthetic user, any hash difference.
- Cleanup: none.

### C1.1 — Baseline schema establishment
- Purpose: the exact pre-41B.1A structure, so every later diff is attributable.
- Setup: C1.0 passed.
- Action: `supabase db push` from the scratch clone; then capture the baseline catalogue with the section G query set in the same shape as the 27 September live snapshot; diff against that snapshot; classify every difference per 41B.0-R §14.
- Expected: all 13 link tables, the enum, `set_updated_at()`, the legacy constraints and all policies exist; no 41B.1A object exists; differences limited to the known list.
- Evidence: `02-baseline-catalogue.txt`, `02a-baseline-vs-live-classification.md`.
- PASS: no unclassified difference and none touching a 41B object. STOP: a migration fails, or a difference touches a 41B object.
- Cleanup: none.

### C1.2 — Synthetic test-data matrix
- Purpose: deterministic data for every semantic proof (section F).
- Setup: C1.1 passed.
- Action: create users A, B, C via the Auth admin API; insert the pre-migration rows of section F as the `postgres` role (legacy rows that must remain unbound); record the ids in `03-synthetic-ids.json` (ids only, no personal data exists).
- Expected: rows exist; identity preamble still passes (3 users, all `@example.invalid`).
- Evidence: `03-synthetic-ids.json`, row counts per table.
- PASS: counts match the matrix. STOP: any insert fails for a reason other than a planned negative case.
- Cleanup: none (the data is the fixture).

### C1.3 — Forced-failure atomicity proof
- Purpose: prove the runner executes the file as one transaction.
- Setup: baseline + fixture; no 41B.1A object present (verified by section G query Q-ABSENT).
- Action: run the harness file `C1_3_FORCED_FAILURE__DO_NOT_SHIP.sql` through the same wrapper and runner. The harness is a byte copy of the forward file with one appended statement `DO $$ BEGIN RAISE EXCEPTION 'C1.3 forced failure after all DDL'; END $$;`. The harness lives outside the repository, its hash is recorded and expected to differ from the authoritative hash, and the wrapper is run in a mode that accepts only this one harness hash.
- Expected: runner exits non-zero at the final statement; Q-ABSENT shows no `pregnancy_episodes`, no link column on any of the 13 tables, no `babies_id_user_id_key`, no new index, policy or trigger; the catalogue equals the C1.1 baseline.
- Evidence: `04-atomicity-forced-failure.log`, `04a-catalogue-after-failure-diff.txt` (empty diff).
- PASS: non-zero exit and empty catalogue diff. STOP: any 41B.1A object survives (the runner is not transactional: switch runner and repeat; if neither runner proves atomic, C1 = FAIL / HOLD).
- Cleanup: none required if PASS; if objects survived, run the authoritative rollback only after owner review.

### C1.3b — Lock-timeout proof (mandatory, section L)
- Purpose: prove S1's bounded wait and that a lock failure is atomic.
- Setup: as C1.3; a second session holds `BEGIN; LOCK TABLE public.journeys IN ACCESS EXCLUSIVE MODE;`.
- Action: run the authoritative forward file through the wrapper (hash gate passes). Time the run.
- Expected: failure within roughly 5 seconds at `ALTER TABLE public.journeys ADD COLUMN …` with `canceling statement due to lock timeout`; because `pregnancy_episodes` was created earlier in the same file, its absence afterwards is a second atomicity proof.
- Evidence: `05-lock-timeout.log` with timestamps, `05a-catalogue-after-lock-failure-diff.txt` (empty).
- PASS: error text matches, elapsed time bounded, empty diff. STOP: the run waits beyond the bound (SET LOCAL not in force), or any object survives.
- Cleanup: the second session issues `ROLLBACK`; confirm no lock remains (`pg_locks`).

### C1.4 — Forward migration
- Purpose: apply the authoritative file.
- Setup: C1.3 and C1.3b passed; catalogue equals baseline; no contending session.
- Action: wrapper + runner on the forward file. Record wall time and `pg_stat_activity` wait events sampled during the run.
- Expected: exit 0; no WARNING lines; log shows each statement once.
- Evidence: `06-forward.log`, duration.
- PASS: exit 0 and C1.5 passes. STOP: any error or warning.
- Cleanup: none.

### C1.5 — Forward catalogue verification
- Purpose: exactly the expected objects, nothing else, from catalogues not assumptions.
- Action: capture the full catalogue (section G) and diff against C1.1. Run the targeted queries G-1 to G-12.
- Expected: see section G expected results; the diff contains only 41B.1A objects.
- Evidence: `07-catalogue-after-forward.txt`, `07a-catalogue-diff-forward.txt`, `07b-targeted-queries.md`.
- PASS: every targeted query matches and the diff has no unrelated line. STOP: any missing, extra or altered object.

### C1.6 — Pre-validation FK behaviour (`NOT VALID` is not "not enforced")
- Purpose: prove PostgreSQL semantics the design relies on.
- Setup: forward applied, validate not yet run.
- Action: (1) query `pg_constraint.convalidated` for the 13 links, expect `false`; (2) as `postgres`, insert a reflection for user A bound to A's episode: succeeds; (3) insert a reflection for user A bound to B's episode: fails with a foreign-key violation naming `reflections_pregnancy_episode_owner_fkey`; (4) update an existing legacy (NULL-link) row of A to point at B's episode: fails; (5) repeat (2) to (4) on `journeys.current_pregnancy_episode_id` and on `babies`; (6) existing rows keep NULL links untouched and are not scanned until C1.7.
- Expected: new and updated rows are constrained immediately; existing rows are unvalidated only in the catalogue flag sense.
- Evidence: `08-not-valid-behaviour.log` with the exact error text.
- PASS: all six outcomes as expected. STOP: a cross-user link is accepted anywhere.
- Cleanup: delete the rows inserted in (2); the fixture remains.

### C1.7 — Validation migration
- Action: wrapper + runner on the validate file; capture `convalidated` before and after for every FK in the schema, not only the 13.
- Expected: exit 0; exactly the 13 named constraints move from `false` to `true`; no other constraint's `convalidated` changes (the pre-existing NOT VALID `reflections_user_id_fkey` and `week_photos_user_id_fkey` from `20260720120000` must remain as they were).
- Evidence: `09-validate.log`, `09a-convalidated-before-after.txt`.
- PASS: exactly 13 transitions. STOP: any other transition or a validation failure.

### C1.8 — Ownership integrity matrix
- Execute section I in full on all 13 relationships (complete coverage; this is a one-time foundation).
- Evidence: `10-ownership-matrix.md` with the actual error text per negative case.
- PASS: every row of section I matches. STOP: any cross-user acceptance.

### C1.9 — Open-pregnancy uniqueness and `removed_at`
- Execute section J.
- Evidence: `11-uniqueness-removed_at.md`.
- PASS: every row matches; a removed episode still exists with `ended_at` and `outcome_date` unchanged and status unchanged. STOP: a removed episode blocks a new one, or removal requires or produces an outcome.

### C1.10 — Episode CHECK semantics
- Cases, using the exact rules in the file: `due_date = lmp_date` rejected; `due_date = lmp_date + 300` accepted; `+ 301` rejected; `expected_count` 0 rejected, 1 and 4 accepted, 5 rejected, NULL accepted; `status = 'active'` with `ended_at` set rejected; `status = 'given_birth'` with `ended_at` NULL rejected; `paused` with NULL `ended_at` accepted; `pregnancy_loss` with `ended_at` set accepted; `lmp_date` NULL rejected (NOT NULL).
- Evidence: `12-check-constraints.md`.
- PASS: all as listed. STOP: any divergence.

### C1.11 — RLS matrix
- Execute section H using real role switching (`set local role authenticated; select set_config('request.jwt.claims', '{"sub":"<A>","role":"authenticated"}', true)`), and, as a second channel, PostgREST calls with a signed-in synthetic user's JWT.
- Evidence: `13-rls-privilege-matrix.md`.
- PASS: every row matches. STOP: any cross-owner row visible, or any authenticated write succeeds.

### C1.12 — Grant and RLS interaction proof
- Capture the exact server message for authenticated INSERT, UPDATE and DELETE (`permission denied for table pregnancy_episodes`, error 42501), demonstrating that the INSERT, UPDATE and DELETE policies do not confer a privilege the role lacks. Record the ACL from `pg_class.relacl` and `information_schema.role_table_grants` alongside.
- Why four policies exist: the policies are the row rules for a later phase in which `INSERT` and `UPDATE` are granted under the 41B.1C transition trigger; today the table privileges deny direct writes regardless; `DELETE` is never granted. This architecture is not changed in C1.
- Evidence: in `13-rls-privilege-matrix.md`.

### C1.13 — Rollback refusal tests (run as table owner)
- Execute section K refusals, each followed by the full catalogue capture and diff against C1.5 (must be empty) to prove no partial rollback.
- Evidence: `14-rollback-refusals.log`, per-case empty diffs.
- PASS: every case aborts with the expected `ROLLBACK REFUSED` message and empty diff. STOP: any case proceeds or any diff.

### C1.14 — Rollback success-path preparation
- Action: run the safe-state query set (section K) and the explicit cleanup sequence inside one transaction as `postgres`: null the 12 link columns and the journeys pointer on fixture rows (or delete the fixture rows), delete fixture episodes, drop the scratch tables created for refusal cases, confirm no later-phase FK and no dependant of `babies_id_user_id_key`.
- Expected: every safe-state query returns 0.
- Evidence: `15-safe-state-queries.txt` with results.
- PASS: all zero. STOP: any non-zero.

### C1.15 — Successful rollback
- Action: wrapper + runner on the rollback file, as table owner, one transaction.
- Expected: exit 0; catalogue equals the C1.1 baseline exactly; no legacy object missing; `pg_depend` shows nothing dropped by cascade (the file contains no CASCADE).
- Evidence: `16-rollback-success.log`, `17-catalogue-diff-rollback.txt` (empty against baseline).
- PASS: empty diff. STOP: any residual or missing object.

### C1.16 — Re-apply after rollback
- Action: re-record hashes; forward; validate; rerun C1.5, and the critical rows of sections I, J and H (marked ★ in those sections).
- Expected: identical results to the first run.
- Evidence: `18-reapply.log`, `18a-catalogue-diff-reapply.txt` (empty against C1.5).
- PASS: identical. STOP: any difference.

### C1.17 — Fresh-project repeatability
- Action: on `tsoy-41b1a-c1-run2`, created clean (not cloned): C1.0, C1.1, C1.2, C1.4, C1.5, C1.7, the ★ rows of I, J and H, one refusal case (episode rows exist), C1.14, C1.15 with the empty baseline diff. C1.3, C1.3b and C1.6 are not repeated unless run 1 needed a runner switch, in which case C1.3 is repeated with the chosen runner.
- Expected: identical outcomes.
- Evidence: `19-fresh-project/` mirroring the run-1 files.
- PASS: identical. STOP: any difference between the runs, which indicates accidental state in run 1.

### C1.18 — Exploratory only: account deletion observation
- Not a PASS criterion. On run 1 after C1.16, with a synthetic user holding an episode, bound rows, a linked baby and a populated pointer, call the real `auth.admin.deleteUser` path and record the outcome and `select tgname from pg_trigger where tgrelid = 'auth.users'::regclass order by tgname`. This observation cannot close the pre-41B.1B gate because RI trigger order is OID-based and environment-specific. FK design is not modified.
- Evidence: `20-account-deletion-observation.md`, labelled EXPLORATORY.

### C1.19 — Teardown
- Pause, then delete both projects after the owner accepts the evidence package; rotate the access token; record timestamps.

---

## F. Synthetic-data matrix

Users: A, B, C (`c1-user-a@example.invalid` etc., created through the Auth admin API). All rows carry synthetic text only.

Pre-migration fixture (legacy, unbound by construction because the link columns do not exist yet):

| Table | Rows |
|---|---|
| `journeys` | A: lifecycle `pregnancy`; B: `first_year`; C: `ttc` |
| `pregnancy_journeys` | A and B rows with valid dates (legacy mirror table, untouched by 41B.1A) |
| `babies` | B: two babies (birth_order 1 primary, 2); C: none |
| `reflections`, `week_photos`, `week_media_memories` | A: one row each (week 12); B: one reflection (week 30) |
| toolkit tables (appointments, symptom notes, movement notes, birth plan, hospital bag item, midwife question, contraction session + two events) | A: one row each; B: one appointment |

Post-migration episode fixture (inserted as `postgres`, since authenticated cannot insert):

| Episode | User | status | ended_at | outcome_date | removed_at | expected_count |
|---|---|---|---|---|---|---|
| E-A1 | A | active | NULL | NULL | NULL | 1 |
| E-B1 | B | given_birth | set | set | NULL | 2 |
| E-B2 | B | active (created after E-B1; ended + active = PASS) | NULL | NULL | NULL | NULL |
| E-C1 | C | pregnancy_loss | set | set | NULL | 1 |
| E-A2 | A | paused (inserted only after E-A1 is removed; proves removed-active + new-open PASS) | NULL | NULL | NULL | NULL |

Ownership links set during C1.6 and C1.8: same-user valid (A rows → E-A1), cross-user invalid (A rows → E-B1), NULL optional links left on at least one row per table. Current journey: A pointer → E-A1 (valid), later A pointer → removed E-A1 (allowed by schema; the 41B.1C transition clears it; recorded), C pointer NULL (no episode). Legacy state: every pre-migration row stays with NULL link; 41B.1B backfill is not performed.

---

## G. Catalogue-query matrix

Full capture (same nine sections and ordering as `phase41b1a-live-catalogue-snapshot.md`, so diffs are stable): columns from `information_schema.columns`; enums from `pg_enum`; functions from `pg_proc` with body hash; triggers from `pg_trigger`; RLS flags from `pg_class.relrowsecurity, relforcerowsecurity`; policies from `pg_policy` (name, command, roles, permissive, `pg_get_expr` of qual and with_check); constraints from `pg_constraint` with `pg_get_constraintdef` and `convalidated`; indexes from `pg_indexes`; grants from `pg_class.relacl`.

Targeted queries and expected results after forward:

| # | Query purpose | Expected |
|---|---|---|
| Q-ABSENT | `to_regclass('public.pregnancy_episodes')` and the 13 link columns in `information_schema.columns` | all NULL / zero rows before forward, after C1.3, after C1.3b, after C1.15 |
| G-1 | columns of `pregnancy_episodes` | 13 columns; `removed_at timestamptz` nullable; `lmp_date`, `due_date` NOT NULL; `status` enum default `'active'` |
| G-2 | `pg_constraint` on `pregnancy_episodes` | exactly 6: pkey, `id_user_id_key`, `user_id_fkey` (CASCADE), `dates_check`, `expected_count_check`, `ended_at_status_check` |
| G-3 | `pg_indexes` on `pregnancy_episodes` | pkey, `id_user_id_key`, `one_open_per_user_idx` UNIQUE with predicate `status IN ('active','paused') AND removed_at IS NULL`, `user_id_idx`; nothing else |
| G-4 | `pg_trigger` on `pregnancy_episodes` (non-internal) | exactly `pregnancy_episodes_set_updated_at`, BEFORE UPDATE, function `public.set_updated_at()` |
| G-5 | `relrowsecurity` | true; `relforcerowsecurity` false |
| G-6 | `pg_policy` on `pregnancy_episodes` | exactly 4, all permissive, role `authenticated`, expressions `(auth.uid() = user_id)` as designed |
| G-7 | `relacl` and `role_table_grants` | `authenticated` SELECT only; `service_role` all; no `anon`; no PUBLIC entry |
| G-8 | `pg_constraint` where `confrelid = 'public.pregnancy_episodes'::regclass` | exactly 13, each `(…, user_id) REFERENCES pregnancy_episodes(id, user_id) ON DELETE RESTRICT`, `convalidated = false` before C1.7 and `true` after |
| G-9 | link indexes | 13 `(…, user_id)` indexes named `<table>_pregnancy_episode_idx` and `journeys_current_pregnancy_episode_idx` |
| G-10 | `babies_id_user_id_key` | present, UNIQUE (id, user_id) |
| G-11 | legacy constraints list (section C) | all present and unchanged in definition |
| G-12 | whole-catalogue diff vs baseline | only the objects above |

After rollback: Q-ABSENT null, G-12 diff empty against baseline.

---

## H. RLS and privilege matrix

| # | Actor | Operation | Expected |
|---|---|---|---|
| H-1 ★ | authenticated as A | SELECT own episodes | rows of A only |
| H-2 ★ | authenticated as A | SELECT where `user_id = B` | zero rows, no error |
| H-3 ★ | authenticated as A | INSERT episode for A | `permission denied for table pregnancy_episodes` (42501) |
| H-4 ★ | authenticated as A | UPDATE own episode | 42501 |
| H-5 ★ | authenticated as A | DELETE own episode | 42501 |
| H-6 | authenticated as A | SELECT via PostgREST with A's JWT | same as H-1 |
| H-7 | anon | SELECT | 42501 |
| H-8 | service_role | SELECT all, INSERT, UPDATE | succeeds (bypasses RLS; approved administrative access) |
| H-9 | postgres (owner) | all | succeeds; used for fixtures and rollback |

Interpretation recorded with the evidence: policy presence never grants a privilege; four policies exist for the later controlled write path.

---

## I. Ownership matrix

For each of the 13 relationships (journeys pointer and the 12 looped tables), as `postgres` after forward:

| Case | Expected |
|---|---|
| ★ same user: A row → E-A1 | accepted |
| ★ cross user: A row → E-B1 | foreign-key violation naming `<table>_pregnancy_episode_owner_fkey` |
| NULL link on a row | accepted |
| update an existing NULL-link A row to E-B1 | violation |
| update to E-A1 then back to NULL | accepted both ways |
| episode id of B with A's `user_id` (composite mismatch) | violation (the composite key is the point) |
| `contraction_events` bound to a session's episode and its own episode consistent | accepted; a mismatch between event and session episode is not constrained in 41B.1A (recorded; 41B.1C trigger) |

All 12 looped tables are exercised directly, not by representative sampling.

---

## J. Uniqueness and removal matrix

For user A unless stated:

| Case | Expected |
|---|---|
| ★ one active | accepted |
| ★ second active | unique violation on `pregnancy_episodes_one_open_per_user_idx` |
| ★ active + paused | violation (both open) |
| ended (B: given_birth) + new active (E-B2) | accepted |
| ★ set `removed_at = now()` on E-A1, then insert new active | accepted |
| removed paused + new active | accepted |
| ★ removed episode still exists, `status` unchanged (`active`), `ended_at` NULL, `outcome_date` NULL | true |
| setting `removed_at` requires no other column change | the single-column UPDATE succeeds |
| clearing `removed_at` while another open episode exists | violation (re-opening is blocked by the index, as designed) |
| `updated_at` advances on the removal UPDATE | true (trigger) |

---

## K. Rollback refusal and success matrix

Refusals (each as table owner, one transaction, followed by an empty catalogue diff):

| Case | Setup | Expected message |
|---|---|---|
| ★ episode rows exist | fixture present | `ROLLBACK REFUSED: public.pregnancy_episodes holds N row(s)` |
| bound links exist, no episodes | delete episodes impossible while bound; instead test with one bound reflection after moving episodes… (ordering: run after episodes deleted but one link re-pointed to a surviving scratch episode) | `… row(s) in public.reflections are bound …` |
| pointer populated | journeys pointer set | `… journeys row(s) point at a pregnancy episode` |
| later-phase FK exists | scratch table `c1_scratch_episode_dep(episode_id, user_id)` with FK to `pregnancy_episodes(id, user_id)` | `… foreign key(s) from a later phase reference pregnancy_episodes` |
| dependant of babies key | scratch table with FK `(baby_id, user_id) → babies(id, user_id)` | `… foreign key(s) depend on babies_id_user_id_key` |

Safe-state query set (all must return 0 before C1.15): `count(*) from pregnancy_episodes`; `count(*) from journeys where current_pregnancy_episode_id is not null`; for each of the 12 tables `count(*) where pregnancy_episode_id is not null`; `count(*) from pg_constraint where confrelid = 'public.pregnancy_episodes'::regclass and conname <> all(<13 names>)`; `count(*) from pg_constraint f join pg_constraint u on u.conindid = f.conindid where f.contype='f' and u.conname='babies_id_user_id_key'`; `count(*) from pg_class where relname like 'c1_scratch%'`.

Success: exit 0; catalogue diff against C1.1 baseline empty; the fixture's legacy rows still present with their counts unchanged.

---

## L. Atomicity and lock-contention tests

Both mandatory for PASS. S1 exists precisely to bound lock waits and to make the foundation safe to apply in a live window; a migration that could wait indefinitely or leave partial state would invalidate the production plan. C1.3 (forced failure after all DDL) proves whole-file atomicity; C1.3b (ACCESS EXCLUSIVE held on `journeys`) proves the 5-second bound, the correct failing statement, and atomicity again because `pregnancy_episodes` created earlier in the file must not survive. A third, optional, probe holds a lock on `babies` to show the loop also fails cleanly late in the file.

---

## M. Reapplication and fresh-project repeatability

Defined in C1.16 and C1.17. Repeatability on a fresh project is mandatory. The minimum repeated set is baseline, forward, validate, the ★ rows of H, I and J, one refusal, the safe-state queries and a successful rollback with an empty baseline diff. Projects are never cloned from each other.

---

## N. Evidence package

Proposed location: `docs/strategy/evidence/41b1a-c1/` (created only when execution is authorised).

```
00-identity.md                      project refs, region, versions, timestamps, operator, branch, commit
01-hashes.txt                       SHA-256 of the three files and the 47 migrations; runner versions
02-baseline-catalogue.txt           full capture, snapshot format
02a-baseline-vs-live-classification.md
03-synthetic-ids.json               synthetic ids and labels only
04-atomicity-forced-failure.log  04a-catalogue-after-failure-diff.txt
05-lock-timeout.log              05a-catalogue-after-lock-failure-diff.txt
06-forward.log
07-catalogue-after-forward.txt   07a-catalogue-diff-forward.txt   07b-targeted-queries.md
08-not-valid-behaviour.log
09-validate.log                  09a-convalidated-before-after.txt
10-ownership-matrix.md
11-uniqueness-removed_at.md
12-check-constraints.md
13-rls-privilege-matrix.md
14-rollback-refusals.log
15-safe-state-queries.txt
16-rollback-success.log          17-catalogue-diff-rollback.txt
18-reapply.log                   18a-catalogue-diff-reapply.txt
19-fresh-project/                mirror of the above for run 2
20-account-deletion-observation.md   EXPLORATORY, not a PASS input
21-41b1b-date-rule-preflight.sql     future query, not run in C1
99-summary.md                        PASS/FAIL per criterion, teardown timestamps
```

Every file passes the redaction filter before it is written. Project refs and hostnames may appear; passwords, keys, tokens and full connection strings may not.

---

## O. Security and secrets requirements

- Credentials only in the owner's password manager and the operator's shell session; never in the repository, evidence, `.env`, commit messages or transcripts.
- The repository `supabase/config.toml` is never pointed at a rehearsal project; CLI work happens in a scratch clone whose `project_id` is replaced and re-asserted.
- Deny-list of production identifiers enforced in the wrapper before any connection.
- Synthetic users only, addresses under `@example.invalid`, asserted before every destructive step.
- Access token rotated and projects deleted at teardown.
- Nothing from production is read during C1. The one production fact wanted (Postgres major version) is supplied by the owner from the dashboard or left unknown and recorded.

---

## P. C1 PASS checklist

All mandatory:

1. Environment identity proven for both projects; production ref denied.
2. Zero real or customer data; all users synthetic.
3. File hashes equal `735a07e6` before every execution.
4. Forced failure proves whole-file atomicity (C1.3).
5. Lock-timeout bound and atomicity on contention proven (C1.3b).
6. Forward succeeds with no warning (C1.4).
7. Catalogue exactly as expected; no unrelated drift (C1.5, G-1 to G-12).
8. `NOT VALID` enforces new and updated rows; existing rows untouched (C1.6).
9. Validation moves exactly 13 constraints to validated (C1.7).
10. Same-user links accepted on all 13 relationships; cross-user links rejected on all 13 (C1.8).
11. Open-uniqueness and `removed_at` semantics as in section J, including removed episodes retained with no fabricated outcome (C1.9).
12. CHECK constraints accept and reject exactly as the file states (C1.10).
13. Authenticated SELECT-only proven at privilege level; owner isolation proven under RLS; anon denied (C1.11, C1.12).
14. Every rollback guard refuses with no partial change (C1.13).
15. Successful rollback restores the baseline exactly (C1.15).
16. Re-application succeeds with identical results (C1.16).
17. Fresh-project run reproduces the results (C1.17).
18. No production or shared environment touched; no secret in evidence or repository.

Any mandatory failure: **41B.1A-C1 = FAIL / HOLD**, reported to the owner; no reinterpretation as non-blocking without owner review.

---

## Q. Explicit exclusions

- No backfill, no `pregnancy_journeys` migration, no 41B.1B work. The only 41B.1B artefact is the future preflight query below, which is not run in C1.
- No `babies.archived_at`, no legacy constraint change, no function or client change (41B.1C), no tightening (41B.1D).
- Account deletion under RESTRICT: observed only (C1.18); never a PASS input; FK design unchanged.
- No production inspection of any kind.

Future 41B.1B preflight (recorded for later, not run): aggregate counts of `pregnancy_journeys` rows failing the episode date rule, and of `archived_journeys` pregnancy snapshots failing it or lacking `lmp_date`:

```sql
select count(*) filter (where not (due_date > lmp_date and due_date <= lmp_date + 300)) as journeys_failing_date_rule
from public.pregnancy_journeys;
select count(*) filter (where (snapshot->>'lmp_date') is null
                         or not ((snapshot->>'due_date')::date > (snapshot->>'lmp_date')::date
                                 and (snapshot->>'due_date')::date <= (snapshot->>'lmp_date')::date + 300)) as archives_failing_date_rule
from public.archived_journeys where lifecycle = 'pregnancy';
```

Classification for any such row: **ambiguous — do not create automatically**. The exact snapshot column names are confirmed against the schema in 41B.1B before use.

---

## R. Post-C1 gate

C1 PASS establishes **41B.1A = REHEARSAL PASS**. It does not authorise production application (41B.0-R §11 evidence ladder still applies: owner-observed platform backup within 24 hours, restore procedure written down, quiet window, explicit approval) and it does not authorise 41B.1B. The next action after C1 PASS is to close the mandatory pre-41B.1B account-deletion gate by one of the three recorded routes (structure-only production `pg_trigger` inspection; owner-approved deferrable `NO ACTION`; explicit deletion ordering in the account-deletion function). No route is chosen here.
