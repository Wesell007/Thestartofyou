## TTC Hub Pass 1 — Correction (live route only)

Fix the live TTC hub at `/trying-to-conceive` (`src/pages/TTCHub.tsx`). The earlier Pass 1 visual work landed on the legacy `src/pages/TTC.tsx` route, which is why the live hub still shows a copy-only hero and a later duplicate calculator block.

This pass edits **only `src/pages/TTCHub.tsx`** and ports the approved hero chrome inline.

### Changes

1. **Replace inline `Hero`** with a tool-first hero:
   - Left-edge lifestyle photo bleed on desktop (`ttc-hero-lifestyle.jpg`, ~22% width, fade to parchment); mobile image strip with eyebrow chip.
   - Left column: eyebrow `Trying to Conceive`, H1 `Understand your cycle. Find your window.`, calm sub-paragraph, three stat ticks (`3 stages` / `5–6 days` / `~85%`), quiet quote card on `--stage-ttc` tint.
   - Right column: premium **ovulation calculator card** (icon medallion, hairline accent, layered shadow, LMP popover, cycle-length select, terracotta `Show fertility dates` CTA → `/trying-to-conceive/ovulation-calculator?lmp=…&cycle=…`, fine-print disclaimer) **plus** a **common-questions panel** below (3 prompts → `/ask?q=…`, then a quiet `Explore the full guide` outline button scrolling to `#ttc-topics`).
   - Breathability guardrail: keep generous vertical spacing in the right column, limit to 3 prompts (not 5), keep the calculator card padding at `p-6 sm:p-7`.

2. **Remove the duplicate `ToolCTA`** "Find your fertile window" section entirely — the in-hero calculator owns this now.

3. **Reorder sections** to:
   `Hero → WhatThisCovers → JourneyTimeline → TopicLibrary → AISupport → Reassurance`

4. **Keep unchanged**: `WhatThisCovers`, `JourneyTimeline`, `TopicLibrary` (pillars + supporting guides band), `AISupport`, `Reassurance`. Legacy `src/pages/TTC.tsx` and `src/components/ttc/TTC*` untouched.

### Files

- `src/pages/TTCHub.tsx` — rewritten with new `Hero`, removed `ToolCTA`, reordered render.

### Out of scope

No Pass 2 (no 6-tile topic map redesign, no `TTCPathways`, no topic/subtopic page uplift). No IVF, Pregnancy, articles, navbar, or week pages.
