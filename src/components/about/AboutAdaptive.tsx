const examples = [
  { stage: "Trying to conceive", accent: "var(--stage-ttc-accent)", insight: "Understanding your cycle without obsessing over every detail. Guidance that holds space for uncertainty and waiting." },
  { stage: "Pregnancy", accent: "var(--stage-pregnancy-accent)", insight: "Week-by-week support that reflects how you actually feel, not just what is happening medically. Calm, specific, and stage-aware." },
  { stage: "Postpartum", accent: "var(--stage-postpartum-accent)", insight: "Support for the identity shift, the fog, the waves of emotion, and the moments no one quite prepares you for." },
  { stage: "First year", accent: "var(--stage-firstyear-accent)", insight: "Developmental guidance alongside emotional honesty. Reassurance that adjusting takes time and does not follow a straight line." },
];

const AboutAdaptive = () => {
  return (
    <section className="relative bg-parchment-dark py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-lavender/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        <div className="editorial-rule mb-6" />
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 text-center leading-snug">
          Support that adapts to you
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground text-center mb-10 max-w-md mx-auto leading-relaxed">
          As you move through the journey, the experience shifts with you. Guidance stays relevant. Support stays grounded. Nothing pulls you ahead.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {examples.map((e) => (
            <div
              key={e.stage}
              className="card-elevated p-5 md:p-6 border-l-2"
              style={{ borderLeftColor: `hsl(${e.accent.replace("var(", "").replace(")", "")})` }}
            >
              <p className="font-sans text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground mb-2">{e.stage}</p>
              <p className="font-sans text-sm font-light text-foreground/80 leading-relaxed">{e.insight}</p>
            </div>
          ))}
        </div>

        <p className="font-serif text-sm italic text-foreground/70 mt-10 text-center">
          Simple, helpful, and always relevant to where you are right now.
        </p>
      </div>
    </section>
  );
};

export default AboutAdaptive;
