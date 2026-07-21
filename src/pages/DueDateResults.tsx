import { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DueDateCalculatorResult from "@/components/shared/DueDateCalculatorResult";
import SeoHead from "@/components/seo/SeoHead";
import { trackEvent } from "@/lib/analytics";
import { EVENTS } from "@/lib/analyticsEvents";
import { addDays, isAfter, isBefore, isValid, startOfDay } from "date-fns";

const DueDateResults = () => {
  const [searchParams] = useSearchParams();
  const [lmp, setLmp] = useState<Date | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    setLmp(null);
    const lmpParam = searchParams.get("lmp");
    if (lmpParam) {
      const ts = Number(lmpParam);
      const candidate = new Date(ts);
      const today = startOfDay(new Date());
      if (
        Number.isFinite(ts) &&
        isValid(candidate) &&
        !isAfter(candidate, today) &&
        !isBefore(candidate, addDays(today, -300))
      ) {
        setLmp(candidate);
      }
    }
    setReady(true);
  }, [searchParams]);

  useEffect(() => {
    if (lmp) trackEvent(EVENTS.DUE_DATE_RESULTS_VIEWED);
  }, [lmp]);

  if (!ready) return null;

  if (!lmp) {
    return <Navigate to="/due-date-calculator" replace />;
  }

  return (
    <div className="min-h-screen bg-parchment">
      <SeoHead
        title="Your Due Date Results | The Start of You"
        description="See your estimated due date and pregnancy timing, then continue with calm week-by-week guidance for the stage you may be in."
        canonical="https://thestartofyou.com/due-date-calculator"
        noindex
      />
      <Navbar />
      <DueDateCalculatorResult lmp={lmp} />
      <Footer />
    </div>
  );
};

export default DueDateResults;
