CREATE TABLE public.ttc_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid NOT NULL REFERENCES public.ttc_journeys(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  log_date date NOT NULL,
  log_type text NOT NULL CHECK (log_type IN ('period','ovulation_test','pregnancy_test','mood','cramps','discharge','energy','note')),
  value text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ttc_logs_user_date_idx ON public.ttc_logs (user_id, log_date DESC);
CREATE INDEX ttc_logs_journey_idx ON public.ttc_logs (journey_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ttc_logs TO authenticated;
GRANT ALL ON public.ttc_logs TO service_role;

ALTER TABLE public.ttc_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own ttc logs"
  ON public.ttc_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own ttc logs"
  ON public.ttc_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ttc logs"
  ON public.ttc_logs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ttc logs"
  ON public.ttc_logs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER ttc_logs_set_updated_at
  BEFORE UPDATE ON public.ttc_logs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();