# 41B.1A-C1 — 27 C1.19 teardown and closeout

Status: **C1.19 PASS — C1 CLOSED.** Both hosted rehearsal projects were paused by the owner and deleted, local rehearsal credentials were removed, the CLI was logged out, all scratch material was removed, and the owner revoked the Supabase personal access token used for C1 through the dashboard (2026-10-07), completing the plan's "rotate the access token" requirement (C1.19; section O). This record serves as the plan's `99-summary.md` teardown summary.

**41B.1A-C1 = COMPLETE.**

**41B.1A = REHEARSAL PASS.** All 18 mandatory criteria of plan section P are evidenced (C1.0–C1.17 PASS; C1.18 exploratory observation PASS, not a criterion).

**41B.1A HAS NOT BEEN APPLIED TO PRODUCTION.**
**THE MANDATORY PRE-41B.1B ACCOUNT-DELETION GATE REMAINS OPEN.**
**41B.1B IS NOT AUTHORISED.**

## Lifecycle

| Stage | Result | Evidence |
|---|---|---|
| C1.0–C1.17 | PASS | `00-identity.md`, `01`–`23-c1-17-project2/` |
| C1.18 | OBSERVATION PASS (EXPLORATORY, Project 1 only) | `24*` |
| C1.19 readiness | owner acceptance pending at the time; HOLD recorded | `25`, `25a`, `25b` (commit 714709f0) |
| Owner acceptance | owner accepted the complete C1.0–C1.18 evidence package (2026-10-06) | this record |
| Remote preservation | before any destructive action, the 22 C1 commits were pushed by normal fast-forward `d4ba5617..714709f0` to `origin/feat/41b1a-family-entity-foundation`; no force | this record |
| C1.19 teardown | both projects paused by the owner in the dashboard, then deleted by CLI with explicit refs, one attempt each | `26`–`26e` |
| C1.19 local cleanup | complete | `26g`, this record |
| PAT revocation | owner revoked the C1 Supabase personal access token in the dashboard (Account → Access Tokens), 2026-10-07; no replacement created | this record |

## Final hosted snapshots before teardown (`25a`, `25b`, 2026-10-06T23:34:11Z)

Project 1 `wwtcnbjhttjtklpxhrkd`: marker `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1`, PostgreSQL 17.11, history 47, 3 synthetic users, 0 non-synthetic, 41B.1A foundation present (13 ownership FKs validated and RESTRICT), scratch 0, idle 0, locks 0. Project 2 `dlftnirrnirlkhxpofoq`: marker `dlftnirrnirlkhxpofoq / 41B.1A-C1-run2`, PostgreSQL 17.11, history 47, 3 synthetic users, 0 non-synthetic, foundation absent, scratch 0, idle 0, locks 0.

## Hosted teardown

CLI: Supabase CLI 2.120.0 (`npx supabase`), authenticated with the owner's personal access token through `supabase login`. Syntax confirmed from `supabase projects delete --help` before use: `supabase projects delete [flags] [<ref>]`, ref optional (falls back to the linked project), so the ref was always passed explicitly behind a shell guard that refused `wogepxfipdipogyogced` and the other rehearsal ref. `--yes` (documented global flag) answered the CLI's confirmation prompt, which echoed the target ref.

| Project | Paused first (management plane) | Command | Started / finished (UTC) | Attempts | Result | Afterwards |
|---|---|---|---|---|---|---|
| 2 `tsoy-41b1a-c1-run2` | yes: `dlftnirrnirlkhxpofoq … INACTIVE` (`26`, transcribed from the session; printed but not saved to a file at the time) | `supabase projects delete dlftnirrnirlkhxpofoq --yes` | 2026-10-06T23:43:21.914Z / 23:43:26.326Z | 1 | exit 0, `{"name":"tsoy-41b1a-c1-run2","message":"Deleted project"}` (`26a`) | list shows only Project 1, ACTIVE_HEALTHY (`26b`) |
| 1 `tsoy-41b1a-c1-run1` | yes: `wwtcnbjhttjtklpxhrkd … INACTIVE`, Project 2 absent, 1 project listed (`26c`) | `supabase projects delete wwtcnbjhttjtklpxhrkd --yes` | 2026-10-06T23:47:13.823Z / 23:47:18.573Z | 1 | exit 0, `{"name":"tsoy-41b1a-c1-run1","message":"Deleted project"}` (`26d`) | list returns 0 projects; both absent (`26e`) |

Each attempt was protected by a one-shot flag file so a second attempt could not run. Production `wogepxfipdipogyogced` was never listed through this CLI account, never targeted and never accessed; the WesellProducts organisation held only the two rehearsal projects, so no other project could be affected. The deleted databases were not contacted afterwards.

## Local cleanup (`C:\Users\Administrator\.c1\`)

Classification before removal: every entry was C1 material. Class A, protected rehearsal credentials: `run1.dbpass`, `run2.dbpass`, `run1.apikeys.json`, `run2.apikeys.json`, `run1.users.json`, `run2.users.json`, `run1.userD.json` (synthetic-user passwords), `run1.user_ids.json`, `run2.user_ids.json`. Class B, disposable execution material: the scratch clones `src-735a07e6` and `src2-735a07e6` (each linked to its rehearsal project), the wrappers `c1_psql.sh`, `c1_psql_notx.sh`, `c1_cli.sh`, `c2_*`, the target and denylist files, the per-stage working directories `c1_13`–`c1_19` and `c2`, working logs, raw captures and generated SQL. Class C, non-secret support material: all already committed in the stage evidence, except 22 scripts with no byte-identical committed copy (build, parse, generator and patch helpers, and generated per-user SQL), which were archived first to `26f-c1-harness-archive/`. The C1.3 forced-failure harness was deliberately not archived, as recorded in C1.3 ("stays outside the repository and is not shipped"); its SHA-256 `8be50998…` is in `08a`. Class D, unrelated material: none found.

Before any removal, three secret scans ran: the credential-value pattern scan over the whole evidence tree (0 hits) and over all additions `d4ba5617..HEAD` (0 hits), and a literal comparison of the 17 known credential values (API keys, database passwords, synthetic-user passwords) against every tracked and new repository file and against the full patch history `d4ba5617..HEAD` (0 hits).

Then: Class A files removed by name without reading and verified ABSENT; CLI logged out with the documented `supabase logout --yes` ("Access token deleted successfully. You are now logged out.", `26g`), after which `supabase projects list` fails with `AccessTokenRequiredError`; Class B removed, including both scratch clones (which also removes their CLI project links); the emptied `.c1` directory removed. No `SUPABASE_ACCESS_TOKEN` variable, no `~/.supabase/access-token` file and no `.c1/access_token` file existed. The committed application configuration was not changed and nothing was linked to production. GitHub authentication is separate and unaffected.

## Personal access token retirement

`supabase logout` (2026-10-06) deleted the local copy of the token. The owner then revoked the token itself in the Supabase dashboard (**Account → Access Tokens**) on 2026-10-07, which closed C1.19. No replacement token was created and the CLI was not logged back in. No token value appears in this evidence.

## Open findings carried forward (not resolved by C1)

1. **RI-trigger order.** C1.18 whole-account deletion succeeded on Project 1 because the `pregnancy_episodes` cascade trigger on `auth.users` (`RI_ConstraintTrigger_a_19067`) sorted last. Trigger names embed OIDs and sort as text, so the order is environment-specific and does not transfer to production. Production ordering is unproven.
2. **Production account-deletion gate: OPEN.** It must close by one approved route: structure-only production `pg_trigger` inspection; an owner-approved design change such as deferrable `NO ACTION`; or explicit deletion ordering in `delete-account`. No route was selected in C1.
3. **Storage-first weakness (N10): OPEN.** The `delete-account` Edge Function removes Storage objects before calling `auth.admin.deleteUser`; if the Auth/database deletion then failed, media would be gone while rows remained. C1.18 did not exercise this stage.
4. **41B.1B:** not started, not authorised.
