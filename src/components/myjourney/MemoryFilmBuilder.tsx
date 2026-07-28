import { useMemo, useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  buildFilmTimeline,
  formatFilmLength,
  weekMemoryChips,
  weeksWithContent,
  type WeekMemory,
} from "@/lib/memoryFilm";
import MemoryFilmPlayer from "./MemoryFilmPlayer";

interface Props {
  open: boolean;
  onClose: () => void;
  firstName: string;
  currentWeek: number;
  dueLabel: string | null;
  weeks: WeekMemory[];
}

const accent = "hsl(var(--stage-pregnancy-accent))";

/**
 * Overlay that lets the user choose which kept weeks to include, then plays a
 * private film preview. No route is added: this lives inside My Journey.
 */
const MemoryFilmBuilder = ({
  open,
  onClose,
  firstName,
  currentWeek,
  dueLabel,
  weeks,
}: Props) => {
  const available = useMemo(() => weeksWithContent(weeks), [weeks]);
  const [deselected, setDeselected] = useState<number[]>([]);
  const [mode, setMode] = useState<"select" | "play">("select");

  const selectedWeeks = available
    .map((w) => w.week)
    .filter((w) => !deselected.includes(w));

  const timeline = useMemo(
    () =>
      buildFilmTimeline({
        firstName,
        currentWeek,
        dueLabel,
        weeks: available,
        selectedWeeks,
      }),
    [firstName, currentWeek, dueLabel, available, selectedWeeks.join(",")], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const toggle = (week: number) =>
    setDeselected((prev) =>
      prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week],
    );

  const close = () => {
    setMode("select");
    onClose();
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(v) => !v && close()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 overflow-y-auto focus:outline-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogPrimitive.Title className="sr-only">
            Your pregnancy memory film
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            A private preview of your saved photos, videos, voice notes and reflections.
          </DialogPrimitive.Description>

          <div className="mx-auto flex min-h-full w-full max-w-[560px] flex-col px-5 py-6 sm:py-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p
                  className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase mb-2"
                  style={{ color: accent }}
                >
                  Private preview
                </p>
                <h2 className="font-serif text-white text-[1.5rem] leading-tight">
                  {mode === "select" ? "Choose your weeks" : "Your pregnancy film"}
                </h2>
              </div>
              <DialogPrimitive.Close
                aria-label="Close film"
                className="rounded-full border border-white/25 p-2 text-white/80 hover:text-white"
              >
                <X className="h-4 w-4" aria-hidden />
              </DialogPrimitive.Close>
            </div>

            {mode === "select" ? (
              <>
                <p className="mb-5 font-sans text-[14px] font-light leading-7 text-white/70">
                  Every week you have kept something is included. Untick anything you would rather
                  leave out. Your film stays private to this page.
                </p>

                <ul className="mb-6 space-y-2">
                  {available.map((w) => {
                    const checked = !deselected.includes(w.week);
                    return (
                      <li key={w.week}>
                        <label className="flex cursor-pointer items-center gap-3 rounded-[14px] border border-white/12 bg-white/[0.04] px-4 py-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggle(w.week)}
                            className="h-4 w-4 accent-[hsl(var(--stage-pregnancy-accent))]"
                          />
                          <span className="font-serif text-white text-[15px] min-w-[70px]">
                            Week {w.week}
                          </span>
                          <span className="flex flex-wrap gap-1.5">
                            {weekMemoryChips(w).map((chip) => (
                              <span
                                key={chip}
                                className="rounded-full border border-white/20 px-2 py-[2px] font-sans text-[10px] tracking-[0.14em] uppercase text-white/70"
                              >
                                {chip}
                              </span>
                            ))}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-sans text-[12px] tracking-[0.16em] uppercase text-white/55">
                    {timeline.beats.length > 0
                      ? `About ${formatFilmLength(timeline.totalSeconds)}`
                      : "Nothing selected"}
                  </p>
                  <button
                    type="button"
                    disabled={timeline.beats.length === 0}
                    onClick={() => setMode("play")}
                    className="rounded-full px-5 py-3 font-sans text-[13px] font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-40"
                    style={{ background: accent }}
                  >
                    Play film
                  </button>
                </div>

                {timeline.sparse && timeline.beats.length > 0 && (
                  <p className="mt-4 font-sans text-[13px] font-light leading-6 text-white/60">
                    More saved memories will make a fuller film.
                  </p>
                )}
              </>
            ) : (
              <>
                <MemoryFilmPlayer
                  beats={timeline.beats}
                  totalSeconds={timeline.totalSeconds}
                  onExit={() => setMode("select")}
                />
                <button
                  type="button"
                  onClick={() => setMode("select")}
                  className="mx-auto mt-6 font-sans text-[13px] text-white/65 underline underline-offset-4"
                >
                  Choose different weeks
                </button>
              </>
            )}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default MemoryFilmBuilder;
