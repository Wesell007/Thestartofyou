import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  lmp: Date;
  fertileStart: Date;
  fertileEnd: Date;
  ovulationDay: Date;
  bestDays: Date[];
  nextPeriod: Date;
  testDay: Date;
}

type MarkerKey =
  | "period-start"
  | "expected-period"
  | "ovulation"
  | "best-day"
  | "fertile"
  | "test"
  | null;

const legend: { key: Exclude<MarkerKey, null>; label: string }[] = [
  { key: "period-start", label: "Last period started" },
  { key: "fertile", label: "Possible fertile window" },
  { key: "ovulation", label: "Likely ovulation" },
  { key: "best-day", label: "Best days to try" },
  { key: "expected-period", label: "Expected period" },
  { key: "test", label: "Possible test day" },
];

const swatchStyle = (k: Exclude<MarkerKey, null>): React.CSSProperties => {
  switch (k) {
    case "period-start":
      return { background: "hsl(var(--terracotta) / 0.85)" };
    case "expected-period":
      return {
        background: "hsl(var(--card))",
        border: "1.5px dashed hsl(var(--terracotta) / 0.7)",
      };
    case "ovulation":
      return { background: "hsl(var(--stage-ttc-accent))" };
    case "best-day":
      return { background: "hsl(var(--stage-ttc-accent) / 0.55)" };
    case "fertile":
      return { background: "hsl(var(--stage-ttc))" };
    case "test":
      return {
        background: "hsl(var(--card))",
        border: "1.5px dashed hsl(var(--sage))",
      };
  }
};

const OvulationResultCalendar = ({
  lmp,
  fertileStart,
  fertileEnd,
  ovulationDay,
  bestDays,
  nextPeriod,
  testDay,
}: Props) => {
  const [monthCursor, setMonthCursor] = useState<Date>(startOfMonth(ovulationDay));

  const days = useMemo(() => {
    const gridStart = startOfWeek(startOfMonth(monthCursor), { weekStartsOn: 1 });
    const gridEnd = endOfWeek(endOfMonth(monthCursor), { weekStartsOn: 1 });
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [monthCursor]);

  const markerFor = (d: Date): MarkerKey => {
    if (isSameDay(d, ovulationDay)) return "ovulation";
    if (bestDays.some((b) => isSameDay(b, d))) return "best-day";
    if (isWithinInterval(d, { start: fertileStart, end: fertileEnd })) return "fertile";
    if (isSameDay(d, lmp)) return "period-start";
    if (isSameDay(d, nextPeriod)) return "expected-period";
    if (isSameDay(d, testDay)) return "test";
    return null;
  };

  const weekdayLabels = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div
      className="rounded-[1.75rem] border bg-card p-5 sm:p-7"
      style={{
        borderColor: "hsl(var(--stage-ttc-accent) / 0.2)",
        boxShadow:
          "0 1px 0 hsl(0 0% 100% / 0.95) inset, 0 18px 44px -28px hsl(var(--stage-ttc-accent) / 0.28)",
      }}
    >
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={() => setMonthCursor((m) => addMonths(m, -1))}
          className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-parchment-dark transition-colors"
          aria-label="Previous month"
          style={{ color: "hsl(var(--stage-ttc-accent))" }}
        >
          <ChevronLeft size={16} />
        </button>
        <p className="font-serif text-lg sm:text-xl text-foreground">
          {format(monthCursor, "MMMM yyyy")}
        </p>
        <button
          type="button"
          onClick={() => setMonthCursor((m) => addMonths(m, 1))}
          className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-parchment-dark transition-colors"
          aria-label="Next month"
          style={{ color: "hsl(var(--stage-ttc-accent))" }}
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-2">
        {weekdayLabels.map((d, i) => (
          <div
            key={i}
            className="text-center font-sans text-[10px] tracking-[0.2em] uppercase text-foreground/45 py-1"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {days.map((d) => {
          const inMonth = d.getMonth() === monthCursor.getMonth();
          const marker = markerFor(d);
          const base =
            "aspect-square rounded-lg sm:rounded-xl flex items-center justify-center font-sans text-[12px] sm:text-[13px] transition-colors";
          const style: React.CSSProperties = {};
          let text = "text-foreground/80";

          if (!inMonth) text = "text-foreground/25";

          if (marker === "ovulation") {
            style.background = "hsl(var(--stage-ttc-accent))";
            text = "text-white font-medium";
          } else if (marker === "best-day") {
            style.background = "hsl(var(--stage-ttc-accent) / 0.55)";
            text = "text-white font-medium";
          } else if (marker === "fertile") {
            style.background = "hsl(var(--stage-ttc))";
            text = "text-foreground font-medium";
          } else if (marker === "period-start") {
            style.background = "hsl(var(--terracotta) / 0.85)";
            text = "text-white font-medium";
          } else if (marker === "expected-period") {
            style.background = "hsl(var(--card))";
            style.border = "1.5px dashed hsl(var(--terracotta) / 0.7)";
            text = "text-foreground font-medium";
          } else if (marker === "test") {
            style.background = "hsl(var(--card))";
            style.border = "1.5px dashed hsl(var(--sage))";
            text = "text-foreground font-medium";
          }

          return (
            <div
              key={d.toISOString()}
              className={cn(base, text)}
              style={style}
              title={marker ? legend.find((l) => l.key === marker)?.label : undefined}
            >
              {format(d, "d")}
            </div>
          );
        })}
      </div>

      <div
        className="mt-6 pt-5 border-t"
        style={{ borderColor: "hsl(var(--stage-ttc-accent) / 0.14)" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {legend.map((l) => (
            <div key={l.key} className="flex items-center gap-2.5">
              <span
                className="inline-block w-4 h-4 rounded-md shrink-0"
                style={swatchStyle(l.key)}
                aria-hidden="true"
              />
              <span className="font-sans text-[12.5px] font-light text-foreground/70">
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OvulationResultCalendar;
