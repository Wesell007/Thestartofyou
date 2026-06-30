## Universal stage-aware AI search colour system

Visual + routing-state fix only. No changes to AI generation, prompts, edge functions, EditorialAnswer, routes, Navbar, Footer, assets, data files, auth, saved-journey logic, or hub layouts. No new CSS tokens.

### 1. New shared helper — `src/lib/aiStageStyles.ts`
Single source of truth for stage → existing CSS tokens.

```ts
export type AiStageKey =
  | "toddler" | "pregnancy" | "first-year" | "recovery"
  | "ttc" | "ivf" | "postpartum" | "support" | "preparing";

export interface AiStageStyle {
  key: AiStageKey;
  label: string;
  bgVar: string;
  softVar?: string;
  accentVar: string;
  deepVar?: string;
}

export const aiStageStyles: Record<AiStageKey, AiStageStyle> = { /* maps each key to existing --stage-* tokens in src/index.css */ };
export const getAiStageStyle: (key?: string | null) => AiStageStyle | null;
export const stageColors: (s: AiStageStyle | null) => {
  accent, accentStrong, accentSoft, accentSofter, accentRing,
  accentBorder, accentBorderStrong, bgWash, bgWashSoft, deep, deepSoft
} | null;
```
Unknown / missing keys return `null` so the existing default styling stays.

### 2. `src/components/shared/AISearchBar.tsx`
Add optional prop `stage?: string`. In `handleAsk` and `handleSuggestion`, append `&stage=<key>` to the `/ask` URL when present. Preserve `context`, IVF `journey`, existing `stageAccent` visual styling, and default behaviour for hubs that don't pass `stage`.

### 3. `src/components/shared/HubAISupport.tsx`
Add optional `stage?: string` prop, forward to `AISearchBar`. No layout / copy changes; existing `stageBg`, `stageAccent`, prompts, behaviour unchanged.

### 4. One-line `stage` prop additions
- `src/components/toddler/ToddlerAISupport.tsx` → `stage="toddler"`
- `src/components/toddler/topic/ToddlerTopicPage.tsx` (inner `HubAISupport`) → `stage="toddler"`
- `src/components/toddler/age/ToddlerAgePage.tsx` (inner `HubAISupport`) → `stage="toddler"`
- `src/components/firstyear/FirstYearAISupport.tsx` → `stage="first-year"`
- `src/components/postpartum/PostpartumAISupport.tsx` → `stage="postpartum"`
- `src/components/preparing/PreparingAISupport.tsx` → `stage="preparing"`

TTC, IVF, Support custom panels are left as-is and can opt in later.

### 5. `src/pages/AskPage.tsx`
- Read `const stageKey = searchParams.get("stage")`, resolve `const stage = getAiStageStyle(stageKey)`, derive `const sc = stageColors(stage)`.
- When `sc` is present, override colour via inline `style` props on each tinted element (inline `style` always wins over Tailwind classes for `color` / `background` / `borderColor`). Existing `tone` (sage / lavender) classes remain as fallback when `sc` is `null`.
- Re-toned surfaces: top gradient wash, `StageGlow` halo, "You asked" eyebrow, stage context chip (bg, ring, dot, text), loading card border + spinner + icon chip + ring, streaming "Still writing…" spinner + label, short-answer hero card gradient + border + sparkles icon + eyebrow + hairline divider, medical trust pill, follow-up prompt hover border + chevron, "Continue your journey" card hover border + icon chip + arrow, "Ask something else" wash + glow + input focus ring + suggestion chip hovers.
- Botanical / Sprig accents remain (neutral).
- `handleAskAgain` and `handleSuggestion` re-append `stage` so follow-up questions keep the same tone.
- If `stage` is missing or unknown → default sage tone, no errors, bookmarks safe.
- IVF precedence: if `stage` is also set with `journey=ivf`, `stage` wins for visual tone (lets future IVF hub pass `stage="ivf"` without another patch).

### 6. Verification
- `tsgo` type check.
- Playwright @ 1280:
  - From `/toddler`, submit "Why does my toddler have tantrums?" → URL contains `stage=toddler`; loading + answer states render pumpkin-clay (`--stage-toddler-accent`), not sage. Submit a follow-up → URL still contains `stage=toddler`; tone persists.
  - `/ask?q=test` → default sage tone, no console errors.
  - `/ask?q=test&stage=unknown` → default sage tone, no errors.
  - First Year AI panel submit → URL contains `stage=first-year`; tone applied.
  - Spot-check TTC / IVF / Pregnancy hubs render unchanged.

### Files
- **New**: `src/lib/aiStageStyles.ts`
- **Edit**: `src/components/shared/AISearchBar.tsx`, `src/components/shared/HubAISupport.tsx`, `src/pages/AskPage.tsx`
- **Edit (one-line `stage` prop add)**: `src/components/toddler/ToddlerAISupport.tsx`, `src/components/toddler/topic/ToddlerTopicPage.tsx`, `src/components/toddler/age/ToddlerAgePage.tsx`, `src/components/firstyear/FirstYearAISupport.tsx`, `src/components/postpartum/PostpartumAISupport.tsx`, `src/components/preparing/PreparingAISupport.tsx`

### Out of scope
No edits to `useAISearch`, the `ai-search` edge function, prompts, EditorialAnswer, routes, Navbar, Footer, assets, data files, other hub layouts, auth, setup, or saved-journey logic. No new pages, routes, CSS tokens, or assets.
