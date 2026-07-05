# Family Hub — New Lifecycle Hub Build

Click **Implement plan** to switch me into build mode and I will apply every edit below in one pass. All component code is already prepared.

## Design tokens

**src/index.css** — insert Family tokens directly after `--stage-toddler-deep`:

```
--stage-family: 45 68% 94%;
--stage-family-soft: 42 58% 86%;
--stage-family-accent: 38 48% 45%;
--stage-family-deep: 34 38% 23%;
```

**tailwind.config.ts** — under `colors.stage`, add `family` and `family-accent`, matching the existing stage-key pattern. No other tokens touched.

## AI stage mapping

**src/lib/aiStageStyles.ts**:
- Add `"family"` to the `AiStageKey` union.
- Add `family` entry to `aiStageStyles` with `bgVar: "--stage-family"`, `softVar: "--stage-family-soft"`, `accentVar: "--stage-family-accent"`, `deepVar: "--stage-family-deep"`.

`AskPage`, `AISearchBar`, `HubAISupport` untouched.

## Route

**src/App.tsx** — import `Family`, add `<Route path="/family" element={<Family />} />` above `/:journey/:stage` and catch-all.

## Navigation

**src/components/layout/Navbar.tsx** — insert `{ label: "Family", href: "/family" }` into shared `navLinks` between Toddler and Journal. Desktop and mobile both render from that array.

## New page

**src/pages/Family.tsx** — `<div className="min-h-screen bg-parchment">`, composed in this exact order:

```
Navbar → FamilyHero → FamilyQuickNav → FamilyAISupport →
FamilyToolsResources → FamilyTopicClusters → FamilyCommonQuestions →
FamilySupportNote → FamilyPathways → FamilyFinalCTA → Footer
```

## New components (src/components/family/)

All use only Family tokens (`--stage-family`, `-soft`, `-accent`, `-deep`) + neutrals (`bg-parchment`, `--card`, `--border`, `--foreground`, `--muted-foreground`). Card recipe matches Toddler/First Year: 22px card radius, 28–30px panel radius, buttercream→honey gradient, muted ochre border, honey corner bloom, inner highlight, warm shadow, hover lift, chevron chip, equal heights, clean mobile stacking.

- **FamilyHero.tsx** — Warm editorial hero, eyebrow "Family life", headline "Support for the life you are building together.", spec support line. Desktop: left copy + right token-washed placeholder media frame (buttercream panel with honey bloom, no asset). Mobile: media stacks above copy. Primary pill → `#family-topics`, secondary → `#family-ai`.
- **FamilyQuickNav.tsx** — Premium anchor chip row for the 7 clusters, matching `ToddlerAgeNav` panel treatment.
- **FamilyAISupport.tsx** — `id="family-ai"`. Wraps `HubAISupport` inside a 30px Family panel with dual-tone gradient + blooms. Props `context="family"`, `stage="family"`, `stageBg="--stage-family"`, `stageAccent="--stage-family-accent"`. The 5 spec prompt chips. Submissions → `/ask?q=…&stage=family` via `AISearchBar`.
- **FamilyToolsResources.tsx** — "A few useful places to start". 4 cards (Second-time parents/Baby → `#family-growing`, Family finances/Wallet → `#family-basics`, Travelling with children/Plane → `#family-travel`, Family routines/CalendarClock → `#family-basics`). Lucide icon chips, no image bands.
- **FamilyTopicClusters.tsx** — `id="family-topics"`. Two-column desktop / one-column mobile. 7 non-linking `<article>` cluster cards with anchor ids (`family-growing`, `family-relationships`, `family-basics`, `family-health`, `family-travel`, `family-play`, `family-community`), eyebrows, spec titles + descriptions, 3–5 non-linking chip spans, chevron chip.
- **FamilyCommonQuestions.tsx** — Heading "What parents quietly wonder". Shadcn Accordion with the 6 spec questions + short warm editorial answers written in-brand. 18px radius, warm open-state fill, Family accent left rule on open, Family accent chevron, hover lift.
- **FamilySupportNote.tsx** — Centered quiet-note panel, buttercream wash, muted ochre border, soft glow, italic serif body. Eyebrow "A quiet note" + spec copy.
- **FamilyPathways.tsx** — 3 premium pathway cards: Back to Toddler → `/toddler`, Explore Family topics → `#family-topics`, Journal → `/product` (matches live Navbar Journal route).
- **FamilyFinalCTA.tsx** — Heading "When family life feels full, you can ask" + spec support. Primary pill → `#family-ai`, secondary → `#family-topics`. Matches `ToddlerFinalCTA` visual treatment.

## Verification

- `tsgo` typecheck.
- Playwright at 1280 / 1024 / 390 on `/family`: no horizontal scroll, cards stack, AI panel stacks, CTAs tappable, QuickNav anchors resolve, no broken links.
- Direct check `/ask?q=test&stage=family` renders in Family buttercream/ochre.
- Spot-check `/pregnancy`, `/first-year`, `/toddler` still render.

## Out of scope

No Family subtopic pages, articles, image/video assets, journey logic, saved Family journey, onboarding, dashboard. No edits to Pregnancy, First Year, Toddler, TTC, IVF, Postpartum, Journal, saved journey, auth, setup, `AskPage`, `AISearchBar`, `HubAISupport`, or any existing routes beyond adding `/family`.

## Return summary (after build)

A. Files created  B. Files edited  C. Family tokens added  D. Family added to `aiStageStyles`  E. `/family` renders  F. Structure summary  G. Topic clusters summary  H. `stage=family` inheritance confirmed  I. Responsive checks  J. Sibling hubs still render  K. Out-of-scope untouched.
