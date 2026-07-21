
# Phase 11.6 — Pregnancy Week Page Polish

Focused polish across the 42 hardcoded week pages (`Week1Page.tsx` … `Week42Page.tsx`) plus `WeekPage.tsx`. Visual system stays. We add three things: References, a real reflection save flow reusing the existing `reflections` table, and a hub-style Common Questions block with live article links and Ask CTAs.

## Confirmed by reads

- Each `WeekNPage.tsx` inlines its own `reflectionPrompts`, `askChips`, `faqs`, and local `ReflectionAsk` / `FAQRow` / `FAQ` components. Chip arrays are week-specific voice and stay in each page.
- Reflection save infrastructure already exists in `SlotReflection.tsx`, writing to the `reflections` table with shape `{ user_id, week, content }` and `onConflict: "user_id,week"`. We mirror it exactly. No new tables, no RLS change.
- `authIntent.ts` exists but is scoped to protected-route return. Signed-out reflection CTA will simply route to `/auth` with no fake save state.
- `tsconfig` has `noUnusedLocals: false` so leaving the now-unused `useState` import in each page is safe.

## Deliverables

### New shared components (`src/components/week/`)

1. **`WeekSources.tsx`** — Renders "References and guidance" styled like `ArticleSources.tsx`. Numbered list, publisher + label, external links with `rel="noopener noreferrer nofollow"`. Includes the calm disclaimer sentence: "This guide is general information. Always speak to your midwife, GP or maternity unit if you are worried about symptoms or your pregnancy."
2. **`WeekReflectionAsk.tsx`** — Replaces the bespoke `ReflectionAsk` block. Same two-card layout (sage reflection card + lavender ask card), same prompt / ask chip styling. Adds real save behaviour:
   - On mount: `supabase.auth.getSession()` + `getActivePregnancyJourney(userId)`.
   - **Signed out** — button label "Sign in to save this reflection" → `/auth`. Textarea usable but not persisted; helper text says so.
   - **Signed in, no active journey** — button label "Set up your pregnancy journey" → `/due-date-calculator` (same redirect target used by `MyWeek`).
   - **Signed in with active pregnancy journey** — button "Save to my journey"; on click writes `{ user_id, week, content }` via `.upsert(..., { onConflict: "user_id,week" })`, exactly mirroring `SlotReflection`. On success shows "Saved to your pregnancy journey." plus "View in My Week" link → `/my-week`. On error shows a calm retry line, never a fake success.
3. **`WeekCommonQuestions.tsx`** — Hub-style card list modelled on `PregnancyCommonQuestions.tsx` using `stage-pregnancy` tokens. Each row: question, expandable answer, primary "Read: <label>" CTA when `readMore` is present, secondary "Ask more" CTA to `/ask?stage=pregnancy&week=N&topic=<slug>`.

### New data file (`src/data/weekSupportContent.ts`)

- `getWeekSources(week)` returns 4–5 UK sources per trimester from a verified allow-list only: NHS pregnancy week-by-week hub, NHS pregnancy and baby guide, Tommy's pregnancy information, NICE NG201 antenatal care, RCOG patient information hub, GOV.UK vaccination-during-pregnancy collection (T3 only). Hub URLs only — no fabricated deep links.
- `buildWeekQuestions(week, rawFaqs)` maps each page's existing `{q, a}` FAQ array into `WeekQuestion[]`, attaches `askTopic = slugify(q)`, and merges curated `readMore` overrides for weeks with confirmed live article slugs (seed set: 1, 20, 38; extendable). Weeks with no overrides render Ask-only, no placeholder links.

### Mechanical edit pass (43 files)

For each `Week{1..42}Page.tsx` and `WeekPage.tsx`:

1. Insert three imports: `WeekReflectionAsk`, `WeekCommonQuestions`, `WeekSources`, and `buildWeekQuestions` + `getWeekSources` from `@/data/weekSupportContent`.
2. Delete the local `ReflectionAsk`, `FAQRow`, `FAQ` component definitions (identified by `const NAME = ` opener and the next standalone `);` or `};` at column 0).
3. **Keep** `reflectionPrompts`, `askChips`, and `faqs` arrays — they're consumed as props/data by the new components.
4. In the page JSX:
   - Replace `<ReflectionAsk />` with `<WeekReflectionAsk week={N} reflectionPrompts={reflectionPrompts} askChips={askChips} />`.
   - Replace `<FAQ />` with `<WeekCommonQuestions week={N} questions={buildWeekQuestions(N, faqs)} />`.
   - Insert `<WeekSources week={N} sources={getWeekSources(N)} />` immediately before `<Next />` (or the equivalent trailing section in `WeekPage.tsx`).
5. No chip prop is left undefined. Unused imports (`Plus`, `Minus`, `useState` on some pages) are safe under current `tsconfig`.

Applied via a small Python transformer script kept in `/tmp/` so no repo scripts are added. Each file is re-verified after transform (grep for `<ReflectionAsk`, `<FAQ`, and undefined-prop patterns) before moving on.

### Preserve

Untouched: hero, illustrations, meta bar, at a glance, biology, body, symptoms, emotional, focus, seek support, quote, journal CTA, related guidance, next section, TTC / IVF / First Year / Toddler / Family, calculators, sitemap, robots, redirects, `SeoHead`, `PregnancyWeekSeo`, routes, `App.tsx`, `ProtectedRoute`, auth logic, database schema, RLS.

### Content guardrails

UK English, calm signposting to midwife/GP/maternity unit, no em/en dashes, no diagnosis language, no personalised medical advice. Dash sweep limited to text added by this phase (new component copy and any curated question answer). Existing FAQ answers pass through unchanged.

### Verification

- `bunx tsgo --noEmit` must pass.
- Manual load: `/pregnancy/week/1`, `/pregnancy/week/20`, `/pregnancy/week/38`, plus a `WeekPage`-fallback week.
- Confirm References render with real UK URLs, Common Questions render in hub-card format with working `Read:` links (where present) and Ask CTAs, and the reflection card shows the right state per auth/journey combination with no false saved state and no `href="#"`.
- Regression sanity: `MyWeek`, `MyJourney`, `MyTTCJourney`, `DueDateCalculator`, `OvulationCalculator` still render.

### Deliverable summary at end

Files inspected, files edited, week-page system result, sources result, reflection save result (per auth/journey state), Common Questions result, article-link result, Ask AI result, placeholder-link result, content-safety result, preservation of Journey / TTC / IVF / sitemap / robots / redirects / SEO, `bunx tsgo --noEmit` result, and launch-readiness verdict.
