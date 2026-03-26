import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const pathways = [
  {
    label: "Tool",
    title: "Ovulation Calculator",
    sub: "Find your fertile window",
    href: "/ovulation-calculator",
  },
  {
    label: "Guide",
    title: "Fertile Window Guide",
    sub: "Understand your cycle patterns",
    href: "/articles/fertile-window",
  },
  {
    label: "Next Stage",
    title: "Early Pregnancy Guidance",
    sub: "What happens after a positive test",
    href: "/pregnancy",
  },
  {
    label: "Journey",
    title: "Pregnancy Hub",
    sub: "Your week-by-week guide",
    href: "/pregnancy",
  },
];

const TTCPathways = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        {/* Header */}
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
            <Link
              key={i}
              to={p.href}
              className="group bg-card border border-border/50 rounded-lg p-7 shadow-card-brand flex flex-col gap-3 hover:border-sage/40 hover:shadow-soft transition-all"
            >
              <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                {p.label}
              </span>
              <h3 className="font-serif text-xl text-foreground group-hover:text-sage transition-colors">
                {p.title}
              </h3>
              <p className="font-serif italic text-sm text-foreground/60 leading-snug">
                {p.sub}
              </p>
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

export default TTCPathways;
