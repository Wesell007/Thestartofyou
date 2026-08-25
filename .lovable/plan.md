# Phase 29B.2c — More On This Premium Section Cards

Presentation-only polish inside the `/ask` "More on this" answer card. No backend, prompts, routing, AI modes, sanitisation, schema, RLS, auth, SEO or sitemap changes.

## Goal

When the rendered answer contains these section headings:

- "What this means"
- "What may help"
- "When to seek support"

render each as its own quiet premium inner card, instead of one long plain text block.

## Implementation

### 1. `src/components/shared/EditorialAnswer.tsx`

Add a new "section card" classification for the three exact headings (case-insensitive, markdown-stripped).

- Detect the headings during module splitting.
- Render matching modules as premium inner cards:
  - `bg-parchment/80` or `bg-parchment` paper surface
  - `border border-border/40` hairline border
  - `rounded-[16px]` corners
  - `px-5 py-5 md:px-6 md:py-6` padding
  - `font-serif text-[1.1rem] md:text-[1.25rem]` heading
  - existing `proseClasses` for body text and bullets
  - no heavy shadows, no loud accent colours
- Stack section cards vertically with `space-y-4 md:space-y-5`.
- Preserve existing flow blocks and tone callouts for all other headings.
- Preserve the existing `seek` callout for urgent wording such as "When to call", "Emergency warning signs", or "Red flags", so urgent answers keep their current treatment and are not duplicated awkwardly.

### 2. `src/pages/AskPage.tsx` (only if spacing needs it)

If the "More on this" card padding makes the new inner cards feel cramped, adjust the wrapper spacing around `EditorialAnswer`. No other changes.

### 3. Tests

Create or extend focused tests for `EditorialAnswer`:

- "What this means" renders inside a section card
- "What may help" renders inside a section card
- "When to seek support" renders inside a section card
- "When to call" / urgent wording still renders the existing seek callout
- Existing answer sanitisation behaviour is unchanged
- `disableLinks` still strips anchors inside section cards

Do not rewrite unrelated tests.

## Verification

Run:

```
npx tsgo --noEmit -p tsconfig.json
npx vitest run
npm run build
```

Visually check on `/ask`:

- "When will I feel the baby move?"
- "Sleep regression"
- "Is what I'm feeling normal at 8 weeks?"
- "When should I call about reduced movements?"

Confirm:

- the three section headings are separated into premium cards where present
- urgent support treatment is preserved
- old trust copy does not return
- no external links, raw URLs, or Sources/References sections
- no regression to ambiguous-query handling
- 390px and 1440px screenshots look calm and contained

Stop after the report.