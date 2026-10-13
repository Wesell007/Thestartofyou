# 04 — M5: e-mail queue credential hardening and invocation boundary

**Result: PASS.** Raw: `raw/06-m5-proof.txt`, `raw/06b-m5-email-queue-proof.txt`.

## Supersedes the historical shape

The Lovable-style pre-M5 job was recreated with a **dummy, non-privileged** bearer (`'Bearer ' || 'DUMMY-NOT-A-KEY-pre-M5-shape'`, confirmed `has_bearer = t`). The **unchanged** M5 file from the sealed copy (sha256 `b6899e9a…` verified) was then executed: the job was replaced by the hardened form (`privileged = f`, `calls_dispatch = t`) and M5's own assertion block passed.

## What reaches pg_net (rolled-back transactions; booleans only)

| Request | Headers | Body | service-role JWT | anon JWT | DB password | worker password | `N10_DB_URL` | credential shape (`eyJ…`, `sb_secret_`, Bearer, Authorization, apikey) |
|---|---|---|---|---|---|---|---|---|
| N10 cron → `account-deletion-worker` | `Content-Type`, `X-N10-Worker-Token` (= invocation secret) | `{}` | no | no | no | no | no | none |
| E-mail cron → `process-email-queue` | `Content-Type`, `X-Email-Queue-Token` (= invocation secret) | `{}` | no | no | no | no | no | none |

The e-mail proof first committed one harmless queue message (`{"n105":"harmless-rehearsal-fixture"}`; the live job is a no-op without Vault values), then created the Vault values and ran the effective job inside one transaction and rolled back; the message was deleted afterwards (queue 0, Vault 0, pg_net queue 0). A first attempt queued nothing because pgmq stamps visibility with wall-clock time later than the transaction's `now()`; a second attempt aborted on a harness `\gset` typo after the message had committed — the corrected run reused/cleaned that message. No Lovable provider key exists in the project, so none can enter pg_net.

## Invocation boundary (deployed functions)

| Case | `process-email-queue` | `account-deletion-worker` |
|---|---|---|
| no token | 401 | 401 |
| wrong token | 401 | 401 |
| anon JWT only | 401 | 401 |
| service-role JWT only (no invocation token) | 401 | 401 |
| service-role JWT as the token header | 401 | 401 |
| forged JWT bearer | 401 | 401 |
| **correct invocation token** | **500 "Server configuration error"** — authentication passed; the function then stops at the missing `LOVABLE_API_KEY` (expected without the Lovable credential) | **200 `{"ok":true}`** |

The invocation secrets have **no Supabase API authority**: each used as `apikey` + bearer on the Data API → **401 "Invalid API key"**.
