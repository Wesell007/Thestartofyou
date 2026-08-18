CREATE TABLE public.first_year_care_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  baby_id uuid NOT NULL REFERENCES public.babies(id) ON DELETE CASCADE,
  event_type text NOT NULL CHECK (event_type IN ('feed','sleep','nappy','pump','note')),
  occurred_at timestamptz NOT NULL,
  started_at timestamptz,
  ended_at timestamptz,
  amount_ml numeric(6,1),
  side text CHECK (side IS NULL OR side IN ('left','right','both')),
  nappy_type text CHECK (nappy_type IS NULL OR nappy_type IN ('wet','dirty','both')),
  feed_method text CHECK (feed_method IS NULL OR feed_method IN ('breast','bottle','expressed','formula','solids')),
  sleep_kind text CHECK (sleep_kind IS NULL OR sleep_kind IN ('nap','night')),
  note text,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT first_year_care_events_note_length CHECK (note IS NULL OR char_length(note) <= 2000),
  CONSTRAINT first_year_care_events_amount_range CHECK (amount_ml IS NULL OR (amount_ml > 0 AND amount_ml <= 2000)),
  CONSTRAINT first_year_care_events_sleep_shape CHECK (
    (event_type = 'sleep' AND started_at IS NOT NULL)
    OR (event_type <> 'sleep' AND started_at IS NULL AND ended_at IS NULL)
  ),
  CONSTRAINT first_year_care_events_range CHECK (ended_at IS NULL OR started_at IS NULL OR ended_at > started_at),
  CONSTRAINT first_year_care_events_nappy_shape CHECK (event_type = 'nappy' OR nappy_type IS NULL),
  CONSTRAINT first_year_care_events_feed_shape CHECK (event_type = 'feed' OR feed_method IS NULL),
  CONSTRAINT first_year_care_events_sleep_kind_shape CHECK (event_type = 'sleep' OR sleep_kind IS NULL),
  CONSTRAINT first_year_care_events_amount_shape CHECK (event_type IN ('feed','pump') OR amount_ml IS NULL),
  CONSTRAINT first_year_care_events_side_shape CHECK (event_type IN ('feed','pump') OR side IS NULL)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.first_year_care_events TO authenticated;
GRANT ALL ON public.first_year_care_events TO service_role;

ALTER TABLE public.first_year_care_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own care events"
  ON public.first_year_care_events FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own care events"
  ON public.first_year_care_events FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own care events"
  ON public.first_year_care_events FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own care events"
  ON public.first_year_care_events FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX first_year_care_events_user_time_idx
  ON public.first_year_care_events (user_id, occurred_at DESC);
CREATE INDEX first_year_care_events_user_baby_time_idx
  ON public.first_year_care_events (user_id, baby_id, occurred_at DESC);

CREATE UNIQUE INDEX first_year_care_events_active_sleep_idx
  ON public.first_year_care_events (baby_id)
  WHERE event_type = 'sleep' AND ended_at IS NULL;

CREATE TRIGGER first_year_care_events_set_updated_at
  BEFORE UPDATE ON public.first_year_care_events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.validate_first_year_care_event()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
  v_actor uuid := auth.uid();
  v_lifecycle text;
  v_baby_dob date;
BEGIN
  IF v_actor IS NOT NULL AND NEW.user_id <> v_actor THEN
    RAISE EXCEPTION 'You can only save your own logs' USING ERRCODE = '42501';
  END IF;

  SELECT lifecycle INTO v_lifecycle FROM public.journeys WHERE user_id = NEW.user_id;
  IF v_lifecycle IS DISTINCT FROM 'first_year' THEN
    RAISE EXCEPTION 'Care logs can only be saved on a First Year journey' USING ERRCODE = '22023';
  END IF;

  SELECT date_of_birth INTO v_baby_dob
  FROM public.babies WHERE id = NEW.baby_id AND user_id = NEW.user_id;
  IF v_baby_dob IS NULL THEN
    RAISE EXCEPTION 'That baby could not be found on this account' USING ERRCODE = '22023';
  END IF;

  NEW.note := nullif(btrim(coalesce(NEW.note, '')), '');

  IF NEW.event_type = 'sleep' THEN
    NEW.occurred_at := NEW.started_at;
  ELSE
    NEW.started_at := NULL;
    NEW.ended_at := NULL;
  END IF;

  IF NEW.occurred_at IS NULL THEN
    RAISE EXCEPTION 'A time is needed for this log' USING ERRCODE = '22023';
  END IF;
  IF NEW.occurred_at > now() + interval '5 minutes' THEN
    RAISE EXCEPTION 'A log cannot be saved for a future time' USING ERRCODE = '22023';
  END IF;
  IF NEW.ended_at IS NOT NULL AND NEW.ended_at > now() + interval '5 minutes' THEN
    RAISE EXCEPTION 'A log cannot end in the future' USING ERRCODE = '22023';
  END IF;
  IF (NEW.occurred_at AT TIME ZONE 'UTC')::date < v_baby_dob - 1 THEN
    RAISE EXCEPTION 'A log cannot be saved before your baby was born' USING ERRCODE = '22023';
  END IF;

  IF NEW.event_type = 'nappy' AND NEW.nappy_type IS NULL THEN
    RAISE EXCEPTION 'Please choose a nappy type' USING ERRCODE = '22023';
  END IF;
  IF NEW.event_type = 'note' AND NEW.note IS NULL THEN
    RAISE EXCEPTION 'There is nothing to save yet' USING ERRCODE = '22023';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER first_year_care_events_validate
  BEFORE INSERT OR UPDATE ON public.first_year_care_events
  FOR EACH ROW EXECUTE FUNCTION public.validate_first_year_care_event();