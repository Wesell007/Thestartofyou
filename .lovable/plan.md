# Phase 33.2 Hair Dye Article Frontend Discovery Fix

## Confirmed current state

- The direct preview route already returns the article successfully at `/articles/hair-dye-and-beauty-treatments-in-pregnancy`.
- The exact legacy article record exists, is found by the standard `/articles/:slug` lookup, and is rendered by the existing flagship article template.
- The title and canonical are correct. The page is indexable by default, has Article structured data, and the route appears once in the 333 URL sitemap.
- The hero and two body images load successfully.
- The genuine defect is discovery: the existing Pregnancy → Health and safety page contains no link to this article.

## Implementation

1. Add the article to the existing `Staying well day to day` group in the Pregnancy Health and safety topic configuration.
2. Use the existing grouped article-row mechanism and its current thumbnail resolver. Add the approved hair-dye hero to the existing thumbnail map so the discovery row uses its own relevant image.
3. Keep `NO_PHASE_32F_LINK_MIGRATION_REQUIRED`. This is normal category discovery only, with no retargeting of another intent owner.
4. Extend the existing Phase 33 Batch 1 integrity test to confirm the normal Health and safety discovery entry and exact destination.

## Verification

- Recheck the direct route, correct existing template, title, canonical, indexability, Article structured data, and all three images.
- Navigate from Pregnancy → Health and safety and verify the new row reaches the article.
- Confirm the sitemap remains at 333 unique URLs and includes the route once.
- Confirm links to the other 17 held drafts remain zero.
- Run focused tests, the full test suite, typecheck twice, lint against its established baseline, and production build.
- Confirm zero new routes, navigation architecture, templates, article records, or deployment actions.

## Boundaries

No deployment. No Batch 2. No new route, hub, navigation item, renderer, template, or bespoke article component. No runtime status or governance changes.
