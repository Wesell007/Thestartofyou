import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const pathways = [
  { label: "Previous journey", title: "Pregnancy", sub: "Revisit the weeks that brought you here.", href: "/pregnancy" },
  { label: "Support", title: "Get support", sub: "For moments that feel uncertain or heavy.", href: "/support" },
  { label: "Explore", title: "Explore the full journey", sub: "See how every stage fits together.", href: "/explore" },
];

const FYPathways = () => {
  return (
    <section
      className="py-14 md:py-20"
      style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.2)' }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <p
          className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-3"
          style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
        >
          Continue
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-8">
          Where to go next.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pathways.map((p) => (
            <Link
              key={p.href}
              to={p.href}
              className="group bg-card border rounded-2xl p-6 flex flex-col gap-2.5 transition-all hover:shadow-soft"
              style={{ borderColor: 'hsl(var(--stage-firstyear-accent) / 0.18)' }}
            >
              <span
                className="font-sans text-[11px] font-light tracking-[0.15em] uppercase"
                style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
              >
                {p.label}
              </span>
              <h3 className="font-serif text-lg text-foreground group-hover:text-foreground/80 transition-colors">{p.title}</h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{p.sub}</p>
              <span
                className="mt-auto pt-2 inline-flex items-center gap-1 font-sans text-xs font-light opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ color: 'hsl(var(--stage-firstyear-deep))' }}
              >
                Open <ArrowUpRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FYPathways;
