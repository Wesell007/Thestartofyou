ALTER TABLE public.reflections
  ADD COLUMN IF NOT EXISTS first_written_content text,
  ADD COLUMN IF NOT EXISTS first_written_at timestamp with time zone;