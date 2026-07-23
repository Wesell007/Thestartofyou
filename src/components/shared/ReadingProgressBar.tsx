import { useEffect, useState } from "react";

interface Props {
  /** CSS variable name for the fill colour, e.g. "--stage-pregnancy-accent". */
  colorVar?: string;
}

/**
 * Thin scroll-progress indicator pinned above the fixed navbar on long-form
 * reading pages. Purely decorative, so it is hidden from assistive tech.
 */
const ReadingProgressBar = ({ colorVar = "--sage" }: Props) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none" aria-hidden="true">
      <div
        className="h-full origin-left transition-transform duration-100 ease-out"
        style={{
          background: `hsl(var(${colorVar}))`,
          transform: `scaleX(${progress})`,
        }}
      />
    </div>
  );
};

export default ReadingProgressBar;
