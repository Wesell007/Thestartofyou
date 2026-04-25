import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/home-hero-premium.jpg";
import heroVideoAsset from "@/assets/home-hero-video-new.mp4.asset.json";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";

const NewHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<"loading" | "playing" | "paused">("loading");

  useEffect(() => {
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
  }, []);

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
      {/* Video background — always render, overlay tap-to-play if paused */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroImage}
          onError={() => setVideoState("paused")}
          className="w-full h-full object-cover object-[50%_35%] md:object-[50%_45%]"
        >
          <source src={heroVideoAsset.url} type="video/mp4" />
        </video>

        {/* Tap-to-play overlay when autoplay is blocked */}
        {videoState === "paused" && (
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

        {/* Cinematic gradient — stronger left anchor for text */}
        <div className="absolute inset-0 bg-gradient-to-r from-parchment via-parchment/85 via-50% to-parchment/20 md:via-parchment/80 md:via-40% md:to-transparent" />
        {/* Bottom vignette — stronger on mobile for text area */}
        <div className="absolute inset-0 bg-gradient-to-t from-parchment via-parchment/50 via-40% to-transparent md:via-parchment/30 md:via-30%" />
        {/* Top vignette for navbar blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-parchment/60 via-transparent via-20% to-transparent md:from-parchment/50" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-10 max-w-6xl relative z-10">
        <div className="max-w-lg md:max-w-xl pb-20 md:pb-0">
          {/* Quiet label */}
          <div className="flex items-center gap-2.5 mb-7 md:mb-9">
            <div className="h-px w-12 bg-sage/60" />
            <p className="font-sans text-[10.5px] font-medium tracking-[0.22em] uppercase text-sage">
              The Start of You
            </p>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-[2.5rem] sm:text-[2.875rem] md:text-[3.25rem] lg:text-[3.75rem] text-foreground leading-[1.06] mb-5 md:mb-6">
            A calmer way{" "}
            <span className="italic text-foreground/80">through pregnancy</span>
          </h1>

          {/* Supporting line */}
          <p className="font-sans text-[15px] md:text-[16.5px] font-light text-muted-foreground leading-[1.7] mb-9 md:mb-11 max-w-[24rem]">
            Week-by-week guidance, made for how this really feels.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/due-date-calculator"
                onClick={() => trackEvent(EVENTS.START_JOURNEY_CLICKED, { location: "home_hero" })}
                className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-9 py-4 font-sans text-[13.5px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
              >
                Start your journey
                <ArrowRight size={15} />
              </Link>
            </div>
            <p className="font-sans text-[12.5px] font-light text-muted-foreground/80 mt-1">
              Already saving your journey?{" "}
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
