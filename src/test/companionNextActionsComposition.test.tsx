/**
 * AIC-J6-R3 — the real J5 plumbing, end to end inside the client.
 *
 * These tests drive the actual chain — the `ai-search` response boundary →
 * `useAISearch` → `useCompanionConversation` → `CompanionProvider` →
 * `CompanionNextActions` — rather than the resolver in isolation. No model or
 * network call happens: the response boundary is intercepted deterministically.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { PersonalJourneyContextV1 } from "../../supabase/functions/_shared/journeyContextContract";

const resolvePersonalJourneyContext = vi.fn();
type AuthListener = (event: string, session: { user?: { id: string } } | null) => void;
const authListeners: AuthListener[] = [];
let session: { user: { id: string } } | null = null;

vi.mock("@/lib/companion/journeyPersonalSource", () => ({
  resolvePersonalJourneyContext: (...args: unknown[]) => resolvePersonalJourneyContext(...args),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: async () => ({ data: { session } }),
      onAuthStateChange: (cb: AuthListener) => {
        authListeners.push(cb);
        return { data: { subscription: { unsubscribe: () => {} } } };
      },
    },
    from: () => ({
      select: () => ({
        eq: () => ({ maybeSingle: async () => ({ data: null }) }),
      }),
    }),
  },
}));

const TTC: PersonalJourneyContextV1 = {
  journey: "trying-to-conceive",
  ttcStage: "trying_naturally",
};
const PREGNANCY: PersonalJourneyContextV1 = { journey: "pregnancy", week: 24, trimester: "second" };

/** A deterministic SSE body, optionally left hanging so the stream never ends. */
const sseBody = (text: string, { complete = true }: { complete?: boolean } = {}) =>
  new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`,
        ),
      );
      if (complete) controller.close();
    },
  });

interface RespondOptions {
  eligibility?: string | null;
  text?: string;
  complete?: boolean;
  fail?: boolean;
}

const mockResponse = ({
  eligibility = "allow",
  text = "Here is some general guidance.",
  complete = true,
  fail = false,
}: RespondOptions = {}) => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => {
      if (fail) {
        return new Response(JSON.stringify({ error: "Something went wrong" }), { status: 500 });
      }
      const headers = new Headers({ "Content-Type": "text/event-stream" });
      if (eligibility !== null) headers.set("X-Companion-Next-Actions", eligibility);
      return new Response(sseBody(text, { complete }), { status: 200, headers });
    }),
  );
};

/** Minimal consumer of the real provider: the shared action UI plus a send. */
const Harness = () => {
  const { useCompanion } = require("@/components/companion/companionContext") as typeof import("@/components/companion/companionContext");
  const { CompanionNextActions } = require("@/components/companion/CompanionNextActions") as typeof import("@/components/companion/CompanionNextActions");
  const companion = useCompanion();
  return (
    <div>
      <button type="button" onClick={() => companion.send("What should I know?")}>
        send
      </button>
      <CompanionNextActions actions={companion.nextActions} />
    </div>
  );
};

const mount = async () => {
  vi.resetModules();
  const { CompanionProvider } = await import("@/components/companion/CompanionProvider");
  const view = render(
    <MemoryRouter initialEntries={["/pregnancy"]}>
      <CompanionProvider>
        <Harness />
      </CompanionProvider>
    </MemoryRouter>,
  );
  // Let the auth and personal-journey effects settle before the first turn.
  await act(async () => {
    await Promise.resolve();
  });
  return view;
};

const send = async () => {
  await act(async () => {
    screen.getByRole("button", { name: "send" }).click();
  });
};

beforeEach(() => {
  authListeners.length = 0;
  session = { user: { id: "user-1" } };
  resolvePersonalJourneyContext.mockReset();
  resolvePersonalJourneyContext.mockResolvedValue(PREGNANCY);
  window.sessionStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("eligibility → runtime → UI", () => {
  it("renders actions for an allowed, completed answer", async () => {
    mockResponse({ eligibility: "allow" });
    await mount();
    await send();
    await waitFor(() =>
      expect(screen.getByRole("navigation", { name: /next steps/i })).toBeInTheDocument(),
    );
    expect(screen.getByRole("link", { name: "View My Week" })).toHaveAttribute("href", "/my-week");
    expect(screen.getByRole("link", { name: "Read week 24 guidance" })).toBeInTheDocument();
  });

  it("renders nothing when the server suppressed this response", async () => {
    mockResponse({ eligibility: "suppress" });
    await mount();
    await send();
    await waitFor(() => expect(screen.getByRole("button", { name: "send" })).toBeEnabled());
    expect(screen.queryByRole("navigation", { name: /next steps/i })).toBeNull();
  });

  it("renders nothing when the eligibility header is missing or malformed", async () => {
    for (const eligibility of [null, "allowed", "true"]) {
      mockResponse({ eligibility });
      await mount();
      await send();
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.queryByRole("navigation", { name: /next steps/i })).toBeNull();
      cleanup();
    }
  });

  it("renders nothing for a failed response, even with a saved journey", async () => {
    mockResponse({ fail: true });
    await mount();
    await send();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByRole("navigation", { name: /next steps/i })).toBeNull();
  });

  it("renders nothing while the answer is still streaming", async () => {
    mockResponse({ eligibility: "allow", complete: false });
    await mount();
    await send();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByRole("navigation", { name: /next steps/i })).toBeNull();
  });
});

describe("auth sign-out mid-answer", () => {
  it("never leaks a signed-in personal action onto the completing answer", async () => {
    mockResponse({ eligibility: "allow" });
    await mount();
    await send();
    await act(async () => {
      session = null;
      for (const listener of authListeners) listener("SIGNED_OUT", null);
      await Promise.resolve();
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByRole("navigation", { name: /next steps/i })).toBeNull();
    // The surface stays usable: the composer is still there, nothing crashed.
    expect(screen.getByRole("button", { name: "send" })).toBeInTheDocument();
  });
});

describe("journey transition during a stream", () => {
  it("shows no stale or new-lifecycle action under the answer in flight", async () => {
    resolvePersonalJourneyContext.mockResolvedValue(TTC);
    mockResponse({ eligibility: "allow", complete: false });
    await mount();
    await send();
    const { notifyJourneyStateChanged } = await import("@/lib/journeyStateSignal");
    resolvePersonalJourneyContext.mockResolvedValue(PREGNANCY);
    await act(async () => {
      notifyJourneyStateChanged();
      await Promise.resolve();
    });
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByRole("navigation", { name: /next steps/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /TTC/i })).toBeNull();
    expect(screen.queryByRole("link", { name: /week/i })).toBeNull();
  });
});
