import { Link } from "react-router-dom";
import { getArticlesByJourney } from "@/data/articleData";
import ttcImg from "@/assets/guidance-ttc.jpg";
import ivfImg from "@/assets/guidance-ivf.jpg";
import postpartumImg from "@/assets/guidance-postpartum.jpg";
import firstyearImg from "@/assets/guidance-firstyear.jpg";

const journeyLabels: Record<string, string> = {
  "trying-to-conceive": "Trying to conceive",
  pregnancy: "Pregnancy",
  ivf: "IVF",
  postpartum: "Postpartum",
  "first-year": "First year",
  "preparing-for-baby": "Preparing for baby",
  support: "Support",
};

const topicSections = [
  {
    id: "early-pregnancy",
    label: "Early pregnancy",
    description: "Symptoms, changes, and what to expect in the first weeks",
    journeyFilter: "pregnancy",
    hubLink: "/pregnancy",
    hubLabel: "Pregnancy hub",
    image: null as string | null,
  },
  {
    id: "fertility",
    label: "Fertility and conception",
    description: "Understanding your cycle, timing, and the path to pregnancy",
    journeyFilter: "trying-to-conceive",
    hubLink: "/trying-to-conceive",
    hubLabel: "TTC hub",
    image: ttcImg,
  },
  {
    id: "ivf-treatment",
    label: "IVF and fertility treatment",
    description: "What to expect, timelines, and emotional support through treatment",
    journeyFilter: "ivf",
    hubLink: "/ivf",
    hubLabel: "IVF hub",
    image: ivfImg,
  },
  {
    id: "postpartum-firstyear",
    label: "Postpartum and first year",
    description: "Recovery, adjustment, baby development, and finding your rhythm",
    journeyFilter: "postpartum",
    hubLink: "/postpartum",
    hubLabel: "Postpartum hub",
    image: postpartumImg,
  },
  {
    id: "first-year",
    label: "First year milestones",
    description: "Sleep, feeding, development, and the things no one warns you about",
    journeyFilter: "first-year",
    hubLink: "/first-year",
    hubLabel: "First year hub",
    image: firstyearImg,
  },
];

const GuidanceTopicSections = () => (
  <section className="bg-parchment py-16 sm:py-20 md:py-28">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="mb-12 sm:mb-16">
        <div className="editorial-rule-left mb-5" />
        <p className="stage-label mb-3 sm:mb-4">Browse by topic</p>
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-tight max-w-md">
          Explore guidance across your journey
        </h2>
        <p className="font-sans text-sm sm:text-base font-light text-muted-foreground mt-3 max-w-lg leading-relaxed">
          Curated guidance grouped around the stages and topics that matter most.
        </p>
      </div>

      <div className="space-y-16 sm:space-y-20 md:space-y-24">
        {topicSections.map((section, sectionIndex) => {
          const articles = getArticlesByJourney(section.journeyFilter).filter(a => !a.isCornerstone).slice(0, 4);
          if (articles.length === 0) return null;

          const isImageRight = sectionIndex % 2 === 0;

          return (
            <div key={section.id}>
              {/* Section header with optional image */}
              <div className={`md:flex md:items-start md:gap-10 mb-8 ${!isImageRight ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-end justify-between mb-2">
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-foreground leading-snug">
                      {section.label}
                    </h3>
                    <Link
                      to={section.hubLink}
                      className="hidden md:inline-flex items-center gap-1.5 font-sans text-xs text-sage hover:text-sage-dark transition-colors shrink-0 ml-6"
                    >
                      {section.hubLabel} <span>→</span>
                    </Link>
                  </div>
                  <p className="font-sans text-[13px] sm:text-sm font-light text-muted-foreground mt-1.5 leading-relaxed max-w-md">
                    {section.description}
                  </p>
                </div>

                {section.image && (
                  <div className="hidden md:block w-48 lg:w-56 shrink-0 rounded-2xl overflow-hidden">
                    <img
                      src={section.image}
                      alt={section.label}
                      loading="lazy"
                      width={640}
                      height={512}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Article rows */}
              <div className="space-y-0 divide-y divide-border/30">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/articles/${article.slug}`}
                    className="group flex items-start gap-3 sm:gap-4 py-4 sm:py-5 md:py-6 hover:pl-1 transition-all"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {article.journey?.slice(0, 2).map((j) => (
                          <span key={j} className="px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground text-[9px] font-sans tracking-[0.12em] uppercase">
                            {journeyLabels[j] ?? j}
                          </span>
                        ))}
                        {article.compare && (
                          <span className="px-2 py-0.5 rounded-full bg-terracotta/8 text-terracotta/70 text-[9px] font-sans tracking-[0.12em] uppercase">
                            Compare
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif text-[15px] sm:text-base md:text-lg text-foreground leading-snug group-hover:text-sage transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                      <p className="font-sans text-xs font-light text-muted-foreground leading-relaxed mt-1 line-clamp-1 max-w-lg">
                        {article.metaDescription}
                      </p>
                    </div>
                    <span className="text-muted-foreground/30 group-hover:text-sage transition-colors font-serif text-lg shrink-0 pt-2 sm:pt-3">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              {/* Mobile hub link */}
              <Link
                to={section.hubLink}
                className="md:hidden inline-flex items-center gap-1.5 font-sans text-xs text-sage hover:text-sage-dark transition-colors mt-3 sm:mt-4"
              >
                Explore {section.hubLabel.toLowerCase()} <span>→</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default GuidanceTopicSections;
