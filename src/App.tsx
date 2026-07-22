import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import PageLoadState from "./components/shared/PageLoadState.tsx";
const Index = lazy(() => import("./pages/Index.tsx"));

const Pregnancy = lazy(() => import("./pages/Pregnancy.tsx"));
const BodyTopic = lazy(() => import("./pages/pregnancy/BodyTopic.tsx"));
const BabyTopic = lazy(() => import("./pages/pregnancy/BabyTopic.tsx"));
const HealthAndSafetyTopic = lazy(() => import("./pages/pregnancy/HealthAndSafetyTopic.tsx"));
const DietAndExerciseTopic = lazy(() => import("./pages/pregnancy/DietAndExerciseTopic.tsx"));
const PreparingForBabyTopic = lazy(() => import("./pages/pregnancy/PreparingForBabyTopic.tsx"));
const FeelingsTopic = lazy(() => import("./pages/pregnancy/FeelingsTopic.tsx"));
const FirstTrimester = lazy(() => import("./pages/trimester/FirstTrimester.tsx"));
const SecondTrimester = lazy(() => import("./pages/trimester/SecondTrimester.tsx"));
const ThirdTrimester = lazy(() => import("./pages/trimester/ThirdTrimester.tsx"));
const WeekPage = lazy(() => import("./pages/WeekPage.tsx"));
const Week1Page = lazy(() => import("./pages/Week1Page.tsx"));
const Week2Page = lazy(() => import("./pages/Week2Page.tsx"));
const Week3Page = lazy(() => import("./pages/Week3Page.tsx"));
const Week4Page = lazy(() => import("./pages/Week4Page.tsx"));
const Week6Page = lazy(() => import("./pages/Week6Page.tsx"));
const Week5Page = lazy(() => import("./pages/Week5Page.tsx"));
const Week7Page = lazy(() => import("./pages/Week7Page.tsx"));
const Week8Page = lazy(() => import("./pages/Week8Page.tsx"));
const Week9Page = lazy(() => import("./pages/Week9Page.tsx"));
const Week10Page = lazy(() => import("./pages/Week10Page.tsx"));
const Week11Page = lazy(() => import("./pages/Week11Page.tsx"));
const Week12Page = lazy(() => import("./pages/Week12Page.tsx"));
const Week13Page = lazy(() => import("./pages/Week13Page.tsx"));
const Week14Page = lazy(() => import("./pages/Week14Page.tsx"));
const Week15Page = lazy(() => import("./pages/Week15Page.tsx"));
const Week16Page = lazy(() => import("./pages/Week16Page.tsx"));
const Week17Page = lazy(() => import("./pages/Week17Page.tsx"));
const Week18Page = lazy(() => import("./pages/Week18Page.tsx"));
const Week19Page = lazy(() => import("./pages/Week19Page.tsx"));
const Week20Page = lazy(() => import("./pages/Week20Page.tsx"));
const Week21Page = lazy(() => import("./pages/Week21Page.tsx"));
const Week22Page = lazy(() => import("./pages/Week22Page.tsx"));
const Week23Page = lazy(() => import("./pages/Week23Page.tsx"));
const Week24Page = lazy(() => import("./pages/Week24Page.tsx"));
const Week25Page = lazy(() => import("./pages/Week25Page.tsx"));
const Week26Page = lazy(() => import("./pages/Week26Page.tsx"));
const Week27Page = lazy(() => import("./pages/Week27Page.tsx"));
const Week28Page = lazy(() => import("./pages/Week28Page.tsx"));
const Week29Page = lazy(() => import("./pages/Week29Page.tsx"));
const Week30Page = lazy(() => import("./pages/Week30Page.tsx"));
const Week31Page = lazy(() => import("./pages/Week31Page.tsx"));
const Week32Page = lazy(() => import("./pages/Week32Page.tsx"));
const Week33Page = lazy(() => import("./pages/Week33Page.tsx"));
const Week34Page = lazy(() => import("./pages/Week34Page.tsx"));
const Week35Page = lazy(() => import("./pages/Week35Page.tsx"));
const Week36Page = lazy(() => import("./pages/Week36Page.tsx"));
const Week37Page = lazy(() => import("./pages/Week37Page.tsx"));
const Week38Page = lazy(() => import("./pages/Week38Page.tsx"));
const Week39Page = lazy(() => import("./pages/Week39Page.tsx"));
const Week40Page = lazy(() => import("./pages/Week40Page.tsx"));
const Week41Page = lazy(() => import("./pages/Week41Page.tsx"));
const Week42Page = lazy(() => import("./pages/Week42Page.tsx"));
const ArticlePage = lazy(() => import("./pages/ArticlePage.tsx"));
const DueDateCalculator = lazy(() => import("./pages/DueDateCalculator.tsx"));
const DueDateResults = lazy(() => import("./pages/DueDateResults.tsx"));
const TTC = lazy(() => import("./pages/TTC.tsx"));
const TTCHub = lazy(() => import("./pages/TTCHub.tsx"));
const IVF = lazy(() => import("./pages/IVF.tsx"));
// Postpartum: preserved in code for reuse, but no longer a live top-level
// destination. /postpartum redirects into the First Year ecosystem.
// The legacy hub is kept at /postpartum/legacy for reference during rebuild.
const Postpartum = lazy(() => import("./pages/Postpartum.tsx"));
const FirstYear = lazy(() => import("./pages/FirstYear.tsx"));
const FYPhaseZeroToThree = lazy(() => import("./pages/firstyear/PhaseZeroToThree.tsx"));
const FYMonthPage = lazy(() => import("./pages/firstyear/MonthPage.tsx"));
const FYPhaseThreeToSix = lazy(() => import("./pages/firstyear/PhaseThreeToSix.tsx"));
const FYPhaseSixToNine = lazy(() => import("./pages/firstyear/PhaseSixToNine.tsx"));
const FYPhaseNineToTwelve = lazy(() => import("./pages/firstyear/PhaseNineToTwelve.tsx"));
const FYFeeding = lazy(() => import("./pages/firstyear/Feeding.tsx"));
const FYSleep = lazy(() => import("./pages/firstyear/Sleep.tsx"));
const FYDevelopment = lazy(() => import("./pages/firstyear/Development.tsx"));
const FYCareAndSafety = lazy(() => import("./pages/firstyear/CareAndSafety.tsx"));
const FYPostpartumRecovery = lazy(() => import("./pages/firstyear/PostpartumRecovery.tsx"));
const FYEmotionalWellbeing = lazy(() => import("./pages/firstyear/EmotionalWellbeing.tsx"));
const FYBodyAndHormones = lazy(() => import("./pages/firstyear/BodyAndHormones.tsx"));
const FYCheckupsAndWarningSigns = lazy(() => import("./pages/firstyear/CheckupsAndWarningSigns.tsx"));
const Toddler = lazy(() => import("./pages/Toddler.tsx"));
const ToddlerDevelopmentMilestones = lazy(() => import("./pages/toddler/DevelopmentMilestones.tsx"));
const ToddlerBehaviourEmotions = lazy(() => import("./pages/toddler/BehaviourEmotions.tsx"));
const ToddlerSpeechLanguage = lazy(() => import("./pages/toddler/SpeechLanguage.tsx"));
const ToddlerSleep = lazy(() => import("./pages/toddler/Sleep.tsx"));
const ToddlerFoodFeeding = lazy(() => import("./pages/toddler/FoodFeeding.tsx"));
const ToddlerPottyLearning = lazy(() => import("./pages/toddler/PottyLearning.tsx"));
const ToddlerHealthSafety = lazy(() => import("./pages/toddler/HealthSafety.tsx"));
const ToddlerPlayConnection = lazy(() => import("./pages/toddler/PlayConnection.tsx"));
const ToddlerAge12to17 = lazy(() => import("./pages/toddler/age/TwelveToSeventeenMonths.tsx"));
const ToddlerAge18to23 = lazy(() => import("./pages/toddler/age/EighteenToTwentyThreeMonths.tsx"));
const ToddlerAge2y = lazy(() => import("./pages/toddler/age/TwoYears.tsx"));
const ToddlerAge30m = lazy(() => import("./pages/toddler/age/ThirtyMonths.tsx"));
const ToddlerAge3y = lazy(() => import("./pages/toddler/age/ThreeYears.tsx"));
const Family = lazy(() => import("./pages/Family.tsx"));
const FamilyGrowingFamilies = lazy(() => import("./pages/family/GrowingFamilies.tsx"));
const FamilyRelationships = lazy(() => import("./pages/family/Relationships.tsx"));
const FamilyBasics = lazy(() => import("./pages/family/FamilyBasics.tsx"));
const FamilyHealthSafety = lazy(() => import("./pages/family/HealthSafety.tsx"));
const FamilyTravelDaysOut = lazy(() => import("./pages/family/TravelDaysOut.tsx"));
const FamilyPlayConnection = lazy(() => import("./pages/family/PlayConnection.tsx"));
const FamilyArticle = lazy(() => import("./pages/family/FamilyArticle.tsx"));
const FirstYearArticle = lazy(() => import("./pages/firstyear/FirstYearArticle.tsx"));
const ToddlerArticle = lazy(() => import("./pages/toddler/ToddlerArticle.tsx"));
const PreparingForBaby = lazy(() => import("./pages/PreparingForBaby.tsx"));
const Support = lazy(() => import("./pages/Support.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Product = lazy(() => import("./pages/Product.tsx"));
const StagePage = lazy(() => import("./pages/StagePage.tsx"));
const OvulationCalculator = lazy(() => import("./pages/OvulationCalculator.tsx"));
const TTCOvulation = lazy(() => import("./pages/ttc/Ovulation.tsx"));
const TTCPreconceptionHealth = lazy(() => import("./pages/ttc/PreconceptionHealth.tsx"));
const TTCFertility = lazy(() => import("./pages/ttc/Fertility.tsx"));
const TTCIVFAndTreatment = lazy(() => import("./pages/ttc/IVFAndTreatment.tsx"));
const TTCMaleFertility = lazy(() => import("./pages/ttc/MaleFertility.tsx"));
const TTCAgeAndFertility = lazy(() => import("./pages/ttc/AgeAndFertility.tsx"));
const TTCCycleTracking = lazy(() => import("./pages/ttc/CycleTracking.tsx"));
const TTCPregnancyTests = lazy(() => import("./pages/ttc/PregnancyTests.tsx"));
const TTCTwoWeekWait = lazy(() => import("./pages/ttc/TwoWeekWait.tsx"));
const TTCConditions = lazy(() => import("./pages/ttc/Conditions.tsx"));
const IVFTimeline = lazy(() => import("./pages/IVFTimeline.tsx"));
const IVFBeforeTransfer = lazy(() => import("./pages/ivf/BeforeTransfer.tsx"));
const IVFAfterTransfer = lazy(() => import("./pages/ivf/AfterTransfer.tsx"));
const IVFEarlyPregnancy = lazy(() => import("./pages/ivf/EarlyPregnancy.tsx"));
const AskPage = lazy(() => import("./pages/AskPage.tsx"));

const MyWeek = lazy(() => import("./pages/MyWeek.tsx"));
const MyJourney = lazy(() => import("./pages/MyJourney.tsx"));
const KeptChapter = lazy(() => import("./pages/KeptChapter.tsx"));
const Auth = lazy(() => import("./pages/Auth.tsx"));
const Setup = lazy(() => import("./pages/Setup.tsx"));
const SetupTTC = lazy(() => import("./pages/SetupTTC.tsx"));
const MyTTCJourney = lazy(() => import("./pages/MyTTCJourney.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const Privacy = lazy(() => import("./pages/Privacy.tsx"));
const Terms = lazy(() => import("./pages/Terms.tsx"));
const AccountSettings = lazy(() => import("./pages/AccountSettings.tsx"));
const PregnancyToolkit = lazy(() => import("./pages/PregnancyToolkit.tsx"));
const PregnancyToolkitBirthPlan = lazy(() => import("./pages/PregnancyToolkitBirthPlan.tsx"));
const PregnancyToolkitHospitalBag = lazy(() => import("./pages/PregnancyToolkitHospitalBag.tsx"));

import ScrollToTop from "./components/layout/ScrollToTop.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import ConsentBanner from "./components/consent/ConsentBanner.tsx";
import RouteTracker from "./components/analytics/RouteTracker.tsx";
import { supabase } from "./integrations/supabase/client.ts";
import { identify, trackEvent } from "./lib/analytics.ts";
import { EVENTS } from "./lib/analyticsEvents.ts";
import AppErrorBoundary from "./components/shared/AppErrorBoundary.tsx";


const queryClient = new QueryClient();

// Query-preserving redirect from the duplicate TTC ovulation calculator
// mount to the canonical /ovulation-calculator route.
const RedirectToOvulationCalculator = () => {
  const { search } = useLocation();
  return <Navigate to={`/ovulation-calculator${search}`} replace />;
};

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
  <AppErrorBoundary>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <RouteTracker />
        <AnalyticsIdentityBridge />
        <ConsentBanner />
        <Suspense fallback={<PageLoadState message="Loading page…" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          
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
          <Route path="/articles/signs-of-ovulation" element={<Navigate to="/articles/ovulation-signs" replace />} />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route path="/due-date-calculator" element={<DueDateCalculator />} />
          <Route path="/due-date-results" element={<DueDateResults />} />
          <Route path="/trying-to-conceive" element={<TTCHub />} />
          <Route path="/trying-to-conceive/legacy" element={<TTC />} />
          <Route path="/ovulation-calculator" element={<OvulationCalculator />} />
          {/* Duplicate mount redirects to canonical /ovulation-calculator, preserving query string. */}
          <Route path="/trying-to-conceive/ovulation-calculator" element={<RedirectToOvulationCalculator />} />
          <Route path="/trying-to-conceive/ovulation" element={<TTCOvulation />} />
          <Route path="/trying-to-conceive/preconception-health" element={<TTCPreconceptionHealth />} />
          <Route path="/trying-to-conceive/fertility" element={<TTCFertility />} />
          <Route path="/trying-to-conceive/ivf-and-treatment" element={<TTCIVFAndTreatment />} />
          <Route path="/trying-to-conceive/male-fertility" element={<TTCMaleFertility />} />
          <Route path="/trying-to-conceive/age-and-fertility" element={<TTCAgeAndFertility />} />
          <Route path="/trying-to-conceive/cycle-tracking" element={<TTCCycleTracking />} />
          <Route path="/trying-to-conceive/pregnancy-tests" element={<TTCPregnancyTests />} />
          <Route path="/trying-to-conceive/two-week-wait" element={<TTCTwoWeekWait />} />
          <Route path="/trying-to-conceive/conditions" element={<TTCConditions />} />
          <Route path="/ivf" element={<IVF />} />
          <Route path="/ivf/before-transfer" element={<IVFBeforeTransfer />} />
          <Route path="/ivf/after-transfer" element={<IVFAfterTransfer />} />
          <Route path="/ivf/early-pregnancy" element={<IVFEarlyPregnancy />} />
          <Route path="/ivf-timeline" element={<IVFTimeline />} />
          {/* Step 1 redirect: Postpartum now lives inside First Year as the Recovery track. */}
          <Route path="/postpartum" element={<Navigate to="/first-year#recovery-topics" replace />} />
          {/* Legacy Postpartum hub preserved for reuse during the First Year rebuild. */}
          <Route path="/postpartum/legacy" element={<Postpartum />} />
          {/* Orphaned postpartum stage URLs redirect into the First Year hub (Phase 9.10). */}
          <Route path="/postpartum/early-days" element={<Navigate to="/first-year/postpartum-recovery/healing-after-birth" replace />} />
          <Route path="/postpartum/early-weeks" element={<Navigate to="/first-year/postpartum-recovery/what-recovery-can-feel-like" replace />} />
          <Route path="/postpartum/ongoing-adjustment" element={<Navigate to="/first-year/emotional-wellbeing/feeling-like-yourself-again" replace />} />
          <Route path="/first-year" element={<FirstYear />} />
          {/* First Year phase bridge pages — must sit above /:journey/:stage */}
          <Route path="/first-year/0-3-months" element={<FYPhaseZeroToThree />} />
          <Route path="/first-year/3-6-months" element={<FYPhaseThreeToSix />} />
          <Route path="/first-year/6-9-months" element={<FYPhaseSixToNine />} />
          <Route path="/first-year/9-12-months" element={<FYPhaseNineToTwelve />} />
          {/* First Year month guide pages (Phase 11.8a). Must sit above /:topic/:slug. */}
          <Route path="/first-year/newborn" element={<FYMonthPage slug="newborn" />} />
          <Route path="/first-year/1-month" element={<FYMonthPage slug="1-month" />} />
          <Route path="/first-year/2-months" element={<FYMonthPage slug="2-months" />} />
          <Route path="/first-year/3-months" element={<FYMonthPage slug="3-months" />} />
          <Route path="/first-year/4-months" element={<FYMonthPage slug="4-months" />} />
          <Route path="/first-year/5-months" element={<FYMonthPage slug="5-months" />} />
          <Route path="/first-year/6-months" element={<FYMonthPage slug="6-months" />} />
          <Route path="/first-year/7-months" element={<FYMonthPage slug="7-months" />} />
          <Route path="/first-year/8-months" element={<FYMonthPage slug="8-months" />} />
          <Route path="/first-year/9-months" element={<FYMonthPage slug="9-months" />} />
          <Route path="/first-year/10-months" element={<FYMonthPage slug="10-months" />} />
          <Route path="/first-year/11-months" element={<FYMonthPage slug="11-months" />} />
          <Route path="/first-year/12-months" element={<FYMonthPage slug="12-months" />} />
          {/* First Year topic landing pages (Step 3). One reusable template,
              eight thin wrappers, four per side. Must sit above the generic
              /:journey/:stage route and the catch-all. */}
          <Route path="/first-year/feeding" element={<FYFeeding />} />
          <Route path="/first-year/sleep" element={<FYSleep />} />
          <Route path="/first-year/development" element={<FYDevelopment />} />
          <Route path="/first-year/care-and-safety" element={<FYCareAndSafety />} />
          <Route path="/first-year/postpartum-recovery" element={<FYPostpartumRecovery />} />
          <Route path="/first-year/emotional-wellbeing" element={<FYEmotionalWellbeing />} />
          <Route path="/first-year/body-and-hormones" element={<FYBodyAndHormones />} />
          <Route path="/first-year/checkups-and-warning-signs" element={<FYCheckupsAndWarningSigns />} />
          {/* Toddler hub foundation — sits above /:journey/:stage and catch-all. */}
          <Route path="/toddler" element={<Toddler />} />
          {/* Toddler subtopic gateway pages (Phase 2). One reusable template,
              eight thin wrappers. Must sit above /:journey/:stage and catch-all. */}
          <Route path="/toddler/development-milestones" element={<ToddlerDevelopmentMilestones />} />
          <Route path="/toddler/behaviour-emotions" element={<ToddlerBehaviourEmotions />} />
          <Route path="/toddler/speech-language" element={<ToddlerSpeechLanguage />} />
          <Route path="/toddler/sleep" element={<ToddlerSleep />} />
          <Route path="/toddler/food-feeding" element={<ToddlerFoodFeeding />} />
          <Route path="/toddler/potty-learning" element={<ToddlerPottyLearning />} />
          <Route path="/toddler/health-safety" element={<ToddlerHealthSafety />} />
          <Route path="/toddler/play-connection" element={<ToddlerPlayConnection />} />
          {/* Toddler age guide pages (Phase 3). Must sit above /:journey/:stage and catch-all. */}
          <Route path="/toddler/12-17-months" element={<ToddlerAge12to17 />} />
          <Route path="/toddler/18-23-months" element={<ToddlerAge18to23 />} />
          <Route path="/toddler/2-years" element={<ToddlerAge2y />} />
          <Route path="/toddler/30-months" element={<ToddlerAge30m />} />
          <Route path="/toddler/3-years" element={<ToddlerAge3y />} />
          {/* Family hub — lifecycle stage after Toddler. Must sit above /:journey/:stage and catch-all. */}
          <Route path="/family" element={<Family />} />
          {/* Family subtopic gateway pages. Must sit above /:journey/:stage and catch-all. */}
          <Route path="/family/growing-families" element={<FamilyGrowingFamilies />} />
          <Route path="/family/relationships" element={<FamilyRelationships />} />
          <Route path="/family/family-basics" element={<FamilyBasics />} />
          <Route path="/family/health-safety" element={<FamilyHealthSafety />} />
          <Route path="/family/travel-days-out" element={<FamilyTravelDaysOut />} />
          <Route path="/family/play-connection" element={<FamilyPlayConnection />} />
          <Route path="/family/:topic/:slug" element={<FamilyArticle />} />
          <Route path="/first-year/:topic/:slug" element={<FirstYearArticle />} />
          <Route path="/toddler/:topic/:slug" element={<ToddlerArticle />} />
          <Route path="/preparing-for-baby" element={<PreparingForBaby />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Product />} />
          <Route path="/product" element={<Navigate to="/journal" replace />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/ask" element={<AskPage />} />
          
          <Route path="/my-week" element={<ProtectedRoute><MyWeek /></ProtectedRoute>} />
          <Route path="/my-week/:week" element={<ProtectedRoute><KeptChapter /></ProtectedRoute>} />
          <Route path="/my-journey" element={<ProtectedRoute><MyJourney /></ProtectedRoute>} />
          <Route path="/my-ttc-journey" element={<ProtectedRoute><MyTTCJourney /></ProtectedRoute>} />
          <Route path="/pregnancy-toolkit" element={<ProtectedRoute><PregnancyToolkit /></ProtectedRoute>} />
          <Route path="/pregnancy-toolkit/birth-plan" element={<ProtectedRoute><PregnancyToolkitBirthPlan /></ProtectedRoute>} />
          <Route path="/pregnancy-toolkit/hospital-bag" element={<ProtectedRoute><PregnancyToolkitHospitalBag /></ProtectedRoute>} />

          <Route path="/account" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/setup/trying-to-conceive" element={<SetupTTC />} />
          <Route path="/:journey/:stage" element={<StagePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </AppErrorBoundary>
);

export default App;
