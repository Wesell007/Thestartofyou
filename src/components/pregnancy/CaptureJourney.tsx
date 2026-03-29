import { BookOpen, ArrowUpRight } from "lucide-react";

const CaptureJourney = () => {
  return (
    <section className="bg-lavender-section py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Your Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              Capture this journey
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-4">
              Pregnancy is full of moments that can feel intense, surprising, or easy to forget later on.
            </p>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
              Many parents choose to write things down as they go, thoughts, feelings, and small moments that matter.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
            >
              Explore the journal
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* Right, soft visual */}
          <div className="flex flex-col gap-4">
            {[
              "Week 8, I noticed something shift today…",
              "Week 12, We heard the heartbeat for the first time.",
              "Week 20, Things feel more real now.",
            ].map((entry, i) => (
              <div
                key={i}
                className="bg-card border border-border/40 rounded-md px-6 py-4 shadow-card-brand"
              >
                <div className="flex items-start gap-3">
                  <BookOpen size={14} className="text-sage mt-0.5 shrink-0" />
                  <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
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

export default CaptureJourney;
