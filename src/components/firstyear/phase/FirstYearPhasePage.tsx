import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, BookOpen, Sparkles, ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { PhaseConfig } from "@/data/firstYearPhaseData";

// Resolve hero asset via Vite's import.meta.glob (eager URL imports).
const heroAssets = import.meta.glob("@/assets/firstyear-stage-*.jpg", {
  eager: true,
  import: "default",
  query: "?url",
}) as Record<string, string>;
const resolveHero = (filename?: string): string | undefined => {
  if (!filename) return undefined;
  const match = Object.entries(heroAssets).find(([k]) => k.endsWith(`/${filename}`));
  return match?.[1];
};

type Props = { config: PhaseConfig };

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="font-sans text-[11px] font-light tracking-[0.2em] uppercase text-foreground/55 mb-3">
    {children}
  </p>
);

const QuietRule = () => (
  <div className="h-px w-full" style={{ backgroundColor: "hsl(var(--border) / 0.55)" }} />
);

const PhaseHero = ({ config }: Props) => {
  const imgSrc = resolveHero(config.heroImage);

  return (
    <section className="relative bg-parchment pt-28 pb-12 md:pt-32 md:pb-16 overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-48 pointer-events-none flex">
        <div
          className="w-1/2 h-full blur-3xl opacity-50"
          style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.26)" }}
        />
        <div
          className="w-1/2 h-full blur-3xl opacity-50"
          style={{ backgroundColor: "hsl(var(--stage-recovery-soft) / 0.22)" }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl relative">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-14 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="h-px w-7 bg-foreground/25" />
              <span className="font-sans text-[11px] font-light tracking-[0.3em] uppercase text-foreground/65">
                First year · Month by month
              </span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.75rem] text-foreground leading-[1.08] mb-5">
              {config.title}
            </h1>
            <p className="font-sans text-[16px] md:text-[17px] font-light text-muted-foreground leading-relaxed max-w-xl">
              {config.intro}
            </p>
            <p className="font-sans text-[12px] font-light tracking-[0.2em] uppercase text-foreground/50 mt-7">
              {config.ageRange}
            </p>
          </div>

          <div className="hidden md:block">
            {imgSrc ? (
              <div
                className="relative w-full aspect-[5/6] max-w-[460px] ml-auto overflow-hidden rounded-2xl border"
                style={{ borderColor: "hsl(var(--border) / 0.7)" }}
              >
                <img
                  src={imgSrc}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: config.heroObjectPosition ?? "center 40%" }}
                />
              </div>
            ) : (
              <div
                className="relative w-full aspect-[5/6] max-w-[460px] ml-auto overflow-hidden rounded-2xl border"
                style={{ borderColor: "hsl(var(--border) / 0.7)" }}
              >
                <div className="absolute inset-0 grid grid-cols-2">
                  <div style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.5)" }} />
                  <div style={{ backgroundColor: "hsl(var(--stage-recovery-soft) / 0.45)" }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const InPhaseAges = ({ ages }: { ages: string[] }) => (
  <section className="bg-parchment py-10 md:py-12">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
      <SectionLabel>In this phase</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {ages.map((a) => (
          <span
            key={a}
            className="inline-flex items-center rounded-full px-4 py-2 font-sans text-[12px] font-light border"
            style={{
              backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.35)",
              color: "hsl(var(--stage-firstyear-deep))",
              borderColor: "hsl(var(--stage-firstyear-accent) / 0.22)",
            }}
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  </section>
);

const PairedSection = ({ config }: Props) => (
  <section className="bg-parchment py-16 md:py-22">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
        {/* Baby card */}
        <div
          className="relative overflow-hidden rounded-[28px] border p-8 md:p-10 shadow-[0_30px_80px_-40px_rgba(20,30,60,0.32),inset_0_1px_0_hsl(0_0%_100%/0.7)]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(var(--stage-firstyear-soft) / 0.42) 0%, hsl(var(--card)) 55%, hsl(var(--stage-firstyear-soft) / 0.22) 100%)",
            borderColor: "hsl(var(--stage-firstyear-accent) / 0.32)",
          }}
        >
          <div
            className="absolute top-0 bottom-0 left-0 w-[5px] rounded-r-full"
            style={{ backgroundColor: "hsl(var(--stage-firstyear-accent))" }}
            aria-hidden
          />
          <div
            className="absolute -top-20 -left-20 w-56 h-56 rounded-full blur-3xl opacity-60 pointer-events-none"
            style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.6)" }}
            aria-hidden
          />
          <div className="relative pl-3">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--stage-firstyear-accent))" }}
              />
              <p
                className="font-sans text-[11px] font-medium tracking-[0.28em] uppercase"
                style={{ color: "hsl(var(--stage-firstyear-deep))" }}
              >
                For your baby
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-[1.75rem] text-foreground leading-[1.15] mb-7">
              Baby changes in this phase
            </h2>
            <ul className="space-y-5">
              {config.babyChanges.map((b, i) => (
                <li
                  key={b.label}
                  className={i > 0 ? "pt-5 border-t border-border/40" : ""}
                >
                  <p
                    className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase mb-1.5"
                    style={{ color: "hsl(var(--stage-firstyear-accent))" }}
                  >
                    {b.label}
                  </p>
                  <p className="font-sans text-[15px] font-light text-foreground/85 leading-[1.75]">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Parent card */}
        <div
          className="relative overflow-hidden rounded-[28px] border p-8 md:p-10 shadow-[0_30px_80px_-40px_rgba(60,40,55,0.30),inset_0_1px_0_hsl(0_0%_100%/0.7)]"
          style={{
            backgroundImage:
              "linear-gradient(135deg, hsl(var(--stage-recovery-soft) / 0.38) 0%, hsl(var(--card)) 55%, hsl(var(--stage-recovery-soft) / 0.2) 100%)",
            borderColor: "hsl(var(--stage-recovery-accent) / 0.3)",
          }}
        >
          <div
            className="absolute top-0 bottom-0 left-0 w-[5px] rounded-r-full"
            style={{ backgroundColor: "hsl(var(--stage-recovery-accent))" }}
            aria-hidden
          />
          <div
            className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-55 pointer-events-none"
            style={{ backgroundColor: "hsl(var(--stage-recovery-soft) / 0.55)" }}
            aria-hidden
          />
          <div className="relative pl-3">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--stage-recovery-accent))" }}
              />
              <p
                className="font-sans text-[11px] font-medium tracking-[0.28em] uppercase"
                style={{ color: "hsl(var(--stage-recovery-deep))" }}
              >
                For you
              </p>
            </div>
            <h2 className="font-serif text-2xl sm:text-[1.75rem] text-foreground leading-[1.15] mb-7">
              Recovery and adjustment in this phase
            </h2>
            <ul className="space-y-5">
              {config.parentRecovery.map((b, i) => (
                <li
                  key={b.label}
                  className={i > 0 ? "pt-5 border-t border-border/40" : ""}
                >
                  <p
                    className="font-sans text-[11px] font-medium tracking-[0.18em] uppercase mb-1.5"
                    style={{ color: "hsl(var(--stage-recovery-accent))" }}
                  >
                    {b.label}
                  </p>
                  <p className="font-sans text-[15px] font-light text-foreground/85 leading-[1.75]">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const CommonQuestions = ({
  items,
  phaseSlug,
}: {
  items: PhaseConfig["commonQuestions"];
  phaseSlug: PhaseConfig["slug"];
}) => (
  <section className="bg-parchment py-12 md:py-16">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
      <SectionLabel>Common questions</SectionLabel>
      <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-8">
        Things parents often ask in this phase.
      </h2>
      <ul className="space-y-6">
        {items.map((qa) => {
          const topic = qa.askTopic ?? slugify(qa.q);
          return (
            <li key={qa.q}>
              <p className="font-serif text-[17px] text-foreground leading-snug mb-1.5">{qa.q}</p>
              <p className="font-sans text-[14px] font-light text-muted-foreground leading-relaxed">{qa.a}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {qa.readMore && (
                  <Link
                    to={qa.readMore.href}
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[12px] font-medium transition-all hover:-translate-y-[1px]"
                    style={{
                      backgroundColor: "hsl(var(--stage-firstyear-accent))",
                      color: "hsl(var(--card))",
                    }}
                  >
                    <BookOpen size={12} strokeWidth={1.9} />
                    Read: {qa.readMore.label}
                    <ArrowUpRight size={11} />
                  </Link>
                )}
                <Link
                  to={`/ask?stage=first-year&phase=${phaseSlug}&topic=${topic}`}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[12px] font-medium border bg-card transition-all hover:-translate-y-[1px]"
                  style={{
                    borderColor: "hsl(var(--stage-firstyear-accent) / 0.28)",
                    color: "hsl(var(--stage-firstyear-deep))",
                  }}
                >
                  <Sparkles size={12} strokeWidth={1.9} />
                  Ask about this
                </Link>
              </div>
              <div className="mt-5"><QuietRule /></div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

const PhaseEditorial = ({ text }: { text: string }) => (
  <section className="bg-parchment py-10 md:py-14">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
      <SectionLabel>What this phase can feel like</SectionLabel>
      <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-4">
        The honest shape of this stage.
      </h2>
      <p className="font-sans text-[15px] md:text-[16px] font-light text-foreground/80 leading-[1.85]">
        {text}
      </p>
    </div>
  </section>
);

const FeelsAndHelps = ({
  feels,
  helps,
}: {
  feels?: PhaseConfig["feelsHard"];
  helps?: PhaseConfig["whatHelps"];
}) => {
  if (!feels?.length && !helps?.length) return null;
  return (
    <section className="bg-parchment py-16 md:py-22">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {feels && feels.length > 0 && (
            <div
              className="rounded-[24px] border p-8 md:p-9 shadow-[0_24px_60px_-40px_rgba(60,40,55,0.28)]"
              style={{
                backgroundColor: "hsl(var(--stage-recovery-soft) / 0.3)",
                borderColor: "hsl(var(--stage-recovery-accent) / 0.28)",
              }}
            >
              <p
                className="font-sans text-[11px] font-medium tracking-[0.28em] uppercase mb-2.5"
                style={{ color: "hsl(var(--stage-recovery-deep))" }}
              >
                What often feels hard
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-[1.2] mb-6">
                The parts people rarely name out loud.
              </h3>
              <ul className="space-y-5">
                {feels.map((f, i) => (
                  <li
                    key={f.label}
                    className={i > 0 ? "pt-5 border-t border-border/40" : ""}
                  >
                    <div className="flex gap-4">
                      <span
                        className="font-serif text-[13px] tabular-nums shrink-0 mt-0.5"
                        style={{ color: "hsl(var(--stage-recovery-accent))" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="font-sans text-[13px] font-medium text-foreground/90 mb-1">
                          {f.label}
                        </p>
                        <p className="font-sans text-[14.5px] font-light text-foreground/80 leading-[1.75]">{f.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {helps && helps.length > 0 && (
            <div
              className="rounded-[24px] border p-8 md:p-9 shadow-[0_24px_60px_-40px_rgba(20,30,60,0.28)]"
              style={{
                backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.32)",
                borderColor: "hsl(var(--stage-firstyear-accent) / 0.28)",
              }}
            >
              <p
                className="font-sans text-[11px] font-medium tracking-[0.28em] uppercase mb-2.5"
                style={{ color: "hsl(var(--stage-firstyear-deep))" }}
              >
                What can help
              </p>
              <h3 className="font-serif text-xl sm:text-2xl text-foreground leading-[1.2] mb-6">
                Small things that make this phase kinder.
              </h3>
              <ul className="space-y-5">
                {helps.map((h, i) => (
                  <li
                    key={h.label}
                    className={i > 0 ? "pt-5 border-t border-border/40" : ""}
                  >
                    <div className="flex gap-4">
                      <span
                        className="font-serif text-[13px] tabular-nums shrink-0 mt-0.5"
                        style={{ color: "hsl(var(--stage-firstyear-accent))" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="font-sans text-[13px] font-medium text-foreground/90 mb-1">
                          {h.label}
                        </p>
                        <p className="font-sans text-[14.5px] font-light text-foreground/80 leading-[1.75]">{h.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const WhenToAskForSupport = ({ items }: { items: PhaseConfig["support"] }) => {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-parchment py-16 md:py-22">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl">
        <SectionLabel>When to ask for support</SectionLabel>
        <h2 className="font-serif text-2xl sm:text-[1.75rem] text-foreground leading-[1.15] mb-8">
          Who to turn to, and when.
        </h2>
        <div
          className="rounded-[24px] border p-7 md:p-10 bg-card shadow-[0_20px_50px_-30px_rgba(20,30,60,0.18)]"
          style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.24)" }}
        >
          <ul>
            {items.map((s, i) => (
              <li
                key={s.label}
                className={i > 0 ? "pt-6 mt-6 border-t border-border/40" : ""}
              >
                <div className="flex gap-4">
                  <span
                    className="mt-2 w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: "hsl(var(--stage-firstyear-accent))" }}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <p className="font-serif text-[17px] sm:text-[18px] text-foreground leading-snug">{s.label}</p>
                      {s.when && (
                        <span
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-medium tracking-[0.16em] uppercase"
                          style={{
                            borderColor: "hsl(var(--stage-firstyear-accent) / 0.32)",
                            color: "hsl(var(--stage-firstyear-deep))",
                            backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.35)",
                          }}
                        >
                          {s.when}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-[14.5px] font-light text-foreground/75 leading-[1.75]">{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const PhaseSources = ({ items }: { items: PhaseConfig["sources"] }) => {
  if (!items || items.length === 0) return null;
  return (
    <section className="bg-parchment py-14 md:py-18">
      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-3xl">
        <SectionLabel>References and guidance</SectionLabel>
        <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-6">
          Trusted UK sources behind this guide.
        </h2>
        <div
          className="rounded-2xl border p-7 md:p-9 bg-parchment-dark/70 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.15)]"
          style={{ borderColor: "hsl(var(--border) / 0.6)" }}
        >
          <ol className="space-y-4">
            {items.map((src, i) => (
              <li key={src.href} className="flex gap-4">
                <span
                  className="font-serif text-[13px] tabular-nums shrink-0 mt-0.5"
                  style={{ color: "hsl(var(--stage-firstyear-accent))" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-[13px] font-light text-foreground/85 leading-relaxed">
                    <span className="font-medium text-foreground/95">{src.publisher}</span>
                    <span className="text-muted-foreground/60"> · </span>
                    <span>{src.label}</span>
                  </p>
                  <a
                    href={src.href}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center gap-1 font-sans text-[12px] font-light mt-1 transition-colors hover:underline"
                    style={{ color: "hsl(var(--stage-firstyear-deep))" }}
                  >
                    Visit source <ExternalLink size={11} />
                  </a>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 pt-5 border-t border-border/40">
            <p className="font-sans text-[12px] font-light italic text-muted-foreground leading-relaxed">
              This guide is general information. Always speak to your health visitor, GP or midwife if you are worried about you or your baby.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedGuidance = ({ items }: { items: PhaseConfig["featuredGuidance"] }) => (
  <section className="bg-parchment py-12 md:py-16">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
      <SectionLabel>Featured guidance</SectionLabel>
      <h2 className="font-serif text-xl sm:text-2xl text-foreground leading-snug mb-8">
        A few places to start.
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {items.map((g) => (
          <Link
            key={g.title}
            to={`/ask?q=${encodeURIComponent(g.title)}&stage=first-year`}
            className="group relative overflow-hidden rounded-[22px] border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_58px_-32px_rgba(20,30,60,0.28)]"
            style={{ borderColor: "hsl(var(--stage-firstyear-accent) / 0.18)" }}
          >
            <div
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.65)" }}
              aria-hidden
            />
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(to right, transparent, hsl(0 0% 100% / 0.6), transparent)' }}
              aria-hidden
            />
            <div className="relative">
              <p
                className="font-sans text-[10px] font-light tracking-[0.25em] uppercase mb-3"
                style={{ color: "hsl(var(--stage-firstyear-deep))" }}
              >
                Guidance
              </p>
              <h3 className="font-serif text-[18px] text-foreground leading-snug mb-2.5">{g.title}</h3>
              <p className="font-sans text-[13px] font-light text-muted-foreground leading-relaxed mb-4">
                {g.description}
              </p>
              <span
                className="inline-flex items-center gap-1 font-sans text-[11px] font-light transition-colors"
                style={{ color: "hsl(var(--stage-firstyear-deep))" }}
              >
                Read guidance <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const RelatedTopics = ({ items }: { items: PhaseConfig["relatedTopics"] }) => (
  <section className="bg-parchment py-12 md:py-14">
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl">
      <SectionLabel>Related First Year topics</SectionLabel>
      <div className="flex flex-wrap gap-2.5">
        {items.map((t) => (
          <Link
            key={t.href}
            to={t.href}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-sans text-[13px] font-light border bg-card transition-colors hover:bg-parchment-dark"
            style={{
              borderColor: "hsl(var(--border) / 0.7)",
              color: "hsl(var(--foreground) / 0.85)",
            }}
          >
            {t.label}
            <ArrowUpRight size={12} className="opacity-60" />
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const Endcap = () => (
  <section
    className="py-14 md:py-16"
    style={{
      background:
        "linear-gradient(180deg, hsl(var(--parchment)) 0%, hsl(var(--stage-firstyear-soft) / 0.18) 100%)",
    }}
  >
    <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-4xl text-center">
      <p className="font-serif italic text-foreground/65 text-[17px] leading-relaxed mb-7">
        Whichever phase you are in, you are not behind. You are with your baby, and that counts for a great deal.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/first-year"
          className="inline-flex items-center gap-1.5 rounded-pill px-5 py-2.5 font-sans text-[12px] font-light border bg-card text-foreground/85 hover:bg-parchment-dark transition-colors"
          style={{ borderColor: "hsl(var(--border) / 0.7)" }}
        >
          <ArrowLeft size={12} /> Back to First Year
        </Link>
        <Link
          to="/first-year#baby-topics"
          className="inline-flex items-center gap-1.5 rounded-pill px-5 py-2.5 font-sans text-[12px] font-light border transition-colors"
          style={{
            backgroundColor: "hsl(var(--stage-firstyear-soft) / 0.5)",
            color: "hsl(var(--stage-firstyear-deep))",
            borderColor: "hsl(var(--stage-firstyear-accent) / 0.28)",
          }}
        >
          Explore baby topics
        </Link>
        <Link
          to="/first-year#recovery-topics"
          className="inline-flex items-center gap-1.5 rounded-pill px-5 py-2.5 font-sans text-[12px] font-light border transition-colors"
          style={{
            backgroundColor: "hsl(var(--stage-recovery-soft) / 0.42)",
            color: "hsl(var(--stage-recovery-deep))",
            borderColor: "hsl(var(--stage-recovery-accent) / 0.26)",
          }}
        >
          Explore postpartum recovery
        </Link>
      </div>
    </div>
  </section>
);

const FirstYearPhasePage = ({ config }: Props) => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <PhaseHero config={config} />
        <InPhaseAges ages={config.ages} />
        <PairedSection config={config} />
        {config.editorial && <PhaseEditorial text={config.editorial} />}
        <FeelsAndHelps feels={config.feelsHard} helps={config.whatHelps} />
        <WhenToAskForSupport items={config.support} />
        <CommonQuestions items={config.commonQuestions} phaseSlug={config.slug} />
        <FeaturedGuidance items={config.featuredGuidance} />
        <RelatedTopics items={config.relatedTopics} />
        <PhaseSources items={config.sources} />
        <Endcap />
      </main>
      <Footer />
    </div>
  );
};

export default FirstYearPhasePage;
