# Phase 38A.1 — Toddler hub section-order correction

## Goal
Move the existing "A few quiet places to start" section (Start Here guidance, `ToddlerToolsResources`) above the existing Toddler topics section (`ToddlerTopicClusters`) on the `/toddler` hub. No redesign of either section, no copy, imagery, route, article, data, Companion, AI, grounding, age-page or topic-page changes.

## Current state (verified)
`src/pages/Toddler.tsx` composes, in order:
1. `ToddlerHero`
2. `ToddlerAgeNav` — "Growing together through every stage" age journey
3. `ToddlerTopicClusters` — Toddler topics
4. `ToddlerToolsResources` — "A few quiet places to start"
5. `ToddlerCommonQuestions`
6. `ToddlerAISupport` — the one embedded Companion
7. `ToddlerPathways` — "Where to next"

The Phase 38A focused test `src/test/phase38aToddlerUx.test.ts` asserts the current component order and must be updated to match.

## Change
1. In `src/pages/Toddler.tsx`, swap the two sections so the hub order becomes:
   - Hero → Age pathways → A few quiet places to start (`ToddlerToolsResources`) → Toddler topics (`ToddlerTopicClusters`) → Common parent questions → one late Companion → Where to next → Footer
   - Only the JSX order changes; imports stay.
2. In `src/test/phase38aToddlerUx.test.ts`, update the expected ordered component list to the new sequence. No other assertion changes.

## Verification
- Run the Phase 38A focused test and the full Vitest suite.
- Playwright check of `/toddler` at 1280, 834 and 390: section order correct, no horizontal overflow, no console errors, all links unchanged, spacing between age journey / Start Here / topics reads as intentional. Screenshots under `/tmp/browser/phase38a1/`.

## Records
- Append a Phase 38A.1 section to `docs/content/phase38a-toddler-ux-rebuild.md` (and responsive evidence file) with the measured before/after order and responsive results.
- Append a Phase 38A.1 line to `roadmap.md` and close with the required string:
  PHASE 38A.1 — TODDLER HUB SECTION-ORDER CORRECTION / CLOSED PASS / EDITORIAL START HERE MOVED AHEAD OF TOPIC EXPLORATION / NO OTHER TODDLER CHANGES.

## Boundaries
No content audit, no new articles, no route/sitemap change, no AI, grounding, database, RLS, auth, analytics, lifecycle changes. TTC, Pregnancy, First Year and all age/topic templates untouched. No deployment.
