const problems = [
  {
    num: "01",
    title: "Overwhelming",
    detail: "Every app, blog, and forum adds more. The volume of information grows, but clarity doesn't.",
  },
  {
    num: "02",
    title: "Disconnected",
    detail: "Advice that doesn't know your stage, your context, or what you've already been through.",
  },
  {
    num: "03",
    title: "Hard to trust",
    detail: "Conflicting opinions from every direction. The more you read, the less sure you feel.",
  },
];

const AboutProblem = () => {
  return (
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-start">
          {/* Left */}
          <div className="md:col-span-2">
            <div className="editorial-rule mb-6" />
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-snug mb-4">
              The journey rarely<br />feels guided
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              From trying to conceive through to your baby's first year, there is no shortage of information. But most of it leaves you further from clarity, not closer.
            </p>
            <p className="font-serif text-sm italic text-foreground/70">
              More information has not meant better support.
            </p>
          </div>

          {/* Right: numbered problem cards */}
          <div className="md:col-span-3 space-y-3">
            {problems.map((p) => (
              <div
                key={p.num}
                className="card-elevated p-5 md:p-6 flex gap-4 items-start"
              >
                <span className="font-serif text-lg text-sage/40 leading-none mt-0.5 select-none">{p.num}</span>
                <div>
                  <h3 className="font-serif text-base text-foreground mb-1">{p.title}</h3>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProblem;
