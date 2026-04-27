import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

interface Props {
  weekStart: number;
  weekEnd: number;
  highlightWeek?: number;
}

const FirstTriWeekBridge = ({ weekStart, weekEnd, highlightWeek = 4 }: Props) => {
  const weeks = Array.from(
    { length: weekEnd - weekStart + 1 },
    (_, i) => weekStart + i
  );

  return (
    <section
      id="week-by-week"
      className="bg-parchment section-spacing"
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-sage-bg to-sage-bg/60 border border-sage/15 shadow-card-brand p-6 sm:p-8 md:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-12 items-center">
            {/* Left heading */}
            <div className="lg:col-span-5">
              <p className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase text-sage mb-3">
                Continue · Week by week
              </p>
              <h2 className="font-serif text-[1.65rem] sm:text-[2.1rem] md:text-[2.4rem] text-foreground leading-[1.1] mb-3 sm:mb-4">
                From this stage to the week you&rsquo;re in
              </h2>
              <p className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/75 leading-relaxed">
                Explore week-specific guidance for your first trimester with
                confidence, one quiet step at a time.
              </p>
            </div>

            {/* Centre week chips */}
            <div className="lg:col-span-5">
              <ul className="flex flex-wrap gap-2 sm:gap-2.5">
                {weeks.map((w) => {
                  const highlighted = w === highlightWeek;
                  return (
                    <li key={w}>
                      <Link
                        to={`/pregnancy/week/${w}`}
                        className={
                          highlighted
                            ? "inline-flex items-center justify-center min-w-[54px] sm:min-w-[58px] h-10 sm:h-11 px-3 rounded-full bg-sage text-card font-sans text-[11.5px] sm:text-[12px] font-medium tracking-[0.12em] uppercase shadow-cta hover:bg-sage-muted transition-all"
                            : "inline-flex items-center justify-center min-w-[54px] sm:min-w-[58px] h-10 sm:h-11 px-3 rounded-full bg-card text-foreground/80 border border-sage/20 font-sans text-[11.5px] sm:text-[12px] font-light tracking-[0.12em] uppercase hover:border-sage/50 hover:text-sage hover:bg-card/80 transition-all"
                        }
                      >
                        Wk {w}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right CTA */}
            <div className="lg:col-span-2 lg:flex lg:justify-end">
              <Link
                to="/ask"
                className="inline-flex items-center justify-center gap-2 bg-sage text-card rounded-pill px-6 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-sage-muted transition-all whitespace-nowrap w-full sm:w-auto"
              >
                Ask a question
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstTriWeekBridge;
