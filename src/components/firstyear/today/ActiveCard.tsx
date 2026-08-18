import { useEffect, useState } from "react";
import { format } from "date-fns";
import type { AmountUnit, CareEvent } from "@/lib/firstYearCareEventsSchema";
import {
  CARE_EVENT_LABELS,
  describeEvent,
  durationMinutes,
  formatDuration,
} from "@/lib/firstYearCareEventsSchema";
import {
  FY_CARD_RADIUS,
  FY_CTA,
  FY_EYEBROW,
  FY_SHADOW_SOFT,
  FY_SHADOW_STRONG,
  FY_STOPWATCH,
} from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  runningSleep: CareEvent | null;
  latest: CareEvent | null;
  babyName: (babyId: string) => string;
  unit: AmountUnit;
  onStopSleep: (event: CareEvent) => void;
  stopping: boolean;
};

/** Ticks once a minute so a running sleep stays current without a busy loop. */
const useMinuteTick = (active: boolean) => {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 60000);
    return () => window.clearInterval(timer);
  }, [active]);
};

/**
 * The sleep currently running, or the most recent logged moment. Duration is
 * counted from what the parent logged and nothing is ever suggested.
 */
const ActiveCard = ({ runningSleep, latest, babyName, unit, onStopSleep, stopping }: Props) => {
  useMinuteTick(Boolean(runningSleep));

  if (runningSleep) {
    const start = runningSleep.started_at ?? runningSleep.occurred_at;
    return (
      <section aria-label="Sleep in progress" className="pb-8">
        <div
          className={`${FY_CARD_RADIUS} border px-6 py-7`}
          style={{
            borderColor: "hsl(var(--stage-firstyear-accent) / 0.22)",
            backgroundColor: "hsl(var(--card))",
            boxShadow: FY_SHADOW_STRONG,
          }}
        >
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="min-w-0">
              <p className={FY_EYEBROW}>Sleeping now</p>
              <p className={`${FY_STOPWATCH} mt-2.5`}>
                {formatDuration(durationMinutes(start, new Date()))}
              </p>
              <p className="font-sans text-[13.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))] mt-2">
                {babyName(runningSleep.baby_id)} · started {format(new Date(start), "HH:mm")}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onStopSleep(runningSleep)}
              disabled={stopping}
              className={`${FY_CTA} w-full sm:w-auto disabled:opacity-60`}
              style={{
                backgroundColor: "hsl(var(--stage-firstyear-accent))",
                color: "hsl(var(--background))",
              }}
            >
              {stopping ? "Saving…" : "End sleep"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!latest) return null;

  const detail = describeEvent(latest, unit);
  return (
    <section aria-label="Most recent moment" className="pb-8">
      <div
        className={`${FY_CARD_RADIUS} border px-6 py-5`}
        style={{
          borderColor: "hsl(var(--stage-firstyear-accent) / 0.18)",
          backgroundColor: "hsl(var(--card) / 0.86)",
          boxShadow: FY_SHADOW_SOFT,
        }}
      >
        <p className={FY_EYEBROW}>Last logged</p>
        <p className="font-serif text-[1.22rem] leading-[1.3] text-foreground mt-1.5">
          {CARE_EVENT_LABELS[latest.event_type]} at {format(new Date(latest.occurred_at), "HH:mm")}
        </p>
        <p className="font-sans text-[13.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))] mt-1">
          {[babyName(latest.baby_id), detail].filter(Boolean).join(" · ")}
        </p>
      </div>
    </section>
  );
};

export default ActiveCard;
