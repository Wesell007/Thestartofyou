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

  it("states that required e-mail cleanup is transactional with Auth deletion (old non-blocking wording only as superseded)", () => {
    expect(doc).toMatch(/Required same-database e-mail cleanup is transactional with Auth deletion/);
    const stale = doc.match(/[^\n]*never block the Auth deletion[^\n]*/g) ?? [];
    for (const line of stale) expect(line).toMatch(/Superseded/);
  });

  it("has the Revision 3 owner decision block with every decision A–G visible and unticked", () => {
    const block = doc.slice(doc.indexOf("N10 D14 OWNER DECISION"));
    for (const line of ["A. Completed deletion record", "B. email_send_log", "C. email_unsubscribe_tokens", "D. suppressed_emails", "E. PostHog", "F. Disclose provider backup/log retention", "G. Adopt the 0.7 UI copy"]) expect(block, line).toContain(line);
    expect(doc).toMatch(/This owner block does \*\*not\*\* close D14/);
    expect(doc).toMatch(/\*\*NOT AUTHORISED \/ NOT IMPLEMENTED\*\*; needs a backend credential/);
  });

  it("Revision 4 records the owner decisions as engineering direction, keeps D open and D14 OPEN", () => {
    const rev4 = doc.slice(doc.indexOf("## 0A. Revision 4"), doc.indexOf("## 0. Owner decision packet"));
    expect(rev4).toMatch(/\*\*D14 = OPEN\.\*\*/);
    expect(rev4).toMatch(/This is owner approval of engineering direction, not formal legal approval/);
    for (const row of [
      /\| A \| Completed deletion record \| \*\*APPROVED\*\*/,
      /\| B \| `email_send_log` \| \*\*APPROVED\*\*/,
      /\| C \| `email_unsubscribe_tokens` \| \*\*APPROVED\*\*/,
      /\| D \| `suppressed_emails` \| \*\*OPEN \/ VERIFY REQUIREMENT\*\*/,
      /\| E \| PostHog \| \*\*APPROVED ENGINEERING DIRECTION\*\*/,
      /\| F \| Provider backups \/ logs \| \*\*APPROVED\*\*/,
      /\| G \| UI \/ Privacy wording \| \*\*APPROVED AS WORKING DRAFT \/ NOT PUBLISHED\*\*/,
    ]) expect(rev4).toMatch(row);
    expect(rev4).toMatch(/Production accessed\/modified = \*\*NO\*\*/);
    expect(rev4).toMatch(/41B\.1B = \*\*NOT STARTED \/ NOT AUTHORISED\*\*/);
    expect(rev4).toMatch(/scoped to the single TSOY project only\*\*, with the \*\*`person:write`\*\* scope only/);
  });

  it("no wording lets the owner clear a legal-review item on their own authority (except as withdrawn)", () => {
    const lines = doc.split("\n").filter((l) => /own authority|explicitly accepted by the owner/i.test(l));
    expect(lines.length).toBeGreaterThan(0);
    for (const line of lines) expect(line).toMatch(/does \*\*not\*\* clear|withdrawn in Revision 4|owner acceptance alone does not clear/);
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

  it("the operator-alert blocker is not claimed closed and only the owner-approved addresses appear", () => {
    expect(alerting).toMatch(/Operator-alert blocker = OPEN/);
    // Only the two owner-approved addresses (destination / sender) may appear, as documented configuration.
    const approved = new Set(["contact@thestartofyou.com", "contact@wesellproducts.co.uk"]);
    const found = (alerting + doc).match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g) ?? [];
    for (const address of found) expect(approved.has(address) || address.endsWith("@example.invalid"), address).toBe(true);
    expect(alerting).toMatch(/\| `N10_OPERATOR_ALERT_EMAIL` \| `contact@thestartofyou\.com` \|/);
    expect(alerting).toMatch(/\| `N10_OPERATOR_ALERT_FROM` \| `contact@wesellproducts\.co\.uk` \|/);
  });
});
