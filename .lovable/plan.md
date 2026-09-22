# Phase 37B plan

## Repository truth

- `/first-year` is the live First Year hub.
- The repository contains 4 Baby topics, 4 Postpartum topics, 4 phase pages, 13 month destinations and 26 ready First Year articles.
- Phase 37A.1 is formally recorded as closed pass. Its current suppression map contains 15 intentionally image-free article heroes and is the authority for Phase 37B. These decisions will not be overridden.
- The current generated sitemap contains 352 unique URLs, has 0 duplicates and does not contain either proposed route. With only the two intended additions, the expected result is 354 unique URLs, a delta of +2.
- The `Open baby's first year` action currently uses `#baby`, and `Open your recovery` uses `#recovery`. Neither fragment exists on the hub, so both actions are dead.
- The hub hero separately links to the valid `#baby-topics` and `#recovery-topics` fragments.
- `/first-year/baby` and `/first-year/postpartum` do not currently exist. The route table has no conflict with either path when they are registered above the generic First Year article route.
- Current article ownership is 15 Baby articles and 11 Postpartum articles. The 15 intentional image-free decisions from Phase 37A.1 remain authoritative.

## Build

### 1. Establish the visual direction gate

- Generate `src/assets/first-year-pathway-phase-direction-board.png` with Nano Banana before production visual changes.
- Cover both pathway cards, both pathway page heroes, all four phase identities, topic thumbnail treatment and one phase-page image break treatment.
- Review the board for age plausibility, infant safety, anatomy, feeding and sleep safety, realistic UK-home context, crop resilience and equal Baby/Postpartum visual weight.
- Keep the board out of the rendered site and document the direction decision.

### 2. Add two editorial pathway pages

Create `/first-year/baby` and `/first-year/postpartum` as thin route pages using a shared First Year pathway template and existing data sources.

**Baby page order**

1. Breadcrumb and editorial hero
2. Short orientation
3. Four Baby topic pathways
4. Four phases
5. Separate 13-month navigation
6. Curated Start Here guidance
7. Complete grouped Baby library
8. One contextual Companion handoff
9. Postpartum cross-link
10. Return to First Year

**Postpartum page order**

1. Breadcrumb and editorial hero
2. Short orientation
3. Four Postpartum topic pathways
4. Recovery across the four existing phases
5. Curated Start Here guidance
6. Complete grouped Postpartum library
7. Existing support and warning-sign destinations
8. One contextual Companion handoff
9. Baby cross-link
10. Return to First Year

Use the 26 existing ready records only. Each pathway page will curate one existing Start Here article per topic: 4 Baby Start Here plus 11 remaining Baby articles equals 15, and 4 Postpartum Start Here plus 7 remaining Postpartum articles equals 11. Start Here records will be excluded from the grouped library, giving 0 duplicate and 0 missing owned articles. Pathway copy will be limited to unique short orientation, headings, concise descriptions and existing metadata. Existing article paragraphs and substantial topic-page body copy will not be copied. No medical timeline, medical precision or new guidance will be invented.

Each new pathway page will contain exactly one embedded contextual Companion after its primary editorial discovery. The global floating launcher is platform chrome and is excluded from embedded-module counts. No canonical surface may render duplicate embedded Companion modules.

### 3. Repair and strengthen hub discovery

- Point the two primary pathway cards and the two hero pathway actions to the new dedicated pages.
- Use clear labels: `Explore baby's first year` and `Explore postpartum recovery`.
- Rebuild the two pathway cards with one strong image each, eyebrow, heading, concise orientation, four topic names and one clear action, while preserving equal visual weight.
- In `Everything, side by side`, keep exactly one strong pathway image per side. Topic thumbnails remain optional and appear only when an approved asset is relevant, legible at small scale and materially improves scanning. Image-free topic rows remain first-class, and no row requires photography for symmetry.
- Upgrade `Twelve months, four phases` into four lightweight image-led chapter cards with phase number, age range, existing Baby line, existing You line and unchanged destination. Layout: four across at desktop, two by two at tablet, stacked on mobile.
- Keep the 13-month map separate and unchanged.
- Upgrade `Everything, side by side` into two un-nested editorial collections. Each side receives a pathway image followed by four compact topic rows with a relevant approved thumbnail where justified, otherwise an intentional image-free treatment.

### 4. Apply a controlled image system

- Audit the rendered existing assets first, using approved topic and phase imagery wherever it genuinely fits.
- Reuse is preferred over generation. New production imagery is limited to gaps proven by the audit and generated individually, never as a decorative bulk set.
- Give the four phase identities a clear progression: newborn closeness, interaction and reaching, floor play and exploration, then movement and personality.
- Provide exactly 4 of 4 contextual phase image breaks. Each must match its age range and surrounding editorial context, pass anatomy, infant-safety and responsive-crop review, and be individually justified from the direction board if newly generated. Generic baby details, nursery still lifes, hands or feet close-ups, decorative blankets and irrelevant interiors are prohibited filler.
- Preserve every Phase 37A.1 suppression. No category fallback, blank ratio box or generic replacement may appear for an intentionally image-free article.
- Record assets reused, generated, retained and referenced. Do not delete an asset unless a repository-wide reference check proves it unused.

### 5. Upgrade all four phase pages through the shared template

- Keep all existing editorial information, questions, links, safety language and sources.
- Refine the opening into breadcrumb, hero, age/month orientation and shorter Baby/You panels with lighter borders, stronger grouping and restrained phase detail.
- Add exactly one meaningful contextual image break after the Baby/You orientation on each phase page.
- Restyle `What this phase can feel like` as a controlled editorial reflection rather than an oversized card.
- Restyle `What feels hard` and `What can help` as balanced editorial columns.
- Keep `Who to turn to` prominent and undecorated.
- Preserve editorial-first questions and upgrade useful reads with approved thumbnails only where the article itself remains image-bearing. Keep image-free article cards fully supported.
- Preserve exactly one contextual Companion after editorial discovery on each phase page, followed by related topics, sources and quiet continuation.
- Do not add optional secondary phase images unless rendered evidence proves one is necessary. The target remains hero plus one contextual image.

### 6. Route, SEO and integration

- Register exactly 2 new public pages before `/first-year/:topic/:slug`, with 0 route conflicts and 0 generic-route shadowing.
- Add unique titles, restrained descriptions, canonical URLs, visible breadcrumbs and breadcrumb structured data.
- Add both routes to the existing First Year sitemap list. Validate 2 of 2 canonicals, breadcrumbs and BreadcrumbList schemas, 0 sitemap duplicates and an expected sitemap change from 352 to 354 URLs. Explain any legitimate measured variance rather than hiding it.
- Reuse shared First Year data and presentation components rather than duplicating article or topic records.

## Technical boundaries

- No article copy expansion, article records, medical guidance, lifecycle values, database work, AI runtime, grounding, TTC or Pregnancy changes.
- No customer-data mutation and no deployment.
- Formal Phase 37A.1 closure is a hard execution precondition. Re-measure the suppression map immediately before production work and inherit its measured count if it differs from 15 rather than forcing the baseline.
- Existing article body copy duplicated into pathway pages: 0. Substantial topic-page body copy duplicated: 0. Invented medical guidance and new medical precision: 0.
- Phase 37A and Phase 37A.1 records remain unchanged.
- Hub Companion count remains 1. Phase Companion handoffs remain 4 of 4.
- Baby pathway contextual Companion remains 1, Postpartum pathway contextual Companion remains 1, and pathway contextual Companion handoffs total 2 of 2.
- AI runtime, prompt and context-builder changes remain 0. The new pathway handoffs reuse the existing execution surface.
- The First Year content-coverage audit will not begin.

## Verification and evidence

- Add focused tests for both routes, all four repaired hub actions, zero dead primary actions, unchanged topic/phase/month inventories, complete reuse of the 26 existing records, zero article duplication per pathway page, visual treatment identity, image-free preservation, Companion counts and the locked product boundaries.
- Companion regression coverage will prove exactly one embedded handoff on each pathway page, placement after primary editorial discovery, no second execution runtime, exclusion of the global launcher from embedded counts, hub count 1 and phase count 4 of 4.
- Browser-check `/first-year`, both new pathway pages and all four phase pages at 1280, 834 and 390 pixels: 21 primary route and viewport combinations.
- Sanity-check all 8 topic pages for shared-component regressions.
- Verify crops, four-to-two-to-one phase layout, topic rows, parity, distortion, overflow, mobile card scale, destinations, broken images and console errors.
- Verify meaningful alt text where images convey information, empty alt text for decoration, 0 nested interactive controls, every CTA keyboard reachable, visible focus, touch targets, heading hierarchy and unchanged passing reduced-motion behaviour.
- Run focused tests, full tests, typecheck twice, lint and production validation build. Report the established lint baseline separately if unchanged.
- Create:
  - `docs/content/phase37b-first-year-pathway-pages.md`
  - `docs/content/phase37b-first-year-phase-visual-system.md`
  - `docs/content/phase37b-first-year-responsive-evidence.md`
- Update only the new Phase 37B section in `roadmap.md`.
- Return visual evidence first, then every requested completion-template value plus the dependency, route, sitemap, article accounting, duplicated-copy, filler-image, accessibility and Companion accounting additions. Use the exact closure statement only if every gate passes.
