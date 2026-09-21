import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

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
        <Link to="/toddler" className="group inline-flex items-center gap-3 font-serif text-2xl text-foreground">
          Continue into toddler guidance
          <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
};

export default FYPathways;
