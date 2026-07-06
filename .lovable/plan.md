## Phase 5.3 — Site-wide article presentation upgrade (via HubArticleView)

### Decision: Option A — upgrade the shared `HubArticleView`

`HubArticleView` is the single renderer used by Family, First Year and Toddler article pages. All three pass the same shape (`title`, `intro`, `sections`, `keyTakeaways`, tokens). Upgrading it once lifts every hub in a stage-token-aware way, without touching Pregnancy Flagship (which uses `ArticleFlagshipTemplate` via `src/pages/ArticlePage.tsx` and `src/components/article/flagship/*`).

No new data fields are required. Every new block renders only when the underlying data already exists, so First Year and Toddler articles (all currently drafts) degrade gracefully.

### Files to edit

1. `src/components/shared/HubArticleView.tsx` — the presentation upgrade.
2. `src/components/family/article/FamilyArticlePage.tsx` — filter related to `status === "ready"`.
3. `src/components/firstyear/article/FirstYearArticlePage.tsx` — same ready-only related filter, for consistency and to future-proof once First Year articles publish.
4. `src/components/toddler/article/ToddlerArticlePage.tsx` — same ready-only related filter.

No data, routes, SEO, tokens, Pregnancy, TTC, IVF, First Year data, Toddler data, product, About, AI, or saved-journey files are touched.

### Presentation changes inside `HubArticleView`

Using existing stage tokens (`tokens.base/soft/accent/deep`) only. Each block renders only if the corresponding data is present.

1. **Premium hero refinement** — keep breadcrumb, eyebrow, serif H1, italic standfirst, meta row. Tighten spacing, strengthen the top wash, add a soft bottom fade so the hero flows into the summary strip like the Pregnancy screenshots. Reviewed badge continues to render only when `medicallyReviewed && reviewedBy` (Family articles don't set these, so no false medical claims).

2. **"At a glance" + "In this article" two-card strip (new)** — rendered under the hero. Left card ("At a glance") shows `intro` (fallback to `description`). Right card ("In this article") is auto-generated from `sections[].heading` as a numbered anchor list to `#section-{i}`, and renders only when `sections.length >= 2`. Stacks on mobile, two columns on md+.

3. **Key takeaways upgrade** — replace the single bullet list with a premium 2-col grid of small cards (1-col on mobile), each with a subtle accent bullet/icon and calm border, matching "The essentials, at a glance" in the screenshot. Section eyebrow + serif H2 above.

4. **Body rhythm** — add `id={`section-${i}`}` to each `h2` so "In this article" anchors work. Increase vertical spacing, slightly larger H2 scale, calmer paragraph line-height, keep max-width readable. Small muted section number (01, 02, …) as an eyebrow above each H2. Purely presentational.

5. **Reviewed callout** — existing "Medically reviewed by …" strip kept (opt-in only), lightly restyled to match the takeaways card treatment.

6. **Related guidance** — no renderer change beyond spacing; filtering happens in the three hub pages so only `status === "ready"` articles are passed via `relatedSlot`. If none remain, `relatedSlot={null}` hides the whole section (existing behaviour).

7. **Return CTA** — keep structure; refined typography, using existing `topicLabel` in the button ("Return to Family basics" / "Return to Play, fun and connection" etc.).

### Non-goals / guardrails

- No Family article content rewritten; no slugs, routes, SEO, or data fields changed.
- No Pregnancy-only fields (FAQ, Sources, Normal-signals, quickAnswer, editorial sections) added to Family/First Year/Toddler data.
- Pregnancy Flagship template untouched.
- First Year and Toddler benefit from the upgrade automatically because they render through the same shared view; no data changes on their side.
- No new design tokens.

### Verification

- `tsgo` typecheck.
- Load the four published Family URLs and confirm: premium hero, At-a-glance + In-this-article strip, upgraded takeaways grid, improved body rhythm with anchor-linked H2s, no draft "Coming soon" cards in related, calm return CTA.
- Load `/family`, `/articles/first-trimester-complete-guide`, `/articles/complete-guide-morning-sickness` to confirm no regressions on Family hub or Pregnancy Flagship.
- Load one First Year article route (e.g. `/first-year/sleep/<first draft slug from firstYearArticleData.ts>`) and one Toddler article route (e.g. `/toddler/sleep/<first draft slug from toddlerArticleData.ts>`) that render via HubArticleView. Confirm:
  - Upgraded layout renders correctly with First Year and Toddler stage tokens (colour treatment, wash, borders, eyebrows).
  - Spacing and hero rhythm hold up even when article data is minimal (draft articles with no `sections`, `intro`, or `keyTakeaways` show only the hero + coming-soon body without empty ghost cards).
  - The existing "Draft preview" chip still shows for drafts; no draft related cards appear inside a draft article (ready-only related filter is applied on those pages too).
- Mobile viewport check: no horizontal overflow on Family, First Year and Toddler article routes.

### Suggested next prompt

Phase 5.4 — First Year and Toddler published-article visual QA against the new shared presentation, and identify the next Family publish batch.
