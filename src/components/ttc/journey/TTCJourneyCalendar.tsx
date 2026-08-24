import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import type { ActiveTTCJourney } from "@/lib/savedTTCJourney";
import type { TTCLog } from "@/lib/ttcLogs";
import { groupTTCLogsByDate, LOG_TYPE_LABEL } from "@/lib/ttcLogs";
import { parseDateOnly } from "@/lib/dateOnly";
import {
  TTC_EYEBROW,
  TTC_HEADING,
  TTC_ICON_CONTROL,
  TTC_PAPER_CARD,
  TTC_SOFT_PILL,
  TTC_FOCUS_RING,
  TTC_DAY_STATES,
  type TTCDayStateKey,
} from "@/components/ttc/journey/ttcStyles";

/**
 * Cycle calendar with soft colour-coded milestone days and solid user-log
 * markers.
 *
 * Clickability never relies on colour alone — every actionable day is a
 * button with an accessible label, and each coloured day also carries a short
 * text chip. User logs show as solid dots and a count for a11y contrast.
 */

type Props = {
  journey: ActiveTTCJourney;
  logs: TTCLog[];
  onSelectDate: (dateIso: string) => void;
  onAddForToday: () => void;
};

type Milestone = {
  key: string;
  label: string;
  state: TTCDayStateKey;
  dateIso: string | null;
};

const toIso = (d: Date) => format(d, "yyyy-MM-dd");

const TTCJourneyCalendar = ({ journey, logs, onSelectDate, onAddForToday }: Props) => {
  const [visibleMonth, setVisibleMonth] = useState<Date>(startOfMonth(new Date()));

  const milestones: Milestone[] = [
    { key: "period", label: "Period start", state: "period", dateIso: journey.last_period_date },
    { key: "fw_start", label: "Fertile window", state: "fertile", dateIso: journey.fertile_window_start },
    { key: "ovulation", label: "Likely ovulation", state: "ovulation", dateIso: journey.likely_ovulation_date },
    { key: "fw_end", label: "Fertile window ends", state: "fertile", dateIso: journey.fertile_window_end },
    { key: "test", label: "Possible test day", state: "test", dateIso: journey.possible_test_date },
    { key: "expected", label: "Expected period", state: "expected", dateIso: journey.expected_period_date },
  ];

  const milestonesByDate = useMemo(() => {
    const map: Record<string, Milestone[]> = {};
    for (const m of milestones) {
      if (!m.dateIso) continue;
      const parsed = parseDateOnly(m.dateIso);
      if (!parsed) continue;
      const iso = format(parsed, "yyyy-MM-dd");
      (map[iso] ||= []).push(m);
    }
    return map;
  }, [journey]); // eslint-disable-line react-hooks/exhaustive-deps

  const logsByDate = useMemo(() => groupTTCLogsByDate(logs), [logs]);

  const monthStart = startOfMonth(visibleMonth);
  const monthEnd = endOfMonth(visibleMonth);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });
  const today = new Date();

  return (
    <div className={`${TTC_PAPER_CARD} px-4 sm:px-7 py-6 sm:py-8`}>
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div className="min-w-0">
          <p className={`${TTC_EYEBROW} mb-1`}>Your cycle calendar</p>
          <h2 className={`${TTC_HEADING} text-[20px] sm:text-[23px]`}>
            {format(visibleMonth, "LLLL yyyy")}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setVisibleMonth((m) => addMonths(m, -1))}
            className={TTC_ICON_CONTROL}
          >
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setVisibleMonth(startOfMonth(new Date()))}
            className={`inline-flex min-h-11 items-center rounded-pill border border-[hsl(var(--stage-ttc-olive)/0.32)] px-4 font-sans text-[12.5px] font-medium text-[hsl(var(--stage-ttc-text))] transition-colors hover:bg-[hsl(var(--stage-ttc-sage)/0.6)] ${TTC_FOCUS_RING}`}
          >
            Today
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setVisibleMonth((m) => addMonths(m, 1))}
            className={TTC_ICON_CONTROL}
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onAddForToday}
            className={`${TTC_SOFT_PILL} px-5`}
          >
            <Plus size={14} aria-hidden="true" /> Add a note
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            className="font-sans text-[10px] tracking-[0.15em] uppercase text-[hsl(var(--stage-ttc-text-soft))] text-center"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const iso = toIso(day);
          const isFuture = iso > toIso(today);
          const inMonth = isSameMonth(day, visibleMonth);
          const isCurrent = isSameDay(day, today) || isToday(day);
          const dayMilestones = milestonesByDate[iso] ?? [];
          const dayLogs = logsByDate[iso] ?? [];
          const hasLogs = dayLogs.length > 0;
          const milestoneShort = dayMilestones[0]?.short;
          const ariaBits = [
            format(day, "EEEE d MMMM"),
            ...dayMilestones.map((m) => m.label),
            hasLogs ? `${dayLogs.length} ${dayLogs.length === 1 ? "log" : "logs"} added` : "",
            isFuture ? "Future date" : "Add or view log",
          ].filter(Boolean);
          return (
            <button
              key={iso}
              type="button"
              onClick={() => !isFuture && onSelectDate(iso)}
              disabled={isFuture}
              aria-label={ariaBits.join(", ")}
              className={`relative rounded-[10px] aspect-square min-h-[44px] p-1 flex flex-col items-stretch justify-between text-left transition-colors ${
                inMonth ? "hover:bg-[hsl(var(--stage-ttc-sage)/0.55)]" : "opacity-40 hover:opacity-60"
              }`}
              style={
                isCurrent
                  ? {
                      background: "hsl(var(--stage-ttc-olive) / 0.10)",
                      boxShadow: "inset 0 0 0 1px hsl(var(--stage-ttc-olive) / 0.45)",
                    }
                  : undefined
              }
            >
              <span
                className={`font-sans text-[12px] leading-none ${
                  isCurrent ? "font-semibold text-[hsl(var(--stage-ttc-text))]" : "text-[hsl(var(--stage-ttc-text-soft))]"
                }`}
              >
                {format(day, "d")}
              </span>
              {milestoneShort && (
                <span
                  className="font-sans text-[8.5px] tracking-[0.05em] uppercase leading-tight rounded px-1 py-[1px] self-start truncate max-w-full"
                  style={{
                    background: "hsl(var(--stage-ttc-olive) / 0.14)",
                    color: "hsl(var(--stage-ttc-olive))",
                  }}
                  title={dayMilestones.map((m) => m.label).join(", ")}
                >
                  {milestoneShort}
                </span>
              )}
              {hasLogs && (
                <span className="flex items-center gap-0.5 self-end" aria-hidden="true">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "hsl(var(--stage-ttc-olive))" }}
                  />
                  {dayLogs.length > 1 && (
                    <span
                      className="font-sans text-[9px] font-semibold"
                      style={{ color: "hsl(var(--stage-ttc-olive))" }}
                    >
                      {dayLogs.length}
                    </span>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11.5px] text-[hsl(var(--stage-ttc-text-soft))]">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block rounded px-1.5 py-[1px] font-sans text-[9px] uppercase tracking-[0.05em]"
            style={{
              background: "hsl(var(--stage-ttc-olive) / 0.14)",
              color: "hsl(var(--stage-ttc-olive))",
            }}
          >
            Chip
          </span>
          estimated milestone
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: "hsl(var(--stage-ttc-olive))" }}
          />
          your logs
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="w-3 h-3 rounded"
            style={{
              boxShadow: "inset 0 0 0 1px hsl(var(--stage-ttc-olive) / 0.45)",
              background: "hsl(var(--stage-ttc-olive) / 0.10)",
            }}
          />
          today
        </span>
      </div>

      {/* Milestone key (unique labels) */}
      {Object.values(LOG_TYPE_LABEL) && null}
    </div>
  );
};

export default TTCJourneyCalendar;
