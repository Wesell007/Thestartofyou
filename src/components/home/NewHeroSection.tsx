import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/home-hero-premium.jpg";
import heroVideoAsset from "@/assets/home-hero-video-new.mp4.asset.json";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const NewHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<"loading" | "playing" | "paused">("loading");
  const [reducedMotion] = useState(prefersReducedMotion);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    // Sync state whenever video actually starts playing
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
      if (!cancelled && video.paused) {
        setVideoState("paused");
      }
    }, 5000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      video.removeEventListener("canplay", attemptPlay);
      video.removeEventListener("playing", onPlaying);
    };
  }, [reducedMotion]);

  const handleTapToPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    // Force video to be ready and start from beginning
    video.currentTime = 0;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setVideoState("playing"))
        .catch(() => setVideoState("paused"));
    }
  }, []);

  return (
    <section className="relative min-h-[92vh] md:min-h-screen overflow-hidden flex items-end md:items-center">
      {/* Video background — always render, overlay tap-to-play if paused.
          Users who prefer reduced motion get the still image instead. */}
      <div className="absolute inset-0">
        {reducedMotion ? (
          <img
            src={heroImage}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[50%_35%] md:object-[50%_45%]"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImage}
            onError={() => setVideoState("paused")}
            className="w-full h-full object-cover object-[50%_35%] md:object-[50%_45%]"
          >
            <source src={heroVideoAsset.url} type="video/mp4" />
          </video>
        )}

        {/* Tap-to-play overlay when autoplay is blocked */}
        {!reducedMotion && videoState === "paused" && (
          <button
            onClick={handleTapToPlay}
            className="absolute inset-0 z-10 flex items-center justify-center bg-transparent cursor-pointer"
            aria-label="Play video"
          >
            <div className="bg-parchment/60 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-parchment/80 transition-all duration-300">
              <Play size={28} className="text-foreground/70 ml-0.5" />
            </div>
          </button>
        )}

        {/* Cinematic gradient — stronger, more confident left anchor for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/92 via-45% to-parchment/30 md:from-parchment md:via-parchment/88 md:via-38% md:to-parchment/10" />
        {/* Bottom vignette — grounds the CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-parchment via-parchment/65 via-35% to-transparent md:via-parchment/45 md:via-28%" />
        {/* Top vignette for navbar blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-parchment/75 via-transparent via-18% to-transparent md:from-parchment/60" />
        {/* Subtle warm tonal lift over video for premium depth */}
        <div className="absolute inset-0 bg-foreground/[0.04] mix-blend-multiply pointer-events-none" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="max-w-lg md:max-w-xl pb-24 md:pb-0">
          {/* Quiet label */}
          <div className="flex items-center gap-3 mb-8 md:mb-10">
            <div className="h-px w-14 bg-sage/70" />
            <p className="font-sans text-[10.5px] font-medium tracking-[0.24em] uppercase text-sage">
              The Start of You
            </p>
          </div>

          {/* Headline — the full journey, while the pregnancy film stays as the brand anchor */}
          <h1 className="font-serif text-[2.625rem] sm:text-[3rem] md:text-[3.5rem] lg:text-[4rem] text-foreground leading-[1.04] tracking-[-0.012em] mb-6 md:mb-7">
            From trying to conceive
            <br />
            to their first year.
            <br />
            <span className="italic text-foreground/85">Yours to keep.</span>
          </h1>

          {/* Supporting line — slightly darker for confidence */}
          <p className="font-sans text-[15.5px] md:text-[17px] font-light text-foreground/65 leading-[1.7] mb-10 md:mb-12 max-w-[28rem]">
            Personalised guidance, private journalling and a companion that stays with you through trying to conceive, pregnancy and your baby's first year.
          </p>

          {/* Primary CTA — grounded with stronger spacing */}
          <div className="flex flex-col items-start gap-5">
            <a
              href="#start-where-you-are"
              onClick={() => trackEvent(EVENTS.START_JOURNEY_CLICKED, { location: "home_hero" })}
              className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-10 py-[18px] font-sans text-[14px] font-medium tracking-wide shadow-cta hover:bg-terracotta-hover hover:shadow-lg hover:-translate-y-[1px] transition-all duration-300"
            >
              Start your journey
              <ArrowRight size={15} />
            </a>
            <p className="font-sans text-[12.5px] font-light text-foreground/55">
              Already using your journey?{" "}
              <Link
                to="/auth?intent=sign_in"
                onClick={() => trackEvent(EVENTS.SIGN_IN_CLICKED, { location: "home_hero" })}
                className="text-foreground/80 underline-offset-4 hover:underline hover:text-foreground transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
