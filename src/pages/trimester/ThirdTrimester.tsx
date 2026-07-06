import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JournalPromotion from "@/components/shared/JournalPromotion";

import ThirdTriHero from "@/components/thirdtri/ThirdTriHero";
import ThirdTriOnThisPage from "@/components/thirdtri/ThirdTriOnThisPage";
import ThirdTriEditorialImage from "@/components/thirdtri/ThirdTriEditorialImage";
import ThirdTriWhatItIs from "@/components/thirdtri/ThirdTriWhatItIs";
import ThirdTriExpect from "@/components/thirdtri/ThirdTriExpect";
import ThirdTriBigChanges from "@/components/thirdtri/ThirdTriBigChanges";
import ThirdTriDifficult from "@/components/thirdtri/ThirdTriDifficult";
import ThirdTriSupport from "@/components/thirdtri/ThirdTriSupport";
import ThirdTriFocus from "@/components/thirdtri/ThirdTriFocus";
import ThirdTriWeekBridge from "@/components/thirdtri/ThirdTriWeekBridge";
import ThirdTriRelatedReads from "@/components/thirdtri/ThirdTriRelatedReads";
import ThirdTriDeeper from "@/components/thirdtri/ThirdTriDeeper";
import ThirdTriFAQ from "@/components/thirdtri/ThirdTriFAQ";
import ThirdTriSupportStrip from "@/components/thirdtri/ThirdTriSupportStrip";
import ThirdTriQuoteBanner from "@/components/thirdtri/ThirdTriQuoteBanner";
import ThirdTriNextStage from "@/components/thirdtri/ThirdTriNextStage";
import TrimesterCompleteGuideCard from "@/components/trimester/TrimesterCompleteGuideCard";

import { thirdTrimester } from "@/data/trimesterData";

const ThirdTrimester = () => {
  const data = thirdTrimester;

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main>
        {/* 1. Hero */}
        <ThirdTriHero
          label={data.label}
          range={data.range}
          tagline={data.tagline}
          subtitle={data.heroSubtitle}
          weekStart={data.weekStart}
          weekEnd={data.weekEnd}
        />

        {/* 2. On this page strip */}
        <ThirdTriOnThisPage />

        {/* 3. Editorial hero image */}
        <ThirdTriEditorialImage />

        {/* 4. What the third trimester is */}
        <ThirdTriWhatItIs paragraphs={data.about.paragraphs} />

        {/* 5. What to expect (4 cards) */}
        <ThirdTriExpect cards={data.expect} />

        {/* 6. The big changes */}
        <ThirdTriBigChanges />

        {/* 7. What can feel difficult */}
        <ThirdTriDifficult />

        {/* 8. What's normal / when to seek support */}
        <ThirdTriSupport
          normalItems={data.normal.normalItems}
          seekSupport={data.normal.seekSupport}
          disclaimer={data.normal.disclaimer}
        />

        {/* 9. What to focus on */}
        <ThirdTriFocus closing={data.focusClosing} />

        {/* 10. Green week-by-week bridge */}
        <ThirdTriWeekBridge
          weekStart={data.weekStart}
          weekEnd={data.weekEnd}
          highlightWeek={36}
        />

        {/* 11. Helpful guidance — related articles */}
        <ThirdTriRelatedReads />

        {/* 12. Where to go deeper */}
        <ThirdTriDeeper />

        {/* 13. Common questions FAQ */}
        <ThirdTriFAQ />

        {/* 14. Support strip */}
        <ThirdTriSupportStrip />

        {/* 15. Quote banner */}
        <ThirdTriQuoteBanner />

        {/* 16. Journal promotion */}
        <JournalPromotion contextCopy="A gentle, beautifully designed companion for the final stage of pregnancy, weekly reflections, appointment notes, and a keepsake to look back on long after." />

        {/* 17. Next stage CTA */}
        <ThirdTriNextStage />
      </main>
      <Footer />
    </div>
  );
};

export default ThirdTrimester;
