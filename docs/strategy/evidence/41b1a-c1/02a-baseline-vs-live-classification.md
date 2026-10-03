# 41B.1A-C1 — 02a Baseline versus live-snapshot classification (Project 1)

Compared: `02-baseline-catalogue.md` (Project 1 after the 47-migration replay, 2026-10-03T23:38Z) against the repository-held `docs/strategy/phase41b1a-live-catalogue-snapshot.md` (live, 2026-09-27). Production was not accessed; the live side is the repository document only. Machine diff: `02b-baseline-vs-live-diff.json`; function bodies: `02c-functions-functiondef-md5.txt`.

Normalisations applied before diffing, none of which hides structure: policy roles `{}` (no `pg_roles` row for the public pseudo-role) read as `{public}`; function security `true/false` read as `t/f`; my constraint query printed `NOT VALID` twice; grants on the live side carry `sandbox_exec`, a platform role that does not exist in the new project; functions are compared with `md5(pg_get_functiondef(oid))`, the method the live snapshot used (proven by five probe functions matching exactly).

## Result by section

| Section | Live | Baseline | Live-only | Baseline-only | Verdict |
|---|---|---|---|---|---|
| columns | 280 | 289 | 0 | 9 (`c1_rehearsal_marker` ×3, `email_delivery_claims` ×6) | every live application column reproduced |
| enums | 5 | 5 | 0 | 0 | identical, including `pregnancy_journey_status` |
| functions | 22 | 25 | 3 (bodies differ) | 6 (3 new email functions + the same 3) | 19/22 byte-identical; see below |
| triggers | 35 | 35 | 0 | 0 | identical, including trigger definitions by hash |
| rls | 32 | 34 | 0 | 2 (marker, `email_delivery_claims`) | every live table has RLS enabled in the baseline too |
| policies | 124 lines | 114 lines | 0 policies | 0 policies | identical; the live file wrapped the four `companion_messages` expressions over several lines |
| constraints | 138 | 141 | 1 (`email_send_log_status_check` without `rate_limited`) | 4 (marker pkey, `email_delivery_claims` ×2, `email_send_log_status_check` with `rate_limited`) | one known difference, outside 41B |
| indexes | 84 | 86 | 0 | 2 (marker, `email_delivery_claims`) | identical for all live tables |
| grants | 32 | 34 | 0 | 2 (marker, `email_delivery_claims`) | identical for all live tables once `sandbox_exec` is set aside |

## Classification of every difference

| Difference | Class | Basis |
|---|---|---|
| `c1_rehearsal_marker` table (columns, pkey, index, RLS, grant) | EXPECTED PLATFORM/REHEARSAL ARTEFACT | Created at C1.0 as the identity marker; excluded from baseline equality by the plan (C1.15 exclusions). |
| `email_delivery_claims` table (columns, pkey, status CHECK, RLS, grant) | KNOWN REPO/LIVE DRIFT | 41B.0-R §14: created by `20260720110000`, absent live. Not a 41B object. |
| `email_send_log_status_check` includes `rate_limited` in the baseline, not live | KNOWN REPO/LIVE DRIFT | 41B.0-R §14 (`rate_limited` status). Not a 41B object. |
| Functions `claim_email_delivery`, `complete_email_delivery`, `release_email_delivery` exist only in the baseline | KNOWN REPO/LIVE DRIFT | 41B.0-R §14: "three delivery functions" from `20260720110000`, absent live. |
| Functions `email_queue_dispatch`, `email_queue_wake`, `read_email_batch` have different bodies | KNOWN REPO/LIVE DRIFT | 41B.0-R §14: bodies redefined by the bootstrap and `20260720110000` migrations; "hashes only in the snapshot; expected difference". Not 41B objects. |
| `sandbox_exec` grants present live, absent in the baseline | EXPECTED PLATFORM DIFFERENCE | Platform-managed role on the live project (41B.0-R §14); no application migration grants it. |
| `companion_messages` policy lines wrapped in the live file | FORMAT ONLY | Same four policies, same expressions, same roles. |
| Unexpected drift | NONE | No live application table, column, constraint, index, policy, trigger or grant is missing or altered in the baseline. |

## Objects 41B.1A depends on: parity

All 13 ownership-link tables (`journeys`, `babies`, `reflections`, `week_photos`, `week_media_memories`, `pregnancy_appointments`, `pregnancy_symptom_notes`, `baby_movement_notes`, `birth_plans`, `hospital_bag_items`, `midwife_questions`, `contraction_sessions`, `contraction_events`): columns, constraints (including the pre-existing `NOT VALID` account FKs on `reflections` and `week_photos`), indexes, policies, grants and triggers identical to live. `public.set_updated_at()` byte-identical (functiondef md5 `79bdd57c…`). `pregnancy_journey_status` values identical. The eleven legacy constraints and indexes named in the 41B.0-R ledger are all present and identical.

## Security sanity (Step 17)

Effective grants and RLS produced by the historical migrations on PostgreSQL 17.11 match the live snapshot for every live table: the tables that live grants to `anon` are the same tables the baseline grants to `anon` (default-privilege behaviour of the platform at creation time was reproduced), and the tables with explicit grant lists match exactly. No permission was improved, modernised or altered during baseline creation. The 41B.0-R §14 item "eleven early tables without explicit grants rely on default privileges" is therefore RESOLVED FOR REHEARSAL FIDELITY: the new project reproduced the same defaults.

## Verdict

Unexpected application-schema drift: **NONE**. Baseline is faithful for every object 41B.1A touches. C1.1 Step 16 PASS.
