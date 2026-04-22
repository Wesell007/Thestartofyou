// ─── /my-week curated content ──────────────────────────────────────────────
// Real, emotionally intelligent copy for the canonical saved pregnancy
// experience. Distinct from weekData.ts (which powers the public guidance
// hub).
//
// Coverage (this pass):
//   - Every week 1–42 has a hand-written WeekIdentity
//     (chapterTitle, theme, developmentCue, babyNote).
//   - Slot 1 (matters) and Slot 2 (focus) still use stage-based defaults
//     for the weeks not yet hand-curated. Tracked openly.

export interface MyWeekEntry {
  /** Editorial italic lead at the top of Slot 1. One sentence. */
  lead: string;
  /** Three points for Slot 1 — mini-headline + supporting sentence. */
  matters: { title: string; body: string }[];
  /** Slot 2 — single grounding focus. Not an instruction. */
  focus: { headline: string; body: string };
  /** Slot 3 — reflection prompt + quiet context line. */
  reflection: { prompt: string; context: string };
  /** Slot 4 — a soft forward sentence. */
  nextPreview: string;
}

const E = (entry: MyWeekEntry): MyWeekEntry => entry;

// ─── Week identity (chapter title + theme) ─────────────────────────────────
// Each week has its own chapter title — a collectible, editorial framing
// that gives the week a sense of distinct identity. Never gimmicky.
export interface WeekIdentity {
  /** A short editorial chapter title — 2–5 words, premium. */
  chapterTitle: string;
  /** The week's emotional shape — one short phrase. */
  theme: string;
  /** A premium "about this size" line. Soft, never fruit-app. */
  developmentCue: string;
  /** One quiet sentence about the baby at this stage. Awe, not clinical. */
  babyNote: string;
}

const identityByWeek: Record<number, WeekIdentity> = {
  1: { chapterTitle: "Before the beginning", theme: "Almost not yet.", developmentCue: "Smaller than a single grain of sand, still a possibility.", babyNote: "This week is counted from your last period; the becoming has not yet begun." },
  2: { chapterTitle: "The quiet possibility", theme: "Almost not yet.", developmentCue: "A handful of cells, smaller than a poppy seed.", babyNote: "Conception is happening or about to. Invisible, ordinary, extraordinary." },
  3: { chapterTitle: "The first crossing", theme: "A held secret.", developmentCue: "About the size of a poppy seed, finding a place to settle.", babyNote: "A tiny cluster of cells is journeying inward, looking for somewhere to belong." },
  4: { chapterTitle: "The threshold", theme: "Quietly arriving.", developmentCue: "About the size of a sesame seed, but already specific.", babyNote: "Implantation is taking place. Your body is beginning to know." },
  5: { chapterTitle: "The first knowing", theme: "Two pink lines.", developmentCue: "About the size of an apple seed, already in motion.", babyNote: "The earliest neural groove is forming, the very first line of who they will be." },
  6: { chapterTitle: "The first heartbeat", theme: "The earliest forming.", developmentCue: "About the size of a lentil, but already a heartbeat.", babyNote: "The first flutters of a heart, beating before you can hear it." },
  7: { chapterTitle: "Becoming, in private", theme: "All inside.", developmentCue: "About the size of a blueberry, doubling almost daily.", babyNote: "The brain is forming in waves; tiny limb buds are reaching outward." },
  8: { chapterTitle: "Soft beginnings", theme: "Becoming, quietly.", developmentCue: "About the curve of a small raspberry, all softness and beginning.", babyNote: "Tiny limbs are taking shape, fingers and toes still webbed in the making." },
  9: { chapterTitle: "Held in tenderness", theme: "Tender weeks.", developmentCue: "About the size of a green olive, all face and curl.", babyNote: "Earliest features are surfacing; the tail is gone, the human form emerging." },
  10: { chapterTitle: "A held secret", theme: "Yours alone, still.", developmentCue: "Around the size of a strawberry, folded gently within you.", babyNote: "All major organs are present in form, even if not yet in function." },
  11: { chapterTitle: "Almost a person", theme: "Recognisable now.", developmentCue: "About the length of a small lime, stretching often.", babyNote: "Tooth buds are forming under the gums, and tiny nails are beginning to appear." },
  12: { chapterTitle: "The first turning", theme: "A turning point.", developmentCue: "About the length of a small plum, settling into shape.", babyNote: "Reflexes are forming. A hand may open and close without knowing why." },
  13: { chapterTitle: "Crossing the line", theme: "Easing forward.", developmentCue: "About the length of a pea pod, slim and active.", babyNote: "Vocal cords are forming in a silence that won't last forever." },
  14: { chapterTitle: "Settling in", theme: "Steadier weeks.", developmentCue: "Roughly the length of your hand, from wrist to fingertip.", babyNote: "Facial expressions are beginning to practise themselves, soundlessly." },
  15: { chapterTitle: "Quietly thriving", theme: "Held and growing.", developmentCue: "About the size of an apple, weight beginning to register.", babyNote: "Their bones are hardening; light filters faintly through closed eyelids." },
  16: { chapterTitle: "First stirrings", theme: "Quiet arrival of feeling.", developmentCue: "About the length of an avocado, weight just beginning to register.", babyNote: "Your baby may be hearing muffled sound now. Your voice, your heart." },
  17: { chapterTitle: "Listening in", theme: "A two-way thread.", developmentCue: "About the size of a small pear, gaining roundness.", babyNote: "Hearing is sharpening; the world outside arrives in muffled tones." },
  18: { chapterTitle: "First felt movements", theme: "The first felt movements.", developmentCue: "About the curve of a sweet pepper, turning often inside you.", babyNote: "Small kicks and stretches are happening, more than you can yet feel." },
  19: { chapterTitle: "A second person", theme: "Recognisably them.", developmentCue: "About the length of a heirloom tomato, finding rhythm.", babyNote: "Vernix is forming on their skin, a soft protective coating for the months to come." },
  20: { chapterTitle: "Halfway, gently", theme: "Halfway, gently.", developmentCue: "About the length of a banana, growing longer than wide.", babyNote: "Fingerprints are now uniquely theirs, a quiet kind of permanence." },
  21: { chapterTitle: "A growing rhythm", theme: "Theirs and yours.", developmentCue: "About the length of a carrot, busy and present.", babyNote: "They can taste what you taste. Flavours travel through amniotic fluid." },
  22: { chapterTitle: "The middle middle", theme: "The middle middle.", developmentCue: "Roughly the length of a spaghetti squash, long, lean, real.", babyNote: "Eyebrows and lashes are forming, faint but present." },
  23: { chapterTitle: "Held weight", theme: "Real now.", developmentCue: "About the length of a large mango, gaining substance.", babyNote: "Their skin is becoming less translucent; small layers of fat are beginning." },
  24: { chapterTitle: "Knowing your voice", theme: "A steady presence.", developmentCue: "About the length of an ear of corn, settling into proportion.", babyNote: "Inner ear is fully developed. Your baby may startle at sudden sound." },
  25: { chapterTitle: "Closer to you", theme: "Tuning in.", developmentCue: "About the length of a swede, settling and stretching.", babyNote: "Their hands are now sensitive. They may grasp the cord, or their own foot." },
  26: { chapterTitle: "Eyes opening", theme: "Knowing your rhythms.", developmentCue: "About the length of a courgette, longer now than heavy.", babyNote: "Eyes are beginning to open, even in the dark you carry." },
  27: { chapterTitle: "The turning toward", theme: "Approaching the third.", developmentCue: "About the length of a head of cauliflower, deeply present.", babyNote: "Brain activity now resembles that of a newborn. First dreaming may be beginning." },
  28: { chapterTitle: "Into the third", theme: "Crossing into the third.", developmentCue: "About the length of an aubergine, gathering weight.", babyNote: "Brain folds are deepening, the architecture of who they'll be." },
  29: { chapterTitle: "Heavier days begin", theme: "More room for less.", developmentCue: "About the size of a butternut squash, taking room.", babyNote: "Their bones are fully formed but still soft, drawing calcium from you." },
  30: { chapterTitle: "Heavier days", theme: "Heavier days.", developmentCue: "About the size of a large cabbage, taking up more room.", babyNote: "Your baby can now distinguish light and dark through your skin." },
  31: { chapterTitle: "The slowing weeks", theme: "Quieter pacing.", developmentCue: "About the length of a coconut, fully present.", babyNote: "All five senses are now functioning, in their own held way." },
  32: { chapterTitle: "The body slowing", theme: "The body slowing.", developmentCue: "About the length of a butternut squash, real weight now.", babyNote: "Practice breaths are happening, drawing in amniotic fluid, getting ready." },
  33: { chapterTitle: "Inward turning", theme: "Settling within.", developmentCue: "About the size of a pineapple, head growing rapidly.", babyNote: "They may now recognise the same lullaby played twice, even before birth." },
  34: { chapterTitle: "The held final stretch", theme: "The held final stretch.", developmentCue: "About the size of a small honeydew melon, settled and growing.", babyNote: "Most babies have moved head-down now, though not all in a hurry." },
  35: { chapterTitle: "Almost ready", theme: "Quiet readiness.", developmentCue: "About the size of a pineapple, taking the room.", babyNote: "Most major systems are mature; the last weeks are about weight and finishing." },
  36: { chapterTitle: "Almost full", theme: "Almost full.", developmentCue: "About the length of a romaine lettuce, long, present, almost ready.", babyNote: "Lungs are nearly mature; immunity is being passed gently to them." },
  37: { chapterTitle: "Considered full term", theme: "Officially full.", developmentCue: "About the length of Swiss chard, quiet and complete.", babyNote: "Your baby is considered early term now and could safely arrive any week." },
  38: { chapterTitle: "Waiting, with intent", theme: "Waiting, with intent.", developmentCue: "About the size of a small pumpkin, softly complete.", babyNote: "Vernix and lanugo are slowly disappearing as the body finishes itself." },
  39: { chapterTitle: "Days, not weeks", theme: "Closer than ever.", developmentCue: "About the size of a small watermelon, the room nearly full.", babyNote: "Most of the work is done; you are both waiting, in your own ways." },
  40: { chapterTitle: "A held threshold", theme: "A held threshold.", developmentCue: "About the size of a small watermelon, fully here, waiting.", babyNote: "Your baby is ready when they're ready. Most arrive in their own hour." },
  41: { chapterTitle: "Past the date", theme: "Still in waiting.", developmentCue: "Fully here, fully formed, taking their own time.", babyNote: "Going past 40 weeks is common; your care team will check in more closely now." },
  42: { chapterTitle: "Their own hour", theme: "On their own clock.", developmentCue: "Fully here, waiting for the door to open.", babyNote: "Most pregnancies arrive when they arrive. Your body knows the way." },
};

const stageOf = (week: number): "early" | "mid" | "late" | "post-term" => {
  if (week <= 12) return "early";
  if (week <= 27) return "mid";
  if (week <= 40) return "late";
  return "post-term";
};

export const getWeekIdentity = (week: number): WeekIdentity => {
  const w = Math.min(Math.max(week, 1), 42);
  return identityByWeek[w];
};

// ─── Hand-written full entries (Slot 1 + 2 + 4) ────────────────────────────
const entries: Record<number, MyWeekEntry> = {
  18: E({
    lead: "Your baby is moving more than you can feel.",
    matters: [
      { title: "Your baby", body: "About the length of a sweet pepper. Their hearing is sharpening, and they're stretching, kicking, and turning often." },
      { title: "Your body", body: "Your bump is becoming more visible. You may feel the first quickening, small flutters that come and go." },
      { title: "Emotionally", body: "This middle stretch can feel calmer, or quietly strange. Both are common, and neither needs to be fixed." },
    ],
    focus: {
      headline: "Notice how your energy shifts through the day.",
      body: "Mid-pregnancy energy often comes in waves rather than steady lines. Paying gentle attention now makes it easier to know what your body is asking for, without forcing yourself to push through.",
    },
    reflection: {
      prompt: "What has this week quietly asked of you?",
      context: "Not what you achieved. What it asked.",
    },
    nextPreview:
      "Next week, movements often become a little more defined. Some people start to recognise patterns; others don't yet. Both are normal.",
  }),
};

// ─── Stage-aware default ───────────────────────────────────────────────────
const defaultsByStage: Record<ReturnType<typeof stageOf>, Omit<MyWeekEntry, "matters" | "nextPreview">> = {
  early: {
    lead: "So much is happening, even when nothing seems to be.",
    focus: {
      headline: "Be gentler with yourself than you think you need to be.",
      body: "Early pregnancy asks more of the body than it shows. Tiredness, tenderness, and a quiet kind of unease are common. None of it means anything is wrong.",
    },
    reflection: {
      prompt: "What's been the hardest thing to say out loud this week?",
      context: "Sometimes naming it is the whole thing.",
    },
  },
  mid: {
    lead: "The middle of pregnancy is often where it starts to feel real.",
    focus: {
      headline: "Let one thing be a little easier this week.",
      body: "Mid-pregnancy can feel deceptively steady, which makes it easy to take on more. Choosing one thing to soften, a commitment, an expectation, or a pace, protects more than it removes.",
    },
    reflection: {
      prompt: "What does your body feel like trusting right now?",
      context: "Not what you've been told to trust. What feels true.",
    },
  },
  late: {
    lead: "Your body is doing quiet, enormous work.",
    focus: {
      headline: "Rest is part of the preparation, not a pause from it.",
      body: "Late pregnancy invites a slower pace, even when the to-do list resists. The stillness you're allowed now is part of how your body gets ready, not something to feel behind on.",
    },
    reflection: {
      prompt: "What are you carrying that doesn't have to be carried alone?",
      context: "Sometimes the weight is in the not-saying.",
    },
  },
  "post-term": {
    lead: "These extra days can feel longer than the months before them.",
    focus: {
      headline: "Let waiting be the work this week.",
      body: "Going past your due date is common and rarely a sign anything is wrong. The pull to fill the time is understandable; so is the choice to rest inside it.",
    },
    reflection: {
      prompt: "What would feel kind to give yourself permission for today?",
      context: "Even small permissions count.",
    },
  },
};

const defaultMattersByStage: Record<ReturnType<typeof stageOf>, MyWeekEntry["matters"]> = {
  early: [
    { title: "Your baby", body: "Tiny but rapidly forming. The earliest structures of the heart, brain, and spine are taking shape." },
    { title: "Your body", body: "Hormones are doing the loudest work. Tiredness, nausea, and tenderness can come and go without warning." },
    { title: "Emotionally", body: "Joy, fear, numbness, and disbelief can arrive in the same hour. None of them are wrong." },
  ],
  mid: [
    { title: "Your baby", body: "Growing steadily, moving more, and beginning to settle into recognisable patterns of activity and rest." },
    { title: "Your body", body: "Your bump is changing shape week by week. Energy may feel steadier, though never guaranteed." },
    { title: "Emotionally", body: "A quieter middle stretch for many. Space can open up. Sometimes filled with thought, sometimes with calm." },
  ],
  late: [
    { title: "Your baby", body: "Putting on weight, practising breathing movements, and gradually moving into position for birth." },
    { title: "Your body", body: "Slower, heavier, and asking for more rest. Braxton Hicks and pelvic pressure are common companions." },
    { title: "Emotionally", body: "Anticipation and tiredness often live side by side. Patience with yourself matters more here than anywhere." },
  ],
  "post-term": [
    { title: "Your baby", body: "Fully developed and waiting. Movements may feel different in pattern, but should still be present and noticeable." },
    { title: "Your body", body: "Carrying more, sleeping less, and likely being checked more often by your care team." },
    { title: "Emotionally", body: "Impatience, doubt, and quiet pride can take turns. All of it makes sense." },
  ],
};

const defaultNextPreviewByStage: Record<ReturnType<typeof stageOf>, string> = {
  early: "Next week, small shifts continue beneath the surface. You may not notice much outwardly, and that's part of how this stage works.",
  mid: "Next week, the bump and the baby's movements often become a little more defined. Some weeks feel like change; some feel like pause.",
  late: "Next week brings you closer. Your body will keep preparing in small, mostly invisible ways.",
  "post-term": "Next week, your care team will likely be in closer touch. We'll be here either way.",
};

// ─── Public API ────────────────────────────────────────────────────────────
export const getMyWeekContent = (week: number): MyWeekEntry => {
  const w = Math.min(Math.max(week, 1), 42);
  const hand = entries[w];
  if (hand) return hand;
  const stage = stageOf(w);
  return {
    ...defaultsByStage[stage],
    matters: defaultMattersByStage[stage],
    nextPreview: defaultNextPreviewByStage[stage],
  };
};
