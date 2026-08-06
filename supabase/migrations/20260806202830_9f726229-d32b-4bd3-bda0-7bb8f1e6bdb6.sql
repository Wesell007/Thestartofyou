CREATE TABLE public.first_year_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  baby_id uuid REFERENCES public.babies(id) ON DELETE CASCADE,
  entry_date date NOT NULL,
  lane text NOT NULL CHECK (lane IN ('baby','parent')),
  kind text NOT NULL CHECK (kind IN ('rhythm','feeding','sleep','nappies','recovery','wellbeing','rest_support','question')),
  note text,
  tags text[] NOT NULL DEFAULT '{}',
  answered boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT first_year_entries_note_length CHECK (note IS NULL OR char_length(note) <= 2000),
  CONSTRAINT first_year_entries_tags_count CHECK (array_length(tags, 1) IS NULL OR array_length(tags, 1) <= 8),
  CONSTRAINT first_year_entries_lane_baby CHECK (
    (lane = 'baby' AND baby_id IS NOT NULL) OR (lane = 'parent' AND baby_id IS NULL)
  ),
  CONSTRAINT first_year_entries_lane_kind CHECK (
    (lane = 'baby' AND kind IN ('rhythm','feeding','sleep','nappies'))
    OR (lane = 'parent' AND kind IN ('recovery','wellbeing','rest_support','question'))
  )
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.first_year_entries TO authenticated;
GRANT ALL ON public.first_year_entries TO service_role;

ALTER TABLE public.first_year_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own first year entries"
  ON public.first_year_entries FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own first year entries"
  ON public.first_year_entries FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own first year entries"
  ON public.first_year_entries FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own first year entries"
  ON public.first_year_entries FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX first_year_entries_user_date_idx
  ON public.first_year_entries (user_id, entry_date DESC);
CREATE INDEX first_year_entries_user_baby_date_idx
  ON public.first_year_entries (user_id, baby_id, entry_date DESC);

CREATE UNIQUE INDEX first_year_entries_baby_unique_idx
  ON public.first_year_entries (user_id, baby_id, entry_date, kind)
  WHERE lane = 'baby';
CREATE UNIQUE INDEX first_year_entries_parent_unique_idx
  ON public.first_year_entries (user_id, entry_date, kind)
  WHERE lane = 'parent' AND baby_id IS NULL;

CREATE TRIGGER first_year_entries_set_updated_at
  BEFORE UPDATE ON public.first_year_entries
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.validate_first_year_entry()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
  v_actor uuid := auth.uid();
  v_tag text;
  v_lifecycle text;
  v_baby_dob date;
  v_earliest_dob date;
BEGIN
  IF v_actor IS NOT NULL AND NEW.user_id <> v_actor THEN
    RAISE EXCEPTION 'You can only save your own notes' USING ERRCODE = '42501';
  END IF;

  SELECT lifecycle INTO v_lifecycle FROM public.journeys WHERE user_id = NEW.user_id;
  IF v_lifecycle IS DISTINCT FROM 'first_year' THEN
    RAISE EXCEPTION 'First Year notes can only be saved on a First Year journey'
      USING ERRCODE = '22023';
  END IF;

  IF NEW.tags IS NOT NULL THEN
    FOREACH v_tag IN ARRAY NEW.tags LOOP
      IF btrim(v_tag) = '' OR char_length(v_tag) > 40 THEN
        RAISE EXCEPTION 'Tags must be short labels' USING ERRCODE = '22023';
      END IF;
    END LOOP;
  END IF;

  IF NEW.lane = 'baby' THEN
    IF NEW.baby_id IS NULL THEN
      RAISE EXCEPTION 'A baby note needs a baby' USING ERRCODE = '22023';
    END IF;
    SELECT date_of_birth INTO v_baby_dob
    FROM public.babies
    WHERE id = NEW.baby_id AND user_id = NEW.user_id;
    IF v_baby_dob IS NULL THEN
      RAISE EXCEPTION 'That baby could not be found on this account' USING ERRCODE = '22023';
    END IF;
    IF NEW.entry_date < v_baby_dob THEN
      RAISE EXCEPTION 'A note cannot be saved before your baby was born' USING ERRCODE = '22023';
    END IF;
  ELSE
    IF NEW.baby_id IS NOT NULL THEN
      RAISE EXCEPTION 'A note about you cannot be attached to a baby' USING ERRCODE = '22023';
    END IF;
    SELECT min(date_of_birth) INTO v_earliest_dob
    FROM public.babies
    WHERE user_id = NEW.user_id;
    IF v_earliest_dob IS NOT NULL AND NEW.entry_date < v_earliest_dob THEN
      RAISE EXCEPTION 'A note cannot be saved before your baby was born' USING ERRCODE = '22023';
    END IF;
  END IF;

  IF NEW.entry_date > ((now() AT TIME ZONE 'UTC')::date + 1) THEN
    RAISE EXCEPTION 'A note cannot be saved for a future date' USING ERRCODE = '22023';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER first_year_entries_validate
  BEFORE INSERT OR UPDATE ON public.first_year_entries
  FOR EACH ROW EXECUTE FUNCTION public.validate_first_year_entry();