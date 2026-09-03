/**
 * AIC-3 — one shared memory interaction path for both companion surfaces.
 *
 * The site-wide panel and the full `/ask` page use this hook rather than each
 * parsing messages themselves: one memory system, multiple surfaces.
 *
 * Guarantees enforced here:
 * - ordinary conversation produces no candidate and no write
 * - an explicit command produces a candidate in React state only
 * - exactly one write happens on confirm, none on cancel
 * - the model never writes, and never sees a rejected credential command
 * - anonymous people get an explanation and no storage of any kind
 */

import { useCallback, useRef, useState } from "react";
import {
  CompanionMemoryError,
  createMemory,
  deleteMemory,
  hasMemorySession,
  listMemories,
  updateMemory,
} from "./companionMemoryRepository";
import {
  evaluateMemoryCandidate,
  findExactMemory,
  resolveForgetTarget,
  resolveReplacementTarget,
  type CompanionMemory,
  type MemoryCategory,
} from "./companionMemoryPolicy";
import { isCompanionMemoryUiEnabled } from "./memoryFlags";
import { resolveMemoryCommand } from "./memoryIntent";

export type MemoryInteractionState =
  | { kind: "idle" }
  | { kind: "pending_save"; value: string; category: MemoryCategory; replaces: CompanionMemory | null }
  | { kind: "pending_forget"; target: CompanionMemory }
  | { kind: "message"; tone: "info" | "error" | "success"; text: string };

const SIGN_IN_MESSAGE =
  "Your companion can only remember things once you have an account. You can still talk about anything here for now.";

const AMBIGUOUS_FORGET_MESSAGE =
  "I am not sure which one to remove. You can see and remove anything kept for you under \u201cWhat your companion remembers\u201d in your account settings.";

const AMBIGUOUS_REPLACE_MESSAGE =
  "I would rather not guess which one that replaces. You can edit it under \u201cWhat your companion remembers\u201d in your account settings, or tell me the exact words to remove.";

export function useCompanionMemoryInteraction() {
  const [state, setState] = useState<MemoryInteractionState>({ kind: "idle" });
  const [busy, setBusy] = useState(false);
  // The single deterministic target a bare "forget that" may act on.
  const lastSavedRef = useRef<CompanionMemory | null>(null);

  const dismiss = useCallback(() => setState({ kind: "idle" }), []);

  const message = useCallback(
    (tone: "info" | "error" | "success", text: string) => setState({ kind: "message", tone, text }),
    [],
  );

  /**
   * Returns true when the message was an explicit memory command and has been
   * handled here, so the surface must not send it to the model.
   */
  const interceptQuery = useCallback(
    async (query: string): Promise<boolean> => {
      const command = resolveMemoryCommand(query);
      if (!command) return false;

      // A credential is refused whatever the feature flag says, and is never
      // forwarded to the model just because storage was declined.
      if (command.kind === "remember" || command.kind === "replace") {
        const candidateText = command.kind === "remember" ? command.value : command.newValue;
        const verdict = evaluateMemoryCandidate(candidateText);
        if (verdict.ok === false && verdict.reason === "secret") {
          message("error", verdict.message);
          return true;
        }
      }

      if (!isCompanionMemoryUiEnabled()) return false;

      if (!(await hasMemorySession())) {
        message("info", SIGN_IN_MESSAGE);
        return true;
      }

      if (command.kind === "remember") {
        const verdict = evaluateMemoryCandidate(command.value);
        if (verdict.ok === false) {
          message("error", verdict.message);
          return true;
        }
        try {
          const existing = await listMemories();
          if (findExactMemory(existing, verdict.value)) {
            message("info", "Your companion already remembers that.");
            return true;
          }
        } catch {
          // A read problem must not block the confirmation step; the database
          // still refuses an exact duplicate.
        }
        setState({
          kind: "pending_save",
          value: verdict.value,
          category: verdict.category,
          replaces: null,
        });
        return true;
      }

      if (command.kind === "replace") {
        const verdict = evaluateMemoryCandidate(command.newValue);
        if (verdict.ok === false) {
          message("error", verdict.message);
          return true;
        }
        let existing: CompanionMemory[] = [];
        try {
          existing = await listMemories();
        } catch {
          message("error", "Your memories could not be loaded. Please try again.");
          return true;
        }
        const target = resolveReplacementTarget(existing, command.oldValue);
        if (target.ok === false) {
          message("info", AMBIGUOUS_REPLACE_MESSAGE);
          return true;
        }
        setState({
          kind: "pending_save",
          value: verdict.value,
          category: verdict.category,
          replaces: target.target,
        });
        return true;
      }

      // forget
      let existing: CompanionMemory[] = [];
      try {
        existing = await listMemories();
      } catch {
        message("error", "Your memories could not be loaded. Please try again.");
        return true;
      }
      const resolved = resolveForgetTarget(existing, command.reference, lastSavedRef.current);
      if (resolved.ok === false) {
        message(
          "info",
          resolved.reason === "not_found"
            ? "I could not find that among the things kept for you. You can check them under \u201cWhat your companion remembers\u201d in your account settings."
            : AMBIGUOUS_FORGET_MESSAGE,
        );
        return true;
      }
      setState({ kind: "pending_forget", target: resolved.target });
      return true;
    },
    [message],
  );

  const confirm = useCallback(async () => {
    if (busy) return;
    if (state.kind === "pending_save") {
      setBusy(true);
      try {
        const saved = state.replaces
          ? await updateMemory(state.replaces.id, { value: state.value, category: state.category })
          : await createMemory({
              value: state.value,
              category: state.category,
              source: "explicit_command",
            });
        lastSavedRef.current = saved;
        message("success", "Kept. You can change or remove this any time in your account settings.");
      } catch (error) {
        message(
          "error",
          error instanceof CompanionMemoryError
            ? error.message
            : "That could not be saved. Please try again.",
        );
      } finally {
        setBusy(false);
      }
      return;
    }

    if (state.kind === "pending_forget") {
      setBusy(true);
      try {
        await deleteMemory(state.target.id);
        if (lastSavedRef.current?.id === state.target.id) lastSavedRef.current = null;
        message("success", "Forgotten. That is no longer kept for you.");
      } catch {
        message("error", "That could not be removed. Please try again.");
      } finally {
        setBusy(false);
      }
    }
  }, [busy, message, state]);

  const cancel = useCallback(() => {
    // Declined candidates are never stored anywhere.
    setState({ kind: "idle" });
  }, []);

  return { state, busy, interceptQuery, confirm, cancel, dismiss };
}
