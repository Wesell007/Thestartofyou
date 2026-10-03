/**
 * Phase 29B — companion composer.
 *
 * Textarea plus send, with Stop while a request is streaming. The hook's
 * abort support makes Stop possible with no backend change.
 */

import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Send, Square } from "lucide-react";
import { useCompanion } from "./useCompanion";
import { companionStyles } from "./companionStyles";

export default function CompanionComposer() {
  const { send, stop, isLoading } = useCompanion();
  const [value, setValue] = useState("");

  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    send(trimmed);
    setValue("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return (
    <form onSubmit={submit} className="flex items-end gap-2">
      <label htmlFor="companion-question" className="sr-only">
        Ask a question
      </label>
      <textarea
        id="companion-question"
        rows={1}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={onKeyDown}
        disabled={isLoading}
        placeholder="Ask about this page…"
        className={companionStyles.textarea}
      />
      {isLoading ? (
        <button type="button" onClick={stop} aria-label="Stop generating" className={companionStyles.sendButton}>
          <Square className="h-4 w-4" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="submit"
          aria-label="Send question"
          disabled={!value.trim()}
          className={companionStyles.sendButton}
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </form>
  );
}
