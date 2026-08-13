import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Scroll to the top on new navigation only.
 *
 * On POP (browser back or forward) the position is left alone so the browser's
 * own scroll restoration can return the reader to where they were, for example
 * after tapping into a support card and pressing back.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === "POP") return;
    window.scrollTo(0, 0);
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
