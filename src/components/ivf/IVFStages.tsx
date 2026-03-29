import { Link } from "react-router-dom";
import ivfBeforeImg from "@/assets/ivf-stage-before.jpg";
import ivfAfterImg from "@/assets/ivf-stage-after.jpg";
import ivfEarlyImg from "@/assets/ivf-stage-early.jpg";

const stages = [
  {
    num: "01",
    title: "Before transfer",
    sub: "Preparation, medication, understanding your protocol, and getting ready physically and mentally",
    href: "/ivf/before-transfer",
    image: ivfBeforeImg,
  },
  {
    num: "02",
    title: "After transfer",
    sub: "The waiting period, often the most uncertain stage, where questions and emotions can feel heightened",
    href: "/ivf/after-transfer",
    image: ivfAfterImg,
  },
  {
    num: "03",
    title: "Early pregnancy",
    sub: "Monitoring, early scans, and cautious progress as things begin to develop",
    href: "/ivf/early-pregnancy",
    image: ivfEarlyImg,
  },
];

const IVFStages = () => {
  return (
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-4xl">
        <div className="mb-16">
          <p className="font-sans text-xs font-light tracking-[0.2em] uppercase text-sage-muted mb-5">
            The Process
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
            Stages of your IVF journey
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

export default IVFStages;
