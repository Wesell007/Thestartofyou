# Phase 38A Toddler premium rebuild

## Goal
Rebuild the Toddler hub, all five age guides and all eight topic pages into a calm, premium editorial experience with stronger discovery and clearer separation between guidance and the Companion. Preserve existing routes, content claims and strong imagery. This phase will not assess or fill wider content coverage.

## Verified baseline
- One hub route: `/toddler`.
- Five canonical age guides: `12-17-months`, `18-23-months`, `2-years`, `30-months`, `3-years`.
- Eight canonical topic pages using the existing repository slugs.
- Sixteen Toddler article records, all ready, with two articles in each topic.
- The canonical Toddler hub URL is one route and is included in the sitemap.
- The current sitemap attributes thirty URLs to Toddler: one hub, five age guides, eight topics and sixteen ready articles.
- The hub currently contains two separate eight-topic navigation systems.
- The embedded Companion currently appears early on the hub and early within every shared age and topic page.
- All five age heroes and all eight topic heroes have existing assets.
- The canonical Toddler dataset has sixteen ready articles. Separate inventory metadata contains sixteen stale draft/placeholder rows, but hides zero ready articles from public discovery.
- The sixteen stale inventory rows will be documented as known baseline drift for the later Toddler content/governance phase. Phase 38A will change zero inventory metadata rows.
- Live checks at 1280, 834 and 390 pixels found no horizontal overflow on the representative hub, age and topic routes. Some existing asset requests failed locally on representative inner pages and will be rechecked during implementation.

## Selected visual direction
Use the selected **Premium editorial journey** as the north star:
- Chapter-based age progression with image rhythm, human descriptors and clear directional cues.
- Warm daylight, lived-in family moments, movement and independence.
- Existing cream, apricot, sage and deep brown tokens with the established serif and sans typography.
- Controlled asymmetry and varied editorial composition rather than repeated pale bordered cards.
- Preserve current imagery first. Generate no new imagery unless implementation reveals a genuine missing visual that existing approved assets cannot fill.

## Implementation

### 1. Record the complete pre-change baseline
- Finish a scripted inventory of routes, embedded Companion sections, question sections, article-discovery surfaces, image placements and internal destinations.
- Check all canonical Toddler routes and links before editing.
- Report the hub, age, topic and article sitemap counts separately, using measured repository and build truth rather than a forced total.
- Use the canonical Toddler article dataset as the availability source of truth and do not suppress any ready article because of stale inventory metadata.
- Record measured results in the Phase 38A implementation document before the first product-file change.

### 2. Rebuild the Toddler hub hierarchy
Use this exact order:
1. Hero
2. Age pathways
3. Toddler topics
4. Start Here guidance
5. Common parent questions
6. One late embedded Companion
7. Where to next
8. Footer

- Keep the current hero concept and imagery.
- Replace the five pills with a responsive editorial age journey using all five exact destinations, existing age imagery, stage descriptors and strong tap targets.
- Consolidate the two current topic systems into one substantial eight-topic experience, using the canonical topic data as the source of truth.
- Preserve the four real Start Here articles and improve only their rhythm, hierarchy and responsive balance.
- Keep concise editorial answers in the question section and remove per-question Companion links so editorial and AI actions cannot be confused.
- Remove redundant hub sections that conflict with the required hierarchy, without changing routes or content architecture.

### 3. Upgrade all five age guides through the shared template
- Preserve breadcrumbs, canonical metadata and each existing age hero.
- Recompose each page into age context, hero, editorial stage overview, meaningful big shifts, relevant existing guidance, concise stage friction and support orientation, questions, one late Companion, related topics, age progression and return navigation.
- Use current age configuration and existing article/topic content only. Extend presentation data only where needed to express age-specific emphasis without adding unsupported clinical claims.
- Replace equal-tile repetition with image-led guidance, compact navigation rows, text-led editorial moments and restrained callouts.
- Make previous and next age movement feel continuous and keep every control usable on mobile.

### 4. Upgrade all eight topic pages through the shared template
- Preserve breadcrumbs, canonical metadata and existing topic heroes.
- Add an editorial, non-clinical progression across early toddlerhood, around two and toward three using existing supported copy.
- Surface both ready articles per topic prominently before questions and the Companion.
- Differentiate each topic through its existing emphasis and content rather than forcing one taxonomy across all eight.
- Keep support and safety orientation only where current material supports it.
- Place one embedded Companion late, after substantial editorial guidance, followed by related topics and return navigation.

### 5. Improve discovery without performing a content audit
- Verify every one of the sixteen ready articles has at least one meaningful route from the hub, an age guide, a topic page or a related-guidance surface.
- Add only contextual links to existing ready articles where a discovery gap is proven.
- Do not create, expand, merge, archive or reassess articles.
- Remove any guidance-shaped interaction whose only destination is AI. Keep the Companion as a clearly labelled, separate experience.

### 6. Accessibility and responsive quality
- Preserve semantic headings, breadcrumb structure, useful alt text, accordion semantics, focus visibility and reduced-motion behaviour.
- Maintain at least 44 pixel touch targets where appropriate.
- Verify at 1280 desktop, 834 tablet and 390 mobile, including age navigation, topic navigation, article grids, crops, heading wraps, FAQ readability, Companion placement and horizontal overflow.

### 7. Evidence, tests and closure
- Add focused Phase 38A tests for the hub, five age pages, eight topic pages, canonical navigation, article discovery, one hub topic system, maximum one embedded Companion per redesigned page, no AI disguised as guidance, valid links, sitemap consistency and breadcrumbs.
- Run focused tests, Toddler regressions, the full suite, typecheck twice, lint against the established baseline and the production validation build. Record first-run flakes and reruns separately.
- Create:
  - `docs/content/phase38a-toddler-ux-rebuild.md`
  - `docs/content/phase38a-toddler-responsive-evidence.md`
- Append only the Phase 38A record to `roadmap.md`.
- Return the complete measured report and close only if every required gate passes.

## Technical boundaries
- No route migration, new route architecture or sitemap strategy change.
- No content coverage audit and no new articles.
- No article expansions and no repair of the stale Toddler inventory metadata.
- No changes to AI runtime, prompts, context builders, source routing, memory, grounding, reviewer governance, database, RLS, authentication, analytics, lifecycle definitions or journey routing.
- No TTC, Pregnancy or First Year changes.
- No deployment.
