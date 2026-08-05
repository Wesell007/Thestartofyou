import { describe, expect, it } from "vitest";
import {
  babiesShareAge,
  babyAgeSentence,
  describeAge,
  describeBabies,
  heroSupportLine,
  monthPageLabel,
  monthPagePath,
  monthPageSlug,
} from "@/lib/firstYearCopy";

const REF = new Date(2026, 7, 5); // 5 Aug 2026, local time

describe("firstYearCopy", () => {
  it("names a single baby", () => {
    expect(babyAgeSentence([{ date_of_birth: "2026-07-15", name: "Ada" }], REF)).toBe(
      "Ada is 3 weeks old.",
    );
  });

  it("falls back when a single baby has no name", () => {
    expect(babyAgeSentence([{ date_of_birth: "2026-07-15" }], REF)).toBe(
      "Your baby is 3 weeks old.",
    );
    expect(babyAgeSentence([{ date_of_birth: "2026-07-15", name: "  " }], REF)).toBe(
      "Your baby is 3 weeks old.",
    );
  });

  it("handles twins with both names", () => {
    expect(
      babyAgeSentence(
        [
          { date_of_birth: "2026-07-15", name: "Ada", birth_order: 1 },
          { date_of_birth: "2026-07-15", name: "Mia", birth_order: 2 },
        ],
        REF,
      ),
    ).toBe("Ada and Mia are 3 weeks old.");
  });

  it("handles twins with one blank name", () => {
    expect(
      babyAgeSentence(
        [
          { date_of_birth: "2026-07-15", name: "Ada", birth_order: 1 },
          { date_of_birth: "2026-07-15", name: null, birth_order: 2 },
        ],
        REF,
      ),
    ).toBe("Ada and your second baby are 3 weeks old.");
  });

  it("handles twins with both names blank", () => {
    expect(
      babyAgeSentence(
        [
          { date_of_birth: "2026-07-15", birth_order: 1 },
          { date_of_birth: "2026-07-15", birth_order: 2 },
        ],
        REF,
      ),
    ).toBe("Your two babies are 3 weeks old.");
  });

  it("handles triplets and four babies without names", () => {
    const dob = "2026-07-15";
    expect(
      babyAgeSentence(
        [1, 2, 3].map((n) => ({ date_of_birth: dob, birth_order: n })),
        REF,
      ),
    ).toBe("Your three babies are 3 weeks old.");
    expect(
      babyAgeSentence(
        [1, 2, 3, 4].map((n) => ({ date_of_birth: dob, birth_order: n })),
        REF,
      ),
    ).toBe("Your four babies are 3 weeks old.");
  });

  it("handles day zero, day and week boundaries", () => {
    expect(describeAge("2026-08-05", REF)).toBe("here today");
    expect(describeAge("2026-08-04", REF)).toBe("1 day old");
    expect(describeAge("2026-07-30", REF)).toBe("6 days old");
    expect(describeAge("2026-07-29", REF)).toBe("1 week old");
  });

  it("handles the month boundary", () => {
    expect(describeAge("2026-07-06", REF)).toBe("4 weeks old");
    expect(describeAge("2026-07-05", REF)).toBe("1 month old");
    expect(describeAge("2026-06-05", REF)).toBe("2 months old");
  });

  it("says the baby is here on the day of birth", () => {
    expect(babyAgeSentence([{ date_of_birth: "2026-08-05", name: "Ada" }], REF)).toBe(
      "Ada is here.",
    );
  });

  it("never asserts a false shared age for mixed dates", () => {
    const babies = [
      { date_of_birth: "2026-07-15", name: "Ada", birth_order: 1 },
      { date_of_birth: "2026-06-15", name: "Mia", birth_order: 2 },
    ];
    expect(babiesShareAge(babies, REF)).toBe(false);
    expect(babyAgeSentence(babies, REF)).toBe("Ada is 3 weeks old and Mia is 1 month old.");
  });

  it("describes the baby group", () => {
    expect(describeBabies([])).toBe("your baby");
    expect(describeBabies([{ date_of_birth: "2026-07-15", name: "Ada" }])).toBe("Ada");
    expect(
      describeBabies([
        { date_of_birth: "2026-07-15", birth_order: 1 },
        { date_of_birth: "2026-07-15", birth_order: 2 },
        { date_of_birth: "2026-07-15", birth_order: 3 },
      ]),
    ).toBe("your three babies");
  });

  it("builds the hero support line", () => {
    expect(heroSupportLine([{ date_of_birth: "2026-07-15" }], REF)).toBe(
      "Your baby is 3 weeks old. You are in a new chapter too.",
    );
    expect(heroSupportLine([], REF)).toBe("You are in a new chapter too.");
  });

  it("maps month index onto the public month guide routes", () => {
    expect(monthPageSlug(0)).toBe("newborn");
    expect(monthPageSlug(1)).toBe("1-month");
    expect(monthPageSlug(5)).toBe("5-months");
    expect(monthPageSlug(99)).toBe("11-months");
    expect(monthPagePath(0)).toBe("/first-year/newborn");
    expect(monthPagePath(3)).toBe("/first-year/3-months");
    expect(monthPageLabel(0)).toBe("Read the newborn guide");
    expect(monthPageLabel(1)).toBe("Read the 1 month guide");
    expect(monthPageLabel(4)).toBe("Read the 4 months guide");
  });
});
