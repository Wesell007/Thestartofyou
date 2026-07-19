## Phase 9.13a — TTC Article Batch 2A: Preconception Health Foundations

Publish 5 flagship-shape preconception health articles and restructure `/trying-to-conceive/preconception-health` into grouped sections so it stops feeling thin.

### 1. Generate 5 preconception health images

New assets in `src/assets/`, matching the calm sage/cream/journal aesthetic already used across TTC:

- `ttc-preconception-start.jpg` — journal, cup of tea, botanical accents
- `ttc-folic-acid.jpg` — unbranded supplement bottle beside notebook
- `ttc-preconception-vitamins.jpg` — soft flat-lay of unbranded vitamins and greenery
- `ttc-gp-appointment.jpg` — calendar and notes, no medical iconography
- `ttc-stopping-contraception.jpg` — calendar with soft botanical detail

No brand names, no readable text, no clinical imagery.

### 2. Append 5 full flagship articles to `src/data/articleData.ts`

For each: `slug`, `title`, `metaDescription`, `quickAnswer`, `readTime`, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`, `journey: ["trying-to-conceive"]`, 5–6 `keyTakeaways`, 5–7 `editorialSections`, 3 `faq`, 3–5 structured `sources` (NHS, NICE, RCOG, GOV.UK, HFEA where relevant), `hero` (new asset + alt), `relatedSlugs`, `relatedStage: "trying-to-conceive"`.

Articles:

1. **what-to-do-before-trying-to-conceive** — starter guide: when to start, folic acid, medicines, existing conditions, lifestyle, cycle awareness, partner health, mental wellbeing, when to speak to a clinician.
2. **folic-acid-before-pregnancy** — what it is, why it matters, when to start, standard UK guidance, higher-dose situations in careful language, signpost to GP/pharmacist.
3. **preconception-vitamins** — folic acid as main recommended, vitamin D per UK guidance, "more is not better", supplements to check with a clinician, label reading, condition/medication interactions.
4. **preconception-gp-appointment** — when it may help, long-term conditions, medicines, previous complications or loss, vaccinations, mental health, age or fertility concerns, what to ask, reassurance if no appointment needed.
5. **stopping-contraception-when-ttc** — general terms for different methods, cycles returning, bleeding patterns, timing variability, fertility can return quickly for some methods, when periods take time to settle, when to seek advice, avoiding pressure to pinpoint ovulation immediately.

Internal links follow the exact map in the brief. Careful language throughout: "may / might / can / often / possible". Signposting only, no dosage instructions. UK English. No em dashes. Banned-language sweep before commit: safe/unsafe days, guaranteed, perfect timing, confirmed ovulation, you are pregnant, you are not pregnant, fertility score.

### 3. Update `src/data/ttcTopicData.ts`

Extend the `LIVE` slug map:

```ts
whatToDoBeforeTTC: "/articles/what-to-do-before-trying-to-conceive",
folicAcidBeforePregnancy: "/articles/folic-acid-before-pregnancy",
preconceptionVitamins: "/articles/preconception-vitamins",
preconceptionGPAppointment: "/articles/preconception-gp-appointment",
stoppingContraceptionTTC: "/articles/stopping-contraception-when-ttc",
```

Rebuild `ttcPageConfigs["preconception-health"].groups`:

- **Start with the basics** — "The first steps that can help you prepare before trying to conceive." → what-to-do-before-trying-to-conceive, folic-acid-before-pregnancy, preconception-vitamins.
- **Health checks and planning** — "When it may help to review your health, medicines or next steps with a professional." → preconception-gp-appointment, stopping-contraception-when-ttc, cycle-tracking (topic link, retained if currently curated).

Keep `startHere`, hero, intro, AI prompts, "What this covers", colours unchanged. Remove any "curation note" that apologises for thinness.

### 4. Wire card and article-hero images

- `src/components/ttc/TTCTopicPage.tsx`: import the 5 new assets and add entries to `HREF_IMAGE_MAP` for the 5 new slugs.
- `src/components/article/flagship/flagshipImageMap.ts`: import the same 5 assets and add entries to `flagshipHeroMap` for the 5 new slugs (mirrors the ovulation polish pattern).

### 5. Verification

- `bunx tsgo --noEmit` clean.
- Grep new copy for em dashes and banned terms.
- Confirm no duplicate slugs; all `relatedSlugs` resolve.
- Spot-check regression routes listed in the brief.
- Confirm ovulation groups, calculators, TTC Journey, SEO, sitemap, robots, redirects untouched.

### Files touched

- `src/data/articleData.ts` (append 5 articles)
- `src/data/ttcTopicData.ts` (LIVE map + preconception groups)
- `src/components/ttc/TTCTopicPage.tsx` (5 image imports + HREF_IMAGE_MAP entries)
- `src/components/article/flagship/flagshipImageMap.ts` (5 image imports + flagshipHeroMap entries)
- 5 new `src/assets/ttc-*.jpg`
