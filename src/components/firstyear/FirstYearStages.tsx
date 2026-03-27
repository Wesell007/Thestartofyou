import { Link } from "react-router-dom";

const stages = [
  {
    num: "01",
    title: "0–3 months",
    range: "Newborn to 3 months",
    sub: "Adjustment, early patterns, and moving out of survival mode",
    href: "/first-year/0-3-months",
  },
  {
    num: "02",
    title: "3–6 months",
    range: "3 to 6 months",
    sub: "More awareness, interaction, and early routines beginning to form",
    href: "/first-year/3-6-months",
  },
  {
    num: "03",
    title: "6–9 months",
    range: "6 to 9 months",
    sub: "Movement, curiosity, and increasing engagement with the world",
    href: "/first-year/6-9-months",
  },
  {
    num: "04",
    title: "9–12 months",
    range: "9 months to one year",
    sub: "Mobility, personality, and transition into the next stage",
    href: "/first-year/9-12-months",
  },
];

const FirstYearStages = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            The Process
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
            Stages of the first year
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {stages.map((stage) => (
            <Link
              key={stage.num}
              to={stage.href}
              className="group bg-card border border-border/50 rounded-lg p-8 shadow-card-brand flex flex-col gap-4 hover:border-sage/40 hover:shadow-soft transition-all"
            >
              <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                {stage.num}
              </span>
              <div>
                <h3 className="font-serif text-xl text-foreground leading-snug mb-1 group-hover:text-sage transition-colors">
                  {stage.title}
                </h3>
                <p className="font-sans text-xs font-light tracking-[0.1em] text-sage-muted">
                  {stage.range}
                </p>
              </div>
              <p className="font-serif italic text-base text-foreground/60 leading-relaxed">
                {stage.sub}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstYearStages;
