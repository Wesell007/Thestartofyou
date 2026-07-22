# Phase 12.4e — Appointment Notes MVP

Build the third MVP Pregnancy Toolkit tool: a calm private notebook for appointment dates, questions, notes and follow-ups. Same visual language and safety posture as Birth Plan and Hospital Bag.

## Database

New migration creating `public.pregnancy_appointments`:

- Columns: `id uuid pk`, `user_id uuid not null references auth.users on delete cascade`, `appointment_at timestamptz`, `week int check (week is null or between 1 and 42)`, `appointment_type text`, `location text`, `notes text`, `questions text`, `follow_up text`, `created_at`, `updated_at`.
- Index: `(user_id, appointment_at desc)`.
- Grants: `select, insert, update, delete` to `authenticated`; `all` to `service_role`. No `anon`.
- Enable RLS. Four policies, all scoped `auth.uid() = user_id` (with matching `with check` on insert/update).
- Reuse existing `public.set_updated_at()` in a `before update` trigger. Do not create a new function.

## Schema and hook

- `src/lib/appointmentSchema.ts`: `Appointment` type, list of soft appointment-type suggestions (Midwife appointment, Scan, Consultant appointment, GP appointment, Blood test, Other), trim/validate helpers, week validation (blank or 1–42), upcoming/past partition helper, `nextUpcoming` helper.
- `src/hooks/usePregnancyAppointments.ts`:
  - `useAppointments()`: list + loading/error + `create(draft)`, `update(id, patch)`, `remove(id)`.
  - `useAppointment(id)`: single load + save/delete + loading/saving/saved/error states, "not found" state.
  - No row created on visit; row created on first save only.
  - Use the same safe cast boundary pattern used in `useBirthPlan`/`useHospitalBag` if generated types are stale.
- `src/hooks/usePregnancyAppointments.ts` also exports `useAppointmentsSummary()` for the hub card (count + next upcoming).

## Routes

Register in `src/App.tsx`, all wrapped in `ProtectedRoute`:

- `/pregnancy-toolkit/appointments` → `PregnancyToolkitAppointments`
- `/pregnancy-toolkit/appointments/new` → `PregnancyToolkitAppointmentEditor` (create mode)
- `/pregnancy-toolkit/appointments/:id` → `PregnancyToolkitAppointmentEditor` (edit mode)

All pages `noindex` via `SeoHead`. Not added to `scripts/generate-sitemap.ts`.

## Pages and components

- `src/pages/PregnancyToolkitAppointments.tsx`: Hero, summary card (total saved, next upcoming), grouped list (Upcoming / Past or saved notes), warm empty state with CTA to `/appointments/new`. Header/footer match Birth Plan/Hospital Bag.
- `src/pages/PregnancyToolkitAppointmentEditor.tsx`: shared editor for new + edit; delete with confirmation on edit only; back link to list; not-found state for missing/other-user rows.
- `src/components/pregnancy-toolkit/AppointmentCard.tsx`: type, date/time (if set), week (if set), location (if set), short previews for notes / questions / follow-up, edit link.
- `src/components/pregnancy-toolkit/AppointmentEditorForm.tsx`: fields — appointment date+time, pregnancy week, appointment type (free text with datalist of soft suggestions), location, questions, notes, follow-up. Mobile-first, simple.

Quiet safety line on list hero: "This is your private notebook. It is not a medical record." Optional subtle footer line about contacting midwife/GP/NHS 111/emergency services as appropriate.

## Toolkit hub

`src/pages/PregnancyToolkit.tsx`: activate the Appointment Notes card, link to `/pregnancy-toolkit/appointments`. Status text (real only):
- 0 rows → "Not started"
- 1 row → "1 saved"
- N rows → "X saved"
- If a next upcoming exists → "Next appointment saved"

No row creation from the hub. Birth Plan and Hospital Bag remain live; future tools remain coming later.

## My Week

`src/components/myweek/SectionToolsThisWeek.tsx`: promote `appointments` from coming-soon to `live` with `to: "/pregnancy-toolkit/appointments"` from week 6 onward. Keep Birth Plan (28+) and Hospital Bag (30+). Adjust the per-week trio picks so early-pregnancy weeks (6+) surface Appointment Notes without displacing existing live tools. No `href="#"`, no dead links.

## Copy and safety

UK English, calm, no em/en dashes in user copy, no medical advice, no diagnosis/triage/pressure/shame, no false reassurance, no fake progress. Clearly framed as a private notebook, not a medical record.

## Preservation

No changes to TTC, IVF, First Year, Toddler, Family, public pregnancy pages/weeks, calculators, setup, reflection, photo memory, `/my-journey` data, other toolkit tools, AI logic, robots, redirects, sitemap logic.

## Verification

- `bunx tsgo --noEmit` clean.
- Manual: migration + RLS + grants; protected routes; noindex present; routes absent from `public/sitemap.xml`; visiting list/new does not create rows; first save creates row; update + delete-with-confirm work; grouping and empty state render; hub card + My Week card link correctly.

## Recommended next phase

12.4f — Toolkit polish + My Journey toolkit progress panel (Birth Plan, Hospital Bag, Appointments summary).
