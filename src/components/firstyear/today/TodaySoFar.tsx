import type { AmountUnit, DaySummary } from "@/lib/firstYearCareEventsSchema";
import { NAPPY_LABELS, formatAmount, formatDuration } from "@/lib/firstYearCareEventsSchema";
import { FY_EYEBROW, FY_INNER_RADIUS } from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  summary: DaySummary;
  unit: AmountUnit;
  scopeLabel: string;
};

/**
 * Counts and totals of what has been logged today. Factual only: nothing here
 * suggests, predicts or compares. A timer still running is shown as running,
 * never folded into a total.
 */
const TodaySoFar = ({ summary, unit, scopeLabel }: Props) => {
  const amount = formatAmount(summary.feedMl, unit);
  const feedDetail = [
    summary.feedMinutes > 0 ? `${formatDuration(summary.feedMinutes)} feeding` : null,
    amount ? `${amount} logged` : null,
    summary.runningFeed ? "Currently feeding" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const sleepDetail = [
    summary.sleeps > 0 ? `${summary.sleeps} logged` : null,
    summary.runningSleep ? "Currently sleeping" : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const nappyDetail = (["wee", "poo", "both", "dry"] as const)
    .filter((type) => summary.nappyBreakdown[type] > 0)
    .map((type) => `${summary.nappyBreakdown[type]} ${NAPPY_LABELS[type].toLowerCase()}`)
    .join(" · ");

  const tiles = [
    {
      label: "Feeds",
      value: String(summary.feeds),
      detail: feedDetail.length > 0 ? feedDetail : null,
    },
    {
      label: "Sleep",
      value: summary.sleepMinutes > 0 ? formatDuration(summary.sleepMinutes) : "—",
      detail: sleepDetail.length > 0 ? sleepDetail : null,
    },
    {
      label: "Nappies",
      value: String(summary.nappies),
      detail: nappyDetail.length > 0 ? nappyDetail : null,
    },
    {
      label: "Moments",
      value: summary.moments > 0 ? String(summary.moments) : "—",
      detail: null,
    },
  ];

  return (
    <section aria-labelledby="fy-today-so-far" className="pb-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <h2
          id="fy-today-so-far"
          className="font-serif text-[1.28rem] leading-[1.25] text-foreground"
        >
          Today so far
        </h2>
        <p className="font-sans text-[12.5px] text-[hsl(var(--stage-firstyear-text))]">
          {scopeLabel}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={`${FY_INNER_RADIUS} flex min-h-[104px] flex-col border px-4 py-3.5`}
            style={{
              borderColor: "hsl(var(--stage-firstyear-accent) / 0.18)",
              backgroundColor: "hsl(var(--card) / 0.86)",
            }}
          >
            <p className={FY_EYEBROW}>{tile.label}</p>
            <p className="font-serif text-[1.55rem] leading-[1.15] tabular-nums text-foreground mt-1.5">
              {tile.value}
            </p>
            {tile.detail && (
              <p className="font-sans text-[12px] leading-[1.5] text-[hsl(var(--stage-firstyear-text))] mt-1 break-words">
                {tile.detail}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TodaySoFar;
