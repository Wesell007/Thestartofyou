## Universal AI stage colour — hub opt-in wiring

Prop-wiring only. No copy, layout, prompt, token, route, asset, or logic changes.

### Edits

**Pregnancy → `stage="pregnancy"`**
- `src/components/pregnancy/PregnancyAIPanel.tsx` — add prop to `AISearchBar`
- `src/components/pregnancy/GuidanceAndQuestions.tsx` — add prop to `AISearchBar`
- `src/components/trimester/TrimesterAISupport.tsx` — add prop to `AISearchBar`
- `src/components/week/WeekAISupport.tsx` — add prop to `AISearchBar`

**TTC → `stage="ttc"`**
- `src/components/ttc/TTCAISupport.tsx` — add prop to `AISearchBar`
- `src/components/ttc/TTCTopicPage.tsx` — add prop to `AISearchBar`
- `src/components/ttc/TTCSubtopicPage.tsx` — add prop to `AISearchBar`
- `src/pages/TTCHub.tsx` — add prop to `AISearchBar` (line 505) AND set `stage: "ttc"` in `askPrompt`'s URLSearchParams (line 434)

**IVF**
- `src/components/ivf/IVFAISupport.tsx` — append `&stage=ivf` to the custom `/ask?...` URL
- `src/components/ivf/IVFTopicPage.tsx` — add `stage="ivf"` to `AISearchBar`

**Support → `stage="support"`**
- `src/components/support/SupportAISupport.tsx` — add prop to `AISearchBar`

**First Year**
- `src/components/firstyear/new/FYAISupport.tsx` — add `stage="first-year"` to `AISearchBar`
- `src/components/firstyear/topic/FirstYearTopicPage.tsx` — add `stage={config.side === "recovery" ? "recovery" : "first-year"}` to `HubAISupport`

### Untouched
- Toddler (Hub/Topic/Age), FirstYearAISupport, PostpartumAISupport, PreparingAISupport — already wired.
- ArticleAISupport, GuidanceHero, ExploreHero — generic, stay default sage.
- `aiStageStyles.ts` — no changes needed (all keys exist).

### Verify
`tsgo` typecheck.
