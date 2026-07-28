# Phase 15.2 — Pregnancy experience polish

Three focused polish items. No data model, migration, RLS, storage, route, sitemap, analytics, AI prompt, voice, export, or asset changes.

## 1. "This week's memory" header on My Week

In `src/components/myweek/SectionKeepThisWeek.tsx`:

- Add a quiet section header above the existing indicator:
  - Title: **This week's memory**
  - Subline: *A reflection, a photo or a short video. Keep what feels right.*
- Keep the existing "Captured this week · ..." indicator, the reflection/photo/video slots, the My Journey footer link, and every save confirmation behaviour from Phase 15.1.

In `src/pages/MyWeek.tsx`:

- Only touch if a standalone reflection section framing still remains outside `SectionKeepThisWeek`. Leave the slot-level "A moment for you" heading inside `SlotReflection` untouched. Current read shows no standalone framing remains, so no edit expected.

## 2. Full-screen media viewer on My Journey

Create `src/components/myjourney/MediaLightbox.tsx` using the shadcn `Dialog` primitive:

- Accepts a sorted list of tiles (photo or video), plus the currently active index and an `onOpenChange` handler.
- Renders the media at comfortable max size, preserves aspect ratio, dims backdrop.
- Shows a week badge and caption (when available), plus a low-emphasis link `Open Week {week} →` routing to `/my-week/${week}`.
- Video uses `<video controls preload="metadata" playsInline muted />`.
- Keyboard: `Esc` closes (via Dialog primitive), left arrow → previous, right arrow → next. Focus stays inside the dialog through the primitive. Page behind does not scroll while open.
- Override the default Dialog width so the lightbox can breathe (max-w around 3xl/4xl) and remove the built-in max-w-lg constraint.

Update `src/components/myjourney/PhotoJournal.tsx`:

- Replace the tile `Link` (photo) and inline `<video controls>` (video) with buttons that open the lightbox at that tile's index.
- Preserve the existing tile visuals: week badge overlay, caption strip, "Video also kept" badge on paired weeks.
- Keep the empty-state "Add a memory" CTA linking to `/my-week/${currentWeek}` unchanged.
- Loss reveal behaviour is unaffected: `PhotoJournal` is only rendered inside the revealed kept region, so the lightbox is unreachable while the region is hidden.

## 3. Next-chapter preview correction

Update `src/components/myweek/SectionNextChapter.tsx`:

- Keep the card as a non-actionable preview visually. Add a single low-emphasis link at the bottom:
  - Label: `See your journey so far →`
  - Route: `/my-journey`
- Do NOT link the card itself to `/my-week` and do NOT use "Continue into week X →" wording, because the next week is not directly addressable.
- Keep the card hidden when `nextWeek` is null. Preserve existing preview text, spacing, mobile layout, and visual treatment.

## Files expected to change

- `src/components/myweek/SectionKeepThisWeek.tsx`
- `src/components/myweek/SectionNextChapter.tsx`
- `src/components/myjourney/PhotoJournal.tsx`
- `src/components/myjourney/MediaLightbox.tsx` (new)
- `src/pages/MyWeek.tsx` (only if cleanup is needed; expected untouched)

## Out of scope

Voice notes, keepsake export, inline AI, hospital bag / birth plan upgrades, toolkit data changes, migrations, RLS, storage, new routes, sitemap, analytics, AI prompts, illustration assets, native shell, push notifications.

## QA

- `SectionKeepThisWeek` shows the "This week's memory" title and subline.
- Captured indicator still appears when ≥1 item kept; save confirmations from Phase 15.1 still fire.
- Tapping a photo tile in `PhotoJournal` opens the lightbox with week badge, caption (when set), and `Open Week {week} →` link.
- Tapping a video tile opens the lightbox with the same metadata; the video plays inside the dialog.
- `Esc` closes the lightbox. Left/right arrows cycle through visible media. Focus is trapped. Page behind does not scroll.
- `Open Week {week} →` routes to `/my-week/${week}` and shows the correct kept chapter.
- `SectionNextChapter` on `/my-week` is not clickable as a whole; the only link routes to `/my-journey` with wording `See your journey so far →`.
- Card is hidden at the final week.
- Mobile layout intact; no console errors.
- `npm run typecheck` returns exit 0; result reported.