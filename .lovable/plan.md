# Phase 12.5c.1 — Activate Baby Movement Notes Card

Small scoped activation. No routes, migrations, schema, tables, safety copy, or tool logic change.

## Files inspected
- `src/pages/PregnancyToolkit.tsx`
- `src/components/myweek/SectionToolsThisWeek.tsx`
- `src/hooks/useBabyMovementNotes.ts` (confirmed `useBabyMovementNotesSummary` exports `{ loading, hasRows, total, lastNoteAt }`)
- `src/components/myjourney/*` and `src/pages/MyJourney.tsx` (no ToolkitProgressPanel exists; only `ComingSoonPanel.tsx` links to the toolkit)

## Files to edit
1. `src/pages/PregnancyToolkit.tsx`
2. `src/components/myweek/SectionToolsThisWeek.tsx`

My Journey is not touched (no existing toolkit progress panel — creating one is out of scope per the "only if already ready" clause).

## 1) Pregnancy Toolkit hub

- Remove the `kick-counter` entry from `FUTURE_TOOLS`. Contraction timer, symptoms tracker, questions for midwife remain in the "Quiet tools for later" section unchanged.
- Add a `baby-movements` entry to `MVP_TOOLS` (after appointment notes) using the existing `Footprints` icon, title "Baby movement notes", hint "A calm place to notice your baby's usual pattern."
- Import and use `useBabyMovementNotesSummary`. Compute `babyMovementsStatusText`:
  - `loading` → `"Open"`
  - `total === 0` → `"Not started"`
  - `total === 1` → `"1 note saved"`
  - else → `"${total} notes saved"`
- In the `MVP_TOOLS.map` branch, add a case for `baby-movements` that renders `<MvpCard tool={t} statusText={babyMovementsStatusText} to="/pregnancy-toolkit/baby-movements" />`.
- Grid stays `sm:grid-cols-3` — with 4 live cards it wraps to 3 + 1 (acceptable and consistent with existing card style). No layout system rewrite.
- No row creation from the hub (the summary hook is read-only via `useBabyMovementNotes` which does not insert).

## 2) My Week SectionToolsThisWeek

- Convert `TOOLS.kickCounter` from `kind: "coming-soon"` to `kind: "live"` with `to: "/pregnancy-toolkit/baby-movements"`.
- Keep the 3-card cap and existing week routing:
  - week ≥ 28: `[birthPlan, appointments, kickCounter]` (now live)
  - week ≥ 24: `[appointments, kickCounter, symptoms]` (now live)
- Contraction timer, symptoms tracker, questions for midwife remain `coming-soon`.

## Preservation checks
- Baby Movement Notes page, safety signpost, form: unchanged.
- Contraction Timer, Birth Plan, Hospital Bag, Appointment Notes: unchanged.
- No new routes; `/pregnancy-toolkit/baby-movements` already registered.
- No migrations, RLS, sitemap, robots, redirects, AI, TTC, IVF, First Year, Toddler, Family, or public pregnancy page changes.
- No `href="#"`. No forbidden wording (no "kick counter", "10 kicks", "safe", "normal", diagnosis/triage/reassurance). UK English, no dashes in user copy.

## Verification
- `bunx tsgo --noEmit`
- Manual: `/pregnancy-toolkit` shows Baby Movement Notes as a live clickable card linking to `/pregnancy-toolkit/baby-movements`; status reflects real note count; contraction timer still under "Quiet tools for later" and non-clickable; My Week from week 24 shows the live card.

## Recommended next phase
Phase 12.5d — Contraction Timer build.
