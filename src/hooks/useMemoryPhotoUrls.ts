import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { signMemoryPhotoUrl } from "@/lib/firstYearMemories";

/**
 * Short-lived signed URLs for kept memory photos, keyed by stored path.
 *
 * Signing is deliberately quiet about paths that are expected to be gone:
 * empty paths, paths no longer in the current memories list, stale responses
 * for a path that has since been replaced or removed, and objects that storage
 * reports as missing. Each path is attempted once per mount, so a missing
 * object can never turn into a console loop. Genuine, unexpected storage
 * errors are still reported once through the existing error-handling pattern.
 */
export const useMemoryPhotoUrls = (paths: (string | null | undefined)[]) => {
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  /** Paths we have already tried, so we never retry in a loop. */
  const attempted = useRef<Set<string>>(new Set());

  const currentPaths = useMemo(
    () => Array.from(new Set(paths.filter((path): path is string => Boolean(path && path.trim())))),
    [paths],
  );
  const key = currentPaths.join("|");

  /** Forget a path immediately, so a removed photo is never signed again. */
  const forgetPhotoPath = useCallback((path: string | null | undefined) => {
    if (!path) return;
    attempted.current.delete(path);
    setPhotoUrls((current) => {
      if (!(path in current)) return current;
      const next = { ...current };
      delete next[path];
      return next;
    });
  }, []);

  // Drop anything no longer on screen: a stale URL is worse than none.
  useEffect(() => {
    const live = new Set(currentPaths);
    setPhotoUrls((current) => {
      const stale = Object.keys(current).filter((path) => !live.has(path));
      if (stale.length === 0) return current;
      const next = { ...current };
      stale.forEach((path) => delete next[path]);
      return next;
    });
    Array.from(attempted.current).forEach((path) => {
      if (!live.has(path)) attempted.current.delete(path);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    let cancelled = false;
    const pending = currentPaths.filter((path) => !attempted.current.has(path));
    if (pending.length === 0) return;
    pending.forEach((path) => attempted.current.add(path));

    (async () => {
      const results = await Promise.all(
        pending.map(async (path) => [path, await signMemoryPhotoUrl(path)] as const),
      );
      if (cancelled) return;
      const live = new Set(currentPaths);
      const next: Record<string, string> = {};
      results.forEach(([path, result]) => {
        // A late answer for a path that has since gone is simply dropped.
        if (!live.has(path)) return;
        if (result.url) next[path] = result.url;
      });
      if (Object.keys(next).length > 0) {
        setPhotoUrls((current) => ({ ...current, ...next }));
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return { photoUrls, forgetPhotoPath };
};

export default useMemoryPhotoUrls;
