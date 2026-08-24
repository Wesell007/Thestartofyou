# Phase 28H — TTC Reading Cards, Calendar Colour-Coding and Notes Simplification

Presentation and UX polish only on `/my-ttc-journey`. No schema, RLS, auth, AI, routes, cycle maths, logging, calculator, handover, SEO or sitemap changes.

## 1. Helpful reading cards with images

`TTCJourneyGuidance.tsx` currently renders four text-only paper tiles. Each card entry gains an imported local image and alt text, using existing approved TTC assets already in `src/assets` (no new generation needed, no remote images):

- Ovulation and fertile window: `ttc-ovulation-signs-journal.jpg`
- Cycle tracking: `ttc-tracking-without-overthinking.jpg`
- Two-week wait: `ttc-coping-two-week-wait.jpg`
- Pregnancy tests: `ttc-pregnancy-tests.jpg`
- Thinking about fertility support: `ttc-fertility-appointment.jpg`
- IVF and treatment guidance: `ttc-ivf-treatment.jpg`

Treatment: a softly framed thumbnail inside the existing paper card rather than a full-bleed blog banner. On mobile the image sits as a rounded square thumbnail beside the title; on wider screens it becomes a short soft-cornered band at the top of the card with a faint sage tint overlay and hairline olive edge, keeping the cream paper and rounded card language. Titles, blurbs, links and Read more actions stay as they are. Images are lazy loaded with width/height set to avoid layout shift.

## 2. Calendar colour-coding

`TTCJourneyCalendar.tsx` keeps every date computation, milestone map, disabled-future rule and click behaviour exactly as it is. Only the day cell rendering and legend change:

- Period start and expected period: soft blush and rose-tinted backgrounds
- Fertile window (start and end): soft sage background
- Likely ovulation: deeper muted olive ring plus filled sage tint
- Possible test day: warm peach or sand background
- Today: framed outline treatment as now, layered over any state
- User logs: solid olive dot marker plus count, unchanged behaviour

Each state carries a soft background plus a small text chip so meaning is never colour-only, and every cell keeps its full aria-label. Colours come from TTC tokens only. Two or three new HSL tokens (for example a rose and a sand state) are added to `src/index.css` under the existing `--stage-ttc-*` group if the current palette cannot express all six states with enough separation, and the mapping lives in `ttcStyles.ts` as a shared constant. No hex values anywhere.

The legend is rebuilt as a readable wrapped list of swatch plus label pairs at normal helper text size, with one line naming each state in plain British English, replacing the current tiny three-item row.

## 3. Notes simplification

The section headed "Small notes for where you may be right now" (`TTCJourneyInsights`) is removed from `/my-ttc-journey`, leaving one private notes area. `TTCNotesSection` keeps its chips, composer, grouped notes, edit and delete behaviour, and calendar integration. Its existing intro paragraph is trimmed to one quiet support line: "Add what helps and leave the rest. Only you can see this." The insights helper and its component file stay in the repo untouched so no logic is deleted; only the page composition drops the section.

## Technical notes

Files in scope: `src/pages/MyTTCJourney.tsx`, `src/components/ttc/journey/TTCJourneyGuidance.tsx`, `src/components/ttc/journey/TTCJourneyCalendar.tsx`, `src/components/ttc/journey/TTCNotesSection.tsx`, `src/components/ttc/journey/ttcStyles.ts`, and `src/index.css` only if new state tokens are required.

Verification at 390px and 1440px across `/my-ttc-journey`, `/setup/trying-to-conceive`, `/ovulation-calculator`, `/trying-to-conceive`, one TTC topic page, one TTC article, one signed-in pregnancy route and one signed-in First Year route. Checks: 44px tap targets, no horizontal overflow, no console errors, no broken images, no hex colours, copy guardrails. Then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run` and `npm run build`.
