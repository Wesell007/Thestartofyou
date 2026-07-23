import { DraftSummary, formatClockTime } from "@/lib/contractionTimerSchema";

interface Props {
  summary: DraftSummary;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const ContractionSessionSummary = ({ summary }: Props) => {
  return (
    <div
      className="rounded-[16px] keepsake-surface px-5 py-4 border flex flex-wrap items-center gap-x-6 gap-y-2"
      style={{ borderColor: softBorder }}
    >
      <div className="flex flex-col">
        <span className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-foreground/50">
          Session started
        </span>
        <span className="font-serif text-[14.5px] text-foreground/85 mt-1">
          {formatClockTime(summary.sessionStartedAt)}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-foreground/50">
          Contractions timed
        </span>
        <span
          className="font-serif text-[14.5px] mt-1 tabular-nums"
          style={{ color: accent }}
        >
          {summary.completedCount}
        </span>
      </div>
      {summary.hasActive ? (
        <div className="flex flex-col">
          <span className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-foreground/50">
            Status
          </span>
          <span className="font-serif italic text-[14.5px] text-foreground/75 mt-1">
            One in progress
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default ContractionSessionSummary;
