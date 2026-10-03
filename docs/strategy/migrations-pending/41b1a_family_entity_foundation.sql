-- Phase 41B.1A — Family Entity Foundation (additive only)
-- AMENDED 3 October 2026 per Phase 41B.0-R (S1–S12) and the owner's final S13 resolution.
-- STATUS: PENDING. NOT APPLIED. Rehearsal (41B.1A-C1) NOT STARTED.
-- Kept outside supabase/migrations/ on purpose so it cannot be applied automatically.
--
-- Companion files (same folder):
--   41b1a_family_entity_foundation_validate.sql  — VALIDATE CONSTRAINT for the 13 NOT VALID links (S1)
--   41b1a_family_entity_foundation_rollback.sql  — guarded reversal, refuses when any new-model row exists (S7)
--
-- Foundation only. Prepares 19 of the 26 ledger controls (rows 1–18, 22) plus the
-- 41B.0-R additions on the new table (NOT NULL dates, date CHECK, removed_at).
-- No backfill, no data manipulation, no destructive statement, no existing policy,
-- constraint or function touched. The 11 legacy constraints in the 41B.0-R ledger are
-- all deferred (rows 1–7 to 41B.1C, rows 8–11 to 41B.1D). Ledger rows 20–21 (reflections unique
-- split) are deferred to 41B.1C step 3 with the other unique-key splits; rows 19 and 23–26 to 41B.1D.
--
-- Transaction control (S6): none in this file. The migration runner wraps the file; the
-- rehearsal proves atomicity with a forced failure. SET LOCAL therefore applies to the run.
-- Lock strategy (S1): bounded lock waits; FKs added NOT VALID so no full-table scan under
-- ACCESS EXCLUSIVE; journeys altered before the loop (lock order matches First Year functions).
-- Non-concurrent index builds accepted while the tables are small; record aggregate row counts first.

SET LOCAL lock_timeout = '5s';

-- ---------------------------------------------------------------------------
-- Ledger rows 1–5: durable pregnancy episode entity
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pregnancy_episodes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  lmp_date date NOT NULL,                                                       -- S4
  due_date date NOT NULL,                                                       -- S4
  status public.pregnancy_journey_status NOT NULL DEFAULT 'active',
  status_changed_at timestamptz,
  outcome_date date,
  expected_count smallint,
  -- S13 (final): the person explicitly removed this chapter from current-journey
  -- presentation. Orthogonal to status. Not an outcome. Not deletion.
  removed_at timestamptz,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT pregnancy_episodes_pkey PRIMARY KEY (id),                         -- row 1
  CONSTRAINT pregnancy_episodes_id_user_id_key UNIQUE (id, user_id),           -- row 2
  -- Account-level cascade is INTENTIONAL (whole-account deletion). Episode-level
  -- dependants below are RESTRICT.
  CONSTRAINT pregnancy_episodes_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE,
  -- S4: the same rule save_pregnancy_journey enforces (20260803231512).
  CONSTRAINT pregnancy_episodes_dates_check
    CHECK (due_date > lmp_date AND due_date <= lmp_date + 300),
  CONSTRAINT pregnancy_episodes_expected_count_check                           -- row 4
    CHECK (expected_count IS NULL OR expected_count BETWEEN 1 AND 4),
  CONSTRAINT pregnancy_episodes_ended_at_status_check                          -- row 5
    CHECK ((status IN ('active', 'paused')) = (ended_at IS NULL))
);

-- Row 3 (S5 + S13): at most one OPEN pregnancy per person.
-- OPEN = status IN ('active','paused') AND removed_at IS NULL.
-- A removed episode never blocks a later pregnancy.
CREATE UNIQUE INDEX IF NOT EXISTS pregnancy_episodes_one_open_per_user_idx
  ON public.pregnancy_episodes (user_id)
  WHERE status IN ('active', 'paused') AND removed_at IS NULL;

-- S3: keep (user_id); the partial unique index above serves open-episode lookups.
CREATE INDEX IF NOT EXISTS pregnancy_episodes_user_id_idx
  ON public.pregnancy_episodes (user_id);

-- S11: drop-and-create needs no Postgres 14 feature and is re-runnable.
DROP TRIGGER IF EXISTS pregnancy_episodes_set_updated_at ON public.pregnancy_episodes;
CREATE TRIGGER pregnancy_episodes_set_updated_at
  BEFORE UPDATE ON public.pregnancy_episodes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- S2 + owner decision 2: explicit privileges. Signed-in clients read only in 41B.1A;
-- INSERT/UPDATE arrive with the 41B.1C transition trigger; DELETE never.
REVOKE ALL ON TABLE public.pregnancy_episodes FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.pregnancy_episodes TO authenticated;
GRANT ALL ON TABLE public.pregnancy_episodes TO service_role;

ALTER TABLE public.pregnancy_episodes ENABLE ROW LEVEL SECURITY;

-- Four owner policies (authenticated only, explicit WITH CHECK on INSERT and UPDATE).
-- The INSERT/UPDATE/DELETE policies are inert until a privilege is granted (41B.1C grants
-- INSERT and UPDATE; DELETE is never granted). Kept so 41B.1C adds no policy churn.
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

-- ---------------------------------------------------------------------------
-- Row 18 (S9): journeys current-chapter pointer. Altered BEFORE the loop (S1 lock order).
-- Nullable, not populated. Permitted under any lifecycle (41B.0-R §6); row 19 is 41B.1D.
-- The pointer names the pregnancy chapter currently presented. It is not "active".
-- ---------------------------------------------------------------------------
ALTER TABLE public.journeys ADD COLUMN IF NOT EXISTS current_pregnancy_episode_id uuid;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.journeys'::regclass
      AND conname = 'journeys_current_pregnancy_episode_owner_fkey'
  ) THEN
    ALTER TABLE public.journeys ADD CONSTRAINT journeys_current_pregnancy_episode_owner_fkey
      FOREIGN KEY (current_pregnancy_episode_id, user_id)
      REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT NOT VALID;
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS journeys_current_pregnancy_episode_idx
  ON public.journeys (current_pregnancy_episode_id, user_id);

-- ---------------------------------------------------------------------------
-- Rows 6–17: nullable pregnancy_episode_id + composite same-user FK (NOT VALID, S1)
-- on the 11 pregnancy-owned tables and babies. Guards scoped by table (S10).
-- babies.pregnancy_episode_id is nullable permanently by design (41B.0-R §17).
-- contraction_events keeps its own link; server-filled from the session in 41B.1C (S12).
-- ---------------------------------------------------------------------------
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
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint
      WHERE conrelid = format('public.%I', t)::regclass
        AND conname = t || '_pregnancy_episode_owner_fkey'
    ) THEN
      EXECUTE format(
        'ALTER TABLE public.%I ADD CONSTRAINT %I FOREIGN KEY (pregnancy_episode_id, user_id) '
        'REFERENCES public.pregnancy_episodes (id, user_id) ON DELETE RESTRICT NOT VALID',
        t, t || '_pregnancy_episode_owner_fkey');
    END IF;
    EXECUTE format('CREATE INDEX IF NOT EXISTS %I ON public.%I (pregnancy_episode_id, user_id)',
      t || '_pregnancy_episode_idx', t);
  END LOOP;
END $$;

-- ---------------------------------------------------------------------------
-- Row 22: babies (id, user_id) owner key for the later composite baby links (41B.1D).
-- ---------------------------------------------------------------------------
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.babies'::regclass
      AND conname = 'babies_id_user_id_key'
  ) THEN
    ALTER TABLE public.babies ADD CONSTRAINT babies_id_user_id_key UNIQUE (id, user_id);
  END IF;
END $$;

-- Not in this file, by design:
--   * no authenticated INSERT/UPDATE/DELETE on episodes (41B.1C transition trigger first);
--   * no "Remove this journey" function; its 41B.1C contract is recorded in
--     phase41b0r-family-entity-architecture-reconciliation.md §28;
--   * no backfill, no babies.archived_at, no legacy constraint change, no enum change.
