/**
 * Single source of truth for journey status copy.
 * British English. No dashes. No forbidden phrases.
 * Never introduce: normal, safe, unsafe, don't worry, everything is okay,
 * your baby is fine, move on, try again, at least, forced positivity.
 */

import type { PregnancyJourneyStatus } from "@/lib/savedJourney";

export type ChangeableStatus = Exclude<PregnancyJourneyStatus, "active">;

export const STATUS_OPTIONS: { value: ChangeableStatus; label: string }[] = [
  { value: "given_birth", label: "I've given birth" },
  { value: "paused", label: "Pause pregnancy view" },
  { value: "no_longer_pregnant", label: "I'm no longer pregnant" },
  { value: "pregnancy_loss", label: "I've experienced pregnancy loss" },
];

export const STATUS_CHIP_LABEL: Record<PregnancyJourneyStatus, string> = {
  active: "Active pregnancy",
  given_birth: "Pregnancy complete",
  no_longer_pregnant: "Pregnancy view paused",
  paused: "Pregnancy view paused",
  pregnancy_loss: "Journey paused",
};

export type ConfirmCopy = {
  title: string;
  body: string;
  confirmLabel: string;
  cancelLabel: string;
};

export const CONFIRM_COPY: Record<ChangeableStatus, ConfirmCopy> = {
  given_birth: {
    title: "You've given birth",
    body: "We'll pause your weekly pregnancy view and open your First Year space. Nothing you've saved will be removed.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  },
  paused: {
    title: "Pause pregnancy view",
    body: "We'll stop pregnancy weekly updates. Your saved memories, reflections and toolkit entries stay here. You can resume at any time.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  },
  no_longer_pregnant: {
    title: "Pause pregnancy view",
    body: "We'll stop pregnancy weekly updates. Your saved memories, reflections and toolkit entries stay here for you. You can change this any time.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  },
  pregnancy_loss: {
    // First step uses the ChangeStatusDialog. Second step uses the copy below.
    title: "Take your time.",
    body: "We'll stop showing weekly pregnancy updates, size comparisons and preparation prompts. Your memories, photos and reflections will stay, private to you. You can change or undo this any time in Account Settings.",
    confirmLabel: "Confirm",
    cancelLabel: "Cancel",
  },
};

export const RETURN_TO_ACTIVE_COPY: ConfirmCopy = {
  title: "Return to active pregnancy",
  body: "Weekly pregnancy updates will resume. Nothing else will change.",
  confirmLabel: "Confirm",
  cancelLabel: "Cancel",
};

export const MY_WEEK_PANELS = {
  given_birth: {
    kicker: "Pregnancy complete",
    title: "Your pregnancy view is complete.",
    body: "Everything you've saved is still here. Your First Year space is ready when you are.",
  },
  paused: {
    kicker: "Pregnancy view paused",
    title: "Your pregnancy view is paused.",
    body: "Your saved memories, reflections and toolkit are still here. You can resume any time.",
  },
  no_longer_pregnant: {
    kicker: "Pregnancy view paused",
    title: "Your pregnancy view is paused.",
    body: "Your saved memories, reflections and toolkit are still here for you. You can change this any time.",
  },
  pregnancy_loss: {
    kicker: "Your journey",
    title: "Your space, on your terms.",
    body: "We've stopped pregnancy updates. Your saved things are still here whenever you want them.",
  },
} as const;

export const TOOLKIT_NOTES = {
  given_birth: "Pregnancy complete. Your toolkit is here for reference.",
  paused: "Pregnancy view paused. Your toolkit is here when you need it.",
  no_longer_pregnant: "Pregnancy view paused. Your toolkit is here when you need it.",
  pregnancy_loss:
    "Your journey view is paused. Your toolkit entries are kept, hidden by default. You can reveal them any time.",
} as const;

export const GENERIC_ERROR = "Couldn't update your status. Please try again.";
export const GENERIC_SUCCESS = "Journey status updated.";

/** Shared quiet link pointing to /journey-support. */
export const JOURNEY_SUPPORT_LINK_LABEL = "Something gentle to lean on";
export const JOURNEY_SUPPORT_HREF = "/journey-support";
