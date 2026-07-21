import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IVFTimelineResult from "@/components/ivf/IVFTimelineResult";
import SeoHead from "@/components/seo/SeoHead";
import { addDays, isAfter, isBefore, isValid, startOfDay } from "date-fns";

const TIMELINE_SEO = (
  <SeoHead
    title="IVF Timeline Guide | Steps, Transfer & Two-Week Wait"
    description="A calm guide to the IVF timeline, including treatment stages, transfer preparation, waiting after transfer and what may come next."
    canonical="https://thestartofyou.com/ivf-timeline"
  />
);

const IVFTimeline = () => {
  const [searchParams] = useSearchParams();
  const [transferDate, setTransferDate] = useState<Date | null>(null);
  const [transferType, setTransferType] = useState<"5day" | "3day">("5day");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    setTransferDate(null);
    setTransferType("5day");
    const dateParam = searchParams.get("date");
    const typeParam = searchParams.get("type");
    if (dateParam) {
      const ts = Number(dateParam);
      const candidate = new Date(ts);
      const today = startOfDay(new Date());
      if (
        Number.isFinite(ts) &&
        isValid(candidate) &&
        !isAfter(candidate, today) &&
        !isBefore(candidate, addDays(today, -300))
      ) {
        setTransferDate(candidate);
      }
    }
    if (typeParam === "3day" || typeParam === "5day") {
      setTransferType(typeParam);
    }
    setReady(true);
  }, [searchParams]);

  if (!ready) return null;

  if (!transferDate) {
    return (
      <div className="min-h-screen bg-parchment">
        {TIMELINE_SEO}
        <Navbar />
        <section className="pt-28 pb-32 md:pt-36">
          <div className="container mx-auto px-6 md:px-10 max-w-xl text-center">
            <p className="font-sans text-sm font-light text-muted-foreground/60 leading-relaxed">
              No transfer date provided. Please use the calculator on the{" "}
              <a href="/ivf" className="text-sage underline hover:text-sage-muted transition-colors">IVF hub</a>{" "}
              to track your timeline.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment">
      {TIMELINE_SEO}
      <Navbar />
      <IVFTimelineResult transferDate={transferDate} transferType={transferType} />
      <Footer />
    </div>
  );
};

export default IVFTimeline;
