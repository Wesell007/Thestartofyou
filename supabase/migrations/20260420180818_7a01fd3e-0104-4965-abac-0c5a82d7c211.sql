-- Create reflections table: one reflection per user per pregnancy week
CREATE TABLE public.reflections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  week INTEGER NOT NULL CHECK (week >= 1 AND week <= 45),
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, week)
);

ALTER TABLE public.reflections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own reflections"
ON public.reflections FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users insert own reflections"
ON public.reflections FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own reflections"
ON public.reflections FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users delete own reflections"
ON public.reflections FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER reflections_set_updated_at
BEFORE UPDATE ON public.reflections
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_reflections_user_week ON public.reflections (user_id, week);