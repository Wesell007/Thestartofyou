import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AIReassuranceSection = () => {
  return (
    <section className="relative bg-lavender-bg section-spacing overflow-hidden">
      {/* Corner accents */}
      <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-lavender/30 pointer-events-none rounded-tl-sm" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-b border-r border-lavender/30 pointer-events-none rounded-br-sm" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-lavender" />

      <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center relative z-10">
        <div className="editorial-rule mb-8" style={{ background: 'hsl(var(--lavender))' }} />
        <p className="stage-label mb-5" style={{ color: 'hsl(var(--lavender-foreground) / 0.5)' }}>AI Support</p>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-lavender-foreground mb-7 leading-snug">
          Not sure where to start?
        </h2>
        <p className="font-sans text-base font-light text-lavender-foreground/65 mb-14 max-w-md mx-auto leading-relaxed">
          You can ask anything, whether it's about symptoms, timing, or what to expect next.
        </p>

        <Link
          to="/ask"
          className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
        >
          Ask now
          <ArrowRight size={14} />
        </Link>

        <p className="font-sans text-xs font-light text-lavender-foreground/40 mt-7">
          No sign-in required · Calm, private guidance
        </p>
      </div>
    </section>
  );
};

export default AIReassuranceSection;
