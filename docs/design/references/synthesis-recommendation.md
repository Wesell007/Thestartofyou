# Synthesis recommendation (Gate 2, Step 2)

**Recommendation: B + A + limited C, adopted as ONE system with three governing rules.** Scores: 50/60 on criteria, 38/40 on the eight flagship surfaces (`direction-scorecard.md`). Pure B ties on criteria but loses the physical/digital bridge and distinctiveness, which are TSOY's reasons to exist. Pure A and pure C fail health trust, scalability and sensitivity.

This is a recommendation for the founder, not an approval. Nothing is implemented.

## 1. What becomes the master system

**B, Editorial Keepsake, is the master system for every surface.** Concretely:

- the title-plus-dotted-rule header;
- the three-role typography (§6);
- the one-palette rule (cream ground, blush chapter ground, dusty blue-green signature, sage and blush tints, brown small labels, near-black text);
- structure from hairline rules, whitespace and soft washes, with no cards, shadows, gradients or blur;
- a 45–75 ch reading measure, body ≥ 16–17 px on mobile;
- graded urgency semantics for health notices in TSOY's own visual language;
- commerce separated from guidance.

## 2. Patterns reserved for Journal and My Week (the A budget)

Used only where the user writes, records or looks back: My Week, the digital journal and memories, reflection prompts, activation and the verified-owner home band ("In your journal this week").

- the printed week template as the digital week page (update, photo frame, prompts, highlights table, reminder);
- prompt blocks on soft sage/blush washes, text never on art;
- ruled writing fields; paper-bordered photo frames (no rotation on mobile);
- the "Your baby is the size of" row, **state-aware and opt-out**;
- prompt-first entry creation ("write it here or in your journal");
- "On This Day"-style resurfacing with loss-aware opt-out;
- the activation ceremony: journal image, one line, one action, typed fallback.

## 3. The illustration role that remains (the C budget)

Woodland watercolour art appears at **chapter openers and stage transitions, keepsake and celebration moments, empty and welcome states, and the Journal product page**, always at the edges and never behind text. It never appears on articles, hub lists, the Companion, settings, account, or any health notice. Characters are never avatars and never speak. All appearances are gated by journey state (none in TTC/IVF-only states unless the user owns the journal and chooses them; none after a recorded loss).

## 4. What gets removed from the current website

From `journal-audit/digital-gap-analysis.md` and `anti-references.md` rows 2, 3, 12, 14, 15, 17:

- the 32 px radius token and the card-as-default pattern (`rounded-2xl`/`rounded-3xl`, 919 uses);
- pill buttons and pill navigation (`rounded-full`, 1,534 uses);
- drop shadows as elevation (1,509 uses);
- gradients and blur (`bg-gradient` 488, `backdrop-blur` 137);
- per-stage colour palettes as brand switching;
- most micro-animation (`animate-` 141);
- uppercase micro-labels on every block (1,366 uses);
- Playfair Display as the display voice (replaced by the spaced-capital display character below);
- gradient and blur heroes, card-grid hubs, dashboard-style My Journey.

Kept and evolved: information architecture, routes and SEO, the existing accessibility behaviours, the parchment/paper utilities as a starting point, genuine journal photography, the safety architecture of the Companion.

## 5. Typography character (fonts not locked; licences unresolved)

| Role | Character wanted | Evidence |
|---|---|---|
| **Display** | a high-contrast, hairline **display serif set in spaced capitals** for titles and chapter openers; decorative alternates welcome in the wordmark only; never used for body or UI | the journal's Adorn Story Serif (file-proven); A1–A3 role split |
| **UI / prompt sans** | a neutral, humanist-leaning grotesque with a quiet personality, medium x-height, good at 14–17 px; sentence case for prompts; semibold caps only for small functional labels | Aileron in the journal; NYT Franklin role; Bugaboo weight hierarchy |
| **Reading serif** | a sturdy text serif with even colour for articles, Companion answers and letters; comfortable at 17–19 px with generous leading | Source Serif in the founders' letter; Guardian Egyptian retained for readability |
| **Script** | **none in the UI.** A script appears only as a decorative signature in rare keepsake moments (a letter sign-off), rendered as an image or a single licensed display use, never for interactive text | Savoye in the journal used three times in 148 pages |
| **Tracking** | display caps tracked wide (≈ 0.08–0.2 em, to be tuned by size); UI and body at normal tracking; small caps labels tracked slightly | journal titles; eyebrow restraint rule |
| **Mobile scaling** | display titles step down and may wrap to two lines at 390 px; body never below 16 px; measure 45–60 ch on phones | G6, A5 |

Candidate selection (licence and technical evaluation) is Step 3 work: evaluate the journal's own faces first (Adorn Story Serif, Aileron, Source Serif) for web/app licences, then equivalents of the same character. **Do not choose a font because a reference uses it**, and do not reuse the Lovable-era pair by default.

## 6. Photographic character

Candid, natural light, real homes, real journals in use, partners and families present; skin tones and family forms diverse; no white-studio bump imagery, no staged "glow". Product photography shows paper, cloth and edges truthfully. User photos are shown plain: full-width or paper-bordered, never filtered, never behind text. Higgsfield is used later for supporting campaign and hero assets under this brief and the health-content rules, never to fabricate the journal itself.

## 7. Motion character

Still by default. Motion is allowed for: chapter openers and stage transitions (a slow fade or page-turn), state feedback (saved, claimed), and a single quiet reveal of a photo or prompt. No ambient loops, parallax, marquees, hover physics or scroll theatre. Everything respects reduced motion; all motion is transform/opacity only.

## 8. What the Companion should feel like

A page of a calm publication that answers back: a narrow reading column in the text serif; short paragraphs rather than lists where the content allows; a quiet provenance line beneath each answer in the small display label ("based on your saved week; source: NHS"); when the answer cannot be grounded, it says so; one or two follow-ups in the journal's "…" prompt voice; one optional action line on GREEN answers; no bubbles, avatars, typing dots or orbs; voice as transport with the canonical text visible, short spoken turns, clearly non-human.

## 9. Journal-owner experience in this system

"Your journal continues here" is the cover composition on screen: cream-blush ground, the spaced-capital title, a small rule, the journal photographed, one line, one action. After claiming, the owner's Today and My Week carry the A-budget week page and the band "In your journal this week", and the Companion may refer to the journal page. Non-owners see the same system minus the band and the physical-page references; nothing essential is withheld.

## 10. Kidproducts branding recommendation

**Recommendation: The Start of You is the sole consumer-facing digital master brand. Kidproducts does not appear in the digital product.**

- **Consumer equity:** none found in the digital context. The brand appears on the box lid and the journal's back cover and letter signature as the maker; it has no presence in the digital journey and no search or social equity relevant to TSOY's audience was identified.
- **Confusion risk:** real. The lid already shows the maker logo competing with the product title (`journal-audit/packaging.md`). Repeating it digitally would split the brand a new user is trying to learn.
- **Provenance:** keep Kidproducts as **manufacturer and legal provenance only**: packaging back/base panel, imprint, terms and the legal-entity line where required. Not in navigation, footer branding, onboarding or the Companion.
- **Future packaging:** move toward TSOY-only consumer-facing branding on the lid and cover; maker mark small, on the back or base.

**Legal / IP questions recorded separately (for the owner's adviser, not decided here):** who owns the "The Start of You" name and any registration; who owns the journal's illustration files and fonts and under which licences; whether product-liability or consumer-law imprint requirements oblige a maker name on packaging or in the app's legal pages; and whether the Winnie-the-Pooh quotations in the printed journal are cleared for any digital reuse.

## 11. Answers to the design questions (§9 of the brief)

| Question | Answer |
|---|---|
| How editorial should TSOY become? | Fully editorial on reading and informational surfaces; editorial structure with keepsake devices on writing surfaces. |
| How much physical-journal resemblance? | Recognisable on the week page, journal, prompts and activation; typographic and tonal elsewhere. |
| How much illustration? | Edges and openers only; a C budget of roughly one motif per chapter moment, none on dense or health pages. |
| Where should woodland characters appear? | Chapter openers, celebrations, empty and welcome states, the product page; never as avatars or near health copy; state-gated. |
| How do IVF/loss states differ without a separate brand? | Same type, palette and page; keepsake and celebratory elements, fruit rows and characters switched off by state; content streams pausable in one action; Companion tone shifts. |
| What replaces card grids? | Chapter sections: a title with the dotted rule, then rows or short editorial entries separated by hairlines and whitespace. |
| What replaces pill navigation and actions? | A quiet masthead and tab bar with text links; actions as text-led or hairline buttons with small radius. |
| What does a premium TSOY button look like? | Sentence-case label in the UI sans, hairline border or a light signature-blue fill, small radius, generous padding, no shadow, visible focus ring, one primary per view. |
| What does a digital prompt look like? | A sentence starter ending in "…" in the UI sans over a soft wash, with a ruled or open writing field beneath and an optional "write it in your journal" line. |
| What does a journal entry look like? | A dated page: small chapter label, optional title, the user's text in the reading serif, media inline with paper borders, quiet metadata; no card. |
| What should Companion answers look like? | §8. |
| What does "Your journal continues here" look and feel like? | §9. |
| How does it translate to 390 px? | `mobile.md` translation table: single column, deliberate title wrapping, washes as full-width bands, frames unrotated, one corner motif at most. |
| What patterns do web and app share? | Type roles and scale, tokens, header, prompt block, photo frame, urgency notice, Companion column, chapter opener. |

## 12. Open decisions for the founder

1. Approve or amend the recommended direction (B + A + limited C with the three rules).
2. Confirm the Kidproducts recommendation and raise the IP questions with an adviser.
3. Decide the illustration budget for TTC, IVF, Toddler and Family, where no journal art exists today: commission matching watercolour art later, or keep those stages typographic only.
4. Licence path for the journal's typefaces versus equivalents (Step 3 evaluation).
5. Photography: commission, curate, or combine with Higgsfield-supported assets.
6. Whether the "size of" fruit convention continues digitally at all, given its loss sensitivity, or becomes an optional detail.
7. Inclusive wording decisions carried from the audit ("Dear Mother", Mother/Father fields).

## 13. Recommended next step

**Gate 2, Step 3: flagship screens in the recommended system**, in this order: (1) article page, (2) My Week (state-aware), (3) Companion answer, (4) journal-owner activation, (5) homepage, each at desktop and 390 px, as static design artefacts for review, with a typeface licence and technical evaluation run in parallel. No runtime code until the founder approves the flagship set.
