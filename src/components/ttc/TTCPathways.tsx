import { Link } from "react-router-dom";
import { ArrowRight, Calculator, BookOpen, Baby, Heart } from "lucide-react";

const pathways = [
  {
    icon: Calculator,
    label: "Tool",
    title: "Ovulation Calculator",
    sub: "Find your fertile window based on your cycle",
    href: "/ovulation-calculator",
  },
  {
    icon: BookOpen,
    label: "Guide",
    title: "Fertile Window Guide",
    sub: "Understand your cycle patterns in detail",
    href: "/articles/fertile-window",
  },
  {
    icon: Baby,
    label: "Next Stage",
    title: "Early Pregnancy",
    sub: "What happens after a positive test",
    href: "/pregnancy",
  },
  {
    icon: Heart,
    label: "Support",
    title: "Emotional Support",
    sub: "When trying feels harder than expected",
    href: "/support",
  },
];

const TTCPathways = () => {
  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.08)' }}
    >
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pathways.map((p, i) => {
            const Icon = p.icon;
            return (
              <Link
                key={i}
                to={p.href}
                className="group bg-card border border-border/40 rounded-2xl p-6 sm:p-7 flex flex-col gap-3 hover:shadow-card-brand transition-all"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ttc-accent) / 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.3)' }}
                  >
                    <Icon size={14} style={{ color: 'hsl(var(--stage-ttc-accent))' }} />
                  </div>
                  <span
                    className="font-sans text-[10px] font-light tracking-[0.15em] uppercase"
                    style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                  >
                    {p.label}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-foreground group-hover:text-foreground/80 transition-colors">
                  {p.title}
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {p.sub}
                </p>
                <span
                  className="mt-auto pt-2 flex items-center gap-1 font-sans text-xs font-light opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                >
                  Explore <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TTCPathways;
