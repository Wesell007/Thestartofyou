## Phase 5.9 — Family Article Expansion Batch 4

Add one new ready article to each of the six Family topics, wire up interim images, and extend the grouped guidance panels. No topic-page redesign, no new topics, no schema changes.

### Files edited (only)
- `src/data/familyArticleData.ts` — append six new `FamilyArticle` objects to `rawFamilyArticles` using the existing schema (no Pregnancy Flagship fields).
- `src/components/family/article/familyArticleImages.ts` — add six interim mappings using existing assets, `afterSectionIndex: 1` (renders between sections 2 and 3), with `// bespoke future:` inline comments.
- `src/data/familyTopicData.ts` — append each new slug to the matching topic's `articleGroups` (Start Here unchanged).

### New articles
Each `status: "ready"`, British English, no em dashes, 6-7 sections, 4-6 key takeaways, 2-3 related slugs, `lastUpdated: "July 2026"`, with `intro`, `seoTitle`, `seoDescription`. No `medicallyReviewed` / `reviewedBy` fields added. Section bodies are 2 short paragraphs each, calm and practical.

| # | Topic | Slug | Title |
|---|---|---|---|
| 1 | growing-families | `second-time-parenting` | Second-time parenting: what can feel different |
| 2 | relationships | `staying-connected-as-parents` | Staying connected as parents |
| 3 | family-basics | `calmer-evenings-after-busy-days` | Calmer evenings after busy days |
| 4 | health-safety | `family-sick-days-at-home` | Getting through family sick days at home |
| 5 | travel-days-out | `planning-family-days-out` | Planning family days out without overdoing it |
| 6 | play-connection | `simple-family-play-ideas` | Simple family play ideas for everyday connection |

Section headings and related slugs match the brief exactly.

Tone guardrails:
- Article 2 uses inclusive parent/co-parent phrasing, no two-parent assumption, no therapy claims.
- Article 4 stays non-clinical: no diagnoses, medications, doses, or emergency thresholds. Uses the brief's exact broad wording: "If you are worried about a child's symptoms, or something feels urgent, ask for medical advice from the appropriate local service." No emergency numbers.

### Image mappings (interim, existing assets only)
Each entry adds one hero and one body image at `afterSectionIndex: 1` (between sections 2 and 3, per your confirmation). Bespoke direction noted inline.

| Slug | Hero | Body image |
|---|---|---|
| `second-time-parenting` | `family-hero-diverse-family` | `family-topic-growing-families` |
| `staying-connected-as-parents` | `family-hero-parents` | `family-topic-relationships` |
| `calmer-evenings-after-busy-days` | `family-hero-everyday` | `family-topic-family-basics` |
| `family-sick-days-at-home` | `family-hero-family-four` | `family-topic-family-basics` |
| `planning-family-days-out` | `family-hero-everyday` | `family-topic-growing-families` |
| `simple-family-play-ideas` | `family-hero-family-four` | `family-topic-play-connection` |

### Topic group additions in `familyTopicData.ts`
Append the new slug to the existing group's `slugs` array (Start Here untouched):
- `growing-families` → "New siblings and family change" adds `second-time-parenting`
- `relationships` → add a third group "Staying close" with `staying-connected-as-parents` (keeps existing two groups intact)
- `family-basics` → "Routines and practical planning" adds `calmer-evenings-after-busy-days`
- `health-safety` → "Feeling safer and knowing when to ask" adds `family-sick-days-at-home`
- `travel-days-out` → "Journeys and days out" adds `planning-family-days-out`
- `play-connection` → "Play, connection and screens" adds `simple-family-play-ideas`

### Guardrails
No edits to HubArticleView, Pregnancy/TTC/IVF/First Year/Toddler data, `articleData.ts`, routes, SEO files, product, About, AI logic, saved-journey logic, design tokens, or asset files. No new topics, no `/family/community-support`, no new image assets, no changes to existing ready article bodies.

### Verification
- `tsgo`
- Load the six new article routes and confirm hero, body image between sections 2 and 3, real sections, key takeaways, related guidance without drafts.
- Load all six `/family/*` topic pages — Start Here unchanged, grouped panel deeper.
- Regression: `/family`, one existing Family article, `/articles/complete-guide-morning-sickness`.
- Mobile check at 375px.
