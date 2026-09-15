# Phase 34E — IVF UX, article discovery and AI separation

Cleanup of `/ivf` and its three stage pages only. No new articles, routes, content topics, images or deployment.

## What is wrong today (verified in the code)

All three stage pages render from one shared template (`IVFTopicPage`) in a fixed order:

```text
Hero → What this topic covers → COMPANION (AI) → Start here → Anchor read
→ What's normal / When to seek support → stage block → Emotional + journal
→ Guidance groups (large mixed directory) → Common questions (AI) → Prev/next
→ Other IVF stages → Back
```

Problems confirmed by reading the data:

- The Companion sits third, before any editorial guidance.
- The big "guidance groups" directory mixes real guides and AI questions in identical rows with the same chevron. Before transfer: 6 of 18 rows are real articles, the rest open AI. Early pregnancy: 25 rows, only 6 are real articles.
- Early pregnancy's three "Start here" cards and its "Anchor read" all open AI while looking exactly like article cards, with the CTA "Open".
- Start-here cards duplicate the same destinations shown elsewhere (the timeline article appears in Start here, Anchor read and a group row on Before transfer; the emotional-impact article likewise on After transfer).
- "Common questions" at the bottom is a second AI area on every page, duplicating prompts already in the Companion.
- Every card falls back to the same stage hero image, so rows of different destinations share one picture.
- Of the six new 34C/34D guides, only two (ICSI, fresh vs frozen) are surfaced from a stage page at all.

The main IVF hub audit also confirms:

- Its hero uses `min-h-screen`, delaying the page orientation and navigation.
- `The active treatment pathway` and `What makes IVF different` are separate large orientation sections with overlapping roles.
- The embedded AI section appears before stage navigation and the guide library.
- The guide library contains only the six Phase 34C/34D guides. The timeline and emotional-impact guides are surfaced elsewhere, so the eight IVF-specific guides do not have one coherent editorial home.
- `Common questions across IVF` consists entirely of AI destinations styled like editorial rows, creating a second page-level AI area.
- The final `Ask a question` action links to `/ask` without naming the Companion.

## What I will build

### 1. Destination truth in the data

Give every stage link an explicit `kind`: `article`, `tool`, `ai`, `stage`, `hub` or `support`, derived from and checked against the real href (`ask:` → AI, `/articles/…` → article, the timeline tracker → tool). The page then renders by kind, so a mislabelled item cannot render as an article.

### 2. Main IVF hub: one coherent journey

Recompose the existing hub components into:

```text
Compact premium hero + clearly labelled timeline tool
One consolidated IVF orientation section
Your IVF stages
IVF guidance (all 8 real IVF articles, grouped by intent)
Companion (the only page-level AI area, maximum 4 prompts)
Quiet emotional / journal support
Final journey action (Start your journey only)
```

- Reduce the hero from a full viewport while keeping its current visual identity and transfer-date timeline tool.
- Merge `IVFPathwayPosition`, `IVFWhatThisCovers` and the useful parts of `IVFWhatMakesDifferent` into one concise orientation section; orientation sections after = 1.
- Move the three stage cards ahead of all AI and label their action `Explore stage`.
- Rebuild `IVFGuides` as a single eight-guide library with three deliberate groups: **Start with IVF**, **Treatment and decisions**, **The emotional and outcome side**. Add the existing timeline and emotional-impact guides, each once, with their actual imagery and `Read guide`.
- Remove `IVFCommonQuestions` as a separate module; move no more than four useful prompts into `IVFAISupport`.
- Move `IVFAISupport` below the stage and guide sections, retitle it `YOUR COMPANION`, explicitly describe the AI-generated answer and use `Ask the Companion`.
- Make the final CTA journey-only with `Start your journey`; remove its secondary `/ask` action so no page-level AI action exists outside the dedicated Companion.
- Preserve the quiet support section without adding another large emotional-content block.
- Keep exactly one primary IVF timeline tool instance: the transfer-date functionality in the compact hero. Do not add a second tool section. Keep the timeline article once in the guide library.

### 3. New stage-page hierarchy (shared template, per-stage modules)

```text
Hero
What this stage covers
Guides for this stage       ← real articles only: 2 featured + lighter rows
Stage-specific block        ← protocol week / the wait / handover
What's normal / when to seek support   (unchanged wording)
Tool: Track your IVF timeline          (only where relevant)
Your Companion              ← the single AI area, max 4 prompt chips
Emotional note + journal line
Prev / next stage
```

Start here, Anchor read and the bottom Common questions sections are removed as separate modules; their genuine article destinations fold into "Guides for this stage" once each, and their AI questions fold into the Companion chips.

Stages will not all carry the same modules: Before transfer keeps the protocol week, After transfer keeps the wait shape and the difficult-news group, Early pregnancy keeps the handover card and drops the protocol block.

### 4. One content-type language system across all four pages

- **Article**: its own imagery where a real image exists, title, description, `Read guide`.
- **Tool**: utility card, tool icon, `Use the timeline`.
- **Stage**: stage imagery and `Explore stage`.
- **AI**: only inside the Companion module — eyebrow `ASK THE COMPANION`, helper line "Get an AI-generated answer using the context of this IVF stage.", button `Ask the Companion`. No AI item anywhere else on the page, and none styled as an article.
- **Journey action**: `Start your journey`.
- **Support / hub**: explicit destination wording rather than article, tool or AI language.

`Guides for this stage` and the hub guide library contain `kind: article` items only, each resolving to `/articles/…`. Support crossovers and Pregnancy-hub handover actions render in separate lightweight sections with explicit support/hub wording.

Companion copy per the brief: eyebrow `YOUR COMPANION`, heading "Still have a question about [stage]?", placeholder "Ask about [stage]…", button "Ask the Companion".

### 5. Stage article line-ups (real routes only)

- **Before transfer** — featured: *What IVF is (UK guide)*, *IVF timeline, what to expect*. More guidance: *IVF vs ICSI*, *Fresh vs frozen embryo transfer*, *OHSS and IVF side effects*, *NHS IVF funding and eligibility*, *The emotional impact of IVF*.
- **After transfer** — featured: *The emotional impact of IVF*, *When an IVF cycle doesn't work*. More guidance: *Chemical pregnancy*, *Pregnancy after loss*, *Perinatal anxiety*, plus the Support crossover.
- **Early pregnancy** — featured: *Tests and scans in pregnancy*, *The emotional impact of IVF*. More guidance: *Bleeding in early pregnancy*, *Twins and multiples*, *Pregnancy after loss*, *Perinatal anxiety*, plus the handover into the Pregnancy hub.

Every article appears once per stage as primary discovery; duplicate destinations after this phase = 0.

### 6. Imagery

Use each article's existing hero where one exists by extending the existing href→image map. No new images generated. Cards without a real image use a premium text row rather than repeating the stage hero.

## Technical notes

- Stage files: `src/data/ivfTopicData.ts` (add `kind`, restructure per-stage module data, collapse AI questions into `aiPrompts` capped at 4), `src/components/ivf/IVFTopicPage.tsx` (new section order, article/tool/AI card components, remove Start here / Anchor read / Common questions modules), plus the thumbnail map.
- Hub files: `src/pages/IVF.tsx`, `IVFHero.tsx`, one consolidated orientation component, `IVFStages.tsx`, `IVFGuides.tsx`, `IVFAISupport.tsx`, `IVFFinalCTA.tsx`; the redundant orientation and common-question components will no longer be mounted. No unnecessary new shared system. The global floating Companion launcher remains unchanged and is excluded from page-module counts.
- No changes to routes, `articleData.ts`, the grounding registry, sitemap, AI backend, saved lifecycles or reviewer governance. Safety blocks keep their current approved wording verbatim.
- New focused tests cover: all eight hub article routes and 8/8 unique hub discovery; all six 34C/34D guides accounted for; stage links only use stage routes; article sections contain only `kind: article` items resolving to `/articles/…`; tool, hub, support and journey kinds agree with their real destinations; AI kinds use Companion prompt behaviour; any kind/destination mismatch fails; zero AI destinations outside Companion modules; one embedded Companion on each of four pages; no separate Common Questions AI modules; exactly one hub timeline tool and one hub timeline-article discovery; Pregnancy hub and Support crossover are not article styled; no duplicate article destination within any page; unchanged routes, grounding, lifecycles and reviewer governance.
- Validation: focused 34E tests, full suite, typecheck ×2, lint against baseline, production build, route and destination validation, plus QA of all four pages at 1280 / 834 / 390 px.

## Documentation

`docs/content/phase34e-ivf-ux-and-discovery-cleanup.md`, `phase34e-ivf-link-destination-audit.md` (full before/after destination table for all four pages with ARTICLE / TOOL / AI_PROMPT / STAGE / HUB / SUPPORT / JOURNEY_ACTION), and `phase34e-ivf-frontend-report.md`.

Closing report will return the four-page destination counts, 8/8 hub guide accounting, 6/6 new-guide accounting, Companion/common-question/duplicate counts and unchanged deployment hold.
