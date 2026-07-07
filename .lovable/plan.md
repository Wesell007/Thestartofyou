## Phase 7.6b — First Year Development Image Mappings

Add hero + body image mappings for the two newly published Development articles in `src/components/firstyear/article/firstYearArticleImages.ts`. No other files touched.

### Mappings to add

**1. `baby-development-in-the-first-year`**
- `// bespoke future: baby exploring through play with a parent nearby in soft natural light`
- Hero: `@/assets/firstyear-stage-6-9.jpg` — alt: `A baby exploring movement and play in a calm first-year home setting`
- Body (afterSectionIndex 1): `@/assets/guidance-card-development.jpg` — alt: `A parent and baby sharing a warm play and connection moment` — caption: `Development is not just milestones. It grows through movement, play, communication and connection.`

**2. `when-milestones-feel-uneven`**
- `// bespoke future: reassuring parent and baby development moment without clinical or comparison framing`
- Hero: `@/assets/firstyear-stage-9-12.jpg` — alt: `A baby in a gentle everyday development moment at home`
- Body (afterSectionIndex 1): `@/assets/guidance-card-milestones.jpg` — alt: `A calm parent and baby moment during the first year` — caption: `Uneven development can feel worrying, but noticing patterns over time can help you know when to ask for advice.`

Note: swapped the suggested `guidance-card-bonding.jpg` / `firstyear-journey.jpg` for `guidance-card-development.jpg` / `guidance-card-milestones.jpg` — both exist in `src/assets` and are more topically aligned with development/milestones. If you'd prefer the exact suggested assets, say so and I'll switch back.

### Implementation
- Add two new imports at the top of `firstYearArticleImages.ts`.
- Add two entries to `firstYearArticleImageMap`, each with the bespoke future comment above it.

### Verification
- `tsgo` typecheck.
- Playwright (1280×1800 and 375×812) on both Development article routes: confirm hero, one body image between section 2 and 3, medical review line, sources, related cards, no placeholder, no horizontal overflow on mobile.
- Regression: `/first-year/feeding/newborn-feeding-rhythms`, `/first-year/postpartum-recovery/healing-after-birth`, `/first-year/sleep/newborn-sleep-expectations`, `/family/health-safety/making-your-home-safer`, `/articles/complete-guide-morning-sickness`, `/toddler`.

### Out of scope
Article data, statuses, sources, SEO, components, routes, other hubs, new assets, `.lovable/plan.md`.
