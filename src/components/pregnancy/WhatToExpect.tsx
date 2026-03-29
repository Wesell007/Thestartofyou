const cards = [
  {
    id: "body",
    label: "Your body",
    intro:
      "Your body may change in ways that feel unpredictable. You might notice:",
    points: [
      "Symptoms that appear and disappear",
      "Days where you feel very different from the day before",
      "Physical changes that don't follow a clear pattern",
      "Moments where you feel completely normal",
    ],
    meaning:
      "Changes don't always follow a steady progression. Variation is a normal part of pregnancy, even when it feels confusing.",
  },
  {
    id: "baby",
    label: "Your baby",
    intro:
      "Your baby is developing continuously, even when nothing feels different to you. You may notice:",
    points: [
      "Weeks where development feels abstract or hard to visualise",
      "Milestones happening without clear physical signals",
      "A gradual sense of progress rather than sudden change",
    ],
    meaning:
      "A lot is happening behind the scenes, especially in early pregnancy, even when you can't feel it yet.",
  },
  {
    id: "emotional",
    label: "Emotionally",
    intro:
      "This stage can feel less straightforward than expected. You may feel:",
    points: [
      "Excited, but unsure",
      "Reassured one day and questioning things the next",
      "Unsure what is 'normal' for you",
      "A mix of calm, worry, and anticipation",
    ],
    meaning:
      "Emotional shifts are part of how people process change, especially when things are new or uncertain.",
  },
  {
    id: "uncertainty",
    label: "Uncertainty",
    intro:
      "One of the most defining parts of pregnancy is not always knowing what things mean. You may experience:",
    points: [
      "Wondering if symptoms are normal",
      "Comparing your experience to others",
      "Feeling unsure whether something is 'right'",
      "Wanting reassurance, even when everything is progressing normally",
    ],
    meaning:
      "Pregnancy is not always linear or predictable, and uncertainty is part of the experience, not a sign something is wrong.",
  },
];

const WhatToExpect = () => {
  return (
    <section className="bg-lavender-section py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            The Full Picture
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-5 leading-tight max-w-2xl mx-auto">
            What to expect during pregnancy
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Across your body, your emotions, and the space in between.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-card rounded-lg p-8 shadow-card-brand border border-border/50 flex flex-col gap-5"
            >
              <p className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                {card.label}
              </p>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                {card.intro}
              </p>
              <ul className="space-y-2.5">
                {card.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-2 w-1 h-1 rounded-full bg-foreground/30 shrink-0" />
                    <span className="font-sans text-sm font-light text-foreground leading-relaxed">
                      {pt}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Meaning */}
              <div className="pt-4 border-t border-border/50">
                <p className="font-sans text-xs font-light tracking-[0.1em] uppercase text-sage-muted mb-2">
                  What this means
                </p>
                <p className="font-serif italic text-base text-foreground leading-relaxed">
                  {card.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatToExpect;
