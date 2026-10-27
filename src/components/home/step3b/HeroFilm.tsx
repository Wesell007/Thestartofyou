import { useEffect, useRef, useState } from "react";
import {
  HERO_FILM,
  HERO_MOBILE_QUERY,
  heroFilmTierFor,
  heroPosterFor,
  readHeroViewport,
} from "./heroFilmSources";

interface HeroFilmProps {
  /** Poster only from the start (reduced motion, Save-Data, slow connection): no video bytes requested. */
  posterOnly: boolean;
  /** Called once if the film cannot play (autoplay refused, unsupported codec, network error). */
  onFail: () => void;
}

/**
 * The hero film layer. The poster is the film's first frame, so the first paint and the first video frame
 * are the same image and nothing visibly swaps. Sources are chosen once after mount, outside React state,
 * so re-renders never reload the video; they are re-chosen only when the 720 px breakpoint is crossed.
 * Decorative: no controls, no tap-to-play, hidden from assistive technology.
 */
export default function HeroFilm({ posterOnly, onFail }: HeroFilmProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [poster, setPoster] = useState(() => heroPosterFor(readHeroViewport()));
  const onFailRef = useRef(onFail);
  onFailRef.current = onFail;

  useEffect(() => {
    const video = videoRef.current;
    const mq = window.matchMedia?.(HERO_MOBILE_QUERY);
    let failed = false;

    const fail = () => {
      if (failed) return;
      failed = true;
      video?.pause();
      onFailRef.current();
    };

    const select = () => {
      const viewport = readHeroViewport();
      setPoster(heroPosterFor(viewport));
      if (!video || posterOnly || failed) return;
      const film = HERO_FILM[heroFilmTierFor(viewport)];
      const sources = [
        [film.webm, "video/webm"],
        [film.mp4, "video/mp4"],
      ].map(([src, type]) => {
        const source = document.createElement("source");
        source.src = src;
        source.type = type;
        return source;
      });
      sources[sources.length - 1].addEventListener("error", fail);
      video.replaceChildren(...sources);
      video.muted = true;
      video.defaultMuted = true;
      video.load();
      const playing = video.play();
      if (playing && typeof playing.catch === "function") {
        playing.catch((error: unknown) => {
          if (error instanceof DOMException && error.name === "NotAllowedError") fail();
        });
      }
    };

    select();
    mq?.addEventListener?.("change", select);
    video?.addEventListener("error", fail);
    return () => {
      mq?.removeEventListener?.("change", select);
      video?.removeEventListener("error", fail);
    };
  }, [posterOnly]);

  return (
    <>
      <video
        ref={videoRef}
        id="heroVideo"
        poster={poster}
        autoPlay={!posterOnly}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        aria-hidden="true"
        tabIndex={-1}
      />
      <img className="poster" id="heroPoster" src={poster} alt="" aria-hidden="true" />
    </>
  );
}
