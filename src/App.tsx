import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Explore from "./pages/Explore.tsx";
import Pregnancy from "./pages/Pregnancy.tsx";
import FirstTrimester from "./pages/trimester/FirstTrimester.tsx";
import SecondTrimester from "./pages/trimester/SecondTrimester.tsx";
import ThirdTrimester from "./pages/trimester/ThirdTrimester.tsx";
import WeekPage from "./pages/WeekPage.tsx";
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


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      <BrowserRouter>
        <ScrollToTop />
        <ConsentBanner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/pregnancy" element={<Pregnancy />} />
          <Route path="/pregnancy/first-trimester" element={<FirstTrimester />} />
          <Route path="/pregnancy/second-trimester" element={<SecondTrimester />} />
          <Route path="/pregnancy/third-trimester" element={<ThirdTrimester />} />
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
