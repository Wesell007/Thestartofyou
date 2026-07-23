import { Play, Square, RotateCcw, Save } from "lucide-react";
import { formatDuration } from "@/lib/contractionTimerSchema";

interface Props {
  isActive: boolean;
  activeElapsedMs: number;
  hasEvents: boolean;
  saving: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  onSave: () => void;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const ContractionTimerControls = ({
  isActive,
  activeElapsedMs,
  hasEvents,
  saving,
  onStart,
  onStop,
  onReset,
  onSave,
}: Props) => {
  return (
    <div
      className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8 border"
      style={{ borderColor: softBorder }}
    >
      <div className="flex flex-col items-center text-center">
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.28em] uppercase mb-3"
          style={{ color: accent }}
        >
          {isActive ? "Contraction in progress" : "Timer"}
        </p>
        <p
          className="font-serif text-[3rem] sm:text-[3.5rem] leading-none tabular-nums text-foreground/88 mb-6"
          aria-live="polite"
        >
          {formatDuration(isActive ? activeElapsedMs : 0)}
        </p>

        {isActive ? (
          <button
            type="button"
            onClick={onStop}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-sans text-[13px] font-medium tracking-[0.22em] uppercase text-white transition-shadow hover:shadow-[0_18px_44px_-20px_hsl(var(--stage-pregnancy-accent)/0.5)]"
            style={{ background: accent }}
          >
            <Square size={14} strokeWidth={2} />
            Stop contraction
          </button>
        ) : (
          <button
            type="button"
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 font-sans text-[13px] font-medium tracking-[0.22em] uppercase text-white transition-shadow hover:shadow-[0_18px_44px_-20px_hsl(var(--stage-pregnancy-accent)/0.5)]"
            style={{ background: accent }}
          >
            <Play size={14} strokeWidth={2} />
            Start contraction
          </button>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onReset}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase text-foreground/70 transition-colors hover:text-foreground/90 disabled:opacity-50"
            style={{ borderColor: softBorder }}
          >
            <RotateCcw size={12} strokeWidth={1.8} />
            Reset session
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={saving || !hasEvents}
            className="inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 font-sans text-[11.5px] font-medium tracking-[0.22em] uppercase transition-colors disabled:opacity-50"
            style={{ borderColor: softBorder, color: accent }}
          >
            <Save size={12} strokeWidth={1.8} />
            {saving ? "Saving…" : "Save session"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractionTimerControls;
