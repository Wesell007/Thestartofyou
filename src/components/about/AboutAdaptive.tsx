const examples = [
  { stage: "Trying to conceive", accent: "var(--stage-ttc-accent)", insight: "Understanding your cycle without drowning in uncertainty." },
  { stage: "Pregnancy", accent: "var(--stage-pregnancy-accent)", insight: "Week-by-week support that reflects how much changes, physically and emotionally." },
  { stage: "First year", accent: "var(--stage-firstyear-accent)", insight: "Baby care and recovery support for the months after birth." },
  { stage: "Toddler", accent: "var(--stage-firstyear-accent)", insight: "Practical guidance for development, emotions, sleep, speech and everyday family life." },
  { stage: "Family", accent: "var(--stage-postpartum-accent)", insight: "Support for the wider relationships, routines and decisions around raising children." },
  { stage: "The journal", accent: "var(--stage-pregnancy-accent)", insight: "A physical place to hold thoughts, scan photos, keepsakes and memories." },
];

const AboutAdaptive = () => {
  return (
    <section className="relative bg-parchment-dark py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-lavender/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="editorial-rule mb-6 mx-auto" />
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 text-center leading-snug">
          Support that adapts to where you are
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground text-center mb-10 max-w-md mx-auto leading-relaxed">
          As you move through the journey, the experience shifts with you. Guidance stays relevant. Support stays grounded.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {examples.map((e) => (
            <div
              key={e.stage}
              className="rounded-2xl border border-border/30 shadow-card-brand p-5 md:p-6 border-l-2 bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4]"
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
