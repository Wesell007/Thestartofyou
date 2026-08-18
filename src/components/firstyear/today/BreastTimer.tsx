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
  FY_FOCUS_RING,
  FY_SHADOW_SOFT,
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

const SECONDARY_CLASS = `${FY_FOCUS_RING} inline-flex min-h-11 items-center rounded-pill border border-border/60 bg-parchment px-4 py-2 font-sans text-[13.5px] text-foreground/85 transition-colors hover:border-foreground/25 disabled:opacity-60`;

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

  return (
    <section aria-label="Feed in progress" className="pb-8">
      <div
        className={`${FY_CARD_RADIUS} px-6 py-6`}
        style={{
          background:
            "linear-gradient(150deg, hsl(var(--stage-firstyear-hero)) 0%, hsl(var(--stage-firstyear)) 100%)",
          boxShadow: FY_SHADOW_SOFT,
        }}
      >
        <p className="font-sans text-[11.5px] font-semibold tracking-[0.2em] uppercase text-[hsl(var(--stage-firstyear-text-soft))]">
          {active ? "Feeding now" : "Feed paused"}
        </p>
        <p className="font-serif text-[1.75rem] leading-[1.2] tabular-nums text-foreground mt-2">
          {formatStopwatch(total)}
        </p>
        <p className="font-sans text-[13.5px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))] mt-1">
          {[
            babyLabel,
            active ? `${SIDE_LABELS[active]} side` : "no side running",
            `started ${formatClock(start)}`,
          ].join(" · ")}
        </p>
        {(left > 0 || right > 0) && (
          <p className="font-sans text-[13px] leading-[1.6] text-[hsl(var(--stage-firstyear-text))] mt-1">
            {[left > 0 ? `left ${left}m` : null, right > 0 ? `right ${right}m` : null]
              .filter(Boolean)
              .join(", ")}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2.5 mt-4">
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
            className={`${FY_CTA} disabled:opacity-60`}
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
