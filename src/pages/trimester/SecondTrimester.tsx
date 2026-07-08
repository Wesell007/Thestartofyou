import SeoHead from "@/components/seo/SeoHead";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JournalPromotion from "@/components/shared/JournalPromotion";

import SecondTriHero from "@/components/secondtri/SecondTriHero";
import SecondTriOnThisPage from "@/components/secondtri/SecondTriOnThisPage";
import SecondTriEditorialImage from "@/components/secondtri/SecondTriEditorialImage";
import SecondTriWhatItIs from "@/components/secondtri/SecondTriWhatItIs";
import SecondTriExpect from "@/components/secondtri/SecondTriExpect";
import SecondTriBigChanges from "@/components/secondtri/SecondTriBigChanges";
import SecondTriDifficult from "@/components/secondtri/SecondTriDifficult";
import SecondTriSupport from "@/components/secondtri/SecondTriSupport";
import SecondTriFocus from "@/components/secondtri/SecondTriFocus";
import SecondTriWeekBridge from "@/components/secondtri/SecondTriWeekBridge";
import SecondTriRelatedReads from "@/components/secondtri/SecondTriRelatedReads";
import SecondTriDeeper from "@/components/secondtri/SecondTriDeeper";
import SecondTriFAQ from "@/components/secondtri/SecondTriFAQ";
import SecondTriSupportStrip from "@/components/secondtri/SecondTriSupportStrip";
import SecondTriQuoteBanner from "@/components/secondtri/SecondTriQuoteBanner";
import SecondTriNextStage from "@/components/secondtri/SecondTriNextStage";
import TrimesterCompleteGuideCard from "@/components/trimester/TrimesterCompleteGuideCard";

import { secondTrimester } from "@/data/trimesterData";

const SecondTrimester = () => {
  const data = secondTrimester;

  return (
    <>
      <SeoHead
        title="Second Trimester Guide | Baby Growth, Movement & Body Changes"
        description="Supportive second trimester guidance covering baby growth, movement, scans, body changes, energy shifts and preparing for the months ahead."
        canonical="https://thestartofyou.com/pregnancy/second-trimester"
      />
      <div className="min-h-screen font-sans bg-parchment">
        <Navbar />
      <main>
        {/* 1. Hero */}
        <SecondTriHero
          label={data.label}
          range={data.range}
          tagline={data.tagline}
          subtitle={data.heroSubtitle}
          weekStart={data.weekStart}
          weekEnd={data.weekEnd}
        />

        {/* 2. On this page strip */}
        <SecondTriOnThisPage />

        {/* 3. Editorial hero image */}
        <SecondTriEditorialImage />

        {/* 4. What the second trimester is */}
        <SecondTriWhatItIs paragraphs={data.about.paragraphs} />

        {/* 5. What to expect (4 cards) */}
        <SecondTriExpect cards={data.expect} />

        {/* 6. The big changes */}
        <SecondTriBigChanges />

        {/* 7. What can feel difficult */}
        <SecondTriDifficult />

        {/* 8. What's normal / when to seek support */}
        <SecondTriSupport
          normalItems={data.normal.normalItems}
          seekSupport={data.normal.seekSupport}
          disclaimer={data.normal.disclaimer}
        />

        {/* 9. What to focus on */}
        <SecondTriFocus closing={data.focusClosing} />

        {/* 10. Green week-by-week bridge */}
        <SecondTriWeekBridge
          weekStart={data.weekStart}
          weekEnd={data.weekEnd}
          highlightWeek={20}
        />

        {/* 11. Helpful guidance — related articles */}
        <SecondTriRelatedReads />

        {/* 12. Where to go deeper */}
        <SecondTriDeeper />

        {/* 12b. Complete guide link */}
        <TrimesterCompleteGuideCard
          title="Second trimester: a complete guide"
          description="A fuller guide to body changes, movement, scans, emotions and the middle weeks of pregnancy."
          ctaLabel="Read the complete second trimester guide"
          href="/articles/second-trimester-complete-guide"
        />


        {/* 13. Common questions FAQ */}
        <SecondTriFAQ />

        {/* 14. Support strip */}
        <SecondTriSupportStrip />

        {/* 15. Quote banner */}
        <SecondTriQuoteBanner />

        {/* 16. Journal promotion */}
        <JournalPromotion contextCopy="A gentle, beautifully designed companion for your pregnancy journey, weekly reflections, scan and appointment tracking, and a keepsake to look back on long after." />

        {/* 17. Next stage CTA */}
        <SecondTriNextStage />
      </main>
      <Footer />
    </div>
    </>
  );
};

export default SecondTrimester;
