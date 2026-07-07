# Phase 8.5 — Toddler Batch 4 Publishing (Speech + Health and Safety)

## Scope
Only `src/data/toddlerArticleData.ts`. Replace the four remaining draft article objects with full ready articles. No image mappings, components, routes, topic pages, cards, SEO, or non-Toddler files touched.

## Articles to publish (draft → ready)
Each keeps its existing `slug`, `topic`, `title`, `description`. `readTime` bumped only if length requires it. `lastUpdated: "2026-07"` on all four. All follow: 7 sections × 2 short paragraphs, 5–6 takeaways, 3 related slugs (ready Toddler only), 3–5 UK-first sources, British English, no em dashes, no diagnosis, no treatment/medication advice, no emergency thresholds, no invented stats/reviewers, no autism/ADHD speculation, no shame or fear wording, no "wait and see" if a parent is worried.

### 1. `supporting-toddler-speech-at-home` (speech-language)
- `medicallyReviewed`: **not set** (existing draft has no flag; brief says false unless already true).
- Sections: speech grows through everyday connection; talking during ordinary routines; following your toddler's interest; repeating words without pressure; songs, books and simple games; giving time to respond; when to ask for advice.
- Final section includes the careful wording: "If you are worried about your toddler's speech, understanding, hearing, interaction or communication, ask your health visitor, GP or appropriate local service for advice."
- Related: `when-to-ask-about-speech-delay`, `what-toddler-development-can-look-like`, `building-connection-through-everyday-play`.
- Sources (4): NHS Start for Life (learning to talk), NHS speech and language milestones, BBC Tiny Happy People, Speech and Language UK.

### 2. `when-to-ask-about-speech-delay` (speech-language)
- `medicallyReviewed: true`, `reviewedBy: "Jenny Joines"`.
- Sections: why speech can worry parents; speech, understanding and communication; hearing and interaction; looking at patterns over time; what to note before asking for advice; who you can speak to; asking early is allowed.
- Careful wording: "If you are worried about your toddler's speech, understanding, hearing, interaction, behaviour or development, ask your health visitor, GP or appropriate local service for advice."
- Related: `supporting-toddler-speech-at-home`, `when-milestones-feel-different`, `what-toddler-development-can-look-like`.
- Sources (5): NHS (speech and language therapy), NHS Start for Life (learning to talk), RCSLT, Speech and Language UK, BBC Tiny Happy People.

### 3. `toddler-home-safety` (health-safety)
- `medicallyReviewed: true`, `reviewedBy: "Jenny Joines"`.
- Sections: why toddler safety changes quickly; falls, stairs and climbing; hot drinks, cooking and burns; small objects, choking and batteries; medicines and cleaning products; water, doors and windows; building simple safety habits.
- No fear lists, no graphic detail, no emergency instructions.
- Related: `when-to-call-the-gp`, `what-toddler-development-can-look-like`, `potty-training-without-pressure`.
- Sources (4): NHS Start for Life (safety at home), Child Accident Prevention Trust (CAPT), RoSPA (home safety), NHS (baby and toddler safety).

### 4. `when-to-call-the-gp` (health-safety)
- `medicallyReviewed: true`, `reviewedBy: "Jenny Joines"`.
- Sections: you do not need to be sure before asking; changes in behaviour, feeding or drinking; temperature and feeling unwell; breathing, rashes and pain concerns; accidents, bumps and injuries; trusting your judgement; who to contact and what to say.
- No hard emergency threshold list. No 999 rules. Signposts GP, health visitor, NHS 111 and appropriate local services in general terms.
- Careful wording: "If your toddler seems very unwell, symptoms are worsening, breathing worries you, they are not drinking as usual, a rash worries you, they have had an injury, or your instinct says something is not right, ask your GP, NHS 111, health visitor or appropriate local service for advice."
- Related: `toddler-home-safety`, `when-milestones-feel-different`, `picky-eating-in-toddlers`.
- Sources (4): NHS (when to worry about your child), NHS 111 (online), NHS Start for Life (toddler), Healthier Together.

## Verification
- `bunx tsgo --noEmit` — clean.
- Counts: 16 total, 16 ready, 0 draft (grep-verified).
- Playwright 200 + H1 correct on all 4 new ready routes:
  - `/toddler/speech-language/supporting-toddler-speech-at-home`
  - `/toddler/speech-language/when-to-ask-about-speech-delay`
  - `/toddler/health-safety/toddler-home-safety`
  - `/toddler/health-safety/when-to-call-the-gp`
- Topic pages `/toddler/speech-language` and `/toddler/health-safety` show 2 clickable ready cards each; no "Coming soon" anywhere across `/toddler/*` topic pages.
- Related grids on the four new articles reference only ready slugs.
- Medical review pill renders on the three flagged articles; does not render on `supporting-toddler-speech-at-home`.
- Safety grep across the four new articles for forbidden phrases: "diagnose", "diagnosis", "medication", "medicine dose", "call 999", "wait and see", "autism", "ADHD", "should not worry" — must be absent (or only in the sanctioned careful-wording line).
- Regression sweep (200 each): `/toddler`, `/toddler/speech-language`, `/toddler/health-safety`, `/first-year`, `/articles/complete-guide-morning-sickness`, `/pregnancy`, `/trying-to-conceive`, `/ivf`.
- Diff scope: only `src/data/toddlerArticleData.ts`.

## Go/no-go
On green verification: safe to proceed to Phase 8.5b Toddler Batch 4 image mappings.
