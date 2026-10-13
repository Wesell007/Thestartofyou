# 11 — Advisors

**Result: PASS — N10.4-introduced security findings = 0.** Raw: `raw/11-advisors-*`.

| Source | Findings | N10/N10.4-related |
|---|---|---|
| CLI `db advisors --type security` | **0** | — |
| Management API security | `auth_leaked_password_protection` WARN 1 (project Auth setting); `rls_enabled_no_policy` INFO 3 | 1 INFO: `private.account_deletion_requests` — intentional function-only table (same as N10.3B); the other two are pre-existing (`ai_rate_limits`, `email_delivery_claims`) |
| CLI / Management API performance | `auth_rls_initplan` WARN 114, `unindexed_foreign_keys` INFO 7, `unused_index` INFO 13 | **0** (none mention N10 objects or the new M6 indexes) |

Identical in count and kind to the N10.3B baseline; M4–M6 introduced no advisor finding.
