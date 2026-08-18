# Phase 26B Visual Rebuild — First Year App Home

Rebuild `/my-first-year` so it closely follows the attached concept, adapted to The Start of You tokens, typography and existing product logic. Page content and card system only: no routes, schema, storage, AI backend, or other First Year pages change.

## Design direction step

Use the attached reference as the visual target and render a direction pass with Nano Banana (Gemini image model) constrained to our palette and type, to lock: card radii, colour strength, hero shape language, tile motifs and vertical rhythm. The render is direction only, never shipped as UI, never a background, never embedded.

## Section order (mobile-first)

```text
Hero            Baby name, age, "You are in a new chapter too.", Cindy line
Today           Baby blue card, strongest action
Ask Cindy       Sage card, prompt chips, input, Ask
Memories        Peach keepsake card, polaroid treatment
Where X is now  Three insight tiles + one quiet month link
A moment for you  Rose/lavender block, three cards
Gentle reading  Compact secondary rows
Kept chapter / What comes next (unchanged, quiet, last)
```

## What changes per component

- **FirstYearHeroPanel** — warmer hero band: soft peach blob shapes drawn in CSS (radial/blur, token colours), initial disc for the baby, serif name at large size with the age set inline and smaller, then the new-chapter line and the companion presence line. Public hub link drops to a quiet text link at the base.
- **TodayCard** — larger radius, deeper baby-blue gradient, stronger shadow, date chip plus age chip, cream inner note-preview panel showing the placeholder prompt (or saved-today reassurance), dark blue CTA pill with arrow.
- **FirstYearAskCompanion** — solid sage card, companion avatar mark, large "Ask {companion}" heading, three prompt chips, rounded input and Ask button, cream answer surface, calm error line. Chips continue to send generic prompt text only; no names, notes, memories or photos leave the client.
- **MemoriesCard** — peach/cream keepsake card with a tilted paper-card treatment for the most recent memory, date chip, title line, warm CTA. Uses only signed photo URLs already loaded; otherwise a paper-card placeholder. No extra fetching.
- **StageGuidanceSection** — heading becomes "Where {baby} is right now" (or "Around {age}" for multiples), three app-style tiles: What may be changing, Feeding and sleep, For you around now, each with a tinted gradient face and small icon mark. One quiet month-guide link beneath.
- **New ForYouBlock** (replaces the "you" SupportLane on this page) — full-bleed rose/lavender band, heading "A moment for you", three strong colour-blocked cards for Recovery after birth, Body and hormones, Emotional wellbeing, each with its existing topic thumbnail.
- **ExploreGuidance** — retitled "Gentle reading", compact rows for Feeding, Sleep, Development, Nappies and care, Check-ups and questions, small thumbnails, visually secondary.
- **RecentlySavedCard** — kept but tightened so it does not compete with Today.

## Technical notes

- Colours come from existing `--stage-firstyear-*`, `--stage-recovery-*` tokens; any new tints (lavender, deeper blue, terracotta) are added as HSL tokens in `src/index.css` and referenced via `hsl(var(--token))`. No hex in components.
- Shared type, radius, shadow and focus constants extend `firstYearStyles.ts` so all cards share one scale.
- Bottom navigation is out of scope; recommended as a separate app-shell phase.
- Copy guardrails: no banned words, no em dashes.

## Verification

`npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`, sitemap diff check, plus Playwright screenshots signed in at 390px and 1440px with console error and overflow checks. Report returned after.
