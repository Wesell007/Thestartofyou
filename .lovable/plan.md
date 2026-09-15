# Phase 34E — IVF stage UX, article discovery and AI separation

Cleanup only. No new articles, no new routes, no content topics, no deployment.

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

## What I will build

### 1. Destination truth in the data

Give every stage link an explicit `kind`: `article`, `tool`, `ai`, `stage`, `hub` or `support`, derived from and checked against the real href (`ask:` → AI, `/articles/…` → article, the timeline tracker → tool). The page then renders by kind, so a mislabelled item cannot render as an article.

### 2. New page hierarchy (shared template, per-stage modules)

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

### 3. Three visibly different item types

- **Article**: its own imagery where a real image exists, title, description, `Read guide`.
- **Tool**: utility card, tool icon, `Use the timeline`.
- **AI**: only inside the Companion module — eyebrow `ASK THE COMPANION`, helper line "Get an AI-generated answer using the context of this IVF stage.", button `Ask the Companion`. No AI item anywhere else on the page, and none styled as an article.

Companion copy per the brief: eyebrow `YOUR COMPANION`, heading "Still have a question about [stage]?", placeholder "Ask about [stage]…", button "Ask the Companion".

### 4. Stage article line-ups (real routes only)

- **Before transfer** — featured: *What IVF is (UK guide)*, *IVF timeline, what to expect*. More guidance: *IVF vs ICSI*, *Fresh vs frozen embryo transfer*, *OHSS and IVF side effects*, *NHS IVF funding and eligibility*, *The emotional impact of IVF*.
- **After transfer** — featured: *The emotional impact of IVF*, *When an IVF cycle doesn't work*. More guidance: *Chemical pregnancy*, *Pregnancy after loss*, *Perinatal anxiety*, plus the Support crossover.
- **Early pregnancy** — featured: *Tests and scans in pregnancy*, *The emotional impact of IVF*. More guidance: *Bleeding in early pregnancy*, *Twins and multiples*, *Pregnancy after loss*, *Perinatal anxiety*, plus the handover into the Pregnancy hub.

Every article appears once per stage as primary discovery; duplicate destinations after this phase = 0.

### 5. Imagery

Use each article's existing hero where one exists (the six new guides all have one) by extending the existing href→image map. No new images generated. Cards without a real image use a plain text row rather than repeating the stage hero.

## Technical notes

- Files changed: `src/data/ivfTopicData.ts` (add `kind`, restructure per-stage module data, collapse AI questions into `aiPrompts` capped at 4), `src/components/ivf/IVFTopicPage.tsx` (new section order, article/tool/AI card components, remove Start here / Anchor read / Common questions modules), plus the thumbnail map.
- No changes to routes, `articleData.ts`, the grounding registry, sitemap, AI backend, saved lifecycles or reviewer governance. Safety blocks keep their current approved wording verbatim.
- New test file `src/test/phase34eIvfStageUx.test.tsx`: all six 34C/34D routes resolve; each stage's article items point only at `/articles/…`; zero `ask:` destinations outside the Companion; exactly one Companion per stage; no duplicate article destinations per stage; no `commonQuestions` module; stage routes and grounding untouched.
- Validation: focused 34E tests, full suite, typecheck ×2, lint against baseline, production build, plus QA of the three stage pages at 1280 / 834 / 390 px.

## Documentation

`docs/content/phase34e-ivf-stage-ux-cleanup.md`, `phase34e-ivf-link-destination-audit.md` (full before/after destination table with the ARTICLE / TOOL / AI_PROMPT / STAGE / HUB / SUPPORT classification), `phase34e-ivf-frontend-report.md`.

Closing report will return the required counts, the 6/6 new-article discovery accounting, and the deployment hold remains active.
