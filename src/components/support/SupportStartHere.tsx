import { ArrowUpRight } from "lucide-react";

const entries = [
  {
    thought: '"I just want to know if this is normal"',
    sub: "Understanding symptoms and experiences",
    color: "bg-[hsl(var(--stage-support)/0.4)]",
  },
  {
    thought: '"I feel overwhelmed"',
    sub: "When everything feels like too much",
    color: "bg-[hsl(var(--stage-postpartum)/0.4)]",
  },
  {
    thought: '"I don\'t know what to do next"',
    sub: "Guidance when you feel stuck or unsure",
    color: "bg-[hsl(var(--stage-ttc)/0.4)]",
  },
  {
    thought: '"Something doesn\'t feel right"',
    sub: "When you need help understanding if something needs attention",
    color: "bg-[hsl(var(--stage-ivf)/0.4)]",
  },
];

const SupportStartHere = () => {
  return (
    <section id="start-here" className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <div className="flex items-center gap-4 mb-4">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted">
            Entry points
          </p>
          <div className="h-px flex-1 bg-border/60" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-4 max-w-lg">
          Start here
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground mb-10 max-w-md">
          Choose the thought that feels closest to what you're experiencing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entries.map((e, i) => (
            <a
              key={i}
              href="#ai-support"
              className="group bg-card border border-border/50 rounded-xl p-6 shadow-card-brand flex flex-col gap-3 transition-all hover:border-[hsl(var(--stage-support-accent)/0.4)] hover:shadow-soft"
            >
              <div className={`w-8 h-8 rounded-full ${e.color} flex items-center justify-center`}>
                <span className="font-serif text-xs text-foreground/60">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-serif text-lg text-foreground group-hover:text-[hsl(var(--stage-support-accent))] transition-colors leading-snug">
                {e.thought}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-snug">
                {e.sub}
              </p>
              <span className="mt-auto pt-2 flex items-center gap-1 font-sans text-xs font-light text-[hsl(var(--stage-support-accent))] opacity-0 group-hover:opacity-100 transition-opacity">
                Ask about this <ArrowUpRight size={12} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportStartHere;
