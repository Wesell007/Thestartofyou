## Phase 9.2 — Pregnancy Week SEO

### Routing shape (confirmed)
- Explicit `Route path="/pregnancy/week/{1..42}"` → 42 bespoke `Week{N}Page.tsx` files under `src/pages/`.
- Catch-all `Route path="/pregnancy/week/:week"` → shared `WeekPage.tsx`, which guards `isNaN/<1/>42` with `<Navigate to="/pregnancy" replace />` before rendering.
- Invalid weeks (e.g. `/pregnancy/week/99`) never render a week UI — they redirect to `/pregnancy`, so no misleading SEO can leak.

There is no shared week renderer feeding the 42 explicit routes. Each Week{N}Page is bespoke content. Editing 42 files is unavoidable, but the SEO injection is mechanical and identical shape per file.

### New helper (single source of truth)
Create `src/components/seo/PregnancyWeekSeo.tsx`:
- Props: `weekNumber: number`.
- Renders `<SeoHead title description canonical />` with the templated strings (default `ogType="website"` from SeoHead).
- No `jsonLd` prop. No dates, authors, reviewers.
- Title: `${n} Weeks Pregnant | Symptoms, Baby Development & Support`.
- Description: `You are ${n} weeks pregnant. Learn what may be changing with your baby, your body, symptoms, appointments and gentle support for this stage of pregnancy.` (British English, no em dashes, no keyword stuffing, calm parent-first).
- Canonical: `https://thestartofyou.com/pregnancy/week/${n}`.

Using one helper means titles/descriptions/canonicals are generated from the week number — no hand-typed drift across 42 files.

### Files to edit (43)
- `src/pages/Week1Page.tsx` … `src/pages/Week42Page.tsx` (42 files)
  - Add `import PregnancyWeekSeo from "@/components/seo/PregnancyWeekSeo";` after the existing Footer import.
  - Inside the `Week{N}Page` component's returned JSX, insert `<PregnancyWeekSeo weekNumber={N} />` immediately before `<Navbar />` (still inside the outer `<div className="min-h-screen bg-parchment">` — Helmet mounts to `document.head` regardless of position).
- `src/pages/WeekPage.tsx` (catch-all)
  - Same import.
  - Insert `<PregnancyWeekSeo weekNumber={weekNum} />` after the `isNaN/range` guard so it only renders for valid 1–42. Insertion goes at the top of the returned JSX, before `<Navbar />`.

Execution will be scripted (bulk `sed`/Python) to keep changes uniform and diff-clean.

### Files NOT edited
Pregnancy hub, topics, trimesters, article data, `/articles/:slug`, calculators, TTC, IVF, Family, First Year, Toddler, week data, sitemap, robots, `App.tsx`, layouts.

### SEO strategy summary
- Titles: consistent template per week, unique per URL.
- Descriptions: consistent calm template per week, unique per URL via week number.
- Canonical: self-referencing absolute `https://thestartofyou.com/pregnancy/week/{n}`.
- OG: `og:type=website`, `og:url`/`og:title` mirror canonical/title via SeoHead defaults.
- JSON-LD: none (week pages are not Article schema surfaces).
- Invalid weeks: WeekPage redirects before SeoHead mounts — no misleading SEO.
- No fabricated dates, authors, publishers, reviewers, or schema fields.

### Verification
- `bunx tsgo --noEmit`.
- Playwright 1280×1800 + 375×812 across sample weeks: `/pregnancy/week/{4,8,12,20,28,36,40}`. Assert 200, exact title, description, canonical, og:title, og:description, og:url, og:type, no Article JSON-LD, no console errors, no horizontal overflow.
- Invalid route: `/pregnancy/week/99` — assert final URL is `/pregnancy` (redirect).
- Regression sweep (200 + no SEO regression): `/pregnancy`, `/pregnancy/first-trimester`, `/pregnancy/second-trimester`, `/pregnancy/third-trimester`, `/pregnancy/baby`, `/articles/complete-guide-morning-sickness`, `/first-year`, `/toddler`, `/family`, `/trying-to-conceive`, `/ivf`.

### Done criteria
All 42 explicit week routes + the catch-all ship correct SEO tags via the shared `PregnancyWeekSeo` helper, no Article JSON-LD, no visible layout change, `tsgo` clean, invalid weeks still redirect, no cross-hub regressions.