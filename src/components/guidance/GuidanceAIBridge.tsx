import { Link } from "react-router-dom";
import supportImg from "@/assets/guidance-support.jpg";

const GuidanceAIBridge = () => (
  <section className="relative bg-parchment py-20 md:py-28 overflow-hidden">
    {/* Subtle gradient accent */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sage/[0.03] blur-3xl" />
    </div>

    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
      <div className="md:flex md:items-center md:gap-12 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/30 overflow-hidden shadow-soft">
        {/* Image */}
        <div className="md:w-[40%] shrink-0">
          <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
            <img
              src={supportImg}
              alt="Calm guidance and support"
              loading="lazy"
              width={640}
              height={512}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-8 sm:p-10 md:p-12 flex-1 text-center md:text-left">
          <p className="stage-label mb-4">Can't find what you need?</p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-4">
            Ask a question directly
          </h2>
          <p className="font-sans text-sm sm:text-base font-light text-muted-foreground mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
            Get calm, clear, stage-aware answers to whatever is on your mind — powered by our AI guidance system.
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
    </div>
  </section>
);

export default GuidanceAIBridge;
