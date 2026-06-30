// ─── Toddler Age Registry ─────────────────────────────────────────────────
// Typed configs for the 5 Toddler age-guide pages. UK English. Calm,
// grounded, practical stage guides — not article pages. Variability
// language only. No medical overclaim.

import type { ToddlerTopicSlug } from "@/data/toddlerTopicData";
import heroAge12to17 from "@/assets/toddler-age-12-17-months.jpg.asset.json";
import heroAge18to23 from "@/assets/toddler-age-18-23-months.jpg.asset.json";
import heroAge2Years from "@/assets/toddler-age-2-years.jpg.asset.json";
import heroAge30Months from "@/assets/toddler-age-30-months.jpg.asset.json";
import heroAge3Years from "@/assets/toddler-age-3-years.jpg.asset.json";

export type ToddlerAgeSlug =
  | "12-17-months"
  | "18-23-months"
  | "2-years"
  | "30-months"
  | "3-years";

export interface ToddlerAgeQA {
  q: string;
  a: string;
}

export type DevelopmentAreaKey =
  | "movement"
  | "speech"
  | "behaviour"
  | "sleep"
  | "food"
  | "play"
  | "potty";

export interface DevelopmentArea {
  key: DevelopmentAreaKey;
  heading: string;
  body: string;
  /** Existing toddler topic route slug under /toddler/. */
  topic: ToddlerTopicSlug;
}

export interface ToddlerAgeConfig {
  slug: ToddlerAgeSlug;
  eyebrow: string;
  title: string;
  ageRangeLabel: string;
  standfirst: string;
  heroImage?: string;
  stageSummary?: string;
  whatChanges: { lead: string; items: string[] };
  developmentAreas: DevelopmentArea[];
  commonQuestions: ToddlerAgeQA[];
  gentleSupport: string;
  aiHeading: string;
  aiDescription: string;
  aiPlaceholder: string;
  aiPrompts: string[];
  relatedTopics: ToddlerTopicSlug[];
  previousAge?: ToddlerAgeSlug;
  nextAge?: ToddlerAgeSlug;
}

const gentleSupportShared =
  "Every toddler develops at their own pace, and the range of normal is genuinely wide. If something feels persistently different, worrying, or hard to manage day to day, a calm conversation with your health visitor or GP can help you decide what, if anything, to do next. Asking is never an overreaction.";

// ─── 12 to 17 months ────────────────────────────────────────────────────
const twelveToSeventeen: ToddlerAgeConfig = {
  slug: "12-17-months",
  eyebrow: "Early toddlerhood",
  title: "12 to 17 months",
  ageRangeLabel: "12–17 months",
  standfirst:
    "The first year on two feet. Walking is finding its footing, words are starting to land, and independence and closeness pull in opposite directions all day long.",
  heroImage: heroAge12to17.url,
  stageSummary:
    "This stage is more transition than arrival. Many children are still doing baby things one minute and toddler things the next — and that is exactly as it should be.",
  whatChanges: {
    lead:
      "A wide range of normal sits inside this stage. Some children walk at 11 months, others closer to 17. Some say five words, others say one. Here is what tends to shift.",
    items: [
      "Movement — many toddlers start cruising, walking and climbing, often unsteadily at first",
      "Communication — first clear words may appear, alongside lots of gesture and pointing",
      "Independence — strong wishes about food, getting dressed, and what to hold",
      "Separation — clinginess can return as they understand more about being apart from you",
      "Sleep — naps often start to shift from two to one, sometimes unevenly for weeks",
      "Feeding — finger foods, self-feeding, mess and refusal can all sit in the same meal",
      "Play — banging, posting, emptying and filling are favourites, often on repeat",
    ],
  },
  developmentAreas: [
    { key: "movement", heading: "Movement", body: "Cruising, first steps and early climbing. Falls are part of the practice, not a problem in themselves.", topic: "development-milestones" },
    { key: "speech", heading: "Speech", body: "First clear words, lots of pointing and babbling that sounds increasingly like real conversation.", topic: "speech-language" },
    { key: "behaviour", heading: "Behaviour", body: "Big feelings arrive before the words to name them. Connection regulates faster than words at this stage.", topic: "behaviour-emotions" },
    { key: "sleep", heading: "Sleep", body: "Naps may start to consolidate. Some nights stay easy, others undo themselves for no clear reason.", topic: "sleep" },
    { key: "food", heading: "Food", body: "Self-feeding, picky moments and food that ends up worn rather than eaten — all common at this age.", topic: "food-feeding" },
    { key: "play", heading: "Play", body: "Filling, emptying, banging and copying. Simple, repetitive play does more than any toy.", topic: "play-connection" },
  ],
  commonQuestions: [
    { q: "When should my toddler be walking?", a: "Most children walk independently between 12 and 17 months, though the typical range stretches a little either side. If your toddler is not walking by 18 months, it is worth mentioning at your next check-up — often it is simple reassurance." },
    { q: "How many words should they have?", a: "By around 18 months many toddlers have a handful of clear words and understand many more. Quiet talkers who understand well and try to communicate in other ways are usually still on track." },
    { q: "Why are tantrums starting so early?", a: "Big feelings arrive before the words and skills to manage them. At this age tantrums are usually a sign of overwhelm rather than defiance. Calm presence helps far more than reasoning." },
    { q: "Should they still be napping twice a day?", a: "Some children drop to one nap before 12 months, others hold on to two until well past 18 months. Either is normal. Watch sleep across 24 hours rather than a single nap." },
    { q: "When should I worry?", a: "Quiet steady worries are worth raising. Loss of skills, no interest in interaction, not walking by 18 months, or no clear words by 18 months are all worth a calm conversation with your health visitor or GP." },
  ],
  gentleSupport: gentleSupportShared,
  aiHeading: "Ask anything about 12 to 17 months",
  aiDescription:
    "Walking, words, sleep, mess and clinginess all sit on top of each other at this age. Ask in plain words and get a calm, considered answer.",
  aiPlaceholder: "What's happening at this age?",
  aiPrompts: [
    "Is this normal for 14 months?",
    "How do I support early walking safely?",
    "Why has my toddler started waking at night again?",
    "How many words should a 15 month old have?",
    "When should I speak to a health visitor about walking?",
  ],
  relatedTopics: ["development-milestones", "speech-language", "sleep", "food-feeding"],
  nextAge: "18-23-months",
};

// ─── 18 to 23 months ────────────────────────────────────────────────────
const eighteenToTwentyThree: ToddlerAgeConfig = {
  slug: "18-23-months",
  eyebrow: "Confident movers",
  title: "18 to 23 months",
  ageRangeLabel: "18–23 months",
  standfirst:
    "Faster on their feet, louder in their wants, and finding the word ‘no’. This stage is full of energy, opinion and pretend play that is just starting to take shape.",
  heroImage: heroAge18to23.url,
  stageSummary:
    "Toddlers at this age often look very capable one moment and very small the next. Both are real. Calm consistency tends to do more than clever strategies.",
  whatChanges: {
    lead:
      "Most children settle more confidently into walking and start to add running, climbing and stronger preferences. Language often grows in noticeable bursts.",
    items: [
      "Movement — running, climbing, kicking and the start of jumping",
      "Speech — word spurts, two-word phrases and a lot of pointing and naming",
      "Pretend play — feeding a toy, pushing a pram, copying daily routines",
      "Emotion — frustration, tantrums and strong preferences are common",
      "Sleep — many children drop to one nap, with rocky weeks while they adjust",
      "Feeding — pickiness, food jags and refusal of yesterday's favourite",
      "Independence — wanting to do it themselves, and undoing it cheerfully",
    ],
  },
  developmentAreas: [
    { key: "movement", heading: "Movement", body: "Running, climbing and early jumping. Trips and bumps are part of building coordination.", topic: "development-milestones" },
    { key: "speech", heading: "Speech", body: "Word spurts, two-word phrases and growing understanding. Quieter talkers may still be on track.", topic: "speech-language" },
    { key: "behaviour", heading: "Behaviour", body: "Tantrums are common and rarely about the surface trigger. Co-regulation works better than reasoning.", topic: "behaviour-emotions" },
    { key: "sleep", heading: "Sleep", body: "Nap transitions can unsettle nights for a few weeks. Consistency tends to win out over rules.", topic: "sleep" },
    { key: "food", heading: "Food", body: "Picky phases and food jags are common and usually pass without pressure.", topic: "food-feeding" },
    { key: "play", heading: "Play", body: "Early pretend play, copying chores and shared books still matter more than screens.", topic: "play-connection" },
  ],
  commonQuestions: [
    { q: "Why are tantrums getting worse?", a: "Between 18 and 23 months toddlers feel more, want more and have very few words to handle any of it. Tantrums often peak around this stage and ease as language grows." },
    { q: "Should my toddler be making two-word phrases?", a: "Many children start putting two words together between 18 and 24 months. Some take a little longer, especially if they are working hard on other skills. Mention it at your two-year check if there are no two-word phrases by 24 months." },
    { q: "Is one nap enough now?", a: "Most toddlers drop to one nap somewhere between 14 and 22 months. The transition can be bumpy. An earlier bedtime usually helps during the adjustment." },
    { q: "How do I handle picky eating?", a: "Keep meals calm and predictable. Offer a small amount of something they usually accept alongside the new food, eat together where you can, and try not to make the meal a negotiation." },
    { q: "When should I worry about speech?", a: "If your toddler has fewer than six clear words by 18 months, no two-word phrases by 24 months, or seems not to understand simple requests, mention it to your health visitor or GP." },
  ],
  gentleSupport: gentleSupportShared,
  aiHeading: "Ask anything about 18 to 23 months",
  aiDescription:
    "Tantrums, sleep shifts and language bursts can all show up in the same week. Ask in plain words and get a calm, grounded answer.",
  aiPlaceholder: "What's happening at this age?",
  aiPrompts: [
    "How do I handle tantrums at 20 months?",
    "Is one nap enough now?",
    "Should my 22 month old be saying two words together?",
    "Why is my toddler suddenly fussy with food?",
    "When should I worry about speech?",
  ],
  relatedTopics: ["behaviour-emotions", "speech-language", "sleep", "food-feeding"],
  previousAge: "12-17-months",
  nextAge: "2-years",
};

// ─── 2 years ────────────────────────────────────────────────────────────
const twoYears: ToddlerAgeConfig = {
  slug: "2-years",
  eyebrow: "Big feelings, big leaps",
  title: "2 years",
  ageRangeLabel: "Around 2 years",
  standfirst:
    "Often called the loud, lively middle of toddlerhood. Language can race ahead, feelings can spill over, and your toddler may want to do everything themselves — until they suddenly do not.",
  heroImage: heroAge2Years.url,
  stageSummary:
    "Two is rarely as terrible as it is described. It is usually a stage of intense growth in language, emotion and independence happening all at once.",
  whatChanges: {
    lead:
      "Children at two are often more sociable, more verbal and more opinionated. The skills are growing faster than the ability to manage them, which is the heart of most two-year-old moments.",
    items: [
      "Language — many children speak in short sentences and understand a great deal more",
      "Emotion — strong feelings, quick swings and a need for steady presence",
      "Independence — wanting to choose, refuse and try things alone",
      "Imagination — small pretend stories, talking to toys, role-playing what they see",
      "Sleep — bedtime resistance can appear, even when sleep itself is fine",
      "Food — picky stretches are still common, and rarely about hunger",
      "Toilet readiness — early signs may appear in some children, others are not ready yet",
    ],
  },
  developmentAreas: [
    { key: "movement", heading: "Movement", body: "Running, climbing stairs holding on, kicking a ball, beginning to jump with both feet.", topic: "development-milestones" },
    { key: "speech", heading: "Speech", body: "Short sentences, lots of questions and a growing ability to be understood by people outside the family.", topic: "speech-language" },
    { key: "behaviour", heading: "Behaviour", body: "Limits and connection together work better than either alone. Big feelings need a calm adult, not a clever sentence.", topic: "behaviour-emotions" },
    { key: "sleep", heading: "Sleep", body: "Bedtime resistance, early waking and nap drops can all appear. A predictable wind-down helps most.", topic: "sleep" },
    { key: "food", heading: "Food", body: "Family meals, small portions and low-pressure mealtimes tend to do more than persuasion.", topic: "food-feeding" },
    { key: "potty", heading: "Potty training", body: "Some children show early readiness signs; many are not quite there yet. Wait for cues rather than the calendar.", topic: "potty-learning" },
  ],
  commonQuestions: [
    { q: "Should I start potty training at 2?", a: "Some children are ready around their second birthday, many are not. Look for steady signs — dry stretches, awareness of being wet or soiled, interest in the toilet — rather than a fixed age." },
    { q: "Why does my two year old say no to everything?", a: "‘No’ is one of the first tools for asserting a self. It is usually about practising independence, not opposing you. Offering small real choices often eases the standoff." },
    { q: "How long should bedtime take?", a: "A calm wind-down of around 20 to 30 minutes is usually enough. If bedtime regularly stretches past an hour, look at the lead-up to it — light, screens, food and pace all matter." },
    { q: "Is it normal to only eat three foods?", a: "Narrow eating phases are common at two. Keep offering a small amount of other foods alongside what they will eat, eat together where you can, and try to keep the table calm." },
    { q: "When should I worry about language?", a: "By around two years, many children have at least 50 words and put two together. If your child has very few words, is not combining words by two and a half, or you have a steady worry, speak to your health visitor or GP." },
  ],
  gentleSupport: gentleSupportShared,
  aiHeading: "Ask anything about 2 years",
  aiDescription:
    "Two is a stage of fast growth and big feelings. Ask anything from sleep to speech to potty readiness and get a calm, considered answer.",
  aiPlaceholder: "What's happening with your two year old?",
  aiPrompts: [
    "How do I handle a tantrum in public?",
    "Is my 2 year old ready for potty training?",
    "Why does bedtime suddenly take an hour?",
    "Should my 2 year old be in sentences?",
    "When should I speak to a health visitor about behaviour?",
  ],
  relatedTopics: ["behaviour-emotions", "speech-language", "sleep", "potty-learning"],
  previousAge: "18-23-months",
  nextAge: "30-months",
};

// ─── 30 months ──────────────────────────────────────────────────────────
const thirtyMonths: ToddlerAgeConfig = {
  slug: "30-months",
  eyebrow: "Stronger opinions, longer stories",
  title: "30 months",
  ageRangeLabel: "Around 30 months",
  standfirst:
    "Conversation lengthens, play deepens and your child's sense of who they are gets louder. Emotional swings are still very real, even as understanding grows.",
  heroImage: heroAge30Months.url,
  stageSummary:
    "Around two and a half, many toddlers feel like a smaller, sharper version of who they are becoming — capable, curious and still very much in need of a calm anchor.",
  whatChanges: {
    lead:
      "This is often a stage of fuller phrases, more complex play and clearer preferences. Confidence and caution can sit side by side in the same hour.",
    items: [
      "Language — longer phrases, simple stories and a love of being read to",
      "Play — more involved pretend play, often acting out family life",
      "Emotion — bigger swings, with a growing ability to name how they feel",
      "Independence — wanting to do many things alone, then asking for help",
      "Sleep — bedtime stalling, fears or imagination at night can appear",
      "Food — variable appetite, growing willingness to try if it feels low-stakes",
      "Toilet learning — many children begin in earnest, with plenty of stop-start",
    ],
  },
  developmentAreas: [
    { key: "movement", heading: "Movement", body: "Confident running, jumping, climbing and managing stairs with more ease.", topic: "development-milestones" },
    { key: "speech", heading: "Speech", body: "Longer phrases, simple stories and questions about how the world works.", topic: "speech-language" },
    { key: "behaviour", heading: "Behaviour", body: "Stronger emotions met with calm limits help your child learn the shape of their own feelings.", topic: "behaviour-emotions" },
    { key: "sleep", heading: "Sleep", body: "Imagination at night, fears of the dark and bedtime stalling can all appear. A steady routine helps most.", topic: "sleep" },
    { key: "food", heading: "Food", body: "Appetite swings are common. Eating together and low-pressure offering still does the heavy lifting.", topic: "food-feeding" },
    { key: "potty", heading: "Potty training", body: "Many children begin around this age. Setbacks and night-time accidents are normal for months or longer.", topic: "potty-learning" },
  ],
  commonQuestions: [
    { q: "Why does my 30 month old keep stalling at bedtime?", a: "Imagination, energy and a growing sense of choice all peak around now. A predictable wind-down, low light and a calm goodnight script tend to do more than rules." },
    { q: "How long does potty training take?", a: "For most children it is a months-long process rather than a weekend, with stops, starts and the occasional regression. Night-time dryness often comes much later." },
    { q: "Is fear of the dark normal at this age?", a: "Yes. As imagination grows, fears can appear that were not there before. A nightlight, a familiar object and steady reassurance usually settle it." },
    { q: "Should my child be using full sentences?", a: "Many children are speaking in three to four word sentences and can be understood by familiar adults most of the time. If speech is hard to understand or very limited, mention it at your two-and-a-half year check." },
    { q: "How do I handle hitting or biting?", a: "Both are common at this age and almost always about overwhelm rather than meanness. Calmly stop the behaviour, name the feeling underneath, and keep your child safe and connected." },
  ],
  gentleSupport: gentleSupportShared,
  aiHeading: "Ask anything about 30 months",
  aiDescription:
    "Bedtime, behaviour, potty training and speech can all be moving at once. Ask in plain words and get a calm, considered answer.",
  aiPlaceholder: "What's on your mind right now?",
  aiPrompts: [
    "Is my 30 month old ready for potty training?",
    "Why has bedtime become a battle?",
    "Should my child be in full sentences?",
    "How do I handle hitting?",
    "When should I speak to a health visitor about speech?",
  ],
  relatedTopics: ["behaviour-emotions", "potty-learning", "sleep", "speech-language"],
  previousAge: "2-years",
  nextAge: "3-years",
};

// ─── 3 years ────────────────────────────────────────────────────────────
const threeYears: ToddlerAgeConfig = {
  slug: "3-years",
  eyebrow: "Conversation and connection",
  title: "3 years",
  ageRangeLabel: "Around 3 years",
  standfirst:
    "Real conversation, deeper friendships and a growing sense of independence. Three is often calmer than two, with new challenges of its own around boundaries, fairness and nursery life.",
  heroImage: heroAge3Years.url,
  stageSummary:
    "Three is a stage of widening worlds — more time with other children, more questions about how things work, and more capacity to handle small disappointments with help.",
  whatChanges: {
    lead:
      "Many children at three can hold a real conversation, play more cooperatively and follow simple routines. They still need plenty of help with feelings, transitions and tiredness.",
    items: [
      "Language — fuller conversations, lots of questions and a love of stories",
      "Imagination — long pretend games, characters and made-up rules",
      "Friendships — early cooperative play, with frequent help needed around sharing",
      "Independence — dressing, eating and tidying with growing competence",
      "Sleep — many children move away from naps; bedtime can still stall",
      "Toilet training — daytime dryness is often well-established; night dryness later",
      "Nursery or preschool — settling in, small steps of separation, big tired evenings",
    ],
  },
  developmentAreas: [
    { key: "movement", heading: "Movement", body: "Confident running and climbing, riding a balance bike or trike, kicking and catching a large ball.", topic: "development-milestones" },
    { key: "speech", heading: "Speech", body: "Conversations, storytelling and growing clarity. Strangers can usually understand most of what your child says.", topic: "speech-language" },
    { key: "behaviour", heading: "Behaviour", body: "Calm limits with clear connection. Tiredness and transitions are still the biggest triggers.", topic: "behaviour-emotions" },
    { key: "sleep", heading: "Sleep", body: "Naps often fade. Bedtime stalling, night fears and early waking can still appear in waves.", topic: "sleep" },
    { key: "food", heading: "Food", body: "Eating widens for many children at three. Family meals continue to do the quiet work.", topic: "food-feeding" },
    { key: "potty", heading: "Potty training", body: "Daytime dryness is often steady. Accidents under stress or excitement are still normal.", topic: "potty-learning" },
  ],
  commonQuestions: [
    { q: "Should my 3 year old be in full conversation?", a: "Many three year olds hold short back-and-forth conversations and can be understood by people outside the family. If speech is still hard to understand, mention it at your next health visitor or GP appointment." },
    { q: "When do most children drop their nap?", a: "Anywhere between two and a half and four years. Watch night sleep — if your child stops settling at bedtime, the nap is often ready to go." },
    { q: "How do I help with nursery settling?", a: "Short, calm goodbyes, a predictable routine and quiet evenings tend to settle things faster than long discussions. Tears at drop-off can be normal for weeks." },
    { q: "Is it normal to still have accidents?", a: "Yes. Daytime accidents under stress, excitement or deep play are common at three. Night-time dryness often comes later and is rarely a sign of a problem before five." },
    { q: "When should I worry about behaviour?", a: "Steady worries are worth raising. If you are concerned about how often your child is overwhelmed, struggling to play with others, or losing skills, speak to your health visitor or GP." },
  ],
  gentleSupport: gentleSupportShared,
  aiHeading: "Ask anything about 3 years",
  aiDescription:
    "Three brings conversation, friendships and the start of life outside the home. Ask anything and get a calm, considered answer.",
  aiPlaceholder: "What's happening with your three year old?",
  aiPrompts: [
    "How do I help my 3 year old settle at nursery?",
    "When should my child drop their nap?",
    "Why are accidents still happening?",
    "How do I help with sharing?",
    "When should I speak to a GP about behaviour?",
  ],
  relatedTopics: ["behaviour-emotions", "speech-language", "potty-learning", "play-connection"],
  previousAge: "30-months",
};

export const toddlerAgeConfigs: Record<ToddlerAgeSlug, ToddlerAgeConfig> = {
  "12-17-months": twelveToSeventeen,
  "18-23-months": eighteenToTwentyThree,
  "2-years": twoYears,
  "30-months": thirtyMonths,
  "3-years": threeYears,
};

export const TODDLER_AGE_INDEX: Record<
  ToddlerAgeSlug,
  { title: string; ageRangeLabel: string; eyebrow: string }
> = {
  "12-17-months": { title: twelveToSeventeen.title, ageRangeLabel: twelveToSeventeen.ageRangeLabel, eyebrow: twelveToSeventeen.eyebrow },
  "18-23-months": { title: eighteenToTwentyThree.title, ageRangeLabel: eighteenToTwentyThree.ageRangeLabel, eyebrow: eighteenToTwentyThree.eyebrow },
  "2-years": { title: twoYears.title, ageRangeLabel: twoYears.ageRangeLabel, eyebrow: twoYears.eyebrow },
  "30-months": { title: thirtyMonths.title, ageRangeLabel: thirtyMonths.ageRangeLabel, eyebrow: thirtyMonths.eyebrow },
  "3-years": { title: threeYears.title, ageRangeLabel: threeYears.ageRangeLabel, eyebrow: threeYears.eyebrow },
};

// User-facing labels for topic links shown on age pages. "Potty training"
// is the user-facing label; the route remains /toddler/potty-learning.
export const TODDLER_TOPIC_LABELS: Record<
  ToddlerTopicSlug,
  { title: string; eyebrow: string }
> = {
  "development-milestones": { title: "Development & milestones", eyebrow: "Development" },
  "behaviour-emotions": { title: "Behaviour & emotions", eyebrow: "Behaviour" },
  "speech-language": { title: "Speech & language", eyebrow: "Speech" },
  "sleep": { title: "Sleep", eyebrow: "Sleep" },
  "food-feeding": { title: "Food & feeding", eyebrow: "Feeding" },
  "potty-learning": { title: "Potty training", eyebrow: "Potty" },
  "health-safety": { title: "Health & safety", eyebrow: "Health" },
  "play-connection": { title: "Play & connection", eyebrow: "Play" },
};
