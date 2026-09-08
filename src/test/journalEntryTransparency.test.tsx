/**
 * AIC-JA3 — transparency wording is display-only, and never claims more than
 * what actually happened for that one completed answer.
 */

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CompanionJournalNote, {
  JOURNAL_CONTEXT_NOTE,
  JOURNAL_ENTRY_NOTE,
  JOURNAL_ENTRY_AND_CONTEXT_NOTE,
} from "@/components/companion/CompanionJournalNote";

describe("companion journal transparency", () => {
  it("says nothing when nothing was used", () => {
    const { container } = render(<CompanionJournalNote />);
    expect(container).toBeEmptyDOMElement();
  });

  it("names the selected entry on its own", () => {
    render(<CompanionJournalNote entryUsed />);
    expect(screen.getByText(JOURNAL_ENTRY_NOTE)).toBeInTheDocument();
  });

  it("names background journal on its own", () => {
    render(<CompanionJournalNote used />);
    expect(screen.getByText(JOURNAL_CONTEXT_NOTE)).toBeInTheDocument();
  });

  it("says both exactly once when both were used", () => {
    render(<CompanionJournalNote used entryUsed />);
    expect(screen.getByText(JOURNAL_ENTRY_AND_CONTEXT_NOTE)).toBeInTheDocument();
    expect(screen.queryByText(JOURNAL_ENTRY_NOTE)).toBeNull();
    expect(screen.queryByText(JOURNAL_CONTEXT_NOTE)).toBeNull();
  });
});
