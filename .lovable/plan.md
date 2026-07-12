## Phase 9.2d — First Year Hub & Article UX Polish

Scope: First Year files only. No copy, SEO, data, route, or sitemap changes (except mapping card targets to real routes / fixing dead buttons). Pregnancy, TTC, IVF, Family, Toddler files untouched.

### 1. Related guidance cards → image-forward (matches Family/Toddler)
File: `src/components/firstyear/article/FirstYearArticleCard.tsx`

- Add `aspect-[16/10]` hero image at top using `getFirstYearArticleImages(slug)?.hero`.
- Fallback map by topic → existing stage assets (feeding, sleep, development, care-and-safety, postpartum-recovery, emotional-wellbeing, body-and-hormones, checkups-and-warning-signs). No new image generation.
- Rebuild body: `bg-parchment`, tone-aware border `hsl(var(--stage-firstyear-accent)/0.28)` or `--stage-recovery-accent`, diagonal overlay using `-deep` token, `p-6 gap-3`, `-deep` title, `-accent` chevron chip, Clock read time, ShieldCheck "Medically reviewed" badge.
- Keep: `isReady` gating & opacity, draft "Coming soon" pill, focus ring, full-card `<Link>` when ready.
- Remove decorative blur blob.
- Tone (`baby` | `recovery`) already passed by `FirstYearArticlePage` and topic pages — preserved.

### 2. "Questions parents actually ask" → accordion with instant answers
File: `src/components/firstyear/new/FYCommonQuestions.tsx`

Convert each row from a direct AI link to an expandable disclosure (single-open accordion using local state; no new deps).

Each item gets:
- Short answer (calm, no diagnosis, no thresholds, British English, no em dashes) — copy per spec.
- "Read more" → real First Year article route:
  - Sleep normal → `/first-year/sleep/newborn-sleep-expectations`
  - Bleeding → `/first-year/postpartum-recovery/healing-after-birth`
  - Milestone → `/first-year/development/when-milestones-feel-uneven`
  - Baby blues → `/first-year/emotional-wellbeing/when-parenthood-feels-heavy`
  - Feeding changed → `/first-year/feeding/newborn-feeding-rhythms`
  - Feel like myself → `/first-year/emotional-wellbeing/feeling-like-yourself-again`
- "Ask more" → `/ask?stage=first-year` (recovery-track rows may use `stage=recovery` if already supported; default to `first-year`).

Keeps existing track chips, tint, elegant row styling. Chevron rotates on expand.

### 3. Ask page — First Year context
File: `src/pages/AskPage.tsx`

Verify `?stage=first-year` maps through `getAiStageStyle` / `stageColors`. If missing, add a First Year mapping using `--stage-firstyear-*` tokens. Ensure generic suggestion chips hide when `hasStageContext` is truthy (already done for Toddler pass). No change to generic `/ask`.

### 4. "Where to go next" → real onward journeys
File: `src/components/firstyear/new/FYPathways.tsx`

Replace the three current cards with:
1. Previous stage — Pregnancy guidance → `/pregnancy`
2. Next stage — Toddler guidance → `/toddler`
3. Continue — Family life → `/family`
4. (Optional 4th if grid supports) Journal — My journey → `/my-journey` — switch grid to `md:grid-cols-4` if included; otherwise keep 3.

Copy per spec. Preserves existing dual-tone gradient shell and hover treatment.

### 5. "Start wherever feels right today" → working buttons
File: `src/components/firstyear/new/FYFinalCTA.tsx` (+ small anchor id add if needed on `FYTopicsParallel`/`FYPhaseNav`)

- "Baby's first year" → scroll to `#baby` topics section (add `id="baby"` to the baby column/section in `FYTopicsParallel` if absent).
- "Your recovery" → route to `/first-year/postpartum-recovery` (guaranteed real page) via `<Link>`.

Both become genuinely useful; no dead clicks. Existing pill styling preserved.

### Guardrails
- No edits to article copy, SEO metadata, JSON-LD, routes list, sitemap, robots.
- No new images generated; use existing `firstYearArticleImages.ts` + topic fallbacks.
- Recovery-tone cards keep recovery tokens; baby-tone cards keep firstyear tokens.

### Verification
- `bunx tsgo --noEmit`.
- Playwright 1280×1800 + 375×812 on `/first-year`, `/ask?stage=first-year`, `/ask`, and the four article routes listed in the brief.
- Regression: `/family`, `/toddler`, `/pregnancy`, `/pregnancy/week/12`, `/trying-to-conceive`, `/ivf`, `/articles/complete-guide-morning-sickness`.
- Confirm: images render, accordion expands, all Read more / Ask more links 200, pathways route correctly, CTA buttons work, no mobile overflow, SEO head unchanged.
