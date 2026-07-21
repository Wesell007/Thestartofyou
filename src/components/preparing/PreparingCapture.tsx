import { BookOpen, ArrowUpRight } from "lucide-react";

const entries = [
  "I keep adding things to the list — I think I need to stop and ask what actually matters.",
  "We don't have much space. I want to keep things simple but I'm worried it's not enough.",
  "I just want to feel ready. But I'm not sure what 'ready' even looks like.",
];

const PreparingCapture = () => {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "hsl(var(--stage-preparing) / 0.35)" }}>
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 items-center">
          <div>
            <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-5"
              style={{ color: "hsl(var(--stage-preparing-accent))" }}>
              Your Story
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              Capture this stage
            </h2>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-4">
              Preparing often brings a lot of thoughts — what you need, what you might be missing, and how this will all feel.
            </p>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed mb-8">
              Writing things down during this stage can help — not just plans, but what's on your mind as you get ready.
            </p>
            <a
              href="/product"
              className="inline-flex items-center gap-2 border border-foreground/20 text-foreground rounded-pill px-7 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
            >
              Explore the journal
              <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {entries.map((entry, i) => (
              <div key={i} className="bg-card border border-border/40 rounded-xl px-6 py-5 shadow-card-brand"
                style={i === 0 ? { borderLeftWidth: "3px", borderLeftColor: "hsl(var(--stage-preparing-accent))" } : undefined}>
                <div className="flex items-start gap-3">
                  <BookOpen size={14} className="mt-0.5 shrink-0" style={{ color: "hsl(var(--stage-preparing-accent))" }} />
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

export default PreparingCapture;
