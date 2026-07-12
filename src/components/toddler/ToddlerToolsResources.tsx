import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { toddlerArticles } from "@/data/toddlerArticleData";
import { getToddlerArticleImages } from "@/components/toddler/article/toddlerArticleImages";

const FEATURED_SLUGS = [
  "what-toddler-development-can-look-like",
  "signs-your-child-may-be-ready-for-potty-training",
  "supporting-toddler-speech-at-home",
  "toddler-sleep-rhythms",
];

const accent = "hsl(var(--stage-toddler-accent))";
const accentSoft = "hsl(var(--stage-toddler-accent) / 0.1)";
const accentBorder = "hsl(var(--stage-toddler-accent) / 0.26)";
const accentBorderStrong = "hsl(var(--stage-toddler-accent) / 0.36)";
const deep = "hsl(var(--stage-toddler-deep))";
const deepSoft = "hsl(var(--stage-toddler-deep) / 0.72)";
const deepMuted = "hsl(var(--stage-toddler-deep) / 0.55)";

const ToddlerToolsResources = () => {
  const featured = FEATURED_SLUGS
    .map((slug) => toddlerArticles.find((a) => a.slug === slug && a.status === "ready"))
    .filter((a): a is NonNullable<typeof a> => !!a);

  return (
    <section
      className="py-24 md:py-28"
      style={{
        background:
          "linear-gradient(to bottom, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler) / 0.45) 100%)",
      }}
    >
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="text-center mb-14 md:mb-16">
          <span className="mx-auto block h-px w-10 mb-6" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }} />
          <p className="font-sans text-[11px] font-light tracking-[0.34em] uppercase mb-3" style={{ color: accent }}>
            Guidance
          </p>
          <h2 className="font-serif text-[2rem] md:text-[2.4rem] mb-4 leading-tight" style={{ color: deep }}>
            A few quiet places to start
          </h2>
          <p className="font-sans text-[15px] font-light max-w-xl mx-auto leading-relaxed" style={{ color: deepSoft }}>
            Practical companions for the moments you don't want to scroll for.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-7">
          {featured.map((article) => {
            const image = getToddlerArticleImages(article.slug)?.hero;
            return (
              <Link
                key={article.slug}
                to={`/toddler/${article.topic}/${article.slug}`}
                className="group relative flex h-full flex-col rounded-[22px] border overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_28px_60px_-30px_rgba(70,40,20,0.42)]"
                style={{
                  borderColor: accentBorder,
                  background:
                    "linear-gradient(155deg, hsl(var(--parchment)) 0%, hsl(var(--stage-toddler-soft) / 0.55) 100%)",
                  boxShadow:
                    "0 16px 36px -28px rgba(70,40,20,0.26), inset 0 1px 0 hsl(0 0% 100% / 0.65)",
                }}
              >
                {image && (
                  <div
                    className="relative aspect-[16/10] overflow-hidden"
                    style={{ borderBottom: `1px solid ${accentBorder}` }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                    />
                    <span
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to bottom, hsl(var(--parchment) / 0) 55%, hsl(var(--parchment) / 0.55) 100%)",
                      }}
                      aria-hidden
                    />
                  </div>
                )}

                <div className="relative flex flex-1 flex-col p-7 md:p-8">
                  <span
                    className="pointer-events-none absolute -top-16 -left-16 h-44 w-44 rounded-full blur-3xl opacity-70"
                    style={{ background: "hsl(var(--stage-toddler-accent) / 0.2)" }}
                    aria-hidden
                  />
                  <div className="relative flex items-center gap-3 mb-3.5">
                    <span className="h-px w-6" style={{ backgroundColor: "hsl(var(--stage-toddler-accent) / 0.5)" }} />
                    <p className="font-sans text-[10.5px] font-light tracking-[0.3em] uppercase" style={{ color: accent }}>
                      Guidance
                    </p>
                  </div>
                  <h3 className="relative font-serif text-[1.35rem] md:text-[1.5rem] mb-2.5 leading-snug" style={{ color: deep }}>
                    {article.title}
                  </h3>
                  <p className="relative font-sans text-[14.5px] font-light leading-relaxed mb-7" style={{ color: deepSoft }}>
                    {article.description}
                  </p>
                  <div className="relative mt-auto flex items-center justify-between">
                    <span
                      className="inline-flex items-center gap-1.5 font-sans text-[12.5px] font-light"
                      style={{ color: deepMuted }}
                    >
                      <Clock size={12} strokeWidth={1.8} aria-hidden />
                      {article.readTime}
                    </span>
                    <span
                      className="inline-flex items-center justify-center h-9 w-9 rounded-full border transition-all duration-300 group-hover:translate-x-1"
                      style={{
                        borderColor: accentBorderStrong,
                        backgroundColor: accentSoft,
                      }}
                      aria-hidden
                    >
                      <ArrowRight size={14} strokeWidth={1.8} style={{ color: accent }} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToddlerToolsResources;
