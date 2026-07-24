## Phase 12.6e: Pregnancy Toolkit v2 Wide QA and Sign Off

Read-only QA pass across the 10 completed toolkit routes plus `SectionToolsThisWeek.tsx`, fixing only real defects within the allowed fix policy.

### 1. Inspection surfaces
- `src/App.tsx` — route registration, order, `ProtectedRoute` wrapping
- `src/pages/PregnancyToolkit.tsx` and all `PregnancyToolkit*.tsx` pages (hub, birth plan, hospital bag, appointments list/new/editor, baby movements, contraction timer, symptom notes, questions for midwife)
- `src/components/pregnancy-toolkit/**` — shared components and forms
- `src/components/myweek/SectionToolsThisWeek.tsx` — week gating map and card cap
- `src/hooks/use*` and `src/lib/*Schema.ts` for each tool — verify summary hooks are read-only, no row creation on visit
- `public/sitemap.xml` and `scripts/generate-sitemap.ts` — confirm toolkit routes excluded
- Supabase schema for: `birth_plans`, `hospital_bag_items`, `pregnancy_appointments`, `baby_movement_notes`, `contraction_sessions`, `contraction_events`, `pregnancy_symptom_notes`, `midwife_questions`

### 2. Automated checks to run
- `rg -n 'href="#"' <toolkit paths>`
- `rg -n 'pregnancy-toolkit' public/sitemap.xml scripts/generate-sitemap.ts`
- `rg -nP '[—–]' src/pages/PregnancyToolkit* src/components/pregnancy-toolkit`
- Forbidden-wording regex (symptom checker, diagnosis, kick counter, "10 kicks", labour reassurance, etc.)
- Manual scan for `safe` / `unsafe` / `normal` in visible user copy only
- `bunx tsgo --noEmit`
- Supabase read query on `pg_policies` / `information_schema` to confirm RLS, grants (authenticated + service_role, no anon), CRUD policies, `set_updated_at` triggers, indexes, and the `contraction_events(session_id, user_id)` composite FK

### 3. Fixes allowed (only if defects found)
- Remove em/en dashes in visible user copy
- Replace forbidden wording with calm neutral phrasing
- Correct dead links / route order / missing `noindex`
- Fix any summary hook that inadvertently creates rows
- Remove accidental sitemap entries

No new features, no redesigns, no migrations unless a real blocker appears. Preserved areas (TTC, IVF, First Year, Toddler, Family, public pregnancy/week pages, calculators, setup, reflections, photo memory, AI, robots, redirects, sitemap generator logic, My Journey) remain untouched.

### 4. Deliverable format
A structured sign-off report covering: files inspected, files edited (if any), fixes made, route QA, DB/RLS QA, hub QA, My Week QA, per-tool QA, safety copy audit, mobile/visual notes, sitemap exclusion, noindex confirmation, preservation checks, `bunx tsgo --noEmit` result, final sign-off status, and recommended next phase (12.7 planning).
