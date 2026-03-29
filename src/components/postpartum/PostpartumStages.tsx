import { Link } from "react-router-dom";
import ppEarlyDaysImg from "@/assets/postpartum-stage-early-days.jpg";
import ppEarlyWeeksImg from "@/assets/postpartum-stage-early-weeks.jpg";
import ppAdjustmentImg from "@/assets/postpartum-stage-adjustment.jpg";

const stages = [
  {
    num: "01",
    title: "Early days",
    range: "Week 1-2",
    sub: "Recovery, feeding, sleep disruption, and immediate adjustment",
    href: "/postpartum/early-days",
    image: ppEarlyDaysImg,
  },
  {
    num: "02",
    title: "Early weeks",
    range: "Week 3-6",
    sub: "Gradual healing, emotional shifts, and small routines beginning to form",
    href: "/postpartum/early-weeks",
    image: ppEarlyWeeksImg,
  },
  {
    num: "03",
    title: "Ongoing adjustment",
    range: "Week 7-12",
    sub: "Building rhythm, confidence, and adapting to a new normal",
    href: "/postpartum/ongoing-adjustment",
    image: ppAdjustmentImg,
  },
];

const PostpartumStages = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            The Process
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
            Stages of postpartum
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stages.map((stage) => (
            <Link
              key={stage.num}
              to={stage.href}
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
                <div>
                  <h3 className="font-serif text-xl text-foreground leading-snug mb-1 group-hover:text-sage transition-colors">
                    {stage.title}
                  </h3>
                  <p className="font-sans text-xs font-light tracking-[0.1em] text-sage-muted">
                    {stage.range}
                  </p>
                </div>
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

export default PostpartumStages;
