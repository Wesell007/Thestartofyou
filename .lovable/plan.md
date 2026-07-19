## Phase 9.13b — TTC Article Batch 2B: Preconception Health Completion

Publish 5 more flagship preconception articles covering medicines, lifestyle, mental wellbeing, partner health and sperm health, and extend the preconception health topic page to three curated groups.

### 1. Generate 5 preconception images

New assets in `src/assets/`, matching the calm sage/cream/journal aesthetic:

- `ttc-medication-review.jpg` — unbranded pill organiser beside notebook and tea
- `ttc-lifestyle-before-pregnancy.jpg` — soft kitchen scene with water, fruit, notebook, botanical
- `ttc-mental-wellbeing-before-pregnancy.jpg` — journal, tea, soft blanket, quiet window light
- `ttc-partner-health.jpg` — two mugs, shared notebook or calendar, no faces
- `ttc-sperm-health-basics.jpg` — abstract partner still life, notebook, botanical

No brand names, no readable text, no clinical imagery.

### 2. Append 5 flagship articles to `src/data/articleData.ts`

For each: `slug`, `title`, `metaDescription`, `quickAnswer`, `readTime`, `reviewedBy: "Jenny Joines"`, `lastUpdated: "July 2026"`, `journey: ["trying-to-conceive"]`, 5–6 `keyTakeaways`, 5–7 `editorialSections`, 3 `faq`, 3–5 structured `sources` (NHS, NICE, RCOG, GOV.UK, UKHSA, HFEA, British Fertility Society where relevant), `hero` (new asset + alt), `relatedSlugs`, `relatedStage: "trying-to-conceive"`.

Articles:

1. **medication-review-before-pregnancy** — why reviewing matters, prescription vs OTC, supplements/herbal, long-term conditions, mental health meds in careful language, do NOT stop without advice, who to speak to, what to bring. Extra care: no dosage instructions, never tell users to stop.
2. **lifestyle-before-pregnancy** — smoking, alcohol, caffeine, food basics, movement, sleep, weight (non-shaming), chronic conditions, partner lifestyle, when to ask for support.
3. **mental-wellbeing-before-pregnancy** — why TTC feels emotional, anxiety, pressure around timing, previous loss in careful terms, partner communication, family/social boundaries, when to seek support. Signpost GP / NHS 111 / local mental health support.
4. **partner-health-before-pregnancy** — shared framing, lifestyle basics, smoking/alcohol/drugs (non-judgemental), sleep and stress, medicines/conditions, sperm health context, communication, when a partner may want to speak to a clinician.
5. **sperm-health-basics** — what sperm health includes, count/movement/shape in simple terms, ~3-month production cycle, lifestyle factors, heat/smoking/alcohol/drugs generally, medicines/anabolic steroids/conditions in careful terms, when to ask for help, how it fits into fertility testing. Avoid blame and overpromising.

Internal links follow the brief. Careful language ("may / might / can / often / possible"). Signposting only. UK English. No em dashes. Banned-language sweep before commit.

### 3. Update `src/data/ttcTopicData.ts`

Extend the `LIVE` slug map:

```ts
medicationReviewBeforePregnancy: "/articles/medication-review-before-pregnancy",
lifestyleBeforePregnancy: "/articles/lifestyle-before-pregnancy",
mentalWellbeingBeforePregnancy: "/articles/mental-wellbeing-before-pregnancy",
partnerHealthBeforePregnancy: "/articles/partner-health-before-pregnancy",
spermHealthBasics: "/articles/sperm-health-basics",
```

Rebuild `ttcPageConfigs["preconception-health"].groups` into three sections:

- **Start with the basics** — "The first steps that can help you prepare before trying to conceive." → what-to-do-before-trying-to-conceive, folic-acid-before-pregnancy, preconception-vitamins.
- **Health checks and planning** — "When it may help to review your health, medicines or next steps with a professional." → preconception-gp-appointment, medication-review-before-pregnancy, stopping-contraception-when-ttc, cycle-tracking.
- **Everyday health and support** — "Support for lifestyle, wellbeing and shared preparation before pregnancy." → lifestyle-before-pregnancy, mental-wellbeing-before-pregnancy, partner-health-before-pregnancy, sperm-health-basics.

Keep `startHere`, hero, intro, AI prompts, "What this covers", colours unchanged. No curation note.

### 4. Wire card and article-hero images

- `src/components/ttc/TTCTopicPage.tsx`: import the 5 new assets and add entries to `HREF_IMAGE_MAP` for the 5 new slugs.
- `src/components/article/flagship/flagshipImageMap.ts`: import the same 5 assets and add entries to `flagshipHeroMap` with descriptive topic-specific alt text.

### 5. Verification

- `bunx tsgo --noEmit` clean.
- Grep new copy for em dashes and banned terms.
- Confirm no duplicate slugs; all `relatedSlugs` resolve.
- Spot-check regression routes listed in the brief.
- Confirm Phase 9.13a articles, ovulation groups, fertility, calculators, TTC Journey, SEO, sitemap, robots, redirects untouched.

### Files touched

- `src/data/articleData.ts` (append 5 articles)
- `src/data/ttcTopicData.ts` (LIVE map + 3-group preconception rebuild)
- `src/components/ttc/TTCTopicPage.tsx` (5 image imports + HREF_IMAGE_MAP entries)
- `src/components/article/flagship/flagshipImageMap.ts` (5 image imports + flagshipHeroMap entries)
- 5 new `src/assets/ttc-*.jpg`
