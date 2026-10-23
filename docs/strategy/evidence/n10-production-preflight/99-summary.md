# N10 production preflight (READ ONLY): summary

> **Reclassified at Gate 0 (23 October 2026):** HOLD / ACTIVE PRODUCTION TARGET DOES NOT CURRENTLY EXIST OR IS NOT OWNER-APPROVED. The owner had intentionally unpublished the Lovable site, and no production target is approved. This was not an infrastructure incident. The evidence below is unchanged. See `docs/strategy/tsoy-environment-strategy.md`.

**Result: HOLD at step 1. Production identity could not be verified, so none of the read-only checks A–E were run.**
**Production writes: 0. No SQL reached the production database. Nothing was restored, woken, published, deployed or configured.**
D = OPEN / VERIFY REQUIREMENT · D14 = OPEN · 41B.1B = NOT STARTED / NOT AUTHORISED.

Date: 2026-10-23, ≈06:55Z–07:03Z. Source: `d9351573` (clean; equal to `origin/feat/41b1a-family-entity-foundation`).

## Setup (steps 2–5)

- **Guard:** production-only guard (`raw/guard.mjs`), self-test **29/29** (`raw/01-guard-selftest.log`).
  - Only `wogepxfipdipogyogced` and its Lovable project `0866c7d7-cd21-4987-8c95-85c85872650f` are allowed.
  - All seven retired or disposable refs are denied: `jjrhizafpikmyvfapcic`, `mwlryyionkpjbecnbsiq`, `toqeefrwnsjuhjmobodg`, `gbhwpzofnswlryqjoumw`, `czhopceorfqxdbfvlnap`, `dlftnirrnirlkhxpofoq`, `wwtcnbjhttjtklpxhrkd`.
  - A read-only SQL lint is part of the guard: a single SELECT/WITH statement only; no DML, DDL, session or role changes, Vault decryption, pg_net or cron calls.
- **Documentation check:** the Supabase changelog has no entry since 1 October 2026 affecting pg_net, pg_cron, Vault, Edge Function secrets, migrations or `db push`, Auth deletion or `jwt_exp`, Storage, the pooler, PostgREST exposed schemas or advisors. Scoped PATs became GA on 6 October. The docs confirm that `db push --dry-run` compares local `supabase/migrations` with `supabase_migrations.schema_migrations`.

## Step 1: identity — what was observed

| Probe (all read-only) | Result |
|---|---|
| claude.ai Supabase connector `get_project(wogepxfipdipogyogced)` | **permission denied**: the connector's account cannot see production |
| Lovable connector `get_project(0866c7d7-…)` "The Start of You" | status `ready`; **`is_published: false`**; latest commit `4f28036…` (3 Oct 2026) |
| Lovable repo `supabase/config.toml` at `4f28036` | `project_id = "wogepxfipdipogyogced"`. Functions declared: `ai-search`, `ai-reflect`, `process-email-queue` (`verify_jwt = true`, the pre-M5 form) and `delete-account`. No `account-deletion-worker` |
| Lovable `get_database_status` | `enabled: true`, stack `supabase` |
| Lovable `query_database`, ×3 (lint-checked identity SELECT, then `select current_database() …`, then `select 1`) | **`Lovable API error: 504`** every time; no result returned |
| DNS for `wogepxfipdipogyogced.supabase.co` (8.8.8.8, 1.1.1.1, dns.google DoH) | **NXDOMAIN** (Status 3), with the authority being Cloudflare's `supabase.co` zone. Control `supabase.co` resolves (`raw/02-dns-and-site.txt`) |
| `https://thestartofyou.com` (public) | resolves to Lovable hosting (185.158.133.1) but returns **404 "Project not found"** |

The repository and the Lovable project still name `wogepxfipdipogyogced` as the backend. However, that hostname does not exist in public DNS, the database query path times out, and the custom domain serves no project.

On this evidence alone I cannot tell whether production was deleted, paused, moved to a different backend or region, or is hidden behind a Lovable-side outage. I did not try to restore, wake, publish or reconfigure anything, because each of those would change production.

## Consequences for the brief

| Section | Status |
|---|---|
| A. `suppressed_emails` (D1/D2/D3) | **NOT RUN**: no verified database access → D stays **D3, uncertain**. Missing: the catalogue, row count and reason aggregates, plus deployed function names |
| B. PostHog presence/region | **NOT RUN against production**. The live frontend is not served (404), so its runtime configuration cannot be read. VERIFY OWNER |
| C. Lovable e-mail configuration | **NOT RUN**: secret names need Lovable Cloud or Management API access; cron and pg_net shape need the database. Sender verification: OWNER/PROVIDER CONFIRMATION REQUIRED |
| D. Migration dry run | **NOT RUN**: no production history readable. HOLD |
| E. Catalogue baseline | **NOT RUN** |

## Owner question (blocking)

What is the current state of the production backend `wogepxfipdipogyogced`, and of the Lovable project "The Start of You" (unpublished, domain shows "Project not found")?
- Was it deliberately unpublished, paused or deleted?
- Has the backend moved to a new ref?
- Is Lovable Cloud having an incident?

The preflight can resume only after a verified production identity, using one of:
- Lovable's `query_database` working again (read-only SELECTs only); or
- an owner-provided **read-only** path, such as a project-scoped PAT limited to read permissions for the production ref, plus a read-only database role or connection.

A full CLI `db push --dry-run` additionally needs the production database password; an equivalent read-only history diff needs only SELECT on `supabase_migrations.schema_migrations`.
