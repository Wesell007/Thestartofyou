## Phase 9.2f.1 — TTC Placement + Common Questions Link Audit

TTC-only correction. No SEO, sitemap, robots, article copy, calculator, or other-hub changes.

### Files inspected
- `src/pages/TTCHub.tsx` (live TTC hub; `TTC.tsx` is `/legacy` only)
- `src/components/ttc/TTCCommonQuestions.tsx`
- `src/components/ttc/TTCIVFPathway.tsx`
- `src/App.tsx` (route map — confirms `TTCHub` is `/trying-to-conceive`)
- `src/data/articleData.ts` (TTC article slug audit)

### Issue 1 — Section order (edit `src/pages/TTCHub.tsx`)

Current render (lines ~1096–1103):
```text
Hero → WhatThisCovers → AISupport → TTCCommonQuestions → JourneyTimeline → TTCIVFPathway → TopicLibrary → Reassurance
```

`TopicLibrary` already contains the "Timing & testing" and "Fertility & health" groupings, so IVF pathway and Common Questions must move **after** it.

New render order:
```text
Hero
WhatThisCovers
AISupport
JourneyTimeline          (TTC journey / stages)
TopicLibrary             (core TTC topics incl. Timing & testing, Fertility & health)
TTCIVFPathway            ← moved here (immediately after Fertility & health group)
TTCCommonQuestions       ← moved here (immediately after IVF pathway)
Reassurance
```

Only reorder the JSX in the `TTCHub` component; no other logic touched.

### Issue 2 — Common Questions link audit (edit `src/components/ttc/TTCCommonQuestions.tsx`)

Article-slug audit result:

| Question | Real article? | Decision |
|---|---|---|
| Fertile window | ✓ `/articles/fertile-window` | **Read more** → article |
| Cycle tracking | ✗ (subtopic only) | **Remove Read more button.** Keep instant answer + Ask more. |
| Pregnancy tests | ✓ `/articles/when-to-take-a-pregnancy-test` | **Read more** → article |
| Two-week wait | ✓ `/articles/two-week-wait` | **Read more** → article |
| When to ask for fertility help | ✓ `/articles/how-long-to-try-before-getting-help` | **Read more** → article |
| IVF next step | Hub, not article | **Explore IVF guidance** → `/ivf` (relabelled; icon stays) |

Implementation:
- Extend `QItem` with an optional `readMore` object (`{ href, label }`). When absent, the accordion body renders only the instant answer + Ask more chip.
- Update the six question entries with the mapping above. IVF entry uses label "Explore IVF guidance".
- No palette, layout, animation, or Ask-flow changes. Ask more links remain `/ask?stage=ttc&topic=<key>` for all six.

### Behaviour after change
- `/trying-to-conceive`: IVF pathway sits after the Fertility & health group; Common Questions sits directly after IVF pathway; no misleading "Read more" labels.
- Ask more chips + TTC Ask suggestion chips unchanged.
- All other hubs and `/ask` variants unchanged.

### Verification
- `bunx tsgo --noEmit`
- Playwright screenshots of `/trying-to-conceive` at 1280×1800 and 375×812 to confirm order + no mobile overflow.
- Spot-check regression routes: `/ask?stage=ttc&topic=fertile-window`, `/ask?stage=ttc&topic=ivf-next-step`, `/pregnancy`, `/first-year`, `/toddler`, `/family`, `/ivf`, `/articles/complete-guide-morning-sickness`.

After ship: safe to proceed to Phase 9.3 TTC SEO.
