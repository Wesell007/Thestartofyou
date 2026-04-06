const steps = [
  {
    num: "01",
    title: "Enter your due date",
    desc: "Your 40-week journey begins with one simple date. We calculate your current stage and build your personalised timeline.",
    accent: "bg-sage/10",
  },
  {
    num: "02",
    title: "Receive weekly guidance",
    desc: "Every week, your dashboard updates with stage-specific guidance: body changes, development milestones, and practical reminders.",
    accent: "bg-lavender-bg",
  },
  {
    num: "03",
    title: "Reflect & record",
    desc: "Journal your thoughts. Track your milestones. Access your full pregnancy roadmap anytime, from anywhere.",
    accent: "bg-parchment-dark",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="relative bg-parchment section-spacing overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="editorial-rule mb-6 md:mb-8" />
          <p className="stage-label mb-4">How It Works</p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl text-foreground mb-4 md:mb-6">
            Three steps to begin
          </h2>
          <p className="font-sans text-sm sm:text-base font-light text-muted-foreground max-w-lg mx-auto leading-relaxed">
            A simple process that gives you a structured, personalised pregnancy experience from day one.
          </p>
        </div>

        {/* Steps — numbered cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`${s.accent} rounded-2xl p-7 sm:p-8 md:p-9 border border-border/20 transition-all hover:shadow-soft`}
            >
              <span className="font-serif text-3xl sm:text-4xl text-terracotta/30 leading-none block mb-5 md:mb-6">
                {s.num}
              </span>
              <h3 className="font-serif text-lg md:text-xl text-foreground mb-3 md:mb-4">
                {s.title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
