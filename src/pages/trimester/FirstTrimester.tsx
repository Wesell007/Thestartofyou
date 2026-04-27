import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JournalPromotion from "@/components/shared/JournalPromotion";

import FirstTriHero from "@/components/firsttri/FirstTriHero";
import FirstTriOnThisPage from "@/components/firsttri/FirstTriOnThisPage";
import FirstTriEditorialImage from "@/components/firsttri/FirstTriEditorialImage";
import FirstTriWhatItIs from "@/components/firsttri/FirstTriWhatItIs";
import FirstTriExpect from "@/components/firsttri/FirstTriExpect";
import FirstTriBigChanges from "@/components/firsttri/FirstTriBigChanges";
import FirstTriDifficult from "@/components/firsttri/FirstTriDifficult";
import FirstTriSupport from "@/components/firsttri/FirstTriSupport";
import FirstTriFocus from "@/components/firsttri/FirstTriFocus";
import FirstTriWeekBridge from "@/components/firsttri/FirstTriWeekBridge";
import FirstTriRelatedReads from "@/components/firsttri/FirstTriRelatedReads";
import FirstTriDeeper from "@/components/firsttri/FirstTriDeeper";
import FirstTriFAQ from "@/components/firsttri/FirstTriFAQ";
import FirstTriSupportStrip from "@/components/firsttri/FirstTriSupportStrip";
import FirstTriQuoteBanner from "@/components/firsttri/FirstTriQuoteBanner";
import FirstTriNextStage from "@/components/firsttri/FirstTriNextStage";

import { firstTrimester } from "@/data/trimesterData";

const FirstTrimester = () => {
  const data = firstTrimester;

  return (
    <div className="min-h-screen font-sans bg-parchment">
      <Navbar />
      <main>
        {/* 1. Hero */}
        <FirstTriHero
          label={data.label}
          range={data.range}
          tagline={data.tagline}
          subtitle="The first trimester is a time of incredible change. From weeks 1 to 12, the foundations of pregnancy are laid and your body begins adapting in ways that often feel exciting, overwhelming, and everything in between."
          weekStart={data.weekStart}
          weekEnd={data.weekEnd}
        />

        {/* 2. On this page strip */}
        <FirstTriOnThisPage />

        {/* 3. Editorial hero image */}
        <FirstTriEditorialImage />

        {/* 4. What the first trimester is */}
        <FirstTriWhatItIs paragraphs={data.about.paragraphs} />

        {/* 5. What to expect (4 cards) */}
        <FirstTriExpect cards={data.expect} />

        {/* 6. The big changes */}
        <FirstTriBigChanges closing={data.bigChanges?.closing} />

        {/* 7. What can feel difficult */}
        <FirstTriDifficult
          title={data.difficulties.title}
          intro={data.difficulties.intro}
          items={data.difficulties.items}
          closing={data.difficulties.closing}
        />

        {/* 8. What's normal / when to seek support */}
        <FirstTriSupport
          normalItems={data.normal.normalItems}
          seekSupport={data.normal.seekSupport}
          disclaimer={data.normal.disclaimer}
        />

        {/* 9. What to focus on */}
        <FirstTriFocus closing={data.focusClosing} />

        {/* 10. Green week-by-week bridge */}
        <FirstTriWeekBridge
          weekStart={data.weekStart}
          weekEnd={data.weekEnd}
          highlightWeek={4}
        />

        {/* 11. Helpful guidance — related articles */}
        <FirstTriRelatedReads />

        {/* 12. Where to go deeper */}
        <FirstTriDeeper />

        {/* 13. Common questions FAQ */}
        <FirstTriFAQ />

        {/* 14. Support strip */}
        <FirstTriSupportStrip />

        {/* 15. Quote banner */}
        <FirstTriQuoteBanner />

        {/* 16. Journal promotion */}
        <JournalPromotion contextCopy="A gentle, beautifully designed companion for your pregnancy journey, weekly reflections, scan and appointment tracking, and a keepsake to look back on long after." />

        {/* 17. Next stage CTA */}
        <FirstTriNextStage />
      </main>
      <Footer />
    </div>
  );
};

export default FirstTrimester;
