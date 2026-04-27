import { Link } from "react-router-dom";

export interface TrimesterRelatedItem {
  title: string;
  href: string;
  why: string;
}

interface Props {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: TrimesterRelatedItem[];
  bg?: string;
}

const TrimesterRelatedGuidance = ({
  eyebrow = "Continue reading",
  title = "Helpful guidance for this stage",
  intro,
  items,
  bg = "bg-parchment",
}: Props) => {
  if (!items?.length) return null;

  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-sage-light" />
            <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
              {eyebrow}
            </p>
          </div>
          <h2 className="font-serif text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] text-foreground leading-tight">
            {title}
          </h2>
          {intro && (
            <p className="mt-3 font-sans text-[14px] sm:text-[15px] font-light text-muted-foreground leading-relaxed max-w-2xl">
              {intro}
            </p>
          )}
        </div>

        {/* Calm editorial list */}
        <ul className="divide-y divide-border/30">
          {items.slice(0, 6).map((item) => (
            <li key={item.href} className="py-5 sm:py-6 first:pt-0 last:pb-0">
              <Link to={item.href} className="group block">
                <h3 className="font-serif text-[17px] sm:text-[19px] md:text-[20px] text-foreground leading-snug group-hover:text-sage transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 font-serif italic text-[13px] sm:text-[14px] text-foreground/60 leading-relaxed max-w-2xl">
                  {item.why}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TrimesterRelatedGuidance;
