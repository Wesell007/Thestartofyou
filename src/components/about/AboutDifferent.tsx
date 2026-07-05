const differentiators = [
  {
    num: "01",
    title: "Guidance, not overload",
    desc: "Each stage is structured to reduce noise and help you find what matters.",
  },
  {
    num: "02",
    title: "Built around real experience",
    desc: "Support reflects the emotional and practical reality of the journey, not just milestones.",
  },
  {
    num: "03",
    title: "Tools, articles and AI together",
    desc: "Answers, calculators, topic pages and guidance work as one system, not scattered pieces.",
  },
  {
    num: "04",
    title: "A softer place to return to",
    desc: "The design is calm on purpose, because support should not make you feel more overwhelmed.",
  },
];

const AboutDifferent = () => {
  return (
    <section className="relative bg-parchment py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          <div className="md:col-span-2">
            <div className="editorial-rule mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
              Designed<br />differently
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              Most platforms offer content. We built a system. The difference is in how everything connects, adapts and stays relevant.
            </p>
            <p className="font-serif text-sm italic text-foreground/70">
              This is not another content platform.<br />
              It is a guided experience.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            {differentiators.map((d) => (
              <div
                key={d.num}
                className="rounded-2xl border border-border/30 shadow-card-brand p-5 md:p-6 flex gap-4 items-start bg-gradient-to-br from-white via-[#FBF8F1] to-[#F4EFE4]"
              >
                <span className="font-serif text-lg text-sage/50 leading-none mt-0.5 select-none">{d.num}</span>
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
