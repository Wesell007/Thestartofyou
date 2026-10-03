-- Phase 41B.1A — Family Entity Foundation: VALIDATE step (S1)
-- STATUS: PENDING. NOT APPLIED. Run only after 41b1a_family_entity_foundation.sql succeeded.
--
-- The foundation file adds its 13 composite ownership links NOT VALID so the ALTER TABLE
-- holds ACCESS EXCLUSIVE only briefly. This file validates them. VALIDATE CONSTRAINT takes
-- SHARE UPDATE EXCLUSIVE, so reads and writes continue while each table is scanned.
-- Every link column is NULL at this point (nothing is backfilled in 41B.1A), so each
-- validation is a scan that finds no violating row. It must still run, so that the
-- constraints are enforced for existing rows and reported as validated in the catalogue.
--
-- No transaction control in this file (S6); run under the same runner, or inside one
-- explicit transaction by hand at rehearsal. No data is read or changed.

SET LOCAL lock_timeout = '5s';

ALTER TABLE public.journeys               VALIDATE CONSTRAINT journeys_current_pregnancy_episode_owner_fkey;
ALTER TABLE public.reflections            VALIDATE CONSTRAINT reflections_pregnancy_episode_owner_fkey;
ALTER TABLE public.week_photos            VALIDATE CONSTRAINT week_photos_pregnancy_episode_owner_fkey;
ALTER TABLE public.week_media_memories    VALIDATE CONSTRAINT week_media_memories_pregnancy_episode_owner_fkey;
ALTER TABLE public.pregnancy_appointments VALIDATE CONSTRAINT pregnancy_appointments_pregnancy_episode_owner_fkey;
ALTER TABLE public.pregnancy_symptom_notes VALIDATE CONSTRAINT pregnancy_symptom_notes_pregnancy_episode_owner_fkey;
ALTER TABLE public.baby_movement_notes    VALIDATE CONSTRAINT baby_movement_notes_pregnancy_episode_owner_fkey;
ALTER TABLE public.birth_plans            VALIDATE CONSTRAINT birth_plans_pregnancy_episode_owner_fkey;
ALTER TABLE public.hospital_bag_items     VALIDATE CONSTRAINT hospital_bag_items_pregnancy_episode_owner_fkey;
ALTER TABLE public.midwife_questions      VALIDATE CONSTRAINT midwife_questions_pregnancy_episode_owner_fkey;
ALTER TABLE public.contraction_sessions   VALIDATE CONSTRAINT contraction_sessions_pregnancy_episode_owner_fkey;
ALTER TABLE public.contraction_events     VALIDATE CONSTRAINT contraction_events_pregnancy_episode_owner_fkey;
ALTER TABLE public.babies                 VALIDATE CONSTRAINT babies_pregnancy_episode_owner_fkey;
