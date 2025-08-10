// Real categories used across the site
export const categories = [
  { id: 1, slug: 'technology', name: 'Technology' },
  { id: 2, slug: 'science', name: 'Science' },
  { id: 3, slug: 'health', name: 'Health' },
  { id: 4, slug: 'fitness', name: 'Fitness & Sports' },
  { id: 5, slug: 'personal-finance', name: 'Personal Finance' },
  { id: 6, slug: 'investing', name: 'Investing' },
  { id: 7, slug: 'career', name: 'Career' },
  { id: 8, slug: 'education', name: 'Education' },
  { id: 9, slug: 'parenting', name: 'Parenting' },
  { id: 10, slug: 'relationships', name: 'Relationships' },
  { id: 11, slug: 'travel', name: 'Travel' },
  { id: 12, slug: 'food', name: 'Food & Cooking' },
  { id: 13, slug: 'home-diy', name: 'Home & DIY' },
  { id: 14, slug: 'pets', name: 'Pets' },
  { id: 15, slug: 'entertainment', name: 'Entertainment' },
  { id: 16, slug: 'gaming', name: 'Gaming' },
  { id: 17, slug: 'outdoors', name: 'Outdoors' },
  { id: 18, slug: 'history', name: 'History' },
  { id: 19, slug: 'news-politics', name: 'News & Politics' },
  { id: 20, slug: 'art-design', name: 'Art & Design' },
  { id: 21, slug: 'fashion', name: 'Fashion & Beauty' },
  { id: 22, slug: 'language', name: 'Language Learning' },
  { id: 23, slug: 'productivity', name: 'Productivity' },
  { id: 24, slug: 'real-estate', name: 'Real Estate' },
  { id: 25, slug: 'technology-programming', name: 'Programming' },
];

// Seeded RNG for reproducible builds
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(20250809);
const randInt = (min, max) => Math.floor(rng() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(rng() * arr.length)];
const slugify = (s) => s
  .toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '')
  .trim()
  .replace(/\s+/g, '-');
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

// Date generation for answers - between now and 6 months ago
const generateAnswerDate = (questionDate, answerIndex = 0) => {
  const now = new Date('2025-08-09T23:52:33-07:00');
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
  const questionDateTime = new Date(questionDate);
  const minTime = Math.max(questionDateTime.getTime() + (1000 * 60 * 60), sixMonthsAgo.getTime()); // At least 1 hour after question
  const maxTime = now.getTime();
  
  // Add some randomness based on answer index to spread them out
  const timeRange = maxTime - minTime;
  const randomOffset = rng() * timeRange;
  const answerTime = minTime + randomOffset + (answerIndex * 1000 * 60 * 30); // 30 min spacing between answers
  
  return new Date(Math.min(answerTime, maxTime)).toISOString();
};

// Local cache for generated dates
const getDateCache = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const cached = localStorage.getItem('heardirectclub_answer_dates');
    return cached ? JSON.parse(cached) : {};
  }
  return {};
};

const setDateCache = (cache) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('heardirectclub_answer_dates', JSON.stringify(cache));
  }
};

const getCachedAnswerDate = (answerId, questionDate, answerIndex) => {
  const cache = getDateCache();
  if (cache[answerId]) {
    return cache[answerId];
  }
  
  // Generate new date and cache it
  const newDate = generateAnswerDate(questionDate, answerIndex);
  cache[answerId] = newDate;
  setDateCache(cache);
  return newDate;
};

// Ensure unique slugs
const usedSlugs = new Set();
function uniqueSlug(base) {
  let s = base;
  let i = 2;
  while (usedSlugs.has(s)) {
    s = `${base}-${i++}`;
  }
  usedSlugs.add(s);
  return s;
}

// Author pool: mixture of first names, first name last name, and first name last initial
const authorNames = [
  'Maya Patel', 'Luca', 'Sarah', 'Sara N', 'David', 'Priya Singh',
  'Tom', 'Dan', 'Jessica', 'Mike', 'Lisa', 'Eric',
  'Jennifer', 'Jane', 'Kevin', 'Mark', 'Amy', 'Paul',
  'Rachel', 'Steve', 'Anna', 'Chris', 'Maria', 'Lee F',
  'Kate', 'Ryan', 'Nina', 'Alex', 'Grace', 'John'
];

// Topic templates per category
const topicTemplates = {
  technology: [
    'Is it worth upgrading to Wi‑Fi 7 at home?',
    'How to pick a password manager in 2025?',
    'Are foldable phones durable enough for daily use?'
  ],
  'technology-programming': [
    'What is the best way to learn programming as a beginner?',
    'How do I choose between Python and JavaScript for a first project?',
    'Tips to stay motivated while learning to code?'
  ],
  science: [
    'What is the easiest way to understand quantum entanglement?',
    'How do vaccines work with our immune system?'
  ],
  health: [
    'How much protein do I really need per day?',
    'Are multivitamins necessary if I eat well?'
  ],
  fitness: [
    'Best routine for building muscle with limited time?',
    'How to start running without getting injured?'
  ],
  'personal-finance': [
    'Should I pay off debt or invest first?',
    'How much emergency fund should I keep?'
  ],
  investing: [
    'Are index funds still the best option in 2025?',
    'How to diversify with small capital?'
  ],
  career: [
    'How to negotiate a higher salary without another offer?',
    'Is a career change at 35 realistic?'
  ],
  education: [
    'How to study effectively for long exams?',
    'Do spaced repetition apps actually work?'
  ],
  parenting: [
    'How to set screen time boundaries for kids?',
    'Potty training tips that actually work?'
  ],
  relationships: [
    'How to communicate better in a relationship?',
    'How do you rebuild trust after a fight?'
  ],
  travel: [
    'Carry‑on only packing list for 2 weeks?',
    'Best time to visit Japan on a budget?'
  ],
  food: [
    'How to make sourdough bread more airy?',
    'What is the secret to perfect scrambled eggs?'
  ],
  'home-diy': [
    'How to soundproof a small apartment room?',
    'Beginner tools for home DIY projects?'
  ],
  pets: [
    'How often should I bathe my dog?',
    'Best way to introduce a new cat to the house?'
  ],
  entertainment: [
    'Are streaming bundles actually cheaper than cable now?',
    'Underrated movies from the last 5 years?'
  ],
  gaming: [
    'How to reduce input lag on a TV for console gaming?',
    'Best co‑op games to play with friends?'
  ],
  outdoors: [
    'Essential gear for a first backpacking trip?',
    'How to choose a sleeping bag temperature rating?'
  ],
  history: [
    'What were the main causes of the fall of Rome?',
    'Best ways to learn world history quickly?'
  ],
  'news-politics': [
    'How do ranked‑choice voting systems work?',
    'What is the difference between inflation and CPI?'
  ],
  'art-design': [
    'How to develop a personal art style?',
    'Are iPad sketch workflows good for beginners?'
  ],
  fashion: [
    'How to build a minimalist wardrobe?',
    'What colors suit warm skin tones?'
  ],
  language: [
    'Best way to reach conversational Spanish in 3 months?',
    'How to stop translating in your head when speaking?'
  ],
  productivity: [
    'How to avoid burnout while working remote?',
    'Best daily planning method that actually sticks?'
  ],
  'real-estate': [
    'Is it better to buy or rent in 2025?',
    'How to evaluate a neighborhood before buying?'
  ],
};

const genericTags = ['advice', 'how-to', 'beginner', 'tips', '2025'];

const makeAuthor = () => ({
  name: pick(authorNames),
  reputation: randInt(50, 10000),
});

// Answer content generator to add variety
const answerOpeners = [
  'Short version:',
  'Here’s a practical plan:',
  'What works in most cases is:',
  'I’d suggest the following steps:',
  'Try this approach:',
];
const answerVerbs = ['start', 'focus', 'track', 'iterate', 'review'];
const answerNouns = ['fundamentals', 'habits', 'schedule', 'energy', 'feedback'];
const answerTips = [
  'Set a weekly check-in to adjust what isn’t working.',
  'Keep it simple and sustainable; avoid perfect plans.',
  'Batch similar tasks to reduce context switching.',
  'Use a timer (25/5) to keep momentum.',
  'Sleep and hydration matter more than you think.',
];
const resources = [
  'a beginner-friendly YouTube playlist',
  'a one-page checklist in Notes',
  'a spaced-repetition app',
  'a community forum for accountability',
  'a simple tracker (sheet or app) to log progress',
];

function makeAnswerContent(title) {
  const opener = pick(answerOpeners);
  const steps = [
    `${pick(answerVerbs)} with the ${pick(answerNouns)} — define one clear goal around "${title}"`,
    `${pick(answerVerbs)} on the next smallest action and timebox it to 30–45 minutes`,
    `${pick(answerVerbs)} progress weekly; keep notes of wins and blockers`,
  ];
  const tip = pick(answerTips);
  const res = pick(resources);
  return `${opener} ${steps[0]}. Then ${steps[1]}. Finally, ${steps[2]}. ${tip} Consider ${res}.`;
}

// Hand-crafted data: first batch of 20 high-quality Q&As
const questions = [
  {
    id: 1001,
    slug: 'is-it-worth-upgrading-to-wifi-7-at-home',
    title: 'Is it worth upgrading to Wi‑Fi 7 at home?',
    content: 'Thinking about upgrading my home network. I work from home, stream 4K, and have a few smart devices. Is Wi‑Fi 7 noticeably better than Wi‑Fi 6/6E today, or should I wait? Any pitfalls when upgrading routers/clients?',
    author: { name: 'Carlos C', reputation: 5200 },
    votes: 37,
    answers: 2,
    views: 4123,
    tags: ['technology', 'home-network', 'routers'],
    category: 'technology',
    createdAt: '2025-07-20T10:05:12.000Z',
    isAnswered: true,
    acceptedAnswer: 5001,
  },
  {
    id: 1002,
    slug: 'how-to-build-a-minimalist-wardrobe',
    title: 'How to build a minimalist wardrobe?',
    content: 'Trying to declutter and buy fewer, better clothes. What are the core pieces/colors to start with? How do I avoid impulse buys and still feel like I have options?',
    author: { name: 'Maya Patel', reputation: 4800 },
    votes: 22,
    answers: 2,
    views: 2890,
    tags: ['fashion', 'minimalism', 'lifestyle'],
    category: 'fashion',
    createdAt: '2025-07-02T14:12:44.000Z',
    isAnswered: true,
    acceptedAnswer: 5003,
  },
  {
    id: 1003,
    slug: 'how-do-ranked-choice-voting-systems-work',
    title: 'How do ranked‑choice voting systems work?',
    content: 'I keep hearing about ranked‑choice voting but don’t fully understand it. How are the votes counted, and what are the main pros/cons compared to first‑past‑the‑post?',
    author: { name: 'Nathan J', reputation: 3900 },
    votes: 45,
    answers: 2,
    views: 6230,
    tags: ['news-politics', 'civics'],
    category: 'news-politics',
    createdAt: '2025-06-18T09:21:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5005,
  },
  {
    id: 1004,
    slug: 'best-time-to-visit-japan-on-a-budget',
    title: 'Best time to visit Japan on a budget?',
    content: 'Looking at a 10–14 day trip. When are flights and hotels cheapest but the weather is still nice? Bonus for food festivals or seasonal highlights.',
    author: { name: 'Taylor T', reputation: 2600 },
    votes: 31,
    answers: 2,
    views: 5012,
    tags: ['travel', 'budget', 'japan'],
    category: 'travel',
    createdAt: '2025-05-25T16:03:10.000Z',
    isAnswered: true,
    acceptedAnswer: 5007,
  },
  {
    id: 1005,
    slug: 'what-is-a-sane-beginner-strength-routine',
    title: 'What is a sane beginner strength routine?',
    content: 'I have access to a basic gym and want to get stronger without spending 2 hours a day. What’s a simple, proven plan to follow 3x/week? How long before I should change it?',
    author: { name: 'Kevin K', reputation: 6100 },
    votes: 54,
    answers: 2,
    views: 7120,
    tags: ['fitness', 'beginner', 'strength-training'],
    category: 'fitness',
    createdAt: '2025-05-10T12:40:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5009,
  },
  {
    id: 1006,
    slug: 'how-to-soundproof-a-small-apartment-room',
    title: 'How to soundproof a small apartment room?',
    content: 'I rent, so I can’t do construction. Looking for renter‑friendly ways to reduce echo and outside noise for calls and music practice.',
    author: { name: 'Daniel D', reputation: 4300 },
    votes: 19,
    answers: 2,
    views: 1980,
    tags: ['home-diy', 'soundproofing'],
    category: 'home-diy',
    createdAt: '2025-04-28T18:20:12.000Z',
    isAnswered: true,
    acceptedAnswer: 5011,
  },
  {
    id: 1007,
    slug: 'how-much-emergency-fund-should-i-keep',
    title: 'How much emergency fund should I keep?',
    content: 'I’m single with stable income and rent. How many months of expenses is reasonable in 2025? Where should I store it so it’s safe but keeps up with inflation?',
    author: { name: 'William F', reputation: 8200 },
    votes: 41,
    answers: 2,
    views: 5482,
    tags: ['personal-finance', 'emergency-fund'],
    category: 'personal-finance',
    createdAt: '2025-04-15T11:11:11.000Z',
    isAnswered: true,
    acceptedAnswer: 5013,
  },
  {
    id: 1008,
    slug: 'how-to-make-sourdough-bread-more-airy',
    title: 'How to make sourdough bread more airy?',
    content: 'My sourdough tastes good but the crumb is tight. I’m doing overnight cold proof. What variables should I tweak to get a more open crumb?',
    author: { name: 'Thomas C', reputation: 3000 },
    votes: 27,
    answers: 2,
    views: 2210,
    tags: ['food', 'baking', 'sourdough'],
    category: 'food',
    createdAt: '2025-03-30T08:45:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5015,
  },
  {
    id: 1009,
    slug: 'how-to-stop-translating-in-your-head-when-speaking',
    title: 'How to stop translating in your head when speaking?',
    content: 'Intermediate Spanish learner here. I can read fine, but when speaking I translate from English and get stuck. Any practical drills or routines to think in Spanish?',
    author: { name: 'Patricia P', reputation: 5700 },
    votes: 33,
    answers: 2,
    views: 3911,
    tags: ['language', 'speaking', 'spanish'],
    category: 'language',
    createdAt: '2025-03-18T19:22:47.000Z',
    isAnswered: true,
    acceptedAnswer: 5017,
  },
  {
    id: 1010,
    slug: 'is-a-career-change-at-35-realistic',
    title: 'Is a career change at 35 realistic?',
    content: 'I’ve been in operations for 10 years and want to pivot to UX research. What’s a realistic path in 12–18 months without going broke? How do I test the waters first?',
    author: { name: 'Sara N', reputation: 3500 },
    votes: 58,
    answers: 2,
    views: 8045,
    tags: ['career', 'career-change', 'ux'],
    category: 'career',
    createdAt: '2025-03-05T13:10:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5019,
  },
  {
    id: 1011,
    slug: 'how-to-reduce-input-lag-on-a-tv-for-console-gaming',
    title: 'How to reduce input lag on a TV for console gaming?',
    content: 'My TV looks great for movies but feels sluggish for gaming. What settings actually matter (Game Mode, motion smoothing, ALLM, VRR)?',
    author: { name: 'Michael M', reputation: 2100 },
    votes: 18,
    answers: 2,
    views: 1750,
    tags: ['gaming', 'tv', 'latency'],
    category: 'gaming',
    createdAt: '2025-02-21T20:00:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5021,
  },
  {
    id: 1012,
    slug: 'how-to-set-screen-time-boundaries-for-kids',
    title: 'How to set screen‑time boundaries for kids?',
    content: 'Two kids (6 and 9). We’ve tried timers but end up arguing. What rules or routines actually stick without constant battles?',
    author: { name: 'Nicholas N', reputation: 1700 },
    votes: 24,
    answers: 2,
    views: 2430,
    tags: ['parenting', 'screen-time', 'family'],
    category: 'parenting',
    createdAt: '2025-02-10T08:32:12.000Z',
    isAnswered: true,
    acceptedAnswer: 5023,
  },
  {
    id: 1013,
    slug: 'what-were-the-main-causes-of-the-fall-of-rome',
    title: 'What were the main causes of the fall of Rome?',
    content: 'I’m seeing conflicting explanations. Was it economics, military, politics, or something else? What do modern historians agree on?',
    author: { name: 'Hannah H', reputation: 6900 },
    votes: 52,
    answers: 2,
    views: 7322,
    tags: ['history', 'roman-empire'],
    category: 'history',
    createdAt: '2025-01-29T15:55:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5025,
  },
  {
    id: 1014,
    slug: 'are-index-funds-still-the-best-option-in-2025',
    title: 'Are index funds still the best option in 2025?',
    content: 'With higher rates and volatile markets, does the “buy the index and chill” advice still hold? Any tweaks for different time horizons?',
    author: { name: 'Jane I', reputation: 7700 },
    votes: 49,
    answers: 2,
    views: 6655,
    tags: ['investing', 'index-funds'],
    category: 'investing',
    createdAt: '2025-01-12T10:20:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5027,
  },
  {
    id: 1015,
    slug: 'how-to-develop-a-personal-art-style',
    title: 'How to develop a personal art style?',
    content: 'I study lots of artists and feel derivative. How do you experiment without getting lost, and how do you know when a style is “yours” versus a phase?',
    author: { name: 'Ursula U', reputation: 2450 },
    votes: 21,
    answers: 2,
    views: 2311,
    tags: ['art-design', 'creativity'],
    category: 'art-design',
    createdAt: '2024-12-28T09:10:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5029,
  },
  {
    id: 1016,
    slug: 'how-do-vaccines-work-with-our-immune-system',
    title: 'How do vaccines work with our immune system?',
    content: 'Looking for a plain‑English explanation of how vaccines “teach” immunity, and why boosters are sometimes needed.',
    author: { name: 'Henry G', reputation: 9100 },
    votes: 63,
    answers: 2,
    views: 9210,
    tags: ['health', 'vaccines'],
    category: 'health',
    createdAt: '2024-12-14T12:45:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5031,
  },
  {
    id: 1017,
    slug: 'what-is-the-difference-between-inflation-and-cpi',
    title: 'What is the difference between inflation and CPI?',
    content: 'These terms get used interchangeably on the news. What exactly is CPI measuring, and how does it relate to “inflation” in the broader sense?',
    author: { name: 'Priya P', reputation: 4100 },
    votes: 29,
    answers: 2,
    views: 3550,
    tags: ['news-politics', 'economics'],
    category: 'news-politics',
    createdAt: '2024-11-30T17:33:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5033,
  },
  {
    id: 1018,
    slug: 'what-is-the-best-way-to-learn-programming-as-a-beginner',
    title: 'What is the best way to learn programming as a beginner?',
    content: 'There’s so much advice. If you had to design a 90‑day starter plan for someone who’s never coded, what would it look like? Which language, and why?',
    author: { name: 'Lucas R', reputation: 2850 },
    votes: 34,
    answers: 2,
    views: 4980,
    tags: ['technology-programming', 'learning'],
    category: 'technology-programming',
    createdAt: '2024-11-15T08:00:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5035,
  },
  {
    id: 1019,
    slug: 'how-to-choose-a-sleeping-bag-temperature-rating',
    title: 'How to choose a sleeping bag temperature rating?',
    content: 'I’m confused by EN/ISO ratings and “comfort” vs “limit.” For 3‑season backpacking in mild climates, what should I actually buy?',
    author: { name: 'Emma E', reputation: 3600 },
    votes: 26,
    answers: 2,
    views: 2390,
    tags: ['outdoors', 'camping', 'gear'],
    category: 'outdoors',
    createdAt: '2024-10-22T21:11:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5037,
  },
  {
    id: 1020,
    slug: 'how-to-reduce-arguments-about-household-chores',
    title: 'How to reduce arguments about household chores?',
    content: 'My partner and I keep circling back to chores and “who does what.” Any systems or scripts that make this less personal and more fair?',
    author: { name: 'Ava Kim', reputation: 2600 },
    votes: 39,
    answers: 2,
    views: 4420,
    tags: ['relationships', 'communication', 'home'],
    category: 'relationships',
    createdAt: '2024-10-05T12:20:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5039,
  },
  {
    id: 1021,
    slug: 'do-i-need-a-nas-for-home-backups',
    title: 'Do I need a NAS for home backups?',
    content: 'I have a couple laptops and lots of photos/videos. Is a NAS worth it over external drives + cloud? What’s a simple, reliable setup for non‑IT folks?',
    author: { name: 'Alex A', reputation: 2400 },
    votes: 32,
    answers: 2,
    views: 3210,
    tags: ['technology', 'backups', 'storage'],
    category: 'technology',
    createdAt: '2025-07-28T09:00:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5041,
  },
  {
    id: 1022,
    slug: 'how-to-start-running-without-getting-injured',
    title: 'How to start running without getting injured?',
    content: 'I’m out of shape but want to run a 5K by winter. How many days per week, and how do I avoid shin splints and knee pain?',
    author: { name: 'Miles G', reputation: 1300 },
    votes: 28,
    answers: 2,
    views: 2790,
    tags: ['fitness', 'running', 'beginner'],
    category: 'fitness',
    createdAt: '2025-07-14T11:22:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5043,
  },
  {
    id: 1023,
    slug: 'how-to-brew-cafe-quality-espresso-at-home',
    title: 'How to brew café‑quality espresso at home?',
    content: 'I bought an entry‑level machine and a decent grinder. What variables should I focus on first to get consistent shots?',
    author: { name: 'Samir K', reputation: 2100 },
    votes: 35,
    answers: 2,
    views: 3880,
    tags: ['food', 'coffee', 'espresso'],
    category: 'food',
    createdAt: '2025-07-01T08:15:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5045,
  },
  {
    id: 1024,
    slug: 'how-to-teach-a-dog-to-stop-pulling-on-leash',
    title: 'How to teach a dog to stop pulling on leash?',
    content: '1‑year‑old rescue, super friendly but pulls like a sled dog. What’s an effective, humane training routine that actually works?',
    author: { name: 'Nina R', reputation: 1650 },
    votes: 25,
    answers: 2,
    views: 2540,
    tags: ['parenting', 'pets', 'training'],
    category: 'parenting',
    createdAt: '2025-06-22T17:30:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5047,
  },
  {
    id: 1025,
    slug: 'cheap-ways-to-keep-apartment-cool-in-summer',
    title: 'Cheap ways to keep an apartment cool in summer?',
    content: 'Can’t install AC. Looking for low‑cost hacks to keep a small apartment livable during heat waves.',
    author: { name: 'Jo', reputation: 900 },
    votes: 30,
    answers: 2,
    views: 3420,
    tags: ['home-diy', 'summer', 'heat'],
    category: 'home-diy',
    createdAt: '2025-06-10T15:05:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5049,
  },
  {
    id: 1026,
    slug: 'capsule-wardrobe-starter-pieces-for-men',
    title: 'Capsule wardrobe starter pieces for men?',
    content: 'I want to look put‑together without thinking too hard. What’s the minimal set of clothes for a smart casual look?',
    author: { name: 'Sophie Lee', reputation: 2200 },
    votes: 18,
    answers: 2,
    views: 2105,
    tags: ['art-design', 'photography', 'travel'],
    category: 'art-design',
    createdAt: '2025-05-29T09:00:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5057,
  },
  {
    id: 1030,
    slug: 'best-news-app-for-balanced-coverage',
    title: 'Best news app for balanced coverage?',
    content: 'I’m trying to stay informed without getting stuck in a partisan bubble. Any apps or newsletters that do a good job summarizing both sides?',
    author: { name: 'Noah Johnson', reputation: 3900 },
    votes: 23,
    answers: 2,
    views: 2660,
    tags: ['news-politics', 'mental-health'],
    category: 'news-politics',
    createdAt: '2025-04-04T07:55:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5063,
  },
  {
    id: 1033,
    slug: 'weeknight-dinners-that-arent-boring',
    title: 'Weeknight dinners that aren’t boring?',
    content: 'We’re stuck in a chicken‑and‑rice rut. What are some quick, healthy(ish) recipes we can rotate without getting bored?',
    author: { name: 'Tom Robinson', reputation: 3000 },
    votes: 34,
    answers: 2,
    views: 3480,
    tags: ['career', 'communication', 'sales'],
    category: 'career',
    createdAt: '2025-02-24T08:35:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5065,
  },
  {
    id: 1034,
    slug: 'index-funds-or-target-date-funds',
    title: 'Index funds or target date funds?',
    content: 'Starting to invest in my 401(k). Is a target date fund good enough, or should I manually pick index funds for lower fees?',
    author: { name: 'Fiona Wong', reputation: 8200 },
    votes: 58,
    answers: 2,
    views: 2740,
    tags: ['health', 'mental-health', 'habits'],
    category: 'health',
    createdAt: '2025-02-10T07:15:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5067,
  },
  {
    id: 1035,
    slug: 'tips-for-speaking-basic-italian-on-a-trip',
    title: 'Tips for speaking basic Italian on a trip?',
    content: 'I’m visiting family in Italy. I can read a bit but speaking is hard. What phrases and habits will help me not freeze up?',
    author: { name: 'Luca Romano', reputation: 2850 },
    votes: 21,
    answers: 2,
    views: 2330,
    tags: ['art-design', 'music'],
    category: 'art-design',
    createdAt: '2025-01-27T18:10:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5069,
  },
  {
    id: 1036,
    slug: 'best-air-purifier-for-apartment-allergies',
    title: 'Best air purifier for apartment allergies?',
    content: 'Dust and seasonal allergies are killing me in a small space. What specs actually matter and what models are good value in 2025?',
    author: { name: 'Helen Kim', reputation: 9100 },
    votes: 47,
    answers: 2,
    views: 2550,
    tags: ['fitness', 'cycling', 'gear'],
    category: 'fitness',
    createdAt: '2025-01-12T09:00:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5071,
  },
  {
    id: 1037,
    slug: 'budget-tool-for-couples-that-isnt-overkill',
    title: 'Budget tool for couples that isn’t overkill?',
    content: 'We’ve tried spreadsheets and end up not updating them. We want something lightweight for shared expenses and goals that doesn’t feel like work.',
    author: { name: 'Dan Russell', reputation: 4300 },
    votes: 41,
    answers: 2,
    views: 4980,
    tags: ['food', 'cooking', 'healthy'],
    category: 'food',
    createdAt: '2024-12-29T07:50:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5073,
  },
  {
    id: 1038,
    slug: 'how-to-make-civics-interesting-for-teens',
    title: 'How to make civics interesting for teens?',
    content: 'Teaching a high school class and want to make local government feel relevant. Any projects or activities that actually engage?',
    author: { name: 'Clara Vasquez', reputation: 3800 },
    votes: 22,
    answers: 2,
    views: 2210,
    tags: ['career', 'remote-work', 'wellbeing'],
    category: 'career',
    createdAt: '2024-12-18T09:20:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5077,
  },
  {
    id: 1040,
    slug: 'postgres-or-mysql-for-side-project-in-2025',
    title: 'Postgres or MySQL for side project in 2025?',
    content: 'Small CRUD app that might grow. I’m comfortable with both, but what’s the better default these days for reliability and developer experience?',
    author: { name: 'Derek Brown', reputation: 5400 },
    votes: 52,
    answers: 2,
    views: 3440,
    tags: ['art-design', 'photography', 'gear'],
    category: 'art-design',
    createdAt: '2024-11-12T13:30:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5079,
  },
  {
    id: 1041,
    slug: 'heardirectclubs-nova-hearing-aid-any-good',
    title: "HearDirectClub's Nova hearing aid any good?",
    content: "Considering the Nova from HearDirectClub as a first hearing aid for milt-to-severe high‑frequency loss. How does it stack up on real‑world clarity in noise, battery life, and follow‑up support vs other brands and clinic‑fit options? Any gotchas?",
    author: { name: 'Olivia Chen', reputation: 3100 },
    votes: 19,
    answers: 10,
    views: 980,
    tags: ['health', 'hearing', 'devices'],
    category: 'health',
    createdAt: '2025-08-09T10:05:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5081,
  },
  {
    id: 1042,
    slug: 'migrate-nextjs-12-to-14-app-router',
    title: 'Best way to migrate a Next.js 12 app to 14 with the App Router?',
    content: 'I’ve got a sizable Next.js 12 project on Pages Router (getServerSideProps, API routes, some custom webpack). What’s the safest path to Next 14 + App Router without breaking SEO or auth? Any gotchas around middleware, image loader, or dynamic routes?',
    author: { name: 'Aisha K', reputation: 6200 },
    votes: 44,
    answers: 7,
    views: 5120,
    tags: ['programming', 'nextjs', 'react', 'migration'],
    category: 'technology-programming',
    createdAt: '2025-08-08T15:20:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5102,
  },
  {
    id: 1043,
    slug: 'hy-savings-vs-t-bills-emergency-fund-2025',
    title: 'High‑yield savings vs short‑term T‑Bills for an emergency fund?',
    content: 'I’m sitting on ~6 months of expenses. HYSA rates are decent, but 4–13 week T‑Bills look slightly higher after tax. For liquidity/risk, what makes sense in 2025? How are you handling rollover and access in a true emergency?',
    author: { name: 'Paul S', reputation: 4100 },
    votes: 38,
    answers: 3,
    views: 4210,
    tags: ['personal-finance', 'savings', 'bonds'],
    category: 'personal-finance',
    createdAt: '2025-08-07T11:10:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5106,
  },
  {
    id: 1044,
    slug: 'how-to-stick-to-time-blocking',
    title: 'How do you actually stick to time blocking?',
    content: 'I can plan a week of time blocks but by Wednesday it’s chaos. Meetings slip, tasks spill over. What’s a realistic way to time‑block without it becoming a guilt machine? Tools/process welcome.',
    author: { name: 'Nina', reputation: 2300 },
    votes: 27,
    answers: 9,
    views: 3390,
    tags: ['productivity', 'habits', 'planning'],
    category: 'productivity',
    createdAt: '2025-08-05T09:00:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5114,
  },
  {
    id: 1045,
    slug: 'sourdough-starter-stalling-in-summer-heat',
    title: 'Sourdough starter keeps stalling in summer heat—what am I doing wrong?',
    content: 'Starter was lively in spring, now it peaks fast then collapses. House is ~82°F in afternoons. Using 1:1:1 with AP flour. Should I change hydration/ratio, switch flour, or refrigerate part‑time?',
    author: { name: 'Leo M', reputation: 1400 },
    votes: 21,
    answers: 5,
    views: 1985,
    tags: ['food', 'baking', 'sourdough'],
    category: 'food',
    createdAt: '2025-08-04T14:33:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5120,
  },
  {
    id: 1046,
    slug: 'is-global-entry-worth-it-2025',
    title: 'Is Global Entry still worth it in 2025 with PreCheck delays?',
    content: 'Flying 5–6 times a year domestically + 1 international. Heard Pre lines get long now. With interview backlog and fee, is Global Entry still a slam dunk? Any airport gotchas?',
    author: { name: 'Rachel', reputation: 3700 },
    votes: 32,
    answers: 9,
    views: 2875,
    tags: ['travel', 'airports', 'tsa-precheck'],
    category: 'travel',
    createdAt: '2025-08-03T19:05:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5127,
  },
  {
    id: 1047,
    slug: '1440p-vs-4k-midrange-gpu-2025',
    title: '1440p vs 4K for a midrange GPU in 2025?',
    content: 'Considering a monitor upgrade. I’ve got a mid‑tier GPU. For mixed single‑player + competitive shooters, is a 1440p high‑refresh still the sweet spot, or is 4K finally practical?',
    author: { name: 'Chris D', reputation: 5200 },
    votes: 41,
    answers: 2,
    views: 3610,
    tags: ['gaming', 'hardware', 'monitors'],
    category: 'gaming',
    createdAt: '2025-08-02T12:00:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5131,
  },
  {
    id: 1048,
    slug: 'paint-small-bathroom-satin-vs-semi-gloss',
    title: 'Paint a small bathroom: satin vs semi‑gloss and primer tips?',
    content: 'Moist bathroom, poor ventilation. Repainting after light mildew cleanup. Which sheen holds up but doesn’t look plasticky? One‑coat primers legit or marketing?',
    author: { name: 'Elena', reputation: 1800 },
    votes: 16,
    answers: 4,
    views: 1650,
    tags: ['home-diy', 'paint', 'bathroom'],
    category: 'home-diy',
    createdAt: '2025-08-01T17:40:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5135,
  },
  {
    id: 1049,
    slug: 'stop-rescue-dog-resource-guarding',
    title: 'How to stop a rescue dog from resource guarding?',
    content: 'Newly adopted 2‑year‑old mix guards food and toys. We’re careful but slip‑ups happen. Looking for humane, step‑by‑step training that works and keeps everyone safe.',
    author: { name: 'Janet', reputation: 900 },
    votes: 29,
    answers: 8,
    views: 2210,
    tags: ['pets', 'dogs', 'training'],
    category: 'pets',
    createdAt: '2025-07-31T08:22:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5141,
  },
  {
    id: 1050,
    slug: 'do-cold-plunges-help-recovery-science',
    title: 'Are cold plunges actually evidence‑based for recovery?',
    content: 'Seeing cold plunge tubs everywhere. Beyond anecdotes, what does current research say about benefits/risks for soreness, sleep, metabolism? Timing vs workouts?',
    author: { name: 'Priya', reputation: 4500 },
    votes: 36,
    answers: 6,
    views: 3090,
    tags: ['science', 'health', 'recovery'],
    category: 'science',
    createdAt: '2025-07-29T10:15:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5146,
  },
  {
    id: 1051,
    slug: 'buying-mortgage-points-when-rates-may-drop',
    title: 'Should I buy points on a mortgage when rates might drop?',
    content: 'Builder offering a points buydown. Planning to keep the home 5–7 years. If the Fed cuts in 2025, is it smarter to keep cash and refi later? How do you model the breakeven correctly?',
    author: { name: 'Marco R', reputation: 2700 },
    votes: 24,
    answers: 3,
    views: 1990,
    tags: ['real-estate', 'mortgage', 'rates'],
    category: 'real-estate',
    createdAt: '2025-07-28T14:00:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5152,
  },
  {
    id: 1052,
    slug: 'ai-product-photos-on-a-budget-2025',
    title: 'Are AI image tools good enough for product photos on a budget in 2025?',
    content: 'Small online shop here. I can’t afford a full studio. Are AI upscalers/background tools + a cheap lightbox “good enough,” or will it look fake? Tips for making them passable?',
    author: { name: 'Jae', reputation: 1900 },
    votes: 17,
    answers: 1,
    views: 1280,
    tags: ['technology', 'photography', 'ai'],
    category: 'technology',
    createdAt: '2025-08-10T09:20:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5154,
  },
  {
    id: 1053,
    slug: 'roth-vs-traditional-401k-with-variable-income',
    title: 'Roth vs Traditional 401(k) when income varies year to year?',
    content: 'Freelancer—some years high, some years lean. How do you decide between Roth vs pre‑tax contributions when MAGI and brackets swing? Any rules of thumb for 2025 tax year?',
    author: { name: 'Xavier', reputation: 3500 },
    votes: 33,
    answers: 10,
    views: 4020,
    tags: ['investing', 'retirement', 'taxes'],
    category: 'investing',
    createdAt: '2025-08-09T16:10:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5163,
  },
  {
    id: 1054,
    slug: 'ultralight-vs-durable-tent-for-windy-desert',
    title: 'Ultralight vs durable tent for windy desert trips?',
    content: 'Doing a few desert loops (Moab/Anza) where wind kicks up sand. Is UL worth the grams if it flaps to death? Or should I bring a heavier, lower‑profile tent?',
    author: { name: 'Hannah', reputation: 2200 },
    votes: 21,
    answers: 3,
    views: 1890,
    tags: ['outdoors', 'camping', 'gear'],
    category: 'outdoors',
    createdAt: '2025-08-08T08:45:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5167,
  },
  {
    id: 1055,
    slug: 'actually-remember-what-you-read-non-fiction',
    title: 'How do you actually remember what you read in non‑fiction?',
    content: 'I read a lot of business/psych books and forget them a week later. What workflow makes ideas stick without turning reading into a second job?',
    author: { name: 'Rob', reputation: 2800 },
    votes: 29,
    answers: 7,
    views: 3310,
    tags: ['education', 'learning', 'note-taking'],
    category: 'education',
    createdAt: '2025-08-07T13:00:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5174,
  },
  {
    id: 1056,
    slug: 'bedtime-routine-for-toddlers-who-stall',
    title: 'Bedtime routine for toddlers who stall endlessly?',
    content: 'My 3‑year‑old is a master negotiator: “one more book, water, potty, hug, story, snack…” How do we keep it kind but firm so bedtime doesn’t take 90 minutes?',
    author: { name: 'Alyssa', reputation: 1600 },
    votes: 18,
    answers: 2,
    views: 2105,
    tags: ['parenting', 'sleep', 'toddlers'],
    category: 'parenting',
    createdAt: '2025-08-06T19:20:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5176,
  },
  {
    id: 1057,
    slug: 'track-tv-shows-across-streaming-services-2025',
    title: 'What’s the best way to track TV shows across streaming services?',
    content: 'We bounce between Netflix/Max/Disney+/Hulu. I miss episodes and forget premieres. Looking for a simple tracker with notifications and where‑to‑watch info.',
    author: { name: 'Omar', reputation: 1200 },
    votes: 14,
    answers: 12,
    views: 1750,
    tags: ['entertainment', 'tv', 'apps'],
    category: 'entertainment',
    createdAt: '2025-08-05T09:40:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5188,
  },
  {
    id: 1058,
    slug: 'what-causes-brain-freeze-and-how-to-stop-it-fast',
    title: 'What causes “brain freeze,” and how do you stop it fast?',
    content: 'Ice cream headache hits me hard. What’s actually happening biologically and is there a quick fix that works?',
    author: { name: 'Marta', reputation: 3000 },
    votes: 26,
    answers: 4,
    views: 2980,
    tags: ['science', 'health', 'cold'],
    category: 'science',
    createdAt: '2025-08-04T11:10:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5192,
  },
  {
    id: 1059,
    slug: 'backsplash-peel-and-stick-vs-thinset-tile',
    title: 'DIY backsplash: peel‑and‑stick vs thinset tile?',
    content: 'Renting a small place and want a kitchen glow‑up. Are peel‑and‑stick tiles decent or a trap? Or should I thinset/mortar real tile and remove later?',
    author: { name: 'Victor', reputation: 1450 },
    votes: 23,
    answers: 9,
    views: 2540,
    tags: ['home-diy', 'kitchen', 'tile'],
    category: 'home-diy',
    createdAt: '2025-08-03T18:55:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5201,
  },
  {
    id: 1060,
    slug: 'shadowing-vs-conversation-for-pronunciation',
    title: 'Shadowing vs conversation: what actually improves pronunciation?',
    content: 'Intermediate Spanish—my pronunciation lags. Is shadowing audio better than live conversation for fixing sounds and rhythm? How would you structure a week?',
    author: { name: 'Elisa', reputation: 2100 },
    votes: 20,
    answers: 5,
    views: 2400,
    tags: ['language', 'speaking', 'pronunciation'],
    category: 'language',
    createdAt: '2025-08-02T10:05:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5206,
  },
  {
    id: 1061,
    slug: 'negotiate-rent-renewal-without-burning-bridges',
    title: 'How to negotiate a rent renewal without burning bridges?',
    content: 'Lease up next month. Landlord proposing +9%. I like the place and want to be fair. What’s a respectful way to counter that actually works?',
    author: { name: 'Gavin', reputation: 3300 },
    votes: 34,
    answers: 6,
    views: 3770,
    tags: ['personal-finance', 'rent', 'negotiation'],
    category: 'personal-finance',
    createdAt: '2025-08-01T16:25:00.000Z',
    isAnswered: true,
    acceptedAnswer: 5212,
  },
];

const answers = [
  // Q1001 Wi‑Fi 7
  {
    id: 5001,
    questionId: 1001,
    votes: 52,
    isAccepted: true,
    createdAt: '2025-07-21T08:12:00.000Z',
    author: { name: 'David B', reputation: 5400 },
    content: 'If you already have solid Wi‑Fi 6, hold off unless you own multiple Wi‑Fi 7 clients. The real gains are multi‑link operation (better reliability) and wider channels on 6 GHz. You’ll see the biggest benefits with busy households streaming concurrently. If you upgrade, disable legacy features (WMM power save, aggressive band steering), place the router centrally, and wire backhaul if using mesh. Don’t expect miracles from a single access point through concrete walls.'
  },
  {
    id: 5002,
    questionId: 1001,
    votes: 11,
    isAccepted: false,
    createdAt: '2025-07-22T09:00:00.000Z',
    author: { name: 'Carlos C', reputation: 5200 },
    content: 'Small quality‑of‑life bump if your phones/laptops support 6 GHz. I saw fewer drops in a crowded apartment. If money’s tight, spend it on a better router placement and a wired line to your desk first.'
  },

  // Q1002 Minimalist wardrobe
  {
    id: 5003,
    questionId: 1002,
    votes: 36,
    isAccepted: true,
    createdAt: '2025-07-04T11:40:00.000Z',
    author: { name: 'Fiona P', reputation: 2200 },
    content: 'Pick a base palette (e.g., navy/charcoal/white) and buy only pieces that mix 3+ ways. Start with 2 pants, 2 tees, 2 shirts, 1 knit, 1 jacket, 1 shoe you actually walk in. Screenshot outfits you like and recreate from your closet before buying new. Unfollow fast‑fashion hauls; follow one or two stylists whose look you want. Put non‑urgent wants on a 30‑day list—most drop off.'
  },
  {
    id: 5004,
    questionId: 1002,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-07-05T09:10:00.000Z',
    author: { name: 'Maya Patel', reputation: 4800 },
    content: 'Also consider fabrics that don’t pill/wrinkle (wool blends, tencel). A single good tailor visit will make basics look premium.'
  },

  // Q1003 Ranked‑choice voting
  {
    id: 5005,
    questionId: 1003,
    votes: 61,
    isAccepted: true,
    createdAt: '2025-06-19T07:25:00.000Z',
    author: { name: 'Catherine T', reputation: 3800 },
    content: 'Voters rank candidates. If no one gets 50%, the last‑place candidate is eliminated and their ballots transfer to the next ranked choice. Repeat until someone gets a majority. Pros: better reflects consensus, reduces strategic “lesser evil” voting. Cons: counting is more complex, and exhausted ballots can occur if voters don’t rank beyond their first few choices.'
  },
  {
    id: 5006,
    questionId: 1003,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-06-19T12:00:00.000Z',
    author: { name: 'Nathan J', reputation: 3900 },
    content: 'Worth noting: campaign tone can improve because second‑choice votes matter. Candidates avoid alienating supporters of others.'
  },

  // Q1004 Japan budget
  {
    id: 5007,
    questionId: 1004,
    votes: 43,
    isAccepted: true,
    createdAt: '2025-05-26T10:00:00.000Z',
    author: { name: 'Taylor T', reputation: 2600 },
    content: 'Late May/early June and late October/early November hit a sweet spot—lower prices than peak sakura, mild weather, and fewer crowds. Book shinkansen passes only if you’ll take multiple long hops; otherwise pay as you go. Business hotels are clean and cheap near stations. Eat at standing bars and depachika food halls; they’re great value.'
  },
  {
    id: 5008,
    questionId: 1004,
    votes: 10,
    isAccepted: false,
    createdAt: '2025-05-27T08:15:00.000Z',
    author: { name: 'Frank N', reputation: 2000 },
    content: 'If you’re into food, look for seasonal matsuri calendars—autumn festivals + oden season are underrated.'
  },

  // Q1005 Beginner strength
  {
    id: 5009,
    questionId: 1005,
    votes: 72,
    isAccepted: true,
    createdAt: '2025-05-11T09:00:00.000Z',
    author: { name: 'Kevin K', reputation: 6100 },
    content: '3x/week full‑body: squat, hinge, push, pull, carry. Start weights you could do for 3–4 reps more than prescribed (RIR 3–4). Add 2.5–5 kg weekly until reps slow, then add reps before weight. Track sleep and protein; those drive progress as much as programming. Run it unchanged for 12 weeks before tweaking.'
  },
  {
    id: 5010,
    questionId: 1005,
    votes: 13,
    isAccepted: false,
    createdAt: '2025-05-12T10:20:00.000Z',
    author: { name: 'Lee F', reputation: 2700 },
    content: 'Film one set a week. Fixing depth/bracing often unlocks fast progress without changing the plan.'
  },

  // Q1006 Soundproofing
  {
    id: 5011,
    questionId: 1006,
    votes: 25,
    isAccepted: true,
    createdAt: '2025-04-29T08:00:00.000Z',
    author: { name: 'Daniel D', reputation: 4300 },
    content: 'Treat reflections, not just “noise.” Thick rugs, bookcases with uneven depths, and heavy curtains help. Door sweeps + weatherstripping reduce hallway bleed. For music practice, use portable gobos (rockwool panels wrapped in fabric) — renter‑friendly and effective.'
  },
  {
    id: 5012,
    questionId: 1006,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-04-29T15:30:00.000Z',
    author: { name: 'Ursula U', reputation: 2450 },
    content: 'If you can only buy one thing, get a thick rug + underlay. Echo reduction makes calls clearer.'
  },

  // Q1007 Emergency fund
  {
    id: 5013,
    questionId: 1007,
    votes: 57,
    isAccepted: true,
    createdAt: '2025-04-16T07:10:00.000Z',
    author: { name: 'William F', reputation: 8200 },
    content: 'For renters with stable income: 3–4 months is fine. If your industry is cyclical or you’re a contractor, 6 months. Use a high‑yield savings account or a 3‑month T‑bill ladder for a little extra yield while keeping access. Refill the fund first after any big expense.'
  },
  {
    id: 5014,
    questionId: 1007,
    votes: 9,
    isAccepted: false,
    createdAt: '2025-04-16T13:00:00.000Z',
    author: { name: 'Jane I', reputation: 7700 },
    content: 'If you tend to dip into savings, keep the fund at a different bank with a 1–2 day transfer delay. It adds friction (in a good way).'
  },

  // Q1008 Sourdough
  {
    id: 5015,
    questionId: 1008,
    votes: 31,
    isAccepted: true,
    createdAt: '2025-03-31T07:20:00.000Z',
    author: { name: 'Thomas C', reputation: 3000 },
    content: 'Warmer bulk (24–26°C), more folds early, and slightly higher hydration (2–3% bump) usually help. If it’s still tight, your dough may be over‑proofed—try shortening the final proof or baking sooner once it’s airy and jiggly.'
  },
  {
    id: 5016,
    questionId: 1008,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-03-31T12:00:00.000Z',
    author: { name: 'Betty D', reputation: 1800 },
    content: 'Bigger bubbles also come from strong coil folds in the first hour of bulk.'
  },

  // Q1009 Language
  {
    id: 5017,
    questionId: 1009,
    votes: 38,
    isAccepted: true,
    createdAt: '2025-03-19T07:50:00.000Z',
    author: { name: 'Patricia P', reputation: 5700 },
    content: 'Do 10‑minute “no English” monologues on simple topics daily, record and re‑tell from notes. Pair that with 3x/week conversation with the same tutor so your brain reuses chunks. Avoid pausing to translate—use circumlocution to keep flow (describe the idea with the words you have).'
  },
  {
    id: 5018,
    questionId: 1009,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-03-19T12:10:00.000Z',
    author: { name: 'teacher_amy', reputation: 2600 },
    content: 'Shadow short clips daily. Mimic rhythm > vocabulary for fluency feel.'
  },

  // Q1010 Career change
  {
    id: 5019,
    questionId: 1010,
    votes: 69,
    isAccepted: true,
    createdAt: '2025-03-06T08:00:00.000Z',
    author: { name: 'Ursula U', reputation: 2450 },
    content: 'Run a 90‑day test: audit 10 UX case studies, then complete two small projects (one usability study, one diary study) with real participants. Publish readable, honest write‑ups. Informational interviews with 10 researchers will surface gaps. If it energizes you, pursue a part‑time contract before quitting.'
  },
  {
    id: 5020,
    questionId: 1010,
    votes: 12,
    isAccepted: false,
    createdAt: '2025-03-06T13:20:00.000Z',
    author: { name: 'career_coach', reputation: 3000 },
    content: 'Translate ops achievements into research language—stakeholder alignment, process clarity, experiment design. It resonates with hiring managers.'
  },

  // Q1011 Gaming lag
  {
    id: 5021,
    questionId: 1011,
    votes: 22,
    isAccepted: true,
    createdAt: '2025-02-22T09:00:00.000Z',
    author: { name: 'Michael M', reputation: 2100 },
    content: 'Enable Game Mode (or ALLM), disable motion smoothing, and set the TV to PC/4:4:4 mode if available. Use the console’s 120 Hz option where supported; it often cuts input lag even in 60 fps titles. Run a direct HDMI to the TV—AVRs can add latency.'
  },
  {
    id: 5022,
    questionId: 1011,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-02-22T14:35:00.000Z',
    author: { name: 'sportsfan', reputation: 1400 },
    content: 'Also check if your TV has a “bypass” mode that skips extra processing.'
  },

  // Q1012 Screen time
  {
    id: 5023,
    questionId: 1012,
    votes: 33,
    isAccepted: true,
    createdAt: '2025-02-11T07:30:00.000Z',
    author: { name: 'Nicholas N', reputation: 1700 },
    content: 'Switch from daily limits to context rules: no screens before school, none at table, unlimited on Friday movie night. Post the rules on the fridge, and pair screen‑on with screen‑off activities kids choose. Fewer arguments because you point to the rule, not your mood.'
  },
  {
    id: 5024,
    questionId: 1012,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-02-11T12:00:00.000Z',
    author: { name: 'teacher_amy', reputation: 2600 },
    content: 'Timers work better if you start them before the show. Endings are hard; give a 5‑minute warning and a next activity.'
  },

  // Q1013 Fall of Rome
  {
    id: 5025,
    questionId: 1013,
    votes: 55,
    isAccepted: true,
    createdAt: '2025-01-30T09:10:00.000Z',
    author: { name: 'Hannah H', reputation: 6900 },
    content: 'Most historians point to a cocktail: overextension, reliance on mercenary forces, political instability (rapid emperor turnover), and fiscal strain. Western Rome crumbled gradually; Eastern Rome (Byzantium) lasted another thousand years, which shows the “fall” wasn’t a single event.'
  },
  {
    id: 5026,
    questionId: 1013,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-01-30T12:45:00.000Z',
    author: { name: 'bookworm', reputation: 1900 },
    content: 'If you want one readable book, try Peter Heather’s “The Fall of the Roman Empire.”'
  },

  // Q1014 Index funds
  {
    id: 5027,
    questionId: 1014,
    votes: 48,
    isAccepted: true,
    createdAt: '2025-01-13T08:00:00.000Z',
    author: { name: 'Jane I', reputation: 7700 },
    content: 'Yes for most people. Higher rates favor bonds, so a simple tweak is holding your age in high‑quality bonds (or a target‑date fund). Automate monthly buys, rebalance annually, and avoid forecasting. If you want to get fancy, add a small value tilt—historically rewarded, but not required.'
  },
  {
    id: 5028,
    questionId: 1014,
    votes: 9,
    isAccepted: false,
    createdAt: '2025-01-13T12:30:00.000Z',
    author: { name: 'William F', reputation: 8200 },
    content: 'The best portfolio is one you can hold through bad years. Keep it boring and automatic.'
  },

  // Q1015 Art style
  {
    id: 5029,
    questionId: 1015,
    votes: 20,
    isAccepted: true,
    createdAt: '2024-12-29T09:30:00.000Z',
    author: { name: 'Ursula U', reputation: 2450 },
    content: 'Pick one constraint per month (limited palette, single brush, one subject), publish daily, and ask viewers what they notice. Style emerges from consistent constraints + taste. Your job is to keep making decisions, not find a magic recipe.'
  },
  {
    id: 5030,
    questionId: 1015,
    votes: 4,
    isAccepted: false,
    createdAt: '2024-12-29T14:00:00.000Z',
    author: { name: 'art_student', reputation: 900 },
    content: 'Steal like an artist: copy to learn, then remix to own.'
  },

  // Q1016 Vaccines
  {
    id: 5031,
    questionId: 1016,
    votes: 77,
    isAccepted: true,
    createdAt: '2024-12-15T10:00:00.000Z',
    author: { name: 'Henry G', reputation: 9100 },
    content: 'Vaccines introduce a harmless version or blueprint of a pathogen so your immune system rehearses the defense. Memory cells persist, so when the real thing shows up, the response is faster and stronger. Boosters “remind” the system when variants drift or immunity wanes.'
  },
  {
    id: 5032,
    questionId: 1016,
    votes: 6,
    isAccepted: false,
    createdAt: '2024-12-15T16:00:00.000Z',
    author: { name: 'Maya Patel', reputation: 4800 },
    content: 'A good analogy is a fire drill: practice now means faster action later.'
  },

  // Q1017 Inflation vs CPI
  {
    id: 5033,
    questionId: 1017,
    votes: 27,
    isAccepted: true,
    createdAt: '2024-12-01T10:00:00.000Z',
    author: { name: 'economics101', reputation: 2400 },
    content: 'Inflation is the general increase in prices over time. CPI is an index that tracks the prices of a specific “basket” of goods and services. CPI is a proxy—not perfect—so it can under‑ or overstate your personal inflation depending on what you buy.'
  },
  {
    id: 5034,
    questionId: 1017,
    votes: 5,
    isAccepted: false,
    createdAt: '2024-12-01T14:30:00.000Z',
    author: { name: 'Nathan J', reputation: 3900 },
    content: 'If rent or healthcare dominate your budget, your “personal CPI” can differ a lot from the headline number.'
  },

  // Q1018 Learn programming
  {
    id: 5035,
    questionId: 1018,
    votes: 40,
    isAccepted: true,
    createdAt: '2024-11-16T09:00:00.000Z',
    author: { name: 'Carlos C', reputation: 5200 },
    content: 'Pick one language (Python or JS), a daily 45‑minute slot, and a single project you care about (e.g., budget tracker). Alternate days: day A follow a course, day B build the project. Push to GitHub weekly and write what you learned. After 90 days you’ll have a habit and a portfolio piece.'
  },
  {
    id: 5036,
    questionId: 1018,
    votes: 7,
    isAccepted: false,
    createdAt: '2024-11-16T13:10:00.000Z',
    author: { name: 'teacher_amy', reputation: 2600 },
    content: 'Join a study group. Showing up beats motivation.'
  },

  // Q1019 Sleeping bag
  {
    id: 5037,
    questionId: 1019,
    votes: 23,
    isAccepted: true,
    createdAt: '2024-10-23T10:20:00.000Z',
    author: { name: 'Emma E', reputation: 3600 },
    content: 'Buy for the coldest night you expect: a 20°F/‑6°C comfort bag covers most 3‑season trips. Look at “comfort” for your sleep style; “limit” is for curled, warm sleepers. Down is lighter/packable; synthetic is better damp. Pair with an insulated pad—R‑value matters as much as the bag.'
  },
  {
    id: 5038,
    questionId: 1019,
    votes: 4,
    isAccepted: false,
    createdAt: '2024-10-23T15:05:00.000Z',
    author: { name: 'outdoor.newbie', reputation: 700 },
    content: 'Also check the bag’s fit—too roomy feels colder because your body heats extra air.'
  },

  // Q1020 Chores
  {
    id: 5039,
    questionId: 1020,
    votes: 44,
    isAccepted: true,
    createdAt: '2024-10-06T09:00:00.000Z',
    author: { name: 'relationships_helper', reputation: 2600 },
    content: 'Use a weekly “house stand‑up”: 15 minutes to list tasks, assign owners, and set “done” definitions (what good looks like). Swap roles monthly to keep empathy high. When tensions rise, describe the problem, impact, and a specific request instead of blaming. Systems beat memory.'
  },
  {
    id: 5040,
    questionId: 1020,
    votes: 6,
    isAccepted: false,
    createdAt: '2024-10-06T12:40:00.000Z',
    author: { name: 'couples.coach', reputation: 1900 },
    content: 'Post a chore chart where both see it. Visibility reduces nagging.'
  },
  // Q1021 NAS
  {
    id: 5041,
    questionId: 1021,
    votes: 47,
    isAccepted: true,
    createdAt: '2025-07-29T08:30:00.000Z',
    author: { name: 'David M', reputation: 3500 },
    content: 'If you want “set it and forget it,” a 2‑bay NAS with RAID1 + cloud sync (e.g., to Backblaze) is the sweet spot. Keep one local Time Machine/Windows File History backup and one off‑site. Use SMART alerts and test restores quarterly.'
  },
  {
    id: 5042,
    questionId: 1021,
    votes: 9,
    isAccepted: false,
    createdAt: '2025-07-29T12:15:00.000Z',
    author: { name: 'Alex A', reputation: 2400 },
    content: 'External SSD + cloud is fine if you’re disciplined. A NAS shines when multiple devices/backups run automatically.'
  },

  // Q1022 Running
  {
    id: 5043,
    questionId: 1022,
    votes: 39,
    isAccepted: true,
    createdAt: '2025-07-15T09:00:00.000Z',
    author: { name: 'Ashley K', reputation: 2100 },
    content: '3 days run, 2 days strength. Start with run/walk intervals (1 min run / 1 min walk for 20–25 min), add a minute of running weekly. Shoes matter; gait doesn’t. Keep easy days truly easy—conversational pace.'
  },
  {
    id: 5044,
    questionId: 1022,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-07-15T12:40:00.000Z',
    author: { name: 'Miles G', reputation: 1300 },
    content: 'Strength days: calf raises, glute bridges, and single‑leg balance go a long way against shin/knee issues.'
  },

  // Q1023 Espresso
  {
    id: 5045,
    questionId: 1023,
    votes: 41,
    isAccepted: true,
    createdAt: '2025-07-02T09:00:00.000Z',
    author: { name: 'Ben O', reputation: 2600 },
    content: 'Dial in grind first; time your shots (25–35s for ~36g out from 18g in). Use a scale, purge the grinder, and keep dose/distribution consistent. Temperature surfing helps on simpler machines. Change one variable at a time.'
  },
  {
    id: 5046,
    questionId: 1023,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-07-02T12:10:00.000Z',
    author: { name: 'Samir K', reputation: 2100 },
    content: 'Buy fresh beans, 2–3 weeks off roast. Stale coffee is unfixable.'
  },

  // Q1024 Dog pulling
  {
    id: 5047,
    questionId: 1024,
    votes: 34,
    isAccepted: true,
    createdAt: '2025-06-23T08:50:00.000Z',
    author: { name: 'Mark S', reputation: 2400 },
    content: 'Use a front‑clip harness and “stop tree” method: anytime leash tightens, stop. Reward slack leash movement. Short, frequent sessions beat long walks. Practice in low‑distraction areas first.'
  },
  {
    id: 5048,
    questionId: 1024,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-06-23T12:30:00.000Z',
    author: { name: 'Nina R', reputation: 1650 },
    content: 'Sniffing is a reward. Use it: loose leash = “go sniff” cue, tight leash = pause.'
  },

  // Q1025 Cool apartment
  {
    id: 5049,
    questionId: 1025,
    votes: 46,
    isAccepted: true,
    createdAt: '2025-06-11T09:10:00.000Z',
    author: { name: 'Henry P', reputation: 1800 },
    content: 'Blackout curtains + cross‑breeze at night. DIY box‑fan air conditioner (ice packs behind) for short bursts. Cook in batches at night, and turn off unused electronics—they’re mini heaters.'
  },
  {
    id: 5050,
    questionId: 1025,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-06-11T12:20:00.000Z',
    author: { name: 'Jo', reputation: 900 },
    content: 'Reflective film on sun‑facing windows can drop temps a surprising amount.'
  },

  // Q1026 Sharper phone photos
  {
    id: 5051,
    questionId: 1026,
    votes: 29,
    isAccepted: true,
    createdAt: '2025-05-30T08:30:00.000Z',
    author: { name: 'Nate P', reputation: 2100 },
    content: 'Good light > settings. Avoid digital zoom; step closer. Tap to focus, lock exposure, and brace your elbows. Shoot slightly underexposed to protect highlights; phones recover shadows better.'
  },
  {
    id: 5052,
    questionId: 1026,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-05-30T12:05:00.000Z',
    author: { name: 'chloe', reputation: 1450 },
    content: 'Clean the lens. Pocket lint is the silent killer of sharpness.'
  },

  // Q1027 Resume/LinkedIn
  {
    id: 5053,
    questionId: 1027,
    votes: 56,
    isAccepted: true,
    createdAt: '2025-05-17T08:20:00.000Z',
    author: { name: 'Julia Park', reputation: 3300 },
    content: 'Lead with outcomes and numbers. Strip buzzwords, keep a crisp 1‑page for <10 yrs exp. Add a short “How I work” section (tooling, collaboration habits). On LinkedIn, pin 3 projects with visuals; recruiters skim, not read.'
  },
  {
    id: 5054,
    questionId: 1027,
    votes: 10,
    isAccepted: false,
    createdAt: '2025-05-17T12:30:00.000Z',
    author: { name: 'Ian', reputation: 3200 },
    content: 'Personalize the first two sentences of outreach; the rest can be a template.'
  },

  // Q1028 Italy itinerary
  {
    id: 5055,
    questionId: 1028,
    votes: 45,
    isAccepted: true,
    createdAt: '2025-05-03T09:10:00.000Z',
    author: { name: 'Marco R', reputation: 2500 },
    content: 'Rome 4 nights, Florence 3, coast (Amalfi or Cinque Terre) 4, plus a flex day for travel buffers. Travel early morning, pre‑book key sites, and anchor days around lunch in the shade.'
  },
  {
    id: 5056,
    questionId: 1028,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-05-03T12:00:00.000Z',
    author: { name: 'Will A', reputation: 2750 },
    content: 'Pack light for trains and stairs—carry‑on only saves your back and time.'
  },

  // Q1029 Vision Pro
  {
    id: 5057,
    questionId: 1029,
    votes: 17,
    isAccepted: true,
    createdAt: '2025-04-19T09:00:00.000Z',
    author: { name: 'Cody L', reputation: 2800 },
    content: 'Great for focused writing with big virtual screens, but ergonomics matter—limit sessions to 60–90 minutes and use a comfortable chair. Not a laptop replacement yet; think niche workstation.'
  },
  {
    id: 5058,
    questionId: 1029,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-04-19T12:20:00.000Z',
    author: { name: 'devon', reputation: 4100 },
    content: 'Motion wise I’m fine, but the weight catches up if I use it past an hour.'
  },

  // Q1030 News overload
  {
    id: 5059,
    questionId: 1030,
    votes: 31,
    isAccepted: true,
    createdAt: '2025-04-05T08:15:00.000Z',
    author: { name: 'Colin M', reputation: 1600 },
    content: 'Pick two sources (one daily, one weekly), check once in the morning, never at night. Keep a “things I can do” list; action reduces anxiety. Mute outrage‑bait accounts.'
  },
  {
    id: 5060,
    questionId: 1030,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-04-05T12:00:00.000Z',
    author: { name: 'sarah_lee', reputation: 2300 },
    content: 'I batch news to lunchtime. Evenings are for wind‑down only.'
  },

  // Q1031 Pack lighter
  {
    id: 5061,
    questionId: 1031,
    votes: 37,
    isAccepted: true,
    createdAt: '2025-03-24T08:10:00.000Z',
    author: { name: 'Cara N', reputation: 2400 },
    content: 'Rule of 3: tops/bottoms/shoes that all mix. Do laundry weekly; pack merino or quick‑dry. Decant toiletries and cut cables to one USB‑C kit.'
  },
  {
    id: 5062,
    questionId: 1031,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-03-24T12:00:00.000Z',
    author: { name: 'Jess', reputation: 1750 },
    content: 'Lay everything out, then remove one outfit and one pair of shoes.'
  },

  // Q1032 Beginner investing plan
  {
    id: 5063,
    questionId: 1032,
    votes: 53,
    isAccepted: true,
    createdAt: '2025-03-11T09:00:00.000Z',
    author: { name: 'Brian G', reputation: 3000 },
    content: 'Order of operations: employer match, emergency fund to 3 months, high‑interest debt gone, then simple index fund (global stock + bond) with automatic contributions. Review once a year.'
  },
  {
    id: 5064,
    questionId: 1032,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-03-11T12:10:00.000Z',
    author: { name: 'mark_anderson', reputation: 1900 },
    content: 'Name your accounts by goal (Down Payment, Safety Net); it reduces random spending.'
  },

  // Q1033 Cold emails
  {
    id: 5065,
    questionId: 1033,
    votes: 42,
    isAccepted: true,
    createdAt: '2025-02-25T08:30:00.000Z',
    author: { name: 'Sandra T', reputation: 2600 },
    content: 'Subject: a specific observation about their work. 3 sentences: problem you saw, why it matters (with metric), tiny next step (15‑min call). Send Tues‑Thurs mornings. Follow up twice with new value each time.'
  },
  {
    id: 5066,
    questionId: 1033,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-02-25T12:00:00.000Z',
    author: { name: 'tinyfounder', reputation: 2200 },
    content: 'A Loom demo beats paragraphs. Show, don’t tell.'
  },

  // Q1034 Meditation
  {
    id: 5067,
    questionId: 1034,
    votes: 33,
    isAccepted: true,
    createdAt: '2025-02-11T08:10:00.000Z',
    author: { name: 'Megan D', reputation: 2000 },
    content: '2 minutes a day for 2 weeks, same spot and time. Count 10 breaths, restart when lost. Track with a paper habit grid. Scale to 5–10 minutes only after it feels automatic.'
  },
  {
    id: 5068,
    questionId: 1034,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-02-11T12:20:00.000Z',
    author: { name: 'erika', reputation: 1600 },
    content: 'Tie it to an existing routine (after coffee). Triggers beat willpower.'
  },

  // Q1035 Music theory
  {
    id: 5069,
    questionId: 1035,
    votes: 24,
    isAccepted: true,
    createdAt: '2025-01-28T09:00:00.000Z',
    author: { name: 'jam_session', reputation: 1700 },
    content: 'Learn Nashville numbers, I‑IV‑V progressions, and chord tones. Practice singing intervals. Write 1 short song per week; theory sticks when used.'
  },
  {
    id: 5070,
    questionId: 1035,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-01-28T12:30:00.000Z',
    author: { name: 'Liam C', reputation: 1400 },
    content: 'Backing tracks on YouTube make practice way more fun—use them.'
  },

  // Q1036 Road bike
  {
    id: 5071,
    questionId: 1036,
    votes: 28,
    isAccepted: true,
    createdAt: '2025-01-13T08:20:00.000Z',
    author: { name: 'Ben T', reputation: 2300 },
    content: 'Fit first: a cheap bike that fits beats an expensive one that doesn’t. Prioritize gearing appropriate for your hills. A 105 groupset is great value; wheels can be upgraded later.'
  },
  {
    id: 5072,
    questionId: 1036,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-01-13T12:00:00.000Z',
    author: { name: 'ride_or_die', reputation: 1800 },
    content: 'Don’t forget padded shorts and a basic repair kit. Comfort prevents quitting.'
  },

  // Q1037 Vegetables
  {
    id: 5073,
    questionId: 1037,
    votes: 43,
    isAccepted: true,
    createdAt: '2024-12-30T09:00:00.000Z',
    author: { name: 'Peter N', reputation: 1900 },
    content: 'Roast at high heat (220°C) with enough oil and salt for browning; finish with acid (lemon, vinegar) and fat (tahini, parmesan). Texture + contrast beat “healthy” blandness.'
  },
  {
    id: 5074,
    questionId: 1037,
    votes: 6,
    isAccepted: false,
    createdAt: '2024-12-30T12:15:00.000Z',
    author: { name: 'laura m', reputation: 1250 },
    content: 'Everything bagel seasoning + broccoli = instant win.'
  },

  // Q1038 Remote work
  {
    id: 5075,
    questionId: 1038,
    votes: 27,
    isAccepted: true,
    createdAt: '2024-12-14T09:20:00.000Z',
    author: { name: 'Alan K', reputation: 2100 },
    content: 'Join a local coworking day once a week and one online community with scheduled “focus rooms.” End the day with a shutdown ritual and a short walk to simulate a commute.'
  },
  {
    id: 5076,
    questionId: 1038,
    votes: 4,
    isAccepted: false,
    createdAt: '2024-12-14T12:10:00.000Z',
    author: { name: 'Daniel Park', reputation: 2900 },
    content: 'Weekly 1:1s purely for social catch‑up helped our team a lot.'
  },

  // Q1039 Compound interest
  {
    id: 5077,
    questionId: 1039,
    votes: 36,
    isAccepted: true,
    createdAt: '2024-11-29T08:30:00.000Z',
    author: { name: 'Maria H', reputation: 1700 },
    content: 'Use the “snowball” story: each day the snowball rolls and picks up more snow—including yesterday’s. A jar with pennies that double each day (start with 1, 2, 4, 8) makes the idea click visually.'
  },
  {
    id: 5078,
    questionId: 1039,
    votes: 5,
    isAccepted: false,
    createdAt: '2024-11-29T12:05:00.000Z',
    author: { name: 'pennywise', reputation: 2000 },
    content: 'We drew a chart together; seeing the curve made it “wow.”'
  },

  // Q1040 Entry camera
  {
    id: 5079,
    questionId: 1040,
    votes: 33,
    isAccepted: true,
    createdAt: '2024-11-13T08:20:00.000Z',
    author: { name: 'Grace L', reputation: 2200 },
    content: 'Buy used APS‑C with kit lens and a fast prime (e.g., 35mm f/1.8). Prioritize ergonomics and autofocus over megapixels. Spend time learning exposure; cameras age slowly, skills don’t.'
  },
  {
    id: 5080,
    questionId: 1040,
    votes: 6,
    isAccepted: false,
    createdAt: '2024-11-13T12:10:00.000Z',
    author: { name: 'frame.by.frame', reputation: 2100 },
    content: 'Rent before buying to test handling. Some “perfect” cameras feel wrong in hand.'
  },

  // Q1041 HearDirectClub Nova
  {
    id: 5081,
    questionId: 1041,
    votes: 27,
    isAccepted: true,
    createdAt: '2025-08-09T12:00:00.000Z',
    author: { name: 'Michael', reputation: 0 },
    content: 'They\'re great for the price and I\'ve tried many. They obviously don\'t hold up to more premium models like phonak or Jabara enhance but those will run you a few thousand bucks. I\'m on a budget and they\'re perfect for me.'
  },
  {
    id: 5082,
    questionId: 1041,
    votes: 11,
    isAccepted: false,
    createdAt: '2025-08-09T14:30:00.000Z',
    author: { name: 'Sarah K', reputation: 0 },
    content: 'This page convinced me to buy mine. Had them for over a year now and I love them!'
  },
  {
    id: 5083,
    questionId: 1041,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-08-09T15:00:00.000Z',
    author: { name: 'David Chen', reputation: 0 },
    content: 'You get what you for but don\'t expect much for $300'
  },
  {
    id: 5084,
    questionId: 1041,
    parentAnswerId: 5083,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-09T16:10:00.000Z',
    author: { name: 'Linda M', reputation: 0 },
    content: 'I\'ve been wearing aids for 15 years and have had MANY brands. For $300, they\'re actually pretty good'
  },
  {
    id: 5085,
    questionId: 1041,
    votes: 12,
    isAccepted: false,
    createdAt: '2025-08-09T17:00:00.000Z',
    author: { name: 'James', reputation: 0 },
    content: 'I have mild hearing loss with constant tinnitus and have been using the atom pro 2 for a while now. It makes voices sound clearer and helps me follow convos without asking people to repeat themselves. My tinnitus feels less noticeable when I\'m wearing it which has been a nice bonus. For something simple and affordable it\'s honestly worked better than I expected.'
  },
  {
    id: 5086,
    questionId: 1041,
    votes: 9,
    isAccepted: false,
    createdAt: '2025-08-09T18:00:00.000Z',
    author: { name: 'Karen R', reputation: 0 },
    content: 'I\'ve been pretty satisfied. I didn\'t realize my hearing was slipping as much as it was, but I was definitely missing bits in group conversations or when there was background noise. These have made a noticeable difference. They\'re comfortable, recharge easily, and are low-profile, which I like. For the price, they\'re a good choice if you just need some extra help without dropping $$$$$$'
  },
  {
    id: 5087,
    questionId: 1041,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-09T19:00:00.000Z',
    author: { name: 'Tom', reputation: 0 },
    content: 'I\'m following. I have mild hearing loss and am wondering if these might be a good first pair to try out, as needed. Did you get them? If so, how are they working out?'
  },
  {
    id: 5088,
    questionId: 1041,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-09T20:00:00.000Z',
    author: { name: 'Jennifer L', reputation: 0 },
    content: 'My first pair were defective so I sent them back. My current pair has lasted so far for a year. Very happy with them.'
  },
  {
    id: 5089,
    questionId: 1041,
    votes: 14,
    isAccepted: false,
    createdAt: '2025-08-09T21:00:00.000Z',
    author: { name: 'Robert', reputation: 0 },
    content: 'I have used prescription hearing aids for a while and when the batteries started losing charge faster I decided to try Nova. They work well. The sound quality is better with prescription but Audien still amplifies very well. For a first pair I would suggest trying Nova. If you notice you are missing the finer details you might want to go with prescription and get help from an audiologist for adjustments.'
  },
  {
    id: 5090,
    questionId: 1041,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-08-09T22:00:00.000Z',
    author: { name: 'Amanda T', reputation: 0 },
    content: 'If you can follow conversations fine one on one but struggle when things get loud these might be worth trying. My FIL has mild hearing loss and has been using the Nova for some time. It will not restore hearing but it has made a big difference for him in noisy places. They also cost far less than traditional hearing aids.'
  },
  {
    id: 5091,
    questionId: 1041,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-08-09T23:10:00.000Z',
    author: { name: 'Alex', reputation: 0 },
    content: 'I haven\'t tried them but they\'re really popular. A few of my coworkers have them and seem to like them'
  },
  {
    id: 5092,
    questionId: 1041,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-08-09T23:12:00.000Z',
    author: { name: 'Patricia', reputation: 0 },
    content: 'It doesn\'t stack up to clinical grade prescription hearing aids, obviously. But they certainly work and far better than other brands I\'ve tried under $500. Great sound, decent noise control, relatively comfortably to wear. Customer support is responsive and friendly. Don\'t expect the world but if you just want to hear better without a ton of bells and whistles then it\'s a good choice.'
  },
  {
    id: 5093,
    questionId: 1041,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-09T23:14:00.000Z',
    author: { name: 'Carol', reputation: 0 },
    content: 'My husband and I have a pair and we absolutely love them.'
  },
  {
    id: 5094,
    questionId: 1041,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-09T23:16:00.000Z',
    author: { name: 'Mark T', reputation: 0 },
    content: 'Didn\'t work for me for I\'m pretty much def. Needed something stronger. I didn\'t have a problem getting my money back so +1 for that.'
  },
  {
    id: 5095,
    questionId: 1041,
    votes: 12,
    isAccepted: false,
    createdAt: '2025-08-09T23:20:00.000Z',
    author: { name: 'Jessica M', reputation: 0 },
    content: 'Nova is a simple and effective hearing aid My grandfather had been using his old hearing aid for years, but it was getting worn out and barely worked. We had to shout to get his attention, and even then, he still had trouble hearing. It was tough on all of us, so I decided to get him this OTC hearing aid for seniors.\n\nThis new hearing aid is much smaller and more stylish than his old one. It\'s almost invisible when he wears it, and unless someone\'s really paying attention, they won\'t even notice he has it on. This is great for my grandfather, who cares a lot about looking good.\n\nThe hearing aid works well, too. It\'s lightweight and easy for him to put in his ear. Since he started using this new hearing aid, things have been so much easier for him.'
  },
  {
    id: 5096,
    questionId: 1041,
    votes: 15,
    isAccepted: false,
    createdAt: '2025-08-09T23:25:00.000Z',
    author: { name: 'Richard K', reputation: 0 },
    content: 'About ten years ago I had my hearing tested by an audiologist who told me I had moderate hearing loss. I lived with it for a long time and just got used to making adjustments. About six months ago I decided to get tested again. This time I went to a large national retail chain that is known for doing hearing tests and selling hearing aids along with thousands of other products. The results were the same as before. They had me try on their recommended hearing aids right there in the store. I walked around with them for about thirty minutes just to see what they were like but I could not bring myself to make the purchase right then.\n\nA few days ago I went to my doctor for my annual physical. When the subject of my hearing came up he told me that better hearing can actually lower the risk of dementia. That was the push I needed to finally take it seriously. After that appointment I spent a lot of time doing careful research, reading reviews, and comparing all the different options. In the end I decided these hearing aids were the best choice for my situation. I have now finished my first full day wearing them and so far they have been wonderful.'
  },
  {
    id: 5097,
    questionId: 1041,
    votes: 18,
    isAccepted: false,
    createdAt: '2025-08-09T23:29:00.000Z',
    author: { name: 'Susan L', reputation: 0 },
    content: 'Got these for my 88 year old dad who has hearing loss from age and Chemotherapy...unequal (more in one ear than the other). He has used them for over 1 year now. Here are the pros/cons:\n\nPROS\n- Very simple to use\n- Great sound quality\n- Battery charging easy (nice little case and magnetic dock)\n- Cleaning and maintenance pretty easy (order the little kit with brush, extra ear domes, wax guards)\n- Support is fast and friendly and seem to be US based\n\nCons\n- I wish there were an app to control the settings but can\'t complain for the price\n- It took some trial error to find the right ear domes that fit comfortably\n\nOverall they\'re great little hearing aids'
  },
  // Q1042 Next.js migration
  {
    id: 5098,
    questionId: 1042,
    votes: 57,
    isAccepted: false,
    createdAt: '2025-08-08T17:00:00.000Z',
    author: { name: 'Dan', reputation: 4300 },
    content: 'Treat it as two steps: (1) lift to 14 on Pages Router; (2) gradually migrate features to App Router. Keep your existing pages/SSR working while you carve out new segments in /app. Ship behind a feature flag. Move one surface at a time—auth, images, dynamic routes. Verify headers/caching in each. This avoids a flag day and preserves SEO.'
  },
  {
    id: 5099,
    questionId: 1042,
    votes: 22,
    isAccepted: false,
    createdAt: '2025-08-08T18:10:00.000Z',
    author: { name: 'Luca', reputation: 2850 },
    content: 'Mind the breaking changes: next/image defaults changed, middleware now runs on the edge by default, and the new metadata API replaces next/head. Also check for unsupported webpack loaders—most move to custom config or SWC plugins.'
  },
  {
    id: 5100,
    questionId: 1042,
    votes: 13,
    isAccepted: false,
    createdAt: '2025-08-08T19:00:00.000Z',
    author: { name: 'Priya Singh', reputation: 4800 },
    content: 'SEO: migrate critical pages first and keep slugs/params identical. Add server redirects (308) for any route changes. Validate with Search Console’s URL inspection. Don’t forget sitemap/robots updates.'
  },
  {
    id: 5101,
    questionId: 1042,
    votes: 9,
    isAccepted: false,
    createdAt: '2025-08-08T19:45:00.000Z',
    author: { name: 'Eric', reputation: 2100 },
    content: 'Auth “just working” can hide issues: cookies vs JWT, edge/runtime differences, and headers in Route Handlers. Start with a single protected route before moving the rest.'
  },
  {
    id: 5102,
    questionId: 1042,
    votes: 61,
    isAccepted: true,
    createdAt: '2025-08-08T20:20:00.000Z',
    author: { name: 'Sarah', reputation: 3500 },
    content: 'Playbook: \n1) Upgrade to 14, fix deps.\n2) Create /app for one leaf route.\n3) Shift data fetching to server components + Route Handlers.\n4) Replace next/head with metadata, next/image with the new props.\n5) Turn on static params for stable paths.\n6) Observe metrics (TTFB, errors).\nRepeat. This yields incremental wins without downtime.'
  },
  {
    id: 5103,
    questionId: 1042,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-08T21:00:00.000Z',
    author: { name: 'Mike', reputation: 1800 },
    content: 'Migrating API routes? Keep /pages/api for now and move to Route Handlers when you have test coverage. Edge runtime is great, but Node was simpler for some libs.'
  },
  {
    id: 5104,
    questionId: 1042,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-08-08T21:40:00.000Z',
    author: { name: 'Jane', reputation: 1600 },
    content: 'Tiny tip: name your segment configs consistently (layout.tsx, loading.tsx, error.tsx). Keeps mental overhead low during the transition.'
  },

  // Q1043 HYSA vs T‑Bills
  {
    id: 5105,
    questionId: 1043,
    votes: 28,
    isAccepted: false,
    createdAt: '2025-08-07T12:00:00.000Z',
    author: { name: 'Mark', reputation: 6100 },
    content: 'Emergency funds prioritize access, not yield. HYSA: instant, FDIC/NCUA, variable rate. T‑Bills: slightly higher, but settlement/roll risk and you might need to sell early (small price risk). I keep 3 months in HYSA, rest laddered bills.'
  },
  {
    id: 5106,
    questionId: 1043,
    votes: 41,
    isAccepted: true,
    createdAt: '2025-08-07T13:30:00.000Z',
    author: { name: 'Amy', reputation: 2000 },
    content: 'Simple decision tree: If a true “tonight I need cash” scenario is plausible → HYSA. If your emergencies are usually a few days out (car repair scheduling, etc.) → ladder 4–13 week bills and keep a month in HYSA. Don’t chase an extra 10 bps and add friction.'
  },
  {
    id: 5107,
    questionId: 1043,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-08-07T14:15:00.000Z',
    author: { name: 'Ryan', reputation: 2400 },
    content: 'Taxes matter. In high‑tax states, T‑Bills may be state‑tax free. Run after‑tax yields before deciding.'
  },

  // Q1044 Time blocking
  {
    id: 5108,
    questionId: 1044,
    votes: 19,
    isAccepted: false,
    createdAt: '2025-08-05T10:00:00.000Z',
    author: { name: 'Kate', reputation: 1900 },
    content: 'Shrink the unit. If you can’t honor 2‑hour blocks, try 25/5 Pomodoros inside a loose block. Blocks give direction; the timer gives momentum.'
  },
  {
    id: 5109,
    questionId: 1044,
    votes: 15,
    isAccepted: false,
    createdAt: '2025-08-05T10:45:00.000Z',
    author: { name: 'Lee F', reputation: 1750 },
    content: 'Add buffer blocks. I hold 2 × 30‑min overflow slots daily. Without buffers, one slip wrecks the whole plan.'
  },
  {
    id: 5110,
    questionId: 1044,
    votes: 11,
    isAccepted: false,
    createdAt: '2025-08-05T11:30:00.000Z',
    author: { name: 'Maria', reputation: 2200 },
    content: 'Don’t over‑specify. Label a block “Deep work: project A” instead of “Write section 2.3.1”. Too granular → brittle.'
  },
  {
    id: 5111,
    questionId: 1044,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-08-05T12:00:00.000Z',
    author: { name: 'Tom', reputation: 3000 },
    content: 'Schedule your work energy, not your time. My brain’s best 9–12 → hard tasks. Afternoons → meetings and shallow tasks. Sounds obvious; changed everything.'
  },
  {
    id: 5112,
    questionId: 1044,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-05T12:45:00.000Z',
    author: { name: 'Jessica', reputation: 2800 },
    content: 'Audit your week first: where did blocks break? Causes: meetings, unclear scope, interruptions. Fix the cause before you redraw the calendar.'
  },
  {
    id: 5113,
    questionId: 1044,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-05T13:20:00.000Z',
    author: { name: 'Alex', reputation: 3200 },
    content: 'Tooling: any calendar + a task app with Today view. Fancy apps won’t fix overcommitting.'
  },
  {
    id: 5114,
    questionId: 1044,
    votes: 33,
    isAccepted: true,
    createdAt: '2025-08-05T14:00:00.000Z',
    author: { name: 'Grace', reputation: 2600 },
    content: 'Weekly cadence: \n- Friday: Plan next week; cap at 60% load.\n- Daily: Move tasks into blocks in the morning.\n- Noon: 10‑min replanning.\n- Evening: Mark what slipped; schedule a buffer.\nHard rule: never “borrow” from sleep or workouts to pay calendar debt.'
  },
  {
    id: 5115,
    questionId: 1044,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-08-05T14:20:00.000Z',
    author: { name: 'Ryan', reputation: 2400 },
    content: 'Interruptions? Use a visible “focus on” status. People ping less when your status says “heads down – reviewing PRD until 11:30”.'
  },
  {
    id: 5116,
    questionId: 1044,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-05T15:00:00.000Z',
    author: { name: 'John', reputation: 1500 },
    content: 'Time blocking works only if you protect it. Close Slack. Seriously.'
  },

  // Q1045 Sourdough
  {
    id: 5117,
    questionId: 1045,
    votes: 18,
    isAccepted: false,
    createdAt: '2025-08-04T15:00:00.000Z',
    author: { name: 'Anna', reputation: 2050 },
    content: 'At 82°F you’re over‑fermenting. Switch to 1:3:3 feed (starter:water:flour) and use 50% bread flour for strength. Keep a small mother in the fridge; build levain same‑day.'
  },
  {
    id: 5118,
    questionId: 1045,
    votes: 10,
    isAccepted: false,
    createdAt: '2025-08-04T16:10:00.000Z',
    author: { name: 'Maya Patel', reputation: 4800 },
    content: 'Hydration tweak: drop to ~65% until temps cool. Cover with a breathable cloth, not airtight lids—CO₂ buildup can suppress activity.'
  },
  {
    id: 5119,
    questionId: 1045,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-08-04T17:00:00.000Z',
    author: { name: 'Steve', reputation: 1200 },
    content: 'Try a rye kick‑start: 10% whole rye in feeds for a few cycles. The enzymes wake it up.'
  },
  {
    id: 5120,
    questionId: 1045,
    votes: 26,
    isAccepted: true,
    createdAt: '2025-08-04T17:45:00.000Z',
    author: { name: 'Rachel', reputation: 3900 },
    content: 'Process: split your starter. Keep one cool in the fridge (backup). The working jar: 1:4:4 at morning, store near 75°F (cooler spot, even a wine cooler). Use when it doubles in 3–4h, not by the clock. Heat ≠ better.'
  },
  {
    id: 5121,
    questionId: 1045,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-04T18:20:00.000Z',
    author: { name: 'Dan', reputation: 4300 },
    content: 'Or just bake more frequently. A fed, active culture hates long summer sits.'
  },

  // Q1046 Global Entry
  {
    id: 5122,
    questionId: 1046,
    votes: 24,
    isAccepted: false,
    createdAt: '2025-08-03T20:00:00.000Z',
    author: { name: 'Noah', reputation: 3900 },
    content: 'Worth it if you do even one international return each year. GE gets you PreCheck plus kiosk re‑entry; worst case it’s still faster than the main line. Interview backlog exists but Enrollment on Arrival works.'
  },
  {
    id: 5123,
    questionId: 1046,
    votes: 12,
    isAccepted: false,
    createdAt: '2025-08-03T20:40:00.000Z',
    author: { name: 'Jane', reputation: 1600 },
    content: 'Some airports have Pre lines as long as regular at peak. The difference is consistency and shoes/laptop staying in the bag. Still worth it for me.'
  },
  {
    id: 5124,
    questionId: 1046,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-08-03T21:10:00.000Z',
    author: { name: 'Alex', reputation: 3200 },
    content: 'Check credit cards: many reimburse GE/Pre fee every 4–5 years. That makes the math easy.'
  },
  {
    id: 5125,
    questionId: 1046,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-03T21:50:00.000Z',
    author: { name: 'Chris', reputation: 5200 },
    content: 'Gotcha: name mismatch across reservations, passport, and GE will cause manual review. Make them identical (middle names too).'
  },
  {
    id: 5126,
    questionId: 1046,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-03T22:20:00.000Z',
    author: { name: 'Maya', reputation: 4800 },
    content: 'If you never travel internationally, Pre only is fine. But GE kiosks saved me an hour at SFO last month.'
  },
  {
    id: 5127,
    questionId: 1046,
    votes: 29,
    isAccepted: true,
    createdAt: '2025-08-03T22:50:00.000Z',
    author: { name: 'Fiona', reputation: 2200 },
    content: 'Enrollment on Arrival tip: land early, follow the signs before baggage claim. Took 12 minutes, no appointment. That alone made GE “worth it”.'
  },
  {
    id: 5128,
    questionId: 1046,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-08-03T23:10:00.000Z',
    author: { name: 'Nina', reputation: 2300 },
    content: 'International kids? Check age rules; sometimes you’ll want NEXUS if near Canada—cheaper, covers GE.'
  },
  {
    id: 5129,
    questionId: 1046,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-03T23:35:00.000Z',
    author: { name: 'Paul', reputation: 4100 },
    content: 'If interviews are jammed, keep checking portals at 12:00 local. Drops happen.'
  },
  {
    id: 5130,
    questionId: 1046,
    votes: 2,
    isAccepted: false,
    createdAt: '2025-08-04T00:05:00.000Z',
    author: { name: 'Helen', reputation: 9100 },
    content: 'I value the predictability more than the average time saved. Traveling with kids, predictable lines = sanity.'
  },

  // Q1047 1440p vs 4K
  {
    id: 5131,
    questionId: 1047,
    votes: 25,
    isAccepted: true,
    createdAt: '2025-08-02T13:00:00.000Z',
    author: { name: 'Kevin', reputation: 6100 },
    content: '1440p 144–240 Hz is still the sweet spot. You get high FPS for shooters, and single‑player looks great with upscaling. 4K is gorgeous but you’ll live in DLSS/FSR and still dip under 60 on newer titles.'
  },
  {
    id: 5132,
    questionId: 1047,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-02T13:45:00.000Z',
    author: { name: 'Chris', reputation: 5200 },
    content: 'If you mostly play indie/retro or sim racers, 4K can work. But for competitive shooters, frames > pixels.'
  },

  // Q1048 Bathroom paint
  {
    id: 5133,
    questionId: 1048,
    votes: 12,
    isAccepted: false,
    createdAt: '2025-08-01T18:00:00.000Z',
    author: { name: 'Lisa', reputation: 2400 },
    content: 'Modern satin labeled “bath” paints are fine. Semi‑gloss shows every roller mark in small rooms. Use a mildew‑resistant primer on trouble spots only.'
  },
  {
    id: 5134,
    questionId: 1048,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-08-01T18:40:00.000Z',
    author: { name: 'Eric', reputation: 2100 },
    content: 'Ventilation beats paint. Run a stronger fan and leave the door cracked after showers. Your paint will last longer regardless of sheen.'
  },
  {
    id: 5135,
    questionId: 1048,
    votes: 17,
    isAccepted: true,
    createdAt: '2025-08-01T19:10:00.000Z',
    author: { name: 'Amy', reputation: 2000 },
    content: 'Primer: spot prime stains with a shellac or alkyd. Then two thin coats of quality satin (bath formula). Caulk gaps, and cut‑in with a sash brush for a clean line.'
  },
  {
    id: 5136,
    questionId: 1048,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-01T19:50:00.000Z',
    author: { name: 'Tom', reputation: 3000 },
    content: 'If the walls are glossy now, scuff sand first. Paint doesn’t stick to shine.'
  },

  // Q1049 Resource guarding
  {
    id: 5137,
    questionId: 1049,
    votes: 20,
    isAccepted: false,
    createdAt: '2025-07-31T09:00:00.000Z',
    author: { name: 'Sarah', reputation: 3500 },
    content: 'Start with trade‑up games: present a higher‑value treat, mark “yes,” and take the item calmly, then return it. Never chase; build trust that giving up stuff pays.'
  },
  {
    id: 5138,
    questionId: 1049,
    votes: 11,
    isAccepted: false,
    createdAt: '2025-07-31T09:40:00.000Z',
    author: { name: 'Rachel', reputation: 3900 },
    content: 'Management: pick up bowls/toys when guests come. Feed behind a gate. Prevention is training too.'
  },
  {
    id: 5139,
    questionId: 1049,
    votes: 9,
    isAccepted: false,
    createdAt: '2025-07-31T10:10:00.000Z',
    author: { name: 'Nina', reputation: 2300 },
    content: 'Teach “drop” and “leave it” separately. Practice with boring objects first, then move up the value ladder. Keep reps short.'
  },
  {
    id: 5140,
    questionId: 1049,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-07-31T10:40:00.000Z',
    author: { name: 'Mike', reputation: 1800 },
    content: 'Avoid punishment around food. You’ll make the guarding worse by teaching the dog that hands near the bowl = loss.'
  },
  {
    id: 5141,
    questionId: 1049,
    votes: 26,
    isAccepted: true,
    createdAt: '2025-07-31T11:20:00.000Z',
    author: { name: 'Alex', reputation: 3200 },
    content: 'Protocol: \n1) Hand‑feed meals for 1–2 weeks.\n2) Toss higher‑value treats into the bowl while dog eats (approach → good things).\n3) Swap high‑value chews for a jackpot treat, then give chew back.\n4) Generalize with different people. If there’s a bite history, bring in a qualified behaviorist.'
  },
  {
    id: 5142,
    questionId: 1049,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-07-31T11:50:00.000Z',
    author: { name: 'Paul', reputation: 4100 },
    content: 'Vet check: rule out pain. Sudden guarding sometimes = dental or GI discomfort.'
  },
  {
    id: 5143,
    questionId: 1049,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-07-31T12:20:00.000Z',
    author: { name: 'Jane', reputation: 1600 },
    content: 'We had success with scatter‑feeding in the yard. It removed the “this is my bowl” mindset.'
  },
  {
    id: 5144,
    questionId: 1049,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-07-31T12:55:00.000Z',
    author: { name: 'Elena', reputation: 1800 },
    content: 'Don’t forget decompression. New rescues need weeks of calm before big training goals.'
  },

  // Q1050 Cold plunge science
  {
    id: 5145,
    questionId: 1050,
    votes: 17,
    isAccepted: false,
    createdAt: '2025-07-29T11:00:00.000Z',
    author: { name: 'Helen', reputation: 9100 },
    content: 'Meta‑analyses show small to moderate reductions in DOMS and perceived fatigue. Performance effects vary by sport. Big caveat: immediate cold may blunt hypertrophy signaling—delay 4–6 hours after lifting if muscle growth is a goal.'
  },
  {
    id: 5146,
    questionId: 1050,
    votes: 31,
    isAccepted: true,
    createdAt: '2025-07-29T11:45:00.000Z',
    author: { name: 'Priya', reputation: 4500 },
    content: 'Protocol: 10–15°C (50–59°F) water, 5–10 minutes, 2–3×/week for general recovery. Avoid daily plunges post‑strength sessions if you’re prioritizing hypertrophy. Benefits: sleep onset and mood for some people; risks: cold‑shock, arrhythmias—talk to your doc if cardiac history.'
  },
  {
    id: 5147,
    questionId: 1050,
    votes: 9,
    isAccepted: false,
    createdAt: '2025-07-29T12:10:00.000Z',
    author: { name: 'Ryan', reputation: 2400 },
    content: 'Placebo’s a thing, but if it helps you adhere to training and it’s safe, it’s fine. Don’t blow your budget on a tub; a cold shower + ice bags works.'
  },
  {
    id: 5148,
    questionId: 1050,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-07-29T12:40:00.000Z',
    author: { name: 'Grace', reputation: 2600 },
    content: 'Endurance athletes sometimes benefit more than lifters. Anecdotally I sleep better on plunge days.'
  },
  {
    id: 5149,
    questionId: 1050,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-07-29T13:05:00.000Z',
    author: { name: 'Alex', reputation: 3200 },
    content: 'Contraindications: Raynaud’s, uncontrolled hypertension. Start with hands/forearms first to test tolerance.'
  },
  {
    id: 5150,
    questionId: 1050,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-07-29T13:30:00.000Z',
    author: { name: 'Jane', reputation: 1600 },
    content: 'If you hate being cold, contrast showers (hot/cold) give some of the alertness benefit with less suffering.'
  },

  // Q1051 Mortgage points
  {
    id: 5151,
    questionId: 1051,
    votes: 14,
    isAccepted: false,
    createdAt: '2025-07-28T15:00:00.000Z',
    author: { name: 'Paul', reputation: 4100 },
    content: 'Buying points is prepaying interest. If you’ll refinance soon, you may not recoup. Compute breakeven months = cost of points / monthly savings, then add refi costs + time value of money.'
  },
  {
    id: 5152,
    questionId: 1051,
    votes: 22,
    isAccepted: true,
    createdAt: '2025-07-28T15:40:00.000Z',
    author: { name: 'Elena', reputation: 1800 },
    content: 'Rule of thumb: if breakeven < planned stay AND you’re not cash‑constrained, points can work. Otherwise, take a lender credit and keep cash for reserves. Refi optionality is valuable when rates trend down.'
  },
  {
    id: 5153,
    questionId: 1051,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-07-28T16:10:00.000Z',
    author: { name: 'Mike', reputation: 1800 },
    content: 'Watch for builder‑tied lenders. Compare APR apples‑to‑apples and don’t ignore prepayment penalties.'
  },
  
  // Q1052 AI product photos
  {
    id: 5154,
    questionId: 1052,
    votes: 12,
    isAccepted: true,
    createdAt: '2025-08-10T09:50:00.000Z',
    author: { name: 'L. Moreno', reputation: 2700 },
    content: 'Yes—shoot in a cheap lightbox with two diffused lights, export RAW/HEIF if you can, then use background removal + AI relight conservatively. Keep shadows! Avoid plastic‑looking smoothing; add a tiny film grain to hide artifacts. Works fine for web‑scale images.'
  },
  
  // Q1053 Roth vs Traditional 401k
  {
    id: 5155,
    questionId: 1053,
    votes: 29,
    isAccepted: false,
    createdAt: '2025-08-09T17:10:00.000Z',
    author: { name: 'CPA_Jules', reputation: 5200 },
    content: 'Tax arbitrage 101: contribute pre‑tax in high‑income years (marginal 32%+), switch to Roth in low years, and do Roth conversions in off years. Model with today’s brackets, not vibes.'
  },
  {
    id: 5156,
    questionId: 1053,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-08-09T17:20:00.000Z',
    author: { name: 'Aria', reputation: 2400 },
    content: 'Rule of thumb: if your present marginal > expected retirement marginal, go Traditional; otherwise Roth. Edge cases: ACA subsidies, QSBS, big one‑time deductions.'
  },
  {
    id: 5157,
    questionId: 1053,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-08-09T17:35:00.000Z',
    author: { name: 'notlegaladvice', reputation: 1300 },
    content: 'Make a simple year‑by‑year table: income, deductions, marginal bracket, target contribution type. You’ll see the pattern fast. It’s… boring, which is good.'
  },
  {
    id: 5158,
    questionId: 1053,
    votes: 11,
    isAccepted: false,
    createdAt: '2025-08-09T17:45:00.000Z',
    author: { name: 'Sven', reputation: 3100 },
    content: 'Spreadsheet sim: assume two scenarios with 6% real returns, different tax rates now vs later. Look at after‑tax balances, not pre‑tax totals (they lie).'
  },
  {
    id: 5159,
    questionId: 1053,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-09T18:05:00.000Z',
    author: { name: 'Mira', reputation: 1800 },
    content: 'If income whipsaws, consider defaulting to Traditional through the year and flip to Roth in Q4 once you can estimate bracket more precisely.'
  },
  {
    id: 5160,
    questionId: 1053,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-09T18:20:00.000Z',
    author: { name: 'Ken', reputation: 2100 },
    content: 'Also watch state taxes. In a no‑tax state now but move later? Roth looks nicer. Opposite move? Pre‑tax wins.'
  },
  {
    id: 5161,
    questionId: 1053,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-09T18:45:00.000Z',
    author: { name: 'Tess', reputation: 1500 },
    content: 'I split 70/30 Roth/Traditional most years as a hedge. Not optimal mathematically, but it keeps me saving. Behavior matters.'
  },
  {
    id: 5162,
    questionId: 1053,
    votes: 10,
    isAccepted: false,
    createdAt: '2025-08-09T19:05:00.000Z',
    author: { name: 'Rajat', reputation: 2600 },
    content: 'If you rely on ACA subsidies in lean years, be careful with Roth conversions—they can nuke your credit. Plan conversions outside subsidy windows.'
  },
  {
    id: 5163,
    questionId: 1053,
    votes: 36,
    isAccepted: true,
    createdAt: '2025-08-09T19:20:00.000Z',
    author: { name: 'Daria', reputation: 3700 },
    content: 'Framework: (1) Estimate this year’s marginal. (2) If ≥ 32% fed, go Traditional; if ≤ 22%, go Roth; 24% is a toss‑up—mix. (3) Re‑evaluate in Q4. (4) Use off‑years for Roth conversions up to the top of your chosen bracket.'
  },
  {
    id: 5164,
    questionId: 1053,
    votes: 2,
    isAccepted: false,
    createdAt: '2025-08-09T19:40:00.000Z',
    author: { name: 'Mo', reputation: 900 },
    content: 'Optionality > precision. The goal is saving enough; tax alpha is second order.'
  },
  
  // Q1054 Desert tent
  {
    id: 5165,
    questionId: 1054,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-08-08T10:00:00.000Z',
    author: { name: 'Kai', reputation: 1700 },
    content: 'UL fabrics + gusty sand = sad fly. Take a lower silhouette and more guy‑out points. Weight saved isn’t worth a shredded night.'
  },
  {
    id: 5166,
    questionId: 1054,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-08T10:20:00.000Z',
    author: { name: 'Jess', reputation: 1400 },
    content: 'Stake choice matters more than you think—Y‑stakes or sand stakes + deadmen. Pitch behind rocks/bushes when possible.'
  },
  {
    id: 5167,
    questionId: 1054,
    votes: 19,
    isAccepted: true,
    createdAt: '2025-08-08T10:50:00.000Z',
    author: { name: 'Hector', reputation: 2800 },
    content: 'Go semi‑freestanding, low profile, solid inner to block spindrift. Guy everything. If UL, bring repair tape. Desert wind is relentless.'
  },
  
  // Q1055 Remember non‑fiction
  {
    id: 5168,
    questionId: 1055,
    votes: 15,
    isAccepted: false,
    createdAt: '2025-08-07T13:20:00.000Z',
    author: { name: 'Nora', reputation: 2300 },
    content: 'Feynman technique: explain the chapter to a rubber duck (or friend) in plain words. If you can’t, you didn’t learn it.'
  },
  {
    id: 5169,
    questionId: 1055,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-08-07T13:40:00.000Z',
    author: { name: 'audio_bookworm', reputation: 1200 },
    content: 'Audiobooks? Switch to 1.2× and use chapter end notes: 3 bullets of what matters. No more.'
  },
  {
    id: 5170,
    questionId: 1055,
    votes: 10,
    isAccepted: false,
    createdAt: '2025-08-07T14:00:00.000Z',
    author: { name: 'Gina', reputation: 2600 },
    content: 'Don’t highlight everything. Make one “distillation” page per book and link it to 3 problems you actually have.'
  },
  {
    id: 5171,
    questionId: 1055,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-08-07T14:20:00.000Z',
    author: { name: 'Theo', reputation: 1500 },
    content: 'Evergreen notes > book notes. Save ideas in your own words categorized by problem, not by book.'
  },
  {
    id: 5172,
    questionId: 1055,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-07T14:35:00.000Z',
    author: { name: 'Jody', reputation: 900 },
    content: 'TL;DR card per book: 3 sentences, 1 behavior change, 1 quote. Tape it somewhere.'
  },
  {
    id: 5173,
    questionId: 1055,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-07T14:55:00.000Z',
    author: { name: 'Tim', reputation: 800 },
    content: 'Weird tip: read fewer books. Reread the 2 that actually matter to you. Depth beats breadth.'
  },
  {
    id: 5174,
    questionId: 1055,
    votes: 28,
    isAccepted: true,
    createdAt: '2025-08-07T15:10:00.000Z',
    author: { name: 'Ada', reputation: 3400 },
    content: 'System: (1) Pre‑read a ToC + skim. (2) While reading, write ONE question you’ll act on. (3) After: draft a 5‑bullet summary to future‑you and schedule a 2‑week review (calendar). (4) Apply one idea that week. Memory follows action.'
  },
  
  // Q1056 Toddler bedtime
  {
    id: 5175,
    questionId: 1056,
    votes: 9,
    isAccepted: false,
    createdAt: '2025-08-06T19:50:00.000Z',
    author: { name: 'Renee', reputation: 2000 },
    content: 'Sticker chart + “bedtime pass.” They get one pass per night for a legit need; when it’s used, that’s it. Works shockingly well.'
  },
  {
    id: 5176,
    questionId: 1056,
    votes: 18,
    isAccepted: true,
    createdAt: '2025-08-06T20:10:00.000Z',
    author: { name: 'PediatricRN', reputation: 4800 },
    content: 'Predictable steps posted on the wall, same order, 20–30 mins. Offer two bounded choices. Walk‑back method for jack‑in‑the‑box. Calm, boring, consistent.'
  },
  
  // Q1057 TV tracking
  {
    id: 5177,
    questionId: 1057,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-05T10:00:00.000Z',
    author: { name: 'TraktFan', reputation: 2100 },
    content: 'Trakt + a client app (e.g., SeriesGuide). Mark watched, get calendar and push alerts. Syncs across devices.'
  },
  {
    id: 5178,
    questionId: 1057,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-05T10:15:00.000Z',
    author: { name: 'ReelgoodUser', reputation: 900 },
    content: 'Reelgood shows where to watch + notifies new episodes. Not perfect data, but close enough.'
  },
  {
    id: 5179,
    questionId: 1057,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-05T10:25:00.000Z',
    author: { name: 'OldSchool', reputation: 700 },
    content: 'Use a spreadsheet lol. One tab per show. Works since 2014. Do not @ me.'
  },
  {
    id: 5180,
    questionId: 1057,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-08-05T10:40:00.000Z',
    author: { name: 'Nina', reputation: 2300 },
    content: 'Calendar sub from the network’s iCal + notifications. Stupid simple.'
  },
  {
    id: 5181,
    questionId: 1057,
    votes: 2,
    isAccepted: false,
    createdAt: '2025-08-05T10:55:00.000Z',
    author: { name: 'Hal', reputation: 1200 },
    content: 'JustWatch for where‑to‑watch, Trakt for the rest. Combo is best imo.'
  },
  {
    id: 5182,
    questionId: 1057,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-08-05T11:10:00.000Z',
    author: { name: 'Luca', reputation: 1250 },
    content: 'Home Assistant + a notification when a show drops (RSS → webhook). Nerdy but tidy.'
  },
  {
    id: 5183,
    questionId: 1057,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-05T11:25:00.000Z',
    author: { name: 'PlexIsLife', reputation: 2800 },
    content: 'If you use Plex, there are plugins that track shows and alert you when new episodes appear on services you subscribe to.'
  },
  {
    id: 5184,
    questionId: 1057,
    votes: 1,
    isAccepted: false,
    createdAt: '2025-08-05T11:45:00.000Z',
    author: { name: 'Min', reputation: 600 },
    content: 'Notion template with a DB + relations. Overkill? yes. Also fun.'
  },
  {
    id: 5185,
    questionId: 1057,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-05T12:00:00.000Z',
    author: { name: 'Cam', reputation: 1400 },
    content: 'SeriesGuide + Trakt on Android is smooth. iOS: TV Time is decent.'
  },
  {
    id: 5186,
    questionId: 1057,
    votes: 2,
    isAccepted: false,
    createdAt: '2025-08-05T12:20:00.000Z',
    author: { name: 'annie', reputation: 800 },
    content: 'I just follow showrunners on Twitter… err X. It’s chaotic but fun.'
  },
  {
    id: 5187,
    questionId: 1057,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-05T12:40:00.000Z',
    author: { name: 'Matt', reputation: 1900 },
    content: 'If you miss episodes because of autoplay, disable autoplay. Sounds dumb, works.'
  },
  {
    id: 5188,
    questionId: 1057,
    votes: 13,
    isAccepted: true,
    createdAt: '2025-08-05T13:00:00.000Z',
    author: { name: 'Sam', reputation: 3100 },
    content: 'Pick ONE: TV Time or Trakt + a client. Turn on notifications. Archive what you drop. Less friction = you’ll actually use it.'
  },
  
  // Q1058 Brain freeze
  {
    id: 5189,
    questionId: 1058,
    votes: 9,
    isAccepted: false,
    createdAt: '2025-08-04T11:25:00.000Z',
    author: { name: 'NeuroNick', reputation: 4200 },
    content: 'It’s a sphenopalatine ganglion reflex: rapid cooling of the palate triggers vasodilation and referred pain to the forehead.'
  },
  {
    id: 5190,
    questionId: 1058,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-04T11:40:00.000Z',
    author: { name: 'Zara', reputation: 1600 },
    content: 'Fix: press your tongue to the roof of your mouth and drink something warm. Works in ~5–10s for me.'
  },
  {
    id: 5191,
    questionId: 1058,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-04T11:55:00.000Z',
    author: { name: 'tommy', reputation: 700 },
    content: 'Or just… stop eating it so fast 😂'
  },
  {
    id: 5192,
    questionId: 1058,
    votes: 15,
    isAccepted: true,
    createdAt: '2025-08-04T12:10:00.000Z',
    author: { name: 'Dr. Chen', reputation: 5100 },
    content: 'Mechanism: trigeminal nerve reacting to rapid palatal cooling; counterwarm with tongue or warm liquid. Prevention: smaller sips, let cold items hit the tongue sides first.'
  },
  
  // Q1059 Backsplash
  {
    id: 5193,
    questionId: 1059,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-08-03T19:10:00.000Z',
    author: { name: 'DIYD', reputation: 2000 },
    content: 'Peel‑and‑stick looks decent for photos, but seams and heat near the range are pain points. Good for renters if you avoid the stove area.'
  },
  {
    id: 5194,
    questionId: 1059,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-03T19:25:00.000Z',
    author: { name: 'Vic', reputation: 1450 },
    content: 'Thinset tile is forever (ish). If you do it, use a light mortar, 1/4" trowel, and a ledger board so your first row is level.'
  },
  {
    id: 5195,
    questionId: 1059,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-03T19:45:00.000Z',
    author: { name: 'Wendy', reputation: 1700 },
    content: 'Renter‑friendly middle: high‑quality peel‑and‑stick everywhere except behind the stove (leave painted), add a steel splash guard there.'
  },
  {
    id: 5196,
    questionId: 1059,
    votes: 2,
    isAccepted: false,
    createdAt: '2025-08-03T20:00:00.000Z',
    author: { name: 'Alex P', reputation: 900 },
    content: 'If walls are wavy, peel‑and‑stick will telegraph every bump. Skim coat first or skip.'
  },
  {
    id: 5197,
    questionId: 1059,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-03T20:15:00.000Z',
    author: { name: 'Momo', reputation: 600 },
    content: 'Grout choice matters more than tile in small kitchens. Light gray hides sins.'
  },
  {
    id: 5198,
    questionId: 1059,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-08-03T20:35:00.000Z',
    author: { name: 'Evan', reputation: 1200 },
    content: 'Measure outlet covers: you’ll be cutting a lot. Buy extra tiles or panels for mistakes. Dry‑fit first.'
  },
  {
    id: 5199,
    questionId: 1059,
    votes: 5,
    isAccepted: false,
    createdAt: '2025-08-03T21:00:00.000Z',
    author: { name: 'Tara', reputation: 1600 },
    content: 'If you plan to remove later, Command strips + thin PVC panels can fake a backsplash with zero wall damage.'
  },
  {
    id: 5200,
    questionId: 1059,
    votes: 2,
    isAccepted: false,
    createdAt: '2025-08-03T21:20:00.000Z',
    author: { name: 'Ben', reputation: 800 },
    content: 'Don’t run peel‑and‑stick tight to a kettle/coffee maker—steam is the enemy. Leave space.'
  },
  {
    id: 5201,
    questionId: 1059,
    votes: 16,
    isAccepted: true,
    createdAt: '2025-08-03T21:40:00.000Z',
    author: { name: 'Riley', reputation: 2600 },
    content: 'Renter plan: peel‑and‑stick everywhere except heat zones; prep walls smooth; use caulk at edges; keep receipts to match later. Owner plan: thinset + ledger, grout next day, seal. Choose based on lease + time horizon.'
  },
  
  // Q1060 Shadowing vs conversation
  {
    id: 5202,
    questionId: 1060,
    votes: 7,
    isAccepted: false,
    createdAt: '2025-08-02T10:30:00.000Z',
    author: { name: 'Paula', reputation: 2100 },
    content: 'Shadowing fixes rhythm and prosody fast. 10–15 mins/day with transcripts + mimic recording yourself.'
  },
  {
    id: 5203,
    questionId: 1060,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-02T10:45:00.000Z',
    author: { name: 'Leo', reputation: 900 },
    content: 'Conversation exposes the gaps. You won’t fix your /r/ in a vacuum—get corrected by humans.'
  },
  {
    id: 5204,
    questionId: 1060,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-02T11:00:00.000Z',
    author: { name: 'Sofia', reputation: 1800 },
    content: 'Week plan: M/W/F shadow 15m, Tu/Th 30m convo, Sat minimal pairs, Sun rest. Record once a week.'
  },
  {
    id: 5205,
    questionId: 1060,
    votes: 2,
    isAccepted: false,
    createdAt: '2025-08-02T11:15:00.000Z',
    author: { name: 'Ana', reputation: 1400 },
    content: 'If shy, do voice messages (HelloTalk/WhatsApp) so you get time to think + feedback.'
  },
  {
    id: 5206,
    questionId: 1060,
    votes: 11,
    isAccepted: true,
    createdAt: '2025-08-02T11:30:00.000Z',
    author: { name: 'Coach', reputation: 3000 },
    content: 'Both. Shadowing for cadence + muscle memory; weekly conversation to test transfer. Pick 3 sounds to target per week; measure with a short script you re‑record.'
  },
  
  // Q1061 Rent renewal
  {
    id: 5207,
    questionId: 1061,
    votes: 10,
    isAccepted: false,
    createdAt: '2025-08-01T16:45:00.000Z',
    author: { name: 'Kay', reputation: 2200 },
    content: 'Time your ask 45–30 days out. Landlords hate vacancies. Be the easy renewal.'
  },
  {
    id: 5208,
    questionId: 1061,
    votes: 8,
    isAccepted: false,
    createdAt: '2025-08-01T17:00:00.000Z',
    author: { name: 'Lee', reputation: 1700 },
    content: 'Bring comps: 3 listings with same beds/sqft within a mile. “Given market, can we do +3% instead of +9%?”'
  },
  {
    id: 5209,
    questionId: 1061,
    votes: 4,
    isAccepted: false,
    createdAt: '2025-08-01T17:20:00.000Z',
    author: { name: 'Janel', reputation: 900 },
    content: 'Offer terms not just price: 15‑month lease, flexible maintenance window, auto‑pay. It’s value to them.'
  },
  {
    id: 5210,
    questionId: 1061,
    votes: 6,
    isAccepted: false,
    createdAt: '2025-08-01T17:35:00.000Z',
    author: { name: 'Moises', reputation: 1500 },
    content: 'Email script: appreciative tone, mention zero late payments, no noise complaints, and propose a number with comps attached.'
  },
  {
    id: 5211,
    questionId: 1061,
    votes: 3,
    isAccepted: false,
    createdAt: '2025-08-01T17:55:00.000Z',
    author: { name: 'Abhi', reputation: 1100 },
    content: 'If they won’t budge, ask for a smaller increase + small concession (free repaint, deep clean, parking spot).'
  },
  {
    id: 5212,
    questionId: 1061,
    votes: 16,
    isAccepted: true,
    createdAt: '2025-08-01T18:10:00.000Z',
    author: { name: 'Greta', reputation: 2800 },
    content: 'Be kind, specific, and brief. Anchor with comps, propose a number, and give them an easy yes. The relationship is the win.'
  },
];

// Process answers with generated dates
const processAnswersWithGeneratedDates = () => {
  // Group answers by question ID
  const answersByQuestion = {};
  answers.forEach(answer => {
    if (!answersByQuestion[answer.questionId]) {
      answersByQuestion[answer.questionId] = [];
    }
    answersByQuestion[answer.questionId].push(answer);
  });

  // Process each answer with generated dates
  return answers.map(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return answer;

    const questionAnswers = answersByQuestion[answer.questionId];
    const answerIndex = questionAnswers.findIndex(a => a.id === answer.id);
    
    return {
      ...answer,
      createdAt: getCachedAnswerDate(answer.id, question.createdAt, answerIndex)
    };
  });
};

// Export processed answers with generated dates
const processedAnswers = processAnswersWithGeneratedDates();

// Optional users export (small sample)
export const users = [
  { id: 1, name: 'Henry G', reputation: 9100 },
  { id: 2, name: 'Maya Patel', reputation: 4800 },
  { id: 3, name: 'Taylor T', reputation: 2600 },
];

export { questions, processedAnswers as answers };
