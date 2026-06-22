import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, Hourglass, Heart } from "lucide-react";
import ivfBeforeImg from "@/assets/ivf-stage-before.jpg";
import ivfAfterImg from "@/assets/ivf-stage-after.jpg";
import ivfEarlyImg from "@/assets/ivf-stage-early.jpg";

type StageTheme = { accent: string; tint: string; icon: typeof ShieldCheck };

const stages: Array<{
  num: string;
  title: string;
  sub: string;
  emotional: string;
  href: string;
  image: string;
  theme: StageTheme;
}> = [
  {
    num: "01",
    title: "Before transfer",
    sub: "Preparation, medication, understanding your protocol, and getting ready physically and mentally.",
    emotional: "Focus and anticipation",
    href: "/ivf/before-transfer",
    image: ivfBeforeImg,
    theme: { accent: "265 32% 56%", tint: "265 32% 92%", icon: ShieldCheck },
  },
  {
    num: "02",
    title: "After transfer",
    sub: "The waiting period. Often the most uncertain stage, where questions and emotions feel heightened.",
    emotional: "Hope and uncertainty",
    href: "/ivf/after-transfer",
    image: ivfAfterImg,
    theme: { accent: "280 32% 56%", tint: "280 32% 92%", icon: Hourglass },
  },
  {
    num: "03",
    title: "Early pregnancy",
    sub: "Monitoring, early scans, and cautious progress as things begin to develop.",
    emotional: "Cautious optimism",
    href: "/ivf/early-pregnancy",
    image: ivfEarlyImg,
    theme: { accent: "300 30% 58%", tint: "300 30% 93%", icon: Heart },
  },
];

const IVFStages = () => {
  return (
    <section className="bg-parchment-dark py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-14 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6" style={{ backgroundColor: 'hsl(var(--stage-ivf-accent) / 0.3)' }} />
              <span className="font-sans text-[11px] font-light tracking-[0.2em] uppercase" style={{ color: 'hsl(var(--stage-ivf-accent))' }}>
                The process
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight">
              Stages of your IVF journey
            </h2>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-md">
              Each stage has its own medical focus, emotional texture, and set of questions. Select a stage to explore it in depth.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {stages.map((stage) => {
            const Icon = stage.theme.icon;
            return (
              <Link
                key={stage.num}
                to={stage.href}
                className="group grid grid-cols-1 md:grid-cols-[280px_1fr] border rounded-2xl overflow-hidden shadow-card-brand transition-all hover:shadow-soft hover:-translate-y-0.5 relative bg-card"
                style={{
                  borderColor: `hsl(${stage.theme.accent} / 0.22)`,
                  backgroundColor: `hsl(${stage.theme.accent} / 0.04)`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `hsl(${stage.theme.accent} / 0.42)`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = `hsl(${stage.theme.accent} / 0.22)`)}
              >
                <div className="h-56 md:h-auto overflow-hidden relative">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    loading="lazy"
                    width={640}
                    height={512}
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[600ms] ease-out"
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
                    style={{ background: `linear-gradient(180deg, transparent 0%, hsl(${stage.theme.accent} / 0.35) 100%)` }}
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm ring-1"
                      style={{
                        backgroundColor: `hsl(${stage.theme.tint} / 0.85)`,
                        color: `hsl(${stage.theme.accent})`,
                        ['--tw-ring-color' as never]: `hsl(${stage.theme.accent} / 0.45)`,
                      }}
                    >
                      <Icon size={16} strokeWidth={1.6} />
                    </div>
                    <span
                      className="font-serif text-sm px-2.5 py-1 rounded-full backdrop-blur-sm"
                      style={{
                        backgroundColor: `hsl(${stage.theme.tint} / 0.85)`,
                        color: `hsl(${stage.theme.accent})`,
                      }}
                    >
                      Stage {stage.num}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col justify-center gap-3 min-h-[200px]">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-2xl md:text-[1.65rem] text-foreground leading-snug group-hover:text-foreground/85 transition-colors">
                      {stage.title}
                    </h3>
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                      style={{ color: `hsl(${stage.theme.accent})` }}
                    />
                  </div>
                  <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-lg">
                    {stage.sub}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 font-sans text-[11px] font-light tracking-[0.12em] uppercase rounded-full px-3 py-1 self-start mt-1"
                    style={{
                      backgroundColor: `hsl(${stage.theme.accent} / 0.10)`,
                      color: `hsl(${stage.theme.accent})`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: `hsl(${stage.theme.accent})` }}
                    />
                    {stage.emotional}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

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
