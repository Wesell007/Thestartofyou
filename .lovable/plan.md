## Phase 13.7e: Visual Preference Data Model

Database foundation only. No UI, no wiring.

### Migration

```sql
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'baby_illustration_style') THEN
    CREATE TYPE public.baby_illustration_style AS ENUM ('default', 'light', 'medium', 'deep');
  END IF;
END $$;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS baby_illustration_style public.baby_illustration_style;
```

- Enum values: exactly `default`, `light`, `medium`, `deep`. No `varied`.
- Column nullable, no database default.
- Idempotent guards so preview re-runs are safe.
- No new tables, no RLS changes, no grant changes (existing profiles policies cover owner access).

### Types

After the migration applies, `src/integrations/supabase/types.ts` regenerates automatically to include the enum and the new `profiles.baby_illustration_style` field. `src/lib/myWeekBabyIllustrations.ts` already uses its own local string union and does not require realignment.

### Out of scope

No changes to AccountSettings, Setup, MyWeek, SectionBabyThisWeek, analytics, AI, routes, sitemap, article images, Weekly Reads, Journey Support.

### Verification after apply

- Confirm enum + column present.
- Run `bunx tsgo --noEmit`.
- Confirm no non-generated files changed.

Switch to build mode to apply.
