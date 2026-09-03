import { describe, it, expect } from "vitest";
import askPageSource from "@/pages/AskPage.tsx?raw";
import { APPROVED_SOURCES_TRUST_LINE, stripExternalSourceLinks } from "@/lib/answerSourceLinks";
import { resolveClarification } from "../../supabase/functions/_shared/clarification";

describe("Ask trust copy (Phase 29B.2b)", () => {
  it("uses the single approved trust line", () => {
    expect(APPROVED_SOURCES_TRUST_LINE).toBe(
      "Based on NHS and approved UK health sources, including medically reviewed guidance where available. This is not a diagnosis or a replacement for your midwife, GP or health visitor."
    );
  });

  it("no longer ships the old trust copy anywhere on the Ask page", () => {
    expect(askPageSource).not.toContain("Guidance is checked against approved UK health sources");
    expect(askPageSource).not.toContain("not individually medically reviewed");
  });

  it("keeps link stripping intact so no anchors or raw URLs reach the reader", () => {
    const cleaned = stripExternalSourceLinks(
      "See [NHS advice](https://www.nhs.uk/pregnancy) and https://example.com\n\n## Sources\n- https://www.nhs.uk"
    );
    expect(cleaned).toContain("NHS advice");
    expect(cleaned).not.toMatch(/https?:\/\//);
    expect(cleaned).not.toMatch(/\bSources\b/);
  });

  it("still clarifies broad questions and never clarifies concern wording", () => {
    expect(resolveClarification("Milestones")).not.toBeNull();
    expect(resolveClarification("When should I call about reduced movements?")).toBeNull();
  });
});
