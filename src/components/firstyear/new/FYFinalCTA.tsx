import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const FYFinalCTA = () => {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        backgroundImage:
          'linear-gradient(to right, hsl(var(--stage-firstyear) / 0.45), hsl(var(--stage-recovery) / 0.4))',
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl relative z-10 text-center">
        <div className="flex items-center justify-center gap-1.5 mb-6">
          <span className="h-0.5 w-10 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-firstyear-accent) / 0.7)' }} />
          <span className="h-0.5 w-10 rounded-full" style={{ backgroundColor: 'hsl(var(--stage-recovery-accent) / 0.7)' }} />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-4">
          Two tracks. One year. Start anywhere.
        </h2>
        <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
          You don't have to choose between learning about your baby and looking after yourself. Pick the door that feels right today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="#baby"
            className="inline-flex items-center gap-2 rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium transition-all hover:opacity-90 w-full sm:w-auto justify-center"
            style={{ backgroundColor: 'hsl(var(--stage-firstyear-deep))', color: 'hsl(var(--card))' }}
          >
            Enter baby track <ArrowUpRight size={14} />
          </Link>
          <Link
            to="#recovery"
            className="inline-flex items-center gap-2 rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium transition-all hover:opacity-90 w-full sm:w-auto justify-center"
            style={{ backgroundColor: 'hsl(var(--stage-recovery-deep))', color: 'hsl(var(--card))' }}
          >
            Enter recovery track <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FYFinalCTA;
