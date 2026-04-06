import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ivfBeforeImg from "@/assets/ivf-stage-before.jpg";
import ivfAfterImg from "@/assets/ivf-stage-after.jpg";
import ivfEarlyImg from "@/assets/ivf-stage-early.jpg";

const stages = [
  {
    num: "01",
    title: "Before transfer",
    sub: "Preparation, medication, understanding your protocol, and getting ready physically and mentally.",
    emotional: "Focus and anticipation",
    href: "/ivf/before-transfer",
    image: ivfBeforeImg,
  },
  {
    num: "02",
    title: "After transfer",
    sub: "The waiting period, often the most uncertain stage, where questions and emotions can feel heightened.",
    emotional: "Hope and uncertainty",
    href: "/ivf/after-transfer",
    image: ivfAfterImg,
  },
  {
    num: "03",
    title: "Early pregnancy",
    sub: "Monitoring, early scans, and cautious progress as things begin to develop.",
    emotional: "Cautious optimism",
    href: "/ivf/early-pregnancy",
    image: ivfEarlyImg,
  },
];

const IVFStages = () => {
  return (
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-14 mb-14">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span
                className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
                style={{ color: 'hsl(var(--stage-ivf-accent))' }}
              >
                The Process
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              Stages of your IVF journey
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md">
              IVF follows a structured path with distinct phases. Each stage has its own medical focus, emotional texture, and set of questions.
            </p>
          </div>
        </div>

        {/* Stage cards */}
        <div className="space-y-5">
          {stages.map((stage, i) => (
            <Link
              key={stage.num}
              to={stage.href}
              className="group grid grid-cols-1 md:grid-cols-[200px_1fr] bg-card border border-border/50 rounded-2xl overflow-hidden shadow-card-brand transition-all hover:shadow-soft"
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ivf-accent) / 0.4)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
            >
              {/* Image */}
              <div className="h-44 md:h-auto overflow-hidden relative">
                <img
                  src={stage.image}
                  alt={stage.title}
                  loading="lazy"
                  width={640}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Stage number overlay */}
                <div className="absolute top-4 left-4">
                  <span
                    className="font-serif text-2xl select-none"
                    style={{ color: 'hsl(var(--stage-ivf-accent) / 0.6)' }}
                  >
                    {stage.num}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-center gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-snug group-hover:text-foreground/80 transition-colors">
                    {stage.title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    style={{ color: 'hsl(var(--stage-ivf-accent))' }}
                  />
                </div>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-lg">
                  {stage.sub}
                </p>
                {/* Emotional marker */}
                <div className="mt-2">
                  <span
                    className="inline-flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.1em] uppercase rounded-full px-3 py-1"
                    style={{
                      backgroundColor: 'hsl(var(--stage-ivf) / 0.25)',
                      color: 'hsl(var(--stage-ivf-accent))',
                    }}
                  >
                    {stage.emotional}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IVFStages;
