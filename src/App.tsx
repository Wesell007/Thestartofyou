import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Explore from "./pages/Explore.tsx";
import Pregnancy from "./pages/Pregnancy.tsx";
import BodyTopic from "./pages/pregnancy/BodyTopic.tsx";
import BabyTopic from "./pages/pregnancy/BabyTopic.tsx";
import HealthAndSafetyTopic from "./pages/pregnancy/HealthAndSafetyTopic.tsx";
import DietAndExerciseTopic from "./pages/pregnancy/DietAndExerciseTopic.tsx";
import PreparingForBabyTopic from "./pages/pregnancy/PreparingForBabyTopic.tsx";
import FeelingsTopic from "./pages/pregnancy/FeelingsTopic.tsx";
import FirstTrimester from "./pages/trimester/FirstTrimester.tsx";
import SecondTrimester from "./pages/trimester/SecondTrimester.tsx";
import ThirdTrimester from "./pages/trimester/ThirdTrimester.tsx";
import WeekPage from "./pages/WeekPage.tsx";
import Week1Page from "./pages/Week1Page.tsx";
import Week2Page from "./pages/Week2Page.tsx";
import Week3Page from "./pages/Week3Page.tsx";
import Week4Page from "./pages/Week4Page.tsx";
import Week6Page from "./pages/Week6Page.tsx";
import Week5Page from "./pages/Week5Page.tsx";
import Week7Page from "./pages/Week7Page.tsx";
import Week8Page from "./pages/Week8Page.tsx";
import Week9Page from "./pages/Week9Page.tsx";
import Week10Page from "./pages/Week10Page.tsx";
import Week11Page from "./pages/Week11Page.tsx";
import Week12Page from "./pages/Week12Page.tsx";
import Week13Page from "./pages/Week13Page.tsx";
import Week14Page from "./pages/Week14Page.tsx";
import Week15Page from "./pages/Week15Page.tsx";
import Week16Page from "./pages/Week16Page.tsx";
import Week17Page from "./pages/Week17Page.tsx";
import Week18Page from "./pages/Week18Page.tsx";
import Week19Page from "./pages/Week19Page.tsx";
import Week20Page from "./pages/Week20Page.tsx";
import Week21Page from "./pages/Week21Page.tsx";
import Week22Page from "./pages/Week22Page.tsx";
import Week23Page from "./pages/Week23Page.tsx";
import Week24Page from "./pages/Week24Page.tsx";
import Week25Page from "./pages/Week25Page.tsx";
import Week26Page from "./pages/Week26Page.tsx";
import Week27Page from "./pages/Week27Page.tsx";
import Week28Page from "./pages/Week28Page.tsx";
import Week29Page from "./pages/Week29Page.tsx";
import Week30Page from "./pages/Week30Page.tsx";
import Week31Page from "./pages/Week31Page.tsx";
import Week32Page from "./pages/Week32Page.tsx";
import Week33Page from "./pages/Week33Page.tsx";
import Week34Page from "./pages/Week34Page.tsx";
import Week35Page from "./pages/Week35Page.tsx";
import Week36Page from "./pages/Week36Page.tsx";
import Week37Page from "./pages/Week37Page.tsx";
import Week38Page from "./pages/Week38Page.tsx";
import Week39Page from "./pages/Week39Page.tsx";
import Week40Page from "./pages/Week40Page.tsx";
import Week41Page from "./pages/Week41Page.tsx";
import Week42Page from "./pages/Week42Page.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import DueDateCalculator from "./pages/DueDateCalculator.tsx";
import DueDateResults from "./pages/DueDateResults.tsx";
import TTC from "./pages/TTC.tsx";
import TTCHub from "./pages/TTCHub.tsx";
import IVF from "./pages/IVF.tsx";
import Postpartum from "./pages/Postpartum.tsx";
import FirstYear from "./pages/FirstYear.tsx";
import PreparingForBaby from "./pages/PreparingForBaby.tsx";
import Support from "./pages/Support.tsx";
import About from "./pages/About.tsx";
import Product from "./pages/Product.tsx";
import StagePage from "./pages/StagePage.tsx";
import OvulationCalculator from "./pages/OvulationCalculator.tsx";
import IVFTimeline from "./pages/IVFTimeline.tsx";
import AskPage from "./pages/AskPage.tsx";
import GuidanceLibrary from "./pages/GuidanceLibrary.tsx";
import MyWeek from "./pages/MyWeek.tsx";
import MyJourney from "./pages/MyJourney.tsx";
import KeptChapter from "./pages/KeptChapter.tsx";
import Auth from "./pages/Auth.tsx";
import Setup from "./pages/Setup.tsx";
import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/layout/ScrollToTop.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import ConsentBanner from "./components/consent/ConsentBanner.tsx";
import RouteTracker from "./components/analytics/RouteTracker.tsx";
import { useEffect } from "react";
import { supabase } from "./integrations/supabase/client.ts";
import { identify, trackEvent } from "./lib/analytics.ts";
import { EVENTS } from "./lib/analyticsEvents.ts";


const queryClient = new QueryClient();

const AnalyticsIdentityBridge = () => {
  useEffect(() => {
    let cancelled = false;
    // Dedupe `auth_completed`: Supabase fires SIGNED_IN on real sign-in,
    // token refresh, tab focus / visibility, and session restore. We only
    // want to count a real sign-in. Keying on user.id means token
    // rotations for the same user are suppressed, while a genuine
    // sign-out → sign-in (which changes or clears the id) re-fires.
    let lastSignedInUserId: string | null = null;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      const uid = data.session?.user?.id ?? null;
      identify(uid);
      // Existing session at app load is not a sign-in — seed the memo so
      // the imminent SIGNED_IN echo from Supabase does not re-fire.
      if (uid) lastSignedInUserId = uid;
    });

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (cancelled) return;
      const uid = session?.user?.id ?? null;
      identify(uid);
      if (event === "SIGNED_IN" && uid && uid !== lastSignedInUserId) {
        lastSignedInUserId = uid;
        trackEvent(EVENTS.AUTH_COMPLETED);
      }
      if (event === "SIGNED_OUT") {
        lastSignedInUserId = null;
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      <BrowserRouter>
        <ScrollToTop />
        <RouteTracker />
        <AnalyticsIdentityBridge />
        <ConsentBanner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/pregnancy" element={<Pregnancy />} />
          <Route path="/pregnancy/body" element={<BodyTopic />} />
          <Route path="/pregnancy/baby" element={<BabyTopic />} />
          <Route path="/pregnancy/health-and-safety" element={<HealthAndSafetyTopic />} />
          <Route path="/pregnancy/diet-and-exercise" element={<DietAndExerciseTopic />} />
          <Route path="/pregnancy/preparing-for-baby" element={<PreparingForBabyTopic />} />
          <Route path="/pregnancy/feelings" element={<FeelingsTopic />} />
          <Route path="/pregnancy/first-trimester" element={<FirstTrimester />} />
          <Route path="/pregnancy/second-trimester" element={<SecondTrimester />} />
          <Route path="/pregnancy/third-trimester" element={<ThirdTrimester />} />
          <Route path="/pregnancy/week/1" element={<Week1Page />} />
          <Route path="/pregnancy/week/2" element={<Week2Page />} />
          <Route path="/pregnancy/week/3" element={<Week3Page />} />
          <Route path="/pregnancy/week/4" element={<Week4Page />} />
          <Route path="/pregnancy/week/5" element={<Week5Page />} />
          <Route path="/pregnancy/week/6" element={<Week6Page />} />
          <Route path="/pregnancy/week/7" element={<Week7Page />} />
          <Route path="/pregnancy/week/8" element={<Week8Page />} />
          <Route path="/pregnancy/week/9" element={<Week9Page />} />
          <Route path="/pregnancy/week/10" element={<Week10Page />} />
          <Route path="/pregnancy/week/11" element={<Week11Page />} />
          <Route path="/pregnancy/week/12" element={<Week12Page />} />
          <Route path="/pregnancy/week/13" element={<Week13Page />} />
          <Route path="/pregnancy/week/14" element={<Week14Page />} />
          <Route path="/pregnancy/week/15" element={<Week15Page />} />
          <Route path="/pregnancy/week/16" element={<Week16Page />} />
          <Route path="/pregnancy/week/17" element={<Week17Page />} />
          <Route path="/pregnancy/week/18" element={<Week18Page />} />
          <Route path="/pregnancy/week/19" element={<Week19Page />} />
          <Route path="/pregnancy/week/20" element={<Week20Page />} />
          <Route path="/pregnancy/week/21" element={<Week21Page />} />
          <Route path="/pregnancy/week/22" element={<Week22Page />} />
          <Route path="/pregnancy/week/23" element={<Week23Page />} />
          <Route path="/pregnancy/week/24" element={<Week24Page />} />
          <Route path="/pregnancy/week/25" element={<Week25Page />} />
          <Route path="/pregnancy/week/26" element={<Week26Page />} />
          <Route path="/pregnancy/week/27" element={<Week27Page />} />
          <Route path="/pregnancy/week/28" element={<Week28Page />} />
          <Route path="/pregnancy/week/29" element={<Week29Page />} />
          <Route path="/pregnancy/week/30" element={<Week30Page />} />
          <Route path="/pregnancy/week/31" element={<Week31Page />} />
          <Route path="/pregnancy/week/32" element={<Week32Page />} />
          <Route path="/pregnancy/week/33" element={<Week33Page />} />
          <Route path="/pregnancy/week/34" element={<Week34Page />} />
          <Route path="/pregnancy/week/35" element={<Week35Page />} />
          <Route path="/pregnancy/week/36" element={<Week36Page />} />
          <Route path="/pregnancy/week/37" element={<Week37Page />} />
          <Route path="/pregnancy/week/38" element={<Week38Page />} />
          <Route path="/pregnancy/week/39" element={<Week39Page />} />
          <Route path="/pregnancy/week/40" element={<Week40Page />} />
          <Route path="/pregnancy/week/41" element={<Week41Page />} />
          <Route path="/pregnancy/week/42" element={<Week42Page />} />
          <Route path="/pregnancy/week/:week" element={<WeekPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/due-date-calculator" element={<DueDateCalculator />} />
          <Route path="/due-date-results" element={<DueDateResults />} />
          <Route path="/trying-to-conceive" element={<TTCHub />} />
          <Route path="/trying-to-conceive/legacy" element={<TTC />} />
          <Route path="/ovulation-calculator" element={<OvulationCalculator />} />
          <Route path="/ivf" element={<IVF />} />
          <Route path="/ivf-timeline" element={<IVFTimeline />} />
          <Route path="/postpartum" element={<Postpartum />} />
          <Route path="/first-year" element={<FirstYear />} />
          <Route path="/preparing-for-baby" element={<PreparingForBaby />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/ask" element={<AskPage />} />
          <Route path="/guidance" element={<GuidanceLibrary />} />
          <Route path="/my-week" element={<ProtectedRoute><MyWeek /></ProtectedRoute>} />
          <Route path="/my-week/:week" element={<ProtectedRoute><KeptChapter /></ProtectedRoute>} />
          <Route path="/my-journey" element={<ProtectedRoute><MyJourney /></ProtectedRoute>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/:journey/:stage" element={<StagePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
