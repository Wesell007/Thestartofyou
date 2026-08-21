# Phase 27A — Pregnancy Journal Bridge Strategy and UX Audit

Discovery and strategy only. No code changed, no assets added, no journal pages imported.

## 1. Current signed-in pregnancy route inventory

| Route | Page file | What it does |
|---|---|---|
| `/my-week` | `src/pages/MyWeek.tsx` | The weekly chapter. Loads profile plus active pregnancy journey, computes current week, renders hero, baby/body/emotional sections, one focus, Ask AI, tools, weekly reads, keep-this-week capture, next chapter. Handles paused, loss, given-birth states. |
| `/my-week/:week` | `src/pages/KeptChapter.tsx` | A single kept week revisited. |
| `/my-journey` | `src/pages/MyJourney.tsx` | Journey overview: hero, trimester rail and timeline, current chapter, moments kept, kept weeks, photo journal, reflection highlights, toolkit entry, looking ahead, memory film. |
| `/pregnancy-toolkit` (+ 8 sub-routes) | `src/pages/PregnancyToolkit*.tsx` | Birth plan, hospital bag, appointments (+editor), baby movements, contraction timer, symptom notes, questions for midwife. |
| `/my-pregnancy-chapter` | `src/pages/firstyear/MyPregnancyChapter.tsx` | Read-only kept pregnancy chapter for First Year users. |
| `/due-date-calculator`, `/setup` | Calculator and setup | Journey creation entry points. |
| `/journal` | `src/pages/Product.tsx` | The public physical journal page (`/product` redirects here). |

## 2. Component and hook inventory

Weekly experience (`src/components/myweek/`): `MyWeekHeader`, `MyWeekFooter`, `SectionHero`, `SectionBabyThisWeek`, `SectionBodyThisWeek`, `SectionEmotionallyThisWeek`, `SlotOneFocus`, `SectionAskAI` (inline Cindy), `SectionToolsThisWeek` (contextual toolkit cards), `SectionWeeklyReads`, `SectionKeepThisWeek` (wraps `SlotReflection`, `SlotPhotoMemory`, `SlotVideoMemory`, `SlotVoiceMemory`), `SectionNextChapter`, plus lifecycle states `SectionPregnancyComplete`, `SectionJourneyPaused`, `SectionJourneyQuiet`.

Journey overview (`src/components/myjourney/`): `JourneyHero`, `TrimesterRail`, `TrimesterTimeline`, `CurrentChapterCard`, `MomentsKeptSummary`, `KeptWeekRow`, `PhotoJournal`, `ReflectionHighlights`, `ToolkitEntryPanel`, `LookingAheadCard`, `MemoryFilmEntry/Builder/Player`, `MediaLightbox`.

Data and state: `src/lib/savedJourney.ts`, `src/data/myWeekContent.ts`, `src/data/weekData.ts`, `src/lib/memoryFilm.ts`, toolkit hooks (`useBirthPlan`, `useHospitalBag`, `usePregnancyAppointments`, `useBabyMovementNotes`, `useContractionTimer`, `usePregnancySymptomNotes`, `useMidwifeQuestions`), `useAISearch` with mode-aware Cindy, `src/lib/navLifecycle.ts` + `useLifecycle` for header/bottom nav, `src/components/layout/JourneyBottomNav.tsx` for mobile tabs.

Tables in play: `profiles`, pregnancy journeys, `reflections`, `week_photos`, `week_media_memories`, toolkit tables. No journal-ownership concept exists anywhere today.

## 3. Physical journal structure summary

148 pages, landscape, watercolour illustrated. Sequence: cover and letter from us to you, contents, The Story of You (about your parents, family tree, dear bump, firsts, gender guessing, name ideas), We're Expecting, Planning and Organising (appointment log, newborn checklist, nursery planning and mood board, baby shower ideas/mood board/guest list/photos, hospital bag, self-care), trimester dividers with weekly spreads (weeks 4-12, 13-27, 28-40), photo pages, reflection pages per trimester, welcome to the world, then First Year continuation (months 1-11, monthly diary, baby teeth chart, one year old, firsts with you).

Emotional rhythm: slow, unhurried, keepsake, addressed to the baby as much as the parent. Structured checklists sit beside open writing space.

## 4. Journal-to-app mapping

| Physical section | Current digital equivalent | Missing | Best placement | Priority | Notes |
|---|---|---|---|---|---|
| Weekly pregnancy spreads | `/my-week` chapter | Explicit "this week has a page in your journal" cue | This Week hero footer or Keep this week | High | The strongest natural bridge |
| Reflection pages | `SlotReflection`, Reflection highlights | Prompt parity with the journal's trimester reflections | Weekly reflection + trimester transition | High | Keep quick notes digital, long writing physical |
| Photo pages | `PhotoJournal`, photo/video/voice slots | Print-friendly framing hint | Photo journal + Keep this week | Medium | App holds many, journal holds the chosen few |
| Hospital bag checklist | Toolkit hospital bag | Cross-reference cue | Toolkit card | Medium | Already strong digitally |
| Appointment log | Toolkit appointments | Nothing structural | Toolkit | Low | Digital is better here |
| Self-care checklist and diary | Partial (one focus, emotional section) | A light self-care surface | This Week one-focus slot | Low | Do not build a new tracker |
| Newborn checklist, nursery, baby shower | None | Deliberately none | Journal only, optional soft mention in Toolkit | Low | Physical-only is correct |
| The Story of You, dear bump, family tree, name ideas | None | Onboarding warmth and journey intro tone | Setup and My Journey intro | Medium | Inspire tone, do not replicate forms |
| Trimester dividers | `TrimesterRail`/`TrimesterTimeline` | A moment of pause at trimester change | Trimester transition | Medium | Natural bridge beat |
| Welcome to the world / First Year continuation | Kept pregnancy chapter + First Year | Continuity story between products | First Year transition | Medium | Already partly solved |

## 5. User-state strategy

- **A. Owns the journal.** Sees quiet parity cues ("this week also has space in your journal"), never a buy link. Bridge appears in This Week and at trimester transitions only.
- **B. Does not own it.** Sees at most one soft discovery moment per surface, framed as an offline keepsake, never blocking, dismissible.
- **C. Arrives from an insert card.** Warm first-arrival welcome that assumes ownership, straight into setup, then treated as state A.
- **D. Arrives from App Store, search or social.** Pure app value first. No journal mention before a real memory has been kept.
- **E. Starts late in pregnancy.** No back-fill guilt. Journal cues shift to "start from this week" and third-trimester sections.
- **F. Continues into First Year.** The journal's First Year continuation is the story: kept chapter plus a single continuity line, no new selling.

## 6. Recommended bridge placements

| Placement | Behaviour |
|---|---|
| This Week hero | Contextual, journal owners only once flagged |
| Keep this week | Contextual, one quiet line under capture |
| Weekly reflection | Contextual, alternating not every week |
| Photo/video/voice | Deferred to a later phase |
| My Journey overview | Always visible but small, one calm panel |
| Toolkit | Contextual on hospital bag and appointments only |
| Trimester transition | Contextual, strongest emotional beat |
| Pregnancy film | Deferred |
| First Year transition | Contextual, continuity framing |
| Hero of app-only users | Hidden after dismissal |

## 7. Insert-card journey recommendation (not built)

QR on the card to a single warm landing route, for example `/journal-start`. Sets a lightweight "I have the journal" state, then routes to setup or `/my-week`. First version should be session or local-device only, with a persisted flag deferred until behaviour proves useful. The route must work equally well for someone without the journal: same value, no lock-out, no "members only" tone. First-arrival copy should welcome and orient rather than explain the product.

## 8. Copy direction (proposed only)

Warm, calm, British English, no dashes: "Using the physical journal?", "This week also has space in your journal.", "Keep the quick moments here, and the longer story in your journal.", "A place to keep this offline too.", "Some things are nicer written by hand." Avoid buy now, don't miss out, upgrade, complete your journey.

## 9. Visual language to carry across

Watercolour washes, soft sage and blush/peach, cream paper warmth, thin serif headings against quiet sans body, delicate hairline dividers, framed and taped photo treatments, botanical and woodland accents, generous white space, unhurried vertical rhythm.

## 10. What should not be copied

Landscape spreads, dense checklist grids, decorative script that fails legibility and accessibility, literal paper texture at full strength, page-turn metaphors, heavy full-bleed illustration behind text, and any scanned journal page used as an app asset.

## 11. App-readiness gaps (recommended order)

1. Signed-in pregnancy app shell and mobile bottom navigation parity with First Year.
2. Clearer weekly action rhythm and next-step framing.
3. Calmer empty states across journey and memories.
4. Smoother media capture flow.
5. Better toolkit entry from This Week.
6. Journal bridge layer.
7. Pregnancy film and trimester moments polish.

## 12. Roadmap from 27B

- 27B Nano Banana pregnancy app direction (visual language, no logic).
- 27C Pregnancy app shell and mobile navigation.
- 27D Weekly rhythm and empty-state polish.
- 27E Journal bridge layer (contextual cues, dismissal).
- 27F Insert-card entry route and owner state.
- 27G Media capture and film polish.
- 27H Launch readiness QA.

## 13. Exact next phase prompt for 27B

> # Phase 27B — Nano Banana Pregnancy App Direction
>
> Phase 27A is closed. Define the visual direction for the signed-in pregnancy experience so it feels like the digital companion to the physical journal.
>
> Presentation only. Do not change logic, data, routes, schema, RLS, AI behaviour, First Year or public pregnancy pages.
>
> Scope: `/my-week`, `/my-journey` and the pregnancy toolkit index. Establish surface, card, divider, typography and spacing tokens drawn from the journal's watercolour washes, soft sage, blush and cream paper, thin serif headings and delicate dividers. Use existing HSL tokens or add pregnancy-stage tokens in `src/index.css`. No hardcoded hex, no imported journal pages, no new photography.
>
> Deliver: token definitions, one shared pregnancy style module mirroring `firstYearStyles.ts`, and application to hero, section headers and cards. Verify at 390px and 1440px with no horizontal overflow, no console errors, typecheck, full tests and build.
>
> Stop after the Phase 27B report.
