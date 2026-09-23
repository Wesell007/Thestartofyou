# Phase 38A Toddler UX rebuild

## Status

CLOSED PASS. No deployment. No Toddler content coverage audit started.

## Measured pre-change baseline

| Measure | Repository truth |
|---|---:|
| Toddler hub route | 1 |
| Toddler hub canonical URL | 1 |
| Toddler hub in sitemap | YES |
| Canonical age guides | 5 |
| Age URLs in sitemap | 5 |
| Canonical topic pages | 8 |
| Topic URLs in sitemap | 8 |
| Toddler article records | 16 |
| Ready / draft / unknown | 16 / 0 / 0 |
| Article URLs in sitemap | 16 |
| Total sitemap URLs attributable to Toddler | 30 |
| Hub topic navigation systems | 2 |
| Embedded Companion sections across hub, age and topic templates | 14 concrete surfaces: 1 hub, 5 age, 8 topic |
| FAQ or question sections across hub, age and topic templates | 14 concrete surfaces: 1 hub, 5 age, 8 topic |
| Broken canonical Toddler routes found before implementation | 0 |
| Horizontal overflow on representative 1280, 834 and 390 checks | 0 |

The canonical Toddler article dataset is the source of truth for public discovery. `articleInventory.ts` contains 16 stale Toddler rows marked draft and placeholder. Those rows hide zero ready articles. They are recorded as governance drift for a later phase and will not be changed in Phase 38A.

## Visual direction

The selected direction is Premium editorial journey: chapter-based age progression, warm daylight, lived-in family moments, controlled asymmetry and varied editorial composition. Existing age, topic and article imagery is preserved first. No image replacement campaign is in scope.

## Locked boundaries

No content coverage audit, article creation, article expansion, route migration, AI runtime, prompt, context-builder, source-routing, grounding, reviewer-governance, database, RLS, auth, analytics, lifecycle, journey-routing, TTC, Pregnancy, First Year or deployment change is permitted.

## Implemented presentation changes

- Reordered the hub to Hero, Age pathways, Toddler topics, Start Here, Common questions, one late embedded Companion, Where to next and Footer.
- Replaced the pill-only age navigation with the selected five-chapter editorial journey.
- Consolidated two competing eight-topic systems into one canonical topic navigation.
- Preserved four ready Start Here articles and removed Companion links from editorial question answers.
- Upgraded all five age guides through their shared template: overview, development areas, common questions, gentle support, one late Companion, related topics and previous or next age navigation.
- Upgraded all eight topic pages through their shared template: overview, five-age pathway, both ready guidance articles, common questions, one late Companion and related topics.
- Preserved routes, metadata, breadcrumbs, article data, claims and existing image references.

## Discovery and inventory accounting

- Canonical ready articles: 16.
- Ready articles surfaced on topic pages: 16, exactly two per topic.
- Hidden ready articles: 0.
- Stale Toddler inventory rows: 16.
- Inventory rows changed: 0.
- Broken canonical routes found: 0.

## Validation

- Focused Phase 38A checks: 6 of 6 passed.
- Full suite: 139 files and 1,595 tests passed.
- Type check: passed twice.
- Production build: passed.
- Lint: unchanged baseline of one error in the generated preview auth file and ten warnings; no new Phase 38A lint finding.
- Responsive browser checks at 1280, 834 and 390: no horizontal overflow; one embedded Companion on each representative hub, age and topic page; section order matched the approved hierarchy.
- Existing asset pointer delivery remains broken in local preview for the preserved Toddler age and topic images. The endpoint returns the app HTML shell instead of image bytes. This predated Phase 38A, is not caused by the presentation changes and was not replaced or broadened into an image campaign.

## Closure

**PHASE 38A CLOSED PASS. TODDLER CONTENT COVERAGE AUDIT NOT STARTED. DEPLOYMENT NO.**
