# Phase 12.4c — Birth Plan MVP

Build the first real Pregnancy Toolkit tool: a calm, private Birth Plan editor at `/pregnancy-toolkit/birth-plan`, backed by a new `birth_plans` table with strict RLS. Row is created lazily on first save so the hub never shows fake progress.

## Scope

In: DB migration, RLS, protected route, editor UI, save/edit, completion + summary, hub card + My Week card (week 28+).
Out: Hospital bag, Appointment notes, Kick/Contraction counters, AI memory, PDF export, sharing, My Journey changes.

## Database (single migration)

```sql
create table public.birth_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  answers jsonb not null default '{}'::jsonb,
  notes text,
  completion int not null default 0 check (completion between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update, delete on public.birth_plans to authenticated;
grant all on public.birth_plans to service_role;

alter table public.birth_plans enable row level security;

create policy "own row select" on public.birth_plans for select to authenticated using (auth.uid() = user_id);
create policy "own row insert" on public.birth_plans for insert to authenticated with check (auth.uid() = user_id);
create policy "own row update" on public.birth_plans for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own row delete" on public.birth_plans for delete to authenticated using (auth.uid() = user_id);

create trigger birth_plans_set_updated_at
before update on public.birth_plans
for each row execute function public.set_updated_at();
```

No anon grants. Reuses existing `public.set_updated_at()`.

## Frontend files

Create:
- `src/lib/birthPlanSchema.ts` — typed sections, choice options, completion calculator, TS types (`BirthPlanAnswers`, `BirthPlanRow`, `BirthPlanStatus`).
- `src/hooks/useBirthPlan.ts` — load (returns `null` if no row), save (upsert on user_id → creates row only on first save), computes completion, exposes `status: "idle" | "loading" | "saving" | "saved" | "error"`. Casts `supabase.from("birth_plans") as any` if types are stale (same pattern used in `savedJourney.ts`).
- `src/pages/PregnancyToolkitBirthPlan.tsx` — hero, safety line, progress card, sectioned editor, summary, back links. Uses `SeoHead` with `noindex`.
- `src/components/pregnancy-toolkit/BirthPlanSection.tsx` — accordion-style card with chips + notes textarea + per-section save.
- `src/components/pregnancy-toolkit/BirthPlanProgress.tsx` — completion percentage + calm status label (Started / In progress / Almost complete / Ready to review).
- `src/components/pregnancy-toolkit/BirthPlanSummary.tsx` — read-back of answered sections, notes, last updated.

Edit:
- `src/App.tsx` — register `/pregnancy-toolkit/birth-plan` inside `ProtectedRoute`, above generic routes.
- `src/pages/PregnancyToolkit.tsx` — promote Birth Plan card to live `<Link>` to `/pregnancy-toolkit/birth-plan`. Load real row via hook; render one of: Not started (no row), In progress, Ready to review. Hospital bag + Appointment notes remain non-clickable "Coming soon".
- `src/components/myweek/SectionToolsThisWeek.tsx` — add a `birthPlan` live tool entry pointing to `/pregnancy-toolkit/birth-plan`; keep the tool coming-soon otherwise. Only surface it as live from week 28 (adjust the `getWeekTools` bands so weeks 28+ include Birth Plan as live; weeks <28 unchanged — hospital bag / kick counter / etc. remain coming soon).

Do NOT edit: `scripts/generate-sitemap.ts` (route is not listed, stays excluded), `src/integrations/supabase/client.ts`, `src/integrations/supabase/types.ts`, `MyJourney`, robots, TTC/IVF/First Year/Toddler/Family/public pregnancy files.

## Row creation behaviour (per user adjustment)

- On mount: `select ... where user_id = auth.uid()` — treat missing row as valid empty state.
- On first save: `upsert` with `user_id = auth.uid()`, or `insert` if no id known; RLS enforces ownership.
- Never insert on route visit. Hub reads the same query — no row → "Not started".

## Completion logic

`birthPlanSchema.ts` exports section keys. Completion = round(100 × answered / total) where a section counts as answered if it has ≥1 choice or non-empty notes. Persisted on every save.

## Copy + safety

UK English, no em/en dashes, preference-framed. Standfirst + repeated reminder that plans are preferences to discuss with midwife/care team and may change for safety. No urgent symptom guidance inside the tool.

## Visual direction

Parchment background, `keepsake-surface` cards, `--stage-pregnancy-accent` tokens, serif headings, soft borders, generous spacing, single-column mobile-first — matching `/my-week` and `/pregnancy-toolkit`.

## Verification

- `bunx tsgo --noEmit`
- Manual: unauthenticated → redirect to auth; authed with no row → "Not started" on hub, empty editor; save one section → row created, hub shows "In progress"; reload → data persists; complete all → "Ready to review".
- Confirm `<meta name="robots" content="noindex,follow">` present.
- Confirm `/pregnancy-toolkit/birth-plan` not in `public/sitemap.xml`.
- Grep for `href="#"` in new files → none.

## Recommended next phase

12.4d — Hospital Bag tool (relational item rows, check-off UX).
