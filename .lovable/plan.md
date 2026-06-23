# IVF Final Cleanup + Premium Polish

Three contained jobs. No architecture changes, no new sections.

---

## A. IVF-origin AI search stays purple

**Problem:** several IVF-origin entry points navigate to `/ask?q=…` without `journey=ivf`, so AskPage falls back to the sage tone.

**Fix:** append `journey=ivf` (and an IVF `ctx` where missing) on every IVF-origin `/ask` link, and preserve `journey=ivf` on follow-up asks inside AskPage itself.

Files touched:
- `src/components/ivf/IVFAISupport.tsx` — append `journey=ivf&ctx=IVF` on the typed query and suggestion chips.
- `src/components/ivf/IVFCommonQuestions.tsx` — append `journey=ivf&ctx=IVF · Common questions`.
- `src/components/ivf/IVFTimelineResult.tsx` — both `/ask` links: append `journey=ivf&ctx=IVF · Timeline`.
- `src/components/ivf/IVFTopicPage.tsx` — already writes `ivf:lastStage` and passes `ctx`; add `journey=ivf` to its `/ask` link so AskPage flips to the lilac tone path.
- `src/pages/AskPage.tsx` — `handleAskAgain` and `handleSuggestion` now preserve `journey=ivf` so follow-up asks stay lilac. Swap a small number of hardcoded sage tokens to the tone-driven palette so the input ring, loader, follow-up chip hover, and tail-link icons read as lilac for IVF-origin sessions.

`AskPage` already has `tone.glow="ivf"` and `lavender-bg` cascade; the param threading and follow-up preservation are what make the experience consistently purple.

---

## B. Remove TTC → IVF intermediate page from the live flow

The TTC subtopic "When IVF becomes the next step" (`/trying-to-conceive/ivf-and-treatment`) is no longer a useful stop. TTC entries that pointed at it jump straight to `/ivf`.

Changes:
- `src/pages/TTCHub.tsx` — quick-link line 738 retargets to `/ivf`. The cluster card render for slug `"ivf-and-treatment"` overrides its `to` prop to `/ivf` (keeps grouping, icon, copy intact).
- `src/data/ttcTopicData.ts` — `LIVE.ivfTopic` updated to `/ivf` so any consumer of that constant routes to the hub.
- `src/App.tsx` — route `/trying-to-conceive/ivf-and-treatment → TTCIVFAndTreatment` stays registered as a legacy fallback so old URLs do not 404.

Preserved for reuse: `src/pages/ttc/IVFAndTreatment.tsx`, `TTCTopicPage`, `ttcPageConfigs["ivf-and-treatment"]` and its styling tokens (`accentHsl`, `tintHsl`, sprig assets, hero image map) stay untouched.

---

## C. Final IVF premium polish (refinement only)

Surgical tightening — no structural change.

`src/components/ivf/IVFStages.tsx`
- Tighten title leading (`1.15 → 1.12`), unify chip family to a single lilac surface, slightly stronger ring on hover, image `scale-[1.04] → scale-[1.045]` with a softer easing. Per-stage HSL theming preserved.

`src/components/ivf/IVFAISupport.tsx` and `src/components/ivf/IVFCommonQuestions.tsx`
- Align the AI search card and question grid cards to the same lilac surface family as stage cards: `bg-[hsl(var(--stage-ivf)/0.08)]`, `border-[hsl(var(--stage-ivf-accent)/0.14)]`, `rounded-2xl`, matching ring on hover.

`src/components/ivf/IVFHero.tsx` / hub section wrappers
- Bump the recurring `h-px max-w-32` lilac divider opacity from `0.20 → 0.28` for stronger authority without raising saturation.

No new components, copy beats, or animation gestures.

---

## Out of scope

TTC hub/topic premium work, Pregnancy, IVF architecture, new sections, article rewrites, new routes.

## Return after build

A. Changed files
B. How IVF-origin AI was made consistently purple (param + AskPage tone path)
C. TTC routes now pointing straight at `/ivf`
D. How the bridge page was removed from the live flow while keeping its component + styling tokens intact for reuse
E. What was polished on IVF cards/surfaces
F. Confirmation this was a cleanup/polish pass only
