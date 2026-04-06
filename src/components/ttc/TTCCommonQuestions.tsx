import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";

const questions = [
  { q: "When am I most fertile?", sub: "Understanding your fertile window" },
  { q: "How do I know if I'm ovulating?", sub: "Signs and tracking methods explained" },
  { q: "How long does it usually take?", sub: "Timelines, averages, and real expectations" },
  { q: "When should I take a test?", sub: "Testing timing and accuracy" },
  { q: "Does stress affect fertility?", sub: "What the evidence actually says" },
];

const TTCCommonQuestions = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
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
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-5">
              The questions almost everyone asks during TTC. Answered with evidence and care.
            </p>

            {/* Editorial quote */}
            <div
              className="pl-5 border-l-2 mb-6"
              style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.25)' }}
            >
              <p className="font-serif italic text-[15px] text-foreground/55 leading-relaxed">
                "The questions that keep you up at 2am deserve better answers than a generic search result."
              </p>
            </div>

            {/* Ask anything prompt */}
            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.2)' }}
            >
              <Search size={14} style={{ color: 'hsl(var(--stage-ttc-accent) / 0.6)' }} />
              <p className="font-sans text-xs font-light text-muted-foreground">
                Can't find your question? Ask our AI guide anything about TTC.
              </p>
            </div>
          </div>

          {/* Right questions */}
          <div className="md:col-span-3">
            {questions.map((item, i) => (
              <Link
                key={i}
                to={`/ask?q=${encodeURIComponent(item.q)}`}
                className="group flex items-center justify-between py-4 sm:py-5 border-b transition-all hover:pl-1.5"
                style={{ borderColor: 'hsl(var(--stage-ttc) / 0.35)' }}
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="font-serif text-base sm:text-lg text-foreground leading-snug group-hover:text-foreground/70 transition-colors">
                    {item.q}
                  </p>
                  <p className="font-sans text-xs font-light text-muted-foreground/60">
                    {item.sub}
                  </p>
                </div>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 ml-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.25)' }}
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
