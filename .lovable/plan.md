## Phase 9.2f — TTC Hub UX Polish (pre-SEO)

TTC-only polish pass. No SEO, routes, sitemap, robots, article copy, calculator logic, or other hub files touched.

### Files to inspect (read-only)
- `src/pages/TTC.tsx` — section ordering
- `src/components/ttc/TTCCommonQuestions.tsx` — current version (replaced)
- `src/components/ttc/TTCPathways.tsx`, `TTCFocus.tsx`, `TTCStages.tsx`, `TTCWhatThisCovers.tsx` — check where IVF currently surfaces
- `src/data/ttcTopicData.ts` — confirm IVF topic entry
- `src/pages/AskPage.tsx` — extend suggestion map
- Reference only: `FamilyCommonQuestions.tsx`, `firstyear/new/FYCommonQuestions.tsx` for accordion pattern

### Files to edit

**1. `src/components/ttc/TTCCommonQuestions.tsx`** — replace
Rewrite using the FY/Family accordion pattern in TTC green (`--stage-ttc*`). Six items:
1. Fertile window → `/trying-to-conceive/ovulation` · `topic=fertile-window`
2. Cycle tracking → `/trying-to-conceive/cycle-tracking` · `topic=cycle-tracking`
3. Pregnancy tests → `/trying-to-conceive/pregnancy-tests` · `topic=pregnancy-tests`
4. Two-week wait → `/trying-to-conceive/two-week-wait` · `topic=two-week-wait`
5. When to ask for help → `/trying-to-conceive/fertility` · `topic=when-to-ask-help`
6. IVF next step → `/ivf` · `topic=ivf-next-step`

Each item: question, short answer (exact copy from brief), Read more link, Ask more link `/ask?stage=ttc&topic=...`. Heading "Questions while trying to conceive"; subheading as specified. Careful wording — no medical thresholds.

**2. New `src/components/ttc/TTCIVFPathway.tsx`**
Standout full-width feature panel (wider than topic cards, stronger border, TTC green palette, calm tone):
- Eyebrow: CONNECTED HUB
- Title: Explore IVF guidance
- Description: as specified
- Primary CTA button → `/ivf` ("Go to IVF hub")
- Secondary text link → `/ivf-timeline` ("View IVF timeline")
- Subtle arrow/pathway visual, no alarming tone

**3. `src/pages/TTC.tsx`** — reorder + insert
New order:
```text
Hero
WhatThisCovers
AISupport
CommonQuestions   ← new position (was after WhatMakesDifferent)
Stages
Focus
WhatMakesDifferent
IVFPathway        ← NEW, between Focus/Different and library
EmotionalReminder
Reflection
Capture
Pathways
FinalCTA
```
Import `TTCIVFPathway`. Keep all existing sections mounted.

**4. `src/components/ttc/TTCPathways.tsx`** — de-emphasise IVF
If the current pathways/library grid surfaces IVF as a small card, drop that single card (or swap it for a non-IVF pathway) so IVF only appears in the standout section. No other content changes.

**5. `src/pages/AskPage.tsx`** — add TTC suggestions
`ttc` already exists in `aiStageStyles`. Add `TTC_TOPIC_SUGGESTIONS` map with the six topic keys and 4 chips each (exact strings from brief). Extend the `topicSuggestions` selector:
```ts
|| (stageKey === "ttc" && TTC_TOPIC_SUGGESTIONS[topic])
```
No changes to first-year/recovery/family/toddler/generic behaviour.

### Behaviour after change
- `/trying-to-conceive`: IVF surfaces only as a clear standout pathway section; common questions accordion present with TTC green styling.
- `/ask?stage=ttc&topic=<key>` for the 6 keys: TTC tint, blank input, generic chips hidden, TTC chips shown, no auto-submit.
- `/ask` and other stage/topic URLs: unchanged.

### Verification
- `bunx tsgo --noEmit`
- Playwright screenshots: `/trying-to-conceive` at 1280×1800 and 375×812
- Playwright: 6 TTC Ask URLs render TTC styling with correct chips
- Regression: `/ask`, `/ask?stage=first-year&topic=sleep`, `/ask?stage=recovery&topic=recovery-bleeding`, `/ask?stage=family&topic=another-baby`, `/ask?stage=toddler&topic=tantrums`, `/pregnancy`, `/first-year`, `/toddler`, `/family`, `/ivf`, `/articles/complete-guide-morning-sickness`

After ship: safe to proceed to Phase 9.3 TTC SEO.
