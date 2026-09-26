import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { REVIEW_PROVENANCE_REGISTRY } from "@/lib/reviewClaims";
import { ARTICLE_GROUNDING_REGISTRY } from "@/lib/grounding/articleGroundingRegistry";
import { AI_SOURCE_ROUTING_VERSION } from "../../supabase/functions/_shared/aiVersions";
import { isCompanionHistoryUiEnabled } from "@/lib/companion/conversation/conversationFlags";
import { isCompanionMemoryUiEnabled } from "@/lib/companion/memory/memoryFlags";
import { isCompanionJournalUiEnabled } from "@/lib/companion/journal/journalFlags";
import { isCompanionVoiceUiEnabled } from "@/lib/companion/voice/voiceFlags";
import { IVF_TIMELINE_SAVE_ENABLED } from "@/lib/ivfTimelineFlags";

// Phase 40A: objective repository facts only. No strategic conclusion is asserted here.
const read = (p: string) => readFileSync(resolve(__dirname, "../..", p), "utf8");
const app = read("src/App.tsx");

describe("Phase 40A repository facts", () => {
  it("keeps exactly three saved lifecycles", () => {
    expect(read("src/lib/navLifecycle.ts")).toMatch(/NavLifecycle = "pregnancy" \| "ttc" \| "first_year";/);
    expect(app).not.toContain("/my-ivf-journey");
  });

  it("registers the journey, tool and Companion routes", () => {
    for (const path of [
      "/trying-to-conceive", "/pregnancy", "/first-year", "/toddler", "/family", "/ivf",
      "/journal", "/ask", "/due-date-calculator", "/ovulation-calculator",
      "/my-ttc-journey", "/my-week", "/my-first-year", "/pregnancy-toolkit",
    ]) expect(app).toContain(`path="${path}"`);
  });

  it("keeps gated capabilities off by default", () => {
    expect(isCompanionHistoryUiEnabled()).toBe(false);
    expect(isCompanionMemoryUiEnabled()).toBe(false);
    expect(isCompanionJournalUiEnabled()).toBe(false);
    expect(isCompanionVoiceUiEnabled()).toBe(false);
    expect(IVF_TIMELINE_SAVE_ENABLED).toBe(false);
  });

  it("keeps governance state unchanged", () => {
    expect(REVIEW_PROVENANCE_REGISTRY).toHaveLength(0);
    expect(ARTICLE_GROUNDING_REGISTRY.some((r) => r.approvalStatus === "approved")).toBe(false);
    expect(AI_SOURCE_ROUTING_VERSION).toBe("30B-source-routing-v1");
  });

  it("has all five strategy documents", () => {
    for (const d of ["product-thesis-audit", "capability-map", "market-moat-map", "claims-truth-registry", "priority-roadmap"])
      expect(existsSync(resolve(__dirname, "../..", `docs/strategy/phase40a-${d}.md`))).toBe(true);
  });
});
