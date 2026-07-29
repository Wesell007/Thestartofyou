import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import type { FilmBeat } from "@/lib/memoryFilm";
import { beatIndexAt, formatFilmLength } from "@/lib/memoryFilm";

interface Props {
  beats: FilmBeat[];
  totalSeconds: number;
  onExit: () => void;
}

const accent = "hsl(var(--stage-pregnancy-accent))";

/** Slow, calm drift applied to still frames. */
const driftStyle = (progress: number): React.CSSProperties => ({
  transform: `scale(${1 + progress * 0.04}) translateY(${progress * -1.2}%)`,
});

const WeekBadge = ({ week }: { week: number }) => (
  <span
    className="inline-flex items-center rounded-full px-3 py-1 font-sans text-[10px] font-medium tracking-[0.26em] uppercase text-white"
    style={{ background: "hsl(0 0% 100% / 0.16)", border: "1px solid hsl(0 0% 100% / 0.24)" }}
  >
    Week {week}
  </span>
);

/**
 * Private vertical (9:16) player for the pregnancy memory film.
 *
 * Playback is driven by a requestAnimationFrame clock against performance.now(),
 * accumulating elapsed time only while playing. Media elements are keyed by beat
 * id so each beat starts from the beginning of its own clip.
 *
 * Nothing is exported, downloaded or shared. Signed URLs are used as given.
 */
const MemoryFilmPlayer = ({ beats, totalSeconds, onExit }: Props) => {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [finished, setFinished] = useState(false);
  const [videoFailedId, setVideoFailedId] = useState<string | null>(null);

  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number | null>(null);
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);

  const index = Math.max(0, beatIndexAt(beats, elapsed));
  const beat = beats[index];

  useEffect(() => {
    if (!playing) {
      lastTickRef.current = null;
      return;
    }
    const step = (now: number) => {
      const last = lastTickRef.current;
      lastTickRef.current = now;
      if (last !== null) {
        const delta = (now - last) / 1000;
        setElapsed((prev) => {
          const next = prev + delta;
          if (next >= totalSeconds) {
            setPlaying(false);
            setFinished(true);
            return totalSeconds;
          }
          return next;
        });
      }
      rafRef.current = window.requestAnimationFrame(step);
    };
    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTickRef.current = null;
    };
  }, [playing, totalSeconds]);

  // Keep any mounted media element in step with play/pause.
  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    if (playing) {
      const attempt = el.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => undefined);
    } else {
      el.pause();
    }
  }, [playing, index]);

  const goToBeat = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 0), beats.length - 1);
      setFinished(false);
      setElapsed(beats[clamped].startSeconds);
    },
    [beats],
  );

  const restart = useCallback(() => {
    setElapsed(0);
    setFinished(false);
    setPlaying(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        setPlaying((p) => !p);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToBeat(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToBeat(index + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToBeat, index]);

  if (!beat) return null;

  const beatProgress = Math.min(
    1,
    Math.max(0, (elapsed - beat.startSeconds) / Math.max(beat.durationSeconds, 0.001)),
  );

  const renderBeat = () => {
    switch (beat.kind) {
      case "cover":
      case "ending":
        return (
          <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
            <p
              className="font-sans text-[10px] font-medium tracking-[0.32em] uppercase mb-4"
              style={{ color: accent }}
            >
              {beat.kind === "cover" ? "A pregnancy, kept" : "The story so far"}
            </p>
            <h2 className="font-serif text-white text-[2rem] leading-tight">{beat.title}</h2>
            {beat.subtitle && (
              <p className="mt-3 font-sans text-[13.5px] font-light tracking-wide text-white/70">
                {beat.subtitle}
              </p>
            )}
          </div>
        );

      case "chapter":
        return (
          <div className="flex h-full w-full flex-col items-center justify-center px-8 text-center">
            <p
              className="font-sans text-[10px] font-medium tracking-[0.32em] uppercase mb-4"
              style={{ color: accent }}
            >
              Trimester {beat.trimester}
            </p>
            <h2 className="font-serif text-white text-[1.8rem] leading-tight">{beat.title}</h2>
          </div>
        );

      case "weekLabel":
        return (
          <div className="flex h-full w-full items-center justify-center">
            <h2 className="font-serif text-white text-[2.2rem]">{beat.label}</h2>
          </div>
        );

      case "photo":
        return (
          <>
            <img
              src={beat.url}
              alt={beat.caption ?? `Saved photo from week ${beat.week}`}
              className="h-full w-full object-cover"
              style={driftStyle(beatProgress)}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-6 pb-7 pt-16">
              <WeekBadge week={beat.week} />
              {beat.caption && (
                <p className="mt-3 font-serif text-white text-[16px] leading-[1.5]">
                  {beat.caption}
                </p>
              )}
            </div>
          </>
        );

      case "video": {
        const useStill = videoFailedId === beat.id && !!beat.fallbackPhotoUrl;
        return (
          <>
            {useStill ? (
              <img
                src={beat.fallbackPhotoUrl as string}
                alt={beat.caption ?? `Saved moment from week ${beat.week}`}
                className="h-full w-full object-cover"
                style={driftStyle(beatProgress)}
              />
            ) : (
              <video
                key={beat.id}
                ref={mediaRef as React.RefObject<HTMLVideoElement>}
                src={beat.url}
                className="h-full w-full object-cover"
                muted
                playsInline
                autoPlay={playing}
                onError={() => setVideoFailedId(beat.id)}
              />
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-6 pb-7 pt-16">
              <WeekBadge week={beat.week} />
              {beat.caption && (
                <p className="mt-3 font-serif text-white text-[16px] leading-[1.5]">
                  {beat.caption}
                </p>
              )}
            </div>
          </>
        );
      }


      case "voice":
        return (
          <>
            {beat.backdropPhotoUrl && (
              <img
                src={beat.backdropPhotoUrl}
                alt=""
                aria-hidden
                className="h-full w-full object-cover opacity-40"
                style={driftStyle(beatProgress)}
              />
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
              <WeekBadge week={beat.week} />
              <div className="mt-6 flex h-12 items-end gap-[3px]" aria-hidden>
                {Array.from({ length: 22 }).map((_, i) => {
                  const wave =
                    0.35 +
                    0.65 *
                      Math.abs(Math.sin(i * 0.7 + beatProgress * Math.PI * 2.2));
                  return (
                    <span
                      key={i}
                      className="w-[3px] rounded-full"
                      style={{ height: `${wave * 100}%`, background: accent, opacity: 0.85 }}
                    />
                  );
                })}
              </div>
              <p className="mt-6 font-serif text-white/85 text-[16px] leading-[1.5] max-w-[26ch]">
                {beat.caption ?? "A voice note kept this week"}
              </p>
            </div>
            <audio
              key={beat.id}
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              src={beat.url}
              autoPlay={playing}
            />
          </>
        );

      case "reflection":
        return (
          <div className="flex h-full w-full flex-col items-center justify-center px-9 text-center">
            <WeekBadge week={beat.week} />
            <p className="mt-6 font-serif text-white text-[19px] leading-[1.6] max-w-[28ch]">
              {beat.excerpt}
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
      {/* 9:16 stage */}
      <div
        className="relative w-full max-w-[min(92vw,420px)] overflow-hidden rounded-[22px] bg-[hsl(28_18%_8%)]"
        style={{ aspectRatio: "9 / 16" }}
      >
        {renderBeat()}

        {finished && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 px-8 text-center">
            <p className="font-serif text-white text-[1.4rem]">That's your film, for now</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans text-[12.5px] text-background"
                style={{ background: accent }}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Play again
              </button>
              <button
                type="button"
                onClick={onExit}
                className="rounded-full border border-white/30 px-4 py-2 font-sans text-[12.5px] text-white/85"
              >
                Choose weeks
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Segmented progress */}
      <div className="mt-4 flex w-full max-w-[min(92vw,420px)] gap-[3px]">
        {beats.map((b, i) => {
          const fill = i < index ? 1 : i === index ? beatProgress : 0;
          return (
            <span
              key={b.id}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-foreground/15"
            >
              <span
                className="block h-full rounded-full"
                style={{ width: `${fill * 100}%`, background: accent }}
              />
            </span>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-4 flex w-full max-w-[min(92vw,420px)] items-center justify-between">
        <button
          type="button"
          onClick={() => goToBeat(index - 1)}
          disabled={index === 0}
          aria-label="Previous moment"
          className="rounded-full border border-foreground/15 p-2 text-foreground/70 disabled:opacity-35"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </button>

        <button
          type="button"
          onClick={() => {
            if (finished) restart();
            else setPlaying((p) => !p);
          }}
          aria-label={playing ? "Pause film" : "Play film"}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-sans text-[12.5px] font-medium text-background"
          style={{ background: accent }}
        >
          {playing ? (
            <Pause className="h-3.5 w-3.5" aria-hidden />
          ) : (
            <Play className="h-3.5 w-3.5" aria-hidden />
          )}
          {playing ? "Pause" : "Play"}
        </button>

        <button
          type="button"
          onClick={() => goToBeat(index + 1)}
          disabled={index >= beats.length - 1}
          aria-label="Next moment"
          className="rounded-full border border-foreground/15 p-2 text-foreground/70 disabled:opacity-35"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <p className="mt-3 font-sans text-[11.5px] tracking-[0.18em] uppercase text-foreground/50">
        {formatFilmLength(elapsed)} / {formatFilmLength(totalSeconds)}
      </p>
    </div>
  );
};

export default MemoryFilmPlayer;
