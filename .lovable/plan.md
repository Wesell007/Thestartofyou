# WC-4 — Companion / Ask Experience Consolidation

Final Website Completion slice. Frontend/product consolidation only: no backend, prompt, grounding, memory, voice, journey-context, SEO or sitemap work.

## What the inventory found

Two intentional AI surfaces already exist and are cleanly separated:

- **Companion panel** — `src/components/companion/*` (`CompanionProvider`, `CompanionLauncher`, `CompanionPanel`), mounted site-wide, hidden on `/ask`, `/auth`, `/setup`, `/prototype`, `/404` via `shouldShowCompanionLauncher`.
- **`/ask` full page** — `src/pages/AskPage.tsx`.

Key structural finding: **no in-content CTA opens the companion panel.** Every inline Ask surface (`AISearchBar`, `HubAISupport`, `ArticleAISupport`, `WeekAISupport`, `TrimesterAISupport`, `TTCAISupport`, `FYAISupport`, `SupportAISupport`, `PregnancyAIPanel`, topic/age/phase pages, `AskLink`, journey Ask-companion cards) routes to `/ask` through the shared `src/lib/askNavigation.ts` helpers. The panel is launcher-only. So the "prefer panel for contextual ask" rule has nothing to migrate — the existing model is already coherent and stays as-is.

No third user-facing chat/modal surface was found. `/prototype/memory-settings` stays untouched. Personalised naming (`useCompanionIdentity`) is already used by the panel, `/ask` and journey cards; nothing hard-codes a name.

## What actually changes (terminology only)

The one genuine incoherence is language: the same product is labelled "AI Support", "AI support", "Ask a Question", "Ask anything" and "Ask now" depending on the surface. WC-4 aligns visible wording to the companion convention, with no layout, styling or behaviour change:

1. `Navbar.tsx` (desktop + mobile) — align the `/ask` label to the companion wording; destination stays `/ask`, no new nav item.
2. `Footer.tsx` — "Ask a Question" aligned to the same wording; no new group, no new link.
3. `JourneyBottomNav.tsx` — verify the "Ask" tab label/destination reads as the companion; adjust only if it does not fit the tab width.
4. Shared eyebrow labels "AI Support" / "AI support" in `HubAISupport.tsx` and the per-journey AI-support sections — replace with companion wording where the string is a plain visible label.
5. `AskPage.tsx` header wording — confirm it reads as the same companion the panel represents; smallest copy correction only.
6. Homepage `JournalMoment` line from WC-3e — verified for consistency, not redesigned.

Anything where a copy change would force a layout change is reported as an exception instead of edited.

## Tests

Focused tests (no snapshots) covering: `/ask` reachable; homepage link → `/ask`; nav (desktop + mobile) AI entry → `/ask`; footer AI entry → `/ask`; launcher opens the panel; a representative inline Ask CTA still routes to `/ask` via `askNavigation`; companion naming still comes from `useCompanionIdentity` with no hard-coded name.

## Verification

Desktop 1280px and mobile 390x844 across: homepage, `/ask`, one Pregnancy, one First Year, one Toddler/Family page with an Ask entry, nav, footer, launcher. Check terminology, destination, single companion surface per interaction, no duplicate controls, no broken links.

Then `npm test`, `npm run lint`, `npm run typecheck`, `npm run build` against the 716-test / 1 prefer-const / 10 react-refresh baseline, and return the 45-point completion report. AIC-1 is not started.
