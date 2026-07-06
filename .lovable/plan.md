# Phase 4.8 — Pregnancy Cornerstone QA and Relinking Plan

Audit only. No files changed. `tsgo` not required.

## 1. Cornerstone health check

All four upgraded articles pass every Flagship criterion:

| Slug | Renders via | quickAnswer | editorialSections | keyTakeaways | faq | sources | reviewedBy | topic | relatedSlugs resolve |
|---|---|---|---|---|---|---|---|---|---|
| first-trimester-complete-guide | ArticleFlagshipTemplate | Y | Y | Y | Y | Y | Jenny Joines | body | all 5 OK |
| second-trimester-complete-guide | ArticleFlagshipTemplate | Y | Y | Y | Y | Y | Jenny Joines | body | all 5 OK |
| third-trimester-complete-guide | ArticleFlagshipTemplate | Y | Y | Y | Y | Y | Jenny Joines | body | all 5 OK |
| emotional-wellbeing-pregnancy | ArticleFlagshipTemplate | Y | Y | Y | Y | Y | Jenny Joines | feelings | all 5 OK |

Related-slug resolution (spot-checked against `articleData.ts`): every referenced slug exists as a live article.

## 2. Current link map

**first-trimester-complete-guide**
- `src/pages/trimester/FirstTrimester.tsx` line 93 (Phase 4.5 card)
- `src/pages/WeekPage.tsx` line 169 (generic template's early-weeks reads)
- `src/components/article/ArticleHeroImage.tsx` (hero image map)
- Referenced in `emotional-wellbeing-pregnancy` `relatedSlugs`

**second-trimester-complete-guide**
- `src/pages/trimester/SecondTrimester.tsx` line 88 (Phase 4.5 card)
- `src/pages/WeekPage.tsx` lines 178, 190
- `src/components/article/ArticleHeroImage.tsx`

**third-trimester-complete-guide**
- `src/pages/trimester/ThirdTrimester.tsx` line 88 (Phase 4.5 card)
- `src/pages/WeekPage.tsx` lines 198, 213
- `src/components/article/ArticleHeroImage.tsx`

**emotional-wellbeing-pregnancy**
- `src/pages/WeekPage.tsx` line 183 (second-trimester read)
- `src/data/ttcTopicData.ts` line 112, `src/data/ivfTopicData.ts` line 138 (used as the emotional-wellbeing anchor for TTC/IVF flows)
- Article-side image maps in `PregnancyTopicPage.tsx`, `TTCTopicPage.tsx`, `TTCSubtopicPage.tsx`, `IVFTopicPage.tsx`
- Referenced by `first-trimester-complete-guide` and other feelings articles as a related slug (via image map)

**Not linked from:** `src/data/pregnancyTopicData.ts` — none of the four cornerstones appears in any pregnancy topic group. This is the main gap.

## 3. Weak / duplicate link check (live surfaces)

- `writing-a-birth-plan` — present only in `WeekPage.tsx` (line 203) and inside other articles' `relatedSlugs`. Not in pregnancy topic groups. Leave alone for now.
- `nausea-in-early-pregnancy` — present in `WeekPage.tsx` (line 158) and IVF topic data (line 142). `pregnancyTopicData.ts` correctly uses the canonical `complete-guide-morning-sickness` instead.
- `ovulation-signs` vs `signs-of-ovulation` — TTC only, not in pregnancy scope; out of phase.
- No weak trimester duplicates found in pregnancy surfaces — the upgraded slugs are the only trimester-guide slugs.

Weak links needing pregnancy-side action: none in `pregnancyTopicData.ts`.

## 4. Thin topic groups

`src/data/pregnancyTopicData.ts`:

- **"Your body in pregnancy" → "Across the trimesters"** (lines 113–118): `links: []` — empty. Natural home for the three trimester complete guides.
- **"Your feelings in pregnancy" → "Emotional wellbeing"** (lines 284–290): 1 link (`the-first-trimester-emotionally`). Natural home for `emotional-wellbeing-pregnancy` as the anchor guide.

Other groups (aches, digestion, bleeding, movement, scans, appointments) are already well populated with matching subject-specific articles; no cornerstone insertion needed.

## 5. Recommended relinking (Phase 4.9)

**Principle:** one cornerstone card per relevant section, natural placement, no duplicates in the same visible group, no changes to well-populated groups.

- `pregnancyTopicData.ts` — "Your body in pregnancy" → "Across the trimesters": add three links, in order:
  - `{ label: "The first trimester: a complete guide", href: "/articles/first-trimester-complete-guide" }`
  - `{ label: "The second trimester: a complete guide", href: "/articles/second-trimester-complete-guide" }`
  - `{ label: "The third trimester: a complete guide", href: "/articles/third-trimester-complete-guide" }`

- `pregnancyTopicData.ts` — "Your feelings in pregnancy" → "Emotional wellbeing" group: prepend one link:
  - `{ label: "Emotional wellbeing in pregnancy", href: "/articles/emotional-wellbeing-pregnancy" }`

- `pregnancyTopicData.ts` — "Your feelings in pregnancy" → `startHere`: consider replacing one entry with `emotional-wellbeing-pregnancy` as the primary anchor. **Deferred**: current `startHere` (Anxiety, First trimester emotionally) is coherent; safer to leave alone in 4.9 and revisit if analytics show it's under-served.

- Trimester landing pages (`FirstTrimester.tsx`, `SecondTrimester.tsx`, `ThirdTrimester.tsx`): already carry the correct card from Phase 4.5. **No change.**

- Week pages: `WeekPage.tsx` generic template already links the correct trimester guide. Individual `WeekXPage.tsx` files were audited in Phase 4.7 for `/guidance` link targets only; adding cornerstone cards inside every week page is out of scope for 4.9 and would risk overload. **Defer** to a later phase if needed.

- No new links inside topic groups for `health-and-safety`, `preparing-for-baby`, `diet-and-exercise`, `baby` — these are covered by subject articles and adding trimester guides would dilute them.

## 6. Slugs to avoid in Phase 4.9

- `writing-a-birth-plan` (unchanged)
- `nausea-in-early-pregnancy` (canonical is `complete-guide-morning-sickness`)
- Any legacy emotional-wellbeing slug other than `emotional-wellbeing-pregnancy`

## 7. Phase 4.9 — proposed implementation prompt

> Phase 4.9 — Relink Pregnancy cornerstones into topic groups
>
> Edit only `src/data/pregnancyTopicData.ts`. No other files. Do not change article data, topic descriptions, intros, `startHere`, or `whatThisCovers`.
>
> 1. In topic `body` → group "Across the trimesters" (currently `links: []`), add exactly three links in order:
>    - "The first trimester: a complete guide" → `/articles/first-trimester-complete-guide`
>    - "The second trimester: a complete guide" → `/articles/second-trimester-complete-guide`
>    - "The third trimester: a complete guide" → `/articles/third-trimester-complete-guide`
> 2. In topic `feelings` → group "Emotional wellbeing", prepend one link:
>    - "Emotional wellbeing in pregnancy" → `/articles/emotional-wellbeing-pregnancy`
>    Keep the existing "The first trimester emotionally" link as the second entry.
>
> Do not touch `startHere`, other groups, other topics, other files, routes, templates, article content, or SEO. Do not add sources. Do not add any weak/duplicate slug (`writing-a-birth-plan`, `nausea-in-early-pregnancy`).
>
> Verify: `tsgo`, load `/pregnancy/body` and `/pregnancy/feelings`, confirm the new cards render inside the correct groups and that clicking each opens the matching Flagship article.

## 8. Risks and ambiguity

- Low risk. The two edits touch a single data file, add valid slugs already present in `articleData.ts`, and slot into groups that are either empty or under-filled.
- Ambiguity: whether to also promote `emotional-wellbeing-pregnancy` into `startHere` for the feelings topic. Recommended deferral, not blocking.

## Summary

- Files changed: none
- Cornerstones healthy and render via ArticleFlagshipTemplate
- `relatedSlugs` all resolve
- No weak/duplicate slugs live in `pregnancyTopicData.ts`
- Main gap: the four cornerstones are not linked from any pregnancy topic group
- Recommend Phase 4.9 minimal edit (single data file, two group updates) — safe to run now.
