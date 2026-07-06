import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import imgSleep from "@/assets/article-hero-third-sleep.jpg";
import imgMovement from "@/assets/article-hero-third-movement.jpg";
import imgEmotional from "@/assets/article-hero-third-emotional.jpg";
import imgHospitalBag from "@/assets/article-hero-third-hospital-bag.jpg";
import imgLabour from "@/assets/article-hero-third-signs-of-labour.jpg";
import imgNursery from "@/assets/article-hero-third-nursery.jpg";

interface ArticleCard {
  tag: string;
  title: string;
  href: string;
  blurb: string;
  image: string;
}

const articles: ArticleCard[] = [
  {
    tag: "Wellbeing",
    title: "Sleep in pregnancy",
    href: "/articles/sleep-in-pregnancy",
    blurb: "Why sleep often becomes broken or shallow now, and small ways to find more rest.",
    image: imgSleep,
  },
  {
    tag: "Baby development",
    title: "Baby movement in pregnancy",
    href: "/articles/baby-movement-in-pregnancy",
    blurb: "How movement patterns change in late pregnancy, and what's worth noticing each day.",
    image: imgMovement,
  },
  {
    tag: "Emotional health",
    title: "Preparing emotionally for birth",
    href: "/articles/anxiety-in-pregnancy",
    blurb: "Anticipation, fear, and impatience can sit together. What helps as labour comes closer.",
    image: imgEmotional,
  },
  {
    tag: "Practical preparation",
    title: "Hospital bag and what to pack",
    href: "/preparing-for-baby",
    blurb: "A calm, paced approach to packing without turning the list into another job.",
    image: imgHospitalBag,
  },
  {
    tag: "Labour & birth",
    title: "Signs that labour may be starting",
    href: "/articles/moving-your-body-in-pregnancy",
    blurb: "Tightenings, pressure, energy shifts, what tends to mean something and what doesn't.",
    image: imgLabour,
  },
  {
    tag: "Preparing for baby",
    title: "The space your baby will come home to",
    href: "/pregnancy/preparing-for-baby",
    blurb: "What's actually needed in the early weeks, and what can quietly wait until later.",
    image: imgNursery,
  },
];

const ThirdTriRelatedReads = () => {
  return (
    <section id="guidance" className="bg-parchment-dark section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="stage-label mb-3">Guidance</p>
            <h2 className="font-serif text-[1.85rem] sm:text-[2.1rem] md:text-[2.4rem] text-foreground leading-[1.1] mb-3">
              Helpful guidance for the third trimester
            </h2>
            <p className="font-sans text-[15px] text-foreground/70 leading-relaxed">
              Expert-backed articles to support the final stage.
            </p>
          </div>
          <Link
            to="/pregnancy"
            className="group inline-flex items-center gap-1.5 font-sans text-[13px] font-light text-sage hover:text-sage-muted transition-colors whitespace-nowrap"
          >
            View all articles
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {articles.map((a) => (
            <Link
              key={a.href + a.title}
              to={a.href}
              className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/20 shadow-card-brand hover:shadow-soft hover:border-sage/30 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="aspect-[5/3] overflow-hidden bg-parchment">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  width={640}
                  height={384}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-terracotta/80 mb-3">
                  {a.tag}
                </span>
                <h3 className="font-serif text-[1.1rem] text-foreground leading-snug mb-2.5 group-hover:text-sage transition-colors">
                  {a.title}
                </h3>
                <p className="font-sans text-[14px] text-foreground/72 leading-relaxed flex-1">
                  {a.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThirdTriRelatedReads;
