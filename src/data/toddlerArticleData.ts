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
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Toddler development is broad, uneven and rarely tidy. Some weeks bring a burst of new words or skills, and others feel like a plateau where very little seems to change. This piece is a calm look at how toddler development can show up across movement, communication, play, independence and feelings, without turning it into a strict checklist.",
    sections: [
      {
        heading: "Toddler development is broad",
        body: [
          "Toddler development covers a wide range of skills that grow together, including movement, understanding, speech, play, independence and emotional awareness. Progress in one area can pause while another is quietly growing.",
          "Two toddlers of the same age can look very different and both be developing well. Ranges given in guidance are usually wide on purpose, because normal development varies from child to child.",
        ],
      },
      {
        heading: "Movement and physical confidence",
        body: [
          "In the toddler years, walking usually becomes steadier, and running, climbing, kicking and simple jumping start to appear over time. Fine movements such as holding a spoon, turning pages or stacking blocks also develop gradually.",
          "It helps to give toddlers space and time to practise, rather than expecting new skills on demand. Confidence in movement often grows through everyday play, not through structured activities.",
        ],
      },
      {
        heading: "Speech, understanding and communication",
        body: [
          "Understanding usually comes before speaking. Many toddlers can follow simple requests and point to familiar things well before they use lots of words themselves.",
          "Vocabulary can grow in bursts, with quiet stretches in between. Gestures, sounds, pointing and short phrases are all part of how toddlers communicate as language builds.",
        ],
      },
      {
        heading: "Play, curiosity and problem solving",
        body: [
          "Play is one of the clearest windows into toddler development. Sorting, stacking, posting objects, pretend cooking and simple role play all show growing thinking and problem-solving skills.",
          "Toddlers often repeat the same play over and over. That repetition is part of how they learn, even when it can feel a little slow or samey to the adult beside them.",
        ],
      },
      {
        heading: "Independence and everyday skills",
        body: [
          "Small everyday skills, such as attempting to feed themselves, helping with dressing or carrying a cup, are all part of toddler development. Progress is usually messy before it becomes smooth.",
          "It often helps to allow a little more time in daily routines so your toddler can try things themselves. Independence tends to grow when there is space to have a go without being rushed.",
        ],
      },
      {
        heading: "Emotions and social development",
        body: [
          "Big feelings are a normal part of toddlerhood. Toddlers are still learning what emotions are and how to manage them, so meltdowns, clinginess and sudden mood shifts are common.",
          "Social skills, such as playing near other children, taking turns and noticing others' feelings, build slowly across the toddler years. Steady, calm adults nearby matter more than any particular activity.",
        ],
      },
      {
        heading: "Watching patterns over time",
        body: [
          "One quiet week or one big leap does not tell you much on its own. Development is easier to see when you look at patterns across weeks and months, rather than from one day to the next.",
          "If something about your toddler's development keeps sitting uneasily with you, it is always fine to talk it through with your health visitor or GP. Your steady sense of your child matters.",
        ],
      },
    ],
    keyTakeaways: [
      "Toddler development is broad and rarely moves at the same pace in every area.",
      "Understanding usually grows before spoken language.",
      "Play is one of the clearest signs of thinking and problem solving.",
      "Independence often looks messy before it looks skilful.",
      "Big feelings and social wobbles are a normal part of this stage.",
      "Patterns over weeks and months tell you more than any single day.",
    ],
    relatedSlugs: [
      "when-milestones-feel-different",
      "simple-play-ideas-for-toddlers",
      "building-connection-through-everyday-play",
    ],
    sources: [
      {
        label: "Toddler development",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Learning to talk: 1 to 2 years",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/play-and-learning/learning-to-talk/",
      },
      {
        label: "Tiny Happy People",
        publisher: "BBC",
        url: "https://www.bbc.co.uk/tiny-happy-people",
      },
    ],
  },
  {
    slug: "when-milestones-feel-different",
    topic: "development-milestones",
    title: "When milestones feel different",
    description:
      "Why children rarely develop on the same timeline, and when a chat with your health visitor can help.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "It can be unsettling when your toddler's development starts to feel different from other children the same age. This piece is written for parents who have that quiet sense that something is not quite lining up. It does not diagnose or predict anything. It offers a calm way to think about what you are seeing and when a conversation with a professional can help.",
    sections: [
      {
        heading: "Why milestones can feel different",
        body: [
          "Toddler development happens across many areas at once. Some children move quickly through one area and slowly through another, and each child's pattern is their own.",
          "Feeling that something is different does not automatically mean something is wrong. It is worth taking seriously without treating it as a conclusion.",
        ],
      },
      {
        heading: "Uneven development is common",
        body: [
          "It is normal for toddlers to be ahead in one area and behind in another. A child with lots of words may take longer with movement, and a very physical toddler may talk later.",
          "Bursts and plateaus are part of the picture. A quiet stretch does not always mean something has stalled, and a leap forward does not always mean the pace will continue.",
        ],
      },
      {
        heading: "Looking at patterns, not one moment",
        body: [
          "Any single day can look uneven, especially when your toddler is tired, unwell, teething or going through a change at home. One tricky moment is rarely the whole story.",
          "Watching for patterns across a few weeks is usually more useful than reacting to a single day. It also gives you something clearer to describe if you do speak to a professional.",
        ],
      },
      {
        heading: "Comparing with other children",
        body: [
          "Comparisons happen naturally at toddler groups, in the family and on social media. They can be helpful sometimes, and they can also quietly increase worry when they are not the full picture.",
          "Other children's ages, sleep, home life and personalities all shape what you see. What you notice in a ten minute play session is only a small window into their week.",
        ],
      },
      {
        heading: "Trusting your concern without panic",
        body: [
          "You know your toddler in a way no chart or app can. If something is quietly worrying you, that observation is worth respecting rather than dismissing.",
          "Trusting your concern does not mean jumping to a diagnosis or a label. It means being willing to note what you are seeing and, if it keeps sitting with you, to talk it through with someone who can help.",
        ],
      },
      {
        heading: "What to note before asking for advice",
        body: [
          "Before speaking to a health visitor or GP, it can help to jot down what you are noticing. Things such as what your toddler tends to do, what they seem to find hard, and any recent changes are all useful.",
          "You do not need a detailed report. A few short notes about specific examples are usually enough to help a professional understand what is on your mind.",
        ],
      },
      {
        heading: "When to ask for support",
        body: [
          "If you are worried about your toddler's development, speech, movement, behaviour, hearing, vision or interaction, ask your health visitor, GP or appropriate local service for advice.",
          "You are not being over cautious by asking. Early conversations are useful even when everything turns out to be within a normal range, because they give you clearer ground to stand on.",
        ],
      },
    ],
    keyTakeaways: [
      "Uneven development between different areas is common in the toddler years.",
      "Patterns across weeks tell you more than any single day.",
      "Comparisons with other children rarely show the full picture.",
      "Your quiet concern about your child is worth respecting.",
      "Short notes on what you notice can help a health visitor or GP.",
      "Ask for advice if something keeps sitting uneasily with you.",
    ],
    relatedSlugs: [
      "what-toddler-development-can-look-like",
      "simple-play-ideas-for-toddlers",
      "building-connection-through-everyday-play",
    ],
    sources: [
      {
        label: "Toddler development",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Health visitor and reviews",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/height-weight-and-reviews/baby-reviews/",
      },
      {
        label: "Tiny Happy People",
        publisher: "BBC",
        url: "https://www.bbc.co.uk/tiny-happy-people",
      },
      {
        label: "Worried about your child",
        publisher: "NSPCC",
        url: "https://www.nspcc.org.uk/keeping-children-safe/support-for-parents/",
      },
    ],
  },

  // Behaviour and emotions
  {
    slug: "understanding-toddler-tantrums",
    topic: "behaviour-emotions",
    title: "Understanding toddler tantrums",
    description:
      "Why big feelings spill over so intensely at this age, and calm ways to stay steady beside them.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Toddler tantrums can feel loud, sudden and hard to manage, even when nothing seems to have gone wrong. This piece is a calm look at what tantrums often are, what tends to sit behind them and the small, steady things that can help. It is not about fixing tantrums or promising an easier child. It is about understanding what your toddler is going through, so those moments feel a little less lonely.",
    sections: [
      {
        heading: "What tantrums can be about",
        body: [
          "A tantrum is usually a sign that your toddler has run out of the tools they need in that moment. Something has felt too big, too fast or too much, and their small system cannot hold it any longer.",
          "Tantrums are not proof that a toddler is being naughty or trying to manipulate you. They are much more often a signal that a small person is overwhelmed.",
        ],
      },
      {
        heading: "Why toddlers struggle with big feelings",
        body: [
          "The parts of the brain that help with pausing, planning and managing strong emotions are still growing across the toddler years. Toddlers feel a lot and can express very little of it in words.",
          "That gap between what they feel and what they can say often shows up as tantrums, meltdowns or sudden shifts in mood. It is part of normal development, not a failure of parenting.",
        ],
      },
      {
        heading: "Triggers like tiredness, hunger and transitions",
        body: [
          "Tantrums are more likely when your toddler is tired, hungry, overstimulated or moving between activities. A small trigger on top of a busy day can be what tips them over.",
          "Noticing patterns over a week can be more useful than trying to explain any one moment. Small tweaks to nap timing, snacks or how transitions are handled can quietly reduce the number of hard moments.",
        ],
      },
      {
        heading: "Staying close without giving in to every demand",
        body: [
          "Staying nearby, keeping your voice low and letting the feeling move through is often more helpful than trying to talk your toddler out of it. Presence tends to steady them more than words.",
          "Being warm does not mean saying yes to everything. You can hold a kind boundary, such as the biscuit still being for after tea, while still being close and reassuring about the disappointment.",
        ],
      },
      {
        heading: "What helps during a tantrum",
        body: [
          "In the middle of a tantrum, keep your responses simple. A short phrase, a calm face and a steady body nearby usually helps more than long explanations or questions.",
          "Some toddlers want to be held, some need a little space, and some cannot decide from one minute to the next. Following their lead in the moment is usually more useful than a fixed rule.",
        ],
      },
      {
        heading: "What helps after a tantrum",
        body: [
          "Once the peak has passed, most toddlers need reconnection more than a talking-to. A cuddle, a drink of water or a quiet moment together often helps them settle back into themselves.",
          "You do not need to review what happened in detail. A short, gentle acknowledgement, such as saying that felt really big, is usually enough at this age.",
        ],
      },
      {
        heading: "Hitting and biting",
        body: [
          "Hitting, biting and pushing are common in the toddler years, and most young children do it now and then. Toddlers are curious and may not yet understand that biting or pulling hair hurts. It does not mean your child will grow up to be aggressive.",
          "It often shows up when feelings are bigger than words, such as frustration, tiredness or being crowded by other children. Impulse control is still developing, so a toddler cannot be expected to stop themselves reliably, even when they know the rule.",
          "In the moment, keep everyone safe first. Calmly move your toddler away or gently hold their hand, and check on the child who was hurt. A short, clear phrase such as no biting, biting hurts works better than a long explanation or shouting.",
          "Try to respond the same way each time, without shaming, smacking or biting back. Afterwards, help your toddler name the feeling behind it and show them something they can do instead, such as stamping their feet, squeezing a cushion or coming to find you.",
          "If hitting or biting is frequent, is getting worse, or you are seriously concerned about your child's behaviour, talk to your health visitor or GP.",
        ],
      },
      {
        heading: "When behaviour worries you",
        body: [
          "Some hard days are part of toddlerhood. It is worth taking your own instinct seriously if something about your toddler's behaviour is quietly starting to worry you over time.",
          "If your toddler's behaviour changes suddenly, feels extreme, involves regular harm to themselves or others, or you feel unable to manage, ask your health visitor, GP or appropriate local service for advice.",
        ],
      },
    ],
    keyTakeaways: [
      "Tantrums are usually a sign of overwhelm, not bad behaviour.",
      "Toddlers are still learning how to manage strong feelings.",
      "Tiredness, hunger and transitions are common triggers.",
      "Calm presence tends to help more than long explanations.",
      "You can hold a warm boundary and still be kind about the disappointment.",
      "Hitting and biting are common, and calm, consistent responses help more than shame.",
      "Ask your health visitor or GP if behaviour starts to worry you over time.",
    ],
    relatedSlugs: [
      "helping-your-toddler-with-big-feelings",
      "building-connection-through-everyday-play",
      "when-milestones-feel-different",
    ],
    sources: [
      {
        label: "Toddler behaviour and emotions",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Managing your toddler's behaviour",
        publisher: "NSPCC",
        url: "https://www.nspcc.org.uk/keeping-children-safe/support-for-parents/",
      },
      {
        label: "Tiny Happy People",
        publisher: "BBC",
        url: "https://www.bbc.co.uk/tiny-happy-people",
      },
      {
        label: "Temper tantrums (including hitting, biting, kicking and fighting)",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/behaviour/temper-tantrums/",
      },
      {
        label: "Toddler tantrums and behaviour",
        publisher: "Family Lives",
        url: "https://www.familylives.org.uk/advice/early-years-development/behaviour/toddler-tantrums",
      },
    ],
  },
  {
    slug: "helping-your-toddler-with-big-feelings",
    topic: "behaviour-emotions",
    title: "Helping your toddler with big feelings",
    description:
      "Simple, low-pressure ways to help your child name and move through the emotions that overwhelm them.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Big feelings are part of the toddler years. They can arrive quickly, feel huge and pass just as suddenly. This piece is a calm, realistic look at how to help your toddler through those moments, without expecting yourself to be endlessly patient or your child to suddenly become easy. It is about small, steady things that add up over time.",
    sections: [
      {
        heading: "Big feelings are part of toddlerhood",
        body: [
          "Toddlers are new to emotions in a big way. Joy, frustration, disappointment and fear can all show up in the same afternoon, sometimes in the same ten minutes.",
          "This is not something you have to fix. Helping your toddler through big feelings is a slow, everyday practice, not a task with a finish line.",
        ],
      },
      {
        heading: "Naming feelings simply",
        body: [
          "Simple words can help toddlers start to understand what is happening inside them. Short phrases such as you seem sad or that was disappointing are usually more useful than long explanations.",
          "You do not need to name every feeling correctly every time. Even close-enough words help your toddler slowly learn that feelings can be shared and understood.",
        ],
      },
      {
        heading: "Staying close and steady",
        body: [
          "Toddlers often need a calm adult more than a clever response. Sitting nearby, keeping your voice quiet and your body relaxed can be the strongest thing you do in a hard moment.",
          "You do not have to be perfectly calm to help. Doing your best to keep the tone low, even when you feel wobbly yourself, is usually enough.",
        ],
      },
      {
        heading: "Helping without fixing everything",
        body: [
          "Not every feeling needs to be solved. Sometimes a toddler simply needs to have the feeling near you and then move on when it passes.",
          "Trying to talk them out of a feeling or distract every hard moment can quietly send the message that big feelings are not okay. Allowing them to happen safely is part of the help.",
        ],
      },
      {
        heading: "Routines, sleep and hunger",
        body: [
          "Big feelings are much more likely when a toddler is tired, hungry or overstimulated. Steady meals, snacks and sleep windows often do more for emotional regulation than any particular technique.",
          "You do not need a rigid schedule. A loose, familiar rhythm across the day is usually enough to take the edge off the harder moments.",
        ],
      },
      {
        heading: "Repairing after hard moments",
        body: [
          "You are going to have moments where you snap, feel impatient or wish you had responded differently. That is part of being human, not a sign of a bad parent.",
          "Coming back with a short, calm reconnection, such as a cuddle or a simple that was hard, I love you, is usually enough. Repair matters more than perfect calm.",
        ],
      },
      {
        heading: "When to ask for support",
        body: [
          "Most toddlers move through big feelings with time, connection and steady routines. You do not have to hold this on your own if it starts to feel too heavy.",
          "If your toddler's emotions, behaviour, sleep, communication or daily life begin to worry you, ask your health visitor, GP or appropriate local service for advice.",
        ],
      },
    ],
    keyTakeaways: [
      "Big feelings are part of normal toddler development.",
      "Simple, close-enough words help toddlers understand emotions.",
      "Calm presence usually helps more than the perfect sentence.",
      "Not every feeling needs to be fixed or distracted away.",
      "Sleep, food and rhythm quietly support emotional regulation.",
      "Repair after hard moments matters more than staying perfectly calm.",
    ],
    relatedSlugs: [
      "understanding-toddler-tantrums",
      "building-connection-through-everyday-play",
      "toddler-sleep-rhythms",
    ],
    sources: [
      {
        label: "Toddler behaviour and emotions",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Supporting your child's mental health",
        publisher: "NSPCC",
        url: "https://www.nspcc.org.uk/keeping-children-safe/support-for-parents/",
      },
      {
        label: "Tiny Happy People",
        publisher: "BBC",
        url: "https://www.bbc.co.uk/tiny-happy-people",
      },
      {
        label: "Toddler emotions and behaviour",
        publisher: "Family Lives",
        url: "https://www.familylives.org.uk/advice/early-years-development/behaviour/",
      },
    ],
  },

  // Speech and language
  {
    slug: "supporting-toddler-speech-at-home",
    topic: "speech-language",
    title: "Supporting toddler speech at home",
    description:
      "Everyday ways to gently grow your toddler's language, without flashcards or pressure.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Supporting toddler speech at home does not need to feel like teaching. Most of what helps a toddler learn to talk lives inside the ordinary parts of your day, in the way you chat, play, sing and pause together. This piece is a calm look at how everyday moments can quietly support your toddler's communication, without turning speech into a target.",
    sections: [
      {
        heading: "Speech grows through everyday connection",
        body: [
          "Toddlers learn to talk by being talked with, not talked at. Small back-and-forth moments across the day give your toddler the chance to hear language, notice how it works and try it out for themselves.",
          "Face-to-face time, shared attention on something and warm responses to their sounds or words all matter. Connection is often the quiet foundation under language.",
        ],
      },
      {
        heading: "Talking during ordinary routines",
        body: [
          "Getting dressed, making a snack or walking to the shops are all natural chances to talk. Naming what you are doing in short, simple sentences gives your toddler steady exposure to the words that fit their world.",
          "You do not need long explanations. Short phrases like putting on your shoes or pouring the milk, repeated across the week, can carry more useful language than a set activity.",
        ],
      },
      {
        heading: "Following your toddler's interest",
        body: [
          "Toddlers tend to learn words most easily for things they are already paying attention to. If they are watching a bus, talking about that bus is often more helpful than steering them to something else.",
          "Getting down to their level, noticing what they are looking at and gently putting words to it can support language without pressure.",
        ],
      },
      {
        heading: "Repeating and expanding without pressure",
        body: [
          "When your toddler says a word or a sound, you can repeat it back and add a little. If they say ball, you might say yes, a red ball. That gently shows them how words can grow, without correcting them.",
          "Try to avoid asking them to say things on demand. Feeling watched or tested can make some toddlers say less, not more.",
        ],
      },
      {
        heading: "Songs, books and simple games",
        body: [
          "Songs, nursery rhymes, simple picture books and everyday games such as peekaboo give toddlers repeated, playful exposure to language and sounds.",
          "It does not matter if the same book is read again and again. Repetition helps toddlers predict, join in and slowly start to use the words themselves.",
        ],
      },
      {
        heading: "Giving time to respond",
        body: [
          "Toddlers often need a little longer than adults to find a word. Leaving a small pause after you speak, or after a question, gives them the space to try.",
          "It can help to slow your own pace slightly, use shorter sentences and let quiet moments sit rather than filling every gap.",
        ],
      },
      {
        heading: "When to ask for advice",
        body: [
          "Every toddler follows their own path with speech, and there is a wide range of what can be typical. At the same time, parental instinct is worth taking seriously if something quietly does not feel right.",
          "If you are worried about your toddler's speech, understanding, hearing, interaction or communication, ask your health visitor, GP or appropriate local service for advice.",
        ],
      },
    ],
    keyTakeaways: [
      "Speech grows through everyday connection, not lessons.",
      "Talking through ordinary routines is one of the most useful things you can do.",
      "Following your toddler's interest supports language more than steering them.",
      "Repeating and gently expanding words is more helpful than correcting.",
      "Songs, books and simple games give playful, repeated language exposure.",
      "Ask your health visitor or GP if you are worried about speech or communication.",
    ],
    relatedSlugs: [
      "when-to-ask-about-speech-delay",
      "what-toddler-development-can-look-like",
      "building-connection-through-everyday-play",
    ],
    sources: [
      {
        label: "Help your baby learn to talk",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/baby/learning-to-talk/",
      },
      {
        label: "Speech and language milestones",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/play-and-learning/help-your-baby-learn-to-talk/",
      },
      {
        label: "Tiny Happy People",
        publisher: "BBC",
        url: "https://www.bbc.co.uk/tiny-happy-people",
      },
      {
        label: "Talking Point: ages and stages",
        publisher: "Speech and Language UK",
        url: "https://speechandlanguage.org.uk/talking-point/",
      },
    ],
  },
  {
    slug: "when-to-ask-about-speech-delay",
    topic: "speech-language",
    title: "When to ask about speech delay",
    description:
      "Signs it's worth a conversation with your health visitor or GP about your toddler's speech.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Worries about toddler speech are common, and they are often carried quietly for weeks or months before parents mention them. This piece is a calm look at how to think about those worries, what to notice and where to go for advice. It is not a checklist and it is not a diagnosis. It is a gentle reminder that asking early is allowed.",
    sections: [
      {
        heading: "Why speech can worry parents",
        body: [
          "Speech is one of the most visible parts of toddler development, and it is easy to compare with other children of the same age. That comparison can bring worry, even when nothing is clearly wrong.",
          "Worry does not mean something is definitely the matter. It usually means it is worth paying attention and, if the feeling persists, asking someone for advice.",
        ],
      },
      {
        heading: "Speech, understanding and communication",
        body: [
          "Speech is only one part of communication. Understanding what is said, using gestures, pointing, showing you things and responding to their name all matter too.",
          "Sometimes toddlers who are not saying many words are still communicating well in other ways, and sometimes they are not. Looking at the wider picture is more useful than focusing only on word count.",
        ],
      },
      {
        heading: "Hearing and interaction",
        body: [
          "Hearing plays a big role in speech and language development. Frequent ear infections, glue ear or a sense that your toddler is not hearing well are all reasons to ask for advice.",
          "How your toddler interacts, shares attention, responds to their name or takes turns in play can also give useful information alongside speech.",
        ],
      },
      {
        heading: "Looking at patterns over time",
        body: [
          "A single quiet week or a phase where a toddler says less is common. A pattern over weeks or months, where speech, understanding or interaction feels stuck or is going backwards, is worth taking more seriously.",
          "Trusting your own sense of your child over time often matters more than any one moment or comparison.",
        ],
      },
      {
        heading: "What to note before asking for advice",
        body: [
          "Before speaking to someone, it can help to jot down what you have noticed, how long you have noticed it and any changes over time. Include understanding, gestures, hearing and interaction, not only spoken words.",
          "You do not need to arrive with a full report. A few honest notes can help the conversation feel less rushed and more useful.",
        ],
      },
      {
        heading: "Who you can speak to",
        body: [
          "Your health visitor and GP are usually good first points of contact. They can talk things through with you, offer reassurance where appropriate and refer on if needed.",
          "In some areas, you may be able to contact a local speech and language service directly, or find self-referral routes through NHS services. Your health visitor can usually point you to what is available locally.",
        ],
      },
      {
        heading: "Asking early is allowed",
        body: [
          "You do not need to be sure something is wrong before asking. Early conversations often lead to reassurance, and sometimes to earlier support, both of which are useful.",
          "If you are worried about your toddler's speech, understanding, hearing, interaction, behaviour or development, ask your health visitor, GP or appropriate local service for advice.",
        ],
      },
    ],
    keyTakeaways: [
      "Worry alone does not mean something is wrong, but it is worth paying attention.",
      "Communication includes understanding, gestures and interaction, not only words.",
      "Hearing plays a real role in speech and language development.",
      "Patterns over weeks matter more than any single quiet moment.",
      "A few honest notes can make asking for advice feel easier.",
      "Asking your health visitor or GP early is always allowed.",
    ],
    relatedSlugs: [
      "supporting-toddler-speech-at-home",
      "when-milestones-feel-different",
      "what-toddler-development-can-look-like",
    ],
    sources: [
      {
        label: "Speech and language therapy",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/speech-and-language-therapy/",
      },
      {
        label: "Help your baby learn to talk",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/baby/learning-to-talk/",
      },
      {
        label: "Information for parents and carers",
        publisher: "Royal College of Speech and Language Therapists",
        url: "https://www.rcslt.org/speech-and-language-therapy/",
      },
      {
        label: "Talking Point: progress checker",
        publisher: "Speech and Language UK",
        url: "https://speechandlanguage.org.uk/talking-point/progress-checker/",
      },
      {
        label: "Tiny Happy People",
        publisher: "BBC",
        url: "https://www.bbc.co.uk/tiny-happy-people",
      },
    ],
  },


  // Sleep
  {
    slug: "toddler-sleep-rhythms",
    topic: "sleep",
    title: "Toddler sleep rhythms",
    description:
      "How toddler sleep quietly shifts across the second and third year, and what's usually behind wobbly weeks.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Toddler sleep is rarely linear. Nights that felt settled can suddenly feel unpredictable, and naps can shift without much warning. This piece is a calm look at how toddler sleep rhythms change, what tends to sit behind wobbly weeks and where the small, gentle steadying things usually live. It does not promise a fix and it does not lean on strict sleep methods.",
    sections: [
      {
        heading: "Why toddler sleep can change",
        body: [
          "Toddler sleep is shaped by many things at once. Development, new skills, changes at home, illness, teething and everyday overwhelm can all show up in the night without you noticing them in the day.",
          "A wobbly stretch does not mean you have done something wrong. It usually means something has shifted, even if it is quiet, and your toddler is working through it in the way toddlers often do, at night.",
        ],
      },
      {
        heading: "Naps and daily rhythm",
        body: [
          "Naps change across the toddler years. Many toddlers move from two naps to one, and later drop the daytime nap altogether. This transition rarely happens on a neat date and can be uneven for weeks.",
          "The rhythm of the day matters more than a strict schedule. Time outside, active play, quieter windows and predictable meals can all support steadier sleep without needing rigid timings.",
        ],
      },
      {
        heading: "Bedtime cues and wind down",
        body: [
          "A simple, familiar bedtime routine gives toddlers useful cues that sleep is coming. This might be a bath, pyjamas, a short story and a cuddle, in roughly the same order most nights.",
          "The routine does not need to be long or elaborate. A calm, predictable sequence, even a short one, is often more helpful than trying to add lots of steps.",
        ],
      },
      {
        heading: "Separation and needing reassurance",
        body: [
          "Many toddlers go through phases of feeling less sure about being apart at night. Wanting an extra cuddle, asking you to stay a little longer or waking to check you are there is a normal part of this.",
          "Reassurance does not undo good sleep. Meeting your toddler with calm and confidence tends to help them settle again, even when the same wake up happens night after night for a while.",
        ],
      },
      {
        heading: "Early waking and unsettled nights",
        body: [
          "Early waking can be tied to bedtime being too late, naps landing awkwardly, room being too light, or simply a phase your toddler is moving through. It rarely has one clear cause.",
          "Rather than reacting to a single tough night, it is often more useful to notice patterns over a couple of weeks. That view usually shows where a small adjustment might help.",
        ],
      },
      {
        heading: "Keeping routines gentle and realistic",
        body: [
          "Toddler sleep does not need to be perfect to be healthy. Most toddlers will have unsettled patches, especially around big changes, illness or new developmental steps.",
          "A gentle routine, calm responses and realistic expectations often carry more weight than a specific method. What steadies your toddler over time is usually consistency, not intensity.",
        ],
      },
      {
        heading: "When to ask for support",
        body: [
          "If your toddler's sleep changes suddenly, they seem unwell, breathing worries you, or lack of sleep is making daily life hard to manage, ask your health visitor, GP or appropriate local service for advice.",
          "You do not have to wait until things feel serious. It is fine to talk sleep through with someone who can help, especially if it is affecting how you feel or cope in the day.",
        ],
      },
    ],
    keyTakeaways: [
      "Toddler sleep is often uneven and shaped by lots of things at once.",
      "Naps shift across the toddler years and rarely change on a neat timeline.",
      "A short, predictable wind down usually helps more than a long routine.",
      "Reassurance at night does not undo good sleep.",
      "Patterns over a couple of weeks are more useful than any single night.",
      "Ask your health visitor or GP if sleep is worrying you or affecting daily life.",
    ],
    relatedSlugs: [
      "bedtime-battles-and-night-waking",
      "building-connection-through-everyday-play",
      "what-toddler-development-can-look-like",
    ],
    sources: [
      {
        label: "Sleep and tiredness",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/sleep/",
      },
      {
        label: "Toddler sleep",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Children's sleep hub",
        publisher: "The Sleep Charity",
        url: "https://thesleepcharity.org.uk/information-support/children/",
      },
    ],
  },
  {
    slug: "bedtime-battles-and-night-waking",
    topic: "sleep",
    title: "Bedtime battles and night waking",
    description:
      "Calm approaches to bedtime resistance and night waking, without harsh sleep training.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Bedtime battles and night waking can quietly wear a family down. This piece is written for the exhausted end of the day, when bedtime feels like a fight and the nights feel long. It does not promise a fix, and it does not lean on harsh sleep training. It is a calm look at what tends to sit behind these moments and the small, gentle things that can help.",
    sections: [
      {
        heading: "Why bedtime can become difficult",
        body: [
          "Bedtime is often when the day catches up with a toddler. Tiredness, overstimulation, unfinished feelings and separation can all come out in resistance, silliness or tears at the end of the day.",
          "It rarely helps to see this as bad behaviour. Bedtime pushback is usually less about defiance and more about a small person struggling to switch gears when their body is already tired.",
        ],
      },
      {
        heading: "Toddlers and separation at night",
        body: [
          "Many toddlers go through waves of feeling unsure about being apart at bedtime. Wanting you to stay, asking for one more cuddle or needing you nearby to settle is a normal part of this age.",
          "Meeting separation with calm and warmth does not create a habit that ruins sleep. Steady reassurance tends to help toddlers feel secure enough to settle over time, rather than making things harder.",
        ],
      },
      {
        heading: "Boundaries without harshness",
        body: [
          "Keeping bedtime steady does not mean being strict. You can hold a simple boundary, such as staying in the bedroom or lights being off, while still being warm and patient about it.",
          "Repeating the same short, calm phrase each time you gently reset the boundary can be more useful than long explanations. Toddlers usually respond better to a steady tone than to long words.",
        ],
      },
      {
        heading: "Night waking and reassurance",
        body: [
          "Night waking is very common in the toddler years. It is often linked to development, dreams, small illnesses, thirst, feeling too warm or cold, or simply needing to know you are close.",
          "Going in briefly, staying calm, keeping the light low and using few words often helps more than a big response. Reassurance in the night does not spoil sleep on its own.",
        ],
      },
      {
        heading: "Overtiredness and undertiredness",
        body: [
          "A toddler who is very overtired can find it harder, not easier, to fall asleep. Signs can include being wired, silly, teary or unable to settle even when clearly exhausted.",
          "The opposite can also be true. If nap timing has drifted or the day has been very quiet, some toddlers arrive at bedtime not quite ready for sleep, which can look like resistance too.",
        ],
      },
      {
        heading: "Keeping bedtime realistic",
        body: [
          "There is no single perfect way to do bedtime and no method that works for every family. What tends to help is a simple, familiar routine and calm expectations, night after night.",
          "It also helps to hold expectations lightly. A rough night, a bumpy week or a return of night waking does not undo the routine you have built.",
        ],
      },
      {
        heading: "When sleep feels unmanageable",
        body: [
          "If your toddler's sleep changes suddenly, they seem unwell, breathing worries you, or lack of sleep is making daily life hard to manage, ask your health visitor, GP or appropriate local service for advice.",
          "You do not need to have tried everything before asking for help. Speaking to someone earlier rather than later can make it easier to hold the days when sleep is very hard.",
        ],
      },
    ],
    keyTakeaways: [
      "Bedtime pushback is usually about tiredness and overwhelm, not defiance.",
      "Separation wobbles at night are a normal part of toddlerhood.",
      "You can hold a calm boundary and still be warm about it.",
      "Reassurance in the night does not spoil sleep on its own.",
      "Both overtiredness and undertiredness can make bedtime harder.",
      "Ask for support if sleep is affecting your ability to cope in the day.",
    ],
    relatedSlugs: [
      "toddler-sleep-rhythms",
      "building-connection-through-everyday-play",
      "simple-play-ideas-for-toddlers",
    ],
    sources: [
      {
        label: "Sleep and tiredness",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/sleep/",
      },
      {
        label: "Toddler sleep",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Children's sleep hub",
        publisher: "The Sleep Charity",
        url: "https://thesleepcharity.org.uk/information-support/children/",
      },
    ],
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
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Potty training tends to go more smoothly when it starts from readiness rather than a date on the calendar. This piece is a calm look at the small cues that suggest your toddler might be ready, and why age alone rarely gives you the full picture. It is not a checklist to pass, and it is not about rushing. It is about noticing what your child is quietly showing you.",
    sections: [
      {
        heading: "Readiness is not just age",
        body: [
          "Toddlers become ready for potty training at very different ages. Some children show signs earlier, others take much longer, and both can be entirely typical.",
          "It usually helps to think about readiness as a mix of physical, communication and interest signs, rather than any single moment or age. There is no medal for starting early.",
        ],
      },
      {
        heading: "Staying dry for longer",
        body: [
          "One quiet sign is your toddler staying dry for longer stretches. Nappies that are dry after a nap or dry for a couple of hours can suggest the bladder is starting to hold on a bit.",
          "This on its own does not mean it is time to start. It is one small signal to notice alongside the others.",
        ],
      },
      {
        heading: "Awareness of wees and poos",
        body: [
          "Many toddlers start to notice when they are weeing or pooing, or right after. They might pause, look down, tell you or go quiet in a corner.",
          "That awareness is a helpful sign that a link is forming between the feeling in their body and what is happening. It usually comes before being able to hold on.",
        ],
      },
      {
        heading: "Interest in the toilet or potty",
        body: [
          "Toddlers often become curious about the toilet, wanting to watch, flush or sit on it fully clothed. Interest in a potty at home can look similar.",
          "You can gently follow that curiosity without turning it into a training moment. Letting them explore the potty or toilet calmly is often enough at this stage.",
        ],
      },
      {
        heading: "Following simple instructions",
        body: [
          "Being able to follow short, simple instructions, such as come and sit down or pull your trousers up, is helpful when potty training starts. It is not a test, but it does make things easier.",
          "If your toddler is still very much in the middle of language leaps, it can help to give them a little more time before pushing potty training forward.",
        ],
      },
      {
        heading: "Emotional readiness and cooperation",
        body: [
          "Potty training tends to go better when your toddler is generally cooperative around simple everyday tasks. If they are in a very no-heavy phase, or a lot has just changed at home, it can help to wait.",
          "You do not need perfect behaviour to start. A generally settled, willing child, in a fairly steady week, is usually enough.",
        ],
      },
      {
        heading: "Starting gently",
        body: [
          "When you do start, keeping it low key often helps most. Introduce the potty in a normal way, offer it at natural moments and let your toddler have some say in how it goes.",
          "You can pause at any point. Stopping and coming back to it a few weeks later is a normal part of potty learning, not a failure.",
        ],
      },
    ],
    keyTakeaways: [
      "Readiness is a mix of physical, communication and interest signs.",
      "Age on its own does not decide when potty training should start.",
      "Longer dry stretches and body awareness are early quiet signs.",
      "Curiosity about the potty or toilet is worth following gently.",
      "Following simple instructions and general cooperation help a lot.",
      "It is fine to pause and try again later if things feel too hard.",
    ],
    relatedSlugs: [
      "potty-training-without-pressure",
      "what-toddler-development-can-look-like",
      "making-mealtimes-feel-calmer",
    ],
    sources: [
      {
        label: "Potty training tips",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/potty-training-and-bedwetting/how-to-potty-train/",
      },
      {
        label: "Toddler potty training",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Potty training and toilet training advice",
        publisher: "ERIC",
        url: "https://eric.org.uk/potty-training/",
      },
      {
        label: "Potty training your child",
        publisher: "Family Lives",
        url: "https://www.familylives.org.uk/advice/early-years-development/behaviour/potty-training",
      },
    ],
  },
  {
    slug: "potty-training-without-pressure",
    topic: "potty-learning",
    title: "Potty training without pressure",
    description:
      "A calm, child-led approach to potty learning that leaves room for wobbles and starts.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Potty training can quietly become one of the more stressful stretches of the toddler years. This piece is a calm look at how to keep it low pressure, without strict methods or a fixed timeline. It is not about promising a quick fix, and it is not about doing it perfectly. It is about supporting your child through a learning process that is often messier than any book makes it sound.",
    sections: [
      {
        heading: "Why pressure can make potty training harder",
        body: [
          "Toddlers pick up on tension very quickly. When potty training becomes a source of stress at home, many children start to hold on, refuse to sit or get more anxious about using the toilet.",
          "Keeping the tone low key, even when it is going slowly, is usually more helpful than trying to push things forward through pressure or promises.",
        ],
      },
      {
        heading: "Creating a simple routine",
        body: [
          "A loose routine of trying the potty at natural moments, such as after meals or before leaving the house, can help your toddler build a small rhythm without feeling watched.",
          "It usually helps to offer the potty rather than insist on it. A calm come and try, without a big reaction either way, tends to work better than a firm demand.",
        ],
      },
      {
        heading: "Keeping language calm",
        body: [
          "The words you use around wees, poos and the potty matter. Simple, everyday language keeps it feeling normal, rather than something to be embarrassed or worried about.",
          "Praise can help, but a very big response to every success can also make some toddlers feel watched. A warm, low-key well done is usually enough.",
        ],
      },
      {
        heading: "Handling accidents without shame",
        body: [
          "Accidents are part of potty learning. Even children who have been dry for weeks can suddenly have days of accidents, especially if they are tired, unwell, or in a new setting.",
          "It usually helps to clean up calmly, without a big reaction. A short phrase such as never mind, we will try again is usually all your toddler needs to hear.",
        ],
      },
      {
        heading: "Pausing if your child is not ready",
        body: [
          "If potty training is going badly for more than a couple of weeks and everyone is getting upset, it is usually a sign to pause. Stopping is not failing.",
          "Coming back to it in a few weeks or months, when things feel calmer, often leads to much smoother progress than pushing through.",
        ],
      },
      {
        heading: "When your child holds on to poo or wee",
        body: [
          "Some children start holding on during potty learning. Constipation is common at this age, and feeling pressured, being regularly interrupted while trying, or feeling worried about a change such as a new baby or starting nursery can all play a part.",
          "If pooing has hurt before, a child may not want to try again. This can become a vicious circle, because the more they hold back, the more constipated they can get.",
          "Keeping things calm matters more than ever here. Try not to add pressure. A relaxed routine of sitting on the potty or toilet after meals or before bed, with praise whether or not anything happens, and feet resting flat on the floor or a step, can help.",
          "Signs of constipation can include fewer than three poos in a week, or poo that is large, hard or like small pellets. If you think your child may be constipated, see a GP. It is better to get help early rather than wait.",
        ],
      },
      {
        heading: "Nursery, childcare and days out",
        body: [
          "Talking to nursery or childcare about how they support potty learning can help everything feel more consistent. A short chat about language, timing and how to handle accidents is usually enough.",
          "For days out, taking a small bag with spare clothes, wipes and a change mat can lower the stress. Expect a step back on unfamiliar days, and try not to read too much into it.",
        ],
      },
      {
        heading: "When to ask for advice",
        body: [
          "Most children get there in time with steady, low-pressure support. Slow starts, wobbles and phases of regression are usually part of learning, not a sign that something is wrong.",
          "If your child seems in pain, is constipated, has repeated accidents after being dry, avoids weeing or pooing, or you are worried about toilet training, ask your health visitor, GP or appropriate local service for advice.",
        ],
      },
    ],
    keyTakeaways: [
      "Pressure tends to slow potty training down rather than speed it up.",
      "A loose, low-key routine usually works better than strict timing.",
      "Simple, calm language keeps wees and poos feeling normal.",
      "Accidents are part of learning and do not need a big reaction.",
      "Pausing and coming back later is a valid part of the process.",
      "Holding on to poo can be linked to pressure or pain, so see a GP early if you think your child is constipated.",
      "Ask your health visitor or GP if you are worried or things feel stuck.",
    ],
    relatedSlugs: [
      "signs-your-child-may-be-ready-for-potty-training",
      "helping-your-toddler-with-big-feelings",
      "making-mealtimes-feel-calmer",
    ],
    sources: [
      {
        label: "How to potty train",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/babys-development/potty-training-and-bedwetting/how-to-potty-train/",
      },
      {
        label: "Toddler potty training",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Constipation in children",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/health/constipation-in-children/",
      },
      {
        label: "Potty training and toilet training advice",
        publisher: "ERIC",
        url: "https://eric.org.uk/potty-training/",
      },
      {
        label: "Potty training your child",
        publisher: "Family Lives",
        url: "https://www.familylives.org.uk/advice/early-years-development/behaviour/potty-training",
      },
    ],
  },

  // Health and safety
  {
    slug: "toddler-home-safety",
    topic: "health-safety",
    title: "Toddler home safety",
    description:
      "Room-by-room ideas for reducing everyday risks as your toddler grows more curious and mobile.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Toddler home safety is not about creating a perfect home. It is about noticing that toddlers are quicker, more curious and more capable than they were a few months ago, and quietly adjusting the space around them. This piece is a calm look at some of the areas that most often need a fresh look, without turning your home into a list of hazards.",
    sections: [
      {
        heading: "Why toddler safety changes quickly",
        body: [
          "Toddlers can climb, reach and open things they could not manage even a few weeks earlier. Something that felt out of reach on Monday can be within reach by the weekend.",
          "It helps to check the spaces your toddler uses most every so often, rather than assuming the setup from a few months ago still works.",
        ],
      },
      {
        heading: "Falls, stairs and climbing",
        body: [
          "Falls are one of the most common causes of everyday injury at this age. Stair gates at the top and bottom of stairs, and support while your toddler learns to use them, can quietly reduce risk.",
          "Toddlers often try to climb furniture, so securing heavy items such as bookcases, drawers and televisions to the wall is one of the calmest ways to protect them.",
        ],
      },
      {
        heading: "Hot drinks, cooking and burns",
        body: [
          "Hot drinks can still burn a toddler many minutes after being made. Keeping them well away from the edges of tables and worktops, and out of reach of small hands, matters more than it might seem.",
          "In the kitchen, turning pan handles inwards and keeping toddlers out of the cooking area while food is being prepared can help reduce the risk of burns and scalds.",
        ],
      },
      {
        heading: "Small objects, choking and batteries",
        body: [
          "Toddlers explore with their mouths, so small objects, coins, magnets and pieces of older siblings' toys can all be a risk. A quick daily glance at the floor and low surfaces is often enough.",
          "Button batteries and small magnets are worth being particularly careful with, because they can cause serious harm if swallowed. Keeping them stored out of reach and checking devices are secure is worthwhile.",
        ],
      },
      {
        heading: "Food and choking",
        body: [
          "Choking in young children most often happens while they are playing or eating. Staying with your toddler whenever they eat, and having them sit down for meals and snacks, helps you notice quickly if something goes wrong.",
          "How food is prepared matters too. Cut small, round foods such as grapes and cherry tomatoes into quarters, and remove hard pips, stones and bones. Whole nuts should not be given to children under 5 years old, though crushed or ground nuts, or nut butter spread onto toast, can be offered.",
          "If your toddler is coughing loudly, encourage them to keep coughing and stay with them. If the coughing is silent, or they cannot breathe in properly, shout for help straight away.",
          "The NHS guide on how to stop a child from choking sets out exactly what to do next, including when to call 999. It is worth reading it calmly now, before you ever need it, and a first aid course can build confidence.",
        ],
      },
      {
        heading: "Medicines and cleaning products",
        body: [
          "Medicines, vitamins, cleaning products and laundry capsules are safest stored high up, out of sight and in their original packaging. Child-resistant does not mean child-proof.",
          "It helps to put things away straight after use, rather than leaving them on a low surface for later, when it is easy to be distracted.",
        ],
      },
      {
        heading: "Water, doors and windows",
        body: [
          "Toddlers can slip quickly in the bath, so staying with them the whole time and keeping bath water at a safe warm temperature is important. Never leave a toddler alone near water, even briefly.",
          "Window restrictors, safety catches and being mindful of blind cords can quietly reduce risks in bedrooms and living spaces, especially as toddlers start to climb.",
        ],
      },
      {
        heading: "Building simple safety habits",
        body: [
          "Rather than trying to remove every possible risk in one go, it often helps to build a few steady habits, such as always closing the stair gate, always putting the kettle back or always tucking cords away.",
          "If something has worried you, or an accident has happened, it is okay to ask your health visitor, GP or appropriate local service for advice about what to look at next.",
        ],
      },
    ],
    keyTakeaways: [
      "Toddler capability changes quickly, so setups need refreshing over time.",
      "Falls and climbing are common risks worth thinking about early.",
      "Hot drinks, cooking areas and small objects need everyday attention.",
      "Stay with your toddler while they eat, and quarter small round foods like grapes.",
      "Medicines and cleaning products are safest stored high and out of sight.",
      "Never leave a toddler alone near water, even for a moment.",
      "Steady safety habits often protect more than one-off tidying blitzes.",
    ],
    relatedSlugs: [
      "when-to-call-the-gp",
      "what-toddler-development-can-look-like",
      "potty-training-without-pressure",
    ],
    sources: [
      {
        label: "Safety at home",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Home safety advice for families",
        publisher: "Child Accident Prevention Trust",
        url: "https://capt.org.uk/preventing-accidents/",
      },
      {
        label: "Home safety",
        publisher: "RoSPA",
        url: "https://www.rospa.com/home-safety",
      },
      {
        label: "How to stop a child from choking",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/first-aid-and-safety/first-aid/how-to-stop-a-child-from-choking/",
      },
      {
        label: "Your baby's first solid foods (preparing food to reduce choking risk)",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/babys-first-solid-foods/",
      },
      {
        label: "Foods to avoid giving babies and young children",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/weaning-and-feeding/foods-to-avoid-giving-babies-and-young-children/",
      },
      {
        label: "Baby and toddler safety",
        publisher: "NHS",
        url: "https://www.nhs.uk/conditions/baby/first-aid-and-safety/safety/baby-and-toddler-safety/",
      },
    ],
  },
  {
    slug: "when-to-call-the-gp",
    topic: "health-safety",
    title: "When to call the GP",
    description:
      "Everyday illness signs, when to seek advice and how to trust your instinct without second-guessing it.",
    readTime: "6 min read",
    status: "ready",
    lastUpdated: "2026-07",
    intro:
      "Deciding whether to call for advice about a poorly toddler can feel harder than it should. Parents often carry the worry quietly, unsure if what they are noticing is enough. This piece is a calm look at how to think about those moments. It is not a symptom checker and it does not set thresholds. It is a reminder that it is always okay to ask.",
    sections: [
      {
        heading: "You do not need to be sure before asking",
        body: [
          "You do not need to have a diagnosis in mind or be able to explain exactly what is wrong. Noticing that something feels different, or feels worse than usual, is reason enough to ask for advice.",
          "GPs, health visitors and NHS 111 are used to parents describing what they are seeing in ordinary words. You do not need medical language to be taken seriously.",
        ],
      },
      {
        heading: "Changes in behaviour, feeding or drinking",
        body: [
          "Sometimes what stands out most is not a specific symptom but that your toddler is not themselves. Being unusually quiet, floppy, unsettled or hard to comfort can all be worth mentioning.",
          "Not drinking as usual over a period of time, or a clear change in wet nappies, is often something worth asking about too.",
        ],
      },
      {
        heading: "Temperature and feeling unwell",
        body: [
          "A raised temperature is common in toddlers and often part of the body fighting off a simple illness. What matters alongside the number is how your toddler seems in themselves.",
          "If a fever is making you uneasy, or your toddler seems very unwell alongside it, it is okay to ask for advice rather than trying to work it out alone.",
        ],
      },
      {
        heading: "Breathing, rashes and pain concerns",
        body: [
          "Anything that changes how your toddler is breathing, a rash that worries you, or pain that seems more than the usual bumps of the day, is worth checking in about.",
          "It can help to describe what you are noticing simply, when it started and whether it is getting better, staying the same or getting worse.",
        ],
      },
      {
        heading: "Accidents, bumps and injuries",
        body: [
          "Bumps and small accidents are part of the toddler years. Most are minor and settle quickly with a cuddle and a calm response.",
          "If you are not sure whether an injury needs checking, or if your toddler seems different after a knock, it is reasonable to ask for advice rather than waiting to see.",
        ],
      },
      {
        heading: "Trusting your judgement",
        body: [
          "You spend more time with your toddler than anyone else. If your instinct is quietly saying something is not right, that instinct is worth listening to.",
          "Nobody is going to be cross with you for asking. Most services would rather hear from a parent early than late.",
        ],
      },
      {
        heading: "Who to contact and what to say",
        body: [
          "Your GP, health visitor and NHS 111 (online or by phone) are usually the right first places to go for non-emergency advice. Some areas also have local children's services you can contact.",
          "If your toddler seems very unwell, symptoms are worsening, breathing worries you, they are not drinking as usual, a rash worries you, they have had an injury, or your instinct says something is not right, ask your GP, NHS 111, health visitor or appropriate local service for advice.",
        ],
      },
    ],
    keyTakeaways: [
      "You do not need to be sure something is wrong before asking for advice.",
      "Changes in behaviour, drinking or nappies are worth noticing.",
      "How your toddler seems in themselves matters as much as any number.",
      "Anything about breathing, rashes or unusual pain is worth checking in about.",
      "Your instinct as a parent is a signal worth listening to.",
      "GP, health visitor and NHS 111 are all reasonable places to start.",
    ],
    relatedSlugs: [
      "toddler-home-safety",
      "when-milestones-feel-different",
      "picky-eating-in-toddlers",
    ],
    sources: [
      {
        label: "When to worry about your child",
        publisher: "NHS",
        url: "https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-go-to-ae/",
      },
      {
        label: "NHS 111 online",
        publisher: "NHS",
        url: "https://111.nhs.uk/",
      },
      {
        label: "Toddler health",
        publisher: "NHS Start for Life",
        url: "https://www.nhs.uk/start-for-life/toddler/",
      },
      {
        label: "Advice for parents and carers",
        publisher: "Healthier Together",
        url: "https://www.what0-18.nhs.uk/",
      },
    ],
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
          "Small, repeated games become a private language between you. A silly noise you always do, a peekaboo pattern, a walk to the front door that ends in a hug. These grow into shared rituals over time.",
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
    // Phase 38C: no reviewer or review-date defaults. Review metadata may only
    // come from genuine article-specific provenance (Phase 33.5 governance).
  };
}

export const toddlerArticles: ToddlerArticle[] = rawToddlerArticles.map((a) =>
  withToddlerDefaults(a, rawToddlerArticles)
);
