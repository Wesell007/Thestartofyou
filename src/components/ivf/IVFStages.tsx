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
    sub: "The waiting period. Often the most uncertain stage, where questions and emotions can feel heightened.",
    emotional: "Hope and uncertainty",
    href: "/ivf/after-transfer",
    image: ivfAfterImg,
    featured: true,
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
    <section className="bg-parchment py-12 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                The Process
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              Stages of your IVF journey
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md">
              Each stage has its own medical focus, emotional texture, and set of questions. Select a stage to explore it in depth.
            </p>
          </div>
        </div>

        {/* Bridge rail above stages: TTC arrivals */}
        <div className="mb-6 -mt-4 flex justify-center md:justify-start">
          <Link
            to="/trying-to-conceive"
            className="inline-flex items-center gap-2 font-sans text-[11.5px] font-light text-foreground/55 hover:text-foreground transition-colors"
          >
            <span
              className="font-sans text-[10px] font-light tracking-[0.18em] uppercase"
              style={{ color: 'hsl(var(--stage-ttc-accent))' }}
            >
              Coming from TTC?
            </span>
            <span className="text-foreground/30">·</span>
            Your TTC reading still lives here
          </Link>
        </div>


        {/* Stage cards — vertical with connecting line */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-[28px] md:left-[100px] top-0 bottom-0 w-px hidden md:block"
            style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.12)' }}
          />

          <div className="space-y-4">
            {stages.map((stage) => (
              <Link
                key={stage.num}
                to={stage.href}
                className={`group grid grid-cols-1 md:grid-cols-[200px_1fr] border rounded-2xl overflow-hidden shadow-card-brand transition-all hover:shadow-soft relative ${stage.featured ? '' : 'bg-card border-border/50'}`}
                style={stage.featured ? {
                  backgroundColor: 'hsl(var(--stage-ivf) / 0.1)',
                  borderColor: 'hsl(var(--stage-ivf-accent) / 0.2)',
                } : undefined}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'hsl(var(--stage-ivf-accent) / 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = stage.featured ? 'hsl(var(--stage-ivf-accent) / 0.2)' : ''}
              >
                {/* Image */}
                <div className="h-40 md:h-auto overflow-hidden relative">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    loading="lazy"
                    width={640}
                    height={512}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
                      style={{ backgroundColor: 'hsl(var(--stage-ivf) / 0.6)' }}
                    >
                      <span className="font-serif text-sm text-foreground select-none">{stage.num}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-center gap-2.5">
                  <div className="flex items-center gap-3">
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
                  <span
                    className="inline-flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.1em] uppercase rounded-full px-3 py-1 self-start mt-1"
                    style={{
                      backgroundColor: 'hsl(var(--stage-ivf) / 0.2)',
                      color: 'hsl(var(--stage-ivf-accent))',
                    }}
                  >
                    {stage.emotional}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bridge rail below stages: forward handover from Early pregnancy → /pregnancy */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/pregnancy"
            className="group inline-flex items-center gap-2 rounded-pill border bg-card px-5 py-2.5 font-sans text-[12.5px] font-light text-foreground/75 hover:text-foreground transition-colors"
            style={{ borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.25)' }}
          >
            <span
              className="font-sans text-[10px] font-light tracking-[0.18em] uppercase"
              style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
            >
              After early pregnancy
            </span>
            <span className="hidden sm:inline text-foreground/40">·</span>
            Handover into pregnancy care
            <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IVFStages;
