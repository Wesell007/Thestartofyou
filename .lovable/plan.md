## Phase 15.3C: two small player fixes

Single file changed: `src/components/myjourney/MemoryFilmPlayer.tsx`. No other file is touched. No export, download, sharing, music, route, storage, RLS, analytics or AI prompt change. The timeline builder is not modified.

### Fix 1: video beat fallback

`buildFilmTimeline` already computes `fallbackPhotoUrl` on video beats, but the player never reads it, so a clip the browser cannot decode leaves a black frame behind the week badge.

- Add a `videoFailedId` state holding the beat id of a clip that failed to load.
- Attach `onError` to the `<video>` element, setting `videoFailedId` to the current beat id.
- In the `video` case, when the current beat has failed and has a `fallbackPhotoUrl`, render an `<img>` still instead of the video element, using the existing `driftStyle(beatProgress)` treatment.
- Keep the existing bottom gradient, week badge and caption overlay in both paths, so the beat looks the same apart from the source.
- When a failed beat has no `fallbackPhotoUrl`, leave the current frame as-is.
- Media playback wiring stays untouched: when the still is shown there is no media element, so the existing `mediaRef` play/pause effect simply no-ops for that beat and the rAF clock advances the beat normally.

### Fix 2: control strip contrast

The controls sit on the `bg-black/80` dialog overlay but use dark `foreground` tokens, so they render nearly invisible.

- Progress track: `bg-foreground/15` becomes a white-alpha track matching the overlay's existing white/x language.
- Progress fill: keep the accent colour, which already reads well on dark.
- Previous and next buttons: `border-foreground/15 text-foreground/70` becomes white-alpha border and white-alpha icon colour, consistent with the existing "Choose weeks" button in the finished-state overlay (`border-white/30`, `text-white/85`).
- Time readout: `text-foreground/50` becomes a white-alpha tone readable on black.
- Disabled state and all layout, sizing and structure stay exactly as they are. No redesign.

### Verification

- `npx tsgo --noEmit -p tsconfig.json`
- `npx vitest run src/lib/memoryFilm.test.ts` (expect 18/18; the builder is unchanged)
- Re-drive the player in the browser at desktop and mobile widths, capturing the control strip and a video beat, and confirm: controls clearly readable, video decode failure falls back to the still, photo beats and reflection beats unaffected, voice code path unchanged, no export/download/share UI, no console errors, no failed requests beyond the known codec limitation.

### Closeout caveat to record

Real video playback and real voice note playback still need a quick check on a real device. The sandbox has no H.264 decoding support, and the test database contains no saved voice note row, so neither could be fully verified here.
