import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PostpartumHero from "@/components/postpartum/PostpartumHero";
import PostpartumWhatThisIs from "@/components/postpartum/PostpartumWhatThisIs";
import PostpartumStages from "@/components/postpartum/PostpartumStages";
import PostpartumFocus from "@/components/postpartum/PostpartumFocus";
import PostpartumWhatToExpect from "@/components/postpartum/PostpartumWhatToExpect";
import PostpartumDisorienting from "@/components/postpartum/PostpartumDisorienting";
import PostpartumProgression from "@/components/postpartum/PostpartumProgression";
import PostpartumNormal from "@/components/postpartum/PostpartumNormal";
import PostpartumCommonQuestions from "@/components/postpartum/PostpartumCommonQuestions";
import PostpartumAISupport from "@/components/postpartum/PostpartumAISupport";
import PostpartumEmotionalReminder from "@/components/postpartum/PostpartumEmotionalReminder";
import PostpartumReflection from "@/components/postpartum/PostpartumReflection";

import PostpartumPathways from "@/components/postpartum/PostpartumPathways";
import PostpartumFinalCTA from "@/components/postpartum/PostpartumFinalCTA";

const Postpartum = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* 1. Hero */}
        <PostpartumHero />

        {/* 2. What this stage is */}
        <PostpartumWhatThisIs />

        {/* 3. Stages of postpartum */}
        <PostpartumStages />

        {/* 4. What to focus on right now */}
        <PostpartumFocus />

        {/* 5. What to expect — body, baby, daily life, emotional, identity, uncertainty */}
        <PostpartumWhatToExpect />

        {/* 6. What can feel disorienting + mental load */}
        <PostpartumDisorienting />

        {/* 7. How this stage changes over time */}
        <PostpartumProgression />

        {/* 8. What's normal + when to seek support */}
        <PostpartumNormal />

        {/* 9. Common questions */}
        <PostpartumCommonQuestions />

        {/* 10. AI support */}
        <PostpartumAISupport />

        {/* 11. Emotional reminder */}
        <PostpartumEmotionalReminder />

        {/* 12. Reflection prompt */}
        <PostpartumReflection />


        {/* 14. Pathways */}
        <PostpartumPathways />

        {/* 15. Final CTA */}
        <PostpartumFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Postpartum;
