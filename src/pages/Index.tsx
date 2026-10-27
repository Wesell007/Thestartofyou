import { useEffect } from "react";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource-variable/public-sans";
import "@fontsource-variable/source-serif-4/opsz.css";
import "@fontsource-variable/source-serif-4/opsz-italic.css";
import "@/components/home/step3b/home-step3b.css";
import SeoHead from "@/components/seo/SeoHead";
import HomeMasthead from "@/components/home/step3b/HomeMasthead";
import HomeHero from "@/components/home/step3b/HomeHero";
import HomeChapters from "@/components/home/step3b/HomeChapters";
import HomePrintWeb from "@/components/home/step3b/HomePrintWeb";
import HomeCompanion from "@/components/home/step3b/HomeCompanion";
import HomeMemories from "@/components/home/step3b/HomeMemories";
import HomeMoves from "@/components/home/step3b/HomeMoves";
import HomeFooter from "@/components/home/step3b/HomeFooter";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";

// The homepage is the founder-approved Step 3B design (locked at 34f5416b), ported from the prototype in
// docs/design/flagship/step-3b/prototype-source/. Its fonts and styles load with this route only.
const Index = () => {
  useEffect(() => {
    trackEvent(EVENTS.HOME_VIEWED);
  }, []);
  return (
    <div className="home-3b">
      <SeoHead
        title="The Start of You | From Trying to Family Life"
        description="Trusted guidance and a thoughtful Companion from trying to conceive through pregnancy, the first year, toddlerhood and family life — plus a pregnancy journal."
        canonical="https://thestartofyou.com/"
        ogTitle="The Start of You | From Trying to Family Life"
        ogDescription="Trusted guidance and a thoughtful Companion from trying to conceive through pregnancy, the first year, toddlerhood and family life — plus a pregnancy journal."
      />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="page-stack">
        <HomeMasthead />
        <main id="main">
          <HomeHero />
          <HomeChapters />
          <HomePrintWeb />
          <HomeCompanion />
          <HomeMemories />
          <HomeMoves />
        </main>
      </div>
      <HomeFooter />
    </div>
  );
};

export default Index;
