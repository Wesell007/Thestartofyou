import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FY_FOCUS_RING } from "./firstYearStyles";

type Props = {
  /** Number of notes already saved today. Shown as reassurance, never a count to beat. */
  savedToday: number;
  babyCount: number;
  /** Natural-language subject, for example "Ada" or "Ada and Bo". */
  subject: string;
  /** Short age or stage line, for example "4 months old". */
  ageLine?: string | null;
};

/**
 * The primary action on the First Year home: a quiet entry point to today's
 * note. No streaks, no targets, no "you missed a day". A parent can ignore
 * this card entirely.
 */
const TodayCard = ({ savedToday, babyCount, subject, ageLine }: Props) => (
  <section className="pb-6">
    <div
      className="rounded-[24px] border px-6 sm:px-8 py-7 sm:py-9"
      style={{
        borderColor: "hsl(var(--stage-firstyear-accent) / 0.28)",
        background: "var(--gradient-firstyear-today)",
        boxShadow: "0 24px 56px -34px hsl(var(--stage-firstyear-deep) / 0.55)",
      }}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-4">
        <p
          className="font-sans text-[10.5px] font-medium tracking-[0.3em] uppercase"
          style={{ color: "hsl(var(--stage-firstyear-deep))" }}
        >
          Today
        </p>
        <span className="font-sans text-[12.5px] text-foreground/60">
          {format(new Date(), "EEEE d MMMM")}
        </span>
        {ageLine && (
          <span
            className="inline-flex items-center rounded-full px-2.5 py-0.5 font-sans text-[11px] leading-snug"
            style={{
              color: "hsl(var(--stage-firstyear-deep))",
              backgroundColor: "hsl(var(--stage-firstyear) / 0.9)",
              border: "1px solid hsl(var(--stage-firstyear-accent) / 0.25)",
            }}
          >
            {ageLine}
          </span>
        )}
      </div>
      <h2 className="font-serif text-[1.6rem] sm:text-[1.9rem] leading-[1.18] text-foreground/90 mb-2">
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
          className={`inline-flex min-h-11 items-center justify-center rounded-pill px-7 py-2.5 font-sans text-sm font-medium shadow-cta transition-colors ${FY_FOCUS_RING}`}
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
