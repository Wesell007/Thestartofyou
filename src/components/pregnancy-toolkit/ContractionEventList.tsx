import {
  LocalContractionEvent,
  eventDurationMs,
  formatClockTime,
  formatDuration,
  formatGap,
  gapBetweenMs,
} from "@/lib/contractionTimerSchema";

interface Props {
  events: LocalContractionEvent[];
}

const softBorder = "hsl(var(--stage-pregnancy-accent) / 0.16)";

const ContractionEventList = ({ events }: Props) => {
  const completed = events.filter((e) => e.endedAt !== null);

  if (completed.length === 0) {
    return (
      <div
        className="rounded-[20px] keepsake-surface px-6 py-8 text-center border"
        style={{ borderColor: softBorder }}
      >
        <p className="font-serif italic text-[14.5px] text-foreground/65 leading-[1.6]">
          Your timings will appear here once you start and stop a contraction.
        </p>
      </div>
    );
  }

  const reversed = [...completed].reverse();

  return (
    <ul className="flex flex-col gap-3">
      {reversed.map((event, idxFromTop) => {
        const originalIndex = completed.length - 1 - idxFromTop;
        const prev = originalIndex > 0 ? completed[originalIndex - 1] : null;
        const gapMs = prev ? gapBetweenMs(prev, event) : null;
        const durationMs = eventDurationMs(event);
        return (
          <li
            key={event.localId}
            className="rounded-[16px] keepsake-surface px-5 py-4 border flex items-center justify-between gap-4"
            style={{ borderColor: softBorder }}
          >
            <div className="flex flex-col">
              <span className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-foreground/50">
                Started {formatClockTime(event.startedAt)}
              </span>
              <span className="font-serif text-[15px] text-foreground/85 mt-1">
                Lasted {formatDuration(durationMs)}
              </span>
            </div>
            <div className="text-right">
              <span className="block font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-foreground/45">
                Gap
              </span>
              <span className="block font-serif text-[15px] text-foreground/80 tabular-nums mt-1">
                {gapMs !== null ? formatGap(gapMs) : "—"}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ContractionEventList;
