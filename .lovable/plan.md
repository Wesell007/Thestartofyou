## Phase 12.5c.1 — Confirmation Report

No new code changes required. The activation was already applied in the previous phase; this pass verifies it against every acceptance criterion.

### Files inspected
- `src/pages/PregnancyToolkit.tsx`
- `src/components/myweek/SectionToolsThisWeek.tsx`
- `src/hooks/useBabyMovementNotes.ts` (read-only summary, no inserts)

### Files edited
- None. State is already correct.

### Hub card result (`/pregnancy-toolkit`)
- Baby Movement Notes appears in `MVP_TOOLS` (4th card) with `Footprints` icon.
- Rendered via `<MvpCard to="/pregnancy-toolkit/baby-movements" />` — live, clickable, wrapped in `<Link>`.
- Status text uses `useBabyMovementNotesSummary` only:
  - loading → `Open`
  - `total === 0` → `Not started`
  - `total === 1` → `1 note saved`
  - else → `${total} notes saved`
- No row creation from the hub (summary hook is read-only `select`).
- Contraction Timer remains in `FUTURE_TOOLS` under "Quiet tools for later", rendered by `FutureCard` (no `<Link>`, `aria-disabled="true"`, "Coming later" label).

### My Week result (`SectionToolsThisWeek.tsx`)
- `TOOLS.kickCounter` is `kind: "live"`, `to: "/pregnancy-toolkit/baby-movements"`, title "Baby movement notes".
- Included in week arrays from week 24 upward:
  - week ≥ 28: `[birthPlan, appointments, kickCounter]`
  - week ≥ 24: `[appointments, kickCounter, symptoms]`
- Coming-soon cards (`symptoms`, `midwifeQuestions`, `contractionCounter`) render inside a plain `<div>` (no `<Link>`), showing "Coming soon".

### Preservation checks
- No `href="#"` anywhere in the two files.
- No sitemap, robots, migration, RLS, route, or safety-copy changes.
- No forbidden wording (no "kick counter", "10 kicks", "safe", "normal", triage/diagnosis language).
- UK English, no dashes in user-facing copy.
- Baby Movement Notes page, safety signposts, and CRUD flow untouched.
- Contraction Timer, Birth Plan, Hospital Bag, Appointment Notes untouched.

### `bunx tsgo --noEmit`
- Exit code 0, no output. Clean.

### Recommended next phase
**Phase 12.5d — Contraction Timer hook and UI page.** Build `useContractionTimer` (session + events insert via existing `contraction_sessions` / `contraction_events` tables from 12.5b), create `/pregnancy-toolkit/contraction-timer` protected route, promote the Contraction Timer card from `FUTURE_TOOLS` to `MVP_TOOLS` (hub) and `SectionToolsThisWeek` (week ≥ 37 live).
