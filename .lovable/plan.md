
# Phase 3.5 — Pregnancy Medical Sources Batch 5

## Scope
Add ≥3 verified structured `ArticleSource` entries to the next 10 existing Pregnancy symptom/safety articles in `src/data/articleData.ts`. Excludes all slugs completed in Phases 3.1–3.4.

## Only file edited
- `src/data/articleData.ts` (ArticleSources.tsx only if a bug is found)

## Field-order rule
For each article object:
- Replace the existing `sources: [...]` block **in place**, preserving its position among sibling fields.
- If `reviewedBy` is missing, insert immediately after `lastUpdated` (or directly above `sources` if no `lastUpdated`). Never overwrite an existing value.
- Do not reorder or touch any other field.

## Target articles (existing slugs only)
1. `discharge-in-pregnancy` — NHS, Tommy's, NICE CKS
2. `watery-discharge-in-pregnancy` — NHS, Tommy's, RCOG (waters breaking early)
3. `mucus-plug` — NHS, Tommy's, NICE
4. `show-in-pregnancy` — NHS, Tommy's, NICE
5. `heartburn-in-pregnancy` — NHS, NICE CKS, bumps
6. `constipation-in-pregnancy` — NHS, NICE CKS, bumps
7. `back-pain-in-pregnancy` — NHS, Tommy's, POGP/RCOG
8. `round-ligament-pain` — NHS, Tommy's, RCOG (pelvic pain)
9. `swelling-in-pregnancy` — NHS, Tommy's, RCOG/NICE
10. `shortness-of-breath-in-pregnancy` — NHS, Tommy's, RCOG (VTE) if relevant

## URL verification protocol
- Verify each URL live on the official publisher domain before writing.
- Populate `year` from visible "Last reviewed" / "Published" dates where available.
- Never invent URLs; never guess RCOG Green-top numbers. Substitute a verified equivalent from the approved list if a URL fails.
- Allowed domains: nhs.uk, nice.org.uk, cks.nice.org.uk, bnf.nice.org.uk, rcog.org.uk, tommys.org, gov.uk, medicinesinpregnancy.org (bumps), gbss.org.uk. Other high-trust UK medical orgs only if clearly relevant (e.g. POGP for pelvic girdle pain).

## Manual review rule
If only 2 strong specific UK sources exist for an article, write those and flag it — do not fabricate a weak third.

## Guardrails (do NOT touch)
- ArticleSources.tsx (unless bug), topic data, `.lovable/plan.md`, routes, templates, calculators, SEO, product page, About page, AI logic, saved journey, design tokens.
- No body rewrites, no new articles, no drafts, no redirects, no noindex, no canonical changes.
- Do not re-touch any slug completed in Phases 3.1–3.4.

## Medical review
Ensure `reviewedBy: "Jenny Joines"` is present on each target article (add only if missing).

## Verification
- Run `tsgo`.
- Playwright-load `/articles/discharge-in-pregnancy`, `/articles/mucus-plug`, `/articles/heartburn-in-pregnancy`, `/articles/shortness-of-breath-in-pregnancy` and confirm:
  - Sources and references heading present
  - Structured entries rendered as external anchors
  - `target="_blank"` and `rel="noopener noreferrer nofollow"`
  - Medically reviewed line present

## Return summary
- File edited
- Per-article source counts
- Publishers used per article
- Full verified URL list per article
- Any URLs that failed verification and what replaced them
- Any articles flagged for manual review and why
- `reviewedBy` status per article
- `tsgo` result
- Suggested next prompt (Phase 3.6 with next batch of remaining pregnancy slugs)
