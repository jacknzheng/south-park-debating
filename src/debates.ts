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
  judge?: string;
  judgeTentative?: boolean;
  format?: string;
  teams?: Team[];
  image?: string;
}

// Newest first. Incomplete rosters are kept explicit.
// This is the only file to edit when adding a debate or changing a roster.
export const debates: Debate[] = [
  {
    id: '2026-10-13', title: 'Genetic engineering & transhumanism',
    shortTitle: 'Genetic engineering & transhumanism', date: '2026-10-13',
    dateLabel: 'Tuesday, October 13', time: '6:00pm', venue: 'South Park Commons',
    category: 'Science & society', status: 'upcoming',
    description: 'What does it mean to be human when we can change what makes us human? Join this week’s conversation on genetic engineering and transhumanism.',
    judge: 'Jeffrey Cheng', judgeTentative: true,
    teams: [
      { name: 'Team 1', members: ['Sam Miserendino', 'Aaquib Syed', 'Allan Fang'] },
      { name: 'Team 2', members: ['Jack Zheng', 'Jeremy Ornstein', 'Daniel George'] },
      { name: 'Team 3', members: ['Armaan Tipirneni', 'Karina Qian', 'Sung Jae Bae'] },
      { name: 'Team 4', members: ['Luke De Castro'], open: true },
    ],
  },
  {
    id: '2026-10-06',
    title: 'Should we replace human judges & juries with AI, if AI proves less biased?',
    shortTitle: 'Can AI deliver a fairer verdict?', date: '2026-10-06', dateLabel: 'October 6, 2026',
    category: 'AI & justice', status: 'past', image: 'images/ai-judges.jpg',
    description: 'A debate on fairness, human judgment, and the role of artificial intelligence in our courts.',
    result: 'Opposition won', winners: ['Sam Miserendino', 'Seth Morton', 'Allan Fang'],
    judge: 'Jeffrey Cheng',
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
    result: 'Winners', winners: ['Sam Miserendino', 'Allan Fang', 'Aaquib Syed'], participants: ['Jack Zheng', 'Sam Miserendino'], judge: 'Jeffrey Cheng',
  },
];
