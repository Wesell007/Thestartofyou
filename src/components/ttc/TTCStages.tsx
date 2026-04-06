import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ttcCycleImg from "@/assets/ttc-stage-cycle.jpg";
import ttcTimingImg from "@/assets/ttc-stage-timing.jpg";
import ttcWaitingImg from "@/assets/ttc-stage-waiting.jpg";

const stages = [
  {
    num: "01",
    title: "Understanding your cycle",
    sub: "Learning how your cycle works, including ovulation and timing",
    detail: "The foundation of the TTC journey. Knowing your cycle helps reduce guesswork.",
    slug: "understanding-your-cycle",
    image: ttcCycleImg,
  },
  {
    num: "02",
    title: "Timing and tracking",
    sub: "Identifying your fertile window and recognising patterns",
    detail: "Practical tools and awareness to help you time things more intentionally.",
    slug: "timing-and-tracking",
    image: ttcTimingImg,
  },
  {
    num: "03",
    title: "Waiting and testing",
    sub: "The period after ovulation, where uncertainty is often highest",
    detail: "The hardest part for many. This stage is about patience, not perfection.",
    slug: "waiting-and-testing",
    image: ttcWaitingImg,
  },
];

const TTCStages = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <p
              className="font-sans text-[11px] font-light tracking-[0.2em] uppercase mb-4"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              The Process
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              Stages of trying to conceive
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
              Each stage has its own rhythm, its own challenges, and its own emotional landscape. Understanding where you are can make the process feel more manageable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stages.map((stage, i) => (
            <Link
              key={stage.num}
              to={`/trying-to-conceive/${stage.slug}`}
              className="group bg-card border border-border/40 rounded-2xl overflow-hidden shadow-card-brand flex flex-col transition-all hover:shadow-soft"
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
                {/* Stage number overlay */}
                <div
                  className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'hsl(var(--stage-ttc) / 0.7)' }}
                >
                  <span className="font-serif text-xs text-foreground">{stage.num}</span>
                </div>
                {/* Stage accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: 'hsl(var(--stage-ttc-accent) / 0.5)' }}
                />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <h3 className="font-serif text-lg text-foreground leading-snug group-hover:text-foreground/80 transition-colors">
                  {stage.title}
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {stage.sub}
                </p>
                <p className="font-serif italic text-sm text-foreground/50 leading-relaxed mt-auto pt-2">
                  {stage.detail}
                </p>
                <span
                  className="flex items-center gap-1.5 font-sans text-xs font-light mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: 'hsl(var(--stage-ttc-accent))' }}
                >
                  Explore stage <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TTCStages;
