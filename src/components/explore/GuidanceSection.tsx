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
    <section className="bg-parchment py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground mb-2">
            Guidance and answers
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-sm">
            A curated selection — not a feed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
          {articles.map((a) => (
            <Link
              key={a.title}
              to={a.href}
              className="group flex flex-col bg-card rounded-2xl p-6 md:p-7 border border-border/60 shadow-card-brand hover:shadow-soft hover:border-sage/30 transition-all duration-300"
            >
              <span className="font-sans text-[10px] font-medium tracking-widest uppercase text-terracotta mb-3">
                {a.tag}
              </span>
              <h3 className="font-serif text-base text-foreground leading-snug mb-2.5 group-hover:text-sage transition-colors">
                {a.title}
              </h3>
              <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed flex-1 mb-5">
                {a.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-light text-sage group-hover:gap-2.5 transition-all">
                Read more <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>

        {/* Link to explore */}
        <div className="mt-8 text-center">
          <Link
            to="/ask"
            className="font-sans text-sm font-light text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-all pb-0.5"
          >
            Ask a question
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GuidanceSection;
