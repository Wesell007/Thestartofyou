const differentiators = [
  { num: "01", title: "Guidance, not overload", desc: "We focus on what matters now. Each stage is structured to reduce noise and support clear decisions, not add to the pile." },
  { num: "02", title: "Built around real experiences", desc: "Not just clinical timelines. The emotional reality of each stage shapes the guidance, the language, and the support you receive." },
  { num: "03", title: "Support in the overlooked moments", desc: "The hardest parts of the journey are often the ones least talked about. We design specifically for those moments." },
  { num: "04", title: "A system, not a collection", desc: "Tools, guidance, emotional support, and reflection are connected. Everything works together across the full journey, not in isolation." },
];

const AboutDifferent = () => {
  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left editorial */}
          <div className="md:col-span-2">
            <div className="editorial-rule mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
              Designed<br />differently
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              Most platforms offer content. We built a system. The difference is in how everything connects, adapts, and stays relevant.
            </p>
            <p className="font-serif text-sm italic text-foreground/70">
              This is not another content platform.<br />
              It is a guided experience.
            </p>
          </div>

          {/* Right: numbered cards */}
          <div className="md:col-span-3 space-y-3">
            {differentiators.map((d) => (
              <div key={d.num} className="card-elevated p-5 md:p-6 flex gap-4 items-start">
                <span className="font-serif text-lg text-sage/40 leading-none mt-0.5 select-none">{d.num}</span>
                <div>
                  <h3 className="font-serif text-base text-foreground mb-1">{d.title}</h3>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDifferent;
