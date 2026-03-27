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
    <section className="bg-parchment py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-10 max-w-5xl">
        <div className="mb-14">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground mb-3">
            Guidance and answers
          </h2>
          <p className="font-sans text-base font-light text-muted-foreground max-w-sm leading-relaxed">
            A curated selection — not a feed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-6">
          {articles.map((a) => (
            <Link
              key={a.title}
              to={a.href}
              className="group flex flex-col bg-card rounded-2xl p-7 md:p-8 border border-border/40 shadow-card-brand hover:shadow-soft hover:border-sage/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="font-sans text-[10px] font-medium tracking-widest uppercase text-terracotta mb-4">
                {a.tag}
              </span>
              <h3 className="font-serif text-base md:text-lg text-foreground leading-snug mb-3 group-hover:text-sage transition-colors">
                {a.title}
              </h3>
              <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed flex-1 mb-6">
                {a.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 font-sans text-xs font-light text-sage group-hover:gap-2.5 transition-all">
                Read more <ArrowRight size={11} />
              </span>
            </Link>
          ))}
        </div>

        {/* Link to explore */}
        <div className="mt-10 text-center">
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
