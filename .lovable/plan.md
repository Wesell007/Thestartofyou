# First Year + Toddler — Article System Preparation

Mirror the Family article-readiness system into First Year and Toddler. Article-readiness only — no routes, no bodies, no assets, no tokens.

## 1. `src/data/firstYearArticleData.ts`

`FirstYearArticleTopic` union uses live topic slugs (`care-and-safety`, `body-and-hormones`, `checkups-and-warning-signs`). `FirstYearArticle` shape: `slug, topic, title, description, readTime, medicallyReviewed?, status`. `firstYearArticles[]` seeded with 16 draft stubs, British English, 4–6 min. Medically reviewed: `safe-sleep-and-home-safety`, `postnatal-checks-and-appointments`, `when-to-ask-for-help-after-birth`. Helper `getFirstYearArticlesByTopic(topic)`.

## 2. `src/components/firstyear/article/FirstYearArticleCard.tsx`

Props `article, tone?` (default `"baby"`). `tone === "recovery"` uses `--stage-recovery*`, else `--stage-firstyear*`. Layout mirrors `FamilyArticleCard`: serif title, muted sans description, clock+read time on left, chevron chip on right, optional shield "Medically reviewed" chip, optional "Coming soon" pill. Ready → `<Link to="/first-year/{topic}/{slug}">` with hover lift + focus ring. Draft → non-interactive `<div>`, `aria-disabled`, no hover lift, no link.

## 3. Edit `src/components/firstyear/topic/FirstYearTopicPage.tsx`

Insert new "Related guidance" section **after the existing Guidance section (§3) and before AI Support (§4)** — no other sections touched. Eyebrow `Guidance`, heading `Related guidance`, subheading `Helpful reads connected to this part of the first year.`, grid of `FirstYearArticleCard` for `getFirstYearArticlesByTopic(config.slug as FirstYearArticleTopic)` with `tone={config.side === "recovery" ? "recovery" : "baby"}`. Empty state: `Guidance articles for this topic are being prepared.`

## 4. `src/data/toddlerArticleData.ts`

`ToddlerArticleTopic` union matches the 8 live toddler topic slugs. `ToddlerArticle` shape identical. `toddlerArticles[]` seeded with 16 draft stubs, British English, 4–6 min. Medically reviewed: `when-to-ask-about-speech-delay`, `toddler-home-safety`, `when-to-call-the-gp`. Helper `getToddlerArticlesByTopic(topic)`.

## 5. `src/components/toddler/article/ToddlerArticleCard.tsx`

Toddler tokens only (`--stage-toddler`, `-soft`, `-accent`, `-deep`). Same layout and behaviour rules. Ready → `<Link to="/toddler/{topic}/{slug}">`. Draft → non-interactive with "Coming soon" pill.

## 6. Edit `src/components/toddler/topic/ToddlerTopicPage.tsx`

Insert new "Related guidance" section **after the AI panel and before Common questions** — no other sections touched. Same section content with subheading `Helpful reads connected to this part of toddler life.` and `getToddlerArticlesByTopic(config.slug as ToddlerArticleTopic)`.

## 7. Out of scope

No article routes/bodies, no new assets, no new tokens, no changes to Family article system, Family Hub, Family topic pages, Pregnancy, TTC, IVF, Postpartum, Journal, AskPage, aiStageStyles, AISearchBar, HubAISupport, Navbar, Footer, auth, setup, saved journey, prompts, or edge functions.

## 8. Verification

- `tsgo` typecheck.
- Playwright 1280 / 1024 / 390 on `/first-year/feeding`, `/first-year/postpartum-recovery`, `/toddler/development-milestones`, `/toddler/behaviour-emotions`: Related guidance visible, draft cards render, "Coming soon" pill clear, draft cards don't link, recovery card uses Recovery tokens, no horizontal scroll, mobile stacks.
- Render-ping all 8 First Year and all 8 Toddler topic routes.
- Spot-check `/family`, `/pregnancy`, `/first-year`, `/toddler`.

## Return

A. Files created  B. Files edited  C. FY data structure  D. Toddler data structure  E. FY stubs  F. Toddler stubs  G. FY Related guidance confirmation  H. Toddler Related guidance confirmation  I. Draft/Coming soon confirmation  J. No article routes/pages created  K. Responsive checks  L. All FY + Toddler topic routes render  M. No unrelated systems changed.
