## Phase 9.14 — TTC Article Batch 3: Fertility and Support

Publish 5 flagship fertility support articles and restructure the fertility topic page into a curated 3-group layout.

### 1. Duplicate check (verified)

None of the proposed slugs exist in `src/data/articleData.ts`:
- `when-to-ask-for-fertility-help` — new (distinct from existing `how-long-to-try-before-getting-help`)
- `unexplained-fertility-concerns` — new
- `age-and-trying-to-conceive` — new
- `male-fertility-when-trying-to-conceive` — new (complements `sperm-health-basics` and `fertility-tests-for-men`)
- `moving-from-ttc-to-ivf` — new

Existing related articles to link into (not duplicate): `how-long-to-try-before-getting-help`, `fertility-tests-for-men`, `fertility-tests-for-women`, `what-happens-at-a-fertility-appointment`, `irregular-periods-and-trying-to-conceive`, `sperm-health-basics`, `partner-health-before-pregnancy`, `preconception-gp-appointment`, `mental-wellbeing-before-pregnancy`, `emotional-impact-of-ivf`.

### 2. Generate 5 images in `src/assets/`

- `ttc-when-to-ask-help.jpg` — journal, list, tea, calendar
- `ttc-unexplained-fertility.jpg` — open notebook, abstract question marks, botanical
- `ttc-age-and-ttc.jpg` — calendar + journal, time-based but calm
- `ttc-male-fertility-support.jpg` — two mugs, shared notes, partner-support
- `ttc-moving-to-ivf.jpg` — notebook with pathway layout, soft neutral

Calm, premium, sage/cream palette. No brand names, no readable text, no clinical imagery.

### 3. Append 5 flagship articles to `src/data/articleData.ts`

Each: `slug`, `title`, `metaDescription`, `quickAnswer`, `readTime`, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`, `journey: ["trying-to-conceive"]`, 5–6 `keyTakeaways`, 5–7 `editorialSections`, 3 `faq`, 3–5 structured `sources` (NHS, NICE, HFEA, RCOG, British Fertility Society, GOV.UK), `hero`, `relatedSlugs`, `relatedStage: "trying-to-conceive"`.

Content intent per the brief. Careful language ("may / might / can / often / possible"). UK English. No em dashes. Banned-language sweep.

Related-slug pattern for each: one sibling from this batch + one existing fertility/preconception article + one IVF/male/age/emotional link (max ~3 per article).

### 4. Update `src/data/ttcTopicData.ts`

Extend `LIVE` map:
```ts
whenToAskFertilityHelp: "/articles/when-to-ask-for-fertility-help",
unexplainedFertilityConcerns: "/articles/unexplained-fertility-concerns",
ageAndTryingToConceive: "/articles/age-and-trying-to-conceive",
maleFertilityWhenTTC: "/articles/male-fertility-when-trying-to-conceive",
movingFromTTCToIVF: "/articles/moving-from-ttc-to-ivf",
```

Rebuild `ttcPageConfigs.fertility.groups` into three curated sections, preserving all existing live links:

- **When to ask for support** — How long to try before getting help, When to ask for fertility help, Preconception GP appointment, When fertility feels unexplained, Irregular periods and trying to conceive.
- **Understanding fertility factors** — Age and trying to conceive, Male fertility when trying to conceive, Sperm health basics, Fertility tests for men, Fertility tests for women, AMH test explained.
- **Tests, treatment and next steps** — What happens at a fertility appointment, Moving from TTC to IVF, IVF hub (`/ivf`), Pregnancy after loss, The two-week wait.

Keep `startHere`, hero, intro, AI prompts, "What this covers", colours, curationNote unchanged. No new curation note.

### 5. Wire images

- `src/components/ttc/TTCTopicPage.tsx`: import 5 new assets and add entries to `HREF_IMAGE_MAP` for the 5 new hrefs.
- `src/components/article/flagship/flagshipImageMap.ts`: import same 5 assets, add to `flagshipHeroMap` with topic-specific alt text.

### 6. Verification

- `bunx tsgo --noEmit` clean.
- Grep new copy for em dashes and banned terms.
- Confirm no duplicate slugs; all `relatedSlugs` resolve.
- Spot-check regression routes: `/trying-to-conceive/fertility`, all 5 new article routes, `/trying-to-conceive/{preconception-health,ovulation,male-fertility,age-and-fertility}`, `/ivf`, `/ovulation-calculator`, `/my-ttc-journey`.
- Confirm Ovulation, Preconception, IVF hubs, calculators, TTC Journey, SEO, sitemap, robots, redirects untouched.

### Files touched

- `src/data/articleData.ts` (append 5 articles)
- `src/data/ttcTopicData.ts` (LIVE map + fertility 3-group rebuild)
- `src/components/ttc/TTCTopicPage.tsx` (5 image imports + HREF_IMAGE_MAP entries)
- `src/components/article/flagship/flagshipImageMap.ts` (5 image imports + flagshipHeroMap entries)
- 5 new `src/assets/ttc-*.jpg`
