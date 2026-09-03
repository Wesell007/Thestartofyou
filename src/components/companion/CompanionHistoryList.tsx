/**
 * AIC-4 — saved conversations.
 *
 * Only rendered when persistent history is enabled and the person is signed
 * in. Anything retained must be visible and removable here, so this list is
 * the counterpart to storing a thread at all. Reads and deletes go through the
 * ordinary client, so row-level security decides what appears.
 */

import { useCallback, useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import {
  deleteConversation,
  listConversations,
  loadConversationMessages,
  type CompanionConversationSummary,
} from "@/lib/companion/conversation/conversationRepository";
import type { CompanionMessage } from "@/lib/companion/conversation/conversationTypes";

interface CompanionHistoryListProps {
  activeConversationId: string | null;
  onRestore: (conversationId: string, messages: CompanionMessage[]) => void;
}

export default function CompanionHistoryList({
  activeConversationId,
  onRestore,
}: CompanionHistoryListProps) {
  const [conversations, setConversations] = useState<CompanionConversationSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const rows = await listConversations();
    setConversations(rows);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    void listConversations().then((rows) => {
      if (!active) return;
      setConversations(rows);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [activeConversationId]);

  const restore = async (id: string) => {
    setBusyId(id);
    const messages = await loadConversationMessages(id);
    setBusyId(null);
    if (messages.length > 0) onRestore(id, messages);
  };

  const remove = async (id: string) => {
    setBusyId(id);
    await deleteConversation(id);
    setBusyId(null);
    await refresh();
  };

  if (loading) {
    return (
      <p className="px-5 py-3 font-sans text-[12.5px] font-light text-muted-foreground">
        Loading your saved conversations…
      </p>
    );
  }

  if (conversations.length === 0) return null;

  return (
    <section aria-label="Saved conversations" className="border-b border-border/40 px-5 py-3">
      <h3 className="font-sans text-[11.5px] font-light uppercase tracking-[0.08em] text-muted-foreground">
        Saved conversations
      </h3>
      <ul className="mt-2 space-y-1">
        {conversations.map((conversation) => (
          <li key={conversation.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void restore(conversation.id)}
              disabled={busyId === conversation.id}
              aria-current={conversation.id === activeConversationId ? "true" : undefined}
              className="min-h-[44px] flex-1 truncate rounded-[12px] px-2 text-left font-sans text-[13.5px] font-light text-foreground/80 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
            >
              {conversation.title ?? "Untitled conversation"}
            </button>
            <button
              type="button"
              onClick={() => void remove(conversation.id)}
              disabled={busyId === conversation.id}
              aria-label={`Delete conversation: ${conversation.title ?? "Untitled conversation"}`}
              className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40"
            >
              {busyId === conversation.id ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
