# 14 — Advisors and security review (P11)

Raw: `raw/13-advisors-{pre,post}-m7-{security,performance}.json` and `…-summary.txt`. Source: Management API `/advisors/{security,performance}` with the scoped PAT. The pre-M7 run was taken after the baseline and fixtures (≈06:29Z); the post-M7 run after all proofs (≈06:40Z).

| | Pre-M7 (M1–M6 + fixtures) | Post-M7 | New | Gone |
|---|---|---|---|---|
| Security | 4: INFO `rls_enabled_no_policy` ×3 (`private.account_deletion_requests`, `public.ai_rate_limits`, `public.email_delivery_claims`), WARN `auth_leaked_password_protection` ×1 | identical 4 | **0** | 0 |
| Performance | 134: WARN `auth_rls_initplan` ×114, INFO `unused_index` ×13, INFO `unindexed_foreign_keys` ×7 | identical 134 | **0** | 0 |

Classification: every finding is pre-existing baseline. `private.account_deletion_requests` has had RLS enabled with no policies since M1. That is deliberate: no client role has table privileges and access goes only through the SECURITY DEFINER surface. Leaked-password protection is a project Auth setting of the disposable project. **No M7-introduced finding; no critical or high finding at all.**

Manual SECURITY DEFINER review (05):
- every function is in `private`;
- `search_path = ""` on all 21;
- references are schema-qualified;
- PUBLIC EXECUTE is revoked everywhere;
- the worker has EXECUTE on exactly the 15-function surface (M7 adds only `n10_analytics_due` and `n10_record_analytics`);
- anon, authenticated and service_role have no M7 EXECUTE;
- `private` is not exposed via the Data API (PGRST106).

**P11: PASS.**
