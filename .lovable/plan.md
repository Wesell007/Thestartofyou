# Phase 39A Family Hub and Topic Experience Premium Rebuild

## Objective
Rebuild the public Family hub and all six canonical Family topic pages as a warm, adult, premium editorial destination. Family remains a broad support layer, not a saved lifecycle. This phase changes UX, presentation and discovery only.

Selected visual direction: **Premium editorial folio**. Apply its asymmetric editorial hierarchy, strong image led discovery, refined typography and restrained interaction through the existing Family tokens, fonts and approved imagery. Do not copy its sample content, external fonts or early Companion placement.

## Measured baseline

Repository truth before product changes:

- Family hub: 1, `/family`
- Canonical topic pages: 6
- Canonical areas: Growing families, Relationships, Family basics, Health and safety, Travel and days out, Play, fun and connection
- Family article records: 18
- Ready: 18
- Draft: 0
- Unknown: 0
- Family sitemap URLs: 25, comprising 1 hub, 6 topics and 18 ready guides
- Legacy or redirect Family routes: 0
- Broken Family destinations: 2 hub question links, for `managing-childcare-costs` and `sharing-the-mental-load`
- Embedded Companion sections: 7 total, 1 on the hub and 1 on each topic page
- Question surfaces: 7 total, 1 hub accordion and 6 topic accordions
- Primary Family area navigation systems on the hub: 2, the pill row and the six card directory
- Hub Start Here surface: 1, currently four real ready guides
- Topic guidance surfaces: 6, each automatically includes every ready guide in its area
- Ready guide discovery: 18 well discovered through the relevant canonical topic page, 0 weak, 0 orphaned under the phase definition of at least one meaningful path. Several have only that primary path and will be strengthened without changing content.
- Existing imagery: 4 hub carousel images, 6 topic heroes and unique hero mappings for all 18 ready guides. No missing article mapping was found.
- Current hub order: Hero, pill navigation, Companion, featured guidance, area cards, questions, quiet note, pathways
- Current topic order: breadcrumb and hero, overview, grouped guidance, questions, Companion, related areas, return to Family
- Topic configuration already contains `intro` and `startHere` data that the shared page does not currently render.

The two broken links are confirmed route mismatches, not missing content. Stale inventory and blocked grounding metadata are outside Phase 39A and will not be changed.

## Implementation

### 1. Record the baseline first
- Add the measured baseline to `docs/content/phase39a-family-ux-rebuild.md` before product edits.
- Append a Phase 39A in progress item to `roadmap.md` only. Preserve all closed workstream records.

### 2. Recompose the Family hub
Use this exact hierarchy:

1. Hero
2. Editorial Start Here
3. Family areas
4. Common family moments and questions
5. One late embedded Companion
6. Quiet editorial note
7. Where to next
8. Footer

Specific changes:

- Preserve the current hero concept, positioning and four image carousel unless responsive QA identifies a real crop defect.
- Keep both valid hero actions, but label the question action clearly as Companion support.
- Move the existing four ready Start Here guides directly below the hero. Preserve selection and imagery while improving hierarchy, proportions and responsive composition.
- Remove `FamilyQuickNav` from hub composition.
- Rebuild `FamilyTopicClusters` as the single six area system using existing topic imagery, editorial numbering and controlled asymmetric folio composition. Keep all six canonical destinations and descriptors.
- Keep the six hub questions and their static editorial answers. Remove per-question “Ask more” links so editorial answers cannot lead through a faux editorial AI action. Correct the two confirmed guide links to their canonical slugs.
- Move the single Family Companion after the questions and frame it explicitly as support when edited guidance does not quite fit.
- Tighten section spacing throughout while retaining deliberate pauses.
- Keep the quiet note compact and place it after the Companion.
- Preserve Toddler, First Year, Pregnancy and Journal as contextual choices, removing any language that implies Family is a final lifecycle stage.

### 3. Upgrade the shared Family topic experience
Refactor the shared template once so all 6 canonical pages receive the upgrade while retaining their individual copy and imagery.

Target structure:

1. Breadcrumb and area label
2. Image led hero
3. What this area helps with
4. Start Here using the configured real ready guide slugs
5. Key family life situations using existing `areasInside`
6. Remaining relevant guidance, without duplicate guide cards
7. Support or safety orientation only where repository content supports it
8. Common questions
9. One late Companion
10. Related Family areas
11. Return to Family

Implementation details:

- Render the currently unused `intro`, `startHere` and `areasInside` fields rather than inventing coverage.
- De duplicate Start Here guides from the later guidance collection.
- Give each area editorial character through its existing hero, wording and content grouping, while keeping one accessible shared system.
- Preserve breadcrumbs, canonical metadata, structured data, routes and return navigation.
- Keep one embedded Companion per topic page, late in the hierarchy. Do not alter its runtime, prompts, context construction or routing.
- Use varied image led, text led, horizontal and compact navigation treatments without nested cards or dashboard styling.

### 4. Preserve imagery and locked systems
- Preserve all strong existing hub, topic and article imagery.
- Generate no new image unless browser QA proves an existing asset is broken or semantically unusable. Any exception must use Nano Banana and be documented.
- Make no changes to content coverage, article bodies, grounding, reviewer governance, AI runtime, database, auth, analytics, lifecycle definitions, journey routing or other workstreams.
- Do not deploy.

### 5. Focused validation
Add a focused Phase 39A test suite covering:

- Exact hub hierarchy and Start Here before Companion
- One primary six area navigation system after removing the pill system
- All six canonical topic pages and valid topic links
- The shared topic hierarchy, including rendered Start Here and situations
- Maximum one embedded Companion on the hub and each topic page
- No hub question AI fallback and both corrected article destinations
- Every ready guide has a meaningful topic discovery path
- No duplicate Start Here guide in later topic guidance
- Breadcrumbs and return navigation
- All 18 ready guide image mappings
- Route and 25 URL sitemap consistency with no route changes
- Public route smoke coverage for Family

Run:

1. Focused Phase 39A tests
2. Family regressions
3. Full suite
4. Typecheck run 1
5. Typecheck run 2
6. Lint against the established baseline
7. Production validation build

Report first run and rerun for any failure or flake.

### 6. Responsive and accessibility evidence
Use browser QA at 1280, 834 and 390 for the hub and representative coverage of all six topic pages. Verify:

- Hero crop, heading wrap and actions
- Start Here composition
- Six area navigation scanability
- Topic hero, Start Here, situations and guidance order
- Question width and accordion semantics
- Late Companion placement and count
- Related areas, return navigation, pathways and footer transition
- 44px touch targets, focus visibility, semantic headings, alt text, contrast and reduced motion
- No horizontal overflow, broken images, broken links or console errors

Record results in `docs/content/phase39a-family-responsive-evidence.md`.

## Closure
Update the implementation record, responsive evidence and Phase 39A roadmap entry with measured before and after results. Close only if all required UX, discovery, route, accessibility and validation gates pass. Report the requested completion matrix and exact closure wording.

Do not judge Family content sufficiency in this phase. Do not create, expand, merge, archive or reprioritise Family articles. After closure, identify the next safe step as **Phase 39B — Family Content Coverage & Journey Audit**, but do not start it automatically.

If all gates pass, close with this exact wording:

**PHASE 39A — FAMILY HUB & TOPIC EXPERIENCE PREMIUM REBUILD**

**CLOSED PASS / FAMILY HUB REFINED / ALL FAMILY TOPIC EXPERIENCES UPGRADED / EDITORIAL DISCOVERY STRENGTHENED / COMPANION MOVED TO SUPPORTING ROLE / NO CONTENT COVERAGE AUDIT YET**

Locked final counts and boundaries: 18 ready Family articles, 0 new articles, 0 article body changes, 0 content coverage decisions, 0 grounding changes, 0 reviewer governance changes, 0 AI runtime changes, 0 database changes, 0 lifecycle changes, 0 TTC changes, 0 Pregnancy changes, 0 First Year changes, 0 Toddler changes and no deployment.
