## Phase 9.1 — Pregnancy SEO Layer (Hub, Topics, Trimesters)

Add per-route `SeoHead` to the Pregnancy hub, 6 topic pages and 3 trimester pages. Mirror the Family / First Year / Toddler pattern. No layout, data, route or copy changes. No Article JSON-LD.

### Files to edit (10)
- `src/pages/Pregnancy.tsx`
- `src/pages/pregnancy/BabyTopic.tsx`
- `src/pages/pregnancy/BodyTopic.tsx`
- `src/pages/pregnancy/DietAndExerciseTopic.tsx`
- `src/pages/pregnancy/FeelingsTopic.tsx`
- `src/pages/pregnancy/HealthAndSafetyTopic.tsx`
- `src/pages/pregnancy/PreparingForBabyTopic.tsx`
- `src/pages/trimester/FirstTrimester.tsx`
- `src/pages/trimester/SecondTrimester.tsx`
- `src/pages/trimester/ThirdTrimester.tsx`

### Pattern
Each file gets `import SeoHead from "@/components/seo/SeoHead";` and wraps its return in a fragment with `<SeoHead title description canonical />` above the existing tree. `ogType` uses SeoHead's `website` default. No `jsonLd` prop, so no Article schema.

### Approved SEO strings (verbatim)

Hub `/pregnancy`:
- `Pregnancy Guide | Weeks, Trimesters, Symptoms & Support`
- `Calm, practical pregnancy guidance from early symptoms and week-by-week changes to trimesters, baby development, body changes and emotional support.`

Topics (canonical `https://thestartofyou.com/pregnancy/<slug>`):
- baby — `Baby Development in Pregnancy | The Start of You` / `Follow your baby's development through pregnancy with calm guidance on growth, movement, scans and what changes week by week.`
- body — `Pregnancy Body Changes and Symptoms | The Start of You` / `Supportive guidance on pregnancy body changes, symptoms, discomforts and when to ask for advice if something worries you.`
- diet-and-exercise — `Pregnancy Diet and Exercise | The Start of You` / `Calm, practical guidance on eating well, movement, exercise, hydration and looking after your body during pregnancy.`
- feelings — `Pregnancy Feelings and Emotional Wellbeing | The Start of You` / `Gentle support for pregnancy emotions, anxiety, identity, relationships and the feelings that can come with becoming a parent.`
- health-and-safety — `Pregnancy Health and Safety | The Start of You` / `Clear pregnancy guidance on health, safety, warning signs, appointments and when to ask your midwife, GP or local service for advice.`
- preparing-for-baby — `Preparing for Baby | Birth, Home and Newborn Planning` / `Practical pregnancy guidance for preparing for birth, planning your home, packing a hospital bag and getting ready for your baby.`

Trimesters (canonical `https://thestartofyou.com/pregnancy/<slug>`):
- first-trimester — `First Trimester Guide | Early Pregnancy Symptoms & Support` / `A calm guide to the first trimester, including early pregnancy symptoms, baby development, appointments, emotions and when to ask for advice.`
- second-trimester — `Second Trimester Guide | Baby Growth, Movement & Body Changes` / `Supportive second trimester guidance covering baby growth, movement, scans, body changes, energy shifts and preparing for the months ahead.`
- third-trimester — `Third Trimester Guide | Birth Preparation, Symptoms & Support` / `Calm third trimester guidance on baby movement, body changes, birth preparation, appointments and support as your due date gets closer.`

### Canonical / OG / JSON-LD
Absolute production URLs under `https://thestartofyou.com`. `og:type` = `website` for all 10 pages. No `jsonLd` prop passed. No fabricated dates, authors, publishers or reviewers.

### Verification
- `bunx tsgo --noEmit`
- Playwright 1280×1800 + 375×812 across all 10 routes: assert 200, correct title / description / canonical / og:*, and no Article JSON-LD.
- Regression sweep (200): `/articles/complete-guide-morning-sickness`, `/articles/anxiety-in-pregnancy`, `/first-year`, `/toddler`, `/family`, `/trying-to-conceive`, `/ivf`.

### Done criteria
All 10 routes ship correct SEO tags, no Article JSON-LD, no visible layout change, tsgo clean, no cross-hub regressions.