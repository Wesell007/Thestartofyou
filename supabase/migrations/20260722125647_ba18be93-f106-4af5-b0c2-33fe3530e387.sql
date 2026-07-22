CREATE TABLE public.birth_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  notes text,
  completion int NOT NULL DEFAULT 0 CHECK (completion BETWEEN 0 AND 100),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.birth_plans TO authenticated;
GRANT ALL ON public.birth_plans TO service_role;

ALTER TABLE public.birth_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own birth plan"
  ON public.birth_plans FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own birth plan"
  ON public.birth_plans FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own birth plan"
  ON public.birth_plans FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own birth plan"
  ON public.birth_plans FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER birth_plans_set_updated_at
  BEFORE UPDATE ON public.birth_plans
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();