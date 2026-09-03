/**
 * AIC-4 — browser access to account-owned conversation history.
 *
 * Every call runs through the ordinary Supabase client, so row-level security
 * is the enforcement boundary: a user id is never supplied by this layer and
 * never accepted from a caller. `user_id` is filled by the database default
 * (`auth.uid()`), and message rows are additionally checked against the owning
 * conversation by RLS and a trigger.
 *
 * The server, not this module, is authoritative for the history that reaches
 * the model. This module only lists, restores and deletes what the person can
 * already see.
 */

import { supabase } from "@/integrations/supabase/client";
import type { CompanionMessage } from "./conversationTypes";

export interface CompanionConversationSummary {
  id: string;
  title: string | null;
  lastMessageAt: string;
}

export const hasConversationSession = async (): Promise<boolean> => {
  try {
    const { data } = await supabase.auth.getSession();
    return !!data.session?.user?.id;
  } catch {
    return false;
  }
};

export const listConversations = async (limit = 20): Promise<CompanionConversationSummary[]> => {
  const { data, error } = await supabase
    .from("companion_conversations")
    .select("id,title,last_message_at")
    .is("archived_at", null)
    .order("last_message_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id,
    title: row.title,
    lastMessageAt: row.last_message_at,
  }));
};

export const loadConversationMessages = async (conversationId: string): Promise<CompanionMessage[]> => {
  const { data, error } = await supabase
    .from("companion_messages")
    .select("id,role,content,created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(200);
  if (error || !data) return [];
  return data
    .filter((row) => row.role === "user" || row.role === "assistant")
    .map((row) => ({
      id: row.id,
      role: row.role as "user" | "assistant",
      content: row.content,
      createdAt: row.created_at,
      status: "complete" as const,
    }));
};

/** Deletes the conversation; messages follow by cascade. */
export const deleteConversation = async (conversationId: string): Promise<boolean> => {
  const { error } = await supabase.from("companion_conversations").delete().eq("id", conversationId);
  return !error;
};
