# Phase 28B.1 — TTC Green Identity Correction

Presentation-only pass to make the signed-in TTC journey read clearly as TTC (sage and muted olive led), while keeping the cream paper, watercolour washes, botanical accents and calm tone from Phase 28B.

## Nano Banana step

Before touching components, generate the TTC visual reference and refreshed decor with Nano Banana in Lovable, using the approved TTC board and the public TTC hub greens as the source:
- a sage-led watercolour wash (replacing the current peach-leaning wash usage on TTC surfaces)
- a soft green botanical seed and leaf accent to sit alongside the existing seed head

These are decorative, aria-hidden assets only.

## What changes

1. TTC tokens (`src/index.css`, TTC block only)
   - Deepen and green the sage/olive family so accents read green rather than neutral cream.
   - Rebalance `--wash-ttc` and the `.ttc-app-surface` radial washes so sage leads and peach becomes a small warmth note.
   - Make `.ttc-paper-warm` a soft sage-tinted paper instead of peach-led.
   - Add a light green accent token for chips, dots and hairline borders.
   - Blush and peach stay as warmth accents only.

2. Shared TTC style module (`src/components/ttc/journey/ttcStyles.ts`)
   - Primary pill becomes soft sage; firm pill stays muted olive; blush pill retired from primary actions and kept only for warmth surfaces.
   - Eyebrows, chips, icon bubbles, dividers and focus rings move onto the green accents.

3. TTC surfaces (presentation classes only)
   - `MyTTCJourney.tsx` hero and CTA sections, summary, timeline/cycle path markers, calendar, insights, guidance, log list and entry panel, handover card, TTC header.
   - Bottom nav TTC active state uses the olive/sage tint (`JourneyBottomNav.tsx`, TTC branch only).
   - CTAs "Add a note", "Ask a TTC question", "Update TTC setup", "Read more" all take the sage/olive pills.

4. Decor (`TTCDecor.tsx`)
   - Point the wash component at the new sage wash asset; keep opacity low and aria-hidden.

## Out of scope

No schema, RLS, storage, AI, auth, cycle/log/calculator/handover logic, routes, SEO or sitemap changes. No Today-first rebuild, two-week wait support, negative test flow, inline Ask Cindy or new routes. Pregnancy and First Year tokens, components and public pages are untouched.

## Verification

Playwright checks at 390px and 1440px on `/my-ttc-journey`, `/trying-to-conceive`, `/setup/trying-to-conceive`, `/ovulation-calculator`, one signed-in pregnancy route and one signed-in First Year route: green-led TTC identity, washes still present, no hardcoded hex, no horizontal overflow, no console errors, pregnancy and First Year unchanged.

Then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`, followed by the 13-point report.
