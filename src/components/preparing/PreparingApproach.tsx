const approaches = [
  "Focus on essentials first",
  "Add things gradually",
  "Avoid comparing your setup to others",
  "Keep things simple where possible",
];

const PreparingApproach = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Right Now
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
              How to approach this stage
            </h2>
          </div>

          <ul className="space-y-5 pt-1">
            {approaches.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="mt-2 w-1 h-1 rounded-full bg-sage-muted shrink-0" />
                <p className="font-sans text-base font-light text-muted-foreground leading-relaxed">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PreparingApproach;
