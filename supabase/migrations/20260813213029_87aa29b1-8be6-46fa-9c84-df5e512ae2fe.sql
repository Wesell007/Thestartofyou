CREATE POLICY "Users read own first year memory photos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'first-year-memories' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users upload own first year memory photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'first-year-memories' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users update own first year memory photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'first-year-memories' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'first-year-memories' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users delete own first year memory photos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'first-year-memories' AND auth.uid()::text = (storage.foldername(name))[1]);