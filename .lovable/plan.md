
## Phase 9.2e — Family + Toddler Common Questions polish

Roll out the First Year Common Questions accordion pattern to Family and Toddler, and extend AskPage topic suggestions to `stage=family` and `stage=toddler`.

### Files to edit (only these)
- `src/components/family/FamilyCommonQuestions.tsx` — replace with FY-pattern accordion in Family palette
- `src/components/toddler/ToddlerCommonQuestions.tsx` — replace with FY-pattern accordion in Toddler palette
- `src/pages/AskPage.tsx` — add Family + Toddler topic suggestion maps and broaden the gate

No changes to article data, copy, SEO, routes, sitemap, robots. No Pregnancy/TTC/IVF/First Year edits (First Year read as reference only). No image generation.

### 1. FamilyCommonQuestions.tsx

Rewrite using the FY structure (inline accordion, chip label, short answer, Read more pill, Ask more pill) but single-track Family palette (`--stage-family`, `--stage-family-soft`, `--stage-family-accent`, `--stage-family-deep`). Keep heading `What parents quietly wonder`. Drop the per-row "Baby"/"You" chip (single track), keep the coloured accent bar.

Six items (question, short answer, readMoreHref, askHref) exactly as briefed:

1. Another baby → `/family/growing-families/preparing-for-another-baby` · `/ask?stage=family&topic=another-baby`
2. New sibling → `/family/growing-families/helping-your-child-adjust-to-a-new-sibling` · `/ask?stage=family&topic=new-sibling`
3. Routines → `/family/family-basics/building-family-routines` · `/ask?stage=family&topic=routines`
4. Boundaries → `/family/relationships/setting-boundaries-with-grandparents` · `/ask?stage=family&topic=boundaries`
5. Money stress → `/family/family-basics/managing-childcare-costs-without-feeling-overwhelmed` · `/ask?stage=family&topic=money-stress`
6. Overwhelm → `/family/relationships/sharing-the-mental-load-in-family-life` · `/ask?stage=family&topic=family-overwhelm`

Read more labels: short "Read: <topic>" style matching FY.

### 2. ToddlerCommonQuestions.tsx

Same rewrite in Toddler palette (`--stage-toddler*`). Heading stays `What parents quietly wonder`.

Six items as briefed:

1. Tantrums → `/toddler/behaviour-emotions/understanding-toddler-tantrums` · `/ask?stage=toddler&topic=tantrums`
2. Sleep → `/toddler/sleep/toddler-sleep-rhythms` · `/ask?stage=toddler&topic=sleep`
3. Speech → `/toddler/speech-language/when-to-ask-about-speech-delay` · `/ask?stage=toddler&topic=speech`
4. Picky eating → `/toddler/food-feeding/picky-eating-in-toddlers` · `/ask?stage=toddler&topic=picky-eating`
5. Potty training → `/toddler/potty-learning/signs-your-child-may-be-ready-for-potty-training` · `/ask?stage=toddler&topic=potty-training`
6. Patience → `/toddler/behaviour-emotions/helping-your-toddler-with-big-feelings` · `/ask?stage=toddler&topic=parent-patience`

### 3. AskPage.tsx

Both `family` and `toddler` are already registered in `aiStageStyles` — no changes to `aiStageStyles.ts`.

Add two new maps next to `FIRST_YEAR_TOPIC_SUGGESTIONS`:

```ts
const FAMILY_TOPIC_SUGGESTIONS: Record<string, string[]> = {
  "another-baby":     [...4 chips as briefed],
  "new-sibling":      [...],
  "routines":         [...],
  "boundaries":       [...],
  "money-stress":     [...],
  "family-overwhelm": [...],
};

const TODDLER_TOPIC_SUGGESTIONS: Record<string, string[]> = {
  "tantrums":         [...],
  "sleep":            [...],
  "speech":           [...],
  "picky-eating":     [...],
  "potty-training":   [...],
  "parent-patience":  [...],
};
```

Chips content verbatim from the brief (four per topic).

Update the `topicSuggestions` selector to pick the right map by stage:

```ts
const topicSuggestions = topic
  ? ((stageKey === "first-year" || stageKey === "recovery") && FIRST_YEAR_TOPIC_SUGGESTIONS[topic])
    || (stageKey === "family" && FAMILY_TOPIC_SUGGESTIONS[topic])
    || (stageKey === "toddler" && TODDLER_TOPIC_SUGGESTIONS[topic])
    || null
  : null;
```

Everything else in the welcome state already keys off `sc` (from `getAiStageStyle(stageKey)`) and `hasStageContext`, so Family/Toddler get the correct palette, hide generic chips, and show topic chips automatically — no other AskPage changes.

### Behaviour after change

- `/family` — six premium accordion questions, Family palette, correct Read more + Ask more.
- `/toddler` — same, Toddler palette.
- `/ask?stage=family&topic=<k>` — Family tint, blank input, no generic chips, Family topic chips.
- `/ask?stage=toddler&topic=<k>` — Toddler tint, blank input, no generic chips, Toddler topic chips.
- `/ask` — unchanged (generic chips).
- `/ask?stage=first-year&topic=…`, `/ask?stage=recovery&topic=…` — unchanged.
- `/ask?stage=toddler` (no topic) — unchanged (blank, no chips).
- Pregnancy / TTC / IVF / First Year hubs — untouched.

### Verification

- `bunx tsgo --noEmit`
- Playwright screenshots at 1280×1800 of `/family`, `/toddler`, all 12 topic Ask URLs, plus regression on `/ask`, `/ask?stage=first-year&topic=sleep`, `/ask?stage=recovery&topic=recovery-bleeding`, `/first-year`, `/pregnancy`, `/trying-to-conceive`, `/ivf`.
- Confirm each accordion opens, each Read more + Ask more URL matches, no mobile overflow.

After this ships, safe to resume Phase 9.3 TTC SEO.
