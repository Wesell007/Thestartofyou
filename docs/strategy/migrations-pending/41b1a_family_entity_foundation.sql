-- Phase 41B.1A — Family Entity Foundation (additive only)
-- STATUS: PENDING. NOT APPLIED. Recovery gate BLOCKED (no verified backup/restore path).
-- Kept outside supabase/migrations/ on purpose so it cannot be applied automatically.
-- Implements 19 of the 26 target controls in the 41B.0 ledger (rows 1-18, 22).
-- Deferred: row 19, rows 20-21, rows 23-26 and the 5 legacy changed/removed constraints.
-- Forward migration: no data manipulation, no backfill, no destructive schema statements.

BEGIN;

-- Ledger rows 1-5: pregnancy episode entity
CREATE TABLE IF NOT EXISTS public.pregnancy_episodes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  lmp_date date,
  due_date date,
  status public.pregnancy_journey_status NOT NULL DEFAULT 'active',
  status_changed_at timestamptz,
  outcome_date date,
  expected_count smallint,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pregnancy_episodes_pkey PRIMARY KEY (id),                         -- row 1
  CONSTRAINT pregnancy_episodes_id_user_id_key UNIQUE (id, user_id),           -- row 2
  CONSTRAINT pregnancy_episodes_expected_count_check                           -- row 4
    CHECK (expected_count IS NULL OR expected_count BETWEEN 1 AND 4),
  CONSTRAINT pregnancy_episodes_ended_at_status_check                          -- row 5
    CHECK ((status IN ('active', 'paused')) = (ended_at IS NULL))
);

-- Row 3: at most one active pregnancy per person
CREATE UNIQUE INDEX IF NOT EXISTS pregnancy_episodes_one_active_per_user_idx
  ON public.pregnancy_episodes (user_id) WHERE status = 'active';

CREATE INDEX IF NOT EXISTS pregnancy_episodes_user_id_idx
  ON public.pregnancy_episodes (user_id);

CREATE OR REPLACE TRIGGER pregnancy_episodes_set_updated_at
  BEFORE UPDATE ON public.pregnancy_episodes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT, INSERT, UPDATE, DELETE ON public.pregnancy_episodes TO authenticated;
GRANT ALL ON public.pregnancy_episodes TO service_role;

ALTER TABLE public.pregnancy_episodes ENABLE ROW LEVEL SECURITY;

-- Four owner policies (authenticated only, explicit WITH CHECK on INSERT and UPDATE)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'pregnancy_episodes' AND policyname = 'pregnancy_episodes_select_own') THEN
    CREATE POLICY pregnancy_episodes_select_own ON public.pregnancy_episodes
      FOR SELECT TO authenticated USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'pregnancy_episodes' AND policyname = 'pregnancy_episodes_insert_own') THEN
    CREATE POLICY pregnancy_episodes_insert_own ON public.pregnancy_episodes
      FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'pregnancy_episodes' AND policyname = 'pregnancy_episodes_update_own') THEN
    CREATE POLICY pregnancy_episodes_update_own ON public.pregnancy_episodes
      FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'pregnancy_episodes' AND policyname = 'pregnancy_episodes_delete_own') THEN
    CREATE POLICY pregnancy_episodes_delete_own ON public.pregnancy_episodes
      FOR DELETE TO authenticated USING (auth.uid() = user_id);
  END IF;
END $$;

-- Rows 6-17: nullable pregnancy_episode_id + composite same-user FK on 11 pregnancy tables and babies
DO $$
DECLARE
  t text;
  tables text[] := ARRAY[
    'reflections', 'week_photos', 'week_media_memories', 'pregnancy_appointments',
    'pregnancy_symptom_notes', 'baby_movement_notes', 'birth_plans', 'hospital_bag_items',
    'midwife_questions', 'contraction_sessions', 'contraction_events', 'babies'
  ];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('ALTER TABLE public.%I ADD COLUMN IF NOT EXISTS pregnancy_episode_id uuid', t);
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = t || '_pregnancy_episode_owner_fkey') THEN
      EXECUTE format(
        'ALTER TABLE public.%I ADD CONSTRAINT %I FOREIGN KEY (pregnancy_episode_id, user_id) '
        'REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT',
        t, t || '_pregnancy_episode_owner_fkey');
    END IF;
    EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON public.%I (pregnancy_episode_id, user_id)',
      t || '_pregnancy_episode_idx', t);
  END LOOP;
END $$;

-- Row 18: journeys active-pregnancy pointer (nullable, not populated)
ALTER TABLE public.journeys ADD COLUMN IF NOT EXISTS active_pregnancy_episode_id uuid;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'journeys_active_pregnancy_episode_owner_fkey') THEN
    ALTER TABLE public.journeys ADD CONSTRAINT journeys_active_pregnancy_episode_owner_fkey
      FOREIGN KEY (active_pregnancy_episode_id, user_id)
      REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT;
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS journeys_active_pregnancy_episode_idx
  ON public.journeys (active_pregnancy_episode_id, user_id);

-- Row 22: babies (id, user_id) owner key for later composite baby links
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'babies_id_user_id_key') THEN
    ALTER TABLE public.babies ADD CONSTRAINT babies_id_user_id_key UNIQUE (id, user_id);
  END IF;
END $$;

COMMIT;
