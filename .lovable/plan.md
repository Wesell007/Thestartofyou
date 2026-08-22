# Phase 28C — Today-first TTC Journey and Cycle Path

Presentation and hierarchy only. No schema, RLS, AI, auth, cycle maths, logging, calculator, handover, SEO, sitemap or route changes.

## What changes for the user

`/my-ttc-journey` stops opening as a six-tile dashboard and opens as a calm daily companion:

1. Hero (unchanged copy, slightly tightened)
2. Today card (new lead surface)
3. Cycle path (reshaped timeline)
4. What may be useful today (focus card moved up)
5. Cycle details (the old six tiles, quieter and collapsed in feel)
6. Notes and calendar (unchanged behaviour, lower on the page)
7. Helpful guidance
8. Ask entry
9. Update setup
10. Pregnancy handover
11. Quiet footer and remove journey

## Today card

New component `TTCTodayCard.tsx`, built only from data already computed in `MyTTCJourney.tsx` (`derivedStage`, `cycleDay`, saved journey dates).

Shows, per stage:
- a gentle "where you may be today" line ("You may be near a possible fertile window", "You may be moving through the waiting part", and so on)
- one support line ("You do not need to work everything out today.")
- one next step, using existing handlers and routes only: "Add a note" opens the existing log panel for today, or a link to existing guidance, `/ask?stage=ttc&topic=...`, or `/setup/trying-to-conceive`
- two or three small supporting details (cycle day, next milestone date, days until it) as quiet inline chips, not tiles

## Cycle path

`TTCJourneyTimeline.tsx` is reshaped into a softer journey path over the same six milestones and the same dates. A flowing sage line with a soft marker for "you may be around here", muted markers for what has passed and lighter ones for what may come next. Mobile stays a stacked path. No new data.

## Cycle details

`TTCJourneySummary.tsx` keeps all six values but is restyled as a quiet supporting block, with a smaller label scale and lower-contrast surface, placed after the cycle path and the useful-today section.

## Notes, calendar, Ask, handover, footer

Behaviour untouched. Only ordering and section labelling change. Ask stays a link to `/ask` with the existing query params. Handover and the remove-journey dialog stay exactly as they are.

## Technical notes

- New file: `src/components/ttc/journey/TTCTodayCard.tsx`.
- Edited: `src/pages/MyTTCJourney.tsx` (section order, passes existing `openPanelForDate` handler down), `TTCJourneyTimeline.tsx`, `TTCJourneySummary.tsx`, possibly small additions to `ttcStyles.ts` for the path and detail-row tokens.
- Nano Banana is used inside Lovable first to refine the Today card and cycle path composition against the approved TTC board before any code changes.
- Styling uses only existing `--stage-ttc-*` tokens, `ttcStyles.ts` constants and the existing sage wash and botanical decor. No hex values. All interactive targets stay at 44px minimum.
- Copy follows the guardrails: British English, no em dashes, "may / possible / around / based on the dates you saved", no banned clinical or performance words.

## Verification

Playwright at 390px and 1440px across `/my-ttc-journey`, `/setup/trying-to-conceive`, `/ovulation-calculator`, `/trying-to-conceive`, one TTC topic page, one TTC article, one signed-in pregnancy route and one signed-in First Year route. Then `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run` and `npm run build`, followed by the 25-point report.
