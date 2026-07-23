## Phase 12.6: Pregnancy Toolkit v2 Planning

Planning only. No routes, migrations, tables, hooks, UI, copy edits, or card activations in this phase.

### Files inspected
- `src/pages/PregnancyToolkit.tsx` (hub, MVP + Coming later cards, real-data status)
- `src/components/myweek/SectionToolsThisWeek.tsx` (week-gated tool selector, 3-card cap)
- `src/App.tsx` (protected `noindex` toolkit routes pattern)
- Existing toolkit hooks/schemas: `useBirthPlan`, `useHospitalBag`, `usePregnancyAppointments`, `useBabyMovementNotes`, `useContractionTimer` and their schema files
- Existing toolkit migrations pattern (owner-scoped RLS + `set_updated_at` trigger + explicit GRANTs)
- `src/components/myjourney/ToolkitProgressPanel.tsx` (real-data counts panel)

### Recommended final tool names
- Symptoms Tracker → **Pregnancy Symptom Notes** (positions the tool as notes, not assessment)
- Questions for Midwife → **Questions for Midwife** (unchanged; already calm and practical)

### Route plan
- `/pregnancy-toolkit/symptom-notes` (protected, `noindex`, excluded from sitemap)
- `/pregnancy-toolkit/questions-for-midwife` (protected, `noindex`, excluded from sitemap)

Shorter `symptom-notes` slug preferred over `pregnancy-symptom-notes` since the parent path already scopes it to pregnancy.

### Schema plan (tables to propose, not create)

`public.pregnancy_symptom_notes`
- `id uuid pk default gen_random_uuid()`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `noted_at timestamptz not null default now()` (user-editable date/time)
- `symptom_label text not null` (short free-text label)
- `personal_severity smallint null` (1–3 personal note only; never surfaced as clinical score)
- `notes text null`
- `mention_at_appointment boolean not null default false`
- `follow_up text null`
- `created_at`, `updated_at timestamptz`

`public.midwife_questions`
- `id uuid pk default gen_random_uuid()`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `question text not null`
- `category text not null` (see categories below)
- `appointment_id uuid null references public.pregnancy_appointments(id) on delete set null`
- `answered boolean not null default false`
- `answer_notes text null`
- `follow_up boolean not null default false`
- `created_at`, `updated_at timestamptz`

Categories: `symptoms_body`, `baby_movements`, `scans_tests`, `birth_preferences`, `feeding`, `recovery`, `practical`, `other`.

### RLS plan (matches existing toolkit pattern)
For both tables, in a single migration in the required order:
1. `CREATE TABLE ...`
2. `GRANT SELECT, INSERT, UPDATE, DELETE ... TO authenticated;` and `GRANT ALL ... TO service_role;` (no anon)
3. `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
4. Four owner-scoped policies (select/insert/update/delete) using `auth.uid() = user_id`
5. `set_updated_at` BEFORE UPDATE trigger reusing existing `public.set_updated_at()`
6. Indexes: `(user_id, noted_at desc)` and `(user_id, created_at desc)` respectively; partial index on `midwife_questions (user_id) where answered = false`

### Hook plan
- `usePregnancySymptomNotes` — list, create, update, delete; create only on explicit save
- `usePregnancySymptomNotesSummary` — read-only: `loading`, `hasRows`, `total`, `lastNoteAt`
- `useMidwifeQuestions` — list, create, update, delete, toggle answered/follow-up
- `useMidwifeQuestionsSummary` — read-only: `loading`, `hasRows`, `total`, `openTotal`

No hook writes on page visit. Use existing safe Supabase cast boundary if generated types lag.

### UI plan

Pregnancy Symptom Notes page
- Hero (title + calm standfirst)
- Always-visible safety signpost above the entry form (final wording refined in build)
- Add-note form: date/time, symptom label, optional personal note (1–3 scale labelled "personal note only"), free text, "mention at next appointment" toggle, optional follow-up
- Notes list grouped by date, edit/delete, empty state
- Back links to `/pregnancy-toolkit` and `/my-week`

Questions for Midwife page
- Hero + short standfirst framing it as a memory aid, not medical advice
- Always-visible signpost: this tool holds your questions; it does not answer them
- Add-question form: question, category, optional appointment link (from existing `pregnancy_appointments`), follow-up flag
- List grouped by category with "open" and "answered" tabs; inline edit for answer notes; empty state
- Back links to `/pregnancy-toolkit` and `/my-week`

Reuse `keepsake-surface`, pregnancy accent tokens, serif headings, soft borders, mobile-first spacing.

### Toolkit hub plan (`/pregnancy-toolkit`)
- Rename card: "Symptoms tracker" → "Pregnancy symptom notes"; refresh hint
- Keep "Questions for midwife" naming; refresh hint
- Move both from Quiet tools for later into live `MVP_TOOLS` once each tool ships (not in this phase)
- Status copy uses real data only via the summary hooks:
  - Symptom notes: `Not started` | `1 note saved` | `X notes saved`
  - Questions: `Not started` | `1 question saved` | `X questions saved` (optionally `X open of Y` once volume justifies)

### My Week timing plan (`SectionToolsThisWeek.tsx`)
Current live gating: Appointments 6+, Baby movements 24+, Birth plan 28+, Hospital bag 30+, Contraction timer 37+. Three-card cap must hold.

Proposed additions:
- Pregnancy symptom notes: live from week 4 onwards
- Questions for midwife: live from week 6 onwards

Risk: adding two tools across the whole span crowds the 3-card slots, especially weeks 6–24. Recommended tiering to protect the cap:

```text
weeks 1-5   : symptom-notes, due-date, midwife-questions
weeks 6-12  : appointments, midwife-questions, symptom-notes
weeks 13-23 : appointments, midwife-questions, symptom-notes
weeks 24-27 : appointments, baby-movements, symptom-notes
weeks 28-29 : baby-movements, birth-plan, midwife-questions
weeks 30-33 : hospital-bag, birth-plan, appointments
weeks 34-36 : hospital-bag, birth-plan, appointments
weeks 37+   : contraction-timer, hospital-bag, birth-plan
```

Final ordering to be confirmed in build phase 12.6c/d. No edit to `SectionToolsThisWeek.tsx` in this phase.

### My Journey plan
Extend `ToolkitProgressPanel.tsx` (build phase only) with:
- Symptom notes: total saved (only if `hasRows`)
- Questions: total saved and open count (only if `hasRows`)

No symptom summarisation, no urgency flags, no interpretation. Panel remains a real-data counter surface.

### Safety copy guardrails
UK English, calm tone, no em/en dashes in user-facing copy. Forbidden: `safe`, `unsafe`, `normal`, `abnormal`, `low risk`, `high risk`, `urgent score`, `all clear`, `no need to call`, `everything is okay`, `symptom checker`, `diagnosis`, plus prior toolkit forbidden list. Signposts always visible above input surfaces.

### Risks and mitigations
- **Perceived as symptom checker** → naming rename, always-visible signpost, "personal note only" label on severity, no thresholds or colour states.
- **My Week crowding** → tiered gating table above; keep 3-card cap.
- **Users expect answers in Questions tool** → explicit framing "holds your questions; does not answer them"; no AI wiring.
- **Cross-tool coupling on appointment FK** → `on delete set null` so deleting an appointment never loses the question.
- **Generated types lag after migration** → use existing safe Supabase cast pattern used by other toolkit hooks.

### Recommended build sequence
1. **12.6a** Rename card copy: Symptoms tracker → Pregnancy symptom notes (hub + My Week coming-soon label). Copy-only, no logic.
2. **12.6b** Single migration: both tables, GRANTs, RLS, policies, triggers, indexes.
3. **12.6c** Pregnancy Symptom Notes: schema helper, hook + summary hook, page, hub activation, My Week gating.
4. **12.6d** Questions for Midwife: schema helper, hook + summary hook, page, hub activation, My Week gating, optional appointment link.
5. **12.6e** Toolkit v2 QA + sign off (copy audit, RLS check, `noindex`, sitemap exclusion, typecheck, mobile pass, My Journey panel additions if in scope).

### Live code changes needed before build
None. Current toolkit is signed off from Phase 12.5e. All Phase 12.6 changes belong inside the 12.6a–e build sequence.
