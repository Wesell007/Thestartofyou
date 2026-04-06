import { Link } from "react-router-dom";
import { ArrowRight, Calculator, BookOpen, Baby, Heart } from "lucide-react";

const pathways = [
  {
    icon: Calculator,
    label: "Tool",
    title: "Ovulation Calculator",
    sub: "Find your fertile window based on your cycle",
    href: "/ovulation-calculator",
    featured: true,
  },
  {
    icon: Heart,
    label: "Support",
    title: "Emotional Support",
    sub: "When trying feels harder than expected",
    href: "/support",
    featured: false,
  },
  {
    icon: BookOpen,
    label: "Guide",
    title: "Fertile Window Guide",
    sub: "Understand your cycle patterns in depth",
    href: "/articles/fertile-window",
    featured: false,
  },
  {
    icon: Baby,
    label: "Next Stage",
    title: "Early Pregnancy",
    sub: "What happens after a positive test",
    href: "/pregnancy",
    featured: false,
  },
];

const TTCPathways = () => {
  return (
    <section className="bg-parchment-dark py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-10">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              Continue
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              Where to go next
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Whether you need a tool, a guide, or support, these are the most useful next steps from here.
            </p>
          </div>
        </div>

        {/* Featured + grid */}
        <div className="space-y-4">
          {/* Featured card */}
          <Link
            to={pathways[0].href}
            className="group flex flex-col sm:flex-row items-stretch rounded-2xl border overflow-hidden transition-all hover:shadow-card-brand"
            style={{ borderColor: 'hsl(var(--stage-ttc-accent) / 0.2)' }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ttc-accent) / 0.4)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ttc-accent) / 0.2)'}
          >
            <div
              className="sm:w-1/3 p-6 sm:p-8 flex flex-col justify-center gap-2"
              style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.2)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.35)' }}
                >
                  <Calculator size={16} style={{ color: 'hsl(var(--stage-ttc-accent))' }} />
                </div>
                <span
                  className="font-sans text-[10px] font-light tracking-[0.15em] uppercase"
                  style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                >
                  {pathways[0].label}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-3xl text-foreground leading-none">6</span>
                <span className="font-sans text-[9px] font-light text-muted-foreground/55 uppercase tracking-widest mt-1">fertile days per cycle</span>
              </div>
            </div>
            <div className="flex-1 bg-card p-6 sm:p-8 flex flex-col justify-center gap-2">
              <h3 className="font-serif text-xl text-foreground group-hover:text-foreground/80 transition-colors">
                {pathways[0].title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                {pathways[0].sub}
              </p>
              <span
                className="flex items-center gap-1.5 font-sans text-xs font-light mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'hsl(var(--stage-ttc-accent))' }}
              >
                Open calculator <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* Remaining cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {pathways.slice(1).map((p, i) => {
              const Icon = p.icon;
              return (
                <Link
                  key={i}
                  to={p.href}
                  className="group bg-card border border-border/40 rounded-2xl p-6 flex flex-col gap-3 hover:shadow-card-brand transition-all"
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ttc-accent) / 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.25)' }}
                    >
                      <Icon size={13} style={{ color: 'hsl(var(--stage-ttc-accent))' }} />
                    </div>
                    <span
                      className="font-sans text-[10px] font-light tracking-[0.12em] uppercase"
                      style={{ color: 'hsl(var(--stage-ttc-accent) / 0.7)' }}
                    >
                      {p.label}
                    </span>
                  </div>
                  <h3 className="font-serif text-base text-foreground group-hover:text-foreground/80 transition-colors">
                    {p.title}
                  </h3>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                    {p.sub}
                  </p>
                  <span
                    className="mt-auto flex items-center gap-1 font-sans text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                  >
                    Explore <ArrowRight size={11} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TTCPathways;
