## Bug fix: First Year + Postpartum `/ask` colour inheritance

Wiring-only. `AskPage`, `aiStageStyles`, `AISearchBar`, `HubAISupport` are untouched — they already resolve `first-year`, `recovery`, and `postpartum` correctly. The bug is that the live entry points navigate to `/ask?q=…` without a `stage` param.

### Edits

1. **`src/components/firstyear/new/FYAISupport.tsx`** — append `&stage=first-year` to baby chip hrefs (line 33) and `&stage=recovery` to recovery chip hrefs (line 46). Main `AISearchBar` untouched.

2. **`src/components/firstyear/new/FYCommonQuestions.tsx`** — extend the existing `<Link to=…>` (line 49) so `item.track === 'baby'` appends `&stage=first-year`, `'recovery'` appends `&stage=recovery`. `journey` param preserved.

3. **`src/components/firstyear/topic/FirstYearTopicPage.tsx`** — update `guidanceHref` (lines 55–56) to accept `side` and append `&stage=recovery` when `side === "recovery"`, else `&stage=first-year`. Data-supplied `item.href` values pass through untouched. Update the single call site to pass `config.side`.

4. **`src/components/firstyear/phase/FirstYearPhasePage.tsx`** — append `&stage=first-year` to the guidance `<Link to=…>` (line 223).

5. **`src/components/postpartum/PostpartumCommonQuestions.tsx`** — append `&stage=postpartum` to all three `/ask` navigations: input submit (line 20), chip button `onClick` (line 73), question row `<Link to=…>` (line 92).

### Not touched
`AskPage.tsx`, `aiStageStyles.ts`, `AISearchBar.tsx`, `HubAISupport.tsx`, `FirstYearAISupport.tsx`, `PostpartumAISupport.tsx`, all Toddler/TTC/IVF/Pregnancy/Support/Preparing entry points, and any copy/layout/prompts/data/routes/assets/nav/footer/journey logic.

### Verify
- `tsgo` typecheck.
- Playwright: submit AI search from `/first-year` (baby chip → `stage=first-year`, recovery chip → `stage=recovery`), `/first-year/feeding` guidance fallback (`stage=first-year`), `/first-year/postpartum-recovery` guidance fallback (`stage=recovery`), `/first-year/0-3-months` guidance (`stage=first-year`), and all three entry points on `/postpartum` (`stage=postpartum`).
- Direct `/ask?q=test&stage=…` screenshots for `first-year`, `recovery`, `postpartum`, `toddler`, and no-stage default.
