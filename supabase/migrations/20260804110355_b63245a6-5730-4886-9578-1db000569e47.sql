-- 1. Status enum
CREATE TYPE public.first_year_journey_status AS ENUM ('active', 'paused', 'completed');

-- 2. first_year_journeys
CREATE TABLE public.first_year_journeys (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.first_year_journey_status NOT NULL DEFAULT 'active',
  status_changed_at timestamptz,
  source_pregnancy_lmp_date date,
  archived_pregnancy_journey_id uuid REFERENCES public.archived_journeys(id) ON DELETE SET NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.first_year_journeys TO authenticated;
GRANT ALL ON public.first_year_journeys TO service_role;

ALTER TABLE public.first_year_journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own first year journey"
  ON public.first_year_journeys FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own first year journey"
  ON public.first_year_journeys FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own first year journey"
  ON public.first_year_journeys FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own first year journey"
  ON public.first_year_journeys FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER first_year_journeys_set_updated_at
  BEFORE UPDATE ON public.first_year_journeys
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 3. babies (one row per baby: multiples ready)
CREATE TABLE public.babies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date_of_birth date NOT NULL,
  name text,
  birth_order smallint NOT NULL DEFAULT 1,
  is_primary boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT babies_name_length CHECK (name IS NULL OR char_length(name) <= 60),
  CONSTRAINT babies_birth_order_range CHECK (birth_order BETWEEN 1 AND 4)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.babies TO authenticated;
GRANT ALL ON public.babies TO service_role;

ALTER TABLE public.babies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own babies"
  ON public.babies FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own babies"
  ON public.babies FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own babies"
  ON public.babies FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own babies"
  ON public.babies FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX babies_user_id_idx ON public.babies (user_id);
CREATE UNIQUE INDEX babies_one_primary_per_user_idx ON public.babies (user_id) WHERE is_primary;
CREATE UNIQUE INDEX babies_user_birth_order_idx ON public.babies (user_id, birth_order);

CREATE TRIGGER babies_set_updated_at
  BEFORE UPDATE ON public.babies
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 4. Date-of-birth validation (trigger, not CHECK, because it depends on now())
CREATE OR REPLACE FUNCTION public.validate_baby_date_of_birth()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
BEGIN
  IF NEW.date_of_birth > (now() AT TIME ZONE 'UTC')::date THEN
    RAISE EXCEPTION 'A date of birth cannot be in the future' USING ERRCODE = '22023';
  END IF;
  IF NEW.date_of_birth < ((now() AT TIME ZONE 'UTC')::date - 1826) THEN
    RAISE EXCEPTION 'That date of birth is too far in the past' USING ERRCODE = '22023';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER babies_validate_date_of_birth
  BEFORE INSERT OR UPDATE OF date_of_birth ON public.babies
  FOR EACH ROW EXECUTE FUNCTION public.validate_baby_date_of_birth();

-- 5. Multiples-capable save RPC (SECURITY INVOKER: RLS applies)
CREATE OR REPLACE FUNCTION public.save_first_year_journey(p_babies jsonb)
RETURNS void
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_count int;
  v_baby jsonb;
  v_idx int := 0;
  v_dobs date[] := '{}';
  v_names text[] := '{}';
  v_orders smallint[] := '{}';
  v_order smallint;
  v_dob date;
  v_name text;
  v_min_order smallint;
  v_preg public.pregnancy_journeys%ROWTYPE;
  v_lifecycle text;
  v_archived_id uuid;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '28000';
  END IF;
  IF p_babies IS NULL OR jsonb_typeof(p_babies) <> 'array' THEN
    RAISE EXCEPTION 'A list of babies is required' USING ERRCODE = '22023';
  END IF;

  v_count := jsonb_array_length(p_babies);
  IF v_count < 1 OR v_count > 4 THEN
    RAISE EXCEPTION 'Between one and four babies are required' USING ERRCODE = '22023';
  END IF;

  FOR v_baby IN SELECT * FROM jsonb_array_elements(p_babies) LOOP
    v_idx := v_idx + 1;
    IF jsonb_typeof(v_baby) <> 'object' THEN
      RAISE EXCEPTION 'Each baby must be an object' USING ERRCODE = '22023';
    END IF;

    BEGIN
      v_dob := (v_baby ->> 'date_of_birth')::date;
    EXCEPTION WHEN OTHERS THEN
      RAISE EXCEPTION 'Each baby needs a valid date of birth' USING ERRCODE = '22023';
    END;
    IF v_dob IS NULL THEN
      RAISE EXCEPTION 'Each baby needs a valid date of birth' USING ERRCODE = '22023';
    END IF;

    v_name := nullif(btrim(coalesce(v_baby ->> 'name', '')), '');
    IF v_name IS NOT NULL AND char_length(v_name) > 60 THEN
      RAISE EXCEPTION 'A baby name is too long' USING ERRCODE = '22023';
    END IF;

    IF (v_baby ->> 'birth_order') IS NULL THEN
      v_order := v_idx::smallint;
    ELSE
      BEGIN
        v_order := (v_baby ->> 'birth_order')::smallint;
      EXCEPTION WHEN OTHERS THEN
        RAISE EXCEPTION 'Birth order must be a whole number' USING ERRCODE = '22023';
      END;
      IF v_order < 1 OR v_order > 4 THEN
        RAISE EXCEPTION 'Birth order must be between 1 and 4' USING ERRCODE = '22023';
      END IF;
    END IF;

    IF v_order = ANY (v_orders) THEN
      RAISE EXCEPTION 'Birth order must be unique for each baby' USING ERRCODE = '22023';
    END IF;

    v_dobs := v_dobs || v_dob;
    v_names := v_names || v_name;
    v_orders := v_orders || v_order;
  END LOOP;

  SELECT min(o) INTO v_min_order FROM unnest(v_orders) AS o;

  PERFORM pg_advisory_xact_lock(hashtextextended(v_user_id::text, 0));

  SELECT * INTO v_preg FROM public.pregnancy_journeys WHERE user_id = v_user_id;
  IF FOUND AND v_preg.status IN ('pregnancy_loss', 'paused', 'no_longer_pregnant') THEN
    RAISE EXCEPTION 'This journey cannot be moved into the first year' USING ERRCODE = '22023';
  END IF;

  SELECT lifecycle INTO v_lifecycle FROM public.journeys WHERE user_id = v_user_id;

  -- Archive the pregnancy chapter so it is never lost, in this transaction.
  IF v_lifecycle = 'pregnancy' AND v_preg.user_id IS NOT NULL THEN
    INSERT INTO public.archived_journeys (user_id, lifecycle, started_at, ended_at, ended_reason, snapshot)
    VALUES (
      v_user_id,
      'pregnancy',
      coalesce(v_preg.started_at, now()),
      now(),
      'transitioned',
      jsonb_build_object(
        'lmp_date', v_preg.lmp_date,
        'due_date', v_preg.due_date,
        'status', v_preg.status,
        'started_at', v_preg.started_at
      )
    )
    RETURNING id INTO v_archived_id;
  END IF;

  -- Replace any existing baby rows for this user with the supplied set.
  DELETE FROM public.babies WHERE user_id = v_user_id;

  FOR v_idx IN 1 .. v_count LOOP
    INSERT INTO public.babies (user_id, date_of_birth, name, birth_order, is_primary)
    VALUES (
      v_user_id,
      v_dobs[v_idx],
      v_names[v_idx],
      v_orders[v_idx],
      v_orders[v_idx] = v_min_order
    );
  END LOOP;

  INSERT INTO public.first_year_journeys (
    user_id, status, status_changed_at, source_pregnancy_lmp_date, archived_pregnancy_journey_id
  ) VALUES (
    v_user_id, 'active', now(), v_preg.lmp_date, v_archived_id
  )
  ON CONFLICT (user_id) DO UPDATE SET
    status = 'active',
    status_changed_at = now(),
    source_pregnancy_lmp_date = coalesce(excluded.source_pregnancy_lmp_date, public.first_year_journeys.source_pregnancy_lmp_date),
    archived_pregnancy_journey_id = coalesce(excluded.archived_pregnancy_journey_id, public.first_year_journeys.archived_pregnancy_journey_id),
    updated_at = now();

  INSERT INTO public.journeys (user_id, lifecycle)
  VALUES (v_user_id, 'first_year')
  ON CONFLICT (user_id) DO UPDATE SET
    lifecycle = excluded.lifecycle,
    updated_at = now();
END;
$$;

REVOKE EXECUTE ON FUNCTION public.save_first_year_journey(jsonb) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.save_first_year_journey(jsonb) FROM anon;
GRANT EXECUTE ON FUNCTION public.save_first_year_journey(jsonb) TO authenticated, service_role;

-- 6. Extend journey deletion to the first year lifecycle
CREATE OR REPLACE FUNCTION public.delete_active_journey(p_lifecycle text)
RETURNS boolean
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
declare
  v_user_id uuid := auth.uid();
  v_current_lifecycle text;
begin
  if v_user_id is null then
    raise exception 'Authentication required' using errcode = '28000';
  end if;
  if p_lifecycle not in ('pregnancy', 'ttc', 'first_year') then
    raise exception 'Unsupported lifecycle' using errcode = '22023';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(v_user_id::text, 0));
  select lifecycle into v_current_lifecycle
  from public.journeys
  where user_id = v_user_id;

  if v_current_lifecycle is distinct from p_lifecycle then
    return false;
  end if;

  if p_lifecycle = 'pregnancy' then
    delete from public.pregnancy_journeys where user_id = v_user_id;
    delete from public.saved_journeys where user_id = v_user_id and journey_type = 'pregnancy';
  elsif p_lifecycle = 'first_year' then
    delete from public.babies where user_id = v_user_id;
    delete from public.first_year_journeys where user_id = v_user_id;
  else
    delete from public.ttc_journeys where user_id = v_user_id;
  end if;
  delete from public.journeys where user_id = v_user_id and lifecycle = p_lifecycle;
  return true;
end;
$$;

REVOKE EXECUTE ON FUNCTION public.delete_active_journey(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.delete_active_journey(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.delete_active_journey(text) TO authenticated, service_role;