export type BadgeRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type BadgeCategory = 'commits' | 'languages' | 'projects' | 'achievements';

export interface GitBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  earned: boolean;
}

export const RARITY_CONFIG: Record<BadgeRarity, { label: string; glowClass: string; textGlowClass: string; borderColor: string; bgGradient: string }> = {
  common: {
    label: 'Common',
    glowClass: '',
    textGlowClass: '',
    borderColor: 'border-muted-foreground/30',
    bgGradient: 'from-muted to-muted',
  },
  uncommon: {
    label: 'Uncommon',
    glowClass: 'glow-green',
    textGlowClass: '',
    borderColor: 'border-neon-green/40',
    bgGradient: 'from-neon-green/10 to-muted',
  },
  rare: {
    label: 'Rare',
    glowClass: 'glow-cyan',
    textGlowClass: 'text-glow-cyan',
    borderColor: 'border-primary/40',
    bgGradient: 'from-primary/10 to-muted',
  },
  epic: {
    label: 'Epic',
    glowClass: 'glow-purple',
    textGlowClass: '',
    borderColor: 'border-neon-purple/40',
    bgGradient: 'from-neon-purple/10 to-muted',
  },
  legendary: {
    label: 'Legendary',
    glowClass: 'glow-gold',
    textGlowClass: 'text-glow-gold',
    borderColor: 'border-accent/50',
    bgGradient: 'from-accent/15 to-muted',
  },
};

export const SAMPLE_BADGES: GitBadge[] = [
  // Commits
  { id: '1', name: 'First Blood', description: 'Made your first commit', icon: '/badges/commit.png', category: 'commits', rarity: 'common', earned: true },
  { id: '2', name: 'Commit Ninja', description: '100+ commits in a single repo', icon: '/badges/merge.png', category: 'commits', rarity: 'uncommon', earned: true },
  { id: '3', name: 'Streak Master', description: '30-day commit streak', icon: '/badges/streak.png', category: 'commits', rarity: 'rare', earned: true },
  { id: '4', name: 'Midnight Coder', description: '50+ commits after midnight', icon: '/badges/latenight.png', category: 'commits', rarity: 'epic', earned: true },
  { id: '5', name: 'Night Owl', description: '365-day commit streak', icon: '/badges/nightowl.png', category: 'commits', rarity: 'legendary', earned: false },

  // Languages
  { id: '6', name: 'TypeScript Titan', description: '5+ TypeScript projects', icon: '/badges/typescript.png', category: 'languages', rarity: 'uncommon', earned: true },
  { id: '7', name: 'Python Pro', description: '10k+ lines of Python', icon: '/badges/python.png', category: 'languages', rarity: 'rare', earned: true },
  { id: '8', name: 'Ruby Ranger', description: 'Contributed to a Ruby project', icon: '/badges/ruby.png', category: 'languages', rarity: 'epic', earned: false },
  { id: '9', name: 'Java Master', description: 'Used Java in 10+ repos', icon: '/badges/java.png', category: 'languages', rarity: 'legendary', earned: true },
  { id: '10', name: 'Style Guru', description: 'Wrote 5k+ lines of CSS', icon: '/badges/stylesheet.png', category: 'languages', rarity: 'uncommon', earned: true },

  // Projects
  { id: '11', name: 'Open Source Hero', description: 'Created a repo with 100+ stars', icon: '/badges/opensource.png', category: 'projects', rarity: 'rare', earned: true },
  { id: '12', name: 'Solo Builder', description: 'Built a project with 50+ commits solo', icon: '/badges/solobuilder.png', category: 'projects', rarity: 'uncommon', earned: true },
  { id: '13', name: 'Deep Learner', description: 'Built a machine learning project', icon: '/badges/deeplearning.png', category: 'projects', rarity: 'common', earned: true },
  { id: '14', name: 'Personal Demo', description: 'Created a personal portfolio site', icon: '/badges/personaldemo.png', category: 'projects', rarity: 'legendary', earned: false },

  // Achievements
  { id: '15', name: 'First PR', description: 'Opened your first pull request', icon: '/badges/firstpr.png', category: 'achievements', rarity: 'common', earned: true },
  { id: '16', name: 'Code Reviewer', description: 'Reviewed 50+ pull requests', icon: '/badges/codereviewer.png', category: 'achievements', rarity: 'rare', earned: true },
  { id: '17', name: 'Bug Squasher', description: 'Closed 100+ issues', icon: '/badges/bugsquasher.png', category: 'achievements', rarity: 'epic', earned: true },
  { id: '18', name: 'Hackathon Champ', description: 'Won a hackathon project', icon: '/badges/hackathonchamp.png', category: 'achievements', rarity: 'legendary', earned: true },
];

export const CATEGORY_CONFIG: Record<BadgeCategory, { label: string; icon: string }> = {
  commits: { label: 'Commits & Streaks', icon: '⚡' },
  languages: { label: 'Languages & Frameworks', icon: '💻' },
  projects: { label: 'Projects', icon: '📁' },
  achievements: { label: 'Achievements', icon: '🏆' },
};
