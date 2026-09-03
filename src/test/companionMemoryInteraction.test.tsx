/**
 * AIC-3 — the permission guarantees, tested at the shared interaction layer
 * both companion surfaces use.
 */

import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const repository = vi.hoisted(() => ({
  hasMemorySession: vi.fn(async () => true),
  listMemories: vi.fn(async () => []),
  createMemory: vi.fn(async () => ({
    id: "m1",
    value: "I prefer short answers",
    category: "preference" as const,
    source: "explicit_command" as const,
    updatedAt: "2026-01-01T00:00:00Z",
  })),
  updateMemory: vi.fn(),
  deleteMemory: vi.fn(async () => undefined),
}));

vi.mock("@/lib/companion/memory/companionMemoryRepository", () => ({
  ...repository,
  CompanionMemoryError: class extends Error {},
}));

vi.mock("@/lib/companion/memory/memoryFlags", () => ({
  isCompanionMemoryUiEnabled: () => true,
}));

import { useCompanionMemoryInteraction } from "@/lib/companion/memory/useCompanionMemoryInteraction";

describe("AIC-3 memory interaction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    repository.hasMemorySession.mockResolvedValue(true);
    repository.listMemories.mockResolvedValue([]);
  });

  it("never intercepts or writes for ordinary conversation", async () => {
    const { result } = renderHook(() => useCompanionMemoryInteraction());
    let intercepted = true;
    await act(async () => {
      intercepted = await result.current.interceptQuery("I am 20 weeks pregnant and exhausted");
    });
    expect(intercepted).toBe(false);
    expect(result.current.state.kind).toBe("idle");
    expect(repository.createMemory).not.toHaveBeenCalled();
  });

  it("asks before keeping anything, and writes only on confirm", async () => {
    const { result } = renderHook(() => useCompanionMemoryInteraction());
    await act(async () => {
      await result.current.interceptQuery("Remember that I prefer short answers");
    });
    expect(result.current.state.kind).toBe("pending_save");
    expect(repository.createMemory).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.confirm();
    });
    await waitFor(() => expect(repository.createMemory).toHaveBeenCalledTimes(1));
    expect(repository.createMemory).toHaveBeenCalledWith({
      value: "I prefer short answers",
      category: "preference",
      source: "explicit_command",
    });
  });

  it("writes nothing when the person declines", async () => {
    const { result } = renderHook(() => useCompanionMemoryInteraction());
    await act(async () => {
      await result.current.interceptQuery("Remember that I prefer short answers");
    });
    act(() => result.current.cancel());
    expect(result.current.state.kind).toBe("idle");
    expect(repository.createMemory).not.toHaveBeenCalled();
  });

  it("stops a credential before it can be stored or sent to the model", async () => {
    const { result } = renderHook(() => useCompanionMemoryInteraction());
    let intercepted = false;
    await act(async () => {
      intercepted = await result.current.interceptQuery("Remember my password is hunter2");
    });
    expect(intercepted).toBe(true);
    expect(result.current.state).toMatchObject({ kind: "message", tone: "error" });
    expect(repository.createMemory).not.toHaveBeenCalled();
  });

  it("explains rather than storing anything when signed out", async () => {
    repository.hasMemorySession.mockResolvedValue(false);
    const { result } = renderHook(() => useCompanionMemoryInteraction());
    await act(async () => {
      await result.current.interceptQuery("Remember that I prefer short answers");
    });
    expect(result.current.state).toMatchObject({ kind: "message", tone: "info" });
    expect(repository.createMemory).not.toHaveBeenCalled();
  });

  it("confirms before forgetting, and deletes only once", async () => {
    repository.listMemories.mockResolvedValue([
      {
        id: "m9",
        value: "I work night shifts",
        category: "personal_detail",
        source: "explicit_command",
        updatedAt: "2026-01-01T00:00:00Z",
      },
    ]);
    const { result } = renderHook(() => useCompanionMemoryInteraction());
    await act(async () => {
      await result.current.interceptQuery("Forget that I work night shifts");
    });
    expect(result.current.state.kind).toBe("pending_forget");
    expect(repository.deleteMemory).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.confirm();
    });
    await waitFor(() => expect(repository.deleteMemory).toHaveBeenCalledWith("m9"));
  });
});
