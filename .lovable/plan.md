## Phase 14.15 — My Journey Detail Rollover Fix

Targeted fix for the kept week detail page (`/my-week/:week`, `src/pages/KeptChapter.tsx`) so it uses the new realism resolver and displays saved videos. Scope-limited per brief: no new assets, no route/migration/RLS/upload changes.

### Root cause

- `src/pages/KeptChapter.tsx` still imports `MyWeekBabyImage` (old 3-stage set from `myweek-weekly-babies/`) for the chapter header oval — this is what shows the old baby image on Week 36.
- `KeptChapter.tsx` never queries `week_media_memories`, so saved videos are invisible in the detail view.
- The "A moment kept" section only renders when a saved `week_photos` row exists; when a user saved only a video (Week 36), the section is skipped entirely, and the header baby illustration reads as if it were the kept moment.

Out of scope (intentionally not touched this phase): `MyWeekChapter.tsx` (live /my-week), `CurrentChapterCard.tsx`, `JourneyPreviewSection.tsx` (public home preview). These are not part of the "kept week detail" surface. `MyWeekBabyImage` component stays.

### Changes

**1. `src/pages/KeptChapter.tsx` — realism resolver for header**

- Drop `MyWeekBabyImage` import; import `resolveRealismForWeek`, `defaultRealismAltForWeek`, `normaliseRealismTone` from `@/lib/myWeekRealismIllustrations`.
- Load `baby_illustration_style` in the existing `profiles` select and normalise to a tone (used for weeks 9+; weeks 1–8 fall back to default inside the resolver).
- Replace the header oval `<MyWeekBabyImage>` with an `<img>` using the resolver URL and alt.

**2. `src/pages/KeptChapter.tsx` — fetch and display saved video**

- Extend the parallel Promise to also query `week_media_memories` for `(user_id, week, media_type='video')` and create a signed URL from the `weekly-photos` bucket (mirrors existing photo signing, same 60-min TTL + 50-min re-sign timer).
- Include weeks with a saved video in the `keptWeeks` set so navigation and the `!kept.has(week)` guard treat video-only weeks as kept chapters.
- Update state shape: add `videoUrl: string | null`.

**3. "A moment kept" section rewrite**

Rules:
- Photo only → existing photo figure.
- Video only → `<video controls preload="metadata" playsInline muted className="w-full h-auto max-h-[520px] block" />` inside the same rounded frame, with the existing caption treatment reused if a caption is present on the video row.
- Photo + video → render the photo figure, then a compact video tile beneath it in the same section.
- Neither → omit the section entirely (matches current behaviour; the header realism illustration is not labelled as a saved moment).

**4. Previous/next kept chapter cards**

- Already text-only (no thumbnails) in `KeptChapter.tsx`, so nothing to change. Confirm during QA.

### Files touched

- `src/pages/KeptChapter.tsx` (only file edited).

### QA

- `npm run typecheck`.
- Playwright walkthrough as authenticated user:
  - `/my-journey` still shows Videos count = 1 and Week 36 row indicator.
  - `/my-week/36` shows the new realism illustration in the header oval and the saved video playable under "A moment kept".
  - `/my-week/<a photo-only week>` still shows the photo.
  - `/my-week/<a week 1–8 kept chapter, if any>` falls back to default realism.
  - No console errors, no broken `<img>`/`<video>`.

### Return

Files changed, exact components causing each defect, new selection logic for photo/video/fallback, confirmation Week 36 video is visible, confirmation old 3-stage imagery is gone from the detail surface, confirmation summary still counts videos, typecheck output, remaining defects (expected: none in scope).

### Stop point

Stop after fix + QA. Do not start Phase 15.