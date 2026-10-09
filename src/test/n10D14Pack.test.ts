import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// N10.4: the D14 privacy/legal approval pack is a human gate. These checks keep it complete and keep
// it from being presented as approved before a human signs it.

const normalise = (text: string) => text.replace(/\r\n/g, "\n");
const doc = normalise(readFileSync(resolve(process.cwd(), "docs/strategy/n10-d14-privacy-legal-release-gate.md"), "utf8"));
const alerting = normalise(readFileSync(resolve(process.cwd(), "docs/strategy/n10-operator-alerting.md"), "utf8"));

describe("D14 approval pack", () => {
  it("has every required section", () => {
    for (const heading of [
      "Executive summary", "Architecture summary", "Exact deletion sequence", "Retained-data inventory",
      "Completed-row retention", "Risk / purpose analysis", "D15", "User-facing copy", "Unresolved legal / privacy questions",
      "Reviewer checklist", "D14 HUMAN DECISION",
    ]) expect(doc, heading).toContain(heading);
  });

  it("stays OPEN and unsigned: no ticked box, no filled reviewer", () => {
    expect(doc).toMatch(/\*\*Status: D14 = OPEN\.\*\*/);
    expect(doc).toMatch(/Until a human completes this block: D14 = OPEN/);
    expect(doc).not.toMatch(/\[x\]/i);
    const block = doc.slice(doc.indexOf("D14 HUMAN DECISION\n\n[ ]"));
    expect(block).toMatch(/Reviewer:\n_{8,}/);
    expect(block).toMatch(/_____ days/);
  });

  it("keeps retention technically proven / legally unapproved with the three reviewer options", () => {
    expect(doc).toContain("30-day retention = TECHNICALLY PROVEN / LEGALLY UNAPPROVED");
    for (const option of ["**A. APPROVE 30 days**", "**B. APPROVE a different number of days", "**C. REJECT post-completion retention**"]) expect(doc).toContain(option);
  });

  it("does not assert a lawful basis as fact and flags pseudonymity", () => {
    expect((doc.match(/LEGAL REVIEW REQUIRED/g) ?? []).length).toBeGreaterThanOrEqual(5);
    expect(doc).toMatch(/pseudonymous, not anonymous/);
    expect(doc).not.toMatch(/lawful basis (is|=)\s/i);
  });

  it("covers every inventory class A–J plus the pre-existing e-mail and analytics records", () => {
    for (const row of ["| A |", "| B |", "| C |", "| D |", "| E |", "| F |", "| G |", "| H |", "| I |", "| J |", "| K |", "| L |", "| M |", "| N |"]) expect(doc, row).toContain(row);
    for (const table of ["email_send_log", "suppressed_emails", "email_unsubscribe_tokens", "PostHog"]) expect(doc).toContain(table);
  });

  it("the operator-alert blocker is not claimed closed and no destination address is written down", () => {
    expect(alerting).toMatch(/Operator-alert blocker = OPEN/);
    expect(alerting + doc).not.toMatch(/[A-Za-z0-9._%+-]+@(?!example\.invalid)[A-Za-z0-9-]+\.[A-Za-z]{2,}/);
  });
});
