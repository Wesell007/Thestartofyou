-- Profiles table for first name
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Saved journeys table (one active per user)
CREATE TABLE public.saved_journeys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  journey_type TEXT NOT NULL DEFAULT 'pregnancy',
  lmp_date DATE NOT NULL,
  due_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own journey" ON public.saved_journeys FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own journey" ON public.saved_journeys FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own journey" ON public.saved_journeys FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users delete own journey" ON public.saved_journeys FOR DELETE USING (auth.uid() = user_id);

-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER saved_journeys_updated_at BEFORE UPDATE ON public.saved_journeys
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();