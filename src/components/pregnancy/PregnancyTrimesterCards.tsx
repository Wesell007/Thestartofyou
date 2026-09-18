import { Link } from "react-router-dom";
import trimesterFirstImg from "@/assets/trimester-first.jpg";
import trimesterSecondImg from "@/assets/trimester-second.jpg";
import trimesterThirdImg from "@/assets/trimester-third.jpg";

const trimesters = [
  {
    label: "First Trimester",
    range: "Weeks 1 – 12",
    desc: "Big changes begin. Learn what to expect and how to support your body and mind.",
    href: "/pregnancy/first-trimester",
    cta: "Explore weeks 1–12",
    image: trimesterFirstImg,
    accentVar: "--stage-ttc-accent",
  },
  {
    label: "Second Trimester",
    range: "Weeks 13 – 27",
    desc: "Energy returns and your bump grows quickly. Find guidance for this transformational stage.",
    href: "/pregnancy/second-trimester",
    cta: "Explore weeks 13–27",
    image: trimesterSecondImg,
    accentVar: "--stage-pregnancy-accent",
  },
  {
    label: "Third Trimester",
    range: "Weeks 28 – 42",
    desc: "Preparing for birth and life with your baby. You're almost there.",
    href: "/pregnancy/third-trimester",
    cta: "Explore weeks 28–42",
    image: trimesterThirdImg,
    accentVar: "--stage-ivf-accent",
  },
];

const PregnancyTrimesterCards = () => {
  return (
    <section className="bg-parchment pb-10 pt-12 md:pb-14 md:pt-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Soft section header */}
        <div className="text-center mb-8 md:mb-9">
          <p
            className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3"
            style={{ color: 'hsl(var(--stage-pregnancy-accent))' }}
          >
            Three chapters of pregnancy
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground leading-tight">
            Choose your <span className="italic font-normal">trimester</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
          {trimesters.map((t) => (
            <Link
              key={t.label}
              to={t.href}
              className="group relative grid grid-cols-[7.5rem_1fr] overflow-hidden rounded-xl border bg-card transition-all duration-500 hover:-translate-y-0.5 md:flex md:flex-col"
              style={{
                borderColor: `hsl(var(${t.accentVar}) / 0.18)`,
                boxShadow:
                  '0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 16px 44px -28px hsl(var(--stage-pregnancy-accent) / 0.32)',
              }}
            >
              <div className="relative min-h-36 overflow-hidden md:h-36 md:min-h-0">
                <img
                  src={t.image}
                  alt={t.label}
                  loading="lazy"
                  width={640}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
                {/* Soft top vignette + bottom warm fade */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, hsl(var(--parchment) / 0.15) 0%, transparent 35%, hsl(var(--parchment) / 0.55) 100%)',
                  }}
                />
                {/* Floating range chip */}
                <span
                  className="absolute left-3 top-3 inline-flex items-center rounded-full px-2.5 py-1 font-sans text-[10px] font-light uppercase backdrop-blur-sm"
                  style={{
                    backgroundColor: 'hsl(var(--parchment) / 0.85)',
                    color: `hsl(var(${t.accentVar}))`,
                  }}
                >
                  {t.range}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                <h3 className="font-serif text-xl text-foreground leading-tight">
                  {t.label}
                </h3>
                <p className="font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
                <span
                  className="mt-auto inline-flex items-center gap-1.5 pt-1 font-sans text-[12.5px] font-medium group-hover:gap-2 transition-all"
                  style={{ color: 'hsl(var(--terracotta))' }}
                >
                  {t.cta} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PregnancyTrimesterCards;
