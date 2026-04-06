const stages = [
  { label: "Trying to conceive", color: "var(--stage-ttc-accent)" },
  { label: "IVF", color: "var(--stage-ivf-accent)" },
  { label: "Pregnancy", color: "var(--stage-pregnancy-accent)" },
  { label: "Postpartum", color: "var(--stage-postpartum-accent)" },
  { label: "First year", color: "var(--stage-firstyear-accent)" },
];

const layers = [
  "Preparing for baby",
  "Emotional support",
  "Guided journal",
  "Tools and calculators",
];

const AboutEcosystem = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="editorial-rule mb-6" />
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 text-center leading-snug">
          A journey that grows with you
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground text-center mb-10 max-w-md mx-auto leading-relaxed">
          Five core stages. Supporting layers that sit alongside every step. One connected experience.
        </p>

        {/* Stage trail */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {stages.map((s) => (
            <span
              key={s.label}
              className="font-sans text-xs font-light tracking-wide text-foreground border rounded-pill px-4 py-2 bg-parchment"
              style={{ borderColor: `hsl(${s.color.replace("var(", "").replace(")", "")})`, borderWidth: "1.5px" }}
            >
              {s.label}
            </span>
          ))}
        </div>

        {/* Supporting layers */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-6 bg-border" />
          <p className="stage-label">Supporting layers</p>
          <div className="h-px w-6 bg-border" />
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {layers.map((l) => (
            <span
              key={l}
              className="font-sans text-xs font-light text-muted-foreground border border-border/60 rounded-pill px-4 py-2"
            >
              {l}
            </span>
          ))}
        </div>

        <p className="font-serif text-sm italic text-foreground/80 max-w-sm mx-auto text-center">
          Each stage connects, so you're never starting over, just moving forward.
        </p>
      </div>
    </section>
  );
};

export default AboutEcosystem;
