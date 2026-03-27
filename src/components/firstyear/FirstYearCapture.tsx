import { BookOpen, ArrowUpRight } from "lucide-react";

const FirstYearCapture = () => {
  return (
    <section className="bg-lavender-section py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Your Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              Capture this stage
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-4">
              This year can pass quickly, even when the days feel long.
            </p>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
              Many parents look back and realise how much changed — and how hard it is to remember the details clearly. Writing things down as you go can help capture what this time really felt like.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
            >
              Explore the journal
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {[
              "Month 2 — I didn't expect to feel this mix of exhaustion and wonder every single day.",
              "Month 5 — We finally found something that works. For now.",
              "Month 9 — Everything is changing again. But so am I.",
            ].map((entry, i) => (
              <div key={i} className="bg-card border border-border/40 rounded-md px-6 py-4 shadow-card-brand">
                <div className="flex items-start gap-3">
                  <BookOpen size={14} className="text-sage mt-0.5 shrink-0" />
                  <p className="font-serif italic text-base text-foreground/70 leading-relaxed">{entry}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FirstYearCapture;
