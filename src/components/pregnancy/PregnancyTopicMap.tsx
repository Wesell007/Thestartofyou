import { Link } from "react-router-dom";
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  Baby,
  Heart,
  ShieldCheck,
  Apple,
  Package,
  type LucideIcon,
} from "lucide-react";
import { topicMapEntries } from "@/data/pregnancyTopicData";
import type { PregnancyTopicSlug } from "@/data/pregnancyTopicData";

const topicIcons: Record<PregnancyTopicSlug, LucideIcon> = {
  body: Sparkles,
  baby: Baby,
  feelings: Heart,
  "health-and-safety": ShieldCheck,
  "diet-and-exercise": Apple,
  "preparing-for-baby": Package,
};

const PregnancyTopicMap = () => {
  return (
    <section className="py-16 md:py-20 bg-parchment">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <p
            className="font-sans text-[11px] font-light tracking-[0.22em] uppercase mb-3"
            style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
          >
            The Pregnancy Guide
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] text-foreground mb-2 leading-tight">
            What you might want to explore
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground">
            Six gentle ways into pregnancy guidance.
          </p>
        </div>

        {/* 3 x 2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {topicMapEntries.map((topic) => {
            const Icon = topicIcons[topic.slug];
            return (
              <article
                key={topic.slug}
                className="bg-card rounded-2xl border border-border/40 shadow-card-brand flex flex-col p-6 sm:p-7 transition-all duration-300 hover:border-border/70 hover:shadow-soft"
              >
                {/* Icon + title row */}
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'hsl(var(--stage-pregnancy-accent) / 0.12)' }}
                  >
                    <Icon size={16} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg text-foreground leading-tight">
                      {topic.label}
                    </h3>
                  </div>
                </div>

                {/* Support description */}
                <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-4">
                  {topic.supportLine}
                </p>

                {/* Article links */}
                <ul className="flex flex-col">
                  {topic.articles.map((article, i) => (
                    <li
                      key={article.href + i}
                      className="border-t"
                      style={{ borderColor: "hsl(var(--stage-pregnancy-accent) / 0.1)" }}
                    >
                      <Link
                        to={article.href}
                        className="group flex items-center justify-between gap-3 py-2.5"
                      >
                        <span className="font-sans text-[13px] font-light text-foreground/75 leading-snug group-hover:text-foreground transition-colors">
                          {article.label}
                        </span>
                        <ChevronRight
                          size={13}
                          className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Bottom CTA */}
                <div className="pt-4 mt-auto">
                  <Link
                    to={topic.mainHref}
                    className="group inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide"
                    style={{ color: 'hsl(var(--terracotta))' }}
                  >
                    Explore {topic.label.toLowerCase()}
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
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
