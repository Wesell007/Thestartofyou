import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AIReassuranceSection = () => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32" style={{ background: `linear-gradient(135deg, hsl(var(--stage-ivf)) 0%, hsl(var(--lavender-bg)) 50%, hsl(var(--stage-support)) 100%)` }}>
      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-14 h-14 border-t border-l pointer-events-none rounded-tl-sm hidden sm:block" style={{ borderColor: `hsl(var(--lavender) / 0.3)` }} />
      <div className="absolute bottom-8 right-8 w-14 h-14 border-b border-r pointer-events-none rounded-br-sm hidden sm:block" style={{ borderColor: `hsl(var(--lavender) / 0.3)` }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] glow-lavender" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center relative z-10">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `hsl(var(--lavender) / 0.2)` }}>
          <MessageCircle size={22} style={{ color: `hsl(var(--lavender-foreground) / 0.6)` }} />
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.5rem] text-lavender-foreground mb-5 md:mb-7 leading-snug">
          Not sure where to start?
        </h2>
        <p className="font-sans text-sm sm:text-base font-light mb-10 md:mb-12 max-w-md mx-auto leading-relaxed" style={{ color: `hsl(var(--lavender-foreground) / 0.6)` }}>
          Ask anything — about symptoms, timing, feelings, or what to expect next. Private, calm, and judgement-free.
        </p>

        <Link
          to="/ask"
          className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
        >
          Ask now
          <ArrowRight size={14} />
        </Link>

        <p className="font-sans text-xs font-light mt-6" style={{ color: `hsl(var(--lavender-foreground) / 0.35)` }}>
          No sign-in required · Calm, private guidance
        </p>
      </div>
    </section>
  );
};

export default AIReassuranceSection;
