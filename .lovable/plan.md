# Phase 13.6c Final Visual Spot-Check Plan

Read-only QA. No code changes unless a real visual defect is found.

## Approach

1. Launch Playwright headless Chromium with injected Supabase session.
2. Restore auth (cookies + localStorage) and navigate to `/my-week` on an active pregnancy journey.
3. Upload a short test video (generated on-the-fly with ffmpeg, <5s, <5MB, H.264/MP4) so the loaded state renders with a real duration badge.
4. Capture screenshots at two viewports:
   - 375 x 1800 (mobile)
   - 1280 x 1800 (desktop)
5. For each viewport, capture:
   - Full page shot of `/my-week`
   - Element shot of the video slot (empty + loaded)
   - Element shot of the divider between photo and video
6. View each screenshot with `code--view` and verify visually.

## Verification checklist

- Photo slot unchanged, appears first
- Video slot appears below photo slot
- Subtle hairline divider between them
- No "KEEP THIS WEEK" wrapper label visible
- Loaded video renders duration badge (bottom-left) when duration exists
- Duration badge does not overlap native video controls
- Private chip does not collide with Replace / Remove controls
- At 375px: "Replace video" is icon-only, `aria-label="Replace video"` present in DOM
- At 1280px: "Replace video" text is visible
- Focus states remain visible on keyboard focus (tab through controls, screenshot)
- Overall composition still feels premium and calm

## Guardrail greps (read-only)

- Confirm no new imports of analytics, AI, MediaRecorder, or storage helpers were introduced beyond what already existed after 13.6c.
- Confirm no migration files, sitemap, or route files were modified.

## Deliverable

Summary in the requested shape:
- 375px result
- 1280px result
- Duration badge result
- Mobile controls result
- Photo slot confirmation
- Video slot confirmation
- Defects (if any) — with screenshot paths

If any real visual defect is found, I will stop and propose a minimal follow-up fix rather than editing in QA mode.
