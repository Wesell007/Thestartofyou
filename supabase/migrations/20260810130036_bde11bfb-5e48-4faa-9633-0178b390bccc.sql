CREATE TABLE public.first_year_memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  memory_scope text NOT NULL DEFAULT 'family',
  baby_id uuid NULL REFERENCES public.babies(id) ON DELETE SET NULL,
  memory_date date NOT NULL,
  title text NULL,
  note text NOT NULL,
  source_entry_id uuid NULL REFERENCES public.first_year_entries(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT first_year_memories_scope_check CHECK (memory_scope IN ('family', 'baby', 'all_babies')),
  CONSTRAINT first_year_memories_scope_baby_check CHECK (
    (memory_scope = 'baby' AND baby_id IS NOT NULL)
    OR (memory_scope <> 'baby' AND baby_id IS NULL)
  ),
  CONSTRAINT first_year_memories_note_check CHECK (
    btrim(note) <> '' AND char_length(btrim(note)) <= 2000
  ),
  CONSTRAINT first_year_memories_title_check CHECK (
    title IS NULL OR char_length(btrim(title)) <= 120
  )
);

CREATE INDEX first_year_memories_user_date_idx
  ON public.first_year_memories (user_id, memory_date DESC, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.first_year_memories TO authenticated;
GRANT ALL ON public.first_year_memories TO service_role;
REVOKE ALL ON public.first_year_memories FROM anon;

ALTER TABLE public.first_year_memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own memories"
  ON public.first_year_memories FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own memories"
  ON public.first_year_memories FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memories"
  ON public.first_year_memories FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own memories"
  ON public.first_year_memories FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

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

  RETURN NEW;
END;
$function$;

CREATE TRIGGER first_year_memories_validate
  BEFORE INSERT OR UPDATE ON public.first_year_memories
  FOR EACH ROW EXECUTE FUNCTION public.validate_first_year_memory();

CREATE TRIGGER first_year_memories_set_updated_at
  BEFORE UPDATE ON public.first_year_memories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();