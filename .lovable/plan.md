# Family Hub — Article System Preparation

Prepare a scalable article system for the Family section: data layer, shared card, and a Related guidance section on the 6 topic pages. No article routes or bodies.

## 1. Create `src/data/familyArticleData.ts`

- `FamilyArticleTopic` union: the 6 topic slugs.
- `FamilyArticle` interface: `slug, topic, title, description, readTime, medicallyReviewed?, status`.
- `familyArticles: FamilyArticle[]` seeded with 12 draft stubs (British English titles/descriptions, 4–6 min reads). `making-your-home-safer` and `when-to-ask-for-help` marked `medicallyReviewed: true`.
- Helper `getFamilyArticlesByTopic(topic)` returning filtered list in array order.

## 2. Create `src/components/family/article/FamilyArticleCard.tsx`

Shared card, Family tokens only (`--stage-family`, `-soft`, `-accent`, `-deep`).

- Layout: serif title, muted sans description, footer row with clock + read time, chevron chip on the right.
- Optional "Medically reviewed" chip with shield icon when `medicallyReviewed`.
- Visual: rounded-2xl, family accent border, family/soft gradient background, warm shadow.
- If `status === "ready"`: `<Link to="/family/{topic}/{slug}">` with hover lift + focus ring.
- If `status === "draft"`: non-interactive `<div>`, `aria-disabled`, small "Coming soon" pill, no hover lift, no link.

## 3. Edit `src/components/family/topic/FamilyTopicPage.tsx`

Insert a new "Related guidance" section **after "Areas inside this topic"** and **before "Common questions"** — no other sections touched.

- Eyebrow: `Guidance` (via existing `SectionLabel`)
- Heading: `Related guidance`
- Subheading: `Helpful reads connected to this part of family life.`
- Grid of `FamilyArticleCard` for `getFamilyArticlesByTopic(config.slug)`.
- Empty-state fallback: `Guidance articles for this topic are being prepared.` (currently every topic shows 2 draft cards with "Coming soon" pills).

Import `getFamilyArticlesByTopic` + `FamilyArticleTopic` and `FamilyArticleCard`; cast `config.slug` to `FamilyArticleTopic` since the two unions are identical.

## 4. Out of scope

No article routes, no article bodies, no new assets, no new tokens. No changes to Family Hub, hero carousel, aiStageStyles, AskPage, AISearchBar, HubAISupport, Navbar, Footer, sibling hubs, auth, setup, saved journey, prompts, or edge functions.

## 5. Verification

- `tsgo` typecheck.
- Playwright at 1280 / 1024 / 390 on `/family/growing-families` and `/family/relationships`: Related guidance section visible, draft cards render, "Coming soon" pill clear, no links on draft cards, no horizontal scroll, mobile stacks cleanly.
- Render-ping all 6 `/family/*` topic routes.
- Spot-check `/family`, `/pregnancy`, `/first-year`, `/toddler`.

## Return summary

A. Files created  B. Files edited  C. Article data structure  D. 12 stubs added  E. Related guidance section confirmation  F. Draft / Coming soon confirmation  G. No article routes/pages created  H. Desktop/iPad/mobile checks  I. All 6 topic routes render  J. No unrelated systems changed.
