const examples = [
  { stage: "Trying to conceive", insight: "Understanding your cycle without obsessing over every detail." },
  { stage: "Pregnancy", insight: "Week-by-week guidance that reflects how you actually feel, not just what's happening medically." },
  { stage: "Postpartum", insight: "Support for the identity shift, the fog, and the moments no one prepares you for." },
];

const AboutAdaptive = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-lavender/5 blur-[120px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left: editorial */}
          <div className="md:col-span-2">
            <div className="editorial-rule mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
              Support that adapts to you
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              As you move through the journey, the experience shifts with you. Guidance stays relevant. Support stays grounded. Nothing pulls you ahead.
            </p>
            <p className="font-serif text-sm italic text-foreground/80">
              Simple, helpful, and always relevant.
            </p>
          </div>

          {/* Right: stage examples */}
          <div className="md:col-span-3 space-y-4">
            {examples.map((e) => (
              <div key={e.stage} className="card-elevated p-5 md:p-6">
                <p className="font-sans text-xs font-light tracking-wider text-sage uppercase mb-2">{e.stage}</p>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{e.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdaptive;
