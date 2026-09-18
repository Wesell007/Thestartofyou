import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { topicMapEntries } from "@/data/pregnancyTopicData";
import { PREGNANCY_TOPIC_IMAGES } from "@/components/pregnancy/pregnancyTopicImages";

const PregnancyTopicMap = () => {
  return (
    <section className="relative bg-parchment py-14 md:py-20">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p
            className="font-sans text-[11px] font-light tracking-[0.24em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            The Pregnancy Guide
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-3 leading-tight">
            What you might want to <span className="italic font-normal">explore</span>
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground max-w-md mx-auto">
            Six gentle ways into pregnancy guidance — choose where you'd like to begin.
          </p>
          {/* Hairline accent under header */}
          <div
            aria-hidden="true"
            className="mx-auto mt-6 h-px w-16"
            style={{
              background:
                'linear-gradient(90deg, transparent, hsl(var(--stage-pregnancy-accent) / 0.5), transparent)',
            }}
          />
        </div>

        {/* 3 x 2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {topicMapEntries.map((topic) => {
            return (
              <article
                key={topic.slug}
                 className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-card-brand transition-all duration-500 hover:-translate-y-1"
              >
                 <div className="aspect-[16/9] overflow-hidden">
                   <img src={PREGNANCY_TOPIC_IMAGES[topic.slug]} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                 <div className="flex flex-1 flex-col p-5 sm:p-6">
                 <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-terracotta">Pregnancy topic</p>
                 <h3 className="font-serif text-xl text-foreground leading-tight">{topic.label}</h3>
                 <p className="mb-4 mt-2 font-sans text-[13px] font-light leading-relaxed text-muted-foreground">
                  {topic.supportLine}
                </p>
                 <ul className="flex flex-col border-t border-border/50">
                  {topic.articles.map((article, i) => (
                    <li
                      key={article.href + i}
                       className="border-b border-border/50"
                    >
                      <Link
                        to={article.href}
                        className="group/link flex items-center justify-between gap-3 py-2.5"
                      >
                        <span className="font-sans text-[13px] font-light text-foreground/75 leading-snug group-hover/link:text-foreground transition-colors">
                          {article.label}
                        </span>
                         <ChevronRight size={13} className="shrink-0 text-terracotta opacity-50 transition-all group-hover/link:translate-x-0.5 group-hover/link:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 mt-auto">
                  <Link
                    to={topic.mainHref}
                    className="group/cta inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide transition-colors"
                    style={{ color: "hsl(var(--terracotta))" }}
                  >
                     <span className="relative">
                       {topic.mainLabel}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 right-0 -bottom-0.5 h-px scale-x-0 group-hover/cta:scale-x-100 origin-left transition-transform duration-500"
                        style={{ background: "hsl(var(--terracotta) / 0.5)" }}
                      />
                    </span>
                    <ArrowRight
                      size={13}
                      className="group-hover/cta:translate-x-1 transition-transform duration-500"
                    />
                  </Link>
                </div>
                 </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PregnancyTopicMap;
