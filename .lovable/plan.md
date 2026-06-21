## After transfer correction pass

Tightly scoped to (1) After transfer completeness + duplicate cleanup, (2) IVF AI route colour/context (light-touch), (3) After transfer return navigation.

### 1. After transfer — coverage gaps

Two real gaps, filled with `askIVF` links (no new components, no new articles):

- **Over-reading symptoms / spiralling** — add "How do I stop over-reading every twinge after transfer?"
- **If the cycle didn't work** — add "If my IVF cycle didn't work, what now?"

### 2. After transfer — duplicate-feeling curation cleanup

`src/data/ivfTopicData.ts`, `after-transfer.groups` only.

- **Two-week wait** (4): unchanged — each link has a clear job.
- **Symptoms, signals & testing** (6 → 4): drop "When to take a pregnancy test" (dupes the wait group's "When can I test after embryo transfer?") and "Early pregnancy symptoms explained" (dupes the IVF-framed symptoms ask). Keep IVF-symptoms-ask, faint-positive-IVF-ask, call-the-clinic-ask, faint-positive article.
- **Coping with uncertainty** (5): drop "Anxiety in pregnancy" (Pregnancy bleed, redundant with Perinatal anxiety). Add "How do I stop over-reading every twinge after transfer?" Keep emotional-impact, cope-without-spiralling, perinatal anxiety, find support.
- **If results bring difficult news** (4 → 4): drop generic "Chemical pregnancy" article (IVF-framed ask owns this). Add "If my IVF cycle didn't work, what now?" as the first link. Order: cycle-didn't-work → chemical-after-IVF → pregnancy after loss → find support.

Result group sizes: 4 / 4 / 5 / 4 — curated, IVF-coded, non-repetitive.

### 3. IVF AI route — light-touch colour + context

Currently every `/ask?…` opens a sage (TTC-green) page with no IVF context.

- `src/data/ivfTopicData.ts` — `askIVF()` appends `&journey=ivf`.
- `src/pages/AskPage.tsx`:
  - Read `journey` param; compute `isIVF`.
  - Add a small IVF context strip beneath Navbar (same language as `ArticleIVFContext`): `IVF · ← <stage from sessionStorage> · ← IVF hub`. Renders only when `isIVF`.
  - Flip `StageGlow tone` to `"ivf"` and the most visible sage accents (the "You asked" eyebrow, the context chip, the "short answer" label, the "your next question" eyebrow, the `SprigDivider` tone) to lavender variants. Keep background washes and structural elements untouched — no redesign, no special-case bloat.
  - When `isIVF`, swap the three "Continue your journey" tail tiles to: Back to `<stage>` (if sessionStorage), The IVF Journey (`/ivf`), Support (`/support`).
- All `isIVF` branches collapse to defaults when the param is absent — sage default unchanged.

### 4. Return navigation from After transfer

- Articles: already handled by `ArticleIVFContext` + `ArticleTopicReturn` (previous pass).
- AI pages: fixed via §3.
- Shared-library pages: out of scope — none reached from After transfer after cleanup.

### 5. Files

- `src/data/ivfTopicData.ts`
- `src/pages/AskPage.tsx`

### 6. Out of scope

Early pregnancy, IVF hub redesign, AI product-wide changes, broad polish, TTC/Pregnancy, new components.
