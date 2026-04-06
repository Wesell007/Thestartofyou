import { Link } from "react-router-dom";
import { ArrowUpRight, Clock, Stethoscope, Heart, Baby } from "lucide-react";

const pathways = [
  {
    label: "After Transfer",
    title: "After transfer guidance",
    sub: "The waiting period, what to expect and how to navigate it.",
    href: "/ivf/after-transfer",
    icon: Clock,
  },
  {
    label: "Early Pregnancy",
    title: "Early IVF pregnancy",
    sub: "Monitoring, scans, and cautious early progress.",
    href: "/ivf/early-pregnancy",
    icon: Stethoscope,
  },
  {
    label: "Support",
    title: "Support hub",
    sub: "For moments that feel uncertain or overwhelming.",
    href: "/support",
    icon: Heart,
  },
  {
    label: "Next Stage",
    title: "Pregnancy hub",
    sub: "Your week-by-week guide into pregnancy.",
    href: "/pregnancy",
    icon: Baby,
  },
];

const IVFPathways = () => {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.2)' }}
    >
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                Continue
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              Where to go next
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md">
              Your IVF journey connects to other stages and support systems. Choose what feels most relevant now.
            </p>
          </div>
        </div>

        {/* Featured card */}
        <Link
          to={pathways[0].href}
          className="group grid grid-cols-1 md:grid-cols-[1fr_1fr] rounded-2xl bg-card border border-border/50 overflow-hidden shadow-card-brand mb-5 transition-all hover:shadow-soft"
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ivf-accent) / 0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
        >
          <div className="p-7 sm:p-8 flex flex-col justify-center">
            <span className="font-sans text-[10px] font-light tracking-[0.15em] uppercase mb-3" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
              {pathways[0].label}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
              {pathways[0].title}
            </h3>
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mb-4">
              {pathways[0].sub}
            </p>
            <span className="flex items-center gap-1 font-sans text-xs font-light" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
              Explore <ArrowUpRight size={12} />
            </span>
          </div>
          <div
            className="p-8 flex flex-col items-center justify-center gap-3"
            style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.15)' }}
          >
            <div className="flex items-center gap-5">
              {[
                { n: "14", label: "day wait" },
                { n: "Daily", label: "check-ins" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center">
                  <span className="font-serif text-xl text-foreground">{s.n}</span>
                  <span className="font-sans text-[10px] font-light text-muted-foreground/60 uppercase tracking-wide">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Link>

        {/* Remaining cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pathways.slice(1).map((p, i) => (
            <Link
              key={i}
              to={p.href}
              className="group bg-card border border-border/50 rounded-xl p-6 shadow-card-brand flex flex-col gap-3 transition-all hover:shadow-soft"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ivf-accent) / 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center mb-1"
                style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.2)' }}
              >
                <p.icon size={16} style={{ color: 'hsl(var(--stage-ivf-accent))' }} />
              </div>
              <span className="font-sans text-[10px] font-light tracking-[0.15em] uppercase text-muted-foreground/60">
                {p.label}
              </span>
              <h3 className="font-serif text-lg text-foreground group-hover:text-foreground/80 transition-colors">
                {p.title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground/70 leading-relaxed">
                {p.sub}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IVFPathways;
