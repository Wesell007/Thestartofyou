# Lifecycle-led public nav + homepage tightening (revised)

Scope: public navigation (desktop + mobile), homepage IA, and the primary acquisition CTA path. No new routes, no dashboard work, no article tracking, no brand redesign.

## 1. Navigation — `src/components/layout/Navbar.tsx`

Replace `navLinks` with the approved lifecycle-led list, identical on desktop and mobile, in this order:

- Pregnancy → `/pregnancy`
- Trying to conceive → `/trying-to-conceive`
- IVF → `/ivf`
- Postpartum → `/postpartum`
- First year → `/first-year`
- Journal → `/product` *(temporary route mapping — see §5)*
- About → `/about`

Removed from primary nav: `Explore`, `Guidance`. (Routes remain reachable; just demoted from nav.)

Right-side actions:
- Signed out: `Sign in` (text) + **`Start your journey` → `/due-date-calculator`** (terracotta pill)
- Signed in: `My Week` → `/my-week` (unchanged)

`Start your journey` is repointed from `/explore` to `/due-date-calculator` everywhere it appears in the navbar (desktop CTA + mobile drawer CTA). This corrects the IA mismatch where Explore was demoted from nav while still serving as the acquisition doorway.

Density tweak so 7 items fit cleanly at `lg`: reduce desktop nav `gap-8` → `gap-6` and primary link size `text-[14.5px]` → `text-[13.5px]`. Mobile drawer unaffected.

Analytics: keep existing `SIGN_IN_CLICKED` and `START_JOURNEY_CLICKED` calls — only the link target changes, not the event.

## 2. Hero — `src/components/home/NewHeroSection.tsx`

Simplify to one dominant CTA:

- Remove the secondary `Explore guidance` → `/explore` link entirely.
- Keep primary CTA `Start your journey` → `/due-date-calculator` (already correct here).
- Keep the quiet returning-user line: `Already saving your journey? Sign in`.

No other hero changes.

## 3. New section — `src/components/home/LifecycleEcosystemSection.tsx`

One calm acknowledgement of the wider lifecycle system. Deliberately understated so it cannot read as a secondary nav, mini directory, or Explore-by-another-name.

Composition:
- Sage hairline rule
- Eyebrow label: `The wider journey`
- Single serif line: `Support across every stage`
- One-sentence supporting paragraph in light sans, max ~28rem
- A single line of inline text reading roughly: `Trying to conceive · IVF · Postpartum · First year`, where each stage name is a small underline-on-hover text link to its hub. No pills, no cards, no icons, no images, no per-stage descriptions, no counts.

Pregnancy is intentionally omitted — it is the flagship wedge and is already carried by the hero and the date-led section above.

Background: parchment, generous vertical padding to match neighbouring sections, no decorative frames.

## 4. Homepage section order — `src/pages/Index.tsx`

1. `NewHeroSection` (simplified)
2. `ValueProofSection` (unchanged)
3. `JourneyBrandedSection` (unchanged — date-led entry)
4. `DashboardGlimpse` (unchanged)
5. `LifecycleEcosystemSection` (new, restrained)
6. `JournalMoment` (unchanged)

`HOME_VIEWED` analytics stays.

## 5. Temporary route mapping — `Journal` → `/product`

For this pass only, the `Journal` nav label points to the existing `/product` route. This is an explicit short-term implementation compromise so we do not silently introduce new routes in a nav-only pass. The final public route language should be `/journal`; that rename (and any redirect from `/product`) is a follow-up.

## 6. Out of scope (explicitly not touched)

- `RouteTracker` skip rules and analytics taxonomy
- Signed-in surfaces (`/my-week`, `/my-journey`, etc.)
- `/explore`, `/guidance`, `/support`, `/ask` page contents
- Article instrumentation
- Footer

## 7. Manual review points (post-implementation)

1. Rename `/product` → `/journal` and add a redirect (follow-up pass).
2. Footer still references old IA — out of scope here, flag for follow-up.
3. Confirm `LifecycleEcosystemSection` correctly omits Pregnancy from the inline list.
4. Decide whether `/explore` should later be retired or repurposed now that it is no longer the acquisition doorway.

## Files changed

- `src/components/layout/Navbar.tsx` — nav list, CTA target → `/due-date-calculator`, density tweak
- `src/components/home/NewHeroSection.tsx` — remove secondary `Explore guidance` link
- `src/components/home/LifecycleEcosystemSection.tsx` — new file
- `src/pages/Index.tsx` — insert new section
