import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AISearchBar from "@/components/shared/AISearchBar";
import {
  IVFTopicConfig,
  IVF_TOPIC_ORDER,
  ivfTopicConfigs,
  IVF_ACCENT_HSL,
  IVF_TINT_HSL,
} from "@/data/ivfTopicData";

interface Props {
  config: IVFTopicConfig;
}

const IVFTopicPage = ({ config }: Props) => {
  const accent = `hsl(${IVF_ACCENT_HSL})`;
  const accentSoft = `hsl(${IVF_ACCENT_HSL} / 0.10)`;
  const accentMid = `hsl(${IVF_ACCENT_HSL} / 0.20)`;
  const accentBorder = `hsl(${IVF_ACCENT_HSL} / 0.16)`;
  const tintWash = `hsl(${IVF_TINT_HSL} / 0.6)`;

  const siblings = IVF_TOPIC_ORDER.filter((s) => s !== config.slug).map(
    (s) => ivfTopicConfigs[s]
  );

  if (typeof document !== "undefined") {
    document.title = `${config.title} | IVF | The Start of You`;
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
            <Link to="/ivf" className="hover:text-foreground transition-colors">
              IVF
            </Link>
            <span className="mx-2 opacity-50">›</span>
            <span className="text-foreground/80">{config.eyebrow}</span>
          </nav>
        </div>

        {/* HERO */}
        <section className="relative pt-6 sm:pt-10 md:pt-14 pb-20 md:pb-28">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-48 md:h-72 -z-0"
            style={{ background: `linear-gradient(180deg, ${tintWash} 0%, transparent 100%)` }}
          />
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
              <div className="md:col-span-6 order-2 md:order-1">
                <Eyebrow>IVF · {config.stageIndicator}</Eyebrow>
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
                      background: `radial-gradient(circle at 50% 45%, hsl(${IVF_TINT_HSL} / 0.85) 0%, transparent 65%)`,
                    }}
                    aria-hidden
                  />
                  <img
                    src={config.heroImage}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    className="relative w-full h-auto rounded-[2rem] object-cover block"
                    style={{ aspectRatio: "1 / 1" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT THIS COVERS */}
        <section className="relative -mt-12 md:-mt-20 pb-14 md:pb-20">
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

        {/* AI BRIDGE — surfaced high, like TTC topic pages */}
        <section className="py-12 md:py-16" style={{ background: `hsl(${IVF_TINT_HSL} / 0.5)` }}>
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
            <Eyebrow>AI Support</Eyebrow>
            <h2 className="mt-3 font-serif text-2xl md:text-3xl text-foreground leading-tight mb-4">
              Ask anything about <span className="italic font-normal">{config.eyebrow.toLowerCase()}</span>
            </h2>
            <div className="mt-6">
              <AISearchBar
                placeholder={`Ask anything about ${config.eyebrow.toLowerCase()}…`}
                suggestions={config.aiPrompts}
                context={`IVF · ${config.eyebrow}`}
              />
            </div>
          </div>
        </section>

        {/* START HERE */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            <SectionLabel>Start here</SectionLabel>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
              {config.startHere.map((item) => (
                <Link
                  key={item.href + item.title}
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
                    Open
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

        {/* PREV / NEXT */}
        {(config.prevTopic || config.nextTopic) && (
          <section className="pb-14 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {config.prevTopic ? (
                  <Link
                    to={config.prevTopic.href}
                    className="group flex items-center gap-3 bg-card rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-brand"
                    style={{ borderColor: accentBorder }}
                  >
                    <ChevronRight size={14} className="rotate-180 opacity-60" style={{ color: accent }} />
                    <div>
                      <span className="font-sans text-[11px] font-light tracking-[0.18em] uppercase block" style={{ color: accent }}>
                        Previous stage
                      </span>
                      <span className="font-serif text-base text-foreground/90">{config.prevTopic.label}</span>
                    </div>
                  </Link>
                ) : <div />}
                {config.nextTopic ? (
                  <Link
                    to={config.nextTopic.href}
                    className="group flex items-center justify-end gap-3 text-right bg-card rounded-2xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-card-brand"
                    style={{ borderColor: accentBorder }}
                  >
                    <div>
                      <span className="font-sans text-[11px] font-light tracking-[0.18em] uppercase block" style={{ color: accent }}>
                        Next stage
                      </span>
                      <span className="font-serif text-base text-foreground/90">{config.nextTopic.label}</span>
                    </div>
                    <ChevronRight size={14} className="opacity-60" style={{ color: accent }} />
                  </Link>
                ) : <div />}
              </div>
            </div>
          </section>
        )}

        {/* SIBLINGS */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
            <div className="text-center mb-8">
              <SectionLabel>Other IVF stages</SectionLabel>
            </div>
            <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link to={`/ivf/${s.slug}`}>
                    <span
                      className="group flex items-center gap-2.5 rounded-full bg-card border px-4 sm:px-5 py-2.5 sm:py-3 transition-all hover:-translate-y-0.5 hover:shadow-card-brand"
                      style={{ borderColor: accentSoft }}
                    >
                      <span
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: accentSoft }}
                      >
                        <Sparkles size={12} style={{ color: accent }} />
                      </span>
                      <span className="font-serif italic text-[14px] text-foreground/85">
                        {s.eyebrow}
                      </span>
                      <ChevronRight
                        size={13}
                        className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                        style={{ color: accent }}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* BACK */}
        <section className="pb-16 md:pb-20 text-center">
          <Link
            to="/ivf"
            className="font-sans text-[13.5px] font-light text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to the IVF hub
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IVFTopicPage;
