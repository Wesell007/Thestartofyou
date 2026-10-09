# 07 — Hosted JWT window (§14)

**Result: PASS.**

- Read path: Management API `GET /v1/projects/toqeefrwnsjuhjmobodg/config/auth` (Auth Config: Read), HTTP 200 (`raw/14-auth-config.json`).
- **W_hosted = `jwt_exp` = 3600 s.** Corroborated at runtime: every synthetic sign-in returned `expires_in = 3600` (`raw/19-users-create.txt`).
- Configured: `N10_VERIFIED_TOKEN_WINDOW_SECONDS = 3600`, `N10_TOKEN_WINDOW_VERIFICATION = management-api:2026-10-09`.
- W configured (3600) ≥ W_hosted (3600) and ≥ the 3600 s floor.
- Auth configuration was **not** modified. Other read values (context only): refresh-token rotation on, reuse interval 10 s, no session timebox/inactivity timeout.
- Fail-closed behaviour of a missing/unverified window is covered by the local suites (N10.3A); on the hosted run the configured window was valid, and the database recomputed `final_sweep_after = auth_deleted_at + 01:15:00` for every real deletion (16).
