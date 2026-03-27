import { BookOpen, ArrowUpRight } from "lucide-react";

const PostpartumCapture = () => {
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
              This stage can feel like a blur — long days that are hard to remember clearly later on.
            </p>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
              Many parents choose to write things down as they go — small moments, thoughts, and how this time really felt.
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
              "Day 3 — I didn't expect to feel this tired and this in love at the same time.",
              "Week 2 — Still no real routine, but we're figuring it out.",
              "Week 6 — Something shifted today. It feels slightly more familiar.",
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

export default PostpartumCapture;
