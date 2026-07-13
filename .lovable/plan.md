## Phase 9.5a — Ovulation Calculator Results UX Redesign

UX-only redesign of the ovulation calculator result experience into a calm, calendar-led cycle dashboard. No SEO, route, formula, or hub changes.

### Files to edit
- `src/components/ttc/OvulationResult.tsx` — internal restructure. Props signature (`lmp`, `cycleLength`, `ovulationDay`, `fertileStart`, `fertileEnd`, `testDay`) unchanged, so `OvulationCalculator.tsx` stays untouched.

### Files to create
- `src/components/tools/OvulationResultCalendar.tsx` — monthly calendar, purely presentational, receives all dates via props.

### Files NOT touched
`src/pages/OvulationCalculator.tsx`, `src/components/seo/SeoHead.tsx`, `src/App.tsx`, all TTC hub/topic, Pregnancy, IVF, Family, First Year, Toddler files, sitemap, robots, article data, calculator formulas, route structure.

### Result experience

1. **Hero summary** — Eyebrow "Your cycle at a glance", H1 "Your fertile window estimate", sub "A calm view of the days that may matter most this cycle." Five compact cards: Fertile window · Likely ovulation · Best days to try · Expected next period · Possible test day. Footnote: "These dates are estimates, not guarantees. Cycles can vary from month to month."
2. **Visual cycle calendar** (new component) — month containing `ovulationDay` with prev/next month buttons. Cells highlight last period start, possible fertile window, likely ovulation, best days to try, expected period, possible test day. Legend beneath with those exact labels. TTC sage/cream palette, rounded, mobile-safe at 375px.
3. **"What this estimate means"** — three short cards using the brief's exact copy.
4. **"What to do now"** — four rows using the brief's copy: Try on the best days · Notice, but do not overtrack · Test after your expected period · Be kind to yourself if it does not happen.
5. **"What's happening for you?"** — three real navigation cards (removes the modal): My period arrived → clears saved cycle + `/ovulation-calculator#calculator`; My period is late → `/trying-to-conceive/pregnancy-tests`; I got a positive test → primary `/due-date-calculator?lmp=<iso>&from=ttc`, secondary link to `/pregnancy`.
6. **"Save this cycle"** — refreshed heading/copy, existing localStorage save + reminder toggles intact. Secondary chips: Ask → `/ask?stage=ttc&topic=fertile-window`, Read TTC guidance → `/trying-to-conceive`.
7. **"Ask about this cycle"** — four prompt chips from brief, each linking `/ask?stage=ttc&topic=<slug>&q=<encoded>`, no auto-submit.
8. **Related guidance** — replaces broken placeholder links with four real TTC routes: `/trying-to-conceive/ovulation`, `/cycle-tracking`, `/two-week-wait`, `/pregnancy-tests`.

### Calendar technical notes
Props: `{ lmp, fertileStart, fertileEnd, ovulationDay, bestDays[3], nextPeriod, testDay }`. Marker priority per cell: ovulation > best-day > fertile-window > period-start > expected-period > test-day > plain. Styles use tokens `--stage-ttc`, `--stage-ttc-accent`, `--terracotta`, `--sage` only. No new colour tokens.

### Language guardrails
Never renders "safe period", "unsafe day(s)", contraception wording, or guarantee wording. Uses "possible fertile window", "likely ovulation", "best days to try", "expected period", "possible test day".

### Preservation guarantees
- Formulas unchanged: `ovulationDay = lmp + cycleLength − 14`, `fertileStart = ov − 5`, `fertileEnd = ov + 1`, `testDay = ov + 15`, `nextPeriod = lmp + cycleLength`.
- Existing localStorage save + reminder logic kept.
- `SeoHead` on `OvulationCalculator.tsx` untouched → canonical `/ovulation-calculator`, title, description, OG unchanged. Duplicate `/trying-to-conceive/ovulation-calculator` still renders same component with same canonical.

### Verification
`bunx tsgo --noEmit` clean. Playwright at 1280×1800 and 375×812 on both calculator routes with `?lmp=2026-06-16&cycle=28`. Grep for banned language ("safe period", "unsafe day", "guaranteed") — zero hits. Regression smoke on `/trying-to-conceive`, `/trying-to-conceive/ovulation`, `/due-date-calculator`, `/due-date-results`, `/pregnancy`, `/first-year`, `/toddler`, `/family`, `/ivf`.
