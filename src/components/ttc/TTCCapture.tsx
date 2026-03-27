import { BookOpen, ArrowUpRight } from "lucide-react";

const TTCCapture = () => {
  return (
    <section className="bg-lavender-bg section-spacing">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="font-sans text-[11px] font-light tracking-[0.25em] uppercase text-sage-muted mb-6">
              Your Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-7">
              Capture this stage
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-4">
              This stage can feel full of waiting, hope, and small moments that are easy to overlook.
            </p>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-10">
              Many people choose to write things down as they go — thoughts, feelings, and reflections across each cycle.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2.5 border border-foreground/15 text-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-light hover:bg-parchment-dark transition-all duration-300"
            >
              Explore the journal
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right — journal entries */}
          <div className="flex flex-col gap-4">
            {[
              "Cycle 1 — Trying not to over-think the timing…",
              "Cycle 2 — The waiting is harder than I expected.",
              "Cycle 3 — Letting go of the need to know.",
            ].map((entry, i) => (
              <div
                key={i}
                className="bg-card border border-border/20 rounded-xl px-6 py-5 shadow-card-brand hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-start gap-3.5">
                  <BookOpen size={14} className="text-sage mt-0.5 shrink-0 opacity-70" />
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
