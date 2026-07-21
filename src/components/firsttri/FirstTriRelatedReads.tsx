import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import imgEarlySymptoms from "@/assets/article-hero-early-symptoms.jpg";
import imgNausea from "@/assets/article-hero-nausea.jpg";
import imgFatigue from "@/assets/article-hero-fatigue.jpg";
import imgEmotional from "@/assets/article-hero-emotional-first-tri.jpg";
import imgScans from "@/assets/article-hero-tests-scans.jpg";
import imgFood from "@/assets/article-hero-food-aversions.jpg";

interface ArticleCard {
  tag: string;
  title: string;
  href: string;
  blurb: string;
  image: string;
}

const articles: ArticleCard[] = [
  {
    tag: "Symptoms",
    title: "Early pregnancy symptoms explained",
    href: "/articles/early-pregnancy-symptoms-explained",
    blurb: "What the earliest signs feel like, and why they vary so much.",
    image: imgEarlySymptoms,
  },
  {
    tag: "Nausea",
    title: "Morning sickness: what helps",
    href: "/articles/complete-guide-to-morning-sickness",
    blurb: "Why nausea hits, what genuinely eases it, and when to seek support.",
    image: imgNausea,
  },
  {
    tag: "Wellbeing",
    title: "Fatigue in early pregnancy",
    href: "/articles/fatigue-in-early-pregnancy",
    blurb: "On the disproportionate tiredness of these weeks, and what helps.",
    image: imgFatigue,
  },
  {
    tag: "Emotional health",
    title: "The first trimester emotionally",
    href: "/articles/the-first-trimester-emotionally",
    blurb: "Holding a secret, sitting with uncertainty, the strangeness of waiting.",
    image: imgEmotional,
  },
  {
    tag: "Care & scans",
    title: "Tests and scans in pregnancy",
    href: "/articles/tests-and-scans-in-pregnancy",
    blurb: "Booking, screening and the dating scan, and what each one is for.",
    image: imgScans,
  },
  {
    tag: "Nutrition",
    title: "When you can&rsquo;t face food",
    href: "/articles/when-you-cant-face-food-in-pregnancy",
    blurb: "Aversions, missed meals, and how to nourish yourself gently.",
    image: imgFood,
  },
];

const FirstTriRelatedReads = () => {
  return (
    <section id="guidance" className="bg-parchment-dark section-spacing">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 md:mb-12">
          <div className="max-w-2xl">
            <p className="stage-label mb-3">Guidance</p>
            <h2 className="font-serif text-[1.85rem] sm:text-[2.1rem] md:text-[2.4rem] text-foreground leading-[1.1] mb-3">
              Helpful guidance for the first trimester
            </h2>
            <p className="font-sans text-[15px] text-foreground/70 leading-relaxed">
              Expert-backed articles to support you now.
            </p>
          </div>
          <Link
            to="/pregnancy"
            className="group inline-flex items-center gap-1.5 font-sans text-[13px] font-light text-sage hover:text-sage-muted transition-colors whitespace-nowrap"
          >
            View all articles
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-7">
          {articles.map((a) => (
            <Link
              key={a.href}
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
                <h3
                  className="font-serif text-[1.1rem] text-foreground leading-snug mb-2.5 group-hover:text-sage transition-colors"
                  dangerouslySetInnerHTML={{ __html: a.title }}
                />
                <p
                  className="font-sans text-[14px] text-foreground/72 leading-relaxed flex-1"
                  dangerouslySetInnerHTML={{ __html: a.blurb }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FirstTriRelatedReads;
