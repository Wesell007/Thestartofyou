# Phase 16.4A — First Year Pregnancy Chapter Access (Plan)

## Audit findings

- **/my-journey for first_year users**: loads, finds no active pregnancy journey, then reads the lifecycle pointer and redirects to `/my-first-year`. Correct today, and the reason the old kept-card CTA looped.
- **/my-week/:week (Kept Chapter)**: requires a session, then calls `getActivePregnancyJourney`. It uses `journey.lmp` to compute the current week and to decide which weeks count as "past". Without a pregnancy journey it redirects to `/due-date-calculator`.
- **getActivePregnancyJourney blocks First Year users**: yes. It reads the `journeys` pointer and returns `null` whenever the lifecycle is not `pregnancy`. So every pregnancy-week surface is closed after the transition.
- **Where memories live**: `reflections` (week + text), `week_photos` (week + storage path + caption), `week_media_memories` (week + video/voice + caption). None of these are deleted or moved by the First Year transition — they are all still owned by the same user and fully intact.
- **Archived pregnancy chapter**: `save_first_year_journey` writes one row into `archived_journeys` with lifecycle `pregnancy`, start/end timestamps, a reason, and a `snapshot` holding `lmp_date`, `due_date`, `status`, `started_at`. `first_year_journeys.archived_pregnancy_journey_id` points at that row.
- **Is the pointer enough?** Yes. The snapshot carries the LMP and due date, which is everything the kept-chapter surfaces need to convert saved weeks into dated, labelled chapters.
- **Access today**: the signed-in user can already read their own archived chapter and all their saved memories. Read access is owner-scoped on every one of these tables and the signed-in role has the privileges it needs. Nothing new has to be opened up.
- **Existing helper**: none reads archived pregnancy data for display. Account Settings touches it only for data export. A small new read helper is needed.
- **Schema/migration/RPC/RLS changes**: not needed.

## Recommended option

**Option A — a dedicated protected route.** Confirmed by the audit: the data is readable today, `/my-journey` should stay the pregnancy spine, and `/my-week/:week` should keep depending on a live pregnancy journey. A separate surface keeps the two chapters cleanly apart.

Route: **`/my-pregnancy-chapter`** — protected, `noindex`, read-only.

## Guard behaviour

| State | Result |
| --- | --- |
| Signed out | Auth with return to this route |
| First Year + kept chapter found | Render the read-only chapter |
| First Year + no kept chapter found | Gentle "nothing saved to open here" state with a way back to `/my-first-year` (no redirect loop) |
| Pregnancy, active | Redirect to `/my-journey` |
| Pregnancy, given birth | Redirect to `/setup/first-year` |
| TTC | Redirect to `/my-ttc-journey` |
| No pointer | Redirect to `/due-date-calculator` |
| Missing profile name | Redirect to `/setup`, matching the other journey surfaces |

The route is added to the protected-path list so signed-out visitors return here after signing in.

## Data-access approach

A new read helper alongside the existing First Year helpers returns the kept chapter: the archived row (via the First Year journey's pointer, falling back to the user's most recent archived pregnancy row), its dates, and the count of saved weeks. The page then reads reflections, photos and media for the user, groups them by week, and resolves signed URLs the same way the existing kept surfaces do.

Sensitive outcomes: if the archived snapshot's status is anything other than a straightforward completed pregnancy, the page keeps memories behind the same quiet reveal step already used on the kept chapter page rather than showing them unprompted.

## Page sections

1. Quiet header and back link to your First Year
2. Chapter intro: the span of the pregnancy, in warm dated language
3. Saved weeks list: week label, date, and what was saved, opening inline
4. Empty state when nothing was saved
5. Closing reassurance line

## Copy direction

"Your pregnancy chapter is kept." / "You can come back to what you saved here." / "Your First Year journey continues separately." / "Nothing new is being tracked here." No technical vocabulary, no clinical framing.

## Linking from /my-first-year

The kept card gains a CTA **only** when the load confirms a kept chapter exists for that user. `MyFirstYear` already knows this (`hasKeptChapter`), so the card renders reassurance copy alone when false and a real link when true. No dead links, no disabled buttons, no placeholders.

## Files that would change in build

- `src/pages/firstyear/MyPregnancyChapter.tsx` (new)
- `src/lib/firstYearJourney.ts` (kept-chapter read helper)
- `src/components/firstyear/journey/PregnancyChapterKeptCard.tsx` (conditional CTA)
- `src/App.tsx` (route registration)
- `src/lib/authIntent.ts` (protected prefix)

## Files that must not change

`src/pages/KeptChapter.tsx`, `src/pages/MyWeek.tsx`, `src/pages/MyJourney.tsx`, `src/lib/savedJourney.ts`, database schema, sitemap, robots, public content data.

## QA plan

Throwaway account walked from pregnancy through the First Year transition: confirm the CTA appears, the chapter opens read-only, saved weeks render, back link returns to `/my-first-year`. Confirm an active pregnancy account is redirected away and that `/my-week/:week` and `/my-journey` behave exactly as before. Type-check, tests, production build.

## Risks and open questions

- Users who transitioned before the archive existed may have no archived row; the fallback and empty state cover this.
- Media signed URLs expire, so the page loads them per visit rather than caching.
- Open question: should saved weeks open inline on this page, or is a simple list of what was saved enough for the first pass? Default is inline.

Phase 16.4B build can proceed once this is approved.
