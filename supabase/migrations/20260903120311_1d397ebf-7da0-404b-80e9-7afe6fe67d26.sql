CREATE TYPE public.companion_memory_category AS ENUM ('preference','personal_detail','plan','relationship','support_preference','other');
CREATE TYPE public.companion_memory_source AS ENUM ('explicit_command','settings');

CREATE OR REPLACE FUNCTION public.normalise_companion_memory(p_value text)
RETURNS text
LANGUAGE sql
IMMUTABLE
SET search_path = public
AS $$
  SELECT lower(regexp_replace(btrim(coalesce(p_value, '')), '\s+', ' ', 'g'))
$$;

CREATE TABLE public.companion_memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  category public.companion_memory_category NOT NULL DEFAULT 'other',
  value text NOT NULL,
  normalised_value text GENERATED ALWAYS AS (public.normalise_companion_memory(value)) STORED,
  source public.companion_memory_source NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT companion_memories_value_length CHECK (char_length(btrim(value)) BETWEEN 1 AND 240)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.companion_memories TO authenticated;
GRANT ALL ON public.companion_memories TO service_role;

ALTER TABLE public.companion_memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own companion memories"
  ON public.companion_memories FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own companion memories"
  ON public.companion_memories FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own companion memories"
  ON public.companion_memories FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own companion memories"
  ON public.companion_memories FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE UNIQUE INDEX companion_memories_user_normalised_idx
  ON public.companion_memories (user_id, normalised_value);
CREATE INDEX companion_memories_user_updated_idx
  ON public.companion_memories (user_id, updated_at DESC);

CREATE OR REPLACE FUNCTION public.validate_companion_memory()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
DECLARE
  v_count integer;
BEGIN
  IF TG_OP = 'UPDATE' AND NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'A memory cannot change owner' USING ERRCODE = '42501';
  END IF;

  NEW.value := btrim(NEW.value);
  IF NEW.value = '' THEN
    RAISE EXCEPTION 'There is nothing to remember yet' USING ERRCODE = '22023';
  END IF;

  -- Structural backstop only. This rejects obvious credential-shaped values;
  -- it is not, and is not claimed to be, a complete sensitive-data classifier.
  -- The richer product policy lives in the application layer.
  IF NEW.value ~* '(password|passphrase|passcode|api[ _-]?key|secret key|access token|auth token|private key|-----BEGIN|security question|security answer|one[ -]?time code|sort code|card number|cvv|cvc)' THEN
    RAISE EXCEPTION 'That is not something the companion keeps' USING ERRCODE = '22023';
  END IF;
  IF NEW.value ~ '(?:[0-9][ -]?){13,19}' THEN
    RAISE EXCEPTION 'That is not something the companion keeps' USING ERRCODE = '22023';
  END IF;

  IF TG_OP = 'INSERT' THEN
    PERFORM pg_advisory_xact_lock(hashtextextended(NEW.user_id::text, 424242));
    SELECT count(*) INTO v_count FROM public.companion_memories WHERE user_id = NEW.user_id;
    IF v_count >= 50 THEN
      RAISE EXCEPTION 'You have reached the maximum number of saved memories' USING ERRCODE = '22023';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER companion_memories_validate
  BEFORE INSERT OR UPDATE ON public.companion_memories
  FOR EACH ROW EXECUTE FUNCTION public.validate_companion_memory();

CREATE TRIGGER companion_memories_set_updated_at
  BEFORE UPDATE ON public.companion_memories
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();