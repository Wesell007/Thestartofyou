import { BookOpen, ArrowUpRight } from "lucide-react";

const TTCCapture = () => {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.08)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left */}
          <div>
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              Your Story
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              Capture this stage
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-4">
              This stage can feel full of waiting, hope, and small moments that are easy to overlook.
            </p>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-8">
              Many people choose to write things down as they go, thoughts, feelings, and reflections across each cycle.
            </p>

            {/* Pull quote */}
            <div
              className="pl-5 border-l-2 mb-8"
              style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.2)' }}
            >
              <p className="font-serif italic text-sm text-foreground/55 leading-relaxed">
                "Sometimes writing it down is the only way to make sense of the waiting."
              </p>
            </div>

            <a
              href="/product"
              className="inline-flex items-center gap-2.5 border text-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all duration-300"
              style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.25)' }}
            >
              Explore the journal
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right, journal entries */}
          <div className="flex flex-col gap-3">
            {[
              "Cycle 1. Trying not to over-think the timing…",
              "Cycle 2. The waiting is harder than I expected.",
              "Cycle 3. Letting go of the need to know.",
            ].map((entry, i) => (
              <div
                key={i}
                className="bg-card border rounded-xl px-6 py-5 shadow-card-brand hover:shadow-soft transition-all duration-300"
                style={{ borderColor: 'hsl(var(--stage-ttc) / 0.3)' }}
              >
                <div className="flex items-start gap-3.5">
                  <BookOpen size={14} className="mt-0.5 shrink-0 opacity-70" style={{ color: 'hsl(var(--stage-ttc-accent))' }} />
                  <p className="font-serif italic text-base text-foreground/65 leading-relaxed">
                    {entry}
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

export default TTCCapture;
