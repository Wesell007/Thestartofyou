import { describe, expect, it } from "vitest";
import { PROTOTYPE_ROUTE_PREFIX, isPrototypeRoute } from "./prototypeRoutes";

describe("isPrototypeRoute", () => {
  it("matches the prototype prefix and its children", () => {
    expect(PROTOTYPE_ROUTE_PREFIX).toBe("/prototype");
    expect(isPrototypeRoute("/prototype")).toBe(true);
    expect(isPrototypeRoute("/prototype/")).toBe(true);
    expect(isPrototypeRoute("/prototype/memory-settings")).toBe(true);
    expect(isPrototypeRoute("/prototype/memory-settings/")).toBe(true);
  });

  it("does not match normal routes", () => {
    expect(isPrototypeRoute("/")).toBe(false);
    expect(isPrototypeRoute("/my-week")).toBe(false);
    expect(isPrototypeRoute("/prototypes")).toBe(false);
    expect(isPrototypeRoute("")).toBe(false);
    expect(isPrototypeRoute(null)).toBe(false);
  });
});
