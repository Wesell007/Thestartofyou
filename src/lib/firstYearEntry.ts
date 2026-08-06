/**
 * Pure resolution for the two First Year entry types.
 *
 *  - Transition: the user came from a pregnancy journey with status
 *    `given_birth`. Their pregnancy chapter is kept, and the copy says so.
 *  - Direct: the user has no journey pointer at all. They start First Year
 *    from the public hub and must never see pregnancy chapter language.
 *
 * Everything here is pure so it can be unit tested without the backend.
 */

export type FirstYearSetupMode = "transition" | "direct";

/** The viewer's state, read from the lifecycle pointer and pregnancy status. */
export type FirstYearEntryState =
  | { kind: "signed_out" }
  | { kind: "no_journey" }
  | { kind: "first_year" }
  | { kind: "ttc" }
  | { kind: "pregnancy"; status: string | null };

export type FirstYearGuardResult =
  | { action: "auth" }
  | { action: "redirect"; to: string }
  | { action: "render"; mode: FirstYearSetupMode };

export const FIRST_YEAR_AUTH_RETURN_TO = "/setup/first-year";

export const firstYearAuthHref = () =>
  `/auth?intent=start_journey&return_to=${encodeURIComponent(FIRST_YEAR_AUTH_RETURN_TO)}`;

/**
 * Guard for /setup/first-year. Only the "no journey pointer" branch opens
 * direct mode. Sensitive pregnancy statuses keep their existing quiet
 * redirect, and TTC users are not offered First Year in this phase.
 */
export const resolveFirstYearSetupGuard = (
  state: FirstYearEntryState,
): FirstYearGuardResult => {
  switch (state.kind) {
    case "signed_out":
      return { action: "auth" };
    case "first_year":
      return { action: "redirect", to: "/my-first-year" };
    case "ttc":
      return { action: "redirect", to: "/my-ttc-journey" };
    case "no_journey":
      return { action: "render", mode: "direct" };
    case "pregnancy": {
      if (state.status === "active") return { action: "redirect", to: "/my-week" };
      if (state.status === "given_birth") return { action: "render", mode: "transition" };
      return { action: "redirect", to: "/my-journey" };
    }
  }
};

export type FirstYearCta = {
  /** False when no start call to action should be shown at all. */
  show: boolean;
  label: string;
  href: string;
  /** Quiet supporting line rendered under the button. */
  note?: string;
  /** Shown instead of a start button in sensitive pregnancy states. */
  quietLink?: { label: string; href: string };
};

/** The public hub call to action, resolved from the viewer's state. */
export const resolveFirstYearCta = (state: FirstYearEntryState): FirstYearCta => {
  switch (state.kind) {
    case "signed_out":
      return { show: true, label: "Start your First Year", href: firstYearAuthHref() };
    case "no_journey":
      return { show: true, label: "Start your First Year", href: "/setup/first-year" };
    case "first_year":
      return { show: true, label: "Open your First Year", href: "/my-first-year" };
    case "ttc":
      return { show: true, label: "Open your journey", href: "/my-ttc-journey" };
    case "pregnancy": {
      if (state.status === "given_birth") {
        return { show: true, label: "Start your First Year", href: "/setup/first-year" };
      }
      if (state.status === "active") {
        return {
          show: true,
          label: "Open your week",
          href: "/my-week",
          note: "Your First Year space opens once your baby arrives.",
        };
      }
      return {
        show: false,
        label: "",
        href: "",
        quietLink: { label: "Open your journey", href: "/my-journey" },
      };
    }
  }
};

export type FirstYearSetupCopy = {
  kicker: string;
  intro: { heading: string; body: string[] };
  companion: { heading: string; body: string };
  review: { heading: string; intro: string; companionNote: string };
  /** Where Cancel and "Not right now" lead. */
  exitHref: string;
};

/** Copy for both setup modes. Direct mode never mentions pregnancy. */
export const FIRST_YEAR_SETUP_COPY: Record<FirstYearSetupMode, FirstYearSetupCopy> = {
  transition: {
    kicker: "A new chapter",
    intro: {
      heading: "Your pregnancy chapter is kept. Your First Year can begin when you are ready.",
      body: [
        "Everything you saved stays exactly where it is. Your weeks, photos, notes and voice memories remain yours to open whenever you want them.",
        "This takes a minute. You can stop at any point and come back later.",
      ],
    },
    companion: {
      heading: "Cindy is still here. Same companion, new chapter.",
      body: "Nothing you have written is shared with her. You choose what she can use, and you can change your mind whenever you like.",
    },
    review: {
      heading: "Ready when you are",
      intro: "Your pregnancy chapter is kept, and everything you saved stays readable.",
      companionNote:
        "Nothing is shared with Cindy yet. Your pregnancy memories stay private until you choose otherwise.",
    },
    exitHref: "/my-week",
  },
  direct: {
    kicker: "First year",
    intro: {
      heading: "Let's set up your First Year space.",
      body: [
        "Add your baby's details so we can shape this around their age. You can add one baby, twins, triplets or four babies.",
        "This takes a minute. You can stop at any point and come back later.",
      ],
    },
    companion: {
      heading: "Cindy is here for your first year.",
      body: "She can answer questions whenever you need her. Nothing you write is shared with her, and you can change your mind whenever you like.",
    },
    review: {
      heading: "Ready when you are",
      intro: "Your First Year space starts from here.",
      companionNote: "Nothing is shared with Cindy. Anything you write stays private to you.",
    },
    exitHref: "/first-year",
  },
};
