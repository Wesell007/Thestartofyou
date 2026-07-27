DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'baby_illustration_style') THEN
    CREATE TYPE public.baby_illustration_style AS ENUM ('default', 'light', 'medium', 'deep');
  END IF;
END $$;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS baby_illustration_style public.baby_illustration_style;