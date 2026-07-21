
# Phase 12.1 — My Week 2.0 Visual & Content Structure

Build phase. Frontend-only. No schema, no new routes, no image generation, no changes outside `/my-week`.

## Files to inspect (read-only reference)

- `src/pages/MyWeek.tsx` — current orchestrator (data load, layout).
- `src/components/myweek/*` — existing slot components.
- `src/data/myWeekContent.ts` — `getMyWeekContent`, `getWeekIdentity` (chapter title, theme, developmentCue, babyNote, lead, matters[3], focus, reflection prompt, nextPreview). Coverage: weeks 1–42.
- `src/data/weekData.ts` — public week hub content. Read-only reference only; no rewrites.
- `src/data/weekSupportContent.ts` — only if we need to reuse a small existing field.
- `src/lib/savedJourney.ts` — `getActivePregnancyJourney` (unchanged).
- `src/lib/askNavigation.ts` — `askDestination`/`AskLink` supports `stage` param. `week`/`seed` are additional query params; safe to append (AskPage ignores unknown params).
- `src/App.tsx` — `/my-week` route, `ProtectedRoute`, noindex behaviour (unchanged).

## Files to edit

- `src/pages/MyWeek.tsx` — recompose the page into the new 10-section flow.
- `src/components/myweek/MyWeekChapter.tsx` — trim to premium hero (greeting, trimester · week, chapter title, standfirst, due-date + countdown card). Keep serif/warm styling.
- `src/components/myweek/MyWeekBabyImage.tsx` — reuse as-is. Layout will present it larger.
- `src/components/myweek/SlotOneFocus.tsx` — reuse; visual refresh only if trivial.
- `src/components/myweek/SlotReflection.tsx` — preserve save logic; visual polish only.
- `src/components/myweek/SlotPhotoMemory.tsx` — preserve upload logic; visual polish only.
- `src/components/myweek/SlotWhatsNext.tsx` — repurpose into "Next chapter" preview card.
- `src/components/myweek/MyWeekClosing.tsx`, `MyWeekFooter.tsx`, `MyWeekHeader.tsx` — keep; minor spacing tweaks only if needed.
- New: `src/components/myweek/SectionBabyThisWeek.tsx` — dedicated large baby card (image + size cue + developmentCue + one calm "what this means" line derived from `babyNote`).
- New: `src/components/myweek/SectionBodyThisWeek.tsx` — one strong paragraph or up to 3 calm points, sourced from `getMyWeekContent().matters` "Your body".
- New: `src/components/myweek/SectionEmotionallyThisWeek.tsx` — normalising paragraph from `matters` "Emotionally" + small non-saving reflection nudge (uses existing SlotReflection below for the actual save).
- New: `src/components/myweek/SectionAskAI.tsx` — prominent-but-calm CTA card linking to `/ask?stage=pregnancy&week=<n>&seed=<safe-topic>` via `AskLink` (extended with a `search` passthrough, or plain `<Link>` if simpler).
- New: `src/components/myweek/SectionToolsThisWeek.tsx` — up to 3 week-aware tool cards. Live tools link; future tools render as static "Coming soon" cards (no `href="#"`, non-clickable).
- Retire from render (files can stay on disk to keep the phase small): `SlotWhatMatters.tsx`, `SlotCompanionRecall.tsx`, `SlotReflectionAssistant.tsx`, `NoteShapingSuggestion.tsx`, `MyWeekHero.tsx`, `MyWeekOrientation.tsx`, `JourneyMeaning.tsx`, `WeekIllustration.tsx`. Not imported by other pages (will verify with a quick grep before removing imports).

Small content-only additions to `src/data/myWeekContent.ts` (backwards compatible):
- Optional `bodyParagraph?: string`, `emotionalNote?: string`, `safeAskSeed?: string` on `MyWeekEntry`.
- Fallbacks: when absent, derive from existing `matters[1]` (body), `matters[2]` (emotionally), and a stage default seed (e.g. early: "early pregnancy symptoms"; mid: "movement patterns"; late: "third trimester rest"; post-term: "going past your due date").
- No changes to existing keys — all current consumers keep working.

## My Week 2.0 structure (single scroll, mobile-first, then desktop-refined)

Order top to bottom:

1. **Chapter hero** — greeting + first name, `Trimester · Week N`, chapter title (serif display), one-line standfirst (theme/lead), due-date pill with "X weeks to go".
2. **Baby this week** — large fetus image (current PNG), size cue (`developmentCue`), 2–3 sentence development note (`babyNote`), one "what this means" calm line.
3. **Your body this week** — one paragraph or up to 3 short calm points.
4. **Emotionally this week** — normalising paragraph + soft prompt line (no save button here; save happens in section 8).
5. **One focus this week** — single card (headline + body from `focus`).
6. **Ask AI about this week** — prominent card, CTA button to `/ask?stage=pregnancy&week=<currentWeek>&seed=<safeSeed>`. Copy explains AI can help with understanding this week, preparing questions, calming worries, knowing when to seek support.
7. **Tools for this week** — 1 to 3 cards, week-aware (see table below).
8. **Weekly reflection** — existing `SlotReflection` (unchanged logic).
9. **Photo memory** — existing `SlotPhotoMemory` (unchanged logic).
10. **Next chapter** — small preview card: `Week N+1`, next chapter title, one-sentence preview from `nextPreview`; links to `/my-week/:week` only if the user has already saved that future chapter, otherwise non-clickable. (Does not link to `/pregnancy/week/N` to keep this a personal companion, not an article surface.)

Layout: single centered column, max ~720px on mobile/tablet, expanding to ~880px on `lg` with generous vertical rhythm. Drop the sticky right rail from the current design to reduce clutter and give Baby-this-week the visual dominance the brief asks for. Warm parchment page background preserved. Cards use existing `keepsake-surface` and `--stage-pregnancy-accent` tokens only.

## Week-aware tool cards (max 3)

Deterministic function `getWeekTools(week)` in `SectionToolsThisWeek.tsx`:

| Week range | Card 1 | Card 2 | Card 3 |
|---|---|---|---|
| 1–12 | Due date calculator (live → `/due-date-calculator`) | Questions for midwife (coming soon) | Appointment notes (coming soon) |
| 13–23 | Appointment notes (coming soon) | Symptoms tracker (coming soon) | Questions for midwife (coming soon) |
| 24–33 | Kick counter (coming soon) | Appointment notes (coming soon) | Symptoms tracker (coming soon) |
| 34–36 | Hospital bag (coming soon) | Birth plan (coming soon) | Kick counter (coming soon) |
| 37–42 | Contraction counter (coming soon) | Hospital bag (coming soon) | Birth plan (coming soon) |

Rules enforced in component: max 3, no `href="#"`, "Coming soon" cards render as `<div>` with visual dimming and no click handler.

## Ask AI CTA

- Uses plain `<Link>` (not `AskLink`) because we want URL query params `stage`, `week`, `seed` without setting router state (seed is a topic, not a prefilled question). Query string built with `URLSearchParams` for safety.
- `safeSeed` = `getMyWeekContent(week).safeAskSeed ?? stageDefaultSeed(week)`.
- No AskPage logic changes. Unknown params on `/ask` are ignored today (verified in read); no fix needed.

## Preservation

- `getActivePregnancyJourney` lookup and redirect chain (auth → setup → due-date-calculator) unchanged.
- Reflection save path (`reflections` table via `SlotReflection`) unchanged.
- Photo memory upload path (`weekly-photos` bucket + `week_photos` table via `SlotPhotoMemory`) unchanged.
- Baby image glob in `MyWeekBabyImage.tsx` unchanged.
- SeoHead `noindex` preserved. Protected route wrapping unchanged.
- Analytics: keep existing `MY_WEEK_VIEWED` event. No new PII-bearing events.

## Content rules

- UK English throughout new copy.
- Zero em/en dashes in new strings (use commas, semicolons, or full stops).
- No diagnosis, no false reassurance. Emotional and body copy stays gentle and non-prescriptive.
- Late-pregnancy safety line already surfaced by existing `MyWeekFooter contextual` prop — preserved.

## Mobile checks

- Single column ≤ 720px, hero stacks (due-date pill under title on narrow screens), baby image ~ 260–320px wide, tool cards stack 1-column below `sm`, 3-column from `sm` up with equal heights. No horizontal overflow. CTA buttons ≥ 44px tap height.

## Verification steps

1. `bunx tsgo --noEmit` clean.
2. Manual walkthrough on `/my-week` at weeks 6, 18, 26, 35, 39 (via temporary date shim if needed for dev; not committed) to confirm all five tool-range branches render.
3. Confirm reflection save, photo upload, revisit of `/my-week/:week` still work.
4. Confirm Ask AI CTA URL: `/ask?stage=pregnancy&week=18&seed=movement%20patterns`.
5. Grep for `href="#"` in edited files → zero results.
6. Grep for new dashes in edited files → zero results.
7. Confirm no changes to `src/App.tsx`, DB, RLS, edge functions, sitemap, robots, or any other stage/hub.

## Risks & mitigation

- **Retiring slot files may be imported elsewhere** — grep before removing imports; leave orphan files on disk to keep the diff small.
- **Text drift from `myWeekContent.ts` defaults** — reuse existing fields; only add optional keys. No week 1–42 rewrite in this phase.
- **Aesthetic regression on desktop** — preserve `keepsake-surface`, palette tokens, and generous max-widths; do not introduce new colors or fonts.

## Recommended next phase

**Phase 12.2 — Nano Banana fetus image system.** With the new Baby-this-week slot sized and framed, regenerating the 39 weekly PNGs will lift the whole page without further code changes.
