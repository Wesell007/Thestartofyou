import { describe, expect, it, vi } from "vitest";
import { askDestination, navigateToAsk } from "./askNavigation";

describe("private Ask navigation", () => {
  it("keeps the question out of the URL", () => {
    expect(askDestination({ stage: "ttc", journey: "ivf" })).toEqual({
      pathname: "/ask",
      search: "?stage=ttc&journey=ivf",
    });
  });

  it("places free text in router state", () => {
    const navigate = vi.fn();
    navigateToAsk(navigate, "Is this normal?", { stage: "pregnancy", context: "Week 6" });
    expect(navigate).toHaveBeenCalledWith(
      { pathname: "/ask", search: "?stage=pregnancy" },
      { state: { question: "Is this normal?", context: "Week 6" } },
    );
  });
});
