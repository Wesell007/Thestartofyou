import { ArrowRight } from "lucide-react";

const AIReassuranceSection = () => {
  return (
    <section className="bg-lavender-bg py-20 md:py-24 relative overflow-hidden">
      {/* Soft corner marks */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-lavender/50 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-lavender/50 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center relative z-10">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-lavender-foreground mb-5 leading-snug">
          Not sure where to start?
        </h2>
        <p className="font-sans text-base font-light text-lavender-foreground/70 mb-10 max-w-md mx-auto leading-relaxed">
          You can ask anything — whether it's about symptoms, timing, or what to expect next.
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
        >
          Ask your question
          <ArrowRight size={14} />
        </a>

        <p className="font-sans text-xs font-light text-lavender-foreground/50 mt-5">
          No sign-in required · Calm, private guidance
        </p>
      </div>
    </section>
  );
};

export default AIReassuranceSection;
