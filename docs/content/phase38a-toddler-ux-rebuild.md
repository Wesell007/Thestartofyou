# Phase 38A Toddler UX rebuild

## Status

IN PROGRESS. No deployment.

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

## Implementation and validation

To be completed after the presentation rebuild and measured QA.
