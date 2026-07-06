import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const featured = {
  label: "Previous Stage",
  title: "Postpartum hub",
  sub: "Looking back at the early weeks, recovery, and adjustment. Many of those patterns still inform where you are now.",
  href: "/postpartum",
  stat: { n: "12", label: "weeks covered" },
};

const pathways = [
  {
    label: "Support",
    title: "Support hub",
    sub: "For moments that feel uncertain, heavy, or hard",
    href: "/support",
  },
  {
    label: "Preparation",
    title: "Preparing for your baby",
    sub: "Practical guidance for what you need",
    href: "/preparing-for-baby",
  },
  {
    label: "Journey",
    title: "Explore your journey",
    sub: "Return to the full journey overview",
    href: "/pregnancy",
  },
];

const FirstYearPathways = () => {
  return (
    <section
      className="py-16 md:py-24"
      style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.2)' }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-10">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-firstyear-accent))' }}
            >
              Continue
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              Where to go next
            </h2>
          </div>
          <div className="md:col-span-3">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Whether you're revisiting earlier stages, looking for emotional support, or exploring the broader journey, there's somewhere to go next.
            </p>
          </div>
        </div>

        {/* Featured pathway */}
        <Link to={featured.href} className="group block mb-5">
          <div className="rounded-2xl border border-border/30 p-7 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 transition-all hover:shadow-soft bg-card">
            <div>
              <span className="font-sans text-[11px] font-light tracking-[0.15em] uppercase" style={{ color: 'hsl(var(--stage-firstyear-accent))' }}>
                {featured.label}
              </span>
              <h3 className="font-serif text-2xl text-foreground mt-2 mb-3 group-hover:text-foreground/80 transition-colors">
                {featured.title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                {featured.sub}
              </p>
            </div>
            <div className="flex items-center justify-end">
              <div className="flex flex-col items-center rounded-xl px-6 py-4" style={{ backgroundColor: 'hsl(var(--stage-firstyear) / 0.2)' }}>
                <span className="font-serif text-3xl text-foreground">{featured.stat.n}</span>
                <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{featured.stat.label}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Other pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pathways.map((p, i) => (
            <Link
              key={i}
              to={p.href}
              className="group bg-card border border-border/40 rounded-xl p-6 flex flex-col gap-3 transition-all hover:shadow-soft"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-firstyear-accent) / 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
            >
              <span className="font-sans text-[11px] font-light tracking-[0.15em] uppercase" style={{ color: 'hsl(var(--stage-firstyear-accent))' }}>
                {p.label}
              </span>
              <h3 className="font-serif text-lg text-foreground group-hover:text-foreground/80 transition-colors">{p.title}</h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">{p.sub}</p>
              <span className="mt-auto pt-2 flex items-center gap-1 font-sans text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'hsl(var(--stage-firstyear-accent))' }}>
                Explore <ArrowUpRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstYearPathways;
