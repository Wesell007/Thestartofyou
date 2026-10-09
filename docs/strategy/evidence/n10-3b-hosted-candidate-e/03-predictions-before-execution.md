# N10.3B — predictions before execution

Written and committed locally **before the first destructive action** (first Auth deletion or media purge) of the N10.3B hosted rehearsal. Not pushed. Each prediction states the expected observable outcome; the evidence files record what actually happened.

| Item | Value |
|---|---|
| Project | `tsoy-n10-3b-rehearsal` (`toqeefrwnsjuhjmobodg`), WesellProducts, eu-west-2, PostgreSQL 17.11.0.003 |
| Deployed source | sealed copy at `2dcab66f` (N10.3A + M3 security patch) |
| Migrations | 50 (47 historical + M1 + M2 + M3); 41B.1A not applied |
| Functions | `delete-account` v1 (`verify_jwt = true`), `account-deletion-worker` v1 (`verify_jwt = false`, invocation-only secret) |
| Hosted `jwt_exp` (Management API `GET /v1/projects/{ref}/config/auth`) | 3600 s → `N10_VERIFIED_TOKEN_WINDOW_SECONDS = 3600`, `N10_TOKEN_WINDOW_VERIFICATION = management-api:2026-10-09` |
| Retention (functional rehearsal only, D14-proposed, not approved) | `N10_COMPLETED_ROW_RETENTION_DAYS = 30` |
| Synthetic users | C (control), P, S, A, F, B, D, Q (seeded due-sweep), N (anomaly attempt); all `@example.invalid` |
| Already completed before this file (non-destructive) | identity, guard, migrations, catalogue, §11 inventory + post-M3 security proof (PASS WITH DOCUMENTED SUPABASE PG_NET PLATFORM RESIDUAL), pooler login, W read, function secrets, deploys, worker boundary, user creation |

## How "denied" will look through the Storage API

Storage applies RLS by filtering rather than by a single error code, so for a frozen or deleted user:

- **list:** HTTP 200 with an **empty array** (rows filtered out);
- **download:** HTTP 4xx (object not visible);
- **upload / upsert:** HTTP 4xx (RLS `WITH CHECK` / `USING` violation);
- **remove:** HTTP 200 with an **empty result**; the object is **still present** and byte-identical (verified by owner-side SQL read of `storage.objects` metadata and by service-role download hash);
- **createSignedUrl / createSignedUrls:** HTTP 4xx or a per-item error; no usable URL is issued.

Any successful read of bytes, any new object, any changed object, any removed object or any newly issued signed URL counts as a **failure** of the prediction.

## Ordering note

Populating the Vault secrets starts real one-minute cron invocations. P (pending freeze) and S (stale JWT) are therefore run **before** Vault is populated, with the worker invoked manually through the same deployed endpoint and invocation-only secret. Vault/cron (§18) is then enabled and the remaining scenarios run with live cron.

## Predictions

| # | Scenario | Prediction |
|---|---|---|
| P1 | P before the request: upload, list, download, update (upsert), delete, createSignedUrl(s) with P's JWT, both buckets | all succeed |
| P2 | Open P's durable request through `private.n10_open_request` as the worker role; release the lease | one row, `status = requested`; Auth user present |
| P3 | P's **pre-request JWT** after the freeze: list, download, upload, upsert, remove, createSignedUrl, createSignedUrls | all denied as described above |
| P4 | P's media after P3 | every object present and byte-identical (SHA-256 unchanged); Auth user still exists; request still `requested` |
| P5 | A signed URL created in P1 (3,600 s) fetched after the freeze | still serves (D15: RLS does not revoke pre-issued URLs) — recorded as accepted residual while Auth is present |
| S1 | S: JWT issued, media created, request opened, Auth hard-deleted directly through Auth admin, **no purge** | Auth user absent; request `requested`; media still present |
| S2 | S's exact pre-delete JWT: upload, upsert, remove, list, download, sign | all denied; no object created, changed or removed |
| S3 | Worker invoked (manually, invocation secret) | Auth delete reports not-found, database confirms absence, request → `auth_deleted` → purge → `awaiting_final_sweep`; S canonical media = 0; worker response exactly `{"ok":true}`; no user session used by admin Storage calls |
| A1 | A (media in both buckets, app rows) calls deployed `delete-account` with a valid JWT | HTTP **200**, body exactly `{"status":"account_deleted","cleanup":"removed"}` (or `"continuing"` only if the immediate purge budget is exhausted) |
| A2 | After A1 | Auth user absent; A's public app rows cascaded away; canonical media 0 (or reaches 0 via the worker); request `awaiting_final_sweep`, **not** `completed`; `completed_at`/`anonymised_at` NULL |
| A3 | `final_sweep_after - auth_deleted_at` for A | exactly `max(3600, 3600) s + 15 min = 1 h 15 m` |
| A4 | Worker/cron runs while `now < final_sweep_after` | A is **not** claimed and **not** completed early |
| A5 | Stale A JWT against public app tables (PostgREST insert with A's id) | rejected (FK to `auth.users` and/or RLS); no row resurrected |
| F1 | F owns media; a scratch FAILURE-INJECTION FK row (`n103b_rehearsal.f_blocker`, `ON DELETE RESTRICT` → `auth.users`) blocks GoTrue; F calls `delete-account` | Auth deletion fails; HTTP **202** `{"status":"deletion_in_progress"}` (transient/unknown classification) or **500** `{"status":"deletion_failed","media":"untouched"}` (permanent); never 200 |
| F2 | After F1 | F's Auth user still exists; request `requested` with backoff (or `auth_attention` if classified permanent); **zero** objects removed; every object byte-identical; F's pre-issued signed URL still serves (D15 residual); control C unchanged |
| F3 | Scratch blocker removed | no `n103b_rehearsal.f_blocker` remains; F's request then proceeds normally on a later worker run |
| D1 | Two concurrent `n10_open_request` calls for D (two real worker-role sessions) | exactly one active row; one caller gets the lease, the other `lease_acquired = false` |
| D2 | Two concurrent `n10_claim_due` sessions | never the same request in both; SKIP LOCKED |
| D3 | Lease expired | row reclaimable by a later claim |
| D4 | Duplicate `delete-account` calls for D | one durable request; second call returns the idempotent current state (202/200/410 as appropriate), no second Auth deletion |
| B1 | B: ≥1,001 canonical objects in one prefix plus objects in both buckets, ≥6 levels deep, including a service-role-uploaded canonical object | all uploaded |
| B2 | B deleted through the N10 workflow | canonical media reaches 0; every remove call ≤ 1,000 names; more than one remove batch; no OFFSET skip; no depth failure; control C untouched |
| N1 | Anomaly attempt via **supported** Storage APIs only (user upload under canonical prefix, then service-role move/copy to a non-canonical path) | if the moved object keeps `owner_id = N`: `anomaly_count > 0`, the anomaly is **not** auto-deleted, request → `purge_attention`, alert logged, COMPLETED blocked. If the API does not preserve `owner_id`: record "HOSTED ANOMALY FIXTURE NOT REPRODUCIBLE WITHOUT UNSUPPORTED STORAGE METADATA MUTATION" |
| U1 | D15, successful deletion: exact pre-issued signed URL fetched repeatedly after purge | stops serving within the documented CDN invalidation behaviour (expected ≤ 60 s); longer → HOLD for D15 |
| U2 | New signing after freeze | denied |
| Q1 | SEEDED DUE-WORKER CASE (synthetic): Q deleted through the real flow, then timestamps shifted into the past by privileged rehearsal setup (guard trigger disabled for one transaction, all CHECK constraints in force), plus one late canonical object | worker runs final sweep, removes the late object, `final_sweep_regression` alert logged, status `completed`, `completed_at` set, `user_id` NULL, `anonymised_at` set, `anomaly_count = 0` |
| R1 | Retention (functional only): completed anonymised row with `anonymised_at` > 30 days ago, a recent completed row, active rows | only the old completed anonymised row is deleted |
| V1 | Vault populated (URL + invoke secret only) | cron runs every minute; `net._http_response` shows HTTP 200 `{"ok":true}` from the worker; `cron.job_run_details` succeeded; no credential in responses |
| V2 | Before Vault population | cron runs recorded with no pg_net requests (already observed: 54+ runs, 0 requests) |
| X1 | Advisors after the run | N10-introduced security errors = 0 |
| X2 | Secret scan of evidence, raw output, function logs, `net._http_response`, cron history | 0 literal credential hits |
| X3 | Final catalogue | no scratch schema or failure-injection object remains; 50 migrations; M1–M3 unchanged; 8 guarded policies; one N10 cron job; worker grants unchanged |
| C1 | Control user C throughout | Auth user, media and rows unchanged |

## Not claimed

- No production access, no production readiness. D14 (privacy/legal) and the operator-alert destination remain production blockers.
- The seeded due-sweep case is **synthetic**; the real-flow evidence is that completion does **not** happen early (A4).
- The 30-day retention value is a functional rehearsal parameter, not an approved policy.
