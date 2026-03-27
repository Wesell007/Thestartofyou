const categories = [
  {
    label: "Emotionally",
    items: [
      "Uncertainty or confusion",
      "Anxiety or persistent worry",
      "Low mood or emotional exhaustion",
      "Feeling disconnected or unlike yourself",
    ],
    insight: "These experiences are more common than people often talk about.",
  },
  {
    label: "Mentally",
    items: [
      "Thoughts going in circles",
      "Difficulty focusing",
      'Constant questioning or "what if" thinking',
    ],
    insight: "Uncertainty can make your mind try to find control.",
  },
  {
    label: "Physically",
    items: ["Tension", "Fatigue", "Difficulty resting"],
    insight: "Your body and mind are closely connected, especially during this time.",
  },
];

const SupportWhatFeeling = () => {
  return (
    <section className="bg-parchment py-28 md:py-36">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
          Understanding
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-14 max-w-lg">
          What you might be feeling
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="bg-card border border-border/50 rounded-lg p-7 shadow-card-brand flex flex-col">
              <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted mb-5">
                {cat.label}
              </span>
              <ul className="space-y-3 mb-8 flex-1">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage/50 mt-2 flex-shrink-0" />
                    <span className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-border/50 pt-5">
                <p className="font-serif italic text-sm text-foreground/60 leading-snug">{cat.insight}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportWhatFeeling;
