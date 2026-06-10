
# IVF structure pass (approved) + soft journal layer

Scope is fixed. Only the files and changes below are in this pass.

## Files touched
- `src/pages/IVF.tsx` — reorder only
- `src/components/ivf/IVFWhatThisCovers.tsx` — 6 → 4 bullets
- `src/components/ivf/IVFFinalCTA.tsx` — drop right-column stage list, replace with quiet editorial closing panel (pull-quote + colour trail + 1 soft journal line)
- `src/components/ivf/IVFTopicPage.tsx` — render new blocks in approved order
- `src/data/ivfTopicData.ts` — add per-stage data for new blocks + group intros + soft journal note

No other files change.

---

## 1. Hub — `IVF.tsx`
Final order, no additions, no removals:

```text
IVFHero
IVFWhatThisCovers
IVFAISupport
IVFStages
IVFFinalCTA
```

## 2. `IVFWhatThisCovers.tsx`
Compress to exactly 4 bullets (text per spec). Layout unchanged.

## 3. `IVFFinalCTA.tsx`
Keep left column (heading, copy, both CTAs) intact. Replace the right-column 3-stage list with a quiet editorial closing panel:
- short pull-quote (serif italic)
- repeated lilac colour trail
- one soft, IVF-coded line inviting the user to hold the journey (the only hub-level journal trace, kept subtle)
- no routing, no stage links, no extra CTAs

## 4. `IVFTopicPage.tsx` — render order
```text
Hero
What this topic covers
AI bridge
Start here (3 cards)
Featured anchor card           [new]
What's normal / Seek support   [new]
Stage-specific block           [new: Before + Early only]
Emotional band
Groups (with intros)           [intros new]
Common questions strip (4)     [new]
Prev / Next
Other IVF stages
```

### New blocks (rendered conditionally from data)
- **Featured anchor card** — one wide lilac card with eyebrow, title, supporting line, link. Sits directly after Start here.
- **Normal / Seek support band** — two cards side-by-side: lilac left (`normal[]`), terracotta right (`seek[]`); "✔ Medically reviewed by Jenny Joines" underneath.
- **Stage-specific block** —
  - Before transfer: "What your protocol week might look like" — 5-row mini sequence (Day 1 / Day 3 / Day 6 / Trigger / Transfer day).
  - Early pregnancy: "When does handover happen?" — editorial card: when, what signals it, who picks up, CTA → `/pregnancy`.
- **Group intros** — each `IVFGroup` gets optional `intro` (2–3 lines). Existing `description` becomes the short tag; `intro` carries the editorial.
- **Common questions strip** — compact 2×2 of pill buttons; each opens `/ask?q=…`.
- **Soft journal note** — single small reflective block, lilac-tinted, one line of supportive copy + quiet "Open a private note" link to `/journal`. Distinct per stage:
  - Before transfer: keeping track of appointments, medication, questions
  - After transfer: holding the waiting somewhere gentle
  - Early pregnancy: marking cautious milestones in a private way
  Placed inside the emotional band area (not as its own large section) so the page does not bloat.

## 5. `ivfTopicData.ts` — additions per stage
For each of `before-transfer`, `after-transfer`, `early-pregnancy`:

```ts
featured: { eyebrow, title, body, href, hrefLabel }
normalVsSupport: { normal: string[], seek: string[] }
commonQuestions: string[]   // exactly 4
journalNote: { line: string, cta: string, href: string }
```

Per-stage only:
```ts
// before-transfer
protocolWeek: { title, items: { day, body }[] }   // 5 rows

// early-pregnancy
handoverNote: { title, when, signals: string[], who, href, hrefLabel }
```

Per group, add optional:
```ts
intro: string   // 2–3 line editorial
```

## 6. Ownership rules enforced in data
- No "trying again after loss" links surface on any IVF stage.
- Chemical pregnancy + pregnancy after loss surface inside After / Early under "If results bring difficult news" / "If things do not progress", paired with `/support`. Never a TTC route.
- Early-pregnancy symptoms / spotting / bleeding remain inside Early pregnancy until handover; the handover card routes forward to `/pregnancy`, never sideways into TTC.
- After / Early stages never link back into `/ttc/*`.

## 7. Journal layer rules
- IVF-coded language only: "hold the journey", "keep track of what this stage feels like", "appointments, medication, questions". Never pregnancy/bump/trimester language.
- Hub: at most one soft line inside the new Final CTA editorial panel.
- Stage pages: a single small reflective note tucked into the emotional band — not a standalone module, not a banner.
- All journal links go to `/journal`.

## 8. Explicitly out of scope
Full journal/capture module, prev/next colour trail, 3-dot hero progress marker, gradient/hero/accent polish, return of removed hub editorial sections, any new redesign or new route.

## 9. Returns after build
A. Changed files · B. Hub order confirmation · C. No-bounce-to-TTC confirmation · D/E/F. Per-stage additions · G/H. Journal layer placement + IVF-appropriate confirmation · I. Structure-pass confirmation.
