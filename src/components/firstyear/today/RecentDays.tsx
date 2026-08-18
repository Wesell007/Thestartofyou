import { format } from "date-fns";
import type { CareEvent } from "@/lib/firstYearCareEventsSchema";
import { formatDuration, summariseDay } from "@/lib/firstYearCareEventsSchema";
import { FY_INNER_RADIUS } from "@/components/firstyear/journey/firstYearStyles";
import { parseDateOnly } from "@/lib/dateOnly";

type Props = {
  /** Events grouped by local date key, today excluded by the caller. */
  byDate: Record<string, CareEvent[]>;
  dates: string[];
};

/** A quiet look back over the last few days. Counts only, never a streak. */
const RecentDays = ({ byDate, dates }: Props) => (
  <section aria-labelledby="fy-recent-days" className="pb-8">
    <h2 id="fy-recent-days" className="font-serif text-[1.28rem] leading-[1.25] text-foreground mb-3">
      Recent days
    </h2>
    {dates.length === 0 ? (
      <p className="font-sans text-[14px] leading-[1.7] text-[hsl(var(--stage-firstyear-text))] max-w-[54ch]">
        Once you have logged a few days, a short summary of each one will sit here.
      </p>
    ) : (
      <ul className="space-y-2">
        {dates.map((dateKey) => {
          const summary = summariseDay(byDate[dateKey] ?? []);
          const parts = [
            summary.feeds > 0 ? `${summary.feeds} ${summary.feeds === 1 ? "feed" : "feeds"}` : null,
            summary.sleepMinutes > 0 ? `${formatDuration(summary.sleepMinutes)} sleep` : null,
            summary.feedMinutes > 0 ? `${formatDuration(summary.feedMinutes)} feeding` : null,
            summary.nappies > 0
              ? `${summary.nappies} ${summary.nappies === 1 ? "nappy" : "nappies"}`
              : null,
            summary.moments > 0
              ? `${summary.moments} ${summary.moments === 1 ? "moment" : "moments"}`
              : null,
          ].filter(Boolean);

          return (
            <li
              key={dateKey}
              className={`${FY_INNER_RADIUS} border px-4 py-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1`}
              style={{
                borderColor: "hsl(var(--stage-firstyear-accent) / 0.16)",
                backgroundColor: "hsl(var(--stage-firstyear) / 0.4)",
              }}
            >
              <span className="font-sans text-[13.5px] font-semibold text-foreground">
                {format(parseDateOnly(dateKey) ?? new Date(dateKey), "EEEE d MMM")}
              </span>
              <span className="font-sans text-[13px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))]">
                {parts.length > 0 ? parts.join(" · ") : "Nothing logged"}
              </span>
            </li>
          );
        })}
      </ul>
    )}
  </section>
);

export default RecentDays;
