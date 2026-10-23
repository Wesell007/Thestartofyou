# TSOY native app roadmap

**Status: OFFICIAL ROADMAP / DESIGN NOT STARTED / IMPLEMENTATION NOT STARTED.** Recorded in Gate 0 (23 October 2026). Conceptual only: no mobile code exists or is to be written in Gate 0. Programme gates: `docs/strategy/tsoy-v1-product-rebaseline.md`.

## 1. Sequencing

| Stage | Starts when | Gate |
|---|---|---|
| App design | during the Journal-to-Digital redesign | Gate 2 |
| App technical architecture | web V1 ≈ 60–70 % stable | during Gates 3–5 |
| Full native implementation | web/platform V1 ≈ 80–90 % stable | Gate 6 |
| App public launch | after the premium web V1 **and** the shared production backend are proven | Gate 11 |

"Stable" is judged by the owner against the open gates in `roadmap.md`, not by a calendar.

## 2. One platform, not two

The app and the website share:
- the backend;
- identity (Supabase Auth);
- the family model (41B);
- the journey model;
- AI systems (the same Edge Functions, safety layer and release gate);
- memory;
- journal data and storage;
- permissions (the same RLS);
- design tokens where practical.

**The backend is never duplicated.** Platform-specific needs (push tokens, device registration, background upload) are added to the shared backend as new migrations and functions on staging first. Account deletion (N10) must cover app-only data such as push tokens.

## 3. Product roles

**Web:**
- discovery;
- SEO/AEO/GEO;
- editorial guidance;
- calculators;
- product commerce;
- acquisition;
- the public Companion;
- account creation.

**App:**
- Today and My Journey;
- Companion, voice and proactive intelligence;
- journal, camera/photo/video, voice notes, memories and milestones;
- partner/co-parent;
- reminders, notifications and checklists;
- safe agentic actions.

**Potential first navigation (conceptual):** Today · Journey · Companion · Journal · Family · You.

## 3a. Physical product ownership (planned)

The app inherits the same physical-product ownership model and backend (`docs/product/physical-product-activation-and-journal-owner-experience.md`):
- a future activation URL opens the web flow when the app is absent and deep-links into the app when it is installed;
- the Journal area connects the **physical journal** (current week, reflection prompt, contextual scan) with the **digital journal** (photos, video, voice, memories, milestones, Companion reflection support).

No native code now.

## 4. Open decisions (for the app architecture stage)

These are not decided in Gate 0:
- the native stack (for example React Native/Expo or fully native) and its code sharing with the web;
- offline and sync model for journal media;
- notification provider;
- app-store privacy disclosures (these must match D14's final wording);
- minimum OS versions;
- how health-content safety rules and escalation wording carry over to voice and notification surfaces.
