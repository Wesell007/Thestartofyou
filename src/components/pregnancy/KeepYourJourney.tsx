import { Link } from "react-router-dom";
import { ArrowRight, PenLine } from "lucide-react";
import journalFlatlay from "@/assets/journal-flatlay.jpg";
import sprigImg from "@/assets/topic-wildflower-sprig.png";

const KeepYourJourney = () => {
  return (
    <section className="relative bg-parchment-dark overflow-hidden">
      {/* Top hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, hsl(var(--stage-pregnancy-accent) / 0.25), transparent)',
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div className="relative h-[280px] sm:h-[340px] md:h-auto md:min-h-[460px] overflow-hidden">
          <img
            src={journalFlatlay}
            alt="The Start of You pregnancy journal styled with natural accessories"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          {/* Soft warm vignette + edge fade into copy column */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, hsl(var(--parchment-dark) / 0.05) 0%, transparent 30%, hsl(var(--parchment-dark) / 0.15) 100%)',
            }}
          />
          <div className="absolute inset-0 shadow-[inset_-40px_0_60px_-20px_hsl(var(--parchment-dark))] hidden md:block" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center py-14 md:py-20 px-6 sm:px-8 md:px-12 lg:px-16">
          {/* Soft botanical accent */}
          <img
            src={sprigImg}
            alt=""
            aria-hidden="true"
            className="hidden md:block absolute right-6 lg:right-10 top-10 w-20 lg:w-24 opacity-40 pointer-events-none select-none"
          />

          <div className="max-w-md relative">
            <p
              className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
            >
              Keep your journey
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-foreground leading-tight mb-4">
              A quiet place to <span className="italic font-normal">keep what matters.</span>
            </h2>
            <p className="font-sans text-[15px] font-light text-muted-foreground leading-relaxed mb-7">
              Some weeks feel clear, others feel uncertain — and both are part
              of it. The Start of You journal gives you a private space to
              capture each one as it happens.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3">
              <Link
                to="/journal"
                className="inline-flex items-center gap-3 bg-terracotta text-terracotta-foreground rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Explore the journal</span>
                <ArrowRight size={15} />
              </Link>
              <span className="inline-flex items-center gap-2 self-center font-sans text-xs font-light text-muted-foreground">
                <PenLine size={12} />
                Created by parents, for parents
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KeepYourJourney;
