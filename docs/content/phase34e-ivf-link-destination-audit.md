# Phase 34E IVF link destination audit

## Method

Destinations were classified by actual click behaviour rather than their visible styling. The approved kinds are `article`, `tool`, `ai`, `stage`, `hub`, `support`, and `journey`.

## Rules applied

| Kind | Required behaviour | Visitor wording |
| --- | --- | --- |
| article | Opens a genuine `/articles/...` route | Read guide |
| tool | Opens the IVF timeline utility | Use timeline or Track your timeline |
| ai | Sends a question into the existing Companion flow | Ask the Companion |
| stage | Opens one of the three IVF stage routes | Explore stage |
| hub | Opens a journey hub | Go to the pregnancy hub |
| support | Opens the support surface | Find support for hard moments |
| journey | Opens journey or journal continuity | Start your journey or the specific journal action |

Article sections contain article destinations only. AI suggestions appear only within the single page level Companion. No generic `Open` or `Ask` action remains in the IVF page flow.

## Route checks

All eight hub guide destinations and every crossover guide used on the three stages were confirmed against existing article records. Duplicate article destinations were removed within each page. The Pregnancy hub and Support retain their own destination kinds.