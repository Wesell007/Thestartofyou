import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import nauseaImg from "@/assets/article-nausea.jpg";
import fatigueImg from "@/assets/article-fatigue.jpg";
import implantationImg from "@/assets/article-implantation.jpg";

const articles = [
  {
    tag: "Pregnancy",
    title: "Nausea in early pregnancy",
    desc: "Why it happens, when it peaks, and what you can realistically do.",
    href: "/articles/nausea-in-early-pregnancy",
    image: nauseaImg,
    stageAccent: "--stage-pregnancy-accent",
  },
  {
    tag: "First trimester",
    title: "Fatigue in early pregnancy",
    desc: "Extreme tiredness is one of the most underestimated symptoms.",
    href: "/articles/fatigue-in-early-pregnancy",
    image: fatigueImg,
    stageAccent: "--stage-pregnancy-accent",
  },
  {
    tag: "Trying to conceive",
    title: "Implantation bleeding explained",
    desc: "What it is, what it looks like, and how it differs from a period.",
    href: "/articles/implantation-bleeding",
    image: implantationImg,
    stageAccent: "--stage-ttc-accent",
  },
];

const GuidanceSection = () => {
  return (
    <section className="relative bg-parchment py-16 sm:py-20 md:py-28 overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] glow-sage" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <div className="editorial-rule-left mb-4" />
            <h2 className="font-serif text-xl sm:text-2xl md:text-[2.25rem] text-foreground mb-2 leading-tight">
              Guidance & answers
            </h2>
            <p className="font-sans text-sm font-light text-muted-foreground max-w-sm leading-relaxed">
              Evidence-based, editorially crafted, written for real life.
            </p>
          </div>
          <Link
            to="/guidance"
            className="hidden sm:inline-flex items-center gap-2 font-sans text-xs font-medium text-sage hover:text-foreground transition-all group shrink-0"
          >
            Browse all
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Featured article (first) + 2 smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
          {/* Featured article — larger */}
          <Link
            to={articles[0].href}
            className="group flex flex-col rounded-2xl overflow-hidden border border-border/20 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-500 lg:row-span-2"
            style={{ backgroundColor: `hsl(var(${articles[0].stageAccent}) / 0.05)` }}
          >
            <div className="aspect-[16/10] lg:aspect-[4/3] overflow-hidden relative">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px]"
                style={{ background: `hsl(var(${articles[0].stageAccent}))` }}
              />
            </div>
            <div className="p-6 sm:p-7 flex flex-col flex-1">
              <span
                className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-3"
                style={{ color: `hsl(var(${articles[0].stageAccent}))` }}
              >
                {articles[0].tag}
              </span>
              <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug mb-3 group-hover:text-sage transition-colors duration-300">
                {articles[0].title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed flex-1 mb-5">
                {articles[0].desc}
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-light text-sage group-hover:gap-3 transition-all duration-300">
                Read more <ArrowRight size={11} />
              </span>
            </div>
          </Link>

          {/* Two smaller stacked articles */}
          <div className="flex flex-col gap-4 md:gap-5">
            {articles.slice(1).map((a) => (
              <Link
                key={a.title}
                to={a.href}
                className="group flex flex-row gap-4 sm:gap-5 rounded-2xl overflow-hidden border border-border/20 bg-card/90 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-500 p-4 sm:p-5"
              >
                <div className="w-24 sm:w-28 md:w-32 shrink-0 rounded-xl overflow-hidden relative">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: `hsl(var(${a.stageAccent}))` }}
                  />
                </div>
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <span
                    className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-2"
                    style={{ color: `hsl(var(${a.stageAccent}))` }}
                  >
                    {a.tag}
                  </span>
                  <h3 className="font-serif text-base text-foreground leading-snug mb-1.5 group-hover:text-sage transition-colors duration-300">
                    {a.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm font-light text-muted-foreground leading-relaxed line-clamp-2">
                    {a.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/guidance"
            className="inline-flex items-center gap-2 font-sans text-sm font-light text-sage hover:text-foreground transition-all group"
          >
            <span className="border-b border-sage/30 group-hover:border-foreground/30 pb-0.5">
              Browse all guidance
            </span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidanceSection;
