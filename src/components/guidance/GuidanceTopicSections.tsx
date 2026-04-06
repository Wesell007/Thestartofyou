import { Link } from "react-router-dom";
import { getArticlesByJourney } from "@/data/articleData";
import ttcImg from "@/assets/guidance-ttc.jpg";
import ivfImg from "@/assets/guidance-ivf.jpg";
import postpartumImg from "@/assets/guidance-postpartum.jpg";
import firstyearImg from "@/assets/guidance-firstyear.jpg";
import pregnancyImg from "@/assets/guidance-featured-pregnancy.jpg";

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
    image: pregnancyImg,
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
  <section className="bg-card/60 py-16 sm:py-20 md:py-28">
    <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
      <div className="mb-12 sm:mb-16">
        <div className="editorial-rule-left mb-5" />
        <p className="stage-label mb-3 sm:mb-4">Browse by topic</p>
        <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground leading-tight max-w-md">
          Explore guidance across your journey
        </h2>
        <p className="font-sans text-sm font-light text-muted-foreground mt-3 max-w-lg leading-relaxed">
          Curated guidance grouped around the stages that matter most.
        </p>
      </div>

      <div className="space-y-12 sm:space-y-16 md:space-y-20">
        {topicSections.map((section, sectionIndex) => {
          const articles = getArticlesByJourney(section.journeyFilter).filter(a => !a.isCornerstone).slice(0, 4);
          if (articles.length === 0) return null;

          const isEven = sectionIndex % 2 === 0;

          return (
            <div key={section.id} className="rounded-2xl bg-parchment border border-border/20 overflow-hidden">
              {/* Section header with image */}
              <div className={`md:flex ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                {/* Image column */}
                <div className="md:w-[38%] shrink-0">
                  <div className="aspect-[16/9] md:aspect-auto md:h-full overflow-hidden">
                    <img
                      src={section.image}
                      alt={section.label}
                      loading="lazy"
                      width={640}
                      height={512}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content column */}
                <div className="flex-1 p-6 sm:p-8 md:p-10">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-sage/60 mb-2">
                        {journeyLabels[section.journeyFilter] ?? section.journeyFilter}
                      </p>
                      <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-foreground leading-snug">
                        {section.label}
                      </h3>
                    </div>
                    <Link
                      to={section.hubLink}
                      className="hidden md:inline-flex items-center gap-1.5 font-sans text-xs text-sage hover:text-sage-dark transition-colors shrink-0 ml-6"
                    >
                      {section.hubLabel} <span>→</span>
                    </Link>
                  </div>
                  <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed max-w-md mb-6">
                    {section.description}
                  </p>

                  {/* Article list */}
                  <div className="divide-y divide-border/20">
                    {articles.map((article) => (
                      <Link
                        key={article.slug}
                        to={`/articles/${article.slug}`}
                        className="group flex items-center justify-between py-3.5 sm:py-4 hover:pl-1 transition-all"
                      >
                        <div className="min-w-0">
                          <h4 className="font-serif text-[14px] sm:text-[15px] text-foreground leading-snug group-hover:text-sage transition-colors line-clamp-1">
                            {article.title}
                          </h4>
                          <p className="font-sans text-[11px] font-light text-muted-foreground leading-relaxed mt-0.5 line-clamp-1 max-w-md">
                            {article.metaDescription}
                          </p>
                        </div>
                        <span className="text-muted-foreground/30 group-hover:text-sage transition-colors ml-3 shrink-0 font-serif text-base">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>

                  {/* Mobile hub link */}
                  <Link
                    to={section.hubLink}
                    className="md:hidden inline-flex items-center gap-1.5 font-sans text-xs text-sage hover:text-sage-dark transition-colors mt-4"
                  >
                    Explore {section.hubLabel.toLowerCase()} <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default GuidanceTopicSections;
