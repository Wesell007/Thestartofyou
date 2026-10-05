# 41B.1A-C1 — 15e C1.9 open-pregnancy uniqueness and removed_at (Project 1)

Result: **C1.9 PASS — one-OPEN-Pregnancy uniqueness and removed_at semantics proven; removed episodes are retained, excluded from OPEN uniqueness, and do not fabricate outcomes.** Executed 2026-10-05T20:33:34Z to 20:33:35Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11.0.002, psql 17.11, as `postgres`. Rollback-only. The rollback migration has NOT been run; C1.10 has NOT started; no removal RPC, function, trigger, pointer-clearing or lifecycle behaviour was implemented (41B.1C owns that).

## Authoritative procedure

Plan stage C1.9 ("Execute section J … PASS: every row matches; a removed episode still exists with `ended_at` and `outcome_date` unchanged and status unchanged. STOP: a removed episode blocks a new one, or removal requires or produces an outcome") and section J (ten rows, user A unless stated). Owner decision S13 (41B.0-R §28): removal is `pregnancy_episodes.removed_at TIMESTAMPTZ NULL`; OPEN = `status IN ('active','paused') AND removed_at IS NULL`; no enum widening; no outcome fabricated; no deletion. Evidence names follow this directory's numbering (`15*`) rather than the plan's placeholder `11-uniqueness-removed_at.md`.

Additions beyond the ten literal rows, all inside the same rollback-only transaction and all requested by the owner's brief as forms of the same invariant: paused + active and paused + paused (E-A1 temporarily paused inside a savepoint, restored by rollback to that savepoint), a second open episode for B while E-B2 is open (per-user independence), and an explicit no-outcome-coupling read-back of every E-A1 column after removal.

## Frozen architecture and live index (Step 2)

Forward file SHA-256 `e6ad0bc82b245beb03131023bb9ce122a451f40c2fe9b75cd43f047b674585cb` (unchanged). Live index: `CREATE UNIQUE INDEX pregnancy_episodes_one_open_per_user_idx ON public.pregnancy_episodes USING btree (user_id) WHERE ((status = ANY (ARRAY['active'::pregnancy_journey_status, 'paused'::pregnancy_journey_status])) AND (removed_at IS NULL))`, PostgreSQL's deparse of `status IN ('active','paused') AND removed_at IS NULL`. Unique: yes. Columns: `(user_id)`. No index named `%one_active%` exists (0). Enum `pregnancy_journey_status` = `active, given_birth, no_longer_pregnant, pregnancy_loss, paused` (no `removed`). The only non-internal trigger on `pregnancy_episodes` is `pregnancy_episodes_set_updated_at`; no function in `public` matches `%remove%` or `%episode%`, so nothing can fabricate `status`, `outcome_date` or `ended_at` on removal.

## Pre-state (Step 3, saved before any write: `15d-c1-9-prestate.txt`, psql read-only, 20:31:58Z, exit 0)

Marker `wwtcnbjhttjtklpxhrkd/41B.1A-C1-run1`; history 47; users 3, non-synthetic 0; legacy fixture 21; episodes 2. E-A1: owner A, `active`, removed_at NULL, outcome_date NULL, ended_at NULL, status_changed_at NULL, expected_count 1, updated_at 20:01:11Z. E-B1: owner B, `given_birth`, removed_at NULL, outcome_date 2026-06-05, ended_at 2026-06-05T10:00Z, expected_count 2. Open episodes under the exact predicate: A 1, B 0. Links 0; pointers 0; validated FKs 13; RESTRICT 13; idle-in-transaction 0; ACCESS EXCLUSIVE 0; scratch 0. Repository HEAD 6e53484f, clean.

## Harness

`15a-c1-9-uniqueness-removed-at.sql`, SHA-256 `9a7a087952cb982aa922c2f537c2345800ea3e6db617b2a7269f4ce440c4255f` (wrapper hash gate), run through `09d-c1_psql_notx-wrapper.sh` (target and denylist asserted, direct endpoint, password never printed). One explicit transaction, `SET LOCAL lock_timeout = '5s'`, `SAVEPOINT`/`ROLLBACK TO SAVEPOINT` around each of the six statements expected to be rejected and around the two sub-scenarios that temporarily restate an episode, read-back after every accepted statement, final explicit `ROLLBACK`. All inserted candidates use valid dates (`lmp_date` 2026-09-01, `due_date` 2027-06-08) and `ended_at` NULL for open statuses, so only the partial unique index can reject. Transcript `15-c1-9-uniqueness-removed-at.log`: 6 ERROR lines, all `23505`, 0 other errors, 0 psql errors, 0 warnings, exit 0.

## Results (`15b-c1-9-section-j-matrix.md`, `15c-c1-9-cases.json`)

| Section J row | Outcome |
|---|---|
| ★ one active | A has exactly 1 row matching the OPEN predicate (E-A1) |
| ★ second active | insert A active rejected: `23505 duplicate key value violates unique constraint "pregnancy_episodes_one_open_per_user_idx"`, `DETAIL: Key (user_id)=(b09cd318-…) already exists` |
| ★ active + paused | insert A paused while E-A1 active rejected (23505, same index); with E-A1 temporarily paused, insert A active rejected and insert A paused rejected (23505, same index); E-A1 restored to active by savepoint rollback |
| ended (B) + new active E-B2 | accepted; B then has 1 open (E-B2) while E-B1 stays ended; a second open for B rejected (23505, same index); A's count unaffected |
| setting `removed_at` requires no other column change | `update … set removed_at = now() where id = E-A1` → `UPDATE 1` with no other column touched |
| ★ removed episode still exists, status unchanged, `ended_at` NULL, `outcome_date` NULL | read-back: id E-A1 present, user A, `status = active`, `ended_at` NULL, `outcome_date` NULL, `status_changed_at` NULL, `expected_count` 1, dates unchanged, `removed_at` set; `s13_shape_ok = t`; all seven no-coupling booleans `t` |
| `updated_at` advances on the removal UPDATE | `updated_at_advanced = t`, equals the transaction's `now()` (trigger) |
| ★ set `removed_at` on E-A1, then insert new active | A OPEN count 0 after removal; insert E-A2 active accepted; A then has 2 rows: E-A1 removed, E-A2 open, old id not reused, nothing deleted |
| clearing `removed_at` while another open episode exists | `update … set removed_at = NULL where id = E-A1` rejected (23505, same index), E-A1 still removed afterwards: the index protects UPDATE as well as INSERT |
| removed paused + new active | E-A2 paused then removed (single-column updates), insert E-A3 active accepted; sub-scenario rolled back, E-A2 open active again, E-A3 absent |

Totals: 10/10 section J rows PASS; 20 executed cases, 20 as expected; 6/6 unique violations, every one SQLSTATE 23505 on `pregnancy_episodes_one_open_per_user_idx`; 14/14 acceptances with read-back; no CHECK, FK, date or permission error occurred anywhere. The STOP conditions never triggered: no removed episode blocked a new one, and removal neither required nor produced an outcome.

## Cleanup and post-state (20:33:35Z psql; 20:34Z integration)

Final `ROLLBACK` acknowledged. Episode rows 2; E-A1 `active`, removed_at NULL, outcome_date NULL, ended_at NULL, updated_at 20:01:11Z (unchanged); E-B1 unchanged; A open count 1; no E-A2/E-A3/E-B2/E-B3 or other candidate row exists; legacy fixture 21; links 0; pointers 0; users 3; history 47. Content fingerprint `44bee7ef…` and row-identity fingerprint `a4b7ace9…` identical to the C1.7 and C1.8 post-states, so no persistent `updated_at` change and no tuple rewrite. 0 idle-in-transaction sessions, 0 ACCESS EXCLUSIVE or SHARE UPDATE EXCLUSIVE locks in `public`, 0 `c1_scratch%` objects.

## Structure

Nine-section catalogue hashes identical to the C1.8 post-state (columns 315\|f0281fd6…, enums 5\|e01eb254…, functions 25\|920ec2f6…, triggers 36\|a4b05c5a…, rls 35\|a02d18c7…, policies 118\|c5a61c1c…, constraints 161\|a67632e1…, indexes 104\|001b4ec0…, grants 35\|0a9026c0…); index definition unchanged; ownership FKs 13 validated, 13 RESTRICT. Permanent structural diff versus C1.8: **EMPTY**.

## PASS criteria

1 Project 1: PASS. 2 pre-state saved before writes: PASS. 3 live predicate equals the approved OPEN definition: PASS. 4 second OPEN for the same user rejected: PASS. 5 active and paused share the slot: PASS. 6 violation comes from the one-open index: PASS (23505, index named, every time). 7 another user's state does not consume the slot: PASS. 8 `removed_at` excludes an open-status episode from uniqueness: PASS. 9 later OPEN after removal: PASS. 10 removed episode stored: PASS. 11 no fabricated outcome status: PASS. 12 `outcome_date` not fabricated: PASS. 13 no hard delete: PASS. 14 no later-phase removal function: PASS. 15 cleanup leaves the fixture as required: PASS. 16 permanent schema diff empty: PASS. 17 history 47: PASS. 18 no lingering lock or transaction: PASS. 19 production and Project 2 untouched: PASS. 20 evidence secret-free: PASS.

## Safety

Remove RPC/function implemented NO. Hard delete NO. Enum widened NO. Production (`wogepxfipdipogyogced`) accessed NO. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Customer data NO. Rollback file run NO. C1.10 started NO. Secrets committed NO.
