-- Table: pregnancy_symptom_notes
CREATE TABLE public.pregnancy_symptom_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  noted_at timestamptz NOT NULL DEFAULT now(),
  symptom_label text NOT NULL,
  personal_severity smallint,
  notes text,
  mention_at_appointment boolean NOT NULL DEFAULT false,
  follow_up text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (personal_severity IS NULL OR personal_severity BETWEEN 1 AND 3)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.pregnancy_symptom_notes TO authenticated;
GRANT ALL ON public.pregnancy_symptom_notes TO service_role;

ALTER TABLE public.pregnancy_symptom_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "pregnancy_symptom_notes_select_own"
  ON public.pregnancy_symptom_notes FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "pregnancy_symptom_notes_insert_own"
  ON public.pregnancy_symptom_notes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "pregnancy_symptom_notes_update_own"
  ON public.pregnancy_symptom_notes FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "pregnancy_symptom_notes_delete_own"
  ON public.pregnancy_symptom_notes FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX pregnancy_symptom_notes_user_noted_at_idx
  ON public.pregnancy_symptom_notes (user_id, noted_at DESC);

CREATE TRIGGER set_updated_at_pregnancy_symptom_notes
  BEFORE UPDATE ON public.pregnancy_symptom_notes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Table: midwife_questions
CREATE TABLE public.midwife_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question text NOT NULL,
  category text NOT NULL,
  appointment_id uuid,
  answered boolean NOT NULL DEFAULT false,
  answer_notes text,
  follow_up boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (category IN (
    'symptoms_body',
    'baby_movements',
    'scans_tests',
    'birth_preferences',
    'feeding',
    'recovery',
    'practical',
    'other'
  ))
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.midwife_questions TO authenticated;
GRANT ALL ON public.midwife_questions TO service_role;

ALTER TABLE public.midwife_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "midwife_questions_select_own"
  ON public.midwife_questions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "midwife_questions_insert_own"
  ON public.midwife_questions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "midwife_questions_update_own"
  ON public.midwife_questions FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "midwife_questions_delete_own"
  ON public.midwife_questions FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX midwife_questions_user_created_at_idx
  ON public.midwife_questions (user_id, created_at DESC);

CREATE INDEX midwife_questions_user_open_idx
  ON public.midwife_questions (user_id)
  WHERE answered = false;

CREATE TRIGGER set_updated_at_midwife_questions
  BEFORE UPDATE ON public.midwife_questions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();