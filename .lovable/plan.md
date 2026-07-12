## Phase 9.2d.2 — Recovery tone for postpartum Ask flows

Small colour-logic fix: recovery-track questions on `/first-year` should open `/ask` in the recovery tone, not First Year blue.

### Files to edit
- `src/components/firstyear/new/FYCommonQuestions.tsx`
- `src/pages/AskPage.tsx`

No other files touched.

### 1. FYCommonQuestions.tsx
Update three recovery-track `askHref`s to use `stage=recovery`:

- Bleeding → `/ask?stage=recovery&topic=recovery-bleeding`
- Baby blues → `/ask?stage=recovery&topic=emotional-wellbeing`
- Feel like myself → `/ask?stage=recovery&topic=identity-recovery`

Baby-track links stay on `stage=first-year`. Accordion row tone (`trackStyle`) is already recovery vs baby tokens, so no change there. Questions, answers, Read more links unchanged.

### 2. AskPage.tsx
`getAiStageStyle` already includes `recovery` → styling wiring works automatically once the URL uses `stage=recovery`.

Only tweak: broaden the topic-suggestions gate so it fires for both stages.

Change:
```ts
stageKey === "first-year" && topic && FIRST_YEAR_TOPIC_SUGGESTIONS[topic]
```
to:
```ts
(stageKey === "first-year" || stageKey === "recovery") && topic && FIRST_YEAR_TOPIC_SUGGESTIONS[topic]
```

The map already contains all six topic keys, so no map changes needed. Rename the const to `FIRST_YEAR_TOPIC_SUGGESTIONS` still fine (internal only), or optionally rename to `FY_TOPIC_SUGGESTIONS` for accuracy — cosmetic, not required.

`sc = stageColors(getAiStageStyle("recovery"))` will produce recovery-tinted accents for the sparkle badge, focus ring, suggestion chips, and the "You may also want to ask" label — all already driven by `sc`. No further branching required.

### Behaviour after change
- Baby topics → First Year blue tone + correct chips.
- Recovery topics → recovery tone + correct chips.
- `/ask` → generic chips (unchanged).
- `/ask?stage=first-year` (no topic) → blank, no chips (unchanged).
- `/ask?stage=recovery` (no topic) → recovery tint, blank, no generic chips, no topic block.
- `/ask?stage=toddler` → unchanged.

### Verification
- `bunx tsgo --noEmit`
- Playwright checks on the six topic URLs + `/first-year` accordion links + regression on `/ask`, `/ask?stage=toddler`, `/family`, `/toddler`, `/pregnancy`, `/trying-to-conceive`, `/ivf`.

After this ships, safe to resume Phase 9.3 TTC SEO.
