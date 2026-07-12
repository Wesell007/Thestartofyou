import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const pathways = [
  { label: "Previous stage", title: "Pregnancy guidance", sub: "Revisit pregnancy guidance, birth preparation and the weeks that brought you here.", href: "/pregnancy" },
  { label: "Next stage", title: "Toddler guidance", sub: "Move into toddler sleep, food, behaviour, speech, play and everyday routines.", href: "/toddler" },
  { label: "Continue", title: "Family life", sub: "Find support for routines, relationships, growing families and everyday family life.", href: "/family" },
  { label: "Journal", title: "My journey", sub: "Keep track of the moments, questions and memories you may want to come back to.", href: "/my-journey" },
];

const FYPathways = () => {
  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(120deg, hsl(var(--stage-firstyear) / 0.44) 0%, hsl(var(--stage-firstyear) / 0.18) 45%, hsl(var(--stage-recovery) / 0.22) 55%, hsl(var(--stage-recovery) / 0.42) 100%)',
      }}
    >
      {/* Ambient blooms */}
      <div
        className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl opacity-45 pointer-events-none"
        style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.55)' }}
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.5)' }}
        aria-hidden
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl relative z-10">
        <div className="flex items-center gap-1.5 mb-3">
          <span className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.6)' }} />
          <span className="h-px w-8" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.6)' }} />
          <p className="font-sans text-[11px] font-light tracking-[0.22em] uppercase ml-2 text-foreground/65">
            Continue
          </p>
        </div>
        <h2 className="font-serif text-2xl sm:text-[1.85rem] md:text-3xl text-foreground leading-tight mb-9">
          Where to go next.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {pathways.map((p) => (
            <Link
              key={p.title}
              to={p.href}
              className="group relative bg-card border rounded-2xl p-6 flex flex-col gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(20,30,60,0.28)] overflow-hidden"
              style={{ borderColor: 'hsl(var(--border) / 0.55)' }}
            >
              {/* Corner bloom on hover */}
              <div
                className="absolute -top-14 -right-14 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.7)' }}
                aria-hidden
              />
              {/* Inner highlight */}
              <div
                className="absolute inset-x-0 top-0 h-px pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, transparent, hsl(0 0% 100% / 0.6), transparent)' }}
                aria-hidden
              />
              <div className="relative">
                <span className="font-sans text-[11px] font-light tracking-[0.18em] uppercase text-foreground/55">
                  {p.label}
                </span>
                <h3 className="font-serif text-lg text-foreground group-hover:text-foreground/85 transition-colors mt-1.5">
                  {p.title}
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed mt-2">
                  {p.sub}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-sans text-xs font-light text-foreground/70 group-hover:text-foreground/95 transition-colors">
                  Open <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FYPathways;
