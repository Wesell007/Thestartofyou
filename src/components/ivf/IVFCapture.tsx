import { BookOpen, ArrowUpRight } from "lucide-react";

const IVFCapture = () => {
  return (
    <section
      className="pt-14 md:pt-20 pb-10 md:pb-12"
      style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.1)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                Your Story
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              Capture this stage
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-4">
              IVF can feel full of waiting, uncertainty, and moments that are easy to overlook or move past quickly.
            </p>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-7">
              Some people choose to write things down as they go. Thoughts, feelings, and reflections across each stage.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
            >
              Explore the journal
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right — journal entries */}
          <div className="flex flex-col gap-4">
            {[
              { day: "After transfer", entry: "Trying to stay calm and not over-read every small thing." },
              { day: "Day 5", entry: "The waiting feels different than I expected. Longer, quieter." },
              { day: "First scan", entry: "Something shifted when I saw it. A small, cautious exhale." },
            ].map((item, i) => (
              <div
                key={i}
                className={`rounded-xl px-6 py-5 border shadow-card-brand ${i === 0 ? '' : 'bg-card border-border/40'}`}
                style={i === 0 ? {
                  backgroundColor: 'hsl(var(--stage-ivf) / 0.15)',
                  borderColor: 'hsl(var(--stage-ivf-accent) / 0.15)',
                } : undefined}
              >
                <p className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-muted-foreground/50 mb-2">{item.day}</p>
                <div className="flex items-start gap-3">
                  <BookOpen size={14} className="mt-0.5 shrink-0" style={{ color: 'hsl(var(--stage-ivf-accent) / 0.5)' }} />
                  <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                    {item.entry}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IVFCapture;
