import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { parseISO, addDays, format } from "date-fns";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import OvulationResult from "@/components/ttc/OvulationResult";

const OvulationCalculator = () => {
  const [params] = useSearchParams();

  const data = useMemo(() => {
    const lmpStr = params.get("lmp");
    const cycleStr = params.get("cycle");
    if (!lmpStr) return null;

    const lmp = parseISO(lmpStr);
    const cycleLength = cycleStr ? Number(cycleStr) : 28;
    const ovulationDay = addDays(lmp, cycleLength - 14);
    const fertileStart = addDays(ovulationDay, -5);
    const fertileEnd = addDays(ovulationDay, 1);
    const testDay = addDays(ovulationDay, 15); // ~day 29 for 28-day cycle

    return { lmp, cycleLength, ovulationDay, fertileStart, fertileEnd, testDay };
  }, [params]);

  if (!data) {
    return (
      <div className="min-h-screen font-sans">
        <Navbar />
        <main className="bg-parchment py-32">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <h1 className="font-serif text-3xl text-foreground mb-4">Ovulation Calculator</h1>
            <p className="font-sans text-base font-light text-muted-foreground">
              Please use the calculator on the <a href="/trying-to-conceive" className="underline text-sage">TTC hub</a> to see your results.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <OvulationResult {...data} />
      </main>
      <Footer />
    </div>
  );
};

export default OvulationCalculator;
