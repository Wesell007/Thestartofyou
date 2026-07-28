/**
 * useWeekMedia — one media memory per (user, week, media_type).
 *
 * v1 only mounts `video`. Photos are unchanged and continue to live in
 * `week_photos` via `SlotPhotoMemory`.
 *
 * Signed URLs are kept in component state only, never persisted.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  VIDEO_ACCEPTED_MIME,
  VIDEO_ERROR_COPY,
  VIDEO_MAX_BYTES,
  VIDEO_MAX_DURATION_SECONDS,
  VOICE_ACCEPTED_MIME,
  VOICE_ERROR_COPY,
  VOICE_MAX_BYTES,
  VOICE_MAX_DURATION_SECONDS,
  baseAudioMime,
  buildMediaStoragePath,
  captionForSave,
  extensionForVideo,
  extensionForVoice,
  isCaptionWithinLimit,
  probeVideoDuration,
  type WeekMediaType,
} from "@/lib/weekMedia";

const BUCKET = "weekly-photos";
const TABLE = "week_media_memories";
const SIGN_TTL_SECONDS = 60 * 60;
const REFRESH_MS = 50 * 60 * 1000;

export type WeekMediaState =
  | "loading"
  | "empty"
  | "uploading"
  | "loaded"
  | "error";

interface Options {
  userId: string;
  week: number;
  mediaType: WeekMediaType;
}

interface Row {
  storage_path: string;
  mime_type: string;
  duration_seconds: number | null;
  caption: string | null;
}

export const useWeekMedia = ({ userId, week, mediaType }: Options) => {
  const COPY = mediaType === "voice_note" ? VOICE_ERROR_COPY : VIDEO_ERROR_COPY;
  const fallbackMime = mediaType === "voice_note" ? "audio/webm" : "video/mp4";
  const [state, setState] = useState<WeekMediaState>("loading");
  const [error, setError] = useState<string | null>(null);
  const [storagePath, setStoragePath] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [durationSeconds, setDurationSeconds] = useState<number | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState(0);

  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    setError(null);
    (async () => {
      setState("loading");
      const { data, error: selErr } = await supabase
        .from(TABLE)
        .select("storage_path, mime_type, duration_seconds, caption")
        .eq("user_id", userId)
        .eq("week", week)
        .eq("media_type", mediaType)
        .maybeSingle<Row>();
      if (cancelledRef.current) return;
      if (selErr) {
        setState("error");
        setError(COPY.loadFailed);
        return;
      }
      if (!data?.storage_path) {
        setStoragePath(null);
        setSignedUrl(null);
        setMimeType(null);
        setDurationSeconds(null);
        setCaption(null);
        setState("empty");
        return;
      }
      const { data: urlData, error: urlErr } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(data.storage_path, SIGN_TTL_SECONDS);
      if (cancelledRef.current) return;
      setStoragePath(data.storage_path);
      setMimeType(data.mime_type);
      setDurationSeconds(data.duration_seconds);
      setCaption(data.caption);
      if (urlErr || !urlData?.signedUrl) {
        setSignedUrl(null);
        setState("error");
        setError(COPY.loadFailed);
      } else {
        setSignedUrl(urlData.signedUrl);
        setState("loaded");
      }
    })();
    return () => {
      cancelledRef.current = true;
    };
  }, [userId, week, mediaType, reloadTick]);

  // Refresh the signed URL well before its 60-min TTL expires.
  useEffect(() => {
    if (!signedUrl) return;
    const t = window.setTimeout(() => setReloadTick((n) => n + 1), REFRESH_MS);
    return () => window.clearTimeout(t);
  }, [signedUrl]);

  const clearError = useCallback(() => setError(null), []);

  const upload = useCallback(
    async (file: File): Promise<boolean> => {
      if (mediaType !== "video") return false;

      // 1. MIME allowlist.
      if (!(VIDEO_ACCEPTED_MIME as readonly string[]).includes(file.type)) {
        setError(VIDEO_ERROR_COPY.unsupported);
        return false;
      }
      // 2. Size.
      if (file.size > VIDEO_MAX_BYTES) {
        setError(VIDEO_ERROR_COPY.tooLarge);
        return false;
      }
      // 3. Duration.
      const duration = await probeVideoDuration(file);
      if (duration === null) {
        setError(VIDEO_ERROR_COPY.unreadable);
        return false;
      }
      if (duration > VIDEO_MAX_DURATION_SECONDS) {
        setError(VIDEO_ERROR_COPY.tooLong);
        return false;
      }

      const previousPath = storagePath;
      const hadRow = Boolean(previousPath);
      setError(null);
      setState("uploading");

      const ext = extensionForVideo(file.type, file.name);
      const path = buildMediaStoragePath(userId, week, mediaType, ext);

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: false, contentType: file.type });
      if (upErr) {
        setState(hadRow ? "loaded" : "empty");
        setError(VIDEO_ERROR_COPY.uploadFailed);
        return false;
      }

      const { error: dbErr } = await supabase.from(TABLE).upsert(
        {
          user_id: userId,
          week,
          media_type: mediaType,
          storage_path: path,
          mime_type: file.type,
          file_size_bytes: file.size,
          duration_seconds: duration,
          caption,
        },
        { onConflict: "user_id,week,media_type" },
      );
      if (dbErr) {
        // Roll back the freshly uploaded object; keep any previous row intact.
        await supabase.storage.from(BUCKET).remove([path]);
        setState(hadRow ? "loaded" : "empty");
        setError(VIDEO_ERROR_COPY.uploadFailed);
        return false;
      }

      // Best-effort cleanup of the prior object after the new row succeeded.
      if (previousPath && previousPath !== path) {
        await supabase.storage.from(BUCKET).remove([previousPath]);
      }

      const { data: urlData, error: urlErr } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(path, SIGN_TTL_SECONDS);
      setStoragePath(path);
      setMimeType(file.type);
      setDurationSeconds(duration);
      if (urlErr || !urlData?.signedUrl) {
        setSignedUrl(null);
        setState("error");
        setError(COPY.loadFailed);
        return false;
      }
      setSignedUrl(urlData.signedUrl);
      setState("loaded");
      return true;
    },
    [userId, week, mediaType, storagePath, caption],
  );

  /**
   * Save a recorded voice note. Only valid when `mediaType === "voice_note"`.
   * Mirrors `upload` but takes an in-memory Blob from MediaRecorder rather
   * than a picked File, and trusts the recorder's measured duration.
   */
  const uploadVoice = useCallback(
    async (
      blob: Blob,
      opts: { mimeType: string; durationSeconds: number },
    ): Promise<boolean> => {
      if (mediaType !== "voice_note") return false;

      const mime = baseAudioMime(opts.mimeType || blob.type || "audio/webm");
      if (!(VOICE_ACCEPTED_MIME as readonly string[]).includes(mime)) {
        setError(VOICE_ERROR_COPY.unsupported);
        return false;
      }
      if (blob.size <= 0) {
        setError(VOICE_ERROR_COPY.empty);
        return false;
      }
      if (blob.size > VOICE_MAX_BYTES) {
        setError(VOICE_ERROR_COPY.tooLarge);
        return false;
      }
      const duration = Math.max(1, Math.round(opts.durationSeconds));
      if (duration > VOICE_MAX_DURATION_SECONDS) {
        setError(VOICE_ERROR_COPY.tooLong);
        return false;
      }

      const previousPath = storagePath;
      const hadRow = Boolean(previousPath);
      setError(null);
      setState("uploading");

      const path = buildMediaStoragePath(userId, week, mediaType, extensionForVoice(mime));

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, blob, { upsert: false, contentType: mime });
      if (upErr) {
        setState(hadRow ? "loaded" : "empty");
        setError(VOICE_ERROR_COPY.uploadFailed);
        return false;
      }

      const { error: dbErr } = await supabase.from(TABLE).upsert(
        {
          user_id: userId,
          week,
          media_type: mediaType,
          storage_path: path,
          mime_type: mime,
          file_size_bytes: blob.size,
          duration_seconds: duration,
          caption,
        },
        { onConflict: "user_id,week,media_type" },
      );
      if (dbErr) {
        await supabase.storage.from(BUCKET).remove([path]);
        setState(hadRow ? "loaded" : "empty");
        setError(VOICE_ERROR_COPY.uploadFailed);
        return false;
      }

      if (previousPath && previousPath !== path) {
        await supabase.storage.from(BUCKET).remove([previousPath]);
      }

      const { data: urlData, error: urlErr } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(path, SIGN_TTL_SECONDS);
      setStoragePath(path);
      setMimeType(mime);
      setDurationSeconds(duration);
      if (urlErr || !urlData?.signedUrl) {
        setSignedUrl(null);
        setState("error");
        setError(VOICE_ERROR_COPY.loadFailed);
        return false;
      }
      setSignedUrl(urlData.signedUrl);
      setState("loaded");
      return true;
    },
    [userId, week, mediaType, storagePath, caption],
  );



  const remove = useCallback(async () => {
    if (!storagePath) return;
    const prev = {
      storagePath,
      mimeType,
      durationSeconds,
      caption,
    };
    setError(null);
    setState("uploading");

    const { error: dbErr } = await supabase
      .from(TABLE)
      .delete()
      .eq("user_id", userId)
      .eq("week", week)
      .eq("media_type", mediaType);
    if (dbErr) {
      setState("loaded");
      setError(COPY.removeFailed);
      return;
    }

    const { error: stErr } = await supabase.storage
      .from(BUCKET)
      .remove([prev.storagePath]);
    if (stErr) {
      // Storage removal failed — put the row back so state stays consistent.
      await supabase.from(TABLE).upsert(
        {
          user_id: userId,
          week,
          media_type: mediaType,
          storage_path: prev.storagePath,
          mime_type: prev.mimeType ?? "video/mp4",
          file_size_bytes: 1,
          duration_seconds: prev.durationSeconds,
          caption: prev.caption,
        },
        { onConflict: "user_id,week,media_type" },
      );
      setState("loaded");
      setError(COPY.removeFailed);
      return;
    }

    setStoragePath(null);
    setSignedUrl(null);
    setMimeType(null);
    setDurationSeconds(null);
    setCaption(null);
    setState("empty");
  }, [userId, week, mediaType, storagePath, mimeType, durationSeconds, caption]);

  const saveCaption = useCallback(
    async (raw: string): Promise<boolean> => {
      if (!storagePath) return false;
      if (!isCaptionWithinLimit(raw)) {
        setError("Caption is a little long");
        return false;
      }
      const next = captionForSave(raw);
      const { error: updErr } = await supabase
        .from(TABLE)
        .update({ caption: next })
        .eq("user_id", userId)
        .eq("week", week)
        .eq("media_type", mediaType);
      if (updErr) {
        setError(VIDEO_ERROR_COPY.uploadFailed);
        return false;
      }
      setCaption(next);
      return true;
    },
    [userId, week, mediaType, storagePath],
  );

  return {
    state,
    error,
    storagePath,
    signedUrl,
    mimeType,
    durationSeconds,
    caption,
    upload,
    remove,
    saveCaption,
    clearError,
  };
};
