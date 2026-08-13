/**
 * One optional private photo per First Year memory.
 *
 * A photo sits beside the words a parent chose to keep. It is never shared,
 * never public, never scored and never gathered into a wall of images.
 *
 * Objects live in the private `first-year-memories` bucket at:
 *
 *   {user_id}/{memory_id}/{uuid}.{ext}
 *
 * The first segment is the signed-in user id, which is what the owner-scoped
 * storage policies check. The database trigger checks the same shape again.
 *
 * This module is deliberately free of Supabase calls so the rules can be
 * tested on their own.
 */

export const MEMORY_PHOTO_BUCKET = "first-year-memories";

/** 8MB, matching the limit parents already meet on the weekly photo. */
export const MEMORY_PHOTO_MAX_BYTES = 8 * 1024 * 1024;

export const MEMORY_PHOTO_ACCEPTED_MIME = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export type MemoryPhotoMime = (typeof MEMORY_PHOTO_ACCEPTED_MIME)[number];

export const MEMORY_PHOTO_ACCEPT_ATTR = [
  ...MEMORY_PHOTO_ACCEPTED_MIME,
  ".heic",
  ".heif",
].join(",");

/** Long edge, in pixels, we resize down to when the browser can decode. */
export const MEMORY_PHOTO_LONG_EDGE = 1600;
export const MEMORY_PHOTO_JPEG_QUALITY = 0.82;

/** Warm wording only. Nothing here blames the parent or the baby. */
export const MEMORY_PHOTO_ERROR_COPY = {
  unsupported: "That kind of file isn't supported yet.",
  tooLarge: "That file is a little too big.",
  uploadFailed: "Your memory was saved, but the photo didn't attach. You can try adding it again.",
  attachFailed: "We couldn't attach that photo just now. You can try again.",
  removeFailed: "We couldn't remove that photo just now.",
  loadFailed: "We couldn't open this photo just now.",
} as const;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
};

const FILENAME_EXT_ALLOWLIST = new Set(["jpg", "jpeg", "png", "webp", "heic", "heif"]);

export const isMemoryPhotoMime = (value: string): value is MemoryPhotoMime =>
  (MEMORY_PHOTO_ACCEPTED_MIME as readonly string[]).includes(value.toLowerCase());

/** A safe lowercase extension for a chosen file. */
export const extensionForMemoryPhoto = (mime: string, filename: string): string => {
  const fromMime = MIME_TO_EXT[mime.toLowerCase()];
  if (fromMime) return fromMime;
  const tail = filename.split(".").pop()?.toLowerCase() ?? "";
  return FILENAME_EXT_ALLOWLIST.has(tail) ? (tail === "jpeg" ? "jpg" : tail) : "jpg";
};

/**
 * Some phones hand over a HEIC file with an empty or generic type. Fall back
 * to the filename before turning a parent away.
 */
export const resolveMemoryPhotoMime = (type: string, filename: string): string => {
  const lower = (type ?? "").toLowerCase();
  if (isMemoryPhotoMime(lower)) return lower;
  const tail = filename.split(".").pop()?.toLowerCase() ?? "";
  if (tail === "heic") return "image/heic";
  if (tail === "heif") return "image/heif";
  if (tail === "jpg" || tail === "jpeg") return "image/jpeg";
  if (tail === "png") return "image/png";
  if (tail === "webp") return "image/webp";
  return lower;
};

export type MemoryPhotoCheck =
  | { ok: true; mime: MemoryPhotoMime }
  | { ok: false; message: string };

/** Type and size gate, run before anything is decoded or uploaded. */
export const checkMemoryPhotoFile = (file: {
  type: string;
  name: string;
  size: number;
}): MemoryPhotoCheck => {
  const mime = resolveMemoryPhotoMime(file.type, file.name);
  if (!isMemoryPhotoMime(mime)) {
    return { ok: false, message: MEMORY_PHOTO_ERROR_COPY.unsupported };
  }
  if (file.size <= 0 || file.size > MEMORY_PHOTO_MAX_BYTES) {
    return { ok: false, message: MEMORY_PHOTO_ERROR_COPY.tooLarge };
  }
  return { ok: true, mime };
};

const randomId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/** The canonical object path for a memory photo. */
export const buildMemoryPhotoPath = (
  userId: string,
  memoryId: string,
  ext: string,
): string => `${userId}/${memoryId}/${randomId()}.${ext}`;

/**
 * A stored path may only ever point inside this owner's folder for this
 * memory. Mirrors the database trigger so a bad path never leaves the client.
 */
export const isMemoryPhotoPathOwned = (
  path: string | null | undefined,
  userId: string,
  memoryId: string,
): boolean => {
  if (!path) return false;
  if (path.includes("..")) return false;
  return path.startsWith(`${userId}/${memoryId}/`);
};

/** Target size for a long edge of `MEMORY_PHOTO_LONG_EDGE`, keeping ratio. */
export const scaledDimensions = (
  width: number,
  height: number,
  longEdge = MEMORY_PHOTO_LONG_EDGE,
): { width: number; height: number } => {
  const largest = Math.max(width, height);
  if (!Number.isFinite(largest) || largest <= 0 || largest <= longEdge) {
    return { width, height };
  }
  const ratio = longEdge / largest;
  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
  };
};

export type PreparedMemoryPhoto = {
  /** What actually gets uploaded: a downscaled JPEG, or the original file. */
  body: Blob;
  mime: MemoryPhotoMime;
  ext: string;
  sizeBytes: number;
  /** Null when the browser could not decode the image (some HEIC files). */
  width: number | null;
  height: number | null;
};

/**
 * Downscale where the browser can decode, otherwise upload as chosen.
 * A photo that cannot be decoded is never rejected for that reason alone:
 * losing a kept moment matters more than saving a few hundred kilobytes.
 */
export const prepareMemoryPhoto = async (file: File): Promise<PreparedMemoryPhoto> => {
  const check = checkMemoryPhotoFile(file);
  const mime = check.ok ? check.mime : "image/jpeg";
  const original: PreparedMemoryPhoto = {
    body: file,
    mime,
    ext: extensionForMemoryPhoto(mime, file.name),
    sizeBytes: file.size,
    width: null,
    height: null,
  };

  if (typeof window === "undefined" || typeof document === "undefined") return original;

  const decoded = await decodeImage(file);
  if (!decoded) return original;

  const { image, width, height } = decoded;
  const target = scaledDimensions(width, height);

  try {
    const canvas = document.createElement("canvas");
    canvas.width = target.width;
    canvas.height = target.height;
    const context = canvas.getContext("2d");
    if (!context) return { ...original, width, height };
    context.drawImage(image, 0, 0, target.width, target.height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((result) => resolve(result), "image/jpeg", MEMORY_PHOTO_JPEG_QUALITY);
    });

    if (!blob || blob.size <= 0 || blob.size > MEMORY_PHOTO_MAX_BYTES) {
      return { ...original, width, height };
    }
    // Keep whichever is smaller, so a small PNG is not re-encoded upwards.
    if (blob.size >= file.size && target.width === width && target.height === height) {
      return { ...original, width, height };
    }
    return {
      body: blob,
      mime: "image/jpeg",
      ext: "jpg",
      sizeBytes: blob.size,
      width: target.width,
      height: target.height,
    };
  } catch {
    return { ...original, width, height };
  } finally {
    releaseImage(decoded);
  }
};

type DecodedImage = {
  image: CanvasImageSource;
  width: number;
  height: number;
  objectUrl?: string;
  bitmap?: ImageBitmap;
};

const releaseImage = (decoded: DecodedImage) => {
  if (decoded.objectUrl) {
    try {
      URL.revokeObjectURL(decoded.objectUrl);
    } catch {
      /* ignore */
    }
  }
  decoded.bitmap?.close?.();
};

/** Decode with `createImageBitmap`, falling back to an off-DOM `Image`. */
const decodeImage = async (file: File): Promise<DecodedImage | null> => {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file);
      return { image: bitmap, width: bitmap.width, height: bitmap.height, bitmap };
    } catch {
      /* fall through to the Image path */
    }
  }

  return new Promise<DecodedImage | null>((resolve) => {
    let objectUrl = "";
    try {
      objectUrl = URL.createObjectURL(file);
    } catch {
      resolve(null);
      return;
    }
    const image = new Image();
    let settled = false;
    const finish = (value: DecodedImage | null) => {
      if (settled) return;
      settled = true;
      if (!value) {
        try {
          URL.revokeObjectURL(objectUrl);
        } catch {
          /* ignore */
        }
      }
      resolve(value);
    };
    const timer = window.setTimeout(() => finish(null), 5000);
    image.onload = () => {
      window.clearTimeout(timer);
      const width = image.naturalWidth;
      const height = image.naturalHeight;
      if (!width || !height) {
        finish(null);
        return;
      }
      finish({ image, width, height, objectUrl });
    };
    image.onerror = () => {
      window.clearTimeout(timer);
      finish(null);
    };
    image.src = objectUrl;
  });
};
