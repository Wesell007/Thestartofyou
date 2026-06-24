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
      className="relative py-14 md:py-16"
      style={{
        backgroundImage:
          'linear-gradient(to right, hsl(var(--stage-firstyear) / 0.28), hsl(var(--stage-recovery) / 0.24))',
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.6)' }} />
          <span className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.6)' }} />
          <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase ml-2 text-foreground/60">
            Continue
          </p>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-8">
          Where to go next.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pathways.map((p) => (
            <Link
              key={p.href}
              to={p.href}
              className="group bg-card border rounded-2xl p-6 flex flex-col gap-2.5 transition-all hover:shadow-soft"
              style={{ borderColor: 'hsl(var(--border) / 0.7)' }}
            >
              <span className="font-sans text-[11px] font-light tracking-[0.15em] uppercase text-foreground/55">
                {p.label}
              </span>
              <h3 className="font-serif text-lg text-foreground group-hover:text-foreground/80 transition-colors">{p.title}</h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{p.sub}</p>
              <span className="mt-auto pt-2 inline-flex items-center gap-1 font-sans text-xs font-light opacity-60 group-hover:opacity-100 transition-opacity text-foreground/70">
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
