# Toddler Subtopic Pages — Phase 2

Build 8 premium Toddler topic gateway pages from one reusable template and one typed data registry. Wire hub cluster cards to the new routes.

## Routes (registered above `/:journey/:stage` and the catch-all)
- `/toddler/development-milestones`
- `/toddler/behaviour-emotions`
- `/toddler/speech-language`
- `/toddler/sleep`
- `/toddler/food-feeding`
- `/toddler/potty-learning`
- `/toddler/health-safety`
- `/toddler/play-connection`

## Create
- `src/data/toddlerTopicData.ts` — typed `ToddlerTopicConfig` registry keyed by slug. Fields: slug, eyebrow, title, standfirst, whatThisCovers (lead + 5–6 bullets), commonQuestions (5 short Q/A), aiHeading, aiDescription, aiPlaceholder, aiPrompts (4), related (3 slugs), medicallyReviewed flag, illustration kind (`deer | rabbit | butterfly | leaf | bird`). UK English. Calm, grounded, practical. Gentle GP / health visitor / 111 signposting on Health & safety, plus light support pointers in Sleep, Food & feeding and Speech & language.
- `src/components/toddler/topic/ToddlerTopicPage.tsx` — shared template.
- `src/pages/toddler/{DevelopmentMilestones,BehaviourEmotions,SpeechLanguage,Sleep,FoodFeeding,PottyLearning,HealthSafety,PlayConnection}.tsx` — thin wrappers passing the matching config.

## Edit
- `src/App.tsx` — add the 8 routes in a clearly-commented Toddler topic block above `/:journey/:stage` and the catch-all.
- `src/components/toddler/ToddlerTopicClusters.tsx` — swap the `Link to={/ask?q=…}` for `to={/toddler/<slug>}`, mapping the 8 cards by index to the registry order. Keep the existing card visual design intact; only adjust the CTA label affordance if needed (e.g. "Explore this topic").

## Template (every topic page)
1. `Navbar`.
2. Hero — parchment background, soft apricot tint halo at top, breadcrumb `Toddler › <title>` (home icon + chevron), eyebrow `Toddler guide · <eyebrow>`, H1 from config, standfirst from config. One subtle `ToddlerIllustrations` mark at ~0.32 opacity in the top-right of the hero, `hidden sm:block`. Optional "Medically reviewed by Jenny Joines" pill (Health & safety only).
3. "What this covers" — parchment card, hairline apricot border, italic lead + 5–6 bullets with small apricot dot markers in a 2-column grid on desktop, 1-column on mobile.
4. "Common questions" — shadcn `Accordion` with 5 items, matching the parchment / hairline border styling used on the Toddler hub.
5. "Ask The Start of You" AI support — wrap `HubAISupport` in the same parchment panel + apricot wash used on the hub, passing `heading`, `description`, `placeholder`, `suggestions`, `context`, `stageBg="--stage-toddler"`, `stageAccent="--stage-toddler-accent"`. Add a single short reassurance line below.
6. "More toddler topics" — 3 same-side chevron cards linking to the related slugs.
7. Soft CTA strip back to `/toddler` (hairline divider, italic line, pill button).
8. `Footer`.

All colour, spacing, radius and shadow values reuse existing toddler stage tokens (`--stage-toddler`, `--stage-toddler-soft`, `--stage-toddler-deep`, `--stage-toddler-accent`, `--parchment`). No new CSS tokens.

## Out of scope
Toddler hero video/poster assets, Navbar, Footer, TTC, Pregnancy, First Year, IVF, legacy Postpartum, Journal, toddler month/age/article pages, Family/Parent hub, nav additions.

## Verification (Playwright headless, viewport 1280×1800 then 1024 and 390)
- `/toddler` and all 8 new routes render with no horizontal scroll.
- Hero copy readable; woodland accent subtle, not childish.
- Accordion opens/closes.
- AI panel stacks cleanly on mobile.
- Related-topic cards stack cleanly on mobile.
- All 8 hub cluster cards navigate to `/toddler/<slug>`.

## Return after build
A. Files changed · B. Routes created · C. All 8 pages render · D. Hub cards link to new routes · E. Topic page design matches Toddler hub style · F. AI support present on every topic page · G. Desktop / iPad / mobile checks passed · H. No out-of-scope files touched.
