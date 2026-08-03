import { describe, expect, it } from "vitest";
import {
  HospitalBagItemRow,
  sortItemsForDisplay,
  unpackedPreview,
} from "./hospitalBagSchema";

const row = (
  over: Partial<HospitalBagItemRow> & { id: string },
): HospitalBagItemRow => ({
  user_id: "u1",
  category: "parent",
  item_key: over.id,
  label: over.id,
  is_custom: false,
  packed_at: null,
  sort_order: 10,
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
  ...over,
});

describe("sortItemsForDisplay", () => {
  it("places unpacked items before packed items", () => {
    const rows = [
      row({ id: "a", packed_at: "2026-01-02T00:00:00.000Z", sort_order: 10 }),
      row({ id: "b", sort_order: 20 }),
    ];
    expect(sortItemsForDisplay(rows).map((r) => r.id)).toEqual(["b", "a"]);
  });

  it("keeps sort_order within each group", () => {
    const rows = [
      row({ id: "c", sort_order: 30 }),
      row({ id: "a", sort_order: 10 }),
      row({ id: "b", sort_order: 20 }),
    ];
    expect(sortItemsForDisplay(rows).map((r) => r.id)).toEqual(["a", "b", "c"]);
  });

  it("falls back to created_at when sort_order ties", () => {
    const rows = [
      row({ id: "late", created_at: "2026-02-01T00:00:00.000Z" }),
      row({ id: "early", created_at: "2026-01-01T00:00:00.000Z" }),
    ];
    expect(sortItemsForDisplay(rows).map((r) => r.id)).toEqual([
      "early",
      "late",
    ]);
  });

  it("does not mutate the input array", () => {
    const rows = [row({ id: "b", sort_order: 20 }), row({ id: "a", sort_order: 10 })];
    const snapshot = rows.map((r) => r.id);
    sortItemsForDisplay(rows);
    expect(rows.map((r) => r.id)).toEqual(snapshot);
  });
});

describe("unpackedPreview", () => {
  it("returns unpacked labels in category display order", () => {
    const rows = [
      row({ id: "1", category: "baby", label: "Vests" }),
      row({ id: "2", category: "documents", label: "Maternity notes" }),
      row({ id: "3", category: "parent", label: "Toiletries" }),
    ];
    expect(unpackedPreview(rows)).toEqual([
      "Maternity notes",
      "Toiletries",
      "Vests",
    ]);
  });

  it("skips packed items and respects the limit", () => {
    const rows = [
      row({ id: "1", label: "One", sort_order: 10 }),
      row({ id: "2", label: "Two", sort_order: 20, packed_at: "2026-01-02T00:00:00.000Z" }),
      row({ id: "3", label: "Three", sort_order: 30 }),
      row({ id: "4", label: "Four", sort_order: 40 }),
    ];
    expect(unpackedPreview(rows, 2)).toEqual(["One", "Three"]);
  });

  it("returns an empty list when everything is packed", () => {
    const rows = [row({ id: "1", packed_at: "2026-01-02T00:00:00.000Z" })];
    expect(unpackedPreview(rows)).toEqual([]);
  });
});
