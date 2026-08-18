# Phase 26C UI Refinement — Today's Rhythm

Rebuild the visual layer of `/my-first-year/today` to match the chosen Nano Banana direction (option 2, calm parchment), strengthened with option 1's active card, timeline and quick-add readability. Logic, database, validation, RLS and care-event behaviour stay exactly as they are.

## Visual direction (locked)

- Warm parchment page, white and translucent-white cards, existing `--stage-firstyear-*` tokens only. No new hex values, no phone frame, no status bar.
- Serif display for the page title and card headlines, sans for everything else, tabular numerals for every clock and stopwatch.
- Radii: cards `rounded-[26px]`, inner panels `rounded-[18px]`, chips and actions fully rounded.
- Soft, low-spread shadows: one stronger shadow on the active card, quiet shadows elsewhere.
- One consistent selected state for chips: tinted fill, matching border, darker text.

## What changes on the page

**Header** — Back link, baby-and-date line on the right, serif "Today's rhythm", one calm intro line. Same copy rules, British English.

**Quick add row** — Four square tiles (Feed, Sleep, Nappy, Moment), each a soft-tinted panel with a line icon above a clear label, one distinct tint per type. Larger, higher-contrast labels than the current version; keeps the hint line as a small caption. Full 44px+ tap targets, existing `onAdd` behaviour untouched.

**Today so far** — Four quiet outlined tiles keeping the current headline value (count or duration) plus the detail line, which stays factual and never wraps awkwardly. Detail text gains contrast so it is readable at a glance.

**Active card** — The single dominant card on the page. Large tabular stopwatch, "Sleeping now" label, start time beneath, and the action pill on the right at wider widths, stacked below on narrow screens. Button label is **"End sleep"**. The running breast-feed card gets the same shell: total duration large, per-side durations as two small panels with the active side highlighted, then Switch side / Pause / End feed.

**Daily rhythm timeline** — Rebuilt as a true vertical timeline: time on the left, a coloured dot per event type on a hairline rail, then title, detail and note. Edit and Remove sit as quiet actions on the right of each row. Dot colours map to feed / sleep / nappy / moment using stage tokens.

**Note for today** — White card with the label, the textarea inside it, and the save button aligned right in the same card.

**Recent days and footers** — Unchanged in behaviour, restyled to the same card and spacing scale.

## Sheets

All sheets keep their current fields, steps, validation and submit paths. Restyled only:

- Shared: sheet title in serif, section legends as small uppercase labels, chips as large pill buttons with the single selected state, primary action as a full-width pill at the bottom, Cancel as a quiet link.
- Feed sheet: the breast/bottle choice becomes two large stacked panels.
- Breast timer sheet and card: big stopwatch, two side panels, stacked actions by priority, "Add manually" as a quiet link.
- Bottle detail: type chips, amount field with the ml/oz toggle beside it, time, optional note.
- Sleep sheet: "Start sleep now" as the primary panel with its helper line, "Add sleep manually" secondary, then the manual fields.
- Nappy sheet: type chips, rash chips, and the poo texture / size / colour chip groups shown only when relevant.
- Moment sheet: time and note.

## Technical notes

- Presentation-only edits: `FirstYearToday.tsx` (markup and classes), `QuickAddRow`, `TodaySoFar`, `ActiveCard`, `BreastTimer`, `RhythmTimeline`, `NoteField`, `RecentDays`, `LogSheet`, `sheetControls`, `FeedSheet`, `SleepSheet`, `NappySheet`, `MomentSheet`.
- New shared constants added to `src/components/firstyear/journey/firstYearStyles.ts` for the tile, chip, timeline dot and sheet action styles, so the sheets and page stay in sync.
- Icons come from `lucide-react`, marked `aria-hidden`.
- No changes to `firstYearCareEvents.ts`, `firstYearCareEventsSchema.ts`, migrations, RLS, routes, sitemap or SEO.
- Existing tests keep passing; typecheck, lint and build run before handover, plus a mobile-width and desktop-width visual pass.
