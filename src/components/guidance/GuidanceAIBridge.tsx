import { Link } from "react-router-dom";
import supportImg from "@/assets/guidance-support.jpg";

const GuidanceAIBridge = () => (
  <section className="relative bg-foreground overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img
        src={supportImg}
        alt=""
        loading="lazy"
        width={640}
        height={512}
        className="w-full h-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/70" />
    </div>

    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10 py-16 sm:py-20 md:py-24">
      <div className="max-w-lg mx-auto text-center md:text-left md:mx-0">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-sage-light/60 mb-4">
          Can't find what you need?
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl text-white leading-tight mb-4">
          Ask a question directly
        </h2>
        <p className="font-sans text-sm font-light text-white/50 mb-8 max-w-md mx-auto md:mx-0 leading-relaxed">
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
  </section>
);

export default GuidanceAIBridge;
