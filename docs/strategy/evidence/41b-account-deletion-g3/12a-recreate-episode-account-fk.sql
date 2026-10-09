-- G3 S2 setup (disposable project only): recreate pregnancy_episodes_user_id_fkey with its identical definition
-- so its auth.users cascade trigger sorts after the scratch y_parent cascade. Owner-approved; 13 Episode ownership FKs untouched.
SET LOCAL lock_timeout = '5s';
ALTER TABLE public.pregnancy_episodes DROP CONSTRAINT pregnancy_episodes_user_id_fkey;
ALTER TABLE public.pregnancy_episodes ADD CONSTRAINT pregnancy_episodes_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
