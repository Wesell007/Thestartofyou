# Insert card

**Current state: NO INSERT CARD EXISTS, because the physical-to-digital activation system has not been built yet** (founder-confirmed, 23 October 2026). This is intentional current reality, not a missing asset and not a blocker. The insert card is a **new future TSOY product touchpoint**, designed from the new TSOY system, never inferred from the current Kidproducts packaging. The intended sequence: TSOY digital ecosystem built → physical-product activation architecture built → insert-card activation experience designed → unique activation code/QR system implemented → future physical stock and packaging updated → insert card added to the product rollout. Requirements: `docs/product/physical-product-activation-and-journal-owner-experience.md`. Nothing here designs the card yet.

## What exists today (digital side)

- **`/journal-start`** (Phase 27F) is a warm welcome page for "someone arriving from a card inside the physical journal". It offers to start the journey and sets a **device-level tone hint** (`src/lib/journalOwner.ts`, localStorage) that the code says "is never proof of purchase and never gates access".
- So the intended insert-card destination exists only as a **generic, unverified entry** (ownership level 1). Nothing unique per copy is printed or claimable.

## Requirements carried into the future card (from the product workstream; not a design)

1. **Two distinct codes, never merged:**
   - **activation QR / code**: unique per physical copy; establishes verified ownership once claimed;
   - optional **contextual QR codes** elsewhere in the journal, which route to content and prove nothing.
2. **The activation path the card starts:** insert card → unique activation → sign in or create an account → verified ownership → connect to the pregnancy → journal-owner experience ("Your journal continues here").
3. **Human fallback:** a short typable code with check characters next to the QR, printed legibly. No PII, Amazon order data or e-mail in the code.
4. **Gift-safe wording.** The person who scans may not be the buyer.
5. **Privacy and trust:** a plain statement of what activation does and does not do (for example, no sharing of journal content). Health-content tone rules apply.
6. **States the card's destination must handle** (designed in Gate 2): unclaimed, claimed by you, already claimed by another account (support route), invalid or mistyped code, app installed or absent.

## Design cues the card should inherit from the journal (input only)

- landscape-friendly proportions, matching the journal's format (exact size and stock **NEEDS PHYSICAL/PRINTER CONFIRMATION**);
- the title in spaced display capitals with the short dotted rule;
- functional text in the clean grotesque;
- a cream/blush ground with one corner botanical;
- a quiet hierarchy: the welcome line, then the action, then the code;
- no hard-sell or marketing claims.

## Open questions (owner/printer)

- card size and stock;
- placement in the box or journal;
- per-copy printing capability (variable-data QR) at the printer;
- edition labelling;
- whether a support URL or e-mail is printed;
- timing relative to the Kidproducts → The Start of You packaging rollover (the card is TSOY-branded from the start).
