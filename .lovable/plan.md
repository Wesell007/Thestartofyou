## Phase 3.2 — Pregnancy medical sources batch 2

Add ≥3 verified, structured `ArticleSource` entries to the next 10 Pregnancy medical/safety articles, using only the existing `ArticleSource` type and `ArticleSources.tsx` renderer shipped in Phase 3.1. No component changes, no body rewrites, no topic data touched.

### Only file edited
- `src/data/articleData.ts`

### Field-order rule (per user)
For each article object:
- Replace the existing `sources: [...]` block **in place**, keeping the same position among sibling fields.
- If `reviewedBy` is missing, insert it in a natural place (immediately after `lastUpdated` if present, otherwise directly above `sources`). Do not reorder any other field.
- Do not touch any other field on the article object.

### Approach per article
For each of the 10 slugs:
1. Locate the article's current `sources` array (each already exists as a string array).
2. Replace it in place with a structured `ArticleSource[]` of ≥3 verified entries from the approved publisher list.
3. Ensure `reviewedBy: "Jenny Joines"` is present; add only if missing, positioned per the field-order rule above.

Nothing else in the article object changes.

### URL verification protocol
Before writing any URL:
- Query via `websearch--web_search` restricted with `site:` to the official publisher domain (`nhs.uk`, `nice.org.uk`, `cks.nice.org.uk`, `bnf.nice.org.uk`, `rcog.org.uk`, `tommys.org`, `gov.uk`, `medicinesinpregnancy.org`, `gbss.org.uk`, plus `rcpsych.ac.uk` / `arc-uk.org` / `pandasfoundation.org.uk` only where the article's guidance explicitly allows).
- Accept only URLs that resolve on the intended official domain and cover the intended topic. Capture `year` from a visible "Last reviewed" / "Published" date where present.
- Never invent slugs. Never guess RCOG Green-top numbers.
- If a slot cannot be verified, substitute another verified entry from the allowed list. If ≥3 verified UK-credible sources cannot be assembled for a given article, write only what is verified and flag the article in the return summary — do not fabricate.

### Articles in batch 2 and target publisher mix

- `antibiotics-in-pregnancy` — NHS, bumps, BNF/NICE
- `antacids-in-pregnancy` — NHS, bumps, BNF/NICE
- `laxatives-in-pregnancy` — NHS, bumps, BNF/NICE
- `hay-fever-in-pregnancy` — NHS, bumps, BNF/NICE
- `cold-and-flu-in-pregnancy` — NHS, bumps, UKHSA / NHS flu-vaccine guidance
- `vaccinations-in-pregnancy` — NHS, UKHSA (gov.uk Green Book / vaccination schedule), RCOG or Tommy's
- `anxiety-in-pregnancy` — NHS, Tommy's, RCPsych (or another verified UK perinatal mental health source)
- `tests-and-scans-in-pregnancy` — NHS, Tommy's, RCOG or NICE
- `what-if-a-scan-shows-something-unexpected` — NHS, Tommy's, RCOG, ARC (only if verified)
- `nipt-in-pregnancy` — NHS, RCOG, UK NSC / gov.uk or Tommy's

Final URL list produced during implementation, after verification.

### Explicit no-touch list
`ArticleSources.tsx` (unless a bug is found), all topic data files, all other article data files, `.lovable/plan.md`, routes, templates, calculators, SEO, product page, About page, AI logic, saved journey, design tokens. No new articles, no redirects, no noindex, no body rewrites, no changes to unrelated string `sources` arrays elsewhere in `articleData.ts`, no field reordering beyond the single insert-if-missing case for `reviewedBy`.

### Verification
- `tsgo`.
- Playwright: load `/articles/antibiotics-in-pregnancy`, `/articles/vaccinations-in-pregnancy`, `/articles/anxiety-in-pregnancy`, `/articles/nipt-in-pregnancy`. Screenshot the Sources block, confirm heading present, ≥3 structured entries rendering as external anchors with `target="_blank"` + `rel="noopener noreferrer nofollow"`, and medically reviewed line visible.

### Return summary (after implementation)
- File edited.
- Per article: source count, publishers used, full verified URL list.
- Any candidate URLs that failed verification and their substitutes.
- `reviewedBy` status per article (already present or inserted, and where inserted).
- `tsgo` result.
- Any article flagged for manual source review.
- Suggested next prompt.
