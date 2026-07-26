# Phase 13.4a — Weekly Article Suggestions Build

## Files to create

### `src/data/weeklyArticleSuggestions.ts`
Exports `WeeklySuggestion` type, `EXCLUDED_FROM_WEEKLY` (23 slugs incl. `symptoms-stopping-early-pregnancy` and `anti-d-injection-in-pregnancy`, all loss/anxiety/emotional-support pieces, and condition-specific pieces), and `getWeeklySuggestions(week)`.

Approved mapping (max 2 per week, unmapped weeks return `[]`):
- 5–7 → nausea-in-early-pregnancy, fatigue-in-early-pregnancy
- 8–9 → nausea-in-early-pregnancy, the-first-trimester-emotionally
- 10 → nipt-in-pregnancy
- 11 → combined-screening-test
- 12 → dating-scan
- 13 → the-first-trimester-emotionally
- 14–15 → sleep-in-pregnancy
- 16–17 → round-ligament-pain
- 18–21 → 20-week-anomaly-scan, baby-movement-in-pregnancy
- 22–23 → back-pain-in-pregnancy
- 24–25 → baby-movement-in-pregnancy, glucose-tolerance-test
- 26–27 → heartburn-in-pregnancy
- 28–29 → shortness-of-breath-in-pregnancy
- 30–31 → hospital-bag-and-what-to-pack, writing-a-birth-plan
- 32–33 → preparing-emotionally-for-birth, swelling-in-pregnancy
- 34 → writing-a-birth-plan, sleep-in-pregnancy
- 35–36 → the-36-week-appointment, hospital-bag-and-what-to-pack
- 37 → signs-of-labour, hand-expressing-colostrum
- 38–39 → signs-of-labour, when-to-go-in-for-labour
- 40 → membrane-sweep, what-happens-if-labour-doesnt-start
- 41–42 → induction-of-labour, what-happens-if-labour-doesnt-start

Runtime filter: drop excluded slugs, drop slugs missing from `getArticle()`, cap at 2. All 25 mapped slugs pre-verified present.

### `src/components/myweek/SectionWeeklyReads.tsx`
Presentation only. Returns `null` when empty. Eyebrow `A LITTLE MORE FOR THIS WEEK`, serif H2, sub `Optional reading, if it feels useful.`, 1 or 2 keepsake cards (title via `getArticle`, one-line reason, `Read` CTA without arrow). Links `/articles/:slug`. No imagery/tags/carousel/reading time/AI/analytics.

## File to edit

### `src/pages/MyWeek.tsx`
Import `SectionWeeklyReads`. Mount between `SectionToolsThisWeek` and `SlotReflection`, inside the existing `status === "active"` render path only.

## Verification
- `bunx tsgo --noEmit` passes.
- Active only; hidden for given_birth/pregnancy_loss/paused/no_longer_pregnant via existing early-return branch.
- Week 4 hidden. Max 2 cards. Internal links only. No AI/analytics imports. No forbidden phrases. No em/en dashes.

## Out of scope
Journey Support, loss surfaces, journey status controls, AI, analytics, article data, public article pages, sitemap, robots, routes, migrations, TTC, IVF, First Year, Toddler, Family, Companion, Birth Plan, Hospital Bag, photos, captions, reflections.
