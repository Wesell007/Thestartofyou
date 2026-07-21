import { BookOpen, ArrowUpRight } from "lucide-react";

const entries = [
  { day: "Day 3", text: "I didn't expect to feel this tired and this in love at the same time." },
  { day: "Week 2", text: "Still no real routine, but we're figuring it out." },
  { day: "Week 6", text: "Something shifted today. It feels slightly more familiar." },
];

const PostpartumCapture = () => {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: 'hsl(var(--stage-postpartum) / 0.12)' }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
            >
              Your Story
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              Capture this stage
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              This stage can feel like a blur. Long days that are hard to remember clearly later on.
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              Many parents choose to write things down as they go. Small moments, thoughts, and how this time really felt.
            </p>

            <div
              className="pl-5 border-l-2 mb-8"
              style={{ borderColor: 'hsl(var(--stage-postpartum-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/60 leading-relaxed">
                "I wish I'd written more down. The early weeks disappeared."
              </p>
            </div>

            <a
              href="/product"
              className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
            >
              Explore the journal
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="md:col-span-3 flex flex-col gap-3">
            {entries.map((entry, i) => (
              <div
                key={i}
                className="rounded-xl px-6 py-5 border border-border/20 shadow-card-brand"
                style={{ backgroundColor: `hsl(var(--stage-postpartum) / ${0.15 - i * 0.03})` }}
              >
                <div className="flex items-start gap-3">
                  <BookOpen size={14} className="shrink-0 mt-0.5" style={{ color: 'hsl(var(--stage-postpartum-accent) / 0.5)' }} />
                  <div>
                    <p
                      className="font-sans text-[10px] font-light tracking-[0.15em] uppercase mb-1.5"
                      style={{ color: 'hsl(var(--stage-postpartum-accent))' }}
                    >
                      {entry.day}
                    </p>
                    <p className="font-serif italic text-base text-foreground/70 leading-relaxed">{entry.text}</p>
                  </div>
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
