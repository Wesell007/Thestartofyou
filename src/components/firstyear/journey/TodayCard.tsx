import { Link } from "react-router-dom";

type Props = {
  /** Number of notes already saved today. Shown as reassurance, never a score. */
  savedToday: number;
  babyCount: number;
};

/**
 * Compact entry point to the daily check-in. No streaks, no targets, no
 * "you missed a day". A parent can ignore this card entirely.
 */
const TodayCard = ({ savedToday, babyCount }: Props) => (
  <section className="pb-10">
    <div
      className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8"
      style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.2)" }}
    >
      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-4"
        style={{ color: "hsl(var(--stage-firstyear-accent))" }}
      >
        Today
      </p>
      <h2 className="font-serif text-[1.5rem] sm:text-[1.75rem] leading-[1.2] text-foreground/90 mb-2">
        A quiet note for today
      </h2>
      <p className="font-serif text-[15.5px] leading-[1.7] text-foreground/80 max-w-[50ch]">
        {savedToday > 0
          ? savedToday === 1
            ? "You have saved one note today. You can add to it or leave it as it is."
            : `You have saved ${savedToday} notes today. You can add to them or leave them as they are.`
          : babyCount > 1
            ? "Whenever you have a moment, jot down how the day is going for your babies and for you."
            : "Whenever you have a moment, jot down how the day is going for your baby and for you."}
      </p>
      <p className="mt-3 font-sans text-[13px] leading-[1.6] text-foreground/60 max-w-[50ch]">
        Nothing here is tracked, scored or compared. Skipping days is completely fine.
      </p>
      <div className="mt-6">
        <Link
          to="/my-first-year/today"
          className="inline-flex items-center rounded-pill border border-border/60 bg-parchment px-5 py-2.5 font-sans text-sm text-foreground/85 transition-colors hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        >
          {savedToday > 0 ? "Open today's notes" : "Add a note for today"}
        </Link>
      </div>
    </div>
  </section>
);

export default TodayCard;
