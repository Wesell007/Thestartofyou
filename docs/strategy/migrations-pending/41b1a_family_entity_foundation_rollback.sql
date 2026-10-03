-- Phase 41B.1A — Family Entity Foundation: ROLLBACK (S7)
-- STATUS: PENDING. NEVER RUN. Reverses 41b1a_family_entity_foundation.sql (and the
-- validate step) object by object, in dependency order.
--
-- Guard, checked before anything is dropped (41B.0-R test Q):
--   * refuses when public.pregnancy_episodes holds any row;
--   * refuses when any of the 13 link columns holds a non-null value;
--   * refuses when a foreign key from a later phase references pregnancy_episodes or the
--     babies (id, user_id) key (so it never assumes 41B.1B–1D have not run);
--   * aggregate counts only; no customer content is read.
-- If the guard fires, the 41B.1A rollback window has closed: episodes or links carry
-- history and are corrected forward, never deleted by this file.
--
-- No transaction control in this file (S6). Run it inside one explicit transaction
-- (psql -1, or BEGIN/COMMIT typed by the operator at rehearsal) so a failure part-way
-- leaves nothing half-removed.

SET LOCAL lock_timeout = '5s';

DO $$
DECLARE
  t text;
  tables text[] := ARRAY[
    'reflections', 'week_photos', 'week_media_memories', 'pregnancy_appointments',
    'pregnancy_symptom_notes', 'baby_movement_notes', 'birth_plans', 'hospital_bag_items',
    'midwife_questions', 'contraction_sessions', 'contraction_events', 'babies'
  ];
  expected_fks text[] := ARRAY[
    'journeys_current_pregnancy_episode_owner_fkey',
    'reflections_pregnancy_episode_owner_fkey', 'week_photos_pregnancy_episode_owner_fkey',
    'week_media_memories_pregnancy_episode_owner_fkey', 'pregnancy_appointments_pregnancy_episode_owner_fkey',
    'pregnancy_symptom_notes_pregnancy_episode_owner_fkey', 'baby_movement_notes_pregnancy_episode_owner_fkey',
    'birth_plans_pregnancy_episode_owner_fkey', 'hospital_bag_items_pregnancy_episode_owner_fkey',
    'midwife_questions_pregnancy_episode_owner_fkey', 'contraction_sessions_pregnancy_episode_owner_fkey',
    'contraction_events_pregnancy_episode_owner_fkey', 'babies_pregnancy_episode_owner_fkey'
  ];
  v_count bigint;
BEGIN
  IF to_regclass('public.pregnancy_episodes') IS NOT NULL THEN
    EXECUTE 'SELECT count(*) FROM public.pregnancy_episodes' INTO v_count;
    IF v_count > 0 THEN
      RAISE EXCEPTION 'ROLLBACK REFUSED: public.pregnancy_episodes holds % row(s). This file never destroys history.', v_count;
    END IF;

    SELECT count(*) INTO v_count
    FROM pg_constraint
    WHERE contype = 'f'
      AND confrelid = 'public.pregnancy_episodes'::regclass
      AND conname <> ALL (expected_fks);
    IF v_count > 0 THEN
      RAISE EXCEPTION 'ROLLBACK REFUSED: % foreign key(s) from a later phase reference pregnancy_episodes.', v_count;
    END IF;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'journeys' AND column_name = 'current_pregnancy_episode_id'
  ) THEN
    EXECUTE 'SELECT count(*) FROM public.journeys WHERE current_pregnancy_episode_id IS NOT NULL' INTO v_count;
    IF v_count > 0 THEN
      RAISE EXCEPTION 'ROLLBACK REFUSED: % journeys row(s) point at a pregnancy episode.', v_count;
    END IF;
  END IF;

  FOREACH t IN ARRAY tables LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = t AND column_name = 'pregnancy_episode_id'
    ) THEN
      EXECUTE format('SELECT count(*) FROM public.%I WHERE pregnancy_episode_id IS NOT NULL', t) INTO v_count;
      IF v_count > 0 THEN
        RAISE EXCEPTION 'ROLLBACK REFUSED: % row(s) in public.% are bound to a pregnancy episode.', v_count, t;
      END IF;
    END IF;
  END LOOP;

  -- babies (id, user_id) must have no dependants (the 41B.1D baby composite links).
  SELECT count(*) INTO v_count
  FROM pg_constraint f
  JOIN pg_constraint u ON u.conindid = f.conindid
  WHERE f.contype = 'f'
    AND u.contype = 'u'
    AND u.conrelid = 'public.babies'::regclass
    AND u.conname = 'babies_id_user_id_key';
  IF v_count > 0 THEN
    RAISE EXCEPTION 'ROLLBACK REFUSED: % foreign key(s) depend on babies_id_user_id_key.', v_count;
  END IF;
END $$;

-- 1. journeys pointer (added before the loop in the forward file; removed first here)
ALTER TABLE public.journeys DROP CONSTRAINT IF EXISTS journeys_current_pregnancy_episode_owner_fkey;
DROP INDEX IF EXISTS public.journeys_current_pregnancy_episode_idx;
ALTER TABLE public.journeys DROP COLUMN IF EXISTS current_pregnancy_episode_id;

-- 2. the 12 composite links, indexes and columns
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
    EXECUTE format('ALTER TABLE public.%I DROP CONSTRAINT IF EXISTS %I', t, t || '_pregnancy_episode_owner_fkey');
    EXECUTE format('DROP INDEX IF EXISTS public.%I', t || '_pregnancy_episode_idx');
    EXECUTE format('ALTER TABLE public.%I DROP COLUMN IF EXISTS pregnancy_episode_id', t);
  END LOOP;
END $$;

-- 3. babies owner key
ALTER TABLE public.babies DROP CONSTRAINT IF EXISTS babies_id_user_id_key;

-- 4. policies, trigger, indexes and the table itself
DROP POLICY IF EXISTS pregnancy_episodes_select_own ON public.pregnancy_episodes;
DROP POLICY IF EXISTS pregnancy_episodes_insert_own ON public.pregnancy_episodes;
DROP POLICY IF EXISTS pregnancy_episodes_update_own ON public.pregnancy_episodes;
DROP POLICY IF EXISTS pregnancy_episodes_delete_own ON public.pregnancy_episodes;
DROP TRIGGER IF EXISTS pregnancy_episodes_set_updated_at ON public.pregnancy_episodes;
DROP INDEX IF EXISTS public.pregnancy_episodes_one_open_per_user_idx;
DROP INDEX IF EXISTS public.pregnancy_episodes_user_id_idx;
-- pregnancy_episodes_pkey, pregnancy_episodes_id_user_id_key, pregnancy_episodes_user_id_fkey,
-- pregnancy_episodes_dates_check, pregnancy_episodes_expected_count_check and
-- pregnancy_episodes_ended_at_status_check are table-owned and go with the table.
DROP TABLE IF EXISTS public.pregnancy_episodes;

-- Not reversed, by design: nothing else. This file touches no shared enum, no legacy
-- constraint, no existing policy or function, and no row of any table.
