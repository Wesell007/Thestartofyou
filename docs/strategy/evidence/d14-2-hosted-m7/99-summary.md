# 99 — D14.2 summary: hosted rehearsal of M7 analytics-identity erasure

**D14.2 HOSTED M7 CORE = PASS.**
**POSTHOG LIVE HTTP E2E = NOT RUN / DEFERRED TO CONTROLLED ACTIVATION.**
**D = OPEN / VERIFY REQUIREMENT. D14 = OPEN. 41B.1B = NOT STARTED / NOT AUTHORISED.** This is engineering proof only, not legal approval; no Privacy Policy or UI copy was published.

| Item | Value |
|---|---|
| Disposable project | `tsoy-d14-2-m7-rehearsal`, ref `jjrhizafpikmyvfapcic`, eu-west-2, PostgreSQL 17.11.0.003 |
| Source | sealed `4b561385`; predictions `7c10c065` (committed before any hosted action) |
| M7 | `20261015053138_n10_analytics_erasure.sql`, sha256 `8dde2626170055505f82734c7c54962e961ce1d0b38c8082659b3ae18efa5768`, applied unchanged |
| Hosted execution | 2026-10-23 06:23Z–06:41Z (after a workstation shutdown and a project restore; see 01) |
| Production | **not contacted** (not even read-only); guard self-test 28/28 |

## Brief §20 pass criteria

| Criterion | Result | Evidence |
|---|---|---|
| M7 applies cleanly hosted | PASS — dry-run listed only M7; push exit 0; 16/16 CHECKs validated | 04 |
| Existing pre-M7 rows migrate safely | PASS — A `not_tracked` and byte-identical; B–E `pending`; no status change, no `user_id` cleared, no premature completion; attention semantics unchanged. *Deviation:* `updated_at` bumped on B–E by the M1 guard trigger | 03, 04 |
| Privileges are correct | PASS — worker surface exactly 15; no M7 EXECUTE for PUBLIC/anon/authenticated/service_role; worker has no table privilege and no BYPASSRLS; `private` not exposed (PGRST106) | 05 |
| Worker login / pooler works | PASS — Postgres.js `prepare:false` on 6543 as `account_deletion_worker.<ref>`; table access 42501 | 06 |
| Media remains independent | PASS — B, D and F purged and progressed with analytics pending; analytics failures never moved media backwards | 07 |
| Unresolved analytics blocks completion | PASS — `n10_record_purge` gate (+15 min, ×4 ticks), `n10_analytics_guard` and the CHECK each refused, all 23514 | 08 |
| Unresolved analytics blocks `user_id` clearing | PASS — 23514 (trigger and CHECK); `user_id` kept on every gated tick | 08 |
| Valid worker resolution unlocks completion | PASS — C resolved (`persons_found = 1`) → `next_attempt_at` pulled forward to the resolution time → next tick `completed`, `user_id` NULL | 10 |
| `persons_found = 0` resolves correctly | PASS — F resolved with 0, no further claims, completed | 11 |
| Missing credential fails closed | PASS — deployed real worker without `POSTHOG_*` → `{"ok":true}`; `analytics_config`; attention on the first attempt; +60 min; not completed; logs carry request id and class only | 12 |
| Analytics attention integrates with M4 | PASS 16/16 — key `analytics_attention:analytics_config`; dedup; backoff; one escalation after 24 h; `auth_attention` / `purge_attention` keys unchanged; no delivery claimed | 13 |
| No new critical/high M7 security finding | PASS — advisors pre vs post M7: 0 new, 0 gone (security and performance) | 14 |
| Secret scan clean | PASS — see below | — |
| Production untouched | PASS | 01 |

Analytics claim and lease (P6): not claimable before +15 min; SKIP LOCKED gave exactly one owner across two concurrent connections; media and analytics leases held together; wrong lease → 55000; resolution while an Auth user with the same id exists → 23514; valid lease → resolved. **PASS** (09).

## Predictions vs observations

P1 PASS with the `updated_at` deviation · P2 PASS · P3 PASS · P4 PASS · P5 PASS, with one deviation: as the table owner, a direct `pending → resolved` write **after** Auth deletion is accepted by design. It is refused before Auth deletion, and the worker has no table privilege. · P6 PASS · P7 PASS · P8 PASS · P9 PASS · P10 PASS · P11 PASS · P12 DEFERRED as predicted.

## Harness defects (transparency)

The first proof run reported 21/30. All nine FAILs were analysed before any rerun, and the corrective runs re-executed only the affected checks:
- **8 FAILs were harness defects**, not product behaviour:
  - wrong timestamp shifted for retention;
  - `purge_empty_at` compared after the harness's own shift;
  - the media-lease row not past its window;
  - an over-broad claim that leased C, cascading into P7/P8.
- **1 FAIL was a prediction worded too strongly**: the owner `resolved` write (above).

The second run reported 7/10:
- C still leased from run 1;
- a lower-bound assertion that ignored `LEAST(...)`.

The P7 rerun failed one check by comparing database time with the local clock (database ≈50 ms ahead). Re-evaluated in database time, it is a PASS. The raw logs of every run, including the failing ones, are kept (`raw/09*.txt`).

## Secret scan (before the evidence push)

Literal comparison against six temporary values: DB password, PAT, worker password, invocation secret, and the anon and service-role keys. Scope: this evidence directory (including raw logs and harness), every tracked file, the working-tree and staged diff, and the commit range since `7c10c065`.

**0** literal hits.

The pattern scan (`sbp_`, `sb_secret_`, JWT, DB URL with password, signed URL, `phx_`, SCRAM verifier) found **0** D14.2 values. Five pre-existing or benign shapes matched:
- the harness's URL-building template in `raw/harness/lib.mjs` (interpolation only, no value);
- an ellipsis placeholder URL in the C1 rehearsal plan;
- four unit-test URLs with the placeholder password `pw`;
- the documented public anon key in `scripts/public-backend-defaults.ts`;
- a description of the SCRAM verifier format, with no verifier, in N10.3B evidence.

Fixture user ids and e-mails in evidence: **0**.

## Retirement

Recorded in `16-retirement.md` after the evidence push.
