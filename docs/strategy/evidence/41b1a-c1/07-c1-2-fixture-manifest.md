# 41B.1A-C1 — 07 C1.2 synthetic fixture manifest (Project 1)

Result: **C1.2 = PASS**. Executed 2026-10-04T00:22Z to 00:26Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`). Fixture exactly as specified in `docs/strategy/phase41b1a-c1-rehearsal-plan.md` §F (pre-migration rows only). No 41B.1A object created. No schema change. The plan names the id file `03-synthetic-ids.json`; in this evidence package that number was already used by the dry-run log, so the ids are in `07a-synthetic-ids.json`.

## Pre-fixture reconfirmation (Step 1)

Marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`; `auth.users` 0; remote migrations 47; `pregnancy_episodes` NULL; episode link columns 0; episode constraints 0; episode indexes 0; episode policies 0; `babies_id_user_id_key` 0; application rows across the 16 fixture-relevant tables 0. Linked ref `wwtcnbjhttjtklpxhrkd` (CLI listing: run1 linked, run2 not). Denylist unchanged (`wogepxfipdipogyogced`, `dlftnirrnirlkhxpofoq`).

## Synthetic users (Step 3, Step 4)

Created through the Supabase Auth admin endpoint (`POST /auth/v1/admin/users`, service-role key read from a protected file outside the repository and never printed) with `email_confirm: true` and `user_metadata.synthetic = true`. Passwords are random, stored only in `C:\Users\Administrator\.c1\run1.users.json` (mode 600, outside the repository), and will be used for the C1.11 PostgREST sign-ins. Login capability verified for each user by a password-grant token request with the anon key: HTTP 200, session issued, token `user.id` equals the created id, `role = authenticated`, `aud = authenticated`. No token value was printed or stored in evidence.

| Label | UUID | Email | Confirmed | Login verified |
|---|---|---|---|---|
| A | `b09cd318-8f3e-4853-8d97-fc10267b3d69` | `c1-user-a@example.invalid` | yes | yes |
| B | `820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb` | `c1-user-b@example.invalid` | yes | yes |
| C | `6e65487d-ddb0-43b6-a623-fb24b5318dab` | `c1-user-c@example.invalid` | yes | yes |

`@example.invalid` proof: `auth.users` count 3; users with a null email or an email not ending `@example.invalid`: 0; confirmed users 3.

## Legacy fixture rows (Step 5), inserted as `postgres` in one transaction

Row ids are fixed (`00000000-0000-4c10-8000-00000000xxxx`) so later stages can reference them. All text is synthetic (`C1 synthetic …`). Every row satisfied the baseline constraints and triggers without any bypass: no FK, RLS, trigger or CHECK was disabled; `session_replication_role` was not used. Babies' date of birth 2026-03-05 passes `validate_baby_date_of_birth` (not in the future, within 1826 days).

| Table | Rows | Owner and values | Required by |
|---|---|---|---|
| `journeys` | 3 | A `pregnancy`; B `first_year`; C `ttc` | C1.6, C1.8 (pointer), C1.11, J, K |
| `pregnancy_journeys` | 2 | A `active`, lmp 2026-06-01, due 2027-03-08; B `given_birth`, lmp 2025-06-02, due 2026-03-09, status_changed_at 2026-03-06, outcome_date 2026-03-05 | legacy mirror, untouched by 41B.1A; 41B.1B preflight reference |
| `babies` | 2 | B: `…b001` birth_order 1 primary, `…b002` birth_order 2, both dob 2026-03-05 | C1.6, C1.8 (babies link), K (babies-key dependant) |
| `reflections` | 2 | A `…a101` week 12; B `…b101` week 30 | C1.6, C1.8, C1.13 |
| `week_photos` | 1 | A `…a102` week 12, path `<A>/12.jpg` | C1.8 |
| `week_media_memories` | 1 | A `…a103` week 12, `video`, `video/mp4`, 1024 bytes | C1.8 |
| `pregnancy_appointments` | 2 | A `…a104` week 12; B `…b104` week 30 | C1.8 |
| `pregnancy_symptom_notes` | 1 | A `…a105`, severity 1 | C1.8 |
| `baby_movement_notes` | 1 | A `…a106` | C1.8 |
| `birth_plans` | 1 | A `…a107`, completion 10 | C1.8 |
| `hospital_bag_items` | 1 | A `…a108`, category `parent`, key `c1_synthetic_item` | C1.8 |
| `midwife_questions` | 1 | A `…a109`, category `other` | C1.8 |
| `contraction_sessions` | 1 | A `…a110`, 2026-10-01 20:00 to 20:30 UTC | C1.8 |
| `contraction_events` | 2 | A `…a111`, `…a112` on session `…a110` | C1.8 (session-consistent episode) |

Total legacy rows: 21. Tables deliberately left empty because the plan does not list them: `first_year_journeys`, `profiles`, all First Year child tables, companion tables, TTC tables. Episode fixture rows (E-A1 and so on) belong to C1.4 onward and do not exist yet.

Post-fixture verification by user (from the database): `babies:B(#1,primary)+B(#2), baby_movement_notes:A, birth_plans:A, contraction_events:A+A, contraction_sessions:A, hospital_bag_items:A, journeys:A(pregnancy)+B(first_year)+C(ttc), midwife_questions:A, pregnancy_appointments:A(w12)+B(w30), pregnancy_journeys:A(active,2026-06-01→2027-03-08)+B(given_birth,2025-06-02→2026-03-09), pregnancy_symptom_notes:A, reflections:A(w12)+B(w30), week_media_memories:A(w12,video), week_photos:A(w12)`. Matches §F exactly.

## Ownership design carried by the fixture (Step 6)

- Isolation: A, B and C own disjoint rows; nothing is shared.
- Same-user and cross-user link tests (C1.6, C1.8) will bind A's rows to A's future episode and attempt A's rows to B's future episode; both users have rows on every relevant table (A on all 11 pregnancy tables, B on reflections and appointments plus babies).
- Nullable legacy links: every fixture row will remain NULL-linked until explicitly bound in a later stage; 41B.1B backfill is not performed.
- Zero babies for a pregnancy (A has none), two babies for one pregnancy (B), pointer tests on A (lifecycle `pregnancy`) and C (no episode), and removed/open semantics on A's future episodes are all supportable without ambiguity.
- No relationship that only becomes legal after 41B.1A was pre-created.

## Schema safety (Step 10)

Per-section catalogue hashes after the fixture equal the C1.1 evidence hashes exactly (columns `089827c5…` 289; enums `e01eb254…` 5; functions `920ec2f6…` 25; triggers `c76db905…` 35; rls `5c82068f…` 34; policies `e87cd992…` 114; constraints `ece1b4e9…` 141; indexes `b844916e…` 86; grants `22bb3e64…` 34). Structural diff versus C1.1: **NONE**. `pregnancy_episodes` absent; episode link columns 0; journeys pointer absent; 41B.1A constraints, indexes and policies 0. Migration history 47/47, mismatch 0 (CLI) and 47 rows (catalogue).

## Safety (Step 11)

Production accessed NO. Project 2 accessed NO. Previous developer's Supabase accessed NO. Customer data accessed NO. 41B.1A applied NO. Seed run NO (`supabase/seed.sql` not created). Historical migrations edited NO. Integrity bypass used NO.

## Credentials handling

Project API keys were listed through the authenticated CLI into `C:\Users\Administrator\.c1\run1.apikeys.json` (mode 600, outside the repository) and read by the user-creation script; the service-role key, anon key, user passwords and session tokens were never printed to the terminal, written to evidence, or committed.
