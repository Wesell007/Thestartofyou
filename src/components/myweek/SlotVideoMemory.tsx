import { useEffect, useRef, useState } from "react";
import { Lock, Video, X, Play } from "lucide-react";
import { useWeekMedia } from "@/hooks/useWeekMedia";
import {
  CAPTION_MAX,
  CAPTION_PLACEHOLDER,
  VIDEO_ACCEPT_ATTR,
  VIDEO_ERROR_COPY,
  formatDuration,
  isCaptionWithinLimit,
  normaliseCaption,
} from "@/lib/weekMedia";
import SectionLabel from "@/components/myweek/SectionLabel";
import {
  PG_HELPER,
  PG_MEDIA_ACTION,
  PG_MEDIA_ACTION_QUIET,
  PG_MEDIA_CAPTION,
  PG_MEDIA_CAPTION_PANEL,
  PG_MEDIA_OVERLAY_ACTION,
  PG_MEDIA_OVERLAY_BADGE,
  PG_MEDIA_OVERLAY_ICON,
} from "@/components/myweek/pregnancyStyles";

interface Props {
  userId: string;
  week: number;
  onSaved?: () => void;
}

/**
 * Slot — Weekly video memory. One optional short video per week.
 * Signed-URL playback, native controls, no autoplay, no loop.
 */
const SlotVideoMemory = ({ userId, week, onSaved }: Props) => {
  const {
    state,
    error,
    signedUrl,
    mimeType,
    durationSeconds,
    caption,
    upload,
    remove,
    saveCaption,
    clearError,
  } = useWeekMedia({ userId, week, mediaType: "video" });

  const fileRef = useRef<HTMLInputElement>(null);
  const [captionEditing, setCaptionEditing] = useState(false);
  const [captionDraft, setCaptionDraft] = useState("");
  const [captionSaving, setCaptionSaving] = useState(false);
  const [captionError, setCaptionError] = useState<string | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!justSaved) return;
    const t = window.setTimeout(() => setJustSaved(false), 2400);
    return () => window.clearTimeout(t);
  }, [justSaved]);

  const flashSaved = () => {
    setJustSaved(false);
    window.setTimeout(() => setJustSaved(true), 0);
    onSaved?.();
  };

  const openFilePicker = () => {
    clearError();
    fileRef.current?.click();
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const ok = await upload(file);
    if (fileRef.current) fileRef.current.value = "";
    if (ok) flashSaved();
  };

  const openCaptionEditor = () => {
    setCaptionDraft(caption ?? "");
    setCaptionError(null);
    setCaptionEditing(true);
  };

  const cancelCaption = () => {
    setCaptionEditing(false);
    setCaptionDraft("");
    setCaptionError(null);
  };

  const submitCaption = async () => {
    if (!isCaptionWithinLimit(captionDraft)) {
      setCaptionError(`${CAPTION_MAX} characters max`);
      return;
    }
    setCaptionSaving(true);
    setCaptionError(null);
    const ok = await saveCaption(captionDraft);
    setCaptionSaving(false);
    setCaptionEditing(false);
    setCaptionDraft("");
    if (ok) flashSaved();
  };

  const uploading = state === "uploading";

  return (
    <section className="relative pt-8 pb-2">
      <SectionLabel className="mb-4">Video of this week</SectionLabel>

      <p className={`${PG_HELPER} mb-5 max-w-[42ch]`}>
        A little clip to keep, if one feels right this week.
      </p>

      <input
        ref={fileRef}
        type="file"
        accept={VIDEO_ACCEPT_ATTR}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        aria-label={`Add a video for week ${week}`}
      />

      {state === "loading" && (
        <div className="h-[120px] animate-pulse rounded-[20px] border border-[hsl(var(--stage-pregnancy-edge))] bg-[hsl(var(--stage-pregnancy-cream)/0.6)]" />
      )}

      {(state === "empty" || state === "uploading") && !signedUrl && (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] border border-[hsl(var(--stage-pregnancy-edge))] bg-[hsl(var(--stage-pregnancy-cream)/0.6)] px-5 py-5">
          <div className="flex items-center gap-3 min-w-0">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--stage-pregnancy-edge))] bg-[hsl(var(--stage-pregnancy-blush))] text-[hsl(var(--stage-pregnancy-accent))]"
            >
              <Play size={14} strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <p className="font-serif italic text-[15px] leading-snug text-[hsl(var(--stage-pregnancy-text))]">
                A little clip to keep
              </p>
              <p className={`${PG_HELPER} mt-0.5`}>Up to 60 seconds. Private to you.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={openFilePicker}
            disabled={uploading}
            className={PG_MEDIA_ACTION}
          >
            <Video size={12} strokeWidth={1.8} aria-hidden="true" />
            {uploading ? "Saving video..." : "Add video"}
          </button>
        </div>
      )}


      {state === "loaded" && signedUrl && (
        <figure className="relative overflow-hidden rounded-[20px] border border-[hsl(var(--stage-pregnancy-edge))] bg-card held-image">
          <video
            key={signedUrl}
            src={signedUrl}
            controls
            preload="metadata"
            playsInline
            className="w-full max-h-[520px] bg-[hsl(var(--stage-pregnancy-text))]"
            onError={() => setPlaybackError(VIDEO_ERROR_COPY.playbackFailed)}
            onPlay={() => setPlaybackError(null)}
          >
            {mimeType ? <source src={signedUrl} type={mimeType} /> : null}
          </video>
          <div className={`absolute top-2.5 left-2.5 sm:top-3 sm:left-3 ${PG_MEDIA_OVERLAY_BADGE}`}>
            <Lock size={10} strokeWidth={1.8} aria-hidden="true" />
            <span>Private</span>
          </div>
          {formatDuration(durationSeconds) && (
            <div
              className={`absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 ${PG_MEDIA_OVERLAY_BADGE} tracking-[0.08em]`}
            >
              <span className="tabular-nums">{formatDuration(durationSeconds)}</span>
            </div>
          )}
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={openFilePicker}
              disabled={uploading}
              className={PG_MEDIA_OVERLAY_ACTION}
              aria-label="Replace video"
            >
              <Video size={11} strokeWidth={1.8} aria-hidden="true" />
              <span className="hidden sm:inline">
                {uploading ? "Saving video..." : "Replace video"}
              </span>
              {uploading && <span className="sm:hidden">Saving video...</span>}
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={uploading}
              className={PG_MEDIA_OVERLAY_ICON}
              aria-label="Remove video"
            >
              <X size={13} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </figure>
      )}


      {justSaved && state === "loaded" && (
        <p
          className="mt-3 font-sans text-[11px] font-medium tracking-[0.22em] uppercase transition-opacity duration-500"
          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          role="status"
          aria-live="polite"
        >
          Saved to this week.
        </p>
      )}


      {error && (
        <p
          className="mt-3 font-sans text-[12.5px] font-light text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
      {playbackError && (
        <p
          className="mt-3 font-sans text-[12.5px] font-light text-destructive"
          role="alert"
        >
          {playbackError}
        </p>
      )}

      {state === "loaded" && signedUrl && (
        <div className="mt-4">
          {captionEditing ? (
            <div
              className="rounded-[18px] px-4 py-4"
              style={{
                background: "hsl(var(--stage-pregnancy) / 0.14)",
                border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.22)",
              }}
            >
              <label
                htmlFor={`video-caption-${week}`}
                className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase"
                style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
              >
                Caption
              </label>
              <textarea
                id={`video-caption-${week}`}
                value={captionDraft}
                onChange={(e) => {
                  const next = e.target.value;
                  setCaptionDraft(next);
                  if (captionError && isCaptionWithinLimit(next)) setCaptionError(null);
                }}
                rows={2}
                placeholder={CAPTION_PLACEHOLDER}
                disabled={captionSaving}
                className="mt-2 w-full resize-none bg-transparent font-serif italic text-[14.5px] leading-[1.6] text-foreground/85 placeholder:text-foreground/40 focus:outline-none"
              />
              <div className="flex items-center justify-between gap-3 mt-2">
                <span
                  className="font-sans text-[10.5px] font-medium tracking-[0.2em] uppercase"
                  style={{
                    color: isCaptionWithinLimit(captionDraft)
                      ? "hsl(var(--stage-pregnancy-accent))"
                      : "hsl(var(--destructive))",
                  }}
                >
                  {normaliseCaption(captionDraft).length}/{CAPTION_MAX}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={cancelCaption}
                    disabled={captionSaving}
                    className="rounded-full px-3.5 py-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-foreground/60 hover:text-foreground/85 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitCaption}
                    disabled={captionSaving || !isCaptionWithinLimit(captionDraft)}
                    className="rounded-full px-4 py-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase transition-colors disabled:opacity-50"
                    style={{
                      color: "hsl(var(--stage-pregnancy-accent))",
                      border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.5)",
                    }}
                  >
                    {captionSaving ? "Saving" : "Save"}
                  </button>
                </div>
              </div>
              {captionError && (
                <p className="mt-2 font-sans text-[12px] font-light text-destructive" role="alert">
                  {captionError}
                </p>
              )}
            </div>
          ) : caption ? (
            <button
              type="button"
              onClick={openCaptionEditor}
              className="w-full text-left rounded-[16px] px-4 py-3 font-serif italic text-[14px] leading-[1.6] text-foreground/78 hover:text-foreground/90 transition-colors"
              style={{
                background: "hsl(var(--stage-pregnancy) / 0.10)",
                border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.16)",
              }}
            >
              {caption}
            </button>
          ) : (
            <button
              type="button"
              onClick={openCaptionEditor}
              className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-foreground/60 hover:text-foreground/85 transition-colors"
            >
              Caption
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default SlotVideoMemory;
