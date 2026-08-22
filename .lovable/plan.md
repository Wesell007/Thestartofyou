# Phase 28B — TTC Visual System and App Shell

Presentation and shell only. No schema, RLS, storage, AI, auth, cycle logic, logging logic, calculator logic, handover logic, SEO or sitemap changes. No new routes, no Today-first rebuild, no two-week wait, no negative test flow, no inline Ask.

## Visual north star

The approved TTC concept board is the direction: cream paper, soft sage and muted olive, blush and peach warmth, watercolour washes, botanical seed and leaf accents, thin serif headings with small uppercase labels, journey-path feeling, premium mobile-first cards, private journal-like notes.

Before touching the TTC screens I will use Nano Banana inside Lovable to translate the board into the actual TTC surface: a rendered TTC screen-mood reference plus the TTC watercolour wash and botanical seed/leaf accent assets generated in the board's palette. Those renders set the tokens, spacing and card feel, and the implementation is matched to them. If a surface starts reading as a dashboard or tracker, the direction gets corrected before continuing.

## What gets built

### 1. TTC colour tokens

Extend the TTC palette in `src/index.css` from the current two variables to a full set, mirroring the pregnancy token block, all HSL, no hex:
cream paper, card face, edge hairline, sage, muted olive accent, blush, peach, text and soft text, plus a `.ttc-paper` surface class with the low soft shadow used on pregnancy paper cards.

### 2. TTC style module

New `src/components/ttc/journey/ttcStyles.ts`, the TTC counterpart of `pregnancyStyles.ts`: focus ring, card radius, paper card, card padding, eyebrow label, serif heading, card title, body and helper copy, quiet link, soft pill, icon bubble, soft divider, nav active and inactive. Every interactive constant clears 44px. Applied across all touched TTC components so the page reads as one system.

### 3. TTC decorative components

Small presentation-only components in the TTC journey folder: a watercolour wash and a botanical sprig, both decorative and `aria-hidden`, matching the pregnancy pattern and the Nano renders.

### 4. App shell polish

- `TTCJourneyHeader` restyled to the TTC paper treatment, matching the pregnancy shell header in height, inset and logo treatment.
- Keep the existing three TTC bottom-nav tabs. `JourneyBottomNav` currently hardcodes pregnancy nav tints for all lifecycles; the TTC tabs will use the TTC active and inactive tokens. First Year and pregnancy tints unchanged.
- Confirm the nav inset contract, `/account`, `/ask` and the absence of signed-in nav on public routes still behave as they do today.

### 5. Restyle `/my-ttc-journey`

Same sections, same order, same data. Restyled onto the paper system:
- Softer hero with a watercolour wash and botanical accent behind it.
- Summary grid moved off the six-tile dashboard look to quieter paper tiles with more air.
- Cycle timeline given a calmer path feeling within its paper card.
- Calendar and logging in a calmer container with a gentler section lead-in.
- Insights, focus card and guidance cards on the shared paper card treatment.
- Handover card raised visually as a warm, hopeful surface rather than a plain block.
- Remove-journey moved into a quiet footer zone rather than a bare destructive link.
- More generous vertical rhythm on mobile and desktop.

### 6. Phase 28A fixes

- Calendar month controls and Add log raised to 44px.
- `window.confirm` for removing the TTC journey replaced with the existing `ConfirmDialog`.
- Copy reworded: "Is this symptom normal?" and "What feels normal one cycle may shift the next" in the TTC components, and "prediction methods" to "tracking methods". Public article and topic data copy is left alone this phase apart from the two flagged TTC component strings.
- "Find your window" in the TTC hub hero softened.
- Confirm no em dashes in the TTC signed-in copy touched here.

## Verification

At 390px and 1440px: `/my-ttc-journey` (signed in), `/setup/trying-to-conceive`, `/ovulation-calculator` with and without result params, `/trying-to-conceive`, one TTC topic page, one TTC article, one signed-in pregnancy route, one signed-in First Year route. Checking overflow, console errors, broken images, nav overlap, bottom nav behaviour, absence of signed-in nav on public pages, and 44px tap targets.

Then `npx tsgo --noEmit -p tsconfig.json`, targeted tests, `npx vitest run`, `npm run build`.

## Report

The close-out report will cover all twenty requested points, including confirmation that cycle, logging, calculator and handover behaviour are unchanged and that pregnancy and First Year surfaces are untouched.
