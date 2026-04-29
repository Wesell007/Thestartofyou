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
    <section className="bg-parchment py-12 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {trimesters.map((t) => (
            <Link
              key={t.label}
              to={t.href}
              className="group bg-card border border-border/40 rounded-2xl overflow-hidden shadow-card-brand flex flex-col hover:shadow-soft hover:border-border/70 transition-all duration-300"
            >
              <div className="h-44 sm:h-48 md:h-52 overflow-hidden relative">
                <img
                  src={t.image}
                  alt={t.label}
                  loading="lazy"
                  width={640}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col gap-2 flex-1">
                <span
                  className="font-sans text-[11px] font-light tracking-[0.18em] uppercase"
                  style={{ color: `hsl(var(${t.accentVar}))` }}
                >
                  {t.range}
                </span>
                <h3 className="font-serif text-xl text-foreground">
                  {t.label}
                </h3>
                <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
                <span
                  className="mt-2 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium"
                  style={{ color: 'hsl(var(--terracotta))' }}
                >
                  {t.cta} →
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
