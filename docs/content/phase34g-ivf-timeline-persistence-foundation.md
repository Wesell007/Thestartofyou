# Phase 34G — IVF timeline persistence foundation

**State: CLOSED PASS / FEATURE OFF / PRIVACY & LEGAL APPROVAL REQUIRED BEFORE ACTIVATION**

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

The explicit `IS NOT NULL` guard on the type matters: a `CHECK` predicate that
evaluates to NULL is treated as satisfied, so the first form of the constraint
would have silently accepted a date with no transfer type. The shipped form
rejects it.

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
