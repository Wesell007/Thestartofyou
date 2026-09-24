# Phase 39A Family UX Rebuild

Status: CLOSED PASS

## Scope

Phase 39A is limited to Family UX, presentation and editorial discovery. It does not assess content sufficiency and does not create, expand, merge, archive or reprioritise Family guidance.

Selected visual direction: Premium editorial folio.

## Measured baseline before product changes

| Measure | Baseline |
| --- | ---: |
| Family hub routes | 1 |
| Canonical Family topic routes | 6 |
| Family article records | 18 |
| Ready | 18 |
| Draft | 0 |
| Unknown | 0 |
| Canonical topic pages | 6 |
| Embedded Companion sections | 7, one hub and one per topic |
| Question surfaces | 7, one hub and one per topic |
| Primary hub area navigation systems | 2 |
| Hub Start Here surfaces | 1, four ready guides |
| Family sitemap URLs | 25 |
| Broken Family destinations | 2 hub question links |
| Legacy or redirect Family routes | 0 |

The six canonical areas are Growing families, Relationships, Family basics, Health and safety, Travel and days out, and Play, fun and connection.

All 18 ready guides have a meaningful discovery path from their canonical topic page. Baseline discovery is therefore 18 well discovered, 0 weak and 0 orphaned under the Phase 39A path test. Several guides depend primarily on that topic path, so the presentation will strengthen their visibility without making content coverage decisions.

## Baseline structure

Hub order before changes:

1. Hero
2. Six pill links
3. Embedded Companion
4. Four featured guides
5. Six topic cards
6. Six common questions
7. Quiet note
8. Cross stage pathways

Shared topic order before changes:

1. Breadcrumb and hero
2. What this covers
3. Grouped guidance
4. Common questions
5. Embedded Companion
6. Related Family areas
7. Return to Family

The topic registry already provides `intro`, `startHere` and `areasInside` fields, but the shared page did not render the first two as distinct editorial surfaces.

## Baseline imagery

The existing image system contains four hub carousel images, six topic hero images and unique hero mappings for all 18 ready guides. No article image mapping was missing. Existing imagery remains the default and no image campaign is approved.

## Confirmed baseline defects

Two hub question links used non-canonical slugs:

- `managing-childcare-costs-without-feeling-overwhelmed` instead of `managing-childcare-costs`
- `sharing-the-mental-load-in-family-life` instead of `sharing-the-mental-load`

These are route corrections only. Article bodies remain unchanged.

## Locked boundaries

Ready Family articles remain 18. New articles, article body changes, content coverage decisions, grounding, reviewer governance, AI runtime, database, lifecycle, TTC, Pregnancy, First Year, Toddler and deployment changes remain zero.

## Implemented result

- Reordered the hub to Hero, Start Here, Family areas, Common questions, one late Companion, quiet note, Where to next and Footer.
- Removed the duplicate pill navigation and retained one image-led six-area editorial system.
- Kept the four existing ready Start Here guides and all existing Family imagery and routes.
- Corrected the two stale hub question destinations and removed per-question AI fallback actions.
- Upgraded the shared template for all six topic pages to render the configured introduction, Start Here guides and situations inside each area.
- Deduplicated Start Here guides from the remaining guidance collection.
- Kept one Companion section per public Family surface and placed it after editorial questions.
- Preserved all 18 ready article records and their bodies without content-coverage decisions.

## Validation

- Focused Phase 39A tests: 6 of 6 passed.
- Full suite: 142 files and 1,614 tests passed.
- Typecheck: passed.
- Production build: passed.
- Lint: unchanged baseline, 1 error and 10 warnings. The error remains in the generated `previewAuthStorage.ts` file and was outside Phase 39A.
- Browser review: hub plus all six topics at 1280, 834 and 390 pixels, 21 page-width combinations in total.
- Browser results: no horizontal overflow, one Family Companion label per page and zero console errors across all 21 checks.
- Managed asset pointers were present for the hub, topic and all 18 guide images. The isolated localhost browser returned the application shell for those managed image paths, so visual crop fidelity could not be evidenced from that environment. No asset records or mappings were changed.

## Closure

PHASE 39A — FAMILY HUB & TOPIC EXPERIENCE PREMIUM REBUILD

CLOSED PASS /

FAMILY HUB REFINED /

ALL FAMILY TOPIC EXPERIENCES UPGRADED /

EDITORIAL DISCOVERY STRENGTHENED /

COMPANION MOVED TO SUPPORTING ROLE /

NO CONTENT COVERAGE AUDIT YET

Next safe step: PHASE 39B — FAMILY CONTENT COVERAGE & JOURNEY AUDIT. It has not been started.