# Phase 26D UI Refinement — Nano Banana Memories direction

Presentation-only pass over `/my-first-year/memories`. No schema, storage, upload, signed URL, delete, edit, create, copy-forward or route changes.

## What changes visually

**Page shell**
- Warmer parchment field behind the content, softer vignette, wider breathing room between hero, Keep a memory card, and the shelf.
- Hero keeps "Keepsakes" eyebrow, serif "Memories", and the intro line "Keep the small things you want to look back on." Tighter, more emotional spacing; no dashboard framing.

**Keep a memory card**
- Stronger peach surface with a soft vertical warmth gradient built from existing First Year tokens.
- 26px radius, deeper soft shadow, heart mark in a cream disc, serif title, helper line "A few words, and a photo if you have one."
- Reads as an invitation panel rather than a row.

**Month headings**
- Uppercase, terracotta ink, hairline rule to the right, larger space above each group.

**Memory cards**
- Text-only: warm parchment card, date chip, serif title, readable note, soft divider, quiet Edit and Remove. No photo placeholder.
- Photo memories: polaroid at the top of the card, warm paper mat, caption strip under the photo, subtle stacked-paper edge, gentle tilt on the photo layer only. Card body stays straight so long text stays readable.

**Memory sheet**
- Warm cream sheet surface, serif "Keep a memory", helper "A sentence is plenty. Write it however you would say it out loud."
- Larger rounded textarea, softer optional title and date fields, terracotta full-width primary, centred quiet Cancel link.

**Photo area**
- Small paper-card preview tile with a camera mark, clear "Add photo" action, quiet Replace and Remove links, helper "One photo, if you want one."

**Empty state**
- Peach paper card, heart mark, "Nothing kept yet", "When something small feels worth keeping, you can add it here.", terracotta "Keep a memory" action. No counts.

**Photo viewer**
- Warm paper mat, rounded corners, soft border, quiet Close. No social actions.

## Files to touch

- `src/pages/firstyear/FirstYearMemories.tsx` (layout, spacing, background only)
- `src/components/firstyear/memories/MemoryHeroCard.tsx`
- `src/components/firstyear/memories/MemoryList.tsx`
- `src/components/firstyear/memories/MemoryEmptyState.tsx`
- `src/components/firstyear/memories/MemorySheet.tsx`
- `src/components/firstyear/memories/MemoryForm.tsx`
- `src/components/firstyear/memories/MemoryPhotoField.tsx`
- `src/components/firstyear/memories/MemoryPhotoViewer.tsx`
- `src/components/firstyear/journey/firstYearStyles.ts` (add shared keepsake constants: polaroid mat, paper card surface, month rule, sheet field softening)

## Technical notes

- All colour via existing `--stage-firstyear-*`, `--sage`, `--parchment` tokens. No hex in components.
- Reuse `FY_CARD_RADIUS`, `FY_SHADOW_SOFT`, `FY_SHADOW_STRONG`, `FY_FOCUS_RING`, `FY_SHEET_*`, `FY_CHIP*`. New constants added to `firstYearStyles.ts` rather than inline one-offs.
- Tilt applied with a transform on the polaroid wrapper only, reset on hover and focus.
- Stacked-paper effect via layered pseudo-element style borders, not extra images.
- No new dependencies, no new state, no changes to handlers in `FirstYearMemories.tsx`.

## Verification

- Signed-in Playwright pass at 390px and 1440px: text shelf, photo shelf, memory sheet, empty state, desktop.
- Functional re-checks: create, edit, remove, add/replace/remove photo, signed URL render, viewer open/close, copy-forward prefill, multiples filter if data exists.
- Overflow, console, focus rings, hex scan on touched files, copy guardrail scan (tracker, score, milestone, normal, ideal, prediction, risk, diagnosis, symptom checker, safe, unsafe, em dashes).
- `npx tsgo --noEmit -p tsconfig.json`, targeted Memories tests, `npx vitest run`, `npm run build`.
- Report ends with whether Phase 26D can close. No follow-on phase work.
