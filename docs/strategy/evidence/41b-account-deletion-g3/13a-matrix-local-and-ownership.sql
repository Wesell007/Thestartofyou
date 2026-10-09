\set ON_ERROR_STOP 1
BEGIN;
SET LOCAL lock_timeout = '5s';
insert into public.pregnancy_episodes (id, user_id, lmp_date, due_date, status) values ('00000000-0000-4a3a-8000-e100000000e1', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', date '2026-03-01', date '2026-12-06', 'active'), ('00000000-0000-4a3a-8000-e200000000e1', '381185db-4888-4002-bcaa-369ccde2b9af', date '2026-03-01', date '2026-12-06', 'active');
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.journeys (user_id, lifecycle, current_pregnancy_episode_id) values ('8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'pregnancy', '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|1|journeys|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|1|journeys|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|1|journeys|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.reflections (id, user_id, week, content, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000302', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, 'G3 matrix', '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|2|reflections|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|2|reflections|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|2|reflections|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.week_photos (id, user_id, week, storage_path, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000303', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0/21.jpg', '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|3|week_photos|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|3|week_photos|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|3|week_photos|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.week_media_memories (id, user_id, week, media_type, mime_type, storage_path, file_size_bytes, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000304', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, 'voice_note', 'audio/mpeg', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0/21.mp3', 1000, '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|4|week_media_memories|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|4|week_media_memories|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|4|week_media_memories|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.pregnancy_appointments (id, user_id, week, appointment_type, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000305', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, 'G3 matrix', '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|5|pregnancy_appointments|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|5|pregnancy_appointments|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|5|pregnancy_appointments|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.pregnancy_symptom_notes (id, user_id, symptom_label, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000306', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'G3 matrix', '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|6|pregnancy_symptom_notes|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|6|pregnancy_symptom_notes|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|6|pregnancy_symptom_notes|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.baby_movement_notes (id, user_id, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000307', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|7|baby_movement_notes|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|7|baby_movement_notes|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|7|baby_movement_notes|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.birth_plans (id, user_id, completion, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000308', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 10, '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|8|birth_plans|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|8|birth_plans|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|8|birth_plans|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.hospital_bag_items (id, user_id, category, item_key, label, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000309', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'baby', 'g3_matrix', 'G3 matrix', '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|9|hospital_bag_items|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|9|hospital_bag_items|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|9|hospital_bag_items|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.midwife_questions (id, user_id, category, question, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000030a', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'other', 'G3 matrix', '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|10|midwife_questions|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|10|midwife_questions|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|10|midwife_questions|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.contraction_sessions (id, user_id, started_at, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000030b', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', now(), '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|11|contraction_sessions|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|11|contraction_sessions|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|11|contraction_sessions|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.contraction_sessions (id, user_id, started_at) values ('00000000-0000-4a3a-8000-e8000000030c', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', now()); insert into public.contraction_events (id, user_id, session_id, started_at, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000030c', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', '00000000-0000-4a3a-8000-e8000000030c', now(), '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|12|contraction_events|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|12|contraction_events|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|12|contraction_events|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    insert into public.babies (id, user_id, name, date_of_birth, birth_order, is_primary, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000030d', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'G3 matrix', date '2026-09-20', 1, true, '00000000-0000-4a3a-8000-e100000000e1');
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|13|babies|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|13|babies|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|13|babies|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      delete from public.pregnancy_episodes where id = '00000000-0000-4a3a-8000-e100000000e1';
      RAISE NOTICE 'G3|LOCAL|0|no_dependant_control|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|LOCAL|0|no_dependant_control|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|LOCAL|0|no_dependant_control|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.journeys (user_id, lifecycle, current_pregnancy_episode_id) values ('8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'pregnancy', '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|1|journeys|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|1|journeys|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|1|journeys|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.journeys (user_id, lifecycle, current_pregnancy_episode_id) values ('8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'pregnancy', '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|1|journeys|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|1|journeys|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|1|journeys|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.reflections (id, user_id, week, content, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000402', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, 'G3 matrix', '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|2|reflections|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|2|reflections|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|2|reflections|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.reflections (id, user_id, week, content, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000502', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, 'G3 matrix', '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|2|reflections|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|2|reflections|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|2|reflections|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.week_photos (id, user_id, week, storage_path, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000403', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0/21.jpg', '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|3|week_photos|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|3|week_photos|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|3|week_photos|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.week_photos (id, user_id, week, storage_path, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000503', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0/21.jpg', '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|3|week_photos|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|3|week_photos|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|3|week_photos|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.week_media_memories (id, user_id, week, media_type, mime_type, storage_path, file_size_bytes, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000404', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, 'voice_note', 'audio/mpeg', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0/21.mp3', 1000, '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|4|week_media_memories|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|4|week_media_memories|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|4|week_media_memories|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.week_media_memories (id, user_id, week, media_type, mime_type, storage_path, file_size_bytes, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000504', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, 'voice_note', 'audio/mpeg', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0/21.mp3', 1000, '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|4|week_media_memories|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|4|week_media_memories|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|4|week_media_memories|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.pregnancy_appointments (id, user_id, week, appointment_type, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000405', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, 'G3 matrix', '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|5|pregnancy_appointments|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|5|pregnancy_appointments|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|5|pregnancy_appointments|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.pregnancy_appointments (id, user_id, week, appointment_type, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000505', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 21, 'G3 matrix', '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|5|pregnancy_appointments|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|5|pregnancy_appointments|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|5|pregnancy_appointments|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.pregnancy_symptom_notes (id, user_id, symptom_label, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000406', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'G3 matrix', '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|6|pregnancy_symptom_notes|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|6|pregnancy_symptom_notes|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|6|pregnancy_symptom_notes|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.pregnancy_symptom_notes (id, user_id, symptom_label, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000506', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'G3 matrix', '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|6|pregnancy_symptom_notes|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|6|pregnancy_symptom_notes|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|6|pregnancy_symptom_notes|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.baby_movement_notes (id, user_id, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000407', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|7|baby_movement_notes|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|7|baby_movement_notes|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|7|baby_movement_notes|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.baby_movement_notes (id, user_id, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000507', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|7|baby_movement_notes|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|7|baby_movement_notes|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|7|baby_movement_notes|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.birth_plans (id, user_id, completion, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000408', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 10, '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|8|birth_plans|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|8|birth_plans|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|8|birth_plans|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.birth_plans (id, user_id, completion, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000508', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 10, '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|8|birth_plans|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|8|birth_plans|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|8|birth_plans|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.hospital_bag_items (id, user_id, category, item_key, label, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000409', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'baby', 'g3_matrix', 'G3 matrix', '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|9|hospital_bag_items|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|9|hospital_bag_items|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|9|hospital_bag_items|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.hospital_bag_items (id, user_id, category, item_key, label, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e90000000509', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'baby', 'g3_matrix', 'G3 matrix', '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|9|hospital_bag_items|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|9|hospital_bag_items|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|9|hospital_bag_items|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.midwife_questions (id, user_id, category, question, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000040a', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'other', 'G3 matrix', '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|10|midwife_questions|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|10|midwife_questions|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|10|midwife_questions|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.midwife_questions (id, user_id, category, question, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000050a', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'other', 'G3 matrix', '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|10|midwife_questions|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|10|midwife_questions|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|10|midwife_questions|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.contraction_sessions (id, user_id, started_at, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000040b', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', now(), '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|11|contraction_sessions|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|11|contraction_sessions|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|11|contraction_sessions|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.contraction_sessions (id, user_id, started_at, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000050b', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', now(), '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|11|contraction_sessions|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|11|contraction_sessions|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|11|contraction_sessions|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.contraction_sessions (id, user_id, started_at) values ('00000000-0000-4a3a-8000-e8000000040c', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', now()); insert into public.contraction_events (id, user_id, session_id, started_at, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000040c', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', '00000000-0000-4a3a-8000-e8000000040c', now(), '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|12|contraction_events|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|12|contraction_events|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|12|contraction_events|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.contraction_sessions (id, user_id, started_at) values ('00000000-0000-4a3a-8000-e8000000050c', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', now()); insert into public.contraction_events (id, user_id, session_id, started_at, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000050c', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', '00000000-0000-4a3a-8000-e8000000050c', now(), '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|12|contraction_events|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|12|contraction_events|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|12|contraction_events|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.babies (id, user_id, name, date_of_birth, birth_order, is_primary, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000040d', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'G3 matrix', date '2026-09-20', 1, true, '00000000-0000-4a3a-8000-e100000000e1');
      RAISE NOTICE 'G3|SAME|13|babies|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|SAME|13|babies|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|SAME|13|babies|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
DO $g3$
DECLARE st text; cn text;
BEGIN
  BEGIN
    null;
    BEGIN
      insert into public.babies (id, user_id, name, date_of_birth, birth_order, is_primary, pregnancy_episode_id) values ('00000000-0000-4a3a-8000-e9000000050d', '8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0', 'G3 matrix', date '2026-09-20', 1, true, '00000000-0000-4a3a-8000-e200000000e1');
      RAISE NOTICE 'G3|CROSS|13|babies|ACCEPTED||';
    EXCEPTION WHEN OTHERS THEN
      GET STACKED DIAGNOSTICS st = RETURNED_SQLSTATE, cn = CONSTRAINT_NAME;
      RAISE NOTICE 'G3|CROSS|13|babies|REFUSED|%|%', st, cn;
    END;
    RAISE EXCEPTION 'g3_undo';
  EXCEPTION WHEN OTHERS THEN
    IF SQLERRM <> 'g3_undo' THEN RAISE NOTICE 'G3|CROSS|13|babies|SETUP_ERROR|%|%', SQLSTATE, SQLERRM; END IF;
  END;
END $g3$;
ROLLBACK;
select (select count(*) from public.pregnancy_episodes where user_id in ('8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0','381185db-4888-4002-bcaa-369ccde2b9af')) as residue_episodes, (select count(*) from public.journeys where user_id in ('8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0','381185db-4888-4002-bcaa-369ccde2b9af')) + (select count(*) from public.babies where user_id in ('8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0','381185db-4888-4002-bcaa-369ccde2b9af')) + (select count(*) from public.contraction_sessions where user_id in ('8b59a3d8-ae96-4d7a-9349-39f75dd0d3e0','381185db-4888-4002-bcaa-369ccde2b9af')) as residue_rows;
