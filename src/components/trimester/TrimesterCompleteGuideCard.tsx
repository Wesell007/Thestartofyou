import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

const TrimesterCompleteGuideCard = ({ title, description, ctaLabel, href }: Props) => {
  return (
    <section className="bg-parchment py-12 md:py-16">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="max-w-3xl mx-auto rounded-2xl border border-border/40 bg-card p-6 sm:p-8 md:p-10">
          <p className="stage-label mb-3">Complete guide</p>
          <h2 className="font-serif text-[1.35rem] sm:text-[1.5rem] md:text-[1.65rem] text-foreground leading-snug mb-3">
            {title}
          </h2>
          <p className="font-sans text-[15px] text-foreground/70 leading-relaxed max-w-xl mb-5">
            {description}
          </p>
          <Link
            to={href}
            className="group inline-flex items-center gap-1.5 font-sans text-[13px] font-light text-sage hover:text-sage-muted transition-colors"
          >
            {ctaLabel}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrimesterCompleteGuideCard;
