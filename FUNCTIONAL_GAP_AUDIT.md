# Functional Gap Audit

Date: 19 July 2026

## Remediation status — 20 July 2026

All confirmed Critical, High, Medium, and Low code findings in this audit have been remediated on `codex/fix-functional-gap-audit`. The detailed sections below retain the original findings and evidence as a historical baseline; their line references describe the pre-remediation implementation and are not current defect locations.

| Area | Status | Remediation delivered |
|---|---|---|
| Pregnancy weeks and editorial routes | Resolved | Shared working reflection/AI controls across weeks 1–42 and the generic week route; repaired article destinations, strict week validation, correct week-42 transition, active legacy/stage/support/preparing/postpartum controls, and explicit Not Found recovery. |
| Privacy, legal, and purchase flows | Resolved | Added Privacy, Terms, Journal routing, a configurable external Amazon destination with a safe fallback, and corrected all journal/product calls to action. |
| Calculators and date handling | Resolved | Corrected cycle-length arithmetic, added ultrasound weeks-plus-days support, bounded and validated URL/form input, removed stale result state, used local date-only helpers, and corrected fertile-window semantics. |
| Authentication and journey routing | Resolved | Added TTC-aware login/navigation, strict returning-user sign-in, visible retry/error states, safe return targets, and atomic pregnancy/TTC lifecycle RPCs with conflict protection. |
| Authenticated dashboards | Resolved | Added labelled loading/error/retry states, durable reflection flush/retry, compensating photo updates, complete TTC log loading, future-date rejection, reliable sign-out, settings, export, journey removal, and account deletion. |
| AI privacy and safety | Resolved in code | Questions now travel in router memory rather than URLs; analytics strips queries; requests validate method/schema/size, cancel correctly, flush SSE tails, retain follow-up context, rate-limit public access, restrict CORS, fetch current NHS evidence, fail closed without evidence, and no longer claim fabricated medical review. |
| Reflection AI | Resolved | Enforced JWT, method/schema/length/week validation, restricted CORS, provider output validation, cancellation, and transparent third-party-processing copy. |
| Email processing | Resolved | Added the missing queue bootstrap functions, atomic claims/completion, idempotency, payload validation, bounded retry/dead-letter handling, and valid queue status transitions. |
| Data lifecycle | Resolved | Added atomic database functions, cascading user-data foreign keys, authenticated JSON export, active-journey removal, storage cleanup, and auth-account deletion. |
| Reliability, security, and delivery | Resolved | Removed tracked secrets and Bun lockfiles, standardised npm, upgraded the Vite/Vitest toolchain, added an application error boundary, CI, focused tests, browser smoke tests, and route-level lazy loading. |

### Verification performed

- `npm run lint -- --max-warnings=0`
- `npm run typecheck`
- `npm test` — 17 tests passed
- `npm run build` — 295 sitemap entries and a successful Vite 8 production build
- `npx playwright test` — 11 Chromium browser tests passed
- `npm audit --audit-level=low` — 0 vulnerabilities
- `npx supabase db reset --local` — a clean database successfully replayed every committed migration

The production deployment still needs the normal operational steps: deploy the new migrations and Edge Functions, configure server-side secrets and allowed origins, set the exact journal listing URL, and complete clinical/content and user-acceptance review. Those are release controls, not open code defects.

## Scope and method

This is a static functional audit of the current repository. It covers all 133 routes registered in `src/App.tsx`, their 128 page modules and shared rendered templates, the authenticated journey flows, core persistence and analytics functions, and all three deployed Supabase Edge Functions.

The review was split into independent passes for public/editorial pages, all 42 explicit pregnancy-week pages plus the generic fallback, calculators/authentication/backend functions, and authenticated dashboards. Findings were cross-checked against route registrations, article data, Supabase migrations, and shared components.

“No additional confirmed gap” means that static inspection did not establish a broken route, inactive control, missing state transition, or unhandled data state in that page's rendered path. It does not establish clinical correctness and does not replace browser, deployed-database, accessibility, or user-acceptance testing.

## Severity

- **Critical:** can materially mislead users, produce medically significant incorrect output, prevent the primary commercial operation, corrupt core processing, or create a severe safety/trust failure.
- **High:** breaks a primary user journey, loses user data, creates material inconsistency, or exposes a major operational failure.
- **Medium:** produces incorrect, stale, confusing, or incomplete behaviour with a workaround.
- **Low:** a contained recovery or consistency problem.

## Executive findings

1. AI answers are falsely presented as medically reviewed, while the generation function has no enforceable grounding, citation, emergency-triage, or clinical-review mechanism.
2. The due-date calculator applies cycle-length correction in the wrong direction.
3. Every explicit week page has a reflection control that loses entered text and an AI input that cannot submit. Forty of the 42 pages also link to missing article slugs.
4. Returning TTC users are routed into the pregnancy flow because post-login and global navigation check only pregnancy state.
5. The product page's purchase CTAs are placeholder `#` links, so the advertised purchase journey does not work.
6. Reflection, photo, TTC, pregnancy, and email writes contain partial-failure paths that can lose data, duplicate work, or leave records inconsistent.
7. Many Supabase read failures are treated as empty data, missing journeys, signed-out state, or blank full-page loading states.
8. The public AI function has no authentication, quota, request-size, or robust input validation.

## Cross-cutting functional gaps

### FG-01 — Private AI questions become URL state

**Severity: High.** Public AI entry points place full questions in `/ask?q=...`. The URL is stored in browser history, can be copied or shared, and is also passed to page analytics with the query string.

Evidence: [`AISearchBar`](src/components/shared/AISearchBar.tsx#L33), [`TTCHub`](src/pages/TTCHub.tsx#L434), [`StagePage`](src/pages/StagePage.tsx#L429), [`RouteTracker`](src/components/analytics/RouteTracker.tsx#L42), and [`buildEnvelope`](src/lib/analytics.ts#L133).

Affected surfaces include Pregnancy, TTC, IVF, First Year, Toddler, Family, Support, Preparing, stage pages, articles, and the Ask page.

### FG-02 — Missing legal and journal routes

**Severity: High.** The consent banner links to `/privacy`, and several calls to action link to `/journal`, but neither route exists. Authentication also states that users accept terms without providing a terms destination.

Evidence: [`ConsentBanner`](src/components/consent/ConsentBanner.tsx#L46), [`IVFFinalCTA`](src/components/ivf/IVFFinalCTA.tsx#L111), [`DueDateCalculatorResult`](src/components/shared/DueDateCalculatorResult.tsx#L1077), [`Auth`](src/pages/Auth.tsx#L356), and the route table in [`App`](src/App.tsx#L345).

### FG-03 — Failure states are routinely collapsed into normal states

**Severity: High.** Auth and Supabase failures are frequently interpreted as signed out, missing profile, absent journey, empty log list, or no content. Several pages then redirect or remain as an unlabelled blank screen. This prevents recovery and can cause users to overwrite or recreate existing data.

Affected pages include Auth, Setup, Setup TTC, My Week, My Journey, My TTC Journey, Kept Chapter, Due Date Results, and IVF Timeline.

### FG-04 — Date-only values are treated as UTC timestamps

**Severity: Medium.** TTC and pregnancy date-only strings are parsed with `new Date("yyyy-MM-dd")` or written with `toISOString().slice(0, 10)`. Depending on time zone, a user's selected calendar date can shift by one day.

Evidence: [`savedJourney`](src/lib/savedJourney.ts#L160), [`MyTTCJourney`](src/pages/MyTTCJourney.tsx#L99), and [`OvulationResult`](src/components/ttc/OvulationResult.tsx#L71).

## Page-by-page findings

### Home, navigation, corporate and recovery pages

| Page or route | Severity | Confirmed functional gap |
|---|---:|---|
| `/` — `Index` | — | No additional page-specific gap confirmed. Shared AI URL leakage and global navigation gaps still apply. |
| Global `Navbar` | High | Authenticated CTA always goes to `/my-week`, even for active TTC users ([evidence](src/components/layout/Navbar.tsx#L80)). |
| `/about` | — | No additional confirmed functional gap. |
| `/product` | Critical | All primary Amazon/purchase CTAs are placeholder `href="#"` links ([hero](src/components/product/ProductHero.tsx#L71), [inline](src/components/product/ProductInlineCTA.tsx#L22), [final](src/components/product/ProductFinalCTA.tsx#L63)). |
| `*` — `NotFound` | Low | “Return home” and “Explore your journey” both navigate to `/`, so the second recovery action is redundant ([evidence](src/pages/NotFound.tsx#L31)). |
| `/postpartum` redirect | Medium | Redirects to `/first-year#recovery`, but the rendered target is `#recovery-topics`; users do not land at the intended section ([route](src/App.tsx#L289), [target](src/components/firstyear/new/FYTopicClusters.tsx#L134)). |

### Pregnancy hubs, topics and trimester pages

No additional page-specific functional gap was confirmed for:

- `/pregnancy`
- `/pregnancy/body`
- `/pregnancy/baby`
- `/pregnancy/health-and-safety`
- `/pregnancy/diet-and-exercise`
- `/pregnancy/preparing-for-baby`
- `/pregnancy/feelings`
- `/pregnancy/first-trimester`
- `/pregnancy/second-trimester`
- `/pregnancy/third-trimester`

The shared AI-question URL issue applies wherever those pages mount the shared AI entry component.

### Pregnancy week pages 1–42

Every explicit week page has both of these **High** functional gaps:

1. The reflection textarea is uncontrolled and “Save reflection” is only a link to `/auth`. Typed text is not persisted or carried through authentication.
2. The AI input has no state, form, button, or keyboard handler. Suggestion chips navigate to bare `/ask`, discarding both the selected question and week context.

Representative evidence: [week 1](src/pages/Week1Page.tsx#L526), [week 8](src/pages/Week8Page.tsx#L660), [week 20](src/pages/Week20Page.tsx#L699), [week 28](src/pages/Week28Page.tsx#L712), [week 36](src/pages/Week36Page.tsx#L714), and [week 42](src/pages/Week42Page.tsx#L737).

Forty of the 42 explicit pages also have **High** stale article targets. Unknown `/articles/:slug` values redirect silently to home, so users clicking these cards appear to be unexpectedly sent to the homepage. Weeks 8 and 20 are the only pages whose inspected direct and related article targets all resolve.

| Week routes audited | Reflection/AI controls | Missing article slugs |
|---|---:|---:|
| 1 | Broken | 5 |
| 2 | Broken | 5 |
| 3 | Broken | 6 |
| 4 | Broken | 2 |
| 5 | Broken | 6 |
| 6 | Broken | 7 |
| 7 | Broken | 7 |
| 8 | Broken | 0 |
| 9 | Broken | 6 |
| 10 | Broken | 6 |
| 11 | Broken | 6 |
| 12 | Broken | 2 |
| 13–19 | Broken on every page | 6 per page |
| 20 | Broken | 0 |
| 21–42 | Broken on every page | 6 per page |

Examples of stale targets include `/articles/early-pregnancy-symptoms`, `/articles/first-trimester-nausea`, multiple `second-trimester-*` and `third-trimester-*` slugs, and `/articles/early-signs-of-labour`.

Verified working across all explicit week pages: route registration, previous/next sequencing, week-specific SEO mounting, literal on-page anchors, and FAQ toggle state.

#### Generic `/pregnancy/week/:week`

**High:** The fallback repeats the nonfunctional reflection and AI controls ([evidence](src/pages/WeekPage.tsx#L817)).

**Medium:** `parseInt` accepts aliases such as `01`, `1abc`, and `1.5`, producing duplicate/inconsistent week-one pages rather than rejecting or canonicalising them ([evidence](src/pages/WeekPage.tsx#L339)).

**Low:** Generic week 42 links back to the third trimester, whereas explicit week 42 transitions to postpartum ([generic](src/pages/WeekPage.tsx#L971), [explicit](src/pages/Week42Page.tsx#L962)).

### Articles

| Page or route | Severity | Confirmed functional gap |
|---|---:|---|
| `/articles/:slug` | High | Unknown slugs silently redirect to `/` instead of rendering Not Found, hiding broken content links ([evidence](src/pages/ArticlePage.tsx#L14)). This combines with stale links on 40 week pages. |
| `ArticleLegacyPage` renderer | — | No additional renderer-specific gap confirmed beyond its parent route's unknown-slug behaviour. |
| `/family/:topic/:slug` | — | No additional confirmed gap; unknown records render Not Found. |
| `/first-year/:topic/:slug` | — | No additional confirmed gap; unknown records render Not Found. |
| `/toddler/:topic/:slug` | — | No additional confirmed gap; unknown records render Not Found. |

### TTC pages

| Page or route | Severity | Confirmed functional gap |
|---|---:|---|
| `/trying-to-conceive` | High | Free-text AI questions are placed in the URL; this route also inherits returning-TTC navigation failures. |
| `/trying-to-conceive/legacy` | High | Reflection text is neither controlled nor persisted; “Capture this” has no handler ([evidence](src/components/ttc/TTCReflection.tsx#L62)). |
| `/trying-to-conceive/legacy` | Medium | “Explore the journal” incorrectly navigates home ([evidence](src/components/ttc/TTCCapture.tsx#L39)). |
| `/trying-to-conceive/ovulation-calculator` | — | Query-preserving redirect to the canonical calculator is correctly implemented. |
| TTC topic pages | — | No additional page-specific gap confirmed for ovulation, preconception health, fertility, IVF/treatment, male fertility, age/fertility, cycle tracking, pregnancy tests, two-week wait, or conditions. Shared AI URL leakage applies. |

### Ovulation calculator

| Severity | Confirmed functional gap |
|---:|---|
| High | Direct URL parameters bypass form validation; invalid dates and cycle lengths can produce crashes or nonsensical windows ([evidence](src/pages/OvulationCalculator.tsx#L416)). |
| Medium | Period date has a maximum but no plausible lower bound ([evidence](src/pages/OvulationCalculator.tsx#L161)). |
| Medium | UTC serialization can shift a selected date by one day ([evidence](src/components/ttc/OvulationResult.tsx#L71)). |
| Low | The implementation includes the day after ovulation while explanatory copy describes leading days plus ovulation day ([calculation](src/pages/OvulationCalculator.tsx#L423), [copy](src/pages/OvulationCalculator.tsx#L217)). |

### IVF pages

| Page or route | Severity | Confirmed functional gap |
|---|---:|---|
| `/ivf` | High | “Hold your IVF journey” points to nonexistent `/journal` ([evidence](src/components/ivf/IVFFinalCTA.tsx#L111)). |
| `/ivf` | Medium | Transfer date rejects future dates but has no plausible lower bound ([evidence](src/components/ivf/IVFHero.tsx#L88)). |
| `/ivf-timeline` | High | Invalid, future, and implausibly old timestamps are accepted. Future transfers are clamped to zero days post-transfer and described as already transferred ([parser](src/pages/IVFTimeline.tsx#L22), [clamp](src/components/ivf/IVFTimelineResult.tsx#L271)). |
| `/ivf-timeline` | Medium | Removing/invalidating date or type parameters can leave the prior date/type in component state ([evidence](src/pages/IVFTimeline.tsx#L22)). |
| IVF stage/topic pages | — | No additional page-specific gap confirmed for before transfer, after transfer, or early pregnancy. Shared AI behaviour applies. |

### First Year pages

| Page family | Severity | Confirmed functional gap |
|---|---:|---|
| `/first-year` | — | No additional page-specific gap beyond shared AI URL handling and the broken postpartum anchor. |
| Four age-phase pages | Medium | Cards labelled “Read guidance” open AI questions rather than guidance articles ([evidence](src/components/firstyear/phase/FirstYearPhasePage.tsx#L248)). |
| Eight First Year topic pages | — | No additional page-specific functional gap confirmed. |

Explicit age-phase coverage: `/first-year/0-3-months`, `/3-6-months`, `/6-9-months`, and `/9-12-months`.

Explicit topic coverage: feeding, sleep, development, care and safety, postpartum recovery, emotional wellbeing, body and hormones, and checkups/warning signs.

### Toddler pages

No additional page-specific functional gap was confirmed for the toddler hub; development/milestones, behaviour/emotions, speech/language, sleep, food/feeding, potty learning, health/safety, and play/connection topic pages; or the 12–17 month, 18–23 month, 2 year, 30 month, and 3 year age pages. Shared AI URL handling still applies.

### Family pages

No additional page-specific functional gap was confirmed for the Family hub or its growing families, relationships, family basics, health/safety, travel/days out, and play/connection topic pages. Shared AI URL handling still applies.

### Preparing, Support, Postpartum legacy and generic stage pages

| Page or route | Severity | Confirmed functional gap |
|---|---:|---|
| `/preparing-for-baby` | High | Both hero CTAs are inert buttons ([evidence](src/components/preparing/PreparingHero.tsx#L36)). |
| `/preparing-for-baby` | High | Reflection choices only change styling; textarea and capture button do not persist anything ([evidence](src/components/preparing/PreparingReflection.tsx#L30)). |
| `/preparing-for-baby` | Medium | Journal CTA navigates home rather than to `/product` ([evidence](src/components/preparing/PreparingCapture.tsx#L28)). |
| `/support` | High | Reflection capture has no state or persistence ([evidence](src/components/support/SupportReflection.tsx#L27)). |
| `/support` | Medium | AI prompt chips are inert spans ([evidence](src/components/support/SupportAISupport.tsx#L25)). |
| `/support` | Medium | “Choose the thought” cards all scroll to the same section without carrying the selected prompt ([evidence](src/components/support/SupportStartHere.tsx#L43)). |
| `/support` | Medium | Journal CTA is `href="#"` ([evidence](src/components/support/SupportCapture.tsx#L24)). |
| `/postpartum/legacy` | High | Both primary hero buttons are inert ([evidence](src/components/postpartum/PostpartumHero.tsx#L58)). |
| `/postpartum/legacy` | High | Reflection capture is uncontrolled and has no handler ([evidence](src/components/postpartum/PostpartumReflection.tsx#L57)). |
| `/postpartum/legacy` | Medium | Journal CTA navigates home ([evidence](src/components/postpartum/PostpartumCapture.tsx#L43)). |
| `/:journey/:stage` | High | Every rendered generic stage reflection textarea is uncontrolled and “Capture this thought” has no handler ([evidence](src/pages/StagePage.tsx#L468)). |

### Ask page

| Severity | Confirmed functional gap |
|---:|---|
| Critical | Generated answers are presented as “Medically reviewed” and explicitly attributed to Jenny Joines ([evidence](src/pages/AskPage.tsx#L604)). |
| High | Follow-up prompts such as “Can you explain that more?” do not include the prior question or answer, so the model lacks the referent ([definition](src/pages/AskPage.tsx#L13), [navigation](src/pages/AskPage.tsx#L325)). |
| High | A second request does not cancel the first stream; concurrent streams can overwrite/interleave answer state ([evidence](src/hooks/useAISearch.ts#L9)). |
| Medium | Changing stage/week context while retaining the same question does not regenerate the answer ([evidence](src/pages/AskPage.tsx#L306)). |
| Medium | A final SSE record without a newline is dropped ([evidence](src/hooks/useAISearch.ts#L39)). |

### Authentication and setup pages

| Page or route | Severity | Confirmed functional gap |
|---|---:|---|
| `/auth` | High | Post-login resolver recognises pregnancy only; ordinary TTC sign-in falls through to `/due-date-calculator` ([evidence](src/lib/authIntent.ts#L68)). |
| `/auth` | High | Pending-pregnancy commit failures are logged and routing continues as if saving succeeded ([evidence](src/pages/Auth.tsx#L44)). |
| `/auth` | Medium | Session and destination lookup failures have no user-visible recovery path ([evidence](src/pages/Auth.tsx#L62)). |
| `/auth` | Medium | “Sign in” unconditionally permits creating a new account, so an email typo can create a separate empty account ([evidence](src/pages/Auth.tsx#L112)). |
| `/auth` | Medium | Terms acceptance copy has no terms link ([evidence](src/pages/Auth.tsx#L356)). |
| `/setup` | High | Pending journey commit failure is ignored; the user is still sent to `/my-week` ([evidence](src/pages/Setup.tsx#L26)). |
| `/setup` | Medium | Session/profile failures are treated as ordinary missing state ([evidence](src/pages/Setup.tsx#L16)). |
| `/setup` | Medium | Form can be submitted before authentication loading completes; handler silently returns ([evidence](src/pages/Setup.tsx#L45)). |
| `/setup` | Low | First name has no application-level length limit ([evidence](src/pages/Setup.tsx#L84)). |
| `/setup/trying-to-conceive` | High | Active-pregnancy detection can fail open if the pointer lookup errors ([page](src/pages/SetupTTC.tsx#L90), [function](src/lib/savedTTCJourney.ts#L101)). |
| `/setup/trying-to-conceive` | High | TTC payload and lifecycle pointer are separate writes and can disagree ([evidence](src/lib/savedTTCJourney.ts#L117)). |
| `/setup/trying-to-conceive` | High | Last-period validation checks only for non-empty text, not a valid/plausible date ([evidence](src/pages/SetupTTC.tsx#L20)). |
| `/setup/trying-to-conceive` | Medium | Malformed pending local data can throw inside loading and leave a blank page ([read](src/lib/savedTTCJourney.ts#L76), [format](src/pages/SetupTTC.tsx#L76)). |
| `/setup/trying-to-conceive` | Medium | Conflict copy says TTC would replace pregnancy, while implementation refuses the save ([copy](src/pages/SetupTTC.tsx#L198), [logic](src/lib/savedTTCJourney.ts#L101)). |
| `/setup/trying-to-conceive` | Medium | UI promises removal later, but no journey removal action exists ([evidence](src/pages/SetupTTC.tsx#L240)). |

### Due date pages

| Page or route | Severity | Confirmed functional gap |
|---|---:|---|
| `/due-date-calculator` | Critical | Cycle correction has the wrong sign: longer cycles produce earlier due dates ([form](src/components/shared/DueDateCalculatorForm.tsx#L129), [result](src/components/shared/DueDateCalculatorResult.tsx#L172)). |
| `/due-date-calculator` | High | Ultrasound bounds are only HTML constraints; calculation logic accepts any numeric value ([evidence](src/components/shared/DueDateCalculatorForm.tsx#L114)). |
| `/due-date-calculator` | Medium | Valid-looking inputs outside the 300-day guard fail with no explanation ([evidence](src/components/shared/DueDateCalculatorForm.tsx#L140)). |
| `/due-date-calculator` | Medium | Ultrasound dating accepts only weeks, not weeks plus days ([evidence](src/components/shared/DueDateCalculatorForm.tsx#L229)). |
| `/due-date-results` | High | Arbitrary timestamps are accepted without date validity or plausible pregnancy bounds ([evidence](src/pages/DueDateResults.tsx#L15)). |
| `/due-date-results` | Medium | Removing/invalidating the URL parameter can retain the previous result ([evidence](src/pages/DueDateResults.tsx#L15)). |
| `/due-date-results` | Medium | Future and very old inputs are clamped to weeks 1 and 40, disguising invalid input as a legitimate result ([evidence](src/components/shared/DueDateCalculatorResult.tsx#L172)). |
| `/due-date-results` | High | Journal CTA points to missing `/journal` ([evidence](src/components/shared/DueDateCalculatorResult.tsx#L1077)). |

## Authenticated pages

### `/my-week`

- **High:** Session, profile, and journey errors are ignored. A failed journey read is treated as no journey and redirects to the calculator ([evidence](src/pages/MyWeek.tsx#L61)).
- **High:** Reflection autosave waits 900 ms and cleanup cancels the pending write; quick navigation loses the latest text ([evidence](src/components/myweek/SlotReflection.tsx#L101)).
- **High:** Initial reflection read errors are treated as an empty editable reflection, risking overwrite of an existing record ([evidence](src/components/myweek/SlotReflection.tsx#L76)).
- **Medium:** Save failure does not retry, while UI text says the words are “still saving” ([evidence](src/components/myweek/SlotReflection.tsx#L226)).
- **High:** Photo replacement deletes the old object before the new upload succeeds ([evidence](src/components/myweek/SlotPhotoMemory.tsx#L81)).
- **High:** Upload success followed by metadata failure leaves an orphan; removal ignores both storage and database errors before clearing the UI ([evidence](src/components/myweek/SlotPhotoMemory.tsx#L98)).
- **Medium:** Signed URL failure is presented as an empty photo state ([evidence](src/components/myweek/SlotPhotoMemory.tsx#L46)).
- **Medium:** After an upload, a missing signed URL produces `state="loaded"` with no render branch; initial photo-load errors also provide no retry control ([evidence](src/components/myweek/SlotPhotoMemory.tsx#L110)).
- **Medium:** Accepting an AI-shaped reflection can fail silently because the child clears its draft without awaiting the parent's database write ([parent](src/components/myweek/SlotReflection.tsx#L196), [child](src/components/myweek/NoteShapingSuggestion.tsx#L94)).
- **Medium:** Loading and unresolved states are an unlabelled blank full-screen surface ([evidence](src/pages/MyWeek.tsx#L110)).
- **Low:** Sign-out navigates home even when Supabase sign-out fails, potentially leaving the session active ([evidence](src/components/myweek/MyWeekHeader.tsx#L32)).

### `/my-journey`

- **High:** Profile, journey, reflections, and photo-query errors are ignored. Missing/failed journey reads redirect to the calculator; failed content reads silently produce an empty memory collection ([evidence](src/pages/MyJourney.tsx#L58)).
- **Medium:** Loading and rejected async work can leave an unlabelled blank full-screen page ([evidence](src/pages/MyJourney.tsx#L143)).

### `/my-week/:week` — Kept Chapter

- **High:** Six data reads ignore their error results. A service failure can redirect the user, omit saved content, or show a chapter without its photo ([evidence](src/pages/KeptChapter.tsx#L74)).
- **Medium:** Signed URL failure is treated as no photo ([evidence](src/pages/KeptChapter.tsx#L118)).
- **Medium:** Any past week can be opened as a “Kept chapter” even if it is not in the saved `keptWeeks` set; a crafted route renders an empty chapter ([evidence](src/pages/KeptChapter.tsx#L111)).
- **Medium:** Loading/rejected work renders an unlabelled blank full-screen page ([evidence](src/pages/KeptChapter.tsx#L159)).
- **Low:** Invalid week values redirect to My Journey rather than explaining that the chapter does not exist ([evidence](src/pages/KeptChapter.tsx#L68)).
- **Low:** The one-hour signed photo URL is never renewed on a long-open chapter ([evidence](src/pages/KeptChapter.tsx#L118)).

### `/my-ttc-journey`

- **High:** Pointer and journey read failures are not distinguished from absent data; the page can show an empty setup state ([evidence](src/pages/MyTTCJourney.tsx#L46)).
- **High:** TTC log fetch failures are swallowed and displayed as an empty log set ([evidence](src/pages/MyTTCJourney.tsx#L77)).
- **High:** Only the 30 most recent logs are loaded while the calendar permits arbitrary month navigation; older markers disappear and insights use the same incomplete subset ([page](src/pages/MyTTCJourney.tsx#L77), [calendar](src/components/ttc/journey/TTCJourneyCalendar.tsx#L89)).
- **Medium:** Date-only values are parsed as UTC and can shift day/stage calculations ([evidence](src/pages/MyTTCJourney.tsx#L94)).
- **Medium:** Future calendar days can open the log panel, and save logic/database constraints do not reject future log dates ([calendar](src/components/ttc/journey/TTCJourneyCalendar.tsx#L106), [panel](src/components/ttc/journey/TTCLogEntryPanel.tsx#L83)).
- **Medium:** A successful log write can close with a success toast while the visible list stays stale if the swallowed refetch fails ([evidence](src/pages/MyTTCJourney.tsx#L112)).
- **Medium:** Loading is an unlabelled blank page ([evidence](src/pages/MyTTCJourney.tsx#L145)).
- **Medium:** Sign-out/account controls are available only in the pregnancy-specific My Week header, not this dashboard or the global authenticated navigation.
- **Medium:** The dashboard provides no TTC journey removal control despite product copy promising later removal.

### Shared protected route

- **High:** Resolved `getSession()` errors become anonymous state, while a rejected promise has no handler and can leave checking active forever ([evidence](src/components/auth/ProtectedRoute.tsx#L21)).
- **Medium:** The complete current query string is copied into the authentication `return_to` URL, preserving potentially sensitive route data through auth/history ([evidence](src/components/auth/ProtectedRoute.tsx#L47)).
- **Medium:** Authentication checking is an unlabelled blank full-screen page ([evidence](src/components/auth/ProtectedRoute.tsx#L43)).

## Core function audit

### Journey and authentication functions

| Function | Severity | Confirmed gap |
|---|---:|---|
| `resolvePostLoginDestination` | High | Does not check `getActiveTTCJourney`; falls back to pregnancy calculator ([evidence](src/lib/authIntent.ts#L68)). |
| `upsertPregnancyJourney` | High | Pregnancy row, active pointer, and legacy mirror are separate writes; partial failure leaves inconsistent state ([evidence](src/lib/savedJourney.ts#L79)). |
| `commitPendingTTCJourney` | High | TTC row and lifecycle pointer are non-transactional; pointer-read failure can fail open ([evidence](src/lib/savedTTCJourney.ts#L101)). |
| `getActivePregnancyJourney` | Medium | Date-only database strings are constructed with `new Date`, allowing timezone shifts ([evidence](src/lib/savedJourney.ts#L135)). |
| `getActiveTTCJourney` consumers | Medium | Error and absence are collapsed into the same nullable result in primary flows. |

No internal correctness gap was confirmed in `buildAuthUrl` or `isSafeReturnTo`; they constrain return destinations to local routes. The gap is the sensitive query data some callers choose to preserve.

No internal arithmetic defect was confirmed in `deriveTTCDates`, `computeTTCStage`, or `cycleDayFrom` when they receive valid local calendar dates and bounded cycle values. Their practical failures originate at callers that pass unvalidated or UTC-shifted dates.

The TTC log create/update/delete helpers retain user and journey filters. The dashboard-level gaps are incomplete 30-record loading, swallowed refetch errors, and missing future-date validation.

### AI client and analytics functions

| Function | Severity | Confirmed gap |
|---|---:|---|
| `useAISearch.ask` | High | Does not cancel previous/in-flight requests; concurrent streams update the same state ([evidence](src/hooks/useAISearch.ts#L9)). |
| SSE parsing loop | Medium | Does not flush or parse final buffered data on stream completion ([evidence](src/hooks/useAISearch.ts#L39)). |
| `useAISearch.reset` | Medium | Clears UI state without cancelling provider/network work ([evidence](src/hooks/useAISearch.ts#L72)). |
| `RouteTracker` | High | Sends pathname plus search parameters, including free-text AI questions ([evidence](src/components/analytics/RouteTracker.tsx#L42)). |
| `buildEnvelope` | High | Independently captures `window.location.search`, duplicating the sensitive query exposure ([evidence](src/lib/analytics.ts#L133)). |

### Reflection and photo functions

| Function | Severity | Confirmed gap |
|---|---:|---|
| Reflection hydration | High | Query errors are ignored and existing content can appear empty ([evidence](src/components/myweek/SlotReflection.tsx#L76)). |
| Debounced reflection save | High | Cleanup cancels an unsaved edit; no flush on navigation/unload ([evidence](src/components/myweek/SlotReflection.tsx#L101)). |
| `acceptShapedDraft` | Medium | Failed upsert produces no user feedback ([evidence](src/components/myweek/SlotReflection.tsx#L196)). |
| Photo upload | High | Deletes the prior object before replacement succeeds; DB failure leaves an orphan ([evidence](src/components/myweek/SlotPhotoMemory.tsx#L81)). |
| `handleRemove` | High | Ignores deletion errors and clears local state regardless ([evidence](src/components/myweek/SlotPhotoMemory.tsx#L121)). |

## Supabase Edge Functions

### `ai-search`

| Severity | Confirmed functional gap |
|---:|---|
| Critical | Prompt mandates a named medical-review sign-off for every unreviewed response ([evidence](supabase/functions/ai-search/index.ts#L48)). |
| Critical | Health guidance has no enforceable grounding, citations, emergency policy, or clinical validation; requests go directly to a general model ([evidence](supabase/functions/ai-search/index.ts#L81)). |
| High | JWT verification is disabled and there is no local rate limit or quota ([config](supabase/config.toml#L3), [handler](supabase/functions/ai-search/index.ts#L67)). |
| High | Method, schema, types, length, and empty-query validation are absent ([evidence](supabase/functions/ai-search/index.ts#L67)). |
| High | User-controlled context is concatenated directly into the model prompt ([evidence](supabase/functions/ai-search/index.ts#L77)). |
| Medium | Client disconnect does not cancel the upstream provider request ([evidence](supabase/functions/ai-search/index.ts#L81)). |

### `ai-reflect`

| Severity | Confirmed functional gap |
|---:|---|
| High | No maximum reflection length; week has no type/range validation ([evidence](supabase/functions/ai-reflect/index.ts#L32)). |
| Medium | Non-POST methods are accepted and invalid methods/JSON become generic server errors ([evidence](supabase/functions/ai-reflect/index.ts#L27)). |
| Medium | Empty/malformed provider success can return HTTP 200 with an empty draft ([evidence](supabase/functions/ai-reflect/index.ts#L85)). |
| Medium | “Editor only” output constraints exist only in the prompt and are not validated on response ([evidence](supabase/functions/ai-reflect/index.ts#L13)). |
| High | Private reflection text is sent to an external AI while the UI says “Only you see the result” without explaining third-party processing ([client](src/components/myweek/NoteShapingSuggestion.tsx#L73), [copy](src/components/myweek/NoteShapingSuggestion.tsx#L142)). |

### `process-email-queue`

| Severity | Confirmed functional gap |
|---:|---|
| Critical | Worker writes status `rate_limited`, which violates the database status constraint; insert error is ignored ([worker](supabase/functions/process-email-queue/index.ts#L300), [constraint](supabase/migrations/20260421114636_email_infra.sql#L79)). |
| Critical | Migration grants reference `email_queue_dispatch()` and `email_queue_wake()` functions that no committed migration creates ([grant migration](supabase/migrations/20260705194258_92b6877b-2f4a-467a-b760-1f07c9da2b88.sql#L6), [dynamic setup note](supabase/migrations/20260421114636_email_infra.sql#L272)). |
| High | TTL fallback expects `enqueued_at`, but the receive RPC does not return it ([worker](supabase/functions/process-email-queue/index.ts#L200), [RPC](supabase/migrations/20260421114636_email_infra.sql#L143)). |
| High | Provider send, audit insertion, and queue deletion are separate and insert/delete errors can cause missing audit or duplicate sends ([evidence](supabase/functions/process-email-queue/index.ts#L251)). |
| High | Duplicate protection is check-then-send; concurrent workers can both call the provider before the unique sent-log constraint is reached ([evidence](supabase/functions/process-email-queue/index.ts#L225)). |
| Medium | Failed-attempt log errors are ignored, so retry counts can remain low indefinitely ([evidence](supabase/functions/process-email-queue/index.ts#L337)). |
| Medium | Queue payload fields are forwarded without validation before provider delivery ([evidence](supabase/functions/process-email-queue/index.ts#L192)). |

## Confirmed working behaviour

- All explicit pregnancy week routes 1–42 are registered and their previous/next links are correctly sequenced.
- Week-specific SEO numbers, literal section anchors, and FAQ open/close state are wired correctly.
- The duplicate TTC ovulation calculator route preserves its query string when redirecting to the canonical route.
- Family, First Year, and Toddler article templates render Not Found for unknown records.
- The inspected user-owned Supabase tables use user-scoped RLS policies; no cross-user read was established in this audit.
- The application currently typechecks and produces a production build.

## Recommended remediation sequence

1. Remove fabricated medical-review claims and introduce governed, grounded health-answer safety and escalation behaviour.
2. Remove questions from URLs/analytics; authenticate and rate-limit AI endpoints.
3. Fix the due-date formula and add deterministic calculator/date test suites.
4. Repair all week-page reflection, AI, and stale article-link flows from a shared implementation.
5. Repair TTC-aware post-login/global navigation and make journey switching explicit.
6. Replace placeholder purchase, journal, privacy, terms, hero, reflection, and support interactions.
7. Make journey, reflection, photo, and email mutations transactional or compensating and surface recoverable failures.
8. Validate every URL/local-storage/date/function payload at its trust boundary.
9. Add explicit loading, empty, failure, retry, and offline states to authenticated pages.
10. Add page-level integration tests and end-to-end coverage for every critical route family and Edge Function.

## Validation still required

- Browser execution of every route at mobile and desktop sizes.
- Deployed Supabase RLS, function-secret, rate-limit, storage, and migration-reset verification.
- Clinical review of health copy and AI escalation behaviour.
- End-to-end Amazon/product destination confirmation.
- User-acceptance testing of TTC/pregnancy switching and private-data deletion/export.
