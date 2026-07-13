
# Phase 9.5f — TTC Insights and Pregnancy Handover

Scope: additive UI on `/my-ttc-journey`. No DB changes. No calculator, SEO, sitemap, robots, hub, or non-TTC page edits.

## Files to create

- `src/lib/ttcInsights.ts` — pure helper. Given `{ stage, journey, logs, today }`, returns an ordered list of 0–4 insight card descriptors from a controlled set. Deterministic, no side effects, no analytics.
- `src/components/ttc/journey/TTCJourneyInsights.tsx` — renders the "Gentle insights for this cycle" section using descriptors from `ttcInsights.ts`. Sage/TTC palette, calm copy, max 4 cards. Each card renders heading, copy, and one CTA (internal link, scroll action, or handover trigger). Emits envelope-only `TTC_INSIGHT_CLICKED` when a CTA is clicked.
- `src/components/ttc/journey/TTCPregnancyHandover.tsx` — final section "Ready to move into pregnancy guidance?" with primary CTA "Start pregnancy guidance" and secondary links to `/due-date-calculator` and `/pregnancy`. Primary CTA opens a shadcn `AlertDialog` confirmation ("Move into pregnancy guidance?" / "Continue to due date calculator" / "Not yet"). On confirm, emits envelope-only `TTC_PREGNANCY_HANDOVER_STARTED` and routes.

## Files to edit

- `src/pages/MyTTCJourney.tsx` — insert `<TTCJourneyInsights />` after the calendar/recent-logs section and before Today's focus. Replace the existing "Positive test soft handover" section at the bottom with `<TTCPregnancyHandover />`. Wire an `onOpenLogPanel` prop so the "No logs yet" insight can open the existing log panel for today. Pass `logs`, `journey`, `derivedStage` down.
- `src/lib/analyticsEvents.ts` — add `TTC_INSIGHT_CLICKED` and `TTC_PREGNANCY_HANDOVER_STARTED`. Envelope-only. No stage, dates, log type, log value, notes, cycle length, or treatment status in properties.

No other files edited. `savedJourney.ts`, `savedTTCJourney.ts`, `ttcLogs.ts`, `ttcDerived.ts`, `types.ts`, `authIntent.ts`, migrations — all untouched.

## Insight logic (controlled set, max 4 cards)

Ordered priority, first 4 win:

1. **Positive pregnancy test noted** — any log with `log_type = pregnancy_test` and `value = positive` in recent logs. CTA: "Start pregnancy handover" → scrolls to handover section.
2. **Period started** — most recent `period` log has `value = started` AND its `log_date >= expected_period_date - 2 days`. CTA: "Update TTC setup" → `/setup/trying-to-conceive`.
3. **Repeated negative/unclear tests** — 2+ `pregnancy_test` logs in the last 14 days with `value` in {`negative`, `unclear`}. CTA: "Ask what to do next" → `/ask?stage=ttc&topic=pregnancy-tests`. No thresholds, no medical language.
4. **Stage-based card** (exactly one, based on `derivedStage`):
   - `before_ovulation` and fertile window starts within 3 days → "Your fertile window may be coming up" → `/trying-to-conceive/ovulation`.
   - `fertile_window` or `likely_ovulation` → "You may be in a more fertile part of this cycle" → `/ask?stage=ttc&topic=fertile-window`.
   - `two_week_wait` → "The wait can feel emotionally loud" → `/trying-to-conceive/two-week-wait`.
   - `test_window` or `expected_period` → "Testing may feel more useful soon" → `/trying-to-conceive/pregnancy-tests`.
5. **No logs yet** — shown only when `logs.length === 0`. CTA: "Add a note" → opens log entry panel for today.

Copy is verbatim from the brief. Language: "may / might / could / when you are ready". Never diagnoses, never confirms ovulation/pregnancy, no fertility score, no safe/unsafe days.

## Handover behaviour (no automation)

- No pregnancy journey is created from `/my-ttc-journey`.
- `journeys.lifecycle` is never switched from this page.
- TTC journey is never archived here.
- `ttc_journeys.positive_test_status` is not touched.
- On confirm:
  - If `journey.last_period_date` is available: `navigate('/due-date-results?lmp=' + lmp.getTime() + '&from=ttc-positive')`. This is the same URL shape the existing `DueDateResults` route already accepts, so calculator formulas remain the source of truth and are unchanged.
  - Otherwise: `navigate('/due-date-calculator?from=ttc-positive')`.
- No `stashPendingJourney` call — pregnancy journey creation continues to happen only through the existing due date results/setup flow.

## Placement on /my-ttc-journey (final order)

```text
Header
Summary grid
Cycle timeline
Cycle calendar and logging
Gentle insights                    ← new
Today's focus
Recommended guidance
Ask about this stage
Update setup
Pregnancy handover                 ← replaces old soft-handover block
```

## Guardrails

- No DB schema changes. No migration.
- No edits to calculator components, calculator formulas, SEO heads, sitemap, robots, public hubs, or Pregnancy/IVF/Family/First Year/Toddler pages.
- No new analytics properties beyond common envelope. If envelope-only cannot be guaranteed for a given call site, that event is dropped.
- Insights capped at 4 cards; empty state renders nothing (section is hidden if zero insights).
- Ask links use fixed topic slugs only — no cycle values, dates, or log data appended.

## Verification

- `bunx tsgo --noEmit` clean.
- Playwright smoke on `/my-ttc-journey` at 375px: insights section renders, handover section renders, no horizontal overflow, confirmation dialog opens and cancels cleanly. Signed-in DB flow reported as a limitation if no session is injected.
- HTTP regression on the 14 listed routes (200 or expected redirect).
- Grep to confirm no new writes to `journeys`, `ttc_journeys`, or `pregnancy_journeys` from the new files.
- Grep to confirm no sensitive props in new analytics call sites.
