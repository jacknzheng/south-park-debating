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

// Newest first. Incomplete rosters are kept explicit.
// This is the only file to edit when adding a debate or changing a roster.
export const debates: Debate[] = [
  {
    id: '2026-10-20', title: 'Genetic engineering & transhumanism',
    shortTitle: 'Genetic engineering & transhumanism', date: '2026-10-20',
    dateLabel: 'Tuesday, October 20', time: '6:00pm', venue: 'South Park Commons',
    category: 'Science & society', status: 'upcoming',
    description: 'What does it mean to be human when we can change what makes us human? Join this week’s conversation on genetic engineering and transhumanism.',
  },
  {
    id: '2026-10-13',
    title: 'This house would permit AI assistants to use undisclosed persuasion to protect users’ long-term wellbeing, even against their expressed preferences.',
    shortTitle: 'Should AI nudge you for your own good?', date: '2026-10-13', dateLabel: 'October 13, 2026',
    category: 'AI & wellbeing', status: 'past', image: 'images/ai-persuasion.jpg',
    description: 'Should an AI quietly steer you toward what is good for you, even when you have said you want something else?',
    result: 'Winners', winners: ['Aaquib Syed', 'Karina Qian', 'Allan Fang'],
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
    title: 'Should we replace human judges & juries with AI, if AI proves less biased?',
    shortTitle: 'Can AI deliver a fairer verdict?', date: '2026-10-06', dateLabel: 'October 6, 2026',
    category: 'AI & justice', status: 'past', image: 'images/ai-judges.jpg',
    description: 'A debate on fairness, human judgment, and the role of artificial intelligence in our courts.',
    result: 'Opposition won', winners: ['Sam Miserendino', 'Seth Morton', 'Allan Fang'],
    judges: ['Jeffrey Cheng'],
  },
  {
    id: '2026-09-22',
    title: 'This house would hold regular referendums to vote on pausing AI development, and do so if there is more than 80% consensus.',
    shortTitle: 'Should the public get to pause AI?', date: '2026-09-22', dateLabel: 'September 22, 2026',
    category: 'AI & democracy', status: 'past', image: 'images/referendum.jpg',
    description: 'Who gets to decide how fast AI moves? The house considered regular public votes and an 80% threshold for a development pause.',
    result: 'Winners', winners: ['Jack Zheng', 'Jeremy Ornstein'],
  },
  {
    id: '2026-09-15',
    title: 'This house would legally require individuals and organizations to disclose when their messages, emails, or calls are AI-generated.',
    shortTitle: 'Should AI have to introduce itself?', date: '2026-09-15', dateLabel: 'September 15, 2026',
    category: 'AI & communication', status: 'past', image: 'images/ai-disclosure.jpg', format: '3v3',
    description: 'The house debated mandatory AI disclosure in everyday communication, from messages and emails to calls.',
    result: 'Winners', winners: ['Sam Miserendino', 'Allan Fang', 'Aaquib Syed'], participants: ['Jack Zheng', 'Sam Miserendino'], judges: ['Jeffrey Cheng'],
  },
];
