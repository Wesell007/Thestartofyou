# Phase 23A — First Year Age-Aware Guidance Strategy

Audit and strategy only. No code changes in this phase.

## 1. Current state of guidance on /my-first-year

The signed-in home renders, in order: hero panel, baby summary card, Today card, recently saved, memories, kept pregnancy chapter (conditional), two support lanes, what comes next.

Guidance today is **two hardcoded lanes** in `src/pages/firstyear/MyFirstYear.tsx`: `FOR_BABY_CARDS` (feeding, sleep, development, nappies and care, check-ups) and `FOR_YOU_CARDS` (recovery, body and hormones, emotional wellbeing, questions to bring up). Both are static arrays pointing at public topic hubs. They are identical for a two week old and an eleven month old.

The only age-aware element anywhere on the page is one link in `BabySummaryCard` to `monthPagePath(monthIndex)` ("Read the newborn guide"). `firstYearStage.ts` (Phase 21B) is currently used only in setup, not on the home page.

Content available and already written:
- `src/data/firstYearMonthData.ts` — 13 month guides (newborn to 12 months), each with a `shortVersion` block: `baby`, `feeding`, `sleep`, `you`, `whenToAsk`. All 13 routes are live under `/first-year/<slug>`.
- `src/data/firstYearPhaseData.ts` — four phase bridge pages (0-3, 3-6, 6-9, 9-12 months).
- `src/data/firstYearArticleData.ts` — 16 articles across 8 topics, routed at `/first-year/:topic/:slug`.

## 2. What is working

- Age derivation is already correct and pure: `getFirstYearAge` gives days, weeks, completed months, month index, and postpartum week; `resolveFirstYearStage` gives newborn / baby / older baby / toddler with copy and a `beyondFirstYear` flag. No new maths needed.
- The month data `shortVersion` is exactly the shape of age-aware guidance we want, already written and reviewed. Nothing new needs writing.
- The lane component (`SupportLane`) is generic, takes cards as props, and already handles the half-width grid. It can be reused as-is.
- Page rhythm is calm and the palettes (`--stage-firstyear`, `--stage-recovery`) are established.

## 3. What feels missing

- Setup promises "guidance that follows your baby's age" and the home page does not deliver it.
- The baby lane is a static topic index, not guidance for now.
- The one month link is buried under the summary card and reads as a footnote.
- Nothing changes at all when a baby passes twelve months, so the page slowly becomes less true.

## 4. Recommended v1 product approach

The smallest useful version: **one new "For this stage" section** that reads the derived month index and shows a small, warm, age-anchored group of links, plus a single line of already-written age copy.

Composition of the section, top to bottom:
1. Kicker "For this stage" and heading, e.g. "Around three months".
2. One sentence of orientation, taken from the current month's `shortVersion.baby`.
3. Three cards, in a fixed order, drawn from the current month guide:
   - **This month's guide** to `/first-year/<month-slug>` (the whole month read).
   - **Feeding right now** to `/first-year/feeding`, captioned with `shortVersion.feeding`.
   - **Sleep right now** to `/first-year/sleep`, captioned with `shortVersion.sleep`.
4. A single quiet line for the parent, using `shortVersion.you`, linking to `/first-year/postpartum-recovery` in the first twelve weeks and to `/first-year/emotional-wellbeing` afterwards.

Explicitly not in v1: no trackers, no per-baby dashboards, no AI selection, no checklists, no "what your baby should be doing", no new article writing, no new tables.

## 5. Recommended placement on /my-first-year

Insert as a new section **directly after the baby summary card and before the Today card**. Rationale: the summary card establishes age, so guidance for that age reads as its natural continuation, and the Today card keeps its position as the primary action. Do not fold this into the baby summary card (it would become the heaviest block on the page) and do not put it below memories (it would be missed).

Then trim the existing baby lane from five cards to three (development, nappies and care, check-ups) so total card count on the page stays flat. Feeding and sleep move up into the stage section where they are now captioned by age. The "For you" lane is unchanged.

The `shortVersion.whenToAsk` line stays out of the home page; it belongs on the month guide, and putting worry copy on the home page would work against the calm.

## 6. Recommended stage logic

Pure, read-time, never stored. Derive from the first baby's `date_of_birth` with the existing helpers.

- **Newborn** (0-27 days): month index 0. Section reads "Your first weeks". Parent line links to postpartum recovery.
- **Baby** (under 12 completed months): month index 1-11. Heading uses the month, e.g. "Around five months". Parent line links to recovery while `isEarlyPostpartum`, then emotional wellbeing.
- **Older baby / toddler** (12 months or more): clamp to the 12 months guide, change the heading to "Past the first year", and show the approved line: "First Year is built around the first twelve months, so some guidance may be less relevant now. You are welcome to carry on." Show only two cards (the 12 months guide and check-ups) so the section does not overstate its relevance.
- Unusable or missing date of birth: render nothing. No error, no placeholder.

## 7. Recommended guidance card structure

Reuse `SupportLane`'s `SupportCard` shape (`title`, `detail`, `href`) so there is one card idiom on the page. A new thin component `StageGuidanceSection` composes kicker, heading, orientation sentence, the cards (via a `SupportLane`-style list or `SupportLane` itself with `side="baby"`), and the parent line. A new pure module maps a month index to that content, so it is unit-testable with no Supabase and no `Date.now()`.

## 8. Recommended links and content source

Existing routes only. Month guides `/first-year/<slug>` (all 13 live), topic hubs `/first-year/feeding`, `/sleep`, `/development`, `/care-and-safety`, `/checkups-and-warning-signs`, `/postpartum-recovery`, `/emotional-wellbeing`. Captions come from `firstYearMonthData`'s `shortVersion`, so no new copy is authored beyond the section's own kicker, headings and the parent line. Phase pages are not linked in v1: the month guide already links onward to its phase and two entry points would be noise.

## 9. Recommended multiples handling

One shared section, matching the existing summary card. Derive age from the first baby. Where multiples exist and share a date of birth, the heading is unchanged and the orientation sentence is phrased for both ("your babies"). Where dates of birth differ (rare, and possible in the data), still use the first baby and add nothing; v1 does not fork guidance per baby. No switcher, no per-baby cards, no ordering UI.

## 10. Recommended copy direction

Warm, short, present tense, British English, no dashes. Examples:

- Kicker: "For this stage"
- Newborn heading: "Your first weeks"
- Baby heading: "Around four months"
- Beyond twelve months heading: "Past the first year"
- Section intro (newborn): "Feeding, sleeping and healing take up most of the day just now. That is exactly what should be happening."
- Card titles: "This month's guide", "Feeding right now", "Sleep right now"
- Parent line: "Your recovery matters here too. This is what tends to be going on for you around now."

Banned from user-facing copy: milestone, normal, safe, unsafe, tracker, score, progress, diagnosis, symptom checker, risk. Note that some existing month data contains "normal" inside long editorial bodies; the fields we surface on the home page must be checked and, where a chosen `shortVersion` string contains a banned word, a short home-page-specific sentence is used instead rather than editing the public article data.

## 11. Files likely to change in Phase 23B

- `src/lib/firstYearStageGuidance.ts` (new) — pure month index to guidance mapping.
- `src/lib/firstYearStageGuidance.test.ts` (new) — boundary tests: day 0, day 27, day 28, 11 months, exactly 12 months, 24 months, invalid date.
- `src/components/firstyear/journey/StageGuidanceSection.tsx` (new).
- `src/pages/firstyear/MyFirstYear.tsx` — mount the section, trim `FOR_BABY_CARDS` to three.
- Possibly `src/components/firstyear/journey/SupportLane.tsx` — only if a card list variant is needed; prefer no change.

## 12. Files that must not change

`src/data/firstYearMonthData.ts`, `firstYearPhaseData.ts`, `firstYearTopicData.ts`, `firstYearArticleData.ts`, all public First Year pages and topic templates, `src/App.tsx` routes, `scripts/generate-sitemap.ts`, `public/robots.txt`, `src/lib/firstYearDates.ts`, `src/lib/firstYearStage.ts`, all memories and check-in code, Supabase migrations, types, and edge functions.

## 13. Schema changes

None. Everything is derived at read time from `babies.date_of_birth`, which is already loaded on this page. No new tables, columns, policies or queries.

## 14. QA plan

- Unit tests on the mapping module at every stage boundary and for an unusable date.
- Rendering checks with a stubbed date of birth at: 3 days, 6 weeks, 5 months, 11 months, 13 months, 30 months.
- Multiples: two babies sharing a date of birth, and two with different dates.
- Copy scan of the rendered section for the banned word list.
- Visual pass at 390px and 1440px: header clearance unchanged, no double padding, card grid does not overflow, heading order stays h1 then h2 with the new section as an h2, focus rings visible on every new link.
- Full run of typecheck, tests, lint, build and sitemap; confirm the sitemap output is byte-identical since no public route changes.
- Signed-in visual QA still needs a preview session; it remains the one blocked check.

## 15. Risks and open questions

- Banned words inside existing `shortVersion` strings could leak onto the home page. Mitigation: audit the strings we surface during 23B and substitute local copy where needed rather than editing shared data.
- Adding a section risks lengthening the page. Mitigation: trimming the baby lane from five cards to three keeps the count flat.
- Twelve month handling could read as a nudge to leave. Mitigation: use only the approved wording and keep the section short.
- Open question: should the section also appear on `/my-first-year/today`? Recommendation is no in v1, to keep check-in single purpose.

## 16. Should Phase 23B proceed?

Yes. The content, the age helpers and the card idiom already exist, so v1 is a small, low-risk composition change with no schema work.
