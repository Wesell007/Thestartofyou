# Homepage story refinement — imagery and product-source direction

## Photography set (Nano Banana / generated lifestyle imagery)

Three coordinated production assets were generated as one art-directed set for
the "Start where you are" chapters. They share warmth, exposure, muted filmic
grading, soft natural window light, neutral linen wardrobe, realistic skin
texture and a portrait editorial crop (1024 x 1408).

Generated product UI: 0. Generated companion UI: 0. Generated text/logos: 0.

| Asset | Chapter |
| --- | --- |
| `src/assets/home-stage-ttc.jpg` | Trying to conceive |
| `src/assets/home-stage-pregnancy.jpg` | Pregnancy |
| `src/assets/home-stage-first-year.jpg` | First Year |

### Shared direction

Premium editorial lifestyle photograph, UK brand aesthetic. Natural soft window
light, warm cream / stone / muted earth tones with gentle sage accents,
understated linen clothing, realistic skin texture, natural unposed body
language, soft shallow depth of field, filmic muted grading, generous negative
space. No text, no logos, no screens, no clinical or medical objects, no
commercial smiles, no stock-styled posing.

### Prompts

**TTC** — "A couple in their early thirties sitting together at a wooden kitchen
table in a quiet warm morning at home, a notebook and a cup of tea on the table,
leaning close in calm shared planning, hopeful and reflective." Plus shared
direction; explicitly no pregnancy test and no fertility-clinic cues.

**Pregnancy** — "A pregnant woman in her early thirties sitting near a large
window in a calm home, softly writing in a plain journal on her lap, relaxed
natural posture, quiet and intimate mood." Plus shared direction; no
maternity-shoot pose, no exaggerated belly emphasis, no medical elements.

**First Year** — "A parent sitting on a sofa near a window at home holding a
young baby close, cheek resting gently against the baby's head, tender everyday
parenthood, calm and real." Plus shared direction; no bright nursery colours, no
prop clutter, no forced smiles.

### Review

All three outputs were reviewed together against the rejection criteria (stock,
uncanny, over-posed, inconsistent, clinically fertility-focused, too bright or
colourful for the brand). The set was accepted as coherent: matching warmth,
grading and crop language, each image quiet and non-clinical.

Wider-hub imagery (IVF, Preparing for Baby, Toddler, Family) was audited and no
new assets were generated; those hubs are presented as text-led editorial links
on the homepage, so no additional photography was required.

## Product previews — source method

Method used: **B (faithful static previews derived from the real product
components and shared style constants).**

Method A (screenshotting the live signed-in screens) was not used because
rendering My TTC Journey, My Week and First Year Today requires saved journey,
baby and cycle rows. Creating those rows would mean writing to the production
database, which is out of scope for this change. No customer data was used, and
no fixture rows were written.

The homepage previews in `src/components/home/JourneyPreviewSection.tsx` are
built directly from the same shared constants the real screens use:

- TTC — `ttcStyles` (`TTC_PAPER_CARD`, `TTC_EYEBROW`, `TTC_HELPER`,
  `TTC_INNER_RADIUS`) mirroring `TTCJourneyTimeline`'s cycle path.
- Pregnancy — the `pregnancy-paper` surface and the `SectionHero` typographic
  scale (trimester locator, chapter title, standfirst, due-date pill).
- First Year — `firstYearStyles` (`FY_CARD_RADIUS`, `FY_KICKER`, `FY_CHIP`,
  `FY_CARD_BODY`, `FY_INNER_RADIUS`) mirroring `TodayCard`.

The companion section (`CompanionMomentSection.tsx`) is rendered from the real
`companionStyles` tokens as a still, non-interactive image of the panel. There
is no second companion runtime, no model call and no streaming on the homepage.

### Privacy

- Production customer data used: 0.
- Homepage runtime private Supabase journey reads: 0.
- Homepage runtime journal reads: 0.
- Homepage runtime baby-record reads: 0.
- Homepage runtime TTC-log reads: 0.
- Names, emails, avatars of real people, real dates, IDs, journal text,
  appointments, browser chrome, debug output, credentials, private URLs: none
  present. Illustrative copy uses no dates and no personal identifiers ("Due in
  the autumn", "Four months old", "A note for your baby").
