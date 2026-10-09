# 18 — Security and performance advisors (§33)

**Result: PASS — N10-introduced security errors = 0.** Two current supported paths were used (CLI help checked first): `supabase db advisors --type security|performance` against the target (`--db-url` built by the guard) and Management API `GET /v1/projects/{ref}/advisors/{security,performance}`. Raw: `raw/33-advisors-*.{txt,json}`.

## Security

| Finding | Level | Count | N10? | Classification |
|---|---|---|---|---|
| CLI `db advisors --type security` | — | **0** ("No issues found") | — | — |
| `auth_leaked_password_protection` | WARN | 1 | no | project Auth setting (pre-existing / platform default); not changed |
| `rls_enabled_no_policy` | INFO | 3 | **1** | `private.account_deletion_requests`: **intentional** — RLS on, no grants, function-only surface (frozen D9); the other 2 are pre-existing tables |
| ERROR level | — | **0** | — | — |

Specifically inspected for N10: SECURITY DEFINER functions (all `search_path=""`, EXECUTE restricted — 04); mutable search_path (none flagged); RLS (on); policy roles (`authenticated` only); `private` schema not exposed through the Data API (`db_schema = public, graphql_public`); grants (04); custom worker role (no dangerous attributes; effective surface 05).

## Performance

| Finding | Level | Count | N10 objects |
|---|---|---|---|
| `auth_rls_initplan` | WARN | 114 | **0** (historical `public` policies; the N10 Storage policies wrap `(SELECT auth.uid())` / `(SELECT private.account_media_access_allowed())`) |
| `unindexed_foreign_keys` | INFO | 7 | 0 |
| `unused_index` | INFO | 13 | 0 |

The §11 effective-privilege audit (05) is the separate hard gate and passed independently of these advisors.
