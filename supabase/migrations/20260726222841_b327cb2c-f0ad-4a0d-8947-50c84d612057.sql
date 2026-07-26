ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS companion_name text,
  ADD COLUMN IF NOT EXISTS companion_tone text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'profiles_companion_name_check'
      AND conrelid = 'public.profiles'::regclass
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_companion_name_check
      CHECK (companion_name IS NULL OR char_length(trim(companion_name)) BETWEEN 1 AND 24);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'profiles_companion_tone_check'
      AND conrelid = 'public.profiles'::regclass
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_companion_tone_check
      CHECK (companion_tone IS NULL OR companion_tone IN ('calm','practical','warm'));
  END IF;
END $$;