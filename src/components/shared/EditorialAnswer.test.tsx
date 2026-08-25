import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import EditorialAnswer from "@/components/shared/EditorialAnswer";

const renderAnswer = (markdown: string) =>
  render(<EditorialAnswer markdown={markdown} disableLinks />);

describe("EditorialAnswer section cards", () => {
  it("renders each approved section as its own card with its body", () => {
    const md = `Most people feel first movements between 16 and 24 weeks.

## What this means

This is a normal range and it can be later with a first pregnancy.

## What may help

- Rest on your side and notice the pattern

## When to seek support

Contact your midwife if the pattern changes.`;

    const { container } = renderAnswer(md);
    const cards = container.querySelectorAll("[data-answer-section-card]");
    expect(cards).toHaveLength(3);

    const headings = Array.from(cards).map((c) => c.querySelector("h2")?.textContent);
    expect(headings).toEqual(["What this means", "What may help", "When to seek support"]);

    expect(cards[0].textContent).toContain("normal range");
    expect(cards[1].textContent).toContain("Rest on your side");
    expect(cards[2].textContent).toContain("Contact your midwife");
  });

  it("treats an approved bold lead-in at the start of a paragraph as a section", () => {
    const { container } = renderAnswer(
      "Opening line here.\n\n**What this means** The movements can feel like fluttering.\n\n**When to seek support** Tell your midwife if the pattern changes.",
    );
    const cards = container.querySelectorAll("[data-answer-section-card]");
    expect(cards).toHaveLength(2);
    expect(cards[0].textContent).toContain("fluttering");
    expect(cards[1].textContent).toContain("Tell your midwife");
  });

  it("does not create a card when the wording appears inside body text", () => {
    const { container } = renderAnswer(
      "Here is what this means for you, and what may help day to day, and when to seek support.",
    );
    expect(container.querySelectorAll("[data-answer-section-card]")).toHaveLength(0);
  });


  it("preserves the urgent seek callout treatment", () => {
    const { container } = renderAnswer(`## When to call

Call your maternity unit straight away if movements change.`);
    expect(container.querySelectorAll("[data-answer-section-card]")).toHaveLength(0);
    expect(container.textContent).toContain("When to seek support");
    expect(container.textContent).toContain("maternity unit");
  });

  it("renders links as plain text inside section cards", () => {
    const { container } = renderAnswer(`## What may help

Read [the NHS page](https://www.nhs.uk/) for more.`);
    expect(container.querySelectorAll("a")).toHaveLength(0);
    expect(container.textContent).toContain("the NHS page");
  });

  it("handles plain label lines used instead of markdown headings", () => {
    const { container } = renderAnswer(
      "What this means:\n- Common symptoms: tiredness.\n\nWhat may help:\n- Rest when you can.\n\nWhen to seek support: Speak to your midwife if symptoms are severe.",
    );
    const cards = container.querySelectorAll("[data-answer-section-card]");
    expect(cards).toHaveLength(3);
    expect(cards[2].textContent).toContain("Speak to your midwife");
  });
});
