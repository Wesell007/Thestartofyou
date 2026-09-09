# Phase 31 — Source Normalisation and Method

Audit-only document. No application source, article, route, SEO, sitemap, AI, grounding or database file was changed while producing it.

## 1. Source file

`whattoexpect.com-organic.Positions-uk-20250806-2025-08-07T01_10_26Z(1).csv` — a historical UK organic positions export for whattoexpect.com, dated 6–7 August 2025.

Treated strictly as competitor-demand, keyword-discovery and search-intent evidence. It is not a content template, not current ranking truth, not an authoritative medical source, and not proof that any competitor page belongs on The Start of You.

## 2. Reconciled source counts

| Figure | Value |
| --- | --- |
| Raw rows (excluding header) | 10,000 |
| Unique normalised keywords | 8,485 |
| Unique normalised URLs | 911 |
| Unique keyword + URL pairs | 8,914 |
| Duplicate rows beyond the unique pair set | 1,086 |

These were recomputed independently from the file and match the approved figures exactly.

## 3. Normalisation rules

- Keywords: trimmed, whitespace collapsed, lower-cased.
- URLs: trimmed, lower-cased, trailing slash removed, protocol and host retained.
- Duplicate keyword+URL pairs: collapsed to the best row (lowest position, then most recent timestamp, then highest traffic).
- Keyword-level deduplication: where a keyword mapped to several URLs, the best-performing URL was kept as the cluster owner. This produced 8,485 keyword records across 903 owning URLs.
- Search volume is used directionally only. Cluster volume is the sum of member keyword volumes and **must not** be read as market size, because member keywords overlap heavily in intent.

## 4. Clustering method

URL-first. Each competitor URL was treated as a candidate intent cluster, then related URLs covering the same intent were merged into a single Start of You cluster (for example all 40 week-by-week URLs form one structural cluster).

Clusters were then filtered to relevant domains: Trying to Conceive, Pregnancy, IVF, First Year, Postpartum/Recovery, Toddler, Family. Clusters with no plausible Start of You home were recorded in the skip register rather than dropped silently.

## 5. Coverage classification

Applied vocabulary: `COVERED_STRONG`, `COVERED_PARTIAL`, `COVERED_BY_STRUCTURED_PAGE`, `COVERED_BY_TOOL`, `COVERED_BY_TOPIC_OR_HUB`, `OVERLAP_REQUIRES_CANONICAL_DECISION`, `NEW_ARTICLE_GAP`, `NEW_TOOL_OR_FEATURE_OPPORTUNITY`, `SUPPORTING_CONTENT_OPPORTUNITY`, `SKIP_BRAND_MISMATCH`, `SKIP_CANNIBALISATION`, `OUT_OF_SCOPE`, `NEEDS_HUMAN_EDITORIAL_REVIEW`.

Only surfaces resolved as `LIVE_INDEXABLE` were allowed to own organic intent.

## 6. Status resolution method (binding rule applied)

Sitemap membership was used as supporting evidence only. Every surface was resolved against repository truth:

1. Route resolution in `src/App.tsx`.
2. Public reachability (no `ProtectedRoute`, no auth or preview gating).
3. Page-level SEO behaviour via `SeoHead` (`noindex` emission).
4. Canonical target (self-referencing or pointing elsewhere).
5. Redirect presence.
6. Sitemap membership in `public/sitemap.xml`.
7. Draft or preview gating in the data layer.
8. Whether the article body is genuinely reachable through the public route.

Findings:

- `SeoHead` enforces the rule structurally: an indexable page must carry a self-referencing canonical, and any page without one must set `noindex`. A development guard errors otherwise.
- `/articles/:slug` resolves through `ArticlePage`, which looks the slug up in `articleData.ts`, renders `NotFound` when missing, and otherwise emits a self-referencing canonical with no `noindex` and no gating. No draft or preview flag exists in that dataset.
- 31 page components emit `noindex` (account, setup, saved-journey, toolkit, results, auth, 404, legacy postpartum hub). **Zero** of them appear in the sitemap.
- All 331 sitemap URLs resolve to publicly reachable, indexable, self-canonical routes.

## 7. Repository count correction

The approved brief cited 210 article records (157 / 19 / 17 / 17). Recounting literal record slugs, the true figures are:

| Dataset | Approved figure | Verified records | Cause of difference |
| --- | --- | --- | --- |
| `articleData.ts` | 157 | 156 | The TypeScript interface line `slug: string;` was counted as a record. |
| `familyArticleData.ts` | 19 | 18 | Same. |
| `firstYearArticleData.ts` | 17 | 16 | Same. |
| `toddlerArticleData.ts` | 17 | 16 | Same. |
| **Total** | **210** | **206** | |

Related correction: the three hub datasets contain **no drafts**. The single `"draft"` string in each file is part of the type union `status: "draft" | "ready"`. All 50 hub articles are `ready`.

## 8. Limitations

- The export is a single historical snapshot; positions, volumes and competitor URLs will have moved since August 2025.
- It captures only one competitor's captured demand, so it undercounts intents that competitor does not serve. IVF is materially under-represented in the source, so IVF conclusions in this audit are weak-evidence.
- Volumes are estimates, not observed traffic. No figure here reflects The Start of You's own performance.
- Keyword-to-cluster assignment is judgement-based at the margins; low-volume long-tail keywords were not individually classified.
