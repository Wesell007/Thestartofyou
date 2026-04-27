import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const ThirdTriNextStage = () => {
  return (
    <section className="page-ending frame-corner">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
        <p className="stage-label mb-4">Continue</p>
        <h2 className="font-serif text-[2rem] sm:text-[2.5rem] md:text-[2.85rem] text-foreground mb-5 leading-[1.1]">
          Getting close now
        </h2>
        <p className="font-sans text-[15px] sm:text-[16px] font-light text-muted-foreground leading-relaxed mb-10 max-w-md mx-auto">
          The final weeks bring labour, birth, and the early days of meeting your baby
          into view. Move at your own pace, the next stage is waiting when you are.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-3.5 max-w-sm sm:max-w-none mx-auto">
          <Link
            to="/preparing-for-baby"
            className="flex items-center justify-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            Explore labour guidance
            <ArrowUpRight size={16} />
          </Link>
          <Link
            to="/pregnancy"
            className="flex items-center justify-center gap-2 border border-foreground/20 text-foreground rounded-pill px-8 py-3.5 font-sans text-sm font-light hover:bg-parchment-dark transition-all"
          >
            Back to Pregnancy Hub
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThirdTriNextStage;
