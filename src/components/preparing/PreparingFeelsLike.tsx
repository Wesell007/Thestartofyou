const feelings = [
  "Wanting to feel prepared, but unsure how",
  "Feeling pressure to get everything right",
  "Going back and forth on decisions",
  "Questioning what's necessary",
];

const PreparingFeelsLike = () => {
  return (
    <section className="bg-parchment-dark py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
          <div>
            <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
              Emotionally
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
              What this can feel like
            </h2>
          </div>

          <div>
            <ul className="space-y-4 mb-6">
              {feelings.map((item, i) => (
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
      </div>
    </section>
  );
};

export default PreparingFeelsLike;
