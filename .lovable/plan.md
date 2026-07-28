## Phase 14.14 (approved) — Full size-cue audit + Issues 2–4

**22 weeks touched:** 12 nulled + 10 remapped.

### Issue 1 — Size-cue audit

**Nulled (cue text preserved):** Weeks 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13.

**Remapped with cue rewrites:**

| Wk | Slug | Cue |
|---|---|---|
| 15 | `pear` | About the size of a pear, weight beginning to register. |
| 18 | `mango` | About the curve of a mango, turning often inside you. |
| 19 | `pear` | About the size of a pear, finding rhythm. |
| 21 | `aubergine` | About the length of an aubergine, busy and present. |
| 22 | `butternut-squash` | Roughly the length of a butternut squash, long, lean, real. |
| 24 | `banana` | About the length of a banana, settling into proportion. |
| 25 | `cauliflower` | About the size of a cauliflower, settling and stretching. |
| 26 | `aubergine` | About the length of an aubergine, longer now than heavy. |
| 34 | `coconut` | About the size of a coconut, settled and growing. |
| 37 | `cabbage` | About the size of a cabbage, quiet and complete. |

**Kept:** 16, 17, 20, 23, 27, 28, 29, 30, 31, 32, 33, 35, 36, 38, 39, 40 (assets present); 1, 14, 41, 42 (intentional null).

### Issue 4 — Week 37 copy

`babyNote` → "Your baby is considered early term now, and the last weeks are part of the final stretch toward birth."

### Issue 2 — My Journey imagery

- `MyJourney.tsx`: `useBabyIllustrationStyle()` + `normaliseRealismTone(style)`, pass `tone` to `KeptWeekRow`.
- `KeptWeekRow.tsx`: swap `MyWeekBabyImage` for `<img>` from `resolveRealismForWeek(week, tone)` with `defaultRealismAltForWeek(week)`. Preserve frame/sizing/hover/layout. `MyWeekBabyImage` retained for other surfaces.

### Issue 3 — Videos in My Journey

- `MyJourney.tsx`: parallel `week_media_memories` read (`media_type='video'`); sign via `weekly-photos`; feed into `keptWeeks`, `MomentsKeptSummary`, `KeptWeekRow`, `PhotoJournal`.
- `MomentsKeptSummary.tsx`: 4th "Videos" stat, `grid-cols-2 sm:grid-cols-4`.
- `KeptWeekRow.tsx`: `hasVideo` → discreet Video indicator.
- `PhotoJournal.tsx`: accept `videos`, render `<video controls preload="metadata" playsInline muted>` in the same aspect-square frame; interleave by week desc; photo+video week → photo tile with small video badge; empty state → "No photos or videos kept yet."; subheading → "The weeks you have chosen to see again — photos and videos." Section title unchanged.

### Files changed (only)

- `src/data/myWeekContent.ts`
- `src/pages/MyJourney.tsx`
- `src/components/myjourney/KeptWeekRow.tsx`
- `src/components/myjourney/MomentsKeptSummary.tsx`
- `src/components/myjourney/PhotoJournal.tsx`

### Not changing

Realism assets, `.asset.json` files, `resolveRealismForWeek`, migrations, RLS, storage bucket, `useWeekMedia`, `SlotVideoMemory`, analytics, AI prompts, sitemap, routes, old 3-stage assets/resolver, `MyWeekBabyImage`.

### QA

No broken monogram anywhere 1–42. /my-week W30/36/37/38 render expected produce. Week 37 copy free of "safely"/"safe"/"guaranteed"/etc. /my-journey uses realism resolver + saved preference; W1–8 default; W36 video shows + counts. Photos/reflections/kept-week logic intact. `npm run typecheck` → 0.
