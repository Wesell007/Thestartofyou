import { ArrowRight } from "lucide-react";

const articles = [
  {
    tag: "This week's guidance",
    title: "What to expect in Week 10",
    desc: "Your baby is now the size of a strawberry. Here's what's changing for you and your body right now.",
    href: "#",
  },
  {
    tag: "Popular question",
    title: "When do pregnancy symptoms start?",
    desc: "Most symptoms begin between weeks 5 and 8, though the timing varies more than you'd expect.",
    href: "#",
  },
  {
    tag: "Key article",
    title: "What do I need for a newborn?",
    desc: "A calm, honest list of what genuinely matters — without the overwhelming product guides.",
    href: "#",
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
            <a
              key={a.title}
              href={a.href}
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
            </a>
          ))}
        </div>

        {/* Restrained "see all" link — not a button */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="font-sans text-sm font-light text-muted-foreground border-b border-border hover:text-foreground hover:border-foreground transition-all pb-0.5"
          >
            Browse all guidance
          </a>
        </div>
      </div>
    </section>
  );
};

export default GuidanceSection;
