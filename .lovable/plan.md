# Phase 33.4 — Article trust and structure consistency

Standardise how sources appear and remove duplicated article navigation, without touching article copy, imagery, routes, governance or deployment.

## What the audit found

Three source renderers and several navigation blocks are involved:

| Area | Component | Current behaviour |
| --- | --- | --- |
| Legacy (TTC / Pregnancy / IVF articles) | `src/components/article/ArticleSources.tsx` | Sources rendered as clickable external links |
| First Year / Toddler / Family | `src/components/shared/HubArticleView.tsx` | Clickable links, external-link icon, "External links open in a new tab…" note |
| Pregnancy week pages | `src/components/week/WeekSources.tsx` | Clickable external links |
| Flagship articles | `FlagshipSummaryRow` (At a glance + In this article) **plus** `ArticleContents` (In this article again) | Duplicate navigation, e.g. Preconception GP appointment |
| Legacy template | `ArticleQuickAnswer` (At a glance) + `ArticleJumpNav` / `ArticleInThisGuide` | One navigation block only; no duplicate found so far |

Family content: 19 article records, 4 currently carry source data. The remaining 15 will be listed as `SOURCE PROVENANCE MISSING` — no citations will be invented.

## What will change

1. **Sources become plain citations everywhere.** In all three source renderers, drop the anchor, `target="_blank"`, the external-link icon and link styling. Each entry reads `Title — Organisation (year)` as ordered-list text, keeping each hub's existing colours and spacing. Remove the "External links open in a new tab / not controlled by us" sentence.
2. **Source URLs stay in the data.** No article record is edited; only rendering changes.
3. **Family sources render through the same block.** The Family page already uses the shared hub view, so the four articles with provenance display sources automatically once the renderer is corrected; the rest are reported, not filled in.
4. **One "In this article" per article.** Remove the second navigation block from the flagship template (the summary row already carries it). Deep and hub templates keep their single block untouched.
5. **At a glance audit.** Confirm the opening summary and the "Key takeaways — the essentials, at a glance" section stay distinct; remove only genuine duplicates. Key takeaways are preserved.
6. **Reviewer claims audited read-only.** Every visitor-facing "Medically reviewed by …" line is listed with whether reviewer metadata and provenance exist in the repository; anything unbacked is flagged `REVIEW CLAIM REQUIRES GOVERNANCE CHECK`. Nothing is added or removed.

## Tests and checks

New focused tests: zero anchors and zero external-link icons inside source blocks, source titles and organisations still visible, URLs still present in data, one navigation block per template, navigation anchors match real section ids, key takeaways intact.

Validation: focused tests, full suite, typecheck twice, lint against the 1 error / 10 warnings baseline, production build, plus browser checks at desktop, tablet and mobile on a TTC, Pregnancy flagship, First Year, Toddler and Family article.

## Documentation

`docs/content/article-source-and-structure-consistency.md` records the audit, the new standard, Family coverage and missing provenance, duplicate findings, reviewer-claim audit, QA, tests, changed files and the full count table (items 1–16 of the brief).

## Boundaries

No article copy, imagery, routes, canonicals, topic placement, discovery, sitemap architecture, AI/grounding/journal/memory/voice, database or lifecycle changes. No deployment; the global Phase 33 deployment block stays active. No IVF work.
