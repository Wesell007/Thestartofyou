# Phase 34G — IVF timeline persistence: validation evidence

## Database

- Columns verified in `public.ttc_journeys`: `ivf_transfer_date` (date,
  nullable, default NULL), `ivf_transfer_type` (text, nullable, default NULL).
- Constraint verified: `ttc_journeys_ivf_transfer_paired_chk`.
- Paired-state truth table evaluated against the shipped predicate:

| date | type | accepted |
| --- | --- | --- |
| NULL | NULL | YES |
| 2026-03-01 | `3day` | YES |
| 2026-03-01 | `5day` | YES |
| 2026-03-01 | NULL | NO |
| NULL | `5day` | NO |
| 2026-03-01 | `day5` | NO |

- Defect found and fixed during validation: the first constraint form
  (`... AND ivf_transfer_type IN (...)`) evaluated to NULL for a date with a
  NULL type, and Postgres treats a NULL CHECK result as satisfied — a partial
  state would have been accepted. The shipped constraint adds an explicit
  `ivf_transfer_type IS NOT NULL` guard and rejects it.
- No backfill, no data mutation, no grant or policy change.

## Tests

- Focused: `src/test/phase34gIvfPersistence.test.ts` — 24 tests, all passing.
  Covers the shared domain and single transfer-type representation, no-React
  dependency in persistence, timezone-safe date round-trip, save-time entry
  rules, historical load beyond 300 days with no rewrite, empty context vs no
  journey, not-authenticated, 3-day and 5-day updates, ownership derived from
  the session with no caller-supplied id, invalid type and date rejection before
  any query, zero-row save and zero-row clear reported as `no_ttc_journey`,
  atomic clear of both values, only the two source values written, update-only
  helpers with no insert or upsert, ordinary TTC save free of the IVF columns,
  feature flag off with no Save/Update/Clear control, calculator making no
  persistence write, no IVF values in Companion context or analytics, lifecycle
  list unchanged with no `/my-ivf-journey`, and `/ivf-timeline` accepted as a
  return route with no values carried across sign-in.
- Existing TTC persistence and auth-intent tests: passing, unchanged.
- Full suite: 127 files, 1,463 tests, all passing.

## Access control

- Helpers resolve the signed-in user internally; no caller-supplied user id is
  accepted, so a caller cannot target another person's row.
- Existing row-level security on `ttc_journeys` is unchanged and remains the
  second enforcement layer; the new columns inherit it.
- **CROSS-USER RLS = NOT FULLY TESTABLE** in this harness: two concurrent real
  sessions cannot be run. Query filtering alone is not claimed as an
  access-rule integration test.

## Static checks

- Typecheck: clean, run twice.
- Lint: at baseline — 1 pre-existing error in a generated file
  (`src/integrations/supabase/previewAuthStorage.ts`) plus 10 pre-existing
  warnings. No new issues.
- Production build: successful.

## Frontend regression QA

Automated browser pass at 1280, 834 and 390 across `/ivf`, `/ivf-timeline`,
`/ivf/before-transfer`, `/ivf/after-transfer`, `/ivf/early-pregnancy`:

- Horizontal overflow: 0 at all three widths.
- New console errors: 0 at all three widths.
- Save / Update / Clear controls: 0 on every page.
- Signed-out calculation on `/ivf-timeline`: works, renders the timeline, and
  the address bar remains `/ivf-timeline` with no new parameters.
- Sensitive URL parameters generated: 0.

## Deployment state

Production migration applied = NO (validated in the non-production workflow
only). Production deployed = 0. Feature flag enabled = NO.
