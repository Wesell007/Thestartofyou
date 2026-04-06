const problems = [
  { title: "Overwhelming", detail: "Hundreds of articles, apps, and opinions pulling in every direction." },
  { title: "Disconnected", detail: "Information that doesn't know where you are or what you actually need." },
  { title: "Hard to trust", detail: "Conflicting advice that leaves you more uncertain than before." },
];

const AboutProblem = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left: headline + context */}
          <div className="md:col-span-2">
            <div className="editorial-rule mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
              Most journeys don't feel guided
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              From trying to conceive to your baby's first year, there is no shortage of information. But most of it leaves you feeling further from clarity, not closer.
            </p>
          </div>

          {/* Right: problem cards */}
          <div className="md:col-span-3 space-y-4">
            {problems.map((p, i) => (
              <div
                key={p.title}
                className="card-elevated p-5 md:p-6 border-l-2"
                style={{ borderLeftColor: `hsl(var(--sage) / ${0.3 + i * 0.2})` }}
              >
                <h3 className="font-serif text-base text-foreground mb-1">{p.title}</h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing editorial line */}
        <div className="text-center mt-12 space-y-1.5">
          <p className="font-serif text-sm italic text-foreground/80">
            The problem isn't a lack of information.
          </p>
          <p className="font-serif text-sm italic text-foreground/80">
            It's a lack of clear, relevant guidance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutProblem;
