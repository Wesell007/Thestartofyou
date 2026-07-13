
CREATE TABLE public.ttc_journeys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  stage text,
  last_period_date date,
  cycle_length_days integer,
  period_length_days integer,
  cycle_regularity text,
  actively_trying text,
  uses_ovulation_tests text,
  tracks_symptoms text,
  support_status text,
  ivf_consideration text,
  current_cycle_start date,
  fertile_window_start date,
  fertile_window_end date,
  likely_ovulation_date date,
  expected_period_date date,
  possible_test_date date,
  positive_test_status text,
  started_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.ttc_journeys TO authenticated;
GRANT ALL ON public.ttc_journeys TO service_role;

ALTER TABLE public.ttc_journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own ttc journey"
  ON public.ttc_journeys FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own ttc journey"
  ON public.ttc_journeys FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own ttc journey"
  ON public.ttc_journeys FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own ttc journey"
  ON public.ttc_journeys FOR DELETE
  USING (auth.uid() = user_id);

CREATE TRIGGER ttc_journeys_set_updated_at
  BEFORE UPDATE ON public.ttc_journeys
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
