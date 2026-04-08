import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ArticleData } from "@/data/articleData";

interface Props {
  data: ArticleData;
}

const journeyRoutes: Record<string, { label: string; href: string; description: string }> = {
  pregnancy: {
    label: "Start your pregnancy journey",
    href: "/pregnancy",
    description: "Get week-by-week guidance tailored to your stage of pregnancy.",
  },
  ivf: {
    label: "Start your IVF journey",
    href: "/ivf",
    description: "Guided support designed around the IVF process, from preparation through transfer and beyond.",
  },
  "trying-to-conceive": {
    label: "Start your TTC journey",
    href: "/trying-to-conceive",
    description: "Cycle-aware guidance and emotional support while trying to conceive.",
  },
  postpartum: {
    label: "Start your postpartum journey",
    href: "/postpartum",
    description: "Week-by-week recovery guidance designed for the reality of postpartum life.",
  },
  "first-year": {
    label: "Start your first year journey",
    href: "/first-year",
    description: "Stage-by-stage guidance for your baby's first year.",
  },
  "preparing-for-baby": {
    label: "Start preparing",
    href: "/preparing-for-baby",
    description: "A calm, structured approach to getting ready for your baby.",
  },
  support: {
    label: "Find support",
    href: "/support",
    description: "Emotional and practical support for every stage of this experience.",
  },
};

const ArticleJourneyCTA = ({ data }: Props) => {
  const primaryJourney = data.journey?.[0] ?? "pregnancy";
  const route = journeyRoutes[primaryJourney] ?? journeyRoutes.pregnancy;

  return (
    <section className="relative bg-parchment-dark py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-sage-bg/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-sage-light" />
            <p className="font-sans text-[10px] font-light tracking-[0.25em] uppercase text-sage-muted">
              Continue
            </p>
            <div className="h-px w-8 bg-sage-light" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight mb-3">
            Continue your journey
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-8">
            {route.description}
          </p>
          <Link
            to={route.href}
            className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-full px-7 py-3.5 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
          >
            {route.label}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticleJourneyCTA;
