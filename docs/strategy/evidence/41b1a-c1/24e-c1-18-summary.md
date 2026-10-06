# 41B.1A-C1 — 24 C1.18 account-deletion observation (Project 1) — EXPLORATORY

Result: **C1.18 OBSERVATION PASS.** The real Project 1 account-deletion path (`auth.admin.deleteUser`, as the plan defines it) removed a fully connected synthetic account graph, left the control users untouched and changed no schema. **This is Project-1-only evidence. It does not close the production account-deletion gate and it is not a PASS criterion of C1** (plan C1.18: "Not a PASS criterion … cannot close the pre-41B.1B gate because RI trigger order is OID-based and environment-specific. FK design is not modified."). Executed 2026-10-06T23:24Z to 23:27Z (UTC) on `tsoy-41b1a-c1-run1` (`wwtcnbjhttjtklpxhrkd`), PostgreSQL 17.11. Project 2 and production were not accessed; C1.19 has NOT started.

## Authoritative procedure

Plan stage C1.18: "On run 1 after C1.16, with a synthetic user holding an episode, bound rows, a linked baby and a populated pointer, call the real `auth.admin.deleteUser` path and record the outcome and `select tgname from pg_trigger where tgrelid = 'auth.users'::regclass order by tgname`. … Evidence: … labelled EXPLORATORY." Architecture 41B.0-R §19 adds child-bound First Year rows to the fixture; §29 records that the order of the RI triggers on `auth.users` decides the outcome and does not transfer between environments. Evidence names follow this directory's numbering (`24*`) rather than the plan's placeholder `20-account-deletion-observation.md`.

## The real deletion path (repository read-back, not modified, not deployed)

- Frontend caller: `src/pages/AccountSettings.tsx` `deleteAccount` (line 231) calls `supabase.functions.invoke("delete-account", { body: { confirmed: true } })`, then signs out.
- Edge Function: `supabase/functions/delete-account/index.ts`. Requires `POST`, a `Bearer` authorization header and `{ confirmed: true }`; resolves the caller with `auth.getUser()` on the user's token; then, with the service-role client:
  1. **storage first**: for buckets `weekly-photos` and `first-year-memories`, lists `{userId}` recursively to depth 3, at most 1,000 entries per folder and without paging, and removes every object found; any list or remove error returns 502 "Nothing else was deleted";
  2. then `admin.auth.admin.deleteUser(userId)` (line 101); an error there returns 502.
- Project 1 has no Edge Function deployed (`supabase functions list` → `[]`). The plan's observation path is the Auth admin deletion itself, which is the database-relevant step of the function, so nothing was deployed. **Not exercised here:** the function's storage-first stage. Finding N10 of 41B.0-R ("account deletion removes media before the account") remains open: if the Auth deletion failed after storage removal, media would be gone while rows remained. This observation does not test that ordering.

## Disposable subject and graph (`24a-c1-18-fixture.log`, `24b-c1-18-user-d-report.json`)

User D `e30d53e5-5a15-4d6a-8df4-cb19975906e6` (`c1-user-d-deletion@example.invalid`), created through the Auth admin endpoint with `email_confirm` and `user_metadata.synthetic`, genuine password sign-in HTTP 200 with matching user id and role `authenticated`; password held only in a protected file outside the repository. Users A, B and C were not touched.

Graph inserted as `postgres` in one transaction with no bypass (13 inserts and 1 update, 0 errors): `journeys` (lifecycle `first_year`, because the First Year validation triggers accept child rows only on a First Year journey) with `current_pregnancy_episode_id` set to E-D1; episode E-D1 `…ed01` (`given_birth`, ended and outcome 2026-09-20); baby `…d001` linked to E-D1; episode-bound rows in `reflections`, `week_photos`, `pregnancy_appointments`, `birth_plans`, `contraction_sessions` and `contraction_events` (event on the bound session); First Year child-bound rows for baby `…d001` in `first_year_entries`, `first_year_care_events`, `first_year_reminders` and `first_year_memories`. PRE (`24c`): User D owned 13 rows across 13 tables; 7 rows bound to E-D1 through the 12 link columns; 1 journey pointing at E-D1; 4 First Year rows referencing the baby. No storage objects were created (the plan's path does not include the storage stage).

## FK and RI-trigger structure recorded before deletion (`24d-c1-18-fk-and-triggers.log`)

- Every User D table cascades from `auth.users` (`ON DELETE CASCADE`, not deferrable); `reflections_user_id_fkey` and `week_photos_user_id_fkey` are the two pre-existing NOT VALID ones.
- The 13 ownership links to `pregnancy_episodes` are `ON DELETE RESTRICT`, not deferrable, validated.
- Baby children: `first_year_entries`, `first_year_care_events`, `first_year_reminders` cascade from `babies`; `first_year_memories` is `SET NULL`. `contraction_events` cascades from `contraction_sessions`.
- `auth.users` carries 76 internal RI triggers (38 FKs × delete/update), listed in name order as the plan requires. Their names are `RI_ConstraintTrigger_a_<oid>` and PostgreSQL fires same-event triggers in name order. The public tables' cascade-delete triggers range from OID 17628 (`profiles`) to 18734 (`companion_messages`); **`pregnancy_episodes_user_id_fkey`'s cascade trigger is `RI_ConstraintTrigger_a_19067`, the last of all**, because 41B.1A created it after every other table.
- Parent side: `pregnancy_episodes` carries the 13 `RI_FKey_restrict_del` triggers (OIDs 19079–19151).

## The deletion (`24f-c1-18-delete-result.json`)

One attempt, as the plan specifies: `DELETE /auth/v1/admin/users/e30d53e5-…` with the Project 1 service-role key (never printed), started 2026-10-06T23:26:51.294Z, finished 23:26:51.700Z, 0.41 s, **HTTP 200**, empty body, no database error.

## Post state (`24g-c1-18-graph-post.log`, fresh session 23:26:52Z)

User D absent from `auth.users` (3 users remain). User D rows in every public table that has a `user_id` column (28 tables, counted dynamically): 0. E-D1 0; baby 0; rows with the fixture id prefix 0; rows bound to E-D1 0; journeys pointing at E-D1 0; First Year rows referencing the baby 0. **Orphans: 0.** Controls: users A, B, C headline rows 3 / 5 / 1 (unchanged); other users' tuple-identity fingerprint `c7818124…` and content fingerprint `61d9fceb…` (11 rows) identical to PRE; legacy fixture 21; E-A1 and E-B1 present. Nine-section catalogue PRE versus POST (`24h-c1-18-catalogue-diff.txt`): **EMPTY**. Ownership FKs 13 validated; history 47; marker intact; idle 0; locks 0; scratch 0.

## Interpretation and portability limit

Why it succeeded here: deleting the `auth.users` row fires its cascade triggers in name order. Every table holding a bound row (journeys, reflections, week_photos, appointments, birth_plans, contraction sessions/events, babies) and every First Year child table cascaded before `RI_ConstraintTrigger_a_19067` deleted E-D1. By the time `pregnancy_episodes`' 13 RESTRICT triggers checked for referencing rows, none remained.

What it does not show:

- That production has the same order. Production OIDs differ. Trigger names sort as **text**, not numbers, so an OID with more digits can sort before one with fewer (`…_a_100123` sorts before `…_a_99999`). If production's `pregnancy_episodes` cascade trigger sorts before any table holding a bound row, the RESTRICT check would find that row and the deletion would fail.
- That the full Edge Function path is safe: its storage-first order (N10) was not exercised.

**The production account-deletion gate stays OPEN.** It requires one of the three recorded routes (structure-only production `pg_trigger` inspection; owner-approved deferrable `NO ACTION`; explicit deletion ordering in `delete-account`). None was chosen here.

## Safety

Frozen SQL unchanged (forward `e6ad0bc8…`, validate `8645fd67…`, rollback `0d008955…`). FK design not modified. No FK/trigger bypass. `delete-account` not modified or deployed. Project 2 (`dlftnirrnirlkhxpofoq`) accessed NO. Production (`wogepxfipdipogyogced`) accessed NO. Customer data NO. Secrets in evidence NO. Tooling note: the read-only `supabase functions list` call fetched Supabase CLI 2.120.0 through `npx`, versus 2.119.0 recorded for the C1.1 replay; no CLI command in C1.18 changed anything.
