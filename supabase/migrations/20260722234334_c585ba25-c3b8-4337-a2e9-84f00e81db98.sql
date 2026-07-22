-- Baby Movement Notes
CREATE TABLE public.baby_movement_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  noted_at timestamptz NOT NULL DEFAULT now(),
  pattern_label text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.baby_movement_notes TO authenticated;
GRANT ALL ON public.baby_movement_notes TO service_role;

ALTER TABLE public.baby_movement_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "baby_movement_notes_select_own"
  ON public.baby_movement_notes FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "baby_movement_notes_insert_own"
  ON public.baby_movement_notes FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "baby_movement_notes_update_own"
  ON public.baby_movement_notes FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "baby_movement_notes_delete_own"
  ON public.baby_movement_notes FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX baby_movement_notes_user_noted_at_idx
  ON public.baby_movement_notes (user_id, noted_at DESC);

CREATE TRIGGER baby_movement_notes_set_updated_at
  BEFORE UPDATE ON public.baby_movement_notes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- Contraction Sessions
CREATE TABLE public.contraction_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (id, user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.contraction_sessions TO authenticated;
GRANT ALL ON public.contraction_sessions TO service_role;

ALTER TABLE public.contraction_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contraction_sessions_select_own"
  ON public.contraction_sessions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "contraction_sessions_insert_own"
  ON public.contraction_sessions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "contraction_sessions_update_own"
  ON public.contraction_sessions FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "contraction_sessions_delete_own"
  ON public.contraction_sessions FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX contraction_sessions_user_started_at_idx
  ON public.contraction_sessions (user_id, started_at DESC);

CREATE TRIGGER contraction_sessions_set_updated_at
  BEFORE UPDATE ON public.contraction_sessions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- Contraction Events
CREATE TABLE public.contraction_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at timestamptz NOT NULL,
  ended_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  FOREIGN KEY (session_id, user_id)
    REFERENCES public.contraction_sessions (id, user_id)
    ON DELETE CASCADE
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.contraction_events TO authenticated;
GRANT ALL ON public.contraction_events TO service_role;

ALTER TABLE public.contraction_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contraction_events_select_own"
  ON public.contraction_events FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "contraction_events_insert_own"
  ON public.contraction_events FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "contraction_events_update_own"
  ON public.contraction_events FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "contraction_events_delete_own"
  ON public.contraction_events FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX contraction_events_session_started_at_idx
  ON public.contraction_events (session_id, started_at);

CREATE INDEX contraction_events_user_started_at_idx
  ON public.contraction_events (user_id, started_at DESC);

CREATE TRIGGER contraction_events_set_updated_at
  BEFORE UPDATE ON public.contraction_events
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();