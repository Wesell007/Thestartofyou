import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IVFHero from "@/components/ivf/IVFHero";
import IVFTimelineResult from "@/components/ivf/IVFTimelineResult";
import IVFWhatThisIs from "@/components/ivf/IVFWhatThisIs";
import IVFStages from "@/components/ivf/IVFStages";
import IVFFocus from "@/components/ivf/IVFFocus";
import IVFWhatToExpect from "@/components/ivf/IVFWhatToExpect";
import IVFWhatMakesDifferent from "@/components/ivf/IVFWhatMakesDifferent";
import IVFNormal from "@/components/ivf/IVFNormal";
import IVFCommonQuestions from "@/components/ivf/IVFCommonQuestions";
import IVFAISupport from "@/components/ivf/IVFAISupport";
import IVFEmotionalReminder from "@/components/ivf/IVFEmotionalReminder";
import IVFReflection from "@/components/ivf/IVFReflection";
import IVFCapture from "@/components/ivf/IVFCapture";
import IVFPathways from "@/components/ivf/IVFPathways";
import IVFFinalCTA from "@/components/ivf/IVFFinalCTA";

const IVF = () => {
  const [transferDate, setTransferDate] = useState<Date | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleCalculate = (date: Date) => {
    setTransferDate(date);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        {/* 1. Hero — tool-first */}
        <IVFHero onCalculate={handleCalculate} />

        {/* Timeline result — appears after calculation */}
        {transferDate && (
          <div ref={resultRef}>
            <IVFTimelineResult transferDate={transferDate} />
          </div>
        )}

        {/* 2. What this journey is */}
        <IVFWhatThisIs />

        {/* 3. Stages */}
        <IVFStages />

        {/* 4. What to focus on */}
        <IVFFocus />

        {/* 5. What to expect — body, care, emotional, waiting */}
        <IVFWhatToExpect />

        {/* 6. What makes this different */}
        <IVFWhatMakesDifferent />

        {/* 7. What's normal + when to seek support */}
        <IVFNormal />

        {/* 8. Common questions */}
        <IVFCommonQuestions />

        {/* 9. AI support */}
        <IVFAISupport />

        {/* 10. Emotional reminder */}
        <IVFEmotionalReminder />

        {/* 11. Reflection prompt */}
        <IVFReflection />

        {/* 12. Capture — soft product integration */}
        <IVFCapture />

        {/* 13. Pathways */}
        <IVFPathways />

        {/* 14. Final CTA */}
        <IVFFinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default IVF;
