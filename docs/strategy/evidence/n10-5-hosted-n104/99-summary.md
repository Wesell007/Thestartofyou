# N10.5 — Hosted rehearsal of N10.4 M4–M6 — summary

**Verdict: HOSTED N10.5 CORE = PASS. OPERATOR ALERT DELIVERY and E-MAIL QUEUE DELIVERY = HOLD — LOVABLE MANAGED PROJECT CREDENTIAL UNAVAILABLE IN DISPOSABLE PROJECT.** Per the N10.5 criteria the delivery HOLD does not invalidate the hosted database/security proof.

| | |
|---|---|
| Project | `tsoy-n10-5-rehearsal` — `mwlryyionkpjbecnbsiq` — eu-west-2 — PostgreSQL 17.11.0.003 (01) |
| Source | sealed `945677ec`; M4 `63348e3a…`, M5 `b6899e9a…`, M6 `9f9acf6f…` |
| Predictions | committed `c8385ba5` at 2026-10-13T23:41:52Z, before the first destructive action (23:42:30Z) |
| Production | **not contacted** |

| Criterion | Result |
|---|---|
| M4 works hosted | PASS — columns, worker-only definer functions, fail-closed without provider, ledger dedup/backoff/escalation 14/14 as the real worker (09) |
| M5 removes privileged credential transit through pg_net | PASS — old dummy-bearer job replaced by the unchanged M5; queued requests carry only invocation tokens (04, 10) |
| E-mail queue still works | **HOLD** (delivery needs the Lovable-managed credential); auth path proven: correct token passes, everything else 401 (04, 05) |
| M6 trigger on hosted `auth.users` | PASS — created by the migration; enabled; no exception handler (03) |
| Normal GoTrue deletion commits atomic e-mail cleanup | PASS — Auth, cascade, both e-mail log rows, token gone; suppression kept (06) |
| Forced M6 failure rolls back GoTrue deletion | PASS — GoTrue 500 with the injected error, everything unchanged, request `requested`/`auth_transient` (07) |
| Failed Auth deletion removes ZERO media | PASS — 0 `ObjectRemoved` events, 0 Storage DELETE calls during the failure window (07) |
| Retry succeeds after removing the failure | PASS — live cron retry; GoTrue 200; e-mail rows deleted; media purged only then (08) |
| M4 dedup / escalation | PASS (09) |
| No new critical advisor finding | PASS — identical to the N10.3B baseline (11) |
| Secret scan | CLEAN (13-secret-audit; repository scan at commit) |
| Production untouched | YES |
| Real alert received at `contact@thestartofyou.com` | **NO — HOLD** (not sent) |
| Sender `contact@wesellproducts.co.uk` accepted | **NOT TESTED — HOLD** |

Harness issues (recorded, no product impact): parameter-type error in a snapshot query before any deletion; pgmq visibility inside a transaction and a `\gset` typo in the e-mail-queue proof; a boolean-text comparison in the first ledger run (re-run 14/14 after resetting only that row's alert columns).

Remaining before controlled activation (unchanged except delivery): D14 human approval; Lovable delivery proof (activation smoke test, or an owner-approved Lovable-provisioned rehearsal project); production secrets; the e-mail-queue switch; the alert smoke test.

D14 = **OPEN**. 41B.1B = **NOT STARTED / NOT AUTHORISED**. Retirement of the disposable project: see 21 (after evidence push).
