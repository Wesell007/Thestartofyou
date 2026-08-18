# Phase 26B Final Polish — First Year Home Text Contrast

Typography and contrast only on `/my-first-year`. No layout rebuild, no section reordering, no logic, schema, route or content changes.

## Approach

All contrast work goes through the shared constants in `firstYearStyles.ts` and existing HSL tokens. Components stop declaring their own pale opacities (`text-foreground/65`, `/70`, `/75`) and use the shared classes instead. No hex values in components.

### New and revised shared constants

- Add a warm ink text token in `src/index.css`: `--stage-firstyear-text` (a deep warm taupe used for body copy on the cream page) and `--stage-firstyear-text-soft` for helper text. Both defined as HSL, referenced as `hsl(var(--token))`.
- `FY_HEADING` — heavier presence: keep serif, raise colour to full `text-foreground`, slightly tighter leading.
- `FY_CARD_TITLE` — full `text-foreground`, add `font-medium`.
- `FY_CARD_BODY` — 14px (from 13.5px), colour moves from `foreground/75` to the warm text token, leading 1.65.
- `FY_INTRO` — colour to warm text token, weight unchanged.
- New `FY_HELPER` — 13px, warm soft text token, medium weight, for chips, captions and secondary lines that currently sit at `foreground/60` or lower.
- New `FY_ROW_TITLE` and `FY_ROW_BODY` for list rows (Gentle reading, month-guide link, For you cards) so they share one readable scale: row title 14.5px semi-bold full foreground, row body 13.5px warm text token.
- `FY_QUIET_LINK` — darker text, `font-medium`, stronger underline decoration colour.
- Arrow glyphs move from `text-foreground/40` to `text-foreground/70`; dividers stay soft (`border/50`).

### Per-section application

- **Gentle reading** (`ExploreGuidance.tsx`): section heading uses the stronger heading scale, rows use `FY_ROW_TITLE` / `FY_ROW_BODY`, arrows darker, dividers unchanged, thumbnails unchanged size. Stays visually secondary through size and position, not paleness.
- **What comes next** (`WhatComesNextCard.tsx`): heading to full foreground, list copy to 13.5px warm text token with 1.7 leading, any links medium weight and underlined.
- **Footer support text** (`MyWeekFooter.tsx`): contextual line and the "Need support?" line darken to the standard body colour; the support link gains `font-medium` and a stronger underline. This component is shared with My Week, so the change is a small readability lift only, with no layout or colour-family change.
- **Today card**: chips, inner note panel copy and CTA label checked against the blue gradient; chip text and helper copy move to the ink token. Stays the strongest action.
- **Ask Cindy**: prompt chips, helper line, error line and answer surface copy raised to readable weights on the sage face.
- **Memories**: description, date chip and paper-card copy darkened; keepsake styling unchanged.
- **Where {baby} is right now**: tile titles and bodies use the shared card scale, month-guide row uses the row scale.
- **A moment for you**: card titles, details and the "Read this" affordance darkened on the rose/lavender band.
- **Recently saved**: entry lines and kind labels lifted out of the faintest opacities.

### Kept unchanged

Peach hero, blue Today card, sage Cindy card, peach Memories band, tinted stage tiles, rose/lavender parent band, Gentle reading last, 26px radii, warm shadows, section order, all copy wording.

## Verification

390px and 1440px signed-in screenshots, overflow check, console check, focus ring check, grep for hardcoded hex in the touched components, `npx tsgo --noEmit -p tsconfig.json`, targeted tests if any touched, `npm run build`. Report returned after, then stop.
