# Phase 36A Pregnancy destination audit

## Hub accounting

- Canonical hub route: `/pregnancy`
- Primary topic pathways: 6
- Canonical topic destinations: `/pregnancy/body`, `/pregnancy/baby`, `/pregnancy/feelings`, `/pregnancy/health-and-safety`, `/pregnancy/diet-and-exercise`, `/pregnancy/preparing-for-baby`
- Trimester destinations: 3
- Week destinations: 42 through the existing `/pregnancy/week/:week` route
- Pregnancy to IVF destination: `/ivf`
- Existing destination URLs changed: 0

## Topic accounting

- Shared topic-template consumers: 6; in scope 6; out of scope 0
- Start Here records retained: 14, with existing variable counts of 1–3 per topic
- Grouped libraries retained: 23 groups and 102 configured links
- Destination kind is presentation metadata only; existing `href` values remain authoritative.
- Start Here action labels are `Read the guidance`, `Explore the topic`, or `Use the tool` according to destination behavior.
- Misleading group `View all` actions after refinement: 0
- Duplicate destination rendered within a configured group: 0
- Configured library destinations silently hidden by a display cap: 0

## Editorial and AI separation

- Hub editorial questions retained: 6
- Direct AI actions inside editorial questions: 0
- Existing hub Companion modules: 1, after editorial discovery
- Contextual topic Companion handoffs: exactly 1 per canonical topic page
- Additional AI runtime, prompt, grounding or memory paths: 0