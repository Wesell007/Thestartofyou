# N10 — Controlled production activation checklist

**Status: NOT STARTED. Production has not been accessed or modified.** This is the ordered list of everything that must happen before and during controlled activation of Candidate E. Nothing here may be executed without explicit owner authorisation of the activation phase.

## A. Gates that must close first

| # | Gate | State | Owner of the action |
|---|---|---|---|
| A1 | **D14 human privacy/legal approval** (`n10-d14-privacy-legal-release-gate.md` decision block signed): retention days (A/B/C), K/M confirmation, L (suppression list), N (PostHog), backup/log/third-party statements, UI + privacy wording | **OPEN** | human reviewer |
| A2 | Hosted rehearsal of the **N10.4 migrations M4, M5, M6** on a fresh disposable project (they are tested locally on PGlite only). Must prove: M4 ledger + real alert e-mail to the approved mailbox; **M6 trigger can be created on hosted `auth.users`, runs inside GoTrue's deletion transaction (normal deletion commits and removes the e-mail rows), and a forced cleanup failure makes GoTrue's delete fail and roll back (Auth user, cascades, e-mail rows and media all intact) until the failure is removed**; M5 replaces a Lovable-style `process-email-queue` job and the e-mail queue still delivers with the invocation token | **NOT DONE** | owner authorises a disposable project; Claude Code executes |
| A3 | Owner decision on the order of the e-mail-queue switch (A2 must show the gap; see C4) | open | owner |

## B. Values and secrets (out-of-band, never in Git)

| Item | Where | Value / source |
|---|---|---|
| `N10_DB_URL` | Edge Function secret | dedicated `account_deletion_worker` login through the production transaction pooler; password generated locally, set via SCRAM verifier |
| `N10_VERIFIED_TOKEN_WINDOW_SECONDS` + `N10_TOKEN_WINDOW_VERIFICATION` | Edge Function secrets | production `jwt_exp` read via the Management API (`management-api:<date>`) |
| `N10_WORKER_INVOKE_SECRET` | Edge Function secret **and** Vault `n10_account_deletion_worker_invoke_secret` | ≥ 32 random bytes, generated locally |
| Vault `n10_account_deletion_worker_url` | Vault | production worker URL |
| `N10_COMPLETED_ROW_RETENTION_DAYS` | Edge Function secret | **the D14-approved number** (0 = option C). Must be set: unset = keep forever |
| `N10_OPERATOR_ALERT_EMAIL` | Edge Function secret | `contact@thestartofyou.com` (owner decision) |
| `N10_OPERATOR_ALERT_FROM` | Edge Function secret | `contact@wesellproducts.co.uk` (owner decision; confirm it is a verified Lovable Email sender) |
| `N10_ENVIRONMENT` | Edge Function secret | `production` |
| `EMAIL_QUEUE_INVOKE_SECRET` | Edge Function secret **and** Vault `email_queue_invoke_secret` | ≥ 32 random bytes, generated locally |
| `LOVABLE_API_KEY` | existing project secret | confirm present (name only) |

## C. Ordered activation steps (outline)

1. Identity read of the production project; guard with production as the **only** allowed target for this phase; offline self-test.
2. `db push --dry-run`: expect exactly the N10 migrations M1–M6 (and nothing else, in particular no 41B.1A).
3. Set the secrets in B (names only in any output).
4. **E-mail queue switch (minimise the gap):** deploy `process-email-queue` (token auth) and apply M5 back-to-back; set `email_queue_invoke_secret`; verify an auth e-mail is delivered; then delete the unused Vault secret `email_queue_service_role_key`. **Do not re-run Lovable's email setup afterwards** — it would recreate the old service-role job.
5. Apply M1–M4, M6 (M2/M3 schedule stays a no-op until the N10 Vault values exist); deploy `delete-account` and `account-deletion-worker` from a sealed commit.
6. Catalogue + worker privilege gate + worker boundary checks (as in N10.3B §10–§17), read-only where possible.
7. Populate the N10 Vault values → cron starts.
8. **Operator-alert smoke test** (`n10-operator-alerting.md` §8): one synthetic non-user attention row → exactly one e-mail to `contact@thestartofyou.com` from `contact@wesellproducts.co.uk`, no personal data, no duplicate on the next tick → privileged cleanup of the synthetic row. Only then is the operator-alert blocker CLOSED.
9. Publish the D14-approved UI copy and privacy-policy wording.
10. Record activation evidence; secret scan; owner review.

## D. Known residuals to keep visible

- PG_NET platform residual (M3/M5): login roles can still queue outbound HTTP; no privileged credential is placed in pg_net.
- D15 pre-authorised media access residual (signed URLs, CDN/browser caches).
- If the worker/cron stops, no alert is sent: add external uptime monitoring of the worker (recommended).
- Completed deletion rows are pseudonymous (not anonymous) while platform logs/backups exist.
