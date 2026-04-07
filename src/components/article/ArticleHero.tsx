import { Link } from "react-router-dom";
import { Shield, Clock, BookOpen } from "lucide-react";
import type { ArticleData } from "@/data/articleData";
import heroNausea from "@/assets/article-hero-nausea.jpg";
import heroFatigue from "@/assets/article-hero-fatigue.jpg";
import heroImplantation from "@/assets/article-hero-implantation.jpg";
import heroSymptomsStopping from "@/assets/article-hero-symptoms-stopping.jpg";

const heroImageMap: Record<string, string> = {
  "nausea-in-early-pregnancy": heroNausea,
  "complete-guide-morning-sickness": heroNausea,
  "fatigue-in-early-pregnancy": heroFatigue,
  "implantation-bleeding": heroImplantation,
  "symptoms-stopping-early-pregnancy": heroSymptomsStopping,
};

const journeyLabels: Record<string, string> = {
  "trying-to-conceive": "Trying to conceive",
  pregnancy: "Pregnancy",
  ivf: "IVF",
  postpartum: "Postpartum",
  "first-year": "First year",
  "preparing-for-baby": "Preparing for baby",
  support: "Support",
};

interface Props {
  data: ArticleData;
}

const ArticleHero = ({ data }: Props) => {
  const heroImage = heroImageMap[data.slug] || heroFatigue;
  const isDeep = data.isCornerstone;

  return (
    <section className="relative bg-foreground overflow-hidden">
      {/* Full-bleed hero image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          width={1280}
          height={800}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/70 to-foreground/40 md:from-foreground/80 md:via-foreground/55 md:to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-foreground/80 to-transparent" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10 pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24">
        <div className="max-w-2xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 sm:mb-8 font-sans text-[11px] font-light text-white/40 tracking-wide flex-wrap">
            <Link to="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span className="opacity-40">/</span>
            <Link to="/guidance" className="hover:text-white/70 transition-colors">Guidance</Link>
            {data.journey?.slice(0, 1).map((j) => (
              <span key={j} className="contents">
                <span className="opacity-40">/</span>
                <span className="text-white/50">{journeyLabels[j] ?? j}</span>
              </span>
            ))}
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 mb-5 sm:mb-6">
            {isDeep && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-[10px] font-sans tracking-[0.15em] uppercase font-medium border border-white/10">
                <BookOpen className="w-3 h-3" />
                Complete guide
              </span>
            )}
            {data.trimester?.map(t => (
              <span key={t} className="px-3 py-1 rounded-full bg-white/8 text-white/60 text-[10px] font-sans tracking-[0.15em] uppercase border border-white/8">
                Trimester {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className={`font-serif text-white leading-[1.12] tracking-tight mb-5 sm:mb-6 ${
            isDeep
              ? 'text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3.25rem]'
              : 'text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem]'
          }`}>
            {data.title}
          </h1>

          {/* Meta description for deep articles */}
          {isDeep && (
            <p className="font-sans text-[15px] sm:text-base font-light text-white/55 leading-relaxed mb-6 max-w-lg">
              {data.metaDescription}
            </p>
          )}

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[11px] font-light text-white/35">
            {data.reviewedBy && (
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-white/30" />
                Reviewed by {data.reviewedBy}
              </span>
            )}
            {data.lastUpdated && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-white/25" />
                Updated {data.lastUpdated}
              </span>
            )}
            {data.relatedWeeks && data.relatedWeeks.length > 0 && (
              <span className="text-white/30">
                Weeks {data.relatedWeeks[0]}-{data.relatedWeeks[data.relatedWeeks.length - 1]}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleHero;
