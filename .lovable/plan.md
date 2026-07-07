## Phase 7.4b — First Year Batch 2 Image Mappings

Add hero + body image mappings for the four newly published Batch 2 articles by extending `src/components/firstyear/article/firstYearArticleImages.ts`. No other files change.

### Asset selection (existing assets only)

All chosen assets have been verified to exist in `src/assets/`. No Family assets used. If any import fails at build time, substitute the closest existing postpartum or First Year asset from `src/assets/`.

1. **healing-after-birth**
   - Hero: `@/assets/postpartum-stage-early-days.jpg` — "A parent resting quietly at home in the early days after birth"
   - Body (`afterSectionIndex: 1`): `@/assets/postpartum-scene.jpg` — "A calm postpartum recovery moment at home"
   - Caption: "Healing after birth is gradual, and rest counts even when it comes in small pieces."
   - Comment: `// bespoke future: parent resting after birth in soft natural light`

2. **what-recovery-can-feel-like**
   - Hero: `@/assets/postpartum-stage-early-weeks.jpg` — "A new parent in a reflective home moment during early recovery"
   - Body (`afterSectionIndex: 1`): `@/assets/postpartum-journey.jpg` — "A gentle support moment with baby nearby"
   - Caption: "Recovery is rarely a straight line, and support can make it easier to move through."
   - Comment: `// bespoke future: new parent being supported during everyday recovery`

3. **body-changes-after-birth**
   - Hero: `@/assets/postpartum-stage-adjustment.jpg` — "A soft postpartum moment at home, respectful and non-clinical"
   - Body (`afterSectionIndex: 1`): `@/assets/guidance-postpartum.jpg` — "A calm parent care detail after birth"
   - Caption: "Your body has been through a major change, and it deserves time and care."
   - Comment: `// bespoke future: respectful postpartum body-care moment without bounce-back framing`

4. **hormones-sweat-and-hair-loss**
   - Hero: `@/assets/guidance-postpartum.jpg` — "A calm parent in a quiet home moment after birth"
   - Body (`afterSectionIndex: 1`): `@/assets/home-emotional.jpg` — "A soft morning self-care moment"
   - Caption: "Hormonal changes after birth can feel intense, but many shifts settle with time."
   - Comment: `// bespoke future: gentle postpartum self-care scene in warm morning light`

Note: `guidance-postpartum.jpg` is reused (article #3 body, article #4 hero) as it is the strongest respectful postpartum asset available; flagged for bespoke-future replacement.

### Implementation

- Add four new imports at the top of `firstYearArticleImages.ts`.
- Add four entries to `firstYearArticleImageMap` following the existing shape (hero + one body item at `afterSectionIndex: 1`), each preceded by its bespoke-future comment.
- Leave existing Batch 1 mappings untouched.

### Verification

- `tsgo`
- Playwright at 1280×1800 and 375×812 on the four Batch 2 article routes: hero renders, one body image between section 2 and 3, medical review line present, sources render, related guidance filters drafts, no horizontal overflow, no placeholders.
- Batch 1 spot-check: `/first-year/sleep/newborn-sleep-expectations`, `/first-year/care-and-safety/safe-sleep-and-home-safety`.
- Cross-site regression: `/family/health-safety/making-your-home-safer`, `/articles/complete-guide-morning-sickness`, `/toddler`.

### Out of scope

Article copy, statuses, sources, SEO, components, routes, new assets, other hubs, `.lovable/plan.md`.

### Return summary

Files edited · four Batch 2 articles mapped · hero per article · body per article · bespoke-future comments added · tsgo · route verification · cross-site regression · whether safe to proceed to First Year Feeding batch.
