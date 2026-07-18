# Phase 9.12b — TTC Article Batch 1B: Ovulation P1

## Files to edit
1. `src/data/articleData.ts` — append 4 full flagship-shape `ArticleData` entries before the closing `];`.
2. `src/data/ttcTopicData.ts` — extend `LIVE` map with 4 new keys and rebuild `ttcPageConfigs.ovulation.groups` into three curated grouped sections.

No other files change. Routes, redirects, sitemap generator, robots, SEO helper, calculators, TTC Journey code, `ttcFlagshipOverrides.ts`, and all non-TTC content stay untouched.

## Articles to add
All four use the full existing `ArticleData` schema (legacy fields plus `keyTakeaways`, `editorialSections`, structured `sources`, `hero`, `faq`) so they render on the flagship template. All are `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`. No em dashes anywhere in new copy. No banned TTC language. UK English throughout.

Each article: 5–6 key takeaways · 5–7 editorial sections · 3 FAQ · 3–5 structured NHS/NICE/HFEA/RCOG sources.

### 1. `late-ovulation-and-ttc`
- Title: "Late ovulation and trying to conceive"
- Sections: what late ovulation means · common reasons cycles shift (illness, stress, travel, sleep, breastfeeding, coming off contraception, natural variation) · why late ovulation makes period and test timing confusing · when a late period may not mean pregnancy · how tracking, mucus and tests can help · when to seek support (gentle-warning callout: cycles often very long or absent)
- Related slugs: `when-ovulation-is-hard-to-predict`, `how-to-know-when-you-are-ovulating`, `using-ovulation-tests`
- Hero: `src/assets/ttc-stage-cycle.jpg`

### 2. `when-ovulation-is-hard-to-predict`
- Title: "When ovulation is hard to predict"
- Sections: why ovulation can be hard to read · irregular cycles · when signs feel unclear · hormonal conditions in careful non-diagnostic language (PCOS mentioned as one possibility, not a diagnosis) · coming off contraception and postpartum/breastfeeding cycle return · using tracking without obsessing (reassurance callout) · when to ask for help (gentle-warning callout)
- Related slugs: `late-ovulation-and-ttc`, `using-ovulation-tests`, `cervical-mucus-and-fertility`
- Hero: `src/assets/ttc-stage-waiting.jpg`

### 3. `timing-sex-when-trying-to-conceive`
- Title: "Timing sex when trying to conceive"
- Tone: calm, emotionally aware, no explicit or clinical language.
- Sections: timing around the fertile window · why exact timing is only an estimate · why regular, pressure-free frequency matters more than perfect timing · using the window without making intimacy feel scheduled · partner communication · what to do if timing becomes stressful (reassurance callout) · when to seek medical support if there are known concerns
- Related slugs: `understanding-your-fertile-window`, `how-to-know-when-you-are-ovulating`, `fertile-window`
- Hero: `src/assets/ttc-stage-timing.jpg`

### 4. `basal-body-temperature-tracking`
- Title: "Basal body temperature tracking"
- Explicitly frames BBT as retrospective, not predictive. Never claims BBT proves ovulation.
- Sections: what basal body temperature means · how BBT can shift after ovulation · why it is retrospective rather than predictive · how to track consistently if you choose to · common reasons readings vary (sleep, illness, alcohol, timing) · when BBT becomes stressful or unhelpful (gentle-warning callout) · how it fits alongside mucus, tests and cycle tracking
- Related slugs: `how-to-know-when-you-are-ovulating`, `cervical-mucus-and-fertility`, `using-ovulation-tests`
- Hero: `src/assets/week2-ovulation.jpg`

`signs-of-ovulation` is never referenced (redirect preserved).

## Ovulation topic page grouping

Extend the `LIVE` map in `src/data/ttcTopicData.ts` with:
```
lateOvulation: "/articles/late-ovulation-and-ttc",
hardToPredictOvulation: "/articles/when-ovulation-is-hard-to-predict",
timingSexTTC: "/articles/timing-sex-when-trying-to-conceive",
basalBodyTemperature: "/articles/basal-body-temperature-tracking",
```

Rebuild `ttcPageConfigs.ovulation.groups` into three curated sections:

```text
Understanding ovulation
description: What ovulation is, when it happens, and what your body may show.
  - How to know when you are ovulating
  - Ovulation signs
  - Understanding your fertile window
  - The fertile window

Tracking and timing
description: Practical ways to notice your fertile window without pressure.
  - How to use ovulation tests
  - Cervical mucus and fertility
  - Basal body temperature tracking             (new)
  - Cycle tracking
  - Ovulation calculator

When timing feels unclear
description: Support for cycles, signs or timing that do not feel easy to read.
  - Late ovulation and trying to conceive       (new)
  - When ovulation is hard to predict           (new)
  - Timing sex when trying to conceive          (new)
  - Irregular periods and trying to conceive    (existing, confirmed live at line 15448)
```

- `startHere` (calculator anchor), `intro`, `whatThisCovers`, `aiPrompts`, `heroImage`, `accentHsl`, `tintHsl` unchanged.
- `curationNote` remains omitted.

## Editorial guardrails
- No em dashes; en dashes only inside numeric ranges (prefer worded ranges e.g. "12 to 24 hours").
- No banned terms: safe/unsafe days, guaranteed, perfect timing, confirmed ovulation, you are pregnant / not pregnant, fertility score.
- No claim that a positive OPK confirms ovulation. No claim that BBT proves ovulation.
- Uses may / might / can / often / possible / estimate / guide / if unsure speak to a GP or fertility clinic.
- Standard UK 12-month / 6-month-over-35 guidance included where relevant.
- Structured `sources` only, all real NHS / NICE / HFEA / RCOG URLs. No inline URLs in body copy.
- `reviewedBy: "Jenny Joines"` on every article.

## Image status
Reusing 4 on-brand assets already in `src/assets/` (`ttc-stage-cycle.jpg`, `ttc-stage-waiting.jpg`, `ttc-stage-timing.jpg`, `week2-ovulation.jpg`). No new images generated. If dedicated BBT / late-ovulation heroes are wanted later, flagged as optional polish for a future phase.

## Verification I will run after edits
1. `bunx tsgo --noEmit`.
2. Grep new blocks for em dashes and banned terms.
3. Grep new slugs to confirm no duplicates and that `signs-of-ovulation` is not linked.
4. Route smoke: `/trying-to-conceive/ovulation`, each of the 4 new `/articles/…` routes, the 4 P0 slugs, `/articles/ovulation-signs`, `/articles/fertile-window`, `/articles/signs-of-ovulation` (redirect intact), `/ovulation-calculator`, `/trying-to-conceive`, `/my-ttc-journey`.
5. Confirm sitemap script auto-picks the 4 new slugs on next `predev` (no script edit needed).

## Out of scope
TTC Journey, calculators, redirects, sitemap generator, robots, SEO helper, `ttcFlagshipOverrides.ts`, route files, non-TTC hubs and articles, `signs-of-ovulation` (stays redirected).

## Next phase (after QA)
Phase 9.13 — Preconception Health Batch (10 articles).
