import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  PregnancyTopicPageConfig,
  PREGNANCY_TOPICS,
  LIVE_TOPIC_SLUGS,
} from "@/data/pregnancyTopicData";

interface Props {
  config: PregnancyTopicPageConfig;
}

const accent = "hsl(var(--stage-pregnancy-accent))";
const accentSoft = "hsl(var(--stage-pregnancy-accent) / 0.1)";
const accentMid = "hsl(var(--stage-pregnancy-accent) / 0.18)";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-sans text-[11px] font-light tracking-[0.2em] uppercase"
    style={{ color: accent }}
  >
    {children}
  </p>
);

const PregnancyTopicPage = ({ config }: Props) => {
  const siblings = PREGNANCY_TOPICS.filter((t) => t.slug !== config.slug);

  return (
    <div className="min-h-screen font-sans bg-background">
      <Navbar />
      <main>
        {/* 1. Topic Hero */}
        <section className="pt-20 md:pt-28 pb-14 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
            <Eyebrow>The Pregnancy Map · {config.eyebrow}</Eyebrow>
            <h1 className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
              {config.title}
            </h1>
            <p className="mt-6 font-sans text-[15px] md:text-base font-light text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {config.intro}
            </p>
          </div>
        </section>

        {/* 2. What this topic covers */}
        <section className="py-12 md:py-16 bg-parchment-dark">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            <p className="font-serif text-[16px] md:text-[17px] text-foreground/85 leading-relaxed">
              {config.whatThisCovers.lead}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {config.whatThisCovers.bullets.map((b, i) => (
                <li
                  key={i}
                  className="font-sans text-[14px] md:text-[15px] font-light text-foreground/75 leading-relaxed pl-4 border-l"
                  style={{ borderColor: accentMid }}
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Start here */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl">
            <Eyebrow>Start here</Eyebrow>
            <ul className="mt-8 flex flex-col">
              {config.startHere.map((item) => (
                <li
                  key={item.href}
                  className="border-t py-6"
                  style={{ borderColor: accentSoft }}
                >
                  <Link to={item.href} className="group block">
                    <h3 className="font-serif text-xl md:text-2xl text-foreground leading-snug group-hover:text-foreground/80 transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 font-serif italic text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">
                      {item.why}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Subtopic groups */}
        <section className="py-16 md:py-20 bg-parchment-dark">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-14">
              {config.groups.map((group) => (
                <div key={group.label} className="flex flex-col">
                  <Eyebrow>{group.label}</Eyebrow>
                  {group.description && (
                    <p className="mt-3 font-serif text-[14px] md:text-[15px] text-muted-foreground leading-relaxed">
                      {group.description}
                    </p>
                  )}
                  <ul className="mt-5 flex flex-col">
                    {group.links.map((link) => (
                      <li
                        key={link.href + link.label}
                        className="border-t"
                        style={{ borderColor: accentSoft }}
                      >
                        <Link
                          to={link.href}
                          className="group flex items-center justify-between gap-3 py-3"
                        >
                          <span className="font-sans text-[14px] font-light text-foreground/80 leading-snug group-hover:text-foreground transition-colors">
                            {link.label}
                          </span>
                          <ChevronRight
                            size={14}
                            className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                            style={{ color: accent }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Week-by-week bridge (optional) */}
        {config.weekBridge && (
          <section className="py-14 md:py-16">
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-2xl text-center">
              <p className="font-serif italic text-[16px] md:text-[17px] text-foreground/80 leading-relaxed">
                {config.weekBridge.line}
              </p>
              <Link
                to={config.weekBridge.href}
                className="group mt-4 inline-flex items-center gap-1.5 font-sans text-[12px] font-medium tracking-wide"
                style={{ color: accent }}
              >
                {config.weekBridge.label}
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </section>
        )}

        {/* 6. Sibling topics */}
        {config.showSiblings !== false && (
          <section className="py-14 md:py-16 border-t" style={{ borderColor: accentSoft }}>
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl text-center">
              <Eyebrow>Other pregnancy topics</Eyebrow>
              <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
                {siblings.map((s) => {
                  const isLive = LIVE_TOPIC_SLUGS.includes(s.slug);
                  if (isLive) {
                    return (
                      <li key={s.slug}>
                        <Link
                          to={`/pregnancy/${s.slug}`}
                          className="group inline-flex items-center gap-1 font-sans text-[13px] font-light text-foreground/80 hover:text-foreground transition-colors"
                        >
                          {s.eyebrow}
                          <ChevronRight
                            size={13}
                            className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                            style={{ color: accent }}
                          />
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li
                      key={s.slug}
                      className="font-sans text-[13px] font-light text-muted-foreground/60"
                    >
                      {s.eyebrow}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}

        {/* 8. Quiet footer link */}
        <section className="py-14 md:py-16 text-center">
          <Link
            to="/pregnancy"
            className="font-sans text-sm font-light text-sage-muted hover:text-sage transition-colors underline underline-offset-4"
          >
            ← Back to the Pregnancy Map
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PregnancyTopicPage;
