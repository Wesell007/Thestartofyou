# Phase 29B.2b — Ask Page Visual Parity and Trust Copy Fix

Presentation and copy only. No backend, prompt, routing, sanitisation, schema, auth, SEO or sitemap changes.

## 1. Trust copy (single calm line)

`src/lib/answerSourceLinks.ts` — replace the exported `APPROVED_SOURCES_TRUST_LINE` value with:

"Based on NHS and approved UK health sources, including medically reviewed guidance where available. This is not a diagnosis or a replacement for your midwife, GP or health visitor."

`src/pages/AskPage.tsx` — delete the second paragraph "AI-generated, not individually medically reviewed. Check important health decisions with a qualified professional." so there is one trust footer. Constant name and all sanitisation logic stay unchanged, so the companion panel picks up the new wording automatically (`CompanionMessageList.tsx` needs no edit).

Unrelated surfaces (`Terms.tsx`, `SupportAISupport.tsx`) are left alone; they are not the Ask/companion answer trust line.

## 2. Companion-surface composition (desktop and mobile)

Restructure the answer route in `AskPage.tsx` so the whole answer is one contained companion column rather than a stack of full-width article bands.

- Wrap question + In brief + More on this + trust footer in a single shared column container (`max-w-[46rem]`, `px-5 md:px-8`, one wrapper instead of six repeated containers) so alignment and rhythm are consistent.
- Question area becomes compact: keep the `h1` for accessibility but drop it to `text-[1.2rem] md:text-[1.5rem]`, tighten the eyebrow, reduce breadcrumb bottom margin from `mb-10` to `mb-6`, and place the question inside the top of the answer surface rather than as a page title over an empty band.
- Reduce hero band height and blur-orb scale so the top wash frames the card instead of dominating an empty page.
- Vertical rhythm: replace the `mb-12` / `mt-14 mb-14` / `mb-20` / `py-14 md:py-16` sequence with a consistent `space-y-6 md:space-y-8` inside the column, and main padding `pt-16 md:pt-20 pb-20`.

## 3. Answer surfaces (card quality per the board)

- **In brief**: keep the gradient card, tighten to `px-5 py-7 md:px-9 md:py-9`, keep one sprig, cap measure at 58ch.
- **More on this**: the fuller answer no longer floats as bare text. Place `EditorialAnswer` inside a paper card (`bg-card`, hairline `border-border/40`, `rounded-[1.5rem]`, `shadow-soft`, `px-5 py-7 md:px-9 md:py-9`) with the quiet section label inside the card top and a single low-opacity botanical accent. Body measure capped so lines stay readable at 1440px.
- **Trust footer**: hairline rule + sprig + one line, inside the same card at its base.
- **Loading / error**: match the same card metrics so states do not jump.
- `EditorialAnswer.tsx`: only if needed after the card wrap, trim its outermost top spacing so it does not double-pad inside the new card. No parsing, tone, sanitisation or `disableLinks` change.

## 4. Follow-up area as "continue the conversation"

Merge the current "Ask a follow-up" chip list and the separate "Ask another question" band into one contained follow-up card at the end of the column:

- heading "Ask another question", subline "Stay with this topic or ask about something new."
- input row and starter chips in the same card, `gap-2.5`, 44px minimum height, visible `focus-visible` rings, hover raises border to the stage accent with a soft background rather than a shadow pop.
- one reassurance line, one botanical accent, no duplicated glow layers.
- "Continue your journey" tail links stay but move to a quieter 3-up grid below the follow-up card with reduced padding.

## 5. Clarification card parity

Same column width and card metrics as the answer surfaces, with the compact question area above it, chips in the shared premium chip style, input row matching the follow-up input, one sprig plus one soft botanical accent, and enough bottom spacing that it never sits tight against the footer on a short page.

## 6. Empty state

Bring the empty/prompt state onto the same column width, card metrics and chip style so all three states read as one system.

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
