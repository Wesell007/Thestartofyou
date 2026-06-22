## TTC Pass 3.1 — Tightening pass

Scope: `src/components/ttc/TTCTopicPage.tsx` and `src/components/ttc/TTCSubtopicPage.tsx` only.

### A. Grouped clusters — richer and denser
- Add `SectionLabel` ("Explore this topic" / "Explore further") + one-line italic serif lead above the cluster card.
- Cluster card: padding up to `p-6 sm:p-10 md:p-14` (topic) / `p-6 sm:p-9 md:p-12` (subtopic); shadow up to `0_30px_80px_-40px_rgba(0,0,0,0.18)`; faint `tintHsl / 0.25` top wash inside.
- Grid: topic stays 3-col on `lg`, 2-col on `sm`; gap-y 10, gap-x 12 on `lg`. Subtopic stays 2-col on `md`.
- Up to 5 links per cluster (only where justified — not forced).
- Rows: `py-3`, 44px thumbs with inset ring (`accentBorder`), hover bg `accentSoft`, thumb `scale-[1.04]` 700ms.
- Cluster header serif size up half a step.
- Per-cluster "View all" only when a natural destination exists (sibling topic href or `/ask`).
- Curation note: centred italic block with `LeafDivider` above.

### B. Lower-page substance
- AI bridge: wrap inner in `bg-card/75 backdrop-blur-sm rounded-[2rem] border` card; centred sprig above eyebrow; italic lead under heading; `py-16 md:py-24`. Stays secondary to hero/Start here/clusters.
- Subtopic "Continue exploring": parent prompt+CTA in centred card; `mt-16` gap before "Other supporting guides".
- Back link: faint hairline `h-px max-w-32 mx-auto bg-[accentSoft]` above.

### C. Sibling / supporting nav
- Chip padding `px-5 py-3`; icon disc 8px (`w-8 h-8`, icon size 14).
- Two-line label: small uppercase sub-label ("Topic" / "Subtopic") + serif italic name.
- Default shadow `0 2px 10px -6px rgba(0,0,0,0.12)`; hover `0 10px 28px -18px rgba(0,0,0,0.25)` + `-translate-y-0.5`.
- Row gap `gap-4 md:gap-5`.

### D. Out of scope
TTC hub, IVF, Pregnancy, articles, navbar, weeks, hero, Start-here cards, What-this-covers, `ttcTopicData.ts`, new assets.

### E. Files
- `src/components/ttc/TTCTopicPage.tsx`
- `src/components/ttc/TTCSubtopicPage.tsx`

### F. Verification
Playwright screenshots on `/trying-to-conceive/ovulation` and `/trying-to-conceive/cycle-tracking` at desktop, iPad, mobile. Pause for review.
