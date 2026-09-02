import { useEffect, useRef, useState } from "react";
import { ExternalLink, BookOpen } from "lucide-react";
import journalHeroVideo from "@/assets/video/journal-hero.mp4";
import journalCoverHand from "@/assets/journal-cover-hand.jpg";
import botanicalTr from "@/assets/botanical-branch-tr.png";
import botanicalBl from "@/assets/botanical-branch-bl.png";
import { JOURNAL_PURCHASE_URL } from "@/lib/productLinks";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ProductHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [reducedMotion] = useState(prefersReducedMotion);
  const [idleReady, setIdleReady] = useState(false);
  const [visible, setVisible] = useState(false);

  const active = !reducedMotion && idleReady && visible;

  // Gate 1 — critical load has finished and the main thread is idle.
  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let idleHandle: number | undefined;
    let fallbackTimer: number | undefined;

    const open = () => {
      if (!cancelled) setIdleReady(true);
    };

    const scheduleIdle = () => {
      if (cancelled) return;
      const ric = (window as Window & {
        requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
      }).requestIdleCallback;
      if (typeof ric === "function") {
        idleHandle = ric(open, { timeout: 2000 });
      } else {
        fallbackTimer = window.setTimeout(open, 1200);
      }
    };

    if (document.readyState === "complete") {
      scheduleIdle();
    } else {
      window.addEventListener("load", scheduleIdle, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleIdle);
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer);
      if (idleHandle !== undefined) {
        const cic = (window as Window & { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
        if (typeof cic === "function") cic(idleHandle);
      }
    };
  }, [reducedMotion]);

  // Gate 2 — the hero is in or near the viewport.
  useEffect(() => {
    if (reducedMotion) return;
    const el = frameRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "200px 0px" },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [reducedMotion]);

  // Both gates open — attach the source and start playback.
  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    video.muted = true;
    const play = () => {
      if (cancelled) return;
      const promise = video.play();
      if (promise !== undefined) promise.catch(() => undefined);
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("loadeddata", play, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", play);
    };
  }, [active]);


  return (
    <section className="relative bg-parchment overflow-hidden">
      {/* Top spacer for navbar */}
      <div className="h-20 md:h-24" aria-hidden="true" />

      {/* Botanical accents */}
      <img
        src={botanicalTr}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-16 right-0 w-[160px] md:w-[240px] opacity-25 select-none hidden sm:block z-10"
      />
      <img
        src={botanicalBl}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-[140px] md:w-[200px] opacity-20 select-none hidden sm:block z-10"
      />

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-7xl relative z-20">
        {/* Minimal eyebrow + heading above video */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 animate-fade-up">
          <p className="stage-label flanking-lines mb-4">The Start of You Journal</p>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] text-foreground leading-[1.05] mb-4">
            For the moments{" "}
            <span className="italic">worth holding onto.</span>
          </h1>
          <p className="font-sans text-base md:text-lg font-light text-muted-foreground leading-relaxed max-w-xl mx-auto">
            A guided pregnancy journal for the thoughts, feelings and firsts that quietly fade.
          </p>
        </div>

        {/* Video — the hero moment */}
        <div className="relative max-w-5xl mx-auto animate-fade-up [animation-delay:0.1s]">
          <div className="relative rounded-3xl overflow-hidden shadow-elevated bg-card aspect-[16/10] md:aspect-[21/9]">
            <video
              src={journalHeroVideo}
              poster={journalCoverHand}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            {/* Soft bottom gradient for visual depth */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Floating spec card */}
          <div className="hidden md:block absolute -bottom-6 -left-6 bg-card/95 backdrop-blur-sm rounded-2xl px-5 py-4 border border-border/30 shadow-soft max-w-[220px]">
            <p className="font-serif text-sm italic text-foreground leading-snug mb-1">
              "For the thoughts you do not want to lose"
            </p>
            <p className="font-sans text-[10px] font-light text-muted-foreground tracking-wide">
              Hardback · 144 pages · A5
            </p>
          </div>
        </div>

        {/* CTA + trust row */}
        <div className="mt-10 md:mt-14 flex flex-col items-center gap-5 animate-fade-up [animation-delay:0.2s] pb-12 md:pb-16">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={JOURNAL_PURCHASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-9 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
            >
              Find the journal on Amazon
              <ExternalLink size={14} />
            </a>
            <span className="inline-flex items-center gap-1.5 bg-card/70 border border-border/30 rounded-pill px-4 py-2.5 font-sans text-xs font-light text-muted-foreground">
              <BookOpen size={12} className="text-sage" />
              Available on Amazon
            </span>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center pt-3">
            {[
              { num: "40+", label: "Weeks of prompts" },
              { num: "4", label: "Life stages" },
              { num: "1", label: "Keepsake for life" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <span className="font-serif text-xl text-foreground">{s.num}</span>
                <p className="font-sans text-[10px] font-light text-muted-foreground tracking-wide uppercase mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHero;
