import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const pathways = [
  {
    label: "Pregnancy",
    title: "Pregnancy hub",
    sub: "Week-by-week guidance through each stage",
    href: "/pregnancy",
    color: "--stage-pregnancy-accent",
  },
  {
    label: "Postpartum",
    title: "Postpartum hub",
    sub: "Recovery, adjustment, and the early weeks",
    href: "/postpartum",
    color: "--stage-postpartum-accent",
  },
  {
    label: "First Year",
    title: "First year hub",
    sub: "Growth, change, and finding your rhythm",
    href: "/first-year",
    color: "--stage-firstyear-accent",
  },
  {
    label: "Journey",
    title: "Explore your journey",
    sub: "Return to the full journey overview",
    href: "/explore",
    color: "--stage-preparing-accent",
  },
];

const PreparingPathways = () => {
  return (
    <section className="bg-parchment py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-12">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            Continue
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight max-w-lg">
            Where to go next
          </h2>
        </div>

        {/* Featured card */}
        <Link
          to={pathways[0].href}
          className="group mb-5 block bg-card border border-border/40 rounded-2xl p-7 md:p-8 shadow-elevated transition-all hover:shadow-card-hover"
          style={{ borderLeftWidth: "3px", borderLeftColor: `hsl(var(${pathways[0].color}))` }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase"
                style={{ color: `hsl(var(${pathways[0].color}))` }}>{pathways[0].label}</span>
              <h3 className="font-serif text-xl text-foreground mt-2 leading-snug">{pathways[0].title}</h3>
              <p className="font-serif italic text-sm text-foreground/60 leading-snug mt-1">{pathways[0].sub}</p>
            </div>
            <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          </div>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pathways.slice(1).map((p, i) => (
            <Link
              key={i}
              to={p.href}
              className="group bg-card border border-border/40 rounded-xl p-6 shadow-card-brand flex flex-col gap-3 transition-all hover:border-border hover:shadow-soft"
            >
              <span className="font-sans text-[10px] font-light tracking-[0.2em] uppercase"
                style={{ color: `hsl(var(${p.color}))` }}>
                {p.label}
              </span>
              <h3 className="font-serif text-lg text-foreground leading-snug">{p.title}</h3>
              <p className="font-serif italic text-sm text-foreground/60 leading-snug">{p.sub}</p>
              <span className="mt-auto pt-3 flex items-center gap-1 font-sans text-xs font-light text-sage opacity-0 group-hover:opacity-100 transition-opacity">
                Explore <ArrowUpRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PreparingPathways;
