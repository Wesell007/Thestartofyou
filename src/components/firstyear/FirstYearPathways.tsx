import { ArrowUpRight } from "lucide-react";

const pathways = [
  {
    label: "Month by Month",
    title: "Month-by-month guide",
    sub: "Guidance that moves with you, one month at a time",
    href: "#",
  },
  {
    label: "Previous Stage",
    title: "Postpartum hub",
    sub: "Looking back at the early weeks and recovery",
    href: "/postpartum",
  },
  {
    label: "Support",
    title: "Support hub",
    sub: "For moments that feel uncertain, heavy, or hard",
    href: "#",
  },
  {
    label: "Articles",
    title: "Development guidance",
    sub: "Answers to common questions about your baby's growth",
    href: "#",
  },
];

const FirstYearPathways = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-14">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Continue
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
            Where to go next
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {pathways.map((p, i) => (
            <div
              key={i}
              className="group bg-card border border-border/50 rounded-lg p-7 shadow-card-brand flex flex-col gap-3 opacity-90"
            >
              <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                {p.label}
              </span>
              <h3 className="font-serif text-xl text-foreground">
                {p.title}
              </h3>
              <p className="font-serif italic text-sm text-foreground/60 leading-snug">
                {p.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstYearPathways;
