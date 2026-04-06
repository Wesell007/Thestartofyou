import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BrandPositioningSection = () => {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-36" style={{ background: `linear-gradient(180deg, hsl(var(--parchment)) 0%, hsl(var(--parchment-dark)) 100%)` }}>
      {/* Subtle top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center relative z-10">
        {/* Decorative stage colour dots */}
        <div className="flex items-center justify-center gap-2 mb-8 md:mb-10">
          {['--stage-ttc', '--stage-ivf', '--stage-pregnancy', '--stage-postpartum', '--stage-firstyear'].map((c) => (
            <div key={c} className="w-1.5 h-1.5 rounded-full" style={{ background: `hsl(var(${c}-accent))` }} />
          ))}
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.5rem] text-foreground mb-5 md:mb-7 leading-snug">
          Guidance that grows with you
        </h2>
        <p className="font-sans text-sm sm:text-base font-light text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10 md:mb-12">
          From trying to conceive to your baby's first year — everything here is designed to support you clearly, calmly, and without overwhelm.
        </p>

        <Link
          to="/guidance"
          className="inline-flex items-center gap-2 font-sans text-sm font-light text-sage hover:text-foreground transition-all duration-200 group"
        >
          <span className="border-b border-sage/30 group-hover:border-foreground/30 pb-0.5 transition-all">
            Explore the guidance library
          </span>
          <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
};

export default BrandPositioningSection;
