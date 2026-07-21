import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      <main>
        <section className="relative bg-parchment pt-32 pb-28 md:pt-40 md:pb-36 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] glow-sage" />
          <div className="container mx-auto px-6 md:px-10 max-w-2xl text-center relative z-10">
            <div className="editorial-rule mb-8" />
            <p className="stage-label mb-5">Page Not Found</p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-foreground mb-6 animate-fade-up">
              404
            </h1>
            <p className="font-sans text-base font-light text-muted-foreground leading-relaxed max-w-md mx-auto mb-12 animate-fade-up [animation-delay:0.1s]">
              This page doesn't exist, but your journey does. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up [animation-delay:0.2s]">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-terracotta text-terracotta-foreground rounded-pill px-8 py-4 font-sans text-sm font-medium shadow-cta hover:bg-terracotta-hover transition-all"
              >
                Return home
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/pregnancy"
                className="font-sans text-sm font-light text-muted-foreground hover:text-foreground transition-colors border-b border-border hover:border-foreground pb-0.5"
              >
                Explore pregnancy guidance
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
