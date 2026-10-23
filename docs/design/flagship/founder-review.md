# Founder review: Gate 2 Step 3 flagship set

Open `http://localhost:4310/` (after `tools\serve.cmd` in `C:\Users\Administrator\.tsoy-design\flagship-prototypes\`) or the captures in `review/`. Resize to 390 px or use `compare.html`.

## Questions requiring founder approval

1. **The system as proven.** Do the five concepts read as one TSOY (Editorial Keepsake master, journal patterns where you write and remember, art only at chapter/keepsake/welcome moments)? Approve, or name the screen that breaks it.
2. **Article headline case.** Long editorial headlines are set in sentence-case display serif; spaced capitals are kept for short titles, section heads and the wordmark. Approve this adaptation?
3. **Signature colour on screen.** The journal's dusty blue `#96ACB1` is used only for ornament (it fails text contrast); text and actions use the deepened `#52696E`. Approve?
4. **My Week state E wording.** "Your journey is paused" / "Take your time" and the one-action pause of all recurring streams. Approve the tone and the rule that the system never infers loss?
5. **Size comparisons.** Optional, active-pregnancy only, one-tap hide, absent in TTC/IVF/historical/paused. Approve?
6. **Companion provenance as a proposed contract.** The trust block, numbered markers and "not found in trusted sources" state are design intent for phase 42A; the live backend returns text only. Approve the design so 42A can target it?
7. **Activation copy and the gift rule** ("The code belongs to whoever uses the journal, not to whoever bought it"). Approve?
8. **Homepage statement** ("From trying to conceive to family life, kept in one place.") and the single primary CTA. Approve or supply the founder's own line?
9. **Typography path.** Confirm the fonts stay unlocked; authorise the licence evaluation of Adorn Story Serif (exact product to confirm), Aileron and Source Serif, with equivalents as fallback.
10. **Imagery findings.** Three repository "journal" images are AI-generated (`home-journal-flatlay.jpg` on the current homepage, `journal-book.jpg`, `ttc-ovulation-signs-journal.jpg`). Approve their removal from the future UI and the use of the real shoot and cover artwork only?
11. **Illustration rights.** The cover artwork crops used at chapter/welcome moments assume TSOY holds digital rights to the journal illustrations. Confirm, or the art budget stays empty until confirmed.
12. **Mobile tab names** (Today · Journey · Companion · Journal · You) for the future app, used here on signed-in mobile surfaces. Approve as working names?

## Accessibility findings (static review; verify with tools at implementation)

- Body 19/17 px, measure ≤ 66ch, headings ordered, skip link, visible focus, 44 px targets, reduced motion honoured, colour never alone for urgency.
- Approximate contrast: ink ≈ 15:1; ink-soft ≈ 6.3:1; brown labels ≈ 5.1:1; signature-ink ≈ 5.4:1 on paper; **signature-ink on the blush hero/ceremony ground is lower and must be measured** (fallback to ink if < 4.5:1); placeholder text ≈ 4.6:1 (non-essential).
- The decorative dot in the size row and all corner art are `aria-hidden`; prompts and table rows are real labelled fields.
- Known gaps to fix at implementation: My Week section labels should become real `h2`s; the stacked review files repeat landmarks (review-only artefact).

## What is removed from the Lovable-era UI (confirmed by the concepts)

The 32 px radius and card-as-default, pill buttons and pill navigation, drop shadows, gradients and blur, per-stage colour palettes, most micro-animation, uppercase micro-labels on every block, Playfair/Jost as the voice, gradient heroes, card-grid hubs, dashboard My Journey, chat-bubble Companion, AI-generated journal imagery.

## Recommended implementation order after approval (not started)

1. Token layer (`src/index.css`, `tailwind.config.ts`) under a feature flag or a parallel theme, with the font decision; no visual change shipped yet.
2. Article template (the largest content surface; SEO unaffected).
3. My Week with state gating and the pause model (requires the journey-state work that 41B/43 bring; design can land behind a flag).
4. Companion surface (phase 42A provenance contract defined first).
5. Activation (needs the product-instance/claim architecture; design ready).
6. Homepage and hubs; then the remaining pages.

Each step: focused tests, visual QA at 1440/390, accessibility checks, no deployment (Lovable stays unpublished until Gate 10).
