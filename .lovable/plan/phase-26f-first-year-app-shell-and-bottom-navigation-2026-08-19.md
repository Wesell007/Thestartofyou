# Phase 26F — First Year App Shell and Bottom Navigation

## Discovery findings

1. **Signed-in First Year routes** (all wrapped in `ProtectedRoute` in `src/App.tsx`):
   - `/my-first-year`
   - `/my-first-year/today`
   - `/my-first-year/memories`
   - `/my-pregnancy-chapter` (conditional, only when a kept chapter exists)
   - `/setup/first-year` (onboarding, not an app destination)
2. **Public First Year routes** (`/first-year`, phases, months, topics, `/first-year/:topic/:slug`) are SEO pages and stay untouched.
3. **No signed-in guidance or reading route exists.** Guidance on the home page links out to public `/first-year/...` pages. So the navigation will be **three items**, not four.
4. **No dedicated signed-in Ask Cindy route.** `/ask` is a public page, and Cindy on First Year is inline on Home and Today. No Cindy nav item.
5. **Route structure supports a shared wrapper.** The three routes are sibling entries in `App.tsx`, so each element can be wrapped in one shell component without touching page internals or redirects.
6. **Design tokens** live in `src/index.css` (`--stage-firstyear-*`, sage, parchment) and shared constants in `src/components/firstyear/journey/firstYearStyles.ts`.
7. **Existing back links:** `FirstYearToday.tsx` and `FirstYearMemories.tsx` each have a "Back to First Year" link near the top, plus footer-level return links. These will be **left in place** this phase, as instructed.
8. **Overlays:** Today's LogSheet, Memories' MemorySheet and MemoryPhotoViewer all use the Radix Dialog primitive (portalled, `z-50`), and the signed-in header is `z-50`. The bottom nav will sit at `z-40` so sheets, viewers and toasts stay above it.

## What will be built

**New files**

- `src/components/firstyear/navigation/firstYearNavItems.ts` — pure list of nav items (id, label, href, icon) plus an `isNavItemActive(pathname, href)` resolver.
- `src/components/firstyear/navigation/FirstYearBottomNav.tsx` — the mobile bar.
- `src/components/firstyear/navigation/FirstYearAppShell.tsx` — wrapper rendering `children`, the bottom nav, and bottom spacing.
- `src/components/firstyear/navigation/firstYearNavItems.test.ts` — active-state and href tests.

**Changed files**

- `src/App.tsx` — wrap only the three `/my-first-year*` route elements in `<FirstYearAppShell>`. No route paths, redirects or auth logic change.
- `src/components/firstyear/journey/firstYearStyles.ts` — add shared nav surface constants beside the existing ones.
- `src/lib/navLifecycle.ts` and `src/lib/navLifecycle.test.ts` — add Today and Memories to the First Year desktop header links (see Desktop below).

## Navigation items

| Label | Route | Icon (lucide, already installed) |
| --- | --- | --- |
| Home | `/my-first-year` | `House` |
| Today | `/my-first-year/today` | `Sun` |
| Memories | `/my-first-year/memories` | `BookHeart` |

Active state: Home matches the exact path only; Today and Memories match their path or a deeper path under it. `aria-current="page"` on the active item.

## Mobile treatment (under 768px)

A fixed bar at the bottom of the viewport: parchment/cream token surface with a soft top border, rounded top corners, a subtle warm shadow drawn from `--stage-firstyear-ink`, and safe-area padding. Icon above a visible label, each item at least 44px tall. Active item uses the sage/terracotta First Year tokens; inactive items use the soft First Year text token. Focus ring reuses `FY_FOCUS_RING`. No hex values in components; everything through `hsl(var(--token))`.

The shell adds bottom padding on mobile only so page content and primary buttons clear the bar.

## Desktop treatment (768px and up)

The bottom bar is hidden. The signed-in header already renders First Year links from `resolveHeaderLinks`, but currently only "First Year". Least disruptive option: extend that resolver so First Year users also see Today and Memories in the existing top header. No page layout is redesigned, and the header component itself does not change.

## Testing

- New unit tests for the nav item list: correct hrefs, active state per route, three items only, no guidance/Cindy item.
- Update `src/lib/navLifecycle.test.ts` for the extended First Year header links.
- Run `npx tsgo --noEmit -p tsconfig.json`, targeted Vitest, `npx vitest run`, and `npm run build`.
- Browser check at 390px and 1440px on all three routes: active state, sheet layering, no content hidden, no overflow, no console errors.

## Out of scope

No changes to care event schema or handlers, Cindy summary, memories storage or upload, AI prompts, edge functions, RLS, sitemap, SEO wiring, redirects or auth. No new routes, no new dependencies, no reminders or notifications.
