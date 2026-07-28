## Phase 15.3C — Pregnancy Memory Film, Preview Only

Private, in-app, vertical 9:16 memory film assembled in the browser from memories already loaded by My Journey. No export, no download, no sharing, no music, no new route, no backend change.

### Confirmed current state (audited)

- `/my-journey` already loads, in one pass: reflections by week, photo URLs, videos and voice notes (each with `week`, signed `url`, `caption`, `mimeType`, `durationSeconds`), plus `firstName`, `currentWeek`, `due`, `status`, and a derived `keptWeeks` list.
- All media is signed in a single batched `createSignedUrls` call with a 60-minute TTL. The film reuses those exact URLs — nothing new is fetched or stored.
- `status` is a `PregnancyJourneyStatus`; `isActive = status === "active"` already exists in the page.
- Testing is Vitest (`npm test`), with tests co-located under `src/` (e.g. `src/lib/dateOnly.test.ts`). No new framework needed.

### Step 1 — Pure timeline builder (built and tested before any UI)

New file `src/lib/memoryFilm.ts`. No React, no Supabase, no browser APIs. Signed URLs are passed in as opaque strings.

Input: `{ firstName, currentWeek, due, weeks: WeekMemory[], selectedWeeks: number[] }` where `WeekMemory` carries `week`, optional `reflection`, `photo`, `video`, `voice` (each with url, caption, duration).

Output: `{ beats: FilmBeat[], totalSeconds, includedWeeks, excludedForCap }` — a flat array of beats with absolute `startSeconds` and `durationSeconds`.

Beat types: `cover`, `chapter`, `weekLabel`, `photo`, `video`, `voice`, `reflection`, `ending`.

Rules:
- Sort ascending by week; group by week; drop any week with no saved memory; honour `selectedWeeks`.
- Insert a `chapter` beat when the trimester changes (1–12, 13–27, 28+).
- Per-week ordering: `weekLabel` (folded into the first visual beat where possible) → photo → video → voice → reflection.
- Durations: cover 3s, chapter 2.5s, reflection 4s, photo 4s, video `min(duration, 6)` defaulting to 5s when duration is unknown, voice `min(duration, 10)` defaulting to 8s, ending 3s.
- Hard cap 120s. When over, drop lowest-value beats first (reflection-only, then extra photo beats on dense weeks), keeping the first and last kept weeks and at least one beat per selected week; report what was dropped via `excludedForCap`.
- Target 45–90s; when the journey is sparse the film is simply shorter and a `sparse` flag is returned for copy.
- Deterministic: same input always yields the identical beat array. No `Date.now()`, no randomness.

New test file `src/lib/memoryFilm.test.ts` covering: determinism, week sorting, chapter insertion at trimester boundaries, empty weeks excluded, `selectedWeeks` filtering, cap enforcement under 120s, sparse journeys, and unknown media durations.

### Step 2 — Entry point

New `src/components/myjourney/MemoryFilmEntry.tsx`, rendered on `/my-journey` beneath Moments Kept.

- Title "Create your pregnancy film", subline "Turn your saved photos, videos, voice notes and reflections into a private memory film.", button "Preview my film".
- Shown only when `status === "active"`.
- Requires at least 3 kept weeks and at least one photo or video or voice note; otherwise a gentle disabled state: "Keep a few more memories to create your film."
- Hidden entirely for loss, paused, given-birth and any non-active status.

### Step 3 — Week selection

New `src/components/myjourney/MemoryFilmBuilder.tsx` — a full-screen overlay (no new route; opened from the entry point and closable with Escape).

- Lists only weeks that have saved content, all ticked by default.
- Each row shows the week number and small chips for what it contains: Photo, Video, Voice, Reflection.
- "Play film" is disabled when nothing is selected.
- Shows the live estimated length from `buildFilmTimeline`.

### Step 4 — Player

New `src/components/myjourney/MemoryFilmPlayer.tsx`.

- 9:16 stage, centred and letterboxed on desktop, full width on mobile, using the existing keepsake surface and pregnancy accent tokens.
- Clock driven by `requestAnimationFrame` against `performance.now()`, accumulating elapsed time only while playing.
- Controls: play/pause, previous beat, next beat, close. Segmented progress bar, one segment per beat.
- Photo beats: cover-cropped still with a slow 1.00→1.04 drift, caption as a low-third when present.
- Video beats: inline `<video>` muted by default, playing from 0, cut at the beat duration; falls back to that week's photo or the week label if it cannot play.
- Voice beats: calm card with the week label and a simple CSS bar motif (no generated assets), audio element started on the beat, faded out at the end.
- Reflection beats: short excerpt only, first sentence or ~120 characters at a word boundary, `font-serif` on a warm ground.
- Cover and ending beats: name, week span and due date line, typographic only.
- Nothing autoplays with sound before a user gesture; playback only begins after the explicit "Play film" tap.

### Technical notes

- No migrations, no RLS, storage, analytics, AI prompt or illustration changes.
- No new routes: the builder and player are overlays within `/my-journey`.
- No files are written to storage; nothing is exported or downloadable; no share link exists.
- `MyJourney.tsx` changes are limited to composing the new entry point and passing already-loaded data down.

### QA

- `npm run typecheck`
- `npx vitest run src/lib/memoryFilm.test.ts` plus the full suite
- Playwright pass on `/my-journey` at mobile and desktop widths to confirm the entry point gating, week selection, playback of each beat type, controls, progress, and a clean console.
