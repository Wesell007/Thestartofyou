import { describe, expect, it } from "vitest";
import { resolveSetupCopy } from "@/lib/setupCopy";

describe("resolveSetupCopy", () => {
  it("keeps pregnancy wording and destination", () => {
    const copy = resolveSetupCopy("pregnancy");
    expect(copy.helper).toBe("Just your first name. We'll use it to greet you each week.");
    expect(copy.cta).toBe("Continue to my week");
    expect(copy.destination).toBe("/my-week");
  });

  it("uses First Year wording and never sends them to pregnancy routes", () => {
    const copy = resolveSetupCopy("first_year");
    expect(copy.helper).toBe(
      "Just your first name. We'll use it to greet you in your First Year space.",
    );
    expect(copy.cta).toBe("Continue to my First Year");
    expect(copy.destination).toBe("/my-first-year");
  });

  it("uses TTC wording and the TTC dashboard", () => {
    const copy = resolveSetupCopy("ttc");
    expect(copy.helper).toBe("Just your first name. We'll use it to greet you in your journey.");
    expect(copy.cta).toBe("Continue to my journey");
    expect(copy.destination).toBe("/my-ttc-journey");
  });

  it("stays neutral with no lifecycle", () => {
    const copy = resolveSetupCopy(null);
    expect(copy.helper).toBe("Just your first name. We'll use it to greet you.");
    expect(copy.cta).toBe("Continue");
    expect(copy.destination).toBe("/due-date-calculator");
  });
});
