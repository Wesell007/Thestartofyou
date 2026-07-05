# Article Detail System — Family, First Year, Toddler

Add scalable article routes, shared article page templates and extended article data (placeholder-only) for Family, First Year and Toddler. Nothing goes live: every article stays `status: "draft"`; cards continue to be non-linking "Coming soon". Direct route visits render a draft preview.

## 1. Extend article data (placeholder only)

Edit `src/data/familyArticleData.ts`, `src/data/firstYearArticleData.ts`, `src/data/toddlerArticleData.ts`.

Extend each article interface with the optional fields:

```ts
seoTitle?: string;
seoDescription?: string;
lastUpdated?: string;
reviewedBy?: string;
intro?: string;
sections?: { heading: string; body: string[] }[];
keyTakeaways?: string[];
relatedSlugs?: string[];
```

For each of the 12 Family + 16 First Year + 16 Toddler drafts, add light placeholder:
- `intro`: 1 short paragraph mentioning the article is being prepared.
- `sections`: 2–3 entries with headings and 1–2 paragraph bodies flagged as placeholders.
- `keyTakeaways`: 3 short lines.
- `relatedSlugs`: the sibling article in the same topic (and one adjacent topic where obvious).
- `lastUpdated` / `reviewedBy` only where a medically-reviewed flag already exists (`reviewedBy: "Jenny Joines"`, `lastUpdated: "2026-07"`).

No status changes — everything remains `"draft"`.

## 2. Shared article page templates

Create:
- `src/components/family/article/FamilyArticlePage.tsx` (Family tokens)
- `src/components/firstyear/article/FirstYearArticlePage.tsx` (accepts `tone: "baby" | "recovery"`; picks First Year vs Recovery tokens like the existing card)
- `src/components/toddler/article/ToddlerArticlePage.tsx` (Toddler tokens)

Each template shares the same structure:
- Navbar
- Breadcrumb: Hub → Topic title → Article title
- Article hero: eyebrow (topic label), H1 title, standfirst (intro), meta row (read time · last updated · optional "✔ Medically reviewed by Jenny Joines")
- Draft-status pill when `status === "draft"` (small "Draft preview" chip in the meta row)
- Key takeaways card (if provided)
- Article body: renders `sections[]` — `h2` heading + paragraphs; falls back to a quiet "This article is being prepared" note when `sections` empty
- Medically reviewed note block if applicable
- Related guidance: reuses the existing `FamilyArticleCard` / `FirstYearArticleCard` / `ToddlerArticleCard` for `relatedSlugs` (drafts still show Coming soon, so nothing goes live)
- Back-to-topic CTA linking to `/{hub}/{topic}`
- Footer

Visual language mirrors the topic pages already shipped (rounded editorial cards, hairline section labels, warm shadows, gradient washes).

## 3. Route wrapper pages

Create:
- `src/pages/family/FamilyArticle.tsx`
- `src/pages/firstyear/FirstYearArticle.tsx`
- `src/pages/toddler/ToddlerArticle.tsx`

Each wrapper:
1. `useParams<{ topic: string; slug: string }>()`.
2. Look up the article via its data file, matching both `topic` and `slug`.
3. If missing → render `<NotFound />` (existing 404).
4. If found → render the matching article template. Draft vs ready is handled inside the template (draft simply shows the "Draft preview" pill).
5. For First Year, look up the topic's `side` via `FIRST_YEAR_TOPIC_INDEX[topic]` and pass `tone`.

## 4. Register routes in `src/App.tsx`

Insert the three dynamic article routes **after the last static hub/topic route in each hub block, and before `<Route path="*" element={<NotFound />} />`** (line ~335). Because static routes are declared first, React Router matches `/family/growing-families` to its dedicated page before the `:topic/:slug` route ever sees it.

```
<Route path="/family/:topic/:slug" element={<FamilyArticle />} />
<Route path="/first-year/:topic/:slug" element={<FirstYearArticle />} />
<Route path="/toddler/:topic/:slug" element={<ToddlerArticle />} />
```

Add matching imports at the top.

## 5. Cards — confirm draft behaviour unchanged

`FamilyArticleCard`, `FirstYearArticleCard`, `ToddlerArticleCard` already: draft → non-interactive `<div>` with "Coming soon" pill; ready → `<Link to="/{hub}/{topic}/{slug}">`. Verify only — no changes.

## 6. Draft visibility

Nothing is promoted to live: every article stays `"draft"`, every topic-page card remains non-linking with the Coming soon pill. Direct URL visits (or a manual navigation) render the draft-preview article template safely.

## 7. Out of scope

No final article body copy, no images, no new tokens, no new nav items, no journey logic, no changes to Pregnancy, TTC, IVF, Postpartum, Journal, AskPage, AISearchBar, HubAISupport, aiStageStyles, Navbar, Footer, auth, setup, saved journey, prompts or edge functions.

## 8. Verification

- `tsgo` typecheck.
- Playwright 1280 / 1024 / 390:
  - Topic pages `/family/growing-families`, `/first-year/feeding`, `/toddler/development-milestones` — Related guidance renders, drafts still don't link, Coming soon visible, no layout break.
  - Article previews `/family/growing-families/preparing-for-another-baby`, `/first-year/feeding/newborn-feeding-rhythms`, `/toddler/development-milestones/what-toddler-development-can-look-like` — template renders, breadcrumb works, "Draft preview" pill visible, key takeaways and placeholder body render, back-to-topic CTA works, no horizontal scroll, mobile stacks.
- Spot-check `/family`, `/first-year`, `/toddler`, `/pregnancy` still render.

## Return summary

A. Files created  B. Files edited  C. Interfaces extended  D. Templates created  E. Wrappers created  F. Routes registered  G. Draft cards still don't link  H. Direct preview routes render  I. Responsive checks passed  J. Existing hub/topic routes still render  K. No final copy, images, tokens, AI logic, auth, setup, journey logic or unrelated hubs changed.
