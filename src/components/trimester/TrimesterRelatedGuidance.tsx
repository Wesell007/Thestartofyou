import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface TrimesterRelatedItem {
  title: string;
  href: string;
  why: string;
  tag?: string;
  image?: string;
}

interface Props {
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: TrimesterRelatedItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
  bg?: string;
}

const TrimesterRelatedGuidance = ({
  eyebrow = "Continue reading",
  title = "Helpful guidance for this stage",
  intro,
  items,
  viewAllHref,
  viewAllLabel = "View all articles",
  bg = "bg-parchment",
}: Props) => {
  if (!items?.length) return null;

  // Curate to a clean 6 max — the reference shows a single elegant row
  const curated = items.slice(0, 6);

  return (
    <section className={`${bg} section-spacing`}>
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Header — editorial, with optional view-all link aligned right */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10 md:mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-sage-light" />
              <p className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-sage-muted">
                {eyebrow}
              </p>
            </div>
            <h2 className="font-serif text-[1.6rem] sm:text-[1.85rem] md:text-[2.1rem] text-foreground leading-tight">
              {title}
            </h2>
            {intro && (
              <p className="mt-3 font-sans text-[14px] sm:text-[15px] font-light text-muted-foreground leading-relaxed">
                {intro}
              </p>
            )}
          </div>

          {viewAllHref && (
            <Link
              to={viewAllHref}
              className="group hidden sm:inline-flex items-center gap-1.5 font-sans text-[13px] font-light text-sage hover:text-sage-muted transition-colors whitespace-nowrap"
            >
              {viewAllLabel}
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>

        {/* Curated card grid — premium, editorial, image-led */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {curated.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/20 shadow-card-brand hover:shadow-soft hover:border-sage/30 hover:-translate-y-1 transition-all duration-500"
            >
              {item.image && (
                <div className="aspect-[4/3] overflow-hidden bg-parchment-dark">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={640}
                    height={480}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                {item.tag && (
                  <span className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-terracotta/80 mb-3">
                    {item.tag}
                  </span>
                )}
                <h3 className="font-serif text-[16px] sm:text-[17px] text-foreground leading-snug mb-2.5 group-hover:text-sage transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed flex-1">
                  {item.why}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {viewAllHref && (
          <div className="mt-8 text-center sm:hidden">
            <Link
              to={viewAllHref}
              className="inline-flex items-center gap-1.5 font-sans text-[13px] font-light text-sage hover:text-sage-muted transition-colors"
            >
              {viewAllLabel}
              <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrimesterRelatedGuidance;
