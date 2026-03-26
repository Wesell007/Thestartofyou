const stages = [
  {
    num: "01",
    title: "Before transfer",
    sub: "Preparation, medication, understanding your protocol, and getting ready physically and mentally",
  },
  {
    num: "02",
    title: "After transfer",
    sub: "The waiting period — often the most uncertain stage, where questions and emotions can feel heightened",
  },
  {
    num: "03",
    title: "Early pregnancy",
    sub: "Monitoring, early scans, and cautious progress as things begin to develop",
  },
];

const IVFStages = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Header */}
        <div className="mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            The Process
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
            Stages of your IVF journey
          </h2>
        </div>

        {/* Stages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stages.map((stage) => (
            <div
              key={stage.num}
              className="bg-card border border-border/50 rounded-lg p-8 shadow-card-brand flex flex-col gap-4"
            >
              <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                {stage.num}
              </span>
              <h3 className="font-serif text-xl text-foreground leading-snug">
                {stage.title}
              </h3>
              <p className="font-serif italic text-base text-foreground/60 leading-relaxed">
                {stage.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IVFStages;
