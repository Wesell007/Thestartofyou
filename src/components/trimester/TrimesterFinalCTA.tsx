import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { TrimesterData } from "@/data/trimesterData";

interface Props {
  data: TrimesterData;
}

const TrimesterFinalCTA = ({ data }: Props) => {
  const nextTrimester =
    data.number < 3
      ? {
          label: `${data.number === 1 ? "Second" : "Third"} Trimester`,
          href: data.number === 1 ? "/pregnancy/second-trimester" : "/pregnancy/third-trimester",
        }
      : null;

  return (
    <section className="page-ending frame-corner">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
        <p className="stage-label mb-4">
          Continue
        </p>
        <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.75rem] text-foreground mb-4 leading-tight">
          {nextTrimester ? "Ready for the next stage?" : "You've reached the end of the journey."}
        </h2>
        <p className="font-sans text-[15px] sm:text-base font-light text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
          {nextTrimester
            ? `When you're ready, the ${nextTrimester.label} is waiting, week by week, at your own pace.`
            : "The third trimester ends with birth, and a new journey begins. Explore postnatal support when you're ready."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {nextTrimester ? (
            <Link
              to={nextTrimester.href}
              className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
            >
              {nextTrimester.label}
              <ArrowUpRight size={16} />
            </Link>
          ) : (
            <Link
              to="/explore"
              className="flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
            >
              Continue your journey
              <ArrowUpRight size={16} />
            </Link>
          )}
          <Link
            to="/pregnancy"
            className="flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-8 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
          >
            Back to Pregnancy Hub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrimesterFinalCTA;
