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
import Week4Page from "./pages/Week4Page.tsx";
import Week8Page from "./pages/Week8Page.tsx";
import Week12Page from "./pages/Week12Page.tsx";
import Week20Page from "./pages/Week20Page.tsx";
import Week28Page from "./pages/Week28Page.tsx";
import ArticlePage from "./pages/ArticlePage.tsx";
import DueDateCalculator from "./pages/DueDateCalculator.tsx";
import DueDateResults from "./pages/DueDateResults.tsx";
import TTC from "./pages/TTC.tsx";
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
          <Route path="/pregnancy/week/4" element={<Week4Page />} />
          <Route path="/pregnancy/week/8" element={<Week8Page />} />
          <Route path="/pregnancy/week/12" element={<Week12Page />} />
          <Route path="/pregnancy/week/20" element={<Week20Page />} />
          <Route path="/pregnancy/week/28" element={<Week28Page />} />
          <Route path="/pregnancy/week/:week" element={<WeekPage />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/due-date-calculator" element={<DueDateCalculator />} />
          <Route path="/due-date-results" element={<DueDateResults />} />
          <Route path="/trying-to-conceive" element={<TTC />} />
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
