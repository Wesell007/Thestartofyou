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
import PostpartumEmotionalReminder from "@/components/postpartum/PostpartumEmotionalReminder";
import PostpartumReflection from "@/components/postpartum/PostpartumReflection";
import PostpartumCapture from "@/components/postpartum/PostpartumCapture";
import PostpartumPathways from "@/components/postpartum/PostpartumPathways";
import PostpartumFinalCTA from "@/components/postpartum/PostpartumFinalCTA";

const Postpartum = () => {
  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <PostpartumHero />
        <PostpartumWhatThisIs />
        <PostpartumStages />
        <PostpartumFocus />
        <PostpartumWhatToExpect />
        <PostpartumDisorienting />
        <PostpartumProgression />
        <PostpartumNormal />
        <PostpartumCommonQuestions />
        <PostpartumEmotionalReminder />
        <PostpartumReflection />
        <PostpartumCapture />
        <PostpartumPathways />
        <PostpartumFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Postpartum;
