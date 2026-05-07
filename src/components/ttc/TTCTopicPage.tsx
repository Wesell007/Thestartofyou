import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Check, Leaf } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AISearchBar from "@/components/shared/AISearchBar";
import {
  TTCPageConfig,
  TTC_PILLAR_ORDER,
  ttcPageConfigs,
} from "@/data/ttcTopicData";
import sprigImg from "@/assets/topic-mini-sprig.png";
import wildflowerImg from "@/assets/topic-wildflower-sprig.png";

interface Props {
  config: TTCPageConfig;
  heroImage: string;
}

const TTCTopicPage = ({ config, heroImage }: Props) => {
  const accent = `hsl(${config.accentHsl})`;
  const accentSoft = `hsl(${config.accentHsl} / 0.10)`;
  const accentMid = `hsl(${config.accentHsl} / 0.20)`;
  const accentBorder = `hsl(${config.accentHsl} / 0.16)`;
  const tintWash = `hsl(${config.tintHsl} / 0.55)`;

  const siblings = TTC_PILLAR_ORDER.filter((s) => s !== config.slug).map(
    (s) => ttcPageConfigs[s]
  );

  if (typeof document !== "undefined") {
    document.title = `${config.title} | Trying to Conceive | The Start of You`;
    const desc = config.intro.slice(0, 158);
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }

  const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <p
      className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
      style={{ color: accent }}
    >
      {children}
    </p>
  );

  const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-10" style={{ background: accentMid }} />
      <span
        className="font-sans text-[11px] font-light tracking-[0.28em] uppercase"
        style={{ color: accent }}
      >
        {children}
      </span>
      <span className="h-px w-10" style={{ background: accentMid }} />
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">
        {/* Breadcrumb */}
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl pt-[100px] sm:pt-[116px] md:pt-[128px]">
          <nav
            aria-label="Breadcrumb"
            className="font-sans text-[12px] font-light tracking-wide text-muted-foreground"
          >
            <Link to="/trying-to-conceive" className="hover:text-foreground transition-colors">
              The TTC Guide
            </Link>
            <span className="mx-2 opacity-50">›</span>
            <span className="text-foreground/80">{config.eyebrow}</span>
          </nav>
        </div>

        {/* HERO */}
        <section className="relative pt-6 sm:pt-10 md:pt-14 pb-20 md:pb-32">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-72 -z-0"
            style={{ background: `linear-gradient(180deg, ${tintWash} 0%, transparent 100%)` }}
          />
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="md:col-span-6 order-2 md:order-1">
                <Eyebrow>The TTC Guide · {config.eyebrow}</Eyebrow>
                <h1 className="mt-5 font-serif text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.4rem] text-foreground leading-[1.06]">
                  {config.title}
                </h1>
                <p className="mt-6 font-sans text-[15px] md:text-base font-light text-muted-foreground leading-relaxed max-w-md">
                  {config.intro}
                </p>
              </div>
              <div className="md:col-span-6 order-1 md:order-2 relative">
                <div className="relative mx-auto max-w-[460px] md:max-w-none">
                  <div
                    className="absolute inset-0 -m-4 rounded-full opacity-60 blur-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 45%, hsl(${config.tintHsl} / 0.7) 0%, transparent 65%)`,
                    }}
                    aria-hidden
                  />
                  <img
                    src={heroImage}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    className="relative w-full h-auto rounded-[2rem] object-cover"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                  <img
                    src={sprigImg}
                    alt=""
                    aria-hidden="true"
                    className="hidden sm:block absolute -left-6 md:-left-10 bottom-6 w-24 md:w-32 opacity-90 pointer-events-none"
                  />
                  <img
                    src={wildflowerImg}
                    alt=""
                    aria-hidden="true"
                    className="hidden sm:block absolute -right-3 md:-right-6 top-8 w-16 md:w-20 opacity-80 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT THIS COVERS */}
        <section className="relative -mt-12 md:-mt-20 pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div
              className="bg-card rounded-[2rem] border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.18)] p-6 sm:p-10 md:p-14"
              style={{ borderColor: accentBorder }}
            >
              <h2 className="font-serif text-2xl md:text-3xl text-foreground leading-tight text-center md:text-left">
                What this topic covers
              </h2>
              {config.whatThisCovers.lead && (
                <p className="mt-3 font-serif italic text-[14.5px] text-muted-foreground/85 max-w-xl text-center md:text-left mx-auto md:mx-0">
                  {config.whatThisCovers.lead}
                </p>
              )}
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mt-6">
                {config.whatThisCovers.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accentSoft }}
                    >
                      <Check size={11} style={{ color: accent }} strokeWidth={2.5} />
                    </span>
                    <span className="font-sans text-[14.5px] font-light text-foreground/80 leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* START HERE */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            <SectionLabel>Start here</SectionLabel>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
              {config.startHere.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex flex-col bg-card rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)]"
                  style={{ borderColor: accentBorder }}
                >
                  <h3 className="font-serif text-xl md:text-[1.4rem] text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-[14px] font-light text-muted-foreground leading-relaxed flex-1">
                    {item.why}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium"
                    style={{ color: accent }}
                  >
                    Read the guide
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* GROUPS */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            <div
              className="bg-card rounded-[2rem] border p-5 sm:p-8 md:p-12 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.15)]"
              style={{ borderColor: accentBorder }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {config.groups.map((group) => (
                  <div key={group.label} className="flex flex-col">
                    <h3 className="font-serif text-[1.05rem] md:text-[1.15rem] text-foreground leading-snug mb-1">
                      {group.label}
                    </h3>
                    {group.description && (
                      <p className="font-sans text-[12.5px] font-light text-muted-foreground/80 mb-3 leading-relaxed">
                        {group.description}
                      </p>
                    )}
                    <ul className="flex flex-col mt-1">
                      {group.links.slice(0, 5).map((link) => (
                        <li
                          key={link.href + link.label}
                          className="border-t first:border-t-0"
                          style={{ borderColor: accentSoft }}
                        >
                          <Link to={link.href} className="group flex items-center gap-3 py-2.5">
                            <span className="flex-1 font-sans text-[13px] font-light text-foreground/85 leading-snug group-hover:text-foreground transition-colors">
                              {link.label}
                            </span>
                            <ChevronRight
                              size={13}
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

              {config.curationNote && (
                <p className="mt-10 font-serif italic text-[14px] text-muted-foreground/80 leading-relaxed text-center max-w-xl mx-auto">
                  {config.curationNote}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* AI BRIDGE */}
        {config.aiPrompts && config.aiPrompts.length > 0 && (
          <section className="py-14 md:py-20" style={{ background: `hsl(${config.tintHsl} / 0.45)` }}>
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
              <Eyebrow>AI Support</Eyebrow>
              <h2 className="mt-3 font-serif text-2xl md:text-3xl text-foreground leading-tight mb-4">
                Ask anything about <span className="italic font-normal">{config.eyebrow.toLowerCase()}</span>
              </h2>
              <div className="mt-6">
                <AISearchBar
                  placeholder={`Ask anything about ${config.eyebrow.toLowerCase()}…`}
                  suggestions={config.aiPrompts}
                  context={`TTC · ${config.eyebrow}`}
                />
              </div>
            </div>
          </section>
        )}

        {/* SIBLINGS */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            <div className="text-center mb-8">
              <SectionLabel>Other TTC topics</SectionLabel>
            </div>
            <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {siblings.map((s) => {
                const sAccent = `hsl(${s.accentHsl})`;
                const sSoft = `hsl(${s.accentHsl} / 0.12)`;
                return (
                  <li key={s.slug}>
                    <Link to={`/trying-to-conceive/${s.slug}`}>
                      <span
                        className="group flex items-center gap-2.5 rounded-full bg-card border px-4 sm:px-5 py-2.5 sm:py-3 transition-all hover:-translate-y-0.5 hover:shadow-card-brand"
                        style={{ borderColor: sSoft }}
                      >
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: sSoft }}
                        >
                          <Leaf size={13} style={{ color: sAccent }} />
                        </span>
                        <span className="font-serif italic text-[14px] text-foreground/85">
                          {s.eyebrow}
                        </span>
                        <ChevronRight
                          size={13}
                          className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                          style={{ color: sAccent }}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* BACK */}
        <section className="pb-16 md:pb-20 text-center">
          <Link
            to="/trying-to-conceive"
            className="font-sans text-[13.5px] font-light text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to the TTC Guide
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TTCTopicPage;
