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
import wildflowerImg from "@/assets/topic-wildflower-sprig.png";

const topicIcons: Record<PregnancyTopicSlug, LucideIcon> = {
  body: Sparkles,
  baby: Baby,
  feelings: Heart,
  "health-and-safety": ShieldCheck,
  "diet-and-exercise": Apple,
  "preparing-for-baby": Package,
};

// Per-topic accent palette — restrained variation, one family.
// All values are HSL strings, used inline against shared design tokens.
type AccentTheme = {
  /** Soft tint for icon medallion + faint corner wash */
  tintHsl: string;
  /** Deeper accent for icon glyph + hairline */
  inkHsl: string;
  /** Border tint */
  borderHsl: string;
  /** Decorative sprig opacity treatment */
  sprig: "leaf" | "wildflower";
  /** Slight rotation of the corner sprig (deg) */
  sprigRotate: number;
};

const topicTheme: Record<PregnancyTopicSlug, AccentTheme> = {
  body: {
    tintHsl: "14 50% 88%", // soft blush
    inkHsl: "14 50% 46%",
    borderHsl: "14 50% 50%",
    sprig: "wildflower",
    sprigRotate: 18,
  },
  baby: {
    tintHsl: "100 22% 86%", // gentle sage
    inkHsl: "100 22% 38%",
    borderHsl: "100 22% 44%",
    sprig: "leaf",
    sprigRotate: -10,
  },
  feelings: {
    tintHsl: "340 38% 88%", // soft rose
    inkHsl: "340 32% 50%",
    borderHsl: "340 32% 56%",
    sprig: "wildflower",
    sprigRotate: 24,
  },
  "health-and-safety": {
    tintHsl: "210 24% 90%", // calm slate-blue
    inkHsl: "210 28% 40%",
    borderHsl: "210 24% 48%",
    sprig: "leaf",
    sprigRotate: 12,
  },
  "diet-and-exercise": {
    tintHsl: "80 28% 84%", // fresh green
    inkHsl: "90 28% 36%",
    borderHsl: "90 28% 42%",
    sprig: "leaf",
    sprigRotate: -18,
  },
  "preparing-for-baby": {
    tintHsl: "32 44% 86%", // warm nesting amber
    inkHsl: "28 42% 42%",
    borderHsl: "28 42% 48%",
    sprig: "wildflower",
    sprigRotate: -8,
  },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {topicMapEntries.map((topic) => {
            const Icon = topicIcons[topic.slug];
            const theme = topicTheme[topic.slug];
            const sprigSrc = theme.sprig === "leaf" ? sprigImg : wildflowerImg;

            return (
              <article
                key={topic.slug}
                className="group relative bg-card flex flex-col p-6 sm:p-7 md:p-8 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                style={{
                  // Bespoke sculpted silhouette — asymmetric corners
                  borderRadius: "1.75rem 1.25rem 1.75rem 1.25rem",
                  border: `1px solid hsl(${theme.borderHsl} / 0.16)`,
                  background: `
                    radial-gradient(120% 80% at 100% 0%, hsl(${theme.tintHsl} / 0.35) 0%, transparent 55%),
                    linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--parchment) / 0.65) 100%)
                  `,
                  boxShadow: `
                    0 1px 0 hsl(0 0% 100% / 0.9) inset,
                    0 0 0 1px hsl(${theme.borderHsl} / 0.04) inset,
                    0 18px 44px -28px hsl(${theme.inkHsl} / 0.32)
                  `,
                }}
              >
                {/* Layered inner panel highlight (top edge) */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-8 right-8 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(${theme.borderHsl} / 0.35), transparent)`,
                  }}
                />

                {/* Decorative botanical sprig — quiet, top-right corner */}
                <img
                  src={sprigSrc}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-16 sm:w-20 md:w-24 opacity-[0.18] sm:opacity-[0.24] md:opacity-[0.28] group-hover:opacity-40 transition-opacity duration-700"
                  style={{
                    transform: `rotate(${theme.sprigRotate}deg)`,
                    filter: "saturate(0.7)",
                  }}
                />

                {/* Faint corner wash, bottom-left, for layered paper feel */}
                <div
                  aria-hidden="true"
                  className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none opacity-60"
                  style={{
                    background: `radial-gradient(circle, hsl(${theme.tintHsl} / 0.18) 0%, transparent 70%)`,
                  }}
                />

                {/* Icon medallion + title */}
                <div className="relative flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    {/* Outer botanical ring */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full transition-transform duration-700 group-hover:scale-110"
                      style={{
                        background: `conic-gradient(from 210deg, hsl(${theme.tintHsl} / 0.5), transparent 35%, hsl(${theme.tintHsl} / 0.35) 70%, transparent)`,
                        padding: 1.5,
                      }}
                    />
                    {/* Inner medallion */}
                    <div
                      className="relative w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:-rotate-3"
                      style={{
                        background: `radial-gradient(circle at 30% 28%, hsl(${theme.tintHsl} / 0.95), hsl(${theme.tintHsl} / 0.45))`,
                        boxShadow: `
                          0 1px 0 hsl(0 0% 100% / 0.95) inset,
                          0 -1px 1px hsl(${theme.inkHsl} / 0.08) inset,
                          0 4px 14px -6px hsl(${theme.inkHsl} / 0.4)
                        `,
                      }}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.6}
                        style={{ color: `hsl(${theme.inkHsl})` }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 pt-1.5">
                    <h3 className="font-serif text-[1.2rem] sm:text-[1.25rem] text-foreground leading-tight tracking-tight">
                      {topic.label}
                    </h3>
                  </div>
                </div>

                {/* Support description */}
                <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-5 max-w-[28ch]">
                  {topic.supportLine}
                </p>

                {/* Ornamental divider before sublinks */}
                <div
                  aria-hidden="true"
                  className="h-px w-10 mb-1"
                  style={{
                    background: `linear-gradient(90deg, hsl(${theme.borderHsl} / 0.55), transparent)`,
                  }}
                />

                {/* Article links */}
                <ul className="flex flex-col">
                  {topic.articles.map((article, i) => (
                    <li
                      key={article.href + i}
                      className="border-t"
                      style={{ borderColor: `hsl(${theme.borderHsl} / 0.1)` }}
                    >
                      <Link
                        to={article.href}
                        className="group/link flex items-center justify-between gap-3 py-2.5"
                      >
                        <span className="font-sans text-[13px] font-light text-foreground/75 leading-snug group-hover/link:text-foreground transition-colors">
                          {article.label}
                        </span>
                        <ChevronRight
                          size={13}
                          className="shrink-0 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all"
                          style={{ color: `hsl(${theme.inkHsl})` }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Bottom CTA */}
                <div className="pt-6 mt-auto">
                  <Link
                    to={topic.mainHref}
                    className="group/cta inline-flex items-center gap-1.5 font-sans text-[13px] font-medium tracking-wide transition-colors"
                    style={{ color: "hsl(var(--terracotta))" }}
                  >
                    <span className="relative">
                      Explore {topic.label.toLowerCase()}
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PregnancyTopicMap;
