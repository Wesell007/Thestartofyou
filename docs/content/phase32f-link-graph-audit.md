# Phase 32F — Internal link graph audit

Audit-first phase. Measurements are taken from the rendered application
(headless Chromium against the running dev server), not from source greps, and
are deduplicated at route level.

## 1. Content inventory — unique public URLs

Counted as unique public routable destinations. Redirect sources, unpublished
drafts, authenticated/setup routes and private utility routes are excluded.
Shared components are not counted; the 42 pregnancy week URLs and the 13 First
Year month URLs are each counted individually.

| Type | Unique public URLs |
| --- | --- |
| Core editorial/service pages | 6 |
| Pregnancy (hub, topics, trimesters, 42 weeks) | 52 |
| Trying to conceive | 14 |
| IVF | 4 |
| Tools (content destinations) | 3 |
| Family (hub, topics, articles) | 25 |
| First Year (hub, phases, 13 months, topics, articles) | 42 |
| Toddler (hub, topics, ages, articles) | 30 |
| Legacy articles (`/articles/:slug`) | 155 |
| **Total** | **331** |

Excluded: `/postpartum`, `/postpartum/early-days`, `/postpartum/early-weeks`,
`/postpartum/ongoing-adjustment`, `/trying-to-conceive/ovulation-calculator`,
`/articles/signs-of-ovulation` (redirect sources); `/postpartum/legacy`
(noindex); `/setup/*`, `/my-*`, `/pregnancy-toolkit/*`, `/account`, `/ask`,
`/auth` (private/authenticated); the 19 Phase 32A–32D drafts (not published).

## 2. Method

- All 331 sitemap URLs loaded in Chromium, `wait_until="load"`, then polled
  until the document exposed a hydrated link set, then a settle delay.
- Each anchor classified `STRUCTURAL` (inside `nav`, `header`, `footer`) or
  `CONTEXTUAL` (everything else).
- Edges deduplicated by `source route + destination route + link type`.
  Self-links and links to non-public destinations excluded from edge counts.
- Crawl errors: 0. Under-rendered captures: 0.

## 3. Graph metrics

| Metric | Before | After |
| --- | --- | --- |
| Routes crawled | 331 | 331 |
| Crawl errors | 0 | 0 |
| Rendered internal link occurrences | 12,174 | 12,179 |
| Unique STRUCTURAL edges | 4,480 | 4,480 |
| Unique CONTEXTUAL edges | 2,213 | 2,221 |
| TRUE_ORPHAN routes | 5 | 0 |
| WEAKLY_CONNECTED routes | 2 | 2 |
| Links to redirect sources | 1 | 0 |
| Broken internal destinations | 6 | 0 |
| Links to unpublished drafts | 0 | 0 |

Occurrence counts are reported for transparency only; connectivity conclusions
are drawn from the unique route-level edges.

### Classification definitions applied

- `TRUE_ORPHAN` — no meaningful internal path from any appropriate public
  editorial surface (no structural and no contextual inbound edge).
- `WEAKLY_CONNECTED` — technically discoverable, but without contextual or
  parent-level editorial discovery.
- `WELL_CONNECTED` — appropriate structural discovery plus useful contextual
  inbound connectivity.

Header/footer presence alone was not treated as proof of good architecture.

### TRUE_ORPHAN before (5)

All five were "keep / primary" legacy comprehensive guides that had lost every
inbound editorial path:

- `/articles/postpartum-recovery-timeline`
- `/articles/your-body-after-birth`
- `/articles/baby-sleep-first-year`
- `/articles/baby-milestones-first-year`
- `/articles/preparing-for-baby-complete-guide`

All five now hold contextual inbound edges from the correct supporting surface.

### WEAKLY_CONNECTED after (2)

`/` and `/about`. Both are reached structurally from every page; neither
warrants manufactured editorial links. Status: `NO_ACTION_REQUIRED`.

### Broken destinations found and fixed (6)

| Broken destination | Fixed to |
| --- | --- |
| `/articles/waters-contractions-and-show` | `/articles/signs-of-labour#waters-contractions-and-show` |
| `/articles/first-year-development` | `/first-year/development` |
| `/postpartum/early-days` (×2 surfaces) | `/first-year/postpartum-recovery/healing-after-birth` |
| `/postpartum/early-weeks` | `/first-year/postpartum-recovery/what-recovery-can-feel-like` |
| `/postpartum/ongoing-adjustment` | `/first-year/emotional-wellbeing/feeling-like-yourself-again` |

### Redirect-source link removed (1)

`/articles/signs-of-ovulation` appeared in three legacy related-article lists
and one TTC override; repointed to the live canonical
`/articles/how-to-know-when-you-are-ovulating`.

## 4. Guarded invariants

- No live page links to any of the 19 unpublished drafts (asserted by test).
- No new URLs, routes, hubs or articles were created.
- Route keys, redirect definitions, navigation logic and image maps were left
  untouched where they intentionally reference legacy paths.
