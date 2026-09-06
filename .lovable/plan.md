# AIC-J4 — Contextual Journey AI Entry Points: Audit + Implementation Plan

Audit only. No code changed. Scope: TTC, Pregnancy, First Year.

## A. Entry-point inventory

### 1. TTC
| Surface | Component | Copy | Action | Destination | Entry ctx | Page ctx | Personal ctx | Suggestions | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| /trying-to-conceive hero | TTCHub common questions (AskLink x3) | "Common questions" | navigate | /ask?stage=ttc | stage+topic-less, free-text `context` in router state | none | none | hardcoded | MERGE |
| /trying-to-conceive mid | local `AISupport` + TTCAISupport (AISearchBar) | "Questions about your cycle, gently answered" | navigate | /ask?stage=ttc | context, stage | none | none | hardcoded | IMPROVE (wording) |
| TTC topic/subtopic pages | TTCTopicPage / TTCSubtopicPage / StagePage AI block | "Ask anything, whenever you need" | navigate | /ask (bare `Link` in StagePage drops stage) | partial | none | none | `data.aiPrompts` | IMPROVE |
| /my-ttc-journey | TTCAskCompanionCard | dynamic, companion-named | inline `useAISearch` direct submit | in-card answer; "Continue in Ask" → /ask?stage=ttc&topic= | coarse TTC context string | cycle stage/day | yes (cycle day, test flags) | `ttcAskChipsFor` (own registry, not J3) | IMPROVE/MERGE |
| /my-ttc-journey moments | TTCSupportMomentCard | moment heading | raw `<Link>` to /ask?stage=ttc&topic= | /ask blank composer | topic only, no question | none | implicit | none | IMPROVE |
| Ovulation calculator/result | OvulationResult | ask chips | navigate | /ask?stage=ttc | context | none | none | tool copy | KEEP |
| IVF content from TTC | IVFAISupport, IVFCommonQuestions, IVFTopicPage | IVF wording | navigate | /ask?journey=ivf | journey=ivf | none | none | hardcoded | KEEP (content only) |

### 2. Pregnancy
| Surface | Component | Copy | Action | Destination | Entry | Page | Personal | Suggestions | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| /pregnancy hub | PregnancyAIPanel + GuidanceAndQuestions | "your pregnancy", "shaped to your stage" | navigate | /ask?stage=pregnancy | context | none | none | hardcoded | MERGE + wording fix |
| /pregnancy/week/:n | WeekAISupport | "Ask about this week" | navigate | /ask?stage=pregnancy | `Week N of pregnancy` free text | none | none | `weekData.aiPrompts` | IMPROVE (pass week as bounded entry) |
| Trimester pages | TrimesterAISupport | "Ask anything, whenever you need" | navigate | /ask?stage=pregnancy | trimester free text | none | none | 3 generic | IMPROVE |
| Pregnancy topic pages | StagePage AI + Common questions | generic | navigate | /ask | partial | none | none | content data | MERGE |
| Articles | ArticleAISupport | "Still unsure about something?" | navigate | /ask | title as context | none | none | `article.aiPrompts` | KEEP |
| /my-week | SectionAskAI | "Ask X about week N" | inline direct submit | in-card; Continue in Ask | pregnancy context string | week | yes (personal week) | 3 hardcoded | IMPROVE/MERGE |
| Due-date tools | DueDateCalculatorResult | result-side ask | navigate | /ask?stage=pregnancy | context | none | none | tool copy | KEEP |

### 3. First Year
| Surface | Component | Copy | Action | Destination | Entry | Page | Personal | Suggestions | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| /first-year hub | FYAISupport (bar with `suggestions={[]}` + 6 AskLink chips) | "Questions about your baby or about you" | navigate | /ask?stage=first-year or ?stage=recovery | per-chip | none | none | hand-built chips | MERGE + wording fix |
| /first-year hub | FirstYearCommonQuestions (own mini search form) | "Common questions" | navigate | /ask?stage=first-year | context | none | none | hardcoded | MERGE into shared bar |
| First Year hub alt | FirstYearAISupport (HubAISupport) | "Ask anything, whenever you need" | navigate | /ask?stage=first-year | context | none | none | 3 hardcoded | MERGE |
| Month/phase pages | FirstYearPhasePage / MonthPage | stage copy | navigate | /ask | partial | none | none | content data | IMPROVE |
| Topic pages/articles | FirstYearTopicPage / FirstYearArticle | topic copy | navigate | /ask | context | none | none | content data | KEEP |
| /my-first-year | FirstYearAskCompanion | "Ask about this stage" | inline direct submit | in-card; Continue in Ask | coarse age-band context | none | yes (DOB band, baby count) | 3 hardcoded | IMPROVE/MERGE |
| Postpartum within FY | PostpartumAISupport / PostpartumCommonQuestions | recovery copy | navigate | /ask?stage=recovery | stage | none | none | hardcoded | KEEP (content only) |

## B. Findings (audit points 4–29)

4. **Global launcher**: `CompanionLauncher` → `setOpen(true)` with no payload; visible everywhere except /ask, /auth, /setup, /prototype, 404. Positioned above `JourneyBottomNav` via the nav inset variable.
5. **/ask hand-off**: reads `stage`, `journey`, `topic` from the query string; `question`, `context`, `contextLabel`, `previousQuestion` from router state. `buildEntryContext` consumes only stage/journey/topic/title.
6. **AskLink**: correct anchor semantics, always uses `askDestination` + `askRouteState`. Two surfaces bypass it (StagePage "Ask now" bare `Link`, TTCSupportMomentCard raw `Link`), losing stage and question.
7. **HubAISupport**: thin wrapper over `AISearchBar`; navigation-only; suggestions are caller-supplied static arrays.
8. **Article ask**: content prompts from article data, navigates to /ask. Correct content-entry model.
9. **Week/stage/month ask**: week pages already use week-specific content prompts, but the week reaches /ask only inside a free-text `context` string, not the bounded `entry` vocabulary.
10. **Tool/calculator ask**: result pages hand off with tool context. No personal claims. Fine.
11. **Entry-context contract today**: `EntryJourneyContextV1` = `{journey, stage, topic, title}`, sanitised. Sufficient for J4 except pregnancy week (see 42).
12. **Page context**: only the panel builds it (`buildPageContext({pathname})`). /ask does not build page context (correct: /ask is not journey content).
13. **Personal context**: single J2 resolver `useCompanionPersonalJourney`, used by the panel and /ask. The three inline journey cards do **not** use it; they build their own coarse context strings from data already on the page.
14. **J3 interaction**: only the panel and /ask consume `resolveJourneySuggestions`. `ttcAskChipsFor` is a separate TTC chip source (pre-J3, content/moment-based, not personal-lifecycle starters).
15. **Current query params**: `stage`, `journey`, `topic` (live); `q`, `ctx` (legacy, stripped on load).
16. **Obsolete params**: `q` and `ctx` — retained only for old inbound links; keep the redirect, do not extend.
17. **Duplicates**: TTC hub (2 AI sections), StagePage-based topic pages (2), First Year hub (up to 3), plus the launcher on all of them. Three near-identical inline ask cards duplicate `useAISearch` wiring, chip UI, answer renderer, and "Continue in Ask" truncation maths.
18. **Missing high-value entry points**: no contextual entry from week pages / month pages / topic pages **into the panel** (they can only navigate away from the page they are about); no contextual affordance on My Journey week detail beyond the inline card.
19. **Unnecessary entry points**: second AI section on TTC hub, StagePage duplicate block, FirstYearCommonQuestions' bespoke search form.
20. **Mobile issues**: `AISearchBar` and FirstYearCommonQuestions chips lack a 44px min-height; multiple full-width Ask CTAs within one viewport on hubs; launcher/bottom-nav clearance depends on a manually maintained inset value.
21. **Desktop issues**: two-column HubAISupport repeats within pages; visually identical buttons behave differently (navigate vs inline submit vs blank composer).
22. **Accessibility**: search inputs rely on placeholder only (no label); otherwise semantics are correct (real buttons/links, launcher has aria-label, chip rows wrap).
23. **Signed-out wording risks**: "your cycle" (TTCAISupport), "your pregnancy" / "shaped to your stage" (PregnancyAIPanel, GuidanceAndQuestions), "your baby" (FYAISupport) render on public hubs with no personal state.
24. **Personal-vs-content wording risks**: week pages say "this week" (correct); the hubs above imply personal knowledge that does not exist.
25. **Entry-intent lifetime today**: on /ask, entry context is recomputed from the URL/state on every request for the whole page session and persists across follow-up questions until the params change. The panel has no entry intent at all.
26. **Recommended lifetime**: explicit entry intent applies to the **first request of the hand-off** and to subsequent requests only while the user stays on that surface without a route change; a route change clears it, and live page context takes over. Never persisted, never in memory/history.
27. **Routing rule (proposed)**: contextual "Ask about this …" affordances embedded in journey content open the **panel** (stay in place, keep reading); "Ask anything" hub/search-bar surfaces and any free-text submission continue to **/ask**. One rule, applied consistently, so identical-looking buttons never split behaviour.
28. **No additional affordance needed**: article pages (already have one), calculator result pages, IVF/postpartum content pages, any page already carrying the launcher plus one section.
29. **Contextual affordance wanted**: pregnancy week pages, trimester pages, First Year month/phase pages, TTC topic pages, My Week, My Journey, My TTC Journey, My First Year.

30. **KEEP**: AskLink, askNavigation, AISearchBar, ArticleAISupport, tool result asks, J2 resolver, J3 registry, /ask entry contract.
31. **IMPROVE**: WeekAISupport, TrimesterAISupport, StagePage AI block, TTCSupportMomentCard, FYAISupport, hub copy with "your …".
32. **MERGE**: FirstYearCommonQuestions into the shared bar; second AI section on TTC hub and StagePage; the three inline ask cards onto one shared card.
33. **REMOVE**: no component removed in J4; only duplicate sections collapsed after tests exist.
34. **Reusable component**: one `AskAboutThis` affordance (button/chip row) that takes a bounded `{journey, stage, topic, title}` entry descriptor plus optional content prompts, and hands off to panel or /ask per rule 27.

## C. Proposed implementation slices

- **J4-1 Panel entry contract**: allow the companion panel to receive a bounded entry descriptor at click time (`openWithEntry(entry)`), stored in provider state, cleared on route change; fed into the existing `entry` layer of `JourneyContextV1`. No contract change, no prompt change.
- **J4-2 Shared affordance**: build `AskAboutThis` and wire it to the routing rule; content prompts sourced from existing week/topic/article data, personal starters from J3 only when `personal` exists.
- **J4-3 Pregnancy surfaces**: week, trimester, My Week — content wording "this week / this trimester", personal wording only behind J2 personal state.
- **J4-4 TTC surfaces**: hub de-duplication, topic pages, TTCSupportMomentCard fix, My TTC Journey card aligned to the shared affordance.
- **J4-5 First Year surfaces**: hub consolidation, month/phase pages, My First Year card alignment.
- **J4-6 Copy and a11y pass**: signed-out-safe wording, labelled inputs, 44px chips, single primary AI entry per viewport.
- **J4-7 Tests**: entry descriptor construction, panel entry lifetime and clearing on navigation, no personal inference from content routes, personal wording only with personal state, J2 transition freshness (TTC→Pregnancy leaves no stale personal CTA), no hidden auto-sent messages, routing rule parity, chip source precedence.

## D. Answers to closing questions

39. Unresolved blockers: 0.
40. Backend change needed: no.
41. Prompt change needed: no.
42. JourneyContextV1 schema change: not required for J4-1 to J4-6. One optional bounded extension is worth deciding separately — `entry.week` for pregnancy week hand-offs; without it, week identity travels only as `title`/`topic`. Recommend deferring and using `topic`/`title` in J4.
43. J2/J3 architecture sufficient: yes.
44. **AIC-J4 — SAFE TO BUILD.**

## E. Correction to note

`TTCAskCompanionCard` uses `ttcAskChipsFor`, not the J3 registry. It is a content/moment chip source, so it does not violate J3 authority, but J4-4 should keep personal-lifecycle starters coming from `journeySuggestions.ts` only.

## F. Files that must remain untouched

`supabase/functions/**`, `ai-search`, prompt renderers, AIC-5 modules, grounding, memory, conversation runtime internals, voice modules, `journeySuggestions.ts` logic, `useCompanionPersonalJourney` J2 semantics, generated Supabase files.
