import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const pathways = [
  {
    label: "Your journey",
    title: "Return to your journey",
    sub: "Pick up where you left off",
    href: "/pregnancy",
    accent: "bg-[hsl(var(--stage-support)/0.4)]",
  },
  {
    label: "Pregnancy",
    title: "Explore pregnancy",
    sub: "Guidance for where you are right now",
    href: "/pregnancy",
    accent: "bg-[hsl(var(--stage-pregnancy)/0.4)]",
  },
  {
    label: "Postpartum",
    title: "Postpartum guidance",
    sub: "Recovery, adjustment, and early weeks",
    href: "/postpartum",
    accent: "bg-[hsl(var(--stage-postpartum)/0.4)]",
  },
];

const SupportPathways = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="flex items-center gap-4 mb-4">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted">
            Continue
          </p>
          <div className="h-px flex-1 bg-border/60" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-10 max-w-lg">
          Continue your journey
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pathways.map((p, i) => (
            <Link
              key={i}
              to={p.href}
              className="group bg-card border border-border/50 rounded-xl p-6 shadow-card-brand flex flex-col gap-3 transition-all hover:border-[hsl(var(--stage-support-accent)/0.3)] hover:shadow-soft"
            >
              <div className={`w-8 h-8 rounded-full ${p.accent} flex items-center justify-center`}>
                <span className="font-serif text-xs text-foreground/50">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="font-serif text-lg text-foreground group-hover:text-[hsl(var(--stage-support-accent))] transition-colors">
                {p.title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-snug">
                {p.sub}
              </p>
              <span className="mt-auto pt-3 flex items-center gap-1 font-sans text-xs font-light text-[hsl(var(--stage-support-accent))] opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowUpRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportPathways;
