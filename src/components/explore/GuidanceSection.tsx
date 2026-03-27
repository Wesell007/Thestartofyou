import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    tag: "Symptoms",
    title: "Nausea in early pregnancy",
    desc: "Why it happens, when it peaks, and what you can realistically do — clear, reassuring guidance.",
    href: "/articles/nausea-in-early-pregnancy",
  },
  {
    tag: "Symptoms",
    title: "Fatigue in early pregnancy",
    desc: "Extreme tiredness is one of the most underestimated symptoms. Here's why it happens.",
    href: "/articles/fatigue-in-early-pregnancy",
  },
  {
    tag: "Early pregnancy",
    title: "Implantation bleeding explained",
    desc: "What it is, what it looks like, and how it differs from a period.",
    href: "/articles/implantation-bleeding",
  },
];

const GuidanceSection = () => {
  return (
    <section className="bg-parchment section-spacing">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
            Guidance and answers
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-sm leading-relaxed">
            A curated selection — not a feed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-7">
          {articles.map((a) => (
            <Link
              key={a.title}
              to={a.href}
              className="group flex flex-col bg-card rounded-2xl p-8 md:p-9 border border-border/20 shadow-card-brand hover:shadow-soft hover:border-sage/20 hover:-translate-y-1 transition-all duration-500"
            >
              <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-terracotta/80 mb-5">
                {a.tag}
              </span>
              <h3 className="font-serif text-base md:text-lg text-foreground leading-snug mb-4 group-hover:text-sage transition-colors duration-300">
                {a.title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed flex-1 mb-7">
                {a.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-light text-sage group-hover:gap-3 transition-all duration-300">
                Read more <ArrowRight size={11} />
              </span>
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
