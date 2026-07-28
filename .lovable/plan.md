
# Phase 15.3A — Voice Notes and Memory Continuity

## Data model check (confirmed, no migration)

- `public.week_media_memories.media_type` check constraint already permits `'video'` and `'voice_note'`.
- Unique key `(user_id, week, media_type)` → one voice note per user per week.
- Bucket `weekly-photos` already stores signed private media at `{user_id}/{week}/{media_type}/{uuid}.{ext}` — reuse for `voice_note`.
- `WeekMediaType` in `src/lib/weekMedia.ts` already unions `"voice_note"`.
- **No migration, no RLS change, no bucket change.**

## Files changed

### `src/lib/weekMedia.ts` (extend)
Add audio constants alongside video:
- `VOICE_MAX_BYTES = 10 * 1024 * 1024` (10 MB), `VOICE_MAX_DURATION_SECONDS = 180` (3 min).
- `VOICE_ACCEPTED_MIME` = `audio/webm|mp4|mpeg|ogg`.
- `VOICE_RECORDER_MIME_CANDIDATES` list for `MediaRecorder.isTypeSupported` detection.
- `baseAudioMime()`, `extensionForVoice()`.
- `VOICE_ERROR_COPY` mirroring `VIDEO_ERROR_COPY`.

### `src/hooks/useWeekMedia.ts` (extend)
- Keep existing `upload(file)` (video-only, unchanged).
- Add `uploadVoice(blob, { mimeType, durationSeconds })` used only when `mediaType === "voice_note"`:
  - Validates MIME allowlist, byte size, duration.
  - Uploads to `weekly-photos` at `{user}/{week}/voice_note/{uuid}.{ext}`.
  - Upserts `week_media_memories` row on the existing unique key.
  - On error: rolls back the freshly uploaded object.
  - Cleans up the previous object on replace.
- Load / caption / signed-URL / remove paths are already generic on `mediaType` — no shape change. Fix the remove roll-back MIME fallback so it uses the previous `mimeType` (falls back to `audio/webm` for voice, `video/mp4` for video) instead of always `video/mp4`.

### `src/components/myweek/SlotVoiceMemory.tsx` (new)
Fourth slot inside `SectionKeepThisWeek`, ordered after Video.
- Title "A voice note". Subline "Record a few words for this week, in your own voice."
- States: empty → Record; recording (mm:ss timer + Stop); preview (`<audio controls preload="metadata">`, Save / Re-record / Cancel); saved (playback + caption editor + Replace + Remove).
- Uses `MediaRecorder` with feature detection; picks first supported MIME from `VOICE_RECORDER_MIME_CANDIDATES`. Mic access requested only on the Record tap. **No autoplay.**
- Save confirmation "Saved to this week." matches Phase 15.1 pattern.
- Emits `onSaved` / `onCleared` to refresh the captured indicator.

### `src/components/myweek/SectionKeepThisWeek.tsx`
- Add `<SlotVoiceMemory />` after `<SlotVideoMemory />`.
- Extend `KeptState` with `voice: boolean`; also query the `voice_note` row when computing the indicator.
- Extend `summariseKept` to include "voice note" in the joined list.

### `src/components/myjourney/MomentsKeptSummary.tsx`
- Add `voiceNotes: number` prop; render new "Voice notes" tile between Videos and Weeks kept.
- Grid becomes `grid-cols-2 sm:grid-cols-5` (or 2×3 → sm:5) so mobile stays uncrowded.

### `src/components/myjourney/KeptWeekRow.tsx`
- Add `hasVoice?: boolean` prop.
- Show a discreet "Voice note" indicator next to the existing Video indicator when present.

### `src/pages/MyJourney.tsx`
- Extend the `week_media_memories` fetch to include both `video` and `voice_note` rows in a single query (drop the `.eq("media_type", "video")` filter and bucket rows client-side by `media_type`).
- Compute `voiceWeeks` set + `voices` signed-URL list (mirrors `videos`).
- Pass `voiceNotes={voiceWeeks.size}` to `MomentsKeptSummary`, `hasVoice` to each `KeptWeekRow`, and `voices` to `PhotoJournal`.
- Include `voice_note` weeks in the "any kept content" calculation.

### `src/components/myjourney/PhotoJournal.tsx`
- Add `voices?: VoiceItem[]` prop (new exported type).
- Extend tile union with `{ kind: "voice", … }`; render tiles as a calm audio card with a mic glyph, week badge, optional caption. Any week that already appears as a photo/video tile still gets a small "Voice" chip similar to the existing "Video" chip.
- Clicking a voice tile opens `MediaLightbox` on the matching lightbox tile.

### `src/components/myjourney/MediaLightbox.tsx`
- Extend `LightboxTile` union with `{ kind: "voice"; url; caption; mimeType?; week }`.
- Voice view: centred card, mic glyph, week badge, caption, `<audio controls preload="metadata" />`, `Open Week {week} →` link. No autoplay. Arrow-key cycling still works within the tile list.

### `src/pages/KeptChapter.tsx`
- Fetch the `voice_note` row alongside the video row; sign its URL.
- Extend the "A moment kept" section:
  - Render present media in order **Photo → Video → Voice note**.
  - If only one is present, show only that.
  - Reflection block unchanged. Generated illustration is **not** labelled as a saved user moment (already the case; unchanged).

## UX rules honoured
Voice notes are optional, calm copy, no autoplay anywhere, accessible controls, mobile-safe.

## Out of scope
No migrations, RLS, bucket, route, sitemap, analytics, AI prompt, illustration, keepsake export, inline AI companion, hospital bag, or birth plan changes.

## QA

Manual:
- Record → preview → Save → Replace → Remove voice note on `/my-week`.
- Captured indicator reflects voice note alone and in combination.
- `MomentsKeptSummary` shows voice-note count.
- Kept row shows "Voice note" indicator.
- Photo Journal voice tile opens lightbox and plays; `Open Week {week} →` navigates.
- `KeptChapter` shows voice player under "A moment kept".
- Existing reflection / photo / video flows unaffected.
- Mobile layout intact, no console errors, signed URLs valid.

Automated:
```
npm run typecheck
```
Report exact command and result.

## Return handoff
- files changed
- confirmation `week_media_memories` supports voice notes without migration
- recording implementation
- save path
- surfaces updated: My Week slot + indicator, My Journey summary + rows + Photo Journal, MediaLightbox audio, KeptChapter "A moment kept"
- confirmation existing reflection / photo / video flows still work
- typecheck result
- remaining defects or blockers
