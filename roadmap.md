# Roadmap

## Completed
- WC-3a — Shared Breadcrumb Foundation — CLOSED PASS
- WC-3b — Existing Breadcrumb Migration — CLOSED PASS
- WC-3c — Canonical Breadcrumb Coverage & Hierarchy — CLOSED PASS (see debt below)
- WC-3d — BreadcrumbList Structured Data Integration — CLOSED PASS (resolved families only)
- WC-3e — Final Navigation / IA Corrections — CLOSED PASS. WC-3 — CLOSED PASS.
- WC-4 — Companion / Ask Experience Consolidation — CLOSED PASS. WEBSITE COMPLETION — CLOSED PASS.

## Carry-forward: dead components (do not delete without review)
- `src/components/week/WeekHero.tsx` — unreachable; live week experience is `Week1Page…Week42Page` via `PregnancyWeekRoute.tsx`
- `src/components/trimester/TrimesterHero.tsx` — unreachable; live trimester heroes are `FirstTriHero`/`SecondTriHero`/`ThirdTriHero`

## Debt
- Legacy article hierarchy: 156 articles in `/articles/:slug`, 87 with authoritative topic ownership, 69 unresolved (54 TTC, 4 pregnancy, 3 postpartum, 3 preparing-for-baby, 2 IVF, 2 first-year, 1 support).
  `ArticleHeader.tsx` and `FlagshipHero.tsx` remain WC-3c/WC-3d DEFERRED — AUTHORITATIVE ARTICLE TOPIC DATA REQUIRED, so `/articles/:slug` has no visible trail and no BreadcrumbList.
  Proposal recorded only: optional `journeyTopic: { journey; topicSlug }` field on `ArticleData`; nine non-Pregnancy/TTC/IVF journey articles need a product decision.

## In progress
- AIC-1 — AI Companion Architecture Audit & Foundation (build mode approved): authoritative architecture doc `docs/ai/companion-architecture.md` + minimum shared foundation to remove the `/ask` mode fork (shared companion request boundary, shared mode resolution). Backend, prompts and grounding frozen.

## Not started
- AIC-2 Journey Context, AIC-3 Permissioned Memory, AIC-4 Conversation Continuity, AIC-5 Safety/Emotional Intelligence, AIC-6/7 Voice — do not begin before AIC-1 closes.
