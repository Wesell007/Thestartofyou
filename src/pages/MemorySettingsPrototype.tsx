/**
 * Phase 29I — Memory settings UI prototype.
 *
 * Front-end prototype only. There is no memory here: no Supabase read or
 * write, no fetch, no localStorage or sessionStorage, no companion connection
 * and nothing passed into an AI request. Every control below changes local
 * React state and nothing else, and the surface is labelled as a prototype
 * throughout. Source of truth for the copy and the boundaries is
 * `docs/ai/memory-design.md` and `docs/ai/memory-schema-rls-design.md`.
 */

import { useState } from "react";
import { Pause, Play, Trash2 } from "lucide-react";
import SeoHead from "@/components/seo/SeoHead";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { toast } from "@/hooks/use-toast";
import { PrototypeFooter, PrototypeHeader } from "@/components/memory-prototype/PrototypeChrome";
import MemoryStatusCard from "@/components/memory-prototype/MemoryStatusCard";
import MemoryLevelCard from "@/components/memory-prototype/MemoryLevelCard";
import MemoryBoundaryCard from "@/components/memory-prototype/MemoryBoundaryCard";
import RememberedItemsPreview from "@/components/memory-prototype/RememberedItemsPreview";
import CompanionRecallPreview, {
  type RecallState,
} from "@/components/memory-prototype/CompanionRecallPreview";
import {
  PROTOTYPE_ITEMS,
  PROTOTYPE_LEVELS,
  PROTOTYPE_NOTICE,
  type PrototypeLevelId,
  type PrototypeMemoryItem,
} from "@/components/memory-prototype/memoryPrototypeData";
import {
  MEMORY_BODY,
  MEMORY_CARD,
  MEMORY_FOCUS_RING,
  MEMORY_HEADING,
  MEMORY_PAGE,
  MEMORY_TAP,
} from "@/components/memory-prototype/memoryPrototypeStyles";

type ToggleableLevel = Exclude<PrototypeLevelId, "sensitive">;

const DEFAULT_LEVELS: Record<ToggleableLevel, boolean> = {
  off: false,
  "basic-preferences": false,
  "journey-context": false,
  "saved-by-me": false,
};

const prototypeToast = (title: string, description: string) =>
  toast({ title: `${title} · ${PROTOTYPE_NOTICE}`, description });

const MemorySettingsPrototype = () => {
  const [levels, setLevels] = useState<Record<ToggleableLevel, boolean>>(DEFAULT_LEVELS);
  const [paused, setPaused] = useState(false);
  const [items, setItems] = useState<PrototypeMemoryItem[]>(PROTOTYPE_ITEMS);
  const [recallState, setRecallState] = useState<RecallState>("off");
  const [confirmingItem, setConfirmingItem] = useState<PrototypeMemoryItem | null>(null);
  const [confirmingAll, setConfirmingAll] = useState(false);

  const anyLevelOn = Object.values(levels).some(Boolean);

  const statusRows = [
    { label: "Memory", value: anyLevelOn ? "On in this prototype" : "Off" },
    { label: "Basic preferences", value: levels["basic-preferences"] ? "On" : "Not enabled" },
    { label: "Journey context", value: levels["journey-context"] ? "On" : "Not enabled" },
    { label: "Saved by me", value: levels["saved-by-me"] ? "On" : "Not enabled" },
    { label: "Journal content", value: "Off" },
    { label: "Sensitive memory", value: "Not available" },
  ];

  return (
    <div className={MEMORY_PAGE}>
      <SeoHead
        title="Memory settings prototype"
        description="Internal front-end prototype of the memory settings surface. Not a live feature."
        canonical="https://thestartofyou.com/prototype/memory-settings"
        noindex
      />

      <PrototypeHeader />

      <main className="mx-auto w-full max-w-[880px] px-5 pb-16 pt-10 sm:px-8 sm:pt-14">
        {/* 1. Header and explanation */}
        <header className="max-w-[620px]">
          <p className="font-sans text-[13px] uppercase tracking-[0.16em] text-[hsl(var(--stage-ttc-olive-soft))]">
            {PROTOTYPE_NOTICE}
          </p>
          <h1 className="mt-3 font-serif text-[30px] leading-tight sm:text-[36px]">
            Memory is off for now
          </h1>
          <p className={`${MEMORY_BODY} mt-4`}>
            Your companion will not keep new details from your conversations unless you choose to
            save something in a future version. This page is a design prototype so we can review how
            those controls would look and read. Nothing here is stored, and none of it reaches your
            companion.
          </p>
        </header>

        <div className="mt-10 space-y-8 sm:mt-12 sm:space-y-10">
          {/* 2. Memory status */}
          <MemoryStatusCard rows={statusRows} />

          {/* 3. Permission levels */}
          <section aria-labelledby="levels-heading">
            <h2 id="levels-heading" className={MEMORY_HEADING}>
              What you could choose
            </h2>
            <p className={`${MEMORY_BODY} mt-2`}>
              Each choice would be separate, and each one could be turned off again on its own.
            </p>
            <ul className="mt-5 space-y-4">
              {PROTOTYPE_LEVELS.map((level) =>
                level.available ? (
                  <MemoryLevelCard
                    key={level.id}
                    level={level}
                    checked={levels[level.id as ToggleableLevel]}
                    onCheckedChange={(next) =>
                      setLevels((prev) => ({ ...prev, [level.id as ToggleableLevel]: next }))
                    }
                  />
                ) : (
                  <MemoryLevelCard key={level.id} level={level} />
                ),
              )}
            </ul>
          </section>

          {/* 4. Remembered items preview */}
          <RememberedItemsPreview
            items={items}
            onEdit={(item) =>
              prototypeToast("Editing is not built yet", `You would be able to reword "${item.label}".`)
            }
            onReview={(item) =>
              prototypeToast(
                "Review is not built yet",
                `You would be asked whether "${item.label}" is still right.`,
              )
            }
            onDelete={(item) => setConfirmingItem(item)}
          />

          {/* 5. Pause and delete controls */}
          <section className={MEMORY_CARD} aria-labelledby="controls-heading">
            <h2 id="controls-heading" className={MEMORY_HEADING}>
              Pausing and clearing
            </h2>
            <p className={`${MEMORY_BODY} mt-2`}>
              Pausing would stop your companion adding anything new and stop it using what it
              already has, without clearing the list. Deleting would remove an item from anything
              your companion sees from that point on. Clearing everything is a separate choice from
              switching memory off.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                aria-pressed={paused}
                onClick={() => setPaused((prev) => !prev)}
                className={`${MEMORY_TAP} border border-[hsl(var(--stage-ttc-edge))] text-[hsl(var(--stage-ttc-text))] hover:bg-[hsl(var(--stage-ttc-sage-tint))] ${MEMORY_FOCUS_RING}`}
              >
                {paused ? (
                  <>
                    <Play size={14} aria-hidden="true" /> Resume memory
                  </>
                ) : (
                  <>
                    <Pause size={14} aria-hidden="true" /> Pause memory
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setConfirmingAll(true)}
                className={`${MEMORY_TAP} border border-[hsl(var(--stage-ttc-rose)/0.4)] bg-[hsl(var(--stage-ttc-blush))] text-[hsl(var(--stage-ttc-rose))] hover:bg-[hsl(var(--stage-ttc-blush)/0.7)] ${MEMORY_FOCUS_RING}`}
              >
                <Trash2 size={14} aria-hidden="true" /> Delete all memory
              </button>
            </div>
            <p className={`${MEMORY_BODY} mt-4`}>
              {paused
                ? "Paused in this prototype. Nothing has actually changed."
                : "Not paused in this prototype."}
            </p>
          </section>

          {/* 6. Journal content boundary */}
          <MemoryBoundaryCard id="journal-boundary" title="Journal entries stay separate" status="Not used">
            <p>
              Journal entries, reflections, photos, videos and voice notes are not used for
              companion memory. They stay in your journal, where only you can see them. There is no
              switch for this here, and this prototype does not offer a way to turn it on.
            </p>
          </MemoryBoundaryCard>

          {/* 7. Sensitive information boundary */}
          <MemoryBoundaryCard
            id="sensitive-boundary"
            title="Some information is not available for memory"
            status="Not available"
          >
            <p>
              Health, fertility and safety-sensitive information is not available for memory in this
              version. Your companion does not keep details about treatment, medication, loss or how
              you are coping, even if they come up in a conversation. There is nothing to switch on
              here.
            </p>
          </MemoryBoundaryCard>

          {/* 8. What does my companion remember? */}
          <CompanionRecallPreview
            state={recallState}
            onStateChange={setRecallState}
            items={items}
          />
        </div>
      </main>

      <PrototypeFooter />

      <ConfirmDialog
        open={confirmingItem !== null}
        onOpenChange={(open) => {
          if (!open) setConfirmingItem(null);
        }}
        title="Remove this item?"
        description={`Prototype only. In a future version, "${confirmingItem?.label ?? ""}" would be removed from anything your companion sees from that point on. Nothing is stored here, so nothing real is removed.`}
        confirmLabel="Remove item"
        onConfirm={() => {
          setItems((prev) => prev.filter((entry) => entry.id !== confirmingItem?.id));
          setConfirmingItem(null);
        }}
      />

      <ConfirmDialog
        open={confirmingAll}
        onOpenChange={setConfirmingAll}
        title="Clear everything your companion has kept?"
        description="Prototype only. In a future version this would clear every remembered item, while your journal, your journeys and your account stayed exactly as they are. This is separate from switching memory off."
        confirmLabel="Clear everything"
        onConfirm={() => {
          setItems([]);
          setConfirmingAll(false);
        }}
      />
    </div>
  );
};

export default MemorySettingsPrototype;
