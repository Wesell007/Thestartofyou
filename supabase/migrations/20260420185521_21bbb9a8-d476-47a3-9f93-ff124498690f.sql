-- Weekly photo memory: storage bucket + metadata table
-- Private bucket, RLS scoped to auth.uid() via folder convention {user_id}/{week}.{ext}

INSERT INTO storage.buckets (id, name, public)
VALUES ('weekly-photos', 'weekly-photos', false)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS — users can only touch their own folder
CREATE POLICY "Users view own weekly photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'weekly-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users upload own weekly photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'weekly-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users update own weekly photos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'weekly-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own weekly photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'weekly-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Metadata table: one primary photo per (user, week)
CREATE TABLE public.week_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  week INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, week)
);

ALTER TABLE public.week_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own week photos"
ON public.week_photos FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users insert own week photos"
ON public.week_photos FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own week photos"
ON public.week_photos FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users delete own week photos"
ON public.week_photos FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER week_photos_set_updated_at
BEFORE UPDATE ON public.week_photos
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_week_photos_user_week ON public.week_photos(user_id, week);