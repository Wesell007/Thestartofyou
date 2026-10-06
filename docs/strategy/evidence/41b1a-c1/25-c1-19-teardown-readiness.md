# 41B.1A-C1 — 25 C1.19 teardown readiness (HOLD for owner confirmation)

Status: **C1.19 READY FOR OWNER TEARDOWN CONFIRMATION.** Recorded 2026-10-06T23:35Z (UTC). No project was paused or deleted, no credential file was removed and no CLI link was changed. Status lines in `00-identity.md` and `roadmap.md` are deliberately not updated until teardown completes.

## Why the stage stops here

Plan stage C1.19: "Pause, then delete both projects after the owner accepts the evidence package; rotate the access token; record timestamps." Section B: "After the evidence package is reviewed and accepted by the owner: pause each project, confirm no evidence is still needed, then delete it from the dashboard. Record deletion timestamps in `99-summary.md`. Rotate the personal access token used." No owner acceptance of the evidence package is recorded in the repository, so neither pause nor deletion is authorised yet. The plan also names the dashboard as the deletion channel and the token rotation as an owner action.

## Pre-teardown checks completed (read-only)

| Check | Result |
|---|---|
| Repository | HEAD 7145efa2, tree clean, nothing staged; 21 local C1 commits (`dd097658`..`7145efa2`) on top of remote `d4ba5617`; **not pushed** |
| Status lines | `00-identity.md` and `roadmap.md` record C1.0–C1.17 PASS, C1.18 OBSERVATION PASS (EXPLORATORY, Project 1 only), production account-deletion gate OPEN, 41B.1A not applied to production, READY FOR 41B.1B = NO |
| Evidence completeness | every stage's transcripts, catalogues, diffs and harness scripts are committed under this directory; `~/.c1` holds only working copies and protected credential files |
| Secret scan | fail-closed credential-value scan over the whole evidence tree: 0 hits; over all additions `d4ba5617..HEAD`: 0 hits; 17 known secret values from the protected files checked literally against all 2,612 tracked files: 0 hits |
| Supabase CLI | 2.120.0 (C1.1 recorded 2.119.0). `projects delete [<ref>]` exists, but its ref is optional (it would fall back to the linked project), so any CLI deletion must always pass the ref explicitly. There is no `projects pause` command, so pausing must be done in the dashboard |
| Management plane | `projects list` shows exactly `wwtcnbjhttjtklpxhrkd` (`tsoy-41b1a-c1-run1`) and `dlftnirrnirlkhxpofoq` (`tsoy-41b1a-c1-run2`), both ACTIVE_HEALTHY, eu-west-2. Production `wogepxfipdipogyogced` is not visible to this CLI account and equals neither teardown ref |

## Final hosted snapshots (`25a`, `25b`, read-only, 23:34:11Z)

| Item | Project 1 `wwtcnbjhttjtklpxhrkd` | Project 2 `dlftnirrnirlkhxpofoq` |
|---|---|---|
| Marker | `wwtcnbjhttjtklpxhrkd / 41B.1A-C1-run1` | `dlftnirrnirlkhxpofoq / 41B.1A-C1-run2` |
| PostgreSQL | 17.11 | 17.11 |
| Migration history | 47 | 47 |
| Auth users / non-synthetic | 3 (A, B, C) / 0 (User D deleted in C1.18) | 3 / 0 |
| 41B.1A foundation | present: table, 13 link columns, 13 ownership FKs validated and RESTRICT, babies key | absent (rolled back in C1.17) |
| Scratch / idle-in-transaction / ACCESS EXCLUSIVE | 0 / 0 / 0 | 0 / 0 / 0 |

## What the owner needs to do or confirm

1. Review and accept the evidence package (C1.0–C1.18).
2. Decide whether to push the 21 local evidence commits first. Today they exist only in this working copy, so deleting the hosted projects would leave a single copy of the evidence.
3. Confirm teardown. Per the plan: pause each project in the dashboard, then delete it (dashboard per section B; or the CLI with the explicit ref), Project 2 first, then Project 1.
4. Rotate the Supabase personal access token used during C1.

After confirmation, C1.19 continues with: management-plane verification of each deletion, removal of the run-1/run-2 protected credential files, unlinking the scratch clones, removal of the disposable scratch material under `~/.c1`, the closeout record and the final status updates.

## Open findings carried forward (unchanged)

- C1.18 succeeded on Project 1 only because this project's `pregnancy_episodes` cascade trigger sorts last among the `auth.users` RI triggers; trigger order is OID/name based and not portable to production.
- The production account-deletion gate remains OPEN until one route is approved: structure-only production `pg_trigger` inspection; an owner-approved design change such as deferrable `NO ACTION`; or explicit deletion ordering in `delete-account`.
- The `delete-account` Edge Function removes storage before the Auth deletion (finding N10); C1.18 did not exercise it and it remains open.
- 41B.1A has not been applied to production. 41B.1B is not authorised.
