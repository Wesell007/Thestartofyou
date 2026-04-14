import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/home-hero-premium.jpg";
import heroVideoAsset from "@/assets/home-hero-video-new.mp4.asset.json";

const NewHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force play attempt — handles iOS/Safari autoplay quirks
    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked — show poster fallback
          setVideoFailed(true);
        });
      }
    };

    // If video is ready, play immediately; otherwise wait for canplay
    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true });
    }

    // Fallback timeout — if nothing plays within 4s, show poster
    const timeout = setTimeout(() => {
      if (video.paused || video.readyState < 2) {
        setVideoFailed(true);
      }
    }, 4000);

    return () => {
      clearTimeout(timeout);
      video.removeEventListener("canplay", attemptPlay);
    };
  }, []);

  return (
    <section className="relative min-h-[92vh] md:min-h-screen overflow-hidden flex items-end md:items-center">
      {/* Video background with robust fallback */}
      <div className="absolute inset-0">
        {!videoFailed ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={heroImage}
            onError={() => setVideoFailed(true)}
            className="w-full h-full object-cover object-[50%_35%] md:object-[50%_25%]"
          >
            <source src={heroVideoAsset.url} type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroImage}
            alt="Calm pregnancy moment in nature"
            className="w-full h-full object-cover object-[50%_35%] md:object-[50%_25%]"
          />
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
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              to="/due-date-calculator"
              className="inline-flex items-center gap-2.5 bg-terracotta text-terracotta-foreground rounded-pill px-9 py-4 font-sans text-[13.5px] font-medium shadow-cta hover:bg-terracotta-hover transition-all duration-300"
            >
              Start your journey
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 font-sans text-[13.5px] font-light text-muted-foreground hover:text-foreground transition-colors py-4"
            >
              Explore guidance
              <ArrowRight size={13} className="opacity-60" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
