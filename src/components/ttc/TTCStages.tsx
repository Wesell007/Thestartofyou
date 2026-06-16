import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ttcCycleImg from "@/assets/ttc-stage-cycle.jpg";
import ttcTimingImg from "@/assets/ttc-stage-timing.jpg";
import ttcWaitingImg from "@/assets/ttc-stage-waiting.jpg";

const stages = [
  {
    num: "01",
    title: "Understanding your cycle",
    sub: "How your cycle works, what ovulation means, and why it matters",
    emotion: "Curiosity and learning",
    slug: "understanding-your-cycle",
    image: ttcCycleImg,
  },
  {
    num: "02",
    title: "Timing and tracking",
    sub: "Identifying your fertile window and recognising the signs",
    emotion: "Focus and intention",
    slug: "timing-and-tracking",
    image: ttcTimingImg,
  },
  {
    num: "03",
    title: "Waiting and testing",
    sub: "The period after ovulation, where patience is tested most",
    emotion: "Hope and uncertainty",
    slug: "waiting-and-testing",
    image: ttcWaitingImg,
  },
];

const TTCStages = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-10">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              The Process
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              Three stages of trying
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Each stage has its own emotional landscape. Understanding where you are makes the process feel less overwhelming.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stages.map((stage) => (
            <Link
              key={stage.num}
              to={`/trying-to-conceive/${stage.slug}`}
              className="group bg-card border border-border/40 rounded-2xl overflow-hidden flex flex-col transition-all hover:shadow-card-brand"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ttc-accent) / 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
            >
              <div className="h-44 sm:h-48 overflow-hidden relative">
                <img
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                  width={640}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Number + gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="font-serif text-2xl text-white/90 leading-none">{stage.num}</span>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.6)' }}
                />
              </div>
              <div className="p-6 flex flex-col gap-2.5 flex-1">
                <h3 className="font-serif text-lg text-foreground leading-snug group-hover:text-foreground/80 transition-colors">
                  {stage.title}
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {stage.sub}
                </p>
                {/* Emotional marker */}
                <div
                  className="mt-auto pt-3 flex items-center gap-2"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.5)' }}
                  />
                  <span
                    className="font-sans text-[10px] font-light tracking-[0.1em] uppercase"
                    style={{ color: 'hsl(var(--stage-ttc-accent) / 0.7)' }}
                  >
                    {stage.emotion}
                  </span>
                </div>
                <span
                  className="flex items-center gap-1.5 font-sans text-xs font-light mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                >
                  Begin this stage <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* IVF bridge surfacing intentionally lives only in the final CTA
            below and in the fertility/ivf-and-treatment topic tile, to avoid
            stacking two rails on the same hub. */}
      </div>
    </section>
  );
};

export default TTCStages;
