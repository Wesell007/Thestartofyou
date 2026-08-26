import { describe, expect, it } from "vitest";
import endpointSource from "../../supabase/functions/ai-search/index.ts?raw";
import {
  AI_CONTEXT_CONTRACT_VERSION,
  AI_EVAL_DATASET_VERSION,
  AI_MODEL_ID,
  AI_PHASE,
  AI_PROMPT_VERSION,
  AI_SAFETY_RULESET_VERSION,
  AI_SOURCE_ROUTING_VERSION,
  AI_VERSION_SUMMARY,
} from "../../supabase/functions/_shared/aiVersions";



describe("AI version constants", () => {
  it("are present and non-empty", () => {
    for (const value of [
      AI_MODEL_ID,
      AI_PROMPT_VERSION,
      AI_SAFETY_RULESET_VERSION,
      AI_SOURCE_ROUTING_VERSION,
      AI_EVAL_DATASET_VERSION,
      AI_CONTEXT_CONTRACT_VERSION,
      AI_PHASE,
    ]) {
      expect(typeof value).toBe("string");
      expect(value.trim().length).toBeGreaterThan(0);
    }
  });

  it("bundles every constant into the logged summary", () => {
    expect(AI_VERSION_SUMMARY).toEqual({
      model: AI_MODEL_ID,
      prompt: AI_PROMPT_VERSION,
      safety: AI_SAFETY_RULESET_VERSION,
      sourceRouting: AI_SOURCE_ROUTING_VERSION,
      evalDataset: AI_EVAL_DATASET_VERSION,
      contextContract: AI_CONTEXT_CONTRACT_VERSION,
      phase: AI_PHASE,
    });
  });

  it("records the phase this cleanup shipped in", () => {
    expect(AI_PHASE).toBe("29F");
    expect(AI_CONTEXT_CONTRACT_VERSION).toBe("29F-context-v1");
    expect(AI_EVAL_DATASET_VERSION).toBe("eval-dataset-v1");
  });
});

describe("the endpoint uses the shared version constants", () => {
  it("sends AI_MODEL_ID rather than an inline model string", () => {
    expect(endpointSource).toContain("model: AI_MODEL_ID");
    expect(endpointSource).not.toContain('model: "google/');
  });

  it("logs the version summary once, at module scope", () => {
    expect(endpointSource).toContain("AI_VERSION_SUMMARY");
    // The log sits above `serve(`, so it runs once per cold start only.
    expect(endpointSource.indexOf("ai-search versions")).toBeLessThan(
      endpointSource.indexOf("serve(async"),
    );
  });

  it("never returns version data to the browser", () => {
    expect(endpointSource).not.toMatch(/JSON\.stringify\(\{[^}]*AI_VERSION_SUMMARY/);
    expect(endpointSource).not.toMatch(/sseAnswer\([^)]*AI_(?:MODEL_ID|PROMPT_VERSION)/);
  });
});
