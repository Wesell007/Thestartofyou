# Phase 13.2b — Journey Status Controls + Status-Aware Rendering (Approved, with corrections)

One atomic build. Ship controls and gates together. No migration, no AI backend/prompt/request changes.

## Corrections applied
- **AI visibility**: My Week AI card hidden for every non-active status including `given_birth`. `/ask` remains directly reachable.
- **Kept chapter link**: use `/my-journey` everywhere. No `/kept` link. No new route.
- **Toolkit link wording**: for `no_longer_pregnant` and `paused`, replacement link says `Open Pregnancy Toolkit` → `/pregnancy-toolkit`. For `pregnancy_loss`, hidden behind local reveal toggle.

## 1. `src/lib/savedJourney.ts` (add)
- `updatePregnancyJourneyStatus(userId, { status, outcome_date? })`. Session check. Update object `{ status, status_changed_at: now }`; include `outcome_date` only when `status === "given_birth"` and a valid date is provided, otherwise explicitly `outcome_date: null`. Never writes reason/free text/loss detail/loss date/medical/gestation/analytics.
- `STATUS_LABELS: Record<PregnancyJourneyStatus, string>`.

## 2. `src/lib/journeyStatusCopy.ts` (create)
Single source of truth for all dialog + panel copy. British English, no dashes, no forbidden phrases.

## 3. Account Settings — `JourneyStatusSection`
New section after existing pregnancy block. Shows current status, last-changed date, `Change status…`, and `Return to active pregnancy` when non-active.
- `ChangeStatusDialog`: radio (given_birth / paused / no_longer_pregnant / pregnancy_loss). `given_birth` shows optional date. Non-loss → `StatusConfirmDialog` (single). Loss → `LossConfirmDialog` (second explicit confirm). Only Account Settings hosts these controls.

## 4. My Week (`src/pages/MyWeek.tsx`)
Branch on `journey.status` around the section stack:
- `active`: unchanged.
- `given_birth`: `<SectionPregnancyComplete />` — links: `Open First Year` (`/first-year`), `Open My Journey` (`/my-journey`), `Manage in Account Settings`. No size cue, week counter, tools, AI card, reflection composer, photo slot, next-week copy.
- `no_longer_pregnant`, `paused`: `<SectionJourneyPaused variant=... />` — links `Manage in Account Settings`, `Open My Journey`.
- `pregnancy_loss`: `<SectionJourneyQuiet />` — title `Your space, on your terms.` body `We've stopped pregnancy updates. Your saved things are still here whenever you want them.` link `Manage in Account Settings`. No support link.
- All non-active branches skip `SectionBabyThisWeek`, `SectionToolsThisWeek`, `SectionAskAI`, `SlotPhotoMemory`, `SectionReflection`, `SectionNextChapter`, header countdown.

## 5. My Journey (`src/pages/MyJourney.tsx` + `JourneyHero`, `ToolkitEntryPanel`)
- `active`: unchanged.
- `given_birth`: `JourneyHero variant="complete"` with `Journey complete` badge; hide countdown. Photo journal, reflections, toolkit panel visible. Footer CTA `Open First Year`.
- `no_longer_pregnant` / `paused`: `variant="paused"` with chip; hide countdown and active prompts. Photo journal + reflections visible. Toolkit panel replaced by a quiet link `Open Pregnancy Toolkit` → `/pregnancy-toolkit`.
- `pregnancy_loss`: `variant="quiet"` — no dates, no week language, no size chip. Timeline, photo journal, reflections, toolkit panel hidden by default. Local `useState` reveal toggle `Show kept memories`. `Manage in Account Settings`. No AI CTAs.

## 6. Pregnancy Toolkit (`src/pages/PregnancyToolkit.tsx`)
- `active`: unchanged.
- `given_birth`: header note `Pregnancy complete. Your toolkit is here for reference.` Cards visible.
- `no_longer_pregnant` / `paused`: header note `Pregnancy view paused. Your toolkit is here when you need it.` Cards visible.
- `pregnancy_loss`: quiet panel + local `Show kept content` toggle; card grid hidden by default. No destructive changes.

Sub-pages remain reachable by direct URL. For `pregnancy_loss`, add `<PageStatusNotice />` at top and suppress any cheerful preparation copy string above the tool itself; no logic changes to the tools. Sub-pages will be surveyed at build; any needing the notice will be edited minimally.

## 7. AI visibility
Presentation-only gates:
- `active`: `SectionAskAI` renders.
- `given_birth`, `no_longer_pregnant`, `paused`, `pregnancy_loss`: `SectionAskAI` hidden from My Week.
- `pregnancy_loss`: no AI CTAs on My Journey.
- `/ask` page unchanged and directly reachable.
- No changes to `supabase/functions/*`, prompts, request bodies, companion logic.

## 8. Support resources
Omitted entirely. No link, no placeholder, no disabled control. Deferred to Phase 13.2e.

## 9. Reveal kept content
`useState(false)` in `MyJourney` and `PregnancyToolkit`. No localStorage, no DB.

## 10. Files
**Edit**: `src/lib/savedJourney.ts`, `src/pages/AccountSettings.tsx`, `src/pages/MyWeek.tsx`, `src/pages/MyJourney.tsx`, `src/pages/PregnancyToolkit.tsx`, `src/components/myjourney/JourneyHero.tsx`, `src/components/myjourney/ToolkitEntryPanel.tsx`, and toolkit sub-pages only where a `PageStatusNotice` is needed (confirmed by inspection at build time).
**Create**: `src/components/journey-status/{JourneyStatusSection,ChangeStatusDialog,LossConfirmDialog,StatusConfirmDialog,PageStatusNotice}.tsx`, `src/components/myweek/{SectionPregnancyComplete,SectionJourneyPaused,SectionJourneyQuiet}.tsx`, `src/lib/journeyStatusCopy.ts`.
**Do not touch**: DB schema, migrations, `supabase/functions/*`, AI prompt/request/response, companion files, Birth Plan/Hospital Bag content, photo memories, captions, reflections, public pages, TTC, IVF, First Year, Toddler, Family, sitemap, robots, routes.

## 11. Verification
`bunx tsgo --noEmit`. Authenticated Playwright walkthrough at 375 & 1280 across all five statuses on `/my-week`, `/my-journey`, `/pregnancy-toolkit`, affected toolkit sub-pages and `/account-settings`. Confirm: two-step loss, return-to-active, outcome_date write rules, zero size cue/countdown/tools/AI card outside `active`, loss hides content by default, reveal is local only, no support link, `git diff` empty on `supabase/functions` and `supabase/migrations`, sitemap unchanged, no analytics added, no forbidden phrases, no auto-deletion.

Ready to build.
