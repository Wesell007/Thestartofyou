# 21 — Retirement of the N10.5 rehearsal infrastructure

**Teardown: COMPLETE (15 October 2026).** This record is based on **owner confirmation** for the Dashboard project deletion and token revocation; no remote verification was attempted after the credentials were retired.

| Item | State |
|---|---|
| Disposable project `tsoy-n10-5-rehearsal` (`mwlryyionkpjbecnbsiq`) | deleted manually by the owner |
| N10.5 project-scoped access token | revoked by the owner |
| Local protected directory `C:\Users\Administrator\.n105\` (credentials, sealed copy, harness) | deleted after the evidence push (`355b71e8`); absence verified by filesystem metadata |
| Committed evidence | retained in Git (`docs/strategy/evidence/n10-5-hosted-n104/`; predictions `c8385ba5`, evidence `355b71e8`) |
| Production | never accessed |
| 41B.1A | never applied to production |

## Final N10.5 status

- **N10.5 = CLOSED / RETIRED. HOSTED CORE = PASS** (M4, M5, M6, real GoTrue atomicity, zero media removal on failed Auth deletion, retry).
- **OPERATOR ALERT DELIVERY and E-MAIL QUEUE DELIVERY = HOLD** — Lovable-managed `LOVABLE_API_KEY` unavailable in a disposable project; to be proven at controlled activation (smoke test) or in an owner-approved Lovable-provisioned rehearsal.
- D14 = OPEN. 41B.1B = NOT STARTED / NOT AUTHORISED. Production ready = NO.
