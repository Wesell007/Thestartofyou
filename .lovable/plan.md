# Phase 28I close-out: headline duplication confirmation

## Confirmed in the current code (read this turn)

- `src/lib/ttcSupportMoment.ts` line 120: the support moment `POSSIBLE_TEST_DAY` has `heading: "Testing when you feel ready"`. Its only use of "You may be near a possible test day" is in `today.headline`, which the Today card consumes.
- `src/components/ttc/journey/TTCTodayCard.tsx` line 79: the Today card stage copy keeps `"You may be near a possible test day"`.
- `TTCSupportMomentCard.tsx` renders `moment.heading`, so the support card shows "Testing when you feel ready".

So on `/my-ttc-journey` in the test window the live pair is:

```text
Today card:   You may be near a possible test day
Support card: Testing when you feel ready
```

The screenshot showing the duplicate was taken before the fix. No micro-copy change is needed.

## What this plan does

No code changes. Only re-run the three verification commands to confirm the tree is green:

- `npx tsgo --noEmit -p tsconfig.json`
- `npx vitest run`
- `npm run build`

Then report and close Phase 28I. No logic, routes, schema, AI, cycle maths, logging, handover, SEO or sitemap changes.
