# Phase 34B — IVF source remediation and existing-content expansion

Implementation of the Phase 34A approved smallest next batch, minus the new articles. No new IVF articles, no new routes, no deployment.

## Scope reconciled against the 34A registers

From `phase34a-ivf-existing-content-actions.csv`:

| 34A record | Primary action | 34B treatment |
| --- | --- | --- |
| `/articles/ivf-timeline-what-to-expect` (row 6) | EXPAND_EXISTING + REQUIRES_SOURCE_REMEDIATION | Expand and remediate sources |
| `/ivf/after-transfer` (row 3) | EXPAND_EXISTING | Expand |
| `/ivf/before-transfer` (row 2) | EXPAND_EXISTING | **DEFERRED FROM 34B SMALL BATCH** — the 34A smallest batch names only the timeline article and after-transfer |
| `/articles/emotional-impact-of-ivf` (row 7) | KEEP + REQUIRES_SOURCE_REMEDIATION | Sources only, no copy expansion |
| Rows 18, 19, 20 (`ivfStageData.ts`) | MERGE | Resolve the shadowed duplicates |
| Rows 14, 15, 16, 17 | INTERNAL_LINK_ONLY | Contextual links only |
| Row 9 `moving-from-ttc-to-ivf` | KEEP | Hub discovery correction only |

Held for a later phase: all 7 NEW_ARTICLE rows (what IVF is, NHS funding, OHSS, unsuccessful cycle, ICSI, embryo development, fresh vs frozen), the clinic-questions checklist (DEFERRED PRODUCT OPPORTUNITY), and every DO_NOT_CREATE decision.

## 1. Source provenance

Both IVF articles currently store sources as plain label strings. Convert them to the structured source shape already supported by the article data and renderer (label, publisher, URL, year where genuinely published), using HFEA first, then NHS, then NICE, with Fertility Network UK and BICA only for the emotional article's support context. Each source is verified against the live page before it is recorded; no year is invented. URLs stay in the data only — the visitor still sees plain text citations with no anchor, no icon and no new-tab wording, exactly as Phase 33.4 requires.

## 2. Timeline article expansion

`ivf-timeline-what-to-expect` stays the single owner of the generic IVF sequence. Expand its editorial sections so stimulation, monitoring, the trigger injection, egg collection, sperm collection and preparation each read as a proper section rather than a single line, and keep the existing fertilisation, embryo development, transfer, two-week wait and testing material as sequence-level orientation. Depth on high-risk subjects (OHSS in particular) stays a short signpost, because 34A assigns it to a future dedicated article. Route, canonical, slug, topics, hero and identity unchanged.

## 3. After-transfer stage expansion

Expand the `after-transfer` config in `src/data/ivfTopicData.ts` so the page covers: what typically happens after transfer, normal uncertainty, continuing medication as the clinic directs, symptoms versus no symptoms, rest and activity myths, when a test is meaningful (including why the trigger injection can distort an early result), when to contact the clinic, and the emotional weight of the wait. No individualised advice, no overstated implantation symptoms, no separate symptom article.

## 4. Shadowed stage data

`src/data/ivfStageData.ts` defines three stage records consumed only by `src/pages/StagePage.tsx` through the generic `/:journey/:stage` route. The three explicit `/ivf/*` routes are registered above that generic route in `src/App.tsx`, and the sitemap lists only the explicit routes, so all three records are unreachable. Authoritative owner = `ivfTopicData.ts`. Resolution: remove the `ivf` entry from the stage registry and delete the unreachable file, after confirming no other importer. No route, no new stage page, no visitor-facing change. The before/after mapping is documented in the report.

## 5. Internal links and hub discovery

- Contextual loss support from `/ivf/after-transfer` and `/ivf/early-pregnancy` to the existing chemical pregnancy and pregnancy-after-loss articles.
- Contextual multiple-pregnancy link from `/ivf/early-pregnancy` to existing pregnancy content.
- Embryo freezing and storage: a short plain-text HFEA signpost inside the before-transfer support copy, no external anchor, no new article.
- `Moving from TTC to IVF` surfaced exactly once on the IVF hub as a normal discovery destination. Its route, canonical, dataset and TTC ownership stay unchanged; occurrence on the hub = 1, with no duplicate discovery elsewhere on the hub.

## 6. Review governance and safety

Every medically substantive addition keeps its 34A classification (HEALTH_REVIEW_REQUIRED, or SAFETY_REVIEW_REQUIRED where it touches bleeding, pain, OHSS, ectopic concerns, medication, loss or test interpretation). Human reviews completed stays 0. No reviewer badge, no named reviewer, no generic expert claim, no machine-facing `reviewedBy` emitted. Existing stored historical metadata is left untouched. Nothing implies the content replaces a clinic or urgent care.

## 7. Tests

New or updated focused tests covering: structured provenance present on both IVF articles; source citations render without anchors; the timeline article remains the sole owner of the generic sequence; the after-transfer route is unchanged; the shadowed stage records are gone and no IVF stage resolves through the generic route; no new routes; hub occurrence of `moving-from-ttc-to-ivf` is exactly 1; reviewer claims = 0; JSON-LD `reviewedBy` = 0; saved lifecycles remain exactly `ttc`, `pregnancy`, `first_year`.

## 8. QA and validation

Browser QA at mobile, tablet and desktop on `/ivf`, the three stage routes, both IVF articles and `moving-from-ttc-to-ivf`: content, images, overflow, visible non-clickable citations, no reviewer claims, links resolve, hub discovery coherent. Then the focused tests, the full suite, typecheck twice, lint against the existing baseline, production build and route/link validation. No deployment; the global Phase 33 block stays active.

## 9. Documentation

Create `docs/content/phase34b-ivf-remediation-report.md` recording sources remediated, articles expanded, the deferred third expansion, the shadowed-data mapping, links implemented, review classifications, tests, QA, changed files, the held new-article backlog and the deferred product opportunity. Add implementation-status notes to the Phase 34A documents without altering their historical counts.

## Expected completion counts

IVF articles source-remediated 2, existing articles expanded 1, stage surfaces expanded 1, shadowed records 3 to 0, new article records 0, new routes 0, human reviews completed 0, reviewer claims rendered 0, deployed 0. Link and discovery counts reported exactly as implemented.
