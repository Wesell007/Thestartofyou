export type ToddlerArticleTopic =
  | "development-milestones"
  | "behaviour-emotions"
  | "speech-language"
  | "sleep"
  | "food-feeding"
  | "potty-learning"
  | "health-safety"
  | "play-connection";

export interface ToddlerArticle {
  slug: string;
  topic: ToddlerArticleTopic;
  title: string;
  description: string;
  readTime: string;
  medicallyReviewed?: boolean;
  status: "draft" | "ready";
  seoTitle?: string;
  seoDescription?: string;
  lastUpdated?: string;
  reviewedBy?: string;
  intro?: string;
  sections?: { heading: string; body: string[] }[];
  keyTakeaways?: string[];
  relatedSlugs?: string[];
  sources?: {
    label: string;
    publisher: string;
    url: string;
    year?: string;
  }[];
}

const rawToddlerArticles: ToddlerArticle[] = [
  // Development and milestones
  {
    slug: "what-toddler-development-can-look-like",
    topic: "development-milestones",
    title: "What toddler development can look like",
    description:
      "A gentle map of the leaps, plateaus and quiet shifts that shape the toddler years.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "when-milestones-feel-different",
    topic: "development-milestones",
    title: "When milestones feel different",
    description:
      "Why children rarely develop on the same timeline, and when a chat with your health visitor can help.",
    readTime: "4 min read",
    status: "draft",
  },

  // Behaviour and emotions
  {
    slug: "understanding-toddler-tantrums",
    topic: "behaviour-emotions",
    title: "Understanding toddler tantrums",
    description:
      "Why big feelings spill over so intensely at this age, and calm ways to stay steady beside them.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "helping-your-toddler-with-big-feelings",
    topic: "behaviour-emotions",
    title: "Helping your toddler with big feelings",
    description:
      "Simple, low-pressure ways to help your child name and move through the emotions that overwhelm them.",
    readTime: "6 min read",
    status: "draft",
  },

  // Speech and language
  {
    slug: "supporting-toddler-speech-at-home",
    topic: "speech-language",
    title: "Supporting toddler speech at home",
    description:
      "Everyday ways to gently grow your toddler's language, without flashcards or pressure.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "when-to-ask-about-speech-delay",
    topic: "speech-language",
    title: "When to ask about speech delay",
    description:
      "Signs it's worth a conversation with your health visitor or GP about your toddler's speech.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },

  // Sleep
  {
    slug: "toddler-sleep-rhythms",
    topic: "sleep",
    title: "Toddler sleep rhythms",
    description:
      "How toddler sleep quietly shifts across the second and third year, and what's usually behind wobbly weeks.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "bedtime-battles-and-night-waking",
    topic: "sleep",
    title: "Bedtime battles and night waking",
    description:
      "Calm approaches to bedtime resistance and night waking, without harsh sleep training.",
    readTime: "6 min read",
    status: "draft",
  },

  // Food and feeding
  {
    slug: "picky-eating-in-toddlers",
    topic: "food-feeding",
    title: "Picky eating in toddlers",
    description:
      "Why toddlers reject foods they used to love, and gentle ways to keep mealtimes low-pressure.",
    readTime: "5 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Picky eating is one of the most common worries parents carry through the toddler years. Foods that were happily eaten for months can suddenly be pushed away, and mealtimes can start to feel tense. This piece is a calm look at why picky eating happens, what tends to help and when it is worth asking for support.",
    sections: [
      {
        heading: "Why picky eating can happen",
        body: [
          "Picky eating is a normal part of toddler development for many children. As toddlers grow more independent, food becomes one of the few things they can clearly say yes or no to.",
          "Preferences can shift week to week and are often tied to how tired, unwell or overwhelmed your toddler is, rather than to what is actually on the plate.",
        ],
      },
      {
        heading: "Appetite changes in toddlerhood",
        body: [
          "Toddler appetite usually slows down compared with the first year, because growth slows. It can look like a sudden loss of interest in food when in fact their body simply needs less on some days.",
          "It is common for toddlers to eat a lot at one meal and very little at the next. Looking at eating across a week, rather than a single day, often gives a more accurate picture.",
        ],
      },
      {
        heading: "Keeping pressure low",
        body: [
          "The steadiest thing that seems to help picky eating over time is keeping pressure off the table. That means not persuading, not bargaining and not using pudding as a reward for finishing.",
          "You can offer food, sit with your toddler and let them decide how much of it they eat. That approach can feel slow, but it often supports calmer eating over months rather than days.",
        ],
      },
      {
        heading: "Repeated exposure without force",
        body: [
          "Toddlers often need to see a food many times before they try it, and many times more before they accept it. A refused food is not a rejected food forever.",
          "You can keep offering small amounts of a food alongside things your toddler already likes, without commenting on whether they eat it. Curiosity often grows quietly when there is no pressure attached.",
        ],
      },
      {
        heading: "Offering safe variety",
        body: [
          "You do not have to serve elaborate meals to offer variety. Small changes such as a different fruit at breakfast or a new vegetable next to a familiar one can be enough.",
          "It usually helps to include at least one thing on the plate you know your toddler will eat, so mealtimes do not become a standoff over the whole meal.",
        ],
      },
      {
        heading: "Mealtime emotions",
        body: [
          "Toddlers pick up on the mood at the table quickly. Sighs, tense silence or repeated comments about eating can make food feel more loaded than it needs to.",
          "Trying to keep the tone light and conversational, even when eating is limited, is a small thing that can add up. Your calm at the table matters as much as what is served.",
        ],
      },
      {
        heading: "When to ask for support",
        body: [
          "For most toddlers, picky eating settles in time with steady offerings and low pressure. It can help to remember that eating well is a slow process, not a daily test.",
          "If your toddler is losing weight, seems unwell, has feeding difficulties, has very restricted eating or you are worried about their growth, ask your health visitor, GP or appropriate local service for advice.",
        ],
      },
    ],
    keyTakeaways: [
      "Picky eating is common and often part of normal toddler development.",
      "Toddler appetite naturally slows and varies from day to day.",
      "Low pressure at the table supports steadier eating over time.",
      "Repeated, calm exposure to foods helps more than persuasion.",
      "A steady mood at meals matters as much as what is on the plate.",
      "Ask your health visitor or GP if you are worried about growth or intake.",
    ],
    relatedSlugs: [
      "making-mealtimes-feel-calmer",
      "simple-play-ideas-for-toddlers",
      "building-connection-through-everyday-play",
    ],
    sources: [
      {
        label: "Fussy eaters",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/fussy-eaters/",
      },
      {
        label: "Toddler eating and mealtimes",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Eating well: the toddler years",
        publisher: "First Steps Nutrition Trust",
        url: "https://www.firststepsnutrition.org/eating-well-early-years",
      },
      {
        label: "Food fact sheet: toddlers",
        publisher: "British Dietetic Association",
        url: "https://www.bda.uk.com/resource/toddlers.html",
      },
    ],
  },
  {
    slug: "making-mealtimes-feel-calmer",
    topic: "food-feeding",
    title: "Making mealtimes feel calmer",
    description:
      "Small shifts in timing, portions and expectations that take the tension out of the table.",
    readTime: "5 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Toddler mealtimes can quietly become one of the most stressful parts of the day. This piece looks at small, calm shifts that can take some of the pressure out of the table, without strict rules or the sense that every meal has to be perfect. The goal is a gentler rhythm, not a perfect plate.",
    sections: [
      {
        heading: "Why toddler mealtimes can feel hard",
        body: [
          "Toddlers are learning about food, textures, independence and their own preferences all at once. That can make mealtimes unpredictable, even when nothing has really changed at home.",
          "It is also common for parents to feel worried, watched or judged around toddler eating. Noticing that pressure is a useful starting point, because a calmer adult often helps a calmer meal.",
        ],
      },
      {
        heading: "Lowering pressure around food",
        body: [
          "The most consistent thing that seems to help toddler eating over time is lowering the pressure. That includes not commenting on how much is eaten, not bargaining and not turning food into a test.",
          "Offering food, sitting with them and then letting them decide what they eat from what is on their plate is often less exhausting for everyone and tends to lead to steadier eating over months, not days.",
        ],
      },
      {
        heading: "Simple routines that help",
        body: [
          "Regular meal and snack times, spaced through the day, can help toddlers arrive at the table with an appetite rather than being either ravenous or already full from grazing.",
          "You do not need a rigid schedule. A loose rhythm of meals and small snacks, with water available between, is usually enough for most toddlers.",
        ],
      },
      {
        heading: "Sitting together when you can",
        body: [
          "Toddlers often eat better when they see the people around them eating similar food in a calm way. Even a short shared meal a few times a week can help.",
          "It is fine if family meals do not always work. Sitting with your toddler for part of their meal, even with a cup of tea, still gives them the sense that eating is something you do together.",
        ],
      },
      {
        heading: "Managing mess and short attention spans",
        body: [
          "Toddlers often want to get down from the table long before an adult would. A shorter, calmer meal is usually more useful than a long one that ends in tears.",
          "Some mess is part of how they learn about food. A wipeable mat under the chair and simple, easy-to-clean clothes can lower the stress around this without needing to change what is served.",
        ],
      },
      {
        heading: "What to do when food is refused",
        body: [
          "When your toddler refuses food, it usually helps to stay calm, keep the meal short and not offer a completely different meal in its place. You are not being harsh by keeping the offer steady.",
          "You can quietly note what tends to be refused and what is accepted over a week or two, rather than reacting to a single meal. Patterns over time are more useful than the story of any one plate.",
        ],
      },
      {
        heading: "Keeping perspective",
        body: [
          "Most toddlers eat unevenly across a day and across a week. A big lunch may be followed by a tiny tea. That kind of variation is often more normal than worrying.",
          "If mealtimes are becoming very stressful, your toddler is eating a very limited range, growth is a concern or feeding feels difficult to manage, ask your health visitor, GP or appropriate local service for advice.",
        ],
      },
    ],
    keyTakeaways: [
      "Lowering pressure at the table tends to help toddler eating over time.",
      "Loose meal and snack routines usually help more than rigid schedules.",
      "Sitting with your toddler, even briefly, supports calmer eating.",
      "Short meals with some mess are often more useful than long, tense ones.",
      "Stay steady when food is refused, and look at patterns over time.",
      "Ask your health visitor or GP if feeding or growth feels genuinely concerning.",
    ],
    relatedSlugs: [
      "picky-eating-in-toddlers",
      "building-connection-through-everyday-play",
      "simple-play-ideas-for-toddlers",
    ],
    sources: [
      {
        label: "Help your child develop healthy eating habits",
        publisher: "NHS",
        url: "https://www.nhs.uk/healthier-families/food-facts/healthier-family-meals/",
      },
      {
        label: "Toddler meals and eating",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Eating well: the toddler years",
        publisher: "First Steps Nutrition Trust",
        url: "https://www.firststepsnutrition.org/eating-well-early-years",
      },
      {
        label: "Food fact sheet: toddlers",
        publisher: "British Dietetic Association",
        url: "https://www.bda.uk.com/resource/toddlers.html",
      },
    ],
  },

  // Potty learning
  {
    slug: "signs-your-child-may-be-ready-for-potty-training",
    topic: "potty-learning",
    title: "Signs your child may be ready for potty training",
    description:
      "The quiet cues that suggest your toddler might be ready, and why age is only part of the picture.",
    readTime: "5 min read",
    status: "draft",
  },
  {
    slug: "potty-training-without-pressure",
    topic: "potty-learning",
    title: "Potty training without pressure",
    description:
      "A calm, child-led approach to potty learning that leaves room for wobbles and starts.",
    readTime: "6 min read",
    status: "draft",
  },

  // Health and safety
  {
    slug: "toddler-home-safety",
    topic: "health-safety",
    title: "Toddler home safety",
    description:
      "Room-by-room ideas for reducing everyday risks as your toddler grows more curious and mobile.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },
  {
    slug: "when-to-call-the-gp",
    topic: "health-safety",
    title: "When to call the GP",
    description:
      "Everyday illness signs, when to seek advice and how to trust your instinct without second-guessing it.",
    readTime: "5 min read",
    medicallyReviewed: true,
    status: "draft",
  },

  // Play and connection
  {
    slug: "simple-play-ideas-for-toddlers",
    topic: "play-connection",
    title: "Simple play ideas for toddlers",
    description:
      "Low-effort, high-connection play ideas that suit real life and short attention spans.",
    readTime: "5 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Toddlers do not need a cupboard of clever toys or a perfectly planned day. Most of what they need is you, a few safe things to explore and small pockets of time. This piece pulls together simple play ideas that fit into real life, with short attention spans, tired parents and busy days in mind.",
    sections: [
      {
        heading: "Why simple play matters",
        body: [
          "Play is how toddlers learn about their body, the people around them and how the world works. It does not have to look impressive to be doing that quiet, important work.",
          "Short, repeated moments of simple play often support learning and connection more than long, elaborate activities that leave everyone worn out.",
        ],
      },
      {
        heading: "Everyday objects and safe exploring",
        body: [
          "A wooden spoon and a pan, empty boxes, pegs in a bowl or a set of plastic cups can hold a toddler's attention as well as most toys. Familiar objects invite curiosity without over-stimulating.",
          "You can keep a small basket of safe household items your toddler is allowed to explore, so play can start without you having to fetch anything or set anything up.",
        ],
      },
      {
        heading: "Movement play at home and outside",
        body: [
          "Toddlers need to move often. Simple movement games such as walking on cushions, crawling under a blanket tunnel or dancing to one song give them a way to use their bodies indoors on tricky days.",
          "Outside, small walks with time to stop and look at leaves, cracks in the pavement or a passing dog often do more for a toddler than trying to reach a particular destination on time.",
        ],
      },
      {
        heading: "Imagination and pretend play",
        body: [
          "Pretend play often starts quietly, with a toddler stirring a pretend cup of tea or putting a teddy to bed. You do not have to lead it. Sitting nearby and joining when invited is usually enough.",
          "You can support it gently by copying what they do, offering a simple prop or asking a slow open question about what is happening in their story.",
        ],
      },
      {
        heading: "Music, rhythm and repeated games",
        body: [
          "Songs, rhymes and simple rhythm games support language and connection at the same time. Toddlers often love hearing the same song many times, which is part of how they learn.",
          "Familiar hand games and repeated songs also give you something to reach for when a moment is hard, such as a nappy change, a shoe fight or a wait at the bus stop.",
        ],
      },
      {
        heading: "Play when you have very little time",
        body: [
          "Play does not need a big block of time. Two or three minutes of full attention, without a phone in your hand, can matter more to a toddler than half an hour of half-there presence.",
          "You can slot small play moments into things you are already doing, such as counting stairs, naming colours in the kitchen or making a silly voice for a soft toy while you fold laundry.",
        ],
      },
      {
        heading: "Following your toddler's lead",
        body: [
          "Toddlers often show you what they want to play through what they pick up, look at or return to. Following that lead, even when it feels random or repetitive, helps them feel seen.",
          "It is fine to gently steer play for safety or timing, but starting from what your toddler is already interested in usually goes further than trying to introduce a brand new activity.",
        ],
      },
    ],
    keyTakeaways: [
      "Simple, short play often supports learning better than elaborate activities.",
      "Everyday household objects can hold a toddler's attention.",
      "Movement play helps toddlers regulate on tricky days.",
      "Songs and repeated games support language and calm at the same time.",
      "Small moments of full attention matter more than long, distracted stretches.",
      "Following your toddler's lead helps them feel taken seriously.",
    ],
    relatedSlugs: [
      "building-connection-through-everyday-play",
      "making-mealtimes-feel-calmer",
      "picky-eating-in-toddlers",
    ],
    sources: [
      {
        label: "Play ideas and learning through play",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/learning-to-play/",
      },
      {
        label: "Activity ideas for toddlers",
        publisher: "BBC Tiny Happy People",
        url: "https://www.bbc.co.uk/tiny-happy-people/activities",
      },
      {
        label: "The value of play",
        publisher: "Play Scotland",
        url: "https://www.playscotland.org/play/",
      },
    ],
  },
  {
    slug: "building-connection-through-everyday-play",
    topic: "play-connection",
    title: "Building connection through everyday play",
    description:
      "Why the smallest moments of play do the biggest work in your child's sense of safety and belonging.",
    readTime: "5 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Connection with a toddler is rarely built through big planned activities. It grows in the small, repeated moments of play that happen while you are getting through the day. This piece is a gentle look at how ordinary play helps your toddler feel safe, seen and close to you, without turning play into another thing to get right.",
    sections: [
      {
        heading: "Connection does not need perfect play",
        body: [
          "Toddlers do not need elaborate activities to feel loved. What they take in most is your presence, your voice and the sense that you are with them, even for a few minutes at a time.",
          "Play that feels ordinary to you can feel very safe and meaningful to your toddler. Repeating the same simple game, or noticing what they are doing without changing it, is often enough.",
        ],
      },
      {
        heading: "Getting down to their level",
        body: [
          "Sitting or kneeling on the floor with your toddler shifts the feel of play. It puts you in their world, softens the pace and helps them feel that you are joining in rather than watching from above.",
          "You do not have to stay there for long. A few minutes at their level, without a phone or a task, often lands more deeply than a longer session where you are half elsewhere.",
        ],
      },
      {
        heading: "Letting your toddler lead",
        body: [
          "Following your toddler's lead means letting them choose what to play and how it goes, even when their ideas are odd, repetitive or a bit chaotic. You are showing them that their thinking matters.",
          "You can still gently shape play for safety or time, but the direction can come from them. This kind of play supports language, confidence and their sense of being taken seriously.",
        ],
      },
      {
        heading: "Repeated games and shared jokes",
        body: [
          "Small, repeated games become a private language between you. A silly noise you always do, a peekaboo pattern, a walk to the front door that ends in a hug — these grow into shared rituals over time.",
          "These small in-jokes build a feeling of belonging that toddlers carry with them, even when they cannot put it into words.",
        ],
      },
      {
        heading: "Play woven into daily routines",
        body: [
          "You do not have to carve out separate play time to build connection. Getting dressed, walking to the shops, washing hands or tidying up can all become small moments of shared play with tiny tweaks.",
          "A song during nappy changes, a game of naming socks or a slow race to the front door can turn a rushed moment into something warmer, without needing extra time.",
        ],
      },
      {
        heading: "Repairing after hard moments",
        body: [
          "There will be days when patience runs out and play feels far away. Coming back to your toddler afterwards, offering a cuddle or a familiar game, is itself a powerful form of connection.",
          "Toddlers do not need parents who never lose their temper. They benefit from parents who come back, soften and rejoin them once the storm has passed.",
        ],
      },
      {
        heading: "When play feels difficult",
        body: [
          "Some days you will not enjoy play, and that is honest rather than shameful. Tiredness, low mood, or simply not being in a playful headspace are all part of parenting a toddler.",
          "If play often feels impossible, or you find little pleasure in your child over a longer stretch, it can help to speak with your health visitor or GP so you are supported as well.",
        ],
      },
    ],
    keyTakeaways: [
      "Connection grows in small, repeated moments, not perfect activities.",
      "Getting down to your toddler's level changes the feel of play.",
      "Following their lead helps toddlers feel taken seriously.",
      "Ordinary routines can carry small moments of shared play.",
      "Coming back after hard moments is itself connection.",
      "Support is available if play or parenting feels heavy for a long stretch.",
    ],
    relatedSlugs: [
      "simple-play-ideas-for-toddlers",
      "making-mealtimes-feel-calmer",
      "picky-eating-in-toddlers",
    ],
    sources: [
      {
        label: "Bonding with your baby and toddler",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/baby/bonding/",
      },
      {
        label: "Chat, play, read guidance",
        publisher: "BBC Tiny Happy People",
        url: "https://www.bbc.co.uk/tiny-happy-people",
      },
      {
        label: "Building a secure attachment with your child",
        publisher: "NSPCC",
        url: "https://www.nspcc.org.uk/keeping-children-safe/support-for-parents/",
      },
    ],
  },
];

export function getToddlerArticlesByTopic(topic: ToddlerArticleTopic) {
  return toddlerArticles.filter((article) => article.topic === topic);
}

// ─── Placeholder body injection ─────────────────────────────────────────
function withToddlerDefaults(
  article: ToddlerArticle,
  all: ToddlerArticle[]
): ToddlerArticle {
  const sibling = all.find(
    (a) => a.topic === article.topic && a.slug !== article.slug
  );
  return {
    ...article,
    intro:
      article.intro ??
      `This piece on ${article.title.toLowerCase()} is being prepared. The outline below is a placeholder while the full guidance is written and reviewed.`,
    sections: article.sections ?? [
      {
        heading: "What this will cover",
        body: [
          `A calm, practical look at ${article.title.toLowerCase()} in the toddler years, written for real days rather than perfect ones.`,
          "This section is a placeholder while the full article is being written.",
        ],
      },
      {
        heading: "What often helps",
        body: [
          "Small, everyday shifts you can try without turning toddler life into a project.",
        ],
      },
      {
        heading: "When to seek support",
        body: [
          "Signs it may be worth a chat with your health visitor or GP.",
        ],
      },
    ],
    keyTakeaways: article.keyTakeaways ?? [
      "Toddlers rarely move in tidy, linear ways.",
      "Calm repetition tends to work better than sudden change.",
      "Ask for support early rather than second-guessing yourself.",
    ],
    relatedSlugs:
      article.relatedSlugs ?? (sibling ? [sibling.slug] : undefined),
    lastUpdated:
      article.lastUpdated ?? (article.medicallyReviewed ? "2026-07" : undefined),
    reviewedBy:
      article.reviewedBy ??
      (article.medicallyReviewed ? "Jenny Joines" : undefined),
  };
}

export const toddlerArticles: ToddlerArticle[] = rawToddlerArticles.map((a) =>
  withToddlerDefaults(a, rawToddlerArticles)
);
