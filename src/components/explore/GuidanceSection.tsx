import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import nauseaImg from "@/assets/article-nausea.jpg";
import fatigueImg from "@/assets/article-fatigue.jpg";
import implantationImg from "@/assets/article-implantation.jpg";

const articles = [
  {
    tag: "Symptoms",
    title: "Nausea in early pregnancy",
    desc: "Why it happens, when it peaks, and what you can realistically do, clear, reassuring guidance.",
    href: "/articles/nausea-in-early-pregnancy",
    image: nauseaImg,
  },
  {
    tag: "Symptoms",
    title: "Fatigue in early pregnancy",
    desc: "Extreme tiredness is one of the most underestimated symptoms. Here's why it happens.",
    href: "/articles/fatigue-in-early-pregnancy",
    image: fatigueImg,
  },
  {
    tag: "Early pregnancy",
    title: "Implantation bleeding explained",
    desc: "What it is, what it looks like, and how it differs from a period.",
    href: "/articles/implantation-bleeding",
    image: implantationImg,
  },
];

const GuidanceSection = () => {
  return (
    <section className="relative bg-parchment section-spacing overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] glow-sage" />

      <div className="container mx-auto px-6 md:px-10 max-w-5xl relative z-10">
        <div className="mb-16">
          <div className="editorial-rule-left mb-6" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
            Guidance and answers
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-sm leading-relaxed">
            A curated selection, not a feed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7">
          {articles.map((a) => (
            <Link
              key={a.title}
              to={a.href}
              className="group flex flex-col bg-card/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/20 shadow-card-brand hover:shadow-soft hover:border-sage/20 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  width={640}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <span className="stage-label text-terracotta/80 mb-3">
                  {a.tag}
                </span>
                <h3 className="font-serif text-base md:text-lg text-foreground leading-snug mb-3 group-hover:text-sage transition-colors duration-300">
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

        <div className="mt-12 text-center">
          <Link
            to="/ask"
            className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-all duration-200 group inline-flex items-center gap-1.5"
          >
            <span className="border-b border-transparent group-hover:border-foreground/30 pb-0.5 transition-all">
              Ask a question
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidanceSection;
