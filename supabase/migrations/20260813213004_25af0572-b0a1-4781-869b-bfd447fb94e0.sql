ALTER TABLE public.first_year_memories
  ADD COLUMN photo_path text,
  ADD COLUMN photo_mime text,
  ADD COLUMN photo_size_bytes bigint,
  ADD COLUMN photo_width integer,
  ADD COLUMN photo_height integer;

ALTER TABLE public.first_year_memories
  ADD CONSTRAINT first_year_memories_photo_complete CHECK (
    (photo_path IS NULL AND photo_mime IS NULL AND photo_size_bytes IS NULL)
    OR (photo_path IS NOT NULL AND photo_mime IS NOT NULL AND photo_size_bytes IS NOT NULL)
  );

ALTER TABLE public.first_year_memories
  ADD CONSTRAINT first_year_memories_photo_path_length CHECK (
    photo_path IS NULL OR (char_length(photo_path) BETWEEN 1 AND 512)
  );

ALTER TABLE public.first_year_memories
  ADD CONSTRAINT first_year_memories_photo_mime_allowed CHECK (
    photo_mime IS NULL OR photo_mime IN ('image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif')
  );

ALTER TABLE public.first_year_memories
  ADD CONSTRAINT first_year_memories_photo_size_range CHECK (
    photo_size_bytes IS NULL OR (photo_size_bytes > 0 AND photo_size_bytes <= 8388608)
  );

ALTER TABLE public.first_year_memories
  ADD CONSTRAINT first_year_memories_photo_dimensions CHECK (
    (photo_width IS NULL OR (photo_width > 0 AND photo_width <= 20000))
    AND (photo_height IS NULL OR (photo_height > 0 AND photo_height <= 20000))
  );

-- Extend the existing validation trigger so a stored photo path can only ever
-- point inside the owner's own folder for this memory:
--   {user_id}/{memory_id}/{uuid}.{ext}
CREATE OR REPLACE FUNCTION public.validate_first_year_memory()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public', 'pg_temp'
AS $function$
DECLARE
  v_actor uuid := auth.uid();
  v_lifecycle text;
  v_earliest_dob date;
  v_baby_owner uuid;
  v_entry_owner uuid;
BEGIN
  IF v_actor IS NOT NULL AND NEW.user_id <> v_actor THEN
    RAISE EXCEPTION 'You can only save your own memories' USING ERRCODE = '42501';
  END IF;

  SELECT lifecycle INTO v_lifecycle FROM public.journeys WHERE user_id = NEW.user_id;
  IF v_lifecycle IS DISTINCT FROM 'first_year' THEN
    RAISE EXCEPTION 'Memories can only be saved on a First Year journey' USING ERRCODE = '22023';
  END IF;

  NEW.note := btrim(NEW.note);
  NEW.title := nullif(btrim(coalesce(NEW.title, '')), '');

  IF NEW.baby_id IS NOT NULL THEN
    SELECT user_id INTO v_baby_owner FROM public.babies WHERE id = NEW.baby_id;
    IF v_baby_owner IS DISTINCT FROM NEW.user_id THEN
      RAISE EXCEPTION 'That baby could not be found on this account' USING ERRCODE = '22023';
    END IF;
  END IF;

  IF NEW.source_entry_id IS NOT NULL THEN
    SELECT user_id INTO v_entry_owner FROM public.first_year_entries WHERE id = NEW.source_entry_id;
    IF v_entry_owner IS DISTINCT FROM NEW.user_id THEN
      RAISE EXCEPTION 'That note could not be found on this account' USING ERRCODE = '22023';
    END IF;
  END IF;

  SELECT min(date_of_birth) INTO v_earliest_dob FROM public.babies WHERE user_id = NEW.user_id;
  IF v_earliest_dob IS NOT NULL AND NEW.memory_date < v_earliest_dob THEN
    RAISE EXCEPTION 'A memory cannot be saved before your baby was born' USING ERRCODE = '22023';
  END IF;

  IF NEW.memory_date > ((now() AT TIME ZONE 'UTC')::date + 1) THEN
    RAISE EXCEPTION 'A memory cannot be saved for a future date' USING ERRCODE = '22023';
  END IF;

  IF NEW.photo_path IS NOT NULL THEN
    NEW.photo_path := btrim(NEW.photo_path);
    IF NEW.photo_path NOT LIKE (NEW.user_id::text || '/' || NEW.id::text || '/%') THEN
      RAISE EXCEPTION 'That photo could not be saved to this memory' USING ERRCODE = '22023';
    END IF;
    IF NEW.photo_path LIKE '%..%' THEN
      RAISE EXCEPTION 'That photo could not be saved to this memory' USING ERRCODE = '22023';
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;