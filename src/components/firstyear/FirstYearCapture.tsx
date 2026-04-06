import { BookOpen, ArrowUpRight } from "lucide-react";

const entries = [
  { month: "Month 2", text: "I didn't expect to feel this mix of exhaustion and wonder every single day." },
  { month: "Month 5", text: "We finally found something that works. For now." },
  { month: "Month 9", text: "Everything is changing again. But so am I." },
];

const FirstYearCapture = () => {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.12)' }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              Your Story
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight mb-5">
              Capture this stage
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              This year can pass quickly, even when the days feel long.
            </p>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-6">
              Many parents look back and realise how much changed, and how hard it is to remember the details clearly.
            </p>

            <div
              className="pl-5 border-l-2 mb-8"
              style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.3)' }}
            >
              <p className="font-serif italic text-base text-foreground/60 leading-relaxed">
                "The days are long, but the months are short."
              </p>
            </div>

            <a
              href="/"
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
                style={{ backgroundColor: `hsl(var(--stage-firstyear) / ${0.15 - i * 0.03})` }}
              >
                <div className="flex items-start gap-3">
                  <BookOpen size={14} className="shrink-0 mt-0.5" style={{ color: 'hsl(var(--stage-firstyear-accent) / 0.5)' }} />
                  <div>
                    <p
                      className="font-sans text-[10px] font-light tracking-[0.15em] uppercase mb-1.5"
                      style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
                    >
                      {entry.month}
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

export default FirstYearCapture;
