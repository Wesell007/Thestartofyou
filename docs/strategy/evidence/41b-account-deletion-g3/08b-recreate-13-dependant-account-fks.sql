-- G3 Positive B setup: recreate ONLY the 13 dependant account FKs with byte-identical definitions,
-- so their auth.users cascade triggers get new OIDs that sort after the pregnancy_episodes cascade trigger.
-- The 13 Episode ownership FKs and pregnancy_episodes_user_id_fkey are not touched. One transaction.
SET LOCAL lock_timeout = '5s';
ALTER TABLE public.babies DROP CONSTRAINT babies_user_id_fkey;
ALTER TABLE public.babies ADD CONSTRAINT babies_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.baby_movement_notes DROP CONSTRAINT baby_movement_notes_user_id_fkey;
ALTER TABLE public.baby_movement_notes ADD CONSTRAINT baby_movement_notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.birth_plans DROP CONSTRAINT birth_plans_user_id_fkey;
ALTER TABLE public.birth_plans ADD CONSTRAINT birth_plans_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.contraction_events DROP CONSTRAINT contraction_events_user_id_fkey;
ALTER TABLE public.contraction_events ADD CONSTRAINT contraction_events_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.contraction_sessions DROP CONSTRAINT contraction_sessions_user_id_fkey;
ALTER TABLE public.contraction_sessions ADD CONSTRAINT contraction_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.hospital_bag_items DROP CONSTRAINT hospital_bag_items_user_id_fkey;
ALTER TABLE public.hospital_bag_items ADD CONSTRAINT hospital_bag_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.journeys DROP CONSTRAINT journeys_user_id_fkey;
ALTER TABLE public.journeys ADD CONSTRAINT journeys_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.midwife_questions DROP CONSTRAINT midwife_questions_user_id_fkey;
ALTER TABLE public.midwife_questions ADD CONSTRAINT midwife_questions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.pregnancy_appointments DROP CONSTRAINT pregnancy_appointments_user_id_fkey;
ALTER TABLE public.pregnancy_appointments ADD CONSTRAINT pregnancy_appointments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.pregnancy_symptom_notes DROP CONSTRAINT pregnancy_symptom_notes_user_id_fkey;
ALTER TABLE public.pregnancy_symptom_notes ADD CONSTRAINT pregnancy_symptom_notes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.reflections DROP CONSTRAINT reflections_user_id_fkey;
ALTER TABLE public.reflections ADD CONSTRAINT reflections_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE NOT VALID;
ALTER TABLE public.week_media_memories DROP CONSTRAINT week_media_memories_user_id_fkey;
ALTER TABLE public.week_media_memories ADD CONSTRAINT week_media_memories_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.week_photos DROP CONSTRAINT week_photos_user_id_fkey;
ALTER TABLE public.week_photos ADD CONSTRAINT week_photos_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE NOT VALID;
