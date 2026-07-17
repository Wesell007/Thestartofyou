
# Phase 9.12a — TTC Article Batch 1A: Ovulation P0 (approved, with grouping clarification)

## Files to edit
1. `src/data/articleData.ts` — append 4 full flagship-shape ArticleData entries before the closing `];`.
2. `src/data/ttcTopicData.ts` — extend `LIVE` map and rebuild `ttcPageConfigs.ovulation.groups` into two curated, grouped sections (per your clarification).

No other files change. Routes, redirects, sitemap generator, robots, SEO helper, calculators, TTC Journey code, `ttcFlagshipOverrides.ts`, and all non-TTC content stay untouched.

## Articles to add
All four use the full existing `ArticleData` schema (legacy fields plus `keyTakeaways`, `editorialSections`, structured `sources`, `hero`, `faq`) so they render on the flagship template. All are `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`. No em dashes in new copy. No banned TTC language. UK English.

### 1. `how-to-know-when-you-are-ovulating`
- Title: "How to know when you are ovulating"
- 5 key takeaways · 3 FAQ · 5 editorial sections (what ovulation is · signs worth noticing · why signs are not exact · if cycles are irregular · using signs without pressure)
- 4 structured sources: NHS periods and fertility, NHS trying to get pregnant, NICE CG156, HFEA.
- Hero: `src/assets/week2-ovulation.jpg`.
- Related slugs: `understanding-your-fertile-window`, `ovulation-signs`, `cervical-mucus-and-fertility`, `fertile-window`.

### 2. `understanding-your-fertile-window`
- Title: "Understanding your fertile window"
- 5 key takeaways · 3 FAQ · 5 editorial sections (what the window is · why it's an estimate · how cycle length changes it · how signs/tests fit in · timing without pressure)
- 4 sources: NHS trying to get pregnant, NHS how long it takes, NICE CG156, HFEA.
- Hero: `src/assets/ttc-stage-timing.jpg`.
- Related slugs: `how-to-know-when-you-are-ovulating`, `fertile-window`, `cervical-mucus-and-fertility`, `ovulation-signs`.

### 3. `using-ovulation-tests`
- Title: "How to use ovulation tests"
- 5 key takeaways · 3 FAQ · 5 editorial sections (what tests do · how to use them · reading results · when tests are less helpful (PCOS/irregular) · when testing becomes stressful)
- Explicitly avoids saying a positive OPK confirms ovulation.
- 4 sources: NHS trying to get pregnant, NHS periods and fertility, NICE CG156, HFEA.
- Hero: `src/assets/ttc-stage-waiting.jpg`.
- Related slugs: `how-to-know-when-you-are-ovulating`, `understanding-your-fertile-window`, `cervical-mucus-and-fertility`, `ovulation-signs`.

### 4. `cervical-mucus-and-fertility`
- Title: "Cervical mucus and fertility"
- 5 key takeaways · 3 FAQ · 6 editorial sections (what it is · how it changes · what fertile-type may look like · what else affects it · when to seek advice (with gentle-warning callout) · using alongside other tools)
- Explicitly avoids saying mucus proves ovulation.
- 4 sources: NHS periods and fertility, NHS vaginal discharge, NHS trying to get pregnant, HFEA.
- Hero: `src/assets/ttc-stage-cycle.jpg`.
- Related slugs: `how-to-know-when-you-are-ovulating`, `understanding-your-fertile-window`, `using-ovulation-tests`, `ovulation-signs`.

`signs-of-ovulation` is never referenced (redirect preserved).

## Ovulation topic page grouping (per your clarification)

Extend the `LIVE` map in `src/data/ttcTopicData.ts` with:
```
howToKnowOvulating: "/articles/how-to-know-when-you-are-ovulating",
understandingFertileWindow: "/articles/understanding-your-fertile-window",
usingOvulationTests: "/articles/using-ovulation-tests",
cervicalMucus: "/articles/cervical-mucus-and-fertility",
```

Replace `ttcPageConfigs.ovulation.groups` with two curated sections (mirroring the fertility page's grouped layout):

```text
Understanding ovulation
description: What ovulation is, when it happens, and what your body may show.
  - How to know when you are ovulating   (new)
  - Ovulation signs                       (existing)
  - Understanding your fertile window     (new)
  - The fertile window                    (existing)

Tracking and timing
description: Practical ways to notice your fertile window without pressure.
  - How to use ovulation tests            (new)
  - Cervical mucus and fertility          (new)
  - Cycle tracking                        (existing subtopic)
  - Ovulation calculator                  (tool)
```

- `startHere` stays as the single calculator anchor.
- `intro`, `whatThisCovers`, `aiPrompts`, `heroImage`, `accentHsl`, `tintHsl` unchanged.
- `curationNote` remains omitted — page no longer needs the "more on the way" apology.

## Editorial guardrails applied
- No em dashes anywhere in new copy (verified pre-write). En dashes only inside numeric ranges (e.g. "12 to 24 hours" written in words instead where possible).
- No banned terms: no "safe/unsafe days", "guaranteed", "perfect timing", "confirmed ovulation", "you are pregnant / not pregnant", "fertility score".
- Uses "may / might / can / often / possible / estimate / guide".
- Standard UK 12-month / 6-month-over-35 guidance included in every article.
- Structured `sources` only, all real NHS / NICE / HFEA URLs.
- `reviewedBy: "Jenny Joines"` on every article.

## Image status
Reusing 4 on-brand assets already in `src/assets/` (`week2-ovulation.jpg`, `ttc-stage-timing.jpg`, `ttc-stage-waiting.jpg`, `ttc-stage-cycle.jpg`). No new images generated. No graphic/clinical imagery. If you later want a dedicated cervical-mucus hero, flagged as an optional polish for a future phase.

## Verification I will run after edits
1. `bunx tsgo --noEmit`.
2. Grep new blocks for em dashes and banned terms.
3. Grep new slugs to confirm no duplicates.
4. Route smoke: `/trying-to-conceive/ovulation`, `/articles/how-to-know-when-you-are-ovulating`, `/articles/understanding-your-fertile-window`, `/articles/using-ovulation-tests`, `/articles/cervical-mucus-and-fertility`, `/articles/ovulation-signs`, `/articles/fertile-window`, `/articles/signs-of-ovulation` (redirect), `/ovulation-calculator`, `/trying-to-conceive`, `/my-ttc-journey`.
5. Confirm sitemap script picks up new slugs automatically on next `predev` (no script edit needed).

## Out of scope
TTC Journey, calculators, redirects, sitemap generator, robots, SEO helper, `ttcFlagshipOverrides.ts`, route files, non-TTC hubs and articles.

## Next phase (after QA of this batch)
Phase 9.12b — Ovulation P1 batch (late ovulation, when ovulation is hard to predict, timing sex when TTC, BBT tracking).
