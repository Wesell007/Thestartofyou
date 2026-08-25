# Phase 29B.2b — Ask Page Visual Parity and Trust Copy Fix

Presentation and copy only. No backend, prompt, routing, sanitisation, schema, auth, SEO or sitemap changes.

## 1. Trust copy (single calm line)

`src/lib/answerSourceLinks.ts` — replace the exported `APPROVED_SOURCES_TRUST_LINE` value with:

"Based on NHS and approved UK health sources, including medically reviewed guidance where available. This is not a diagnosis or a replacement for your midwife, GP or health visitor."

`src/pages/AskPage.tsx` — delete the second paragraph "AI-generated, not individually medically reviewed. Check important health decisions with a qualified professional." so there is one trust footer. Constant name and all sanitisation logic stay unchanged, so the companion panel picks up the new wording automatically (`CompanionMessageList.tsx` needs no edit).

Unrelated surfaces (`Terms.tsx`, `SupportAISupport.tsx`) are left alone; they are not the Ask/companion answer trust line.

## 2. Board-derived design contract (applied literally in code)

Values read off `src/assets/ask-direction-board.png` and used as the shared card system for every Ask state:

- Column: `mx-auto w-full max-w-[46rem] px-5 md:px-8` (one wrapper, not six repeated containers).
- Surfaces: `rounded-[22px]`, `bg-card`, hairline `border border-border/40`, `shadow-soft` only (no elevated shadows, no double glow layers).
- Inner padding: `px-5 py-6 md:px-8 md:py-8`; nested sub-surfaces `rounded-[16px] px-4 py-4`.
- Section spacing inside the column: `space-y-5 md:space-y-7`. Page padding `pt-20 pb-16 md:pt-24 md:pb-24`.
- Question bubble (board panels 2, 8, 9): small sprig avatar circle `h-9 w-9 rounded-full bg-sage-bg/60` next to a `rounded-[16px] bg-parchment/80 border border-border/40 px-4 py-3` bubble.
- One botanical accent per card, low opacity, bottom-right or top-right only, `w-[120px] md:w-[170px]`, `opacity-[0.14]`.
- Body measure capped at `max-w-[62ch]`; short answer at `max-w-[52ch]`.

## 3. Answer state (board panels 2, 3, 4, 8, 9)

Restructure the answer route of `src/pages/AskPage.tsx` into a single companion column.

- **Question**: the large `h1` page title is removed as a visual device. The `h1` remains for accessibility but renders as the board's compact question bubble at `text-[15px] md:text-[16px]` with the sprig avatar; breadcrumb margin drops `mb-10` -> `mb-5`; the tall hero wash shrinks from `h-[680px]/[760px]` to `h-[320px] md:h-[380px]` with a smaller blur orb, so the top of the page frames the card instead of an empty band.
- **In brief (board panel 3)**: card with the same avatar mark, serif summary at `text-[1.05rem] md:text-[1.2rem]`, `max-w-[52ch]`, one sprig, tightened padding.
- **More on this (board panel 4)**: `EditorialAnswer` moves inside a paper card with the label as a quiet card header, so the fuller answer never floats as bare text; one botanical accent at the card edge as in the board.
- **Trust footer (board panel 7)**: hairline rule + centred sprig + the single approved trust line, inside the base of the same answer card.
- Loading and error states adopt identical card metrics so states do not jump.
- `src/components/shared/EditorialAnswer.tsx`: reduce the outer `space-y-12/16` rhythm to `space-y-6 md:space-y-8` and trim first/last child margins so it sits correctly inside the card. No parsing, tone, sanitisation or `disableLinks` change.

## 4. Follow-up card (board panel 5)

Merge the current "Ask a follow-up" chip list and the separate full-bleed "Ask another question" band into one card matching the board:

- serif heading "What would you like to know next?" plus subline, botanical sprig top-right.
- rounded input row with a circular accent send button, `min-h-[44px]`, visible `focus-visible` ring.
- hairline divider, then "Suggested follow-ups" label and pill chips at `gap-2` with 44px targets and accent-border hover.
- "Continue your journey" tail links stay, but as a quieter 3-up grid with reduced padding below the follow-up card.

## 5. Clarification card (board panel 6)

Rebuild to the board tile: soft blush-tinted surface, circular `?` mark, serif "Just to make sure I understand…" heading with the resolver question beneath, two-column chip grid on desktop and stacked on mobile, "Or you can rephrase your question." line above the shared input row, botanical accent right side, same column width and card metrics as the answer surfaces.

## 6. Empty state (board panel 1)

Rebuild inside the same column as a single centred card: sprig mark, serif "How can I help you today?", one-line subline, the shared rounded input with circular send button, and an "Examples:" chip row using the same chip style, so all states read as one system.

## 7. Nano Banana parity gate

Before the report, capture Playwright screenshots at 390px and 1440px for empty, answer (short answer and More on this in frame), follow-up, clarification and urgent states, and compare each against its board panel. Any state that does not match the board's containment, radius, padding rhythm or card structure is corrected before the phase is reported. If a state cannot be matched with the current component structure, the report says exactly why instead of claiming parity.


## Tests

Extend `src/lib/askClarification.test.ts` (existing) and add a focused `src/pages/AskPage.test.tsx`-style test only if a page test does not already exist, covering:

- new trust line text is present
- "Guidance is checked against approved UK health sources" is absent
- "AI-generated, not individually medically reviewed" is absent
- no anchor elements and no raw `http` URLs in the rendered answer
- "Milestones" still renders the clarification card
- "When should I call about reduced movements?" bypasses clarification

No unrelated tests rewritten.

## Verification

`npx tsgo --noEmit -p tsconfig.json`, targeted Vitest, `npx vitest run`, `npm run build`, plus Playwright captures at 390px and 1440px for empty, answer, clarification, urgent and follow-up states, a side-by-side read against `src/assets/ask-direction-board.png`, and a companion-panel regression check on `/pregnancy`, `/first-year` and `/my-ttc-journey`. Checks run for: "When will I feel the baby move?", "Sleep regression", "Milestones", "Feeding cues", "Is what I'm feeling normal at 8 weeks?", "When should I call about reduced movements?".

## Preserved

`ai-search`, source routing, prompts, AI modes, urgent escalation, `aiAnswerSafety`, `answerSourceLinks` stripping, `disableLinks`, clarification logic, schema, RLS, auth, routes, SEO, sitemap.
