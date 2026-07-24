# Phase 12.7b — Pregnancy Journey Premium Edge Polish (approved, ready to build)

Refinement pass only. 13 total size cue assets (1 existing + 12 generated this turn to /tmp).

## Files to edit
- `src/data/myWeekContent.ts` — add `sizeCueByWeek` map and `getSizeCueSlug(week)` helper only. No copy edits.
- `src/components/myweek/SectionBabyThisWeek.tsx` — optional `sizeComparisonSlug`, resolves via `import.meta.glob`; graceful parchment monogram fallback.
- `src/components/myweek/SectionAskAI.tsx` — warmer surface + accent ring + stronger icon chip + pill CTA.
- `src/components/myweek/SectionToolsThisWeek.tsx` — confident live-tool copy, stronger hierarchy, subtle hover lift. No status hooks in My Week.
- `src/components/myweek/SlotPhotoMemory.tsx` — contrast + italic discipline; pill "Add a photo" affordance.
- `src/components/myweek/MyWeekFooter.tsx` — align to content column widths; stronger link contrast; non-italic.
- `src/components/myjourney/JourneyHero.tsx` — non-italic standfirst; contrast bumps.
- `src/components/myjourney/PhotoJournal.tsx` — keepsake frame empty state; non-italic standfirst.
- `src/components/myjourney/ReflectionHighlights.tsx` — non-italic standfirst.
- `src/components/myjourney/MomentCard.tsx` — keep italic quote; strengthen chapter title contrast (non-italic).
- `src/components/myjourney/MomentsKeptSummary.tsx` — non-italic empty helper.
- `src/components/myjourney/LookingAheadCard.tsx` — non-italic fallback + contrast.
- `src/pages/PregnancyToolkit.tsx` — non-italic hero standfirst only.
- `src/pages/MyJourney.tsx` — swap `ComingSoonPanel` → new `ToolkitEntryPanel`.
- `src/pages/MyWeek.tsx` — one narrow line: pass `sizeComparisonSlug={getSizeCueSlug(currentWeek) ?? undefined}`.

## Files to create
- `src/components/myjourney/ToolkitEntryPanel.tsx` — uses existing read-only summary hooks (birth plan, hospital bag, appointments, movements, contractions, symptoms, midwife questions). No writes.
- 13 `.asset.json` pointers under `src/assets/size-cues/` (romaine already staged; 12 new watercolour PNGs generated to `/tmp/size-cues/`).

## Files to delete (guardrail-checked)
- `src/components/myjourney/ComingSoonPanel.tsx` — only after `MyJourney.tsx` import is removed and `rg "ComingSoonPanel" src` returns zero hits.

## Preserved
Routes, DB schema, migrations, RLS, auth, saved journey, reflections, photos, toolkit tool logic, AI, TTC, IVF, First Year, Toddler, Family, sitemap, robots, redirects.

## Verification
- `bunx tsgo --noEmit`
- `/my-week`, `/my-journey`, `/pregnancy-toolkit` load
- Week 36 shows romaine cue; weeks with matching assets show correct cue; weeks without show monogram fallback; no broken images
- No `href="#"`, em/en dashes, or diagnosis wording; mobile 375px clean
