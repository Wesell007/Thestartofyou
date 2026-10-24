# Step 3B journey colour tokens (provisional, design-only)

One TSOY master system (paper, ink, typography roles, spacing, component grammar, photography principles) with controlled journey-specific colour families. Journey colour orients; it does not recolour components. Budget: 15 to 25 % of a surface's expression (chapter band, strip active state, dividers, plate, selected washes, tabs). Primary buttons are always master ink; links and rules stay master signature unless a journey-scoped element says otherwise.

Each family has three roles:

- **deep**: text, active state, underline, strip numeral, figure line (must pass 4.5:1 on paper and on its own wash);
- **mid**: ornament only: dividers, ticks, discs, scale bars, dots (never text, never the only carrier of meaning);
- **wash**: background wash for chapter entry and selected panels (ink text on it must pass 4.5:1).

| Family | deep | mid | wash | deep on paper | deep on wash | ink on wash |
|---|---|---|---|---|---|---|
| Master signature (links, rules) | #52696E | #96ACB1 | #E9EFF0 | 5.43 | 5.01 | 14.33 |
| Trying to conceive (sage / olive) | #4F6447 | #9BAE8E | #E5ECE2 | 6.03 | 5.37 | 13.82 |
| TTC cycle: menstruation (clay) | #8E463B | #C98B7E | #EFD9D3 | 6.34 | 5.03 | 12.32 |
| TTC cycle: follicular | (TTC deep) | | #E3EAE0 | | | |
| TTC cycle: fertile window (olive) | #4F6447 for text; #5A7048 solid fill | #8FA376 | #DCE5D4 | 5.09 (solid) | 4.21 (solid), so text uses TTC deep | 12.85 |
| TTC cycle: luteal (apricot) | #7A5A2E | #CDAE7C | #F1E0C6 | 5.88 | 4.87 | 12.86 |
| TTC cycle: no cycle | | | #F3F0E8 | | | |
| Pregnancy (peach / blush) | #8E5A50 | #D9A596 | #F7E6DC (support #E3EBE4) | 5.25 | 4.64 | 13.73 |
| First year (mineral blue) | #4C6375 | #96ACB1 | #E4EBEF | 5.85 | 5.20 | 13.82 |
| Postpartum, secondary within First year (muted berry) | #773C48 | #B98A96 | #F0E2E5 | 7.76 | 6.62 | 13.26 |
| Toddler (apricot / terracotta) | #955537 | #D8A585 | #F6E6DA | 5.39 | 4.75 | 13.68 |
| Family (ochre / honey) | #80602A | #D4B36A | #F4EBD8 | 5.40 | 4.89 | 14.06 |
| Companion accent (proposed, limited) | #6B5670 | #A893AB | #EEE8EE | 6.14 | 5.46 | 13.81 |

Master actions: primary button ink `#1F1E1C` on paper 15.54:1 (paper text on ink likewise); hover `#343230`. Paper `#F8F7F3`, ink `#1F1E1C` unchanged from 3A.

Printed-book test: all deep and wash pairs sit in the same muted, slightly grey, warm-paper register (every deep is between 5.1 and 7.8:1 on paper; every mid is a tint of its deep); they would read as divider stocks of one book. No bright green, baby pink, primary blue, orange or lemon yellow is used.

Mechanics: tokens live in `prototype-source/css/tsoy-3b.css` as `--ttc-*`, `--preg-*`, `--fy-*`, `--pp-*`, `--tod-*`, `--fam-*`, `--cycle-*`, `--comp-*`; `[data-journey="…"]` on any ancestor maps the active family to `--j-deep`, `--j-mid`, `--j-wash`, which every journey-aware component consumes. Nothing here is implemented in the application; migration to `src/index.css` stage tokens is a later, flagged step.

Known 3A-to-3B colour deltas: the journal's dusty blue `#96ACB1` is now the First Year mid as well as the master ornament; the 3A sage wash `#E5ECE7` is replaced on My Week by the pregnancy wash and the support wash; the brown label `#896142` is unchanged for master labels but journey-scoped labels use the journey deep.
