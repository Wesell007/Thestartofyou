# /first-year — hero + clarity correction

Surgical top-of-page pass. Nothing from `FYAISupport` downward changes.

## 1. `FYHero.tsx` — clarity + media + composition

**Headline (explicit postpartum):**
*Their first year, and **your postpartum recovery**.*
- "your postpartum recovery" italic, coloured `--stage-recovery-deep`.
- Same serif scale family, slight bump for anchor presence: `text-4xl sm:text-5xl md:text-[3.75rem]`, `leading-[1.04]`.

**Support line (one calm line, three soft beats):**
*Your baby is changing quickly. You're healing after birth. Both belong here.*
- Keep single paragraph, light weight, slightly larger: `text-[17px] md:text-lg`.

**Media treatment — restore image clarity:**
- Keep `firstyear-scene.jpg`, still image only.
- Reduce parchment veil substantially:
  - Desktop gradient: `from-parchment/85 via-parchment/55 to-parchment/10` (was `from-parchment via-parchment/85 to-parchment/25`).
  - Mobile veil: `from-parchment/80 via-parchment/55 to-parchment/20` (was `from-parchment via-parchment/80 to-parchment/40`).
  - Remove the extra solid `bg-parchment/70` base layer that's currently flattening the image — replace with a very light `bg-parchment/15` wash for cohesion only.
- Dual-tone bottom wash: keep, lower opacity slightly (`0.45` / `0.4`) so it stays subtle against the now-visible image.
- No darkening, no dramatic gradients.

**Composition (no new elements):**
- Eyebrow → headline gap: `mb-7` (was 6).
- Headline → support line: `mb-6`.
- Support line → CTAs: `mb-10`.
- Max-width of text block: `max-w-[640px]` so headline anchors more confidently.
- Hero height unchanged: `min-h-[70vh]` / `md:min-h-[78vh]`.

**CTAs (equal clarity + weight):**
- Left: **Baby's first year** → `#baby-topics` (filled `--stage-firstyear-deep`).
- Right: **Your postpartum recovery** → `#recovery-topics` (filled `--stage-recovery-deep`).
- Identical size, padding, font weight; widen `min-w-[220px]` to fit the longer label without wrap.

## 2. `FYWhatThisCovers.tsx` — strengthen as intentional bridge

Stay single column, single paragraph. Do not re-split.

- Vertical padding up: `py-14 md:py-20` (was `py-8 md:py-10`).
- Heading bumped from tiny eyebrow to small serif:
  - Replace uppercase micro-eyebrow with a serif sub-heading: `font-serif text-2xl md:text-[1.75rem] text-foreground mb-5` — *What you'll find here*.
  - Keep a thin sage rule above it (`h-px w-10 bg-foreground/25 mb-5`) for editorial anchoring.
- Paragraph: bump to `text-base md:text-[17px]`, `leading-[1.75]`, `text-muted-foreground`, max-width `max-w-2xl`.
- Copy unchanged:
  *"Month-by-month guidance for your baby, from feeding and sleep to development and care. Alongside it, equal space for your postpartum recovery — healing, hormones, mood and the check-ups that matter."*
  (One word change: "recovery" → "postpartum recovery" for consistency with hero.)
- Centered column, parchment background retained.

## 3. `src/pages/FirstYear.tsx`
No structural changes. Touch only if a wrapper spacing tweak is needed between hero and bridge — currently not required; leave as-is.

## Guardrails honoured
- Hero remains the single paired-introduction moment.
- Recovery CTA equal in weight and clarity to baby CTA.
- No new sections, no Step 3, no topic-page work, no route changes.
- Nothing from `FYAISupport` downward touched.
- No TTC / IVF / Pregnancy files touched.

## Files touched
- `src/components/firstyear/new/FYHero.tsx`
- `src/components/firstyear/new/FYWhatThisCovers.tsx`

## Return after build
A. Changed files · B. Final hero headline · C. Postpartum clarity changes · D. Hero image treatment correction · E. Bridge section strengthening · F. Confirmation rest of hub untouched.
