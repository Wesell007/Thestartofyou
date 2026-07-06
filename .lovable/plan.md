## Phase 3 — Sources infrastructure + Pregnancy medical batch 1

Add a structured `ArticleSource` shape for references, teach `ArticleSources.tsx` to render both legacy strings and the new structured shape, then add 3+ UK-credible **verified** sources (and the medically reviewed line where missing) to the 10 Pregnancy medical articles in batch 1. No topic data, no route changes, no body rewrites.

### Current state (findings)
- `src/data/articleData.ts` already types `sources?: string[]` (line 132) and `reviewedBy?: string` (line 134). Many articles already use `reviewedBy: "Jenny Joines"`.
- `src/components/article/ArticleSources.tsx` renders sources as a numbered list under a subdued "Sources and references" section. Layout correct, but sources are plain strings with no links.
- All 10 batch 1 slugs exist in `articleData.ts`.
- Templates (`ArticlePage.tsx` / `ArticleDeepTemplate.tsx`) already wire in `ArticleSources`. No template changes needed.

### Type change (minimal, backwards compatible)
Add a structured type and widen the `sources` field so no existing string entries break:

```ts
export interface ArticleSource {
  label: string;       // guidance / page title
  publisher: string;   // NHS, NICE, RCOG, Tommy's, UKHSA, bumps, Group B Strep Support
  url: string;         // verified official source URL
  year?: string;       // publication or last-review year, if shown on the page
}

// on ArticleData
sources?: Array<string | ArticleSource>;
```

Legacy string entries stay valid; new batch 1 entries use `ArticleSource`. No sweep of other existing source arrays.

### Component change — `src/components/article/ArticleSources.tsx`
Same visual container and "Sources and references" heading. Only the `<li>` renderer changes:

- String entry: render as today.
- `ArticleSource` entry:
  - `label` becomes `<a href={url} target="_blank" rel="noopener noreferrer nofollow" className="underline decoration-border/40 underline-offset-4 hover:text-foreground/80">`
  - append `— {publisher}` and, if `year`, ` (${year})` as muted trailing text
  - keep `[n]` numeric prefix and existing typography tokens

No layout redesign. No new colour tokens. No new sections.

### URL verification protocol (new — per user instruction)
Before writing any structured source into the data file:

1. Fetch each candidate URL via `websearch--web_search` / `code--fetch_website` against the official publisher domain only:
   - `nhs.uk`, `nice.org.uk` (incl. `cks.nice.org.uk`, `bnf.nice.org.uk`), `rcog.org.uk`, `tommys.org`, `gov.uk` (UKHSA), `medicinesinpregnancy.org` (bumps), `gbss.org.uk`.
2. Accept only URLs that resolve to a real page on that domain and match the intended topic. Capture the page's shown `Last reviewed` / publication year where visible.
3. If a candidate does not verify: swap for another verified page from the allowed publisher list. If no acceptable replacement is found for a slot, drop it and flag the article in the return summary as needing manual source review.
4. Never approximate slugs, never guess query strings, never invent RCOG Green-top numbers. If a Green-top URL cannot be confirmed on `rcog.org.uk`, substitute an NHS / NICE CKS equivalent or flag.
5. Each of the 10 articles must end with **≥ 3 verified sources**, or be flagged (still write whatever verified sources were found — do not fabricate to reach 3).

### Data updates — 10 articles in `src/data/articleData.ts`
For each slug below, add a `sources: ArticleSource[]` populated only from verified URLs per the protocol above, and add `reviewedBy: "Jenny Joines"` if missing (do not overwrite existing values). Article body copy is not touched.

Publishers to draw from per slug (final URL list produced during implementation, only after verification):

- **bleeding-in-early-pregnancy** — NHS, Tommy's, RCOG or NICE CKS
- **spotting-in-pregnancy** — NHS, Tommy's, NICE CKS
- **reduced-movements-in-pregnancy** — NHS, RCOG, Tommy's
- **pelvic-pain-in-pregnancy** — NHS, RCOG, Tommy's
- **when-to-worry-about-cramps-in-pregnancy** — NHS, Tommy's, NICE CKS
- **leaking-fluid-in-pregnancy** — NHS, RCOG, Tommy's
- **uti-in-pregnancy** — NHS, NICE CKS, RCOG or Tommy's
- **group-b-strep-in-pregnancy** — NHS, RCOG, Group B Strep Support
- **medicines-in-pregnancy** — NHS, bumps (medicinesinpregnancy.org), NICE BNF
- **paracetamol-in-pregnancy** — NHS, bumps, NICE CKS

### Medical review line
`reviewedBy: "Jenny Joines"` is already supported and rendered by the existing component's trust note. Added only where missing on batch 1 slugs. No metadata-model refactor.

### Files touched
- `src/data/articleData.ts` — add `ArticleSource` interface, widen `sources`, add verified sources + `reviewedBy` on the 10 slugs.
- `src/components/article/ArticleSources.tsx` — render structured entries as safe external links; keep string fallback.

### Explicitly not touched
Topic data (pregnancy/ttc/ivf/family/firstyear/toddler), routes, templates, calculators, product, About, AI, saved journey, design tokens, `.lovable/plan.md` structure beyond this phase, redirects, noindex, canonical decisions, article body copy.

### Verification
- `tsgo`.
- Playwright: load `/articles/bleeding-in-early-pregnancy`, `/articles/reduced-movements-in-pregnancy`, `/articles/group-b-strep-in-pregnancy`, `/articles/paracetamol-in-pregnancy`, screenshot the Sources block, confirm ≥3 entries, external `target="_blank"` + `rel="noopener noreferrer nofollow"`, medically reviewed line present, no visual regression above.

### Return summary (after implementation)
- Files edited.
- Confirm type standardised (added `ArticleSource`, widened `sources`) — no existing string entries touched.
- Component changes summary.
- Per-article: source count, publishers used, verified URLs list.
- Any URLs that failed verification and what was substituted or flagged.
- `reviewedBy` status per article (added / already existed).
- `tsgo` result.
- Articles flagged for manual source review.
- Suggested next prompt.
