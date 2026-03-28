import { Link } from "react-router-dom";
import ttcCycleImg from "@/assets/ttc-stage-cycle.jpg";
import ttcTimingImg from "@/assets/ttc-stage-timing.jpg";
import ttcWaitingImg from "@/assets/ttc-stage-waiting.jpg";

const stages = [
  {
    num: "01",
    title: "Understanding your cycle",
    sub: "Learning how your cycle works, including ovulation and timing",
    slug: "understanding-your-cycle",
    image: ttcCycleImg,
  },
  {
    num: "02",
    title: "Timing and tracking",
    sub: "Identifying your fertile window and recognising patterns",
    slug: "timing-and-tracking",
    image: ttcTimingImg,
  },
  {
    num: "03",
    title: "Waiting and testing",
    sub: "The period after ovulation, where uncertainty is often highest",
    slug: "waiting-and-testing",
    image: ttcWaitingImg,
  },
];

const TTCStages = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            The Process
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
            Stages of trying to conceive
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stages.map((stage) => (
            <Link
              key={stage.num}
              to={`/trying-to-conceive/${stage.slug}`}
              className="group bg-card border border-border/50 rounded-lg overflow-hidden shadow-card-brand flex flex-col hover:border-sage/40 hover:shadow-soft transition-all"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                  width={640}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7 flex flex-col gap-4 flex-1">
                <span className="font-sans text-xs font-light tracking-[0.15em] uppercase text-sage-muted">
                  {stage.num}
                </span>
                <h3 className="font-serif text-xl text-foreground leading-snug group-hover:text-sage transition-colors">
                  {stage.title}
                </h3>
                <p className="font-serif italic text-base text-foreground/60 leading-relaxed">
                  {stage.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TTCStages;
