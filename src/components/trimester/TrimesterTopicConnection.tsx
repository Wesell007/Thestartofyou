import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export interface TrimesterTopicLink {
  label: string;
  href: string;
  hint: string;
}

interface Props {
  eyebrow?: string;
  title?: string;
  intro?: string;
  topics: TrimesterTopicLink[];
  bg?: string;
}

const TrimesterTopicConnection = ({
  eyebrow = "Explore by topic",
  title = "Where to go deeper",
  intro = "If something here resonated, these topic areas hold more on each thread.",
  topics,
  bg = "bg-parchment-dark",
}: Props) => {
  if (!topics?.length) return null;

  return (
    <section className={`${bg} section-spacing-sm`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        <div className="mb-7 sm:mb-9">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-sage-light" />
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
              {eyebrow}
            </p>
          </div>
          <h2 className="font-serif text-[1.4rem] sm:text-[1.6rem] md:text-[1.85rem] text-foreground leading-tight">
            {title}
          </h2>
          {intro && (
            <p className="mt-2.5 font-sans text-[14px] sm:text-[15px] font-light text-muted-foreground leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 sm:gap-y-4">
          {topics.slice(0, 4).map((topic) => (
            <li key={topic.href}>
              <Link
                to={topic.href}
                className="group flex items-start justify-between gap-4 py-3 border-b border-border/30 hover:border-sage/40 transition-colors"
              >
                <div>
                  <p className="font-serif text-[16px] sm:text-[17px] text-foreground group-hover:text-sage transition-colors leading-snug">
                    {topic.label}
                  </p>
                  <p className="mt-1 font-sans text-[12.5px] font-light text-muted-foreground leading-relaxed">
                    {topic.hint}
                  </p>
                </div>
                <ArrowUpRight
                  size={15}
                  className="mt-1 shrink-0 text-sage-muted group-hover:text-sage group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrimesterTopicConnection;
