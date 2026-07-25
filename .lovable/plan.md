## Phase 12.8: Birth Plan Export, Print & Section Reorder — Approved Build

### Guardrails locked in
- **G1**: PDF action labelled **Save as PDF** (never "Download PDF"). Zero new dependencies.
- **G2**: When no sections are completed, both actions are `disabled` AND a visible helper line renders next to them: *"Add a few preferences before exporting your birth plan."*
- **G3**: Section titles, prompts, choices, keys, and stored answers are untouched. Only the array order changes.

### Files to edit
1. `src/lib/birthPlanSchema.ts` — reorder `BIRTH_PLAN_SECTIONS` to: `birth`, `environment`, `pain_relief`, `partner_support`, `labour`, `monitoring`, `feeding`, `after_birth`, `midwife_notes`.
2. `src/pages/PregnancyToolkitBirthPlan.tsx` — mount `<BirthPlanActions>` under the progress card and again inside the summary area; mount `<BirthPlanPrintable>` once at the end of the page (off-screen).
3. `src/index.css` — append a `@media print` block that hides everything except `#birth-plan-print`, forces white background, black text, sensible page margins and page-break rules.

### Files to create
4. `src/components/pregnancy-toolkit/BirthPlanActions.tsx` — two buttons (**Print birth plan**, **Save as PDF**), disabled state, visible helper line when empty. Both buttons call `window.print()`. Save as PDF also fires a one-line hint toast telling the user to pick "Save as PDF" in the print dialog.
5. `src/components/pregnancy-toolkit/BirthPlanPrintable.tsx` — hidden `#birth-plan-print` region containing: The Start of You wordmark, "Birth Plan" title, optional parent name + due date, calm intro line ("Your birth plan is a place to collect your preferences. Your care team can help you adapt it if things change."), completed sections only (heading + choices + notes), prepared date, simple footer.

### Data sources (read-only)
- Parent name: `supabase.auth.getUser()` → `user.user_metadata.full_name` or email local-part fallback. No new fetches beyond what auth already provides.
- Due date: `getActivePregnancyJourney(userId)` from `src/lib/savedJourney.ts` (already exported). Silently omit if null.
- Answers, completion, updated_at: already available from `useBirthPlan()`.

### Behaviour details
- Empty plan (`completion === 0` or no answered sections): buttons `disabled`, aria-disabled, helper line visible directly beneath the button row.
- Partial plan: printable renders only sections where `isSectionAnswered(answers[key])` is true, in the new order.
- Print CSS scoped exclusively under `#birth-plan-print` and `@media print { body > *:not(...) { display:none } }` pattern — screen view is visually unchanged.

### Verification
- `bunx tsgo --noEmit`
- Manual: load `/pregnancy-toolkit/birth-plan`, confirm new order, save an answer, invoke print preview, confirm only printable region renders on white, confirm empty state disables actions and shows helper, confirm partial exports skip empty sections.

Awaiting build mode to execute.