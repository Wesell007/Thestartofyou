import { Link } from "react-router-dom";
import { FY_FOCUS_RING } from "./firstYearStyles";

type Props = {
  /** Number of notes already saved today. Shown as reassurance, never a count to beat. */
  savedToday: number;
  babyCount: number;
  /** Natural-language subject, for example "Ada" or "Ada and Bo". */
  subject: string;
};

/**
 * The primary action on the First Year home: a quiet entry point to today's
 * note. No streaks, no targets, no "you missed a day". A parent can ignore
 * this card entirely.
 */
const TodayCard = ({ savedToday, babyCount, subject }: Props) => (
  <section className="pb-10">
    <div
      className="rounded-[22px] keepsake-surface px-6 sm:px-8 py-7 sm:py-8"
      style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.3)" }}
    >
      <p
        className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase mb-4"
        style={{ color: "hsl(var(--stage-firstyear-accent))" }}
      >
        Today
      </p>
      <h2 className="font-serif text-[1.5rem] sm:text-[1.75rem] leading-[1.2] text-foreground/90 mb-2">
        A note for {subject}
      </h2>
      <p className="font-serif text-[15.5px] leading-[1.7] text-foreground/80 max-w-[50ch]">
        {savedToday > 0
          ? savedToday === 1
            ? "You have saved one note today. You can add to it or leave it as it is."
            : `You have saved ${savedToday} notes today. You can add to them or leave them as they are.`
          : `Something you noticed, how the day is going${
              babyCount > 1 ? " for them" : ""
            }, a note about your own recovery, or a question to remember for your next appointment.`}
      </p>
      <p className="mt-3 font-sans text-[13px] leading-[1.6] text-foreground/60 max-w-[50ch]">
        Write as much or as little as you like. There is nothing to keep up with.
      </p>
      <div className="mt-6">
        <Link
          to="/my-first-year/today"
          className={`inline-flex min-h-11 items-center justify-center rounded-pill px-6 py-2.5 font-sans text-sm font-medium shadow-cta transition-colors ${FY_FOCUS_RING}`}
          style={{
            backgroundColor: "hsl(var(--stage-firstyear-deep))",
            color: "hsl(var(--parchment))",
          }}
        >
          {savedToday > 0 ? "Open today's notes" : "Add a note for today"}
        </Link>
      </div>
    </div>
  </section>
);

export default TodayCard;
