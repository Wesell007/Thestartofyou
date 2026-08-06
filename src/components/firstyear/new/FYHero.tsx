import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import firstyearHeroVideo from "@/assets/firstyear-hero-video.mp4.asset.json";
import FYStartFirstYearCTA from "./FYStartFirstYearCTA";

/**
 * Premium video hero — single dual-entry moment.
 * Calm editorial footage, restrained veil.
 */
const FYHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<"loading" | "playing" | "paused">("loading");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;

    const onPlaying = () => {
      if (!cancelled) setVideoState("playing");
    };
    video.addEventListener("playing", onPlaying);

    const attemptPlay = async () => {
      try {
        video.muted = true;
        await video.play();
        if (!cancelled) setVideoState("playing");
      } catch {
        if (!cancelled) setVideoState("paused");
      }
    };

    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true });
    }

    const timeout = setTimeout(() => {
      if (!cancelled && video.paused) setVideoState("paused");
    }, 5000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      video.removeEventListener("canplay", attemptPlay);
      video.removeEventListener("playing", onPlaying);
    };
  }, []);

  const handleTapToPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.currentTime = 0;
    const p = video.play();
    if (p !== undefined) {
      p.then(() => setVideoState("playing")).catch(() => setVideoState("paused"));
    }
  }, []);

  return (
    <section
      id="first-year-top"
      className="relative overflow-hidden min-h-[70vh] md:min-h-[78vh] flex items-center pt-28 pb-16 md:pb-20"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={() => setVideoState("paused")}
        className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_42%]"
      >
        <source src={firstyearHeroVideo.url} type="video/mp4" />
      </video>

      {/* Tap-to-play affordance when autoplay is blocked.
          The wrapper is full-bleed for positioning only and never intercepts
          clicks; only the round badge is interactive. */}
      {videoState === "paused" && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <button
            onClick={handleTapToPlay}
            className="pointer-events-auto absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-parchment/60 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-parchment/80 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2"
            aria-label="Play video"
          >
            <Play size={28} className="text-foreground/70 ml-0.5" />
          </button>
        </div>
      )}


      {/* Veil — desktop weighted left, mobile weighted bottom */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-parchment/80 via-parchment/40 to-parchment/0" />
      <div className="absolute inset-0 md:hidden bg-gradient-to-b from-parchment/65 via-parchment/35 to-parchment/5" />

      {/* Soft bottom vignette to ground CTAs */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none bg-gradient-to-t from-parchment/55 via-parchment/15 to-transparent" />

      {/* Dual-tone temperature wash at the bottom edge */}
      <div className="absolute inset-x-0 bottom-0 h-40 pointer-events-none flex">
        <div
          className="w-1/3 h-full blur-3xl opacity-60"
          style={{ backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.35)' }}
        />
        <div className="w-1/3" />
        <div
          className="w-1/3 h-full blur-3xl opacity-60"
          style={{ backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.3)' }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-8 md:px-10 max-w-5xl relative z-10">
        <div className="max-w-[640px]">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-7">
            <span className="h-px w-8 bg-foreground/25" />
            <span className="font-sans text-[11px] font-light tracking-[0.3em] uppercase text-foreground/65">
              First year
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.75rem] text-foreground mb-6 leading-[1.04]">
            Their first year, and{" "}
            <span className="italic" style={{ color: 'hsl(var(--stage-recovery-deep))' }}>
              your postpartum recovery
            </span>
            .
          </h1>

          {/* Support line */}
          <p className="font-sans text-[17px] md:text-lg font-light text-muted-foreground leading-relaxed mb-10 max-w-lg">
            Your baby will change quickly through the first year. You'll need support for postpartum recovery too.
          </p>

          {/* Two equal CTAs — soft premium pills: light fill, deeper text, clear border */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/first-year#baby-topics"
              className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] hover:-translate-y-[1px]"
              style={{
                backgroundColor: 'hsl(var(--stage-firstyear-soft) / 0.95)',
                color: 'hsl(var(--stage-firstyear-deep))',
                borderColor: 'hsl(var(--stage-firstyear-accent) / 0.35)',
                boxShadow:
                  'inset 0 1px 0 hsl(0 0% 100% / 0.55), 0 12px 30px -20px hsl(212 36% 20% / 0.5)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--stage-firstyear-soft))';
                e.currentTarget.style.borderColor = 'hsl(var(--stage-firstyear-accent) / 0.5)';
                e.currentTarget.style.boxShadow =
                  'inset 0 1px 0 hsl(0 0% 100% / 0.65), 0 18px 36px -18px hsl(212 36% 20% / 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--stage-firstyear-soft) / 0.95)';
                e.currentTarget.style.borderColor = 'hsl(var(--stage-firstyear-accent) / 0.35)';
                e.currentTarget.style.boxShadow =
                  'inset 0 1px 0 hsl(0 0% 100% / 0.55), 0 12px 30px -20px hsl(212 36% 20% / 0.5)';
              }}
            >
              Baby's first year
            </Link>
            <Link
              to="/first-year#recovery-topics"
              className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium tracking-wide border transition-all duration-300 min-w-[220px] hover:-translate-y-[1px]"
              style={{
                backgroundColor: 'hsl(var(--stage-recovery-soft) / 0.9)',
                color: 'hsl(var(--stage-recovery-deep))',
                borderColor: 'hsl(var(--stage-recovery-accent) / 0.32)',
                boxShadow:
                  'inset 0 1px 0 hsl(0 0% 100% / 0.55), 0 12px 30px -20px hsl(320 28% 22% / 0.45)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--stage-recovery-soft))';
                e.currentTarget.style.borderColor = 'hsl(var(--stage-recovery-accent) / 0.48)';
                e.currentTarget.style.boxShadow =
                  'inset 0 1px 0 hsl(0 0% 100% / 0.65), 0 18px 36px -18px hsl(320 28% 22% / 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(var(--stage-recovery-soft) / 0.9)';
                e.currentTarget.style.borderColor = 'hsl(var(--stage-recovery-accent) / 0.32)';
                e.currentTarget.style.boxShadow =
                  'inset 0 1px 0 hsl(0 0% 100% / 0.55), 0 12px 30px -20px hsl(320 28% 22% / 0.45)';
              }}
            >
              Your postpartum recovery
            </Link>
          </div>

          <FYStartFirstYearCTA variant="hero" />

        </div>
      </div>
    </section>
  );
};

export default FYHero;
