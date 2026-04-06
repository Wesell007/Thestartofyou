import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const questions = [
  { q: "When am I most fertile?", sub: "Understanding your fertile window" },
  { q: "How do I know if I'm ovulating?", sub: "Signs and tracking methods explained" },
  { q: "How long does it usually take to get pregnant?", sub: "Timelines and what to expect" },
  { q: "When should I take a test?", sub: "Testing timing and accuracy" },
];

const TTCCommonQuestions = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14">
          {/* Left header */}
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              Guidance
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Common questions
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Questions many people ask when trying to conceive, answered with care.
            </p>
          </div>

          {/* Right questions */}
          <div className="md:col-span-3">
            {questions.map((item, i) => (
              <Link
                key={i}
                to={`/ask?q=${encodeURIComponent(item.q)}`}
                className="group flex items-center justify-between py-4 sm:py-5 border-b transition-all hover:pl-1"
                style={{ borderColor: 'hsl(var(--stage-ttc) / 0.4)' }}
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
                  style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.3)' }}
                >
                  <ChevronRight
                    size={14}
                    style={{ color: 'hsl(var(--stage-ttc-accent) / 0.6)' }}
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

export default TTCCommonQuestions;
