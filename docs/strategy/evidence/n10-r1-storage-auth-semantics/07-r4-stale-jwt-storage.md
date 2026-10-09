# N10.1 — 07 R4: the pre-deletion access token after Auth deletion

One attempt with the access token issued to A **before** R1 (never printed), at 2026-10-09T05:07:31Z. The token's `exp` was 1791526007, about 59 minutes away (`raw/07a`).

| Probe | Result |
|---|---|
| Storage upload `n10-probe/b99b0708-…/r4-stale-upload.txt` with the stale token | **HTTP 200: accepted.** New object `43efc715-…` created, 52 bytes, readable through the API (SHA-256 `ef437ad6…413d`) |
| `owner` / `owner_id` of the new object | both `b99b0708-…`, the **deleted** user's id |
| `GET /auth/v1/user` with the stale token | HTTP 403, `user_not_found`: "User from sub claim in JWT does not exist" |
| Refresh with A's pre-deletion refresh token | HTTP 400, `refresh_token_not_found`; no new session |
| Control C | unchanged |

**Result: Storage accepts a deleted user's still-unexpired token and creates new objects owned by the deleted id.** Storage checks the token's signature, expiry and claims plus the folder rule. It does not check that the user still exists. Auth rejects the same token, and the session cannot be refreshed, so the exposure is bounded by the access-token lifetime: 3600 s on this project, the platform default.

**REQUIRED design constraint for N10.2:**

- Media writes must be blocked while deletion is pending **and** after the Auth user is gone. Example: Storage insert/update rules that also require the account to exist and not be pending.
- Alternatively, the purge must include a final sweep after the maximum token lifetime.
- Candidate E is not safe without one of these; the recommendation is both.

This was not solved in N10.1.
