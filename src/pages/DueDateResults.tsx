import { useEffect, useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DueDateCalculatorResult from "@/components/shared/DueDateCalculatorResult";

const DueDateResults = () => {
  const [searchParams] = useSearchParams();
  const [lmp, setLmp] = useState<Date | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lmpParam = searchParams.get("lmp");
    if (lmpParam) {
      const ts = parseInt(lmpParam, 10);
      if (!isNaN(ts)) setLmp(new Date(ts));
    }
    setReady(true);
  }, [searchParams]);

  if (!ready) return null;

  if (!lmp) {
    return <Navigate to="/due-date-calculator" replace />;
  }

  return (
    <div className="min-h-screen bg-parchment">
      <Navbar />
      <DueDateCalculatorResult lmp={lmp} />
      <Footer />
    </div>
  );
};

export default DueDateResults;
