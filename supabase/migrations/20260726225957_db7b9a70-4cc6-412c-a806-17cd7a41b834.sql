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