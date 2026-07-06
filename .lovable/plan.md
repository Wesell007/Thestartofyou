
# Phase 3.4 — Pregnancy Medical Sources Batch 4

## Scope
Add ≥3 verified structured `ArticleSource` entries to the next 10 existing Pregnancy medical/safety articles in `src/data/articleData.ts`. Excludes all slugs already completed in Phases 3.1–3.3.

## Only file edited
- `src/data/articleData.ts` (ArticleSources.tsx only if a bug is found)

## Field-order rule
For each article object:
- Replace the existing `sources: [...]` block **in place**, preserving its position among sibling fields.
- If `reviewedBy` is missing, insert immediately after `lastUpdated` (or directly above `sources` if no `lastUpdated`). Never overwrite an existing value.
- Do not reorder or touch any other field.

## Target articles (existing slugs only)
1. `membrane-sweep` — NHS, NICE, RCOG/Tommy's
2. `induction-of-labour` — NHS, NICE (NG207), Tommy's
3. `signs-of-labour` — NHS, NICE, Tommy's
4. `when-to-go-in-for-labour` — NHS, Tommy's, NICE
5. `stages-of-labour` — NHS, Tommy's, NICE
6. `what-happens-if-labour-doesnt-start` — NHS, NICE (induction), Tommy's
7. `cord-around-the-neck-in-pregnancy` — NHS, RCOG, Tommy's
8. `the-36-week-appointment` — NHS, NICE (antenatal care NG201), Tommy's
9. `what-happens-at-booking-appointment` — NHS, NICE (NG201), Tommy's
10. `thrush-in-pregnancy` — NHS, bumps (medicinesinpregnancy.org), NICE CKS

## URL verification protocol
- Verify each URL live on the official publisher domain before writing.
- Populate `year` from visible "Last reviewed" / "Published" dates where available.
- Never invent URLs; never guess RCOG Green-top numbers. Substitute a verified equivalent from the approved list if any planned URL fails to verify.
- Allowed domains: nhs.uk, nice.org.uk, cks.nice.org.uk, bnf.nice.org.uk, rcog.org.uk, tommys.org, gov.uk, medicinesinpregnancy.org (bumps), gbss.org.uk. Other high-trust UK medical orgs only if clearly relevant.
- If <3 verified sources are found for an article, write only what is verified and flag it in the return summary.

## Guardrails (do NOT touch)
- ArticleSources.tsx (unless bug), topic data files, `.lovable/plan.md`, routes, templates, calculators, SEO files, product page, About page, AI logic, saved journey, design tokens.
- No body rewrites, no new articles, no drafts published, no redirects, no noindex, no canonical changes.
- Do not re-touch any slug completed in Phases 3.1–3.3.

## Medical review
Ensure `reviewedBy: "Jenny Joines"` is present on each target article (add only if missing).

## Verification
- Run `tsgo`.
- Playwright-load `/articles/membrane-sweep`, `/articles/induction-of-labour`, `/articles/what-happens-at-booking-appointment`, `/articles/thrush-in-pregnancy` and confirm:
  - Sources and references heading present
  - ≥3 structured entries rendered as external anchors
  - `target="_blank"` and `rel="noopener noreferrer nofollow"`
  - Medically reviewed line present

## Return summary
- File edited
- Per-article source counts
- Publishers used per article
- Full verified URL list per article
- Any URLs that failed verification and what replaced them
- `reviewedBy` status per article
- `tsgo` result
- Any article that could not reach 3 verified UK sources
- Suggested next prompt (Phase 3.5 with next batch of remaining pregnancy medical slugs)
