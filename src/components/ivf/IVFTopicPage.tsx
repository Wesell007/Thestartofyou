import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ChevronRight, Check, Sparkles, ShieldCheck, AlertCircle, NotebookPen, HelpCircle } from "lucide-react";
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

  // Remember the IVF stage the reader is on so that any article they open
  // next can offer a clear "Back to <stage>" link. Cleared with the tab.
  useEffect(() => {
    try {
      sessionStorage.setItem(
        "ivf:lastStage",
        JSON.stringify({
          slug: config.slug,
          title: config.title,
          href: `/ivf/${config.slug}`,
        })
      );
    } catch {
      // sessionStorage may be unavailable; ignore
    }
  }, [config.slug, config.title]);

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
            className="pointer-events-none absolute inset-x-0 top-0 h-56 md:h-80 -z-0"
            style={{ background: `linear-gradient(180deg, ${tintWash} 0%, transparent 100%)` }}
          />
          <svg
            aria-hidden
            className="hidden md:block absolute top-24 left-6 lg:left-10 w-24 opacity-60 pointer-events-none"
            viewBox="0 0 80 120" fill="none"
          >
            <path d="M40 5 Q 40 60 40 115" stroke={accent} strokeWidth="0.7" opacity="0.55" />
            <path d="M40 28 Q 22 30 14 22" stroke={accent} strokeWidth="0.7" opacity="0.45" />
            <path d="M40 28 Q 58 30 66 22" stroke={accent} strokeWidth="0.7" opacity="0.45" />
            <path d="M40 55 Q 22 58 12 50" stroke={accent} strokeWidth="0.7" opacity="0.45" />
            <path d="M40 55 Q 58 58 68 50" stroke={accent} strokeWidth="0.7" opacity="0.45" />
            <path d="M40 82 Q 24 84 16 76" stroke={accent} strokeWidth="0.7" opacity="0.45" />
            <path d="M40 82 Q 56 84 64 76" stroke={accent} strokeWidth="0.7" opacity="0.45" />
            <circle cx="14" cy="22" r="2" fill={accent} opacity="0.5" />
            <circle cx="66" cy="22" r="2" fill={accent} opacity="0.5" />
            <circle cx="12" cy="50" r="2.4" fill={accent} opacity="0.5" />
            <circle cx="68" cy="50" r="2.4" fill={accent} opacity="0.5" />
            <circle cx="16" cy="76" r="2" fill={accent} opacity="0.5" />
            <circle cx="64" cy="76" r="2" fill={accent} opacity="0.5" />
          </svg>
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
                <div className="mt-7 flex items-center gap-3">
                  <span className="h-px w-8" style={{ background: accentMid }} />
                  <span className="font-serif italic text-[13.5px] text-foreground/55">
                    {config.emotionalNote.quote}
                  </span>
                </div>
              </div>
              <div className="md:col-span-6 order-1 md:order-2 relative">
                <div className="relative mx-auto max-w-[460px] md:max-w-none">
                  <div
                    className="absolute inset-0 -m-6 rounded-full opacity-70 blur-3xl"
                    style={{
                      background: `radial-gradient(circle at 50% 45%, hsl(${IVF_TINT_HSL} / 0.95) 0%, transparent 65%)`,
                    }}
                    aria-hidden
                  />
                  <div
                    className="absolute -inset-2 rounded-[2.2rem] opacity-40 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, hsl(${IVF_ACCENT_HSL} / 0.18), transparent 60%)`,
                    }}
                    aria-hidden
                  />
                  <img
                    src={config.heroImage}
                    alt=""
                    aria-hidden="true"
                    loading="eager"
                    className="relative w-full h-auto rounded-[2rem] object-cover block shadow-[0_40px_80px_-50px_rgba(0,0,0,0.4)]"
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
              {config.startHere.map((item, idx) => (
                <Link
                  key={item.href + item.title}
                  to={item.href}
                  className="group flex flex-col bg-card rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(0,0,0,0.25)] relative overflow-hidden"
                  style={{ borderColor: accentBorder }}
                >
                  <span
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"
                    style={{ background: `hsl(${IVF_ACCENT_HSL} / 0.18)` }}
                    aria-hidden
                  />
                  <span
                    className="font-serif text-[11px] tracking-[0.22em] uppercase mb-3 relative"
                    style={{ color: accent }}
                  >
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl md:text-[1.4rem] text-foreground leading-snug relative">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-[14px] font-light text-muted-foreground leading-relaxed flex-1 relative">
                    {item.why}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 font-sans text-[13px] font-medium relative"
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

        {/* FEATURED ANCHOR CARD */}
        <section className="pb-14 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <Link
              to={config.featured.href}
              className="group block relative rounded-[2rem] overflow-hidden border p-7 sm:p-10 md:p-12 transition-all hover:-translate-y-0.5 hover:shadow-[0_30px_70px_-40px_rgba(0,0,0,0.25)]"
              style={{
                background: `linear-gradient(135deg, hsl(${IVF_TINT_HSL} / 0.85) 0%, hsl(${IVF_ACCENT_HSL} / 0.10) 100%)`,
                borderColor: accentBorder,
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-16 w-72 h-72 rounded-full blur-3xl opacity-60"
                style={{ background: `hsl(${IVF_ACCENT_HSL} / 0.18)` }}
              />
              <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
                <div className="md:col-span-8">
                  <Eyebrow>{config.featured.eyebrow}</Eyebrow>
                  <h3 className="mt-3 font-serif text-2xl md:text-[1.9rem] text-foreground leading-snug">
                    {config.featured.title}
                  </h3>
                  <p className="mt-3 font-sans text-[14.5px] font-light text-muted-foreground leading-relaxed max-w-2xl">
                    {config.featured.body}
                  </p>
                </div>
                <div className="md:col-span-4 md:text-right">
                  <span
                    className="inline-flex items-center gap-2 font-sans text-[13.5px] font-medium"
                    style={{ color: accent }}
                  >
                    {config.featured.hrefLabel}
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* NORMAL / SEEK SUPPORT BAND */}
        <section className="pb-14 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-5xl">
            <div className="text-center mb-8">
              <SectionLabel>What's normal · When to seek support</SectionLabel>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div
                className="rounded-2xl border p-6 sm:p-7"
                style={{
                  borderColor: accentBorder,
                  background: `hsl(${IVF_TINT_HSL} / 0.55)`,
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck size={16} style={{ color: accent }} />
                  <span
                    className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
                    style={{ color: accent }}
                  >
                    Often normal
                  </span>
                </div>
                <ul className="space-y-3">
                  {config.normalVsSupport.normal.map((n, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span
                        className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full"
                        style={{ background: accent }}
                      />
                      <span className="font-sans text-[14px] font-light text-foreground/85 leading-relaxed">
                        {n}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="rounded-2xl border p-6 sm:p-7"
                style={{
                  borderColor: 'hsl(var(--terracotta) / 0.25)',
                  background: 'hsl(var(--terracotta) / 0.06)',
                }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle size={16} className="text-terracotta" />
                  <span className="font-sans text-[11px] font-light tracking-[0.22em] uppercase text-terracotta">
                    Seek support
                  </span>
                </div>
                <ul className="space-y-3">
                  {config.normalVsSupport.seek.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-terracotta" />
                      <span className="font-sans text-[14px] font-light text-foreground/85 leading-relaxed">
                        {s}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-5 text-center font-sans text-[12.5px] font-light text-muted-foreground/80">
              ✔ Medically reviewed by Jenny Joines
            </p>
          </div>
        </section>

        {/* STAGE-SPECIFIC BLOCK — Before transfer: protocol week */}
        {config.protocolWeek && (
          <section className="pb-14 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
              <div
                className="rounded-[2rem] border bg-card p-7 sm:p-10"
                style={{ borderColor: accentBorder }}
              >
                <Eyebrow>A typical shape</Eyebrow>
                <h3 className="mt-3 font-serif text-2xl md:text-[1.75rem] text-foreground leading-snug">
                  {config.protocolWeek.title}
                </h3>
                {config.protocolWeek.intro && (
                  <p className="mt-3 font-sans text-[14px] font-light text-muted-foreground leading-relaxed max-w-2xl">
                    {config.protocolWeek.intro}
                  </p>
                )}
                <ol className="mt-7 space-y-0">
                  {config.protocolWeek.items.map((row, i) => (
                    <li
                      key={i}
                      className="grid grid-cols-[110px_1fr] sm:grid-cols-[150px_1fr] gap-4 py-4 border-t first:border-t-0"
                      style={{ borderColor: accentSoft }}
                    >
                      <span
                        className="font-serif text-[13px] tracking-[0.16em] uppercase pt-0.5"
                        style={{ color: accent }}
                      >
                        {row.day}
                      </span>
                      <span className="font-sans text-[14px] font-light text-foreground/85 leading-relaxed">
                        {row.body}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        {/* STAGE-SPECIFIC BLOCK — Early pregnancy: handover */}
        {config.handoverNote && (
          <section className="pb-14 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
              <div
                className="rounded-[2rem] border p-7 sm:p-10"
                style={{
                  borderColor: accentBorder,
                  background: `linear-gradient(135deg, hsl(${IVF_TINT_HSL} / 0.7), hsl(var(--stage-pregnancy) / 0.10) 100%)`,
                }}
              >
                <Eyebrow>The handover</Eyebrow>
                <h3 className="mt-3 font-serif text-2xl md:text-[1.75rem] text-foreground leading-snug">
                  {config.handoverNote.title}
                </h3>
                <p className="mt-4 font-sans text-[14.5px] font-light text-foreground/85 leading-relaxed max-w-2xl">
                  {config.handoverNote.when}
                </p>
                <div className="mt-6">
                  <span
                    className="font-sans text-[11px] font-light tracking-[0.22em] uppercase"
                    style={{ color: accent }}
                  >
                    What signals it
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {config.handoverNote.signals.map((s, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
                        <span className="font-sans text-[14px] font-light text-foreground/85 leading-relaxed">
                          {s}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 font-sans text-[14px] font-light text-muted-foreground leading-relaxed max-w-2xl">
                  <span className="font-medium text-foreground/85">Who picks up: </span>
                  {config.handoverNote.who}
                </p>
                <Link
                  to={config.handoverNote.href}
                  className="mt-6 inline-flex items-center gap-2 rounded-pill bg-terracotta text-terracotta-foreground px-6 py-3 font-sans text-[13px] font-medium shadow-cta hover:bg-terracotta-hover transition-all"
                >
                  {config.handoverNote.hrefLabel}
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* EMOTIONAL BAND — stage-specific emotional intelligence */}
        <section className="pb-14 md:pb-20">
          <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
            <div
              className="relative rounded-[2rem] overflow-hidden p-8 sm:p-10 md:p-14 text-center"
              style={{
                background: `linear-gradient(135deg, hsl(${IVF_TINT_HSL} / 0.7) 0%, hsl(${IVF_ACCENT_HSL} / 0.08) 100%)`,
                border: `1px solid ${accentBorder}`,
              }}
            >
              <span
                className="font-sans text-[11px] font-light tracking-[0.28em] uppercase block mb-5"
                style={{ color: accent }}
              >
                {config.emotionalNote.eyebrow}
              </span>
              <p className="font-serif italic text-xl md:text-2xl text-foreground/85 leading-snug max-w-2xl mx-auto">
                "{config.emotionalNote.quote}"
              </p>
              <div className="h-px w-12 mx-auto my-6" style={{ background: accentMid }} />
              <p className="font-sans text-[14.5px] font-light text-muted-foreground leading-relaxed max-w-xl mx-auto">
                {config.emotionalNote.body}
              </p>

              {/* Soft journal layer — tucked inside the emotional band, not its own section */}
              {config.journalNote && (
                <div
                  className="mt-8 mx-auto max-w-xl rounded-2xl border bg-card/70 backdrop-blur-sm px-5 py-4 text-left flex items-start gap-4"
                  style={{ borderColor: accentBorder }}
                >
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: accentSoft }}
                  >
                    <NotebookPen size={14} style={{ color: accent }} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-[13.5px] font-light text-foreground/80 leading-relaxed">
                      {config.journalNote.line}
                    </p>
                    <Link
                      to={config.journalNote.href}
                      className="mt-2 inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium transition-colors"
                      style={{ color: accent }}
                    >
                      {config.journalNote.cta}
                      <ArrowUpRight size={11} />
                    </Link>
                  </div>
                </div>
              )}
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
                      <p
                        className="font-sans text-[11px] font-light tracking-[0.18em] uppercase mb-2"
                        style={{ color: `hsl(${IVF_ACCENT_HSL} / 0.75)` }}
                      >
                        {group.description}
                      </p>
                    )}
                    {group.intro && (
                      <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-3">
                        {group.intro}
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

        {/* COMMON QUESTIONS STRIP */}
        {config.commonQuestions?.length > 0 && (
          <section className="pb-16 md:pb-20">
            <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-4xl">
              <div className="text-center mb-7">
                <SectionLabel>Common questions</SectionLabel>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.commonQuestions.slice(0, 4).map((q) => (
                  <li key={q}>
                    <Link
                      to={`/ask?q=${encodeURIComponent(q)}&ctx=${encodeURIComponent(`IVF · ${config.eyebrow}`)}`}
                      className="group flex items-center gap-3 rounded-full border bg-card px-5 py-3 transition-all hover:-translate-y-0.5 hover:shadow-card-brand"
                      style={{ borderColor: accentBorder }}
                    >
                      <span
                        className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: accentSoft }}
                      >
                        <HelpCircle size={13} style={{ color: accent }} />
                      </span>
                      <span className="flex-1 font-sans text-[13.5px] font-light text-foreground/85 leading-snug">
                        {q}
                      </span>
                      <ArrowRight
                        size={13}
                        className="shrink-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                        style={{ color: accent }}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

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
