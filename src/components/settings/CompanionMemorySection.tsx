/**
 * AIC-3 — "What your companion remembers".
 *
 * The single place where everything kept for someone is visible, editable and
 * removable. Nothing here is inferred: every row was either an explicit
 * "remember this" in conversation or added on this page.
 *
 * Hidden entirely unless the client memory flag is on. The server flag
 * (`AI_MEMORY_ENABLED`) separately decides whether anything kept can reach the
 * companion, so someone can see and delete their memories even when the
 * companion is not using them.
 */

import { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { toast } from "@/hooks/use-toast";
import {
  evaluateMemoryCandidate,
  findExactMemory,
  MEMORY_ROW_CAP,
  MEMORY_VALUE_MAX_LENGTH,
  type CompanionMemory,
} from "@/lib/companion/memory/companionMemoryPolicy";
import {
  CompanionMemoryError,
  createMemory,
  deleteMemory,
  listMemories,
  updateMemory,
} from "@/lib/companion/memory/companionMemoryRepository";
import { isCompanionMemoryUiEnabled } from "@/lib/companion/memory/memoryFlags";

const CATEGORY_LABELS: Record<string, string> = {
  preference: "Preference",
  personal_detail: "About you",
  plan: "Plan",
  relationship: "People",
  support_preference: "Support",
  other: "Other",
};

export default function CompanionMemorySection() {
  const [memories, setMemories] = useState<CompanionMemory[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [newValue, setNewValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<CompanionMemory | null>(null);

  const enabled = isCompanionMemoryUiEnabled();

  const load = useCallback(async () => {
    try {
      setLoadError(false);
      setMemories(await listMemories());
    } catch {
      setLoadError(true);
      setMemories([]);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    void load();
  }, [enabled, load]);

  if (!enabled) return null;

  const fail = (error: unknown) =>
    toast({
      title:
        error instanceof CompanionMemoryError
          ? error.message
          : "That could not be saved. Please try again.",
      variant: "destructive",
    });

  const save = async (value: string, id: string | null) => {
    const verdict = evaluateMemoryCandidate(value);
    if (verdict.ok === false) {
      toast({ title: verdict.message, variant: "destructive" });
      return false;
    }
    const others = (memories ?? []).filter((memory) => memory.id !== id);
    if (findExactMemory(others, verdict.value)) {
      toast({ title: "Your companion already remembers that." });
      return false;
    }
    if (!id && others.length >= MEMORY_ROW_CAP) {
      toast({
        title: "Please remove something first",
        description: `Your companion keeps up to ${MEMORY_ROW_CAP} things.`,
        variant: "destructive",
      });
      return false;
    }
    setBusy(true);
    try {
      if (id) {
        await updateMemory(id, { value: verdict.value, category: verdict.category });
      } else {
        // Added deliberately on this page, so the source is "settings".
        await createMemory({ value: verdict.value, category: verdict.category, source: "settings" });
      }
      await load();
      return true;
    } catch (error) {
      fail(error);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    setBusy(true);
    try {
      await deleteMemory(pendingDelete.id);
      await load();
      toast({ title: "Removed" });
    } catch {
      toast({ title: "That could not be removed. Please try again.", variant: "destructive" });
    } finally {
      setBusy(false);
      setPendingDelete(null);
    }
  };

  return (
    <section className="rounded-2xl border border-border/50 bg-card p-6">
      <h2 className="mb-2 font-serif text-xl">What your companion remembers</h2>
      <p className="mb-5 text-sm text-muted-foreground">
        Only things you have asked your companion to remember, or added here. Nothing you say is
        kept automatically, and you can change or remove anything at any time. Please do not add
        passwords, codes or health details.
      </p>

      {memories === null ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : loadError ? (
        <p className="text-sm text-muted-foreground">
          These could not be loaded just now.{" "}
          <button type="button" className="underline" onClick={() => void load()}>
            Try again
          </button>
        </p>
      ) : memories.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Your companion is not remembering anything yet.
        </p>
      ) : (
        <ul className="mb-5 space-y-3">
          {memories.map((memory) => (
            <li key={memory.id} className="rounded-xl border border-border/50 p-4">
              {editingId === memory.id ? (
                <div className="space-y-3">
                  <label className="sr-only" htmlFor={`memory-${memory.id}`}>
                    Edit what your companion remembers
                  </label>
                  <textarea
                    id={`memory-${memory.id}`}
                    value={draft}
                    maxLength={MEMORY_VALUE_MAX_LENGTH}
                    onChange={(event) => setDraft(event.target.value)}
                    className="min-h-[80px] w-full rounded-xl border border-border bg-background p-3 text-sm"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={async () => {
                        if (await save(draft, memory.id)) setEditingId(null);
                      }}
                      className="rounded-pill border border-border px-4 py-2 text-sm disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded-pill px-4 py-2 text-sm text-muted-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm">{memory.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {CATEGORY_LABELS[memory.category] ?? "Other"}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      aria-label="Edit this memory"
                      onClick={() => {
                        setEditingId(memory.id);
                        setDraft(memory.value);
                      }}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
                    >
                      <Pencil size={16} aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      aria-label="Remove this memory"
                      onClick={() => setPendingDelete(memory)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="space-y-3 border-t border-border/50 pt-5">
        <label className="block text-sm" htmlFor="new-memory">
          Add something for your companion to remember
        </label>
        <textarea
          id="new-memory"
          value={newValue}
          maxLength={MEMORY_VALUE_MAX_LENGTH}
          onChange={(event) => setNewValue(event.target.value)}
          placeholder="For example: I prefer short, plain answers"
          className="min-h-[72px] w-full rounded-xl border border-border bg-background p-3 text-sm"
        />
        <button
          type="button"
          disabled={busy || !newValue.trim()}
          onClick={async () => {
            if (await save(newValue, null)) setNewValue("");
          }}
          className="rounded-pill border border-border px-5 py-2.5 text-sm disabled:opacity-50"
        >
          Add
        </button>
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => !open && setPendingDelete(null)}
        title="Remove this memory?"
        description="Your companion will no longer know this. You can always tell it again."
        confirmLabel="Remove"
        onConfirm={() => void confirmDelete()}
      />
    </section>
  );
}
