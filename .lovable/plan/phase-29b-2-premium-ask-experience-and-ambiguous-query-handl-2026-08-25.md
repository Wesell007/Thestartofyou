# Phase 29B.2 — Premium Ask Experience and Ambiguous Query Handling

Make `/ask` feel like the full-page version of the companion panel: calm, conversational, easy to scan, with no article-page scaffolding. Presentation and light query handling only.

## Nano Banana direction

Extend the existing companion direction board with a second board generated for the full Ask page (`src/assets/ask-direction-board.png`), covering: empty state, answer state, short answer card, fuller answer section, follow-up area, ambiguous clarification state, trust line, mobile layout, desktop layout. The build follows that board: cream paper, soft sage and muted olive, gentle blush accents, botanical detail, editorial serif headings.

## 1. Remove article scaffolding

In `src/pages/AskPage.tsx`:
- Delete the `01 / 03`, `02 / 03`, `03 / 03` counters and the "Continue reading for the full picture" line.
- Replace the "The short answer" / "The full picture" / "Keep exploring" label rows with quieter companion labels: "In brief", "More on this", "Ask a follow-up".
- Only render each section when its content exists; nothing is padded to fill a three-part shape.
- Drop the standalone "A small reminder" full-bleed reassurance band (it is the biggest source of empty page) and fold a single quiet reassurance line into the follow-up area.

## 2. Short answer card

- Tighter proportions: reduce padding to roughly `px-6 py-8 md:px-10 md:py-10`, cap measure at ~60ch, drop one of the two blur orbs.
- Remove the split-first-eight-words pull-quote trick; render one clean serif paragraph at ~1.15rem mobile / ~1.35rem desktop with comfortable leading.
- Card reads as a summary, with the fuller answer starting immediately below at a clear but calm hierarchy step.

## 3. Full answer readability

In `src/components/shared/EditorialAnswer.tsx` (presentation only):
- Slightly reduce the oversized outer rhythm (`space-y-12/16` -> tighter, consistent spacing) so sections group rather than float.
- Keep body at 16/17px, keep the soft bullet system, reduce callout padding on mobile so long answers do not feel cramped or over-boxed.
- No change to module parsing, tone classification, sanitisation or `disableLinks`.

## 4. Previous-answer treatment

Today `handleAskAgain` and `handleSuggestion` build a context string containing `Previous question: …` and `Previous answer: …`, and that whole string is rendered as the chip at the top of the answer page. Fix:
- Keep sending the conversational context to the model unchanged (no answer-quality regression).
- Render the chip only from the original stage/page context, never from the previous-question/previous-answer text. Track the carried conversation separately from the display label.
- Where a prior question exists, show a quiet "Back to previous question" link instead of any snippet.

## 5. Bottom Ask area

- Rework the closing block into a continuation of the same conversation: heading "Ask another question", subline "Stay with this topic or ask about something new."
- Reduce the section from `py-20 md:py-28` to controlled spacing, remove the duplicated glow layers, keep one botanical accent.
- Refined starter chips, visible focus rings, 44px minimum tap height on input, send button and chips.

## 6. Ambiguous queries

Handled in the frontend, no backend or infrastructure change.
- New `src/lib/askClarification.ts`: a pure resolver that flags short, broad, non-urgent queries (1–3 words, no concern wording) and maps known broad topics to a clarifying question plus chips. Seeded with milestones, feeding, sleep, symptoms, movement, testing, plus a generic fallback question.
- Bare broad terms that DO get clarification: "Milestones", "Feeding", "Sleep", "Symptoms", "Movement", "Testing". The word "symptom" alone does not bypass clarification.
- Concern guard (bypasses clarification, goes straight to the AI and its safety route): wording that suggests worry, urgency, danger, pain, bleeding, reduced or absent movement, breathing difficulty, fever, not feeding, or similar. Examples that must never be clarified: "reduced movements", "bleeding", "pain", "severe headache", "baby not feeding", "baby breathing fast", "I am worried about symptoms", "urgent", "help now".
- The guard matches on concern signals (worried, scared, urgent, help now, emergency, pain, bleeding, reduced/no movement, breathing, fever, temperature, not feeding/eating, severe, sudden, dizzy, faint, cramp, discharge) rather than on the presence of a topic noun. A query is only clarified when it is short, matches a broad topic, and carries no concern signal.
- When a query is flagged, `/ask` renders a clarification state instead of calling the model: warm question, chips that re-ask a specific version of the query, and the normal input below. No urgent-care fallback text appears.
- "Milestones" -> "Do you mean pregnancy milestones, baby milestones, toddler development, or something you have noticed recently?" with chips: Pregnancy milestones / Baby milestones / Toddler development / Something I am worried about.
- Every chip carries an explicit full question, not the chip label. Clicking a chip submits that question directly to the AI, so it can never re-enter the clarification state. Examples: "What pregnancy milestones should I know about?", "What baby milestones should I know about?", "What toddler development changes should I know about?".
- The "Something I am worried about" chip does not submit a broad term. It focuses the input with a concern-led prompt so the person can describe what is happening in their own words; if it does submit, it submits a concern-led question that the guard treats as non-ambiguous. The same clarification card is never shown twice in a row.
- Guaranteed by construction: the resolver only ever flags short bare topic terms, and every chip question is a full sentence well past that threshold, so chip submissions bypass clarification. A test asserts each chip question resolves to "not ambiguous".


## 7. Trust line

Keep the exact non-clickable wording, restyled: a small sprig mark plus hairline rule above it, sitting under the answer body rather than as loose grey text. Merge with the existing "AI-generated, not individually medically reviewed" badge so there is one calm trust footer instead of two.

## 8. Preserved

`ai-search` backend, source routing, urgent escalation, `aiAnswerSafety`, `answerSourceLinks`, `disableLinks`, companion panel behaviour, schema, RLS, auth, routes, SEO, sitemap.

## Tests

New `src/lib/askClarification.test.ts` covering: broad terms flagged, urgent/symptom wording not flagged, chip sets returned. New/extended Ask page tests covering: answer layout renders, no `Previous answer:` text in the DOM, no Sources/References heading, no anchor elements in the answer, trust line present, reduced-movements query is not treated as ambiguous. Existing sanitiser and mode tests remain unchanged.

## Verification

`npx tsgo --noEmit -p tsconfig.json`, targeted Vitest, `npx vitest run`, `npm run build`, plus Playwright screenshots at 390px and 1440px for the empty, answer, follow-up, ambiguous and urgent states, and a companion-panel regression check on `/my-ttc-journey`, `/pregnancy` and `/first-year`.
