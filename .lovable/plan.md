# AIC-J4 — Final Closure Reconciliation

Verification only. No source files were changed. Findings below are repository truth
plus freshly executed validation.

## Headline

Validation is clean. **Scope is not.** The build delivered the shared entry
architecture and the three inline journey cards, but the approved J4 scope also
covered hub consolidation, StagePage, TTCSupportMomentCard, WeekAISupport,
trimester and month/phase surfaces, and signed-out personal wording. Those were
not implemented.

**105. AIC-J4 — DO-NOT-CLOSE** (scope incomplete; validation clean)
**106. AIC-J5 — NOT SAFE TO BEGIN**

`roadmap.md:321` already records AIC-J4 as "(closed)". That is premature and is
itself a defect to correct.

## 1. Validation evidence

1. Cache-defeat procedure: `tsgo` is invoked with `--noEmit -p tsconfig.json`; the
   project declares no `tsBuildInfoFile` and no `*.tsbuildinfo` exists outside
   `node_modules`, so no incremental state is reused. Run 2 additionally passed
   `--incremental false`. (Deleting cache files was not possible in this mode; the
   absence of a build-info artefact was verified instead.)
2. Typecheck run 1 — PASS, exit 0, 0 errors.
3. Typecheck run 2 (`--incremental false`) — PASS, exit 0, 0 errors.
4. `DENO_DIR=/tmp/denodir deno check --no-lock supabase/functions/ai-search/index.ts` — PASS, 0 errors.
5. `npm run lint` — 1 error, 11 warnings.
   - 1 pre-existing `prefer-const` error (`previewAuthStorage.ts:38`).
   - 10 pre-existing `react-refresh/only-export-components` warnings.
   - **1 NEW J4 finding**: a third `react-refresh` warning in
     `CompanionProvider.tsx` (line 288), caused by exporting `useCompanionOptional`.
     Non-blocking, but the report's "0 new findings" claim is incorrect.
6. `npm run build` — PASS (built in 14.27s; only the pre-existing chunk-size warning).
7. `npm test` — 96 files, 1126 tests, 1126 passing, 0 timeouts. Confirmed.

## 2. Documentation

8. `docs/ai/companion-journey-context.md` updated — YES (section "AIC-J4 —
   contextual journey entry points"). It records: two answer surfaces, contextual
   entry architecture, panel vs `/ask` routing, personal vs content separation,
   transient entry lifetime, consumption on the first accepted turn, route-change
   clearing, close/abandon clearing, and the no-hidden-user-turn rule. All nine present.
9. `roadmap.md` updated — YES.
10. Status recorded: "AIC-J4 — contextual journey AI entry points (closed)". This
    must be reverted to open pending the scope items below.

## 3. TTC surface reconciliation

11. TTC hub AI sections before J4: `TTCAISupport` + `TTCHub` inline `AISearchBar` (2).
12. After J4: 2 — unchanged.
13. Duplicate collapsed — NO.
14. Surviving: `TTCAISupport.tsx`, `TTCHub.tsx`, `TTCTopicPage.tsx`, `TTCSubtopicPage.tsx`, all on `AISearchBar`.
15. Signed-out personal wording remaining: not reduced by J4 (0 wording edits made).
16. StagePage bare `/ask` Link fixed — NO (`StagePage.tsx:454` still a raw `Link to="/ask"`).
17. Bounded entry context preserved on that link — NO.
18. StagePage duplicate AI/Ask presentation collapsed — NO.
19. TTC topic/subtopic contextual hand-off opens panel — NO (still `AISearchBar`).
20. TTCSupportMomentCard raw Link removed — NO (`:80` still `/ask?stage=ttc&topic=...`).
21. Uses shared hand-off — NO.
22. Moment prompts preserved — YES (untouched).
23. Direct model calls from TTCSupportMomentCard — 0.
24. `TTCAskCompanionCard` direct `useAISearch` — 0.
25. Inline answer renderers there — 0.
26. Destination — shared panel via `AskAboutThis`, plus one broad `/ask` link.
27. `ttcAskChipsFor` remains CONTENT/MOMENT only — YES.

## 4. Pregnancy surface reconciliation

28/29. Hub AI sections before and after J4: unchanged (`PregnancyAIPanel`,
`GuidanceAndQuestions`, `HubAISupport`).
30. Consolidated — NO.
31/32. Public personal-claim wording ("your pregnancy", "shaped to your stage"):
unchanged by J4; 0 copy edits were made, so no reduction can be claimed.
33. `WeekAISupport` destination — unchanged, still inline `AISearchBar`.
34. Content-safe "Ask about this week" wording adopted there — NO (the
    "tailored to you" line remains).
35. `weekData.aiPrompts` reused — YES (untouched).
36. Content week → personal pregnancy inference — 0.
37. Hidden user turns — 0.
38/39/40/41. `TrimesterAISupport` — unchanged, still `AISearchBar`, does not open
    the panel, prompts reused, route-only personal inference 0.
42. `SectionAskAI` direct `useAISearch` — 0.
43. Inline answer renderers — 0.
44. Personal wording requires J2-confirmed context — YES (card copy is content-level).
45. `ArticleAISupport` materially changed — NO (as planned).
46. Due-date tool Ask materially changed — NO (as planned).

## 5. First Year surface reconciliation

47/48. Hub AI sections before and after J4: unchanged (`FYAISupport`, `HubAISupport`).
49. Consolidation result — none performed.
50. Surviving public pattern — `AISearchBar` via `FYAISupport`/`HubAISupport`.
51/52. Signed-out "your baby" and other personal-assumption copy — unchanged by J4.
53. Month/phase destination — unchanged (`AISearchBar`).
54. Content-safe "Ask about this month" wording — NO.
55. Route month → personal first-year inference — 0.
56. Month/stage content prompts reused — YES.
57. `FirstYearAskCompanion` direct `useAISearch` — 0.
58. Inline answer renderers — 0.
59. Destination — shared panel via `AskAboutThis`.
60. Postpartum remains content-only — YES.
61. Postpartum → personal first-year inference — 0.

**Additional finding (not in the checklist):**
`src/components/firstyear/today/DaySummaryCard.tsx` still calls `useAISearch`
directly and renders a sanitised answer inline. It is outside the three named
cards, but it is a third answer-producing surface and contradicts the
"exactly two AI answer surfaces" invariant as literally stated.

## 6. Shared entry architecture

62. `src/components/companion/AskAboutThis.tsx`.
63. `src/components/companion/useCompanionEntryHandoff.ts`.
64. Supabase queries from the contextual entry layer — 0.
65. Model calls on open — 0.
66. Hidden auto-sent user messages — 0.
67. Content prompts written into `JourneyContextV1` — 0.
68. Content prompts persisted — 0.
69. New conversation runtimes — 0.
70. AI answer surfaces — 2 by design; **3 in repository truth** because of
    `DaySummaryCard` (pre-existing, not introduced by J4).

## 7. Entry lifecycle

71. Trigger: `CompanionProvider.resolveJourneyContext`, called by the shared
    runtime after the non-empty user turn is accepted and appended and before
    `ask()` — reads `entryRef.current`, clears it, then builds the request.
72. Assistant failure reactivates entry — NO.
73. Timeout reactivates — NO.
74. Abort reactivates — NO.
75. Rejected/blank turn consumes entry — NO (blank submissions return before resolution).
76. Unchanged `/ask` URL reactivates consumed entry — NO.
77. Rerender reactivates — NO (ref-held, not derived).
78. New material hand-off activates new entry — YES.
79. Unconsumed panel entry cleared on route change — YES.
80. Cleared on close/abandon — YES.
81. Launcher reopen resurrects abandoned context — NO.

## 8. Accessibility / mobile (J4-touched surfaces only)

82. Placeholder-only inputs fixed — 0 (the three cards no longer have inputs at all).
83. Inputs gaining programmatic labels — 0 (inputs removed rather than relabelled).
84. Contextual controls meeting ~44px — 3 of 3 (`min-h-[44px]` in `AskAboutThis`); no exceptions.
85. Nested-interactive regressions — 0.
86. Focus-visible regressions — 0.
87. Chip-overflow regressions — 0 (chips removed from the three cards).
88. New sticky AI elements — 0.
No site-wide accessibility claim is made.

## 9. Frozen systems

89–98: prompt 0, AIC-5 0, grounding 0, memory 0, persistent history 0, ai-search 0,
`JourneyContextV1` schema 0, backend 0, schema/RLS 0, voice 0.
99. J3 personal starter logic changes — 0 (consumed reactively only).
100. J2 resolver semantic changes — 0.

## 10. Debt and final status

101. Unresolved functional J4 defects — 0.
102. Unresolved UX J4 defects — 6:
   - TTC hub duplicate AI sections not collapsed.
   - Pregnancy hub AI presentation not consolidated.
   - First Year hub AI presentation not consolidated.
   - `StagePage:454` bare `/ask` link carries no bounded entry context.
   - `TTCSupportMomentCard` ask actions still raw `/ask` links.
   - Signed-out personal wording ("tailored to you", "your cycle/pregnancy/baby") unchanged.
103. Unresolved accessibility J4 defects — 0 on touched surfaces.
104. Unresolved architecture J4 defects — 2:
   - `DaySummaryCard` still an inline answer surface calling `useAISearch`.
   - New react-refresh lint warning from `useCompanionOptional` export.

None of the above is deferred J5/J6 work; all sit inside the approved J4 scope.

**105. AIC-J4 — DO-NOT-CLOSE.**
**106. AIC-J5 — NOT SAFE TO BEGIN.**

## Proposed closure work (J4 remainder)

1. Revert the roadmap entry to open.
2. Convert `WeekAISupport`, `TrimesterAISupport` and the month/phase support
   sections to `AskAboutThis` hand-offs, reusing their existing content prompts.
3. Replace `StagePage:454`'s bare `/ask` link and `TTCSupportMomentCard`'s ask
   links with bounded contextual hand-offs.
4. Collapse the duplicate hub AI sections in TTC, Pregnancy and First Year down
   to one surviving affordance per hub.
5. Correct signed-out personal wording to content-safe phrasing wherever no
   J2-confirmed personal context exists.
6. Decide `DaySummaryCard`: convert to an entry point, or formally record it as an
   accepted exception to the two-surface rule.
7. Move `useCompanionOptional` into its own module to clear the new lint warning.
8. Re-run the full gate and re-issue the closure report.
