import { ArrowUpRight } from "lucide-react";

const entries = [
  {
    thought: '"I just want to know if this is normal"',
    sub: "Understanding symptoms and experiences",
    color: "bg-[hsl(var(--stage-support)/0.5)]",
    accentColor: "text-[hsl(var(--stage-support-accent))]",
  },
  {
    thought: '"I feel overwhelmed"',
    sub: "When everything feels like too much",
    color: "bg-[hsl(var(--stage-postpartum)/0.4)]",
    accentColor: "text-[hsl(var(--stage-postpartum-accent))]",
  },
  {
    thought: '"I don\'t know what to do next"',
    sub: "Guidance when you feel stuck or unsure",
    color: "bg-[hsl(var(--stage-ttc)/0.4)]",
    accentColor: "text-[hsl(var(--stage-ttc-accent))]",
  },
  {
    thought: '"Something doesn\'t feel right"',
    sub: "When you need help understanding if something needs attention",
    color: "bg-[hsl(var(--stage-ivf)/0.4)]",
    accentColor: "text-[hsl(var(--stage-ivf-accent))]",
  },
];

const SupportStartHere = () => {
  return (
    <section id="start-here" className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="text-center mb-10">
          <div className="flex items-center gap-4 justify-center mb-4">
            <div className="h-px w-12 bg-[hsl(var(--stage-support-accent)/0.3)]" />
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-[hsl(var(--stage-support-accent))]">
              Entry points
            </p>
            <div className="h-px w-12 bg-[hsl(var(--stage-support-accent)/0.3)]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-3">
            Start here
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-md mx-auto">
            Choose the thought that feels closest to what you're experiencing.
          </p>
        </div>

        {/* Featured first card */}
        <a
          href="#ai-support"
          className="group block bg-card border-t-2 border-t-[hsl(var(--stage-support-accent)/0.4)] border border-[hsl(var(--stage-support-accent)/0.15)] rounded-xl p-7 md:p-9 shadow-card-brand mb-4 transition-all hover:shadow-soft"
        >
          <div className="flex items-start gap-5">
            <div className={`w-11 h-11 rounded-full ${entries[0].color} flex items-center justify-center flex-shrink-0`}>
              <span className="font-serif text-sm text-foreground/60">01</span>
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-[hsl(var(--stage-support-accent))] transition-colors leading-snug mb-2">
                {entries[0].thought}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-3">
                {entries[0].sub}
              </p>
              <span className="flex items-center gap-1.5 font-sans text-xs font-light text-[hsl(var(--stage-support-accent))]">
                Ask about this <ArrowUpRight size={12} />
              </span>
            </div>
          </div>
        </a>

        {/* Remaining cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {entries.slice(1).map((e, i) => (
            <a
              key={i}
              href="#ai-support"
              className="group bg-card border border-border/50 rounded-xl p-5 shadow-card-brand flex flex-col gap-3 transition-all hover:border-[hsl(var(--stage-support-accent)/0.4)] hover:shadow-soft"
            >
              <div className={`w-9 h-9 rounded-full ${e.color} flex items-center justify-center`}>
                <span className="font-serif text-xs text-foreground/60">{String(i + 2).padStart(2, "0")}</span>
              </div>
              <h3 className="font-serif text-base text-foreground group-hover:text-[hsl(var(--stage-support-accent))] transition-colors leading-snug">
                {e.thought}
              </h3>
              <p className="font-sans text-xs font-light text-muted-foreground leading-snug">
                {e.sub}
              </p>
              <span className="mt-auto pt-1 flex items-center gap-1 font-sans text-xs font-light text-[hsl(var(--stage-support-accent))] opacity-0 group-hover:opacity-100 transition-opacity">
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
