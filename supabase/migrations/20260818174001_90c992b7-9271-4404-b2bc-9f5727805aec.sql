-- Refine the First Year care log for real feed, sleep and nappy detail.

ALTER TABLE public.first_year_care_events
  DROP CONSTRAINT IF EXISTS first_year_care_events_nappy_type_check;
ALTER TABLE public.first_year_care_events
  ADD CONSTRAINT first_year_care_events_nappy_type_check
  CHECK (nappy_type IS NULL OR nappy_type IN ('wet','dirty','both','wee','poo','dry'));

ALTER TABLE public.first_year_care_events
  DROP CONSTRAINT IF EXISTS first_year_care_events_sleep_shape;
ALTER TABLE public.first_year_care_events
  ADD CONSTRAINT first_year_care_events_sleep_shape CHECK (
    (event_type = 'sleep' AND started_at IS NOT NULL)
    OR event_type = 'feed'
    OR (event_type NOT IN ('sleep','feed') AND started_at IS NULL AND ended_at IS NULL)
  );

CREATE UNIQUE INDEX IF NOT EXISTS first_year_care_events_active_feed_idx
  ON public.first_year_care_events (baby_id)
  WHERE event_type = 'feed'
    AND started_at IS NOT NULL
    AND ended_at IS NULL
    AND metadata->>'feed_mode' = 'breast';

CREATE OR REPLACE FUNCTION public.validate_first_year_care_event()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
  v_actor uuid := auth.uid();
  v_lifecycle text;
  v_baby_dob date;
  v_feed_mode text;
  v_bottle_type text;
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
  IF NEW.metadata IS NULL OR jsonb_typeof(NEW.metadata) <> 'object' THEN
    NEW.metadata := '{}'::jsonb;
  END IF;

  IF NEW.event_type = 'sleep' THEN
    NEW.occurred_at := NEW.started_at;
  ELSIF NEW.event_type = 'feed' THEN
    IF NEW.started_at IS NOT NULL THEN
      NEW.occurred_at := NEW.started_at;
    END IF;
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

  IF NEW.event_type = 'feed' THEN
    v_feed_mode := NEW.metadata->>'feed_mode';
    IF v_feed_mode IS NULL OR v_feed_mode NOT IN ('breast','bottle') THEN
      RAISE EXCEPTION 'Please choose breast or bottle' USING ERRCODE = '22023';
    END IF;
    IF v_feed_mode = 'bottle' THEN
      v_bottle_type := NEW.metadata->>'bottle_type';
      IF v_bottle_type IS NULL OR v_bottle_type NOT IN ('expressed','formula','tube','other') THEN
        RAISE EXCEPTION 'Please choose what was in the bottle' USING ERRCODE = '22023';
      END IF;
      NEW.started_at := NULL;
      NEW.ended_at := NULL;
    END IF;
    IF NEW.metadata->>'active_side' IS NOT NULL
       AND NEW.metadata->>'active_side' NOT IN ('left','right') THEN
      RAISE EXCEPTION 'That feed side could not be saved' USING ERRCODE = '22023';
    END IF;
  END IF;

  IF NEW.event_type = 'nappy' THEN
    IF NEW.nappy_type IS NULL THEN
      RAISE EXCEPTION 'Please choose a nappy type' USING ERRCODE = '22023';
    END IF;
    IF NEW.metadata->>'rash_level' IS NOT NULL
       AND NEW.metadata->>'rash_level' NOT IN ('no','little','yes','unsure') THEN
      RAISE EXCEPTION 'That nappy detail could not be saved' USING ERRCODE = '22023';
    END IF;
    IF NEW.metadata->>'poo_texture' IS NOT NULL
       AND NEW.metadata->>'poo_texture' NOT IN ('runny','soft','formed','hard','other') THEN
      RAISE EXCEPTION 'That nappy detail could not be saved' USING ERRCODE = '22023';
    END IF;
    IF NEW.metadata->>'poo_size' IS NOT NULL
       AND NEW.metadata->>'poo_size' NOT IN ('small','medium','large') THEN
      RAISE EXCEPTION 'That nappy detail could not be saved' USING ERRCODE = '22023';
    END IF;
    IF NEW.metadata->>'poo_colour' IS NOT NULL
       AND NEW.metadata->>'poo_colour' NOT IN ('yellow','brown','green','other') THEN
      RAISE EXCEPTION 'That nappy detail could not be saved' USING ERRCODE = '22023';
    END IF;
  END IF;

  IF NEW.event_type = 'note' AND NEW.note IS NULL THEN
    RAISE EXCEPTION 'There is nothing to save yet' USING ERRCODE = '22023';
  END IF;

  RETURN NEW;
END;
$$;
