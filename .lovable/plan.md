Phase 12.5c builds the Baby Movement Notes page as a calm record-keeping tool. It never activates the coming-soon cards on the hub, My Week, or My Journey — that happens in 12.5e.

## Route
- New protected route: `/pregnancy-toolkit/baby-movements`, added to `src/App.tsx` near the other toolkit routes, wrapped in `ProtectedRoute`.
- Page uses `SeoHead` with `noindex`; not added to `scripts/generate-sitemap.ts` or `public/sitemap.xml`.

## Files to create
- `src/lib/babyMovementSchema.ts` — types, empty draft, `cleanDraft`, `isDraftEmpty`, ISO ↔ datetime-local helpers, `formatMovementDate`, pattern label suggestions ("Usual pattern", "More active than earlier", "Quieter than earlier", "Different pattern today", "Not sure"). Labels are pure text; no scoring.
- `src/hooks/useBabyMovementNotes.ts` — mirrors `usePregnancyAppointments`:
  - `useBabyMovementNotes()` returns `loadState`, `rows` (newest first by `noted_at`), `saveState`, `errorMessage`, `create`, `update`, `remove`, `reload`. Cast at boundary: `(supabase.from as any)("baby_movement_notes")`. Reads session for `user_id` on write. Save is blocked when both `pattern_label` and `notes` are empty. Trims text.
  - `useBabyMovementNotesSummary()` returns `{ loading, hasRows, total, lastNoteAt }` and never writes.
- `src/pages/PregnancyToolkitBabyMovements.tsx` — hero, persistent safety signpost, add-note form, notes list, empty state, back links. Uses `MyWeekHeader` / `MyWeekFooter` / `PageLoadState` and the pregnancy accent tokens (`--stage-pregnancy`, parchment background, `keepsake-surface`) — matches the appointments page visual language.
- `src/components/pregnancy-toolkit/BabyMovementNoteForm.tsx` — controlled form for `noted_at` (datetime-local, defaults to now), pattern label (buttons or select), notes textarea, "Save note" button, disabled while empty or saving; also used inline for editing (accepts optional initial draft + `onCancel`).
- `src/components/pregnancy-toolkit/BabyMovementNoteCard.tsx` — displays date, label, notes; edit expands the card into the shared form; delete uses `AlertDialog` confirmation.

## Files to edit
- `src/App.tsx` — add the one protected route only. No other files edited.

## Behaviour
- Row is created only when the user submits the form (no visit-time insert).
- Notes ordered newest first by `noted_at DESC`.
- Delete requires an explicit confirmation dialog.
- Success/error messaging surfaced via the existing pattern; `useToast` for save/delete confirmation.
- All internal links use real `to=` values (Back to toolkit → `/pregnancy-toolkit`, Open my week → `/my-week`). No `href="#"`.

## Safety signpost (rendered above the form and list, always visible, not collapsible)
> If your baby's movements reduce, change, or stop, contact your midwife or maternity unit straight away, day or night. This is important at any time in pregnancy. This tool is a place to make notes, not a check on whether everything is okay.

## Copy rules
UK English, calm, no dashes, no diagnosis / reassurance / triage / kick-count / labour-status / normal-abnormal / colour-coded urgency language.

## Preserved
Toolkit hub, My Week, My Journey toolkit panel, Birth Plan, Hospital Bag, Appointment Notes, sitemap, robots, redirects, AI logic, TTC / IVF / First Year / Toddler / Family, and all public pregnancy pages remain unchanged.

## Verification
`bunx tsgo --noEmit`; confirm noindex meta, route protected, no sitemap entry, save-only inserts, edit and delete flows, safety signpost visible above form on all viewport sizes.

## Recommended next phase
Phase 12.5d: Contraction Timer hook and UI page.