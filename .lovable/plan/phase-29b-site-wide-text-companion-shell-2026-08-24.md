# Phase 29B — Site-wide Text Companion Shell

Add a calm, site-wide AI companion panel that reuses the existing AI system. No new backend, no prompt or schema changes, no voice, no persisted history, no grounding or RAG.

## Step 1: Nano Banana direction board (done, and binding)

The board is already generated at `src/assets/companion-direction-board.png` (cream paper, soft sage, muted olive, blush and peach, botanical sprigs, editorial serif, no mascot or human figure). It covers the launcher, mobile bottom sheet, desktop side panel, empty state, message bubbles, starter chips, streaming state, calm error notice and the "Open full Ask page" row.

The board is the binding visual reference for the shipped UI, not background work. Every companion surface must visibly follow it: launcher, mobile sheet, desktop panel, empty state, bubbles, chips, streaming state, error state, rate-limit state, Ask handoff, and stacking above bottom navigation and the consent banner. Generic default styling is not acceptable. The board itself is not shown to users.

## Step 2: Companion logic (`src/lib/companion/`)

- `companionMode.ts` — pure route-to-mode resolver with the agreed mapping (TTC routes and ovulation calculator → `ttc_companion`; pregnancy, my-week, my-journey, toolkit, due-date routes → `pregnancy_week_companion`; first-year routes → `first_year_companion`; everything else → `general`). `first_year_day_recap` is never returned. Also exports a coarse route-family label.
- `companionSurface.ts` — hidden-route list (`/ask`, `/auth`, `/setup`, `/setup/*`, not-found) plus `shouldShowCompanionLauncher(pathname)`, and the kill-switch constant.
- `companionPanelContext.ts` — allowlist-only bounded context builder, 500-character cap, reusing the existing safe helpers (trimester label, First Year age band, TTC stage label) rather than reading raw records. Emits only mode, route family, coarse stage/topic, short page hint and tone hint. Never notes, journal text, media, names, emails, IDs, exact private dates, or chat history.
- `companionName.ts` — returns the chosen companion name only when genuinely set; otherwise neutral copy ("your companion", "Ask your companion", "Ask about this"). No default name literal in new code.
- `companionStarters.ts` — short, calm, non-diagnostic starter chips per mode, avoiding certainty, diagnosis and outcome wording.

## Step 3: Companion UI (`src/components/companion/`)

- `companionStyles.ts` — shared paper-card, cream/sage/olive token classes and focus-ring constants derived from the board, mirroring the existing TTC/pregnancy style-constant pattern.
- `CompanionProvider.tsx` — open state, session-only turns in React state, mode resolved from `useLocation`, one `useAISearch` instance. Each request sends only the latest question, the bounded context and the mode. Nothing written to database, storage, URL, analytics or logs.
- `CompanionLauncher.tsx` — floating sage button with a botanical mark; desktop bottom-right, mobile above the bottom nav and consent banner with safe-area inset, 44px minimum, hidden on excluded routes and when the kill switch is off.
- `CompanionPanel.tsx` — mobile bottom sheet / desktop right drawer on the existing sheet primitive. Companion-aware heading with neutral fallback, AI disclosure plus safety and privacy line, starter chips, message list, composer, close, "Start again", "Open full Ask page", calm error and rate-limit states.
- `CompanionMessageList.tsx` — blush user bubbles, assistant answers via the existing `EditorialAnswer` on cream paper, streaming dots, calm error and rate-limit copy, never raw backend errors.
- `CompanionComposer.tsx` — textarea, send button, disabled while streaming, visible focus, 44px targets, plus Stop and Retry where the existing hook supports it without backend changes (reported as backlog otherwise).
- `useCompanionSurface.ts` — hook combining route → mode, visibility, chips and page context.

Styling uses existing HSL design tokens only; no hardcoded hex.

## Step 4: Mounting and kill switch

Mount `CompanionProvider` once inside `BrowserRouter` in `src/App.tsx`, wrapping the routes, and render the launcher and panel alongside `ConsentBanner` and `JourneyBottomNav`. `/ask` keeps its full-page experience with no floating launcher. A single frontend constant (`COMPANION_ENABLED` in `companionSurface.ts`) disables the launcher and panel everywhere in one edit; the report explains it.

## Step 5: `/ask` fallback

Reuse `askDestination` / `askRouteState`: only `stage`, `journey`, `topic` in the URL; question and context via router state. `AskLink` and every existing Ask surface stay untouched.

## Step 6: Tests

Targeted Vitest coverage for: resolver mapping, resolver never selecting `first_year_day_recap`, unknown route → `general`, hidden routes not rendering the launcher, launcher rendering on allowed routes, context cap and exclusions, request payload carrying only the latest question, no full history sent, `/ask` handoff keeping question and context out of URL params, neutral name fallback, panel open/close, starter chip behaviour, calm error state, calm rate-limit state, session-only behaviour. No unrelated tests rewritten.

## Step 7: Verification and reporting

Playwright QA at 390px and 1440px across the listed routes (launcher visibility, panel open/close, streaming, chips, `/ask` fallback, no URL leakage, no overlap or overflow, no console errors, focus visibility, 44px targets), then `npx tsgo --noEmit -p tsconfig.json`, `npx vitest run`, `npm run build`.

Nano Banana front-end verification reported explicitly: asset path, confirmation the board was generated before implementation and used as the reference, 390px screenshots of launcher and opened panel, 1440px screenshots of launcher and opened panel, confirmation the shipped UI matches the cream paper, sage, olive, botanical, premium editorial direction, that no mascot, human avatar or new identity was introduced, and that it does not look like generic default styling.

Finish with the 38-point report, including the "AI Companion Blueprint alignment" section (satisfied now, future scope, risks carried forward). Stop after the report.

## Out of scope

Voice, microphone, audio, persisted chat, chat tables, analytics events, new AI modes, prompt or edge-function changes, backend/schema/RLS/storage/auth changes, SEO or sitemap changes, Start of You article grounding, RAG, vector search, article ingestion or citation retrieval, memory centre, proactive nudges, partner mode, agentic tools, hardcoded name cleanup in old files, deletion of any existing Ask surface.
