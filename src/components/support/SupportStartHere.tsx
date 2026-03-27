import { ArrowUpRight } from "lucide-react";

const entries = [
  {
    thought: '"I just want to know if this is normal"',
    sub: "Understanding symptoms and experiences",
  },
  {
    thought: '"I feel overwhelmed"',
    sub: "When everything feels like too much",
  },
  {
    thought: '"I don\'t know what to do next"',
    sub: "Guidance when you feel stuck or unsure",
  },
  {
    thought: '"Something doesn\'t feel right"',
    sub: "When you need help understanding if something needs attention",
  },
];

const SupportStartHere = () => {
  return (
    <section id="start-here" className="bg-parchment-dark py-28 md:py-36">
      <div className="container mx-auto px-6 md:px-10 max-w-3xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Entry points
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-12 max-w-lg">
          Start here
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {entries.map((e, i) => (
            <a
              key={i}
              href="#ai-support"
              className="group bg-card border border-border/50 rounded-lg p-7 shadow-card-brand flex flex-col gap-3 transition-all hover:border-sage/40 hover:shadow-soft"
            >
              <h3 className="font-serif text-lg text-foreground group-hover:text-sage transition-colors leading-snug">
                {e.thought}
              </h3>
              <p className="font-serif italic text-sm text-foreground/60 leading-snug">
                {e.sub}
              </p>
              <span className="mt-auto pt-2 flex items-center gap-1 font-sans text-xs font-light text-sage opacity-0 group-hover:opacity-100 transition-opacity">
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
