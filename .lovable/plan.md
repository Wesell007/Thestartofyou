## Phase 7.5b — First Year Feeding Image Mappings

Add hero + body image mappings for the two newly published Feeding articles by extending `src/components/firstyear/article/firstYearArticleImages.ts`. No other files change.

### Asset selection (existing assets only)

All chosen assets exist in `src/assets/`. No Family assets used. If any import fails at build time, substitute the closest existing First Year or baby-care asset from `src/assets/`.

1. **newborn-feeding-rhythms**
   - Hero: `@/assets/firstyear-stage-0-3.jpg` — "A calm early-days moment between a parent and newborn"
   - Body (`afterSectionIndex: 1`): `@/assets/guidance-card-comfort.jpg` — "A quiet moment of close, responsive care"
   - Caption: "Newborn feeding often finds its rhythm slowly, through small cues and repeated moments."
   - Comment: `// bespoke future: parent feeding newborn calmly in soft natural light`

2. **bottle-and-breastfeeding-questions**
   - Hero: `@/assets/firstyear-scene.jpg` — "A calm, non-judgemental feeding moment at home"
   - Body (`afterSectionIndex: 1`): `@/assets/guidance-card-bonding.jpg` — "A parent and baby in a warm, unhurried feeding moment"
   - Caption: "Feeding can change over time, and support matters more than choosing a perfect path."
   - Comment: `// bespoke future: inclusive feeding scene showing calm, non-judgemental support`

### Implementation

- Add two new imports at the top of `firstYearArticleImages.ts` for the two feeding hero images. Reuse the existing `bodyComfort` and `bodyBonding` imports for body images.
- Add two entries to `firstYearArticleImageMap` following the existing shape (hero + one body item at `afterSectionIndex: 1`), each preceded by its bespoke-future comment.
- Leave all existing Batch 1 and Batch 2 mappings untouched.

### Verification

- `tsgo`
- Playwright at 1280×1800 and 375×812 on:
  - `/first-year/feeding/newborn-feeding-rhythms`
  - `/first-year/feeding/bottle-and-breastfeeding-questions`
  Confirm hero renders, one body image between section 2 and 3, medical review line present, sources render, related guidance shows ready articles, no placeholders, no horizontal overflow.
- Spot-check earlier ready articles: `/first-year/sleep/newborn-sleep-expectations`, `/first-year/postpartum-recovery/healing-after-birth`, `/first-year/body-and-hormones/body-changes-after-birth`.
- Cross-site regression: `/family/health-safety/making-your-home-safer`, `/articles/complete-guide-morning-sickness`, `/toddler`.

### Out of scope

Article copy, statuses, sources, SEO, components, routes, new assets, other hubs, `.lovable/plan.md`.

### Return summary

Files edited · two Feeding articles mapped · hero per article · body per article · bespoke-future comments added · tsgo · route verification · cross-site regression · whether safe to proceed to the next First Year publishing batch.
