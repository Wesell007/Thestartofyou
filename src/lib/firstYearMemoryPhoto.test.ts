import { describe, expect, it } from "vitest";
import {
  MEMORY_PHOTO_MAX_BYTES,
  buildMemoryPhotoPath,
  checkMemoryPhotoFile,
  extensionForMemoryPhoto,
  isMemoryPhotoPathOwned,
  resolveMemoryPhotoMime,
  scaledDimensions,
} from "./firstYearMemoryPhoto";

describe("checkMemoryPhotoFile", () => {
  it("accepts a normal phone photo", () => {
    expect(checkMemoryPhotoFile({ type: "image/jpeg", name: "IMG_1.jpg", size: 900_000 })).toEqual({
      ok: true,
      mime: "image/jpeg",
    });
  });

  it("accepts a HEIC file the browser reported with no type", () => {
    const result = checkMemoryPhotoFile({ type: "", name: "IMG_2.HEIC", size: 2_000_000 });
    expect(result.ok).toBe(true);
  });

  it("turns away a file that is not an image", () => {
    const result = checkMemoryPhotoFile({ type: "application/pdf", name: "scan.pdf", size: 100 });
    expect(result).toMatchObject({ ok: false });
  });

  it("turns away a file over the size limit", () => {
    const result = checkMemoryPhotoFile({
      type: "image/png",
      name: "big.png",
      size: MEMORY_PHOTO_MAX_BYTES + 1,
    });
    expect(result).toMatchObject({ ok: false });
  });

  it("turns away an empty file", () => {
    expect(checkMemoryPhotoFile({ type: "image/png", name: "a.png", size: 0 }).ok).toBe(false);
  });
});

describe("resolveMemoryPhotoMime", () => {
  it("prefers a usable reported type", () => {
    expect(resolveMemoryPhotoMime("image/webp", "a.jpg")).toBe("image/webp");
  });

  it("falls back to the filename", () => {
    expect(resolveMemoryPhotoMime("", "a.PNG")).toBe("image/png");
  });
});

describe("extensionForMemoryPhoto", () => {
  it("normalises jpeg to jpg", () => {
    expect(extensionForMemoryPhoto("image/jpeg", "a.jpeg")).toBe("jpg");
  });

  it("defaults to jpg for anything unknown", () => {
    expect(extensionForMemoryPhoto("application/octet-stream", "a.bin")).toBe("jpg");
  });
});

describe("memory photo paths", () => {
  const userId = "11111111-1111-1111-1111-111111111111";
  const memoryId = "22222222-2222-2222-2222-222222222222";

  it("builds a path inside the owner and memory folder", () => {
    const path = buildMemoryPhotoPath(userId, memoryId, "jpg");
    expect(path.startsWith(`${userId}/${memoryId}/`)).toBe(true);
    expect(path.endsWith(".jpg")).toBe(true);
    expect(isMemoryPhotoPathOwned(path, userId, memoryId)).toBe(true);
  });

  it("rejects another person's folder", () => {
    expect(isMemoryPhotoPathOwned(`someone-else/${memoryId}/a.jpg`, userId, memoryId)).toBe(false);
  });

  it("rejects another memory's folder", () => {
    expect(isMemoryPhotoPathOwned(`${userId}/other/a.jpg`, userId, memoryId)).toBe(false);
  });

  it("rejects traversal and empty paths", () => {
    expect(isMemoryPhotoPathOwned(`${userId}/${memoryId}/../x.jpg`, userId, memoryId)).toBe(false);
    expect(isMemoryPhotoPathOwned(null, userId, memoryId)).toBe(false);
  });
});

describe("scaledDimensions", () => {
  it("leaves a small photo alone", () => {
    expect(scaledDimensions(800, 600)).toEqual({ width: 800, height: 600 });
  });

  it("scales the long edge down and keeps the ratio", () => {
    expect(scaledDimensions(4000, 2000)).toEqual({ width: 1600, height: 800 });
    expect(scaledDimensions(2000, 4000)).toEqual({ width: 800, height: 1600 });
  });
});
