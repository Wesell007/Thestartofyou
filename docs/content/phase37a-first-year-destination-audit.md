# Phase 37A First Year destination audit

## Repository authority

Existing route registration and content records were used as the only destination authority. No URL registry was created.

| System | Required | Verified | Changes |
|---|---:|---:|---:|
| Phase template consumers | 4 | 4 | 0 routes |
| Topic template consumers | 8 | 8 | 0 routes |
| Baby topics | 4 | 4 | 0 |
| Postpartum topics | 4 | 4 | 0 |
| Month destinations | 13 | 13 | 0 routes |
| Ready First Year articles | 26 | 26 | 0 records |

The 13 month destinations remain Newborn through 12 months. Month data, month route behaviour, the month page template and month-specific presentation were not changed. The hub now exposes those existing destinations in one separate month map.

## Editorial destination reconciliation

Topic Start Here began with 24 cards. Twenty-one map to genuine, existing First Year guidance destinations and three were removed. Every surviving card has exactly one destination, and duplicate destinations within each topic are zero.

Phase guidance began with 12 cards. Eleven map to genuine existing destinations and one was removed. Ten resolve to First Year guidance. “Easing into toddlerhood” intentionally resolves to the existing `/toddler` transition and preserves the First Year to Toddler handoff. Duplicate destinations within each phase are zero.

The corrected separated tummy muscles destination is `/first-year/body-and-hormones/separated-tummy-muscles`, matching its existing canonical article owner.

## Link and lifecycle results

- retained phase routes: 4
- retained month destinations: 13
- retained topic routes: 8
- broken internal destinations found by the full link-integrity regression: 0
- duplicate route source of truth: NO
- Toddler transition preserved: YES
- lifecycle states tested: 5
- unique lifecycle destinations: 4
- incorrect lifecycle destinations: 0
- customer-data writes: 0
- new route, redirect or sitemap destination: 0