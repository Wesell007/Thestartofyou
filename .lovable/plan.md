# First Year Premium Polish Pass

Visual/UX polish only across live `/first-year` hub, live topic template, and live phase template. No routes, IA, data, assets, prompts, AI logic, nav, footer, journey, or auth changes. No new CSS tokens. Uses only existing First Year and Recovery tokens.

## Confirmed live scope

**Hub — `src/pages/FirstYear.tsx`** (section order locked). Live components:
- `src/components/firstyear/new/FYHero.tsx`
- `src/components/firstyear/new/FYStickyTrackNav.tsx`
- `src/components/firstyear/new/FYWhatThisCovers.tsx`
- `src/components/firstyear/new/FYAISupport.tsx`
- `src/components/firstyear/new/FYPhaseNav.tsx`
- `src/components/firstyear/new/FYTopicClusters.tsx`
- `src/components/firstyear/new/FYCommonQuestions.tsx`
- `src/components/firstyear/new/FYMedicallyReviewed.tsx`
- `src/components/firstyear/new/FYReflection.tsx`
- `src/components/firstyear/new/FYPathways.tsx`
- `src/components/firstyear/new/FYFinalCTA.tsx`

`FYTwoTrackEntry.tsx` is NOT imported by `FirstYear.tsx` — leave untouched.

**Topic template — `src/components/firstyear/topic/FirstYearTopicPage.tsx`** (drives all baby-side and recovery-side topic routes; branches on `config.side`).

**Phase template — `src/components/firstyear/phase/FirstYearPhasePage.tsx`** (drives `/first-year/0-3-months` etc.).

Legacy `src/components/firstyear/FirstYear*` components — not rendered on live routes — untouched.

## Design tokens (existing only)

Baby: `--stage-firstyear`, `--stage-firstyear-soft`, `--stage-firstyear-accent`, `--stage-firstyear-deep`.
Recovery: `--stage-recovery`, `--stage-recovery-soft`, `--stage-recovery-accent`, `--stage-recovery-deep`.
Neutrals: `bg-parchment`, `--card`, `--border`, `--muted-foreground`, `--foreground`.

## Per-component upgrades

**FYHero** — tighten eyebrow rule + headline/support rhythm; upgrade dual pill CTAs with inner-highlight box-shadow, deeper lift. Video, copy, structure unchanged.

**FYStickyTrackNav** — pill chips per track with token-fill background, subtle border, active-scale press.

**FYWhatThisCovers** — wrap existing paragraph in a premium 28px-radius card with dual-tone diagonal wash (firstyear→recovery), corner blooms, inner highlight, dual accent rule above the heading. Copy unchanged.

**FYAISupport** — wrap content in a 30px-radius premium panel: dual-tone gradient, dual blooms, inner highlight, refined border. Chips gain backdrop-blur, deeper hover lift + per-track shadow. `AISearchBar` untouched; `stage="first-year"` preserved; chip `&stage=…` params preserved.

**FYPhaseNav** — phase cards: 22px radius, top-left firstyear bloom, refined phase number + eyebrow, stronger title hierarchy, chevron chip pill, hover lift + deeper hover shadow, equal heights. Age-quick-nav chips get warmer hover fill.

**FYTopicClusters** — the big win. Each column wrapped in a premium surface with its own stage wash + column header (accent bar + eyebrow + heading). Cluster cards get: gradient background, top-corner bloom, refined accent chip with icon-style bar, stronger title, tighter description, chevron-chip affordance, hover lift + hover shadow, equal heights. Data + hrefs unchanged.

**FYCommonQuestions** — Toddler-tier polish: 18px row radius, per-row track-token warm background, accent left-rule bar, stage-coloured chevron, hover-lift with deeper shadow, mobile-safe padding. Existing `&stage=…` `Link` params preserved (stays a link to `/ask`, not an accordion — preserves colour inheritance).

**FYMedicallyReviewed** — refined trust strip: dual accent rules, dual stage dots, centred type, subtle top/bottom hairline dividers. Copy unchanged.

**FYReflection** — slim italic beat: dual accent rules, softly upgraded typography.

**FYPathways** — richer dual-tone diagonal gradient section with ambient blooms; premium pathway cards with corner-bloom on hover, inner highlight, refined chevron affordance, deeper hover shadow.

**FYFinalCTA** — deeper dual-tone gradient with ambient blooms; dual pill CTAs upgraded to hero-tier quality with inner-highlight box-shadow.

## Topic template (`FirstYearTopicPage.tsx`)

Already photo-led and calm. Targeted polish only:
- refine hero eyebrow rhythm (small accent rule + eyebrow)
- add subtle section-band washes between guidance, related and endcap sections (per-side token, low opacity)
- upgrade "What this topic covers" card with inner highlight + corner bloom
- guidance cards: deeper hover shadow, subtle card-top inner highlight
- related same-side and cross-side row cards: chevron-chip refinement, hover lift consistency
- endcap CTAs polished to match hub pill quality

Branching by `config.side === "recovery"` already wired via `THEMES` — reuse existing tokens; no new tokens. `HubAISupport` untouched. `guidanceHref` untouched (stage param already preserved).

## Phase template (`FirstYearPhasePage.tsx`)

Keep age-guide led. Upgrades:
- **PhaseHero**: refine eyebrow rule + tighten typography rhythm; hero photo frame gets a soft firstyear bloom halo behind the image; add inner-highlight to the framed image.
- **InPhaseAges**: warmer chip hover state.
- **PairedSection**: baby + you cards get 22px radius, corner bloom (firstyear for baby, recovery for you), refined bullet rhythm, inner highlight, deeper shadow.
- **CommonQuestions**: warmer answer spacing, accent left-rule per question.
- **FeaturedGuidance**: premium card treatment (firstyear wash, corner bloom, chevron-chip). `?stage=first-year` param preserved.
- **RelatedTopics**: chip pills warmed toward the firstyear token.
- **Endcap**: hero-tier pill quality on the three navigation CTAs.

All phase pages remain First Year styling only (no Recovery styling — phase pages are the age-guide entry, not recovery pages).

## AI stage inheritance

No edits to `AskPage`, `aiStageStyles`, `AISearchBar`, or `HubAISupport`. All existing `&stage=first-year` and `&stage=recovery` params on hub, topic and phase entry points preserved.

## Verification

1. `tsgo` typecheck.
2. Playwright at 1280 / 1024 / 390 on `/first-year`, `/first-year/feeding` (baby topic), `/first-year/postpartum-recovery` (recovery topic), `/first-year/0-3-months` (phase).
3. Confirm: no horizontal scroll, cards stack cleanly, hero readable, AI panel stacks cleanly on mobile, images intact.
4. Confirm `/ask` inherits `stage=first-year` from a baby chip and `stage=recovery` from a recovery chip.
5. Confirm Toddler, Pregnancy, TTC, IVF, Postpartum, Journal untouched.

## Explicitly NOT changed

Routes, IA, data files, assets, copy (except no copy changes), prompts, AI generation, edge functions, `App.tsx`, `Navbar`, `Footer`, `AskPage`, `aiStageStyles`, `AISearchBar`, `HubAISupport`, saved journey, auth, setup, Toddler, Pregnancy, TTC, IVF, Postpartum, Journal, legacy non-live `FirstYear*` components, and `FYTwoTrackEntry` (not rendered on live hub).
