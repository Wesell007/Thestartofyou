# Phase 4.6 — Rewrite `emotional-wellbeing-pregnancy` to Flagship

Rewrite only the existing `emotional-wellbeing-pregnancy` object in `src/data/articleData.ts` (lines 2678–2752) to the Flagship article standard used by the three trimester cornerstones. Nothing else touched.

## File edited

- `src/data/articleData.ts` (single object rewrite; slug, route, position unchanged)

No changes to templates, routes, topic data, article inventory, SEO, calculators, product, About, AI, saved journey, design tokens, or `.lovable/plan.md`.

## Object shape

Replace fields in place; add missing Flagship fields near their trimester-cornerstone positions. Preserve legacy fields the object already carries (`howThisFeels`, `whatHappening`, `timing`, `whatItFeelsLike`, `whatThisMeans`, `normal`, `seekSupport`, `disclaimer`, `whatYouCanDo`, `whatHappensNext`, `relatedStage`, `aiPrompts`, `captureIntro`, `journey`, `topics`, `isCornerstone`, `productPromotion`) with light copy touch-ups only where wording is stale.

### Updated / added fields

- `title` → `Emotional wellbeing in pregnancy`
- `metaDescription` → `A calm guide to emotional wellbeing in pregnancy, including anxiety, mood changes, identity shifts, support options and when to ask for help.`
- `standfirst` → new one-paragraph warm intro (no em dashes)
- `quickAnswer` → new ~110-word supportive answer covering common causes, that not everyone feels instant joy, where support comes from, and urgent-help signposting
- `topic` → `"feelings"` (closest existing valid topic value; `emotional-health` is not defined in the dataset)
- `reviewedBy` → `Jenny Joines` (already present, kept)
- `lastUpdated` → `May 2026`
- `inThisArticle` → 8 items matching the section headings
- `keyTakeaways` → 6 items (per brief)
- `editorialSections` → 8 sections, each with `id`, `heading`, `lead`, `paragraphs`, and a `callout` where useful:
  1. Why pregnancy can feel emotional
  2. Feelings that can be part of pregnancy
  3. Anxiety, low mood and overwhelm
  4. Pregnancy after loss, fertility treatment or difficult experiences
  5. Relationships, identity and pressure
  6. What can help day to day
  7. When to ask for support (callout: "You do not need to wait until things feel unbearable before asking for help.")
  8. Where to get help
- `faq` → 8 questions from the brief, short careful answers
- `sources` → 5 structured `{ label, publisher, url }` entries:
  - NHS — Mental health in pregnancy
  - NHS — Feelings, relationships and pregnancy
  - Tommy's — Mental wellbeing during pregnancy
  - Royal College of Psychiatrists — Mental health in pregnancy
  - Mind — Perinatal mental health
- `relatedSlugs` → `["anxiety-in-pregnancy", "pregnancy-after-loss", "the-first-trimester-emotionally", "when-the-joy-doesnt-arrive-yet", "first-trimester-complete-guide"]`

## Tone and safety

British English, no em dashes, no American spelling, short paragraphs, calm and practical. Non-diagnostic.

Urgent-help wording follows the exact careful pattern:

> If you feel unsafe, unable to cope, or worried you might harm yourself or your baby, seek urgent help.

No phone numbers, no crisis protocols, no invented hotlines. Signposts only to midwife, GP, maternity unit, NHS Talking Therapies, perinatal mental health team, crisis and emergency support, trusted people, and specialist charities. Never implies that rest, journalling or lifestyle supports replace professional care for serious symptoms.

## Rendering

Object retains `quickAnswer` + non-empty `editorialSections` + non-empty `keyTakeaways`, so `/articles/emotional-wellbeing-pregnancy` renders through `ArticleFlagshipTemplate`. Medically reviewed badge appears once (hero); the duplicate At-a-glance badge was already removed in Phase 4.1.

## Guardrails

No new files, routes, redirects, noindex, canonical, or topic-data changes. Do not relink this article into topic-page card lists. No Family articles published.

## Verification

- `tsgo` typecheck.
- Load `/articles/emotional-wellbeing-pregnancy` → flagship render, one badge, 8 sections, 6 takeaways, 8 FAQs, 5 structured sources.
- Spot-check `/pregnancy`, `/pregnancy/body`, `/pregnancy/health-and-safety` unchanged.
