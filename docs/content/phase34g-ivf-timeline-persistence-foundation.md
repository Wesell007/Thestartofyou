# Phase 34G — IVF timeline persistence foundation

**State: CLOSED PASS / FEATURE OFF / SHARED-DATABASE MIGRATION APPLIED / PRIVACY & LEGAL APPROVAL REQUIRED BEFORE ACTIVATION**

## Purpose

Establish the minimum safe persistence foundation for a future "Save my timeline"
on `/ivf-timeline`, without activating saving, without a Save control, and
without creating a fourth saved lifecycle. IVF remains a treatment context
within the trying-to-conceive journey.

## Storage owner

`public.ttc_journeys` — the existing, user-owned trying-to-conceive journey row.
No new table, no new lifecycle, no second persistence system.

## Schema

Before:

```
public.ttc_journeys ( ... no IVF timeline columns ... )
```

After (additive, two nullable columns, no backfill):

| Column              | Type | Nullable | Default |
| ------------------- | ---- | -------- | ------- |
| `ivf_transfer_date` | date | YES      | NULL    |
| `ivf_transfer_type` | text | YES      | NULL    |

Paired-state constraint (`ttc_journeys_ivf_transfer_paired_chk`):

```sql
CHECK (
  (ivf_transfer_date IS NULL AND ivf_transfer_type IS NULL)
  OR (
    ivf_transfer_date IS NOT NULL
    AND ivf_transfer_type IS NOT NULL
    AND ivf_transfer_type IN ('3day','5day')
  )
)
```

Constraint defect found and fixed during validation: the initial paired-state
CHECK could evaluate to SQL UNKNOWN for a partial state, and PostgreSQL CHECK
constraints reject FALSE but allow TRUE or UNKNOWN — so the original form could
have allowed an incomplete IVF context. The final shipped constraint adds the
explicit non-null guard on the type and now enforces the intended pair state:

| ivf_transfer_date | ivf_transfer_type | result |
| ----------------- | ----------------- | ------ |
| NULL              | NULL              | PASS   |
| DATE              | `3day`            | PASS   |
| DATE              | `5day`            | PASS   |
| DATE              | NULL              | REJECT |
| NULL              | `3day`            | REJECT |
| NULL              | `5day`            | REJECT |
| DATE              | `day5`            | REJECT |

Partial IVF context accepted = NO.

Rollback: `ALTER TABLE public.ttc_journeys DROP CONSTRAINT
ttc_journeys_ivf_transfer_paired_chk, DROP COLUMN ivf_transfer_type, DROP COLUMN
ivf_transfer_date;`

Grants and RLS policies are unchanged — the new columns inherit the existing
user-owned access model of `ttc_journeys`.

## Domain module

`src/lib/ivfTimeline.ts` (neutral, no React imports) owns:

- `IVFTransferType = "3day" | "5day"` and `IVF_TRANSFER_TYPES`
- `isIVFTransferType`
- `parseIVFTransferDate` / `formatIVFTransferDate` — date-only, parsed at local
  noon so no timezone drift is possible
- `isValidNewIVFTransferDate` — SAVE-time rule only (real calendar date, not
  future, within the calculator's 300-day entry window)

`src/components/ivf/IVFTimelineForm.tsx` re-exports the type from here.
`src/lib/savedTTCJourney.ts` imports from here. Persistence never imports a
React component.

## Persistence interface

In `src/lib/savedTTCJourney.ts`:

- `loadIVFTimelineContext()` → `{ ok: true, context }` | `no_ttc_journey` |
  `not_authenticated` | `error`
- `saveIVFTimelineContext({ transfer_date, transfer_type })` → `{ ok: true }` |
  `no_ttc_journey` | `not_authenticated` | `invalid_context` | `error`
- `clearIVFTimelineContext()` → `{ ok: true }` | `no_ttc_journey` |
  `not_authenticated` | `error`

Rules enforced:

- No caller-supplied user id. Each helper resolves the session internally and
  filters on that user's id; RLS remains the second enforcement layer.
- Save and clear use `update(...).eq("user_id", sessionUserId).select("user_id")`
  only. A zero-row result is reported as `no_ttc_journey`, never as success — an
  absent error is not treated as proof of a write.
- Never insert, never upsert, never create a placeholder journey or lifecycle.
- Save writes both columns together; clear nulls both together.
- Load validates shape and transfer type only, parses the date safely, and
  applies no age limit — historical treatment context never expires and is never
  silently cleared.
- Only the two source values are stored. Every milestone stays derived.

Ordinary TTC saving (`save_ttc_journey` via `commitPendingTTCJourneyToDB`) is
untouched and never references the IVF columns, so omission is not a clear.

## Feature flag

`src/lib/ivfTimelineFlags.ts` → `IVF_TIMELINE_SAVE_ENABLED`, read from
`VITE_IVF_TIMELINE_SAVE_ENABLED`, default FALSE. Nothing is wired to it in this
phase. No Save, Update or Clear control exists anywhere.

## Auth return route

`/ivf-timeline` is now an accepted `return_to` target (`PUBLIC_TOOL_RETURN_PATHS`
in `src/lib/authIntent.ts`). Capability today: return route preserved = YES,
timeline values preserved across sign-in = NO. No transfer values are placed in
localStorage, sessionStorage, cookies, auth metadata or the address bar.

## Boundaries unchanged

Saved lifecycles remain exactly `ttc`, `pregnancy`, `first_year`. No `ivf`
lifecycle, no `/my-ivf-journey`. No Companion, AI runtime, prompt, grounding,
memory, journal, voice, article, imagery or analytics changes.

## Deployment record

The application does not have separate preview and production databases. The
database used by the preview also serves the published application, so the
Phase 34G schema migration has already been applied to the shared
production-serving database.

- Shared production-serving database migration applied = YES
- Application code published/deployed = NO
- Feature flag enabled = NO
- Feature activated = NO
- Save UI visible = NO
- IVF persistence available to visitors = NO
- IVF transfer values stored = 0
- Existing records changed by migration = 0
- Existing data backfilled = NO
- RLS/access policies changed = NO

Why live product behaviour is unchanged: the migration is additive only — 2
nullable columns added with no defaults, no backfill and no data rewrite; one
paired-state CHECK constraint added; no policy changes; the feature remains
OFF; the application save UI is not deployed; the calculator does not write
IVF values.

- Database schema changed = YES
- Visitor-facing application behaviour changed = NO
- Health-treatment values automatically collected = NO

The audit record distinguishes three separate facts: DATABASE SCHEMA CHANGE
(shared production-serving migration applied = YES), APPLICATION DEPLOYMENT
(application code deployed/published = NO), and FEATURE ACTIVATION (OFF).

## Final authoritative counts

- TTC persistence owner = `public.ttc_journeys`
- IVF fields added = 2
- Transfer date type = DATE
- Transfer type values = `3day` / `5day`
- Fields nullable = YES
- Paired-field constraint = YES
- Partial IVF context accepted = NO
- Existing records backfilled = NO
- Existing records modified by migration = 0
- Explicit load helper = YES
- Explicit save/update helper = YES
- Explicit clear helper = YES
- Matched-row verification = YES
- Zero-row save reported as success = NO
- Zero-row clear reported as success = NO
- Save without TTC journey = `no_ttc_journey`
- Clear without TTC journey = `no_ttc_journey`
- Journey row count changed by IVF persistence = NO
- Ordinary TTC save preserves IVF context = YES
- Historical IVF context expires = NO
- Derived milestones persisted = 0
- Feature flag enabled = NO
- Save UI visible = NO
- Calculator-triggered persistence writes = 0
- New IVF lifecycle = 0
- Saved lifecycles = ttc / pregnancy / first_year
- Existing access policies changed = NO
- Cross-user access = DENIED BY DESIGN / NOT FULLY TESTABLE
- Sensitive URL parameters generated = 0
- Companion access = NO
- AI runtime changes = 0
- Grounding changes = 0
- Privacy/legal approval completed = NO
- Privacy/legal approval required before activation = YES
- Shared production-serving database migration applied = YES
- Application code deployed = NO
- Feature activated = NO

## Closure

PHASE 34G — IVF TIMELINE PERSISTENCE FOUNDATION

CLOSED PASS / FEATURE OFF / SHARED-DATABASE MIGRATION APPLIED / PRIVACY & LEGAL
APPROVAL REQUIRED BEFORE ACTIVATION

Phase 34H (IVF timeline save experience and activation) remains recommended
but NOT started.

## Changed files

- `supabase/migrations/*` (two additive migrations: columns, then the tightened
  paired constraint)
- `src/integrations/supabase/types.ts` (regenerated)
- `src/lib/ivfTimeline.ts` (new)
- `src/lib/ivfTimelineFlags.ts` (new)
- `src/lib/savedTTCJourney.ts` (IVF helpers appended)
- `src/lib/authIntent.ts` (public tool return path)
- `src/components/ivf/IVFTimelineForm.tsx` (type re-exported from the domain)
- `src/test/phase34gIvfPersistence.test.ts` (new)
- docs + `roadmap.md`

## Activation gates

1. Phase 34G engineering PASS (this document)
2. Privacy and legal review of the persistence and user-facing copy
3. Decision on retention and deletion wording
4. Approved explicit-save UX
5. Approved authenticated handoff design
6. Feature flag explicitly enabled in a later phase
