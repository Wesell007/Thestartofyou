# Phase 27E — Pregnancy Journal Bridge Layer

Presentation-led pass. No purchase flow, no ownership state, no schema, route, SEO or logic changes.

## Discovery findings

1. `JournalBridgeCard` lives at `src/components/myweek/JournalBridgeCard.tsx` and is used in exactly two places: `src/pages/MyWeek.tsx` (line 278) and `src/pages/MyJourney.tsx` (line 454).
2. It already has `owner` and `discovery` variants, prop-only. Problem: only the `discovery` variant carries a `/journal` link, and the `owner` copy ("This week also has space in your journal.") is the weekly copy, so the variant names are doing double duty as *context* rather than ownership tone. Both pages currently render the default `discovery` variant, so `/my-week` and `/my-journey` show identical copy.
3. `/journal` is a real route in `App.tsx` rendering the Product page; `/product` redirects to it. Linking there is correct and needs no change.
4. `/my-week` placement is already good: after `SectionKeepThisWeek`, before `SectionNextChapter`. Only one card.
5. `/my-journey` placement is at the very bottom after `LookingAheadCard`, one card, quiet. Good.
6. `/pregnancy-toolkit` has no journal cue at all today (no match for "journal" in the toolkit pages).
7. Natural toolkit connections: hospital bag (packing list has a journal page), birth plan (preferences written out), appointments (dated notes). Symptom notes, contraction timer, baby movements and midwife questions should stay clean.
8. Repetition risk is low today (two cards, different pages) but the identical copy makes them feel duplicated. Fixing the context copy solves this.
9. Copy is already soft and non-salesy; no banned phrases present.
10. Bottom nav inset and consent banner were resolved in 27C/27D; the card is in normal document flow and does not overlay anything.

## What changes

### 1. `JournalBridgeCard` refinement
- Add a `context` prop: `"week" | "journey" | "toolkit"` (default `"journey"`), keeping the existing `variant` prop (`owner` | `discovery`) purely as tone, prop-only, no state.
- Copy map keyed by context, using only the approved lines:
  - week: "This week also has space in your journal." / "Keep the quick moments here, and the longer story by hand."
  - journey: "Some things are nicer written by hand." / "The physical journal gives you a place to keep this story offline too."
  - toolkit: "There is space for this in your journal too." / "Use the app for quick edits, and your journal for the keepsake version."
- Every context gets the CTA link to `/journal` ("See the journal"), so the card is always actionable and accessible.
- Add a compact `tone="inline"` rendering used by toolkit cues: single line of helper copy plus the quiet link, small sprig only, no icon bubble, no wash. Full paper-card rendering stays the default.
- Keep decorative artwork `aria-hidden`, keep `PG_QUIET_LINK` (already min-h-11 with focus ring).

### 2. `/my-week`
Keep the existing single placement after `SectionKeepThisWeek`; pass `context="week"`.

### 3. `/my-journey`
Keep the existing single bottom placement; pass `context="journey"`.

### 4. Toolkit cues
Add the compact inline cue, one per page, low on the page and after the tool's own content, on:
- `/pregnancy-toolkit/hospital-bag`
- `/pregnancy-toolkit/birth-plan`
- `/pregnancy-toolkit/appointments`
No cue on the toolkit index or the other four tools. No tool behaviour, data or save logic touched.

### 5. Visual
Reuse 27B/27D tokens only: `pregnancy-paper`, `PG_CARD_RADIUS`, `PG_HELPER`, `WatercolourWash`, `SmallSprig`, `JournalCornerMark`. No hex, no new visual system.

## Tests
New `src/components/myweek/JournalBridgeCard.test.tsx`: discovery renders, owner renders by prop, each context renders its copy, link points at `/journal`, no ownership prop required. Plus a light assertion that the compact tone renders a single link. Existing tests untouched.

## Verification
Playwright at 390px and 1440px on `/my-week`, `/my-journey`, `/pregnancy-toolkit` and the three tool routes, plus smoke on `/journal`, one public pregnancy page and one signed-in First Year route. Checking overflow, console, nav and banner. Then `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run`, `npm run build`.

## Out of scope (later-phase notes)
Insert-card route, journal-owner database field, pregnancy Memories route, Fable visual upgrade, dismissal persistence.
