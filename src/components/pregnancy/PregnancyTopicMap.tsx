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
import sprigImg from "@/assets/topic-mini-sprig.png";

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
    <section className="relative py-16 md:py-24 bg-parchment overflow-hidden">
      {/* Subtle botanical accent */}
      <img
        src={sprigImg}
        alt=""
        aria-hidden="true"
        className="hidden md:block absolute top-10 right-8 lg:right-16 w-16 lg:w-20 opacity-40 pointer-events-none select-none rotate-12"
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {topicMapEntries.map((topic) => {
            const Icon = topicIcons[topic.slug];
            return (
              <article
                key={topic.slug}
                className="group relative bg-card rounded-[1.25rem] border flex flex-col p-7 sm:p-8 transition-all duration-500 hover:-translate-y-0.5"
                style={{
                  borderColor: 'hsl(var(--stage-pregnancy-accent) / 0.14)',
                  boxShadow:
                    '0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 14px 40px -28px hsl(var(--stage-pregnancy-accent) / 0.32)',
                }}
              >
                {/* Top hairline accent */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-7 right-7 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, hsl(var(--stage-pregnancy-accent) / 0.5), transparent)',
                  }}
                />

                {/* Icon + title row */}
                <div className="flex items-start gap-3.5 mb-3.5">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background:
                        'radial-gradient(circle at 35% 30%, hsl(var(--stage-pregnancy) / 0.9), hsl(var(--stage-pregnancy-accent) / 0.18))',
                      boxShadow:
                        '0 1px 0 hsl(var(--parchment) / 0.9) inset, 0 4px 12px -6px hsl(var(--stage-pregnancy-accent) / 0.35)',
                    }}
                  >
                    <Icon size={17} style={{ color: 'hsl(var(--stage-pregnancy-accent))' }} />
                  </div>
                  <div className="flex-1 min-w-0 pt-1">
                    <h3 className="font-serif text-[1.15rem] text-foreground leading-tight">
                      {topic.label}
                    </h3>
                  </div>
                </div>

                {/* Support description */}
                <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-5">
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
                        className="group/link flex items-center justify-between gap-3 py-3"
                      >
                        <span className="font-sans text-[13px] font-light text-foreground/75 leading-snug group-hover/link:text-foreground transition-colors">
                          {article.label}
                        </span>
                        <ChevronRight
                          size={13}
                          className="shrink-0 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all"
                          style={{ color: "hsl(var(--stage-pregnancy-accent))" }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Bottom CTA */}
                <div className="pt-5 mt-auto">
                  <Link
                    to={topic.mainHref}
                    className="group/cta inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide"
                    style={{ color: 'hsl(var(--terracotta))' }}
                  >
                    Explore {topic.label.toLowerCase()}
                    <ArrowRight size={13} className="group-hover/cta:translate-x-0.5 transition-transform" />
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
