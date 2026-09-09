import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * The explanatory decision helper.
 *
 * It recommends, it never decides: an answer only reveals a suggestion, and
 * all three journeys stay openly available underneath. It performs zero data
 * writes, zero lifecycle writes, zero private reads and no medical
 * determination of any kind.
 */

const questions = [
  {
    id: "pregnant",
    question: "Are you pregnant now?",
    suggestion: "Pregnancy is likely to be the best fit.",
    journey: "Pregnancy",
    href: "/setup/pregnancy",
    cta: "Start my Pregnancy journey",
  },
  {
    id: "baby",
    question: "Is your baby here and still in their first year?",
    suggestion: "First Year may be the best fit.",
    journey: "First Year",
    href: "/setup/first-year",
    cta: "Start my First Year journey",
  },
  {
    id: "ttc",
    question: "Are you trying to conceive or having fertility treatment before pregnancy?",
    suggestion: "Trying to Conceive may be the best fit.",
    journey: "Trying to Conceive",
    href: "/setup/trying-to-conceive",
    cta: "Start my TTC journey",
  },
] as const;

const StartJourneyDecisionGuide = () => {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="bg-lavender-bg py-20 md:py-28" aria-labelledby="decision-guide-heading">
      <div className="container mx-auto max-w-3xl px-5 sm:px-6 md:px-10">
        <div className="mb-10 text-center">
          <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Not sure where to start?
          </p>
          <h2
            id="decision-guide-heading"
            className="mt-4 font-serif text-[2rem] leading-[1.14] text-foreground sm:text-[2.4rem]"
          >
            Choose what feels closest to today
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-sans text-[14px] font-light leading-[1.8] text-muted-foreground">
            A few gentle questions to help you recognise the journey that fits. Nothing is saved,
            and nothing is decided for you.
          </p>
        </div>

        <div className="space-y-3">
          {questions.map(({ id, question, suggestion, journey, href, cta }) => {
            const expanded = open === id;
            return (
              <div key={id} className="rounded-[3px] border border-border/70 bg-card">
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`decision-panel-${id}`}
                    onClick={() => setOpen(expanded ? null : id)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-serif text-[1.05rem] leading-snug text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2 sm:text-[1.15rem]"
                  >
                    {question}
                    <span aria-hidden="true" className="font-sans text-[13px] text-muted-foreground">
                      {expanded ? "Hide" : "Yes"}
                    </span>
                  </button>
                </h3>
                {expanded && (
                  <div id={`decision-panel-${id}`} className="border-t border-border/60 px-5 py-5">
                    <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.2em] text-sage">
                      {journey}
                    </p>
                    <p className="mt-2 font-sans text-[14px] font-light leading-relaxed text-muted-foreground">
                      {suggestion} If more than one feels true, choose the journey you want The
                      Start of You to focus on right now.
                    </p>
                    <Link
                      to={href}
                      className="mt-4 inline-flex min-h-11 items-center rounded-pill bg-terracotta px-6 py-2.5 font-sans text-[13px] font-medium text-terracotta-foreground shadow-cta transition-colors hover:bg-terracotta-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 focus-visible:ring-offset-2"
                    >
                      {cta}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center font-sans text-[13.5px] font-light leading-relaxed text-muted-foreground">
          If none of these feel right, you can still explore guidance without starting a saved
          journey.{" "}
          <Link
            to="/pregnancy"
            className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
          >
            Browse the guidance
          </Link>
        </p>
      </div>
    </section>
  );
};

export default StartJourneyDecisionGuide;
