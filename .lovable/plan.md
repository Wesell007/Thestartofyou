
# Phase 3.3 — Pregnancy Medical Sources Batch 3

## Scope
Add ≥3 verified structured `ArticleSource` entries to the next 10 existing Pregnancy medical/safety articles in `src/data/articleData.ts`. No other files change unless a bug is found in `ArticleSources.tsx`.

## Only file edited
- `src/data/articleData.ts`

## Field-order rule (unchanged from Batch 2)
For each target article object:
- Replace the existing `sources: [...]` block **in place**, keeping its position among sibling fields.
- If `reviewedBy` is missing, insert it immediately after `lastUpdated` (or directly above `sources` if no `lastUpdated`). Never overwrite an existing value.
- Do not reorder or touch any other field.

## Target articles (existing slugs only)
1. `20-week-anomaly-scan` — NHS, GOV.UK screening, Tommy's
2. `dating-scan` — NHS, GOV.UK screening, Tommy's
3. `combined-screening-test` — NHS, GOV.UK screening, Tommy's / RCOG if verified
4. `glucose-tolerance-test` — NHS, NICE (NG3 / CKS), Tommy's, Diabetes UK if verified
5. `anti-d-injection-in-pregnancy` — NHS, RCOG, Tommy's
6. `growth-scans-in-pregnancy` — NHS, Tommy's, RCOG (Green-top 31 if verified) / NHS Saving Babies' Lives
7. `low-lying-placenta-in-pregnancy` — NHS, RCOG (Green-top 27a if verified), Tommy's
8. `anterior-placenta` — NHS, Tommy's, RCOG if verified
9. `breech-baby` — NHS, RCOG (Green-top 20a/b if verified), Tommy's
10. `external-cephalic-version` — NHS, RCOG (Green-top 20a if verified), Tommy's

## URL verification protocol
- Verify each URL live on the official publisher domain before writing.
- Capture visible "Last reviewed" / "Published" year where available (populate `year`).
- Never invent URLs; never guess RCOG Green-top numbers. If a Green-top can't be confirmed, substitute a verified NHS/Tommy's/NICE equivalent.
- Allowed domains: `nhs.uk`, `nice.org.uk`, `cks.nice.org.uk`, `bnf.nice.org.uk`, `rcog.org.uk`, `tommys.org`, `gov.uk`, `medicinesinpregnancy.org` (bumps), `gbss.org.uk`, plus other high-trust UK medical orgs only if clearly relevant.
- If <3 verified sources found, write only what is verified and flag the article in the return summary.

## Guardrails (do NOT touch)
- `ArticleSources.tsx` (only if bug), topic data files, `.lovable/plan.md`, routes, templates, calculators, SEO files, product page, About page, AI logic, saved journey, design tokens.
- No body rewrites, no new articles, no drafts published, no redirects, no noindex, no canonical changes.

## Medical review
Ensure `reviewedBy: "Jenny Joines"` is present on each article (add only if missing).

## Verification
- Run `tsgo`.
- Playwright-load `/articles/20-week-anomaly-scan`, `/articles/glucose-tolerance-test`, `/articles/anti-d-injection-in-pregnancy`, `/articles/breech-baby` and confirm:
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
- Suggested next prompt (Phase 3.4 with next 10 slugs)
