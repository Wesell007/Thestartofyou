import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const questions = [
  { q: "What happens after embryo transfer?", sub: "The next steps explained" },
  { q: "When should I take a pregnancy test?", sub: "Timing and accuracy" },
  { q: "When is the first scan after IVF?", sub: "Early pregnancy monitoring" },
  { q: "Should I be feeling symptoms by now?", sub: "Understanding what to expect" },
  { q: "What does the two-week wait involve?", sub: "Navigating the hardest wait" },
];

const IVFCommonQuestions = () => {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.08)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14">
          {/* Left header */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                Guidance
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
              Common questions during IVF
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              Questions many people ask during IVF, answered clearly and with care.
            </p>

            {/* Pull-quote */}
            <div
              className="pl-5 border-l-2"
              style={{ borderColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-sm text-foreground/55 leading-relaxed">
                "There are no silly questions during IVF. Every question deserves a thoughtful answer."
              </p>
            </div>
          </div>

          {/* Right questions */}
          <div className="md:col-span-3">
            {questions.map((item, i) => (
              <Link
                key={i}
                to={`/ask?q=${encodeURIComponent(item.q)}`}
                className="group flex items-center justify-between py-5 border-b transition-all hover:pl-1"
                style={{ borderColor: 'hsl(var(--stage-ivf) / 0.3)' }}
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
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.25)' }}
                >
                  <ChevronRight size={14} style={{ color: 'hsl(var(--stage-ivf-accent) / 0.6)' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFCommonQuestions;
