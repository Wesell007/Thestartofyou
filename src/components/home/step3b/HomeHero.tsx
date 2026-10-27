import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { buildAuthUrl } from "@/lib/authIntent";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import HeroFilm from "./HeroFilm";
import { HERO_POSTERS, heroPrefersPoster } from "./heroFilmSources";
import ChapterDots from "./ChapterDots";

export default function HomeHero() {
  const [posterOnly] = useState(() => heroPrefersPoster());
  const [usePoster, setUsePoster] = useState(posterOnly);

  return (
    <section className={`cine${usePoster ? " use-poster" : ""}`} id="hero" aria-labelledby="hero-h">
      <Helmet>
        <link rel="preload" as="image" href={HERO_POSTERS.d1920} media="(min-width: 1281px)" fetchPriority="high" />
        <link
          rel="preload"
          as="image"
          href={HERO_POSTERS.d1280}
          media="(min-width: 721px) and (max-width: 1280px)"
          fetchPriority="high"
        />
        <link rel="preload" as="image" href={HERO_POSTERS.mobile} media="(max-width: 720px)" fetchPriority="high" />
      </Helmet>
      <HeroFilm posterOnly={posterOnly} onFail={() => setUsePoster(true)} />
      <div className="scrim" aria-hidden="true" />
      <div className="wrap">
        <div className="copy">
          <ChapterDots label="Chapters" />
          <h1 className="headline" id="hero-h">
            <span>From trying, to family life.</span>
            <br />
            <em>Yours to keep.</em>
          </h1>
          <p className="deck">
            One story, told in chapters. Trusted guidance, a Companion that answers carefully, and a journal in
            print and on screen, from the first hope to family life.
          </p>
          <div className="btn-row">
            <Link
              className="btn btn-primary"
              to="/start-your-journey"
              onClick={() => trackEvent(EVENTS.START_JOURNEY_CLICKED, { location: "home_hero" })}
            >
              Start your journey
            </Link>
            <Link className="btn btn-quiet" to="/journal-start">
              Have the journal? Connect it
            </Link>
          </div>
          <p className="sub">
            Already with us?{" "}
            <Link
              to={buildAuthUrl("sign_in")}
              onClick={() => trackEvent(EVENTS.SIGN_IN_CLICKED, { location: "home_hero" })}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
      <p className="film-note">Brand film · includes AI-generated scenes</p>
    </section>
  );
}
