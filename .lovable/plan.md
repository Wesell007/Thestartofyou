
## Phase 13.6a — Weekly Media Memories Data Foundation (Approved, revised)

Backend/data only. Correction incorporated: `user_id` now has `ON DELETE CASCADE` against `auth.users` so rows cannot orphan.

### 1. Migration: create `public.week_media_memories`

```sql
CREATE TABLE public.week_media_memories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week INTEGER NOT NULL CHECK (week BETWEEN 1 AND 42),
  media_type TEXT NOT NULL CHECK (media_type IN ('video', 'voice_note')),
  storage_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL CHECK (file_size_bytes > 0),
  duration_seconds INTEGER CHECK (duration_seconds IS NULL OR duration_seconds > 0),
  caption TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, week, media_type)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.week_media_memories TO authenticated;
GRANT ALL ON public.week_media_memories TO service_role;
-- No anon grant.

ALTER TABLE public.week_media_memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own week media"   ON public.week_media_memories FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own week media" ON public.week_media_memories FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own week media" ON public.week_media_memories FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own week media" ON public.week_media_memories FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER week_media_memories_set_updated_at
BEFORE UPDATE ON public.week_media_memories
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_week_media_memories_user_week
  ON public.week_media_memories (user_id, week);
```

Follows the existing `week_photos` migration conventions (same trigger, same policy shape, same grant block, no anon).

### 2. Storage — unchanged

Bucket `weekly-photos` stays private. No new bucket, no policy edits. Planned object path `{user_id}/{week}/{media_type}/{uuid}.{ext}` continues to satisfy the current first-segment-is-user-id RLS.

### 3. `supabase/functions/delete-account/index.ts` update

Existing sweep uses `list(userId, { limit: 1000 })` — non-recursive, only removes direct children like `{user_id}/{week}.{ext}`. Add a small bounded recursive walker (max depth 3, covering the deepest planned path) that collects every leaf and passes them to a single `remove([...])` call. Photo behaviour unchanged (still enumerated at depth 0); new nested media covered.

If listing or removal fails, preserve current safety behaviour: return a 502-style error and do NOT proceed to delete the auth user. No partial deletion.

Table-row cleanup: relies on the new `ON DELETE CASCADE` from `auth.users`, matching the correction. No explicit `DELETE FROM public.week_media_memories` needed inside the function.

### 4. Types

`src/integrations/supabase/types.ts` auto-regenerates after the migration is applied.

### 5. Not doing

UI, uploads, video/voice slots, MediaRecorder, My Journey media UI, analytics, AI, transcription, sharing, public URLs, new bucket, new routes.

### 6. Verification

- Table + columns + checks + unique + index + trigger present.
- `user_id` FK to `auth.users(id) ON DELETE CASCADE`.
- RLS enabled; four owner-scoped policies bound to `authenticated`; no anon grant.
- `week_photos`, storage buckets, and storage policies untouched (verified via `rg` over migrations).
- Delete-account edge function deployed; recursive listing removes direct photos + nested media; failure path preserved.
- `bunx tsgo --noEmit` passes.

### 7. Files touched

- **New:** one Supabase migration file.
- **Edited:** `supabase/functions/delete-account/index.ts`.
- **Auto-regenerated:** `src/integrations/supabase/types.ts`.
- No other frontend files edited.
