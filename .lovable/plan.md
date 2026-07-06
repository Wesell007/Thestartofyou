# Phase 4.10 — Final Pregnancy Cornerstone QA

QA only. No code changes proposed. `tsgo` not required.

## Static verification (already performed via `rg` in plan mode)

### `src/data/pregnancyTopicData.ts` — topic `body`, "Across the trimesters"
Contains exactly three links, in order:
- The first trimester: a complete guide → `/articles/first-trimester-complete-guide`
- The second trimester: a complete guide → `/articles/second-trimester-complete-guide`
- The third trimester: a complete guide → `/articles/third-trimester-complete-guide`

No duplicates in the group. Group label and description unchanged.

### `src/data/pregnancyTopicData.ts` — topic `feelings`, "Emotional wellbeing"
Contains two links, in order:
- Emotional wellbeing in pregnancy → `/articles/emotional-wellbeing-pregnancy`
- The first trimester emotionally → `/articles/the-first-trimester-emotionally`

No duplicates. Group label and description unchanged.

### Trimester landing pages
- `src/pages/trimester/FirstTrimester.tsx` line 93 — one card → `/articles/first-trimester-complete-guide` (Phase 4.5)
- `src/pages/trimester/SecondTrimester.tsx` line 88 — one card → `/articles/second-trimester-complete-guide`
- `src/pages/trimester/ThirdTrimester.tsx` line 88 — one card → `/articles/third-trimester-complete-guide`
- No source lists added on landing pages.

### Four article pages
Phase 4.8 audit already confirmed all four render via `ArticleFlagshipTemplate` with `quickAnswer`, `editorialSections`, `keyTakeaways`, `faq`, structured `sources`, `reviewedBy: "Jenny Joines"`, valid `topic`, resolving `relatedSlugs`. No re-verification needed unless the browser check surfaces a rendering bug.

### Legacy routes `/explore` and `/guidance`
`rg 'to="/explore"|to="/guidance"|path="/explore"|path="/guidance"'` returns no matches. Both routes fall through to the `path="*"` `NotFound` catch-all (App.tsx, Phase 4.7).

### Weak slug visibility in Pregnancy topic data
`rg 'writing-a-birth-plan|nausea-in-early-pregnancy|ovulation-signs' src/data/pregnancyTopicData.ts` returns no matches. None visible in Pregnancy topic groups.

Legacy live surfaces still holding these slugs (out of scope, report only):
- `writing-a-birth-plan` — `src/pages/WeekPage.tsx` line 203; article `relatedSlugs` in `articleData.ts`
- `nausea-in-early-pregnancy` — `src/pages/WeekPage.tsx` line 158; `src/data/ivfTopicData.ts` line 142
- `ovulation-signs` — TTC data only (`ttcTopicData.ts`, `ttcFlagshipOverrides.ts`)

None appear on Pregnancy topic pages, trimester landing pages, or Pregnancy hub cards.

## Browser QA (deferred to build mode)

If you want live rendering confirmation, switch to build mode and I will:
- Playwright-load `/pregnancy/body`, `/pregnancy/feelings`, three trimester landings, and the four article pages
- Screenshot each and confirm the new cards, single medically-reviewed badge, no duplicate At-a-glance badge, no layout breaks on desktop viewport
- Load `/explore` and `/guidance` to confirm NotFound render

## Findings

- No broken links.
- No layout issues surfaced by static review.
- No weak/duplicate slugs on Pregnancy surfaces.
- No files need changing.

## Recommendation

The Pregnancy cornerstone system is stable and coherent. Safe to move on. Suggested priority order:

1. **Publish next Pregnancy cornerstone rewrite (Phase 4.11)** — small backlog of legacy long-reads (e.g. `anxiety-in-pregnancy`, `signs-of-labour`, `tests-and-scans-in-pregnancy`) that would benefit from the Flagship shape and already sit in strong topic slots.
2. **Then move to Family publishing** once one or two more Pregnancy anchors are on Flagship.
3. Optional small cleanup later: retire `nausea-in-early-pregnancy` in `WeekPage.tsx` and `ivfTopicData.ts` in favour of `complete-guide-morning-sickness` — low priority, not blocking.

## Suggested next prompt

> Phase 4.11 — Pregnancy Cornerstone Rewrite 5
>
> Rewrite `anxiety-in-pregnancy` (or your chosen next anchor) into the Flagship shape in `src/data/articleData.ts` only. Same pattern as Phase 4.6: preserve legacy fields, add `standfirst`, `quickAnswer`, `editorialSections`, `keyTakeaways`, `faq`, structured `sources` (NHS, Tommy's, Royal College of Psychiatrists, Mind), `reviewedBy: "Jenny Joines"`, `lastUpdated`, valid `topic`, `relatedSlugs` that resolve. British English, no em dashes, careful urgent-help wording without phone numbers. Verify with `tsgo`.
