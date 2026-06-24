
# First Year Rebuild — Unified Dual-Track Ecosystem

Planning only. No code changes yet. This replaces the separate Postpartum and First Year hubs with one premium First Year ecosystem containing two visible tracks: **Baby's first year** and **Your postpartum recovery**. Both tracks are first-class.

---

## A. Recommended First Year hub structure

Top-to-bottom, matching the editorial rhythm established by Pregnancy / TTC / IVF:

1. **Hero** — calm powder blue-grey field, serif headline, one short truth line, primary CTA "Start your first year", secondary "Jump to your phase". Subtle dual colour trail (blue-grey → mauve) hinting at the two tracks.
2. **What this hub covers** — one short editorial paragraph naming both tracks plainly: baby's first year + your recovery.
3. **Two-track entry** *(signature section — see B)* — side-by-side on desktop/iPad, stacked on mobile. Both tracks given equal weight.
4. **AI search strip** — "Ask anything about the first year" with chip suggestions split across both tracks (sleep, feeding, recovery, bleeding, mood).
5. **Month-by-month / phase navigation** — 0–3, 3–6, 6–9, 9–12 months. Baby-led but each phase card surfaces a small "for you" recovery line.
6. **Baby's first year topics** — grouped grid (see C).
7. **Postpartum recovery topics** — separately grouped grid in mauve-plum (see C). Equal visual weight to baby topics.
8. **Common questions** — mixed across both tracks, each tagged with a small track chip.
9. **Medically reviewed strip** — "✔ Medically reviewed by Jenny Joines".
10. **Reflection** — quiet editorial moment, single line.
11. **Pathways / continue** — links to Pregnancy (previous), Support, Explore.
12. **Final CTA** — sign-in / keep your journey.

Hero remains the only "marketing" surface; everything below is editorial and utility-led but paced.

---

## B. Two-track model

A single **TwoTrackEntry** section is the spine of the hub.

```text
┌─────────────────────────────┬─────────────────────────────┐
│  BABY'S FIRST YEAR          │  YOUR POSTPARTUM RECOVERY   │
│  powder blue-grey card      │  mauve-plum card            │
│  ─────────────────────────  │  ─────────────────────────  │
│  Development, feeding,      │  Healing, hormones,         │
│  sleep, milestones          │  emotional adjustment       │
│                             │                             │
│  4 phases · 365 days        │  12 weeks core + ongoing    │
│                             │                             │
│  → Enter baby track         │  → Enter recovery track     │
└─────────────────────────────┴─────────────────────────────┘
```

Rules:
- Equal width, equal height, equal CTA prominence.
- Both cards medically-reviewed badged.
- On mobile they stack vertically with no order priority signal (recovery is not "secondary").
- Each track card has a thin chip row of 3 sample topics from its track.

Throughout the rest of the hub, **track chips** (small lozenges) tag every card so a parent always knows which track a piece of content belongs to.

---

## C. Topic architecture

### Baby's first year (powder blue-grey surfaces)
Grouped into four clusters:

- **Feeding** — breastfeeding, bottle/formula, combination, starting solids, weaning
- **Sleep** — newborn sleep, naps, night waking, regressions, routines
- **Development & milestones** — motor, social, cognitive, speech, month-by-month
- **Care & safety** — baby basics, health & illness, vaccinations, safe sleep, travel, play & learning, teething, transitions

### Your postpartum recovery (mauve-plum surfaces)
Grouped into four clusters:

- **Physical recovery** — first 6 weeks, vaginal birth healing, C-section recovery, stitches, bleeding, pelvic floor
- **Emotional wellbeing** — baby blues vs PND, anxiety, identity shift, relationships, intimacy
- **Body & hormones** — hormonal changes, hair/skin, periods returning, contraception, weight & body image
- **Check-ups & warning signs** — 6-week check, red flags (haemorrhage, infection, BP, mental health), longer-term recovery

Each cluster opens a topic page (same template both tracks, only colour family differs).

---

## D. Route / nav migration

**Keep all existing URLs alive — no broken paths.**

- `/first-year` — new unified hub (rebuilt from current `FirstYear.tsx`).
- `/postpartum` — redirect at the route level to `/first-year#recovery` (anchored to the two-track entry, recovery side). Component preserved in code for reuse but removed from live nav.
- New canonical topic routes:
  - `/first-year/baby/<topic>` (feeding, sleep, development, care-safety)
  - `/first-year/recovery/<topic>` (physical, emotional, body-hormones, checkups)
  - `/first-year/months/0-3` … `9-12`
- Existing `/first-year/0-3-months` style routes → 301-style redirect (client `<Navigate>`) to new month routes.
- Existing postpartum stage routes preserved as redirects into `/first-year/recovery/...` equivalents.
- **Navbar**: remove "Postpartum" as a top-level item. "First Year" becomes the single entry. Within Explore / journey map, both tracks are surfaced as sub-entries under First Year.
- **Existing postpartum components** (`src/components/postpartum/*`) and `Postpartum.tsx` page stay in the codebase for content reuse during the build, removed from live routing only.

No deletions in step one — everything is redirected first, pruned only after the new ecosystem is approved.

---

## E. Colour-system recommendation

Add two new token families to `src/index.css`. Retire the current `--stage-firstyear` (dusty rose) and `--stage-postpartum` (terracotta) from live use; keep tokens defined for legacy components.

```css
/* First Year — powder blue-grey (baby track + hub default) */
--stage-firstyear:           212 22% 94%;   /* surface */
--stage-firstyear-soft:      212 26% 88%;   /* hover / inner card */
--stage-firstyear-accent:    212 32% 46%;   /* text accent, dividers */
--stage-firstyear-deep:      212 36% 32%;   /* strong accent */

/* Postpartum recovery — muted mauve-plum (sub-family inside First Year) */
--stage-recovery:            320 14% 93%;   /* surface */
--stage-recovery-soft:       320 18% 87%;   /* hover */
--stage-recovery-accent:     320 22% 44%;   /* text accent */
--stage-recovery-deep:       320 28% 30%;   /* strong accent */
```

Application:
- **Hub shell, hero, AI strip, month-by-month, baby topic cards** → `--stage-firstyear` family.
- **Two-track entry recovery card, recovery topic cards, recovery topic pages, recovery chips** → `--stage-recovery` family.
- **Track chips** — always solid: blue-grey lozenge for baby, mauve lozenge for recovery, both at `accent` text on `soft` background.
- **AI / support** inside the First Year ecosystem inherits the powder blue-grey by default; AI sessions launched from a recovery surface carry `journey=firstyear&track=recovery` and tint to mauve (mirrors the IVF lilac pattern).
- **Section dividers** between baby and recovery bands use `--stage-firstyear-accent / 0.22` to keep the system unified.
- Never use bright pink, peach, sage, or IVF lilac inside this ecosystem.

---

## F. Premium design direction

Match the standard of Pregnancy / TTC / IVF:

- **Serif headlines** (Playfair) at restrained sizes; long line-height; negative tracking on H2 (-0.02em).
- **15px body**, light weight, generous leading.
- **White cards on parchment**, with thin 1px borders at `accent / 0.18`.
- **Hover**: `scale-[1.01]` + `ring-[1.5px]` in track accent; no shadows on baby cards (keeps airy), soft shadow on recovery cards (keeps grounded).
- **Photography**: warm, daylit, real (no stock babies-on-white). Recovery imagery: adult-led, calm, never clinical, never "wellness influencer".
- **No illustrations**, no botanical accents on baby surfaces (keeps it grown-up, not childish). A single botanical accent allowed on the recovery emotional-wellbeing card to echo brand warmth.
- **CTA hierarchy**: 1) Journey, 2) Track / Stage link, 3) AI support.
- **Editorial pacing**: alternating `parchment` / `parchment-dark` bands; single H1; max 3 related reads per topic page; "✔ Medically reviewed by Jenny Joines" on every medically relevant page (both tracks).
- **British English, no dashes** (per brand rules).

---

## G. Desktop / iPad / mobile

- **Desktop (≥1024px)** — two-track entry side-by-side; month-by-month as a 4-column rail; topic clusters in 2×2 grids per track; baby and recovery bands separated by a thin accent divider.
- **iPad / tablet (768–1023px)** — two-track entry still side-by-side but at reduced padding; month-by-month as 2×2; topic clusters as 2-column. Watch for the AI chip row wrapping — cap to 2 lines with horizontal scroll fallback.
- **Mobile (<768px)** — two-track entry stacks; the recovery card must not appear "below the fold afterthought" → add a small sticky in-page anchor under the hero ("Baby track · Recovery track") that jumps either way.
- **Month-by-month** mobile: horizontal snap carousel with 4 cards; dot indicator.
- **Topic cards mobile**: full width, image-top, 16px gutter, no truncation in titles.
- **Track chips** stay legible at 11px; never wrap inside themselves.
- **AI section mobile**: input first, chips below as a 2-row wrap.

---

## H. Recommended implementation order

1. **Tokens + redirects (foundation, no UI change)** — add new `--stage-firstyear` (blue-grey) and `--stage-recovery` (mauve) tokens to `index.css`; add route-level redirects from `/postpartum` and legacy postpartum/first-year sub-routes; remove Postpartum from navbar.
2. **Hub shell rebuild** — new `FirstYearHero`, `FirstYearWhatThisIs`, `TwoTrackEntry`, AI strip, month-by-month nav, reflection, pathways, final CTA. Hub-only pass.
3. **Baby track topics** — 4 cluster cards on hub + topic pages (`/first-year/baby/...`) using shared template + powder blue-grey tokens.
4. **Recovery track topics** — 4 cluster cards on hub + topic pages (`/first-year/recovery/...`) using shared template + mauve-plum tokens. Port content from existing postpartum components.
5. **AI consistency** — `journey=firstyear&track=baby|recovery` parameters on every `/ask` link from this ecosystem; AskPage tone adapts to the right track family.
6. **Cleanup pass** — remove dead nav entries, mark legacy postpartum/first-year components as `legacy/` only after sign-off. No deletions before approval.

Pauses for review after step 1, step 2, and step 4.
