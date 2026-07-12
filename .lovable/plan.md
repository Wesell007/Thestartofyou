## Phase 9.2c.1 — Toddler Related Card Refinement & Ask Page Toddler Context

Two focused Toddler-only polish tweaks. No new images, no data/SEO/route changes.

### 1. Refine `ToddlerArticleCard.tsx` to match Family card standard

File: `src/components/toddler/article/ToddlerArticleCard.tsx`

Rebuild the card visual layer to mirror `FamilyArticleImageCard.tsx` while keeping the Toddler palette tokens (`--stage-toddler-*`) and existing behaviour (link, draft handling, fallback map, medical badge).

Changes:
- Container: swap the current warm-gradient body for `bg-parchment` (white/cream) with rounded-`[22px]` corners and a subtle `hsl(var(--stage-toddler-accent) / 0.28)` border — matches Family.
- Image block: keep `aspect-[16/10]`, add the same soft diagonal overlay Family uses (`linear-gradient(160deg, hsl(var(--stage-toddler)/0.14), transparent 50%, hsl(var(--stage-toddler-deep)/0.22))`) instead of the bottom parchment fade.
- Body: `p-6`, `gap-3`, remove the decorative top-left blur blob.
- Title: `font-serif text-[17px] md:text-[18px] leading-snug` in `--stage-toddler-deep`.
- Description: `font-sans text-[13.5px] font-light leading-[1.65]` in deep/72.
- Footer row: clock + read time left, small circular chevron chip bottom-right using `--stage-toddler-accent` tokens — identical structure to Family.
- Hover: `-translate-y-[3px]` + Family-style warm shadow.
- Keep `TOPIC_FALLBACK` map, badges, `isReady` gating, focus ring.

Result: Toddler related-guidance cards read as premium, calm, image-forward cards visually consistent with Family, still branded in Toddler tones.

### 2. Toddler-aware Ask context

Files:
- `src/components/toddler/ToddlerFinalCTA.tsx`
- `src/pages/AskPage.tsx`

`AskPage` already reads `?stage=toddler` and themes with `getAiStageStyle` + `stageColors` on the answer view. Only the welcome (no-query) view is hard-coded to sage + pregnancy suggestions. Small safe additions:

- **CTA:** change `to="/ask"` → `to="/ask?stage=toddler"` in `ToddlerFinalCTA.tsx`. Keep the `#toddler-age` scroll fix untouched.
- **Welcome view in `AskPage.tsx`:**
  - Read `stageKey` (already parsed) at the top of the welcome branch.
  - When `stageKey === "toddler"` (or any non-null `sc`): apply Toddler tint to the sparkle badge, focus ring, and gradient glow using existing `sc.accent / accentSoft / bgWash` tokens — same pattern the answer view already uses. Fall back to sage otherwise.
  - Hide the "Try one of these" chip block when `stageKey` is set (any stage context) so pregnancy chips never appear from a Toddler entry. Generic `/ask` keeps its chips.
  - Placeholder stays `Ask anything…`, input stays blank/autofocus.
  - Breadcrumb "Explore" link left as-is.

No global chip removal, no new route, generic `/ask` unchanged.

### 3. Preserve `#toddler-age` fix

No edit to the "Go to your toddler's age" anchor logic in `ToddlerFinalCTA.tsx` beyond the `/ask` href swap. Re-verify it still scrolls.

### Guardrails

No edits to article data, article copy, SEO, routes, sitemap, robots, other stage files, or new image assets. `HubArticleView` and topic pages unchanged (they consume `ToddlerArticleCard` — visual-only refactor is compatible).

### Verification

- `bunx tsgo --noEmit`
- Playwright 1280×1800 + 375×812 on `/toddler`, `/ask`, `/ask?stage=toddler`, `/toddler/development-milestones/what-toddler-development-can-look-like`, `/toddler/food-feeding/picky-eating-in-toddlers`, `/toddler/speech-language/when-to-ask-about-speech-delay`, `/toddler/health-safety/when-to-call-the-gp`.
- Regression: `/family`, `/family/family-basics/building-family-routines`, `/pregnancy`, `/pregnancy/week/12`, `/first-year`, `/trying-to-conceive`, `/ivf`, `/articles/complete-guide-morning-sickness`.
- Confirm Toddler Ask context: theme tinted, chips hidden, input blank, `/ask` still shows chips.
