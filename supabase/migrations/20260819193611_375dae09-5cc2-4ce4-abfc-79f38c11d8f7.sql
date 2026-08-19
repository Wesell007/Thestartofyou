CREATE TABLE public.first_year_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  baby_id uuid REFERENCES public.babies(id) ON DELETE CASCADE,
  reminder_type text NOT NULL CHECK (reminder_type IN ('feed','sleep','nappy','moment')),
  label text,
  due_at timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active','done')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT first_year_reminders_label_length CHECK (label IS NULL OR char_length(label) <= 140)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.first_year_reminders TO authenticated;
GRANT ALL ON public.first_year_reminders TO service_role;

ALTER TABLE public.first_year_reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reminders"
  ON public.first_year_reminders FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own reminders"
  ON public.first_year_reminders FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reminders"
  ON public.first_year_reminders FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reminders"
  ON public.first_year_reminders FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX first_year_reminders_user_due_idx
  ON public.first_year_reminders (user_id, due_at);
CREATE INDEX first_year_reminders_user_status_due_idx
  ON public.first_year_reminders (user_id, status, due_at);

CREATE OR REPLACE FUNCTION public.validate_first_year_reminder()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
DECLARE
  v_actor uuid := auth.uid();
  v_baby_owner uuid;
BEGIN
  IF v_actor IS NOT NULL AND NEW.user_id <> v_actor THEN
    RAISE EXCEPTION 'You can only save your own reminders' USING ERRCODE = '42501';
  END IF;

  NEW.label := nullif(btrim(coalesce(NEW.label, '')), '');

  IF NEW.baby_id IS NOT NULL THEN
    SELECT user_id INTO v_baby_owner FROM public.babies WHERE id = NEW.baby_id;
    IF v_baby_owner IS DISTINCT FROM NEW.user_id THEN
      RAISE EXCEPTION 'That baby could not be found on this account' USING ERRCODE = '22023';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER first_year_reminders_validate
  BEFORE INSERT OR UPDATE ON public.first_year_reminders
  FOR EACH ROW EXECUTE FUNCTION public.validate_first_year_reminder();

CREATE TRIGGER first_year_reminders_set_updated_at
  BEFORE UPDATE ON public.first_year_reminders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();