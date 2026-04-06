const differentiators = [
  { title: "Guidance, not overload", desc: "We focus on what matters now, not everything at once. Each stage is structured to reduce noise and support clear decisions." },
  { title: "Built around real experiences", desc: "Not just clinical timelines. The emotional reality of each stage shapes the guidance, the language, and the support." },
  { title: "Support in overlooked moments", desc: "The hardest parts of the journey are often the ones least talked about. We design specifically for those moments." },
  { title: "A system, not just content", desc: "Tools, guidance, emotional support, and reflection are connected. Everything works together across the full journey." },
];

const AboutDifferent = () => {
  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-sage/5 blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 md:px-10 max-w-3xl relative z-10">
        <div className="editorial-rule mb-6" />
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-10 text-center leading-snug">
          Designed differently
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {differentiators.map((d, i) => (
            <div
              key={d.title}
              className="card-elevated p-6 md:p-7"
              style={{ borderTop: `2px solid hsl(var(--sage) / ${0.25 + i * 0.15})` }}
            >
              <h3 className="font-serif text-lg text-foreground mb-2">{d.title}</h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                {d.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 space-y-1.5">
          <p className="font-serif text-sm italic text-foreground/80">
            This is not another content platform.
          </p>
          <p className="font-serif text-sm italic text-foreground/80">
            It's a guided experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutDifferent;
