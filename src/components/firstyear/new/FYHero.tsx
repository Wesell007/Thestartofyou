import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import firstyearHeroVideo from "@/assets/firstyear-hero-video.mp4.asset.json";

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
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src={firstyearHeroVideo.url} type="video/mp4" />
      </video>

      {/* Tap-to-play affordance when autoplay is blocked */}
      {videoState === "paused" && (
        <button
          onClick={handleTapToPlay}
          className="absolute inset-0 z-20 flex items-center justify-center bg-transparent cursor-pointer"
          aria-label="Play video"
        >
          <div className="bg-parchment/60 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-parchment/80 transition-all duration-300">
            <Play size={28} className="text-foreground/70 ml-0.5" />
          </div>
        </button>
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
            Your baby is changing quickly. You're healing after birth. Both belong here.
          </p>

          {/* Two equal CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="#baby-topics"
              className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium transition-all duration-300 hover:opacity-90 min-w-[220px]"
              style={{
                backgroundColor: 'hsl(var(--stage-firstyear-deep))',
                color: 'hsl(var(--card))',
              }}
            >
              Baby's first year
            </Link>
            <Link
              to="#recovery-topics"
              className="inline-flex items-center justify-center rounded-pill px-7 py-3.5 font-sans text-[13px] font-medium transition-all duration-300 hover:opacity-90 min-w-[220px]"
              style={{
                backgroundColor: 'hsl(var(--stage-recovery-deep))',
                color: 'hsl(var(--card))',
              }}
            >
              Your postpartum recovery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FYHero;
