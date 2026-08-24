# Phase 29B — Site-wide Text Companion Shell

Add a calm, site-wide AI companion panel that reuses the existing AI system. No new backend, no prompt or schema changes, no voice, no persisted history.

## Step 1: Nano Banana visual direction board (mandatory, front-end binding)

Generate one direction board image (Nano Banana / premium tier) before implementation, saved to `src/assets/`, and report the exact asset path. The board shows: floating launcher, mobile bottom sheet, desktop side panel, empty state, message bubbles, starter chips, streaming state, calm error/rate-limit state, "Open full Ask page" handoff, and how the panel stacks above bottom navigation and the consent banner. Cream paper, soft sage, muted olive, gentle blush/peach, botanical detail, editorial type. No mascot, no human avatar, no new identity.

The board is not decorative background work. It is the binding visual reference for the actual companion UI. The shipped front end must visibly reflect the board across every surface listed above: launcher, mobile sheet, desktop panel, empty state, bubbles, chips, streaming state, error and rate-limit states, Ask handoff, and stacking behaviour. Generic default styling is not acceptable. The board itself is not displayed to users unless a clear design reason emerges.


## Step 2: Companion logic (`src/lib/companion/`)

- `companionMode.ts` — pure route-to-mode resolver following the agreed mapping (TTC routes, ovulation calculator → `ttc_companion`; pregnancy, my-week, my-journey, toolkit, due-date routes → `pregnancy_week_companion`; first-year routes → `first_year_companion`; everything else → `general`). `first_year_day_recap` is never returned.
- `companionSurface.ts` — hidden-route list (`/ask`, `/auth`, `/setup`, `/setup/*`, NotFound) plus a `shouldShowLauncher(pathname)` helper.
- `companionPanelContext.ts` — allowlist-only bounded context builder reusing the existing 500-character cap and the day-and-month date pattern. Emits only: mode, route family, page topic/title slug, broad stage label, safely available week/trimester, TTC stage or cycle day from existing safe helpers, First Year age/stage label from existing safe helpers, short page hint, tone hint. Everything else is excluded by construction.
- `companionName.ts` — display helper returning the user-selected companion name only when genuinely set, otherwise neutral copy ("your companion", "Ask about this"). No literal fallback name in new shell code.
- `companionStarters.ts` — short, calm, non-diagnostic starter chips per mode.

## Step 3: Companion UI (`src/components/companion/`)

- `CompanionProvider.tsx` — context provider holding open state, session-only turns (React state array), resolved mode from `useLocation`, and one `useAISearch` instance. Each request sends only the latest question + bounded context + mode. Nothing written to database, storage, URL, analytics or logs.
- `CompanionLauncher.tsx` — floating button, bottom-right on desktop, above the bottom nav and consent banner on mobile with safe-area inset, 44px minimum, hidden on excluded routes.
- `CompanionPanel.tsx` — mobile bottom sheet / desktop right drawer built on the existing sheet primitive. Contains companion-aware heading with neutral fallback, short safety and privacy line, starter chips, message list, composer, close, "Start again", and "Open full Ask page".
- `CompanionMessageList.tsx` — user bubbles plus assistant answers rendered with the existing `EditorialAnswer`, streaming state, calm error and rate-limit copy (no raw backend errors).
- `CompanionComposer.tsx` — textarea plus send button, disabled while streaming, visible focus, 44px targets.
- `useCompanionSurface.ts` — hook combining route → mode, visibility and starter chips.

Styling uses existing HSL design tokens only, no hardcoded hex.

## Step 4: Mounting

Mount `CompanionProvider` once inside `BrowserRouter` in `src/App.tsx`, wrapping the routes, and render `CompanionLauncher` + `CompanionPanel` alongside `ConsentBanner` and `JourneyBottomNav`. `/ask` keeps its existing full-page experience with no floating launcher on top.

## Step 5: `/ask` handoff

Reuse `askDestination` / `askRouteState` from `src/lib/askNavigation.ts`: only `stage`, `journey`, `topic` in the URL; question and context passed via router state. `AskLink` and all existing Ask surfaces stay untouched.

## Step 6: Tests

New Vitest coverage for: route-to-mode resolver (including never selecting `first_year_day_recap`, unknown route → `general`), context builder cap and exclusions, request payload containing only the latest question, `/ask` handoff keeping question/context out of URL params, neutral name fallback, launcher hidden on excluded routes, launcher renders elsewhere, panel open/close, starter chip behaviour, and calm error/rate-limit copy. No unrelated tests rewritten.

## Step 7: Verification

Playwright visual QA at 390px and 1440px across the listed routes (launcher visibility, panel open/close, streaming, chips, `/ask` fallback, no overlap/overflow, no console errors, focus visibility, 44px targets), then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`, followed by the 32-point report.

Nano Banana front-end verification is part of this step and must be reported explicitly:

- the exact Nano Banana asset path in `src/assets/`
- confirmation that the board was generated and used as the reference before implementation started
- 390px screenshots of the launcher and the opened panel
- 1440px screenshots of the launcher and the opened panel
- confirmation that the shipped front end matches the cream paper, sage, olive, botanical, premium editorial direction
- confirmation that no mascot, human avatar or new visual identity was introduced

## Out of scope

Voice, microphone, audio, persisted chat, chat tables, analytics events, new AI modes, prompt or edge-function changes, backend/schema/RLS/storage/auth changes, SEO or sitemap changes, hardcoded name cleanup in old files, deletion of any existing Ask surface.
