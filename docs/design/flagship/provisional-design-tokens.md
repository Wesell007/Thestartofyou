# Provisional design tokens (Gate 2 Step 3)

**PROVISIONAL until founder approval of the flagship set. Not migrated to runtime.** Source of truth for the prototypes: `prototype-source/css/tsoy.css`. Contrast figures are approximate and must be verified with a tool at implementation.

## Colour roles

| Role | Value | Origin | Use |
|---|---|---|---|
| paper | `#F8F7F3` | journal interior ground | default background |
| paper-blush | `#FCF1E8` | cover/divider ground | chapter openers, hero, owner band ground, journal band |
| paper-blush-deep | `#F4E3D6` | spine | reserved |
| wash-sage / deep | `#E5ECE7` / `#CED6D0` | prompt washes | writing prompts |
| wash-blush / deep | `#F1E9E3` / `#E0D7D0` | prompt washes | writing prompts, owner band |
| stone | `#EDEDE9` | | empty photo slots |
| ink | `#1F1E1C` | journal text (#000) softened | text |
| ink-soft | `#5B5955` | | decks, meta, captions (≈ 6.3:1 on paper) |
| ink-mute | `#767470` | | placeholders (≈ 4.6:1; keep placeholders non-essential) |
| signature | `#96ACB1` | journal title colour | **ornament only** (dotted rule, tags): fails text contrast |
| signature-ink | `#52696E` | deepened signature | links, primary buttons, feature headlines (≈ 5.4:1 on paper) |
| signature-wash | `#E9EFF0` | | reserved |
| brown | `#896142` | journal subtitle | small-caps labels (≈ 5.1:1) |
| rule / rule-strong | `#DDD9D2` / `#B1B3B6` | journal greys | hairlines, ruled writing lines |
| notice-calm / soon / now | `#52696E` / `#7A4A2E` / `#8A3B2E` (+ wash `#F6E9E6`) | | urgency tiers; always wording + mark |

No stage palettes. One palette across TTC, IVF, Pregnancy, First Year, Toddler and Family.

## Typography (character approved; fonts not locked)

| Role | Character | Prototype stand-in (self-hosted, SIL OFL) | Sizes desktop / mobile |
|---|---|---|---|
| Display | hairline high-contrast serif; spaced capitals for short titles; sentence case for long headlines and feature statements | Cormorant Garamond 300/400 | display-1 44/30 · display-2 30/24 · display-3 22/19 · headline 48/32 (hero 52/34) |
| UI / prompts / labels | humanist grotesque, quiet, medium x-height | Public Sans 400/500/600 | 16; small 14; label 12 tracked 0.16em |
| Reading | sturdy text serif with even colour | Source Serif 4 400/600 + italic | deck 21/19 · body 19/17 at 1.6 |
| Script | none in functional UI | | |

Tracking: display 0.14em (0.10em mobile); section heads 0.12em; labels 0.16em. Measure 66ch. Wordmark: display serif 400, 0.2em tracking.

### Font licence findings (to resolve before production selection)

| Journal face | Status | Note |
|---|---|---|
| Adorn Story Serif (titles) | commercial (Laura Worthington) | Fontspring lists desktop and **web** licences for the Adorn family, but no product named "Adorn Story Serif" was found; confirm the exact product (possibly a renamed or bundled face) and buy a web/app licence, or choose an equivalent of the same character |
| Aileron (prompts/UI) | reported CC0 1.0 | verify on the Open Font Library listing; if confirmed it is directly usable |
| Source Serif (letter body) | SIL OFL | usable (Source Serif 4 is the stand-in already) |
| Arima Koshi (cover subtitle) | SIL OFL as "Arima" on Google Fonts | usable; not needed in the UI |
| Savoye LET (script) | Letraset/Monotype; bundled with macOS, web rights unproven | not used in the UI |
| Augie (quotes) | free handwriting font, licence to confirm | not needed |

## Spacing, rules, radii, elevation

8 px base: 8 / 16 / 24 / 32 / 48 / 64 / 96 (mobile 40 / 48 / 64). Hairline 1 px `rule`; strong 1 px `rule-strong`; dotted title rule 2 px dotted `signature`, 96 px wide. Radius 2 px on buttons and inputs; 0 on frames; **999 px only on the "size of" row**. No shadows; elevation by paper frame (white 10 px padding + 1 px `#E4E1DA`) or by tint.

## Components

- **Masthead** 72/60 px, hairline, text links, current item underlined. **App bar** 64/56. **Tab bar** five text items with a hairline glyph.
- **Buttons**: primary signature-ink fill with paper text; secondary 1 px ink border; quiet underlined text; all 44 px, sentence case, one primary per view, `:active` nudges 1 px.
- **Links** signature-ink, 1 px underline, 3 px offset.
- **Prompt block** sentence starter ending "…" on a sage/blush wash with soft brush radius; ruled 36 px writing lines; reading-serif input.
- **Photo frame** white paper border; 4:3 slot; caption in UI sans 14.
- **Urgency notice** hairline-bounded block: kind label (tier colour), title, body; "now" tier adds a bordered "!" and the blush-red wash.
- **Provenance** hairline-topped block: brown small-caps heading, numbered sources, plain statement; PROPOSED tag where the contract does not exist yet.
- **Owner band** blush wash with small-caps label and quiet actions.
- **Navigation** quiet; no pills, no blur.
- **Motion** none by default; allowed: chapter transitions, state feedback, one quiet reveal; transform/opacity only; `prefers-reduced-motion` disables all.
