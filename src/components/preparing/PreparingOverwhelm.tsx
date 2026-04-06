const sections = [
  {
    tag: "Reality",
    title: "Why this can feel overwhelming",
    items: [
      "Too many product recommendations",
      "Conflicting advice from every direction",
      "Pressure to be fully prepared before baby arrives",
      "Not knowing what matters most",
    ],
    insight: "Feeling unsure doesn't mean you're unprepared — it means there's too much noise.",
  },
  {
    tag: "Emotionally",
    title: "The pressure to feel ready",
    items: [
      "Wondering if you've done enough",
      "Feeling like there's something you might be missing",
      "Wanting everything to be in place",
    ],
    insight: "There's no clear moment where everything feels fully ready — and that's normal.",
  },
];

const PreparingOverwhelm = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-12">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Honesty
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
            What makes preparation feel harder than it needs to be
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((s, i) => (
            <div key={i} className="bg-card border border-border/40 rounded-2xl p-7 md:p-8 shadow-card-brand flex flex-col">
              <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-4"
                style={{ color: "hsl(var(--stage-preparing-accent))" }}>
                {s.tag}
              </span>
              <h3 className="font-serif text-xl text-foreground mb-5 leading-snug">{s.title}</h3>

              <ul className="space-y-3 mb-6 flex-1">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "hsl(var(--stage-preparing-accent))" }} />
                    <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border/30 pt-5">
                <p className="font-serif italic text-sm text-foreground/65 leading-relaxed">{s.insight}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pressure pull-quote */}
        <div className="mt-10 border-l-2 pl-6 py-3 max-w-2xl"
          style={{ borderColor: "hsl(var(--stage-preparing-accent))" }}>
          <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-2">When preparation becomes pressure</p>
          <p className="font-serif italic text-base text-foreground/70 leading-relaxed">
            Sometimes, buying more or researching more doesn't bring clarity — it increases the noise. Simple and safe is often enough.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreparingOverwhelm;
