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
    status: "draft",
  },
  {
    slug: "making-mealtimes-feel-calmer",
    topic: "food-feeding",
    title: "Making mealtimes feel calmer",
    description:
      "Small shifts in timing, portions and expectations that take the tension out of the table.",
    readTime: "4 min read",
    status: "draft",
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
