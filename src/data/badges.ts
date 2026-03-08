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
  { id: '1', name: 'First Blood', description: 'Made your first commit', icon: '⚡', category: 'commits', rarity: 'common', earned: true },
  { id: '2', name: 'Commit Ninja', description: '100+ commits in a single repo', icon: '🥷', category: 'commits', rarity: 'uncommon', earned: true },
  { id: '3', name: 'Streak Master', description: '30-day commit streak', icon: '🔥', category: 'commits', rarity: 'rare', earned: true },
  { id: '4', name: 'Midnight Coder', description: '50+ commits after midnight', icon: '🌙', category: 'commits', rarity: 'epic', earned: true },
  { id: '5', name: 'Eternal Flame', description: '365-day commit streak', icon: '♾️', category: 'commits', rarity: 'legendary', earned: false },

  // Languages
  { id: '6', name: 'React Wrangler', description: 'Used React in 5+ repos', icon: '⚛️', category: 'languages', rarity: 'uncommon', earned: true },
  { id: '7', name: 'Python Pro', description: '10k+ lines of Python', icon: '🐍', category: 'languages', rarity: 'rare', earned: true },
  { id: '8', name: 'Rustacean', description: 'Contributed to a Rust project', icon: '🦀', category: 'languages', rarity: 'epic', earned: false },
  { id: '9', name: 'Polyglot', description: 'Used 10+ languages', icon: '🌍', category: 'languages', rarity: 'legendary', earned: true },
  { id: '10', name: 'TypeScript Titan', description: '5+ TypeScript projects', icon: '💎', category: 'languages', rarity: 'uncommon', earned: true },

  // Projects
  { id: '11', name: 'Open Source Hero', description: 'Created a repo with 100+ stars', icon: '⭐', category: 'projects', rarity: 'rare', earned: true },
  { id: '12', name: 'Solo Wizard', description: 'Built a project with 50+ commits solo', icon: '🧙', category: 'projects', rarity: 'uncommon', earned: true },
  { id: '13', name: 'Repo Hoarder', description: 'Created 50+ repositories', icon: '📦', category: 'projects', rarity: 'common', earned: true },
  { id: '14', name: 'Viral Creator', description: 'A repo reached 1k+ stars', icon: '🚀', category: 'projects', rarity: 'legendary', earned: false },

  // Achievements
  { id: '15', name: 'First PR', description: 'Opened your first pull request', icon: '🎯', category: 'achievements', rarity: 'common', earned: true },
  { id: '16', name: 'Code Reviewer', description: 'Reviewed 50+ pull requests', icon: '👁️', category: 'achievements', rarity: 'rare', earned: true },
  { id: '17', name: 'Bug Squasher', description: 'Closed 100+ issues', icon: '🐛', category: 'achievements', rarity: 'epic', earned: true },
  { id: '18', name: 'Arctic Vault', description: 'Code preserved in Arctic Code Vault', icon: '🏔️', category: 'achievements', rarity: 'legendary', earned: true },
];

export const CATEGORY_CONFIG: Record<BadgeCategory, { label: string; icon: string }> = {
  commits: { label: 'Commits & Streaks', icon: '⚡' },
  languages: { label: 'Languages & Frameworks', icon: '💻' },
  projects: { label: 'Projects', icon: '📁' },
  achievements: { label: 'Achievements', icon: '🏆' },
};
