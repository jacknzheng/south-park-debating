export interface Team { name: string; members: string[]; open?: boolean }
export interface Debate {
  id: string;
  title: string;
  shortTitle: string;
  date: string;
  dateLabel: string;
  time?: string;
  venue?: string;
  category: string;
  status: 'upcoming' | 'past';
  description: string;
  result?: string;
  winners?: string[];
  participants?: string[];
  judges?: string[];
  judgeTentative?: boolean;
  format?: string;
  teams?: Team[];
  image?: string;
}

// The topic poll on /topics. Votes are stored per week, so a new poll just needs a new week id.
export const poll = {
  week: '2026-10-27',
  topics: ['Free trade vs. protectionism', 'US–China geopolitics', 'Universal basic income', 'Balance of powers', 'Elections & voting'],
}

// Newest first. Incomplete rosters are kept explicit.
// This is the only file to edit when adding a debate or changing a roster.
export const debates: Debate[] = [
  {
    id: '2026-10-27', title: 'Topic up for vote',
    shortTitle: 'Topic up for vote', date: '2026-10-27',
    dateLabel: 'Tuesday, October 27', time: '6:00pm', venue: 'South Park Commons',
    category: 'To be decided', status: 'upcoming',
    description: 'Next week’s topic is chosen by vote on the Topics page.',
  },
  {
    id: '2026-10-20',
    title: 'THP a US-led world order to a multipolar world.',
    shortTitle: 'A US-led world order or a multipolar world?', date: '2026-10-20', dateLabel: 'October 20, 2026',
    category: 'Geopolitics', status: 'past',
    image: 'https://www.economist.com/content-assets/images/20251025_CND001.jpg',
    description: 'The house debated whether a US-led world order is preferable to a multipolar world.',
    result: 'Affirmative won', winners: ['Laura Bocek', 'Akshit Tyagi', 'Ryan Tsang'],
    judges: ['Karina Qian'],
  },
  {
    id: '2026-10-13',
    title: 'THW permit AI assistants to use undisclosed persuasion to protect users’ long-term wellbeing',
    shortTitle: 'Should AI nudge you for your own good?', date: '2026-10-13', dateLabel: 'October 13, 2026',
    category: 'AI & wellbeing', status: 'past', image: 'images/ai-persuasion.jpg',
    description: 'Should an AI quietly steer you toward what is good for you, even when you have said you want something else?',
    result: 'Affirmative won', winners: ['Aaquib Syed', 'Karina Qian', 'Allan Fang'],
    judges: ['Sam Miserendino', 'Laura Bocek', 'Jack Zheng'],
    teams: [
      { name: 'Team 1', members: ['Sam Miserendino', 'Aaquib Syed', 'Allan Fang'] },
      { name: 'Team 2', members: ['Jack Zheng', 'Jeremy Ornstein', 'Daniel George'] },
      { name: 'Team 3', members: ['Armaan Tipirneni', 'Karina Qian', 'Sung Jae Bae'] },
      { name: 'Team 4', members: ['Luke De Castro'] },
    ],
  },
  {
    id: '2026-10-06',
    title: 'THW replace human judges & juries with AI, if AI proves less biased.',
    shortTitle: 'Can AI deliver a fairer verdict?', date: '2026-10-06', dateLabel: 'October 6, 2026',
    category: 'AI & justice', status: 'past', image: 'images/ai-judges.jpg',
    description: 'A debate on fairness, human judgment, and the role of artificial intelligence in our courts.',
    result: 'Opposition won', winners: ['Sam Miserendino', 'Seth Morton', 'Allan Fang'],
    judges: ['Jeffrey Cheng'],
  },
  {
    id: '2026-09-22',
    title: 'THW hold regular referendums to vote on pausing AI development, and do so if there is more than 80% consensus.',
    shortTitle: 'Should the public get to pause AI?', date: '2026-09-22', dateLabel: 'September 22, 2026',
    category: 'AI & democracy', status: 'past', image: 'images/referendum.jpg',
    description: 'Who gets to decide how fast AI moves? The house considered regular public votes and an 80% threshold for a development pause.',
    result: 'Opposition won', winners: ['Jack Zheng', 'Jeremy Ornstein'],
  },
  {
    id: '2026-09-15',
    title: 'THW legally require individuals and organizations to disclose when their messages, emails, or calls are AI-generated.',
    shortTitle: 'Should AI have to introduce itself?', date: '2026-09-15', dateLabel: 'September 15, 2026',
    category: 'AI & communication', status: 'past', image: 'images/ai-disclosure.jpg',
    description: 'The house debated mandatory AI disclosure in everyday communication, from messages and emails to calls.',
    result: 'Opposition won', winners: ['Sam Miserendino', 'Albert Su', 'Aaquib Syed'], participants: ['Jack Zheng', 'Sam Miserendino'], judges: ['Jeffrey Cheng'],
  },
];
