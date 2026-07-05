import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Track = "baby" | "recovery";

const questions: { q: string; sub: string; track: Track }[] = [
  { q: "Is my baby's sleep pattern normal at this age?", sub: "Phase-by-phase context", track: "baby" },
  { q: "How long is bleeding supposed to last?", sub: "What's normal, what's not", track: "recovery" },
  { q: "Should I be worried about a milestone?", sub: "Healthy variation explained", track: "baby" },
  { q: "Is what I'm feeling baby blues or something more?", sub: "Mood after birth", track: "recovery" },
  { q: "Why has feeding suddenly changed?", sub: "Common shifts month to month", track: "baby" },
  { q: "When will I feel like myself again?", sub: "The honest answer", track: "recovery" },
];

const trackStyle = (t: Track) =>
  t === "baby"
    ? {
        color: 'hsl(var(--stage-firstyear-deep))',
        accent: 'hsl(var(--stage-firstyear-accent))',
        chipBg: 'hsl(var(--stage-firstyear-soft) / 0.55)',
        rowBg: 'hsl(var(--stage-firstyear-soft) / 0.18)',
        rowHoverBg: 'hsl(var(--stage-firstyear-soft) / 0.42)',
        border: 'hsl(var(--stage-firstyear-accent) / 0.2)',
        label: 'Baby',
      }
    : {
        color: 'hsl(var(--stage-recovery-deep))',
        accent: 'hsl(var(--stage-recovery-accent))',
        chipBg: 'hsl(var(--stage-recovery-soft) / 0.55)',
        rowBg: 'hsl(var(--stage-recovery-soft) / 0.16)',
        rowHoverBg: 'hsl(var(--stage-recovery-soft) / 0.38)',
        border: 'hsl(var(--stage-recovery-accent) / 0.2)',
        label: 'You',
      };

const FYCommonQuestions = () => {
  return (
    <section className="bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.55)' }} />
          <span className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.55)' }} />
          <span className="font-sans text-[11px] font-light tracking-[0.24em] uppercase text-foreground/60 ml-1">
            Common questions
          </span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-9">
          Questions parents actually ask.
        </h2>

        <div className="flex flex-col gap-3">
          {questions.map((item, i) => {
            const s = trackStyle(item.track);
            return (
              <Link
                key={i}
                to={`/ask?q=${encodeURIComponent(item.q)}&ctx=First+year+hub&journey=${item.track === 'baby' ? 'firstyear' : 'recovery'}&stage=${item.track === 'baby' ? 'first-year' : 'recovery'}`}
                className="group relative flex items-stretch gap-3 sm:gap-4 rounded-[18px] border transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_18px_44px_-28px_rgba(20,30,60,0.28)] overflow-hidden"
                style={{
                  borderColor: s.border,
                  backgroundColor: s.rowBg,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = s.rowHoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = s.rowBg;
                }}
              >
                {/* Accent left rule */}
                <span
                  className="w-1 shrink-0"
                  style={{ backgroundColor: s.accent }}
                  aria-hidden
                />
                <div className="flex items-center justify-between gap-4 flex-1 pr-4 sm:pr-5 py-4 sm:py-5">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <span
                      className="font-sans text-[10px] font-light tracking-wider uppercase px-2 py-0.5 rounded-full border shrink-0 mt-1"
                      style={{ color: s.color, backgroundColor: s.chipBg, borderColor: s.border }}
                    >
                      {s.label}
                    </span>
                    <div className="min-w-0">
                      <p className="font-serif text-base sm:text-lg text-foreground leading-snug group-hover:text-foreground/85 transition-colors">
                        {item.q}
                      </p>
                      <p className="font-sans text-xs font-light text-muted-foreground/75 mt-1 leading-relaxed">{item.sub}</p>
                    </div>
                  </div>
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-transform group-hover:translate-x-0.5"
                    style={{
                      borderColor: s.border,
                      backgroundColor: s.chipBg,
                    }}
                  >
                    <ChevronRight size={14} style={{ color: s.color }} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FYCommonQuestions;
