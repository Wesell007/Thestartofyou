import { Link } from "react-router-dom";

const GuidanceAIBridge = () => (
  <section className="relative bg-parchment py-24 md:py-32 overflow-hidden">
    {/* Subtle gradient accent */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sage/[0.03] blur-3xl" />
    </div>

    <div className="container mx-auto px-6 md:px-10 max-w-3xl text-center relative z-10">
      <div className="frame-corner inline-block px-12 py-10 md:px-16 md:py-14">
        <p className="stage-label mb-5">Can't find what you need?</p>
        <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
          Ask a question directly
        </h2>
        <p className="font-sans text-base font-light text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
          Get calm, clear, stage-aware answers to whatever is on your mind.
        </p>
        <Link
          to="/ask"
          className="inline-flex items-center gap-2 bg-sage text-white px-8 py-3.5 rounded-full font-sans text-sm hover:bg-sage-dark transition-colors shadow-sm"
        >
          Ask a question
          <span>→</span>
        </Link>
      </div>
    </div>
  </section>
);

export default GuidanceAIBridge;
