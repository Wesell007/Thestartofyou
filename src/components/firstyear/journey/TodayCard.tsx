import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import {
  FY_CARD_RADIUS,
  FY_CHIP,
  FY_CTA,
  FY_INNER_RADIUS,
  FY_KICKER,
  FY_SHADOW_STRONG,
} from "./firstYearStyles";

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
const TodayCard = ({ savedToday, babyCount, subject, ageLine }: Props) => {
  const chip = {
    color: "hsl(var(--stage-firstyear-ink))",
    backgroundColor: "hsl(var(--stage-firstyear-cream))",
    border: "1px solid hsl(var(--stage-firstyear-accent) / 0.28)",
  };

  return (
    <section className="pb-7">
      <div
        className={`${FY_CARD_RADIUS} border px-6 sm:px-9 py-8 sm:py-10`}
        style={{
          borderColor: "hsl(var(--stage-firstyear-accent) / 0.45)",
          background:
            "linear-gradient(158deg, hsl(var(--stage-firstyear-soft)) 0%, hsl(var(--stage-firstyear)) 58%, hsl(var(--stage-firstyear-cream)) 100%)",
          boxShadow: FY_SHADOW_STRONG,
        }}
      >
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span
            className={FY_KICKER}
            style={{
              color: "hsl(var(--parchment))",
              backgroundColor: "hsl(var(--stage-firstyear-ink))",
            }}
          >
            Today
          </span>
          <span className={FY_CHIP} style={chip}>
            {format(new Date(), "EEEE d MMMM")}
          </span>
          {ageLine && (
            <span className={FY_CHIP} style={chip}>
              {ageLine}
            </span>
          )}
        </div>

        <h2 className="font-serif text-[1.85rem] sm:text-[2.25rem] leading-[1.1] text-foreground mb-2.5">
          A note for {subject}
        </h2>
        <p className="font-sans text-[14px] leading-[1.7] text-foreground/75 max-w-[50ch]">
          Write as much or as little as you like. There is nothing to keep up with.
        </p>

        <div
          className={`${FY_INNER_RADIUS} mt-5 px-5 py-5`}
          style={{
            backgroundColor: "hsl(var(--stage-firstyear-cream))",
            border: "1px solid hsl(var(--stage-firstyear-accent) / 0.2)",
          }}
        >
          <p className="font-serif text-[16px] leading-[1.72] text-foreground/85 max-w-[48ch]">
            {savedToday > 0
              ? savedToday === 1
                ? "You have saved one note today. You can add to it or leave it as it is."
                : `You have saved ${savedToday} notes today. You can add to them or leave them as they are.`
              : `Something you noticed, how the day is going${
                  babyCount > 1 ? " for them" : ""
                }, a note about your own recovery, or a question to remember for your next appointment.`}
          </p>
        </div>

        <div className="mt-7">
          <Link
            to="/my-first-year/today"
            className={FY_CTA}
            style={{
              backgroundColor: "hsl(var(--stage-firstyear-ink))",
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
};

export default TodayCard;
