## Phase 9.2d.1 — First Year "Ask more" Topic Suggestions

Small, focused refinement so that "Ask more" from the First Year Common Questions accordion lands on `/ask` with First Year styling AND relevant follow-up chips.

### Files to edit
- `src/components/firstyear/new/FYCommonQuestions.tsx`
- `src/pages/AskPage.tsx`

No other files touched. No article data, copy, SEO, routes, sitemap, or robots changes. Pregnancy, TTC, IVF, Family, Toddler files untouched.

### URL strategy
Use `topic` query param alongside existing `stage`:

```
/ask?stage=first-year&topic=sleep
/ask?stage=first-year&topic=recovery-bleeding
/ask?stage=first-year&topic=milestones
/ask?stage=first-year&topic=emotional-wellbeing
/ask?stage=first-year&topic=feeding
/ask?stage=first-year&topic=identity-recovery
```

`topic` is cleaner than `prompt` (semantic, not a query string), and AskPage already reads `searchParams` directly so no plumbing needed.

### FYCommonQuestions.tsx changes
- Extend each question item with a `topic` string.
- Update `askHref` for each of the six questions to `/ask?stage=first-year&topic=<slug>`.
- Accordion behaviour, answers, "Read more" links, styling all unchanged.

Mapping:
1. Sleep → `sleep`
2. Bleeding → `recovery-bleeding`
3. Milestone → `milestones`
4. Baby blues → `emotional-wellbeing`
5. Feeding → `feeding`
6. Feel like myself → `identity-recovery`

### AskPage.tsx changes
Only the welcome (`!hasQuery`) branch changes.

1. Read `topic` from `searchParams`.
2. Add a local `FIRST_YEAR_TOPIC_SUGGESTIONS` map with the six topic → 4 suggested questions (exact strings from the brief).
3. Determine `topicSuggestions`:
   - If `stageKey === "first-year"` and `topic` is a recognised key → use that list.
   - Otherwise `null`.
4. Rendering rules in welcome state:
   - Input stays blank (`autoFocus` preserved).
   - Generic chips block (`!hasStageContext`) stays as-is → still hidden for any stage context, including Toddler.
   - When `topicSuggestions` present, render a new block below the input:
     - Small uppercase label "You may also want to ask" (styled to match existing "Try one of these" label, tinted via `sc.accent` when available).
     - Chips reuse the same button classes as the generic welcome chips, but with First Year accent border/hover via `sc` inline styles (matching the existing stage-tinted pattern already used for the search icon/focus ring).
     - Each chip calls the existing `handleSuggestion(s)` → navigates to `/ask?q=…&stage=first-year` (does NOT preserve `topic`, since once the user picks a question the topic context is fulfilled).
5. If `stage=first-year` present but no recognised `topic` → no suggestions block, input blank, generic chips hidden (current behaviour preserved).
6. Generic `/ask` → unchanged. `/ask?stage=toddler` → unchanged (still hides generic chips, no topic suggestions).

### Technical notes
- No changes to `handleSuggestion` signature; it already carries `stageKey` forward.
- No new deps, no new components — keep the suggestion block inline in AskPage.
- British English, no em dashes, in any new strings (labels only; question strings come verbatim from the brief).

### Verification
- `bunx tsgo --noEmit`
- Manual routes (Playwright, 1280×1800 + 375×812):
  - `/first-year` → each accordion "Ask more" navigates to correct `/ask?stage=first-year&topic=…` URL.
  - Each of the six topic URLs → 200, First Year styling, blank input, 4 correct suggestion chips, no generic chips.
  - `/ask` → generic chips present.
  - `/ask?stage=first-year` (no topic) → blank input, no generic chips, no topic block.
  - `/ask?stage=toddler` → unchanged (Toddler styling, no generic chips, no topic block).
- Regression spot-checks: `/family`, `/toddler`, `/pregnancy`, `/trying-to-conceive`, `/ivf` render.

After this ships, safe to resume Phase 9.3 TTC SEO.
