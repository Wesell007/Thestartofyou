
# Phase 9.5a.1 — Ovulation Calculator Results Refinement

Refine the result-state experience so users land on their fertile-window estimate rather than the calculator form. Sharpen typography, add a compact adjust-dates panel, and strengthen the Save-cycle CTA.

## Files to edit

- `src/pages/OvulationCalculator.tsx`
- `src/components/ttc/OvulationResult.tsx`

## Files NOT touched

`SeoHead.tsx`, `App.tsx`, calendar component, TTC hub/topic, Pregnancy, IVF, Family, First Year, Toddler, sitemap, robots, article data, calculator formulas, route structure.

## 1. Result-first page layout

In `OvulationCalculator.tsx`, wrap conditionally:

```tsx
<main>
  {data ? (
    <div id="results" className="pt-[92px] md:pt-[112px]">
      <OvulationResult {...data} />
    </div>
  ) : (
    <>
      <Hero />
      <CalculatorForm />
    </>
  )}
  <HowItWorks />
  <Disclaimer />
  <Related />
  <PageClose />
</main>
```

The result state skips the marketing hero and full form entirely; the no-result state keeps the current calculator-first layout unchanged. Top padding compensates for the fixed navbar since the result section becomes the first paint.

## 2. Adjust-dates panel

Inside `OvulationResult.tsx`, add a compact panel after the summary cards (before the calendar):

- Heading "Need to adjust your dates?"
- Copy "Change your last period date or usual cycle length and recalculate your estimate."
- Trigger button "Adjust my dates" toggles an inline form (LMP date, cycle length 20-45, "Recalculate" submit).
- Submit uses `useLocation().pathname` to preserve the current route (canonical `/ovulation-calculator` or duplicate `/trying-to-conceive/ovulation-calculator`), pushing `?lmp=…&cycle=…`.
- No fresh full hero form appears above the result at any point.

The "My period arrived → Start a new cycle" button in the "What's happening for you?" block also switches to `location.pathname` instead of hardcoding `/ovulation-calculator`.

## 3. Typography and readability

Across the result component:

- Remove faint opacity fades on primary copy (`text-foreground/60`, `/70`, `/85` → `text-foreground` or `text-muted-foreground`).
- Bump key-date card values from `text-[1.1rem]` to `font-serif text-[1.35rem] sm:text-[1.5rem] text-foreground` for scannable dates.
- Stronger meta lines: `text-[13px] text-muted-foreground` (drop `font-light` where copy is small).
- Result hero footnote uses `text-muted-foreground` not `text-foreground/60`.
- Ask-prompt rows: text is `text-foreground` not `text-foreground/85`.
- Palette unchanged: TTC sage/cream via `--stage-ttc*`, sage, terracotta CTA, lavender for pregnancy handover.

## 4. Save-cycle CTA rewrite

Rewrite that section's copy:

- Heading: "Save this cycle"
- Sub: "Keep this fertile window, likely ovulation day, possible test day and next steps in one place so you can come back when you need to."
- Body: "We will help you return to the right guidance for where you are in this cycle, whether you are waiting, testing or starting again."
- Reminder rows relabelled as "Keep a note" preferences (not push-notification promises).
- Primary CTA: "Save this cycle to my TTC journey" on desktop, "Save to my TTC journey" on mobile (responsive spans).
- Saved state: "Cycle saved. You can come back to this estimate and your next steps whenever you need them." confirmation line under the disabled button.
- Secondary links unchanged: "Ask about this cycle" → `/ask?stage=ttc&topic=fertile-window`, "Read TTC guidance" → `/trying-to-conceive`.
- Save behaviour stays localStorage-only; existing hydration/toggle logic untouched.

## 5. Pregnancy handover

Keep the "I got a positive test" card intact: primary → `/due-date-calculator?lmp=…&from=ttc`, secondary → `/pregnancy`. Copy stays "Move into pregnancy guidance when you are ready." Position stays after Save-cycle, not above the main result.

## 6. Preservation

- Formulas untouched (`lmp`, `cycleLength − 14`, `−5`, `+1`, `+15`, `+cycleLength`).
- `SeoHead` on `OvulationCalculator.tsx` untouched: title, description, canonical `https://thestartofyou.com/ovulation-calculator`.
- Duplicate `/trying-to-conceive/ovulation-calculator` still routes to the same page with the same canonical.
- No Article JSON-LD added.
- Banned language absent: "safe period", "unsafe day", "guaranteed", "perfect timing".

## Verification

- `bunx tsgo --noEmit`.
- Playwright at 1280×1800 and 375×812 on `/ovulation-calculator?lmp=2026-06-16&cycle=28` and `/trying-to-conceive/ovulation-calculator?lmp=2026-06-16&cycle=28` — confirm the first visible section is "Your fertile window estimate", adjust-dates panel works, calendar renders, Save CTA visible.
- Playwright on `/ovulation-calculator` (no params) — calculator-first layout intact.
- `rg` banned-language sweep in edited files → zero hits.
- Regression smoke: `/trying-to-conceive`, `/trying-to-conceive/ovulation`, `/due-date-calculator`, `/due-date-results`, `/pregnancy`, `/first-year`, `/toddler`, `/family`, `/ivf`.
