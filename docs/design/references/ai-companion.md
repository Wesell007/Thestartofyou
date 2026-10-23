# E. AI Companion references

Looking for: premium conversational surfaces, text hierarchy, suggested prompts, trust and provenance, answer-to-action, voice concepts, interfaces that do not look like generic chatbot software. Evaluated against the existing control layer (`docs/ai/README.md`), phase 42A provenance and 42B answer-to-action, and P1/P2/P9.

## E1. Perplexity (answer page)

- **Source:** 925 Studios design breakdown ([link](https://www.925studios.co/blog/perplexity-design-breakdown)); UX Design Institute ([link](https://www.uxdesigninstitute.com/blog/?p=10492)); LLM Pulse on citation mechanics ([link](https://llmpulse.ai/blog/how-perplexity-works/)).
- **Exact screen:** **answer-first** layout: the direct answer, inline numbered citations that open source cards, then related questions; citations are the retrieved sources, not decoration.
- **Works:** reading order (answer → sources → next questions) suits TSOY's 42A provenance line; numbered inline markers keep the text calm; related questions are an answer-to-action seed.
- **Does not work:** source quality varies; the mobile reading gets dense; related questions are noisy. For health content, TSOY cannot cite arbitrary web sources: provenance must be the grounded, reviewed set.
- **Translates:** answer column with the article measure; a quiet "what this answer used" line beneath (saved stage, page area, source type) in the display-serif small label; two or three follow-ups phrased in the journal's prompt voice.
- **Must not copy:** web-wide citations; the card-dense sources strip.
- **Principles:** supports P9 (provenance), P1.
- **Direction relevance:** B.

## E2. NotebookLM / Gemini Notebook (grounded citations)

- **Source:** CASRAI research-workflow guide ([link](https://www.casrai.org/guides/notebooklm-for-research-workflows)); Bowdoin KB ([link](https://bowdoin.teamdynamix.com/TDClient/1814/Portal/KB/Article/171368/What-is-NotebookLM)). *Product naming is changing; interface details may shift.*
- **Exact interaction:** small numbered markers in each answer jump to the exact passage in the uploaded source; the tool signals when an answer is not in the sources.
- **Works:** **closed-world grounding** with "not in your sources" honesty is the right trust model for TSOY's default-deny grounding; passage-level jump is the clearest provenance affordance found.
- **Does not work:** document-tool chrome; multi-pane layout unsuited to a calm page.
- **Translates:** when TSOY grounds on approved articles (future 30-series approvals), the citation opens the exact passage; when it cannot ground, the answer says so plainly.
- **Must not copy:** the workspace layout.
- **Principles:** supports P9.
- **Direction relevance:** B.

## E3. Pi (Inflection): warmth and voice

- **Source:** Build Fast with AI review ([link](https://www.buildfastwithai.com/ai-tools/pi)); Tools for Humans ([link](https://www.toolsforhumans.ai/ai-tools/pi-ai)); App Store listing ([link](https://apps.appfollow.io/ios/pi-your-personal-ai/6445815935?country=us)).
- **Exact pattern:** emotionally warm, conversational register; **refuses cold structured lists**; voice mode central; remembers context across sessions.
- **Works:** proof that an AI surface can feel like a kind correspondent rather than a tool; conversational paragraphs match the journal's letter page (p. 2) better than bullet dumps.
- **Does not work:** warmth without provenance is a liability for health; "companion" framing can over-personify (TSOY's companion must never imply it replaces a professional).
- **Translates:** paragraph-first answers, short; the Companion's voice modelled on the founders' letter; voice as transport (ADR-AIC6-01) with the canonical text always visible.
- **Must not copy:** personified identity cues; memory without explicit permission.
- **Principles:** supports P2, P9 (tone); must be paired with E1/E2 for trust.
- **Direction relevance:** B, with A's letter-page typography.

## E4. Sesame (voice companion demo) vs ChatGPT voice

- **Source:** TechRadar ([link](https://www.techradar.com/computing/artificial-intelligence/i-tried-the-most-realistic-ai-voice-companion-ever-created-if-chatgpt-or-gemini-ever-gets-this-good-reality-is-in-trouble&amp)); Beebom ([link](https://beebom.com/sesame-ai-voice-companion-maya-experience-like-talking-to-real-person/amp/)); Human or Not comparison ([link](https://humanornot.so/blog/sesame-vs-chatgpt-voice-mode)).
- **Exact pattern:** pauses and imperfections designed to feel human; honest about not being full-duplex; ChatGPT's paragraph-read-aloud criticised as robotic.
- **Works:** voice design is about **timing and brevity**, not a visual orb; honesty about limits.
- **Does not work:** hyper-realistic voice raises the "is this a person?" risk, which in health support must be avoided.
- **Translates:** TSOY voice (Gate 5): short spoken turns, always transcribed; a clear non-human identity; no audio before safety routing (ADR-AIC6-03).
- **Must not copy:** human-impersonating voice design.
- **Principles:** supports P9, P10 (no animated orb theatre).
- **Direction relevance:** app/B.

## E5. Apple Journal suggestions as answer-to-action (cross-reference B2)

- The suggestion sheet is the cleanest model for 42B: after a GREEN answer, offer one quiet action ("Add to questions for my midwife", "Save to your journal") as a line, not a button bar. RED/CRISIS answers offer no action (existing rule).

## Category conclusion

TSOY's Companion should look like **a page of a calm publication that can talk back**: a narrow answer column in the reading serif, a provenance line in the small display label, one or two follow-up prompts in the journal's sentence-starter voice, and no chat bubbles, avatars or orbs. Perplexity/NotebookLM supply the trust mechanics, Pi the tone, Sesame the voice caution.
