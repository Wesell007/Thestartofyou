CREATE TABLE public.pregnancy_appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  appointment_at timestamptz,
  week int CHECK (week IS NULL OR (week >= 1 AND week <= 42)),
  appointment_type text,
  location text,
  notes text,
  questions text,
  follow_up text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.pregnancy_appointments TO authenticated;
GRANT ALL ON public.pregnancy_appointments TO service_role;

ALTER TABLE public.pregnancy_appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own appointments"
  ON public.pregnancy_appointments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own appointments"
  ON public.pregnancy_appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own appointments"
  ON public.pregnancy_appointments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own appointments"
  ON public.pregnancy_appointments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX pregnancy_appointments_user_appointment_at_idx
  ON public.pregnancy_appointments (user_id, appointment_at DESC);

CREATE TRIGGER pregnancy_appointments_set_updated_at
  BEFORE UPDATE ON public.pregnancy_appointments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();