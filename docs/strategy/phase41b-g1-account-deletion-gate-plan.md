# Pre-41B.1B account-deletion gate — G1: corrected model and targeted rehearsal plan

Status: **PAPER / TEST DESIGN ONLY. NOT EXECUTED.** Written 7 October 2026 by Claude Code (implementation owner) for the owner. Nothing in this document has been run. No environment exists, no credential has been issued, production has not been accessed and the 13 FKs are unchanged.

**PRODUCTION ACCOUNT-DELETION GATE: OPEN. READY FOR 41B.1B: NO. N10: OPEN.**

Inputs: G0 paper decision (owner accepted the reframing in principle, 7 October 2026); proposed 41B.0-R section 30 (`phase41b0r-proposed-section-30-account-deletion-correction.md`); C1 evidence `docs/strategy/evidence/41b1a-c1/`; frozen 41B.1A SQL (`e6ad0bc8…` / `8645fd67…` / `0d008955…`); `supabase/functions/delete-account/index.ts`; `src/pages/AccountSettings.tsx`.

---

## 1. Correction addendum

Proposed as 41B.0-R section 30 in a separate file, following the document's append-a-section convention. It is not yet appended. It preserves C1.18 as an observation, withdraws the trigger-order attribution as not established, states the corrected model as source-supported and pending runtime proof, and changes no architecture or migration.

## 2. Account-deletion cascade invariant (AD-1)

**General rule.** A row that can block deletion of an account-owned family-entity parent through a non-cascading FK action (`RESTRICT` / `NO ACTION`, deferrable or not) must disappear in the account-deletion statement's first firing cycle. Its table must therefore carry:

- (a) a direct FK `user_id → auth.users(id)` with `ON DELETE CASCADE`;
- (b) `user_id NOT NULL`;
- (c) the protective FK must include `user_id`, matched to the parent's `user_id` (composite same-owner key).

Reaching the row only through another cascade does not count.

Why (c) and (b) matter: the composite FK is `MATCH SIMPLE`. A NULL `user_id` would exempt a linked row from the ownership check. A row linked to another user's parent would not be removed by *this* account's cascade, and would block deletion permanently.

**Account-owned parent (automatic definition):** a table that itself has `user_id NOT NULL` with a direct `ON DELETE CASCADE` FK to `auth.users(id)`. No whitelist is needed. Today these include `pregnancy_episodes` and `babies` (the 41B.1A `(id, user_id)` owner key).

**Current 13:** all satisfy AD-1, read from the catalogue evidence:

- `02-baseline-catalogue.md`: each table has `<table>_user_id_fkey … REFERENCES auth.users(id) ON DELETE CASCADE`. For `reflections` and `week_photos` the FK is NOT VALID; a NOT VALID FK still fires its action triggers.
- Each table has `user_id … NO`, meaning NOT NULL.
- `11-c1-5-post-forward-catalogue.md`: each table has a composite `(…, user_id) REFERENCES pregnancy_episodes(id, user_id)`.

The catalogue holds 50 FKs: 34 CASCADE, 3 SET NULL and 13 RESTRICT. There are 0 NO ACTION FKs, so the 13 are the only blocking FKs.

**Future baby/child rule (derived).**

- Any later FK that protects `babies` must be the composite `(baby_id, user_id) → babies(id, user_id)` with RESTRICT/NO ACTION, for example a 41B.1C history-protecting link from First Year child tables. The child table must also satisfy (a) and (b).
- Today's `first_year_entries`, `first_year_care_events` and `first_year_reminders` → `babies(id)` are CASCADE, and `first_year_memories` → `babies(id)` is SET NULL. These are single-column and non-blocking, so outside AD-1. Their tables already satisfy (a) and (b).
- A conversion to blocking FKs in 41B.1C must make them composite.
- Chains are allowed only if every holder of a blocking FK has its own direct account cascade. For example, `contraction_events` has its own `user_id` cascade and does not rely on `contraction_sessions`.

**Where AD-1 is enforced:**

| Phase | Enforcement point |
|---|---|
| 41B.1B (binding/backfill) | Binding adds rows, not FKs. AD-1 static test green before 41B.1B starts; catalogue check (section 3, layer 2) in the 41B.1B rehearsal and as a pre-flight before the production step. 41B.1B must add no blocking FK unless AD-1 holds |
| 41B.1C (baby/child relationships) | Every new protective FK to `babies` or any other account-owned parent is checked by both layers. Its rehearsal repeats one forced-unfavourable-order deletion for each new blocking parent |
| 41B.1D (pointer and constraint tightening) | Any constraint change on the 13 links or the pointer is re-checked by both layers. Changing an action from RESTRICT to CASCADE or SET NULL needs a separate architecture decision |
| Every future migration | The static test runs in CI over all migrations. Every rehearsal plan's catalogue stage includes the layer-2 query |

## 3. Static contract (design only; not written)

Two layers. Layer 1 is the early warning, and layer 2 is authoritative.

**Layer 1: repository test (Vitest, alongside `src/test/phase41b1aMigration.test.ts`, same fail-closed and case-insensitive style).**

- Input: every `supabase/migrations/*.sql` in filename order, plus the pending forward and validate files under `docs/strategy/migrations-pending/`. Rollback files are excluded.
- Build an FK model from:
  - table-level `FOREIGN KEY (…) REFERENCES … ON DELETE …`;
  - column-level `REFERENCES …`;
  - the `format()` loop pattern, expanding `tables text[] := ARRAY[…]` as the existing test does;
  - `DROP CONSTRAINT`.
- Default action when none is written: NO ACTION, which is blocking.
- Discovery, with no table list:
  - A: every FK whose referenced relation is `pregnancy_episodes` with a blocking action;
  - B: every FK with a blocking action whose referenced table is account-owned (defined in section 2);
  - C: for each table holding an A or B FK, find its own FK to `auth.users`.
- Per qualifying relationship, all of these are required:
  1. A direct FK from the child's `user_id` to `auth.users (id)`.
  2. Its action is `ON DELETE CASCADE`.
  3. The child's `user_id` is NOT NULL, at creation or by a later `SET NOT NULL`, and is not dropped later.
  4. The protective FK's column list contains `user_id`, paired positionally with the parent's `user_id`.
  5. The parent is account-owned.
- **FAIL** when any requirement is missing, when any file references a protected or account-owned parent in grammar the parser cannot classify, or when the set of discovered A FKs is empty. An empty set means the parser broke. **PASS** otherwise. Adversarial self-tests must include:
  - an FK with no direct account cascade (the two-hop shape);
  - a nullable `user_id`;
  - a single-column FK to a protected parent;
  - a default NO ACTION FK;
  - lower-case and mixed-case spellings.

**Layer 2: catalogue query (authoritative; read-only; run in every rehearsal and as a structure-only pre-flight before any production schema step).**

- Discover from `pg_constraint` every FK with `confdeltype in ('r','a')` whose parent is account-owned. Account-owned means the parent has a `user_id` NOT NULL column with `contype='f'`, `confrelid='auth.users'::regclass`, `confdeltype='c'`.
- For each such FK the child must have:
  - its own FK on `user_id` to `auth.users(id)` with `confdeltype='c'`; `convalidated` may be false for the two legacy NOT VALID FKs;
  - `attnotnull` on `user_id`;
  - `user_id` among the FK's `conkey`, paired with the parent's `user_id` in `confkey`.
- Output one row per protective FK with a PASS/FAIL column. **PASS:** 0 FAIL rows, and the count of Episode-parent blocking FKs is exactly 13 at the 41B.1A state (it rises only when a reviewed phase adds one). **FAIL:** any FAIL row, or an unexpected count.

## 4. PostgreSQL model: source evidence

Sources: PostgreSQL `REL_17_STABLE` raw files, fetched 7 October 2026. SHA-256 prefixes: `trigger.c` 98663df9…, `ri_triggers.c` 34e20ff8…, `spi.c` 6360383c…, `execMain.c` 9fd3d47e…. Line numbers refer to those files.

| # | Claim | Source | Class |
|---|---|---|---|
| P1 | RESTRICT and NO ACTION are AFTER ROW triggers. RESTRICT is "an AFTER trigger, but … non-deferrable"; both call `ri_restrict` | `ri_triggers.c` `RI_FKey_noaction_del` 551, `RI_FKey_restrict_del` comment, `ri_restrict` 624 | SOURCE-PROVEN |
| P2 | CASCADE is an AFTER ROW trigger that runs `DELETE FROM [ONLY] <fktable> WHERE …` through `ri_PerformCheck` | `RI_FKey_cascade_del` 743 | SOURCE-PROVEN |
| P3 | RI SQL runs with `fire_triggers = false`: `SPI_execute_snapshot(…, false, false, limit)` | `ri_PerformCheck` 2312, call 2411 | SOURCE-PROVEN |
| P4 | `fire_triggers = false` means `EXEC_FLAG_SKIP_TRIGGERS`: "AFTER triggers are postponed to end of outer query". The nested statement does not call `AfterTriggerBeginQuery` or `AfterTriggerEndQuery` | `spi.c` comment 2395, `_SPI_pquery` 2874/2925; `execMain.c` 254, 436 | SOURCE-PROVEN |
| P5 | Events from RI SQL join the outer query level ("thanks to their passing fire_triggers = false") | `AfterTriggerEndQuery` 5150, comment | SOURCE-PROVEN |
| P6 | Firing cycles. `afterTriggerMarkEvents` (4628) marks all not-yet-fired immediate events with the current firing id. `afterTriggerInvokeEvents` (4712, test at 4754) fires only events that are IN_PROGRESS with that id. The loop in `AfterTriggerEndQuery` repeats for events added meanwhile | as cited | SOURCE-PROVEN |
| P7 | Same-event triggers on one relation are queued and fired in name order. The exception is `IgnoreSystemIndexes` recovery mode | `RelationBuildTriggers` 1870 (comment 1892–1895); `AfterTriggerSaveEvent` 6183, loop 6426 | SOURCE-PROVEN |
| P8 | Non-deferrable triggers are always immediate. Deferrable ones are immediate unless `SET CONSTRAINTS` or `INITIALLY DEFERRED` says otherwise | `afterTriggerCheckState` 4045 | SOURCE-PROVEN |
| P9 | Within a cycle, events fire in queue (append) order | `afterTriggerAddEvent` 4115 (appends at tail); chunk iteration in `afterTriggerInvokeEvents` | SOURCE-PROVEN |
| P10 | Under READ COMMITTED, a RESTRICT check sees rows deleted earlier in the same statement (fresh snapshot after `CommandCounterIncrement` in `_SPI_execute_plan`) | `ri_PerformCheck` 2370–2394; `spi.c` 2609–2667 | SOURCE-SUPPORTED. Also implied at runtime by C1.18: success there required this visibility |
| P11 | The relevant code is unchanged across PostgreSQL 13 to 18 | Diff of the extracted functions, ignoring whitespace. `AfterTriggerEndQuery`, `afterTriggerMarkEvents` and `afterTriggerCheckState`: 0 lines different on 13, 14, 15, 16 and 18 vs 17. All 15/16 vs 17 differences in the RI and trigger functions were irrelevant: cross-partition updates, temporal (PERIOD) FKs in 18, collation, plan-key renames and MERGE RETURNING. `fire_triggers=false` and `EXEC_FLAG_SKIP_TRIGGERS` are present in every version | SOURCE-PROVEN (code); no runtime claim |
| R1 | **Inference:** for a single-row `DELETE FROM auth.users`, all AD-1 dependants are gone before any Episode RESTRICT check, in any trigger-name order | Composition of P1–P10 | INFERRED. **Requires rehearsal** (Positive A and B) |
| R2 | **Inference:** a two-hop dependant competes with the RESTRICT check in cycle 2. Queue order then decides the result: fail if the Episode cascade fired first in cycle 1, succeed otherwise | P6, P7, P9 | INFERRED. **Requires rehearsal** (sensitivity control) |
| R3 | **Inference:** a failing check aborts the whole statement, and GoTrue's transaction rolls back, so no partial account deletion happens | PostgreSQL error semantics; GoTrue `db.Transaction` | INFERRED. **Observed in rehearsal** (sensitivity order S2) |
| R4 | **Inference:** hosted Supabase PostgreSQL runs upstream code for these paths | Supabase ships upstream PostgreSQL plus extensions | INFERRED. Covered by rehearsing on a hosted project |

Source reading is not runtime proof. R1 to R4 stay open until the rehearsal results are accepted.

## 5. GoTrue hard-delete shape

- Caller: `delete-account/index.ts:101` `admin.auth.admin.deleteUser(userId)`. The `shouldSoftDelete` default is false, so this is a hard delete. The caller in the app is `AccountSettings.tsx:231`.
- Upstream `supabase/auth` at `master` `ce9a8eee…`, `internal/api/admin.go` `adminUserDelete` (595–660):
  - inside `db.Transaction`, it inserts the audit-log entry;
  - then, on the hard path, it calls only `tx.Destroy(user)`.
  - The factor, WebAuthn and session deletes run only on the soft path.
- The `User` model defines no `BeforeDestroy` or `AfterDestroy` hooks (`internal/models/user.go`).
- The ORM is gobuffalo/pop v6.1.1 (`go.mod`). Its `postgresql.Destroy` (`dialect_postgresql.go` 98) issues exactly one statement: `DELETE FROM "auth"."users" AS users WHERE users.id = $1`.
- Classification: **PROVEN FROM CURRENT UPSTREAM SOURCE** (one DELETE statement on `auth.users`, inside a transaction, after one audit insert). **MUST ALSO BE CONFIRMED IN REHEARSAL**, because the GoTrue version running on any hosted project, and in production, is not pinned to that commit.
- Rehearsal method: `pg_stat_statements` read before and after each deletion. Expect the normalised `DELETE FROM "auth"."users" AS users WHERE users.id = $1` to rise by exactly 1, with no GoTrue-issued `DELETE` on any `public` table. If `pg_stat_statements` is unavailable, STOP and ask the owner for an alternative observation method.

## 6–11. Targeted rehearsal design (not created)

**Environment baseline:** a fresh disposable project. Replay the 47 migrations from `735a07e6` (C1.1 procedure); apply frozen forward `e6ad0bc8…` and validate `8645fd67…` through the hash-gated `-1 ON_ERROR_STOP=1` runner; capture the catalogue. Requirement: nine-section diff EMPTY against C1 `13*` post-validate reference. Production ref and every other ref are denylisted in the wrappers, as in C1.

Users are synthetic, `@example.invalid`, created through the Auth admin endpoint, with passwords kept outside the repository:

| User | Purpose |
|---|---|
| A | Positive A |
| B | Positive B |
| S | Sensitivity control |
| C | Control user, holding an episode, bound rows and a baby |
| D | Second owner for cross-user tests |

**Full graph (G-full).** Applied identically to A and B; S gets G-full plus the scratch rows. All inserts run as `postgres` in one transaction, with no trigger bypass and `session_replication_role = origin` asserted. The graph contains:

- a `first_year` journey whose `current_pregnancy_episode_id` points to episode E1 (`given_birth`, ended, with outcome date). This is the C1.18 pattern;
- a second, `removed_at`-set episode E0;
- babies b1 and b2, both linked to E1 (twins; `birth_order` 1 and 2; `is_primary` as the existing constraints require);
- one row bound to E1 in each of the 11 other looped tables: `reflections`, `week_photos`, `week_media_memories`, `pregnancy_appointments`, `pregnancy_symptom_notes`, `baby_movement_notes`, `birth_plans`, `hospital_bag_items`, `midwife_questions`, `contraction_sessions`, and `contraction_events` on the bound session;
- First Year rows for b1 in `first_year_entries`, `first_year_care_events`, `first_year_reminders` and `first_year_memories`, plus one row for b2.

With the journey pointer and the babies, all **13** relationships are populated.

**Order assertion query** (read-only, run immediately before every deletion): list `pg_trigger` on `auth.users` (`tgisinternal`, delete action triggers, joined to `pg_constraint`) in `tgname` order, as text. For each case, assert the required relative position of `pregnancy_episodes_user_id_fkey`'s trigger. Names sort as text, so the assertion is computed and not assumed.

**Per-deletion evidence:** HTTP status; `auth.users` row absent or present; dynamic per-table count for the user across every `public` table with `user_id`; orphan checks (rows referencing missing episodes or babies, pointers to missing episodes); control-user fingerprint (C1.18 method); `pg_stat_statements` delta.

| Step | Case | Setup | Order asserted | Prediction |
|---|---|---|---|---|
| 1 | **Positive A — favourable** | frozen state, as created; G-full for A | Episode cascade trigger sorts **after** all 13 dependants' account triggers | HTTP 200, A absent, 0 rows, 0 orphans, C unchanged, catalogue unchanged |
| 2 | **Sensitivity S2 — invariant broken, unfavourable** | create scratch schema `g1_scratch`. Table `y_parent (id pk, user_id NOT NULL → auth.users ON DELETE CASCADE, unique (id, user_id))`. Table `x_dependant (id pk, user_id NOT NULL, y_id NOT NULL, pregnancy_episode_id NOT NULL)` with FK `(y_id, user_id) → y_parent ON DELETE CASCADE` and FK `(pregnancy_episode_id, user_id) → public.pregnancy_episodes(id, user_id) ON DELETE RESTRICT`. **No** `auth.users` FK on `x_dependant`. G-full for S plus one y row and one x row bound to S's E1. Y is created after 41B.1A | Y's account trigger sorts **after** the Episode one | **FAIL:** GoTrue HTTP 500 "Database error deleting user"; SQLSTATE 23503 on the x FK. S still present, **every** S row intact (atomic rollback, R3), C unchanged |
| 3 | **Positive B — forced unfavourable** | drop and re-add, with byte-identical `pg_get_constraintdef`, the `user_id → auth.users` FK of **all 13** dependant tables and of the 4 First Year child tables, so their triggers get higher OIDs. NOT VALID is preserved for `reflections` and `week_photos`; the others re-validate. The 13 Episode FKs are **not touched**. Catalogue diff against the reference stays EMPTY (definitions are text-identical; OIDs are excluded). G-full for B | Episode cascade trigger sorts **before** all 13 dependants' (and the First Year children's) account triggers | **Same as Positive A.** If it fails: **STOP. Model disproven or incomplete. No workaround** |
| 4 | **Sensitivity S1 — invariant broken, favourable** | drop and re-add `pregnancy_episodes_user_id_fkey` (identical definition), so the Episode trigger now sorts after Y's. S's graph is unchanged because step 2 rolled back | Y's account trigger sorts **before** the Episode one | **SUCCEED:** HTTP 200, S absent, x and y rows gone, 0 orphans |
| 5 | Cleanup | drop `g1_scratch` | — | catalogue diff against the reference EMPTY; scratch 0 |

**Validity rule:** if S2 does not fail with 23503 exactly as predicted, or S1 does not succeed, **the rehearsal is invalid**. Return HOLD/FAIL and reopen the architecture analysis. Steps 2 and 4 use the *same* graph and differ only in trigger order. That isolates order as the single variable, and it shows that steps 1 and 3 would have detected order dependence if any existed.

**Episode-local protection (13 tests, section 9).** As `postgres`, one transaction, one savepoint per case, rolled back.

- For each relationship k = 1..13, create a fresh episode for user D and exactly one dependant of class k bound to it.
- Run `DELETE FROM public.pregnancy_episodes WHERE id = …`.
- Expect SQLSTATE 23503 naming relationship k's ownership FK. All 13 must match.
- Residue check afterwards: rows created 0, catalogue unchanged.

**Ownership (section 10).** Re-run C1 ★ I: 13 same-user links accepted and read back, 13 cross-user links (D's dependant to C's episode) rejected with 23503 naming the FK. Rollback-only.

**Lifecycle semantics (section 11): static and catalogue only.** Nothing in this rehearsal alters them. Proof:

- the frozen hashes are unchanged;
- the post-validate catalogue equals the C1 reference before step 1, after step 3 (constraint text identical) and after step 5.

That equality covers the one-open-pregnancy unique index, `removed_at`, the three CHECKs, the pointer FK, the babies `(id, user_id)` key, the First Year child FKs and the 13 links. G-full also exercises twins (b1 and b2 on E1), a removed episode (E0, retained until account deletion) and pointer ownership at runtime, with no extra tests.

**Not repeated:** C1.3, C1.3b, C1.6, C1.9 matrix, C1.10, C1.11, C1.12, C1.13 refusal matrix, C1.15/C1.16 rollback and re-apply, and C1.17. The 41B.1A rollback needs no re-proof, because no gate migration exists. The harness-only FK re-creation is discarded with the project.

**Teardown:** owner-approved deletion of the project, explicit ref, one attempt (C1.19 procedure). Credentials removed afterwards and any access token revoked by the owner.

## 12. Environment choice

| Question | Finding (7 October 2026, read-only checks on this machine) |
|---|---|
| Docker available | **NO.** No `docker` executable on PATH, and no Docker installation directory found |
| Local Supabase tooling | **NO** installed CLI. It is reachable only through `npx` on demand (2.120.0 was used at C1). `supabase/config.toml` sets no `[db] major_version`, so the local major would be the CLI default, **unverified** |
| Real GoTrue locally | Would be possible: `supabase start` runs the GoTrue container. It is impossible now without Docker |
| Differences that could weaken a local proof | The local GoTrue image differs from hosted; the PostgreSQL major and patch would be the CLI default; platform roles and extensions differ slightly. None is expected to affect P1–P10, but each is a parity gap that C1 never measured |

**Recommendation: Option B, one disposable hosted project**, matching C1's proven environment (PostgreSQL 17.11 hosted, real hosted GoTrue, the archived C1 harness in `26f-c1-harness-archive/`). Creating it needs **owner cost and creation approval**, plus owner-supplied credentials as in C1: database password file, PAT or dashboard creation, and revocation afterwards. **STOP here for that approval.**

Option A becomes viable only if the owner chooses to install Docker Desktop on this machine. That is a separate owner decision.

## 13. Production PostgreSQL major

**NICE TO HAVE, not REQUIRED.** The functions the model depends on are unchanged from 13 to 18 (P11). The core loop and marking functions are identical in all six versions.

Record the production major from the dashboard, with no SQL, at the later production-application step, to document parity. If production were older than 13, which is not expected on Supabase, the source comparison would need extending before relying on this gate.

## 14. PASS / FAIL contract

The gate may close only if **all** of the following are true:

1. The PostgreSQL model (section 4, P1–P11) is accepted by the owner as source-supported.
2. AD-1 and the two-layer static contract are approved as defined in sections 2–3. Layer 1 must be implemented and green, and layer 2 must return 0 FAIL rows with exactly 13 Episode-parent blocking FKs, before step 1.
3. The GoTrue hard-delete shape is confirmed at runtime (`pg_stat_statements` +1 for the single `auth.users` DELETE per deletion).
4. Positive A passes.
5. Positive B passes, with the unfavourable order **proven by the order assertion before deletion**.
6. Both leave 0 owned rows and 0 orphans.
7. The control user is unchanged (fingerprint equal) after every step.
8. The sensitivity control behaves **exactly** as predicted: S2 fails with 23503 on the x FK with full rollback; S1 succeeds.
9. All 13 Episode-local deletes fail with 23503 on the correct FK, with no residue.
10. All 13 ownership FKs still accept same-user links and reject cross-user ones.
11. The catalogue equals the C1 reference at baseline, after Positive B setup and at cleanup.
12. Frozen 41B.1A SQL is byte-identical (`e6ad0bc8…`, `8645fd67…`, `0d008955…`).
13. No new migration is required.
14. Synthetic data only; no customer data.
15. Production is not accessed (denylist active in every wrapper).
16. The evidence secret scan is clean, and the owner accepts the evidence.

**Any mandatory item failing means the gate remains OPEN.** A Positive B failure, or any sensitivity deviation, also reopens the architecture analysis. No workaround may be improvised during the run.

## 15. What a PASS authorises

If items 1–16 pass and the owner approves proposed section 30 and AD-1, the PASS closes **only the pre-41B.1B RI/account-deletion database gate**. It does **not**:

- apply 41B.1A to production;
- authorise any production deployment;
- resolve N10;
- bypass the 41B.0-R §11 production gates (backup observation, quiet window, owner approval);
- authorise 41B.1B until the gate evidence is formally accepted and 41B.1B is separately authorised.

## 16. N10 (separate; OPEN)

`delete-account` lists and removes the objects in `weekly-photos` and `first-year-memories` first, and calls `auth.admin.deleteUser` only after that. The corrected FK model concerns only what happens *inside* the database deletion. It cannot help when storage removal succeeds and then the Auth/database step fails for any reason (network, GoTrue error, timeout, rate limit, or a database error from a future AD-1 violation). Media would be irreversibly gone while the account and rows remain.

The function also lists at most 1,000 objects per folder, to depth 3, without paging, so objects can be left behind. G1 neither changes nor tests this. **N10 remains OPEN.**
