import { useEffect, useState } from "react";
import {
  SIDE_LABELS,
  formatClock,
  formatStopwatch,
  liveFeedSeconds,
  secondsToMinutes,
  type CareEvent,
  type FeedSide,
} from "@/lib/firstYearCareEventsSchema";
import {
  FY_CARD_RADIUS,
  FY_CTA,
  FY_EYEBROW,
  FY_FOCUS_RING,
  FY_INNER_RADIUS,
  FY_SHADOW_STRONG,
  FY_STOPWATCH,
} from "@/components/firstyear/journey/firstYearStyles";

type Props = {
  feed: CareEvent;
  babyLabel: string;
  busy: boolean;
  onSwitch: (side: FeedSide) => void;
  onPause: () => void;
  onResume: (side: FeedSide) => void;
  onEnd: () => void;
};

/** Ticks once a second only while a side is running. */
const useSecondTick = (active: boolean) => {
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [active]);
};

const SECONDARY_CLASS = `${FY_FOCUS_RING} inline-flex min-h-11 w-full items-center justify-center rounded-pill border border-border/60 bg-parchment px-5 py-2.5 font-sans text-[14px] font-medium text-foreground transition-colors hover:border-foreground/25 disabled:opacity-60 sm:w-auto`;

/**
 * The live breast feed card. Elapsed time is always counted from the stored
 * start, so a refresh picks up exactly where the feed is.
 */
const BreastTimer = ({ feed, babyLabel, busy, onSwitch, onPause, onResume, onEnd }: Props) => {
  const active = feed.metadata.active_side ?? null;
  useSecondTick(Boolean(active));

  const total = liveFeedSeconds(feed.metadata, new Date());
  const left = secondsToMinutes(feed.metadata.left_duration_seconds);
  const right = secondsToMinutes(feed.metadata.right_duration_seconds);
  const start = feed.started_at ?? feed.occurred_at;
  const sides: { side: FeedSide; minutes: number }[] = [
    { side: "left", minutes: left },
    { side: "right", minutes: right },
  ];

  return (
    <section aria-label="Feed in progress" className="pb-8">
      <div
        className={`${FY_CARD_RADIUS} border px-6 py-7`}
        style={{
          borderColor: "hsl(var(--stage-firstyear-peach-soft) / 0.9)",
          backgroundColor: "hsl(var(--card))",
          boxShadow: FY_SHADOW_STRONG,
        }}
      >
        <p className={FY_EYEBROW}>{active ? "Feeding now" : "Feed paused"}</p>
        <p className={`${FY_STOPWATCH} mt-2.5`}>{formatStopwatch(total)}</p>
        <p className="font-sans text-[13.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))] mt-2">
          {[
            babyLabel,
            active ? `${SIDE_LABELS[active]} side` : "no side running",
            `started ${formatClock(start)}`,
          ].join(" · ")}
        </p>

        <div className="grid grid-cols-2 gap-3 mt-5">
          {sides.map(({ side, minutes }) => {
            const isActive = active === side;
            return (
              <div
                key={side}
                className={`${FY_INNER_RADIUS} border px-4 py-3`}
                style={{
                  borderColor: isActive
                    ? "hsl(var(--stage-firstyear-accent) / 0.4)"
                    : "hsl(var(--stage-firstyear-accent) / 0.16)",
                  backgroundColor: isActive
                    ? "hsl(var(--stage-firstyear-soft) / 0.7)"
                    : "hsl(var(--parchment))",
                }}
              >
                <p className="font-sans text-[11.5px] font-semibold uppercase tracking-[0.16em] text-[hsl(var(--stage-firstyear-text-soft))]">
                  {SIDE_LABELS[side]}
                  {isActive ? " (active)" : ""}
                </p>
                <p className="font-sans text-[1.15rem] font-semibold tabular-nums text-foreground mt-1">
                  {minutes}m
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2.5 mt-5 sm:flex-row sm:flex-wrap sm:items-center">
          {active ? (
            <>
              <button
                type="button"
                disabled={busy}
                onClick={() => onSwitch(active === "left" ? "right" : "left")}
                className={SECONDARY_CLASS}
              >
                Switch to {active === "left" ? "right" : "left"}
              </button>
              <button type="button" disabled={busy} onClick={onPause} className={SECONDARY_CLASS}>
                Pause
              </button>
            </>
          ) : (
            (["left", "right"] as FeedSide[]).map((side) => (
              <button
                key={side}
                type="button"
                disabled={busy}
                onClick={() => onResume(side)}
                className={SECONDARY_CLASS}
              >
                Resume {side}
              </button>
            ))
          )}
          <button
            type="button"
            disabled={busy}
            onClick={onEnd}
            className={`${FY_CTA} w-full disabled:opacity-60 sm:w-auto`}
            style={{
              backgroundColor: "hsl(var(--stage-firstyear-accent))",
              color: "hsl(var(--background))",
            }}
          >
            {busy ? "Saving…" : "End feed"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BreastTimer;
