# Phase 12.4a — Pregnancy Toolkit MVP: Schema, RLS and Build Plan

Planning only. No code, migrations, routes, or assets in this phase.

## 1. Files inspected

- `src/App.tsx` — central route table, protected-route wrapping pattern.
- `src/pages/MyWeek.tsx`, `src/pages/MyJourney.tsx` — page shells the toolkit will visually rhyme with.
- `src/components/myjourney/ComingSoonPanel.tsx` — the placeholder we are formalising into real tools.
- `src/components/myweek/SectionToolsThisWeek.tsx` — existing week-contextual tool cards (live vs `coming-soon`).
- `src/components/auth/ProtectedRoute.tsx` — auth gate + `return_to_route` intent pattern.
- `src/lib/savedJourney.ts` — `getActivePregnancyJourney`, LMP/due derivation, pending-journey stash.
- `src/integrations/supabase/client.ts` — publishable-key client used from the browser.
- `supabase/migrations/20260713194944_*.sql` (`ttc_journeys`) — canonical pattern: grants → RLS enable → four policies → `set_updated_at` trigger.
- `supabase/migrations/` sequence — confirmed `public.set_updated_at()` trigger function already exists and is the shared pattern.
- Existing tables of note: `pregnancy_journeys`, `journeys`, `saved_journeys` (legacy mirror), `reflections`, `week_photos`.

## 2. Current DB patterns found

- User-owned rows use `user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`.
- Every public table: `GRANT SELECT, INSERT, UPDATE, DELETE ... TO authenticated;` + `GRANT ALL ... TO service_role;` (no `anon`).
- RLS enabled + four discrete policies (SELECT / INSERT / UPDATE / DELETE) all keyed on `auth.uid() = user_id`.
- `updated_at` maintained via `BEFORE UPDATE` trigger calling `public.set_updated_at()`.
- Journey linkage: TTC uses one-row-per-user (`UNIQUE user_id`); pregnancy uses `pregnancy_journeys` similarly. Child records (`reflections`, `week_photos`, `ttc_logs`) key on `user_id` directly, not a `journey_id` FK — this is the established pattern.

## 3. Route structure (all protected, noindex, excluded from sitemap)

```text
/pregnancy-toolkit                          hub
/pregnancy-toolkit/birth-plan               MVP tool
/pregnancy-toolkit/hospital-bag             MVP tool
/pregnancy-toolkit/appointments             MVP tool (list)
/pregnancy-toolkit/appointments/new         create
/pregnancy-toolkit/appointments/:id         edit
```

- Wrap all under `ProtectedRoute`.
- Reuse `MyWeekHeader` / `MyWeekFooter` shell for visual continuity.
- `SeoHead` with `noindex`, canonical omitted or self.
- `scripts/generate-sitemap.ts` must NOT include these paths — verify the extractor's allowlist stays closed to `/pregnancy-toolkit`.

## 4. Toolkit hub (`/pregnancy-toolkit`)

Sections top → bottom:
1. Calm hero — "Your pregnancy toolkit", one-line standfirst framing it as quiet, optional support.
2. Short explanation paragraph (UK English, no dashes).
3. Live tool cards (3): Birth Plan, Hospital Bag, Appointment Notes — each shows real progress ("Not started", "3 of 12 packed", "2 saved").
4. Coming later cards (4, non-clickable, `aria-disabled`): Kick Counter, Contraction Counter, Symptoms Tracker, Questions for Midwife.
5. Return links: "Back to my week" → `/my-week`, "Open my journey" → `/my-journey`.

Visual language: parchment background, `keepsake-surface` cards, `--stage-pregnancy-accent`, serif headings — same tokens used across `/my-week` and `/my-journey`.

## 5. Data models

### 5a. `public.birth_plans` (one row per user)
- `id uuid pk`
- `user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE`
- `answers jsonb NOT NULL DEFAULT '{}'::jsonb` — keyed by section slug (`environment`, `partner_support`, `pain_relief`, `monitoring`, `labour`, `birth`, `feeding`, `after_birth`, `midwife_notes`), each holding a small structured object (`choices: string[]`, `notes: string`).
- `notes text` — free-text top-level notes.
- `completion int NOT NULL DEFAULT 0` — 0–100 derived client-side, stored for hub display.
- `created_at`, `updated_at timestamptz` (defaults + trigger)

JSONB single-row keeps schema stable while copy iterates. No enums.

### 5b. `public.hospital_bag_items` (one row per item)
- `id uuid pk`
- `user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `category text NOT NULL CHECK (category IN ('parent','baby','partner','documents','comfort'))`
- `item_key text NOT NULL` — stable slug for seeded defaults; random slug for custom items.
- `label text NOT NULL`
- `is_custom boolean NOT NULL DEFAULT false`
- `packed_at timestamptz` — null = unpacked, non-null = packed timestamp.
- `sort_order int NOT NULL DEFAULT 0`
- `created_at`, `updated_at`
- Unique `(user_id, category, item_key)` to make seeding idempotent.
- Index `(user_id, category)`.

Row-per-item chosen over jsonb: better for progress counts, custom items, and RLS granularity.

### 5c. `public.pregnancy_appointments` (one row per appointment)
- `id uuid pk`
- `user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE`
- `appointment_at timestamptz` (nullable while drafting)
- `week int` (nullable; 1–42 CHECK when set — implemented via trigger if we want time-dependent validity, otherwise a plain CHECK is fine since bounds are static)
- `type text` — free text (e.g. "12-week scan", "Midwife check-in"), no enum.
- `location text`
- `notes text`
- `questions text`
- `follow_up text`
- `created_at`, `updated_at`
- Index `(user_id, appointment_at DESC)`.

Neither child table references `pregnancy_journeys.id` — matches the existing `reflections` / `week_photos` pattern of scoping by `user_id` only.

## 6. RLS plan (identical shape for all three tables)

For each of `birth_plans`, `hospital_bag_items`, `pregnancy_appointments`:

- `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`
- `SELECT` policy: `USING (auth.uid() = user_id)`
- `INSERT` policy: `WITH CHECK (auth.uid() = user_id)`
- `UPDATE` policy: `USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id)`
- `DELETE` policy: `USING (auth.uid() = user_id)`
- Grants: `SELECT, INSERT, UPDATE, DELETE` to `authenticated`; `ALL` to `service_role`; no `anon`.

No cross-user access. No public read. Service role retained for future edge-function use (e.g. export).

## 7. Migration plan (one migration per tool, in build phase order)

Each migration follows the mandatory order: `CREATE TABLE` → `GRANT` → `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` → four `CREATE POLICY` statements → `CREATE TRIGGER ... set_updated_at`.

Sequence:
1. Phase 12.4c migration: `birth_plans` + indexes + trigger + RLS.
2. Phase 12.4d migration: `hospital_bag_items` + unique/index + trigger + RLS.
3. Phase 12.4e migration: `pregnancy_appointments` + index + trigger + RLS.

Rollback considerations: tables are additive and user-scoped; a `DROP TABLE ... CASCADE` cleanly reverses each. No changes to existing tables, functions, or the auth schema.

## 8. UI build sequence

- **12.4b — Toolkit shell (no DB writes).** New `/pregnancy-toolkit` hub route, `PregnancyToolkitHub.tsx`, shared `ToolCard` primitive. Tool tiles link to placeholder "coming soon" states for the three MVP tools until their tables land. Retire `ComingSoonPanel` from `/my-journey` in favour of a subtle "Open your toolkit" link (one-line change, planned only).
- **12.4c — Birth Plan MVP.** Migration → `useBirthPlan` hook → `/pregnancy-toolkit/birth-plan` page with sectioned accordion form, autosave-on-blur, summary view, completion % surfaced on hub.
- **12.4d — Hospital Bag MVP.** Migration → seed defaults on first visit (client-side upsert per row) → checklist UI grouped by category with custom-item input and packed/unpacked toggle; progress surfaced on hub.
- **12.4e — Appointment Notes MVP.** Migration → list + create + edit pages → surface next upcoming appointment on hub and (later) `/my-journey`.

## 9. Connection to `/my-week`

Planned only; no edits this phase. Update `SectionToolsThisWeek.tsx` when each tool goes live:
- Birth Plan: switch to `kind: "live"` from week 28, `to: "/pregnancy-toolkit/birth-plan"`.
- Hospital Bag: `live` from week 30, `to: "/pregnancy-toolkit/hospital-bag"`.
- Appointment Notes: `live` from week 6 onwards.
- Kick / Contraction / Symptoms / Midwife Questions remain `coming-soon`.

## 10. Connection to `/my-journey`

Planned only. After each tool ships, extend the "Moments kept" or a new "From your toolkit" panel with real-only summaries:
- Birth plan: "Started · 40% complete" (only if row exists).
- Hospital bag: "8 of 24 packed" (only if any row exists).
- Appointments: "Next: 20-week scan on 12 Nov" (only if a future `appointment_at` exists).
- Never render fake progress; hide the panel when there is nothing to show.

## 11. Safety and copy guardrails

- UK English throughout; strictly no em or en dashes in user-facing copy.
- Birth plan header copy explicitly frames entries as "preferences to discuss with your midwife or care team", never guarantees.
- No diagnosis, dosing, or triage language anywhere in appointment notes; add a quiet footer line: "This is your private notebook. It is not a medical record."
- Hospital bag copy is invitational, never "must". No completion pressure — progress is shown neutrally.
- No fear language, no false reassurance, no personalised medical advice.
- All tools respect the existing `Medically reviewed by Jenny Joines` rule only where medically relevant — the toolkit itself is not medical content, so the badge is omitted.

## 12. Preservation

No changes to TTC, IVF, First Year, Toddler, Family, calculators, public pregnancy pages, public week pages, `/my-week`, `/my-journey`, `/setup`, due-date logic, journey setup, existing schema / RLS / edge functions / AI, sitemap, robots, redirects, or SEO infrastructure.

## 13. Risks and mitigations

- **Seeding hospital bag defaults twice.** Mitigation: `UNIQUE (user_id, category, item_key)` + client-side `upsert` with `ignoreDuplicates`.
- **JSONB drift in birth plan.** Mitigation: keep a typed schema in `src/lib/birthPlanSchema.ts` and validate on read; missing keys default gracefully.
- **Users expecting a medical record.** Mitigation: framing copy + no export in MVP.
- **Sitemap leak.** Mitigation: verify `scripts/generate-sitemap.ts` allowlist during 12.4b PR review.
- **Protected-route flash.** Already handled by `ProtectedRoute`'s `PageLoadState`.
- **Type regeneration lag after migrations.** Mitigation: use the same `supabase as any` cast pattern used in `savedJourney.ts` if types lag; remove once regenerated.

## 14. Recommended next build phase

**Phase 12.4b — Pregnancy Toolkit shell (no DB).** Ship the protected `/pregnancy-toolkit` hub with three MVP tool cards (still marked "coming soon" until their migrations land) and the four future-tool cards. Zero migrations, zero writes, fully reversible, and gives the visual anchor the subsequent tool phases can hang off.
