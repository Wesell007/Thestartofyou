# Phase 26L — First Year Launch Readiness QA and Polish

Discovery is complete (read-only, signed in as a QA account, at 390px and 1440px). Findings below, then the narrow fix list awaiting approval.

## Discovery findings

What is already healthy:

- `/my-first-year`, `/my-first-year/today`, `/my-first-year/memories` all render with no console errors, no page errors and no failed network responses during load and during the logging, reminder and memory flows.
- No horizontal overflow at 390px or 1440px on any of the three routes (scrollWidth equals clientWidth).
- Bottom nav is a semantic `nav` with an accessible label, three links, and the correct `aria-current="page"` on Home, Today and Memories respectively.
- Desktop header links read First Year, Today, Memories, Pregnancy chapter, with the account menu; correct for the signed-in First Year lifecycle.
- Today: quick add tiles open, the feed sheet completes and saves, Today so far and Last logged update, sheets render above the bottom nav with a dimming overlay, focus moves into the sheet on open.
- No AI request fires on page load; the Cindy recap card stays in its neutral pre-click state until events exist.
- Memories: text memory and photo memory both save, the signed photo URL renders, the viewer opens and closes on Escape, and no stale signed URL console error appears during the photo flows.
- No unnamed buttons or links in the three routes or inside the sheets.

Issues found:

1. Analytics consent banner covers the mobile bottom nav. The banner is `fixed bottom-0 z-50`; the First Year bar is `z-40` at the same edge. Measured at 390px, the banner occupies the full nav area and `elementFromPoint` at the nav centre returns the banner card, so Home, Today and Memories are unreachable by tap for any parent who has not yet answered the consent question. This is the one clear launch blocker found.
2. Save toasts overlap the fixed header on mobile. The toast viewport is `fixed top-0` on small screens, so the "Memory saved" toast sits over the header and the "Back to First Year" link. Cosmetic, but it lands on a core save path.

Everything else inspected (hero spacing and decoration, note card, Ask Cindy card, Memories card, reminders card and its notification state line, empty states, sheet layering, focus rings, copy) is consistent with the approved design and needs no change.

## Fixes proposed

1. Consent banner clearance. The First Year app shell sets a `--app-bottom-nav-inset` custom property while it is mounted and clears it on unmount; `ConsentBanner` adds that inset to its bottom padding. Presentation only, no consent logic change, and no effect on routes outside the First Year shell.
2. Toast top offset on mobile. In the toast viewport, offset the mobile position so toasts clear the fixed header. One class change; it touches a shared primitive, so it is called out as global-touching and can be dropped if you would rather it stay untouched.

No other files change. No new features, routes, tables, migrations, edge-function or AI changes.

## Verification after the fixes

- `npx tsgo --noEmit -p tsconfig.json`
- targeted tests for touched areas, then `npx vitest run`
- `npm run build`
- Re-run the browser pass on all three routes at 390px and 1440px, with the consent banner present and dismissed, confirming the bottom nav is tappable, sheets and the photo viewer still layer above the nav, and console stays clean
- Light smoke check of `/first-year`, `/setup/first-year`, `/my-pregnancy-chapter` and a public pregnancy route

## Report

Full report covering all 27 requested items, then stop.
