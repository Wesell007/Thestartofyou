import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import ttcCycleImg from "@/assets/ttc-stage-cycle.jpg";
import ttcTimingImg from "@/assets/ttc-stage-timing.jpg";
import ttcWaitingImg from "@/assets/ttc-stage-waiting.jpg";
import sprigImg from "@/assets/topic-mini-sprig.png";
import wildflowerImg from "@/assets/topic-wildflower-sprig.png";

interface ChildLink {
  label: string;
  href: string;
}

interface Stage {
  num: string;
  title: string;
  sub: string;
  emotion: string;
  slug: string;
  image: string;
  accentHsl: string;
  sprig: "leaf" | "wildflower";
  sprigRotate: number;
  children: ChildLink[];
}

const stages: Stage[] = [
  {
    num: "01",
    title: "Understanding your cycle",
    sub: "How your cycle works, what ovulation means, and why it matters.",
    emotion: "Curiosity and learning",
    slug: "understanding-your-cycle",
    image: ttcCycleImg,
    accentHsl: "150 24% 40%",
    sprig: "leaf",
    sprigRotate: -10,
    children: [
      { label: "Cycle tracking", href: "/trying-to-conceive/cycle-tracking" },
      { label: "Age and fertility", href: "/trying-to-conceive/age-and-fertility" },
    ],
  },
  {
    num: "02",
    title: "Timing and tracking",
    sub: "Finding your fertile window and recognising the signs that matter.",
    emotion: "Focus and intention",
    slug: "timing-and-tracking",
    image: ttcTimingImg,
    accentHsl: "140 22% 36%",
    sprig: "wildflower",
    sprigRotate: 14,
    children: [
      { label: "Ovulation", href: "/trying-to-conceive/ovulation" },
      { label: "Preconception health", href: "/trying-to-conceive/preconception-health" },
    ],
  },
  {
    num: "03",
    title: "Waiting and testing",
    sub: "The period after ovulation, when patience is tested most.",
    emotion: "Hope and uncertainty",
    slug: "waiting-and-testing",
    image: ttcWaitingImg,
    accentHsl: "175 20% 34%",
    sprig: "leaf",
    sprigRotate: 18,
    children: [
      { label: "Two-week wait", href: "/trying-to-conceive/two-week-wait" },
      { label: "Pregnancy tests", href: "/trying-to-conceive/pregnancy-tests" },
    ],
  },
];

const TTCStages = () => {
  return (
    <section className="bg-parchment py-16 md:py-24">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="text-center mb-10 md:mb-12">
          <p
            className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3"
            style={{ color: 'hsl(var(--stage-ttc-accent))' }}
          >
            The TTC Guide
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-3 leading-tight">
            Three stages of <span className="italic font-normal">trying</span>
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-md mx-auto">
            Each stage has its own rhythm. Choose where you are. There is no
            wrong place to begin.
          </p>
          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-16"
            style={{
              background:
                'linear-gradient(90deg, transparent, hsl(var(--stage-ttc-accent) / 0.5), transparent)',
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {stages.map((stage) => {
            const accent = `hsl(${stage.accentHsl})`;
            const accentSoft = `hsl(${stage.accentHsl} / 0.10)`;
            const accentBorder = `hsl(${stage.accentHsl} / 0.20)`;
            const SprigSrc = stage.sprig === "leaf" ? sprigImg : wildflowerImg;
            return (
              <article
                key={stage.num}
                className="group relative bg-card rounded-2xl overflow-hidden flex flex-col border transition-all hover:-translate-y-1"
                style={{
                  borderColor: accentBorder,
                  boxShadow: `0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 16px 38px -28px hsl(${stage.accentHsl} / 0.35)`,
                }}
              >
                <div className="relative h-44 sm:h-48 overflow-hidden">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    loading="lazy"
                    width={640}
                    height={512}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/35 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-block rounded-full px-3 py-1 font-sans text-[10px] font-light tracking-[0.22em] uppercase backdrop-blur-sm"
                      style={{
                        backgroundColor: 'hsl(var(--parchment) / 0.88)',
                        color: accent,
                      }}
                    >
                      Stage {stage.num}
                    </span>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: `hsl(${stage.accentHsl} / 0.55)` }}
                  />
                </div>

                <div className="relative p-6 flex flex-col gap-3 flex-1">
                  <img
                    src={SprigSrc}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -top-2 right-3 w-12 opacity-35"
                    style={{ transform: `rotate(${stage.sprigRotate}deg)` }}
                  />

                  <h3 className="font-serif text-[1.2rem] text-foreground leading-snug">
                    <Link
                      to={`/trying-to-conceive/${stage.slug}`}
                      className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                    >
                      {stage.title}
                    </Link>
                  </h3>
                  <p className="font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed">
                    {stage.sub}
                  </p>

                  <ul className="mt-1 flex flex-col">
                    {stage.children.map((c) => (
                      <li
                        key={c.href}
                        className="border-t first:border-t-0"
                        style={{ borderColor: accentSoft }}
                      >
                        <Link
                          to={c.href}
                          className="group/link flex min-h-11 items-center gap-2 py-2.5"
                        >
                          <span className="flex-1 font-sans text-[12.5px] font-light text-foreground/80 group-hover/link:text-foreground transition-colors">
                            {c.label}
                          </span>
                          <ChevronRight
                            size={12}
                            className="shrink-0 opacity-55 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all"
                            style={{ color: accent }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: `hsl(${stage.accentHsl} / 0.6)` }}
                      />
                      <span
                        className="font-sans text-[10px] font-light tracking-[0.1em] uppercase truncate"
                        style={{ color: `hsl(${stage.accentHsl} / 0.85)` }}
                      >
                        {stage.emotion}
                      </span>
                    </div>
                    <Link
                      to={`/trying-to-conceive/${stage.slug}`}
                      aria-label={`Explore ${stage.title}`}
                      className="inline-flex min-h-11 items-center gap-1 font-sans text-[12px] font-medium shrink-0"
                      style={{ color: accent }}
                    >
                      Explore stage
                      <ArrowRight
                        size={12}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TTCStages;
