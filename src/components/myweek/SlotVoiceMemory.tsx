import { useCallback, useEffect, useRef, useState } from "react";
import { Lock, Mic, Square, X, RotateCcw } from "lucide-react";
import { useWeekMedia } from "@/hooks/useWeekMedia";
import {
  CAPTION_MAX,
  CAPTION_PLACEHOLDER,
  VOICE_ERROR_COPY,
  VOICE_MAX_DURATION_SECONDS,
  baseAudioMime,
  formatDuration,
  isCaptionWithinLimit,
  isVoiceRecordingSupported,
  normaliseCaption,
  pickVoiceRecorderMime,
} from "@/lib/weekMedia";
import SectionLabel from "@/components/myweek/SectionLabel";
import {
  PG_HELPER,
  PG_MEDIA_ACTION,
  PG_MEDIA_ACTION_QUIET,
  PG_MEDIA_CAPTION,
  PG_MEDIA_CAPTION_PANEL,
} from "@/components/myweek/pregnancyStyles";

interface Props {
  userId: string;
  week: number;
  onSaved?: () => void;
}

type RecorderPhase = "idle" | "recording" | "preview";

/**
 * Slot — Weekly voice note. One optional short recording per week.
 *
 * Recorded in-browser with MediaRecorder (feature-detected). The microphone
 * is only requested after the user taps Record. Playback is always manual:
 * no autoplay anywhere. Saved as `media_type = "voice_note"`.
 */
const SlotVoiceMemory = ({ userId, week, onSaved }: Props) => {
  const {
    state,
    error,
    signedUrl,
    mimeType,
    durationSeconds,
    caption,
    uploadVoice,
    remove,
    saveCaption,
    clearError,
  } = useWeekMedia({ userId, week, mediaType: "voice_note" });

  const [supported] = useState(() => isVoiceRecordingSupported());
  const [phase, setPhase] = useState<RecorderPhase>("idle");
  const [elapsed, setElapsed] = useState(0);
  const [recorderError, setRecorderError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  const [captionEditing, setCaptionEditing] = useState(false);
  const [captionDraft, setCaptionDraft] = useState("");
  const [captionSaving, setCaptionSaving] = useState(false);
  const [captionError, setCaptionError] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const startedAtRef = useRef<number>(0);
  const tickRef = useRef<number | null>(null);
  const previewRef = useRef<{ blob: Blob; mime: string; duration: number } | null>(null);

  const accent = "hsl(var(--stage-pregnancy-accent))";

  useEffect(() => {
    if (!justSaved) return;
    const t = window.setTimeout(() => setJustSaved(false), 2400);
    return () => window.clearTimeout(t);
  }, [justSaved]);

  const stopTicker = () => {
    if (tickRef.current !== null) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
  };

  const releaseStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const clearPreview = useCallback(() => {
    setPreviewUrl((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
    previewRef.current = null;
  }, []);

  // Tear everything down on unmount / week change.
  useEffect(
    () => () => {
      stopTicker();
      releaseStream();
      try {
        recorderRef.current?.stop();
      } catch {
        /* ignore */
      }
      recorderRef.current = null;
      previewRef.current = null;
    },
    [week],
  );

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const flashSaved = () => {
    setJustSaved(false);
    window.setTimeout(() => setJustSaved(true), 0);
    onSaved?.();
  };

  const startRecording = async () => {
    clearError();
    setRecorderError(null);
    setPlaybackError(null);
    clearPreview();

    if (!supported) {
      setRecorderError(VOICE_ERROR_COPY.unsupported);
      return;
    }

    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setRecorderError(VOICE_ERROR_COPY.micDenied);
      return;
    }
    streamRef.current = stream;

    const chosen = pickVoiceRecorderMime();
    if (chosen === null) {
      releaseStream();
      setRecorderError(VOICE_ERROR_COPY.unsupported);
      return;
    }

    let recorder: MediaRecorder;
    try {
      recorder = chosen ? new MediaRecorder(stream, { mimeType: chosen }) : new MediaRecorder(stream);
    } catch {
      releaseStream();
      setRecorderError(VOICE_ERROR_COPY.recordFailed);
      return;
    }

    chunksRef.current = [];
    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
    };
    recorder.onerror = () => {
      stopTicker();
      releaseStream();
      setPhase("idle");
      setRecorderError(VOICE_ERROR_COPY.recordFailed);
    };
    recorder.onstop = () => {
      stopTicker();
      releaseStream();
      const mime = baseAudioMime(recorder.mimeType || chosen || "audio/webm");
      const blob = new Blob(chunksRef.current, { type: mime });
      chunksRef.current = [];
      const duration = Math.max(
        1,
        Math.round((Date.now() - startedAtRef.current) / 1000),
      );
      if (blob.size <= 0) {
        setPhase("idle");
        setRecorderError(VOICE_ERROR_COPY.empty);
        return;
      }
      previewRef.current = { blob, mime, duration };
      setPreviewUrl(URL.createObjectURL(blob));
      setElapsed(duration);
      setPhase("preview");
    };

    recorderRef.current = recorder;
    startedAtRef.current = Date.now();
    setElapsed(0);
    setPhase("recording");
    try {
      recorder.start();
    } catch {
      releaseStream();
      setPhase("idle");
      setRecorderError(VOICE_ERROR_COPY.recordFailed);
      return;
    }

    tickRef.current = window.setInterval(() => {
      const secs = Math.floor((Date.now() - startedAtRef.current) / 1000);
      setElapsed(secs);
      if (secs >= VOICE_MAX_DURATION_SECONDS) {
        try {
          recorderRef.current?.stop();
        } catch {
          /* ignore */
        }
      }
    }, 250);
  };

  const stopRecording = () => {
    try {
      recorderRef.current?.stop();
    } catch {
      stopTicker();
      releaseStream();
      setPhase("idle");
      setRecorderError(VOICE_ERROR_COPY.recordFailed);
    }
  };

  const discardPreview = () => {
    clearPreview();
    setElapsed(0);
    setPhase("idle");
    setRecorderError(null);
  };

  const savePreview = async () => {
    const pending = previewRef.current;
    if (!pending) return;
    const ok = await uploadVoice(pending.blob, {
      mimeType: pending.mime,
      durationSeconds: pending.duration,
    });
    if (ok) {
      clearPreview();
      setElapsed(0);
      setPhase("idle");
      flashSaved();
    }
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
  const hasSaved = state === "loaded" && Boolean(signedUrl);
  const timer = formatDuration(elapsed) ?? "0:00";

  return (
    <section className="relative pt-8 pb-2">
      <SectionLabel className="mb-4">A voice note</SectionLabel>

      <p className={`${PG_HELPER} mb-5 max-w-[42ch]`}>
        Record a few words for this week, in your own voice.
      </p>

      {state === "loading" && (
        <div className="h-[92px] animate-pulse rounded-[20px] border border-[hsl(var(--stage-pregnancy-edge))] bg-[hsl(var(--stage-pregnancy-cream)/0.6)]" />
      )}

      {/* Empty / recording / preview — only when nothing is saved yet */}
      {state !== "loading" && !hasSaved && (
        <div className="rounded-[20px] border border-[hsl(var(--stage-pregnancy-edge))] bg-[hsl(var(--stage-pregnancy-cream)/0.6)] px-5 py-5">

          {phase === "idle" && (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--stage-pregnancy-edge))] bg-[hsl(var(--stage-pregnancy-blush))] text-[hsl(var(--stage-pregnancy-accent))]"
                >
                  <Mic size={14} strokeWidth={1.8} />
                </span>
                <div className="min-w-0">
                  <p className="font-serif italic text-[15px] leading-snug text-[hsl(var(--stage-pregnancy-text))]">
                    Say it out loud
                  </p>
                  <p className={`${PG_HELPER} mt-0.5`}>Up to three minutes. Private to you.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={startRecording}
                disabled={uploading || !supported}
                className={`${PG_MEDIA_ACTION} shrink-0`}
              >
                <Mic size={12} strokeWidth={1.8} aria-hidden="true" />
                Record
              </button>
            </div>
          )}

          {phase === "recording" && (
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 animate-pulse items-center justify-center rounded-full bg-destructive/15 text-destructive"
                >
                  <Mic size={14} strokeWidth={1.9} />
                </span>
                <div className="min-w-0">
                  <p
                    className="font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase text-[hsl(var(--stage-pregnancy-accent))]"
                    role="status"
                    aria-live="polite"
                  >
                    Recording
                  </p>
                  <p className="mt-0.5 font-serif text-[17px] leading-snug tabular-nums text-[hsl(var(--stage-pregnancy-text))]">
                    {timer}
                  </p>
                </div>
              </div>
              <button type="button" onClick={stopRecording} className={`${PG_MEDIA_ACTION} shrink-0`}>
                <Square size={11} strokeWidth={2} fill="currentColor" aria-hidden="true" />
                Stop
              </button>
            </div>
          )}

          {phase === "preview" && previewUrl && (
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase text-[hsl(var(--stage-pregnancy-accent))]">
                  Have a listen
                </p>
                {formatDuration(elapsed) && (
                  <span className="font-sans text-[11px] tabular-nums text-[hsl(var(--stage-pregnancy-text-soft))]">
                    {formatDuration(elapsed)}
                  </span>
                )}
              </div>
              <audio
                key={previewUrl}
                src={previewUrl}
                controls
                preload="metadata"
                className="w-full"
                onError={() => setPlaybackError(VOICE_ERROR_COPY.playbackFailed)}
                onPlay={() => setPlaybackError(null)}
              />
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={savePreview}
                  disabled={uploading}
                  className={PG_MEDIA_ACTION}
                >
                  {uploading ? "Saving voice note..." : "Save voice note"}
                </button>
                <button
                  type="button"
                  onClick={startRecording}
                  disabled={uploading}
                  className={PG_MEDIA_ACTION_QUIET}
                >
                  <RotateCcw size={11} strokeWidth={1.8} aria-hidden="true" />
                  Record again
                </button>
                <button
                  type="button"
                  onClick={discardPreview}
                  disabled={uploading}
                  className={PG_MEDIA_ACTION_QUIET}
                >
                  Discard

                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Saved voice note */}
      {hasSaved && (
        <figure
          className="rounded-[20px] px-5 py-5 bg-card"
          style={{ border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.18)" }}
        >
          <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-foreground/10 text-foreground/70">
              <Lock size={10} strokeWidth={1.8} aria-hidden="true" />
              <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase">
                Private
              </span>
            </span>
            <div className="flex items-center gap-2">
              {formatDuration(durationSeconds) && (
                <span className="font-sans text-[11px] text-foreground/60 tabular-nums">
                  {formatDuration(durationSeconds)}
                </span>
              )}
              <button
                type="button"
                onClick={() => {
                  clearError();
                  setPhase("idle");
                  startRecording();
                }}
                disabled={uploading || !supported}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-foreground/60 hover:text-foreground/85 transition-colors disabled:opacity-60"
                aria-label="Replace voice note"
              >
                <Mic size={11} strokeWidth={1.8} />
                {uploading ? "Saving voice note..." : "Replace"}
              </button>
              <button
                type="button"
                onClick={remove}
                disabled={uploading}
                className="w-7 h-7 rounded-full bg-foreground/10 text-foreground/70 hover:bg-foreground/20 transition-colors flex items-center justify-center disabled:opacity-60"
                aria-label="Remove voice note"
              >
                <X size={12} strokeWidth={1.8} />
              </button>
            </div>
          </div>
          <audio
            key={signedUrl ?? "voice"}
            src={signedUrl ?? undefined}
            controls
            preload="metadata"
            className="w-full"
            onError={() => setPlaybackError(VOICE_ERROR_COPY.playbackFailed)}
            onPlay={() => setPlaybackError(null)}
          >
            {mimeType && signedUrl ? <source src={signedUrl} type={mimeType} /> : null}
          </audio>
        </figure>
      )}

      {/* Replace flow: recording / preview surfaced under the saved player */}
      {hasSaved && phase !== "idle" && (
        <div
          className="mt-3 rounded-[18px] px-5 py-4"
          style={{
            background: "hsl(var(--stage-pregnancy) / 0.12)",
            border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.2)",
          }}
        >
          {phase === "recording" ? (
            <div className="flex items-center justify-between gap-3">
              <p className="font-serif text-[15px] text-foreground/80 tabular-nums">
                Recording · {timer}
              </p>
              <button
                type="button"
                onClick={stopRecording}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-[11px] font-medium tracking-[0.22em] uppercase"
                style={{ color: accent, border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.42)" }}
              >
                <Square size={11} strokeWidth={2} fill="currentColor" />
                Stop
              </button>
            </div>
          ) : previewUrl ? (
            <div>
              <p
                className="font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase mb-3"
                style={{ color: accent }}
              >
                New recording
              </p>
              <audio key={previewUrl} src={previewUrl} controls preload="metadata" className="w-full" />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={savePreview}
                  disabled={uploading}
                  className="rounded-full px-4 py-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase transition-colors disabled:opacity-60"
                  style={{ color: accent, border: "1px solid hsl(var(--stage-pregnancy-accent) / 0.5)" }}
                >
                  {uploading ? "Saving voice note..." : "Replace saved note"}
                </button>
                <button
                  type="button"
                  onClick={discardPreview}
                  disabled={uploading}
                  className="rounded-full px-3.5 py-1.5 font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-foreground/55 hover:text-foreground/80 transition-colors disabled:opacity-60"
                >
                  Keep the original
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {justSaved && hasSaved && (
        <p
          className="mt-3 font-sans text-[11px] font-medium tracking-[0.22em] uppercase transition-opacity duration-500"
          style={{ color: accent }}
          role="status"
          aria-live="polite"
        >
          Saved to this week.
        </p>
      )}

      {!supported && (
        <p className="mt-3 font-sans text-[12.5px] font-light text-foreground/60">
          {VOICE_ERROR_COPY.unsupported}
        </p>
      )}
      {recorderError && (
        <p className="mt-3 font-sans text-[12.5px] font-light text-destructive" role="alert">
          {recorderError}
        </p>
      )}
      {error && (
        <p className="mt-3 font-sans text-[12.5px] font-light text-destructive" role="alert">
          {error}
        </p>
      )}
      {playbackError && (
        <p className="mt-3 font-sans text-[12.5px] font-light text-destructive" role="alert">
          {playbackError}
        </p>
      )}

      {/* Caption */}
      {hasSaved && (
        <div className="mt-4">
          {captionEditing ? (
            <div className={PG_MEDIA_CAPTION_PANEL}>
              <label
                htmlFor={`voice-caption-${week}`}
                className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-[hsl(var(--stage-pregnancy-accent))]"
              >
                Caption
              </label>
              <textarea
                id={`voice-caption-${week}`}
                value={captionDraft}
                onChange={(e) => {
                  const next = e.target.value;
                  setCaptionDraft(next);
                  if (captionError && isCaptionWithinLimit(next)) setCaptionError(null);
                }}
                rows={2}
                placeholder={CAPTION_PLACEHOLDER}
                disabled={captionSaving}
                className="mt-2 w-full resize-none bg-transparent font-serif italic text-[14.5px] leading-[1.6] text-[hsl(var(--stage-pregnancy-text))] placeholder:text-[hsl(var(--stage-pregnancy-text-soft)/0.7)] focus:outline-none"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 mt-2">
                <span
                  className={`font-sans text-[10.5px] font-medium tracking-[0.2em] uppercase ${
                    isCaptionWithinLimit(captionDraft)
                      ? "text-[hsl(var(--stage-pregnancy-accent))]"
                      : "text-destructive"
                  }`}
                >
                  {normaliseCaption(captionDraft).length}/{CAPTION_MAX}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={cancelCaption}
                    disabled={captionSaving}
                    className={PG_MEDIA_ACTION_QUIET}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitCaption}
                    disabled={captionSaving || !isCaptionWithinLimit(captionDraft)}
                    className={`${PG_MEDIA_ACTION} disabled:opacity-50`}
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
              aria-label="Edit caption"
              className={`w-full text-left ${PG_MEDIA_CAPTION_PANEL} ${PG_MEDIA_CAPTION} transition-colors hover:bg-[hsl(var(--stage-pregnancy-cream))]`}
            >
              {caption}
            </button>
          ) : (
            <button type="button" onClick={openCaptionEditor} className={PG_MEDIA_ACTION_QUIET}>
              Caption
            </button>
          )}

        </div>
      )}
    </section>
  );
};

export default SlotVoiceMemory;
