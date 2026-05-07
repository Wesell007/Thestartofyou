import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AISearchBar from "@/components/shared/AISearchBar";
import {
  TTCPageConfig,
  TTC_SUBTOPIC_ORDER,
  ttcPageConfigs,
} from "@/data/ttcTopicData";

interface Props {
  config: TTCPageConfig;
  heroImage: string;
}

const TTCSubtopicPage = ({ config, heroImage }: Props) => {
  const accent = `hsl(${config.accentHsl})`;
  const accentSoft = `hsl(${config.accentHsl} / 0.10)`;
  const accentBorder = `hsl(${config.accentHsl} / 0.16)`;
  const tintWash = `hsl(${config.tintHsl} / 0.55)`;

  const parent = config.parent ? ttcPageConfigs[config.parent] : null;
  const otherSubtopics = TTC_SUBTOPIC_ORDER.filter((s) => s !== config.slug).map(
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

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main className="overflow-hidden">
        {/* Breadcrumb */}
        <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl pt-[100px] sm:pt-[116px] md:pt-[128px]">
          <nav
            aria-label="Breadcrumb"
            className="font-sans text-[12px] font-light tracking-wide text-muted-foreground"
          >
            <Link to="/trying-to-conceive" className="hover:text-foreground transition-colors">
              The TTC Guide
            </Link>
            {parent && (
              <>
                <span className="mx-2 opacity-50">›</span>
                <Link
                  to={`/trying-to-conceive/${parent.slug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {parent.eyebrow}
                </Link>
              </>
            )}
            <span className="mx-2 opacity-50">›</span>
            <span className="text-foreground/80">{config.eyebrow}</span>
          </nav>
        </div>

        {/* HERO */}
        <section className="relative pt-6 sm:pt-10 md:pt-12 pb-16 md:pb-24">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-44 md:h-64 -z-0"
            style={{ background: `linear-gradient(180deg, ${tintWash} 0%, transparent 100%)` }}
          />
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 order-2 md:order-1">
                <Eyebrow>TTC · Supporting guide</Eyebrow>
                <h1 className="mt-4 font-serif text-[1.85rem] sm:text-[2.25rem] md:text-[2.6rem] text-foreground leading-[1.08]">
                  {config.title}
                </h1>
                <p className="mt-5 font-sans text-[15px] font-light text-muted-foreground leading-relaxed max-w-md">
                  {config.intro}
                </p>
              </div>
              <div className="md:col-span-5 order-1 md:order-2">
                <div
                  className="relative rounded-[1.75rem] overflow-hidden border"
                  style={{ borderColor: accentBorder }}
                >
                  <img
                    src={heroImage}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-56 sm:h-72 md:h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT THIS COVERS */}
        <section className="pb-14 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
            <div
              className="bg-card rounded-[1.5rem] border p-6 sm:p-8 md:p-10"
              style={{ borderColor: accentBorder }}
            >
              <h2 className="font-serif text-xl md:text-2xl text-foreground leading-tight">
                What this subtopic covers
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-5">
                {config.whatThisCovers.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: accentSoft }}
                    >
                      <Check size={11} style={{ color: accent }} strokeWidth={2.5} />
                    </span>
                    <span className="font-sans text-[14px] font-light text-foreground/80 leading-relaxed">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* START HERE */}
        <section className="pb-14 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="text-center mb-8">
              <Eyebrow>Start here</Eyebrow>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {config.startHere.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group flex flex-col bg-card rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-[0_18px_44px_-28px_rgba(0,0,0,0.22)]"
                  style={{ borderColor: accentBorder }}
                >
                  <h3 className="font-serif text-[1.15rem] text-foreground leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-sans text-[13.5px] font-light text-muted-foreground leading-relaxed flex-1">
                    {item.why}
                  </p>
                  <span
                    className="mt-3 inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium"
                    style={{ color: accent }}
                  >
                    Read the guide
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* GROUPS */}
        <section className="pb-14 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.groups.map((group) => (
                <div
                  key={group.label}
                  className="bg-card rounded-2xl border p-6"
                  style={{ borderColor: accentBorder }}
                >
                  <h3 className="font-serif text-[1.1rem] text-foreground leading-snug mb-1">
                    {group.label}
                  </h3>
                  {group.description && (
                    <p className="font-sans text-[12.5px] font-light text-muted-foreground/80 mb-3 leading-relaxed">
                      {group.description}
                    </p>
                  )}
                  <ul className="flex flex-col mt-2">
                    {group.links.map((link) => (
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
              <p className="mt-8 font-serif italic text-[13.5px] text-muted-foreground/80 leading-relaxed text-center max-w-xl mx-auto">
                {config.curationNote}
              </p>
            )}
          </div>
        </section>

        {/* AI BRIDGE */}
        {config.aiPrompts && config.aiPrompts.length > 0 && (
          <section className="py-14 md:py-20" style={{ background: `hsl(${config.tintHsl} / 0.45)` }}>
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-3xl text-center">
              <Eyebrow>AI Support</Eyebrow>
              <h2 className="mt-3 font-serif text-2xl md:text-[1.85rem] text-foreground leading-tight mb-4">
                Ask anything specific
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

        {/* CONTINUE EXPLORING */}
        <section className="py-14 md:py-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            {parent && (
              <div className="mb-10 text-center">
                <p className="font-serif italic text-lg md:text-xl text-foreground/85 mb-4">
                  Continue in the wider {parent.eyebrow.toLowerCase()} topic.
                </p>
                <Link
                  to={`/trying-to-conceive/${parent.slug}`}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-sans text-[13.5px] font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ backgroundColor: accent }}
                >
                  Open {parent.eyebrow}
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}

            <div className="text-center mb-5">
              <Eyebrow>Other supporting guides</Eyebrow>
            </div>
            <ul className="flex flex-wrap justify-center gap-3">
              {otherSubtopics.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/trying-to-conceive/${s.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-card border px-4 py-2.5 transition-all hover:-translate-y-0.5"
                    style={{ borderColor: accentSoft }}
                  >
                    <span className="font-serif italic text-[13.5px] text-foreground/85">
                      {s.eyebrow}
                    </span>
                    <ChevronRight
                      size={13}
                      className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                      style={{ color: accent }}
                    />
                  </Link>
                </li>
              ))}
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

export default TTCSubtopicPage;
