# Phase 5.6 — Family Publish Batch 2

Publish four Family drafts to `ready` with full hand-written bodies and interim image mappings.

## Files edited (only)
- `src/data/familyArticleData.ts`
- `src/components/family/article/familyArticleImages.ts`

## Articles to publish

For each of the four existing article objects (slugs and topics unchanged, objects stay in place), replace the placeholder with a full entry: `title`, `description`, `readTime`, `status: "ready"`, `seoTitle`, `seoDescription`, `lastUpdated: "July 2026"`, `intro`, `sections` (6–7), `keyTakeaways` (4–6), `relatedSlugs` (2–3, existing Family slugs only, prefer ready).

1. **screen-time-as-a-family** (play-connection) — 7 sections per brief; related: `building-family-traditions`, `building-family-routines`, `sharing-the-mental-load`.
2. **travelling-with-young-children** (travel-days-out) — 7 sections; related: `making-car-journeys-calmer`, `building-family-routines`, `screen-time-as-a-family`.
3. **making-car-journeys-calmer** (travel-days-out) — 7 sections; related: `travelling-with-young-children`, `building-family-routines`, `screen-time-as-a-family`.
4. **setting-boundaries-with-grandparents** (relationships) — 7 sections; related: `sharing-the-mental-load`, `building-family-routines`, `helping-your-child-adjust-to-a-new-sibling`.
   - **Tone lock:** respectful and balanced. Grandparents are not framed as automatically difficult or unsafe. Focus on clarity, kindness, consistency and protecting the family rhythm. One gentle line acknowledges that if a relationship ever feels unsafe or coercive, support from a trusted professional can help — kept brief and non-assumptive.

Voice for all four: British English, no em dashes, calm/practical/warm, no medical or legal claims, no shame or perfect-family tone.

No fields added beyond the existing `FamilyArticle` schema (no quickAnswer, editorialSections, faq, sources, medicallyReviewed, reviewedBy).

## Image mappings (interim, reuse existing assets only)

Add four entries to `familyArticleImageMap` with hero + one body image after section index 2, plus an inline comment flagging the bespoke future image:

| Slug | Hero asset | Body asset (after section 2) | Bespoke future |
|---|---|---|---|
| screen-time-as-a-family | `family-hero-family-four` | `family-topic-play-connection` | shared family screen moment, warm evening light |
| travelling-with-young-children | `family-hero-everyday` | `family-topic-family-basics` | parent + small child at a train window |
| making-car-journeys-calmer | `family-hero-parents` | `family-topic-family-basics` | child in car seat, warm afternoon light |
| setting-boundaries-with-grandparents | `family-hero-diverse-family` | `family-topic-relationships` | multigenerational kitchen table scene |

## Remain draft (unchanged)
`preparing-for-another-baby`, `managing-childcare-costs`, `making-your-home-safer`, `when-to-ask-for-help`.

## Guardrails
No edits to HubArticleView, other stage data, routes, SEO files, product/About, AI logic, saved journey logic, design tokens, or `.lovable/plan.md`. No new topics. No new image assets.

## Verification
- Run `tsgo`.
- Load `/family/play-connection/screen-time-as-a-family`, `/family/travel-days-out/travelling-with-young-children`, `/family/travel-days-out/making-car-journeys-calmer`, `/family/relationships/setting-boundaries-with-grandparents` — confirm hero image, ≥1 body image, centred In this article card, key takeaways, real sections, no draft related cards, no mobile overflow.
- Load `/family` + the three topic hubs — four new cards clickable, remaining four still "Coming soon".
- Load one First Year and one Toddler HubArticleView route + `/articles/complete-guide-morning-sickness` — confirm shared renderer and Pregnancy Flagship unaffected.
