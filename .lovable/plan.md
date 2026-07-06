
# Phase 5.7 — Family Publish Batch 3 (final four)

Publish the remaining Family drafts to `ready` with full hand-written bodies and interim image mappings. Completes the Family article library at 12/12 ready.

## Files edited (only)
- `src/data/familyArticleData.ts`
- `src/components/family/article/familyArticleImages.ts`

## Articles to publish

For each object below (slugs and topics unchanged, position preserved): replace placeholder with a full entry — `title`, `description`, `readTime`, `status: "ready"`, `seoTitle`, `seoDescription`, `lastUpdated: "July 2026"`, `intro`, `sections` (6–7), `keyTakeaways` (4–6), `relatedSlugs` (2–3, existing Family slugs, prefer ready). Family schema only, no Pregnancy Flagship fields (no `quickAnswer`, `editorialSections`, `inThisArticle`, `faq`, `sources`).

1. **preparing-for-another-baby** (growing-families) — 7 sections per brief. Family-focused only, no pregnancy medical or birth planning content. Related: `helping-your-child-adjust-to-a-new-sibling`, `building-family-routines`, `sharing-the-mental-load`.
2. **managing-childcare-costs** (family-basics) — 7 sections. No specific funded-hours rules, tax-free childcare, benefit entitlements, or figures. Include a gentle line that families can check current official guidance or speak to a qualified adviser for financial advice. Related: `building-family-routines`, `sharing-the-mental-load`, `travelling-with-young-children`.
3. **making-your-home-safer** (health-safety) — 7 sections. General practical safety only, no technical childproofing thresholds, product guarantees, or legal safety requirements. Related: `building-family-routines`, `when-to-ask-for-help`, `travelling-with-young-children`.
4. **when-to-ask-for-help** (health-safety) — 7 sections. Supportive, no clinical diagnosis, no emergency numbers, no safeguarding procedures, no legal advice. Use the two careful phrasings in the brief for immediate danger and worries about a child's safety. Related: `making-your-home-safer`, `sharing-the-mental-load`, `building-family-routines`.

Voice for all four: British English, no em dashes, calm, practical, warm, no shame or fear wording, no perfect-family tone, no legal/financial/clinical/safeguarding claims.

## Medical review fields (strict)

For **making-your-home-safer** and **when-to-ask-for-help**:
- If `medicallyReviewed` and/or `reviewedBy` already exist on the current object, preserve them exactly. Do not remove, rename, retype, or reorder them.
- Do not add these fields if they are not already present.
- Do not add medical review fields to the other two articles (`preparing-for-another-baby`, `managing-childcare-costs`).
- Do not introduce any new review-related field names anywhere.

## Image mappings (interim, existing assets only)

Add four entries to `familyArticleImageMap` with hero + one body image after section index 2, plus an inline comment flagging the bespoke future image:

| Slug | Hero asset | Body asset (after section 2) | Bespoke future |
|---|---|---|---|
| preparing-for-another-baby | `family-hero-diverse-family` | `family-topic-growing-families` | parent with older child near baby items, calm home |
| managing-childcare-costs | `family-hero-parents` | `family-topic-family-basics` | parent planning childcare at kitchen table with notebook and calendar |
| making-your-home-safer | `family-hero-everyday` | `family-topic-family-basics` | calm home detail showing everyday family safety, non-alarming |
| when-to-ask-for-help | `family-hero-family-four` | `family-topic-relationships` | supportive adult conversation in a warm home setting |

## Guardrails
No edits to HubArticleView, other stage data files, articleInventory, routes, SEO files, product/About, AI logic, saved journey, design tokens, or `.lovable/plan.md`. No new topics, no `/family/community-support`, no new image assets.

## Verification
- Run `tsgo`.
- Load `/family/growing-families/preparing-for-another-baby`, `/family/family-basics/managing-childcare-costs`, `/family/health-safety/making-your-home-safer`, `/family/health-safety/when-to-ask-for-help` — confirm hero image, ≥1 body image, centred In this article card, key takeaways, real sections, no draft related cards, no mobile overflow, no sensitive-content overreach.
- Load `/family`, `/family/growing-families`, `/family/family-basics`, `/family/health-safety` — four new cards clickable, no Family card shows Coming soon.
- Load one First Year and one Toddler HubArticleView route + `/articles/complete-guide-morning-sickness` — shared renderer safe, Pregnancy Flagship unaffected.
