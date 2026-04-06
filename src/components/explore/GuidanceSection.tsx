import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import nauseaImg from "@/assets/article-nausea.jpg";
import fatigueImg from "@/assets/article-fatigue.jpg";
import implantationImg from "@/assets/article-implantation.jpg";

const articles = [
  {
    tag: "Pregnancy",
    title: "Nausea in early pregnancy",
    desc: "Why it happens, when it peaks, and what you can realistically do — clear, reassuring guidance.",
    href: "/articles/nausea-in-early-pregnancy",
    image: nauseaImg,
    stageAccent: "--stage-pregnancy-accent",
  },
  {
    tag: "First trimester",
    title: "Fatigue in early pregnancy",
    desc: "Extreme tiredness is one of the most underestimated symptoms. Here's why it happens.",
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
    <section className="relative bg-parchment section-spacing overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] glow-sage" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
        <div className="mb-12 md:mb-16">
          <div className="editorial-rule-left mb-5" />
          <h2 className="font-serif text-xl sm:text-2xl md:text-[2.25rem] text-foreground mb-3 md:mb-4 leading-tight">
            Guidance and answers
          </h2>
          <p className="font-sans text-sm sm:text-base font-light text-muted-foreground max-w-sm leading-relaxed">
            A curated selection — not a feed. Evidence-based, editorially crafted, and written for real life.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {articles.map((a) => (
            <Link
              key={a.title}
              to={a.href}
              className="group flex flex-col bg-card/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/20 hover:border-transparent hover:shadow-soft hover:-translate-y-1 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  width={640}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Stage colour accent line at bottom of image */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: `hsl(var(${a.stageAccent}))` }}
                />
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <span
                  className="font-sans text-[10px] font-light tracking-[0.2em] uppercase mb-3"
                  style={{ color: `hsl(var(${a.stageAccent}))` }}
                >
                  {a.tag}
                </span>
                <h3 className="font-serif text-base md:text-lg text-foreground leading-snug mb-2.5 group-hover:text-sage transition-colors duration-300">
                  {a.title}
                </h3>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed flex-1 mb-5">
                  {a.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 font-sans text-xs font-light text-sage group-hover:gap-3 transition-all duration-300">
                  Read more <ArrowRight size={11} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 md:mt-12 text-center">
          <Link
            to="/guidance"
            className="inline-flex items-center gap-2 font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-all duration-200 group"
          >
            <span className="border-b border-transparent group-hover:border-foreground/30 pb-0.5 transition-all">
              Browse the full guidance library
            </span>
            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidanceSection;
