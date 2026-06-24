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
        bg: 'hsl(var(--stage-firstyear-soft) / 0.5)',
        rowBg: 'hsl(var(--stage-firstyear-soft) / 0.18)',
        border: 'hsl(var(--stage-firstyear-accent) / 0.25)',
        label: 'Baby',
      }
    : {
        color: 'hsl(var(--stage-recovery-deep))',
        bg: 'hsl(var(--stage-recovery-soft) / 0.5)',
        rowBg: 'hsl(var(--stage-recovery-soft) / 0.16)',
        border: 'hsl(var(--stage-recovery-accent) / 0.25)',
        label: 'Recovery',
      };

const FYCommonQuestions = () => {
  return (
    <section className="bg-parchment py-14 md:py-16">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.6)' }} />
          <span className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.6)' }} />
          <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase ml-2 text-foreground/60">
            Common questions · both tracks
          </p>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-8">
          The ones parents ask most.
        </h2>

        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'hsl(var(--border) / 0.6)' }}>
          {questions.map((item, i) => {
            const s = trackStyle(item.track);
            return (
              <Link
                key={i}
                to={`/ask?q=${encodeURIComponent(item.q)}&ctx=First+year+hub&journey=${item.track === 'baby' ? 'firstyear' : 'recovery'}`}
                className="group flex items-center justify-between gap-4 px-4 sm:px-5 py-4 sm:py-5 border-b last:border-b-0 transition-all hover:brightness-[0.98]"
                style={{
                  borderColor: 'hsl(var(--border) / 0.5)',
                  backgroundColor: s.rowBg,
                }}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <span
                    className="font-sans text-[10px] font-light tracking-wider uppercase px-2 py-0.5 rounded-full border shrink-0 mt-1"
                    style={{ color: s.color, backgroundColor: s.bg, borderColor: s.border }}
                  >
                    {s.label}
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif text-base sm:text-lg text-foreground leading-snug group-hover:text-foreground/70 transition-colors">
                      {item.q}
                    </p>
                    <p className="font-sans text-xs font-light text-muted-foreground/70 mt-0.5">{item.sub}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground/50 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FYCommonQuestions;
