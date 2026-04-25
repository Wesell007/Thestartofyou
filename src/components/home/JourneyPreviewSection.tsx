import { useEffect, useState } from "react";
import MyWeekBabyImage from "@/components/myweek/MyWeekBabyImage";
import { getMyWeekContent, getWeekIdentity } from "@/data/myWeekContent";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

/**
 * Truthful homepage product preview, presented as a calm 3-slide walkthrough:
 *   1. My Week        — live weekly anchor
 *   2. My Journey     — saved memory spine
 *   3. Kept Chapter   — preserved week page
 *
 * Manual interaction only. No autoplay. No loop. No loud chrome.
 * Each slide pairs a small surface label + one-line micro-copy with the
 * existing truthful preview card. Cards are unchanged from the prior
 * static composition — only the section composition is now a carousel.
 */

const PRIMARY_WEEK = 18;
const KEPT_WEEK = 12;

const accent = "hsl(var(--stage-pregnancy-accent))";
const accentSoft = (a: number) => `hsl(var(--stage-pregnancy-accent) / ${a})`;
const tint = (a: number) => `hsl(var(--stage-pregnancy) / ${a})`;

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p
    className="font-sans text-[10px] font-medium tracking-[0.3em] uppercase"
    style={{ color: accent }}
  >
    {children}
  </p>
);

// ─── My Week preview ───────────────────────────────────────────────────────
const MyWeekPreview = () => {
  const identity = getWeekIdentity(PRIMARY_WEEK);
  const content = getMyWeekContent(PRIMARY_WEEK);

  return (
    <article
      aria-label="Preview of My Week"
      className="relative rounded-[24px] keepsake-surface overflow-hidden"
      style={{ borderColor: accentSoft(0.18) }}
    >
      <div className="px-7 sm:px-9 pt-7 sm:pt-9 pb-7 sm:pb-8">
        <div className="flex items-center justify-between mb-5">
          <Eyebrow>Current week · Week {PRIMARY_WEEK}</Eyebrow>
          <span className="font-sans text-[10px] font-light tracking-[0.22em] uppercase text-foreground/45">
            Second trimester
          </span>
        </div>

        <p className="font-serif text-foreground text-[1.15rem] sm:text-[1.25rem] leading-tight mb-1.5">
          Good afternoon, Anna
        </p>
        <p className="font-sans text-[11.5px] font-light text-foreground/55 mb-6">
          Due 14 October · 22 weeks to go
        </p>

        <div className="flex items-start gap-5 sm:gap-6 mb-6">
          <div
            className="shrink-0 w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] rounded-full overflow-hidden flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.5), hsl(var(--card)) 75%)",
              border: `1px solid ${accentSoft(0.22)}`,
            }}
          >
            <MyWeekBabyImage
              week={PRIMARY_WEEK}
              className="w-full h-full flex items-center justify-center"
              imgClassName="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 pt-1">
            <h3 className="font-serif font-medium text-foreground text-[1.45rem] sm:text-[1.65rem] leading-[1.1] mb-2">
              {identity.chapterTitle}
            </h3>
            <p className="font-serif italic text-foreground/60 text-[14px] leading-[1.5]">
              {identity.theme}
            </p>
          </div>
        </div>

        <p className="font-serif text-foreground/75 text-[15px] sm:text-[15.5px] leading-[1.7] mb-6">
          {content.lead}
        </p>
      </div>

      <div
        className="border-t px-7 sm:px-9 py-4 sm:py-5"
        style={{ borderColor: accentSoft(0.14), background: tint(0.08) }}
      >
        <div className="flex items-center gap-6 sm:gap-8">
          {[
            { label: "One focus" },
            { label: "Photo" },
            { label: "Reflection" },
          ].map((slot) => (
            <div key={slot.label} className="flex items-center gap-2">
              <span
                className="block w-1.5 h-1.5 rounded-full"
                style={{ background: accentSoft(0.5) }}
              />
              <span className="font-sans text-[10px] font-medium tracking-[0.24em] uppercase text-foreground/55">
                {slot.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

// ─── My Journey preview ───────────────────────────────────────────────────
const MyJourneyPreview = () => {
  const currentIdentity = getWeekIdentity(PRIMARY_WEEK);
  const keptRows = [
    { week: 16, line: "First flutters, easy to miss." },
    { week: 14, line: "Steadier this week. Slept better." },
  ];

  return (
    <article
      aria-label="Preview of My Journey"
      className="relative rounded-[24px] keepsake-surface px-6 sm:px-7 py-6 sm:py-7"
      style={{ borderColor: accentSoft(0.16) }}
    >
      <div className="flex items-baseline justify-between mb-5">
        <Eyebrow>Your journey</Eyebrow>
        <span className="font-sans text-[10px] font-light tracking-[0.22em] uppercase text-foreground/45">
          Week {PRIMARY_WEEK} · Started 12 June
        </span>
      </div>

      <div
        className="flex items-center gap-3.5 rounded-[16px] p-3 mb-5"
        style={{ background: tint(0.12), border: `1px solid ${accentSoft(0.18)}` }}
      >
        <div
          className="shrink-0 w-[44px] h-[44px] rounded-full overflow-hidden flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.5), hsl(var(--card)) 75%)",
            border: `1px solid ${accentSoft(0.22)}`,
          }}
        >
          <MyWeekBabyImage
            week={PRIMARY_WEEK}
            className="w-full h-full flex items-center justify-center"
            imgClassName="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p
            className="font-sans text-[9px] font-medium tracking-[0.26em] uppercase mb-0.5"
            style={{ color: accent }}
          >
            Current chapter · Week {PRIMARY_WEEK}
          </p>
          <p className="font-serif font-medium text-foreground text-[14.5px] leading-tight truncate">
            {currentIdentity.chapterTitle}
          </p>
        </div>
      </div>

      <p className="font-sans text-[9.5px] font-medium tracking-[0.28em] uppercase text-foreground/50 mb-1">
        Second trimester
      </p>
      <p className="font-serif italic text-foreground/55 text-[12.5px] leading-[1.5] mb-3">
        Steadier weeks, finding rhythm.
      </p>

      <ul className="space-y-2">
        {keptRows.map((row) => {
          const id = getWeekIdentity(row.week);
          return (
            <li
              key={row.week}
              className="flex items-start gap-3 rounded-[14px] keepsake-surface px-3 py-2.5"
              style={{ borderColor: accentSoft(0.14) }}
            >
              <div
                className="shrink-0 w-[36px] h-[36px] rounded-full overflow-hidden flex items-center justify-center mt-0.5"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.45), hsl(var(--card)) 75%)",
                  border: `1px solid ${accentSoft(0.18)}`,
                }}
              >
                <MyWeekBabyImage
                  week={row.week}
                  className="w-full h-full flex items-center justify-center"
                  imgClassName="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif font-medium text-foreground/85 text-[13px]">
                    Week {row.week}
                  </span>
                  <span className="font-serif italic text-foreground/55 text-[12px] truncate">
                    {id.chapterTitle}
                  </span>
                </div>
                <p className="font-serif italic text-foreground/55 text-[12px] leading-[1.45] mt-0.5 truncate">
                  “{row.line}”
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

// ─── Kept Chapter preview ─────────────────────────────────────────────────
const KeptChapterPreview = () => {
  const identity = getWeekIdentity(KEPT_WEEK);

  return (
    <article
      aria-label="Preview of a Kept Chapter"
      className="relative rounded-[24px] keepsake-surface px-6 sm:px-7 py-6 sm:py-7"
      style={{ borderColor: accentSoft(0.16) }}
    >
      <Eyebrow>Kept chapter</Eyebrow>

      <div className="mt-3 mb-4">
        <h3 className="font-serif font-medium text-foreground text-[1.6rem] leading-[1] tracking-tight mb-1.5">
          Week {KEPT_WEEK}
        </h3>
        <p className="font-serif text-foreground/80 text-[14.5px] leading-[1.3]">
          {identity.chapterTitle}
        </p>
        <p className="font-serif italic text-foreground/55 text-[12.5px] leading-[1.5] mt-1">
          First trimester · {identity.theme}
        </p>
      </div>

      <div className="flex justify-center mb-4">
        <div
          className="w-[72px] h-[72px] rounded-full overflow-hidden flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsl(var(--stage-pregnancy) / 0.5), hsl(var(--card)) 78%)",
            border: `1px solid ${accentSoft(0.22)}`,
          }}
        >
          <MyWeekBabyImage
            week={KEPT_WEEK}
            className="w-full h-full flex items-center justify-center"
            imgClassName="w-full h-full object-cover"
          />
        </div>
      </div>

      <div
        className="rounded-[16px] px-4 py-4"
        style={{ background: tint(0.16), border: `1px solid ${accentSoft(0.18)}` }}
      >
        <p className="font-serif italic text-foreground/85 text-[13.5px] leading-[1.7]">
          The week the news became real. Quieter than I expected, and steadier.
        </p>
        <p className="font-sans text-[9px] font-medium tracking-[0.24em] uppercase text-foreground/45 mt-3">
          Kept · 24 March
        </p>
      </div>
    </article>
  );
};

// ─── Slides definition ────────────────────────────────────────────────────
const slides = [
  {
    label: "Current week",
    copy: "See what matters now, week by week.",
    Preview: MyWeekPreview,
  },
  {
    label: "Your journey",
    copy: "Look back at the weeks and moments you've kept.",
    Preview: MyJourneyPreview,
  },
  {
    label: "Kept chapter",
    copy: "Return to a past week as a preserved chapter.",
    Preview: KeptChapterPreview,
  },
];

const JourneyPreviewSection = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <div className="editorial-rule mb-5" />
          <Eyebrow>Inside your journey</Eyebrow>
          <h2 className="font-serif text-[1.75rem] sm:text-3xl md:text-[2.5rem] text-foreground leading-[1.15] mt-3 mb-4">
            Your week, your journey, and the moments you return to
          </h2>
          <p className="font-sans text-[14.5px] sm:text-[15px] font-light text-foreground/60 leading-relaxed max-w-xl mx-auto">
            Follow your pregnancy week by week, keep reflections and photos, and return to the chapters that matter as your journey grows.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "center",
            loop: false,
            dragFree: false,
            containScroll: "trimSnaps",
          }}
          setApi={setApi}
          className="relative"
        >
          <CarouselContent className="-ml-4 md:-ml-6 items-start">
            {slides.map(({ label, copy, Preview }, i) => (
              <CarouselItem
                key={label}
                className="pl-4 md:pl-6 basis-[88%] md:basis-[82%] lg:basis-[70%]"
              >
                <div className="max-w-[560px] mx-auto">
                  <div className="text-center mb-5 md:mb-6">
                    <Eyebrow>{label}</Eyebrow>
                    <p className="font-serif italic text-foreground/65 text-[14px] sm:text-[14.5px] leading-[1.5] mt-2">
                      {copy}
                    </p>
                  </div>
                  <Preview />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Quiet controls + step indicator */}
        <div className="mt-8 md:mt-10 flex flex-col items-center gap-4">
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!api?.canScrollPrev()}
              aria-label="Previous slide"
              className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-full border border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span aria-hidden className="text-[14px] leading-none">‹</span>
            </button>

            <div className="flex items-center gap-4">
              <span className="font-sans text-[10px] font-medium tracking-[0.28em] uppercase text-foreground/55 tabular-nums">
                {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <div className="flex items-center gap-2" role="tablist" aria-label="Slide position">
                {slides.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    role="tab"
                    aria-selected={current === i}
                    aria-label={`Go to slide ${i + 1}: ${s.label}`}
                    onClick={() => api?.scrollTo(i)}
                    className={cn(
                      "h-px w-4 transition-colors",
                      current === i ? "bg-foreground/55" : "bg-foreground/15 hover:bg-foreground/30",
                    )}
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!api?.canScrollNext()}
              aria-label="Next slide"
              className="hidden md:inline-flex items-center justify-center h-8 w-8 rounded-full border border-foreground/15 text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span aria-hidden className="text-[14px] leading-none">›</span>
            </button>
          </div>

          <p className="md:hidden font-sans text-[10px] font-medium tracking-[0.28em] uppercase text-foreground/40">
            Swipe to continue
          </p>
        </div>
      </div>
    </section>
  );
};

export default JourneyPreviewSection;
