import { describe, expect, it, vi, beforeEach } from "vitest";

const createSignedUrl = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    storage: { from: () => ({ createSignedUrl }) },
  },
}));

import { signMemoryPhotoUrl } from "@/lib/firstYearMemories";

describe("signMemoryPhotoUrl", () => {
  beforeEach(() => {
    createSignedUrl.mockReset();
    vi.restoreAllMocks();
  });

  it("treats an empty path as quietly missing", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await signMemoryPhotoUrl(null)).toEqual({ url: null, missing: true });
    expect(createSignedUrl).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalled();
  });

  it("stays quiet when storage says the object is not there", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    createSignedUrl.mockResolvedValue({ data: null, error: { message: "Object not found" } });
    expect(await signMemoryPhotoUrl("a/b.jpg")).toEqual({ url: null, missing: true });
    expect(spy).not.toHaveBeenCalled();
  });

  it("still reports an unexpected storage error", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    createSignedUrl.mockResolvedValue({ data: null, error: { message: "Service unavailable" } });
    expect(await signMemoryPhotoUrl("a/b.jpg")).toEqual({ url: null, missing: false });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("returns the signed url when the object is there", async () => {
    createSignedUrl.mockResolvedValue({ data: { signedUrl: "https://x/y" }, error: null });
    expect(await signMemoryPhotoUrl("a/b.jpg")).toEqual({ url: "https://x/y", missing: false });
  });
});
