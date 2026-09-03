/**
 * AIC-3 — deterministic detection of an explicit memory command.
 *
 * Application logic, never the model, decides whether someone asked the
 * companion to remember or forget something. This is precision-first: a
 * command has to be written plainly at the start of the message. Anything
 * else is ordinary conversation and produces no candidate and no write.
 *
 * Pure module: no Supabase, no React, no AI.
 */

export type MemoryCommand =
  | { kind: "remember"; value: string }
  | { kind: "forget"; reference: string | null }
  | { kind: "replace"; oldValue: string; newValue: string };

/** Polite openers that may precede a command without changing its meaning. */
const LEAD_IN =
  "(?:hi\\s+|hey\\s+|ok(?:ay)?,?\\s+|so\\s+|please\\s+|can you\\s+|could you\\s+|would you\\s+|i'd like you to\\s+|i want you to\\s+|you can\\s+)*";

const REMEMBER_RE = new RegExp(
  `^${LEAD_IN}(?:remember|keep in mind|make a note)\\b(?:\\s+(?:that|this|about))?[:,]?\\s+(.+)$`,
  "i",
);

const FORGET_RE = new RegExp(
  `^${LEAD_IN}(?:forget|delete|remove|stop remembering)\\b(?:\\s+(?:that|this|the memory|about))?[:,]?\\s*(.*)$`,
  "i",
);

const REPLACE_RE = new RegExp(
  `^${LEAD_IN}(?:replace|change|update)\\s+["“']?(.+?)["”']?\\s+(?:with|to)\\s+["“']?(.+?)["”']?[.!]?$`,
  "i",
);

const stripEdges = (value: string): string =>
  value
    .trim()
    .replace(/^["“']+|["”']+$/g, "")
    .replace(/[.!]+$/g, "")
    .trim();

/** Deictic references with no content of their own: "forget that." */
const BARE_REFERENCES = new Set(["", "that", "this", "it", "that one", "the last one", "the last memory"]);

/**
 * Resolve an explicit memory command, or `null` when the message is ordinary
 * conversation. Ambiguity always resolves to `null`, never to a mutation.
 */
export const resolveMemoryCommand = (message: string): MemoryCommand | null => {
  const trimmed = message.trim();
  if (!trimmed) return null;

  const replace = REPLACE_RE.exec(trimmed);
  if (replace) {
    const oldValue = stripEdges(replace[1]);
    const newValue = stripEdges(replace[2]);
    if (oldValue && newValue) return { kind: "replace", oldValue, newValue };
  }

  const forget = FORGET_RE.exec(trimmed);
  if (forget) {
    const reference = stripEdges(forget[1] ?? "");
    return {
      kind: "forget",
      reference: BARE_REFERENCES.has(reference.toLowerCase()) ? null : reference,
    };
  }

  const remember = REMEMBER_RE.exec(trimmed);
  if (remember) {
    const value = stripEdges(remember[1]);
    // "remember" alone is a question about memory, not a command to store.
    if (value.length >= 2) return { kind: "remember", value };
  }

  return null;
};

/** True when the message is an explicit memory command of any kind. */
export const isMemoryCommand = (message: string): boolean =>
  resolveMemoryCommand(message) !== null;
