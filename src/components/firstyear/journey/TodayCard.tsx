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
      className="rounded-[26px] border px-6 sm:px-9 py-8 sm:py-10"
      style={{
        borderColor: "hsl(var(--stage-firstyear-accent) / 0.4)",
        background:
          "linear-gradient(155deg, hsl(var(--stage-firstyear-soft)) 0%, hsl(var(--stage-firstyear) / 0.95) 45%, hsl(var(--stage-firstyear-cream)) 100%)",
        boxShadow: "0 30px 64px -34px hsl(var(--stage-firstyear-deep) / 0.6)",
      }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <span
          className={`${FY_KICKER}`}
          style={{
            color: "hsl(var(--parchment))",
            backgroundColor: "hsl(var(--stage-firstyear-deep))",
          }}
        >
          Today
        </span>
        <span
          className="inline-flex items-center rounded-full px-2.5 py-1 font-sans text-[11.5px] font-medium leading-snug"
          style={{
            color: "hsl(var(--stage-firstyear-deep))",
            backgroundColor: "hsl(var(--stage-firstyear-cream))",
            border: "1px solid hsl(var(--stage-firstyear-accent) / 0.3)",
          }}
        >
          {format(new Date(), "EEEE d MMMM")}
        </span>
        {ageLine && (
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 font-sans text-[11.5px] font-medium leading-snug"
            style={{
              color: "hsl(var(--stage-firstyear-deep))",
              backgroundColor: "hsl(var(--stage-firstyear-cream))",
              border: "1px solid hsl(var(--stage-firstyear-accent) / 0.3)",
            }}
          >
            {ageLine}
          </span>
        )}
      </div>
      <h2 className="font-serif text-[1.75rem] sm:text-[2.1rem] leading-[1.14] text-foreground mb-2.5">
        A note for {subject}
      </h2>
      <p className="font-serif text-[16px] leading-[1.7] text-foreground/85 max-w-[50ch]">
        {savedToday > 0
          ? savedToday === 1
            ? "You have saved one note today. You can add to it or leave it as it is."
            : `You have saved ${savedToday} notes today. You can add to them or leave them as they are.`
          : `Something you noticed, how the day is going${
              babyCount > 1 ? " for them" : ""
            }, a note about your own recovery, or a question to remember for your next appointment.`}
      </p>
      <p className="mt-3 font-sans text-[13.5px] leading-[1.65] text-foreground/70 max-w-[50ch]">
        Write as much or as little as you like. There is nothing to keep up with.
      </p>
      <div className="mt-7">
        <Link
          to="/my-first-year/today"
          className={FY_CTA}
          style={{
            backgroundColor: "hsl(var(--stage-firstyear-deep))",
            color: "hsl(var(--parchment))",
          }}
        >
          {savedToday > 0 ? "Open today's notes" : "Add a note for today"}
          <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);


export default TodayCard;
