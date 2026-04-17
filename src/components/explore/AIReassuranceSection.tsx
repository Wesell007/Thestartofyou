import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const AIReassuranceSection = () => {
  return (
    <section className="relative bg-[hsl(271_18%_90%)] overflow-hidden">
      {/* Frame corners — hidden on mobile */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l pointer-events-none hidden md:block" style={{ borderColor: `hsl(var(--lavender-foreground) / 0.18)` }} />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r pointer-events-none hidden md:block" style={{ borderColor: `hsl(var(--lavender-foreground) / 0.18)` }} />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl py-16 sm:py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left: content */}
          <div className="text-center md:text-left">
            <div
              className="w-12 h-12 rounded-xl mx-auto md:mx-0 mb-5 flex items-center justify-center"
              style={{ backgroundColor: `hsl(var(--lavender-foreground) / 0.08)` }}
            >
              <MessageCircle size={20} style={{ color: `hsl(var(--lavender-foreground) / 0.85)` }} />
            </div>

            <p className="font-sans text-[10.5px] font-medium tracking-[0.25em] uppercase text-lavender-foreground/60 mb-3">
              AI guidance
            </p>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-lavender-foreground mb-4 leading-snug">
              Not sure where to start?
            </h2>
            <p className="font-sans text-sm sm:text-[15px] font-light mb-8 max-w-md mx-auto md:mx-0 leading-relaxed text-lavender-foreground/75">
              Ask anything — about symptoms, timing, feelings, or what to expect. Private, calm, and judgement-free.
            </p>

            <Link
              to="/ask"
              className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
            >
              Ask now
              <ArrowRight size={14} />
            </Link>

            <p className="font-sans text-xs font-light mt-5 text-lavender-foreground/55">
              No sign-in required · Calm, private guidance
            </p>
          </div>

          {/* Right: example questions */}
          <div className="hidden md:flex flex-col gap-3">
            {[
              "Is what I'm feeling normal at 8 weeks?",
              "When should I take a pregnancy test?",
              "How do I know if I'm ovulating?",
              "What should I expect after birth?",
            ].map((q) => (
              <Link
                key={q}
                to={`/ask?q=${encodeURIComponent(q)}`}
                className="group flex items-center gap-3 rounded-xl px-5 py-4 border bg-white/55 backdrop-blur-sm border-lavender-foreground/10 hover:bg-white/75 hover:border-lavender-foreground/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="font-sans text-[14px] font-light text-lavender-foreground/85 flex-1">{q}</span>
                <ArrowRight size={13} className="text-lavender-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIReassuranceSection;
