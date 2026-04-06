import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const questions = [
  { q: "When will my baby sleep through the night?", sub: "Sleep patterns and development" },
  { q: "Is my baby developing normally?", sub: "Growth and milestones" },
  { q: "Why do routines keep changing?", sub: "Understanding shifting patterns" },
  { q: "When will things feel more settled?", sub: "The gradual shift into rhythm" },
];

const FirstYearCommonQuestions = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14">
          {/* Left header */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              Guidance
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Common questions
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Questions many people ask during the first year, answered with care.
            </p>
          </div>

          {/* Right questions */}
          <div className="md:col-span-3">
            {questions.map((item, i) => (
              <Link
                key={i}
                to={`/ask?q=${encodeURIComponent(item.q)}`}
                className="group flex items-center justify-between py-4 sm:py-5 border-b transition-all hover:pl-1"
                style={{ borderColor: 'hsl(var(--stage-firstyear) / 0.4)' }}
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="font-serif text-base sm:text-lg text-foreground leading-snug group-hover:text-foreground/70 transition-colors">
                    {item.q}
                  </p>
                  <p className="font-sans text-xs font-light text-muted-foreground/70">
                    {item.sub}
                  </p>
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.3)' }}
                >
                  <ChevronRight
                    size={14}
                    style={{ color: 'hsl(var(--stage-firstyear-accent) / 0.6)' }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearCommonQuestions;
