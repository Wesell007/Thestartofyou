# Phase 13.2a — Journey Status Data Model

Approved scope. Backend/data foundation only. No UI, AI or analytics changes. Switch to build mode to apply.

## 1. Migration (single)

```sql
DO $$ BEGIN
  CREATE TYPE public.pregnancy_journey_status AS ENUM (
    'active',
    'given_birth',
    'no_longer_pregnant',
    'pregnancy_loss',
    'paused'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.pregnancy_journeys
  ADD COLUMN IF NOT EXISTS status public.pregnancy_journey_status NOT NULL DEFAULT 'active',
  ADD COLUMN IF NOT EXISTS status_changed_at timestamptz,
  ADD COLUMN IF NOT EXISTS outcome_date date;

UPDATE public.pregnancy_journeys
SET status_changed_at = COALESCE(updated_at, started_at, now())
WHERE status_changed_at IS NULL;
```

- No new RLS policy. Existing user-scoped policies cover the new columns.
- No new grants. No `anon` access.
- No `status_reason`, no free-text reason, no loss-detail columns, no gestation-at-loss, no loss date, no `paused_at`, no analytics columns, no `journey_id` FK on memories/toolkit/reflections/photos.
- Idempotent: `IF NOT EXISTS` and `duplicate_object` guards make it safe to re-run in preview.

## 2. Types

`src/integrations/supabase/types.ts` regenerates automatically after the migration. `pregnancy_journeys.Row/Insert/Update` will gain `status`, `status_changed_at`, `outcome_date`; new enum appears under `Database.public.Enums.pregnancy_journey_status`. No manual edit.

## 3. `src/lib/savedJourney.ts` (additive)

- Add `export type PregnancyJourneyStatus = "active" | "given_birth" | "no_longer_pregnant" | "pregnancy_loss" | "paused";`
- Extend `ActivePregnancyJourney` with `status: PregnancyJourneyStatus`, `status_changed_at: string | null`, `outcome_date: string | null`.
- `getActivePregnancyJourney`: extend the `pregnancy_journeys` select to include the three new fields; populate them on the returned object.
- Legacy `saved_journeys` fallback path: return `status: "active"`, `status_changed_at: null`, `outcome_date: null` so future callers can trust `status` without checking origin.
- No changes to `upsertPregnancyJourney`, `mirrorToLegacy`, `commitPendingJourneyToDB`, `readPendingJourney`, `stashPendingJourney`, `clearPendingJourney`.
- No write helper this phase.

Existing consumers only destructure `lmp`, `due`, `lmp_date`, `due_date`, `started_at`, `startedAt` — the addition is non-breaking.

## 4. Preservation

No changes to My Week, My Journey, Pregnancy Toolkit, Birth Plan, Hospital Bag, Photo Memories, Captions, Reflections, Companion, AI backend/prompt/request, Account Settings UI, routes, sitemap, robots, public pages, TTC, IVF, First Year, Toddler, Family.

## 5. Verification (after apply)

- Migration applies cleanly.
- Enum has exactly the 5 approved values.
- All existing rows: `status = 'active'`, `status_changed_at` non-null, `outcome_date` null.
- No new RLS policy, no `anon` grant.
- Regenerated Supabase types.
- `bunx tsgo --noEmit` clean.
- `/my-week`, `/my-journey`, `/pregnancy-toolkit` render identically.

## 6. Order of operations (build mode)

1. Apply the migration.
2. Wait for types regeneration.
3. Edit `src/lib/savedJourney.ts` per section 3.
4. Run `bunx tsgo --noEmit`.
5. Return summary.

Please switch to build mode to proceed.
