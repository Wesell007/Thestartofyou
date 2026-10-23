# 3. Companion: a page that answers back

Prototype: `prototype-source/companion.html` (four states stacked) · captures `review/companion-*.jpg`. Answers are synthetic, written to TSOY tone rules and grounded in the real nausea article. **Provenance markers, the trust line and the "not found in trusted sources" state are a PROPOSED contract (phase 42A).** The live `ai-search` function streams text only, with `X-Companion-Boundary` / `X-Companion-Next-Actions` headers and no source, trust or safety fields; the escalation state here shows no action because the live backend already suppresses next actions on amber.

## Desktop concept (1440)

Signed-in app bar. A single centred 760 px conversation column: label "You asked · Week 12"; the question as a sentence-case display heading (34 px); a one-line meta ("Answered using your saved week. Guidance, not diagnosis."); the answer in the reading serif (19 px, 66ch) in short paragraphs with numbered superscript markers; the **trust block** ("What this answer used", brown small caps, tagged PROPOSED) listing the saved stage and the numbered sources; one or two **follow-ups** in prompt voice on hairlines; one optional **safe action** as a sentence with a link ("add it to your questions for your midwife"). The **ask dock** at the foot: reading-serif input on a single underline, a small Voice control, an Ask button, and the standing line "Private to you. The Companion never replaces your midwife, GP or emergency care."

## Mobile concept (390)

Same column at full width: question 26 px, answer 17 px; the ask dock is static at the end of each stacked state (sticky bottom in a real single-state screen), above the tab bar.

## States

| State | Composition | Rules shown |
|---|---|---|
| **Answer** | as above | one action maximum; follow-ups ≤ 2; markers link to the trust block |
| **Not found in trusted sources** (proposed) | the answer says plainly it will not guess, points to pharmacist/midwife; trust block reads "This answer uses no source"; one follow-up; **no action** | closed-world grounding, honesty over helpfulness |
| **Seek help** | the "now" tier notice replaces the answer body: wording, bordered "!" mark, blush-red wash, concrete routes (midwife, NHS 111, 999); one calm reassurance sentence; "Why this is fixed" explains the fixed guidance; **no follow-ups, no action**; meta says "fixed guidance, not a generated answer" | mirrors the existing safety architecture; next actions suppressed |
| **Journal-owner cue** | a short warm answer, then the blush band "In your journal" naming the printed page and offering "Write it in this week's page"; trust block states the Companion used journal ownership but **did not read any journal entries**, with a link to Privacy | ownership is permitted context; entries stay private unless explicitly shared |

## Typography, spacing

Question display serif 34/26; answer reading serif 19/17 at 1.6; trust and meta UI sans 15; follow-ups UI sans 17 on 14 px padded rows; dock input 18 px. Column 760 px; vertical rhythm 26–28 px between blocks.

## Interaction notes

- Streaming text fills the answer column paragraph by paragraph; no typing dots, no bubbles.
- Voice: tap-to-talk, transcribed into the field, the canonical text always visible; the control is small and secondary (no orb).
- Follow-ups open a new answer beneath the current one (the page grows like a letter), with the earlier question collapsing to its heading.
- The safe action appears only on GREEN answers; RED/CRISIS and amber show none.

## Accessibility notes

Superscript markers are links with the source as accessible name; the trust block is a landmark region; the "now" notice is an `aside` labelled by its title; colour never alone (kind label + mark + wording); input has a visible label (visually hidden) and a 44 px height; contrast as the token sheet; reduced motion: no animation.

## Journal-derived

The letter page as the model (p. 2): a warm correspondent writing in paragraphs; the prompt voice; the blush band for the journal cue; hairline structure.

## Digital adaptations

Provenance block and tag; closed-world "not found" honesty; fixed-guidance escalation; permission statement; voice as transport.

## Deliberately absent

Speech bubbles, avatars, a persona name or face, glowing orbs, AI gradients, rounded message containers, typing indicators, "regenerate" and thumbs-up chrome, emoji, suggested-prompt chips, any claim of medical authority.
