
## Phase 13.6b — Video Memory MVP (approved, revised, awaiting build mode)

Adds a single video per pregnancy week alongside the existing photo on `/my-week`. Video only. No voice notes, no My Journey gallery, no AI, no analytics.

### 1. New file: `src/lib/weekMedia.ts`

Pure helpers, no React, no Supabase calls.

- Constants: `VIDEO_MAX_BYTES = 50 * 1024 * 1024`, `VIDEO_MAX_DURATION_SECONDS = 60`, `VIDEO_ACCEPTED_MIME = ["video/mp4","video/webm","video/quicktime"]`, `VIDEO_ACCEPT_ATTR`.
- `extensionForVideo(mime, filename)` → lowercase `mp4`/`webm`/`mov` (mime first, filename fallback via allowlist).
- `buildMediaStoragePath(userId, week, mediaType, ext)` → `${userId}/${week}/${mediaType}/${crypto.randomUUID()}.${ext}`.
- `probeVideoDuration(file): Promise<number | null>` — off-DOM `<video preload="metadata">` + `URL.createObjectURL`, 3s timeout, revokes URL, returns rounded seconds or `null` on unreadable/error/timeout.
- Re-exports caption helpers from `weekCaption.ts` (no edits to that file).
- Approved error copy exported as `VIDEO_ERROR_COPY`.

### 2. New file: `src/hooks/useWeekMedia.ts`

Generic on `(week, mediaType)`; v1 only mounts `video`.

```ts
useWeekMedia({ userId, week, mediaType: "video" }) → {
  state: "loading" | "empty" | "uploading" | "loaded" | "error",
  error, storagePath, signedUrl, mimeType, durationSeconds, caption,
  upload(file), remove(), saveCaption(raw), clearError()
}
```

- Load: `week_media_memories.select(...).eq(user_id, week, media_type).maybeSingle()`; if row, sign URL for 60 min.
- `upload`: validate mime → size → duration; new UUID path; `storage.upload(path, file, { upsert: false, contentType })`; then DB `upsert({ ..., media_type: "video" }, { onConflict: "user_id,week,media_type" })`; on DB failure, remove the just-uploaded object and revert to prior state; on success sign a fresh URL and best-effort remove old object.
- `remove`: delete DB row → remove storage object; on storage failure re-upsert row and surface `removeFailed`.
- `saveCaption`: validate via `isCaptionWithinLimit`, update with `captionForSave`.
- 50-minute signed-URL refresh timer (mirrors `SlotPhotoMemory`).
- No analytics, no AI, no MediaRecorder, no transcription.

### 3. New file: `src/components/myweek/SlotVideoMemory.tsx`

Presentation + hidden file input + caption editor. States: loading / empty / uploading / loaded / error.

- Empty: calm frame with "Video of this week", helper "Add a short video from this week, if you want to keep one here.", primary "Add video" button, "Private to you" chip. Smaller than the photo frame — photo remains the protagonist.
- Loaded: `<video controls preload="metadata" playsInline>` (no `autoPlay`, no `loop`); "Private" chip; "Replace video" and "Remove video" actions using the same visual language as the photo slot.
- Caption editor mirrors the photo caption UI (label "Caption", 140-char counter, save/cancel).
- All buttons `type="button"`, `aria-label` on file input trigger, visible focus.
- File input `accept={VIDEO_ACCEPT_ATTR}`, value cleared after every attempt.

### 4. New file: `src/components/myweek/SectionKeepThisWeek.tsx`

Thin wrapper. Small uppercase label + serif "Keep this week" header (matches existing My Week section pattern). Renders `<SlotPhotoMemory />` unchanged, then `<SlotVideoMemory />`. Props: `{ userId, week, chapterTitle }`.

### 5. Edit: `src/pages/MyWeek.tsx`

Inside the existing `status === "active"` branch only: replace `<SlotPhotoMemory .../>` at line 267 with `<SectionKeepThisWeek .../>`. Update imports. Nothing else moves.

### 6. Not doing

Voice notes, My Journey gallery, KeptChapter, pregnancy-loss reveal, AI, transcription, auto-captions, analytics, sharing, public URLs, storage bucket/policy changes, `week_photos` schema/paths, routes, sitemap, robots, article data, `SlotPhotoMemory` internals, `weekCaption.ts`.

### 7. Copy compliance

No urgent / must / essential / guaranteed / safe / unsafe / normal / "everything is okay". Approved technical recovery phrases used verbatim.

### 8. Privacy

Signed URLs kept in component state only. File input cleared after each attempt.

### 9. Verification (build mode)

- `bunx tsgo --noEmit` → 0.
- Grep: no analytics/AI imports in the four new files; no route/sitemap change; `week_photos` untouched.
- **Manual Playwright smoke test** using a temporary in-`/tmp` generated mp4 fixture (ffmpeg-generated, ≤5s, ≤1 MB), never committed, never placed in `public/` or `src/assets/`. Covers: accepted mp4 upload, unsupported-format rejection, >60s duration rejection, replace, remove, native playback (`controls` mounted, no autoplay attribute), existing photo memory + captions still work, non-active status hides the video slot.
- If auth is `signed_out` or `external_unmanaged`, report exactly which checks could not run; do not claim success.

### 10. Files

- **Create:** `src/lib/weekMedia.ts`, `src/hooks/useWeekMedia.ts`, `src/components/myweek/SlotVideoMemory.tsx`, `src/components/myweek/SectionKeepThisWeek.tsx`.
- **Edit:** `src/pages/MyWeek.tsx`.
- **Untouched:** `SlotPhotoMemory.tsx`, `weekCaption.ts`, other pages/components, DB schema (13.6a table already exists), storage bucket and policies.
