import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FYStartFirstYearCTA from "./FYStartFirstYearCTA";

const FYFinalCTA = () => {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24"
      style={{
        backgroundImage:
          'linear-gradient(120deg, hsl(var(--stage-firstyear) / 0.55) 0%, hsl(var(--stage-firstyear) / 0.22) 45%, hsl(var(--stage-recovery) / 0.24) 55%, hsl(var(--stage-recovery) / 0.5) 100%)',
      }}
    >
      {/* Ambient blooms */}
      <div
        className="absolute -top-24 -left-16 w-72 h-72 rounded-full blur-3xl opacity-50 pointer-events-none"
        style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.6)' }}
        aria-hidden
      />
      <div
        className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full blur-3xl opacity-45 pointer-events-none"
        style={{ backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.55)' }}
        aria-hidden
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl relative z-10 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-6">
          <span className="h-0.5 w-10 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.65)' }} />
          <span className="h-0.5 w-10 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.65)' }} />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.5rem] text-foreground leading-[1.08] mb-5">
          Start wherever feels right today.
        </h2>
        <p className="font-sans text-[15px] md:text-base font-light text-muted-foreground leading-relaxed mb-9 max-w-lg mx-auto">
          You don't have to choose between learning about your baby and looking after yourself.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#baby-topics"
            onClick={(e) => {
              const el = document.getElementById("baby-topics");
              if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="inline-flex items-center gap-2 rounded-pill px-8 py-4 font-sans text-[13px] font-medium tracking-wide transition-all duration-300 hover:-translate-y-[1px] w-full sm:w-auto justify-center"
            style={{
              backgroundColor: 'hsl(var(--stage-firstyear-deep))',
              color: 'hsl(var(--card))',
              boxShadow:
                'inset 0 1px 0 hsl(0 0% 100% / 0.14), 0 14px 34px -18px hsl(212 36% 20% / 0.55)',
            }}
          >
            Baby's first year <ArrowUpRight size={14} />
          </a>
          <Link
            to="/first-year/postpartum-recovery"
            className="inline-flex items-center gap-2 rounded-pill px-8 py-4 font-sans text-[13px] font-medium tracking-wide transition-all duration-300 hover:-translate-y-[1px] w-full sm:w-auto justify-center"
            style={{
              backgroundColor: 'hsl(var(--stage-recovery-deep))',
              color: 'hsl(var(--card))',
              boxShadow:
                'inset 0 1px 0 hsl(0 0% 100% / 0.14), 0 14px 34px -18px hsl(320 28% 20% / 0.5)',
            }}
          >
            Your recovery <ArrowUpRight size={14} />
          </Link>
        </div>

        <FYStartFirstYearCTA variant="final" />

      </div>
    </section>
  );
};

export default FYFinalCTA;
