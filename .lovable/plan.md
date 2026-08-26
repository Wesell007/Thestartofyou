# Phase 29I — Memory Settings UI Prototype

Front-end prototype only. No memory behaviour, no database, no network, no storage. Every control is local React state and clearly labelled prototype only.

## Where it lives

A new hidden route `/prototype/memory-settings`, mounted in `src/App.tsx` above the catch-all and not linked from any navigation. It uses `SeoHead` with `noindex`. The sitemap generator works from explicit allowlists in `scripts/generate-sitemap.ts`, so the route is excluded without editing that script.

The page reuses the existing signed-in chrome (`MyWeekHeader` / `MyWeekFooter`) for visual continuity but does no auth or Supabase work.

## Visual direction

Nano Banana direction board generated first, then implemented with existing tokens only: warm cream paper surfaces, soft sage and muted olive, restrained blush accent, `font-serif` headings, `font-sans` light body at existing sizes, rounded paper cards, generous editorial spacing. No mascot, no dashboard metrics, no generic SaaS settings rows.

## Sections built

1. **Header and explanation** — "Memory is off for now", plus a persistent "Prototype only" marker.
2. **Memory status card** — memory off, basic preferences off, journey context off, saved by me off, journal content off, sensitive memory unavailable.
3. **Permission levels** — the five 29G levels as cards. Four are prototype toggles in local state; Sensitive memory renders as a non-interactive "Not available" card with no switch.
4. **Remembered items preview** — three synthetic items only ("Prefers shorter companion answers", "Likes practical next steps", "Prefers gentle reminders"), each with prototype-only edit, delete and review actions.
5. **Pause and delete controls** — pause toggle, delete one item and delete all, using the existing `ConfirmDialog` pattern. Copy states that delete all is separate from switching memory off.
6. **Journal boundary card** — visually separated card stating journal entries, reflections, photos, videos and voice notes are not used for companion memory. No toggle.
7. **Sensitive information boundary** — plain statement that health, fertility and safety-sensitive information is not available for memory in this version. No toggle, no future promise.
8. **"What does my companion remember?"** — a small viewer that switches between memory-off, empty and mocked-items states so all three can be reviewed.

## Components

- `src/pages/MemorySettingsPrototype.tsx` — page composition and all local state.
- `src/components/memory-prototype/` — `MemoryStatusCard`, `MemoryLevelCard`, `RememberedItemsPreview`, `MemoryBoundaryCard`, `CompanionRecallPreview`.
- Reuse `ConfirmDialog`, `Switch`, `Button` and existing card styling.

## Accessibility and responsiveness

Single-column at 390px, comfortable at 768px and 1440px. No horizontal overflow, 44px minimum tap targets, labelled switches and buttons, visible focus rings, Radix alert dialog for confirmations, no small legal-style text.

## Tests

`src/pages/MemorySettingsPrototype.test.tsx`:
- renders with memory off by default
- sensitive memory shown as unavailable, no enabled control
- journal content shown as not used, no toggle
- mocked items render and are the approved synthetic examples
- delete and pause controls open confirmation and change only local state
- no Supabase client calls, no `fetch`, no `localStorage` / `sessionStorage` access (spied and asserted)
- `noindex` metadata present

## Docs

- `docs/ai/roadmap.md` — 29I pending validation during the work, closed only after checks pass; 29J stays as saved-memory MVP behind a feature flag, not started.
- `docs/ai/README.md` — index the prototype and its location.
- `docs/ai/privacy-notes.md` and `docs/ai/release-gate.md` — a short note that a UI prototype exists with no persistence, if needed.

## Validation

`npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, plus a Playwright smoke at 390 / 768 / 1440 checking overflow, console errors and that pregnancy, TTC and First Year companion routes still render. Known pre-existing lint issue in the generated `previewAuthStorage.ts` reported, not fixed.

Ends with the twenty-point Phase 29I report. Phase 29J is not started.
