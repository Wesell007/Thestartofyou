/**
 * Phase 29I — static chrome for the memory settings prototype.
 *
 * Deliberately not `MyWeekHeader`: that header runs `useLifecycle`, reads the
 * saved journey and calls Supabase sign-out. This chrome does none of that. It
 * has no auth check, no Supabase client import, no user data and no network
 * work of any kind. It exists purely so the prototype sits in familiar
 * furniture while it is reviewed.
 */

import logoSrc from "@/assets/logo-dark.png";
import { PROTOTYPE_NOTICE } from "./memoryPrototypeData";

export const PrototypeHeader = () => (
  <header className="sticky top-0 z-30 border-b border-[hsl(var(--stage-ttc-edge)/0.7)] bg-[hsl(var(--stage-ttc-cream)/0.92)] backdrop-blur-md">
    <div className="mx-auto flex h-16 w-full max-w-[880px] items-center justify-between gap-3 px-5 sm:px-8">
      <img src={logoSrc} alt="The Start of You" className="h-auto w-[110px] sm:w-[120px]" />
      <span className="inline-flex min-h-7 items-center rounded-pill border border-[hsl(var(--stage-ttc-olive-soft)/0.5)] bg-[hsl(var(--stage-ttc-sage-tint))] px-3 font-sans text-[12.5px] font-normal text-[hsl(var(--stage-ttc-olive))]">
        {PROTOTYPE_NOTICE}
      </span>
    </div>
  </header>
);

export const PrototypeFooter = () => (
  <footer className="border-t border-[hsl(var(--stage-ttc-edge)/0.7)] py-10">
    <div className="mx-auto w-full max-w-[880px] px-5 sm:px-8">
      <p className="font-sans text-[14px] font-light leading-[1.7] text-[hsl(var(--stage-ttc-text-soft))]">
        This is a design prototype for review. Nothing on this page is saved, and your companion
        does not use anything shown here.
      </p>
    </div>
  </footer>
);
