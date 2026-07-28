/**
 * Weekly media memory helpers (video for v1).
 *
 * Photos still live in `week_photos` and stay untouched. Videos (and future
 * voice notes) live in `week_media_memories`, one row per user + week +
 * media_type. Objects sit in the existing private `weekly-photos` bucket at:
 *
 *   {user_id}/{week}/{media_type}/{uuid}.{ext}
 *
 * which satisfies the existing first-segment-is-user-id storage RLS.
 *
 * No AI. No MediaRecorder. No transcription. No analytics. No public URLs.
 */

import {
  CAPTION_MAX,
  CAPTION_PLACEHOLDER,
  captionForSave,
  isCaptionWithinLimit,
  normaliseCaption,
} from "@/lib/weekCaption";

export type WeekMediaType = "video" | "voice_note";

export const VIDEO_MAX_BYTES = 50 * 1024 * 1024;
export const VIDEO_MAX_DURATION_SECONDS = 60;

export const VIDEO_ACCEPTED_MIME = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;

export const VIDEO_ACCEPT_ATTR = [
  ...VIDEO_ACCEPTED_MIME,
  "video/*",
].join(",");


/** Approved error copy — used by the hook and the slot component. */
export const VIDEO_ERROR_COPY = {
  unsupported: "That format isn't supported yet.",
  tooLarge: "That file is a little too big.",
  tooLong: "That's a bit longer than we support right now.",
  unreadable: "We couldn't read that video. Try another file.",
  uploadFailed: "Couldn't save that just now.",
  playbackFailed: "Couldn't play this back. Try opening again.",
  removeFailed: "Couldn't remove that just now.",
  loadFailed: "Couldn't open your saved video.",
} as const;

const MIME_TO_EXT: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

const FILENAME_EXT_ALLOWLIST = new Set(["mp4", "webm", "mov"]);

/** Choose a safe lowercase extension for a video file. */
export const extensionForVideo = (mime: string, filename: string): string => {
  const fromMime = MIME_TO_EXT[mime];
  if (fromMime) return fromMime;
  const tail = filename.split(".").pop()?.toLowerCase() ?? "";
  return FILENAME_EXT_ALLOWLIST.has(tail) ? tail : "mp4";
};

// ─────────────────────────────────────────────────────────────────────────────
// Voice note constants — the audio memory type.
//
// Stored as `media_type = 'voice_note'` in `week_media_memories`, in the same
// private `weekly-photos` bucket as video, under {user}/{week}/voice_note/…
// ─────────────────────────────────────────────────────────────────────────────

export const VOICE_MAX_BYTES = 10 * 1024 * 1024;
export const VOICE_MAX_DURATION_SECONDS = 180;

export const VOICE_ACCEPTED_MIME = [
  "audio/webm",
  "audio/mp4",
  "audio/mpeg",
  "audio/ogg",
] as const;

/** MediaRecorder MIME candidates, most-preferred first. */
export const VOICE_RECORDER_MIME_CANDIDATES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4;codecs=mp4a.40.2",
  "audio/mp4",
  "audio/ogg;codecs=opus",
  "audio/ogg",
] as const;

const VOICE_MIME_TO_EXT: Record<string, string> = {
  "audio/webm": "webm",
  "audio/mp4": "m4a",
  "audio/mpeg": "mp3",
  "audio/ogg": "ogg",
};

/** Reduce a full MediaRecorder mimeType ("audio/webm;codecs=opus") to its base. */
export const baseAudioMime = (mime: string): string => {
  const base = mime.split(";")[0]?.trim().toLowerCase() ?? "";
  return (VOICE_ACCEPTED_MIME as readonly string[]).includes(base) ? base : "audio/webm";
};

export const extensionForVoice = (mime: string): string =>
  VOICE_MIME_TO_EXT[baseAudioMime(mime)] ?? "webm";

/** Pick the first MediaRecorder MIME this browser supports, or null. */
export const pickVoiceRecorderMime = (): string | null => {
  if (typeof window === "undefined") return null;
  const MR = (window as unknown as { MediaRecorder?: typeof MediaRecorder }).MediaRecorder;
  if (!MR) return null;
  for (const candidate of VOICE_RECORDER_MIME_CANDIDATES) {
    try {
      if (typeof MR.isTypeSupported === "function" && MR.isTypeSupported(candidate)) {
        return candidate;
      }
    } catch {
      /* ignore */
    }
  }
  return "";
};

/** True when this browser can record audio at all. */
export const isVoiceRecordingSupported = (): boolean => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  const hasRecorder = Boolean(
    (window as unknown as { MediaRecorder?: unknown }).MediaRecorder,
  );
  const hasMedia = Boolean(navigator.mediaDevices?.getUserMedia);
  return hasRecorder && hasMedia;
};

export const VOICE_ERROR_COPY = {
  unsupported: "Voice recording isn't supported in this browser yet.",
  micDenied: "We need microphone access to record. Allow it, then try again.",
  recordFailed: "Recording didn't start. Try again.",
  tooLarge: "That recording is a little too big.",
  tooLong: "That recording is a bit longer than we support right now.",
  empty: "We didn't catch anything. Try recording again.",
  uploadFailed: "Couldn't save that just now.",
  removeFailed: "Couldn't remove that just now.",
  loadFailed: "Couldn't open your saved voice note.",
  playbackFailed: "Couldn't play this back. Try opening again.",
} as const;

/** Build the canonical storage path for a week media object. */
export const buildMediaStoragePath = (
  userId: string,
  week: number,
  mediaType: WeekMediaType,
  ext: string,
): string => {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${userId}/${week}/${mediaType}/${id}.${ext}`;
};

/**
 * Read a video's duration in seconds by decoding metadata off-DOM.
 * Returns `null` when the browser can't read a finite duration (bad file,
 * unsupported codec, timeout). Caller shows the "couldn't read" copy.
 */
export const probeVideoDuration = (file: File): Promise<number | null> =>
  new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(null);
      return;
    }
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    let done = false;

    const finish = (value: number | null) => {
      if (done) return;
      done = true;
      try {
        URL.revokeObjectURL(url);
      } catch {
        /* ignore */
      }
      video.removeAttribute("src");
      resolve(value);
    };

    const timer = window.setTimeout(() => finish(null), 3000);

    video.onloadedmetadata = () => {
      window.clearTimeout(timer);
      const d = video.duration;
      if (typeof d !== "number" || !Number.isFinite(d) || d <= 0) {
        finish(null);
      } else {
        finish(Math.round(d));
      }
    };
    video.onerror = () => {
      window.clearTimeout(timer);
      finish(null);
    };

    video.src = url;
  });

/**
 * Format a duration in seconds as `m:ss`. Returns null when the value is
 * missing, non-finite, or non-positive so callers can skip rendering the
 * badge entirely. Pure display helper — never used for validation.
 */
export const formatDuration = (seconds: number | null): string | null => {
  if (typeof seconds !== "number" || !Number.isFinite(seconds) || seconds <= 0) return null;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};


export {
  CAPTION_MAX,
  CAPTION_PLACEHOLDER,
  captionForSave,
  isCaptionWithinLimit,
  normaliseCaption,
};
