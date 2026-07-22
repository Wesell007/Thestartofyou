# Phase 12.3 — My Journey 2.0 Timeline Redesign

Frontend-only redesign of `/my-journey` into a calm, memory-led pregnancy timeline. Uses existing data (active journey, reflections, `week_photos`, `weekly-photos` storage bucket, `myWeekContent`). No schema, routes, RLS, storage, or `/my-week` changes.

## Files edited

- `src/pages/MyJourney.tsx` — restructure into the new section flow, add photo signed-URL loader for the journal, keep existing data loads (profile, journey, reflections, week_photos).

## Files created (under `src/components/myjourney/`)

- `JourneyHero.tsx` — first name, current week, trimester, due date, weeks to go, warm standfirst.
- `TrimesterRail.tsx` — three-segment progress rail (T1: 1–13, T2: 14–27, T3: 28–42) with current-week marker.
- `MomentsKeptSummary.tsx` — three quiet counters: reflections, photos, weeks kept (real counts, warm empty phrasing).
- `TrimesterTimeline.tsx` — replaces `JourneyGroup` grouping; renders trimester sections with saved-week rows (reuses `KeptWeekRow`).
- `PhotoJournal.tsx` — grid of week photos with thumbnails from signed URLs; gentle prompt when empty.
- `ReflectionHighlights.tsx` — up to 3 most recent reflections (by `first_written_at`) as pull-quote cards.
- `ComingSoonPanel.tsx` — subtle "coming later" card listing birth plan, hospital bag, appointment notes, AI memory. Non-clickable, no fake progress.

## Files updated (light touch)

- `CurrentChapterCard.tsx` — add short weekly meaning line from `myWeekContent` (`babyNote` / `theme`) beneath chapter title; keep existing image + CTA.
- `LookingAheadCard.tsx` — copy tweak for consistency; keep CTA to `/my-week`.
- `JourneyHeader.tsx` — retire in favour of `JourneyHero` (kept in tree only if referenced elsewhere; delete if unused).
- `JourneyGroup.tsx` — kept as-is (used inside timeline) or superseded by `TrimesterTimeline` internals.

## Page structure (top → bottom)

1. `JourneyHero`
2. `TrimesterRail`
3. `CurrentChapterCard` (upgraded)
4. `MomentsKeptSummary`
5. `TrimesterTimeline` — main body, grouped saved weeks
6. `PhotoJournal` — only rendered if at least one photo, else empty prompt
7. `ReflectionHighlights` — only if ≥ 2 reflections
8. `ComingSoonPanel` — small, subtle, at the bottom
9. `LookingAheadCard`

## Data & technical details

- Reuse existing loader in `MyJourney.tsx` for `profiles`, `getActivePregnancyJourney`, `reflections`, `week_photos`.
- Extend the query for `week_photos` to also select `storage_path`; batch-create signed URLs via `supabase.storage.from("weekly-photos").createSignedUrls(paths, 3600)` in one call. Feed the resulting map to `PhotoJournal` and (optionally) `KeptWeekRow` for thumbnails.
- Trimester ranges: T1 = 1–13, T2 = 14–27, T3 = 28–42. Current-week marker positioned as `(week / 42) * 100%` within the rail, with per-segment fill.
- `MomentsKeptSummary` counts derived client-side from already-loaded arrays; no new queries.
- `ReflectionHighlights` sorts by `first_written_at desc` (existing ordering already used for Moments); render truncated snippet + week + chapter title.
- `ComingSoonPanel` is a static informational card, no links, `aria-disabled`, muted tone.
- All copy: UK English, no em/en dashes, warm, no medical/fear language, no fake progress.

## Visual direction

- Parchment background (`bg-parchment-grain page-vignette`) — unchanged.
- `keepsake-surface` cards, `hsl(var(--stage-pregnancy-accent))` accents, serif headings, generous spacing, mobile-first single column, timeline segment lines with soft borders.
- Reuse `MyWeekBabyImage` for current chapter and where a small week image adds warmth (no new assets).

## Preservation

- `MyWeekHeader` / `MyWeekFooter` retained.
- Protected route + auth redirects (`/auth`, `/setup`, `/due-date-calculator`) preserved.
- `SeoHead` with `noindex` preserved.
- Analytics `MY_JOURNEY_VIEWED` preserved.
- No changes to TTC, IVF, First Year, Toddler, Family, calculators, week pages, sitemap, robots, redirects, SEO infra, or `/my-week` (unless a tiny shared visual token nudge is genuinely needed — none anticipated).

## Empty states

- No kept weeks → warm hero-adjacent card inviting first save from `/my-week`.
- No photos → soft prompt inside `PhotoJournal`.
- No reflections → `ReflectionHighlights` hidden; `MomentsKeptSummary` shows 0 with warm phrasing.

## Verification

- `bunx tsgo --noEmit`.
- Manual: render with active pregnancy journey; check trimester rail marker, current chapter, timeline grouping, photo thumbnails loading via signed URLs, empty states, mobile layout, no `href="#"`, redirect flow when journey missing.

## Out of scope

- No new routes, schema, RLS, storage, edge functions, AI logic, toolkit data, or asset generation.

## Recommended next phase

Phase 12.4 — Pregnancy Toolkit MVP (birth plan + hospital bag first tables & UI), which will backfill the "coming soon" placeholders.
